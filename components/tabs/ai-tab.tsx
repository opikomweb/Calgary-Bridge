"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { aiSuggestions, resources, categoryLabels } from "@/lib/data";
import { Send, Sparkles, User, ArrowRight, Phone, MapPin, ExternalLink } from "lucide-react";
import type { Resource } from "@/lib/types";

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

  // Simple keyword matching to find relevant resources
  const findRelevantResources = (query: string): Resource[] => {
    const lowerQuery = query.toLowerCase();
    const keywords: Record<string, string[]> = {
      housing: ["housing", "rent", "apartment", "home", "shelter", "affordable"],
      jobs: ["job", "work", "employment", "career", "resume", "hire"],
      healthcare: ["health", "doctor", "medical", "hospital", "clinic", "insurance"],
      "mental-health": ["mental", "anxiety", "depression", "counseling", "therapy", "stress"],
      food: ["food", "hungry", "eat", "grocery", "meal"],
      newcomer: ["newcomer", "immigrant", "refugee", "new to canada", "settlement"],
      legal: ["legal", "lawyer", "law", "tenant", "rights", "court"],
      transit: ["transit", "bus", "train", "ctrain", "transportation"],
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
      responseText = "I understand you're looking for housing assistance in Calgary. Here are some key resources:\n\n• Calgary Housing Company (403-221-6430) - Manages affordable, rent-geared-to-income programs\n• Homeward Trust Calgary (403-718-8533) - Housing-first programs and emergency shelter coordination\n• Rental Scam Prevention Guide - Learn how to avoid common housing frauds\n\nTo apply, contact the Calgary Housing Company directly or call 211 Alberta for guidance.";
    } else if (lowerQuery.includes("job") || lowerQuery.includes("work") || lowerQuery.includes("employment")) {
      responseText = "Finding employment in Calgary is an important step! Here are the best resources:\n\n• Centre for Newcomers (403-569-3325) - Free employment services including resume help and interviews\n• CCIS Employment (403-262-2006) - Job training and career bridging for immigrants\n• CRIEC (403-262-8700) - Mentorship for internationally trained professionals\n\nMany programs are free for newcomers. Start with the Centre for Newcomers!";
    } else if (lowerQuery.includes("health") || lowerQuery.includes("doctor") || lowerQuery.includes("medical")) {
      responseText = "Healthcare in Alberta is covered by Alberta Health Services. Here's how to get started:\n\n• Register for an Alberta Health Care Card at Service Alberta\n• Find a family doctor through albertadocs.ca or walk-in clinics\n• For health advice 24/7: Call Alberta Health Link at 811\n• Emergency services always available - call 911\n\nMany walk-in clinics operate without appointments across Calgary.";
    } else if (lowerQuery.includes("mental") || lowerQuery.includes("anxiety") || lowerQuery.includes("stress") || lowerQuery.includes("depression")) {
      responseText = "Mental health support is available 24/7 in Calgary. You're not alone:\n\n• Distress Centre (403-266-4357) - Immediate crisis support by phone\n• 211 Alberta - Free referrals to counseling and mental health services\n• Alberta Health Services mental health clinics - Free treatment\n• Call 911 if you're in immediate danger\n\nAll services are confidential and available to everyone.";
    } else if (lowerQuery.includes("food") || lowerQuery.includes("hungry") || lowerQuery.includes("meal")) {
      responseText = "Help with food is available in Calgary - no appointment needed:\n\n• Calgary Food Bank - Multiple locations, emergency assistance\n• The Mustard Seed Calgary (403-269-1319) - Free meals and food programs\n• Community meal programs at local churches and organizations\n• Call 211 Alberta to find food banks near your location\n\nFood assistance is confidential and non-judgmental.";
    } else if (lowerQuery.includes("newcomer") || lowerQuery.includes("immigrant") || lowerQuery.includes("refugee") || lowerQuery.includes("new to canada")) {
      responseText = "Welcome to Calgary! Comprehensive newcomer support is available:\n\n• Centre for Newcomers (403-569-3325) - Free settlement services\n• CCIS (403-262-2006) - Integration programs, ESL, employment help\n• 211 Alberta - Complete resource directory in multiple languages\n• Free ESL classes through school boards\n\nMost services are free and available in many languages.";
    } else if (lowerQuery.includes("legal") || lowerQuery.includes("lawyer") || lowerQuery.includes("tenant") || lowerQuery.includes("rights") || lowerQuery.includes("eviction")) {
      responseText = "Legal help is available in Calgary:\n\n• Legal Aid Alberta (1-866-845-2222) - Free legal advice for eligible residents\n• Tenant Rights - Service Alberta website has landlord/tenant information\n• Rental Scam Prevention Guide - Protect yourself from housing fraud\n• Community legal clinics - Free advice on specific issues\n\nYou don't need to navigate legal issues alone.";
    } else if (lowerQuery.includes("transit") || lowerQuery.includes("bus") || lowerQuery.includes("train") || lowerQuery.includes("ctrain")) {
      responseText = "Getting around Calgary is easy:\n\n• Calgary Transit - Buses and CTrain throughout the city\n• Low-income transit passes available for eligible residents\n• Plan your trip: calgarytransit.com\n• Call 211 Alberta for transit assistance programs\n\nMultiple payment options including low-cost monthly passes.";
    } else if (lowerQuery.includes("senior")) {
      responseText = "Support for seniors is available in Calgary:\n\n• Kerby Centre (403-410-1000) - Social programming and support\n• Seniors housing programs and benefits\n• Transportation assistance for older adults\n• Call 211 Alberta for comprehensive senior services\n\nMany services are free or subsidized.";
    } else {
      responseText = "I'm here to help you navigate Calgary's resources and services. I can provide information about:\n\n• Housing & Rental Assistance\n• Employment & Training Programs\n• Healthcare & Mental Health\n• Food & Emergency Help\n• Newcomer Settlement Services\n• Legal Rights & Resources\n• Transit & Transportation\n• Senior Services\n\nWhat would you like help with today?";
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

    // Simulate AI processing
    setTimeout(() => {
      const { text, resources: relevantResources } = generateAIResponse(message);
      
      addChatMessage({
        role: "assistant",
        content: text,
        resources: relevantResources,
      });
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  return (
    <div className="flex h-[calc(100vh-180px)] flex-col max-w-3xl mx-auto">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {chatMessages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#1d4ed8] shadow-xl shadow-[#3B82F6]/25">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <h2 className="mb-3 text-2xl font-bold">
              Calgary Bridge AI
            </h2>
            <p className="mb-2 max-w-md text-[var(--foreground-muted)] leading-relaxed">
              Your personal guide to Calgary&apos;s resources and services. Ask me anything about housing, healthcare, jobs, transit, or community programs.
            </p>
          </motion.div>
        )}

        <div className="flex flex-col gap-6">
          <AnimatePresence>
            {chatMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
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
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  
                  {/* Resource Cards for AI responses */}
                  {message.role === "assistant" && message.resources && message.resources.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <p className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                        Recommended Resources
                      </p>
                      {message.resources.map((resource) => (
                        <AIResourceCard key={resource.id} resource={resource} />
                      ))}
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
              className="flex gap-3"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#1d4ed8]">
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

      {/* Suggestions */}
      {chatMessages.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="px-4 pb-4"
        >
          <p className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider mb-3">
            Try asking about
          </p>
          <div className="flex flex-wrap gap-2">
            {aiSuggestions.slice(0, 6).map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSuggestionClick(suggestion[activeLanguage])}
                className="rounded-full bg-[var(--surface)] border border-[var(--border)] px-4 py-2 text-sm font-medium transition-all hover:border-[var(--border-hover)]"
              >
                {suggestion[activeLanguage]}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input */}
      <div className="px-4 pb-4">
        <div className="glass-card flex items-center gap-3 rounded-2xl p-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Ask about housing, jobs, healthcare, transit..."
            className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-[var(--foreground-muted)] focus:outline-none"
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
      
      <div className="mt-3 flex flex-wrap gap-2">
        {resource.phone && (
          <a
            href={`tel:${resource.phone}`}
            className="flex items-center gap-1 text-xs text-[#3B82F6] hover:underline"
          >
            <Phone className="w-3 h-3" />
            {resource.phone}
          </a>
        )}
        {resource.website && (
          <a
            href={resource.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-[#3B82F6] hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            Website
          </a>
        )}
      </div>
    </motion.div>
  );
}
