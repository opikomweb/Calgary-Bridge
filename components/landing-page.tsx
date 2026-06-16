"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Sparkles, Smile, Search, Menu, X, ChevronDown,
  Home, Briefcase, Heart, Users, AlertTriangle, Building2, Baby,
  GraduationCap, Bus, Scale, HandHeart, Accessibility, Utensils, Brain,
} from "lucide-react";
import Image from "next/image";
import { RotatingLogo } from "@/components/rotating-logo";
import { useAppStore } from "@/lib/store";
import { useRef, useState, useEffect } from "react";
import Footer from "@/components/footer";
import type { ResourceCategory } from "@/lib/types";

export default function LandingPage() {
  const { setCurrentPage, setActiveTab, setHasOnboarded, setSearchQuery, setActiveCategory } = useAppStore();
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const enterApp = (tab: "home" | "ai" | "explore" | "do-good") => {
    setHasOnboarded(true);
    setCurrentPage("main");
    setActiveTab(tab);
  };

  // Open Explore pre-filtered to a specific category
  const openCategory = (category: ResourceCategory) => {
    setHasOnboarded(true);
    setCurrentPage("main");
    setActiveCategory(category);
    setSearchQuery("");
    setActiveTab("explore");
    setOpenMenu(null);
    setMobileMenuOpen(false);
    setMobileGroup(null);
  };

  const handleExplore = () => enterApp("explore");
  const handleAskAI = () => enterApp("ai");

  const handleSearchSubmit = () => {
    setHasOnboarded(true);
    setCurrentPage("main");
    if (query.trim()) {
      setSearchQuery(query.trim());
      setActiveTab("home");
    } else {
      setActiveTab("ai");
    }
  };

  // Professional grouped mega-menu — surfaces all searchable categories
  const menuGroups: {
    label: string;
    items: { label: string; category: ResourceCategory; icon: React.ElementType; desc: string }[];
  }[] = [
    {
      label: "Essentials",
      items: [
        { label: "Housing & Rent", category: "housing", icon: Home, desc: "Rentals, subsidies & tenant help" },
        { label: "Jobs & Career", category: "jobs", icon: Briefcase, desc: "Hiring, resumes & training" },
        { label: "Healthcare", category: "healthcare", icon: Heart, desc: "Clinics, doctors & coverage" },
        { label: "Food Support", category: "food", icon: Utensils, desc: "Food banks & free meals" },
        { label: "Emergency Help", category: "emergency", icon: AlertTriangle, desc: "Urgent crisis support" },
      ],
    },
    {
      label: "People & Support",
      items: [
        { label: "Newcomer Services", category: "newcomer", icon: Users, desc: "Settlement & language help" },
        { label: "Family & Childcare", category: "family", icon: Baby, desc: "Childcare & parenting" },
        { label: "Senior Services", category: "senior", icon: Users, desc: "Programs for older adults" },
        { label: "Mental Health", category: "mental-health", icon: Brain, desc: "Counselling & crisis lines" },
        { label: "Disability Support", category: "disability", icon: Accessibility, desc: "Accessible services" },
      ],
    },
    {
      label: "Community & Life",
      items: [
        { label: "Education", category: "education", icon: GraduationCap, desc: "Schools, classes & upgrading" },
        { label: "Legal Help", category: "legal", icon: Scale, desc: "Free legal clinics & rights" },
        { label: "Transit", category: "transit", icon: Bus, desc: "Getting around Calgary" },
        { label: "Small Business", category: "business", icon: Building2, desc: "Start & grow a business" },
        { label: "Volunteering", category: "volunteering", icon: HandHeart, desc: "Give back locally" },
      ],
    },
  ];

  // Immersive pathways — solutions first, not organizations
  const pathways = [
    {
      id: "housing",
      solution: "Find Housing & Rent Support",
      preview: ["Affordable rentals", "Subsidized programs", "Tenant help"],
      image: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #075985 100%)",
      accent: "#38BDF8",
    },
    {
      id: "jobs",
      solution: "Looking for Work?",
      preview: ["Resume help", "Hiring companies", "Job fairs"],
      image: "linear-gradient(135deg, #78350f 0%, #b45309 50%, #92400e 100%)",
      accent: "#FBBF24",
    },
    {
      id: "health",
      solution: "Get Healthcare Access",
      preview: ["Walk-in clinics", "Family doctors", "Mental health"],
      image: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #065f46 100%)",
      accent: "#34D399",
    },
    {
      id: "newcomer",
      solution: "New to Calgary?",
      preview: ["Settlement services", "Language classes", "Community connections"],
      image: "linear-gradient(135deg, #164e63 0%, #0891b2 50%, #155e75 100%)",
      accent: "#22D3EE",
    },
  ];

  return (
    <div className="dark min-h-screen bg-[#07111F] text-white overflow-x-hidden">
      {/* ========== GLASSY STICKY HEADER ========== */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#07111F]/70 backdrop-blur-2xl border-b border-white/[0.08] shadow-lg shadow-black/20"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button onClick={() => enterApp("home")} className="flex items-center gap-3 transition-transform duration-300 hover:scale-105 active:scale-95">
              <div className="relative w-11 h-11 md:w-14 md:h-14 flex-shrink-0">
                <RotatingLogo imgPadding="p-0" priority />
              </div>
              <span className="text-base md:text-lg font-bold tracking-tight">
                <span className="text-white">Calgary </span>
                <span className="text-[#38BDF8]">Konnect</span>
              </span>
            </button>

            {/* Desktop nav — professional grouped dropdowns */}
            <nav className="hidden md:flex items-center gap-1" onMouseLeave={() => setOpenMenu(null)}>
              {menuGroups.map((group) => (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(group.label)}
                >
                  <button
                    onClick={() => setOpenMenu((v) => (v === group.label ? null : group.label))}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      openMenu === group.label
                        ? "text-white bg-white/[0.08]"
                        : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    {group.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${openMenu === group.label ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {openMenu === group.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[340px]"
                      >
                        <div className="bg-[#0a1628]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 p-2 overflow-hidden">
                          {group.items.map((item) => (
                            <button
                              key={item.category}
                              onClick={() => openCategory(item.category)}
                              className="w-full flex items-start gap-3 p-3 rounded-xl text-left hover:bg-white/[0.05] transition-colors group/item"
                            >
                              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/15 flex items-center justify-center group-hover/item:bg-[#38BDF8]/20 transition-colors">
                                <item.icon className="w-4 h-4 text-[#38BDF8]" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-white leading-tight">{item.label}</p>
                                <p className="text-xs text-white/45 mt-0.5 leading-snug">{item.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <button
                onClick={handleAskAI}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                <Smile className="w-3.5 h-3.5 text-[#FBBF24]" />
                iKonnect Guide
              </button>

              <button
                onClick={() => enterApp("do-good")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                <HandHeart className="w-3.5 h-3.5 text-[#EF4444]" />
                Do Good
              </button>
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => enterApp("home")}
                className="hidden sm:flex items-center gap-2 btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold"
              >
                Open App
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown — grouped accordions */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#07111F]/97 backdrop-blur-2xl border-t border-white/[0.06] overflow-hidden"
            >
              <nav className="flex flex-col gap-1 px-4 py-4 max-h-[70vh] overflow-y-auto">
                {menuGroups.map((group) => (
                  <div key={group.label} className="border-b border-white/[0.05] last:border-0 pb-1">
                    <button
                      onClick={() => setMobileGroup((v) => (v === group.label ? null : group.label))}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-white/85 hover:bg-white/[0.05] transition-all"
                    >
                      {group.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${mobileGroup === group.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileGroup === group.label && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-0.5 pb-2">
                            {group.items.map((item) => (
                              <button
                                key={item.category}
                                onClick={() => openCategory(item.category)}
                                className="w-full flex items-center gap-3 pl-4 pr-4 py-2.5 rounded-xl text-left hover:bg-white/[0.05] transition-colors"
                              >
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/15 flex items-center justify-center">
                                  <item.icon className="w-4 h-4 text-[#38BDF8]" />
                                </div>
                                <span className="text-sm font-medium text-white/75">{item.label}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleAskAI();
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 mt-1 rounded-xl text-base font-medium text-white/75 hover:bg-white/[0.05] transition-all"
                >
                  <Smile className="w-4 h-4 text-[#FBBF24]" />
                  iKonnect Guide
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    enterApp("home");
                  }}
                  className="mt-2 btn-primary px-5 py-3 rounded-xl text-base font-semibold flex items-center justify-center gap-2"
                >
                  Open App
                  <ArrowRight className="w-4 h-4" />
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ========== HERO — IMMERSIVE CALGARY ========== */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16 md:pt-20"
      >
        {/* Authentic Calgary daytime skyline background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Base sky gradient (matches the photo's blue sky) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1b3a5c] via-[#0f2742] to-[#07111F]" />

          {/* Real bright daytime Calgary skyline photo */}
          <Image
            src="/calgary-skyline-day.png"
            alt="Aerial view of downtown Calgary skyline over the Bow River on a clear day"
            fill
            priority
            className="object-cover object-center"
          />

          {/* Readability scrims — keep the photo bright while text stays legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#07111F]/35 via-[#07111F]/30 to-[#07111F]/75" />
          <div className="absolute inset-0 bg-[#07111F]/25" />
          {/* Fade base into the dark page below */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#07111F]" />
        </div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 max-w-[1100px] mx-auto px-5 md:px-8 text-center py-16 md:py-20"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-white/5 border border-white/10 mb-8 md:mb-10"
          >
            <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-[#38BDF8]">
              Calgary&apos;s civic intelligence platform
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(40px,9vw,80px)] font-bold tracking-[-0.03em] leading-[1.02] mb-6 md:mb-8 text-balance"
          >
            Everything Calgary.
            <br />
            <span className="text-gradient-blue">One Place.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-base md:text-xl lg:text-2xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-10 md:mb-14 text-pretty"
          >
            Housing, jobs, tenant support, local life, businesses, events, trusted services, and AI guidance—all intelligently connected.
          </motion.p>

          {/* Functional search */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="max-w-3xl mx-auto mb-6 md:mb-8"
          >
            <div className="relative group">
              <Search className="absolute left-5 md:left-8 top-1/2 -translate-y-1/2 w-5 h-5 md:w-7 md:h-7 text-white/50 group-focus-within:text-[#38BDF8] transition-colors pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchSubmit();
                }}
                placeholder="My landlord won't fix the heat..."
                aria-label="Search Calgary resources"
                className="w-full h-16 md:h-20 bg-white/[0.06] hover:bg-white/[0.08] border border-white/10 hover:border-white/15 focus:border-[#38BDF8]/50 focus:bg-white/[0.08] rounded-2xl md:rounded-3xl text-base md:text-xl text-white placeholder:text-white/40 pl-14 md:pl-20 pr-28 md:pr-32 outline-none transition-all duration-300 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12),0_25px_50px_-12px_rgba(0,0,0,0.5)]"
              />
              <button
                onClick={handleSearchSubmit}
                className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 btn-primary px-4 md:px-6 h-12 md:h-14 rounded-xl md:rounded-2xl flex items-center gap-2 text-sm md:text-base font-semibold"
              >
                <span className="hidden sm:inline">Search</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </motion.div>

          {/* Example queries */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14"
          >
            {["I need childcare", "Jobs hiring this week", "Cheap family activities", "How do I get a family doctor?"].map(
              (q) => (
                <button
                  key={q}
                  onClick={() => {
                    setSearchQuery(q);
                    enterApp("home");
                  }}
                  className="px-4 md:px-5 py-2 md:py-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs md:text-sm text-white/60 hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-white transition-all duration-300"
                >
                  {q}
                </button>
              )
            )}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleExplore}
              className="btn-primary w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-2xl flex items-center justify-center gap-3 text-base md:text-lg font-semibold"
            >
              Explore Calgary
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAskAI}
              className="btn-secondary w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-2xl flex items-center justify-center gap-3 text-base md:text-lg font-semibold"
            >
                <Smile className="w-5 h-5 text-[#FBBF24]" />
                Ask the iKonnect Guide
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-6 h-12 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 bg-white/40 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== IMMERSIVE PATHWAYS — Solutions First ========== */}
      <section className="relative py-20 md:py-32 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-tight mb-4 md:mb-6 text-balance">
              What do you need?
            </h2>
            <p className="text-base md:text-xl text-white/60 max-w-2xl mx-auto text-pretty">
              Start with your situation. We&apos;ll show you the path forward.
            </p>
          </motion.div>

          {/* Pathway cards */}
          <div className="space-y-5 md:space-y-8">
            {pathways.map((pathway, index) => (
              <motion.button
                key={pathway.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.01, y: -4 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleExplore}
                className="group w-full relative overflow-hidden rounded-2xl md:rounded-3xl text-left"
                style={{ minHeight: "150px" }}
              >
                <div
                  className="absolute inset-0 transition-all duration-500 group-hover:scale-105"
                  style={{ background: pathway.image }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                <div className="relative z-10 p-7 md:p-10 flex flex-col md:flex-row md:items-center justify-between h-full gap-6">
                  <div className="space-y-4 md:space-y-5">
                    <h3 className="text-2xl md:text-4xl font-bold text-white leading-[1.15] text-balance">
                      {pathway.solution}
                    </h3>
                    <div className="flex flex-wrap gap-2 md:gap-2.5">
                      {pathway.preview.map((item) => (
                        <span
                          key={item}
                          className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium leading-none"
                          style={{ backgroundColor: `${pathway.accent}20`, color: pathway.accent }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors flex-shrink-0">
                    <span className="text-base md:text-lg font-medium">Explore</span>
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ========== AI SECTION — Conversational Preview ========== */}
      <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#38BDF8]/5 to-transparent" />

        <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FBBF24]/10 border border-[#FBBF24]/20 mb-6 md:mb-8">
                <Sparkles className="w-4 h-4 text-[#FBBF24]" />
                <span className="text-sm font-medium text-[#FBBF24]">AI-Powered Guidance</span>
              </div>

              <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-tight mb-4 md:mb-6 text-balance">
                Ask anything about living in Calgary.
              </h2>

              <p className="text-base md:text-xl text-white/60 leading-relaxed mb-8 md:mb-10 text-pretty">
                Not just links. Real answers, step-by-step guidance, and resources matched to your specific situation.
              </p>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAskAI}
                className="btn-primary px-7 md:px-8 py-4 rounded-2xl flex items-center gap-3 text-base md:text-lg font-semibold"
              >
                <Smile className="w-5 h-5" />
                Try the iKonnect Guide
              </motion.button>
            </motion.div>

            {/* Right — chat preview */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass rounded-3xl p-6 md:p-8 border border-white/10">
                <div className="space-y-5 md:space-y-6 mb-6 md:mb-8">
                  <div className="flex justify-end">
                    <div className="bg-[#38BDF8] text-[#07111F] px-5 py-3 rounded-2xl rounded-br-md max-w-[280px] text-sm md:text-[15px] font-medium">
                      Can my landlord raise rent mid-lease?
                    </div>
                  </div>

                  <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#38BDF8] to-[#0284c7] flex-shrink-0 flex items-center justify-center">
                <Smile className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/[0.06] px-5 py-4 rounded-2xl rounded-bl-md max-w-[320px]">
                      <p className="text-sm md:text-[15px] text-white/90 leading-relaxed mb-3">
                        In Alberta, your landlord cannot increase rent during a fixed-term lease unless the lease specifically allows it.
                      </p>
                      <p className="text-sm md:text-[15px] text-white/90 leading-relaxed">
                        For periodic (month-to-month) tenancies, they must give you at least 3 months written notice.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask a follow-up question..."
                    aria-label="Ask the AI a follow-up question"
                    className="w-full h-14 bg-white/[0.04] border border-white/10 rounded-xl text-sm md:text-[15px] text-white placeholder:text-white/40 pl-5 pr-14 outline-none"
                    onClick={handleAskAI}
                    readOnly
                  />
                  <button
                    onClick={handleAskAI}
                    aria-label="Send"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-[#38BDF8] flex items-center justify-center"
                  >
                    <ArrowRight className="w-5 h-5 text-[#07111F]" />
                  </button>
                </div>
              </div>

              <div className="absolute -inset-4 bg-gradient-to-r from-[#38BDF8]/20 via-transparent to-[#FBBF24]/10 rounded-3xl blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER CTA ========== */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-[900px] mx-auto px-5 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-tight mb-4 md:mb-6 text-balance">
              Calgary, finally connected.
            </h2>
            <p className="text-base md:text-xl text-white/60 mb-8 md:mb-12 max-w-xl mx-auto text-pretty">
              Join thousands of Calgarians who have found the help they need.
            </p>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleExplore}
              className="btn-primary px-10 md:px-12 py-4 md:py-5 rounded-2xl flex items-center gap-3 text-base md:text-lg font-semibold mx-auto"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ========== GLOBAL FOOTER — About, Privacy, Legal ========== */}
      <Footer
        onOpenSubmitBusiness={() => enterApp("explore")}
        onOpenGetFeatured={() => enterApp("explore")}
      />
    </div>
  );
}
