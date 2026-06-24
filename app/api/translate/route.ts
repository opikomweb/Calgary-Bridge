import { NextRequest, NextResponse } from "next/server";
import { getLangMeta } from "@/lib/languages";
import type { Language } from "@/lib/types";

/**
 * POST /api/translate
 * Body: { texts: string[], target: Language }
 * Returns: { translations: string[] }
 *
 * Uses the Google Translate v2 REST API (requires GOOGLE_TRANSLATE_API_KEY).
 * Falls back to the source text if the key is missing or the request fails,
 * so the app always renders something.
 */
// Google Translate v2 allows up to 128 strings per request.
const CHUNK_SIZE = 100;

async function translateChunk(
  chunk: string[],
  googleTarget: string,
  apiKey: string,
): Promise<string[]> {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: chunk, source: "en", target: googleTarget, format: "text" }),
  });
  if (!res.ok) throw new Error(`Google API ${res.status}`);
  const data = (await res.json()) as {
    data: { translations: { translatedText: string }[] };
  };
  return data.data.translations.map((t) => t.translatedText);
}

export async function POST(req: NextRequest) {
  const { texts, target } = (await req.json()) as {
    texts: string[];
    target: Language;
  };

  if (!texts?.length || !target || target === "en") {
    return NextResponse.json({ translations: texts });
  }

  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ translations: texts });
  }

  const meta = getLangMeta(target);
  const googleTarget = meta.googleCode;

  try {
    // Split into chunks to stay within Google's per-request limit.
    const chunks: string[][] = [];
    for (let i = 0; i < texts.length; i += CHUNK_SIZE) {
      chunks.push(texts.slice(i, i + CHUNK_SIZE));
    }

    const results = await Promise.all(
      chunks.map((chunk) => translateChunk(chunk, googleTarget, apiKey)),
    );

    const translations = results.flat();

    // Cache for 1 hour in CDN / shared cache — translations don't change.
    return NextResponse.json(
      { translations },
      { headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" } },
    );
  } catch (err) {
    console.error("[translate] error:", err);
    return NextResponse.json({ translations: texts });
  }
}
