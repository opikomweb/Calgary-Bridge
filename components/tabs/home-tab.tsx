"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { resources } from "@/lib/data";
import { Search, ArrowRight, MessageSquare, MapPin, ChevronRight, Home, Briefcase, Heart, Users, ChevronUp } from "lucide-react";
import ResourceCard from "../resource-card";
import SearchExtras from "../search-extras";
import { searchResources, getSimilarResources } from "@/lib/search";
import React from "react";
import { useTranslations, registerStrings } from "@/lib/translation-context";

// Register all static UI strings once at module load so TranslationProvider
// can pre-fetch them all in a single batch when the language changes.
registerStrings(
  "What do you", "need?",
  "Search for housing, jobs, healthcare, or ask Askonnect anything about Calgary.",
  "My landlord won't fix the heat...",
  "I need childcare", "Jobs hiring now", "Family activities",
  "Search Results", "Clear Search",
  "resources found", "resource found",
  "No results found",
  "We couldn't find any resources matching your search. Try different keywords or ask our AI assistant.",
  "Ask the AI instead",
  "Start Here",
  "What most", "Calgarians", "need.",
  "Find Housing & Rent Support",
  "Affordable rentals, subsidized programs, rent supplements, and tenant assistance",
  "12 programs",
  "Looking for Work?",
  "Resume building, job fairs, skills training, career counseling, and hiring companies",
  "340+ openings",
  "Get Healthcare Access",
  "Walk-in clinics, family doctors, mental health support, and Alberta Health registration",
  "24/7 available",
  "New to Calgary?",
  "Settlement services, language classes, community connections, and integration support",
  "10 orgs",
  "Explore",
  "Specialized Support", "For specific situations.",
  "Tenant Rights", "Lease help, rent disputes, eviction support",
  "Family & Kids", "Daycare, youth programs, family activities",
  "Seniors", "Home care, transportation, social programs",
  "Emergency Help", "Crisis lines, shelters, urgent support",
  "View",
  "Recommended", "Top resources this month.", "View all",
  "Hidden Gems", "Programs most people miss.",
  "Services in your area",
  "Calgary Food Bank", "Calgary Drop-In Centre", "Alpha House Calgary",
  "Calgary Immigrant Women's Assoc.", "Alex Community Health Centre",
  "Free", "Health", "Always Open",
  "Mon–Fri 9–5", "24/7", "Mon–Sat 8–6",
  "Askonnect",
  "Get personalized guidance",
  "Real answers, step-by-step help, and matched Calgary resources.",
);

