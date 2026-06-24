"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { translateBatch } from "@/lib/translate";
import { getLangMeta } from "@/lib/languages";
import type { Language } from "@/lib/types";

/**
 * AutoTranslate — whole-page translation.
 *
 * Walks every visible text node in the document, translates it into the active
 * language, and swaps the text in place. The original English text of each node
 * is preserved in a WeakMap so we can restore it instantly when switching back
 * to English (or re-source from English when switching between languages).
 *
 * Elements (or any ancestor) marked with `translate="no"` / class `notranslate`
 * are skipped — used for content that is ALREADY localized via the translation
 * hooks (resource titles/descriptions, category chips) and for native language
 * names in the language picker.
 *
 * A MutationObserver keeps newly-rendered content (tab switches, search results,
 * dialogs) translated as the SPA updates.
 */

// Tags whose text content must never be translated.
const SKIP_TAGS = new Set([
  "SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "KBD", "SAMP",
  "TEXTAREA", "INPUT", "SELECT", "OPTION",
]);

// Remember the original English text for each translated text node.
const originalText = new WeakMap<Text, string>();

// Reverse lookup: trimmed translated string -> original English string.
// Lets us recover the English source for DOM nodes that React/framer recreated
// (which lose their WeakMap entry), so restoring English and switching between
// languages stays correct even after re-renders.
const translatedToEnglish = new Map<string, string>();

/** Best-effort recovery of the English source for a node's current text. */
function recoverEnglish(node: Text): string | undefined {
  const fromMap = originalText.get(node);
  if (fromMap !== undefined) return fromMap;
  const trimmed = (node.nodeValue ?? "").trim();
  return translatedToEnglish.get(trimmed);
}

function shouldSkip(node: Node): boolean {
  let el: HTMLElement | null =
    node.nodeType === Node.TEXT_NODE
      ? node.parentElement
      : (node as HTMLElement);

  while (el) {
    if (SKIP_TAGS.has(el.tagName)) return true;
    if (el.getAttribute && el.getAttribute("translate") === "no") return true;
    if (el.classList && el.classList.contains("notranslate")) return true;
    el = el.parentElement;
  }
  return false;
}

/** Collect all translatable text nodes under `root`. */
function collectTextNodes(root: Node): Text[] {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const text = node.nodeValue ?? "";
      // Skip whitespace-only and numeric/symbol-only strings (nothing to translate)
      if (!text.trim()) return NodeFilter.FILTER_REJECT;
      if (!/[a-zA-Z]/.test(text)) return NodeFilter.FILTER_REJECT;
      if (shouldSkip(node)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let current = walker.nextNode();
  while (current) {
    nodes.push(current as Text);
    current = walker.nextNode();
  }
  return nodes;
}

export function AutoTranslate() {
  const activeLanguage = useAppStore((s) => s.activeLanguage);
  // Guard so our own text mutations don't retrigger the observer.
  const isApplying = useRef(false);
  const runIdRef = useRef(0);

  useEffect(() => {
    const meta = getLangMeta(activeLanguage);

    // Keep <html lang/dir> in sync for accessibility + RTL languages.
    document.documentElement.lang = meta.googleCode;
    document.documentElement.dir = meta.rtl ? "rtl" : "ltr";

    // Bump run id so any in-flight pass from a previous language is ignored.
    const runId = ++runIdRef.current;

    /** Restore every node to its captured English source. */
    function restoreOriginals(nodes: Text[]) {
      isApplying.current = true;
      for (const node of nodes) {
        const orig = recoverEnglish(node);
        if (orig !== undefined && node.nodeValue !== orig) {
          node.nodeValue = orig;
        }
      }
      isApplying.current = false;
    }

    async function translateNodes(nodes: Text[], target: Language) {
      if (!nodes.length) return;

      // Determine the English source for each node. A node may currently hold:
      //  - English (first time we see it) → capture it as the original
      //  - text already translated into another language (recreated node) →
      //    recover its English via the reverse map so we re-source, not re-wrap.
      const sources: string[] = [];
      for (const node of nodes) {
        const current = node.nodeValue ?? "";
        const recovered = recoverEnglish(node);
        const english = recovered !== undefined ? recovered : current;
        if (!originalText.has(node)) originalText.set(node, english);
        sources.push(english);
      }

      // Translate unique trimmed strings; map back preserving surrounding space.
      const trimmed = sources.map((s) => s.trim());
      const unique = Array.from(new Set(trimmed));
      const results = await translateBatch(unique, target);

      if (runId !== runIdRef.current) return; // language changed mid-flight

      const map = new Map<string, string>();
      unique.forEach((u, i) => map.set(u, results[i] ?? u));

      isApplying.current = true;
      nodes.forEach((node, i) => {
        const source = sources[i];
        const t = map.get(source.trim());
        if (!t) return;
        // Record reverse mapping so recreated nodes can be recovered later.
        translatedToEnglish.set(t.trim(), source.trim());
        // Re-apply leading/trailing whitespace from the original.
        const lead = source.match(/^\s*/)?.[0] ?? "";
        const trail = source.match(/\s*$/)?.[0] ?? "";
        const next = `${lead}${t}${trail}`;
        if (node.nodeValue !== next) node.nodeValue = next;
      });
      isApplying.current = false;
    }

    function runFullPass() {
      const nodes = collectTextNodes(document.body);
      if (activeLanguage === "en") {
        restoreOriginals(nodes);
      } else {
        void translateNodes(nodes, activeLanguage);
      }
    }

    // Initial pass (defer so the current render settles first).
    const initial = setTimeout(runFullPass, 0);

    // Watch for SPA DOM changes and translate the new content.
    let debounce: ReturnType<typeof setTimeout> | null = null;
    const queued = new Set<Node>();

    const observer = new MutationObserver((mutations) => {
      if (isApplying.current) return;
      for (const m of mutations) {
        if (m.type === "childList") {
          m.addedNodes.forEach((n) => {
            if (n.nodeType === Node.ELEMENT_NODE || n.nodeType === Node.TEXT_NODE) {
              queued.add(n);
            }
          });
        } else if (m.type === "characterData" && m.target.nodeType === Node.TEXT_NODE) {
          queued.add(m.target);
        }
      }
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(() => {
        const roots = Array.from(queued);
        queued.clear();
        const nodes: Text[] = [];
        for (const r of roots) {
          if (r.nodeType === Node.TEXT_NODE) {
            if (!shouldSkip(r) && /[a-zA-Z]/.test(r.nodeValue ?? "")) {
              nodes.push(r as Text);
            }
          } else {
            nodes.push(...collectTextNodes(r));
          }
        }
        if (!nodes.length) return;
        if (activeLanguage === "en") restoreOriginals(nodes);
        else void translateNodes(nodes, activeLanguage);
      }, 150);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      clearTimeout(initial);
      if (debounce) clearTimeout(debounce);
      observer.disconnect();
    };
  }, [activeLanguage]);

  return null;
}
