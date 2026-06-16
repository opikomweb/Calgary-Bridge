"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/data";
import { Home, Compass, Smile, Heart, User, AlertTriangle, Shield, Menu, X, HandHeart } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { RotatingLogo } from "./rotating-logo";
import { motion, AnimatePresence } from "framer-motion";
import HomeTab from "./tabs/home-tab";
import ExploreTab from "./tabs/explore-tab";
import AITab from "./tabs/ai-tab";
import DoGoodTab from "./tabs/do-good-tab";
import ShortlistTab from "./tabs/shortlist-tab";
import ProfileTab from "./tabs/profile-tab";
import EmergencyHub from "./emergency-hub";
import RentShield from "./rentshield";
import Footer from "./footer";
import BusinessSubmission from "./business-submission";
import { CalgaryAnimatedBackground } from "./calgary-background";

export default function MainApp() {
  const { activeTab, setActiveTab, activeLanguage, showEmergency, setShowEmergency, setCurrentPage, setHasOnboarded } = useAppStore();
  const [showRentShield, setShowRentShield] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [showBusinessModal, setShowBusinessModal] = React.useState(false);
  const [businessModalMode, setBusinessModalMode] = React.useState<"submit" | "featured">("submit");

  const goToLanding = () => {
    setMobileMenuOpen(false);
    setHasOnboarded(false);
    setCurrentPage("landing");
  };

  // Always scroll to the top when switching tabs so the user lands on the
  // heading of the section they tapped, even if they were scrolled to the bottom.
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeTab]);

  const t = (key: string) => translations[key]?.[activeLanguage] || translations[key]?.en || key;

  const navItems = [
    { id: "home" as const, icon: Home, label: "Home", shortLabel: "Home", highlight: false },
    { id: "explore" as const, icon: Compass, label: "Explore", shortLabel: "Explore", highlight: false },
    { id: "ai" as const, icon: Smile, label: "iKonnect Guide", shortLabel: "Guide", highlight: true },
    { id: "do-good" as const, icon: HandHeart, label: "Do Good", shortLabel: "Do Good", highlight: false },
    { id: "shortlist" as const, icon: Heart, label: "Saved", shortLabel: "Saved", highlight: false },
    { id: "profile" as const, icon: User, label: "Profile", shortLabel: "Profile", highlight: false },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated Calgary Background with Tower, River, Bridge */}
      <CalgaryAnimatedBackground />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-[340px] lg:flex-col lg:fixed lg:inset-y-0 lg:z-50">
        <div className="flex grow flex-col overflow-y-auto border-r border-foreground/[0.06] bg-background/70 backdrop-blur-3xl">
          {/* Logo Section - Large transparent brand lockup (no badge, no extra text) */}
          <div className="px-6 pt-8 pb-6 flex justify-center">
            <button
              onClick={goToLanding}
              aria-label="Go to Calgary Connect home page"
              className="group relative w-full max-w-[220px] aspect-square flex-shrink-0 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <RotatingLogo imgPadding="p-0" priority />
            </button>
          </div>

          {/* Desktop Navigation - Generous Spacing */}
          <nav className="flex flex-1 flex-col px-8">
            <ul role="list" className="flex flex-1 flex-col gap-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`group flex w-full items-center gap-x-5 rounded-2xl px-6 py-4 text-lg font-bold tracking-tight transition-all duration-300 ${
                      activeTab === item.id
                        ? item.highlight
                          ? "bg-gradient-to-r from-[#38BDF8] to-[#0284c7] text-white shadow-2xl shadow-sky-500/40"
                          : "bg-[#38BDF8]/[0.12] text-foreground border border-[#38BDF8]/40 shadow-lg shadow-sky-500/10"
                        : "text-foreground/75 hover:bg-foreground/[0.06] hover:text-foreground"
                    }`}
                  >
                    <item.icon className={`h-6 w-6 shrink-0 ${activeTab === item.id ? (item.highlight ? "" : "text-[#38BDF8]") : "opacity-70"}`} />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Sidebar Action Buttons */}
            <div className="mt-auto space-y-4 py-10 border-t border-foreground/[0.06]">
              <div className="flex items-center justify-between rounded-2xl bg-foreground/[0.03] border border-foreground/[0.06] px-6 py-4">
                <span className="text-base font-medium text-foreground/70">Appearance</span>
                <ThemeToggle />
              </div>
              <button
                onClick={() => setShowRentShield(true)}
                className="flex w-full items-center gap-5 rounded-2xl bg-foreground/[0.03] border border-foreground/[0.06] px-6 py-5 text-base font-medium text-foreground/70 transition-all duration-300 hover:bg-foreground/[0.06] hover:text-foreground hover:border-foreground/[0.12]"
              >
                <Shield className="h-6 w-6 text-[#38BDF8]" />
                RentShield
              </button>
              <button
                onClick={() => setShowEmergency(true)}
                className="flex w-full items-center gap-5 rounded-2xl bg-gradient-to-r from-[#E1251B] to-[#b91c1c] px-6 py-5 text-base font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/40 hover:scale-[1.02]"
              >
                <AlertTriangle className="h-6 w-6" />
                Emergency Hub
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile / Tablet Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-background/90 backdrop-blur-2xl border-b border-foreground/[0.06] px-4 sm:px-6 py-2.5">
        {/* Calgary brand accent strip (blue → red) under the header */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#38BDF8] via-[#0284c7] to-[#E1251B]" />
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={goToLanding}
            aria-label="Go to Calgary Connect home page"
            className="flex items-center"
          >
            {/* Square brand lockup (Calgary Tower + bridge + wordmark) */}
            <div className="relative h-[64px] w-[64px] sm:h-[72px] sm:w-[72px] flex-shrink-0 transition-transform duration-300 active:scale-95">
              <RotatingLogo imgPadding="p-0" priority />
            </div>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="flex items-center justify-center w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-2xl bg-gradient-to-br from-[#38BDF8] to-[#0284c7] text-white shadow-lg shadow-sky-500/30 transition-all duration-300 active:scale-90 hover:shadow-xl hover:shadow-sky-500/40"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" strokeWidth={2.5} /> : <Menu className="h-6 w-6" strokeWidth={2.5} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-30 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[360px] bg-background/98 backdrop-blur-2xl border-l border-foreground/[0.06] p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="mt-12 space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex w-full items-center gap-5 rounded-2xl px-6 py-4 text-lg font-bold tracking-tight transition-all ${
                      activeTab === item.id
                        ? item.highlight
                          ? "bg-gradient-to-r from-[#38BDF8] to-[#0284c7] text-white shadow-lg shadow-sky-500/30"
                          : "bg-[#38BDF8]/[0.12] text-foreground border border-[#38BDF8]/40"
                        : "text-foreground/75 hover:bg-foreground/[0.06] hover:text-foreground"
                    }`}
                  >
                    <item.icon className={`h-6 w-6 ${activeTab === item.id && !item.highlight ? "text-[#38BDF8]" : ""}`} />
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-12 space-y-4 pt-10 border-t border-foreground/[0.06]">
                <div className="flex items-center justify-between rounded-2xl bg-foreground/[0.03] border border-foreground/[0.06] px-6 py-4">
                  <span className="text-base font-medium text-foreground/70">Appearance</span>
                  <ThemeToggle />
                </div>
                <button
                  onClick={() => {
                    setShowRentShield(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-5 rounded-2xl bg-foreground/[0.03] border border-foreground/[0.06] px-6 py-5 text-base font-medium text-foreground/70"
                >
                  <Shield className="h-6 w-6 text-[#38BDF8]" />
                  RentShield
                </button>
                <button
                  onClick={() => {
                    setShowEmergency(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-5 rounded-2xl bg-gradient-to-r from-[#E1251B] to-[#b91c1c] px-6 py-5 text-base font-semibold text-white"
                >
                  <AlertTriangle className="h-6 w-6" />
                  Emergency Hub
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="lg:pl-[360px] lg:pr-8 relative z-10 min-w-0 overflow-x-clip">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {activeTab === "home" && <HomeTab />}
            {activeTab === "explore" && <ExploreTab />}
              {activeTab === "ai" && <AITab />}
              {activeTab === "do-good" && <DoGoodTab />}
              {activeTab === "shortlist" && <ShortlistTab />}
            {activeTab === "profile" && <ProfileTab />}
          </motion.div>
        </AnimatePresence>

        {/* Global Footer — About, Privacy, Legal (on every tab) */}
        <Footer
          onOpenSubmitBusiness={() => {
            setBusinessModalMode("submit");
            setShowBusinessModal(true);
          }}
          onOpenGetFeatured={() => {
            setBusinessModalMode("featured");
            setShowBusinessModal(true);
          }}
        />

        {/* Spacer so mobile bottom nav never overlaps the footer */}
        <div className="h-20 lg:hidden" />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-2xl border-t border-foreground/[0.06] safe-area-pb">
        <div className="flex items-center justify-between gap-1 px-2 py-2">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-center gap-1.5 rounded-full transition-all duration-300 ${
                  active
                    ? item.highlight
                      ? "bg-gradient-to-r from-[#38BDF8] to-[#0284c7] text-white shadow-lg shadow-sky-500/30 px-3.5 py-2.5"
                      : "bg-[#38BDF8]/[0.14] text-[#0284c7] px-3.5 py-2.5"
                    : "text-foreground/45 px-2.5 py-2.5 active:scale-90"
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {active && (
                  <span className="text-xs font-bold tracking-tight whitespace-nowrap">{item.shortLabel}</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Emergency Modal */}
      <AnimatePresence>
        {showEmergency && <EmergencyHub onClose={() => setShowEmergency(false)} />}
      </AnimatePresence>
      
      {/* RentShield Modal */}
      <AnimatePresence>
        {showRentShield && <RentShield onClose={() => setShowRentShield(false)} />}
      </AnimatePresence>

      {/* Business Submission Modal */}
      <BusinessSubmission
        isOpen={showBusinessModal}
        onClose={() => setShowBusinessModal(false)}
        mode={businessModalMode}
      />
    </div>
  );
}
