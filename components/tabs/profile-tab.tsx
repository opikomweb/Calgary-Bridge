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
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="px-8 lg:px-16 py-12 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              {/* Profile Avatar */}
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] flex items-center justify-center shadow-2xl shadow-sky-500/30">
                <User className="h-14 w-14 text-white" />
              </div>
              
              {/* Profile Info */}
              <div className="flex-1">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your name"
                  className="text-4xl font-bold bg-transparent border-none outline-none w-full placeholder:text-[var(--foreground-muted)] mb-2"
                />
                <p className="text-lg text-[var(--foreground-muted)]">
                  {selectedRole ? roleLabels[selectedRole]?.[activeLanguage] || roleLabels[selectedRole]?.en : "Select your role below"}
                </p>
              </div>

              {/* Stats - Desktop inline */}
              <div className="flex gap-6">
                <div className="text-center px-6 py-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                  <p className="text-3xl font-bold text-[#0ea5e9]">{bookmarkedResources.length}</p>
                  <p className="text-sm text-[var(--foreground-muted)] mt-1">Saved</p>
                </div>
                <div className="text-center px-6 py-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                  <p className="text-3xl font-bold text-[#22c55e]">{priorities.length}</p>
                  <p className="text-sm text-[var(--foreground-muted)] mt-1">Priorities</p>
                </div>
                <div className="text-center px-6 py-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                  <p className="text-3xl font-bold text-[#f59e0b]">
                    {languageNames[activeLanguage]?.slice(0, 2).toUpperCase() || "EN"}
                  </p>
                  <p className="text-sm text-[var(--foreground-muted)] mt-1">Language</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Settings Content - Full width grid on desktop */}
      <div className="px-8 lg:px-16 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left Column */}
          <div className="space-y-10">
            {/* Language Selection */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-6 w-6 text-[#38BDF8]" />
                <h2 className="text-2xl font-bold">Language</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLanguage(lang)}
                    className={`flex items-center justify-between px-5 py-4 rounded-xl border transition-all ${
                      activeLanguage === lang
                        ? "bg-[#38BDF8]/15 border-[#38BDF8] text-[#38BDF8]"
                        : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-hover)]"
                    }`}
                  >
                    <span className="font-medium">{languageNames[lang]}</span>
                    {activeLanguage === lang && <Check className="h-5 w-5" />}
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
              <div className="flex items-center gap-3 mb-6">
                <User className="h-6 w-6 text-[#38BDF8]" />
                <h2 className="text-2xl font-bold">I am a...</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`flex items-center justify-between px-5 py-4 rounded-xl border transition-all ${
                      selectedRole === role
                        ? "bg-[#38BDF8]/15 border-[#38BDF8] text-[#38BDF8]"
                        : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-hover)]"
                    }`}
                  >
                    <span className="font-medium">{roleLabels[role]?.[activeLanguage] || roleLabels[role]?.en}</span>
                    {selectedRole === role && <Check className="h-5 w-5" />}
                  </button>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Column */}
          <div className="space-y-10">
            {/* Settings Menu */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Settings className="h-6 w-6 text-[#38BDF8]" />
                <h2 className="text-2xl font-bold">Settings</h2>
              </div>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
                <MenuItem icon={<Bell className="h-5 w-5" />} label="Notifications" />
                <MenuItem icon={<Shield className="h-5 w-5" />} label="Privacy" />
                <MenuItem icon={<HelpCircle className="h-5 w-5" />} label="Help & Support" />
                <MenuItem icon={<Star className="h-5 w-5" />} label="Rate Calgary Connect" isLast />
              </div>
            </motion.section>

            {/* Account Actions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <LogOut className="h-6 w-6 text-[#ef4444]" />
                <h2 className="text-2xl font-bold">Account</h2>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-3 px-6 py-5 rounded-2xl bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] hover:bg-[#ef4444]/20 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-semibold text-lg">Sign Out</span>
              </button>
            </motion.section>

            {/* App Info */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-[var(--foreground-muted)]">
                Calgary Connect v1.0.0
              </p>
              <p className="text-xs text-[var(--foreground-muted)] mt-1">
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
      className={`w-full flex items-center justify-between px-6 py-5 transition-colors hover:bg-white/5 ${
        !isLast ? "border-b border-[var(--border)]" : ""
      }`}
    >
      <div className="flex items-center gap-4 text-[var(--foreground-muted)]">
        {icon}
        <span className="text-base font-medium text-[var(--foreground)]">{label}</span>
      </div>
      <ChevronRight className="h-5 w-5 text-[var(--foreground-muted)]" />
    </button>
  );
}
