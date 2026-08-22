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
  /**
   * Precise, unambiguous English description of the target language/dialect/script
   * used to prompt the translation LLM. This is what prevents the model from
   * picking the wrong regional variant (e.g. Mandarin vs Cantonese, MSA vs a
   * specific Arabic dialect, Latin-American vs European Spanish).
   */
  llmLabel: string;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: "en",    googleCode: "en",    myMemoryCode: "en-GB",  flag: "🇨🇦", countryCode: "CA", label: "EN",  nativeName: "English",     name: "English", llmLabel: "English" },
  { code: "pa",    googleCode: "pa",    myMemoryCode: "pa-IN",  flag: "🇮🇳", countryCode: "IN", label: "PA",  nativeName: "ਪੰਜਾਬੀ",      name: "ਪੰਜਾਬੀ", llmLabel: "Punjabi, written in Gurmukhi script, as spoken by Indian Punjabi immigrant communities in Canada" },
  { code: "tl",    googleCode: "tl",    myMemoryCode: "tl-PH",  flag: "🇵🇭", countryCode: "PH", label: "TL",  nativeName: "Filipino",     name: "Filipino", llmLabel: "Filipino (Tagalog-based national language of the Philippines)" },
  { code: "zh",    googleCode: "zh-TW", myMemoryCode: "zh-TW",  flag: "🇭🇰", countryCode: "HK", label: "廣",  nativeName: "廣東話",       name: "廣東話", llmLabel: "Cantonese (廣東話), written in Traditional Chinese characters, as spoken in Hong Kong — NOT Mandarin" },
  { code: "zh-CN", googleCode: "zh-CN", myMemoryCode: "zh-CN",  flag: "🇨🇳", countryCode: "CN", label: "普",  nativeName: "普通话",       name: "普通话", llmLabel: "Mandarin Chinese (普通话), written in Simplified Chinese characters — NOT Cantonese" },
  { code: "es",    googleCode: "es",    myMemoryCode: "es-MX",  flag: "🇲🇽", countryCode: "MX", label: "ES",  nativeName: "Español",      name: "Español", llmLabel: "Latin American Spanish (neutral register understood across Mexico and Central/South America, NOT Castilian/European Spanish)" },
  { code: "uk",    googleCode: "uk",    myMemoryCode: "uk-UA",  flag: "🇺🇦", countryCode: "UA", label: "УК",  nativeName: "Українська",   name: "Українська", llmLabel: "Ukrainian" },
  { code: "ru",    googleCode: "ru",    myMemoryCode: "ru-RU",  flag: "🇷🇺", countryCode: "RU", label: "РУ",  nativeName: "Русский",      name: "Русский", llmLabel: "Russian" },
  { code: "am",    googleCode: "am",    myMemoryCode: "am-ET",  flag: "🇪🇹", countryCode: "ET", label: "AM",  nativeName: "አማርኛ",        name: "አማርኛ", llmLabel: "Amharic, official language of Ethiopia" },
  { code: "ar",    googleCode: "ar",    myMemoryCode: "ar-SA",  flag: "🇸🇦", countryCode: "SA", label: "AR",  nativeName: "العربية",      name: "العربية",  rtl: true, llmLabel: "Modern Standard Arabic (فصحى), understandable across all Arabic-speaking regions" },
  { code: "so",    googleCode: "so",    myMemoryCode: "so-SO",  flag: "🇸🇴", countryCode: "SO", label: "SO",  nativeName: "Soomaali",     name: "Soomaali", llmLabel: "Somali" },
  { code: "sw",    googleCode: "sw",    myMemoryCode: "sw-KE",  flag: "🇰🇪", countryCode: "KE", label: "SW",  nativeName: "Kiswahili",    name: "Kiswahili", llmLabel: "Swahili (Kiswahili), as spoken in Kenya and East Africa" },
];

export const LANGUAGE_MAP = new Map<Language, LanguageMeta>(
  LANGUAGES.map((l) => [l.code, l])
);

export function getLangMeta(code: Language): LanguageMeta {
  return LANGUAGE_MAP.get(code) ?? LANGUAGES[0];
}
