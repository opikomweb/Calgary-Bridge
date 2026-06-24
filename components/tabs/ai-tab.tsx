"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { resources, categoryLabels } from "@/lib/data";
import {
  Send, User, ArrowRight, Phone, ExternalLink,
  TrendingUp, PanelRightClose, PanelRightOpen, Search, MapPin,
} from "lucide-react";
import type { Resource, Language } from "@/lib/types";
import { useTranslations, registerStrings } from "@/lib/translation-context";
import dynamic from "next/dynamic";

// Lazy-load the 921-line pulse panel — only fetched when visible
const CalgaryPulsePanel = dynamic(
  () => import("@/components/calgary-pulse-panel").then(m => ({ default: m.CalgaryPulsePanel })),
  { ssr: false }
);

// Register all static UI strings so the TranslationProvider pre-fetches them.
registerStrings(
  "I connect Calgary.",
  "How can I help you today?",
  "Try asking",
  "How do I find affordable housing?",
  "I'm new to Calgary — where do I start?",
  "I'm visiting — what should I see?",
  "Help me find a job or training",
  "Ask Askonnect anything...",
  "Recommended Resources",
  "Search live",
  "Calgary Pulse",
  "Live insights from your city",
  "How do I apply for rental assistance?",
  "Where can I get free tax help?",
  "What programs help with childcare costs?",
  "How do I find ESL classes near me?",
  "Popular questions",
);

// Popular chat questions shown below the pulse panel
const popularQuestions = [
  "How do I apply for rental assistance?",
  "Where can I get free tax help?",
  "What programs help with childcare costs?",
  "How do I find ESL classes near me?",
];

// Example prompts shown on the empty chat state
const examplePrompts = [
  "How do I find affordable housing?",
  "I'm new to Calgary — where do I start?",
  "I'm visiting — what should I see?",
  "Help me find a job or training",
];

