export type Language = "en" | "fr" | "tl" | "es";

export type UserRole = "newcomer" | "senior" | "business" | "ngo" | "creator";

export type Priority = "housing" | "jobs" | "volunteering" | "healthcare" | "education" | "legal" | "community";

export interface Resource {
  id: string;
  category: UserRole[];
  title: Record<Language, string>;
  description: Record<Language, string>;
  phone?: string;
  address?: string;
  website?: string;
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
}

export type TabType = "home" | "ai" | "shortlist";
