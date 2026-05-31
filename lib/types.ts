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
  | "community";

export type Priority = ResourceCategory;

export interface Resource {
  id: string;
  category: ResourceCategory[];
  userTypes: UserRole[];
  title: Record<Language, string>;
  description: Record<Language, string>;
  summary?: Record<Language, string>;
  eligibility?: Record<Language, string>;
  phone?: string;
  address?: string;
  website?: string;
  hours?: string;
  featured?: boolean;
}

export interface ResourceNote {
  note: string;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  resources?: string[];
}

export type TabType = "home" | "explore" | "ai" | "shortlist" | "profile";

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
