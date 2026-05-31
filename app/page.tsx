"use client";

import { useAppStore } from "@/lib/store";
import LandingPage from "@/components/landing-page";
import Onboarding from "@/components/onboarding";
import MainApp from "@/components/main-app";

export default function Home() {
  const currentPage = useAppStore((state) => state.currentPage);
  const hasOnboarded = useAppStore((state) => state.hasOnboarded);

  // Determine which view to show
  const getView = () => {
    if (currentPage === "landing" && !hasOnboarded) {
      return <LandingPage />;
    }
    if (currentPage === "onboarding" || (!hasOnboarded && currentPage !== "landing")) {
      return <Onboarding />;
    }
    return <MainApp />;
  };

  return (
    <main className="min-h-screen bg-gradient-hero">
      {getView()}
    </main>
  );
}
