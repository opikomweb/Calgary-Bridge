'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from 'react';
import type { Language } from '@/lib/types';

// ─── NODES THAT MUST NEVER BE TRANSLATED ────────────────────────────────────
// INPUT / TEXTAREA are NOT here — we still want their placeholder/aria-label
// attributes translated. We skip their TEXT NODES separately in the walker.
const SKIP_TAGS = new Set([
  'SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE', 'KBD', 'SAMP', 'VAR',
  'MATH', 'SVG',
]);

// Tags whose TEXT NODES we skip (but still collect their attributes)
const SKIP_TEXT_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

const SKIP_CLASSES = ['notranslate', 'no-translate', 'konnect-brand'];

// ─── ATTRIBUTES TO TRANSLATE ─────────────────────────────────────────────────
const TRANSLATABLE_ATTRS = [
  'placeholder', 'aria-label', 'aria-placeholder', 'aria-description',
  'title', 'alt', 'data-tooltip', 'data-label',
];

// ─── TRANSLATION CACHE ───────────────────────────────────────────────────────
const cache = new Map<string, string>(); // key: `${lang}::${text}` → translated

// ─── BATCH TRANSLATE VIA OUR SERVER ROUTE ────────────────────────────────────
// We route through /api/translate to keep the Google API key server-side.
async function batchTranslate(
  texts: string[],
  targetLang: Language
): Promise<string[]> {
  if (!texts.length || targetLang === 'en') return texts;

  const results: string[] = new Array(texts.length);
  const uncachedIndices: number[] = [];
  const uncachedTexts: string[] = [];

  texts.forEach((text, i) => {
    const key = `${targetLang}::${text}`;
    if (cache.has(key)) {
      results[i] = cache.get(key)!;
    } else {
      uncachedIndices.push(i);
      uncachedTexts.push(text);
    }
  });

  if (!uncachedTexts.length) return results;

  const CHUNK_SIZE = 100;
  const allTranslated: string[] = [];

  for (let i = 0; i < uncachedTexts.length; i += CHUNK_SIZE) {
    const chunk = uncachedTexts.slice(i, i + CHUNK_SIZE);
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts: chunk, target: targetLang }),
      });
      const data: { translations: string[]; ok: boolean } = await res.json();
      const translated = data?.translations ?? chunk;
      allTranslated.push(...translated);
    } catch {
      allTranslated.push(...chunk);
    }
  }

  uncachedIndices.forEach((originalIndex, j) => {
    const translated = allTranslated[j] ?? texts[originalIndex];
    cache.set(`${targetLang}::${texts[originalIndex]}`, translated);
    results[originalIndex] = translated;
  });

  return results;
}

// ─── DOM WALKER ───────────────────────────────────────────────────────────────
function collectTranslatableNodes(root: Element | Document): {
  textNodes: Text[];
  attrNodes: { el: Element; attr: string; original: string }[];
} {
  const textNodes: Text[] = [];
  const attrNodes: { el: Element; attr: string; original: string }[] = [];

  const walker = document.createTreeWalker(
    root as Node,
    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
    {
      acceptNode(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as Element;
          if (SKIP_TAGS.has(el.tagName)) return NodeFilter.FILTER_REJECT;
          if (SKIP_CLASSES.some((c) => el.classList.contains(c))) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_SKIP;
        }
        if (node.nodeType === Node.TEXT_NODE) {
          const parent = (node as Text).parentElement;
          // Skip text nodes inside input/textarea/select — only attrs matter there
          if (parent && SKIP_TEXT_TAGS.has(parent.tagName)) return NodeFilter.FILTER_SKIP;
          const text = (node as Text).nodeValue?.trim();
          if (text && text.length > 1) return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      },
    }
  );

  let node = walker.nextNode();
  while (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      textNodes.push(node as Text);
    }
    node = walker.nextNode();
  }

  const allElements = (root as Element).querySelectorAll?.('*') ?? [];
  allElements.forEach((el) => {
    // SKIP_TAGS (script/style/svg etc) — never translate
    if (SKIP_TAGS.has(el.tagName)) return;
    // SKIP_TEXT_TAGS (input/textarea/select) — translate attributes but not text
    // So we do NOT skip them here for attribute collection
    if (SKIP_CLASSES.some((c) => el.classList.contains(c))) return;
    TRANSLATABLE_ATTRS.forEach((attr) => {
      const val = el.getAttribute(attr);
      if (val && val.trim().length > 1) {
        attrNodes.push({ el, attr, original: val });
      }
    });
  });

  return { textNodes, attrNodes };
}

