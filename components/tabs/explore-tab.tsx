"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { resources, categoryLabels } from "@/lib/data";
import { 
  Search, Filter, X, Home, Briefcase, Heart, Users, 
  AlertTriangle, Building2, Baby, ChevronRight, Waves
} from "lucide-react";
import ResourceCard from "../resource-card";
import type { ResourceCategory } from "@/lib/types";

const allCategories: ResourceCategory[] = [
  "housing", "jobs", "food", "mental-health", "healthcare", "newcomer",
  "family", "senior", "disability", "transit", "education", "legal",
  "business", "volunteering", "emergency", "community"
];

const featuredCategories = [
  { 
    id: "housing", 
    icon: Home, 
    label: "Housing & Rent", 
    description: "Affordable rentals, shelters, subsidies",
    count: 12,
    color: "from-blue-500/20 to-blue-600/10",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400"
  },
  { 
    id: "jobs", 
    icon: Briefcase, 
    label: "Jobs & Career", 
    description: "Training, resume help, job listings",
    count: 15,
    color: "from-emerald-500/20 to-emerald-600/10",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400"
  },
  { 
    id: "family", 
    icon: Baby, 
    label: "Family & Childcare", 
    description: "Daycare, activities, parenting support",
    count: 8,
    color: "from-pink-500/20 to-pink-600/10",
    iconBg: "bg-pink-500/20",
    iconColor: "text-pink-400"
  },
  { 
    id: "healthcare", 
    icon: Heart, 
    label: "Healthcare", 
    description: "Doctors, clinics, mental health",
    count: 10,
    color: "from-rose-500/20 to-rose-600/10",
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-400"
  },
  { 
    id: "newcomer", 
    icon: Users, 
    label: "Newcomer Services", 
    description: "Settlement, ESL, integration",
    count: 9,
    color: "from-amber-500/20 to-amber-600/10",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400"
  },
  { 
    id: "emergency", 
    icon: AlertTriangle, 
    label: "Emergency Help", 
    description: "Crisis support, shelters, hotlines",
    count: 6,
    color: "from-red-500/20 to-red-600/10",
    iconBg: "bg-red-500/20",
    iconColor: "text-red-400"
  },
  { 
    id: "business", 
    icon: Building2, 
    label: "Small Business", 
    description: "Grants, mentorship, resources",
    count: 5,
    color: "from-purple-500/20 to-purple-600/10",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400"
  },
];

