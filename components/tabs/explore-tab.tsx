"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { resources } from "@/lib/data";
import { 
  Search, ChevronDown, X, Home, Briefcase, Heart, Users, 
  AlertTriangle, Building2, Baby, GraduationCap, Bus,
  Scale, Accessibility, Utensils, Brain, Check, Truck, MapPin,
  Laptop, Package, Store, Sprout, Wrench
} from "lucide-react";
import ResourceCard from "../resource-card";
import LiveResults from "../live-results";
import { filterResources } from "@/lib/search";
import type { ResourceCategory } from "@/lib/types";
import { useTranslations, registerStrings } from "@/lib/translation-context";

// Static IDs + icons — labels are injected from the translation context at render time.
const CATEGORY_DEFS: { id: ResourceCategory | "all"; icon: React.ElementType; txKey: string }[] = [
  { id: "all", icon: Search, txKey: "allResources" },
  { id: "housing", icon: Home, txKey: "housing" },
  { id: "jobs", icon: Briefcase, txKey: "jobs" },
  { id: "healthcare", icon: Heart, txKey: "healthcare" },
  { id: "family", icon: Baby, txKey: "family" },
  { id: "newcomer", icon: Users, txKey: "newcomer" },
  { id: "emergency", icon: AlertTriangle, txKey: "emergency" },
  { id: "food", icon: Utensils, txKey: "food" },
  { id: "mental-health", icon: Brain, txKey: "mentalHealth" },
  { id: "senior", icon: Users, txKey: "senior" },
  { id: "disability", icon: Accessibility, txKey: "disability" },
  { id: "transit", icon: Bus, txKey: "transit" },
  { id: "education", icon: GraduationCap, txKey: "education" },
  { id: "legal", icon: Scale, txKey: "legal" },
  { id: "business", icon: Building2, txKey: "business" },
  { id: "workspace", icon: Laptop, txKey: "workspace" },
  { id: "storage", icon: Package, txKey: "storage" },
  { id: "ethnic-market", icon: Store, txKey: "ethnicMarket" },
  { id: "farmers-market", icon: Sprout, txKey: "farmersMarket" },
  { id: "essentials", icon: Wrench, txKey: "essentials" },
  { id: "tourism", icon: MapPin, txKey: "tourism" },
  { id: "logistics", icon: Truck, txKey: "logistics" },
  { id: "community", icon: Users, txKey: "community" },
];

// 4 Hero categories — labels are injected from translation context at render time.
const HERO_CATEGORY_DEFS = [
  { id: "housing" as ResourceCategory, icon: Home, txLabel: "housing", txStat: "housing12" },
  { id: "jobs" as ResourceCategory, icon: Briefcase, txLabel: "jobs", txStat: "jobs340" },
  { id: "healthcare" as ResourceCategory, icon: Heart, txLabel: "healthcare", txStat: "health247" },
  { id: "newcomer" as ResourceCategory, icon: Users, txLabel: "newcomer", txStat: "newcomer10" },
];

registerStrings(
  "All Resources", "Housing & Rent", "Jobs & Career", "Healthcare",
  "Family & Childcare", "Newcomer Services", "Emergency Help", "Food Support",
  "Mental Health", "Senior Services", "Disability Support", "Transit",
  "Education", "Legal Help", "Business & Licensing", "Workspaces",
  "Storage Facilities", "Cultural & Ethnic Stores", "Farmers Markets",
  "Local Essentials", "Tourists & Visitors", "Shipping & Logistics", "Community",
  "Explore", "Resources",
  "Every verified Calgary service and program, searchable and filterable.",
  "Search resources...",
  "results found", "result found", "No results",
  "Try adjusting your search or filter.",
  "12 programs", "340+ openings", "24/7 available", "10 organizations",
  "Housing & Rent", "Jobs & Career", "Healthcare", "Newcomer Services",
);

