import type { Language } from "./types";

/**
 * Canonical list of the 12 key Calgary community languages.
 * Every component (toggle, translate hook, data file) imports from here.
 */
export interface LanguageMeta {
  code: Language;
  /** BCP-47 tag used by Google Translate */
  googleCode: string;
  /** Native name shown in the dropdown */
  nativeName: string;
  /** Flag emoji — always a country whose flag is widely associated with this language */
  flag: string;
  /** Short display label (for very tight spaces) */
  label: string;
  /** Whether the language is RTL */
  rtl?: boolean;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: "en",    googleCode: "en",    flag: "🇨🇦", label: "EN",  nativeName: "English" },
  { code: "pa",    googleCode: "pa",    flag: "🇮🇳", label: "ਪੰਜਾਬੀ", nativeName: "ਪੰਜਾਬੀ" },
  { code: "tl",    googleCode: "tl",    flag: "🇵🇭", label: "TL",  nativeName: "Filipino" },
  { code: "zh",    googleCode: "zh-TW", flag: "🇭🇰", label: "廣東話", nativeName: "廣東話" },
  { code: "zh-CN", googleCode: "zh-CN", flag: "🇨🇳", label: "普通话", nativeName: "普通话" },
  { code: "es",    googleCode: "es",    flag: "🇲🇽", label: "ES",  nativeName: "Español" },
  { code: "uk",    googleCode: "uk",    flag: "🇺🇦", label: "УК",  nativeName: "Українська" },
  { code: "ru",    googleCode: "ru",    flag: "🇷🇺", label: "РУ",  nativeName: "Русский" },
  { code: "am",    googleCode: "am",    flag: "🇪🇹", label: "AM",  nativeName: "አማርኛ" },
  { code: "ar",    googleCode: "ar",    flag: "🇸🇦", label: "AR",  nativeName: "العربية", rtl: true },
  { code: "so",    googleCode: "so",    flag: "🇸🇴", label: "SO",  nativeName: "Soomaali" },
  { code: "sw",    googleCode: "sw",    flag: "🇰🇪", label: "SW",  nativeName: "Kiswahili" },
];

export const LANGUAGE_MAP = new Map<Language, LanguageMeta>(
  LANGUAGES.map((l) => [l.code, l])
);

export function getLangMeta(code: Language): LanguageMeta {
  return LANGUAGE_MAP.get(code) ?? LANGUAGES[0];
}
