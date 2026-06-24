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

export function registerStrings(...strings: string[]) {
  for (const s of strings) if (s.trim()) registeredStrings.add(s.trim());
}

// ---------------------------------------------------------------------------
// Helper: Fix common translation API issues (e.g., malformed Spanish punctuation)
// ---------------------------------------------------------------------------
function cleanTranslation(text: string, lang: Language): string {
  if (lang !== "es") return text;
  
  // Fix Spanish question marks that appear mid-sentence or in wrong position
  // Example: "Qué es lo que tú ¿necesidad?" → "¿Qué es lo que tú necesidad?"
  if (text.includes("¿") && !text.startsWith("¿")) {
    // Move opening question mark to the beginning
    const withoutQMarks = text.replace(/¿/g, "");
    if (withoutQMarks.includes("?")) {
      // Ensure proper Spanish question mark format: ¿...?
      const cleanedContent = withoutQMarks.replace(/\?/g, "");
      return `¿${cleanedContent}?`;
    }
  }
  
  // Fix double question marks
  if (text.includes("¿?") || text.includes("?¿")) {
    return text.replace(/¿\?|?\¿/g, "?");
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

  useEffect(() => {
    // Apply RTL/LTR on <html> whenever language changes
    const meta = getLangMeta(activeLanguage);
    document.documentElement.lang = meta.googleCode;
    document.documentElement.dir = meta.rtl ? "rtl" : "ltr";

    if (activeLanguage === "en") {
      setTxMap(new Map());
      setLoading(false);
      return;
    }

    const run = ++runRef.current;

    async function translate() {
      setLoading(true);

      const cached = loadCache(activeLanguage);

      // Step 1: populate txMap from cache immediately for instant partial render
      if (cached.size > 0) {
        setTxMap(new Map(cached));
      }

      // Step 2: find strings not yet in cache
      const all = Array.from(registeredStrings);
      const missing = all.filter((s) => !cached.has(s));

      if (missing.length > 0) {
        const fresh = await fetchTranslations(missing, activeLanguage);
        if (run !== runRef.current) return; // language changed mid-flight

        fresh.forEach((v, k) => cached.set(k, v));
        persistCache(activeLanguage, cached);
        setTxMap(new Map(cached));
      }

      if (run === runRef.current) setLoading(false);
    }

    translate();
  }, [activeLanguage]);

  const value = useMemo<TranslationContextValue>(
    () => ({
      t: (english: string) => {
        if (activeLanguage === "en") return english;
        return txMap.get(english.trim()) ?? english;
      },
      loading,
      language: activeLanguage,
    }),
    [txMap, loading, activeLanguage],
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
