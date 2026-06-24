"use client";

import React, { useState, useRef, useEffect, Suspense, lazy } from "react";
import { useAppStore } from "@/lib/store";
import { languageNames, roleLabels } from "@/lib/data";
import { LANGUAGES } from "@/lib/languages";
import { useAuth } from "@/components/auth-provider";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const CalgaryPulsePanel = dynamic(
  () => import("@/components/calgary-pulse-panel").then(m => ({ default: m.CalgaryPulsePanel })),
  { ssr: false }
);
import {
  User,
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
  Globe,
  TrendingUp,
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
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const roles: UserRole[] = ["newcomer", "senior", "business", "ngo", "creator", "family", "student"];

  const displayName = user?.name || userName;

  const togglePanel = (panel: Panel) => setOpenPanel((cur) => (cur === panel ? null : panel));

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="pb-6 lg:pb-8">
      {/* ── Compact Profile Header ── */}
      <div className="border-b border-[var(--border)] bg-[var(--background)] px-4 md:px-8 py-4 md:py-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          {/* Avatar — no background, just the icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-[#1D4ED8]/40 flex items-center justify-center bg-[#1D4ED8]/08">
            <User className="h-5 w-5 text-[#1D4ED8]" />
          </div>

          {/* Name + subtitle */}
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name"
              className="text-base font-bold bg-transparent border-none outline-none w-full placeholder:text-[var(--foreground-muted)] leading-tight"
            />
            <p className="text-xs text-[var(--foreground-muted)] truncate leading-tight mt-0.5">
              {user
                ? user.email
                : selectedRole
                  ? roleLabels[selectedRole]?.en
                  : "Sign in to sync across devices"}
            </p>
          </div>

          {/* Mini stats */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <MiniStat value={bookmarkedResources.length} label="Saved" color="#1D4ED8" />
            <MiniStat value={priorities.length} label="Priorities" color="#E1251B" />

            {/* Language flag dropdown — native names, never auto-translate */}
            <div translate="no" className="notranslate relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((o) => !o)}
                aria-label="Select language"
                className="flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] min-w-[44px] hover:border-[#1D4ED8]/50 transition-colors"
              >
                <span className="text-base leading-none">{LANGUAGES.find(l => l.code === activeLanguage)?.flag}</span>
                <span className="text-[9px] text-[var(--foreground-muted)] leading-none">
                  {activeLanguage.toUpperCase().replace("-CN", "")}
                </span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1.5 w-48 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-xl overflow-hidden z-50"
                  >
                    {LANGUAGES.map(({ code, flag, name }) => (
                      <button
                        key={code}
                        onClick={() => { setActiveLanguage(code); setLangOpen(false); }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors hover:bg-foreground/[0.06] ${
                          activeLanguage === code
                            ? "text-[#1D4ED8] font-semibold"
                            : "text-[var(--foreground)]"
                        }`}
                      >
                        <span className="text-base">{flag}</span>
                        <span className="flex-1 text-left">{name}</span>
                        {activeLanguage === code && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Content ── */}
      {/*
        Mobile  (single col): order — "I am a..." (1) → Settings+Account (2) → Pulse (3, last)
        Desktop (flex row):   LEFT col = "I am a..." stacked above Pulse | RIGHT col = Settings+Account
        Achieved with: outer flex-col lg:flex-row, left col wraps "I am a..." + Pulse,
        right col wraps Settings+Account. On mobile the left col becomes flex-col too,
        but we use `order-3` on Pulse so it drops below Settings+Account.
      */}
      <div className="px-4 md:px-8 py-5 md:py-8 max-w-5xl">
        {/* Outer: single col on mobile, two-col on desktop */}
        <div className="flex flex-col lg:flex-row gap-5 md:gap-8 items-start">

          {/* ── LEFT column (desktop) — "I am a..." + Calgary Pulse stacked ── */}
          {/* On mobile this wrapper is full-width flex-col; Pulse has order-3 to go last */}
          <div className="w-full lg:w-[calc(50%-1rem)] xl:w-[calc(50%-1.25rem)] flex flex-col gap-5 md:gap-6">

            {/* "I am a..." — order-1 on mobile (appears first) */}
            <div className="order-1">
              <Section icon={<User className="h-4 w-4 text-[#1D4ED8]" />} title="I am a..." delay={0.05}>
                <div className="relative">
                  <select
                    value={selectedRole || ""}
                    onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                    aria-label="Select your role"
                    className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 pr-10 text-sm font-medium text-[var(--foreground)] outline-none transition-colors focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20"
                  >
                    <option value="" disabled>Select who you are...</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {roleLabels[role]?.[activeLanguage] || roleLabels[role]?.en}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--foreground-muted)]" />
                </div>
              </Section>
            </div>

            {/* Calgary Pulse — order-3 on mobile (after Settings+Account), order-2 inside left col on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="order-3 lg:order-2"
            >
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-[#1D4ED8]" />
                <h2 className="text-sm font-bold text-[var(--foreground)]">Calgary Pulse</h2>
              </div>
              <CalgaryPulsePanel />
            </motion.div>
          </div>

          {/* ── RIGHT column — Settings + Account — order-2 on mobile, order-1 inside right col on desktop ── */}
          <div className="w-full lg:w-[calc(50%-1rem)] xl:w-[calc(50%-1.25rem)] order-2 space-y-5 md:space-y-8">
            {/* Settings */}
            <Section icon={<Settings className="h-4 w-4 text-[#1D4ED8]" />} title="Settings" delay={0.1}>
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden divide-y divide-[var(--border)]">
                <SettingsRow
                  icon={<Bell className="h-4 w-4" />}
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

                <SettingsRow
                  icon={<Shield className="h-4 w-4" />}
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

                <SettingsRow
                  icon={<HelpCircle className="h-4 w-4" />}
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

                <SettingsRow
                  icon={<Star className="h-4 w-4" />}
                  label="Rate Calgary Connect"
                  open={openPanel === "rate"}
                  onClick={() => togglePanel("rate")}
                  isLast
                >
                  <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                    {rating > 0 ? "Thank you for your feedback!" : "How are we doing? Tap a star."}
                  </p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => setRating(n)}
                        aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                        className="transition-transform active:scale-90"
                      >
                        <Star
                          className={`h-6 w-6 ${n <= rating ? "fill-[#F5A623] text-[#F5A623]" : "text-foreground/30"}`}
                        />
                      </button>
                    ))}
                  </div>
                </SettingsRow>
              </div>
            </Section>

            {/* Account */}
            <Section
              icon={<User className={`h-4 w-4 ${user ? "text-[#1D4ED8]" : "text-[#E1251B]"}`} />}
              title="Account"
              delay={0.15}
            >
              {isPending ? (
                <div className="h-11 rounded-xl bg-foreground/[0.04] animate-pulse" />
              ) : user ? (
                <button
                  onClick={signOut}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#E1251B]/10 border border-[#E1251B]/30 text-[#E1251B] hover:bg-[#E1251B]/20 transition-colors text-sm font-semibold"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => openAuth("sign-in")}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#1D4ED8]/40 text-[#1D4ED8] text-sm font-semibold hover:bg-[#1D4ED8]/10 transition-colors"
                  >
                    <LogIn className="h-4 w-4" /> Sign In
                  </button>
                  <button
                    onClick={() => openAuth("sign-up")}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E1251B] to-[#B91C1C] text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                  >
                    <UserPlus className="h-4 w-4" /> Sign Up
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

function MiniStat({ value, label, color }: { value: React.ReactNode; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-2 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] min-w-[44px]">
      <span className="text-sm font-bold leading-none" style={{ color }}>{value}</span>
      <span className="text-[9px] text-[var(--foreground-muted)] leading-none mt-0.5">{label}</span>
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
    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h2 className="text-sm font-bold text-[var(--foreground)]">{title}</h2>
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
        className="w-full flex items-center justify-between px-4 py-3 transition-colors hover:bg-foreground/5"
      >
        <div className="flex items-center gap-2.5 text-[var(--foreground-muted)]">
          {icon}
          <span className="text-sm font-medium text-[var(--foreground)]">{label}</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-[var(--foreground-muted)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">{children}</div>
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
      className={`relative h-6 w-10 flex-shrink-0 rounded-full transition-colors ${
        checked ? "bg-[#1D4ED8]" : "bg-foreground/20"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
