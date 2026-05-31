"use client";

import React from "react";
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

export default function MainApp() {
  const { activeTab, setActiveTab, activeLanguage, showEmergency, setShowEmergency } = useAppStore();
  const [showRentShield, setShowRentShield] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const t = (key: string) => translations[key]?.[activeLanguage] || translations[key]?.en || key;

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "explore", icon: Compass, label: "Explore" },
    { id: "ai", icon: MessageCircle, label: "AI Guide", highlight: true },
    { id: "shortlist", icon: Heart, label: "Saved" },
    { id: "profile", icon: User, label: "Profile" },
  ] as const;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-[var(--border)] bg-[var(--background)] px-6 py-8">
          {/* Logo */}
          <div className="flex items-center gap-4 px-2">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#38BDF8] to-[#0284c7] flex items-center justify-center shadow-xl shadow-sky-500/30">
                <svg width="32" height="32" viewBox="0 0 64 64" fill="none" className="text-white">
                  <path d="M32 6L26 18H38L32 6Z" fill="currentColor" />
                  <rect x="28" y="18" width="8" height="6" fill="currentColor" />
                  <path d="M24 24H40V28L38 32H26L24 28V24Z" fill="currentColor" />
                  <rect x="27" y="32" width="10" height="6" rx="1" fill="currentColor" />
                  <rect x="29" y="38" width="6" height="18" fill="currentColor" />
                  <ellipse cx="32" cy="58" rx="8" ry="2" fill="currentColor" opacity="0.4" />
                  <rect x="26" y="25" width="2" height="2" rx="0.5" fill="#07111F" opacity="0.5" />
                  <rect x="30" y="25" width="2" height="2" rx="0.5" fill="#07111F" opacity="0.5" />
                  <rect x="34" y="25" width="2" height="2" rx="0.5" fill="#07111F" opacity="0.5" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#FBBF24] border-2 border-[#07111F]" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Calgary Connect</h1>
              <p className="text-sm text-[var(--foreground-muted)]">Your civic navigator</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex flex-1 flex-col mt-8">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`group flex w-full items-center gap-x-4 rounded-xl px-4 py-3.5 text-base font-medium transition-all ${
                      activeTab === item.id
                        ? item.highlight
                          ? "bg-gradient-to-r from-[#38BDF8] to-[#0284c7] text-white shadow-lg shadow-sky-500/25"
                          : "bg-[#38BDF8]/15 text-[#38BDF8]"
                        : "text-[var(--foreground-muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Sidebar Action Buttons */}
            <div className="mt-auto space-y-3 pt-8 border-t border-[var(--border)]">
              <button
                onClick={() => setShowRentShield(true)}
                className="flex w-full items-center gap-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] px-4 py-3.5 text-sm font-medium transition-all hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)]"
              >
                <Shield className="h-5 w-5 text-[#38BDF8]" />
                RentShield
              </button>
              <button
                onClick={() => setShowEmergency(true)}
                className="flex w-full items-center gap-3 rounded-xl bg-[#E1251B] px-4 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#c01f17] shadow-lg shadow-red-500/25"
              >
                <AlertTriangle className="h-5 w-5" />
                Emergency Hub
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile Header - Hidden on desktop */}
      <header className="lg:hidden glass sticky top-0 z-40 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#0284c7] flex items-center justify-center shadow-lg shadow-sky-500/25">
                <svg width="24" height="24" viewBox="0 0 64 64" fill="none" className="text-white">
                  <path d="M32 6L26 18H38L32 6Z" fill="currentColor" />
                  <rect x="28" y="18" width="8" height="6" fill="currentColor" />
                  <path d="M24 24H40V28L38 32H26L24 28V24Z" fill="currentColor" />
                  <rect x="27" y="32" width="10" height="6" rx="1" fill="currentColor" />
                  <rect x="29" y="38" width="6" height="18" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#FBBF24] border-2 border-[#07111F]" />
            </div>
            <span className="text-lg font-bold">Calgary Connect</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEmergency(true)}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#E1251B] text-white"
            >
              <AlertTriangle className="h-5 w-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)]"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-[var(--background)] border-l border-[var(--border)] p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="mt-8 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-base font-medium transition-all ${
                      activeTab === item.id
                        ? "bg-[#38BDF8]/15 text-[#38BDF8]"
                        : "text-[var(--foreground-muted)] hover:bg-[var(--surface)]"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-8 space-y-3 pt-8 border-t border-[var(--border)]">
                <button
                  onClick={() => {
                    setShowRentShield(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] px-4 py-3.5 text-sm font-medium"
                >
                  <Shield className="h-5 w-5 text-[#38BDF8]" />
                  RentShield
                </button>
                <button
                  onClick={() => {
                    setShowEmergency(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl bg-[#E1251B] px-4 py-3.5 text-sm font-medium text-white"
                >
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Hub
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area - With sidebar offset on desktop */}
      <main className="lg:pl-72">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "home" && <HomeTab />}
            {activeTab === "explore" && <ExploreTab />}
            {activeTab === "ai" && <AITab />}
            {activeTab === "shortlist" && <ShortlistTab />}
            {activeTab === "profile" && <ProfileTab />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation - Hidden on desktop */}
      <nav className="lg:hidden glass fixed bottom-0 left-0 right-0 z-40 safe-area-pb">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all ${
                activeTab === item.id
                  ? item.highlight
                    ? "bg-gradient-to-br from-[#38BDF8] to-[#0284c7] text-white shadow-lg shadow-sky-500/30"
                    : "text-[#38BDF8]"
                  : "text-[var(--foreground-muted)]"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
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
    </div>
  );
}
