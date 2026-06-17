"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { LANGUAGES } from "@/lib/languages";
import type { Language } from "@/lib/types";
import { Globe, Check, ChevronDown } from "lucide-react";

/**
 * Language picker with a globe icon trigger.
 * Dropdown: single clean column — flag + 2-letter code + native name.
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
    <div ref={ref} className="relative flex-shrink-0">
      {/* ── Trigger ── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Language: ${current.nativeName}. Tap to change.`}
        aria-expanded={open}
        className="flex items-center gap-1.5 h-9 px-2.5 rounded-lg border border-foreground/[0.12] bg-foreground/[0.04] hover:bg-foreground/[0.08] active:scale-95 transition-all duration-150 select-none"
      >
        {/* Globe icon */}
        <Globe className="w-4 h-4 text-foreground/60 flex-shrink-0" strokeWidth={1.75} />
        {/* Active flag */}
        <span className="text-base leading-none">{current.flag}</span>
        {/* 2-letter code */}
        <span className="text-[11px] font-semibold text-foreground/60 leading-none tracking-wide">
          {current.label}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-foreground/35 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-full mt-1.5 z-50 w-44 rounded-xl border border-foreground/[0.09] bg-background shadow-lg shadow-black/10 dark:shadow-black/40 py-1 overflow-hidden"
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
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors duration-100 active:scale-[0.98] ${
                  isActive
                    ? "bg-[#1D4ED8]/08 dark:bg-sky-500/10"
                    : "hover:bg-foreground/[0.05]"
                }`}
              >
                {/* Flag */}
                <span className="text-base leading-none flex-shrink-0">{lang.flag}</span>
                {/* 2-letter abbreviation */}
                <span
                  className={`text-[11px] font-bold w-5 flex-shrink-0 tracking-wide ${
                    isActive ? "text-[#1D4ED8] dark:text-sky-400" : "text-foreground/40"
                  }`}
                >
                  {lang.label}
                </span>
                {/* Native name */}
                <span
                  className={`text-[12px] font-medium flex-1 min-w-0 truncate ${
                    isActive ? "text-[#1D4ED8] dark:text-sky-400" : "text-foreground/75"
                  }`}
                >
                  {lang.nativeName}
                </span>
                {/* Active check */}
                {isActive && (
                  <Check className="w-3 h-3 text-[#1D4ED8] dark:text-sky-400 flex-shrink-0" strokeWidth={2.5} />
                )}
              </button>
            );
          })}
          <div className="border-t border-foreground/[0.06] mt-1 pt-1 pb-0.5 px-3">
            <p className="text-[9px] text-foreground/25 text-center">
              Powered by Google Translate
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
