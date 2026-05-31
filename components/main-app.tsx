"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/data";
import { Home, Compass, MessageCircle, Heart, User, AlertTriangle, Shield } from "lucide-react";
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

  const t = (key: string) => translations[key]?.[activeLanguage] || translations[key]?.en || key;

  return (
    <div className="flex min-h-screen flex-col pb-24">
      {/* Header */}
      <header className="glass sticky top-0 z-40 px-8 lg:px-16 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            {/* Iconic Calgary Tower Logo - Recognizable silhouette */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#38BDF8] to-[#0284c7] flex items-center justify-center shadow-xl shadow-sky-500/30">
                <svg width="36" height="36" viewBox="0 0 64 64" fill="none" className="text-white">
                  {/* Calgary Tower - Iconic silhouette with observation deck */}
                  <path d="M32 6L26 18H38L32 6Z" fill="currentColor" />
                  <rect x="28" y="18" width="8" height="6" fill="currentColor" />
                  <path d="M24 24H40V28L38 32H26L24 28V24Z" fill="currentColor" />
                  <rect x="27" y="32" width="10" height="6" rx="1" fill="currentColor" />
                  <rect x="29" y="38" width="6" height="18" fill="currentColor" />
                  <ellipse cx="32" cy="58" rx="8" ry="2" fill="currentColor" opacity="0.4" />
                  {/* Observation deck windows */}
                  <rect x="26" y="25" width="2" height="2" rx="0.5" fill="#07111F" opacity="0.5" />
                  <rect x="30" y="25" width="2" height="2" rx="0.5" fill="#07111F" opacity="0.5" />
                  <rect x="34" y="25" width="2" height="2" rx="0.5" fill="#07111F" opacity="0.5" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#FBBF24] border-2 border-[#07111F] shadow-lg shadow-amber-500/30" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Calgary Connect</h1>
              <p className="text-sm text-[var(--foreground-muted)] mt-1">Your civic navigator</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowRentShield(true)}
              className="flex items-center gap-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] px-5 py-3.5 text-button transition-all hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] active:scale-95"
            >
              <Shield className="h-5 w-5 text-[#38BDF8]" />
              <span className="hidden sm:inline">{t("rentshield")}</span>
            </button>
            <button
              onClick={() => setShowEmergency(true)}
              className="flex items-center gap-3 rounded-xl bg-[#E1251B] px-5 py-3.5 text-button text-white transition-all hover:bg-[#c01f17] active:scale-95 shadow-lg shadow-red-500/25"
            >
              <AlertTriangle className="h-5 w-5" />
              <span className="hidden sm:inline">{t("emergency")}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
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

      {/* Bottom Navigation - Premium Native App Feel */}
      <nav className="glass fixed bottom-0 left-0 right-0 z-40 safe-area-pb">
        <div className="max-w-lg mx-auto flex items-center justify-around px-3 py-4">
          <NavButton
            active={activeTab === "home"}
            onClick={() => setActiveTab("home")}
            icon={<Home className="h-6 w-6" />}
            label={t("home")}
          />
          <NavButton
            active={activeTab === "explore"}
            onClick={() => setActiveTab("explore")}
            icon={<Compass className="h-6 w-6" />}
            label={t("explore")}
          />
          <NavButton
            active={activeTab === "ai"}
            onClick={() => setActiveTab("ai")}
            icon={<MessageCircle className="h-6 w-6" />}
            label="AI Guide"
            highlight
          />
          <NavButton
            active={activeTab === "shortlist"}
            onClick={() => setActiveTab("shortlist")}
            icon={<Heart className="h-6 w-6" />}
            label={t("shortlist")}
          />
          <NavButton
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
            icon={<User className="h-6 w-6" />}
            label={t("profile")}
          />
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

function NavButton({
  active,
  onClick,
  icon,
  label,
  highlight,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 rounded-2xl px-4 py-2.5 transition-all active:scale-95 ${
        active
          ? highlight 
            ? "bg-gradient-to-br from-[#38BDF8] to-[#0284c7] text-white shadow-lg shadow-sky-500/30"
            : "bg-[#38BDF8]/15 text-[#38BDF8]"
          : highlight
            ? "text-[var(--foreground-muted)] hover:text-[#38BDF8]"
            : "text-[var(--foreground-muted)] hover:text-white"
      }`}
    >
      {icon}
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}
