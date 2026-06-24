"use client";

/**
 * TranslationProvider — the single correct solution for whole-page translation.
 *
 * ARCHITECTURE:
 * - One React Context holds a Map<englishString, translatedString> for the active language.
 * - When language changes, ONE batched API call fetches ALL registered strings at once.
 * - Components use `useT(string)` to get the translated version — it reads from context,
 *   so the whole page re-renders simultaneously with correct text (no mixing, no fragments).
 * - localStorage persists each language's cache so repeat visits are instant (no API call).
 * - English always resolves instantly (no API call ever).
 *
 * WHY THIS BEATS DOM-WALKING:
 * - DOM-walking breaks on framer-motion re-renders (text nodes recreated → originals lost)
 * - DOM-walking causes compound translations (Arabic → Chinese because original was lost)
 * - This approach is atomic: the whole page gets new text in one React render cycle.
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAppStore } from "@/lib/store";
import { getLangMeta } from "@/lib/languages";
import type { Language } from "@/lib/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface TranslationContextValue {
  /** Look up a translated string. Falls back to the English source instantly. */
  t: (english: string) => string;
  /** True while an API call is in flight. */
  loading: boolean;
  /** The language this context currently serves. */
  language: Language;
}

// ---------------------------------------------------------------------------
// localStorage-backed per-language cache
// ---------------------------------------------------------------------------
const MEM_CACHE = new Map<Language, Map<string, string>>();

function loadCache(lang: Language): Map<string, string> {
  if (MEM_CACHE.has(lang)) return MEM_CACHE.get(lang)!;
  const map = new Map<string, string>();
  try {
    const raw = localStorage.getItem(`v0tx3_${lang}`);
    if (raw) {
      (JSON.parse(raw) as [string, string][]).forEach(([k, v]) => map.set(k, v));
    }
  } catch { /* quota / SSR */ }
  MEM_CACHE.set(lang, map);
  return map;
}

function persistCache(lang: Language, map: Map<string, string>) {
  try {
    localStorage.setItem(`v0tx3_${lang}`, JSON.stringify(Array.from(map)));
  } catch { /* quota */ }
}

// ---------------------------------------------------------------------------
// String registry — components register their strings before a translate run
// ---------------------------------------------------------------------------
const registeredStrings = new Set<string>();

// Listeners notified whenever NEW strings are registered. The provider
// subscribes so it can translate strings contributed by lazily code-split
// chunks (tabs/footer are next/dynamic with ssr:false — their module-level
// registerStrings only runs when the chunk loads, long after the provider's
// initial fetch). Without this, late-registered strings stay in English.
const registryListeners = new Set<() => void>();

export function registerStrings(...strings: string[]) {
  let added = false;
  for (const s of strings) {
    const t = s.trim();
    if (t && !registeredStrings.has(t)) {
      registeredStrings.add(t);
      added = true;
    }
  }
  if (added) registryListeners.forEach((fn) => fn());
}

function subscribeRegistry(fn: () => void): () => void {
  registryListeners.add(fn);
  return () => {
    registryListeners.delete(fn);
  };
}

// ---------------------------------------------------------------------------
// Helper: Fix common translation API issues (e.g., malformed Spanish punctuation)
// ---------------------------------------------------------------------------
function cleanTranslation(text: string, lang: Language): string {
  if (lang !== "es") return text;

  // If ¿ appears somewhere other than the start, move it to the front.
  // e.g. "Qué es lo que tú ¿necesidad?" → "¿Qué es lo que tú necesidad?"
  if (text.includes("¿") && !text.startsWith("¿")) {
    const stripped = text.split("¿").join("");
    return "¿" + stripped;
  }

  return text;
}

// ---------------------------------------------------------------------------
// Batch API call
// ---------------------------------------------------------------------------
async function fetchTranslations(
  strings: string[],
  lang: Language,
): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  if (!strings.length || lang === "en") return map;
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts: strings, target: lang }),
    });
    if (!res.ok) return map;
    const data = (await res.json()) as { translations: string[] };
    strings.forEach((s, i) => {
      const tx = data.translations[i];
      if (tx && tx !== s) {
        // Clean up any malformed translations before caching
        const cleaned = cleanTranslation(tx, lang);
        map.set(s, cleaned);
      }
    });
  } catch { /* network error — return empty, fallback to English */ }
  return map;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
