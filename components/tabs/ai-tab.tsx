"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { resources, categoryLabels } from "@/lib/data";
import { 
  Send, User, ArrowRight, Phone, ExternalLink, 
  Home, CloudSnow, Calendar, TrendingUp
} from "lucide-react";
import type { Resource } from "@/lib/types";

// Light, optional example prompts. These do NOT pre-fill the conversation —
// they simply give first-time users an idea of what they can type.
const examplePrompts = [
  "How do I find affordable housing?",
  "I'm new to Calgary — where do I start?",
  "I'm visiting — what should I see?",
  "Help me find a job or training",
];

const popularQuestions = [
  "How do I apply for rental assistance?",
  "Where can I get free tax help?",
  "What programs help with childcare costs?",
  "How do I find ESL classes near me?",
];

const calgaryInsights = [
  { icon: TrendingUp, label: "340+ jobs posted this week", chip: "bg-sky-500/15 text-sky-600 dark:text-sky-400 ring-1 ring-sky-500/30" },
  { icon: Home, label: "12 housing programs available", chip: "bg-sky-500/15 text-sky-600 dark:text-sky-400 ring-1 ring-sky-500/30" },
  { icon: Calendar, label: "Free tax clinics open now", chip: "bg-[#E12521]/12 text-[#E12521] ring-1 ring-[#E12521]/30" },
];

