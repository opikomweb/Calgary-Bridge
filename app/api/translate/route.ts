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
    // No key configured — return originals so the app still works
    return NextResponse.json({ translations: texts });
  }

  const meta = getLangMeta(target);
  const googleTarget = meta.googleCode;

  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    const body = {
      q: texts,
      source: "en",
      target: googleTarget,
      format: "text",
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[translate] Google API error:", res.status, err);
      return NextResponse.json({ translations: texts });
    }

    const data = (await res.json()) as {
      data: { translations: { translatedText: string }[] };
    };

    const translations = data.data.translations.map((t) => t.translatedText);
    return NextResponse.json({ translations });
  } catch (err) {
    console.error("[translate] fetch error:", err);
    return NextResponse.json({ translations: texts });
  }
}
