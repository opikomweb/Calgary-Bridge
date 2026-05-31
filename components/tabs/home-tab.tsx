"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { resources } from "@/lib/data";
import { Search, ArrowRight, Sparkles, Home, Briefcase, Heart, Users, GraduationCap, Clock, Scale, AlertTriangle, Shield, TrendingUp, MapPin, Zap, Phone } from "lucide-react";
import ResourceCard from "../resource-card";
import type { ResourceCategory } from "@/lib/types";

// MAINSTREAM FIRST — ordered by usage volume and general need
const mainstreamCategories: {
  category: ResourceCategory;
  icon: typeof Home;
  label: string;
  color: string;
  iconColor: string;
  border: string;
  stat: string;
}[] = [
  { category: "housing", icon: Home, label: "Housing & Rent", color: "from-sky-400/20 to-sky-600/8", iconColor: "text-sky-400", border: "hover:border-sky-400/35", stat: "12 programs" },
  { category: "jobs", icon: Briefcase, label: "Jobs & Career", color: "from-amber-400/20 to-amber-600/8", iconColor: "text-amber-400", border: "hover:border-amber-400/35", stat: "8 services" },
  { category: "healthcare", icon: Heart, label: "Health & Wellness", color: "from-emerald-400/20 to-emerald-600/8", iconColor: "text-emerald-400", border: "hover:border-emerald-400/35", stat: "6 providers" },
  { category: "newcomer", icon: GraduationCap, label: "New to Calgary", color: "from-cyan-400/20 to-cyan-600/8", iconColor: "text-cyan-400", border: "hover:border-cyan-400/35", stat: "10 orgs" },
];

// SPECIALIZED — for specific life situations
const specializedCategories: {
  category: ResourceCategory;
  icon: typeof Home;
  label: string;
  iconBg: string;
  iconColor: string;
}[] = [
  { category: "legal", icon: Scale, label: "Tenant Rights", iconBg: "bg-red-400/10", iconColor: "text-red-400" },
  { category: "family", icon: Users, label: "Family & Kids", iconBg: "bg-purple-400/10", iconColor: "text-purple-400" },
  { category: "senior", icon: Clock, label: "Seniors", iconBg: "bg-blue-400/10", iconColor: "text-blue-400" },
  { category: "emergency", icon: AlertTriangle, label: "Emergency Help", iconBg: "bg-orange-400/10", iconColor: "text-orange-400" },
];

