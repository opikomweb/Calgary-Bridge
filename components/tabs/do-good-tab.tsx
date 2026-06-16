"use client";

import { motion } from "framer-motion";
import {
  HandHeart,
  Gift,
  Users,
  Building2,
  GraduationCap,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { doGoodCategories, doGoodImpactStats, type DoGoodCategory } from "@/lib/do-good";

const ICONS = {
  HandHeart,
  Gift,
  Users,
  Building2,
  GraduationCap,
} as const;

export default function DoGoodTab() {
  return (
    <div className="min-h-screen relative">
      {/* ========== HERO ========== */}
      <section className="relative pt-16 pb-10 md:pt-24 md:pb-14 lg:pt-28">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start gap-5"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E1251B]/10 border border-[#E1251B]/25 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#E1251B]">
              <HandHeart className="w-3.5 h-3.5" />
              Give back to Calgary
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-foreground text-balance leading-[1.05]">
              Do good for <span className="text-[#1D4ED8]">your city</span>.
            </h1>
            <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-2xl text-pretty">
              Real, researched ways to help your neighbours — volunteer, donate, sponsor a family,
              improve our streets, and learn to give better. Every link goes straight to a trusted
              Calgary organization.
            </p>
          </motion.div>

          {/* Impact stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {doGoodImpactStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                className="rounded-2xl bg-card border border-border p-4 md:p-5"
              >
                <p className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{stat.value}</p>
                <p className="text-xs md:text-sm text-foreground/55 mt-1 leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick jump nav */}
          <nav className="mt-8 flex flex-wrap gap-2">
            {doGoodCategories.map((cat) => {
              const Icon = ICONS[cat.icon];
              return (
                <a
                  key={cat.id}
                  href={`#dg-${cat.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground/[0.06] hover:bg-foreground/[0.1] border border-border px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" style={{ color: cat.accent }} />
                  {cat.title}
                </a>
              );
            })}
          </nav>
        </div>
      </section>

      {/* ========== CATEGORY SECTIONS ========== */}
      {doGoodCategories.map((cat) => (
        <CategorySection key={cat.id} category={cat} />
      ))}

      {/* ========== CLOSING ========== */}
      <section className="relative pb-28 md:pb-20 pt-4">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="rounded-3xl bg-gradient-to-br from-[#0c2d4d] to-[#071a2e] p-8 md:p-12 text-center">
            <HandHeart className="w-10 h-10 text-[#E1251B] mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white text-balance mb-3">
              Calgary is built by neighbours helping neighbours.
            </h2>
            <p className="text-white/70 max-w-xl mx-auto leading-relaxed text-pretty">
              Pick one thing this week. A single shift, a small donation, or one report to 311 makes
              the whole city stronger.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function CategorySection({ category }: { category: DoGoodCategory }) {
  const Icon = ICONS[category.icon];
  return (
    <section id={`dg-${category.id}`} className="relative py-8 md:py-10 scroll-mt-24">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Section header */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl"
            style={{ backgroundColor: `${category.accent}1a`, border: `1px solid ${category.accent}40` }}
          >
            <Icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: category.accent }} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{category.title}</h2>
            <p className="text-sm md:text-base text-foreground/60 leading-relaxed mt-1 text-pretty">
              {category.tagline}
            </p>
          </div>
        </div>

        {/* Item cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {category.items.map((item, i) => (
            <motion.a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (i % 2) * 0.05 }}
              className="group relative flex flex-col rounded-2xl bg-card border border-border hover:border-foreground/20 p-5 md:p-6 shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-base md:text-lg font-bold text-foreground leading-tight pr-2">
                  {item.name}
                </h3>
                <span
                  className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full transition-colors"
                  style={{ backgroundColor: `${category.accent}14` }}
                >
                  <ArrowUpRight
                    className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: category.accent }}
                  />
                </span>
              </div>

              <p className="text-sm text-foreground/65 leading-relaxed mb-4">{item.description}</p>

              <div className="mt-auto flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <span
                    className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: category.accent }}
                  />
                  <p className="text-sm font-semibold text-foreground/85 leading-snug">{item.need}</p>
                </div>
                {item.commitment && (
                  <div className="flex items-center gap-1.5 text-xs text-foreground/50">
                    <Clock className="w-3.5 h-3.5" />
                    {item.commitment}
                  </div>
                )}
              </div>

              <div
                className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold text-white transition-transform group-hover:scale-[1.02]"
                style={{ backgroundColor: category.accent }}
              >
                {item.action}
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
