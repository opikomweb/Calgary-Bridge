import { NextRequest, NextResponse } from "next/server";
import { generateText, Output } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";
import { getLangMeta, LANGUAGES } from "@/lib/languages";
import type { Language } from "@/lib/types";
import { createClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Direct Gemini provider using the project's own GEMINI_API_KEY.
// We deliberately call Google directly instead of routing through the
// Vercel AI Gateway: this account's Gateway tier rate-limits / blocks the
// higher-quality Gemini models (403/429 on burst traffic), which would
// silently degrade translation quality back to literal MT. The dedicated
// Gemini API key has its own, separate quota and is not subject to the
// Gateway's free-tier throttling.
// ---------------------------------------------------------------------------
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ---------------------------------------------------------------------------
// Direct Supabase admin client — NO cookie overhead, NO RLS round-trips.
// Uses service role key so it can read/write translation_cache at full speed.
// This is safe: the translate route never touches user data.
// ---------------------------------------------------------------------------
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false },
    }
  );
}

// ---------------------------------------------------------------------------
// Lightweight FNV-1a hash — stable cache key per string.
// ---------------------------------------------------------------------------
function hashText(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16);
}

// ---------------------------------------------------------------------------
// PRIMARY ENGINE — Gemini via Vercel AI Gateway.
// This translates for MEANING and CONTEXT, not word-for-word, and is given
// an explicit, unambiguous description of the exact target dialect/script
// (see llmLabel in lib/languages.ts) so it never confuses e.g. Cantonese
// with Mandarin, or MSA with a regional Arabic dialect.
//
// Strings are sent as an INDEXED batch and the model must return the SAME
// indices back — this guarantees translations can never silently misalign
// with their source strings even if the model drops or reorders an entry.
//
// Because every string is translated AT MOST ONCE PER LANGUAGE EVER (the
// Supabase cache serves every subsequent request), the added LLM latency/
// cost only affects true cache misses — never repeat traffic.
// ---------------------------------------------------------------------------
const BatchSchema = z.object({
  translations: z.array(
    z.object({
      i: z.number().describe("The original index of this string in the input batch"),
      t: z.string().describe("The natural, contextually-accurate translation"),
    })
  ),
});

// gemini-2.5-flash is no longer available to new Gemini API keys (Google
// returns a 404 directing to the current model). gemini-3.6-flash is the
// current replacement.
const TRANSLATE_MODEL_ID = "gemini-3.6-flash";

