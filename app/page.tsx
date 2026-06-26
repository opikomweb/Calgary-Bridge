// RSC — renders the shell immediately with no JS needed.
// The client router (AppRouter) then hydrates and switches views based on
// persisted zustand state without blocking the initial paint.
import AppRouter from "@/components/app-router";
import LandingPage from "@/components/landing-page";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-hero">
      {/* LandingPage is the default view — rendered statically on every request
          so the hero and above-the-fold content are visible before any JS runs. */}
      <LandingPage />
      {/* AppRouter mounts after hydration and swaps in Onboarding/MainApp
          when the persisted store says the user has been onboarded. */}
      <AppRouter />
    </main>
  );
}
