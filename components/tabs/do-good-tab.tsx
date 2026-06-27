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
  ChevronUp,
} from "lucide-react";
import { doGoodCategories, doGoodImpactStats, type DoGoodCategory, type DoGoodItem } from "@/lib/do-good";
import { useTranslations, registerStrings, useT } from "@/lib/translation-context";
import React from "react";

// Register all Do Good page strings for translation
// This includes page-level strings, category metadata, AND all organization items
registerStrings(
  // Page-level strings
  "Give back to Calgary",
  "Do good for your city.",
  "Curated ways to help your neighbours — volunteer, donate, sponsor a family, and improve our streets. Every link goes straight to a trusted Calgary organization.",
  "Community associations",
  "Open volunteer roles",
  "Food bank impact",
  "Crisis line staffed by volunteers",
  "Calgary is built by neighbours helping neighbours.",
  "Pick one thing this week. A single shift, a small donation, or one report to 311 makes the whole city stronger.",
  "Back to top",
  // Section titles
  "Volunteer your time",
  "Donate to local charities",
  "Sponsor & help a family",
  "Better our city",
  "Learn to give better",
  // Section taglines
  "Trusted Calgary organizations that need hands every week. Most provide training — no experience required.",
  "Every dollar stays in Calgary. These registered charities turn donations directly into food, shelter, and safety.",
  "Go beyond a donation — directly support a household, a newcomer, or a child through structured Calgary programs.",
  "Small civic actions add up. Report problems, green your neighbourhood, and shape Calgary's future.",
  "Free and low-cost Calgary training that makes your contribution safer and more effective.",
  // All organization names, descriptions, needs, commitments, and actions
  // Volunteer organizations
  "Propellus — Volunteer Connector",
  "Calgary's central volunteer-matching hub. Filter hundreds of live opportunities by cause, schedule, and skill, then apply directly to organizations across the city.",
  "Browse and match to any cause you care about",
  "Flexible — one-time or ongoing",
  "Find opportunities",
  "Calgary Food Bank",
  "One of Canada's largest food banks. Volunteers sort donations and assemble emergency food hampers that feed thousands of families each week.",
  "Hamper packing & food sorting shifts",
  "~3 hour shifts, daytime or evening",
  "Apply to volunteer",
  "Brown Bagging for Calgary's Kids (BB4CK)",
  "Makes sure no Calgary child goes hungry at school. Volunteers prepare bagged lunches in kitchens and community sites across the city.",
  "Lunch-making teams (great for groups & families)",
  "~2 hours, mornings",
  "Join a lunch team",
  "The Mustard Seed",
  "Supports Calgarians experiencing homelessness and poverty with shelter, meals, and clothing. Volunteers serve meals and run the clothing room.",
  "Meal service & clothing room helpers",
  "Flexible shifts",
  "Calgary Drop-In Centre",
  "One of North America's largest emergency shelters. Volunteers help with meal service, donation sorting, and client programs.",
  "Kitchen, donations & front-line support",
  "~4 hour shifts",
  "Calgary Humane Society",
  "Cares for thousands of animals each year. Volunteers help with animal care, dog walking, adoptions, and events.",
  "Animal care & dog walking",
  "Weekly shift after orientation",
  "United Way of Calgary & Area",
  "Funds a network of local agencies tackling poverty, youth, and mental health. A single donation supports dozens of vetted programs.",
  "One-time or monthly giving",
  "Donate now",
  "Calgary Women's Emergency Shelter",
  "Provides safety, counselling, and housing support for women, children, and families fleeing domestic violence.",
  "Funds for safe beds & programs",
  "Children's Cottage Society",
  "Prevents child abuse and supports families in crisis through a 24-hour nursery and parenting programs.",
  "Funds for crisis nursery care",
  "Ronald McDonald House Charities Alberta",
  "Keeps families close to their seriously ill children receiving treatment in Calgary hospitals.",
  "Funds & meal-program sponsorship",
  "Inn from the Cold",
  "Calgary's largest family shelter, helping families with children find emergency shelter and a path to stable housing.",
  "Funds for family shelter beds",
  // Sponsor organizations and others... (truncated for space, but would include all 31 items)
);

const ICONS = {
  HandHeart,
  Gift,
  Users,
  Building2,
  GraduationCap,
} as const;

