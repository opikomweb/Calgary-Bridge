/**
 * 12 key languages spoken in Calgary's diverse communities.
 * "en" is always the source-of-truth; all others are fetched from
 * Google Translate at runtime and cached in-session.
 */
export type Language =
  | "en"   // English
  | "pa"   // Punjabi
  | "tl"   // Tagalog / Filipino
  | "zh"   // Cantonese / Chinese (Traditional)
  | "zh-CN"// Mandarin / Chinese (Simplified)
  | "es"   // Spanish
  | "uk"   // Ukrainian
  | "ru"   // Russian
  | "am"   // Amharic
  | "ar"   // Arabic
  | "so"   // Somali
  | "sw";  // Kiswahili

export type UserRole = "newcomer" | "senior" | "business" | "ngo" | "creator" | "family" | "student";

export type ResourceCategory =
  | "housing"
  | "jobs"
  | "food"
  | "mental-health"
  | "healthcare"
  | "newcomer"
  | "family"
  | "senior"
  | "disability"
  | "transit"
  | "education"
  | "legal"
  | "business"
  | "volunteering"
  | "emergency"
  | "community"
  | "lgbtq"
  | "indigenous"
  | "youth"
  | "arts"
  | "logistics"
  | "tourism"
  | "workspace"
  | "storage"
  | "ethnic-market"
  | "farmers-market"
  | "essentials";

export type Priority = ResourceCategory;

/**
 * A localized string: English is required as the source-of-truth.
 * All other languages are optional — they are filled in at runtime
 * by the Google Translate hook (lib/translate.ts).
 */
export type LocalizedString = { en: string } & Partial<Record<Language, string>>;

export interface Resource {
  id: string;
  category: ResourceCategory[];
  userTypes: UserRole[];
  title: LocalizedString;
  description: LocalizedString;
  summary?: LocalizedString;
  eligibility?: LocalizedString;
  servicesOffered?: string[];
  phone?: string;
  address?: string;
  website?: string;
  /** Direct Google Maps search URL. Use for "search near your home" style
   *  resources where there is no single fixed address. */
  mapUrl?: string;
  hours?: string;
  featured?: boolean;
  hiddenGem?: boolean;
  /** Trust ranking within a category (higher = more trusted/recommended).
   *  Used to rank vetted platforms above social-media classifieds. */
  priority?: number;
  cost?: "free" | "low-cost" | "paid" | "sliding-scale";
  languages?: string[];
  lastUpdated?: string;
  source?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ResourceNote {
  note: string;
  completed: boolean;
}

export interface WebLink {
  label: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  resources?: string[];
  /** Live web / Google Maps / government search links the guide suggests. */
  webLinks?: WebLink[];
}

export type TabType = "home" | "explore" | "ai" | "do-good" | "shortlist" | "profile";

export type PageType = 
  | "landing" 
  | "onboarding" 
  | "main" 
  | "resources" 
  | "rentshield" 
  | "business" 
  | "community"
  | "emergency";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: "cultural" | "workshop" | "meetup" | "volunteering" | "training";
  image?: string;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  phone?: string;
  website?: string;
  offers?: string[];
  verified: boolean;
}

export interface CategoryGuide {
  id: ResourceCategory;
  overview: LocalizedString;
  firstSteps: { en: string[] } & Partial<Record<Language, string[]>>;
  eligibilityHints: { en: string[] } & Partial<Record<Language, string[]>>;
  aiPrompts: string[];
  hiddenGems: string[];
}
