"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { resources } from "@/lib/data";
import { Search, ArrowRight, Sparkles, MapPin, ChevronRight, Home, Briefcase, Heart, Users } from "lucide-react";
import ResourceCard from "../resource-card";

export default function HomeTab() {
  const { activeLanguage, searchQuery, setSearchQuery, setActiveTab } = useAppStore();

  const featuredResources = resources.filter((r) => r.featured).slice(0, 4);
  const hiddenGems = resources.filter((r) => r.hiddenGem).slice(0, 3);

  const filteredResources = searchQuery
    ? resources.filter(
        (r) =>
          r.title[activeLanguage]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description[activeLanguage]?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Solution-first pathways with icons
  const pathways = [
    {
      id: "housing",
      icon: Home,
      solution: "Find Housing & Rent Support",
      description: "Affordable rentals, subsidized programs, rent supplements, and tenant assistance",
      gradient: "from-sky-600/90 via-sky-700/80 to-sky-900/90",
      accent: "#38BDF8",
      stats: "12 programs",
      glow: "shadow-sky-500/20",
    },
    {
      id: "jobs",
      icon: Briefcase,
      solution: "Looking for Work?",
      description: "Resume building, job fairs, skills training, career counseling, and hiring companies",
      gradient: "from-amber-500/90 via-amber-600/80 to-amber-800/90",
      accent: "#FBBF24",
      stats: "340+ openings",
      glow: "shadow-amber-500/20",
    },
    {
      id: "health",
      icon: Heart,
      solution: "Get Healthcare Access",
      description: "Walk-in clinics, family doctors, mental health support, and Alberta Health registration",
      gradient: "from-emerald-500/90 via-emerald-600/80 to-emerald-800/90",
      accent: "#34D399",
      stats: "24/7 available",
      glow: "shadow-emerald-500/20",
    },
    {
      id: "newcomer",
      icon: Users,
      solution: "New to Calgary?",
      description: "Settlement services, language classes, community connections, and integration support",
      gradient: "from-cyan-500/90 via-cyan-600/80 to-cyan-800/90",
      accent: "#22D3EE",
      stats: "10 orgs",
      glow: "shadow-cyan-500/20",
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
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="max-w-[900px] mx-auto px-10 lg:px-14 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(44px,11vw,72px)] font-bold tracking-[-0.03em] leading-[1.02] mb-10"
          >
            What do you need?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xl md:text-2xl text-white/50 mb-16 max-w-2xl mx-auto leading-relaxed"
          >
            Search for housing, jobs, healthcare, or ask the AI anything about Calgary.
          </motion.p>

          {/* Giant search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-9 top-1/2 -translate-y-1/2 w-7 h-7 text-white/40" />
            <input
              type="text"
              placeholder="My landlord won't fix the heat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[96px] bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.12] focus:border-[#38BDF8]/40 focus:bg-white/[0.06] rounded-[32px] text-xl md:text-2xl text-white placeholder:text-white/30 pl-20 pr-12 outline-none transition-all duration-300 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.08),0_32px_64px_-16px_rgba(0,0,0,0.6)]"
            />
          </motion.div>

          {/* Quick queries */}
          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 mt-12"
            >
              {["I need childcare", "Jobs hiring now", "Family activities"].map((q) => (
                <button
                  key={q}
                  onClick={() => setSearchQuery(q)}
                  className="px-7 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-base text-white/50 hover:bg-white/[0.06] hover:border-white/[0.12] hover:text-white/80 transition-all duration-300"
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
        <section className="px-8 lg:px-12 pb-24 max-w-[1400px] mx-auto relative z-10">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Results for &quot;{searchQuery}&quot;</h2>
            <button
              onClick={() => setSearchQuery("")}
              className="text-[#38BDF8] text-lg font-semibold hover:underline"
            >
              Clear
            </button>
          </div>
          {filteredResources.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-8">
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
          ) : (
            <div className="text-center py-24">
              <p className="text-2xl text-[var(--foreground-muted)]">No results found</p>
              <button
                onClick={() => setActiveTab("ai")}
                className="mt-8 px-8 py-4 rounded-2xl bg-[#38BDF8] text-[#07111F] text-lg font-semibold"
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
          <section className="px-8 lg:px-12 pb-32 max-w-[1400px] mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-16"
            >
              <p className="text-sm font-semibold text-[#38BDF8] uppercase tracking-[0.2em] mb-4">Start Here</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">What most Calgarians need.</h2>
            </motion.div>

            {/* 2x2 grid of large pathway cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {pathways.map((pathway, index) => {
                const Icon = pathway.icon;
                return (
                  <motion.button
                    key={pathway.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.02, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab("explore")}
                    className={`group relative overflow-hidden rounded-[32px] text-left bg-gradient-to-br ${pathway.gradient} border border-white/[0.1] hover:border-white/[0.2] transition-all duration-500 shadow-2xl ${pathway.glow}`}
                    style={{ minHeight: "280px" }}
                  >
                    {/* Animated glow on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ background: `radial-gradient(circle at 20% 50%, ${pathway.accent}25 0%, transparent 60%)` }}
                    />
                    
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '32px 32px'
                      }}
                    />

                    <div className="relative z-10 p-10 md:p-12 h-full flex flex-col">
                      {/* Icon */}
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${pathway.accent}30` }}
                      >
                        <Icon className="w-8 h-8" style={{ color: pathway.accent }} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{pathway.solution}</h3>
                        <p className="text-lg text-white/80 leading-relaxed">{pathway.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-10">
                        <span 
                          className="text-base font-bold px-5 py-2.5 rounded-full"
                          style={{ backgroundColor: `${pathway.accent}25`, color: pathway.accent }}
                        >
                          {pathway.stats}
                        </span>
                        <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors">
                          <span className="text-base font-semibold">Explore</span>
                          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* ========== AI GUIDE BANNER ========== */}
          <section className="px-8 lg:px-12 pb-32 max-w-[1400px] mx-auto relative z-10">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              whileHover={{ scale: 1.01, y: -4 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setActiveTab("ai")}
              className="group w-full relative overflow-hidden rounded-[32px] text-left shadow-2xl"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c4a6e] via-[#0369a1] to-[#0284c7]" />
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
              
              <div className="relative z-10 p-12 md:p-16 flex flex-col md:flex-row md:items-center gap-10">
                <motion.div 
                  whileHover={{ rotate: 5 }}
                  className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#38BDF8] to-[#0284c7] flex items-center justify-center flex-shrink-0 shadow-2xl shadow-sky-500/40"
                >
                  <Sparkles className="w-12 h-12 text-white" />
                </motion.div>
                
                <div className="flex-1">
                  <p className="text-sm font-bold text-sky-200 uppercase tracking-[0.2em] mb-3">Calgary Bridge AI</p>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    Get personalized guidance for your situation
                  </h3>
                  <p className="text-xl text-white/80 leading-relaxed">
                    Not just links — real answers, step-by-step instructions, and matched resources.
                  </p>
                </div>
                
                <ArrowRight className="w-10 h-10 text-white/60 flex-shrink-0 group-hover:text-white group-hover:translate-x-3 transition-all duration-300" />
              </div>
            </motion.button>
          </section>

          {/* ========== SPECIALIZED PATHWAYS ========== */}
          <section className="px-8 lg:px-12 pb-32 max-w-[1400px] mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-14"
            >
              <p className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-[0.2em] mb-4">Specialized Support</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">For specific situations.</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {specialized.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 + index * 0.05 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => setActiveTab("explore")}
                  className="group text-left p-8 rounded-[24px] bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-white mb-3">{item.label}</h3>
                  <p className="text-base text-[var(--foreground-muted)] mb-6 leading-relaxed">{item.description}</p>
                  <div className="flex items-center gap-2 text-[#38BDF8] text-base font-semibold">
                    <span>View resources</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

          {/* ========== FEATURED RESOURCES ========== */}
          <section className="px-8 lg:px-12 pb-32 max-w-[1400px] mx-auto relative z-10">
            <div className="flex items-center justify-between mb-14">
              <div>
                <p className="text-sm font-bold text-[#FBBF24] uppercase tracking-[0.2em] mb-4">Recommended</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Top resources this month.</h2>
              </div>
              <button
                onClick={() => setActiveTab("explore")}
                className="text-[#38BDF8] text-lg font-semibold flex items-center gap-2 hover:gap-3 transition-all"
              >
                View all <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
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
            <section className="px-8 lg:px-12 pb-32 max-w-[1400px] mx-auto relative z-10">
              <div className="flex items-center justify-between mb-14">
                <div>
                  <p className="text-sm font-bold text-[#a855f7] uppercase tracking-[0.2em] mb-4">Hidden Gems</p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Programs most people miss.</h2>
                </div>
                <button
                  onClick={() => setActiveTab("explore")}
                  className="text-[#a855f7] text-lg font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  See all <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
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
          <section className="px-8 lg:px-12 pb-40 max-w-[1400px] mx-auto relative z-10">
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <p className="text-sm font-bold text-emerald-400 uppercase tracking-[0.2em]">Near You</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Services in your area.</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  whileHover={{ y: -4 }}
                  className="p-8 rounded-[24px] bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-5">
                    <h3 className="text-xl font-bold text-white">{place.name}</h3>
                    <span className="text-sm font-bold px-4 py-2 rounded-full bg-emerald-400/15 text-emerald-400">
                      {place.tag}
                    </span>
                  </div>
                  <p className="text-base text-[var(--foreground-muted)] mb-2">{place.distance} away</p>
                  <p className="text-base text-[var(--foreground-muted)]">{place.hours}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
