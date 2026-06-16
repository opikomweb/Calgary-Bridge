"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { resources } from "@/lib/data";
import { Search, ArrowRight, MessageSquare, MapPin, ChevronRight, Home, Briefcase, Heart, Users, ChevronUp } from "lucide-react";
import ResourceCard from "../resource-card";
import SearchExtras from "../search-extras";
import { searchResources, getSimilarResources } from "@/lib/search";
import React from "react";

export default function HomeTab() {
  const { activeLanguage, searchQuery, setSearchQuery, setActiveTab } = useAppStore();
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
      solution: "Find Housing & Rent Support",
      description: "Affordable rentals, subsidized programs, rent supplements, and tenant assistance",
      bgGradient: "from-[#0c2d4d] to-[#071a2e]",
      accent: "#38BDF8",
      stats: "12 programs",
    },
    {
      id: "jobs",
      icon: Briefcase,
      solution: "Looking for Work?",
      description: "Resume building, job fairs, skills training, career counseling, and hiring companies",
      bgGradient: "from-[#0c2d4d] to-[#071a2e]",
      accent: "#38BDF8",
      stats: "340+ openings",
    },
    {
      id: "health",
      icon: Heart,
      solution: "Get Healthcare Access",
      description: "Walk-in clinics, family doctors, mental health support, and Alberta Health registration",
      bgGradient: "from-[#0c2d4d] to-[#071a2e]",
      accent: "#38BDF8",
      stats: "24/7 available",
    },
    {
      id: "newcomer",
      icon: Users,
      solution: "New to Calgary?",
      description: "Settlement services, language classes, community connections, and integration support",
      bgGradient: "from-[#0c2d4d] to-[#071a2e]",
      accent: "#38BDF8",
      stats: "10 orgs",
    },
  ];

  // Specialized pathways
  const specialized = [
    { id: "tenant", label: "Tenant Rights", description: "Lease help, rent disputes, eviction support", icon: "scale" },
    { id: "family", label: "Family & Kids", description: "Daycare, youth programs, family activities", icon: "heart" },
    { id: "seniors", label: "Seniors", description: "Home care, transportation, social programs", icon: "users" },
    { id: "emergency", label: "Emergency Help", description: "Crisis lines, shelters, urgent support", icon: "alert" },
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
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(32px,7vw,56px)] font-bold tracking-[-0.02em] leading-[1.1]"
          >
            What do you <span className="text-calgary-red">need?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-base md:text-lg text-foreground/70 mt-4 md:mt-6 mb-8 md:mb-10 leading-relaxed"
          >
            Search for housing, jobs, healthcare, or ask iKonnect anything about Calgary.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative max-w-xl"
          >
            <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1D4ED8] dark:text-[#38BDF8]" />
            <input
              type="text"
              placeholder="My landlord won't fix the heat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 md:h-16 bg-white dark:bg-[rgba(15,23,42,0.9)] hover:bg-white dark:hover:bg-[rgba(15,23,42,0.95)] border-2 border-foreground/[0.15] hover:border-foreground/[0.25] focus:border-[#1D4ED8] dark:focus:border-[#38BDF8] rounded-xl md:rounded-2xl text-base text-foreground placeholder:text-foreground/40 pl-12 md:pl-14 pr-4 md:pr-6 outline-none transition-all duration-300 focus:shadow-[0_0_0_4px_rgba(29,78,216,0.1)] dark:focus:shadow-[0_0_0_4px_rgba(56,189,248,0.1)] shadow-sm"
            />
          </motion.div>

          {/* Quick queries */}
          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-6"
            >
              {["I need childcare", "Jobs hiring now", "Family activities"].map((q) => (
                <button
                  key={q}
                  onClick={() => setSearchQuery(q)}
                  className="px-3.5 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl bg-white dark:bg-foreground/[0.06] border border-foreground/[0.15] dark:border-foreground/[0.12] text-sm font-medium text-foreground hover:bg-[#1D4ED8] hover:border-[#1D4ED8] hover:text-white dark:hover:bg-[#38BDF8]/10 dark:hover:border-[#38BDF8]/40 dark:hover:text-foreground transition-all duration-300 shadow-sm"
                >
                  {q}
                </button>
              ))}
            </motion.div>
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
                <p className="text-xs text-foreground/50 mb-1 uppercase tracking-wider font-medium">Search Results</p>
                <h2 className="text-xl md:text-2xl font-bold leading-tight truncate">
                  &quot;{searchQuery}&quot;
                </h2>
              </div>
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-2.5 rounded-xl bg-foreground/[0.06] border border-foreground/[0.08] text-sm font-semibold text-foreground/70 hover:bg-foreground/[0.1] hover:text-foreground transition-all flex-shrink-0"
              >
                Clear Search
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
              <h3 className="text-xl md:text-2xl font-bold mb-3">No results found</h3>
              <p className="text-base text-foreground/50 mb-8 max-w-md mx-auto leading-relaxed">
                We couldn&apos;t find any resources matching your search. Try different keywords or ask our AI assistant.
              </p>
              <button
                onClick={() => setActiveTab("ai")}
                className="px-8 py-4 rounded-xl md:rounded-2xl bg-[#E1251B] text-white text-base font-bold hover:bg-[#B91C1C] transition-colors"
              >
                Ask the AI instead
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
                <p className="text-xs font-semibold text-[#1D4ED8] dark:text-[#38BDF8] uppercase tracking-[0.15em] mb-3">Start Here</p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">What most <span className="text-calgary-red">Calgarians</span> need.</h2>
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
                    className={`group relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br ${pathway.bgGradient} backdrop-blur-xl border border-foreground/[0.06] hover:border-foreground/[0.12] transition-all duration-500`}
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
                        className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 border border-foreground/[0.08] backdrop-blur-sm transition-transform group-hover:scale-110"
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
                          <span className="text-sm font-medium">Explore</span>
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
                  <p className="text-xs font-bold text-[#E1251B] uppercase tracking-[0.15em] mb-1.5">iKonnect Guide</p>
                  <h3 className="text-lg md:text-2xl font-bold text-white mb-1 leading-tight">
                    Get personalized guidance
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    Real answers, step-by-step help, and matched Calgary resources.
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
                <p className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-[0.15em] mb-3">Specialized Support</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">For specific situations.</h2>
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
                  onClick={() => setActiveTab("explore")}
                  className="group p-3 md:p-6 rounded-xl md:rounded-2xl bg-foreground/[0.04] border border-foreground/[0.06] hover:bg-foreground/[0.08] hover:border-foreground/[0.15] transition-all duration-300 flex flex-col items-center text-center"
                >
                  <h3 className="text-xs sm:text-sm md:text-base font-bold text-foreground mb-1 md:mb-2 leading-tight">{item.label}</h3>
                  <p className="text-[10px] sm:text-xs md:text-sm text-foreground/60 mb-2 md:mb-3 leading-relaxed">{item.description}</p>
                  <div className="flex items-center gap-1 text-[#E1251B] text-xs md:text-sm font-bold mt-auto">
                    <span>View</span>
                    <ChevronRight className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

          {/* ========== FEATURED RESOURCES ========== */}
          <section className="px-6 md:px-8 lg:px-12 pt-4 pb-12 md:pb-20 max-w-[1200px] mx-auto relative z-10">
            <div className="pb-8 md:pb-10">
              <div className="text-center">
                <p className="text-xs font-bold text-[#1D4ED8] dark:text-[#0284c7] uppercase tracking-[0.15em] mb-3">Recommended</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">Top resources this month.</h2>
                <button
                  onClick={() => setActiveTab("explore")}
                  className="text-[#E1251B] text-sm font-bold inline-flex items-center gap-1.5 hover:gap-2 transition-all mt-3"
                >
                  View all <ArrowRight className="w-4 h-4" />
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
                  <p className="text-xs font-bold text-[#1D4ED8] dark:text-[#0284c7] uppercase tracking-[0.15em] mb-3">Hidden Gems</p>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">Programs most people miss.</h2>
                  <button
                    onClick={() => setActiveTab("explore")}
                  className="text-[#E1251B] text-sm font-bold inline-flex items-center gap-1.5 hover:gap-2 transition-all mt-3"
                  >
                    View all <ArrowRight className="w-4 h-4" />
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
          <section className="px-6 md:px-8 lg:px-12 pb-24 md:pb-32 max-w-[1200px] mx-auto relative z-10">
            <div className="pb-16 md:pb-20 lg:pb-24">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[#1D4ED8] dark:text-[#0284c7]" />
                <p className="text-xs font-bold text-[#1D4ED8] dark:text-[#0284c7] uppercase tracking-[0.15em]">Near You</p>
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">Services in your area.</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {[
                { name: "Calgary Food Bank", distance: "0.8 km", tag: "Free", hours: "Mon-Fri 9-5" },
                { name: "Centre for Newcomers", distance: "1.2 km", tag: "Free", hours: "Mon-Sat 9-6" },
                { name: "Alpha House Calgary", distance: "1.6 km", tag: "24/7", hours: "Always Open" },
              ].map((place, index) => (
                <motion.div
                  key={place.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="p-5 md:p-6 rounded-xl md:rounded-2xl bg-foreground/[0.04] border border-foreground/[0.06] hover:bg-foreground/[0.07] hover:border-foreground/[0.12] transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-base md:text-lg font-bold text-foreground leading-tight">{place.name}</h3>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#1D4ED8]/15 text-[#1D4ED8] dark:bg-[#0284c7]/15 dark:text-[#38BDF8] flex-shrink-0">
                      {place.tag}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--foreground-muted)] mb-1">{place.distance} away</p>
                  <p className="text-sm text-[var(--foreground-muted)]">{place.hours}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
