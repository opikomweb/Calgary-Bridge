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
      <section className="relative pt-12 pb-8 md:pt-20 md:pb-12 lg:pt-24 lg:pb-16">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[clamp(32px,6vw,56px)] font-bold tracking-[-0.02em] leading-[1.1] mb-4">
              Explore Resources
            </h1>
            <p className="text-base md:text-lg text-white/45 max-w-xl leading-relaxed">
              Every verified Calgary service and program, searchable and filterable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== SEARCH & FILTER ROW ========== */}
      <section className="relative pb-8 md:pb-12">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-3 md:gap-4"
          >
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/35" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 md:h-16 bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.1] focus:border-[#38BDF8]/30 focus:bg-white/[0.05] rounded-xl md:rounded-2xl text-base text-white placeholder:text-white/25 pl-12 md:pl-14 pr-4 outline-none transition-all duration-300 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.06)]"
              />
            </div>

            {/* Category Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`h-14 md:h-16 px-5 md:px-6 rounded-xl md:rounded-2xl flex items-center gap-3 font-medium text-sm md:text-base transition-all w-full md:min-w-[240px] justify-between ${
                  activeCategory !== "all"
                    ? "bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-white"
                    : "bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.1] text-white/80"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <currentCategoryInfo.icon className="w-4 h-4 md:w-5 md:h-5 opacity-70 flex-shrink-0" />
                  <span className="truncate">{currentCategoryInfo.label}</span>
                </div>
                <ChevronDown className={`w-4 h-4 opacity-50 transition-transform flex-shrink-0 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-[#0a1628]/98 backdrop-blur-2xl border border-white/[0.08] rounded-xl md:rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[400px] overflow-y-auto"
                  >
                    {allCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setActiveCategory(category.id as ResourceCategory);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 md:px-5 py-3 md:py-4 text-left text-sm transition-all ${
                          activeCategory === category.id
                            ? "bg-[#38BDF8]/10 text-[#38BDF8]"
                            : "text-white/60 hover:bg-white/[0.03] hover:text-white"
                        }`}
                      >
                        <category.icon className="w-4 h-4 flex-shrink-0" />
                        <span className="font-medium truncate">{category.label}</span>
                        {activeCategory === category.id && (
                          <Check className="w-4 h-4 ml-auto flex-shrink-0" />
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
      <section className="relative pb-8 md:pb-12">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
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
                className={`relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br ${category.bgGradient} backdrop-blur-xl border border-white/[0.06] p-4 md:p-6 lg:p-8 transition-all group ${
                  activeCategory === category.id 
                    ? "ring-2 ring-white/20 shadow-xl border-white/[0.12]" 
                    : "hover:border-white/[0.1] hover:shadow-lg"
                }`}
                style={{
                  boxShadow: activeCategory === category.id 
                    ? `0 0 40px -10px ${category.accentColor}30`
                    : undefined
                }}
              >
                {/* Accent Glow */}
                <div 
                  className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-30"
                  style={{ background: category.accentColor }}
                />
                
                {/* Centered Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div 
                    className="mb-3 md:mb-4 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl backdrop-blur-sm border border-white/[0.08]"
                    style={{ background: `${category.accentColor}15` }}
                  >
                    <category.icon className="h-5 w-5 md:h-6 md:w-6" style={{ color: category.accentColor }} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-bold text-white text-sm md:text-base lg:text-lg mb-2 leading-tight tracking-[-0.01em]">
                    {category.label}
                  </h3>
                  
                  {/* Stat Badge */}
                  <span 
                    className="inline-block px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-medium border"
                    style={{ 
                      background: `${category.accentColor}12`,
                      borderColor: `${category.accentColor}25`,
                      color: category.accentColor
                    }}
                  >
                    {category.stat}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== ACTIVE FILTER & RESULTS COUNT ========== */}
      <section className="relative pb-4 md:pb-6">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-base text-white/40">
              <span className="font-bold text-white text-lg md:text-xl">{filteredResources.length}</span>
              {" "}resource{filteredResources.length !== 1 ? "s" : ""} found
            </p>
            
            {activeCategory !== "all" && (
              <button
                onClick={() => setActiveCategory("all")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] hover:bg-[#38BDF8]/15 transition-colors text-xs font-medium border border-[#38BDF8]/20"
              >
                <span className="truncate max-w-[120px]">{currentCategoryInfo.label}</span>
                <X className="w-3.5 h-3.5 flex-shrink-0" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ========== RESOURCES GRID ========== */}
      <section className="relative pb-24 md:pb-32">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          {filteredResources.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
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
              className="text-center py-20 md:py-32"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-8">
                <Search className="w-10 h-10 md:w-14 md:h-14 text-white/25" />
              </div>
              <p className="text-xl md:text-2xl font-semibold text-white/50 mb-3">No resources found</p>
              <p className="text-base text-white/35 leading-relaxed">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
