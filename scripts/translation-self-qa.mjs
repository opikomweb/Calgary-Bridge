/**
 * translation-self-qa.mjs
 *
 * Mandatory self-QA pass over translation_cache, prioritizing safety-relevant
 * content: housing, healthcare, tenant-rights, and emergency-service strings
 * (identified via each row's `context` column, written by batch-translate.mjs).
 *
 * IMPORTANT — what this is and isn't:
 *  - This is Gemini reviewing its OWN prior output, not independent human
 *    verification. Per the confirmed decision, this is documented explicitly
 *    (see TRANSLATION_QUALITY_REPORT.md) rather than presented as a substitute
 *    for a native-speaker review.
 *  - Rows with no `context` value predate this pass's cache schema — they were
 *    seeded before the `context` column existed and are NOT touched or scored
 *    here. Run batch-translate.mjs first (it backfills context-free misses),
 *    then this script, to get full coverage over time.
 *
 * For each reviewed row, Gemini is asked to output a pass/fail verdict plus a
 * corrected translation if it finds an accuracy problem — specifically for
 * dropped/altered conditions, thresholds, deadlines, or requirements (the
 * exact failure mode found in the original Mustard Seed Tagalog bug this
 * whole effort responds to). On a "fail" verdict, the corrected translation
 * is written back to the cache; the finding is logged either way.
 *
 * Run:
 *   node --env-file-if-exists=/vercel/share/.env.project scripts/translation-self-qa.mjs
 *   npx tsx scripts/translation-self-qa.mjs   (if plain node lacks TS support)
 *
 * Flags:
 *   --limit=N       max rows to review this run (default: 200, to respect
 *                    Gemini free-tier's 20 req/day quota — see batch-translate.mjs
 *                    header for the same constraint)
 *   --langs=es,fr    only review these language codes
 *   --dry-run        print what would be reviewed, write nothing
 */

