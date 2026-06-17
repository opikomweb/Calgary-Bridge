"use client";

import { useAppStore } from "@/lib/store";
import type { Language } from "@/lib/types";

const LANGUAGES: { code: Language; flag: string; label: string }[] = [
  { code: "en", flag: "🇨🇦", label: "EN" },
  { code: "fr", flag: "🇫🇷", label: "FR" },
  { code: "tl", flag: "🇵🇭", label: "TL" },
  { code: "es", flag: "🇪🇸", label: "ES" },
  { code: "ar", flag: "🇸🇦", label: "AR" },
  { code: "zh", flag: "🇨🇳", label: "ZH" },
];

/**
 * Compact language selector — always visible in the mobile top bar.
 * Shows the current flag + code; opens a native <select> on tap.
 * The <select> is visually hidden behind the badge so it looks custom
 * but remains fully accessible and zero-JS-overhead.
 */
export function LanguageToggle() {
  const { activeLanguage, setActiveLanguage } = useAppStore();
  const current = LANGUAGES.find((l) => l.code === activeLanguage) ?? LANGUAGES[0];

  return (
    <div className="relative flex-shrink-0">
      {/* Visible badge */}
      <div
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-foreground/[0.12] bg-foreground/[0.04] text-foreground/80 text-xs font-semibold pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="font-bold tracking-wide">{current.label}</span>
        <svg className="w-3 h-3 opacity-50" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>

      {/* Native select — covers the badge, fully transparent */}
      <select
        value={activeLanguage}
        onChange={(e) => setActiveLanguage(e.target.value as Language)}
        aria-label="Select language"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.flag} {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
