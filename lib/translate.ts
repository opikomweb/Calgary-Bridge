"use client";

import { useEffect, useState, useRef } from "react";
import type { Language } from "./types";

/**
 * In-memory translation cache:  Map<`${lang}:${text}`, translatedText>
 * Shared across all hook instances in the same browser session.
 */
const cache = new Map<string, string>();

/** Requests in-flight — prevents duplicate API calls for the same key */
const pending = new Map<string, Promise<void>>();

function cacheKey(lang: Language, text: string) {
  return `${lang}:${text}`;
}

/**
 * Translate a batch of English strings to the target language.
 * Results are cached in-memory for the session.
 * Always resolves (never rejects) — falls back to English on any error.
 */
export async function translateBatch(
  texts: string[],
  target: Language
): Promise<string[]> {
  if (target === "en" || !texts.length) return texts;

  // Identify which strings aren't cached yet
  const uncached: string[] = [];
  const uncachedIdx: number[] = [];

  texts.forEach((t, i) => {
    if (t && !cache.has(cacheKey(target, t))) {
      uncached.push(t);
      uncachedIdx.push(i);
    }
  });

  if (uncached.length > 0) {
    // Build a deduplicated batch key
    const batchKey = `${target}:${uncached.join("|||")}`;

    if (!pending.has(batchKey)) {
      const p = (async () => {
        try {
          const res = await fetch("/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ texts: uncached, target }),
          });

          if (!res.ok) {
            console.error("[translate] /api/translate returned", res.status);
            // Fall back: cache originals so we don't retry endlessly
            uncached.forEach((t) => cache.set(cacheKey(target, t), t));
            return;
          }

          const data: { translations: string[]; ok: boolean } = await res.json();

          if (!data?.translations || data.translations.length !== uncached.length) {
            console.error("[translate] Unexpected response shape:", data);
            uncached.forEach((t) => cache.set(cacheKey(target, t), t));
            return;
          }

          data.translations.forEach((translated, i) => {
            // Only cache non-empty, different-from-source results
            const original = uncached[i];
            cache.set(cacheKey(target, original), translated || original);
          });
        } catch (err) {
          console.error("[translate] fetch error:", err);
          // Cache originals as fallback
          uncached.forEach((t) => cache.set(cacheKey(target, t), t));
        } finally {
          pending.delete(batchKey);
        }
      })();

      pending.set(batchKey, p);
    }

    await pending.get(batchKey);
  }

  // Return from cache (or original if cache still missing after the await)
  return texts.map((t) => cache.get(cacheKey(target, t)) ?? t);
}

/**
 * React hook — translates a single English string reactively.
 * Shows the English fallback while the translation loads (no flash of missing text).
 */
export function useTranslation(sourceEn: string, target: Language): string {
  const [translated, setTranslated] = useState(sourceEn);
  const prevTarget = useRef<Language>(target);
  const prevSource = useRef(sourceEn);

  useEffect(() => {
    if (target === "en") {
      setTranslated(sourceEn);
      return;
    }

    const key = cacheKey(target, sourceEn);
    if (cache.has(key)) {
      setTranslated(cache.get(key)!);
      return;
    }

    // Reset to English while fetching if language or source changed
    if (prevTarget.current !== target || prevSource.current !== sourceEn) {
      setTranslated(sourceEn);
    }
    prevTarget.current = target;
    prevSource.current = sourceEn;

    let cancelled = false;
    translateBatch([sourceEn], target).then(() => {
      if (!cancelled) {
        setTranslated(cache.get(cacheKey(target, sourceEn)) ?? sourceEn);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [sourceEn, target]);

  return translated;
}

/**
 * React hook — translates a Record<Language, string> field.
 * If the record already has a translation for the target, returns it directly
 * (no API call). Otherwise falls back to translating the English value via
 * the Google Translate API.
 */
export function useTranslationRecord(
  record: Partial<Record<Language, string>> & { en: string },
  target: Language
): string {
  const existingTranslation = record[target];
  const needsTranslation = !existingTranslation;

  const [translated, setTranslated] = useState(
    existingTranslation ?? record.en
  );

  useEffect(() => {
    if (!needsTranslation) {
      setTranslated(record[target]!);
      return;
    }

    if (target === "en") {
      setTranslated(record.en);
      return;
    }

    const key = cacheKey(target, record.en);
    if (cache.has(key)) {
      setTranslated(cache.get(key)!);
      return;
    }

    setTranslated(record.en); // show English while loading

    let cancelled = false;
    translateBatch([record.en], target).then(() => {
      if (!cancelled) {
        setTranslated(cache.get(cacheKey(target, record.en)) ?? record.en);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [target, record.en, needsTranslation, record]);

  return translated;
}
