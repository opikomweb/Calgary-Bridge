"use client";

/**
 * AppRouter — mounts client-side only.
 *
 * LandingPage is always statically rendered by the RSC page.tsx so the hero
 * is visible before any JS executes.  Once zustand/persist rehydrates (one
 * tick after mount), this component overlays the correct view:
 *
 *   - still on landing + not onboarded → show nothing (LandingPage already visible)
 *   - needs onboarding               → replace with Onboarding
 *   - fully onboarded                → replace with MainApp
 *
 * The replacement is rendered inside an absolutely-positioned full-screen
 * div so it cleanly covers the static LandingPage underneath.
 */

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import dynamic from "next/dynamic";

const Onboarding = dynamic(() => import("./onboarding"), { ssr: false });
const MainApp    = dynamic(() => import("./main-app"),    { ssr: false });

export default function AppRouter() {
  // Wait one tick for zustand/persist to rehydrate from localStorage before
  // making any routing decisions — avoids a flash of the wrong view.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);

  const currentPage  = useAppStore((s) => s.currentPage);
  const hasOnboarded = useAppStore((s) => s.hasOnboarded);

  if (!hydrated) return null;

  // User is on landing and hasn't onboarded — LandingPage is already showing.
  if (currentPage === "landing" && !hasOnboarded) return null;

  // Needs onboarding
  if (currentPage === "onboarding" || !hasOnboarded) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <Onboarding />
      </div>
    );
  }

  // Fully onboarded — show the main app
  return (
    <div className="fixed inset-0 z-50 bg-background">
      <MainApp />
    </div>
  );
}
