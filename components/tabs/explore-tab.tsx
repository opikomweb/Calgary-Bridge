"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { resources, categoryLabels } from "@/lib/data";
import { 
  Search, ChevronDown, X, Home, Briefcase, Heart, Users, 
  AlertTriangle, Building2, Baby, GraduationCap, Bus,
  Scale, HandHeart, Accessibility, Utensils, Brain, Check
} from "lucide-react";
import ResourceCard from "../resource-card";
import type { ResourceCategory } from "@/lib/types";

const allCategories: { id: ResourceCategory | "all"; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "All Resources", icon: Search },
  { id: "housing", label: "Housing & Rent", icon: Home },
  { id: "jobs", label: "Jobs & Career", icon: Briefcase },
  { id: "healthcare", label: "Healthcare", icon: Heart },
  { id: "family", label: "Family & Childcare", icon: Baby },
  { id: "newcomer", label: "Newcomer Services", icon: Users },
  { id: "emergency", label: "Emergency Help", icon: AlertTriangle },
  { id: "food", label: "Food Support", icon: Utensils },
  { id: "mental-health", label: "Mental Health", icon: Brain },
  { id: "senior", label: "Senior Services", icon: Users },
  { id: "disability", label: "Disability Support", icon: Accessibility },
  { id: "transit", label: "Transit", icon: Bus },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "legal", label: "Legal Help", icon: Scale },
  { id: "business", label: "Small Business", icon: Building2 },
  { id: "volunteering", label: "Volunteering", icon: HandHeart },
  { id: "community", label: "Community", icon: Users },
];

// 4 Hero categories with rich visual treatment
const heroCategories = [
  { 
    id: "housing" as ResourceCategory, 
    icon: Home, 
    label: "Housing & Rent",
    stat: "12 programs",
    gradient: "from-[#0EA5E9] to-[#0284C7]",
  },
  { 
    id: "jobs" as ResourceCategory, 
    icon: Briefcase, 
    label: "Jobs & Career",
    stat: "340+ openings",
    gradient: "from-[#F59E0B] to-[#D97706]",
  },
  { 
    id: "healthcare" as ResourceCategory, 
    icon: Heart, 
    label: "Healthcare",
    stat: "24/7 available",
    gradient: "from-[#10B981] to-[#059669]",
  },
  { 
    id: "newcomer" as ResourceCategory, 
    icon: Users, 
    label: "Newcomer Services",
    stat: "10 organizations",
    gradient: "from-[#06B6D4] to-[#0891B2]",
  },
];

export default function ExploreTab() {
  const { activeLanguage, activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useAppStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = activeCategory === "all" || resource.category.includes(activeCategory as ResourceCategory);
    const matchesSearch =
      searchQuery === "" ||
      resource.title[activeLanguage]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description[activeLanguage]?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentCategoryInfo = allCategories.find(c => c.id === activeCategory) || allCategories[0];

  return (
    <div className="min-h-screen relative">

      {/* ========== PAGE HEADER ========== */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[clamp(48px,8vw,72px)] font-bold tracking-[-0.03em] leading-[1.02] mb-6">
              Explore Resources
            </h1>
            <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed">
              Every verified Calgary service and program, searchable and filterable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== SEARCH & FILTER ROW ========== */}
      <section className="relative pb-16">
        <div className="max-w-[1400px] mx-auto px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-5"
          >
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[72px] bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.12] focus:border-[#38BDF8]/40 focus:bg-white/[0.06] rounded-2xl text-lg text-white placeholder:text-white/30 pl-[60px] pr-8 outline-none transition-all duration-300 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.08)]"
              />
            </div>

            {/* Category Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`h-[72px] px-8 rounded-2xl flex items-center gap-4 font-medium text-lg transition-all min-w-[280px] justify-between ${
                  activeCategory !== "all"
                    ? "bg-[#38BDF8] text-[#07111F]"
                    : "bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.12] text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <currentCategoryInfo.icon className="w-5 h-5" />
                  <span>{currentCategoryInfo.label}</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-3 bg-[#0a1628] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[480px] overflow-y-auto"
                  >
                    {allCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setActiveCategory(category.id as ResourceCategory);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-all ${
                          activeCategory === category.id
                            ? "bg-[#38BDF8]/10 text-[#38BDF8]"
                            : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        <category.icon className="w-5 h-5" />
                        <span className="font-medium">{category.label}</span>
                        {activeCategory === category.id && (
                          <Check className="w-5 h-5 ml-auto" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== HERO CATEGORY CARDS ========== */}
      <section className="relative pb-20">
        <div className="max-w-[1400px] mx-auto px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {heroCategories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category.id)}
                className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br ${category.gradient} p-8 md:p-10 text-left transition-all group ${
                  activeCategory === category.id 
                    ? "ring-4 ring-white/30 shadow-2xl" 
                    : "hover:shadow-xl"
                }`}
              >
                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="font-bold text-white text-2xl md:text-[28px] mb-3 leading-tight">
                  {category.label}
                </h3>
                
                {/* Stat Badge */}
                <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white/90 text-sm font-medium">
                  {category.stat}
                </span>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== ACTIVE FILTER & RESULTS COUNT ========== */}
      <section className="relative pb-8">
        <div className="max-w-[1400px] mx-auto px-10 lg:px-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-xl text-white/50">
                <span className="font-bold text-white text-2xl">{filteredResources.length}</span>
                {" "}resource{filteredResources.length !== 1 ? "s" : ""} found
              </p>
              
              {activeCategory !== "all" && (
                <button
                  onClick={() => setActiveCategory("all")}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] hover:bg-[#38BDF8]/20 transition-colors text-sm font-medium"
                >
                  <span>{currentCategoryInfo.label}</span>
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========== RESOURCES GRID ========== */}
      <section className="relative pb-32">
        <div className="max-w-[1400px] mx-auto px-10 lg:px-16">
          {filteredResources.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <ResourceCard resource={resource} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <div className="w-32 h-32 rounded-full bg-white/[0.04] flex items-center justify-center mx-auto mb-10">
                <Search className="w-16 h-16 text-white/30" />
              </div>
              <p className="text-3xl font-semibold text-white/60 mb-4">No resources found</p>
              <p className="text-xl text-white/40">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