// ─── CONTEXT ─────────────────────────────────────────────────────────────────
interface TranslationContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  isTranslating: boolean;
}

const TranslationContext = createContext<TranslationContextValue>({
  language: 'en',
  setLanguage: () => {},
  isTranslating: false,
});

export const useDOMTranslation = () => useContext(TranslationContext);

// ─── PROVIDER ─────────────────────────────────────────────────────────────────
export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const observerRef = useRef<MutationObserver | null>(null);
  const queueRef = useRef<Set<Element>>(new Set());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeLanguageRef = useRef<Language>('en');

  // ── TRANSLATE A SUBTREE ──────────────────────────────────────────────────
  const translateSubtree = useCallback(async (root: Element, lang: Language) => {
    if (lang === 'en') return;
    const { textNodes, attrNodes } = collectTranslatableNodes(root);

    const allTexts = [
      ...textNodes.map((n) => n.nodeValue ?? ''),
      ...attrNodes.map((a) => a.original),
    ].filter((t) => t.trim().length > 1);

    if (!allTexts.length) return;

    const translated = await batchTranslate(allTexts, lang);

    let i = 0;
    textNodes.forEach((node) => {
      const original = node.nodeValue ?? '';
      if (original.trim().length > 1) {
        node.nodeValue = translated[i++] ?? original;
      }
    });
    attrNodes.forEach(({ el, attr }) => {
      el.setAttribute(attr, translated[i++] ?? el.getAttribute(attr) ?? '');
    });
  }, []);

  // ── FULL PAGE TRANSLATION ────────────────────────────────────────────────
  const translateFullPage = useCallback(async (lang: Language) => {
    if (lang === 'en') {
      window.location.reload();
      return;
    }

    setIsTranslating(true);

    // Set lang + dir on <html> for RTL support (Arabic, Urdu, Farsi)
    const RTL_LANGS: Language[] = ['ar'];
    // Also check the LANGUAGES meta for rtl flag
    const langMeta = (await import('@/lib/languages')).getLangMeta(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = (RTL_LANGS.includes(lang) || langMeta?.rtl) ? 'rtl' : 'ltr';

    await translateSubtree(document.body, lang);

    setIsTranslating(false);
  }, [translateSubtree]);

  // ── MUTATION OBSERVER ────────────────────────────────────────────────────
  const setupObserver = useCallback((lang: Language) => {
    observerRef.current?.disconnect();
    if (lang === 'en') return;

    observerRef.current = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            queueRef.current.add(node as Element);
          }
        });
        if (
          mutation.type === 'characterData' &&
          mutation.target.nodeType === Node.TEXT_NODE
        ) {
          const parent = mutation.target.parentElement;
          if (parent) queueRef.current.add(parent);
        }
      });

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        const nodes = Array.from(queueRef.current);
        queueRef.current.clear();
        for (const node of nodes) {
          await translateSubtree(node, activeLanguageRef.current);
        }
      }, 50);
    });

    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: TRANSLATABLE_ATTRS,
    });
  }, [translateSubtree]);

  // ── LANGUAGE CHANGE HANDLER ──────────────────────────────────────────────
  const setLanguage = useCallback(async (lang: Language) => {
    activeLanguageRef.current = lang;
    setLanguageState(lang);
    // Persist in cookie (1 year)
    document.cookie = `ck_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    setupObserver(lang);
    await translateFullPage(lang);
  }, [translateFullPage, setupObserver]);

  // ── RESTORE FROM COOKIE ON MOUNT ─────────────────────────────────────────
  useEffect(() => {
    const saved = document.cookie
      .split('; ')
      .find((c) => c.startsWith('ck_lang='))
      ?.split('=')[1] as Language | undefined;
    if (saved && saved !== 'en') {
      setLanguage(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── CLEANUP ───────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, isTranslating }}>
      {/* Slim progress bar at top while translating */}
      {isTranslating && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            zIndex: 99999,
            background: 'linear-gradient(90deg, #1D4ED8 0%, #E1251B 50%, #1D4ED8 100%)',
            backgroundSize: '200% 100%',
            animation: 'ck-translating-bar 1.2s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
      )}
      {children}
    </TranslationContext.Provider>
  );
}
