"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { resources, categoryLabels } from "@/lib/data";
import { 
  Send, User, ArrowRight, Phone, ExternalLink, 
  Home, Cloud, Sun, CloudSnow, CloudRain, CloudSun, Thermometer,
  Calendar, TrendingUp, PanelRightClose, PanelRightOpen, Search, MapPin, Wind, Loader2
} from "lucide-react";
import type { Resource } from "@/lib/types";

// ---- Calgary Open-Meteo weather (WMO codes) ---------------------------------

type WeatherData = {
  temp: number;
  feelsLike: number;
  desc: string;
  wmoCode: number;
  isDay: boolean;
};

function wmoToDesc(code: number): string {
  if (code === 0) return "Clear sky";
  if (code <= 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code <= 49) return "Fog";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain showers";
  if (code <= 86) return "Snow showers";
  if (code <= 99) return "Thunderstorm";
  return "Variable";
}

function getSeasonLabel(temp: number, wmo: number): string {
  const month = new Date().getMonth(); // 0=Jan
  const isSummer = month >= 5 && month <= 8; // Jun–Sep
  const isWinter = month === 11 || month <= 1; // Dec–Feb
  const isSnowing = wmo >= 71 && wmo <= 77;
  const isRaining = (wmo >= 51 && wmo <= 67) || (wmo >= 80 && wmo <= 82);
  if (isSnowing) return "Snow Alert";
  if (isRaining) return "Rainy Day";
  if (isSummer && temp >= 22) return "Warm Summer Day";
  if (isSummer) return "Summer Weather";
  if (isWinter) return "Winter Weather";
  if (month >= 2 && month <= 4) return "Spring Weather";
  return "Autumn Weather";
}

function getAdvisory(temp: number, wmo: number): string {
  if (wmo >= 95) return "Thunderstorm warning — stay indoors and away from trees.";
  if (wmo >= 71 && wmo <= 77) return "Snow on roads — drive carefully, layer up and use transit where possible.";
  if (wmo >= 51 && wmo <= 67) return "Rain expected — carry an umbrella and watch for wet roads.";
  if (temp >= 30) return "Heat advisory — stay hydrated and seek shade during peak hours.";
  if (temp >= 22) return "Great day to explore Calgary's parks and outdoor spaces!";
  if (temp >= 10) return "Mild and pleasant — a light jacket is recommended.";
  if (temp >= 0) return "Cool day ahead — dress in layers for comfort.";
  if (temp >= -10) return "Cold temperatures — wear a warm coat, hat, and gloves.";
  return "Extreme cold — dress warmly! Free warming centres are open at downtown shelters.";
}

// Icon component mapped to WMO code + daytime
function WeatherIcon({ wmo, isDay, className }: { wmo: number; isDay: boolean; className?: string }) {
  if (wmo >= 71 && wmo <= 77) return <CloudSnow className={className} />;
  if (wmo >= 51 && wmo <= 82) return <CloudRain className={className} />;
  if (wmo >= 3) return <Cloud className={className} />;
  if (wmo >= 1) return isDay ? <CloudSun className={className} /> : <Cloud className={className} />;
  return isDay ? <Sun className={className} /> : <Cloud className={className} />;
}

// Card bg gradient that reflects conditions
function weatherGradient(wmo: number, temp: number): string {
  if (wmo >= 71 && wmo <= 77) return "from-[#0A2540] via-[#0E2E52] to-[#15396b]"; // snow → dark blue
  if (wmo >= 51 && wmo <= 82) return "from-[#1C3A4A] via-[#1e4060] to-[#1a3550]"; // rain → slate blue
  if (temp >= 28) return "from-[#7C1D10] via-[#9B2A1A] to-[#B43A25]";            // hot → deep red-orange
  if (temp >= 18) return "from-[#0A4A2A] via-[#0D5C34] to-[#0E6B3C]";            // warm → rich green
  if (temp >= 5)  return "from-[#1A3A5C] via-[#1e4878] to-[#163D6E]";            // mild → mid blue
  return "from-[#0A2540] via-[#0E2E52] to-[#15396b]";                             // cold → dark navy
}

async function fetchCalgaryWeather(): Promise<WeatherData> {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=51.0447&longitude=-114.0719" +
    "&current=temperature_2m,apparent_temperature,weather_code,is_day" +
    "&temperature_unit=celsius&timezone=America%2FDenver";
  const res = await fetch(url, { next: { revalidate: 1800 } });
  if (!res.ok) throw new Error("weather fetch failed");
  const json = await res.json();
  const c = json.current;
  return {
    temp: Math.round(c.temperature_2m),
    feelsLike: Math.round(c.apparent_temperature),
    desc: wmoToDesc(c.weather_code),
    wmoCode: c.weather_code,
    isDay: c.is_day === 1,
  };
}

// ---- Static Calgary insights -----------------------------------------------

const popularQuestions = [
  "How do I apply for rental assistance?",
  "Where can I get free tax help?",
  "What programs help with childcare costs?",
  "How do I find ESL classes near me?",
];