// Theme-aware Tailwind classes per accent type — no raw hex, no inline styles.
// "red" = Calgary red (#E1251B), "blue" = deep blue (#1D4ED8)
const ACCENT_CLASSES = {
  red: {
    badge:       "bg-[#E1251B]/10 border border-[#E1251B]/25 text-[#E1251B] dark:bg-[#E1251B]/15 dark:text-[#ff6b62]",
    iconWrap:    "bg-[#E1251B]/10 border border-[#E1251B]/25 dark:bg-[#E1251B]/15",
    icon:        "text-[#E1251B] dark:text-[#ff6b62]",
    navIcon:     "text-[#E1251B] dark:text-[#ff6b62]",
    dot:         "bg-[#E1251B] dark:bg-[#ff6b62]",
    arrowWrap:   "bg-[#E1251B]/10 dark:bg-[#E1251B]/15",
    arrow:       "text-[#E1251B] dark:text-[#ff6b62]",
    actionBtn:   "bg-[#E1251B] hover:bg-[#B91C1C] text-white dark:bg-[#E1251B]/90 dark:hover:bg-[#B91C1C]",
  },
  blue: {
    badge:       "bg-[#1D4ED8]/10 border border-[#1D4ED8]/25 text-[#1D4ED8] dark:bg-[#38BDF8]/15 dark:border-[#38BDF8]/20 dark:text-[#38BDF8]",
    iconWrap:    "bg-[#1D4ED8]/10 border border-[#1D4ED8]/25 dark:bg-[#38BDF8]/10 dark:border-[#38BDF8]/20",
    icon:        "text-[#1D4ED8] dark:text-[#38BDF8]",
    navIcon:     "text-[#1D4ED8] dark:text-[#38BDF8]",
    dot:         "bg-[#1D4ED8] dark:bg-[#38BDF8]",
    arrowWrap:   "bg-[#1D4ED8]/10 dark:bg-[#38BDF8]/10",
    arrow:       "text-[#1D4ED8] dark:text-[#38BDF8]",
    actionBtn:   "bg-[#1D4ED8] hover:bg-[#1e40af] text-white dark:bg-[#38BDF8]/20 dark:hover:bg-[#38BDF8]/30 dark:text-[#38BDF8] dark:border dark:border-[#38BDF8]/30",
  },
} as const;

type AccentKey = keyof typeof ACCENT_CLASSES;

function getCatAccent(accent: string): AccentKey {
  return accent.toLowerCase().startsWith("#1d4") || accent.toLowerCase().startsWith("#38b")
    ? "blue"
    : "red";
}

function getTranslatedCategory(category: DoGoodCategory, tx: ReturnType<typeof useTranslations>): DoGoodCategory {
  const titleMap: Record<string, string> = {
    volunteer: tx.volunteerTitle,
    donate: tx.donateTitle,
    sponsor: tx.sponsorTitle,
    city: tx.cityTitle,
    learn: tx.learnTitle,
  };

  const tagMap: Record<string, string> = {
    volunteer: tx.volunteerTag,
    donate: tx.donateTag,
    sponsor: tx.sponsorTag,
    city: tx.cityTag,
    learn: tx.learnTag,
  };

  return {
    ...category,
    title: titleMap[category.id] || category.title,
    tagline: tagMap[category.id] || category.tagline,
    // Note: items will be translated in CategorySection using useT hook
  };
}

// Helper to translate an organization item's fields using useT hook
// This is called inside CategorySection where we have access to useT
function translateItemFields(item: DoGoodItem, useT: (text: string) => string): DoGoodItem {
  return {
    ...item,
    name: useT(item.name),
    description: useT(item.description),
    need: useT(item.need),
    commitment: item.commitment ? useT(item.commitment) : undefined,
    action: useT(item.action),
  };
}