async function translateBatchWithGemini(
  texts: string[],
  llmLabel: string
): Promise<Map<number, string> | null> {
  if (texts.length === 0) return new Map();
  if (!process.env.GEMINI_API_KEY) {
    console.error("[translate] GEMINI_API_KEY is not set — falling back to literal engine");
    return null;
  }

  const numbered = texts.map((t, i) => `[${i}] ${t}`).join("\n");

  try {
    const { output } = await generateText({
      model: google(TRANSLATE_MODEL_ID),
      system: `You are an expert human translator localizing a settlement-services web app for newcomers, immigrants, and refugees in Calgary, Canada. The app connects people to housing, jobs, healthcare, childcare, legal aid, and community resources.

Translate each numbered English string into ${llmLabel}.

Rules:
- Translate for MEANING and NATURAL PHRASING, never literal word-for-word. A native speaker reading your translation should feel it was written originally in that language, not machine-translated.
- Keep the tone warm, clear, and simple — many readers are newcomers who may not be fluent readers even in their own first language. Prefer plain, common words over formal/literary vocabulary.
- Preserve the intent of UI labels, buttons, and short phrases exactly — do not add or remove information.
- NEVER translate: organization/business proper names, phone numbers, email addresses, URLs, dollar amounts, dates, or numeric codes. Copy those through unchanged.
- Preserve any punctuation that conveys UI meaning (e.g. "?", "→", "...").
- Return EVERY input index exactly once, with no extra commentary.`,
      prompt: numbered,
      output: Output.object({ schema: BatchSchema }),
      temperature: 0.2,
      abortSignal: AbortSignal.timeout(25000),
    });

    const map = new Map<number, string>();
    for (const row of output.translations) {
      if (typeof row.i === "number" && typeof row.t === "string" && row.t.trim()) {
        map.set(row.i, row.t);
      }
    }
    return map;
  } catch (err) {
    console.error("[translate] Gemini batch error:", err instanceof Error ? err.message : err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// FALLBACK ENGINE — unofficial Google Translate endpoint (gtx client).
// Only used per-string when Gemini fails outright (rare: outage / rate
// limit). Literal but always available, no API key required.
// ---------------------------------------------------------------------------
// Returns null on a GENUINE failure (network error, timeout, non-OK response,
// unparseable body) so the caller can tell "this really failed, don't cache
// it" apart from "this legitimately translates to the same text" (proper
// nouns, numbers, units like "24/7", "km/h", "Askonnect"). Silently
// returning the English source on failure — the previous behavior — gets
// persisted to the Supabase cache as if it were a real translation, which
// permanently poisons that string for that language: every future request
// serves the English echo as a "cache hit" and never retries translation.
async function translateOneFallback(text: string, targetLang: string): Promise<string | null> {
  if (!text.trim()) return text;
  try {
    const url = new URL("https://translate.googleapis.com/translate_a/single");
    url.searchParams.set("client", "gtx");
    url.searchParams.set("sl", "en");
    url.searchParams.set("tl", targetLang);
    url.searchParams.set("dt", "t");
    url.searchParams.set("q", text);

    const res = await fetch(url.toString(), {
      headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return null;

    const data = await res.json();
    const translated = data?.[0]?.map((chunk: [string]) => chunk?.[0] ?? "").join("");
    // An empty/missing result from a 200 response is still a failure to
    // extract a translation, not a legitimate "translates to nothing".
    return translated || null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Translate a full list of cache-miss strings: try Gemini as ONE batch call
// (chunked at 40 strings to keep prompts small and indices easy to verify),
// falling back per-string to the literal engine only for anything Gemini
// didn't return.
// ---------------------------------------------------------------------------
const BATCH_CHUNK_SIZE = 40;

// A `null` entry means BOTH engines genuinely failed for that string — the
// caller must not cache it (see POST handler) so it gets retried on the
// next request instead of being permanently poisoned as an English echo.
async function translateMisses(
  missTexts: string[],
  target: Language,
  fallbackLangCode: string
): Promise<(string | null)[]> {
  const meta = getLangMeta(target);
  const results = new Array<string | null>(missTexts.length);
  const stillMissing: number[] = [];

  // Chunk into batches so prompts stay small and index-verification stays cheap.
  const chunks: { offset: number; texts: string[] }[] = [];
  for (let i = 0; i < missTexts.length; i += BATCH_CHUNK_SIZE) {
    chunks.push({ offset: i, texts: missTexts.slice(i, i + BATCH_CHUNK_SIZE) });
  }

  await Promise.all(
    chunks.map(async ({ offset, texts }) => {
      const map = await translateBatchWithGemini(texts, meta.llmLabel);
      texts.forEach((text, localIdx) => {
        const globalIdx = offset + localIdx;
        const hit = map?.get(localIdx);
        if (hit) {
          results[globalIdx] = hit;
        } else {
          stillMissing.push(globalIdx);
        }
      });
    })
  );

  // Anything Gemini didn't cover (outage, malformed output, dropped index)
  // gets the literal fallback engine so the user never sees English-only gaps.
  if (stillMissing.length > 0) {
    console.warn(
      `[translate] ${stillMissing.length}/${missTexts.length} strings fell back to literal engine for ${target}`
    );
    const fallbacks = await Promise.all(
      stillMissing.map((idx) => translateOneFallback(missTexts[idx], fallbackLangCode))
    );
    stillMissing.forEach((idx, i) => {
      results[idx] = fallbacks[i];
    });
  }

  return results;
}

// ---------------------------------------------------------------------------
// POST /api/translate
// Body:    { texts: string[], target: Language }
// Returns: { translations: string[], ok: boolean, fromCache: number }
//
// Flow:
//  1. Bulk-read Supabase cache for ALL requested strings (single query)
//  2. Translate ONLY cache misses via Gemini (contextual, batched, parallel)
//  3. Bulk-upsert new translations back to Supabase
//  4. Return ordered result with HTTP cache headers
//
// At 1,000 users/hour requesting the same 11 languages:
//  - Step 1 serves 100% of requests from DB once warmed up
//  - Steps 2-3 run only for brand-new strings (extremely rare)
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  let body: { texts?: string[]; target?: Language };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { translations: [], ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { texts, target } = body;

  if (!Array.isArray(texts) || texts.length === 0) {
    return NextResponse.json(
      { translations: [], ok: true, fromCache: 0 },
      {
        headers: {
          "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
        },
      }
    );
  }

  // English — return immediately, no DB needed.
  if (!target || target === "en") {
    return NextResponse.json(
      { translations: texts, ok: true, fromCache: texts.length },
      {
        headers: {
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      }
    );
  }

  const meta = getLangMeta(target);
  const langCode = meta.googleCode ?? (target as string);

  if (!langCode) {
    return NextResponse.json({
      translations: texts,
      ok: false,
      error: "Unknown language code",
    });
  }

  try {
    const supabase = getSupabase();

    // 1. Compute hashes for all strings
    const hashes = texts.map(hashText);

    // 2. Single bulk read — fetch all cached translations at once
    const { data: cachedRows, error: cacheErr } = await supabase
      .from("translation_cache")
      .select("source_hash, translated")
      .eq("lang", target)
      .in("source_hash", hashes);

    if (cacheErr) {
      console.error("[translate] Supabase read error:", cacheErr.message);
    }

    const cacheMap = new Map<string, string>();
    (cachedRows ?? []).forEach((row) =>
      cacheMap.set(row.source_hash, row.translated)
    );

    // 3. Identify cache misses
    const missIndexes: number[] = [];
    const missTexts: string[] = [];
    texts.forEach((text, i) => {
      if (!cacheMap.has(hashes[i]) && text.trim()) {
        missIndexes.push(i);
        missTexts.push(text);
      }
    });

    // 4. Translate all misses via Gemini (contextual, batched) with
    //    literal-engine fallback for anything Gemini couldn't cover.
    if (missTexts.length > 0) {
      const freshTranslations = await translateMisses(missTexts, target, langCode);

      // 5. Bulk-upsert only GENUINE successes. A `null` entry means both
      // engines failed outright — persisting that as a row (previously
      // falling back to the English source text) would permanently poison
      // the cache: every future request would "hit" that row and serve
      // English forever, with no way to ever retry. Skipping the upsert
      // for failures leaves them as real cache misses next time.
      const rows = missTexts
        .map((text, i) => ({
          lang: target,
          source_hash: hashes[missIndexes[i]],
          source_text: text,
          translated: freshTranslations[i],
        }))
        .filter((row): row is { lang: Language; source_hash: string; source_text: string; translated: string } =>
          typeof row.translated === "string" && row.translated.length > 0
        );

      if (rows.length > 0) {
        const { error: insertErr } = await supabase
          .from("translation_cache")
          .upsert(rows, { onConflict: "lang,source_hash" });

        if (insertErr) {
          console.error("[translate] Supabase write error:", insertErr.message);
        }
      }

      // Merge fresh translations into the cache map — only real ones.
      // Failures stay absent from cacheMap, so step 6 below falls back to
      // the English source text for THIS response only, without caching it.
      missIndexes.forEach((originalIdx, missIdx) => {
        const tx = freshTranslations[missIdx];
        if (tx) cacheMap.set(hashes[originalIdx], tx);
      });
    }

    // 6. Assemble final ordered result
    const translations = texts.map((text, i) => cacheMap.get(hashes[i]) ?? text);
    const fromCache = texts.length - missTexts.length;

    const response = NextResponse.json({
      translations,
      ok: true,
      fromCache,
      total: texts.length,
    });

    // Cache fully-served responses at the CDN layer for 24 hours.
    // Partial (miss) responses skip CDN caching since they contain new strings.
    if (missTexts.length === 0) {
      response.headers.set(
        "Cache-Control",
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
      );
    } else {
      response.headers.set("Cache-Control", "no-store");
    }

    return response;
  } catch (err) {
    console.error("[translate] Unexpected error:", err);
    // Graceful degradation — return original English text rather than an error page
    return NextResponse.json(
      { translations: texts, ok: false, error: "Translation service error" },
      { status: 200 } // 200 so the client uses the fallback English text
    );
  }
}

// ---------------------------------------------------------------------------
// GET /api/translate — health check + cache stats
// ---------------------------------------------------------------------------
export async function GET() {
  try {
    const supabase = getSupabase();

    // Per-language counts via a grouped count query — NOT a row select,
    // which silently truncates at Supabase's default 1000-row page size
    // and would under-report cache stats once any language exceeds that.
    const meta = await Promise.all(
      LANGUAGES.filter((l) => l.code !== "en").map(async (l) => {
        const { count } = await supabase
          .from("translation_cache")
          .select("*", { count: "exact", head: true })
          .eq("lang", l.code);
        return [l.code, count ?? 0] as const;
      })
    );
    const stats: Record<string, number> = Object.fromEntries(meta);

    // Quick engine test — direct Gemini call, independent of AI Gateway.
    const testMap = await translateBatchWithGemini(["Hello", "Find nearby resources"], "French");

    return NextResponse.json({
      status: "ok",
      engine: `${TRANSLATE_MODEL_ID} (direct Gemini API, contextual translation) with literal gtx fallback`,
      geminiKeyConfigured: Boolean(process.env.GEMINI_API_KEY),
      cacheStats: stats,
      totalCached: Object.values(stats).reduce((a, b) => a + b, 0),
      engineTest: testMap && testMap.size > 0 ? Object.fromEntries(testMap) : "Gemini engine unreachable — check GEMINI_API_KEY and server logs",
    });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: String(err) },
      { status: 502 }
    );
  }
}
