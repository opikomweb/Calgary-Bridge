"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import dynamic from "next/dynamic";

const LandingPage = dynamic(() => import("./landing-page"), { ssr: false });
const Onboarding  = dynamic(() => import("./onboarding"),   { ssr: false });
const MainApp     = dynamic(() => import("./main-app"),      { ssr: false });

export default function AppRouter() {
  const currentPage  = useAppStore((s) => s.currentPage);
  const hasOnboarded = useAppStore((s) => s.hasOnboarded);

  // Wait one tick for zustand/persist to rehydrate from localStorage before
  // deciding which view to show.  Rendering null for a single tick is
  // imperceptible and prevents flashing the wrong view.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);

  if (!hydrated) return null;

  // New user — show landing page
  if (currentPage === "landing" && !hasOnboarded) {
    return <LandingPage />;
  }

  // Needs onboarding
  if (currentPage === "onboarding" || !hasOnboarded) {
    return <Onboarding />;
  }

  // Fully onboarded — render MainApp directly with NO wrapper div.
  // Any wrapper (fixed, absolute, relative) that sizes itself to the viewport
  // traps the scroll context: window.scrollY stays 0 because the browser sees
  // the wrapper as the scroll container, not the document.  MainApp already
  // manages its own full-page layout so it needs no outer element at all.
  return <MainApp />;
}