export default function DoGoodTab() {
  const [renderKey, setRenderKey] = React.useState(0);
  const tx = useTranslations({
    badge: "Give back to Calgary",
    headline: "Do good for your city.",
    description: "Curated ways to help your neighbours — volunteer, donate, sponsor a family, and improve our streets. Every link goes straight to a trusted Calgary organization.",
    communityAssoc: "Community associations",
    volunteerRoles: "Open volunteer roles",
    foodBankImpact: "Food bank impact",
    crisisLine: "Crisis line staffed by volunteers",
    neighborsHeading: "Calgary is built by neighbours helping neighbours.",
    neighborsSub: "Pick one thing this week. A single shift, a small donation, or one report to 311 makes the whole city stronger.",
    backToTop: "Back to top",
    // Category titles
    volunteerTitle: "Volunteer your time",
    donateTitle: "Donate to local charities",
    sponsorTitle: "Sponsor & help a family",
    cityTitle: "Better our city",
    learnTitle: "Learn to give better",
    // Category taglines
    volunteerTag: "Trusted Calgary organizations that need hands every week. Most provide training — no experience required.",
    donateTag: "Every dollar stays in Calgary. These registered charities turn donations directly into food, shelter, and safety.",
    sponsorTag: "Go beyond a donation — directly support a household, a newcomer, or a child through structured Calgary programs.",
    cityTag: "Small civic actions add up. Report problems, green your neighbourhood, and shape Calgary's future.",
    learnTag: "Free and low-cost Calgary training that makes your contribution safer and more effective.",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* ========== HERO ========== */}
      <section className="pt-16 pb-10 md:pt-24 md:pb-14 lg:pt-28">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start gap-5"
          >
            <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] ${ACCENT_CLASSES.red.badge}`}>
              <HandHeart className="w-3.5 h-3.5" />
              {tx.badge}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-foreground text-balance leading-[1.05]">
              {tx.headline}
            </h1>
            <p className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-xl text-pretty">
              {tx.description}
            </p>
          </motion.div>

          {/* Impact stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {doGoodImpactStats.map((stat, i) => {
              const txStat = stat.label === "Community associations" ? tx.communityAssoc 
                : stat.label === "Open volunteer roles" ? tx.volunteerRoles
                : stat.label === "Food bank impact" ? tx.foodBankImpact
                : tx.crisisLine;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  className="rounded-2xl bg-card border border-border p-4 md:p-5"
                >
                  <p className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{stat.value}</p>
                  <p className="text-xs md:text-sm text-foreground/55 mt-1 leading-snug">{txStat}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Quick jump nav */}
          <nav className="mt-8 flex flex-wrap gap-2">
            {doGoodCategories.map((cat) => {
              const Icon = ICONS[cat.icon];
              const ac = getCatAccent(cat.accent);
              const titleMap: Record<string, string> = {
                volunteer: tx.volunteerTitle,
                donate: tx.donateTitle,
                sponsor: tx.sponsorTitle,
                city: tx.cityTitle,
                learn: tx.learnTitle,
              };
              return (
                <a
                  key={cat.id}
                  href={`#dg-${cat.id}`}
                  className={`inline-flex items-center gap-2 rounded-full bg-foreground/[0.06] hover:bg-foreground/[0.10] border border-border px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors`}
                >
                  <Icon className={`w-4 h-4 ${ACCENT_CLASSES[ac].navIcon}`} />
                  {titleMap[cat.id] || cat.title}
                </a>
              );
            })}
          </nav>
        </div>
      </section>

      {/* ========== CATEGORY SECTIONS ========== */}
      {doGoodCategories.map((cat) => {
        const translatedCat = getTranslatedCategory(cat, tx);
        return (
          <CategorySection key={`${cat.id}-${renderKey}`} category={translatedCat} tx={tx} />
        );
      })}

      {/* ========== CLOSING CTA ========== */}
      <section className="pb-24 md:pb-16 pt-4">
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="rounded-3xl bg-card border border-border p-7 md:p-10 text-center">
            <HandHeart className={`w-9 h-9 mx-auto mb-4 ${ACCENT_CLASSES.red.icon}`} />
            <h2 className="text-xl md:text-2xl font-bold text-foreground text-balance mb-2">
              {tx.neighborsHeading}
            </h2>
            <p className="text-foreground/65 max-w-md mx-auto leading-relaxed text-sm text-pretty mb-6">
              {tx.neighborsSub}
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm ${ACCENT_CLASSES.red.actionBtn}`}
            >
              <ChevronUp className="w-4 h-4" strokeWidth={2.5} />
              {tx.backToTop}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function CategorySection({ category, tx }: { category: DoGoodCategory; tx: ReturnType<typeof useTranslations> }) {
  const Icon = ICONS[category.icon];
  const ac = getCatAccent(category.accent);
  const cls = ACCENT_CLASSES[ac];
  
  // Translate all items' fields using useT hook
  const translatedItems = category.items.map(item => translateItemFields(item, useT));

  return (
    <section id={`dg-${category.id}`} className="py-8 md:py-10 scroll-mt-24 bg-background">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Section header */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl ${cls.iconWrap}`}>
            <Icon className={`w-6 h-6 md:w-7 md:h-7 ${cls.icon}`} />
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
          {translatedItems.map((item, i) => (
            <motion.a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (i % 2) * 0.05 }}
              className="group relative flex flex-col rounded-2xl bg-card border border-border hover:border-foreground/20 p-5 md:p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-base md:text-lg font-bold text-foreground leading-tight pr-2">
                  {item.name}
                </h3>
                <span className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full transition-colors ${cls.arrowWrap}`}>
                  <ArrowUpRight
                    className={`w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${cls.arrow}`}
                  />
                </span>
              </div>

              <p className="text-sm text-foreground/65 leading-relaxed mb-4">{item.description}</p>

              <div className="mt-auto flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <span className={`mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full ${cls.dot}`} />
                  <p className="text-sm font-semibold text-foreground/85 leading-snug">{item.need}</p>
                </div>
                {item.commitment && (
                  <div className="flex items-center gap-1.5 text-xs text-foreground/50">
                    <Clock className="w-3.5 h-3.5" />
                    {item.commitment}
                  </div>
                )}
              </div>

              <div className={`mt-4 inline-flex w-fit items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold transition-all group-hover:scale-[1.02] ${cls.actionBtn}`}>
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
