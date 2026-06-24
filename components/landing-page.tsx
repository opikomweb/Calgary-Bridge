"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Compass, Search, Menu, X, ChevronDown,
  Home, Briefcase, Heart, Users, AlertTriangle, Building2, Baby,
  GraduationCap, Bus, Scale, HandHeart, Accessibility, Utensils, Brain, MapPin,
} from "lucide-react";
import Image from "next/image";
import { CalgaryConnectLogo } from "@/components/calgary-connect-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useAppStore } from "@/lib/store";
import { useTranslations, registerStrings } from "@/lib/translation-context";
import { useRef, useState, useEffect } from "react";
import Footer from "@/components/footer";
import type { ResourceCategory } from "@/lib/types";

// Register all landing page strings for translation
registerStrings(
  "Calgary's civic intelligence platform",
  "Everything Calgary. One Place.",
  "Essential services. One place.",
  "Housing, jobs, tenant support, local life, businesses, events, trusted services, and AI guidance—all intelligently connected.",
  "My landlord won't fix the heat...",
  "I need childcare",
  "Jobs hiring this week",
  "Cheap family activities",
  "How do I get a family doctor?",
  "Search",
  "Explore Calgary",
  "Askonnect — Ask me.",
  "Open App",
  // Find Your Path section
  "Find Your Path",
  "What do you need?",
  "Start with your situation. We'll take you straight there.",
  // Pathways
  "Find Housing & Rent Support",
  "Affordable rentals, subsidies & tenant rights",
  "Affordable rentals",
  "Subsidized programs",
  "Tenant help",
  "Looking for Work?",
  "Resume help, hiring companies & job fairs",
  "Resume help",
  "Hiring companies",
  "Job fairs",
  "Get Healthcare Access",
  "Walk-in clinics, family doctors & mental health",
  "Walk-in clinics",
  "Family doctors",
  "Mental health",
  "New to Calgary?",
  "Settlement services, language classes & community",
  "Settlement services",
  "Language classes",
  "Community connections",
  // AI Powered Guidance section
  "AI-Powered Guidance",
  "Ask anything about living in Calgary.",
  "Not just links. Real answers, step-by-step guidance, and resources matched to your specific situation.",
  "Try Askonnect",
  "Can my landlord raise rent mid-lease?",
  "In Alberta, your landlord cannot increase rent during a fixed-term lease unless the lease specifically allows it.",
  "For periodic (month-to-month) tenancies, they must give you at least 3 months written notice.",
  "Ask a follow-up question...",
  // Menu groups
  "Essentials",
  "People & Support",
  "Community & Life",
  // Essentials items
  "Housing & Rent",
  "Rentals, subsidies & tenant help",
  "Jobs & Career",
  "Hiring, resumes & training",
  "Healthcare",
  "Clinics, doctors & coverage",
  "Food Support",
  "Food banks & free meals",
  "Emergency Help",
  "Urgent crisis support",
  // People & Support items
  "Newcomer Services",
  "Settlement & language help",
  "Family & Childcare",
  "Childcare & parenting",
  "Senior Services",
  "Programs for older adults",
  "Mental Health",
  "Counselling & crisis lines",
  "Disability Support",
  "Accessible services",
  // Community & Life items
  "Education",
  "Schools, classes & upgrading",
  "Legal Help",
  "Free legal clinics & rights",
  "Transit",
  "Getting around Calgary",
  "Tourists & Visitors",
  "Sights, hotels, dining & tours",
  "Small Business",
  "Start & grow a business",
  "Volunteering",
  "Give back locally",
);