export default function HomeTab() {
  const { activeLanguage, searchQuery, setSearchQuery, setActiveTab, userName } = useAppStore();

  const featuredResources = resources.filter((r) => r.featured).slice(0, 6);
  const hiddenGems = resources.filter((r) => r.hiddenGem).slice(0, 3);

  const filteredResources = searchQuery
    ? resources.filter(
        (r) =>
          r.title[activeLanguage]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description[activeLanguage]?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : featuredResources;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[1200px] px-8 lg:px-14 pt-14 pb-28">

        {/* ===== WELCOME ===== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-5">
            {greeting()}{userName ? `, ${userName}` : ""}
          </h1>
          <p className="text-lg sm:text-xl text-[var(--foreground-muted)] leading-relaxed">
            What can we help you find today?
          </p>
        </motion.div>

        {/* ===== SEARCH ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="relative max-w-2xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground-muted)]" />
            <input
              type="text"
              placeholder="Search housing, jobs, healthcare, programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/8 rounded-2xl text-base text-white placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[#38BDF8]/50 focus:bg-white/7 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.10)] transition-all"
              style={{ height: "64px", paddingLeft: "56px", paddingRight: "24px" }}
            />
          </div>
        </motion.div>

        {/* ===== MAINSTREAM: 4 primary categories ===== */}
        {!searchQuery && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-widest mb-2">Start Here</p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Most needed services</h2>
              </div>
              <button
                onClick={() => setActiveTab("explore")}
                className="text-[#38BDF8] font-semibold flex items-center gap-2 hover:underline text-base flex-shrink-0"
              >
                View all <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 4 tall cards — mainstream, breathable spacing */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {mainstreamCategories.map((item, index) => (
                <motion.button
                  key={item.category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab("explore")}
                  className={`group text-left rounded-2xl bg-gradient-to-br ${item.color} border border-white/7 ${item.border} p-8 transition-all duration-300 hover:shadow-xl overflow-hidden`}
                  style={{ minHeight: "220px" }}
                >
                  <div className="flex flex-col h-full">
                    <div className="w-14 h-14 rounded-xl bg-white/8 flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-white">{item.label}</h3>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <span className={`text-sm font-semibold ${item.iconColor}`}>{item.stat}</span>
                      <ArrowRight className={`w-4 h-4 ${item.iconColor} group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        {/* ===== AI GUIDE PROMO ===== */}
        {!searchQuery && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setActiveTab("ai")}
            className="w-full glass rounded-2xl p-9 mb-20 text-left border border-white/7 hover:border-[#38BDF8]/25 transition-all group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/7 via-transparent to-[#FBBF24]/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex items-center gap-7">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#38BDF8] to-[#0284c7] flex items-center justify-center flex-shrink-0 shadow-lg shadow-sky-500/25 group-hover:scale-105 transition-transform">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#38BDF8] uppercase tracking-widest mb-2">Calgary Bridge AI</p>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Get step-by-step guidance for your situation</h3>
                <p className="text-base text-[var(--foreground-muted)]">
                  Not just links — real answers, real next steps, and relevant resources for you.
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-[var(--foreground-muted)] flex-shrink-0 group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.button>
        )}

        {/* ===== FEATURED RESOURCES ===== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {searchQuery ? `Results for "${searchQuery}"` : "Featured Resources"}
            </h2>
            {!searchQuery && (
              <button
                onClick={() => setActiveTab("explore")}
                className="text-[#38BDF8] font-semibold flex items-center gap-2 hover:underline text-base flex-shrink-0"
              >
                View all <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-7">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.44 + index * 0.05 }}
                >
                  <ResourceCard resource={resource} variant="compact" />
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-28">
                <div className="w-24 h-24 rounded-full bg-[var(--surface)] flex items-center justify-center mx-auto mb-8">
                  <Search className="w-12 h-12 text-[var(--foreground-muted)]" />
                </div>
                <p className="text-xl font-semibold text-[var(--foreground-muted)]">No resources found</p>
                <p className="text-base text-[var(--foreground-muted)] mt-3">Try a different search term</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* ===== SPECIALIZED: smaller, horizontal list ===== */}
        {!searchQuery && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-20"
          >
            <div className="mb-8">
              <p className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-widest mb-2">Specialized</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">For your specific situation</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {specializedCategories.map((item, index) => (
                <motion.button
                  key={item.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.54 + index * 0.05 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab("explore")}
                  className="text-left glass rounded-2xl p-6 border border-white/6 hover:border-white/14 transition-all group"
                >
                  <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <h3 className="text-base font-bold text-white">{item.label}</h3>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        {/* ===== HIDDEN GEMS — the strategic third tier ===== */}
        {!searchQuery && hiddenGems.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs font-bold text-[#FBBF24] uppercase tracking-widest mb-2">Hidden Gems</p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Programs most people don&apos;t know exist</h2>
              </div>
              <button
                onClick={() => setActiveTab("explore")}
                className="text-[#FBBF24] font-semibold flex items-center gap-2 hover:underline text-base flex-shrink-0"
              >
                See all <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {hiddenGems.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.64 + index * 0.06 }}
                >
                  <ResourceCard resource={resource} variant="compact" />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ===== CALGARY PULSE — live stats ===== */}
        {!searchQuery && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-2.5 mb-2">
                <Zap className="w-4 h-4 text-[#38BDF8]" />
                <p className="text-xs font-bold text-[#38BDF8] uppercase tracking-widest">Calgary Pulse</p>
                <div className="flex items-center gap-1.5 ml-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400 font-medium">Live</span>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">What&apos;s active in Calgary</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Home, label: "Housing Programs", value: "12 active", sub: "Accepting applications", color: "text-sky-400", bg: "bg-sky-400/10" },
                { icon: TrendingUp, label: "Employment Services", value: "8 services", sub: "Free for newcomers", color: "text-amber-400", bg: "bg-amber-400/10" },
                { icon: Phone, label: "Crisis Lines", value: "24/7 open", sub: "403-266-4357", color: "text-emerald-400", bg: "bg-emerald-400/10" },
                { icon: MapPin, label: "Newcomer Orgs", value: "10 orgs", sub: "Multiple languages", color: "text-cyan-400", bg: "bg-cyan-400/10" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.68 + index * 0.05 }}
                  className="glass rounded-2xl p-6 border border-white/6"
                >
                  <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center mb-5`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <p className="text-xs text-[var(--foreground-muted)] mb-1">{item.label}</p>
                  <p className={`text-2xl font-bold ${item.color} mb-1`}>{item.value}</p>
                  <p className="text-xs text-[var(--foreground-muted)]">{item.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

      </div>
    </div>
  );
}
