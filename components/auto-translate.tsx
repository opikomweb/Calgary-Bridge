"use client";

/**
 * AutoTranslate — whole-page translation, attribute-anchored approach.
 *
 * KEY FIXES vs. prior WeakMap approach:
 *
 * 1. Originals stored as `data-v0-orig` on the *parent element* — survives
 *    React/framer re-renders that destroy & recreate Text nodes.
 *
 * 2. Collection uses `/\p{L}/u` (all unicode letters) so translated text
 *    (Arabic, Chinese, etc.) is found and can be restored correctly.
 *    Stamping uses `/[a-zA-Z]/` so we only stamp clearly-English nodes the
 *    first time (prevents stamping already-translated text as "original").
 *
 * 3. Always restore → English first before translating to a new language,
 *    eliminating compound translations (Arabic → Chinese, etc.).
 *
 * 4. Per-language localStorage cache: second visit is instant.
 *
 * 5. Single batched API call per language switch.
 */

import { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { getLangMeta } from "@/lib/languages";
import type { Language } from "@/lib/types";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const ORIG_ATTR = "data-v0-orig";
const LANG_ATTR = "data-v0-lang";

const SKIP_TAGS = new Set([
  "SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "KBD", "SAMP",
  "TEXTAREA", "INPUT", "SELECT", "OPTION", "SVG", "PATH",
]);

// ---------------------------------------------------------------------------
// Per-language persistent cache
// ---------------------------------------------------------------------------
const memCache = new Map<Language, Map<string, string>>();

function loadCache(lang: Language): Map<string, string> {
  if (memCache.has(lang)) return memCache.get(lang)!;
  const map = new Map<string, string>();
  try {
    if (typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(`v0tx_${lang}`);
      if (raw) {
        const entries = JSON.parse(raw) as [string, string][];
        for (const [k, v] of entries) map.set(k, v);
      }
    }
  } catch { /* ignore */ }
  memCache.set(lang, map);
  return map;
}

function persistCache(lang: Language, map: Map<string, string>) {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(`v0tx_${lang}`, JSON.stringify(Array.from(map.entries())));
    }
  } catch { /* ignore quota */ }
}

// ---------------------------------------------------------------------------
// DOM helpers
// ---------------------------------------------------------------------------

function shouldSkipEl(el: Element | null): boolean {
  let cur: Element | null = el;
  while (cur) {
    if (cur.nodeType === Node.ELEMENT_NODE) {
      if (SKIP_TAGS.has((cur as Element).tagName)) return true;
      if ((cur as Element).getAttribute("translate") === "no") return true;
      if ((cur as Element).classList.contains("notranslate")) return true;
    }
    cur = cur.parentElement;
  }
  return false;
}

/**
 * Return the concatenated text of ALL direct Text-node children.
 * This is the "payload" we translate for this element.
 */
function getDirectText(el: Element): string {
  let s = "";
  for (const child of el.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) s += child.nodeValue ?? "";
  }
  return s;
}

/**
 * Set the direct-text children to `text`.
 * If the element has multiple Text nodes we put the whole translation into
 * the first non-empty one and blank the rest (they were whitespace/punctuation).
 */
function setDirectText(el: Element, text: string) {
  let first = true;
  for (const child of el.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      if (first && (child.nodeValue ?? "").trim()) {
        child.nodeValue = text;
        first = false;
      } else if (!first) {
        child.nodeValue = "";
      }
    }
  }
}

/**
 * Collect all leaf elements that have translatable direct text.
 *
 * `requireAscii`: when true, only pick up elements whose current text is
 * ASCII-English (used when stamping originals). When false (used when
 * restoring), pick up any element that already has data-v0-orig set.
 */
function collectElements(root: Element, requireAscii: boolean): Element[] {
  const results: Element[] = [];
  const seen = new Set<Element>();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode() as Text | null;
  while (node) {
    const text = node.nodeValue ?? "";
    if (text.trim() && /\p{L}/u.test(text)) {
      const parent = node.parentElement;
      if (parent && !seen.has(parent) && !shouldSkipEl(parent)) {
        if (!requireAscii || /[a-zA-Z]/.test(text)) {
          seen.add(parent);
          results.push(parent);
        }
      }
    }
    node = walker.nextNode() as Text | null;
  }
  // Also include any already-stamped elements that may now hold translated text
  // (their text is non-ASCII so the walker above skips them unless requireAscii=false).
  if (!requireAscii) {
    const stamped = root.querySelectorAll(`[${ORIG_ATTR}]`);
    for (const el of stamped) {
      if (!seen.has(el) && !shouldSkipEl(el)) {
        seen.add(el);
        results.push(el);
      }
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Translate API call
// ---------------------------------------------------------------------------
async function apiBatchTranslate(texts: string[], target: Language): Promise<string[]> {
  if (!texts.length || target === "en") return texts;
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts, target }),
    });
    if (!res.ok) return texts;
    const data = await res.json() as { translations: string[] };
    return data.translations ?? texts;
  } catch {
    return texts;
  }
}

