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
// Batch API call — with AbortSignal so stale requests are cancelled on
// rapid language switches (prevents race conditions and wasted bandwidth).
// ---------------------------------------------------------------------------
async function fetchTranslations(
  strings: string[],
  lang: Language,
  signal?: AbortSignal,
): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  if (!strings.length || lang === "en") return map;
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts: strings, target: lang }),
      signal,
    });
    if (!res.ok) return map;
    const data = (await res.json()) as { translations: string[] };
    strings.forEach((s, i) => {
      const tx = data.translations[i];
      if (tx && tx !== s) map.set(s, tx);
    });
  } catch (err) {
    // AbortError is expected on language switch — don't log it
    if (err instanceof Error && err.name !== "AbortError") {
      console.error("[translation] fetch error:", err.message);
    }
  }
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

  // Read localStorage synchronously on first render so cached translations
  // are available immediately — no waiting for a useEffect tick.
  // Guard against SSR (no localStorage in Node) with typeof check.
  const [txMap, setTxMap] = useState<Map<string, string>>(() => {
    if (activeLanguage === "en" || typeof window === "undefined") return new Map();
    return loadCache(activeLanguage);
  });
  const [loading, setLoading] = useState(false);
  const runRef = useRef(0);
  const txMapRef = useRef(txMap);
  txMapRef.current = txMap;
  // AbortController ref — cancelled whenever language changes to kill stale fetches.
  const abortRef = useRef<AbortController | null>(null);
  // Keep a ref of the current language so registry-subscription callbacks
  // always read the live value even if the effect closure is stale.
  const activeLangRef = useRef(activeLanguage);
  activeLangRef.current = activeLanguage;

  // Strings discovered during render that aren't in the current txMap yet.
  // Collected per-render and flushed in one batched API call.
  const pendingRef = useRef<Set<string>>(new Set());
  const flushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleFlush = React.useCallback((lang: Language) => {
    if (flushTimerRef.current) return;
    // 80ms debounce — collapses an entire render tree's worth of t() misses
    // into a single fetch. Short enough to feel instant.
    flushTimerRef.current = setTimeout(() => {
      flushTimerRef.current = null;
      const pending = Array.from(pendingRef.current).filter(
        (s) => !txMapRef.current.has(s),
      );
      if (!pending.length) return;
      const run = runRef.current;
      // Create a new AbortController for this fetch, cancel any previous one
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);
      fetchTranslations(pending, lang, controller.signal).then((fresh) => {
        if (run !== runRef.current) return;
        pending.forEach((s) => pendingRef.current.delete(s));
        if (fresh.size > 0) {
          const merged = new Map(txMapRef.current);
          fresh.forEach((v, k) => merged.set(k, v));
          persistCache(lang, merged);
          setTxMap(merged);
        }
        setLoading(false);
      });
    }, 80);
  }, []);

  // Language switch: apply direction, seed from cache instantly, then fetch missing.
  useEffect(() => {
    const meta = getLangMeta(activeLanguage);
    document.documentElement.lang = meta.googleCode;
    document.documentElement.dir = meta.rtl ? "rtl" : "ltr";

    // Cancel any in-flight debounce and fetch from the previous language.
    if (flushTimerRef.current) {
      clearTimeout(flushTimerRef.current);
      flushTimerRef.current = null;
    }
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    pendingRef.current.clear();
    runRef.current++;

    if (activeLanguage === "en") {
      setTxMap(new Map());
      setLoading(false);
      return;
    }

    // Apply cache synchronously to avoid a blank flash.
    const cached = loadCache(activeLanguage);
    setTxMap(new Map(cached));

    // Queue any registered strings not yet in cache for immediate fetch.
    const lang = activeLanguage;
    registeredStrings.forEach((s) => {
      if (!cached.has(s)) pendingRef.current.add(s);
    });
    if (pendingRef.current.size > 0) scheduleFlush(lang);
  }, [activeLanguage, scheduleFlush]);

  // When a lazy-loaded chunk registers new strings, queue them too.
  // Use activeLangRef so this callback always reads the live language value,
  // even if the outer effect closure has gone stale (e.g. rapid language switches).
  useEffect(() => {
    return subscribeRegistry(() => {
      const lang = activeLangRef.current;
      if (lang === "en") return;
      registeredStrings.forEach((s) => {
        if (!txMapRef.current.has(s)) pendingRef.current.add(s);
      });
      if (pendingRef.current.size > 0) scheduleFlush(lang);
    });
  }, [scheduleFlush]);

  const value = useMemo<TranslationContextValue>(
    () => ({
      t: (english: string) => {
        if (activeLanguage === "en") return english;
        const key = english.trim();
        const hit = txMap.get(key);
        if (hit) return hit;
        // Render-time cache miss — queue and flush.
        if (key) {
          pendingRef.current.add(key);
          scheduleFlush(activeLanguage);
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
