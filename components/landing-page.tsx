"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Users, Map, MessageCircle } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/data";

export default function LandingPage() {
  const { setCurrentPage, activeLanguage } = useAppStore();
  const t = (key: string) => translations[key]?.[activeLanguage] || translations[key]?.en || key;

  const features = [
    {
      icon: Map,
      title: "Resource Discovery",
      description: "Find housing, jobs, healthcare, legal help, and community programs in one place.",
    },
    {
      icon: MessageCircle,
      title: "Calgary Bridge AI",
      description: "Get personalized guidance and step-by-step support for any civic question.",
    },
    {
      icon: Shield,
      title: "RentShield",
      description: "Understand your tenant rights with lease translation and rent increase checking.",
    },
    {
      icon: Users,
      title: "Community Hub",
      description: "Discover events, volunteer opportunities, and local businesses.",
    },
  ];

  const categories = [
    "Housing", "Jobs", "Healthcare", "Legal Help", "Education",
    "Food Support", "Transit", "Senior Services", "Newcomer Services",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight">Calgary Connect</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-8"
          >
            <a href="#features" className="text-[var(--foreground-muted)] hover:text-white transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#resources" className="text-[var(--foreground-muted)] hover:text-white transition-colors text-sm font-medium">
              Resources
            </a>
            <button
              onClick={() => setCurrentPage("onboarding")}
              className="btn-primary px-5 py-2.5 rounded-full text-sm font-medium"
            >
              {t("getStarted")}
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-spacing flex-1 flex items-center justify-center relative overflow-hidden pt-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0ea5e9]/20 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#f59e0b]/15 rounded-full blur-[80px]"
          />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] mb-8">
              <Sparkles className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-sm text-[var(--foreground-muted)]">Powered by Calgary Bridge AI</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
              <span className="text-gradient-primary">{t("welcome")}</span>
            </h1>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
              {t("onePlaceLine")}
            </h2>

            <p className="text-lg md:text-xl text-[var(--foreground-muted)] max-w-3xl mx-auto mb-12 leading-relaxed">
              {t("heroSubtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentPage("onboarding")}
                className="btn-primary px-8 py-4 rounded-full text-lg font-medium flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                {t("getStarted")}
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentPage("onboarding")}
                className="btn-secondary px-8 py-4 rounded-full text-lg font-medium flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                <MessageCircle className="w-5 h-5" />
                {t("askAI")}
              </motion.button>
            </div>
          </motion.div>

          {/* Scrolling categories */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-20 overflow-hidden"
          >
            <div className="flex gap-3 animate-scroll">
              {[...categories, ...categories].map((category, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--foreground-muted)] whitespace-nowrap"
                >
                  {category}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mountain silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </section>

      {/* Features Section */}
      <section id="features" className="section-spacing relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Your Calgary Navigator
            </h2>
            <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto">
              Everything you need to discover, understand, and access Calgary&apos;s resources.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8 card-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0ea5e9]/20 to-[#0ea5e9]/5 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-[#0ea5e9]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[var(--foreground-muted)] leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/10 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to explore Calgary?
              </h2>
              <p className="text-lg text-[var(--foreground-muted)] mb-8 max-w-xl mx-auto">
                Join thousands of Calgarians who have discovered the resources they need.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentPage("onboarding")}
                className="btn-primary px-8 py-4 rounded-full text-lg font-medium inline-flex items-center gap-3"
              >
                {t("getStarted")}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-sm text-[var(--foreground-muted)]">Calgary Connect</span>
          </div>
          <p className="text-sm text-[var(--foreground-muted)]">
            Connecting Calgarians to the resources they need.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
