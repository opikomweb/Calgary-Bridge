"use client";

import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/data";
import { Home, Compass, MessageCircle, Heart, User, AlertTriangle, Shield } from "lucide-react";
import { motion } from "framer-motion";
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
      <header className="glass sticky top-0 z-40 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Calgary Connect</h1>
              <p className="text-xs text-[var(--foreground-muted)]">Your civic navigator</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRentShield(true)}
              className="flex items-center gap-2 rounded-full bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-sm font-medium transition-all hover:border-[var(--border-hover)] active:scale-95"
            >
              <Shield className="h-4 w-4 text-[#0ea5e9]" />
              <span className="hidden sm:inline">{t("rentshield")}</span>
            </button>
            <button
              onClick={() => setShowEmergency(true)}
              className="flex items-center gap-2 rounded-full bg-[var(--secondary)] px-3 py-2 text-sm font-medium text-white transition-all active:scale-95"
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">{t("emergency")}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "home" && <HomeTab />}
          {activeTab === "explore" && <ExploreTab />}
          {activeTab === "ai" && <AITab />}
          {activeTab === "shortlist" && <ShortlistTab />}
          {activeTab === "profile" && <ProfileTab />}
        </motion.div>
      </main>

      {/* Bottom Navigation */}
      <nav className="glass fixed bottom-0 left-0 right-0 z-40 safe-area-pb">
        <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-2">
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
            label={t("aiGuide")}
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
      {showEmergency && <EmergencyHub onClose={() => setShowEmergency(false)} />}
      
      {/* RentShield Modal */}
      {showRentShield && <RentShield onClose={() => setShowRentShield(false)} />}
    </div>
  );
}

import React from "react";

function NavButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all active:scale-95 ${
        active
          ? "bg-[#0ea5e9]/15 text-[#0ea5e9]"
          : "text-[var(--foreground-muted)] hover:text-white"
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
