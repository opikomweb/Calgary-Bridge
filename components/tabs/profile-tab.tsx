"use client";

import { useAppStore } from "@/lib/store";
import { translations, languageNames, roleLabels } from "@/lib/data";
import { motion } from "framer-motion";
import {
  User,
  Globe,
  Heart,
  Settings,
  ChevronRight,
  LogOut,
  Bell,
  Shield,
  HelpCircle,
  Star,
  Check,
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

  const t = (key: string) =>
    translations[key]?.[activeLanguage] || translations[key]?.en || key;

  const handleSignOut = () => {
    setHasOnboarded(false);
    setCurrentPage("landing");
  };

  const languages: Language[] = ["en", "fr", "tl", "es", "ar", "zh"];
  const roles: UserRole[] = ["newcomer", "senior", "business", "ngo", "creator", "family", "student"];

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] flex items-center justify-center">
            <User className="h-10 w-10 text-white" />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={t("yourName") || "Your name"}
              className="text-xl font-semibold bg-transparent border-none outline-none w-full placeholder:text-[var(--foreground-muted)]"
            />
            <p className="text-sm text-[var(--foreground-muted)]">
              {selectedRole ? roleLabels[selectedRole]?.[activeLanguage] || roleLabels[selectedRole]?.en : t("selectRole")}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="card-glass rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-[#0ea5e9]">{bookmarkedResources.length}</p>
            <p className="text-xs text-[var(--foreground-muted)]">{t("saved") || "Saved"}</p>
          </div>
          <div className="card-glass rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-[#22c55e]">{priorities.length}</p>
            <p className="text-xs text-[var(--foreground-muted)]">{t("priorities") || "Priorities"}</p>
          </div>
          <div className="card-glass rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-[#f59e0b]">
              {languageNames[activeLanguage]?.slice(0, 2) || "EN"}
            </p>
            <p className="text-xs text-[var(--foreground-muted)]">{t("language") || "Language"}</p>
          </div>
        </div>
      </motion.div>

      {/* Language Selection */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <h3 className="text-sm font-medium text-[var(--foreground-muted)] mb-3 px-1">
          {t("selectLanguage") || "Language"}
        </h3>
        <div className="card-glass rounded-2xl overflow-hidden">
          {languages.map((lang, index) => (
            <button
              key={lang}
              onClick={() => setActiveLanguage(lang)}
              className={`w-full flex items-center justify-between px-4 py-3 transition-colors hover:bg-white/5 ${
                index !== languages.length - 1 ? "border-b border-[var(--border)]" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-[var(--foreground-muted)]" />
                <span>{languageNames[lang]}</span>
              </div>
              {activeLanguage === lang && (
                <Check className="h-5 w-5 text-[#0ea5e9]" />
              )}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Role Selection */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-6"
      >
        <h3 className="text-sm font-medium text-[var(--foreground-muted)] mb-3 px-1">
          {t("selectRole") || "I am a..."}
        </h3>
        <div className="card-glass rounded-2xl overflow-hidden">
          {roles.map((role, index) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`w-full flex items-center justify-between px-4 py-3 transition-colors hover:bg-white/5 ${
                index !== roles.length - 1 ? "border-b border-[var(--border)]" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-[var(--foreground-muted)]" />
                <span>{roleLabels[role]?.[activeLanguage] || roleLabels[role]?.en}</span>
              </div>
              {selectedRole === role && (
                <Check className="h-5 w-5 text-[#0ea5e9]" />
              )}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Settings Menu */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <h3 className="text-sm font-medium text-[var(--foreground-muted)] mb-3 px-1">
          {t("settings") || "Settings"}
        </h3>
        <div className="card-glass rounded-2xl overflow-hidden">
          <MenuItem
            icon={<Bell className="h-5 w-5" />}
            label={t("notifications") || "Notifications"}
          />
          <MenuItem
            icon={<Shield className="h-5 w-5" />}
            label={t("privacy") || "Privacy"}
          />
          <MenuItem
            icon={<HelpCircle className="h-5 w-5" />}
            label={t("helpSupport") || "Help & Support"}
          />
          <MenuItem
            icon={<Star className="h-5 w-5" />}
            label={t("rateApp") || "Rate the App"}
            isLast
          />
        </div>
      </motion.section>

      {/* Sign Out */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <button
          onClick={handleSignOut}
          className="w-full card-glass rounded-2xl px-4 py-4 flex items-center justify-center gap-2 text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">{t("signOut") || "Sign Out"}</span>
        </button>
      </motion.div>

      {/* App Version */}
      <p className="text-center text-xs text-[var(--foreground-muted)] mt-6">
        Calgary Connect v1.0.0
      </p>
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
      className={`w-full flex items-center justify-between px-4 py-3 transition-colors hover:bg-white/5 ${
        !isLast ? "border-b border-[var(--border)]" : ""
      }`}
    >
      <div className="flex items-center gap-3 text-[var(--foreground-muted)]">
        {icon}
        <span className="text-[var(--foreground)]">{label}</span>
      </div>
      <ChevronRight className="h-5 w-5 text-[var(--foreground-muted)]" />
    </button>
  );
}
