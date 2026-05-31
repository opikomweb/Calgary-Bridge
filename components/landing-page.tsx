"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Home, Briefcase, Heart, Users, GraduationCap, Clock, AlertTriangle, Scale, Search, Shield, TrendingUp, MapPin, Zap } from "lucide-react";
import { useAppStore } from "@/lib/store";

export default function LandingPage() {
  const { setCurrentPage, setActiveTab, setHasOnboarded } = useAppStore();

  // MAINSTREAM FIRST — the services every Calgarian needs
  const primaryCategories = [
    {
      icon: Home,
      title: "Housing & Rent",
      description: "Affordable rentals, subsidized programs, rental assistance",
      stat: "12 programs",
      color: "from-sky-400/25 to-sky-600/10",
      border: "hover:border-sky-400/40",
      glow: "hover:shadow-sky-500/20",
      iconColor: "text-sky-400",
    },
    {
      icon: Briefcase,
      title: "Jobs & Career",
      description: "Employment services, job training, resume help",
      stat: "8 services",
      color: "from-amber-400/25 to-amber-600/10",
      border: "hover:border-amber-400/40",
      glow: "hover:shadow-amber-500/20",
      iconColor: "text-amber-400",
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Walk-in clinics, family doctors, mental health support",
      stat: "6 providers",
      color: "from-emerald-400/25 to-emerald-600/10",
      border: "hover:border-emerald-400/40",
      glow: "hover:shadow-emerald-500/20",
      iconColor: "text-emerald-400",
    },
    {
      icon: GraduationCap,
      title: "New to Calgary",
      description: "Settlement services, ESL classes, newcomer programs",
      stat: "10 organizations",
      color: "from-cyan-400/25 to-cyan-600/10",
      border: "hover:border-cyan-400/40",
      glow: "hover:shadow-cyan-500/20",
      iconColor: "text-cyan-400",
    },
  ];

  // SPECIALIZED — for specific situations
  const secondaryCategories = [
    { icon: Scale, title: "Tenant Rights", description: "Lease help, rent disputes, eviction rules", color: "text-red-400", bg: "bg-red-400/10" },
    { icon: Users, title: "Family & Kids", description: "Daycare, youth programs, family activities", color: "text-purple-400", bg: "bg-purple-400/10" },
    { icon: Clock, title: "Seniors", description: "Home care, transportation, senior programs", color: "text-blue-400", bg: "bg-blue-400/10" },
    { icon: AlertTriangle, title: "Emergency Help", description: "Crisis lines, shelters, urgent assistance", color: "text-orange-400", bg: "bg-orange-400/10" },
    { icon: Shield, title: "Legal Aid", description: "Free legal advice, immigration, family law", color: "text-violet-400", bg: "bg-violet-400/10" },
  ];

  const aiExamples = [
    "Can my landlord increase rent mid-lease?",
    "Where do I find free ESL classes?",
    "How do I get a family doctor in Calgary?",
    "What housing programs am I eligible for?",
  ];

  const handleExploreDirectly = () => {
    setHasOnboarded(true);
    setCurrentPage("main");
    setActiveTab("home");
  };

  const handleAskAI = () => {
    setHasOnboarded(true);
    setCurrentPage("main");
    setActiveTab("ai");
  };

  const handleGetStarted = () => {
    setCurrentPage("onboarding");
  };

  return (
    <div className="min-h-screen bg-[#07111F] overflow-x-hidden">

      {/* === NAV === */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-5 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#0284c7] flex items-center justify-center shadow-lg shadow-sky-500/30">
                <svg width="28" height="28" viewBox="0 0 64 64" fill="none" className="text-white">
                  <path d="M32 6L26 18H38L32 6Z" fill="currentColor" />
                  <rect x="28" y="18" width="8" height="6" fill="currentColor" />
                  <path d="M24 24H40V28L38 32H26L24 28V24Z" fill="currentColor" />
                  <rect x="27" y="32" width="10" height="6" rx="1" fill="currentColor" />
                  <rect x="29" y="38" width="6" height="18" fill="currentColor" />
                  <ellipse cx="32" cy="58" rx="8" ry="2" fill="currentColor" opacity="0.3" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#FBBF24] border-2 border-[#07111F]" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight">Calgary Connect</span>
              <span className="hidden sm:block text-xs text-[var(--foreground-muted)] leading-none mt-0.5">Your city, simplified</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={handleExploreDirectly}
              className="hidden sm:block px-5 py-2.5 rounded-xl text-sm font-medium text-[var(--foreground-muted)] hover:text-white transition-colors"
            >
              Browse Resources
            </button>
            <button
              onClick={handleGetStarted}
              className="btn-primary px-6 py-3 rounded-xl text-sm"
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </nav>

      {/* === HERO === */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

        {/* Background atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Primary glow — sky blue from top */}
          <motion.div
            animate={{ opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#38BDF8]/20 rounded-full blur-[180px]"
          />
          {/* Warm amber glow — bottom right, city lights */}
          <motion.div
            animate={{ opacity: [0.06, 0.14, 0.06] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-0 right-0 w-[700px] h-[500px] bg-[#FBBF24]/10 rounded-full blur-[160px]"
          />
          {/* Deep blue left accent */}
          <motion.div
            animate={{ opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 6 }}
            className="absolute top-1/3 left-0 w-[500px] h-[400px] bg-[#0284c7]/15 rounded-full blur-[120px]"
          />

          {/* Calgary skyline silhouette — very subtle, low opacity */}
          <div className="absolute bottom-0 left-0 right-0 h-72 opacity-[0.07]">
            <svg viewBox="0 0 1440 288" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
              {/* Bow River */}
              <ellipse cx="720" cy="285" rx="1440" ry="12" fill="#38BDF8" opacity="0.5" />
              {/* Mountains — Rockies backdrop */}
              <path d="M0,288 L0,180 L160,80 L280,140 L420,60 L560,120 L700,40 L840,100 L980,50 L1120,110 L1260,70 L1440,100 L1440,288 Z" fill="#38BDF8" opacity="0.4" />
              {/* Downtown skyline */}
              <path d="M200,288 L200,240 L240,240 L240,200 L260,200 L260,170 L280,170 L280,140 L300,140 L300,100 L320,100 L320,80 L330,60 L340,80 L340,100 L360,100 L360,140 L380,140 L380,170 L400,170 L400,200 L420,200 L420,240 L460,240 L460,210 L490,210 L490,180 L510,180 L510,155 L530,155 L530,130 L550,130 L550,110 L570,110 L570,90 L590,70 L600,55 L610,70 L620,90 L620,110 L640,110 L640,130 L660,130 L660,155 L680,155 L680,180 L700,180 L700,210 L720,210 L720,240 L760,240 L760,200 L790,200 L790,170 L810,170 L810,190 L840,190 L840,240 L880,240 L880,210 L910,210 L910,180 L940,180 L940,200 L970,200 L970,240 L1000,240 L1000,200 L1030,200 L1030,220 L1060,220 L1060,240 L1100,240 L1100,220 L1140,220 L1140,240 L1200,240 L1200,288 L200,288 Z" fill="#e2e8f0" />
              {/* Calgary Tower — prominent */}
              <rect x="596" y="20" width="8" height="6" fill="#38BDF8" />
              <path d="M588,26 L612,26 L614,36 L586,36 Z" fill="#38BDF8" />
              <rect x="592" y="36" width="16" height="55" fill="#e2e8f0" />
            </svg>
          </div>

          {/* Bow River shimmer line */}
          <div className="absolute bottom-16 left-0 right-0 h-px overflow-hidden opacity-30">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400 to-transparent"
            />
          </div>
        </div>

        {/* Hero content — left-heavy asymmetric layout on desktop */}
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16 w-full relative z-10">
          <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-16 xl:gap-24 items-center">

            {/* LEFT: Headline + search */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 mb-10">
                <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                <span className="text-sm font-medium text-[#38BDF8]">Calgary&apos;s civic intelligence platform</span>
              </div>

              {/* Headline — 72px desktop */}
              <h1 className="text-hero mb-8 text-balance">
                Calgary,
                <br />
                <span className="text-gradient-blue">Connected.</span>
              </h1>

              <p className="text-xl lg:text-2xl text-[var(--foreground-muted)] leading-relaxed mb-14 max-w-2xl">
                Housing, jobs, healthcare, newcomer services, legal rights, and community — all verified, all in one place. No more searching dozens of sites.
              </p>

              {/* Hero search bar — 80px height, conversational */}
              <div className="relative mb-8 max-w-2xl">
                <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--foreground-muted)]" />
                <input
                  type="text"
                  placeholder={`"Can my landlord increase rent mid-lease?"`}
                  className="w-full bg-white/6 border border-white/10 rounded-2xl text-lg text-white placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[#38BDF8]/50 focus:bg-white/8 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)] transition-all cursor-pointer"
                  style={{ height: "80px", paddingLeft: "72px", paddingRight: "32px" }}
                  onFocus={handleAskAI}
                  readOnly
                />
              </div>

              {/* Quick example pills */}
              <div className="flex flex-wrap gap-3 mb-14">
                {aiExamples.map((ex) => (
                  <button
                    key={ex}
                    onClick={handleAskAI}
                    className="px-4 py-2.5 rounded-full bg-white/5 border border-white/8 text-sm text-[var(--foreground-muted)] hover:border-white/16 hover:text-white transition-all"
                  >
                    {ex}
                  </button>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleExploreDirectly}
                  className="btn-primary px-10 py-5 rounded-2xl flex items-center gap-3 text-lg font-semibold"
                >
                  Explore Calgary
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAskAI}
                  className="btn-secondary px-10 py-5 rounded-2xl flex items-center gap-3 text-lg font-semibold"
                >
                  <Sparkles className="w-5 h-5 text-[#FBBF24]" />
                  Ask the AI
                </motion.button>
              </div>
            </motion.div>

            {/* RIGHT: Floating intelligence panel — desktop only */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex flex-col gap-4"
            >
              {/* Calgary Pulse Card */}
              <div className="glass rounded-2xl p-6 border border-white/8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/15 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[#38BDF8]" />
                  </div>
                  <span className="text-sm font-semibold text-white">Calgary Pulse</span>
                  <div className="ml-auto flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-emerald-400">Live</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Housing Programs", value: "12 active", color: "text-sky-400" },
                    { label: "Job Openings", value: "340+", color: "text-amber-400" },
                    { label: "Emergency Lines", value: "24/7 open", color: "text-emerald-400" },
                    { label: "Newcomer Services", value: "10 orgs", color: "text-cyan-400" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-sm text-[var(--foreground-muted)]">{item.label}</span>
                      <span className={`text-sm font-semibold ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Life Navigator teaser */}
              <div className="glass rounded-2xl p-6 border border-white/8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#FBBF24]/15 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-[#FBBF24]" />
                  </div>
                  <span className="text-sm font-semibold text-white">Life Navigator</span>
                </div>
                <p className="text-sm text-[var(--foreground-muted)] mb-4">Tell us your situation and get a step-by-step path forward.</p>
                <div className="space-y-2.5">
                  {[
                    "I just moved to Calgary",
                    "I need affordable housing",
                    "I lost my job",
                  ].map((situation) => (
                    <button
                      key={situation}
                      onClick={handleAskAI}
                      className="w-full text-left px-4 py-3 rounded-xl bg-white/4 border border-white/6 text-sm text-[var(--foreground-muted)] hover:border-[#38BDF8]/30 hover:text-white transition-all"
                    >
                      {situation}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hyperlocal card */}
              <div className="glass rounded-2xl p-6 border border-white/8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/15 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-sm font-semibold text-white">Near You</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "Calgary Food Bank", dist: "0.8 km", tag: "Free" },
                    { name: "Centre for Newcomers", dist: "1.2 km", tag: "Free" },
                    { name: "Alpha House", dist: "1.6 km", tag: "24/7" },
                  ].map((place) => (
                    <div key={place.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-white">{place.name}</p>
                        <p className="text-xs text-[var(--foreground-muted)]">{place.dist} away</p>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-400">{place.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/15 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2.5 bg-white/30 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* === SECTION 2: MAINSTREAM CATEGORIES === */}
      {/* These are the 4 most-used categories. Every Calgarian needs at least one. */}
      <section className="section-spacing relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#38BDF8]/3 to-transparent pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16"
          >
            <p className="text-sm font-semibold text-[#38BDF8] uppercase tracking-widest mb-4">Start Here</p>
            <h2 className="text-display max-w-2xl text-balance">
              What most Calgarians need first.
            </h2>
          </motion.div>

          {/* 4-column primary grid — tall cards, 260px minimum height */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            {primaryCategories.map((cat, index) => (
              <motion.button
                key={cat.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExploreDirectly}
                className={`group relative text-left rounded-3xl bg-gradient-to-br ${cat.color} border border-white/8 ${cat.border} p-10 transition-all duration-400 hover:shadow-2xl ${cat.glow} overflow-hidden`}
                style={{ minHeight: "280px" }}
              >
                {/* Hover glow overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-white/8 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                    <cat.icon className={`w-8 h-8 ${cat.iconColor}`} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-white">{cat.title}</h3>
                    <p className="text-[var(--foreground-muted)] leading-relaxed text-base">{cat.description}</p>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <span className={`text-sm font-semibold ${cat.iconColor}`}>{cat.stat}</span>
                    <div className={`w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300`}>
                      <ArrowRight className={`w-4 h-4 ${cat.iconColor}`} />
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* === SECTION 3: AI GUIDE === */}
      <section className="section-spacing">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FBBF24]/10 border border-[#FBBF24]/20 mb-10">
                <Sparkles className="w-4 h-4 text-[#FBBF24]" />
                <span className="text-sm font-medium text-[#FBBF24]">Calgary Bridge AI</span>
              </div>
              <h2 className="text-display mb-8 text-balance">
                Ask Calgary <span className="text-gradient-gold">anything.</span>
              </h2>
              <p className="text-xl text-[var(--foreground-muted)] leading-relaxed mb-12">
                Get specific, step-by-step guidance. Not just links — real answers with real next steps for your situation in Calgary.
              </p>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAskAI}
                className="btn-primary px-10 py-5 rounded-2xl flex items-center gap-3 text-lg font-semibold"
              >
                <Sparkles className="w-5 h-5" />
                Start a Conversation
              </motion.button>
            </motion.div>

            {/* Right: AI chat preview */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="glass rounded-3xl p-8 border border-white/8"
            >
              {/* Fake chat bubble — user */}
              <div className="flex justify-end mb-5">
                <div className="bg-[#38BDF8] text-[#07111F] rounded-2xl rounded-tr-sm px-5 py-4 max-w-xs text-sm font-medium">
                  Can my landlord increase rent without notice?
                </div>
              </div>
              {/* Fake chat bubble — AI */}
              <div className="flex gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#0284c7] flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="glass-card rounded-2xl rounded-tl-sm px-5 py-4 text-sm leading-relaxed border border-white/6 flex-1">
                  <p className="text-white mb-3">In Alberta, landlords must give <strong>3 months written notice</strong> before increasing rent, and increases are limited by the Residential Tenancies Act.</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[var(--foreground-muted)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                      <span>Service Alberta: 1-877-427-4088</span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--foreground-muted)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                      <span>File a dispute via RTDRS online</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Input area */}
              <div
                onClick={handleAskAI}
                className="mt-2 flex items-center gap-3 bg-white/5 border border-white/8 rounded-2xl px-5 py-4 cursor-pointer hover:border-[#38BDF8]/30 transition-colors"
              >
                <Search className="w-5 h-5 text-[var(--foreground-muted)]" />
                <span className="text-sm text-[var(--foreground-muted)]">Ask your question...</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === SECTION 4: SPECIALIZED + HIDDEN GEMS === */}
      {/* Specialized categories — for specific situations */}
      <section className="section-spacing">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mb-14"
          >
            <p className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-widest mb-4">Specialized Support</p>
            <h2 className="text-display text-balance">For your specific situation.</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {secondaryCategories.map((cat, index) => (
              <motion.button
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExploreDirectly}
                className="text-left glass rounded-2xl p-7 border border-white/6 hover:border-white/14 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl ${cat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <cat.icon className={`w-6 h-6 ${cat.color}`} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{cat.title}</h3>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">{cat.description}</p>
              </motion.button>
            ))}
          </div>

          {/* Hidden Gem teaser — "what most people don't know exists" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 glass rounded-2xl p-8 border border-[#FBBF24]/20 bg-[#FBBF24]/3"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#FBBF24]/15 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-[#FBBF24]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#FBBF24] mb-1">Hidden Gems</p>
                  <p className="text-lg font-bold text-white">Programs most Calgarians don&apos;t know exist</p>
                  <p className="text-sm text-[var(--foreground-muted)] mt-1">Free legal clinics, emergency grants, specialty services, lesser-known community programs</p>
                </div>
              </div>
              <button
                onClick={handleExploreDirectly}
                className="flex-shrink-0 btn-primary px-7 py-4 rounded-xl flex items-center gap-2 text-sm font-semibold"
              >
                Discover them <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === SECTION 5: FINAL CTA === */}
      <section className="section-spacing">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl glass border border-white/10 text-center py-24 px-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/10 via-transparent to-[#FBBF24]/5 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#38BDF8]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-display mb-6 text-balance">Ready to discover your Calgary?</h2>
              <p className="text-xl text-[var(--foreground-muted)] mb-12 max-w-xl mx-auto">
                Join thousands of Calgarians who found the help they needed.
              </p>
              <motion.button
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGetStarted}
                className="btn-primary px-14 py-5 rounded-2xl inline-flex items-center gap-3 text-lg font-semibold"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#0284c7] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 64 64" fill="none" className="text-white">
                <path d="M32 6L26 18H38L32 6Z" fill="currentColor" />
                <rect x="28" y="18" width="8" height="6" fill="currentColor" />
                <path d="M24 24H40V28L38 32H26L24 28V24Z" fill="currentColor" />
                <rect x="27" y="32" width="10" height="6" rx="1" fill="currentColor" />
                <rect x="29" y="38" width="6" height="18" fill="currentColor" />
              </svg>
            </div>
            <span className="text-sm text-[var(--foreground-muted)]">Calgary Connect — Built for Calgarians</span>
          </div>
          <p className="text-sm text-[var(--foreground-muted)]">
            Calgary&apos;s civic intelligence platform.
          </p>
        </div>
      </footer>
    </div>
  );
}
