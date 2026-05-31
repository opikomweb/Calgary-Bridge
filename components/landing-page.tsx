"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Home, Briefcase, Heart, Users, GraduationCap, Clock, AlertTriangle, ShoppingBag, Scale, Search } from "lucide-react";
import { useAppStore } from "@/lib/store";

export default function LandingPage() {
  const { setCurrentPage, setActiveTab, setHasOnboarded } = useAppStore();

  const quickActions = [
    { icon: Home, title: "Housing & Rent", description: "Find affordable housing, rental assistance, tenant support", color: "glow-blue", iconBg: "from-sky-400/20 to-sky-500/10" },
    { icon: Scale, title: "Tenant Rights", subtitle: "RentShield", description: "Know your rights, rent increase rules, lease help", color: "glow-red", iconBg: "from-red-400/20 to-red-500/10" },
    { icon: Briefcase, title: "Jobs & Career", description: "Job search, career training, employment programs", color: "glow-gold", iconBg: "from-amber-400/20 to-amber-500/10" },
    { icon: GraduationCap, title: "New to Calgary", description: "Settlement services, language classes, newcomer resources", color: "glow-cyan", iconBg: "from-cyan-400/20 to-cyan-500/10" },
    { icon: Heart, title: "Health & Wellness", description: "Healthcare, mental health, counseling services", color: "glow-green", iconBg: "from-emerald-400/20 to-emerald-500/10" },
    { icon: Clock, title: "Seniors & Access", description: "Senior programs, accessibility support, home care", color: "glow-purple", iconBg: "from-purple-400/20 to-purple-500/10" },
    { icon: AlertTriangle, title: "Emergency Help", description: "Crisis contacts, shelters, urgent assistance", color: "glow-red", iconBg: "from-red-500/20 to-red-600/10" },
    { icon: Users, title: "Community & Social", description: "Events, volunteering, community programs", color: "glow-blue", iconBg: "from-blue-400/20 to-blue-500/10" },
    { icon: ShoppingBag, title: "Local Business", description: "Support local, deals, Calgary businesses", color: "glow-gold", iconBg: "from-amber-400/20 to-amber-500/10" },
  ];

  const aiExamples = [
    "Can my landlord legally increase rent?",
    "I moved here 6 months ago. What support exists?",
    "How do I access healthcare?",
    "What can help me pay rent?",
  ];

  const handleGetStarted = () => {
    setCurrentPage("onboarding");
  };

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

  return (
    <div className="min-h-screen bg-hero">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            {/* Premium Logo - Iconic Calgary Tower */}
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#38BDF8] to-[#0284c7] flex items-center justify-center shadow-xl shadow-sky-500/30">
                <svg width="32" height="32" viewBox="0 0 64 64" fill="none" className="text-white">
                  {/* Calgary Tower - Iconic silhouette with observation deck */}
                  <path d="M32 6L26 18H38L32 6Z" fill="currentColor" />
                  <rect x="28" y="18" width="8" height="6" fill="currentColor" />
                  <path d="M24 24H40V28L38 32H26L24 28V24Z" fill="currentColor" />
                  <rect x="27" y="32" width="10" height="6" rx="1" fill="currentColor" />
                  <rect x="29" y="38" width="6" height="18" fill="currentColor" />
                  <ellipse cx="32" cy="58" rx="8" ry="2" fill="currentColor" opacity="0.4" />
                  {/* Observation deck windows */}
                  <rect x="26" y="25" width="2" height="2" rx="0.5" fill="#07111F" opacity="0.5" />
                  <rect x="30" y="25" width="2" height="2" rx="0.5" fill="#07111F" opacity="0.5" />
                  <rect x="34" y="25" width="2" height="2" rx="0.5" fill="#07111F" opacity="0.5" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#FBBF24] border-2 border-[#07111F]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight">Calgary Connect</span>
              <span className="hidden sm:block text-sm text-[var(--foreground-muted)] mt-1">Your city, simplified</span>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGetStarted}
            className="btn-primary px-8 py-4 rounded-full text-lg"
          >
            Get Started
          </motion.button>
        </div>
      </nav>

      {/* SECTION 1: Premium Hero - Full viewport */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
        {/* Animated background - Calgary identity */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Calgary skyline silhouette with mountains */}
          <div className="absolute bottom-0 left-0 right-0 h-80 opacity-15">
            <svg viewBox="0 0 1440 400" className="w-full h-full fill-current text-sky-400/40 skyline-element" preserveAspectRatio="xMidYMax slice">
              {/* Mountains in background */}
              <path d="M0,400 L0,250 L200,100 L350,180 L500,80 L650,150 L800,50 L950,130 L1100,60 L1250,140 L1440,90 L1440,400 Z" opacity="0.3" />
              {/* Downtown skyline */}
              <path d="M0,400 L0,320 L80,320 L80,280 L120,280 L120,260 L160,260 L160,220 L200,220 L200,180 L240,180 L240,140 L280,140 L280,100 L320,100 L320,140 L360,140 L360,180 L400,180 L400,160 L440,160 L440,200 L480,200 L480,240 L520,240 L520,200 L560,200 L560,160 L600,160 L600,120 L640,120 L640,80 L680,60 L720,80 L720,120 L760,120 L760,160 L800,160 L800,200 L840,200 L840,240 L880,240 L880,280 L920,280 L920,240 L960,240 L960,200 L1000,200 L1000,160 L1040,160 L1040,200 L1080,200 L1080,240 L1120,240 L1120,280 L1160,280 L1160,320 L1200,320 L1200,280 L1240,280 L1240,320 L1280,320 L1280,300 L1320,300 L1320,320 L1360,320 L1360,340 L1400,340 L1400,320 L1440,320 L1440,400 Z" />
            </svg>
          </div>
          
          {/* Floating gradient orbs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#38BDF8]/15 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#FBBF24]/10 rounded-full blur-[130px]"
          />
          
          {/* Bow River shimmer */}
          <div className="absolute bottom-40 left-0 right-0 h-1 overflow-hidden">
            <div className="river-flow w-full h-full bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-8 lg:px-16 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Hero headline - 56-72px with generous line height */}
            <h1 className="text-hero mb-10">
              Everything Calgary.
              <br />
              <span className="text-gradient-blue">One Place.</span>
            </h1>

            {/* Subheadline - 20px with proper spacing */}
            <p className="text-body-large text-[var(--foreground-muted)] max-w-3xl mx-auto mb-16 leading-relaxed">
              Find housing support, jobs, newcomer services, tenant help, mental health support, 
              businesses, local programs, verified information, and trusted guidance — all in one place.
            </p>

            {/* Large search bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto mb-10"
            >
              <div className="relative">
                <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--foreground-muted)]" />
                <input
                  type="text"
                  placeholder='Try: "Can my landlord do this?" or "How do I find affordable housing?"'
                  className="search-hero pl-16 pr-8"
                  onFocus={handleAskAI}
                  readOnly
                />
              </div>
            </motion.div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleExploreDirectly}
                className="btn-primary px-10 py-5 rounded-2xl flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                Explore Calgary
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAskAI}
                className="btn-secondary px-10 py-5 rounded-2xl flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                <Sparkles className="w-5 h-5 text-[#FBBF24]" />
                Ask Calgary Bridge AI
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-7 h-12 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 bg-white/40 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: Quick Help - Large premium tiles */}
      <section className="section-spacing bg-section">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-display mb-5">What do you need help with?</h2>
            <p className="text-body text-[var(--foreground-muted)] max-w-2xl mx-auto">
              Quick access to Calgary&apos;s most essential services and support programs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.06 }}
                onClick={handleExploreDirectly}
                className={`action-card text-left ${action.color}`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.iconBg} flex items-center justify-center mb-6`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-title">{action.title}</h3>
                  {action.subtitle && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--calgary-red)]/15 text-[var(--calgary-red)]">
                      {action.subtitle}
                    </span>
                  )}
                </div>
                <p className="text-description text-[var(--foreground-muted)] leading-relaxed">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Calgary Bridge AI - Large hero experience */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-500/5 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-8 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--surface)] border border-[var(--border)] mb-10">
              <Sparkles className="w-5 h-5 text-[#FBBF24]" />
              <span className="text-description text-[var(--foreground-muted)]">Powered by AI</span>
            </div>
            
            <h2 className="text-display mb-6">
              Ask Calgary <span className="text-gradient-gold">anything.</span>
            </h2>
            
            <p className="text-body text-[var(--foreground-muted)] max-w-2xl mx-auto mb-12">
              Get instant, personalized guidance on any civic question. 
              No more searching dozens of websites.
            </p>

            {/* Large conversational search box */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative mb-10"
            >
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--foreground-muted)]" />
              <input
                type="text"
                placeholder="Type your question here..."
                className="search-hero pl-16 pr-8"
                onFocus={handleAskAI}
                readOnly
              />
            </motion.div>

            {/* Example prompts */}
            <div className="flex flex-wrap justify-center gap-3">
              {aiExamples.map((example, index) => (
                <motion.button
                  key={example}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAskAI}
                  className="px-6 py-3.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-description hover:border-[var(--border-hover)] transition-colors"
                >
                  {example}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Community Pulse */}
      <section className="section-spacing-sm">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-14"
          >
            <h2 className="text-display mb-5">Calgary is <span className="text-gradient-blue">alive.</span></h2>
            <p className="text-body text-[var(--foreground-muted)]">
              Discover events, volunteer opportunities, and community happenings.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Community Events", count: "50+", desc: "Festivals, workshops, gatherings" },
              { title: "Volunteer Opportunities", count: "120+", desc: "Make a difference locally" },
              { title: "Local Businesses", count: "300+", desc: "Support your neighborhood" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="premium-card text-center"
              >
                <div className="text-5xl font-bold text-gradient-blue mb-3">{item.count}</div>
                <h3 className="text-title mb-2">{item.title}</h3>
                <p className="text-description text-[var(--foreground-muted)]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-spacing">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="premium-card text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-amber-500/5" />
            <div className="relative z-10 py-10">
              <h2 className="text-display mb-5">
                Ready to discover your Calgary?
              </h2>
              <p className="text-body text-[var(--foreground-muted)] mb-10 max-w-xl mx-auto">
                Join thousands of Calgarians who&apos;ve found the help they needed.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGetStarted}
                className="btn-primary px-12 py-5 rounded-2xl inline-flex items-center gap-3"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#0284c7] flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L8 8H16L12 2Z" fill="currentColor" />
                <rect x="10" y="8" width="4" height="12" fill="currentColor" />
                <rect x="8" y="18" width="8" height="4" rx="1" fill="currentColor" />
              </svg>
            </div>
            <span className="text-description text-[var(--foreground-muted)]">Calgary Connect</span>
          </div>
          <p className="text-description text-[var(--foreground-muted)]">
            Calgary&apos;s digital front door. Built with care for our community.
          </p>
        </div>
      </footer>
    </div>
  );
}
