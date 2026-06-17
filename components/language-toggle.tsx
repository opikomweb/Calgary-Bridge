"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { LANGUAGES } from "@/lib/languages";
import type { Language } from "@/lib/types";
import { Check, ChevronDown } from "lucide-react";

/**
 * Mobile-header language picker.
 * Shows only the active language flag in the header bar.
 * On click, opens a polished dropdown grid of all 12 flag options.
 */
export function LanguageToggle() {
  const { activeLanguage, setActiveLanguage } = useAppStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === activeLanguage) ?? LANGUAGES[0];

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handle(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open]);

  function select(code: Language) {
    setActiveLanguage(code);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative flex-shrink-0">
      {/* Trigger — flag only + tiny chevron */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Language: ${current.nativeName}. Tap to change.`}
        aria-expanded={open}
        className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-foreground/[0.10] bg-foreground/[0.04] hover:bg-foreground/[0.08] active:scale-95 transition-all duration-150 select-none"
      >
        <span className="text-xl leading-none">{current.flag}</span>
        <ChevronDown
          className={`w-3 h-3 text-foreground/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 z-50 w-[280px] rounded-2xl border border-foreground/[0.08] bg-background shadow-xl shadow-black/10 dark:shadow-black/40 p-3 animate-in fade-in slide-in-from-top-2 duration-150"
          role="listbox"
          aria-label="Select language"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-2.5 px-1">
            Choose your language
          </p>

          {/* 3-column grid of language options */}
          <div className="grid grid-cols-3 gap-1.5">
            {LANGUAGES.map((lang) => {
              const isActive = lang.code === activeLanguage;
              return (
                <button
                  key={lang.code}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => select(lang.code)}
                  className={`relative flex flex-col items-center gap-1 rounded-xl px-1 py-2.5 text-center transition-all duration-150 active:scale-95 ${
                    isActive
                      ? "bg-[#1D4ED8]/10 dark:bg-sky-500/15 border border-[#1D4ED8]/30 dark:border-sky-500/30"
                      : "border border-transparent hover:bg-foreground/[0.05] hover:border-foreground/[0.08]"
                  }`}
                >
                  {/* Active check */}
                  {isActive && (
                    <span className="absolute top-1.5 right-1.5">
                      <Check className="w-2.5 h-2.5 text-[#1D4ED8] dark:text-sky-400" strokeWidth={3} />
                    </span>
                  )}
                  {/* Flag */}
                  <span className="text-2xl leading-none">{lang.flag}</span>
                  {/* Native name */}
                  <span
                    className={`text-[10px] font-semibold leading-tight line-clamp-1 max-w-full ${
                      isActive
                        ? "text-[#1D4ED8] dark:text-sky-400"
                        : "text-foreground/70"
                    }`}
                  >
                    {lang.nativeName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Translator credit */}
          <p className="mt-3 text-[9px] text-foreground/25 text-center">
            Translations powered by Google Translate
          </p>
        </div>
      )}
    </div>
  );
}
