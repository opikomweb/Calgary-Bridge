import { NextRequest, NextResponse } from "next/server";
import { getLangMeta } from "@/lib/languages";
import type { Language } from "@/lib/types";

/**
 * POST /api/translate
 * Body: { texts: string[], target: Language }
 * Returns: { translations: string[], ok: boolean }
 *
 * Uses the Google Translate v2 REST API (requires GOOGLE_TRANSLATE_API_KEY).
 * Falls back to the source text if the key is missing or the request fails.
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

  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    console.error("[translate] GOOGLE_TRANSLATE_API_KEY is not set");
    return NextResponse.json({ translations: texts, ok: false, error: "API key not configured" });
  }

  const meta = getLangMeta(target);
  const googleTarget = meta.googleCode;

  if (!googleTarget) {
    console.error("[translate] No googleCode for language:", target);
    return NextResponse.json({ translations: texts, ok: false, error: "Unknown language code" });
  }

  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    // Google Translate v2 accepts up to 128 segments per request.
    // Chunk if needed to stay within limits.
    const CHUNK_SIZE = 100;
    const allTranslations: string[] = [];

    for (let i = 0; i < texts.length; i += CHUNK_SIZE) {
      const chunk = texts.slice(i, i + CHUNK_SIZE);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: chunk,
          source: "en",
          target: googleTarget,
          format: "text",
        }),
      });

      const responseText = await res.text();

      if (!res.ok) {
        console.error("[translate] Google API HTTP error:", res.status, responseText.slice(0, 300));
        // Return originals for this chunk so the UI always has content
        allTranslations.push(...chunk);
        continue;
      }

      let data: { data: { translations: { translatedText: string }[] } };
      try {
        data = JSON.parse(responseText);
      } catch {
        console.error("[translate] Failed to parse Google response:", responseText.slice(0, 300));
        allTranslations.push(...chunk);
        continue;
      }

      const chunkTranslations = data?.data?.translations?.map((t) => t.translatedText);
      if (!chunkTranslations || chunkTranslations.length !== chunk.length) {
        console.error("[translate] Unexpected response shape:", responseText.slice(0, 200));
        allTranslations.push(...chunk);
        continue;
      }

      allTranslations.push(...chunkTranslations);
    }

    return NextResponse.json({ translations: allTranslations, ok: true });
  } catch (err) {
    console.error("[translate] fetch error:", err);
    return NextResponse.json({ translations: texts, ok: false, error: String(err) });
  }
}

/** GET /api/translate — health check so you can test the key is working */
export async function GET() {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ status: "error", message: "GOOGLE_TRANSLATE_API_KEY not set" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: ["Hello"], source: "en", target: "fr", format: "text" }),
      }
    );
    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ status: "error", httpStatus: res.status, detail: err.slice(0, 200) }, { status: 502 });
    }
    const data = await res.json();
    const sample = data?.data?.translations?.[0]?.translatedText;
    return NextResponse.json({ status: "ok", sample });
  } catch (err) {
    return NextResponse.json({ status: "error", message: String(err) }, { status: 502 });
  }
}