export default function AITab() {
  const { activeLanguage, chatMessages, addChatMessage } = useAppStore();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Auto-focus the query bar so the user can start typing immediately —
  // keeps the focus on what they want to ask.
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

  const generateAIResponse = (query: string): { text: string; resources: Resource[] } => {
    const relevantResources = findRelevantResources(query);
    const lowerQuery = query.toLowerCase();

    let responseText = "";

    if (lowerQuery.includes("housing") || lowerQuery.includes("rent") || lowerQuery.includes("apartment")) {
      responseText = "I understand you're looking for housing assistance in Calgary. Here are some key resources:\n\n**Calgary Housing Company** (403-221-6430) - Manages affordable, rent-geared-to-income programs\n\n**Homeward Trust Calgary** (403-718-8533) - Housing-first programs and emergency shelter coordination\n\n**Rental Scam Prevention Guide** - Learn how to avoid common housing frauds\n\nTo apply, contact the Calgary Housing Company directly or call 211 Alberta for guidance.";
    } else if (lowerQuery.includes("job") || lowerQuery.includes("work") || lowerQuery.includes("employment") || lowerQuery.includes("training")) {
      responseText = "Finding employment in Calgary is an important step! Here are the best resources:\n\n**Centre for Newcomers** (403-569-3325) - Free employment services including resume help and interview prep\n\n**CCIS Employment** (403-262-2006) - Job training and career bridging programs\n\n**CRIEC** (403-262-8700) - Mentorship for internationally trained professionals\n\nMany programs are free. Start with the Centre for Newcomers!";
    } else if (lowerQuery.includes("health") || lowerQuery.includes("doctor") || lowerQuery.includes("medical") || lowerQuery.includes("register")) {
      responseText = "Healthcare in Alberta is covered by Alberta Health Services. Here's how to get started:\n\n**Step 1:** Register for an Alberta Health Care Card at Service Alberta\n\n**Step 2:** Find a family doctor through albertadocs.ca or walk-in clinics\n\n**Step 3:** For health advice 24/7, call Alberta Health Link at **811**\n\nEmergency services are always available - call **911**";
    } else if (lowerQuery.includes("mental") || lowerQuery.includes("anxiety") || lowerQuery.includes("stress") || lowerQuery.includes("depression")) {
      responseText = "Mental health support is available 24/7 in Calgary. You're not alone:\n\n**Distress Centre** (403-266-4357) - Immediate crisis support by phone\n\n**211 Alberta** - Free referrals to counseling and mental health services\n\n**Alberta Health Services** mental health clinics - Free treatment\n\nAll services are confidential and available to everyone.";
    } else if (lowerQuery.includes("newcomer") || lowerQuery.includes("immigrant") || lowerQuery.includes("refugee") || lowerQuery.includes("settlement")) {
      responseText = "Welcome to Calgary! Comprehensive newcomer support is available:\n\n**Centre for Newcomers** (403-569-3325) - Free settlement services in many languages\n\n**CCIS** (403-262-2006) - Integration programs, ESL classes, and employment help\n\n**211 Alberta** - Complete resource directory in multiple languages\n\nMost services are free and available in your language.";
    } else if (lowerQuery.includes("legal") || lowerQuery.includes("tenant") || lowerQuery.includes("rights") || lowerQuery.includes("eviction")) {
      responseText = "Legal help is available in Calgary:\n\n**Legal Aid Alberta** (1-866-845-2222) - Free legal advice for eligible residents\n\n**Your Tenant Rights:**\n• 24-hour notice required before landlord entry\n• Rent increases limited to once per year with 3 months notice\n• Eviction requires proper legal process\n\n**Community Legal Clinics** - Free advice on specific issues";
    } else if (lowerQuery.includes("transit") || lowerQuery.includes("bus") || lowerQuery.includes("pass")) {
      responseText = "Getting around Calgary is easy:\n\n**Calgary Transit** - Buses and CTrain throughout the city\n\n**Low-Income Transit Pass:**\n• Available for eligible residents\n• Apply through Fair Entry program\n• Significant savings on monthly passes\n\n**Plan your trip:** calgarytransit.com";
    } else if (
      lowerQuery.includes("visit") || lowerQuery.includes("tourist") || lowerQuery.includes("tour") ||
      lowerQuery.includes("sightsee") || lowerQuery.includes("hotel") || lowerQuery.includes("restaurant") ||
      lowerQuery.includes("things to do") || lowerQuery.includes("attraction") || lowerQuery.includes("see in")
    ) {
      responseText = "Welcome to Calgary! Here's the best of the city for visitors:\n\n**Top sights:** Calgary Tower, Heritage Park Historical Village, Studio Bell, Prince's Island Park and the Bow River pathways\n\n**Trusted local guides:**\n• **Toonie Tours** – gratuity-based walking & bike tours\n• **The History Wrangler (Rob Lennard)** – award-winning history tours\n• **Alberta Blue Sky Tours** – day trips to Banff & the Rockies\n\n**Where to stay:** Downtown hotels near Stephen Avenue keep you walking distance to dining and the CTrain\n\n**Dining:** Explore Stephen Avenue, Inglewood and 17th Ave for top-rated restaurants\n\nTap into the Tourists & Visitors category to browse curated, highly-rated options.";
    } else {
      responseText = "I'm here to help you navigate Calgary's resources and services. I can provide information about:\n\n• **Housing** - Affordable rentals, shelters, subsidies\n• **Jobs** - Training programs, resume help, career services\n• **Healthcare** - Doctors, clinics, mental health support\n• **Newcomers** - Settlement, ESL, integration programs\n• **Legal** - Tenant rights, free legal advice\n• **Transit** - Low-income passes, trip planning\n\nWhat would you like help with?";
    }

    return { text: responseText, resources: relevantResources };
  };

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    addChatMessage({
      role: "user",
      content: message.trim(),
    });
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const { text, resources: relevantResources } = generateAIResponse(message);
      
      addChatMessage({
        role: "assistant",
        content: text,
        resources: relevantResources.map(r => r.id),
      });
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestionClick = (query: string) => {
    handleSend(query);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[var(--background)] via-[var(--background)] to-[var(--background-secondary)]">
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
          Mobile reserves space for the sticky header (~88px) AND the fixed
          bottom nav (~72px) so the docked input + last message never hide
          behind the nav bar. */}
      <div className="flex h-[calc(100dvh-160px)] lg:h-[calc(100vh-100px)]">
        {/* Left Side - AI Conversation (full on mobile, 60% on desktop) */}
        <div className="flex-1 flex flex-col min-w-0 lg:max-w-[65%]">
          <div className="flex-1 overflow-y-auto">
            {chatMessages.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center min-h-full px-5 md:px-8 py-10 md:py-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center w-full max-w-xl"
                >
                  {/* Avatar — character only, no colored backdrop */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mx-auto mb-6 flex h-20 w-20 md:h-24 md:w-24 items-center justify-center"
                  >
                    <Image
                      src="/ikonnect-guide-avatar.png"
                      alt="iKonnect Guide"
                      width={96}
                      height={96}
                      className="h-full w-full object-contain"
                    />
                  </motion.div>

                  {/* Headline — clean, actionable prompt */}
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-10 tracking-tight text-balance max-w-md mx-auto"
                  >
                    How can we help you thrive in Calgary today?
                  </motion.h1>

                  {/* Simple example prompts (optional starting points) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/40">
                      Try asking
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-2.5">
                      {examplePrompts.map((prompt, index) => (
                        <motion.button
                          key={prompt}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.06 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleSuggestionClick(prompt)}
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
              <div className="mx-auto w-full max-w-3xl px-5 md:px-8 pt-8 md:pt-10 pb-6 md:pb-8">
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
                              src="/ikonnect-guide-avatar.png"
                              alt="iKonnect Guide"
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
                                Recommended Resources
                              </p>
                              {message.resources.map((resourceId) => {
                                const resource = resources.find(r => r.id === resourceId);
                                return resource ? <AIResourceCard key={resourceId} resource={resource} /> : null;
                              })}
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
                          src="/ikonnect-guide-avatar.png"
                          alt="iKonnect Guide"
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
          <div className="border-t border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl">
            <div className="px-5 md:px-8 py-4 md:py-5">
              <div className="glass-card flex items-center gap-2 md:gap-3 rounded-xl md:rounded-2xl p-2 md:p-2.5">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                  placeholder="Ask iKonnect anything..."
                  className="flex-1 bg-transparent px-3 md:px-4 py-2.5 md:py-3 text-foreground placeholder:text-[var(--foreground-muted)] focus:outline-none text-sm md:text-base min-w-0"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isTyping}
                  className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-lg md:rounded-xl bg-[#0284c7] text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#0284c7]/30 flex-shrink-0"
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Calgary Intelligence Panel (40%) - Desktop Only */}
        <div className="hidden lg:flex w-[38%] xl:w-[40%] border-l border-[var(--border)] bg-gradient-to-b from-[var(--background)] to-[var(--background-secondary)] flex-col">
          <div className="flex-1 overflow-y-auto px-6 xl:px-8 py-8 xl:py-10">
            {/* Calgary Insights Header - Clean Icon */}
            <div className="mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 xl:w-14 xl:h-14 flex-shrink-0 rounded-2xl bg-gradient-to-br from-[#38BDF8]/20 to-[#0284c7]/10 flex items-center justify-center border border-[#38BDF8]/20">
                  <TrendingUp className="w-6 h-6 xl:w-7 xl:h-7 text-[#38BDF8]" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl xl:text-2xl font-bold tracking-tight leading-tight">Calgary Pulse</h2>
                  <p className="text-sm xl:text-base text-foreground/50 mt-0.5 leading-relaxed">Live insights from your city</p>
                </div>
              </div>
            </div>

            {/* Weather/Alert Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-5 xl:p-6 mb-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 xl:w-14 xl:h-14 flex-shrink-0 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                  <CloudSnow className="w-6 h-6 xl:w-7 xl:h-7 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-lg xl:text-xl leading-tight">Winter Weather</p>
                  <p className="text-sm xl:text-base text-foreground/50 mt-0.5 leading-relaxed">-8°C, light snow expected</p>
                </div>
              </div>
              <p className="text-sm xl:text-base text-foreground/60 leading-relaxed">
                Dress warmly! Free warming centers available at downtown shelters.
              </p>
            </motion.div>

            {/* Live Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 mb-8"
            >
              {calgaryInsights.map((insight, i) => (
                <div key={i} className="flex items-center gap-3.5 p-4 rounded-2xl bg-foreground/[0.04] border border-foreground/[0.08]">
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${insight.chip}`}>
                    <insight.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm xl:text-base font-semibold leading-snug text-foreground/90">{insight.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Popular Questions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg xl:text-xl font-bold mb-5 flex items-center gap-3">
                <TrendingUp className="w-5 h-5 xl:w-6 xl:h-6 text-[#0284c7]" />
                Popular This Week
              </h3>
              <div className="space-y-3">
                {popularQuestions.map((question, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(question)}
                    className="w-full text-left p-4 xl:p-5 rounded-2xl bg-foreground/[0.03] border border-foreground/[0.06] hover:bg-foreground/[0.06] hover:border-foreground/[0.12] transition-all text-sm xl:text-base text-foreground/60 hover:text-foreground leading-relaxed"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

function AIResourceCard({ resource }: { resource: Resource }) {
  const { activeLanguage, toggleBookmark, bookmarkedResources } = useAppStore();
  const isBookmarked = bookmarkedResources.includes(resource.id);

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
              className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-[#3B82F6]/15 text-[#3B82F6]"
            >
              {categoryLabels[cat]?.[activeLanguage] || cat}
            </span>
          ))}
        </div>
        <button
          onClick={() => toggleBookmark(resource.id)}
          aria-label={isBookmarked ? "Saved" : "Save resource"}
          className="flex-shrink-0 text-sm text-[#3B82F6] font-semibold flex items-center gap-1.5 whitespace-nowrap hover:text-[#60A5FA] transition-colors"
        >
          {isBookmarked ? "Saved" : "Save"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <h4 className="font-bold text-foreground text-base sm:text-lg md:text-xl mb-2 leading-snug text-pretty">
        {resource.title[activeLanguage]}
      </h4>
      <p className="text-sm md:text-base text-foreground/60 leading-relaxed line-clamp-3">
        {resource.summary?.[activeLanguage] || resource.description[activeLanguage]}
      </p>

      <div className="mt-4 md:mt-6 flex flex-wrap gap-x-5 gap-y-3">
        {resource.phone && (
          <a
            href={`tel:${resource.phone}`}
            className="flex items-center gap-2 text-sm md:text-base font-semibold text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
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
            className="flex items-center gap-2 text-sm md:text-base font-bold text-[#3B82F6] hover:text-[#60A5FA] transition-colors underline underline-offset-4"
          >
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            Visit Website
          </a>
        )}
      </div>
    </motion.div>
  );
}