export default function HomeTab() {
  const { activeLanguage, searchQuery, setSearchQuery, setActiveTab } = useAppStore();
  // Animate only once on first mount; language re-renders must not reset to opacity:0.
  const hasAnimated = React.useRef(false);
  React.useEffect(() => { hasAnimated.current = true; }, []);

  const tx = useTranslations({
    headline1: "What do you",
    headline2: "need?",
    subtitle: "Search for housing, jobs, healthcare, or ask Askonnect anything about Calgary.",
    searchPlaceholder: "My landlord won't fix the heat...",
    chip1: "I need childcare",
    chip2: "Jobs hiring now",
    chip3: "Family activities",
    searchResultsLabel: "Search Results",
    clearSearch: "Clear Search",
    noResultsTitle: "No results found",
    noResultsBody: "We couldn't find any resources matching your search. Try different keywords or ask our AI assistant.",
    askAI: "Ask the AI instead",
    startHere: "Start Here",
    whatMost: "What most",
    calgarians: "Calgarians",
    sectionNeed: "need.",
    specializedSupport: "Specialized Support",
    forSpecific: "For specific situations.",
    recommended: "Recommended",
    topResources: "Top resources this month.",
    viewAll: "View all",
    hiddenGems: "Hidden Gems",
    programsMiss: "Programs most people miss.",
    servicesArea: "Services in your area",
    explore: "Explore",
    view: "View",
    askonnect: "Askonnect",
    personalizedGuidance: "Get personalized guidance",
    realAnswers: "Real answers, step-by-step help, and matched Calgary resources.",
    housing: "Find Housing & Rent Support",
    housingDesc: "Affordable rentals, subsidized programs, rent supplements, and tenant assistance",
    housing12: "12 programs",
    jobs: "Looking for Work?",
    jobsDesc: "Resume building, job fairs, skills training, career counseling, and hiring companies",
    jobs340: "340+ openings",
    health: "Get Healthcare Access",
    healthDesc: "Walk-in clinics, family doctors, mental health support, and Alberta Health registration",
    health247: "24/7 available",
    newcomer: "New to Calgary?",
    newcomerDesc: "Settlement services, language classes, community connections, and integration support",
    newcomer10: "10 orgs",
    tenantRights: "Tenant Rights",
    tenantDesc: "Lease help, rent disputes, eviction support",
    familyKids: "Family & Kids",
    familyDesc: "Daycare, youth programs, family activities",
    seniors: "Seniors",
    seniorsDesc: "Home care, transportation, social programs",
    emergencyHelp: "Emergency Help",
    emergencyDesc: "Crisis lines, shelters, urgent support",
  });
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuredResources = resources.filter((r) => r.featured).slice(0, 4);
  const hiddenGems = resources.filter((r) => r.hiddenGem).slice(0, 3);

  // Comprehensive search across all resource fields (shared utility)
  const filteredResources = searchResources(resources, searchQuery, activeLanguage);

  // Resources from adjacent/related categories (shown in the "similar
  // categories" accordion), excluding anything already in the main results.
  const shownIds = new Set(filteredResources.map((r) => r.id));
  const similarGroups = getSimilarResources(resources, searchQuery, activeLanguage, shownIds);

  // Solution-first pathways with icons - GLASSY PREMIUM
  const pathways = [
    {
      id: "housing",
      icon: Home,
      solution: tx.housing,
      description: tx.housingDesc,
      bgGradient: "from-[#0c2d4d] to-[#071a2e]",
      accent: "#38BDF8",
      stats: tx.housing12,
    },
    {
      id: "jobs",
      icon: Briefcase,
      solution: tx.jobs,
      description: tx.jobsDesc,
      bgGradient: "from-[#0c2d4d] to-[#071a2e]",
      accent: "#38BDF8",
      stats: tx.jobs340,
    },
    {
      id: "health",
      icon: Heart,
      solution: tx.health,
      description: tx.healthDesc,
      bgGradient: "from-[#0c2d4d] to-[#071a2e]",
      accent: "#38BDF8",
      stats: tx.health247,
    },
    {
      id: "newcomer",
      icon: Users,
      solution: tx.newcomer,
      description: tx.newcomerDesc,
      bgGradient: "from-[#0c2d4d] to-[#071a2e]",
      accent: "#38BDF8",
      stats: tx.newcomer10,
    },
  ];

  // Specialized pathways
  const specialized = [
    { id: "tenant", label: tx.tenantRights, description: tx.tenantDesc, icon: "scale", query: "Tenant Rights" },
    { id: "family", label: tx.familyKids, description: tx.familyDesc, icon: "heart", query: "Family & Kids" },
    { id: "seniors", label: tx.seniors, description: tx.seniorsDesc, icon: "users", query: "Seniors" },
    { id: "emergency", label: tx.emergencyHelp, description: tx.emergencyDesc, icon: "alert", query: "Emergency Help" },
  ];

  return (
    <div className="min-h-screen relative">

      {/* Scroll-to-top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-[#0b2239] dark:bg-[#1D4ED8] text-white shadow-lg shadow-blue-900/30 hover:bg-[#E1251B] transition-colors duration-200"
          >
            <ChevronUp className="w-5 h-5" strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ========== HERO SEARCH ========== */}
      <section className="relative pt-8 pb-10 md:pt-24 md:pb-20 lg:pt-32 lg:pb-28">
        <div className="max-w-[720px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <h1
            className="text-[clamp(32px,7vw,56px)] font-bold tracking-[-0.02em] leading-[1.1] animate-fade-in-up"
          >
            {tx.headline1} <span className="text-calgary-red">{tx.headline2}</span>
          </h1>

          <p
            className="text-base md:text-lg text-foreground/70 mt-4 md:mt-6 mb-8 md:mb-10 leading-relaxed animate-fade-in-up [animation-delay:150ms]"
          >
            {tx.subtitle}
          </p>

          {/* Search bar */}
          <div
            className="relative max-w-xl animate-fade-in-up [animation-delay:200ms]"
          >
            <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1D4ED8] dark:text-[#38BDF8]" />
            <input
              type="text"
              placeholder={tx.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 md:h-16 bg-white dark:bg-[rgba(15,23,42,0.9)] hover:bg-white dark:hover:bg-[rgba(15,23,42,0.95)] border-2 border-foreground/[0.15] hover:border-foreground/[0.25] focus:border-[#1D4ED8] dark:focus:border-[#38BDF8] rounded-xl md:rounded-2xl text-base text-foreground placeholder:text-foreground/40 pl-12 md:pl-14 pr-4 md:pr-6 outline-none transition-all duration-300 focus:shadow-[0_0_0_4px_rgba(29,78,216,0.1)] dark:focus:shadow-[0_0_0_4px_rgba(56,189,248,0.1)] shadow-sm"
            />
          </div>

          {/* Quick queries */}
          {!searchQuery && (
            <div
              className="flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-6 animate-fade-in-up [animation-delay:400ms]"
            >
              {([
                [tx.chip1, "I need childcare"],
                [tx.chip2, "Jobs hiring now"],
                [tx.chip3, "Family activities"],
              ] as [string, string][]).map(([label, query]) => (
                <button
                  key={query}
                  onClick={() => setSearchQuery(query)}
                  className="px-3.5 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl bg-white dark:bg-foreground/[0.06] border border-foreground/[0.15] dark:border-foreground/[0.12] text-sm font-medium text-foreground hover:bg-[#1D4ED8] hover:border-[#1D4ED8] hover:text-white dark:hover:bg-[#38BDF8]/10 dark:hover:border-[#38BDF8]/40 dark:hover:text-foreground transition-all duration-300 shadow-sm"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Search results */}
      {searchQuery && (
        <section className="px-6 md:px-8 lg:px-12 pb-16 md:pb-20 max-w-[1200px] mx-auto relative z-10">
          {/* Professional search results header container */}
          <div className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-6 mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground/50 mb-1 uppercase tracking-wider font-medium">{tx.searchResultsLabel}</p>
                <h2 className="text-xl md:text-2xl font-bold leading-tight truncate">
                  &quot;{searchQuery}&quot;
                </h2>
              </div>
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-2.5 rounded-xl bg-foreground/[0.06] border border-foreground/[0.08] text-sm font-semibold text-foreground/70 hover:bg-foreground/[0.1] hover:text-foreground transition-all flex-shrink-0"
              >
                {tx.clearSearch}
              </button>
            </div>
          </div>
          
          {filteredResources.length > 0 ? (
            <>
              <p className="text-base text-foreground/50 mb-5 md:mb-6">{filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found</p>
              <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                {filteredResources.slice(0, 8).map((resource, i) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <ResourceCard resource={resource} variant="compact" />
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="glass-card rounded-2xl md:rounded-3xl p-10 md:p-12 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-foreground/[0.06] flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 md:w-10 md:h-10 text-foreground/30" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">{tx.noResultsTitle}</h3>
              <p className="text-base text-foreground/50 mb-8 max-w-md mx-auto leading-relaxed">
                {tx.noResultsBody}
              </p>
              <button
                onClick={() => setActiveTab("ai")}
                className="px-8 py-4 rounded-xl md:rounded-2xl bg-[#E1251B] text-white text-base font-bold hover:bg-[#B91C1C] transition-colors"
              >
                {tx.askAI}
              </button>
            </div>
          )}

          {/* Similar categories accordion + live Google / Google Maps search */}
          <SearchExtras query={searchQuery} similar={similarGroups} />
        </section>
      )}

      {/* ========== MAIN CONTENT ========== */}
      {!searchQuery && (
        <>
          {/* ========== SOLUTION PATHWAYS ========== */}
          <section className="px-6 md:px-8 lg:px-12 pb-12 md:pb-20 max-w-[1200px] mx-auto relative z-10">
            <div className="pb-8 md:pb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <p className="text-xs font-semibold text-[#1D4ED8] dark:text-[#38BDF8] uppercase tracking-[0.15em] mb-3">{tx.startHere}</p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{tx.whatMost} <span className="text-calgary-red">{tx.calgarians}</span> {tx.sectionNeed}</h2>
              </motion.div>
            </div>

            {/* 2x2 grid of large pathway cards - GLASSY PREMIUM */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {pathways.map((pathway, index) => {
                const Icon = pathway.icon;
                return (
                  <motion.button
                    key={pathway.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab("explore")}
                    className={`group relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br ${pathway.bgGradient} border border-white/10 hover:border-white/20 transition-all duration-500`}
                    style={{ 
                      boxShadow: `0 0 60px -20px ${pathway.accent}15`
                    }}
                  >
                    {/* Accent glow */}
                    <div 
                      className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-30"
                      style={{ background: pathway.accent }}
                    />

                    <div className="relative z-10 p-5 md:p-8 lg:p-10 flex flex-col items-center text-center">
                      {/* Icon */}
                      <div 
                        className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 border border-white/15 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${pathway.accent}15` }}
                      >
                        <Icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: pathway.accent }} />
                      </div>
                      
                      <div className="flex-1 flex flex-col items-center">
                        <h3 className="text-base md:text-xl lg:text-2xl font-bold text-white mb-2 md:mb-3 leading-tight tracking-[-0.01em]">{pathway.solution}</h3>
                        <p className="text-xs md:text-sm text-white/60 leading-relaxed line-clamp-2 md:line-clamp-none">{pathway.description}</p>
                      </div>
                      
                      <div className="flex flex-col items-center gap-3 mt-4 md:mt-6">
                        <span 
                          className="text-xs font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-full border"
                          style={{ 
                            backgroundColor: `${pathway.accent}12`, 
                            borderColor: `${pathway.accent}25`,
                            color: pathway.accent 
                          }}
                        >
                          {pathway.stats}
                        </span>
                        <div className="hidden md:flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                          <span className="text-sm font-medium">{tx.explore}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* ========== AI GUIDE BANNER ========== */}
          <section className="px-6 md:px-8 lg:px-12 pb-12 md:pb-20 max-w-[1200px] mx-auto relative z-10">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setActiveTab("ai")}
              className="group w-full relative overflow-hidden rounded-2xl md:rounded-3xl text-left shadow-xl"
            >
              {/* Deep navy → red Calgary gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b2239] via-[#0A2540] to-[#1a0a0a]" />
              {/* Subtle red accent at the right edge */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#E1251B]/30 to-transparent" />
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
              />
              
              <div className="relative z-10 p-5 md:p-8 lg:p-10 flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6">
                <motion.div 
                  whileHover={{ rotate: 5 }}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#E1251B] flex items-center justify-center flex-shrink-0 shadow-xl shadow-red-900/40"
                >
                  <MessageSquare className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#E1251B] uppercase tracking-[0.15em] mb-1.5">{tx.askonnect}</p>
                  <h3 className="text-lg md:text-2xl font-bold text-white mb-1 leading-tight">
                    {tx.personalizedGuidance}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {tx.realAnswers}
                  </p>
                </div>
                
                <ArrowRight className="hidden sm:block w-6 h-6 text-white/50 flex-shrink-0 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </motion.button>
          </section>

          {/* ========== SPECIALIZED PATHWAYS ========== */}
          <section className="px-6 md:px-8 lg:px-12 pt-4 pb-12 md:pb-20 max-w-[1200px] mx-auto relative z-10">
            <div className="pb-8 md:pb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <p className="text-xs font-semibold text-[#1D4ED8] dark:text-[#38BDF8] uppercase tracking-[0.15em] mb-3">{tx.specializedSupport}</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">{tx.forSpecific}</h2>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {specialized.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 + index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  onClick={() => setSearchQuery(item.query)}
                  className="group p-4 md:p-6 rounded-2xl bg-white dark:bg-foreground/[0.06] border border-foreground/[0.10] dark:border-foreground/[0.08] hover:border-[#1D4ED8]/40 dark:hover:border-white/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#0b2239] dark:text-foreground mb-2 md:mb-3 leading-tight">{item.label}</h3>
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-foreground/70 dark:text-foreground/65 mb-4 md:mb-5 leading-relaxed">{item.description}</p>
                  <div className="flex items-center gap-1 text-[#E1251B] text-xs md:text-sm font-bold mt-auto">
                    <span>{tx.view}</span>
                    <ChevronRight className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

          {/* ========== FEATURED RESOURCES ========== */}
          <section className="px-6 md:px-8 lg:px-12 pt-4 pb-16 md:pb-28 max-w-[1200px] mx-auto relative z-10">
            <div className="pb-8 md:pb-10">
              <div className="text-center">
                <p className="text-xs font-bold text-[#1D4ED8] dark:text-[#38BDF8] uppercase tracking-[0.15em] mb-3">{tx.recommended}</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">{tx.topResources}</h2>
                <button
                  onClick={() => setActiveTab("explore")}
                  className="text-[#E1251B] text-sm font-bold inline-flex items-center gap-1.5 hover:gap-2 transition-all mt-3"
                >
                  {tx.viewAll} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {featuredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                >
                  <ResourceCard resource={resource} variant="compact" />
                </motion.div>
              ))}
            </div>
          </section>

          {/* ========== HIDDEN GEMS ========== */}
          {hiddenGems.length > 0 && (
            <section className="px-6 md:px-8 lg:px-12 pt-4 pb-12 md:pb-20 max-w-[1200px] mx-auto relative z-10">
              <div className="pb-8 md:pb-10">
                <div className="text-center">
                  <p className="text-xs font-bold text-[#1D4ED8] dark:text-[#38BDF8] uppercase tracking-[0.15em] mb-3">{tx.hiddenGems}</p>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">{tx.programsMiss}</h2>
                  <button
                    onClick={() => setActiveTab("explore")}
                  className="text-[#E1251B] text-sm font-bold inline-flex items-center gap-1.5 hover:gap-2 transition-all mt-3"
                  >
                    {tx.viewAll} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {hiddenGems.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75 + index * 0.06 }}
                  >
                    <ResourceCard resource={resource} variant="compact" />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* ========== NEAR YOU ========== */}
          <section className="px-6 md:px-8 lg:px-12 pb-4 max-w-[1200px] mx-auto relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-[#1D4ED8] dark:text-[#38BDF8]" />
              <h2 className="text-sm font-bold text-[#1D4ED8] dark:text-[#38BDF8] uppercase tracking-[0.15em]">{tx.servicesArea}</h2>
            </div>

            {/* One-line compact bullet rows */}
            <div className="rounded-xl border border-foreground/[0.07] bg-foreground/[0.03] divide-y divide-foreground/[0.05] overflow-hidden">
              {[
                { name: "Calgary Food Bank", distance: "0.8 km", tag: "Free", hours: "Mon–Fri 9–5" },
                { name: "Calgary Drop-In Centre", distance: "1.1 km", tag: "Free", hours: "24/7" },
                { name: "Alpha House Calgary", distance: "1.6 km", tag: "24/7", hours: "Always Open" },
                { name: "Calgary Immigrant Women's Assoc.", distance: "2.0 km", tag: "Free", hours: "Mon–Fri 9–5" },
                { name: "Alex Community Health Centre", distance: "2.3 km", tag: "Health", hours: "Mon–Sat 8–6" },
              ].map((place, index) => (
                <motion.div
                  key={place.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.04 }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-foreground/[0.04] transition-colors"
                >
                  <span className="text-sm font-semibold text-foreground flex-1 min-w-0 truncate">{place.name}</span>
                  <span className="text-xs text-foreground/50 flex-shrink-0 hidden sm:block">{place.hours}</span>
                  <span className="text-xs text-foreground/40 flex-shrink-0">{place.distance}</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#1D4ED8]/10 text-[#1D4ED8] dark:bg-[#0284c7]/15 dark:text-[#38BDF8] flex-shrink-0">
                    {place.tag}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