const TranslationContext = createContext<TranslationContextValue>({
  t: (s) => s,
  loading: false,
  language: "en",
});

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const activeLanguage = useAppStore((s) => s.activeLanguage);
  const [txMap, setTxMap] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(false);
  const runRef = useRef(0);

  // Strings requested via t() that are not yet translated. Captured during
  // render so translation is fully render-driven — immune to registration
  // timing and to module duplication across next/dynamic(ssr:false) chunks.
  const pendingRef = useRef<Set<string>>(new Set());
  const flushScheduledRef = useRef(false);
  const [flushTick, setFlushTick] = useState(0);
  // Keep a ref of the live txMap so the t() closure (recreated each render)
  // and the flush effect always read the freshest translations.
  const txMapRef = useRef(txMap);
  txMapRef.current = txMap;

  const scheduleFlush = React.useCallback(() => {
    if (flushScheduledRef.current) return;
    flushScheduledRef.current = true;
    // Microtask debounce: collapse a whole render's worth of misses into one batch.
    queueMicrotask(() => {
      flushScheduledRef.current = false;
      setFlushTick((n) => n + 1);
    });
  }, []);

  // Language change: set direction, seed from cache, and re-queue everything
  // currently on screen (plus any module-registered strings) for translation.
  useEffect(() => {
    const meta = getLangMeta(activeLanguage);
    document.documentElement.lang = meta.googleCode;
    document.documentElement.dir = meta.rtl ? "rtl" : "ltr";

    runRef.current++;

    if (activeLanguage === "en") {
      pendingRef.current.clear();
      setTxMap(new Map());
      setLoading(false);
      return;
    }

    const cached = loadCache(activeLanguage);
    setTxMap(new Map(cached));

    // Seed pending with any module-registered strings missing from cache so we
    // translate them even before they're rendered (e.g. off-screen tabs).
    registeredStrings.forEach((s) => {
      if (!cached.has(s)) pendingRef.current.add(s);
    });
    if (pendingRef.current.size > 0) scheduleFlush();
  }, [activeLanguage, scheduleFlush]);

  // Whenever new strings get registered by a late-loading chunk, queue them.
  useEffect(() => {
    return subscribeRegistry(() => {
      if (activeLanguage === "en") return;
      const cached = txMapRef.current;
      let added = false;
      registeredStrings.forEach((s) => {
        if (!cached.has(s) && !pendingRef.current.has(s)) {
          pendingRef.current.add(s);
          added = true;
        }
      });
      if (added) scheduleFlush();
    });
  }, [activeLanguage, scheduleFlush]);

  // Flush: translate all pending strings in one batched request.
  useEffect(() => {
    if (activeLanguage === "en") return;
    const pending = Array.from(pendingRef.current).filter(
      (s) => !txMapRef.current.has(s),
    );
    if (pending.length === 0) return;

    const run = runRef.current;
    setLoading(true);

    fetchTranslations(pending, activeLanguage).then((fresh) => {
      if (run !== runRef.current) return; // language changed mid-flight
      pending.forEach((s) => pendingRef.current.delete(s));
      if (fresh.size > 0) {
        const merged = new Map(txMapRef.current);
        fresh.forEach((v, k) => merged.set(k, v));
        persistCache(activeLanguage, merged);
        setTxMap(merged);
      }
      setLoading(false);
    });
  }, [flushTick, activeLanguage]);

  const value = useMemo<TranslationContextValue>(
    () => ({
      t: (english: string) => {
        if (activeLanguage === "en") return english;
        const key = english.trim();
        const hit = txMap.get(key);
        if (hit) return hit;
        // Cache miss — record for the next batched fetch.
        if (key && !pendingRef.current.has(key)) {
          pendingRef.current.add(key);
          scheduleFlush();
        }
        return english;
      },
      loading,
      language: activeLanguage,
    }),
    [txMap, loading, activeLanguage, scheduleFlush],
  );

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/** Translate a single English string reactively. */
export function useT(english: string): string {
  const { t } = useContext(TranslationContext);
  return t(english);
}

/** Translate multiple strings at once (no extra re-renders vs. calling useT N times). */
export function useTranslations<T extends Record<string, string>>(
  strings: T,
): T {
  const { t } = useContext(TranslationContext);
  return useMemo(
    () =>
      Object.fromEntries(
        Object.entries(strings).map(([k, v]) => [k, t(v)]),
      ) as T,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, ...Object.values(strings)],
  );
}

/** Access the full context (t, loading, language). */
export function useTranslationContext() {
  return useContext(TranslationContext);
}

/**
 * Translate a single dynamic string (e.g. resource title from data) that was
 * not pre-registered. Checks the shared per-language cache first; only hits
 * the API on a cache miss. Resolves to English immediately if lang === "en".
 */
export async function translateDynamic(
  text: string,
  lang: Language,
): Promise<string> {
  if (!text.trim() || lang === "en") return text;
  const map = loadCache(lang);
  if (map.has(text)) return map.get(text)!;
  const result = await fetchTranslations([text], lang);
  const tx = result.get(text) ?? text;
  map.set(text, tx);
  persistCache(lang, map);
  return tx;
}
