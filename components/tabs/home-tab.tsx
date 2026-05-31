"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { resources } from "@/lib/data";
import { Search, ArrowRight, Sparkles, MapPin, ChevronRight } from "lucide-react";
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

  // Solution-first pathways — what users actually need, not organization names
  const pathways = [
    {
      id: "housing",
      solution: "Find Housing & Rent Support",
      description: "Affordable rentals, subsidized programs, tenant help",
      gradient: "from-sky-900/80 to-sky-800/60",
      accent: "#38BDF8",
      stats: "12 programs",
    },
    {
      id: "jobs",
      solution: "Looking for Work?",
      description: "Resume help, hiring companies, job fairs, training",
      gradient: "from-amber-900/80 to-amber-800/60",
      accent: "#FBBF24",
      stats: "340+ openings",
    },
    {
      id: "health",
      solution: "Get Healthcare Access",
      description: "Walk-in clinics, family doctors, mental health",
      gradient: "from-emerald-900/80 to-emerald-800/60",
      accent: "#34D399",
      stats: "24/7 available",
    },
    {
      id: "newcomer",
      solution: "New to Calgary?",
      description: "Settlement services, language classes, community",
      gradient: "from-cyan-900/80 to-cyan-800/60",
      accent: "#22D3EE",
      stats: "10 orgs",
    },
  ];

  // Specialized pathways — second tier
  const specialized = [
    { id: "tenant", label: "Tenant Rights", description: "Lease help, rent disputes" },
    { id: "family", label: "Family & Kids", description: "Daycare, youth programs" },
    { id: "seniors", label: "Seniors", description: "Home care, transportation" },
    { id: "emergency", label: "Emergency Help", description: "Crisis lines, shelters" },
  ];

  return (
    <div className="min-h-screen bg-[#07111F]">

      {/* ========== HERO SEARCH — Apple Spotlight style ========== */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#38BDF8]/10 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-[900px] mx-auto px-8 relative z-10 text-center">
          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(36px,8vw,56px)] font-bold tracking-[-0.03em] leading-[1.08] mb-6"
          >
            What do you need?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xl text-[var(--foreground-muted)] mb-12 max-w-xl mx-auto"
          >
            Search for housing, jobs, healthcare, or ask the AI anything about Calgary.
          </motion.p>

          {/* Giant search bar — 80px */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--foreground-muted)]" />
            <input
              type="text"
              placeholder="My landlord won't fix the heat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-20 bg-white/[0.06] hover:bg-white/[0.08] border border-white/10 hover:border-white/15 focus:border-[#38BDF8]/50 focus:bg-white/[0.08] rounded-3xl text-xl text-white placeholder:text-[var(--foreground-muted)]/70 pl-[68px] pr-8 outline-none transition-all duration-300 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12),0_20px_40px_-12px_rgba(0,0,0,0.4)]"
            />
          </motion.div>

          {/* Quick queries */}
          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
              {["I need childcare", "Jobs hiring now", "Family activities"].map((q) => (
                <button
                  key={q}
                  onClick={() => setSearchQuery(q)}
                  className="px-5 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-[var(--foreground-muted)] hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-white transition-all"
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
        <section className="px-8 pb-20 max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold">Results for &quot;{searchQuery}&quot;</h2>
            <button
              onClick={() => setSearchQuery("")}
              className="text-[#38BDF8] font-medium hover:underline"
            >
              Clear
            </button>
          </div>
          {filteredResources.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-6">
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
            <div className="text-center py-20">
              <p className="text-xl text-[var(--foreground-muted)]">No results found</p>
              <button
                onClick={() => setActiveTab("ai")}
                className="mt-6 px-6 py-3 rounded-xl bg-[#38BDF8] text-[#07111F] font-semibold"
              >
                Ask the AI instead
              </button>
            </div>
          )}
        </section>
      )}

      {/* ========== MAIN CONTENT — only when not searching ========== */}
      {!searchQuery && (
        <>
          {/* ========== SOLUTION PATHWAYS — Immersive cards ========== */}
          <section className="px-8 pb-24 max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <p className="text-sm font-semibold text-[#38BDF8] uppercase tracking-widest mb-3">Start Here</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What most Calgarians need.</h2>
            </motion.div>

            {/* 2x2 grid of large pathway cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {pathways.map((pathway, index) => (
                <motion.button
                  key={pathway.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.015, y: -4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setActiveTab("explore")}
                  className={`group relative overflow-hidden rounded-3xl text-left bg-gradient-to-br ${pathway.gradient} border border-white/[0.08] hover:border-white/[0.15] transition-all duration-400`}
                  style={{ minHeight: "220px" }}
                >
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 30% 50%, ${pathway.accent}15 0%, transparent 60%)` }}
                  />

                  <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{pathway.solution}</h3>
                      <p className="text-base text-white/70">{pathway.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-8">
                      <span 
                        className="text-sm font-semibold px-4 py-2 rounded-full"
                        style={{ backgroundColor: `${pathway.accent}20`, color: pathway.accent }}
                      >
                        {pathway.stats}
                      </span>
                      <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                        <span className="text-sm font-medium">Explore</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

          {/* ========== AI GUIDE BANNER ========== */}
          <section className="px-8 pb-24 max-w-[1400px] mx-auto">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setActiveTab("ai")}
              className="group w-full relative overflow-hidden rounded-3xl text-left"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#38BDF8]/20 via-[#0284c7]/15 to-[#FBBF24]/10" />
              <div className="absolute inset-0 bg-[#07111F]/60" />
              
              {/* Content */}
              <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row md:items-center gap-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#38BDF8] to-[#0284c7] flex items-center justify-center flex-shrink-0 shadow-2xl shadow-sky-500/30 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#38BDF8] uppercase tracking-widest mb-2">Calgary Bridge AI</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Get personalized guidance for your situation
                  </h3>
                  <p className="text-lg text-white/70">
                    Not just links — real answers, step-by-step instructions, and matched resources.
                  </p>
                </div>
                
                <ArrowRight className="w-8 h-8 text-white/50 flex-shrink-0 group-hover:text-white group-hover:translate-x-2 transition-all" />
              </div>
            </motion.button>
          </section>

          {/* ========== SPECIALIZED PATHWAYS ========== */}
          <section className="px-8 pb-24 max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-10"
            >
              <p className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-widest mb-3">Specialized Support</p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">For specific situations.</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {specialized.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 + index * 0.05 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setActiveTab("explore")}
                  className="group text-left p-7 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/[0.12] transition-all"
                >
                  <h3 className="text-lg font-bold text-white mb-2">{item.label}</h3>
                  <p className="text-sm text-[var(--foreground-muted)] mb-5">{item.description}</p>
                  <div className="flex items-center gap-1.5 text-[#38BDF8] text-sm font-medium">
                    <span>View resources</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

          {/* ========== FEATURED RESOURCES ========== */}
          <section className="px-8 pb-24 max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-sm font-semibold text-[#FBBF24] uppercase tracking-widest mb-3">Recommended</p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Top resources this month.</h2>
              </div>
              <button
                onClick={() => setActiveTab("explore")}
                className="text-[#38BDF8] font-semibold flex items-center gap-2 hover:underline"
              >
                View all <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
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
            <section className="px-8 pb-24 max-w-[1400px] mx-auto">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-sm font-semibold text-[#a855f7] uppercase tracking-widest mb-3">Hidden Gems</p>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Programs most people miss.</h2>
                </div>
                <button
                  onClick={() => setActiveTab("explore")}
                  className="text-[#a855f7] font-semibold flex items-center gap-2 hover:underline"
                >
                  See all <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
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
          <section className="px-8 pb-32 max-w-[1400px] mx-auto">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest">Near You</p>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Services in your area.</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                  className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">{place.name}</h3>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-400/15 text-emerald-400">
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