// ---------------------------------------------------------------------------
// Core operations
// ---------------------------------------------------------------------------

/**
 * Stamp `data-v0-orig` on English elements and restore all stamped elements
 * back to their English originals.
 */
function stampAndRestoreAll(applying: React.MutableRefObject<boolean>) {
  applying.current = true;
  // 1. Stamp any un-stamped English nodes.
  const english = collectElements(document.body, true);
  for (const el of english) {
    if (!el.hasAttribute(ORIG_ATTR)) {
      const direct = getDirectText(el).trim();
      if (direct) el.setAttribute(ORIG_ATTR, direct);
    }
  }
  // 2. Restore ALL stamped elements to English.
  const allStamped = document.body.querySelectorAll(`[${ORIG_ATTR}]`);
  for (const el of allStamped) {
    if (shouldSkipEl(el)) continue;
    const orig = el.getAttribute(ORIG_ATTR)!;
    const current = getDirectText(el).trim();
    if (current !== orig) setDirectText(el, orig);
    el.removeAttribute(LANG_ATTR);
  }
  applying.current = false;
}

async function applyTranslation(
  target: Language,
  runId: number,
  runIdRef: React.MutableRefObject<number>,
  applying: React.MutableRefObject<boolean>,
) {
  if (target === "en") return;
  const langMap = loadCache(target);

  const allStamped = Array.from(document.body.querySelectorAll(`[${ORIG_ATTR}]`)) as Element[];
  const eligible = allStamped.filter((el) => !shouldSkipEl(el));

  const sources = eligible.map((el) => (el.getAttribute(ORIG_ATTR) ?? "").trim()).filter(Boolean);
  const needsApi = Array.from(new Set(sources.filter((s) => !langMap.has(s))));

  if (needsApi.length > 0) {
    const translated = await apiBatchTranslate(needsApi, target);
    if (runId !== runIdRef.current) return;
    needsApi.forEach((src, i) => {
      if (translated[i] && translated[i] !== src) langMap.set(src, translated[i]);
    });
    persistCache(target, langMap);
  }

  if (runId !== runIdRef.current) return;

  applying.current = true;
  for (const el of eligible) {
    const orig = (el.getAttribute(ORIG_ATTR) ?? "").trim();
    if (!orig) continue;
    const tx = langMap.get(orig);
    if (!tx || tx === orig) continue;
    setDirectText(el, tx);
    el.setAttribute(LANG_ATTR, target);
  }
  applying.current = false;
}

// ---------------------------------------------------------------------------
// React component
// ---------------------------------------------------------------------------
export function AutoTranslate() {
  const activeLanguage = useAppStore((s) => s.activeLanguage);
  const applying = useRef(false);
  const runIdRef = useRef(0);

  useEffect(() => {
    const meta = getLangMeta(activeLanguage);
    document.documentElement.lang = meta.googleCode;
    document.documentElement.dir = meta.rtl ? "rtl" : "ltr";

    const runId = ++runIdRef.current;

    async function run() {
      // Always restore to English first — prevents compound translations.
      stampAndRestoreAll(applying);
      if (activeLanguage !== "en") {
        await applyTranslation(activeLanguage, runId, runIdRef, applying);
      }
    }

    // Small delay so the current render cycle finishes.
    const timer = setTimeout(run, 100);

    // Watch for new content added by React (tab switches, search results, dialogs).
    let debounce: ReturnType<typeof setTimeout> | null = null;
    const observer = new MutationObserver((mutations) => {
      if (applying.current) return;
      const hasNewNodes = mutations.some(
        (m) => m.type === "childList" && m.addedNodes.length > 0,
      );
      if (!hasNewNodes) return;
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(async () => {
        if (runId !== runIdRef.current) return;
        stampAndRestoreAll(applying);
        if (activeLanguage !== "en") {
          await applyTranslation(activeLanguage, runId, runIdRef, applying);
        }
      }, 250);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      if (debounce) clearTimeout(debounce);
      observer.disconnect();
    };
  }, [activeLanguage]);

  return null;
}
