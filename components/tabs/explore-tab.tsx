"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { resources } from "@/lib/data";
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

// 4 Hero categories with GLASSY premium treatment
const heroCategories = [
  { 
    id: "housing" as ResourceCategory, 
    icon: Home, 
    label: "Housing & Rent",
    stat: "12 programs",
    accentColor: "#38BDF8",
    bgGradient: "from-[#0c2d4d]/80 to-[#071a2e]/90",
  },
  { 
    id: "jobs" as ResourceCategory, 
    icon: Briefcase, 
    label: "Jobs & Career",
    stat: "340+ openings",
    accentColor: "#FBBF24",
    bgGradient: "from-[#2d2408]/80 to-[#1a1505]/90",
  },
  { 
    id: "healthcare" as ResourceCategory, 
    icon: Heart, 
    label: "Healthcare",
    stat: "24/7 available",
    accentColor: "#34D399",
    bgGradient: "from-[#0d2d24]/80 to-[#071a16]/90",
  },
  { 
    id: "newcomer" as ResourceCategory, 
    icon: Users, 
    label: "Newcomer Services",
    stat: "10 organizations",
    accentColor: "#22D3EE",
    bgGradient: "from-[#082d36]/80 to-[#051a20]/90",
  },
];

export default function ExploreTab() {
  const { activeLanguage, activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useAppStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      <section className="relative pt-24 pb-20 md:pt-28 md:pb-24">
        <div className="max-w-[1400px] mx-auto px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[clamp(48px,8vw,72px)] font-bold tracking-[-0.03em] leading-[1.05] mb-8">
              Explore Resources
            </h1>
            <p className="text-xl md:text-2xl text-white/45 max-w-2xl leading-[1.7]">
              Every verified Calgary service and program, searchable and filterable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== SEARCH & FILTER ROW ========== */}
      <section className="relative pb-20">
        <div className="max-w-[1400px] mx-auto px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-6"
          >
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-white/35" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[76px] bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.1] focus:border-[#38BDF8]/30 focus:bg-white/[0.05] rounded-[24px] text-lg text-white placeholder:text-white/25 pl-[68px] pr-10 outline-none transition-all duration-300 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.06)]"
              />
            </div>

            {/* Category Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`h-[76px] px-10 rounded-[24px] flex items-center gap-5 font-medium text-lg transition-all min-w-[300px] justify-between ${
                  activeCategory !== "all"
                    ? "bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-white"
                    : "bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.1] text-white/80"
                }`}
              >
                <div className="flex items-center gap-4">
                  <currentCategoryInfo.icon className="w-5 h-5 opacity-70" />
                  <span>{currentCategoryInfo.label}</span>
                </div>
                <ChevronDown className={`w-5 h-5 opacity-50 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-4 bg-[#0a1628]/98 backdrop-blur-2xl border border-white/[0.08] rounded-[24px] shadow-2xl overflow-hidden z-50 max-h-[500px] overflow-y-auto"
                  >
                    {allCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setActiveCategory(category.id as ResourceCategory);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-5 px-8 py-5 text-left transition-all ${
                          activeCategory === category.id
                            ? "bg-[#38BDF8]/10 text-[#38BDF8]"
                            : "text-white/60 hover:bg-white/[0.03] hover:text-white"
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

      {/* ========== HERO CATEGORY CARDS - GLASSY PREMIUM ========== */}
      <section className="relative pb-24">
        <div className="max-w-[1400px] mx-auto px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-7"
          >
            {heroCategories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.02, y: -6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category.id)}
                className={`relative overflow-hidden rounded-[32px] bg-gradient-to-br ${category.bgGradient} backdrop-blur-xl border border-white/[0.06] p-10 md:p-12 text-left transition-all group ${
                  activeCategory === category.id 
                    ? "ring-2 ring-white/20 shadow-2xl border-white/[0.12]" 
                    : "hover:border-white/[0.1] hover:shadow-xl"
                }`}
                style={{
                  boxShadow: activeCategory === category.id 
                    ? `0 0 60px -15px ${category.accentColor}30`
                    : undefined
                }}
              >
                {/* Accent Glow */}
                <div 
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-30"
                  style={{ background: category.accentColor }}
                />
                
                {/* Icon */}
                <div 
                  className="mb-8 flex h-[72px] w-[72px] items-center justify-center rounded-[20px] backdrop-blur-sm border border-white/[0.08]"
                  style={{ background: `${category.accentColor}15` }}
                >
                  <category.icon className="h-8 w-8" style={{ color: category.accentColor }} />
                </div>
                
                {/* Title - More Line Height */}
                <h3 className="font-bold text-white text-[26px] md:text-[30px] mb-5 leading-[1.25] tracking-[-0.01em]">
                  {category.label}
                </h3>
                
                {/* Stat Badge */}
                <span 
                  className="inline-block px-5 py-2.5 rounded-full text-sm font-medium border"
                  style={{ 
                    background: `${category.accentColor}12`,
                    borderColor: `${category.accentColor}25`,
                    color: category.accentColor
                  }}
                >
                  {category.stat}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== ACTIVE FILTER & RESULTS COUNT ========== */}
      <section className="relative pb-10">
        <div className="max-w-[1400px] mx-auto px-12 lg:px-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <p className="text-xl text-white/40">
                <span className="font-bold text-white text-2xl">{filteredResources.length}</span>
                {" "}resource{filteredResources.length !== 1 ? "s" : ""} found
              </p>
              
              {activeCategory !== "all" && (
                <button
                  onClick={() => setActiveCategory("all")}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] hover:bg-[#38BDF8]/15 transition-colors text-sm font-medium border border-[#38BDF8]/20"
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
      <section className="relative pb-40">
        <div className="max-w-[1400px] mx-auto px-12 lg:px-20">
          {filteredResources.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-10">
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
              className="text-center py-40"
            >
              <div className="w-36 h-36 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-12">
                <Search className="w-16 h-16 text-white/25" />
              </div>
              <p className="text-3xl font-semibold text-white/50 mb-5">No resources found</p>
              <p className="text-xl text-white/35 leading-relaxed">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
