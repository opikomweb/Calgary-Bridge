import { NextRequest, NextResponse } from "next/server";
import { getLangMeta } from "@/lib/languages";
import type { Language } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

/**
 * Lightweight stable hash for a string — used as the cache key.
 */
function hashText(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16);
}

/**
 * Translate using the unofficial Google Translate endpoint (gtx client).
 * - No API key required
 * - No hard rate limits for reasonable usage
 * - Same Google quality
 * - Used by thousands of open-source tools
 * With the Supabase cache, this is called at most ONCE per unique string
 * per language — ever. After that, Supabase serves all requests for free.
 */
async function translateWithGoogle(
  texts: string[],
  targetLang: string
): Promise<string[]> {
  const results: string[] = [];

  for (const text of texts) {
    if (!text.trim()) {
      results.push(text);
      continue;
    }
    try {
      const url = new URL("https://translate.googleapis.com/translate_a/single");
      url.searchParams.set("client", "gtx");
      url.searchParams.set("sl", "en");
      url.searchParams.set("tl", targetLang);
      url.searchParams.set("dt", "t");
      url.searchParams.set("q", text);

      const res = await fetch(url.toString(), {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "application/json",
        },
        signal: AbortSignal.timeout(8000),
      });

      if (!res.ok) {
        console.error("[translate] Google gtx HTTP error:", res.status);
        results.push(text);
        continue;
      }

      const data = await res.json();
      // Response format: [[[translatedText, originalText, ...], ...], ...]
      const translated = data?.[0]
        ?.map((chunk: [string]) => chunk?.[0] ?? "")
        .join("") ?? text;

      results.push(translated || text);
    } catch (err) {
      console.error("[translate] Google gtx fetch error:", err);
      results.push(text);
    }
  }

  return results;
}

/**
 * POST /api/translate
 * Body: { texts: string[], target: Language }
 * Returns: { translations: string[], ok: boolean }
 *
 * Flow:
 *  1. Check Supabase translation_cache for each string
 *  2. Only call the translation engine for cache misses
 *  3. Store new translations in Supabase (shared across ALL users forever)
 *  4. Return combined result in original order
 *
 * Cost: $0. The unofficial Google endpoint requires no key.
 * Each unique string is translated exactly once and cached permanently.
 */
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
    return NextResponse.json({ translations: [], ok: true });
  }

  if (!target || target === "en") {
    return NextResponse.json({ translations: texts, ok: true });
  }

  const meta = getLangMeta(target);
  // Use googleCode for the gtx endpoint (standard BCP-47 codes)
  const langCode = meta.googleCode ?? (target as string);

  if (!langCode) {
    return NextResponse.json({
      translations: texts,
      ok: false,
      error: "Unknown language code",
    });
  }

  try {
    const supabase = await createClient();

    // 1. Compute hashes
    const hashes = texts.map(hashText);

    // 2. Bulk-fetch cached translations
    const { data: cached, error: cacheErr } = await supabase
      .from("translation_cache")
      .select("source_hash, translated")
      .eq("lang", target)
      .in("source_hash", hashes);

    if (cacheErr) {
      console.error("[translate] Supabase read error:", cacheErr.message);
    }

    const cacheMap = new Map<string, string>();
    (cached ?? []).forEach((row) => cacheMap.set(row.source_hash, row.translated));

    // 3. Find cache misses
    const missIndexes: number[] = [];
    const missTexts: string[] = [];
    texts.forEach((text, i) => {
      if (!cacheMap.has(hashes[i])) {
        missIndexes.push(i);
        missTexts.push(text);
      }
    });

    // 4. Translate only misses
    if (missTexts.length > 0) {
      const freshTranslations = await translateWithGoogle(missTexts, langCode);

      // 5. Store in Supabase cache
      const rows = missTexts.map((text, i) => ({
        lang: target,
        source_hash: hashes[missIndexes[i]],
        source_text: text,
        translated: freshTranslations[i],
      }));

      const { error: insertErr } = await supabase
        .from("translation_cache")
        .upsert(rows, { onConflict: "lang,source_hash" });

      if (insertErr) {
        console.error("[translate] Supabase write error:", insertErr.message);
      }

      missIndexes.forEach((originalIdx, missIdx) => {
        cacheMap.set(hashes[originalIdx], freshTranslations[missIdx]);
      });
    }

    // 6. Assemble ordered result
    const translations = texts.map((text, i) => cacheMap.get(hashes[i]) ?? text);

    return NextResponse.json({ translations, ok: true });
  } catch (err) {
    console.error("[translate] Unexpected error:", err);
    return NextResponse.json({
      translations: texts,
      ok: false,
      error: String(err),
    });
  }
}

/** GET /api/translate — health check */
export async function GET() {
  try {
    const url = new URL("https://translate.googleapis.com/translate_a/single");
    url.searchParams.set("client", "gtx");
    url.searchParams.set("sl", "en");
    url.searchParams.set("tl", "fr");
    url.searchParams.set("dt", "t");
    url.searchParams.set("q", "Hello Calgary");

    const res = await fetch(url.toString(), {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const data = await res.json();
    const sample = data?.[0]?.map((c: [string]) => c?.[0]).join("") ?? "";
    return NextResponse.json({ status: "ok", engine: "Google gtx (free, no key)", sample });
  } catch (err) {
    return NextResponse.json({ status: "error", message: String(err) }, { status: 502 });
  }
}
