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
      <header className="glass sticky top-0 z-40 px-4 lg:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#1d4ed8] flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L8 8H16L12 2Z" fill="currentColor" />
                  <rect x="10" y="8" width="4" height="12" fill="currentColor" />
                  <rect x="8" y="18" width="8" height="4" rx="1" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#F5B942] border-2 border-[#07111F]" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Calgary Connect</h1>
              <p className="text-[11px] text-[var(--foreground-muted)]">Your civic navigator</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRentShield(true)}
              className="flex items-center gap-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] px-3.5 py-2.5 text-sm font-medium transition-all hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] active:scale-95"
            >
              <Shield className="h-4 w-4 text-[#3B82F6]" />
              <span className="hidden sm:inline">{t("rentshield")}</span>
            </button>
            <button
              onClick={() => setShowEmergency(true)}
              className="flex items-center gap-2 rounded-xl bg-[#E1251B] px-3.5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#c01f17] active:scale-95 shadow-lg shadow-red-500/20"
            >
              <AlertTriangle className="h-4 w-4" />
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
        <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-3">
          <NavButton
            active={activeTab === "home"}
            onClick={() => setActiveTab("home")}
            icon={<Home className="h-5 w-5" />}
            label={t("home")}
          />
          <NavButton
            active={activeTab === "explore"}
            onClick={() => setActiveTab("explore")}
            icon={<Compass className="h-5 w-5" />}
            label={t("explore")}
          />
          <NavButton
            active={activeTab === "ai"}
            onClick={() => setActiveTab("ai")}
            icon={<MessageCircle className="h-5 w-5" />}
            label="AI Guide"
            highlight
          />
          <NavButton
            active={activeTab === "shortlist"}
            onClick={() => setActiveTab("shortlist")}
            icon={<Heart className="h-5 w-5" />}
            label={t("shortlist")}
          />
          <NavButton
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
            icon={<User className="h-5 w-5" />}
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
      className={`flex flex-col items-center gap-1 rounded-2xl px-4 py-2 transition-all active:scale-95 ${
        active
          ? highlight 
            ? "bg-gradient-to-br from-[#3B82F6] to-[#1d4ed8] text-white shadow-lg shadow-blue-500/25"
            : "bg-[#3B82F6]/15 text-[#3B82F6]"
          : highlight
            ? "text-[var(--foreground-muted)] hover:text-[#3B82F6]"
            : "text-[var(--foreground-muted)] hover:text-white"
      }`}
    >
      {icon}
      <span className="text-[10px] font-semibold">{label}</span>
    </button>
  );
}
