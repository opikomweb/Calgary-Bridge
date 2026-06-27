import type { Language } from "./types";

/**
 * Canonical list of the 12 key Calgary community languages.
 * Every component (toggle, translate hook, data file) imports from here.
 */
export interface LanguageMeta {
  code: Language;
  /** BCP-47 tag used by Google Translate (kept for reference, no longer used for API calls) */
  googleCode: string;
  /** Language code used by MyMemory — format: "en-GB|target-XX" target portion only */
  myMemoryCode?: string;
  /** Native name shown in the dropdown */
  nativeName: string;
  /** Alias for nativeName — available as { name } for convenience in destructuring */
  name: string;
  /** Flag emoji — country flag most associated with this language */
  flag: string;
  /** 2-letter ISO 3166-1 country code shown alongside the flag (e.g. CA, IN, PH) */
  countryCode: string;
  /** 2-letter language abbreviation shown in the dropdown (EN, PA, TL, 廣, 普 …) */
  label: string;
  /** Whether the language is RTL */
  rtl?: boolean;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: "en",    googleCode: "en",    myMemoryCode: "en-GB",  flag: "🇨🇦", countryCode: "CA", label: "EN",  nativeName: "English",     name: "English" },
  { code: "pa",    googleCode: "pa",    myMemoryCode: "pa-IN",  flag: "🇮🇳", countryCode: "IN", label: "PA",  nativeName: "ਪੰਜਾਬੀ",      name: "ਪੰਜਾਬੀ" },
  { code: "tl",    googleCode: "tl",    myMemoryCode: "tl-PH",  flag: "🇵🇭", countryCode: "PH", label: "TL",  nativeName: "Filipino",     name: "Filipino" },
  { code: "zh",    googleCode: "zh-TW", myMemoryCode: "zh-TW",  flag: "🇭🇰", countryCode: "HK", label: "廣",  nativeName: "廣東話",       name: "廣東話" },
  { code: "zh-CN", googleCode: "zh-CN", myMemoryCode: "zh-CN",  flag: "🇨🇳", countryCode: "CN", label: "普",  nativeName: "普通话",       name: "普通话" },
  { code: "es",    googleCode: "es",    myMemoryCode: "es-MX",  flag: "🇲🇽", countryCode: "MX", label: "ES",  nativeName: "Español",      name: "Español" },
  { code: "uk",    googleCode: "uk",    myMemoryCode: "uk-UA",  flag: "🇺🇦", countryCode: "UA", label: "УК",  nativeName: "Українська",   name: "Українська" },
  { code: "ru",    googleCode: "ru",    myMemoryCode: "ru-RU",  flag: "🇷🇺", countryCode: "RU", label: "РУ",  nativeName: "Русский",      name: "Русский" },
  { code: "am",    googleCode: "am",    myMemoryCode: "am-ET",  flag: "🇪🇹", countryCode: "ET", label: "AM",  nativeName: "አማርኛ",        name: "አማርኛ" },
  { code: "ar",    googleCode: "ar",    myMemoryCode: "ar-SA",  flag: "🇸🇦", countryCode: "SA", label: "AR",  nativeName: "العربية",      name: "العربية",  rtl: true },
  { code: "so",    googleCode: "so",    myMemoryCode: "so-SO",  flag: "🇸🇴", countryCode: "SO", label: "SO",  nativeName: "Soomaali",     name: "Soomaali" },
  { code: "sw",    googleCode: "sw",    myMemoryCode: "sw-KE",  flag: "🇰🇪", countryCode: "KE", label: "SW",  nativeName: "Kiswahili",    name: "Kiswahili" },
];

export const LANGUAGE_MAP = new Map<Language, LanguageMeta>(
  LANGUAGES.map((l) => [l.code, l])
);

export function getLangMeta(code: Language): LanguageMeta {
  return LANGUAGE_MAP.get(code) ?? LANGUAGES[0];
}
