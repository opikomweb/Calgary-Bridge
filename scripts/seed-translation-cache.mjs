/**
 * seed-translation-cache.mjs
 *
 * Pre-populates the Supabase translation_cache table with ALL UI strings
 * for ALL supported languages using the free Google gtx endpoint.
 *
 * Run: node --env-file-if-exists=/vercel/share/.env.project scripts/seed-translation-cache.mjs
 */

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// ── Config ────────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const LANGUAGES = [
  { code: "pa",    googleCode: "pa"    },
  { code: "tl",    googleCode: "tl"    },
  { code: "zh",    googleCode: "zh-TW" },
  { code: "zh-CN", googleCode: "zh-CN" },
  { code: "es",    googleCode: "es"    },
  { code: "uk",    googleCode: "uk"    },
  { code: "ru",    googleCode: "ru"    },
  { code: "am",    googleCode: "am"    },
  { code: "ar",    googleCode: "ar"    },
  { code: "so",    googleCode: "so"    },
  { code: "sw",    googleCode: "sw"    },
];

// ── Extract string args from registerStrings(...) calls ───────────────────────
// registerStrings takes individual string args: registerStrings("foo", "bar", ...)

function extractRegisterStrings(src) {
  const strings = new Set();
  // Find each registerStrings( ... ) call (multiline)
  const blockRe = /registerStrings\s*\(([\s\S]*?)\);/g;
  let block;
  while ((block = blockRe.exec(src)) !== null) {
    const body = block[1];
    // Extract each double-quoted string argument
    const strRe = /"([^"\\]{2,}(?:\\.[^"\\]*)*)"/g;
    let m;
    while ((m = strRe.exec(body)) !== null) {
      const val = m[1].trim();
      // Skip comment-like strings and empty ones
      if (val && !val.startsWith("//")) strings.add(val);
    }
  }
  return strings;
}

function collectAllStrings(rootDirs) {
  const all = new Set();
  for (const dir of rootDirs) {
    const walk = (d) => {
      if (!fs.existsSync(d)) return;
      for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
        const full = path.join(d, entry.name);
        if (entry.isDirectory()) { walk(full); continue; }
        if (!entry.name.endsWith(".tsx") && !entry.name.endsWith(".ts")) continue;
        const src = fs.readFileSync(full, "utf8");
        extractRegisterStrings(src).forEach((s) => all.add(s));
      }
    };
    walk(dir);
  }
  return [...all];
}

// ── Hash (must match route.ts exactly) ───────────────────────────────────────

function hashText(text) {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16);
}

// ── Free Google gtx translate ─────────────────────────────────────────────────

async function translateOne(text, targetLang) {
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", "en");
  url.searchParams.set("tl", targetLang);
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", text);
  const res = await fetch(url.toString(), {
    headers: { "User-Agent": "Mozilla/5.0" },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) return text;
  const data = await res.json();
  return data?.[0]?.map((c) => c?.[0] ?? "").join("") || text;
}

async function translateBatch(texts, targetLang) {
  const results = [];
  for (const text of texts) {
    try {
      results.push(await translateOne(text, targetLang));
    } catch {
      results.push(text);
    }
    await new Promise((r) => setTimeout(r, 80));
  }
  return results;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const base = path.resolve(".");
  const strings = collectAllStrings([
    path.join(base, "components"),
    path.join(base, "lib"),
  ]);

  console.log(`Found ${strings.length} unique UI strings from registerStrings() calls.\n`);
  if (strings.length === 0) {
    console.error("No strings found — check the extraction logic.");
    process.exit(1);
  }

  let totalInserted = 0;

  for (const lang of LANGUAGES) {
    console.log(`── ${lang.code.toUpperCase()} (${lang.googleCode}) ──`);

    const hashes = strings.map(hashText);

    // Check what's already cached
    const { data: existing, error: fetchErr } = await supabase
      .from("translation_cache")
      .select("source_hash")
      .eq("lang", lang.code)
      .in("source_hash", hashes);

    if (fetchErr) { console.error("  Fetch error:", fetchErr.message); continue; }

    const cachedSet = new Set((existing ?? []).map((r) => r.source_hash));
    const missing = strings.filter((_, i) => !cachedSet.has(hashes[i]));

    if (missing.length === 0) {
      console.log(`  All ${strings.length} strings already cached.\n`);
      continue;
    }

    console.log(`  ${cachedSet.size} cached, ${missing.length} to translate...`);

    const BATCH = 30;
    const rows = [];
    for (let i = 0; i < missing.length; i += BATCH) {
      const batch = missing.slice(i, i + BATCH);
      const translated = await translateBatch(batch, lang.googleCode);
      batch.forEach((text, j) => {
        rows.push({
          lang: lang.code,
          source_hash: hashText(text),
          source_text: text,
          translated: translated[j],
        });
      });
      const done = Math.min(i + BATCH, missing.length);
      process.stdout.write(`  Translated ${done}/${missing.length}...\r`);
    }

    const { error: upsertErr } = await supabase
      .from("translation_cache")
      .upsert(rows, { onConflict: "lang,source_hash" });

    if (upsertErr) {
      console.error(`\n  Upsert error:`, upsertErr.message);
    } else {
      console.log(`  Stored ${rows.length} translations.              `);
      totalInserted += rows.length;
    }
    console.log();
  }

  console.log(`Done! ${totalInserted} new translations stored in Supabase.`);
  console.log("All future users get instant translations from the DB — $0 ongoing cost.");
}

main().catch((err) => { console.error(err); process.exit(1); });
