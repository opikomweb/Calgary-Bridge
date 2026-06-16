export type Language = "en" | "fr" | "tl" | "es" | "ar" | "zh";

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

export interface Resource {
  id: string;
  category: ResourceCategory[];
  userTypes: UserRole[];
  title: Record<Language, string>;
  description: Record<Language, string>;
  summary?: Record<Language, string>;
  eligibility?: Record<Language, string>;
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
  overview: Record<Language, string>;
  firstSteps: Record<Language, string[]>;
  eligibilityHints: Record<Language, string[]>;
  aiPrompts: string[];
  hiddenGems: string[];
}
