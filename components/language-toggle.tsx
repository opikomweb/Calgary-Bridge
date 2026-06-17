"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { LANGUAGES } from "@/lib/languages";
import type { Language } from "@/lib/types";
import { Check, ChevronDown } from "lucide-react";

/**
 * Language picker.
 * Trigger: translation icon (文/A) + active country code + active language code.
 * Dropdown: full-width rectangle flush to the left edge of the viewport,
 * each row = flag | countryCode | langCode | nativeName.
 * No border-radius on the dropdown — sharp rectangle.
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
        className="flex items-center gap-1.5 h-9 px-2 rounded-lg border border-foreground/[0.12] bg-foreground/[0.04] hover:bg-foreground/[0.08] active:scale-95 transition-all duration-150 select-none"
      >
        {/* Translation icon — two speech bubbles (文/A) rendered as SVG */}
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 flex-shrink-0"
          aria-hidden="true"
          fill="none"
        >
          {/* Blue bubble (文) */}
          <rect x="1" y="3" width="13" height="11" rx="2" fill="#1D4ED8" opacity="0.85" />
          <text x="7.5" y="11.5" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">文</text>
          {/* Red bubble (A) */}
          <rect x="10" y="10" width="13" height="11" rx="2" fill="#E1251B" opacity="0.90" />
          <text x="16.5" y="18" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">A</text>
        </svg>

        {/* Country code + language code */}
        <span className="text-[11px] font-bold text-foreground/70 leading-none tracking-wide">
          {current.countryCode}
        </span>
        <span className="text-[11px] font-bold text-[#1D4ED8] leading-none tracking-wide">
          {current.label}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-foreground/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* ── Dropdown — sharp rectangle, anchored to left edge of screen on mobile ── */}
      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          className="fixed left-0 right-0 top-[52px] z-[200] bg-background border-b border-foreground/[0.10] shadow-lg shadow-black/10 dark:shadow-black/40 lg:absolute lg:left-auto lg:right-0 lg:top-full lg:mt-0 lg:w-64 lg:fixed-none"
          style={{ borderRadius: 0 }}
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
                className={`w-full flex items-center gap-0 border-b border-foreground/[0.05] last:border-b-0 transition-colors duration-100 ${
                  isActive ? "bg-[#1D4ED8]/[0.06]" : "hover:bg-foreground/[0.04]"
                }`}
              >
                {/* Flag — tight left edge */}
                <span className="w-10 flex-shrink-0 flex items-center justify-center py-2.5 text-lg leading-none">
                  {lang.flag}
                </span>
                {/* Country code */}
                <span className="w-8 flex-shrink-0 text-[11px] font-bold text-foreground/40 tracking-wider">
                  {lang.countryCode}
                </span>
                {/* Language code */}
                <span
                  className={`w-8 flex-shrink-0 text-[12px] font-bold tracking-wide ${
                    isActive ? "text-[#1D4ED8]" : "text-foreground/55"
                  }`}
                >
                  {lang.label}
                </span>
                {/* Native name */}
                <span
                  className={`flex-1 min-w-0 text-[13px] font-medium truncate pr-3 ${
                    isActive ? "text-[#1D4ED8]" : "text-foreground/80"
                  }`}
                >
                  {lang.nativeName}
                </span>
                {/* Active checkmark */}
                <span className="w-8 flex-shrink-0 flex items-center justify-center">
                  {isActive && (
                    <Check className="w-3.5 h-3.5 text-[#1D4ED8]" strokeWidth={2.5} />
                  )}
                </span>
              </button>
            );
          })}
          {/* Footer credit */}
          <div className="py-2 px-4 bg-foreground/[0.02] border-t border-foreground/[0.06]">
            <p className="text-[10px] text-foreground/30 text-center tracking-wide">
              Powered by Google Translate
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
