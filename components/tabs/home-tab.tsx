"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { resources, categoryLabels, translations } from "@/lib/data";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import ResourceCard from "../resource-card";
import type { ResourceCategory } from "@/lib/types";

const featuredCategories: ResourceCategory[] = ["housing", "jobs", "healthcare", "newcomer", "food", "legal"];

export default function HomeTab() {
  const { activeLanguage, searchQuery, setSearchQuery, setActiveTab } = useAppStore();
  
  const t = (key: string) => translations[key]?.[activeLanguage] || translations[key]?.en || key;
  
  const featuredResources = resources.filter(r => r.featured);
  
  const filteredResources = searchQuery
    ? resources.filter(r => 
        r.title[activeLanguage]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description[activeLanguage]?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : featuredResources;

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {t("welcome")} <span className="text-gradient-primary">{t("onePlaceLine")}</span>
        </h1>
        <p className="text-[var(--foreground-muted)] text-lg">
          Discover resources tailored to your needs
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground-muted)]" />
          <input
            type="text"
            placeholder="Search resources, services, programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-premium w-full pl-12 pr-4"
          />
        </div>
      </motion.div>

      {/* Quick Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-10"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Browse by Category</h2>
          <button 
            onClick={() => setActiveTab("explore")}
            className="text-[#0ea5e9] text-sm font-medium flex items-center gap-1 hover:underline"
          >
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {featuredCategories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab("explore")}
              className="glass-card rounded-xl p-4 text-left card-hover"
            >
              <span className="font-medium">
                {categoryLabels[category]?.[activeLanguage] || category}
              </span>
              <span className="block text-sm text-[var(--foreground-muted)] mt-1">
                {resources.filter(r => r.category.includes(category)).length} resources
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* AI Guide Promo */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setActiveTab("ai")}
        className="w-full glass-card rounded-2xl p-6 mb-10 text-left relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/10 to-transparent" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">Need help finding resources?</h3>
            <p className="text-[var(--foreground-muted)]">
              Ask Calgary Bridge AI for personalized guidance and step-by-step support.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-[var(--foreground-muted)] flex-shrink-0" />
        </div>
      </motion.button>

      {/* Featured Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">
          {searchQuery ? `Results for "${searchQuery}"` : "Featured Resources"}
        </h2>
        <div className="space-y-4">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
              >
                <ResourceCard resource={resource} />
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 text-[var(--foreground-muted)]">
              No resources found. Try a different search term.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
