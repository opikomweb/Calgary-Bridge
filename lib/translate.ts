"use client";

import { useEffect, useState, useRef } from "react";
import type { Language } from "./types";

/**
 * In-memory translation cache:  Map<`${lang}:${text}`, translatedText>
 * Shared across all hook instances in the same browser session.
 */
const cache = new Map<string, string>();

/** Requests in-flight — prevents duplicate API calls for the same key */
const pending = new Map<string, Promise<string>>();

function cacheKey(lang: Language, text: string) {
  return `${lang}:${text}`;
}

/**
 * Translate a batch of English strings to the target language.
 * Results are cached in-memory for the session.
 */
export async function translateBatch(
  texts: string[],
  target: Language
): Promise<string[]> {
  if (target === "en" || !texts.length) return texts;

  // Split into cached vs. uncached
  const uncached: string[] = [];
  const uncachedIdx: number[] = [];

  texts.forEach((t, i) => {
    if (!cache.has(cacheKey(target, t))) {
      uncached.push(t);
      uncachedIdx.push(i);
    }
  });

  if (uncached.length > 0) {
    // De-duplicate in-flight requests
    const batchKey = `${target}:${uncached.join("|||")}`;
    if (!pending.has(batchKey)) {
      const p = fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: uncached, target }),
      })
        .then((r) => r.json())
        .then((data: { translations: string[] }) => {
          // Populate cache
          data.translations.forEach((t, i) => {
            cache.set(cacheKey(target, uncached[i]), t);
          });
          pending.delete(batchKey);
          return batchKey;
        })
        .catch(() => {
          pending.delete(batchKey);
          return batchKey;
        });
      pending.set(batchKey, p);
    }
    await pending.get(batchKey);
  }

  return texts.map((t) => cache.get(cacheKey(target, t)) ?? t);
}

/**
 * React hook — translates a single English string reactively.
 * While translating shows the English fallback (no flash of missing text).
 *
 * @example
 *   const title = useTranslation(resource.title.en, activeLanguage);
 */
export function useTranslation(
  sourceEn: string,
  target: Language
): string {
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

    // Show English while translating
    if (
      prevTarget.current !== target ||
      prevSource.current !== sourceEn
    ) {
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
 * (no API call). Otherwise falls back to translating the English value.
 *
 * This preserves all the hand-crafted translations in calgary-resources.ts
 * while seamlessly extending to the new languages.
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
  }, [target, record.en, needsTranslation]);

  return translated;
}
