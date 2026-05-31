"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { resources, categoryLabels, translations } from "@/lib/data";
import { Search, ArrowRight, Sparkles, Home, Briefcase, Heart, Users, GraduationCap, Clock, MapPin, Calendar } from "lucide-react";
import ResourceCard from "../resource-card";
import type { ResourceCategory } from "@/lib/types";

const quickCategories: { category: ResourceCategory; icon: typeof Home; color: string }[] = [
  { category: "housing", icon: Home, color: "from-blue-500/20 to-blue-600/10" },
  { category: "jobs", icon: Briefcase, color: "from-amber-500/20 to-amber-600/10" },
  { category: "healthcare", icon: Heart, color: "from-emerald-500/20 to-emerald-600/10" },
  { category: "newcomer", icon: GraduationCap, color: "from-cyan-500/20 to-cyan-600/10" },
  { category: "family", icon: Users, color: "from-purple-500/20 to-purple-600/10" },
  { category: "senior", icon: Clock, color: "from-blue-400/20 to-blue-500/10" },
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
    <div className="px-4 lg:px-8 py-8 max-w-6xl mx-auto">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {greeting()}{userName ? `, ${userName}` : ""}
        </h1>
        <p className="text-lg text-[var(--foreground-muted)]">
          What can we help you find today?
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10"
      >
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground-muted)]" />
          <input
            type="text"
            placeholder="Search for housing, jobs, healthcare, programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-premium w-full pl-14"
          />
        </div>
      </motion.div>

      {/* Quick Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Quick Access</h2>
          <button 
            onClick={() => setActiveTab("explore")}
            className="text-[#3B82F6] text-sm font-medium flex items-center gap-1.5 hover:underline"
          >
            View all categories <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {quickCategories.map((item, index) => (
            <motion.button
              key={item.category}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + index * 0.05 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab("explore")}
              className="premium-card p-4 flex flex-col items-center text-center"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium">
                {categoryLabels[item.category]?.[activeLanguage] || item.category}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* AI Guide Promo */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setActiveTab("ai")}
        className="w-full premium-card mb-12 text-left relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 via-transparent to-[#F5B942]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#1d4ed8] flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold mb-1">Ask Calgary Bridge AI</h3>
            <p className="text-[var(--foreground-muted)]">
              Get personalized guidance and step-by-step support for any question about Calgary services.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-[var(--foreground-muted)] flex-shrink-0 group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.button>

      {/* Featured Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {searchQuery ? `Results for "${searchQuery}"` : "Featured Resources"}
          </h2>
          {!searchQuery && (
            <button 
              onClick={() => setActiveTab("explore")}
              className="text-[#3B82F6] text-sm font-medium flex items-center gap-1.5 hover:underline"
            >
              View all <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
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
            <div className="col-span-2 text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[var(--surface)] flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[var(--foreground-muted)]" />
              </div>
              <p className="text-[var(--foreground-muted)] text-lg">No resources found</p>
              <p className="text-sm text-[var(--foreground-muted)] mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Community Pulse - Mini Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12"
      >
        <h2 className="text-xl font-semibold mb-6">Happening in Calgary</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Calendar, title: "Stampede Events", desc: "July 5-14, 2026", badge: "Coming Soon" },
            { icon: Users, title: "Volunteer Day", desc: "Downtown Clean-up", badge: "This Weekend" },
            { icon: MapPin, title: "New Resource Center", desc: "Now Open in Bridgeland", badge: "New" },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 + index * 0.05 }}
              className="premium-card p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6]">
                  {item.badge}
                </span>
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-[var(--foreground-muted)]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
