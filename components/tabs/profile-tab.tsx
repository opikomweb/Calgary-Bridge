"use client";

import { useAppStore } from "@/lib/store";
import { languageNames, roleLabels } from "@/lib/data";
import { motion } from "framer-motion";
import {
  User,
  Globe,
  ChevronRight,
  LogOut,
  Bell,
  Shield,
  HelpCircle,
  Star,
  Check,
  Settings,
} from "lucide-react";
import type { Language, UserRole } from "@/lib/types";

export default function ProfileTab() {
  const {
    activeLanguage,
    setActiveLanguage,
    selectedRole,
    setSelectedRole,
    userName,
    setUserName,
    priorities,
    bookmarkedResources,
    setCurrentPage,
    setHasOnboarded,
  } = useAppStore();

  const handleSignOut = () => {
    setHasOnboarded(false);
    setCurrentPage("landing");
  };

  const languages: Language[] = ["en", "fr", "tl", "es", "ar", "zh"];
  const roles: UserRole[] = ["newcomer", "senior", "business", "ngo", "creator", "family", "student"];

  return (
    <div className="min-h-screen pb-24 lg:pb-10">
      {/* Page Header */}
      <div className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="px-5 md:px-8 py-8 md:py-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
              {/* Profile Avatar */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] flex items-center justify-center shadow-xl shadow-sky-500/20 flex-shrink-0">
                <User className="h-10 w-10 md:h-12 md:w-12 text-white" />
              </div>
              
              {/* Profile Info */}
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your name"
                  className="text-2xl md:text-3xl font-bold bg-transparent border-none outline-none w-full placeholder:text-[var(--foreground-muted)] mb-1"
                />
                <p className="text-sm md:text-base text-[var(--foreground-muted)]">
                  {selectedRole ? roleLabels[selectedRole]?.[activeLanguage] || roleLabels[selectedRole]?.en : "Select your role below"}
                </p>
              </div>

              {/* Stats - Desktop inline */}
              <div className="flex gap-3 md:gap-4 mt-2 md:mt-0">
                <div className="text-center px-4 py-3 md:px-5 md:py-4 rounded-xl md:rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex-1 md:flex-initial">
                  <p className="text-xl md:text-2xl font-bold text-[#0ea5e9]">{bookmarkedResources.length}</p>
                  <p className="text-xs text-[var(--foreground-muted)] mt-0.5">Saved</p>
                </div>
                <div className="text-center px-4 py-3 md:px-5 md:py-4 rounded-xl md:rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex-1 md:flex-initial">
                  <p className="text-xl md:text-2xl font-bold text-[#22c55e]">{priorities.length}</p>
                  <p className="text-xs text-[var(--foreground-muted)] mt-0.5">Priorities</p>
                </div>
                <div className="text-center px-4 py-3 md:px-5 md:py-4 rounded-xl md:rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex-1 md:flex-initial">
                  <p className="text-xl md:text-2xl font-bold text-[#f59e0b]">
                    {languageNames[activeLanguage]?.slice(0, 2).toUpperCase() || "EN"}
                  </p>
                  <p className="text-xs text-[var(--foreground-muted)] mt-0.5">Language</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Settings Content - Full width grid on desktop */}
      <div className="px-5 md:px-8 py-6 md:py-8 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="space-y-6 md:space-y-8">
            {/* Language Selection */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <Globe className="h-5 w-5 text-[#38BDF8]" />
                <h2 className="text-lg md:text-xl font-bold">Language</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLanguage(lang)}
                    className={`flex items-center justify-between px-3 md:px-4 py-3 rounded-lg md:rounded-xl border transition-all text-sm ${
                      activeLanguage === lang
                        ? "bg-[#38BDF8]/15 border-[#38BDF8] text-[#38BDF8]"
                        : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-hover)]"
                    }`}
                  >
                    <span className="font-medium truncate">{languageNames[lang]}</span>
                    {activeLanguage === lang && <Check className="h-4 w-4 flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </motion.section>

            {/* Role Selection */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <User className="h-5 w-5 text-[#38BDF8]" />
                <h2 className="text-lg md:text-xl font-bold">I am a...</h2>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`flex items-center justify-between px-3 md:px-4 py-3 rounded-lg md:rounded-xl border transition-all text-sm ${
                      selectedRole === role
                        ? "bg-[#38BDF8]/15 border-[#38BDF8] text-[#38BDF8]"
                        : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-hover)]"
                    }`}
                  >
                    <span className="font-medium truncate">{roleLabels[role]?.[activeLanguage] || roleLabels[role]?.en}</span>
                    {selectedRole === role && <Check className="h-4 w-4 flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Column */}
          <div className="space-y-6 md:space-y-8">
            {/* Settings Menu */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <Settings className="h-5 w-5 text-[#38BDF8]" />
                <h2 className="text-lg md:text-xl font-bold">Settings</h2>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl md:rounded-2xl overflow-hidden">
                <MenuItem icon={<Bell className="h-4 w-4 md:h-5 md:w-5" />} label="Notifications" />
                <MenuItem icon={<Shield className="h-4 w-4 md:h-5 md:w-5" />} label="Privacy" />
                <MenuItem icon={<HelpCircle className="h-4 w-4 md:h-5 md:w-5" />} label="Help & Support" />
                <MenuItem icon={<Star className="h-4 w-4 md:h-5 md:w-5" />} label="Rate Calgary Connect" isLast />
              </div>
            </motion.section>

            {/* Account Actions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <LogOut className="h-5 w-5 text-[#ef4444]" />
                <h2 className="text-lg md:text-xl font-bold">Account</h2>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2.5 px-5 py-4 rounded-xl md:rounded-2xl bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] hover:bg-[#ef4444]/20 transition-colors"
              >
                <LogOut className="h-4 w-4 md:h-5 md:w-5" />
                <span className="font-semibold text-base">Sign Out</span>
              </button>
            </motion.section>

            {/* App Info */}
            <div className="text-center lg:text-left">
              <p className="text-xs text-[var(--foreground-muted)]">
                Calgary Connect v1.0.0
              </p>
              <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
                Made with care for Calgary residents
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  isLast = false,
}: {
  icon: React.ReactNode;
  label: string;
  isLast?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center justify-between px-4 md:px-5 py-3.5 md:py-4 transition-colors hover:bg-white/5 ${
        !isLast ? "border-b border-[var(--border)]" : ""
      }`}
    >
      <div className="flex items-center gap-3 text-[var(--foreground-muted)]">
        {icon}
        <span className="text-sm md:text-base font-medium text-[var(--foreground)]">{label}</span>
      </div>
      <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-[var(--foreground-muted)]" />
    </button>
  );
}
