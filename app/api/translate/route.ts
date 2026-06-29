import { NextRequest, NextResponse } from "next/server";
import { getLangMeta } from "@/lib/languages";
import type { Language } from "@/lib/types";
import { createClient } from "@supabase/supabase-js";

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
// Translate via the unofficial Google Translate endpoint (gtx client).
// No API key required. Used by thousands of open-source tools.
// With the Supabase cache this is called at most ONCE per unique string
// per language — ever. After that Supabase serves everyone for free.
// ---------------------------------------------------------------------------
async function translateOne(text: string, targetLang: string): Promise<string> {
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

    if (!res.ok) return text;

    const data = await res.json();
    const translated =
      data?.[0]?.map((chunk: [string]) => chunk?.[0] ?? "").join("") ?? text;
    return translated || text;
  } catch {
    return text;
  }
}

// ---------------------------------------------------------------------------
// POST /api/translate
// Body:    { texts: string[], target: Language }
// Returns: { translations: string[], ok: boolean, fromCache: number }
//
// Flow:
//  1. Bulk-read Supabase cache for ALL requested strings (single query)
//  2. Translate ONLY cache misses — in PARALLEL (Promise.all, not a for-loop)
//  3. Bulk-upsert new translations back to Supabase
//  4. Return ordered result with HTTP cache headers
//
// At 1,000 users/hour requesting the same 11 languages:
//  - Step 1 serves 100 % of requests from DB once warmed up
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

    // 4. Translate all misses IN PARALLEL — not a sequential for-loop
    if (missTexts.length > 0) {
      const freshTranslations = await Promise.all(
        missTexts.map((text) => translateOne(text, langCode))
      );

      // 5. Bulk-upsert all new translations in one DB call
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

      // Merge fresh translations into the cache map
      missIndexes.forEach((originalIdx, missIdx) => {
        cacheMap.set(hashes[originalIdx], freshTranslations[missIdx]);
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

    const { data } = await supabase
      .from("translation_cache")
      .select("lang, source_hash")
      .order("lang");

    const stats: Record<string, number> = {};
    (data ?? []).forEach((row) => {
      stats[row.lang] = (stats[row.lang] ?? 0) + 1;
    });

    // Quick engine test
    const testResult = await translateOne("Hello", "fr");

    return NextResponse.json({
      status: "ok",
      engine: "Google gtx (free, no API key)",
      cacheStats: stats,
      totalCached: Object.values(stats).reduce((a, b) => a + b, 0),
      engineTest: { input: "Hello", fr: testResult },
    });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: String(err) },
      { status: 502 }
    );
  }
}