export default function LandingPage() {
  const { setCurrentPage, setActiveTab, setHasOnboarded, setSearchQuery, setActiveCategory } = useAppStore();
  const tx = useTranslations({
    eyebrow: "Calgary's civic intelligence platform",
    headline: "Everything Calgary. One Place.",
    sublineDesktop: "Housing, jobs, tenant support, local life, businesses, events, trusted services, and AI guidance—all intelligently connected.",
    sublineMobile: "Essential services. One place.",
    placeholder: "My landlord won't fix the heat...",
    query1: "I need childcare",
    query2: "Jobs hiring this week",
    query3: "Cheap family activities",
    query4: "How do I get a family doctor?",
    search: "Search",
    exploreCalgary: "Explore Calgary",
    askonnect: "Askonnect — Ask me.",
    openApp: "Open App",
    // Find Your Path Section
    findYourPath: "Find Your Path",
    whatDoYouNeed: "What do you need?",
    startWithSituation: "Start with your situation. We'll take you straight there.",
    // Pathway titles & descriptions
    housingTitle: "Find Housing & Rent Support",
    housingSub: "Affordable rentals, subsidies & tenant rights",
    housingTag1: "Affordable rentals",
    housingTag2: "Subsidized programs",
    housingTag3: "Tenant help",
    jobsTitle: "Looking for Work?",
    jobsSub: "Resume help, hiring companies & job fairs",
    jobsTag1: "Resume help",
    jobsTag2: "Hiring companies",
    jobsTag3: "Job fairs",
    healthcareTitle: "Get Healthcare Access",
    healthcareSub: "Walk-in clinics, family doctors & mental health",
    healthcareTag1: "Walk-in clinics",
    healthcareTag2: "Family doctors",
    healthcareTag3: "Mental health",
    newcomerTitle: "New to Calgary?",
    newcomerSub: "Settlement services, language classes & community",
    newcomerTag1: "Settlement services",
    newcomerTag2: "Language classes",
    newcomerTag3: "Community connections",
    // AI Section
    aiBadge: "AI-Powered Guidance",
    aiHeadline: "Ask anything about living in Calgary.",
    aiSubheading: "Not just links. Real answers, step-by-step guidance, and resources matched to your specific situation.",
    aiButton: "Try Askonnect",
    aiExample: "Can my landlord raise rent mid-lease?",
    aiResponse1: "In Alberta, your landlord cannot increase rent during a fixed-term lease unless the lease specifically allows it.",
    aiResponse2: "For periodic (month-to-month) tenancies, they must give you at least 3 months written notice.",
    aiPlaceholder: "Ask a follow-up question...",
    // Menu groups
    essentials: "Essentials",
    peopleSupport: "People & Support",
    communityLife: "Community & Life",
  });
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

  // Open Explore pre-filtered to a specific category.
  // "Volunteering" is a curated experience that lives in the Do Good tab —
  // routing it through the Explore category filter would only surface the
  // single tagged resource, so send it straight to Do Good instead.
  const openCategory = (category: ResourceCategory) => {
    setHasOnboarded(true);
    setCurrentPage("main");
    setOpenMenu(null);
    setMobileMenuOpen(false);
    setMobileGroup(null);

    if (category === "volunteering") {
      setSearchQuery("");
      setActiveTab("do-good");
      return;
    }

    setActiveCategory(category);
    setSearchQuery("");
    setActiveTab("explore");
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
        { label: "Tourists & Visitors", category: "tourism", icon: MapPin, desc: "Sights, hotels, dining & tours" },
        { label: "Small Business", category: "business", icon: Building2, desc: "Start & grow a business" },
        { label: "Volunteering", category: "volunteering", icon: HandHeart, desc: "Give back locally" },
      ],
    },
  ];

  // Immersive pathways — solutions first, not organizations
  const pathways: {
    id: ResourceCategory;
    solution: string;
    sub: string;
    preview: string[];
    gradient: string;
    glassColor: string;
    accent: string;
    accentText: string;
  }[] = [
    {
      id: "housing",
      solution: tx.housingTitle,
      sub: tx.housingSub,
      preview: [tx.housingTag1, tx.housingTag2, tx.housingTag3],
      gradient: "linear-gradient(135deg, rgba(14,68,120,0.75) 0%, rgba(12,90,160,0.65) 50%, rgba(14,68,120,0.75) 100%)",
      glassColor: "rgba(56,189,248,0.07)",
      accent: "#38BDF8",
      accentText: "#bae6fd",
    },
    {
      id: "jobs",
      solution: tx.jobsTitle,
      sub: tx.jobsSub,
      preview: [tx.jobsTag1, tx.jobsTag2, tx.jobsTag3],
      gradient: "linear-gradient(135deg, rgba(10,40,80,0.75) 0%, rgba(15,58,112,0.65) 50%, rgba(10,40,80,0.75) 100%)",
      glassColor: "rgba(99,179,237,0.07)",
      accent: "#60A5FA",
      accentText: "#bfdbfe",
    },
    {
      id: "healthcare",
      solution: tx.healthcareTitle,
      sub: tx.healthcareSub,
      preview: [tx.healthcareTag1, tx.healthcareTag2, tx.healthcareTag3],
      gradient: "linear-gradient(135deg, rgba(16,42,86,0.75) 0%, rgba(20,56,110,0.65) 50%, rgba(16,42,86,0.75) 100%)",
      glassColor: "rgba(225,37,27,0.10)",
      accent: "#E1251B",
      accentText: "#fca5a5",
    },
    {
      id: "newcomer",
      solution: tx.newcomerTitle,
      sub: tx.newcomerSub,
      preview: [tx.newcomerTag1, tx.newcomerTag2, tx.newcomerTag3],
      gradient: "linear-gradient(135deg, rgba(10,36,72,0.75) 0%, rgba(14,52,104,0.65) 50%, rgba(10,36,72,0.75) 100%)",
      glassColor: "rgba(56,189,248,0.07)",
      accent: "#38BDF8",
      accentText: "#bae6fd",
    },
  ];

  return (
    <div className="dark min-h-screen bg-[#061528] text-white overflow-x-hidden" style={{ background: "linear-gradient(160deg, #0d2044 0%, #071630 40%, #050e20 100%)" }}>
      {/* ========== GLASSY STICKY HEADER ========== */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0d2044]/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-lg shadow-black/20"
            : "bg-white/5 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b border-white/10 md:border-transparent md:shadow-none shadow-sm shadow-black/10"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo — full transparent brand lockup (white wordmark for the dark hero).
                The artwork already contains the "Calgary Connect" wordmark. */}
            <button
              onClick={() => enterApp("home")}
              aria-label="Calgary Connect — go to home"
              className="flex items-center transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <CalgaryConnectLogo size="lg" darkSurface />
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
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] transition-all ${
                      openMenu === group.label
                        ? "text-white bg-white/[0.12]"
                        : "text-white/90 hover:text-white hover:bg-white/[0.1]"
                    }`}
                  >
                    {group.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${openMenu === group.label ? "rotate-180" : ""}`}
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
                className="flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide text-white/90 hover:text-white hover:bg-white/[0.1] drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] transition-all"
              >
                <Image
                  src="/askonnect-avatar.webp"
                  alt=""
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-full ring-1 ring-white/25 flex-shrink-0"
                />
                  Askonnect
                </button>

                <div className="border-t border-white/[0.05] mt-2 pt-2 flex items-center gap-2">
                  <ThemeToggle className="flex-1" />
                </div>
              </nav>

            {/* CTA + translate + mobile toggle */}
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <button
                onClick={() => enterApp("home")}
                className="hidden sm:flex items-center gap-2 btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold"
              >
                {tx.openApp}
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
              className="md:hidden bg-[#0d2044]/97 backdrop-blur-2xl border-t border-white/[0.06] overflow-hidden"
            >
              <nav className="flex flex-col gap-1 px-4 py-4 max-h-[70vh] overflow-y-auto">
                {menuGroups.map((group) => (
                  <div key={group.label} className="border-b border-white/[0.05] last:border-0 pb-1">
                    <button
                      onClick={() => setMobileGroup((v) => (v === group.label ? null : group.label))}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold uppercase tracking-wide text-white/90 hover:bg-white/[0.05] transition-all"
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
                  className="w-full flex items-center gap-2.5 px-3 py-3 mt-1 rounded-xl text-base font-bold uppercase tracking-wide text-white/90 hover:bg-white/[0.05] transition-all"
                >
                  <Image
                    src="/askonnect-avatar.webp"
                    alt=""
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-full ring-1 ring-white/25 flex-shrink-0"
                  />
                  Askonnect
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    enterApp("home");
                  }}
                  className="mt-2 btn-primary px-5 py-3 rounded-xl text-base font-semibold flex items-center justify-center gap-2"
                >
                  {tx.openApp}
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e4a80] via-[#0f2e5c] to-[#061020]" />

          {/* Real bright daytime Calgary skyline photo */}
          <Image
            src="/calgary-skyline-day.webp"
            alt="Aerial view of downtown Calgary skyline over the Bow River on a clear day"
            fill
            priority
            className="object-cover object-center"
          />

          {/* Readability scrims — keep the photo bright while text stays legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#061020]/50 via-[#061020]/45 to-[#061020]/80" />
          <div className="absolute inset-0 bg-[#061020]/35" />
          {/* Deep blue shadowy overlay for enhanced text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/40 via-transparent to-blue-950/30" />
          {/* Fade base into the dark page below */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#061020]" />
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
              {tx.eyebrow}
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(32px,7vw,80px)] font-bold tracking-[-0.03em] leading-[1.02] mb-6 md:mb-8 text-balance"
          >
            {tx.headline.split(". ")[0]}<span className="text-[#E1251B]"> Calgary</span>.
            <br />
            <span className="text-gradient-blue">{tx.headline.split(". ")[1]}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-sm md:text-xl lg:text-2xl font-medium text-white/90 leading-relaxed max-w-3xl mx-auto mb-10 md:mb-14 text-pretty drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          >
            <span className="hidden md:inline">{tx.sublineDesktop}</span>
            <span className="md:hidden">{tx.sublineMobile}</span>
          </motion.p>

          {/* Functional search */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="max-w-3xl mx-auto mb-6 md:mb-8"
          >
            <div className="relative group">
              <Search className="absolute left-5 md:left-8 top-1/2 -translate-y-1/2 w-5 h-5 md:w-7 md:h-7 text-[#38BDF8] transition-colors pointer-events-none z-10" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchSubmit();
                }}
                placeholder={tx.placeholder}
                aria-label="Search Calgary resources"
                className="w-full h-16 md:h-20 bg-white/[0.16] hover:bg-white/[0.2] focus:bg-white/[0.22] backdrop-blur-xl border border-white/30 hover:border-white/40 focus:border-[#38BDF8]/70 rounded-2xl md:rounded-3xl text-base md:text-xl font-medium text-white placeholder:text-white/70 pl-14 md:pl-20 pr-28 md:pr-32 outline-none transition-all duration-300 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.45)] focus:shadow-[0_0_0_4px_rgba(56,189,248,0.2),0_25px_50px_-12px_rgba(0,0,0,0.6)]"
              />
              <button
                onClick={handleSearchSubmit}
                className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 btn-primary px-4 md:px-6 h-12 md:h-14 rounded-xl md:rounded-2xl flex items-center gap-2 text-sm md:text-base font-semibold"
              >
                <span className="hidden sm:inline">{tx.search}</span>
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
            {[tx.query1, tx.query2, tx.query3, tx.query4].map(
              (q) => (
                <button
                  key={q}
                  onClick={() => {
                    setSearchQuery(q);
                    enterApp("home");
                  }}
                  className="px-4 md:px-5 py-2.5 md:py-3 rounded-full bg-white/[0.1] border border-white/20 text-sm md:text-base font-medium text-white/90 hover:bg-white/[0.18] hover:border-white/30 hover:text-white transition-all duration-300 backdrop-blur-md shadow-sm shadow-black/20"
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
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-2 md:px-0"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleExplore}
              className="btn-primary w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-2xl flex items-center justify-center gap-3 text-base md:text-lg font-semibold"
            >
              {tx.exploreCalgary}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAskAI}
              className="btn-secondary w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-2xl flex items-center justify-center gap-3 text-base md:text-lg font-semibold"
            >
                <Image
                  src="/askonnect-avatar.webp"
                  alt=""
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-full ring-1 ring-white/30 flex-shrink-0"
                />
                {tx.askonnect}
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== IMMERSIVE PATHWAYS — Solutions First ========== */}
      <section className="relative py-14 md:py-20 lg:py-24">
        {/* Subtle blue ambient glow behind the cards */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#1D4ED8]/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-[1100px] mx-auto px-5 md:px-8 relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#38BDF8]/70 mb-4">{tx.findYourPath}</p>
            <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-tight mb-4 text-balance">
              {tx.whatDoYouNeed}
            </h2>
            <p className="text-base md:text-lg text-white/50 max-w-lg mx-auto text-pretty">
              {tx.startWithSituation}
            </p>
          </motion.div>

          {/* Pathway cards — 2-col on md+, 1-col on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {pathways.map((pathway, index) => (
              <motion.button
                key={pathway.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => openCategory(pathway.id)}
                className="group w-full relative overflow-hidden rounded-2xl text-left"
                style={{ minHeight: "148px" }}
              >
                {/* Glass layer base */}
                <div
                  className="absolute inset-0"
                  style={{ background: pathway.gradient }}
                />
                {/* Inner glass shimmer */}
                <div
                  className="absolute inset-0 backdrop-blur-sm"
                  style={{ background: pathway.glassColor }}
                />
                {/* Top-left light refraction */}
                <div className="absolute -top-10 -left-10 w-36 h-36 rounded-full blur-3xl opacity-20"
                  style={{ background: pathway.accent }} />
                {/* Bottom-right depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-black/20" />
                {/* Subtle top border highlight */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <div className="relative z-10 p-6 md:p-7 flex flex-col h-full gap-4">
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white leading-snug text-balance">
                        {pathway.solution}
                      </h3>
                      <p className="text-xs md:text-sm mt-1 leading-relaxed" style={{ color: `${pathway.accentText}99` }}>
                        {pathway.sub}
                      </p>
                    </div>
                    {/* Arrow pill */}
                    <div
                      className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110"
                      style={{ background: `${pathway.accent}22`, border: `1px solid ${pathway.accent}40` }}
                    >
                      <ArrowRight className="w-4 h-4" style={{ color: pathway.accent }} />
                    </div>
                  </div>

                  {/* Tag pills */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {pathway.preview.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-full text-[11px] font-semibold leading-none border"
                        style={{
                          backgroundColor: `${pathway.accent}15`,
                          color: pathway.accentText,
                          borderColor: `${pathway.accent}25`,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ========== AI SECTION — Conversational Preview ========== */}
      <section className="relative py-14 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#38BDF8]/5 to-transparent" />

        <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 mb-6 md:mb-8">
                <Compass className="w-4 h-4 text-[#38BDF8]" />
                <span className="text-sm font-medium text-[#38BDF8]">{tx.aiBadge}</span>
              </div>

              <h2 className="text-[clamp(28px,5vw,48px)] font-bold tracking-tight mb-4 md:mb-6 text-balance">
                {tx.aiHeadline}
              </h2>

              <p className="text-base md:text-xl text-white/60 leading-relaxed mb-8 md:mb-10 text-pretty">
                {tx.aiSubheading}
              </p>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAskAI}
                className="btn-primary px-7 md:px-8 py-4 rounded-2xl flex items-center gap-3 text-base md:text-lg font-semibold"
              >
                <Image
                  src="/askonnect-avatar.webp"
                  alt=""
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-full ring-1 ring-white/30 flex-shrink-0"
                />
                {tx.aiButton}
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
                    <div className="bg-[#38BDF8] text-[#061020] px-5 py-3 rounded-2xl rounded-br-md max-w-[280px] text-sm md:text-[15px] font-medium">
                      {tx.aiExample}
                    </div>
                  </div>

                  <div className="flex gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/20 flex-shrink-0">
                <Image
                  src="/askonnect-avatar.webp"
                  alt="Askonnect"
                  fill
                  className="object-cover"
                />
                    </div>
                    <div className="bg-white/[0.06] px-5 py-4 rounded-2xl rounded-bl-md max-w-[320px]">
                      <p className="text-sm md:text-[15px] text-white/90 leading-relaxed mb-3">
                        {tx.aiResponse1}
                      </p>
                      <p className="text-sm md:text-[15px] text-white/90 leading-relaxed">
                        {tx.aiResponse2}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder={tx.aiPlaceholder}
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
                    <ArrowRight className="w-5 h-5 text-[#061020]" />
                  </button>
                </div>
              </div>

              <div className="absolute -inset-4 bg-gradient-to-r from-[#38BDF8]/20 via-transparent to-[#0284c7]/10 rounded-3xl blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER CTA ========== */}
      <section className="relative py-14 md:py-20">
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
