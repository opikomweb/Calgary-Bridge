"use client";

import React from "react";
import Image from "next/image";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/data";
import { Home, Compass, MessageCircle, Heart, User, AlertTriangle, Shield, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HomeTab from "./tabs/home-tab";
import ExploreTab from "./tabs/explore-tab";
import AITab from "./tabs/ai-tab";
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

  const t = (key: string) => translations[key]?.[activeLanguage] || translations[key]?.en || key;

  const navItems = [
    { id: "home" as const, icon: Home, label: "Home", shortLabel: "Home", highlight: false },
    { id: "explore" as const, icon: Compass, label: "Explore", shortLabel: "Explore", highlight: false },
    { id: "ai" as const, icon: MessageCircle, label: "White Hat Guide", shortLabel: "Guide", highlight: true },
    { id: "shortlist" as const, icon: Heart, label: "Saved", shortLabel: "Saved", highlight: false },
    { id: "profile" as const, icon: User, label: "Profile", shortLabel: "Profile", highlight: false },
  ];

  return (
    <div className="min-h-screen bg-[#050B14] relative">
      {/* Animated Calgary Background with Tower, River, Bridge */}
      <CalgaryAnimatedBackground />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-[340px] lg:flex-col lg:fixed lg:inset-y-0 lg:z-50">
        <div className="flex grow flex-col overflow-y-auto border-r border-white/[0.06] bg-[#050B14]/70 backdrop-blur-3xl">
          {/* Logo Section - Large Professional Logo */}
          <div className="px-6 pt-8 pb-6 flex justify-center">
            <button
              onClick={goToLanding}
              aria-label="Go to Calgary Konnect home page"
              className="relative w-[200px] h-[200px] flex-shrink-0 rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c1829]/80 to-[#050B14]/90 p-3 border border-white/[0.08] shadow-2xl shadow-sky-500/10 backdrop-blur-xl transition-all duration-300 hover:border-sky-400/30 hover:shadow-sky-500/20 hover:scale-[1.02] cursor-pointer"
            >
              <Image
                src="/calgary-connect-logo.png"
                alt="Calgary Konnect"
                fill
                className="object-contain p-3"
                priority
              />
            </button>
          </div>

          {/* Desktop Navigation - Generous Spacing */}
          <nav className="flex flex-1 flex-col px-8">
            <ul role="list" className="flex flex-1 flex-col gap-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`group flex w-full items-center gap-x-5 rounded-2xl px-6 py-5 text-lg font-medium transition-all duration-300 ${
                      activeTab === item.id
                        ? item.highlight
                          ? "bg-gradient-to-r from-[#38BDF8] to-[#0284c7] text-white shadow-2xl shadow-sky-500/40"
                          : "bg-white/[0.08] text-white border border-white/[0.12] shadow-xl shadow-black/20"
                        : "text-white/50 hover:bg-white/[0.04] hover:text-white/80"
                    }`}
                  >
                    <item.icon className={`h-6 w-6 shrink-0 ${activeTab === item.id ? "" : "opacity-60"}`} />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Sidebar Action Buttons */}
            <div className="mt-auto space-y-4 py-10 border-t border-white/[0.06]">
              <button
                onClick={() => setShowRentShield(true)}
                className="flex w-full items-center gap-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] px-6 py-5 text-base font-medium text-white/70 transition-all duration-300 hover:bg-white/[0.06] hover:text-white hover:border-white/[0.12]"
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

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#050B14]/90 backdrop-blur-2xl border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={goToLanding}
            aria-label="Go to Calgary Konnect home page"
            className="flex items-center gap-3"
          >
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-[#0c1829] to-[#071119] p-0.5 border border-white/10">
              <Image
                src="/calgary-connect-logo.png"
                alt="Calgary Konnect"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div>
              <span className="text-base font-bold text-white">Calgary </span>
              <span className="text-base font-bold text-[#38BDF8]">Konnect</span>
            </div>
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEmergency(true)}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#E1251B] to-[#b91c1c] text-white shadow-lg shadow-red-500/30"
            >
              <AlertTriangle className="h-4 w-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.08] text-white"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
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
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[360px] bg-[#050B14]/98 backdrop-blur-2xl border-l border-white/[0.06] p-8"
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
                    className={`flex w-full items-center gap-5 rounded-2xl px-6 py-5 text-lg font-medium transition-all ${
                      activeTab === item.id
                        ? "bg-white/[0.08] text-white border border-white/[0.12]"
                        : "text-white/50 hover:bg-white/[0.04] hover:text-white/80"
                    }`}
                  >
                    <item.icon className="h-6 w-6" />
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-12 space-y-4 pt-10 border-t border-white/[0.06]">
                <button
                  onClick={() => {
                    setShowRentShield(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] px-6 py-5 text-base font-medium text-white/70"
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
      <main className="lg:pl-[360px] lg:pr-8 relative z-10">
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
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#050B14]/95 backdrop-blur-2xl border-t border-white/[0.06] safe-area-pb">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all min-w-0 ${
                activeTab === item.id
                  ? item.highlight
                    ? "bg-gradient-to-br from-[#38BDF8] to-[#0284c7] text-white shadow-lg shadow-sky-500/30"
                    : "text-[#38BDF8]"
                  : "text-white/40"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.shortLabel}</span>
            </button>
          ))}
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
