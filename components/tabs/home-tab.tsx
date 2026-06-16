"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { resources } from "@/lib/data";
import { Search, ArrowRight, Sparkles, MapPin, ChevronRight, Home, Briefcase, Heart, Users } from "lucide-react";
import ResourceCard from "../resource-card";
import { searchResources } from "@/lib/search";

export default function HomeTab() {
  const { activeLanguage, searchQuery, setSearchQuery, setActiveTab } = useAppStore();

  const featuredResources = resources.filter((r) => r.featured).slice(0, 4);
  const hiddenGems = resources.filter((r) => r.hiddenGem).slice(0, 3);

  // Comprehensive search across all resource fields (shared utility)
  const filteredResources = searchResources(resources, searchQuery, activeLanguage);

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
      bgGradient: "from-[#2d2408] to-[#1a1505]",
      accent: "#FBBF24",
      stats: "340+ openings",
    },
    {
      id: "health",
      icon: Heart,
      solution: "Get Healthcare Access",
      description: "Walk-in clinics, family doctors, mental health support, and Alberta Health registration",
      bgGradient: "from-[#0d2d24] to-[#071a16]",
      accent: "#34D399",
      stats: "24/7 available",
    },
    {
      id: "newcomer",
      icon: Users,
      solution: "New to Calgary?",
      description: "Settlement services, language classes, community connections, and integration support",
      bgGradient: "from-[#082d36] to-[#051a20]",
      accent: "#22D3EE",
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
            className="text-sm md:text-base text-foreground/40 mt-4 md:mt-6 mb-8 md:mb-10 leading-relaxed"
          >
            Search for housing, jobs, healthcare, or ask the AI anything about Calgary.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative max-w-xl"
          >
            <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="text"
              placeholder="My landlord won't fix the heat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 md:h-16 bg-foreground/[0.05] hover:bg-foreground/[0.07] border border-foreground/[0.1] hover:border-foreground/[0.15] focus:border-[#38BDF8]/50 focus:bg-foreground/[0.07] rounded-xl md:rounded-2xl text-base text-foreground placeholder:text-foreground/30 pl-12 md:pl-14 pr-4 md:pr-6 outline-none transition-all duration-300 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.1)]"
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
                  className="px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl bg-foreground/[0.04] border border-foreground/[0.08] text-xs md:text-sm text-foreground/50 hover:bg-foreground/[0.08] hover:border-foreground/[0.15] hover:text-foreground/80 transition-all duration-300"
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
                className="px-8 py-4 rounded-xl md:rounded-2xl bg-[#38BDF8] text-[#07111F] text-base font-bold hover:bg-[#7dd3fc] transition-colors"
              >
                Ask the AI instead
              </button>
            </div>
          )}
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
                <p className="text-xs font-semibold text-[#38BDF8] uppercase tracking-[0.15em] mb-3">Start Here</p>
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
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c4a6e] via-[#0369a1] to-[#0284c7]" />
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
              
              <div className="relative z-10 p-6 md:p-10 lg:p-12 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                <motion.div 
                  whileHover={{ rotate: 5 }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#38BDF8] to-[#0284c7] flex items-center justify-center flex-shrink-0 shadow-xl shadow-sky-500/30"
                >
                  <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-sky-200 uppercase tracking-[0.15em] mb-2">iKonnect Guide</p>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                    Get personalized guidance
                  </h3>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed line-clamp-2">
                    Not just links — real answers, step-by-step instructions, and matched resources.
                  </p>
                </div>
                
                <ArrowRight className="hidden md:block w-8 h-8 text-white/60 flex-shrink-0 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
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
                  className="group p-4 md:p-6 rounded-xl md:rounded-2xl bg-foreground/[0.04] border border-foreground/[0.06] hover:bg-foreground/[0.08] hover:border-foreground/[0.15] transition-all duration-300 flex flex-col items-center text-center"
                >
                  <h3 className="text-sm md:text-base font-bold text-foreground mb-1 md:mb-2">{item.label}</h3>
                  <p className="text-xs md:text-sm text-[var(--foreground-muted)] mb-3 leading-relaxed line-clamp-2">{item.description}</p>
                  <div className="flex items-center gap-1.5 text-[#38BDF8] text-xs md:text-sm font-semibold mt-auto">
                    <span>View</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

          {/* ========== FEATURED RESOURCES ========== */}
          <section className="px-6 md:px-8 lg:px-12 pt-4 pb-12 md:pb-20 max-w-[1200px] mx-auto relative z-10">
            <div className="pb-8 md:pb-10">
              <div className="text-center">
                <p className="text-xs font-bold text-[#FBBF24] uppercase tracking-[0.15em] mb-3">Recommended</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">Top resources this month.</h2>
                <button
                  onClick={() => setActiveTab("explore")}
                  className="text-[#38BDF8] text-sm font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all mt-3"
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
                  <p className="text-xs font-bold text-[#a855f7] uppercase tracking-[0.15em] mb-3">Hidden Gems</p>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">Programs most people miss.</h2>
                  <button
                    onClick={() => setActiveTab("explore")}
                    className="text-[#38BDF8] text-sm font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all mt-3"
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
                <MapPin className="w-4 h-4 text-emerald-400" />
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-[0.15em]">Near You</p>
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
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-400/15 text-emerald-400 flex-shrink-0">
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