const calgaryInsights = [
  { icon: TrendingUp, label: "340+ jobs posted this week",    chip: "bg-[#1D4ED8]/15 text-[#1D4ED8] dark:text-[#60A5FA] ring-1 ring-[#1D4ED8]/30" },
  { icon: Home,       label: "12 housing programs available", chip: "bg-[#1D4ED8]/15 text-[#1D4ED8] dark:text-[#60A5FA] ring-1 ring-[#1D4ED8]/30" },
  { icon: Calendar,   label: "Free tax clinics open now",     chip: "bg-[#E12521]/12 text-[#E1251B] ring-1 ring-[#E12521]/30" },
];

// Light, optional example prompts
const examplePrompts = [
  "How do I find affordable housing?",
  "I'm new to Calgary — where do I start?",
  "I'm visiting — what should I see?",
  "Help me find a job or training",
];

export default function AITab() {
  const { activeLanguage, chatMessages, addChatMessage } = useAppStore();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pulseOpen, setPulseOpen] = useState(true);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherError, setWeatherError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll ONLY the inner messages container (not the page/window). Using
  // scrollIntoView here would bubble up to the window and the sticky header,
  // jumping the whole page and hiding messages under the header. Setting
  // scrollTop on the container keeps the scroll contained to the chat pane.
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  };

  // Re-scroll whenever messages change or the typing indicator toggles so the
  // newest answer (and the typing dots) are always brought into view.
  useEffect(() => {
    // rAF ensures the new DOM (message/typing bubble) is laid out first.
    const id = requestAnimationFrame(() => scrollToBottom());
    return () => cancelAnimationFrame(id);
  }, [chatMessages, isTyping]);

  // Fetch live Calgary weather from Open-Meteo (free, no API key required).
  // Refresh every 30 minutes so data stays current without hammering the API.
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const data = await fetchCalgaryWeather();
        if (!cancelled) setWeather(data);
      } catch {
        if (!cancelled) setWeatherError(true);
      }
    };
    load();
    const interval = setInterval(load, 30 * 60 * 1000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

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

                          {/* Live web / Google Maps / government search links */}
                          {message.role === "assistant" && message.webLinks && message.webLinks.length > 0 && (
                            <div className="mt-4">
                              <p className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider mb-2">
                                Search live
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
          <div className="border-t-2 border-foreground/[0.08] bg-background">
            <div className="px-5 md:px-8 py-4 md:py-5">
              <div className="flex items-center gap-2 md:gap-3 rounded-xl md:rounded-2xl bg-white dark:bg-[rgba(15,23,42,0.9)] border-2 border-foreground/[0.15] focus-within:border-[#E1251B] transition-colors p-2 md:p-2.5 shadow-sm">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                  placeholder="Ask iKonnect anything..."
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
                  <h2 className="text-xl xl:text-2xl font-bold tracking-tight leading-tight">Calgary Pulse</h2>
                  <p className="text-sm xl:text-base text-foreground/50 mt-0.5 leading-relaxed">Live insights from your city</p>
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

            {/* Live Weather Card — data from Open-Meteo, updates every 30 min */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`relative overflow-hidden rounded-2xl p-5 xl:p-6 mb-6 bg-gradient-to-br ${
                weather ? weatherGradient(weather.wmoCode, weather.temp) : "from-[#0A2540] via-[#0E2E52] to-[#15396b]"
              } border border-white/10 shadow-lg shadow-black/20`}
            >
              {/* Ambient glow */}
              <div className="pointer-events-none absolute -top-10 -right-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-6 h-28 w-28 rounded-full bg-white/8 blur-3xl" />

              {!weather && !weatherError && (
                <div className="relative flex items-center gap-3 text-white/70">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">Fetching Calgary weather…</span>
                </div>
              )}

              {weatherError && (
                <div className="relative flex items-center gap-3 text-white/70">
                  <Thermometer className="w-5 h-5" />
                  <div>
                    <p className="font-semibold text-white text-base">Calgary Weather</p>
                    <p className="text-sm text-white/60 mt-0.5">Unable to load — check back shortly.</p>
                  </div>
                </div>
              )}

              {weather && (
                <>
                  <div className="relative flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 xl:w-14 xl:h-14 flex-shrink-0 rounded-2xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center">
                      <WeatherIcon wmo={weather.wmoCode} isDay={weather.isDay} className="w-6 h-6 xl:w-7 xl:h-7 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-lg xl:text-xl leading-tight text-white">
                        {getSeasonLabel(weather.temp, weather.wmoCode)}
                      </p>
                      <p className="text-sm xl:text-base text-white/70 mt-0.5 leading-relaxed">
                        {weather.temp}°C · feels like {weather.feelsLike}°C · {weather.desc}
                      </p>
                    </div>
                  </div>
                  <p className="relative text-sm xl:text-base text-white/85 leading-relaxed">
                    {getAdvisory(weather.temp, weather.wmoCode)}
                  </p>
                </>
              )}
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
                <TrendingUp className="w-5 h-5 xl:w-6 xl:h-6 text-[#1D4ED8]" />
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
        )}
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
              className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-[#1D4ED8]/15 text-[#1D4ED8] dark:bg-[#3B82F6]/15 dark:text-[#3B82F6]"
            >
              {categoryLabels[cat]?.[activeLanguage] || cat}
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
