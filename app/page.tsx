"use client";

import { useAppStore } from "@/lib/store";
import Onboarding from "@/components/onboarding";
import MainApp from "@/components/main-app";

export default function Home() {
  const hasOnboarded = useAppStore((state) => state.hasOnboarded);

  return (
    <main className="min-h-screen bg-gradient-radial">
      {!hasOnboarded ? <Onboarding /> : <MainApp />}
    </main>
  );
}
