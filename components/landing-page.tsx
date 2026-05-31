"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Home, Briefcase, Heart, Users, GraduationCap, Clock, AlertTriangle, Gift, Search, MessageCircle } from "lucide-react";
import { useAppStore } from "@/lib/store";

export default function LandingPage() {
  const { setCurrentPage, setActiveTab, setHasOnboarded } = useAppStore();

  const quickActions = [
    { icon: Home, title: "Housing & Rent Help", description: "Find affordable housing, understand tenant rights, get rental assistance", color: "glow-blue", iconBg: "from-blue-500/20 to-blue-600/10" },
    { icon: Briefcase, title: "Jobs & Business", description: "Job search support, career training, business resources", color: "glow-gold", iconBg: "from-amber-500/20 to-amber-600/10" },
    { icon: Heart, title: "Mental Health", description: "Counseling, crisis support, wellness programs", color: "glow-green", iconBg: "from-emerald-500/20 to-emerald-600/10" },
    { icon: Users, title: "Family Support", description: "Childcare, parenting programs, family services", color: "glow-purple", iconBg: "from-purple-500/20 to-purple-600/10" },
    { icon: GraduationCap, title: "Newcomers", description: "Settlement services, language classes, integration support", color: "glow-cyan", iconBg: "from-cyan-500/20 to-cyan-600/10" },
    { icon: Clock, title: "Seniors", description: "Senior programs, home care, community activities", color: "glow-blue", iconBg: "from-blue-500/20 to-blue-600/10" },
    { icon: AlertTriangle, title: "Emergency", description: "Crisis contacts, shelters, urgent assistance", color: "glow-red", iconBg: "from-red-500/20 to-red-600/10" },
    { icon: Gift, title: "Local Deals", description: "Community discounts, local business offers", color: "glow-gold", iconBg: "from-amber-500/20 to-amber-600/10" },
  ];

  const aiExamples = [
    "Can my landlord do this?",
    "How do I find affordable childcare?",
    "What programs can help my family?",
    "Where can I find newcomer support?",
  ];

  const handleGetStarted = () => {
    setCurrentPage("onboarding");
  };

  const handleExploreDirectly = () => {
    setHasOnboarded(true);
    setCurrentPage("main");
    setActiveTab("explore");
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            {/* Premium Logo - Calgary Tower inspired */}
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#1d4ed8] flex items-center justify-center shadow-lg shadow-blue-500/25">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L8 8H16L12 2Z" fill="currentColor" />
                  <rect x="10" y="8" width="4" height="12" fill="currentColor" />
                  <rect x="8" y="18" width="8" height="4" rx="1" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#F5B942] border-2 border-[#07111F]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight">Calgary Connect</span>
              <span className="hidden sm:block text-xs text-[var(--foreground-muted)]">Your city, simplified</span>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGetStarted}
            className="btn-primary px-6 py-2.5 rounded-full text-sm font-semibold"
          >
            Get Started
          </motion.button>
        </div>
      </nav>

      {/* SECTION 1: Hero */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Calgary skyline silhouette */}
          <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20">
            <svg viewBox="0 0 1440 320" className="w-full h-full fill-current text-blue-500/30">
              <path d="M0,320 L0,250 L100,250 L100,200 L150,200 L150,180 L180,180 L180,120 L200,120 L200,100 L220,80 L240,100 L240,120 L260,120 L260,180 L290,180 L290,200 L340,200 L340,250 L400,250 L400,220 L450,220 L450,200 L500,200 L500,180 L520,180 L520,150 L540,150 L540,120 L560,100 L580,100 L580,120 L600,120 L600,150 L620,150 L620,180 L640,180 L640,200 L700,200 L700,220 L720,220 L720,160 L740,160 L740,140 L760,140 L760,160 L780,160 L780,220 L840,220 L840,250 L900,250 L900,230 L950,230 L950,200 L1000,200 L1000,180 L1050,180 L1050,200 L1100,200 L1100,230 L1150,230 L1150,250 L1200,250 L1200,200 L1250,200 L1250,220 L1300,220 L1300,250 L1350,250 L1350,220 L1400,220 L1400,250 L1440,250 L1440,320 Z" />
            </svg>
          </div>
          
          {/* Floating orbs */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#3B82F6]/15 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#F5B942]/10 rounded-full blur-[100px]"
          />
          
          {/* River shimmer */}
          <div className="absolute bottom-32 left-0 right-0 h-1 overflow-hidden">
            <div className="river-flow w-full h-full bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-hero mb-6">
              Everything Calgary.
              <br />
              <span className="text-gradient-blue">One Place.</span>
            </h1>

            <p className="text-body-large text-[var(--foreground-muted)] max-w-3xl mx-auto mb-12 leading-relaxed">
              Find housing help, community programs, local services, newcomer support, business resources, emergency guidance, verified information, and trusted local opportunities—without searching dozens of websites.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleExploreDirectly}
                className="btn-primary px-10 py-5 rounded-2xl text-lg font-semibold flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                Explore Resources
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAskAI}
                className="btn-secondary px-10 py-5 rounded-2xl text-lg font-semibold flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                <Sparkles className="w-5 h-5 text-[#F5B942]" />
                Ask Calgary Bridge AI
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: Quick Actions */}
      <section className="section-spacing-sm bg-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-display mb-4">What do you need?</h2>
            <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto">
              Quick access to Calgary&apos;s most essential services and support.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05 }}
                onClick={handleExploreDirectly}
                className={`action-card text-left ${action.color}`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.iconBg} flex items-center justify-center mb-5`}>
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Calgary Bridge AI */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] mb-8">
              <Sparkles className="w-4 h-4 text-[#F5B942]" />
              <span className="text-sm text-[var(--foreground-muted)]">Powered by AI</span>
            </div>
            
            <h2 className="text-display mb-6">
              Ask Calgary <span className="text-gradient-gold">anything.</span>
            </h2>
            
            <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto mb-10">
              Get instant, personalized guidance on any civic question. No more endless searching.
            </p>

            {/* Large search box */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative mb-8"
            >
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--foreground-muted)]" />
              <input
                type="text"
                placeholder="Type your question here..."
                className="search-hero pl-16 pr-6"
                onFocus={handleAskAI}
                readOnly
              />
            </motion.div>

            {/* Example prompts */}
            <div className="flex flex-wrap justify-center gap-3">
              {aiExamples.map((example, index) => (
                <motion.button
                  key={example}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAskAI}
                  className="px-5 py-3 rounded-full bg-[var(--surface)] border border-[var(--border)] text-sm hover:border-[var(--border-hover)] transition-colors"
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-display mb-4">Calgary is <span className="text-gradient-blue">alive.</span></h2>
            <p className="text-lg text-[var(--foreground-muted)]">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="premium-card text-center"
              >
                <div className="text-4xl font-bold text-gradient-blue mb-2">{item.count}</div>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-[var(--foreground-muted)]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-spacing">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="premium-card text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-amber-500/5" />
            <div className="relative z-10 py-8">
              <h2 className="text-title mb-4">
                Ready to discover your Calgary?
              </h2>
              <p className="text-lg text-[var(--foreground-muted)] mb-8 max-w-xl mx-auto">
                Join thousands of Calgarians who&apos;ve found the help they needed.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGetStarted}
                className="btn-primary px-10 py-5 rounded-2xl text-lg font-semibold inline-flex items-center gap-3"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#1d4ed8] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L8 8H16L12 2Z" fill="currentColor" />
                <rect x="10" y="8" width="4" height="12" fill="currentColor" />
                <rect x="8" y="18" width="8" height="4" rx="1" fill="currentColor" />
              </svg>
            </div>
            <span className="text-sm text-[var(--foreground-muted)]">Calgary Connect</span>
          </div>
          <p className="text-sm text-[var(--foreground-muted)]">
            Calgary&apos;s digital front door. Built with care for our community.
          </p>
        </div>
      </footer>
    </div>
  );
}