import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { generateText, Output } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const limitArg = args.find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? parseInt(limitArg.slice("--limit=".length), 10) : 200;
const langsArg = args.find((a) => a.startsWith("--langs="));
const onlyLangs = langsArg ? new Set(langsArg.slice("--langs=".length).split(",")) : null;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
if (!GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const google = createGoogleGenerativeAI({ apiKey: GEMINI_API_KEY });
const MODEL_ID = "gemini-3.6-flash";

// Rows whose `context` mentions any of these are treated as safety-relevant
// and reviewed FIRST, ahead of general UI/description strings.
const PRIORITY_KEYWORDS = [
  "eligibility", "housing", "tenant", "rent", "emergency", "healthcare",
  "health", "legal", "shelter", "crisis", "abuse", "immigration", "visa",
  "deadline", "requirement",
];

function isPriority(context) {
  if (!context) return false;
  const lower = context.toLowerCase();
  return PRIORITY_KEYWORDS.some((kw) => lower.includes(kw));
}

const MIN_REQUEST_GAP_MS = 4000;
let nextRequestAt = 0;
async function throttle() {
  const wait = nextRequestAt - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  nextRequestAt = Date.now() + MIN_REQUEST_GAP_MS;
}
function parseRetryDelayMs(err) {
  const msg = err?.message ?? String(err ?? "");
  const match = msg.match(/retry in ([\d.]+)s/i);
  if (match) return Math.ceil(parseFloat(match[1]) * 1000) + 500;
  return null;
}

const QaSchema = z.object({
  reviews: z.array(
    z.object({
      i: z.number(),
      verdict: z.enum(["pass", "fail"]),
      issue: z.string().nullable().describe("If fail: what was wrong (dropped condition, wrong number, softened requirement, etc). Null if pass."),
      corrected: z.string().nullable().describe("If fail: the corrected translation. Null if pass."),
    })
  ),
});

async function qaBatch(rows, llmLabel) {
  const numbered = rows
    .map(
      (r, i) =>
        `[${i}] (context: ${r.context ?? "none"})\nEN: ${r.source_text}\n${llmLabel}: ${r.translated}`
    )
    .join("\n\n");

  for (let attempt = 1; attempt <= 3; attempt++) {
    await throttle();
    try {
      const { output } = await generateText({
        model: google(MODEL_ID),
        system: `You are auditing translations for a Calgary settlement-services app used by newcomers, immigrants, and refugees. For each numbered pair below, compare the English source to its ${llmLabel} translation.

Mark "fail" ONLY for a genuine accuracy problem: a dropped clause, an altered number/date/threshold, a wrong or missing condition/requirement, or a mistranslation that changes what the reader would understand or qualify for. Do NOT mark "fail" for stylistic differences, word-order changes, or any phrasing that a native speaker would still consider a faithful, natural translation.

Be especially strict on the "context" hint when it involves eligibility, housing, tenant rights, healthcare, legal, or emergency content — every condition, number, and deadline must be present and correct.

Return a verdict for every index. If "fail", give a short "issue" description and a corrected translation; if "pass", both fields are null.`,
        prompt: numbered,
        output: Output.object({ schema: QaSchema }),
        temperature: 0.1,
        abortSignal: AbortSignal.timeout(45000),
        maxRetries: 0,
      });
      return output.reviews;
    } catch (err) {
      const quotaDelay = parseRetryDelayMs(err);
      console.warn(`  QA attempt ${attempt} failed: ${(err?.message ?? err)?.toString().slice(0, 120)}`);
      if (quotaDelay) {
        nextRequestAt = Date.now() + quotaDelay;
        continue;
      }
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
  return [];
}

const LANG_LABELS = {
  pa: "Punjabi (Gurmukhi script)",
  tl: "Tagalog / Filipino",
  zh: "Cantonese, written in Traditional Chinese script",
  "zh-CN": "Mandarin, written in Simplified Chinese script",
  es: "Spanish (neutral, Latin American)",
  uk: "Ukrainian",
  ru: "Russian",
  am: "Amharic",
  ar: "Modern Standard Arabic",
  so: "Somali",
  sw: "Kiswahili (East African Swahili)",
};

const QA_CHUNK_SIZE = 15; // smaller than translation batches: each row carries 2x the text (EN + translated)

async function main() {
  console.log(`Fetching up to ${LIMIT} rows with context set, prioritizing safety-relevant content...\n`);

  let query = supabase
    .from("translation_cache")
    .select("id, lang, source_hash, source_text, translated, context")
    .not("context", "is", null)
    .limit(2000); // pull a wide pool, then prioritize client-side
  if (onlyLangs) query = query.in("lang", [...onlyLangs]);

  const { data, error } = await query;
  if (error) { console.error(error.message); process.exit(1); }

  const priority = (data ?? []).filter((r) => isPriority(r.context));
  const rest = (data ?? []).filter((r) => !isPriority(r.context));
  const ordered = [...priority, ...rest].slice(0, LIMIT);

  console.log(`Pool: ${data?.length ?? 0} rows with context (${priority.length} safety-priority)`);
  console.log(`Reviewing: ${ordered.length} rows this run (--limit=${LIMIT})\n`);

  if (dryRun) {
    ordered.slice(0, 10).forEach((r) =>
      console.log(`  [${r.lang}] (${r.context}) "${r.source_text.slice(0, 60)}"`)
    );
    console.log("\n--dry-run: no QA performed.");
    return;
  }

  const findings = [];
  let passCount = 0;
  let failCount = 0;

  // Group by language so each Gemini call reviews one language at a time
  // (mixing languages in one prompt makes the model's own review less reliable).
  const byLang = new Map();
  for (const r of ordered) {
    if (!byLang.has(r.lang)) byLang.set(r.lang, []);
    byLang.get(r.lang).push(r);
  }

  for (const [lang, rows] of byLang) {
    const llmLabel = LANG_LABELS[lang] ?? lang;
    console.log(`── ${lang} (${rows.length} rows) ──`);

    for (let i = 0; i < rows.length; i += QA_CHUNK_SIZE) {
      const chunk = rows.slice(i, i + QA_CHUNK_SIZE);
      const reviews = await qaBatch(chunk, llmLabel);

      const corrections = [];
      for (const review of reviews) {
        const row = chunk[review.i];
        if (!row) continue;
        if (review.verdict === "fail") {
          failCount++;
          findings.push({
            lang,
            context: row.context,
            source_text: row.source_text,
            previous_translation: row.translated,
            issue: review.issue,
            corrected: review.corrected,
            priority: isPriority(row.context),
          });
          if (review.corrected) {
            corrections.push({ id: row.id, translated: review.corrected });
          }
        } else {
          passCount++;
        }
      }

      if (corrections.length > 0) {
        for (const c of corrections) {
          const { error: updateError } = await supabase
            .from("translation_cache")
            .update({ translated: c.translated })
            .eq("id", c.id);
          if (updateError) console.error(`  correction write error: ${updateError.message}`);
        }
        console.log(`  ${i + chunk.length}/${rows.length} reviewed, ${corrections.length} corrected`);
      } else {
        console.log(`  ${i + chunk.length}/${rows.length} reviewed`);
      }
    }
    console.log();
  }

  console.log(`Done. ${passCount} passed, ${failCount} flagged and corrected.\n`);

  if (findings.length > 0) {
    console.log("=== FINDINGS (for TRANSLATION_QUALITY_REPORT.md) ===");
    console.log(JSON.stringify(findings, null, 2));
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