export default function AITab() {
  const { activeLanguage, chatMessages, addChatMessage } = useAppStore();
  const tx = useTranslations({
    headline: "I connect Calgary.",
    subheadline: "How can I help you today?",
    tryAsking: "Try asking",
    placeholder: "Ask Askonnect anything...",
    recommendedResources: "Recommended Resources",
    searchLive: "Search live",
    calgaryPulse: "Calgary Pulse",
    liveInsights: "Live insights from your city",
    popularQuestions: "Popular questions",
    prompt1: "How do I find affordable housing?",
    prompt2: "I'm new to Calgary — where do I start?",
    prompt3: "I'm visiting — what should I see?",
    prompt4: "Help me find a job or training",
    q1: "How do I apply for rental assistance?",
    q2: "Where can I get free tax help?",
    q3: "What programs help with childcare costs?",
    q4: "How do I find ESL classes near me?",
  });
  const translatedPrompts = [tx.prompt1, tx.prompt2, tx.prompt3, tx.prompt4];
  const translatedQuestions = [tx.q1, tx.q2, tx.q3, tx.q4];
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pulseOpen, setPulseOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  };

  useEffect(() => {
    const id = requestAnimationFrame(() => scrollToBottom());
    return () => cancelAnimationFrame(id);
  }, [chatMessages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const findRelevantResources = (query: string): Resource[] => {
    const lowerQuery = query.toLowerCase();
    const keywords: Record<string, string[]> = {
      housing: ["housing", "rent", "apartment", "home", "shelter", "affordable"],
      jobs: ["job", "work", "employment", "career", "resume", "hire", "training"],
      healthcare: ["health", "doctor", "medical", "hospital", "clinic", "insurance"],
      "mental-health": ["mental", "anxiety", "depression", "counseling", "therapy", "stress"],
      food: ["food", "hungry", "eat", "grocery", "meal"],
      newcomer: ["newcomer", "immigrant", "refugee", "new to canada", "settlement"],
      legal: ["legal", "lawyer", "law", "tenant", "rights", "court", "eviction"],
      transit: ["transit", "bus", "train", "ctrain", "transportation", "pass"],
      education: ["education", "school", "english", "esl", "learn", "class"],
      senior: ["senior", "elderly", "retirement", "55+", "older"],
      tourism: ["visit", "visiting", "tourist", "tour", "tours", "guide", "sightsee", "sightseeing", "things to do", "attraction", "hotel", "hotels", "stay", "restaurant", "dining", "eat", "explore calgary", "see", "trip", "vacation", "rockies", "banff"],
    };

    const matchedCategories: string[] = [];
    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => lowerQuery.includes(word))) {
        matchedCategories.push(category);
      }
    }

    if (matchedCategories.length === 0) {
      return resources.filter(r => r.featured).slice(0, 3);
    }

    return resources
      .filter(r => r.category.some(c => matchedCategories.includes(c)))
      .slice(0, 3);
  };

  const handleSend = async (message: string) => {
    const trimmed = message.trim();
    if (!trimmed) return;

    // Capture history BEFORE appending the new user message (state updates async).
    const history = chatMessages.map((m) => ({ role: m.role, content: m.content }));

    addChatMessage({ role: "user", content: trimmed });
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, language: activeLanguage, history }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();
      if (!data?.reply) throw new Error("empty reply");

      addChatMessage({
        role: "assistant",
        content: data.reply,
        resources: Array.isArray(data.resourceIds) ? data.resourceIds : [],
        webLinks: Array.isArray(data.webSearches) ? data.webSearches : [],
      });
    } catch (err) {
      // Graceful fallback — the guide always responds with vetted local
      // resources even if the AI service is briefly unavailable.
      console.log("[v0] chat fallback engaged:", err instanceof Error ? err.message : err);
      const relevant = findRelevantResources(trimmed);
      addChatMessage({
        role: "assistant",
        content:
          "I had trouble reaching live information just now, but here are some trusted Calgary resources that should help. Please try asking again in a moment for a more tailored answer.",
        resources: relevant.map((r) => r.id),
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (query: string) => {
    handleSend(query);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[var(--background)] via-[var(--background)] to-[var(--background-secondary)]">
      {/* Calgary Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-[#38BDF8]/8 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-[#0284c7]/6 via-transparent to-transparent" />
        
        {/* Bow River wave - bottom (subtle, brand-blue) */}
        <svg className="absolute bottom-0 left-0 right-0 h-32 opacity-[0.03]" viewBox="0 0 1440 128" preserveAspectRatio="none">
          <path d="M0,64 Q360,128 720,64 T1440,64 L1440,128 L0,128 Z" fill="currentColor" className="text-[#38BDF8]" />
        </svg>
      </div>

      {/* Split Layout - Chat Left, Intelligence Right.
          Mobile: use dvh minus the sticky header (~56px) and fixed bottom nav (~64px).
          The extra subtraction removes the blank dead-zone that appeared on mobile. */}
      <div className="flex h-[calc(100dvh-120px)] sm:h-[calc(100dvh-130px)] lg:h-[calc(100vh-80px)]">
        {/* Left Side - AI Conversation. Expands to full width when the
            Calgary Pulse panel is collapsed. */}
        <div className={`relative flex-1 flex flex-col min-w-0 ${pulseOpen ? "lg:max-w-[65%]" : "lg:max-w-full"}`}>
          {/* Desktop-only toggle to re-open the Pulse panel when collapsed */}
          {!pulseOpen && (
            <button
              onClick={() => setPulseOpen(true)}
              aria-label="Show Calgary Pulse panel"
              className="hidden lg:flex absolute top-4 right-4 z-10 items-center gap-2 rounded-full border border-[#1D4ED8]/25 bg-[#1D4ED8]/10 px-4 py-2 text-sm font-semibold text-[#1D4ED8] hover:bg-[#1D4ED8]/15 transition-colors"
            >
              <PanelRightOpen className="w-4 h-4" />
              Calgary Pulse
            </button>
          )}
          <div
            ref={messagesContainerRef}
            className="flex-1 min-h-0 overflow-y-auto scroll-pt-6 overscroll-contain"
          >
            {chatMessages.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center min-h-full px-5 md:px-8 py-10 md:py-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center w-full max-w-xl"
                >
                  {/* Compact inline header: small avatar left + headline right */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-3 mb-7 md:mb-8"
                  >
                    <Image
                      src="/askonnect-avatar.webp"
                      alt="Askonnect"
                      width={48}
                      height={48}
                      className="w-11 h-11 md:w-12 md:h-12 object-contain flex-shrink-0"
                    />
                    <motion.h1
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.18 }}
                      className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-balance text-left leading-snug"
                    >
                      {tx.headline}{" "}
                      <span className="text-foreground/60 font-medium">{tx.subheadline}</span>
                    </motion.h1>
                  </motion.div>

                  {/* Simple example prompts (optional starting points) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/40">
                      {tx.tryAsking}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-2.5">
                      {translatedPrompts.map((prompt, index) => (
                        <motion.button
                          key={examplePrompts[index]}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.06 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleSuggestionClick(examplePrompts[index])}
                          className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-4 py-2.5 text-sm font-medium text-foreground/75 transition-all hover:border-[#38BDF8]/40 hover:bg-[#38BDF8]/10 hover:text-foreground"
                        >
                          {prompt}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            ) : (
              /* Chat Messages */
              <div className="mx-auto w-full max-w-3xl px-5 md:px-8 pt-6 md:pt-10 pb-10 md:pb-8">
                <div className="flex flex-col gap-5 md:gap-6">
                  <AnimatePresence>
                    {chatMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 md:gap-4 ${
                          message.role === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 md:h-11 md:w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl md:rounded-2xl ${
                            message.role === "user" ? "bg-[#3B82F6]" : ""
                          }`}
                        >
                          {message.role === "user" ? (
                            <User className="h-5 w-5 text-white" />
                          ) : (
                            <Image
                              src="/askonnect-avatar.webp"
                              alt="Askonnect"
                              width={44}
                              height={44}
                              className="h-full w-full object-contain"
                            />
                          )}
                        </div>
                        <div className={`flex-1 min-w-0 ${message.role === "user" ? "flex justify-end" : ""}`}>
                          <div
                            className={`max-w-[90%] rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 ${
                              message.role === "user"
                                ? "bg-[#3B82F6] text-white"
                                : "glass-card"
                            }`}
                          >
                            <div className="text-sm md:text-base leading-relaxed whitespace-pre-line">
                              {message.content.split(/(\*\*.*?\*\*)/).map((part, i) => {
                                if (part.startsWith("**") && part.endsWith("**")) {
                                  return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
                                }
                                return part;
                              })}
                            </div>
                          </div>
                          
                          {/* Resource Cards */}
                          {message.role === "assistant" && message.resources && message.resources.length > 0 && (
                            <div className="mt-4 space-y-3">
                              <p className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                                {tx.recommendedResources}
                              </p>
                              {message.resources.map((resourceId) => {
                                const resource = resources.find(r => r.id === resourceId);
                                return resource ? <AIResourceCard key={resourceId} resource={resource} /> : null;
                              })}
                            </div>
                          )}

                          {/* Live web / Google Maps / government search links */}
                          {message.role === "assistant" && message.webLinks && message.webLinks.length > 0 && (
                            <div className="mt-4">
                              <p className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider mb-2">
                                {tx.searchLive}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {message.webLinks.map((link, i) => {
                                  const isMap = /maps/.test(link.url);
                                  return (
                                    <a
                                      key={i}
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#1D4ED8] bg-[#1D4ED8] px-3.5 py-2 text-xs md:text-sm font-medium text-white transition-colors hover:bg-[#1e40af] hover:border-[#1e40af]"
                                    >
                                      {isMap ? <MapPin className="h-3.5 w-3.5" /> : <Search className="h-3.5 w-3.5" />}
                                      {link.label}
                                    </a>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 md:gap-4"
                    >
                      <div className="flex h-10 w-10 md:h-11 md:w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl md:rounded-2xl">
                        <Image
                          src="/askonnect-avatar.webp"
                          alt="Askonnect"
                          width={44}
                          height={44}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="glass-card rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4">
                        <div className="flex gap-1.5">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--foreground-muted)]" style={{ animationDelay: "0ms" }} />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--foreground-muted)]" style={{ animationDelay: "150ms" }} />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--foreground-muted)]" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}
          </div>

          {/* Input - Docked at Bottom */}
          <div className="border-t-2 border-foreground/[0.08] bg-background">
            <div className="px-5 md:px-8 py-4 md:py-5">
              <div className="flex items-center gap-2 md:gap-3 rounded-xl md:rounded-2xl bg-white dark:bg-[rgba(15,23,42,0.9)] border-2 border-foreground/[0.15] focus-within:border-[#E1251B] transition-colors p-2 md:p-2.5 shadow-sm">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                  placeholder={tx.placeholder}
                  className="flex-1 bg-transparent px-3 md:px-4 py-2.5 md:py-3 text-foreground placeholder:text-foreground/50 focus:outline-none text-sm md:text-base min-w-0"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isTyping}
                  className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-lg md:rounded-xl bg-[#E1251B] text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#E1251B]/30 flex-shrink-0"
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Calgary Intelligence Panel (40%) - Desktop Only.
            Collapsible so users get more space while chatting. */}
        {pulseOpen && (
        <div className="hidden lg:flex w-[38%] xl:w-[40%] border-l border-[var(--border)] bg-gradient-to-b from-[var(--background)] to-[var(--background-secondary)] flex-col">
          <div className="flex-1 overflow-y-auto px-6 xl:px-8 py-8 xl:py-10">
            {/* Calgary Insights Header - Clean Icon */}
            <div className="mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 xl:w-14 xl:h-14 flex-shrink-0 rounded-2xl bg-gradient-to-br from-[#1D4ED8]/20 to-[#0A2540]/10 flex items-center justify-center border border-[#1D4ED8]/20">
                  <TrendingUp className="w-6 h-6 xl:w-7 xl:h-7 text-[#1D4ED8]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl xl:text-2xl font-bold tracking-tight leading-tight">{tx.calgaryPulse}</h2>
                  <p className="text-sm xl:text-base text-foreground/50 mt-0.5 leading-relaxed">{tx.liveInsights}</p>
                </div>
                <button
                  onClick={() => setPulseOpen(false)}
                  aria-label="Collapse Calgary Pulse panel"
                  className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl text-foreground/50 hover:text-foreground hover:bg-foreground/[0.06] transition-colors"
                >
                  <PanelRightClose className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Live Calgary Pulse — weather, AQHI, weather alerts */}
            <CalgaryPulsePanel />

            {/* Popular Questions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <h3 className="text-lg xl:text-xl font-bold mb-5 flex items-center gap-3">
                <TrendingUp className="w-5 h-5 xl:w-6 xl:h-6 text-[#1D4ED8]" />
                {tx.popularQuestions}
              </h3>
              <div className="space-y-3">
                {translatedQuestions.map((question, i) => (
                  <button
                    key={popularQuestions[i]}
                    onClick={() => handleSuggestionClick(popularQuestions[i])}
                    className="w-full text-left p-4 xl:p-5 rounded-2xl bg-foreground/[0.03] border border-foreground/[0.06] hover:bg-foreground/[0.06] hover:border-foreground/[0.12] transition-all text-sm xl:text-base text-foreground/60 hover:text-foreground leading-relaxed"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
        )}
      </div>
    </div>
  );
}

function AIResourceCard({ resource }: { resource: Resource }) {
  const { activeLanguage, toggleBookmark, bookmarkedResources } = useAppStore();
  const isBookmarked = bookmarkedResources.includes(resource.id);

  // Runtime translation — falls back to English while Google Translate responds
  const [cardTitle, setCardTitle] = useState(() => resource.title[activeLanguage] ?? resource.title.en);
  const [cardDesc, setCardDesc] = useState(
    () => (resource.summary?.[activeLanguage] ?? resource.summary?.en) || (resource.description[activeLanguage] ?? resource.description.en)
  );

  useEffect(() => {
    let cancelled = false;
    const sourceTitle = resource.title.en;
    const sourceDesc  = resource.summary?.en ?? resource.description.en;

    // Use existing static translation if available
    const staticTitle = resource.title[activeLanguage] ?? sourceTitle;
    const staticDesc  = (resource.summary?.[activeLanguage] ?? resource.summary?.en) || (resource.description[activeLanguage] ?? sourceDesc);

    setCardTitle(staticTitle);
    setCardDesc(staticDesc);

    if (activeLanguage === "en") return;

    const toTranslate: string[] = [];
    const slots: ("title" | "desc")[] = [];
    if (staticTitle === sourceTitle) { toTranslate.push(sourceTitle); slots.push("title"); }
    if (staticDesc  === sourceDesc)  { toTranslate.push(sourceDesc);  slots.push("desc");  }

    if (toTranslate.length > 0) {
      translateBatch(toTranslate, activeLanguage).then((results) => {
        if (cancelled) return;
        results.forEach((r, i) => {
          if (slots[i] === "title") setCardTitle(r);
          if (slots[i] === "desc")  setCardDesc(r);
        });
      });
    }
    return () => { cancelled = true; };
  }, [activeLanguage, resource.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-4 sm:p-6 md:p-7"
    >
      {/* Top row: category chips (wrap) + Save action — no overlap */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap gap-2 min-w-0">
          {resource.category.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-[#1D4ED8]/15 text-[#1D4ED8] dark:bg-[#3B82F6]/15 dark:text-[#3B82F6]"
            >
              {categoryLabels[cat]?.[activeLanguage] ?? categoryLabels[cat]?.en ?? cat}
            </span>
          ))}
        </div>
        <button
          onClick={() => toggleBookmark(resource.id)}
          aria-label={isBookmarked ? "Saved" : "Save resource"}
          className="flex-shrink-0 text-sm text-[#1D4ED8] dark:text-[#3B82F6] font-semibold flex items-center gap-1.5 whitespace-nowrap hover:text-[#1e40af] dark:hover:text-[#60A5FA] transition-colors"
        >
          {isBookmarked ? "Saved" : "Save"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <h4 translate="no" className="notranslate font-bold text-foreground text-base sm:text-lg md:text-xl mb-2 leading-snug text-pretty">
        {cardTitle}
      </h4>
      <p translate="no" className="notranslate text-sm md:text-base text-foreground/60 leading-relaxed line-clamp-3">
        {cardDesc}
      </p>

      <div className="mt-4 md:mt-6 flex flex-wrap gap-x-5 gap-y-3">
        {resource.phone && (
          <a
            href={`tel:${resource.phone}`}
            className="flex items-center gap-2 text-sm md:text-base font-semibold text-[#1D4ED8] dark:text-[#3B82F6] hover:text-[#1e40af] dark:hover:text-[#60A5FA] transition-colors"
          >
            <Phone className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            {resource.phone}
          </a>
        )}
        {resource.website && (
          <a
            href={resource.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm md:text-base font-bold text-[#1D4ED8] dark:text-[#3B82F6] hover:text-[#1e40af] dark:hover:text-[#60A5FA] transition-colors underline underline-offset-4"
          >
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            Visit Website
          </a>
        )}
      </div>
    </motion.div>
  );
}
