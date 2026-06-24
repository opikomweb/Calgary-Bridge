"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { LANGUAGES } from "@/lib/languages";
import type { Language } from "@/lib/types";
import { Check } from "lucide-react";

/**
 * Language picker — compact dropdown anchored directly below the trigger.
 * Trigger: translate icon (文/A SVG) + active flag + 2-letter code.
 * Dropdown: each row = flag + 2-letter code only, no long native names.
 * Sharp rectangle, scrollable if needed.
 */
export function LanguageToggle() {
  const { activeLanguage, setActiveLanguage } = useAppStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === activeLanguage) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function select(code: Language) {
    setActiveLanguage(code);
    setOpen(false);
  }

  return (
    // translate="no" — native language names/flags must never be auto-translated.
    <div ref={ref} translate="no" className="notranslate relative flex-shrink-0">
      {/* ── Trigger ── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Language: ${current.nativeName}. Tap to change.`}
        aria-expanded={open}
        className="flex items-center gap-1 h-8 px-2 bg-foreground/[0.05] hover:bg-foreground/[0.10] border border-foreground/[0.12] transition-colors select-none"
        style={{ borderRadius: 4 }}
      >
        {/* Translate icon SVG */}
        <svg viewBox="0 0 22 22" className="w-5 h-5 flex-shrink-0" aria-hidden="true" fill="none">
          <rect x="1" y="2" width="12" height="10" rx="1.5" fill="#1D4ED8" opacity="0.9" />
          <text x="7" y="10" textAnchor="middle" fontSize="6.5" fill="white" fontWeight="bold" fontFamily="system-ui">文</text>
          <rect x="9" y="10" width="12" height="10" rx="1.5" fill="#E1251B" opacity="0.9" />
          <text x="15" y="18" textAnchor="middle" fontSize="6.5" fill="white" fontWeight="bold" fontFamily="system-ui">A</text>
        </svg>

        {/* Active flag + 2-letter code */}
        <span className="text-base leading-none" aria-hidden="true">{current.flag}</span>
        <span className="text-[11px] font-bold text-foreground/70 tracking-wider leading-none">{current.label}</span>

        {/* Chevron */}
        <svg
          viewBox="0 0 10 6"
          className={`w-2.5 h-2.5 text-foreground/40 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {/* ── Dropdown — anchored below trigger, compact width, scrollable ── */}
      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-full mt-0.5 z-[300] bg-background border border-foreground/[0.14] shadow-xl shadow-black/15 dark:shadow-black/50 overflow-y-auto"
          style={{ borderRadius: 0, minWidth: 108, maxHeight: "calc(100svh - 80px)" }}
        >
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === activeLanguage;
            return (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => select(lang.code)}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 border-b border-foreground/[0.06] last:border-b-0 transition-colors duration-100 ${
                  isActive
                    ? "bg-[#1D4ED8]/[0.08] dark:bg-[#1D4ED8]/[0.15]"
                    : "hover:bg-foreground/[0.05]"
                }`}
              >
                {/* Flag */}
                <span className="text-[15px] leading-none w-5 flex-shrink-0">{lang.flag}</span>

                {/* 2-letter language code (or characters for CJK/Cyrillic) */}
                <span
                  className={`text-[12px] font-bold tracking-wide leading-none flex-1 text-left ${
                    isActive ? "text-[#1D4ED8] dark:text-sky-400" : "text-foreground/70"
                  }`}
                >
                  {lang.label}
                </span>

                {/* Active tick */}
                {isActive && (
                  <Check className="w-3 h-3 text-[#1D4ED8] dark:text-sky-400 flex-shrink-0" strokeWidth={2.5} />
                )}
              </button>
            );
          })}
          {/* Credit line */}
          <div className="px-2.5 py-1.5 bg-foreground/[0.025] border-t border-foreground/[0.08]">
            <p className="text-[9px] text-foreground/30 text-center whitespace-nowrap">
              Powered by Google Translate
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