export default function ExploreTab() {
  const { activeLanguage, activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useAppStore();
  const [showFilters, setShowFilters] = useState(false);

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = activeCategory === "all" || resource.category.includes(activeCategory as ResourceCategory);
    const matchesSearch =
      searchQuery === "" ||
      resource.title[activeLanguage]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description[activeLanguage]?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen relative">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-[#38BDF8]/6 via-transparent to-transparent" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-radial from-[#FBBF24]/4 via-transparent to-transparent" />
        
        {/* Bow River wave decoration */}
        <svg className="absolute bottom-0 left-0 right-0 h-24 opacity-[0.03]" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,50 Q360,100 720,50 T1440,50 L1440,100 L0,100 Z" fill="currentColor" className="text-[#38BDF8]" />
        </svg>
      </div>

      {/* Page Header - Full Width with Generous Spacing */}
      <div className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl relative z-10">
        <div className="px-10 lg:px-16 xl:px-20 pt-16 pb-14 max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-5 tracking-tight">Explore Resources</h1>
            <p className="text-xl lg:text-2xl text-[var(--foreground-muted)] max-w-3xl leading-relaxed">
              Every verified Calgary service and program, searchable and filterable.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="px-10 lg:px-16 xl:px-20 py-14 max-w-[1600px] mx-auto relative z-10">
        {/* Search Bar - Large and Prominent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 flex gap-5"
        >
          <div className="relative flex-1">
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--foreground-muted)]" />
            <input
              type="text"
              placeholder="Search for housing, jobs, healthcare, legal help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[72px] pl-[60px] pr-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-lg placeholder:text-[var(--foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 focus:border-[#38BDF8] transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-3 px-8 rounded-2xl font-semibold text-lg transition-all ${
              showFilters || activeCategory !== "all"
                ? "bg-[#38BDF8] text-[#07111F] shadow-lg shadow-sky-500/25"
                : "bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)]"
            }`}
          >
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </motion.div>

        {/* Featured Category Cards - Visual Entry Point */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-5">
            {featuredCategories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category.id as ResourceCategory)}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.color} border border-white/10 p-6 text-left transition-all hover:border-white/20 hover:shadow-xl ${
                  activeCategory === category.id ? "ring-2 ring-[#38BDF8] border-[#38BDF8]/50" : ""
                }`}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${category.iconBg}`}>
                  <category.icon className={`h-6 w-6 ${category.iconColor}`} />
                </div>
                <h3 className="font-semibold text-white text-base mb-1">{category.label}</h3>
                <p className="text-xs text-white/50 line-clamp-2 mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-white/40">{category.count} resources</span>
                  <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Filter Panel - Expanded */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-12 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold">All Categories</h3>
              {activeCategory !== "all" && (
                <button
                  onClick={() => setActiveCategory("all")}
                  className="text-base text-[#38BDF8] flex items-center gap-2 hover:underline font-medium"
                >
                  Clear filters <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-6 py-3.5 text-base font-medium transition-all ${
                  activeCategory === "all"
                    ? "bg-[#38BDF8] text-[#07111F] shadow-lg shadow-sky-500/25"
                    : "bg-[var(--background)] border border-[var(--border)] hover:border-[var(--border-hover)]"
                }`}
              >
                All Resources
              </button>
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-6 py-3.5 text-base font-medium transition-all ${
                    activeCategory === category
                      ? "bg-[#38BDF8] text-[#07111F] shadow-lg shadow-sky-500/25"
                      : "bg-[var(--background)] border border-[var(--border)] hover:border-[var(--border-hover)]"
                  }`}
                >
                  {categoryLabels[category]?.[activeLanguage] || category}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Filter Pills - When filter panel is closed */}
        {!showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-10"
          >
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-6 py-3 text-base font-medium transition-all ${
                  activeCategory === "all"
                    ? "bg-[#38BDF8] text-[#07111F] shadow-lg shadow-sky-500/25"
                    : "bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)]"
                }`}
              >
                All
              </button>
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-6 py-3 text-base font-medium transition-all ${
                    activeCategory === category
                      ? "bg-[#38BDF8] text-[#07111F] shadow-lg shadow-sky-500/25"
                      : "bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)]"
                  }`}
                >
                  {categoryLabels[category]?.[activeLanguage] || category}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between mb-8"
        >
          <p className="text-lg text-[var(--foreground-muted)]">
            <span className="font-semibold text-white">{filteredResources.length}</span> resource{filteredResources.length !== 1 ? "s" : ""} found
            {activeCategory !== "all" && (
              <span> in <span className="text-[#38BDF8]">{categoryLabels[activeCategory as ResourceCategory]?.[activeLanguage] || activeCategory}</span></span>
            )}
          </p>
        </motion.div>

        {/* Resources Grid - 2 columns on desktop with generous gaps */}
        <div className="grid lg:grid-cols-2 gap-8 pb-20">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
              >
                <ResourceCard resource={resource} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 text-center py-32">
              <div className="w-28 h-28 rounded-full bg-[var(--surface)] flex items-center justify-center mx-auto mb-10">
                <Search className="w-14 h-14 text-[var(--foreground-muted)]" />
              </div>
              <p className="text-3xl font-semibold text-[var(--foreground-muted)] mb-4">No resources found</p>
              <p className="text-xl text-[var(--foreground-muted)]">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
