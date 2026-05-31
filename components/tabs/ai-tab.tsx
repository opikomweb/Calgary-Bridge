"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { resources, categoryLabels } from "@/lib/data";
import { Send, Sparkles, User, ArrowRight, Phone, ExternalLink, Home, Briefcase, Heart, Users, Scale, Bus } from "lucide-react";
import type { Resource } from "@/lib/types";

const conversationStarters = [
  {
    icon: Home,
    label: "Housing",
    query: "How do I find affordable housing in Calgary?",
    color: "from-emerald-500/20 to-emerald-600/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: Briefcase,
    label: "Jobs",
    query: "Help me find job training and employment programs",
    color: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-400",
  },
  {
    icon: Heart,
    label: "Healthcare",
    query: "How do I register for healthcare and find a doctor?",
    color: "from-rose-500/20 to-rose-600/10",
    iconColor: "text-rose-400",
  },
  {
    icon: Users,
    label: "Newcomers",
    query: "What settlement services are available for newcomers?",
    color: "from-amber-500/20 to-amber-600/10",
    iconColor: "text-amber-400",
  },
  {
    icon: Scale,
    label: "Legal",
    query: "What are my tenant rights in Alberta?",
    color: "from-purple-500/20 to-purple-600/10",
    iconColor: "text-purple-400",
  },
  {
    icon: Bus,
    label: "Transit",
    query: "How do I get a low-income transit pass?",
    color: "from-cyan-500/20 to-cyan-600/10",
    iconColor: "text-cyan-400",
  },
];

export default function AITab() {
  const { activeLanguage, chatMessages, addChatMessage } = useAppStore();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

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
    <div className="flex h-[calc(100vh-140px)] flex-col">
      <div className="flex-1 overflow-y-auto">
        {chatMessages.length === 0 ? (
          /* Empty State - Immersive Welcome */
          <div className="flex flex-col items-center justify-center min-h-full px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-2xl mx-auto"
            >
              {/* AI Avatar */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#3B82F6] to-[#1d4ed8] shadow-2xl shadow-[#3B82F6]/30 mx-auto"
              >
                <Sparkles className="h-12 w-12 text-white" />
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight"
              >
                Calgary Bridge AI
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-[var(--foreground-muted)] mb-12 max-w-lg mx-auto leading-relaxed"
              >
                Your personal guide to every resource and service in Calgary. Ask me anything.
              </motion.p>

              {/* Conversation Starters - Large Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto"
              >
                {conversationStarters.map((starter, index) => (
                  <motion.button
                    key={starter.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.08 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuggestionClick(starter.query)}
                    className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${starter.color} border border-white/10 p-6 text-left transition-all hover:border-white/20 hover:shadow-xl`}
                  >
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ${starter.iconColor}`}>
                      <starter.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{starter.label}</h3>
                    <p className="text-sm text-white/60 line-clamp-2">{starter.query}</p>
                    <ArrowRight className="absolute bottom-4 right-4 w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </div>
        ) : (
          /* Chat Messages */
          <div className="max-w-3xl mx-auto px-6 py-8">
            <div className="flex flex-col gap-6">
              <AnimatePresence>
                {chatMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl ${
                        message.role === "user"
                          ? "bg-[#3B82F6]"
                          : "bg-gradient-to-br from-[#3B82F6] to-[#1d4ed8]"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="h-5 w-5 text-white" />
                      ) : (
                        <Sparkles className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div className={`flex-1 ${message.role === "user" ? "flex justify-end" : ""}`}>
                      <div
                        className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                          message.role === "user"
                            ? "bg-[#3B82F6] text-white"
                            : "glass-card"
                        }`}
                      >
                        <div className="text-[15px] leading-relaxed whitespace-pre-line">
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
                  className="flex gap-4"
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#1d4ed8]">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div className="glass-card rounded-2xl px-5 py-4">
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

      {/* Input - Always at Bottom */}
      <div className="border-t border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 py-5">
          <div className="glass-card flex items-center gap-3 rounded-2xl p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder="Ask about housing, jobs, healthcare, transit..."
              className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-[var(--foreground-muted)] focus:outline-none text-[15px]"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isTyping}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3B82F6] text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </motion.button>
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
      className="glass-card rounded-xl p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex gap-1.5 mb-2">
            {resource.category.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#3B82F6]/15 text-[#3B82F6]"
              >
                {categoryLabels[cat]?.[activeLanguage] || cat}
              </span>
            ))}
          </div>
          <h4 className="font-semibold text-white mb-1">
            {resource.title[activeLanguage]}
          </h4>
          <p className="text-xs text-[var(--foreground-muted)] line-clamp-2">
            {resource.summary?.[activeLanguage] || resource.description[activeLanguage]}
          </p>
        </div>
        <button
          onClick={() => toggleBookmark(resource.id)}
          className="text-xs text-[#3B82F6] font-medium flex items-center gap-1"
        >
          {isBookmarked ? "Saved" : "Save"}
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      
      <div className="mt-3 flex flex-wrap gap-3">
        {resource.phone && (
          <a
            href={`tel:${resource.phone}`}
            className="flex items-center gap-1.5 text-xs text-[#3B82F6] hover:underline"
          >
            <Phone className="w-3.5 h-3.5" />
            {resource.phone}
          </a>
        )}
        {resource.website && (
          <a
            href={resource.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#3B82F6] hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Website
          </a>
        )}
      </div>
    </motion.div>
  );
}
