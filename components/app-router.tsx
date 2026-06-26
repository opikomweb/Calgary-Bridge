"use client";

/**
 * AppRouter — mounts client-side only.
 *
 * LandingPage is statically rendered by page.tsx (RSC) so above-the-fold
 * content is visible before JS runs. Once zustand/persist rehydrates, this
 * component decides which view to overlay:
 *
 *   not yet hydrated         → render a solid background cover instantly so
 *                              a returning user never sees LandingPage flash
 *   not onboarded            → Onboarding
 *   onboarded (main/explore) → MainApp
 *   landing + not onboarded  → hide the cover; LandingPage already visible
 *
 * The `initialState` snapshot is read synchronously from the zustand store
 * before hydration — zustand populates its in-memory state from
 * localStorage during the `persist` middleware's synchronous initialisation,
 * so reading it in the module body (outside React) gives the correct value
 * on the very first render, before any effect fires.
 */

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import dynamic from "next/dynamic";

const Onboarding = dynamic(() => import("./onboarding"), { ssr: false });
const MainApp    = dynamic(() => import("./main-app"),    { ssr: false });

export default function AppRouter() {
  const currentPage  = useAppStore((s) => s.currentPage);
  const hasOnboarded = useAppStore((s) => s.hasOnboarded);

  // Track whether zustand/persist has finished rehydrating. We start with
  // `true` only if we can already determine we're on the landing page
  // (i.e. no persisted "hasOnboarded" in localStorage). This eliminates the
  // flash for returning users while still showing the landing for new ones.
  const [hydrated, setHydrated] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const raw = localStorage.getItem("calgary-connect-storage");
      if (!raw) return false; // new user, no storage — start as not hydrated
      const parsed = JSON.parse(raw);
      // If stored state shows onboarded, we need to show cover immediately
      return !parsed?.state?.hasOnboarded;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Before hydration: if the user is onboarded, show a solid background cover
  // so the landing page never flashes through.
  if (!hydrated) {
    return (
      <div
        className="fixed inset-0 z-50 bg-background"
        aria-hidden="true"
      />
    );
  }

  // User is on landing and hasn't onboarded — LandingPage is already visible.
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
