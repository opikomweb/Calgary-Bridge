/**
 * batch-translate.mjs
 *
 * Replaces the old literal-engine seed-translation-cache.mjs. Pre-warms the
 * Supabase translation_cache table for ALL 11 non-English languages using
 * the SAME contextual Gemini engine as app/api/translate/route.ts — not the
 * literal gtx endpoint — so every string gets a natural, context-aware
 * translation on the FIRST request a real user ever makes, not a placeholder
 * that gets silently upgraded later.
 *
 * Sources translated:
 *  1. UI strings — every registerStrings(...) call across components/ and lib/,
 *     with context = the component file they came from.
 *  2. Resource DB fields — title/description/eligibility for every resource in
 *     lib/calgary-resources.ts, with context describing what the field is and,
 *     for eligibility text, an explicit accuracy directive.
 *
 * Run:
 *   node --env-file-if-exists=/vercel/share/.env.project scripts/batch-translate.mjs
 *   (must be run through `npx tsx` if node's built-in TS support is unavailable,
 *   since this script imports calgary-resources.ts directly)
 *
 * Flags:
 *   --langs=es,fr        only translate these language codes
 *   --dry-run            print counts/sample jobs, write nothing
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { generateText, Output } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const langsArg = args.find((a) => a.startsWith("--langs="));
const onlyLangs = langsArg ? new Set(langsArg.slice("--langs=".length).split(",")) : null;

// ── Env ──────────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
if (!GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY — this script requires the contextual Gemini engine.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const google = createGoogleGenerativeAI({ apiKey: GEMINI_API_KEY });
const TRANSLATE_MODEL_ID = "gemini-3.6-flash";

// ── Languages (kept in sync with lib/languages.ts) ─────────────────────────
const LANGUAGES = [
  { code: "pa", llmLabel: "Punjabi (Gurmukhi script)" },
  { code: "tl", llmLabel: "Tagalog / Filipino" },
  { code: "zh", llmLabel: "Cantonese, written in Traditional Chinese script" },
  { code: "zh-CN", llmLabel: "Mandarin, written in Simplified Chinese script" },
  { code: "es", llmLabel: "Spanish (neutral, Latin American)" },
  { code: "uk", llmLabel: "Ukrainian" },
  { code: "ru", llmLabel: "Russian" },
  { code: "am", llmLabel: "Amharic" },
  { code: "ar", llmLabel: "Modern Standard Arabic" },
  { code: "so", llmLabel: "Somali" },
  { code: "sw", llmLabel: "Kiswahili (East African Swahili)" },
].filter((l) => !onlyLangs || onlyLangs.has(l.code));

// ── Hash (must match app/api/translate/route.ts exactly) ──────────────────
function hashText(text) {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16);
}

// ── 1. Collect UI strings from registerStrings(...) calls ─────────────────
function extractRegisterStrings(src) {
  const strings = new Set();
  const blockRe = /registerStrings\s*\(([\s\S]*?)\);/g;
  let block;
  while ((block = blockRe.exec(src)) !== null) {
    const body = block[1];
    const strRe = /"([^"\\]{1,}(?:\\.[^"\\]*)*)"/g;
    let m;
    while ((m = strRe.exec(body)) !== null) {
      const val = m[1].trim();
      if (val) strings.add(val);
    }
  }
  return strings;
}

function collectUiJobs(rootDirs) {
  const jobs = new Map(); // text -> context
  for (const dir of rootDirs) {
    const walk = (d) => {
      if (!fs.existsSync(d)) return;
      for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
        const full = path.join(d, entry.name);
        if (entry.isDirectory()) { walk(full); continue; }
        if (!entry.name.endsWith(".tsx") && !entry.name.endsWith(".ts")) continue;
        const src = fs.readFileSync(full, "utf8");
        const relPath = path.relative(ROOT, full);
        extractRegisterStrings(src).forEach((s) => {
          if (!jobs.has(s)) jobs.set(s, `UI text from ${relPath}`);
        });
      }
    };
    walk(dir);
  }
  return jobs;
}

// ── 2. Collect resource DB field jobs from calgary-resources.ts ───────────
async function collectResourceJobs() {
  const mod = await import(path.join(ROOT, "lib", "calgary-resources.ts"));
  const resources = mod.calgaryResources ?? mod.default ?? [];
  const jobs = new Map(); // text -> context

  for (const r of resources) {
    const cat = Array.isArray(r.category) ? r.category.join("/") : r.category;
    if (r.title?.en && !jobs.has(r.title.en)) {
      jobs.set(r.title.en, `Organization/program name for a ${cat} resource in a Calgary settlement-services directory`);
    }
    if (r.description?.en && !jobs.has(r.description.en)) {
      jobs.set(r.description.en, `Short description of what this ${cat} resource/organization does`);
    }
    if (r.eligibility?.en && !jobs.has(r.eligibility.en)) {
      jobs.set(
        r.eligibility.en,
        `Eligibility requirements for a ${cat} program — translate every condition, threshold, deadline, and required document with LITERAL accuracy; do not soften or generalize`
      );
    }
    if (r.summary?.en && !jobs.has(r.summary.en)) {
      jobs.set(r.summary.en, `One-line summary of a ${cat} resource`);
    }
  }
  return jobs;
}

// ── Gemini batch translation (mirrors app/api/translate/route.ts) ─────────
const BatchSchema = z.object({
  translations: z.array(
    z.object({
      i: z.number().describe("The original index of this string in the input batch"),
      t: z.string().describe("The natural, contextually-accurate translation"),
    })
  ),
});

async function translateBatchWithGemini(items, llmLabel) {
  const numbered = items
    .map(({ text, context }, i) => (context ? `[${i}] (context: ${context}) ${text}` : `[${i}] ${text}`))
    .join("\n");

  const { output } = await generateText({
    model: google(TRANSLATE_MODEL_ID),
    system: `You are an expert human translator localizing a settlement-services web app for newcomers, immigrants, and refugees in Calgary, Canada. The app connects people to housing, jobs, healthcare, childcare, legal aid, and community resources.

Translate each numbered English string into ${llmLabel}.

Some strings include a "(context: ...)" hint describing where the string appears in the app. Use that hint to resolve ambiguity. The context hint itself is never part of the string to translate — translate only the string after it.

Rules:
- Translate for MEANING and NATURAL PHRASING, never literal word-for-word. A native speaker reading your translation should feel it was written originally in that language, not machine-translated.
- For eligibility criteria, tenant-rights, healthcare, and emergency-service content specifically: prioritize LITERAL ACCURACY of any condition, threshold, deadline, or requirement over smoothness of phrasing.
- Keep the tone warm, clear, and simple — many readers are newcomers who may not be fluent readers even in their own first language. Prefer plain, common words over formal/literary vocabulary.
- Preserve the intent of UI labels, buttons, and short phrases exactly — do not add or remove information.
- NEVER translate: organization/business proper names, phone numbers, email addresses, URLs, dollar amounts, dates, or numeric codes. Copy those through unchanged.
- Preserve any punctuation that conveys UI meaning (e.g. "?", "→", "...").
- Return EVERY input index exactly once, with no extra commentary.`,
    prompt: numbered,
    output: Output.object({ schema: BatchSchema }),
    temperature: 0.2,
    abortSignal: AbortSignal.timeout(45000),
  });

  const map = new Map();
  for (const row of output.translations) {
    if (typeof row.i === "number" && typeof row.t === "string" && row.t.trim()) {
      map.set(row.i, row.t);
    }
  }
  return map;
}

const CHUNK_SIZE = 30;
const MAX_RETRIES = 3;

async function translateWithRetry(items, llmLabel) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const map = await translateBatchWithGemini(items, llmLabel);
      if (map.size >= items.length * 0.9) return map; // accept if ~all resolved
      console.warn(`  attempt ${attempt}: only ${map.size}/${items.length} resolved, retrying...`);
    } catch (err) {
      console.warn(`  attempt ${attempt} failed: ${err?.message ?? err}`);
    }
    await new Promise((r) => setTimeout(r, 1500 * attempt));
  }
  // Final attempt result, even if partial — better than nothing.
  try {
    return await translateBatchWithGemini(items, llmLabel);
  } catch {
    return new Map();
  }
}

// ── Main ────────────────────────────────────────────────────────────────
async function main() {
  console.log("Collecting translation jobs...\n");
  const uiJobs = collectUiJobs([path.join(ROOT, "components"), path.join(ROOT, "lib")]);
  const resourceJobs = await collectResourceJobs();

  const allJobs = new Map([...uiJobs, ...resourceJobs]); // text -> context
  const entries = [...allJobs.entries()].map(([text, context]) => ({ text, context }));

  console.log(`UI strings:       ${uiJobs.size}`);
  console.log(`Resource fields:  ${resourceJobs.size}`);
  console.log(`Total unique:     ${entries.length}\n`);

  if (dryRun) {
    console.log("Sample jobs:");
    entries.slice(0, 10).forEach((j) => console.log(`  - [${j.context}] ${j.text.slice(0, 70)}`));
    console.log("\n--dry-run: no translations performed.");
    return;
  }

  const hashes = entries.map((j) => hashText(j.text));
  let totalStored = 0;

  for (const lang of LANGUAGES) {
    console.log(`── ${lang.code} (${lang.llmLabel}) ──`);

    // Bulk-check what's already cached for this language.
    const cachedSet = new Set();
    for (let i = 0; i < hashes.length; i += 500) {
      const slice = hashes.slice(i, i + 500);
      const { data, error } = await supabase
        .from("translation_cache")
        .select("source_hash")
        .eq("lang", lang.code)
        .in("source_hash", slice);
      if (error) { console.error("  cache read error:", error.message); continue; }
      (data ?? []).forEach((r) => cachedSet.add(r.source_hash));
    }

    const missing = entries.filter((_, i) => !cachedSet.has(hashes[i]));
    console.log(`  ${cachedSet.size} cached, ${missing.length} to translate`);
    if (missing.length === 0) { console.log(); continue; }

    let stored = 0;
    for (let i = 0; i < missing.length; i += CHUNK_SIZE) {
      const chunk = missing.slice(i, i + CHUNK_SIZE);
      const map = await translateWithRetry(chunk, lang.llmLabel);
      const rows = chunk
        .map((job, localIdx) => ({
          lang: lang.code,
          source_hash: hashText(job.text),
          source_text: job.text,
          translated: map.get(localIdx) ?? null,
          context: job.context,
        }))
        .filter((r) => r.translated);

      if (rows.length > 0) {
        const { error } = await supabase
          .from("translation_cache")
          .upsert(rows, { onConflict: "lang,source_hash" });
        if (error) console.error("  upsert error:", error.message);
        else stored += rows.length;
      }
      process.stdout.write(`  ${Math.min(i + CHUNK_SIZE, missing.length)}/${missing.length}\r`);
      // Small delay between chunks to stay well under Gemini rate limits.
      await new Promise((r) => setTimeout(r, 300));
    }
    console.log(`  stored ${stored}/${missing.length}                    `);
    totalStored += stored;
    console.log();
  }

  console.log(`Done. ${totalStored} new contextual translations stored.`);
}

main().catch((err) => { console.error(err); process.exit(1); });