export default function ExploreTab() {
  const { activeLanguage, activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useAppStore();
  const tx = useTranslations({
    explore: "Explore",
    resources: "Resources",
    subtitle: "Every verified Calgary service and program, searchable and filterable.",
    searchPlaceholder: "Search resources...",
    allResources: "All Resources",
    housing: "Housing & Rent",
    jobs: "Jobs & Career",
    healthcare: "Healthcare",
    family: "Family & Childcare",
    newcomer: "Newcomer Services",
    emergency: "Emergency Help",
    food: "Food Support",
    mentalHealth: "Mental Health",
    senior: "Senior Services",
    disability: "Disability Support",
    transit: "Transit",
    education: "Education",
    legal: "Legal Help",
    business: "Business & Licensing",
    workspace: "Workspaces",
    storage: "Storage Facilities",
    ethnicMarket: "Cultural & Ethnic Stores",
    farmersMarket: "Farmers Markets",
    essentials: "Local Essentials",
    tourism: "Tourists & Visitors",
    logistics: "Shipping & Logistics",
    community: "Community",
    housing12: "12 programs",
    jobs340: "340+ openings",
    health247: "24/7 available",
    newcomer10: "10 organizations",
  });

  // Build translated hero categories
  const heroCategories = HERO_CATEGORY_DEFS.map((d) => ({
    id: d.id,
    icon: d.icon,
    label: tx[d.txLabel as keyof typeof tx] ?? d.txLabel,
    stat: tx[d.txStat as keyof typeof tx] ?? d.txStat,
    accentColor: "#38BDF8",
    bgGradient: "from-[#0c2d4d] to-[#071a2e]",
  }));

  // Build translated category list from static defs + tx lookup
  const allCategories = CATEGORY_DEFS.map((d) => ({
    id: d.id,
    icon: d.icon,
    label: tx[d.txKey as keyof typeof tx] ?? d.txKey,
  }));
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

  // Only filter & show resources when the user has actually queried something
  const hasQuery = activeCategory !== "all" || searchQuery.trim().length > 0;
  const filteredResources = hasQuery
    ? filterResources(resources, activeCategory, searchQuery, activeLanguage)
    : [];

  const currentCategoryInfo = allCategories.find(c => c.id === activeCategory) || allCategories[0];

  // Show hero cards only on default (no category, no search)
  const showHeroCards = !hasQuery;

  // Detect the "conflict fallback": the user typed something that doesn't match
  // the category they selected, so results were broadened across all categories.
  const fallbackActive =
    activeCategory !== "all" &&
    searchQuery.trim().length > 0 &&
    filteredResources.length > 0 &&
    !filteredResources.some((r) => r.category.includes(activeCategory as ResourceCategory));

  return (
    <div className="relative">

      {/* ========== PAGE HEADER ========== */}
      <section className="relative pt-5 pb-4 md:pt-12 md:pb-8 lg:pt-16 lg:pb-10">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-accent text-[clamp(32px,6vw,56px)] font-bold tracking-[-0.02em] leading-[1.1] mb-4">
              <span>
                {tx.explore} <span className="text-calgary-red">{tx.resources}</span>
              </span>
            </h1>
            <p className="text-base md:text-lg text-foreground/70 max-w-xl leading-relaxed">
              {tx.subtitle}
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
              <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1D4ED8] dark:text-[#38BDF8]" />
              <input
                type="text"
                placeholder={tx.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 md:h-16 bg-white dark:bg-[rgba(15,23,42,0.9)] hover:bg-white border-2 border-foreground/[0.15] hover:border-foreground/[0.25] focus:border-[#1D4ED8] dark:focus:border-[#38BDF8] rounded-xl md:rounded-2xl text-base text-foreground placeholder:text-foreground/45 pl-12 md:pl-14 pr-4 outline-none transition-all duration-300 focus:shadow-[0_0_0_4px_rgba(29,78,216,0.08)] dark:focus:shadow-[0_0_0_4px_rgba(56,189,248,0.08)] shadow-sm"
              />
            </div>

            {/* Category Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`h-14 md:h-16 px-5 md:px-6 rounded-xl md:rounded-2xl flex items-center gap-3 font-medium text-sm md:text-base transition-all w-full md:min-w-[240px] justify-between shadow-sm border-2 ${
                  activeCategory !== "all"
                    ? "bg-[#1D4ED8] border-[#1D4ED8] text-white"
                    : "bg-white dark:bg-[rgba(15,23,42,0.9)] border-foreground/[0.15] hover:border-[#1D4ED8] text-foreground"
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
                    className="absolute top-full left-0 right-0 mt-2 bg-popover backdrop-blur-2xl border border-border rounded-xl md:rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[400px] overflow-y-auto"
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
                            ? "bg-[#1D4ED8]/10 text-[#1D4ED8]"
                            : "text-foreground/75 hover:bg-foreground/[0.04] hover:text-foreground"
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

      {/* ========== HERO CATEGORY CARDS - GLASSY PREMIUM ==========
          Quick-launch shortcuts only on the default Explore view. Once a
          category is selected (e.g. via the dropdown / side menu) or a search
          is active, these are hidden so results show immediately — the same
          categories already live in the dropdown above. */}
      {showHeroCards && (
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
                className={`relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br ${category.bgGradient} border border-white/10 p-4 md:p-6 lg:p-8 transition-all group hover:shadow-lg`}
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
                    className="mb-3 md:mb-4 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl border border-white/15"
                    style={{ background: `${category.accentColor}22` }}
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
      )}

      {/* ========== ACTIVE FILTER & RESULTS COUNT — only when a query exists ========== */}
      {hasQuery && (
      <section className="relative pb-4 md:pb-6">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-base text-foreground/65">
              <span className="font-bold text-foreground text-lg md:text-xl">{filteredResources.length}</span>
              {" "}resource{filteredResources.length !== 1 ? "s" : ""} found
            </p>

            {activeCategory !== "all" && (
              <button
                onClick={() => setActiveCategory("all")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors text-xs font-medium border border-[#1D4ED8]"
              >
                <span className="truncate max-w-[120px]">{currentCategoryInfo.label}</span>
                <X className="w-3.5 h-3.5 flex-shrink-0" />
              </button>
            )}
          </div>

          {/* Conflict-fallback note — the typed query didn't match the chosen
              category, so we broadened the search instead of showing nothing. */}
          {fallbackActive && (
            <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-[#1D4ED8]/20 bg-[#1D4ED8]/[0.06] px-3.5 py-2.5">
              <Search className="w-4 h-4 text-[#1D4ED8] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground/75 leading-relaxed">
                No <span className="font-semibold">{currentCategoryInfo.label}</span> matches for
                {" "}&ldquo;<span className="font-semibold">{searchQuery.trim()}</span>&rdquo;, so we&apos;re showing the
                best results across all categories.{" "}
                <button
                  onClick={() => setActiveCategory("all")}
                  className="font-semibold text-[#1D4ED8] hover:underline"
                >
                  Clear filter
                </button>
              </p>
            </div>
          )}
        </div>
      </section>
      )}

      {/* ========== RESOURCES GRID — only rendered after a query ========== */}
      {hasQuery && (
      <section className="relative pb-6 md:pb-8">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 md:gap-3 items-start">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.02, 0.3) }}
                >
                  <ResourceCard resource={resource} variant="compact" />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 md:py-32"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-foreground/[0.03] border border-foreground/[0.06] flex items-center justify-center mx-auto mb-8">
                <Search className="w-10 h-10 md:w-14 md:h-14 text-foreground/25" />
              </div>
              <p className="text-xl md:text-2xl font-semibold text-foreground/75 mb-3">No resources found</p>
              <p className="text-base text-foreground/60 leading-relaxed">Try adjusting your search or category filter</p>
            </motion.div>
          )}

          {/* Live Google Maps results */}
          {(activeCategory !== "all" || searchQuery.trim().length >= 2) && (
            <LiveResults
              category={activeCategory}
              query={searchQuery}
              categoryLabel={currentCategoryInfo.label}
            />
          )}
        </div>
      </section>
      )}

      {/* ========== DEFAULT EMPTY STATE — prompt to search ========== */}
      {!hasQuery && (
        <section className="relative pb-4">
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-col items-center text-center pt-4 pb-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#1D4ED8]/08 border border-[#1D4ED8]/15 flex items-center justify-center mb-4">
                <Search className="w-7 h-7 text-[#1D4ED8]/60" />
              </div>
              <p className="text-base font-semibold text-foreground/60 mb-1">
                Search or select a category above
              </p>
              <p className="text-sm text-foreground/40 max-w-xs leading-relaxed">
                Type a keyword or tap one of the four categories to browse Calgary resources.
              </p>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
