/**
 * Seeds translation cache for a single language.
 * Usage: node seed-one-lang.mjs <lang>
 * e.g.:  node seed-one-lang.mjs ar
 */
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const lang = process.argv[2];
if (!lang) { console.error("Usage: node seed-one-lang.mjs <lang>"); process.exit(1); }

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) { console.error("Missing Supabase env vars"); process.exit(1); }

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const LANG_MAP = {
  pa: "pa-IN", tl: "tl-PH", zh: "zh-TW", "zh-CN": "zh-CN",
  es: "es-MX", uk: "uk-UA", ru: "ru-RU", am: "am-ET",
  ar: "ar-SA", so: "so-SO", sw: "sw-KE",
};

const targetCode = LANG_MAP[lang];
if (!targetCode) { console.error(`Unknown lang: ${lang}. Valid: ${Object.keys(LANG_MAP).join(", ")}`); process.exit(1); }

// ---- Extract strings from source files ----
function extractStrings() {
  const dirs = [
    "/vercel/share/v0-project/components",
    "/vercel/share/v0-project/components/tabs",
    "/vercel/share/v0-project/lib",
  ];
  const strings = new Set();
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.endsWith(".tsx") || f.endsWith(".ts"));
    for (const file of files) {
      const src = fs.readFileSync(path.join(dir, file), "utf8");
      // Match registerStrings("...", "...", ...) calls
      const calls = src.matchAll(/registerStrings\s*\(([\s\S]*?)\)/g);
      for (const call of calls) {
        const args = call[1].matchAll(/["'`]([^"'`\n]{3,200})["'`]/g);
        for (const arg of args) {
          const s = arg[1].trim();
          if (s && !s.startsWith("http") && !s.includes("${") && !/^[a-z-]+$/.test(s)) {
            strings.add(s);
          }
        }
      }
    }
  }
  return [...strings];
}

// ---- Translate via Google unofficial endpoint ----
async function translateText(text, target) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data[0]?.map((s) => s[0]).join("") ?? text;
}

function hashText(text) {
  return crypto.createHash("sha256").update(text).digest("hex").slice(0, 16);
}

// ---- Main ----
const strings = extractStrings();
console.log(`\nLanguage: ${lang} (${targetCode}) — ${strings.length} strings to process`);

// Fetch already-cached hashes
const { data: existing } = await supabase
  .from("translation_cache")
  .select("source_hash")
  .eq("lang", lang);
const cachedHashes = new Set((existing || []).map(r => r.source_hash));
const todo = strings.filter(s => !cachedHashes.has(hashText(s)));
console.log(`Already cached: ${cachedHashes.size} | Remaining: ${todo.length}`);

if (todo.length === 0) { console.log("Nothing to do — already complete!"); process.exit(0); }

let done = 0;
let errors = 0;
for (const text of todo) {
  try {
    const translated = await translateText(text, targetCode);
    const hash = hashText(text);
    await supabase.from("translation_cache").upsert(
      { lang, source_hash: hash, source_text: text, translated },
      { onConflict: "lang,source_hash" }
    );
    done++;
    if (done % 50 === 0) console.log(`  [${lang}] ${done + cachedHashes.size}/${strings.length}`);
  } catch (e) {
    errors++;
    if (errors > 20) { console.error("Too many errors, stopping."); break; }
  }
  await new Promise(r => setTimeout(r, 80));
}

console.log(`\nDone! ${lang}: ${done} translated, ${errors} errors.`);
