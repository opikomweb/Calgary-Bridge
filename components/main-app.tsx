"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/data";
import { Home, Compass, MessageSquare, Heart, User, AlertTriangle, Shield, Menu, X, HandHeart } from "lucide-react";
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
    { id: "ai" as const, icon: MessageSquare, label: "iKonnect Guide", shortLabel: "Guide", highlight: true },
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
        <div className="flex grow flex-col overflow-y-auto border-r border-foreground/[0.08] bg-background/95 backdrop-blur-3xl shadow-sm">
          {/* Logo Section - compact horizontal lockup */}
          <div className="px-5 pt-5 pb-4 border-b border-foreground/[0.06]">
            <button
              onClick={goToLanding}
              aria-label="Go to Calgary Connect home page"
              className="group flex items-center gap-3 w-full transition-opacity hover:opacity-80 active:opacity-60 cursor-pointer"
            >
              <div className="relative h-12 w-12 flex-shrink-0">
                <RotatingLogo imgPadding="p-0" priority />
              </div>
              <div className="text-left leading-none">
                <span className="block text-lg font-bold text-[#0b2239] dark:text-white tracking-tight">Calgary</span>
                <span className="block text-lg font-bold text-[#E1251B] tracking-tight -mt-0.5">Connect</span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex flex-1 flex-col px-4 pt-3">
            <ul role="list" className="flex flex-1 flex-col gap-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`group flex w-full items-center gap-x-3 rounded-xl px-4 py-3 text-base font-semibold tracking-tight transition-all duration-200 ${
                      activeTab === item.id
                        ? item.highlight
                          ? "bg-[#E1251B] text-white shadow-lg shadow-red-700/25"
                          : "bg-[#0b2239] dark:bg-[#1D4ED8] text-white shadow-md shadow-blue-900/20"
                        : "text-foreground/70 hover:bg-foreground/[0.06] hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-5 w-5 shrink-0" strokeWidth={activeTab === item.id ? 2.3 : 2} />
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Sidebar Action Buttons */}
            <div className="mt-auto space-y-2 py-5 border-t border-foreground/[0.06]">
              <div className="flex items-center justify-between rounded-xl bg-foreground/[0.03] border border-foreground/[0.06] px-4 py-3">
                <span className="text-sm font-medium text-foreground/70">Appearance</span>
                <ThemeToggle />
              </div>
              <button
                onClick={() => setShowRentShield(true)}
                className="flex w-full items-center gap-3 rounded-xl bg-foreground/[0.03] border border-foreground/[0.06] px-4 py-3 text-sm font-semibold text-foreground/70 transition-all duration-200 hover:bg-foreground/[0.07] hover:text-foreground"
              >
                <Shield className="h-5 w-5 text-[#1D4ED8] shrink-0" />
                RentShield
              </button>
              <button
                onClick={() => setShowEmergency(true)}
                className="flex w-full items-center gap-3 rounded-xl bg-[#E1251B] px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-[#B91C1C] hover:shadow-lg hover:shadow-red-700/30"
              >
                <AlertTriangle className="h-5 w-5 shrink-0" />
                Emergency Hub
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile / Tablet Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-background/95 backdrop-blur-2xl border-b border-foreground/[0.08] px-4 sm:px-5 py-2">
        {/* Calgary brand accent strip (deep blue → red) */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#0b2239] via-[#1D4ED8] to-[#E1251B]" />
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={goToLanding}
            aria-label="Go to Calgary Connect home page"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80 active:opacity-60"
          >
            <div className="relative h-9 w-9 flex-shrink-0">
              <RotatingLogo imgPadding="p-0" priority />
            </div>
            <div className="text-left leading-none">
              <span className="block text-sm font-bold text-[#0b2239] dark:text-white tracking-tight">Calgary</span>
              <span className="block text-sm font-bold text-[#E1251B] tracking-tight -mt-px">Connect</span>
            </div>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#E1251B] text-white shadow-md shadow-red-700/30 transition-all duration-150 hover:bg-[#B91C1C] active:scale-95"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={2.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={2.5} />
            )}
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
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[360px] bg-background/98 backdrop-blur-2xl backdrop-saturate-150 border-l border-foreground/[0.1] shadow-2xl shadow-black/30 ring-1 ring-inset ring-foreground/[0.06] p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="mt-8 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold tracking-tight transition-all ${
                      activeTab === item.id
                        ? item.highlight
                          ? "bg-[#E1251B] text-white shadow-md shadow-red-700/20"
                          : "bg-[#0b2239] dark:bg-[#1D4ED8] text-white shadow-sm"
                        : "text-foreground/70 hover:bg-foreground/[0.06] hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-5 w-5 shrink-0" strokeWidth={activeTab === item.id ? 2.3 : 2} />
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-6 space-y-2 pt-6 border-t border-foreground/[0.06]">
                <div className="flex items-center justify-between rounded-xl bg-foreground/[0.03] border border-foreground/[0.06] px-4 py-3">
                  <span className="text-sm font-medium text-foreground/70">Appearance</span>
                  <ThemeToggle />
                </div>
                <button
                  onClick={() => {
                    setShowRentShield(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl bg-foreground/[0.03] border border-foreground/[0.06] px-4 py-3 text-sm font-semibold text-foreground/70 hover:bg-foreground/[0.07] hover:text-foreground transition-colors"
                >
                  <Shield className="h-5 w-5 text-[#1D4ED8] shrink-0" />
                  RentShield
                </button>
                <button
                  onClick={() => {
                    setShowEmergency(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl bg-[#E1251B] px-4 py-3 text-sm font-bold text-white hover:bg-[#B91C1C] transition-colors"
                >
                  <AlertTriangle className="h-5 w-5 shrink-0" />
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
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/97 backdrop-blur-2xl border-t border-foreground/[0.08] safe-area-pb">
        <div className="flex items-center justify-between px-1 py-2">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 rounded-xl py-2 transition-all duration-200 ${
                  active
                    ? item.highlight
                      ? "text-[#E1251B]"
                      : "text-[#0b2239] dark:text-[#1D4ED8]"
                    : "text-foreground/45 active:scale-90"
                }`}
              >
                {active && item.highlight ? (
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#E1251B] text-white shadow-md shadow-red-700/30">
                    <item.icon className="h-5 w-5 shrink-0" strokeWidth={2.3} />
                    <span className="text-[12px] font-bold tracking-tight">{item.shortLabel}</span>
                  </div>
                ) : active ? (
                  <>
                    <item.icon className="h-5 w-5 shrink-0" strokeWidth={2.3} />
                    <span className="text-[10px] font-bold tracking-tight">{item.shortLabel}</span>
                  </>
                ) : (
                  <item.icon className="h-5 w-5 shrink-0" strokeWidth={2} />
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
