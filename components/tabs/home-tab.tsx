"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { resources, categoryLabels, translations } from "@/lib/data";
import { Search, ArrowRight, Sparkles, Home, Briefcase, Heart, Users, GraduationCap, Clock, Scale, AlertTriangle, MapPin, Calendar } from "lucide-react";
import ResourceCard from "../resource-card";
import type { ResourceCategory } from "@/lib/types";

const quickCategories: { category: ResourceCategory; icon: typeof Home; color: string; glow: string }[] = [
  { category: "housing", icon: Home, color: "from-sky-400/20 to-sky-500/10", glow: "glow-blue" },
  { category: "legal", icon: Scale, color: "from-red-400/20 to-red-500/10", glow: "glow-red" },
  { category: "jobs", icon: Briefcase, color: "from-amber-400/20 to-amber-500/10", glow: "glow-gold" },
  { category: "healthcare", icon: Heart, color: "from-emerald-400/20 to-emerald-500/10", glow: "glow-green" },
  { category: "newcomer", icon: GraduationCap, color: "from-cyan-400/20 to-cyan-500/10", glow: "glow-cyan" },
  { category: "family", icon: Users, color: "from-purple-400/20 to-purple-500/10", glow: "glow-purple" },
  { category: "senior", icon: Clock, color: "from-blue-400/20 to-blue-500/10", glow: "glow-blue" },
  { category: "emergency", icon: AlertTriangle, color: "from-red-500/20 to-red-600/10", glow: "glow-red" },
];

export default function HomeTab() {
  const { activeLanguage, searchQuery, setSearchQuery, setActiveTab, userName } = useAppStore();
  
  const t = (key: string) => translations[key]?.[activeLanguage] || translations[key]?.en || key;
  
  const featuredResources = resources.filter(r => r.featured).slice(0, 6);
  
  const filteredResources = searchQuery
    ? resources.filter(r => 
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
    <div className="w-full px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl pt-10 pb-16">
        {/* Welcome Header - Large typography with proper spacing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-14"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4">
          {greeting()}{userName ? `, ${userName}` : ""}
        </h1>
        <p className="text-lg md:text-xl text-[var(--foreground-muted)] leading-relaxed">
          What can we help you find today?
        </p>
      </motion.div>

      {/* Search - Large premium input with proper alignment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-16"
      >
        <div className="relative max-w-3xl">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--foreground-muted)]" />
          <input
            type="text"
            placeholder="Search for housing, jobs, healthcare, programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-16 pl-16 pr-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-lg placeholder:text-[var(--foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 focus:border-[#38BDF8] transition-all"
          />
        </div>
      </motion.div>

      {/* Quick Categories - Large tiles with proper spacing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-16"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Quick Access</h2>
          <button 
            onClick={() => setActiveTab("explore")}
            className="text-[#38BDF8] font-semibold flex items-center gap-2 hover:underline"
          >
            View all <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {quickCategories.map((item, index) => (
            <motion.button
              key={item.category}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + index * 0.04 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab("explore")}
              className={`premium-card p-7 flex flex-col items-center text-center ${item.glow}`}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-base font-semibold">
                {categoryLabels[item.category]?.[activeLanguage] || item.category}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* AI Guide Promo - Large card with generous padding */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setActiveTab("ai")}
        className="w-full premium-card p-8 mb-16 text-left relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/10 via-transparent to-[#FBBF24]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 flex items-start gap-6">
          <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-[#38BDF8] to-[#0284c7] flex items-center justify-center flex-shrink-0 shadow-lg shadow-sky-500/30 p-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-bold mb-3">Ask Calgary Bridge AI</h3>
            <p className="text-lg text-[var(--foreground-muted)] leading-relaxed">
              Get personalized guidance and step-by-step support for any question about Calgary services.
            </p>
          </div>
          <ArrowRight className="w-7 h-7 text-[var(--foreground-muted)] flex-shrink-0 group-hover:translate-x-2 transition-transform mt-2" />
        </div>
      </motion.button>

      {/* Featured Resources - Desktop 2-column with generous spacing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            {searchQuery ? `Results for "${searchQuery}"` : "Featured Resources"}
          </h2>
          {!searchQuery && (
            <button 
              onClick={() => setActiveTab("explore")}
              className="text-[#38BDF8] font-semibold flex items-center gap-2 hover:underline"
            >
              View all <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <ResourceCard resource={resource} variant="compact" />
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 text-center py-24">
              <div className="w-24 h-24 rounded-full bg-[var(--surface)] flex items-center justify-center mx-auto mb-8">
                <Search className="w-12 h-12 text-[var(--foreground-muted)]" />
              </div>
              <p className="text-2xl font-semibold text-[var(--foreground-muted)]">No resources found</p>
              <p className="text-lg text-[var(--foreground-muted)] mt-3">Try a different search term</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Community Pulse - Desktop 3-column with generous spacing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16 mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Happening in Calgary</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Calendar, title: "Stampede Events", desc: "July 5-14, 2026", badge: "Coming Soon" },
            { icon: Users, title: "Volunteer Day", desc: "Downtown Clean-up", badge: "This Weekend" },
            { icon: MapPin, title: "New Resource Center", desc: "Now Open in Bridgeland", badge: "New" },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 + index * 0.06 }}
              className="premium-card p-7"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-[#38BDF8]" />
                </div>
                <span className="text-sm font-semibold px-3 py-1.5 rounded-full bg-[#38BDF8]/10 text-[#38BDF8]">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-base text-[var(--foreground-muted)]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      </div>
    </div>
  );
}
