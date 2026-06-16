// Extracted nav item definitions — splitting this out forces Turbopack to
// recompute the main-app module graph and invalidate stale cached chunks.
import { Home, Compass, Heart, User, HandHeart } from "lucide-react";
import type { ComponentType } from "react";

export type TabId = "home" | "explore" | "ai" | "do-good" | "shortlist" | "profile";

export interface NavItem {
  id: TabId;
  icon: ComponentType<{ className?: string; strokeWidth?: number }> | null;
  label: string;
  shortLabel: string;
  highlight: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "home",      icon: Home,      label: "Home",           shortLabel: "Home",     highlight: false },
  { id: "explore",   icon: Compass,   label: "Explore",        shortLabel: "Explore",  highlight: false },
  { id: "ai",        icon: null,      label: "Askonnect",      shortLabel: "Askonnect", highlight: true  },
  { id: "do-good",   icon: HandHeart, label: "Do Good",        shortLabel: "Do Good",  highlight: false },
  { id: "shortlist", icon: Heart,     label: "Saved",          shortLabel: "Saved",    highlight: false },
  { id: "profile",   icon: User,      label: "Profile",        shortLabel: "Profile",  highlight: false },
];
