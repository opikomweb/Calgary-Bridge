"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Search } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useRef } from "react";

export default function LandingPage() {
  const { setCurrentPage, setActiveTab, setHasOnboarded } = useAppStore();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const handleExplore = () => {
    setHasOnboarded(true);
    setCurrentPage("main");
    setActiveTab("home");
  };

  const handleAskAI = () => {
    setHasOnboarded(true);
    setCurrentPage("main");
    setActiveTab("ai");
  };

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
    <div className="min-h-screen bg-[#07111F] overflow-x-hidden">

      {/* ========== HERO — 90vh IMMERSIVE ========== */}
      <section 
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        {/* Animated Calgary environment */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          
          {/* Sky gradient — deep blue to warm horizon */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#07111F] to-[#0d1a2d]" />
          
          {/* Aurora / northern lights effect */}
          <motion.div
            animate={{ 
              opacity: [0.15, 0.25, 0.15],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/4 w-[800px] h-[400px] bg-gradient-to-r from-[#38BDF8]/20 via-[#06b6d4]/15 to-transparent rounded-full blur-[120px] -rotate-12"
          />
          
          {/* Warm city glow — bottom */}
          <motion.div
            animate={{ opacity: [0.1, 0.18, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[300px] bg-gradient-to-t from-[#FBBF24]/8 via-[#f97316]/5 to-transparent blur-[100px]"
          />
          
          {/* Mountain silhouettes — Rockies backdrop */}
          <div className="absolute bottom-0 left-0 right-0 h-[35vh]">
            <svg viewBox="0 0 1440 400" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
              {/* Far mountains — very subtle */}
              <path 
                d="M0,400 L0,280 L120,200 L240,260 L360,180 L480,240 L600,140 L720,200 L840,120 L960,180 L1080,140 L1200,190 L1320,150 L1440,180 L1440,400 Z" 
                fill="#1e293b" 
                opacity="0.4"
              />
              {/* Mid mountains */}
              <path 
                d="M0,400 L0,320 L180,240 L300,290 L450,200 L600,260 L720,180 L840,230 L960,170 L1100,220 L1260,180 L1440,240 L1440,400 Z" 
                fill="#0f172a" 
                opacity="0.7"
              />
            </svg>
          </div>
          
          {/* Downtown Calgary skyline */}
          <div className="absolute bottom-0 left-0 right-0 h-[28vh]">
            <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
              {/* Building silhouettes */}
              <g fill="#0f172a" opacity="0.9">
                {/* Left buildings */}
                <rect x="80" y="240" width="60" height="80" />
                <rect x="160" y="200" width="50" height="120" />
                <rect x="230" y="220" width="70" height="100" />
                <rect x="320" y="180" width="55" height="140" />
                
                {/* Center — Calgary Tower area */}
                <rect x="450" y="160" width="40" height="160" />
                <rect x="510" y="140" width="60" height="180" />
                <rect x="590" y="120" width="50" height="200" />
                
                {/* Calgary Tower */}
                <g>
                  <rect x="680" y="80" width="16" height="240" fill="#1e293b" />
                  <ellipse cx="688" cy="65" rx="20" ry="12" fill="#1e293b" />
                  <ellipse cx="688" cy="65" rx="14" ry="8" fill="#38BDF8" opacity="0.6" />
                </g>
                
                <rect x="720" y="130" width="55" height="190" />
                <rect x="800" y="150" width="65" height="170" />
                <rect x="890" y="170" width="50" height="150" />
                <rect x="960" y="190" width="70" height="130" />
                <rect x="1050" y="210" width="55" height="110" />
                <rect x="1130" y="230" width="60" height="90" />
                <rect x="1210" y="250" width="50" height="70" />
                <rect x="1280" y="260" width="70" height="60" />
              </g>
              
              {/* Building windows — sparse warm lights */}
              <g fill="#FBBF24" opacity="0.4">
                <rect x="95" y="260" width="4" height="4" />
                <rect x="110" y="280" width="4" height="4" />
                <rect x="180" y="220" width="4" height="4" />
                <rect x="175" y="250" width="4" height="4" />
                <rect x="250" y="240" width="4" height="4" />
                <rect x="340" y="200" width="4" height="4" />
                <rect x="530" y="160" width="4" height="4" />
                <rect x="540" y="200" width="4" height="4" />
                <rect x="610" y="150" width="4" height="4" />
                <rect x="740" y="160" width="4" height="4" />
                <rect x="830" y="180" width="4" height="4" />
                <rect x="905" y="200" width="4" height="4" />
                <rect x="990" y="220" width="4" height="4" />
              </g>
              
              {/* Bow River */}
              <ellipse cx="720" cy="320" rx="1440" ry="15" fill="#38BDF8" opacity="0.15" />
            </svg>
          </div>
          
          {/* River shimmer animation */}
          <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#38BDF8]/30 to-transparent"
            />
          </div>
          
          {/* Stars */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 40}%`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero content */}
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 max-w-[1200px] mx-auto px-8 text-center"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-10"
          >
            <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
            <span className="text-sm font-medium text-[#38BDF8]">Calgary&apos;s civic intelligence platform</span>
          </motion.div>

          {/* Main headline — 72px, centered */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(48px,10vw,80px)] font-bold tracking-[-0.03em] leading-[1.02] mb-8"
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
            className="text-xl md:text-2xl text-[var(--foreground-muted)] leading-relaxed max-w-3xl mx-auto mb-14"
          >
            Housing, jobs, tenant support, local life, businesses, events, trusted services, and AI guidance—all intelligently connected.
          </motion.p>

          {/* Giant search — Apple Spotlight style, 80px */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <div className="relative group">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-7 h-7 text-[var(--foreground-muted)] group-focus-within:text-[#38BDF8] transition-colors" />
              <input
                type="text"
                placeholder="My landlord won't fix the heat..."
                className="w-full h-20 bg-white/[0.06] hover:bg-white/[0.08] border border-white/10 hover:border-white/15 focus:border-[#38BDF8]/50 focus:bg-white/[0.08] rounded-3xl text-xl text-white placeholder:text-[var(--foreground-muted)]/70 pl-20 pr-8 outline-none transition-all duration-300 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12),0_25px_50px_-12px_rgba(0,0,0,0.5)]"
                onFocus={handleAskAI}
                readOnly
              />
            </div>
          </motion.div>

          {/* Example queries */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            {[
              "I need childcare",
              "Jobs hiring this week",
              "Cheap family activities",
              "How do I get a family doctor?"
            ].map((query) => (
              <button
                key={query}
                onClick={handleAskAI}
                className="px-5 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-[var(--foreground-muted)] hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-white transition-all duration-300"
              >
                {query}
              </button>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleExplore}
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
              Ask the AI Guide
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
      <section className="relative py-32 md:py-40">
        <div className="max-w-[1400px] mx-auto px-8">
          
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold tracking-tight mb-6">
              What do you need?
            </h2>
            <p className="text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto">
              Start with your situation. We&apos;ll show you the path forward.
            </p>
          </motion.div>

          {/* Pathway cards — large horizontal premium experiences */}
          <div className="space-y-8">
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
                className="group w-full relative overflow-hidden rounded-3xl text-left"
                style={{ minHeight: "200px" }}
              >
                {/* Background gradient */}
                <div 
                  className="absolute inset-0 transition-all duration-500 group-hover:scale-105"
                  style={{ background: pathway.image }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                
                {/* Content */}
                <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between h-full">
                  <div className="mb-6 md:mb-0">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      {pathway.solution}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {pathway.preview.map((item) => (
                        <span 
                          key={item}
                          className="px-4 py-2 rounded-full text-sm font-medium"
                          style={{ 
                            backgroundColor: `${pathway.accent}20`,
                            color: pathway.accent,
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-white/80 group-hover:text-white transition-colors">
                    <span className="text-lg font-medium">Explore</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ========== AI SECTION — Conversational Preview ========== */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#38BDF8]/5 to-transparent" />
        
        <div className="max-w-[1200px] mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FBBF24]/10 border border-[#FBBF24]/20 mb-8">
                <Sparkles className="w-4 h-4 text-[#FBBF24]" />
                <span className="text-sm font-medium text-[#FBBF24]">AI-Powered Guidance</span>
              </div>
              
              <h2 className="text-[clamp(32px,5vw,48px)] font-bold tracking-tight mb-6">
                Ask anything about living in Calgary.
              </h2>
              
              <p className="text-xl text-[var(--foreground-muted)] leading-relaxed mb-10">
                Not just links. Real answers, step-by-step guidance, and resources matched to your specific situation.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAskAI}
                className="btn-primary px-8 py-4 rounded-2xl flex items-center gap-3 text-lg font-semibold"
              >
                <Sparkles className="w-5 h-5" />
                Try the AI Guide
              </motion.button>
            </motion.div>
            
            {/* Right — chat preview */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass rounded-3xl p-8 border border-white/10">
                {/* Chat messages */}
                <div className="space-y-6 mb-8">
                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="bg-[#38BDF8] text-[#07111F] px-5 py-3 rounded-2xl rounded-br-md max-w-[280px] text-[15px] font-medium">
                      Can my landlord raise rent mid-lease?
                    </div>
                  </div>
                  
                  {/* AI response */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#38BDF8] to-[#0284c7] flex-shrink-0 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/[0.06] px-5 py-4 rounded-2xl rounded-bl-md max-w-[320px]">
                      <p className="text-[15px] text-white/90 leading-relaxed mb-3">
                        In Alberta, your landlord cannot increase rent during a fixed-term lease unless the lease specifically allows it.
                      </p>
                      <p className="text-[15px] text-white/90 leading-relaxed">
                        For periodic (month-to-month) tenancies, they must give you at least 3 months written notice.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Input preview */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask a follow-up question..."
                    className="w-full h-14 bg-white/[0.04] border border-white/10 rounded-xl text-[15px] text-white placeholder:text-white/40 pl-5 pr-14 outline-none"
                    onClick={handleAskAI}
                    readOnly
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-[#38BDF8] flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-[#07111F]" />
                  </button>
                </div>
              </div>
              
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#38BDF8]/20 via-transparent to-[#FBBF24]/10 rounded-3xl blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER CTA ========== */}
      <section className="relative py-32 md:py-40">
        <div className="max-w-[900px] mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold tracking-tight mb-6">
              Calgary, finally connected.
            </h2>
            <p className="text-xl text-[var(--foreground-muted)] mb-12 max-w-xl mx-auto">
              Join thousands of Calgarians who have found the help they need.
            </p>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleExplore}
              className="btn-primary px-12 py-5 rounded-2xl flex items-center gap-3 text-lg font-semibold mx-auto"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
