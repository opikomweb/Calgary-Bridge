"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import { languageNames, roleLabels } from "@/lib/data";
import { useAuth } from "@/components/auth-provider";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Globe,
  ChevronDown,
  LogOut,
  Bell,
  Shield,
  HelpCircle,
  Star,
  Check,
  Settings,
  LogIn,
  UserPlus,
  Mail,
  Phone,
  Trash2,
} from "lucide-react";
import type { Language, UserRole } from "@/lib/types";

type Panel = "notifications" | "privacy" | "help" | "rate";

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
    notificationsEnabled,
    setNotificationsEnabled,
  } = useAppStore();

  const { user, isPending, openAuth, signOut } = useAuth();
  const [openPanel, setOpenPanel] = useState<Panel | null>(null);
  const [rating, setRating] = useState(0);

  const languages: Language[] = ["en", "fr", "tl", "es", "ar", "zh"];
  const roles: UserRole[] = ["newcomer", "senior", "business", "ngo", "creator", "family", "student"];

  const displayName = user?.name || userName;

  const togglePanel = (panel: Panel) => setOpenPanel((cur) => (cur === panel ? null : panel));

  return (
    <div className="min-h-screen pb-24 lg:pb-10">
      {/* Page Header */}
      <div className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="px-5 md:px-8 py-8 md:py-10 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
              {/* Profile Avatar */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#1D4ED8] to-[#0A2540] flex items-center justify-center shadow-lg shadow-blue-900/25 flex-shrink-0">
                <User className="h-8 w-8 md:h-9 md:w-9 text-white" />
              </div>

              {/* Profile Info */}
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your name"
                  className="text-2xl md:text-3xl font-bold bg-transparent border-none outline-none w-full placeholder:text-[var(--foreground-muted)] mb-1"
                />
                <p className="text-sm md:text-base text-[var(--foreground-muted)] truncate">
                  {user
                    ? user.email
                    : selectedRole
                      ? roleLabels[selectedRole]?.[activeLanguage] || roleLabels[selectedRole]?.en
                      : "Sign in to sync across devices"}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-3 md:gap-4 mt-2 md:mt-0">
                <Stat value={bookmarkedResources.length} label="Saved" color="#1D4ED8" />
                <Stat value={priorities.length} label="Priorities" color="#E1251B" />
                <Stat
                  value={languageNames[activeLanguage]?.slice(0, 2).toUpperCase() || "EN"}
                  label="Language"
                  color="#0A2540"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 md:px-8 py-6 md:py-8 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="space-y-6 md:space-y-8">
            {/* Language */}
            <Section icon={<Globe className="h-5 w-5 text-[#1D4ED8]" />} title="Language" delay={0.1}>
              <div className="relative">
                <select
                  value={activeLanguage}
                  onChange={(e) => setActiveLanguage(e.target.value as Language)}
                  aria-label="Select language"
                  className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--card)] backdrop-blur-md px-4 py-3.5 pr-11 text-sm font-medium text-[var(--foreground)] outline-none transition-colors focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/30"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {languageNames[lang]}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--foreground-muted)]" />
              </div>
            </Section>

            {/* Role */}
            <Section icon={<User className="h-5 w-5 text-[#1D4ED8]" />} title="I am a..." delay={0.15}>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`flex items-center justify-between px-3 md:px-4 py-2.5 rounded-lg md:rounded-xl border backdrop-blur-md transition-all text-sm ${
                      selectedRole === role
                        ? "bg-[#1D4ED8]/12 border-[#1D4ED8] text-[#1D4ED8]"
                        : "bg-[var(--card)] border-[var(--border)] hover:border-[var(--border-hover)]"
                    }`}
                  >
                    <span className="font-medium truncate">
                      {roleLabels[role]?.[activeLanguage] || roleLabels[role]?.en}
                    </span>
                    {selectedRole === role && <Check className="h-4 w-4 flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </Section>
          </div>

          {/* Right Column */}
          <div className="space-y-6 md:space-y-8">
            {/* Settings */}
            <Section icon={<Settings className="h-5 w-5 text-[#1D4ED8]" />} title="Settings" delay={0.2}>
              <div className="bg-[var(--card)] backdrop-blur-md border border-[var(--border)] rounded-xl md:rounded-2xl overflow-hidden divide-y divide-[var(--border)]">
                {/* Notifications */}
                <SettingsRow
                  icon={<Bell className="h-4 w-4 md:h-5 md:w-5" />}
                  label="Notifications"
                  open={openPanel === "notifications"}
                  onClick={() => togglePanel("notifications")}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Get alerts about new resources, deadlines, and seasonal supports.
                    </p>
                    <Toggle
                      checked={notificationsEnabled}
                      onChange={setNotificationsEnabled}
                      label="Enable notifications"
                    />
                  </div>
                </SettingsRow>

                {/* Privacy */}
                <SettingsRow
                  icon={<Shield className="h-4 w-4 md:h-5 md:w-5" />}
                  label="Privacy"
                  open={openPanel === "privacy"}
                  onClick={() => togglePanel("privacy")}
                >
                  <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                    Calgary Connect stores your saved resources and preferences. When signed in,
                    they sync securely to your account. We never sell your data.
                  </p>
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        localStorage.removeItem("calgary-connect-storage");
                        window.location.reload();
                      }
                    }}
                    className="flex items-center gap-2 text-sm font-semibold text-[#E1251B] hover:underline"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear data on this device
                  </button>
                </SettingsRow>

                {/* Help & Support */}
                <SettingsRow
                  icon={<HelpCircle className="h-4 w-4 md:h-5 md:w-5" />}
                  label="Help & Support"
                  open={openPanel === "help"}
                  onClick={() => togglePanel("help")}
                >
                  <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                    Need a hand? Reach Alberta&apos;s free 24/7 community help line, or email us.
                  </p>
                  <div className="space-y-2">
                    <a href="tel:211" className="flex items-center gap-2.5 text-sm font-semibold text-[#1D4ED8] hover:underline">
                      <Phone className="h-4 w-4" /> Call 211 Alberta
                    </a>
                    <a
                      href="mailto:support@calgaryconnect.ca"
                      className="flex items-center gap-2.5 text-sm font-semibold text-[#1D4ED8] hover:underline"
                    >
                      <Mail className="h-4 w-4" /> support@calgaryconnect.ca
                    </a>
                  </div>
                </SettingsRow>

                {/* Rate */}
                <SettingsRow
                  icon={<Star className="h-4 w-4 md:h-5 md:w-5" />}
                  label="Rate Calgary Connect"
                  open={openPanel === "rate"}
                  onClick={() => togglePanel("rate")}
                  isLast
                >
                  <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                    {rating > 0 ? "Thank you for your feedback!" : "How are we doing? Tap a star."}
                  </p>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => setRating(n)}
                        aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                        className="transition-transform active:scale-90"
                      >
                        <Star
                          className={`h-7 w-7 ${
                            n <= rating ? "fill-[#F5A623] text-[#F5A623]" : "text-foreground/30"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </SettingsRow>
              </div>
            </Section>

            {/* Account */}
            <Section
              icon={<User className={`h-5 w-5 ${user ? "text-[#1D4ED8]" : "text-[#E1251B]"}`} />}
              title="Account"
              delay={0.25}
            >
              {isPending ? (
                <div className="h-14 rounded-2xl bg-foreground/[0.04] animate-pulse" />
              ) : user ? (
                <button
                  onClick={signOut}
                  className="w-full flex items-center justify-center gap-2.5 px-5 py-4 rounded-xl md:rounded-2xl bg-[#E1251B]/10 border border-[#E1251B]/30 text-[#E1251B] hover:bg-[#E1251B]/20 transition-colors"
                >
                  <LogOut className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-semibold text-base">Sign Out</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => openAuth("sign-in")}
                    className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl md:rounded-2xl border border-[#1D4ED8]/40 text-[#1D4ED8] font-semibold hover:bg-[#1D4ED8]/10 transition-colors"
                  >
                    <LogIn className="h-5 w-5" /> Sign In
                  </button>
                  <button
                    onClick={() => openAuth("sign-up")}
                    className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-[#E1251B] to-[#B91C1C] text-white font-semibold shadow-lg shadow-red-900/25 hover:shadow-xl transition-all active:scale-[0.98]"
                  >
                    <UserPlus className="h-5 w-5" /> Sign Up
                  </button>
                </div>
              )}
            </Section>

            <div className="text-center lg:text-left">
              <p className="text-xs text-[var(--foreground-muted)]">Calgary Connect</p>
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

function Stat({ value, label, color }: { value: React.ReactNode; label: string; color: string }) {
  return (
    <div className="text-center px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl bg-[var(--card)] backdrop-blur-md border border-[var(--border)] flex-1 md:flex-initial">
      <p className="text-lg md:text-xl font-bold" style={{ color }}>
        {value}
      </p>
      <p className="text-xs text-[var(--foreground-muted)] mt-0.5">{label}</p>
    </div>
  );
}

function Section({
  icon,
  title,
  delay,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <div className="flex items-center gap-2.5 mb-4">
        {icon}
        <h2 className="text-lg md:text-xl font-bold">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function SettingsRow({
  icon,
  label,
  open,
  onClick,
  isLast = false,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  open: boolean;
  onClick: () => void;
  isLast?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onClick}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 md:px-5 py-3.5 md:py-4 transition-colors hover:bg-foreground/5"
      >
        <div className="flex items-center gap-3 text-[var(--foreground-muted)]">
          {icon}
          <span className="text-sm md:text-base font-medium text-[var(--foreground)]">{label}</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 md:h-5 md:w-5 text-[var(--foreground-muted)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className={`px-4 md:px-5 pb-4 md:pb-5 ${isLast ? "" : ""}`}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 flex-shrink-0 rounded-full transition-colors ${
        checked ? "bg-[#1D4ED8]" : "bg-foreground/20"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
