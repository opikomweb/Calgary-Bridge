"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { resources, categoryLabels } from "@/lib/data";
import { Search, Filter, X } from "lucide-react";
import ResourceCard from "../resource-card";
import type { ResourceCategory } from "@/lib/types";

const allCategories: ResourceCategory[] = [
  "housing", "jobs", "food", "mental-health", "healthcare", "newcomer",
  "family", "senior", "disability", "transit", "education", "legal",
  "business", "volunteering", "emergency", "community"
];

export default function ExploreTab() {
  const { activeLanguage, activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useAppStore();
  const [showFilters, setShowFilters] = useState(false);

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = activeCategory === "all" || resource.category.includes(activeCategory as ResourceCategory);
    const matchesSearch =
      searchQuery === "" ||
      resource.title[activeLanguage]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description[activeLanguage]?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold mb-2">Explore Resources</h1>
        <p className="text-[var(--foreground-muted)]">
          Browse all available resources and services
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--foreground-muted)]" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-premium w-full pl-12 pr-4"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
            showFilters || activeCategory !== "all"
              ? "bg-[#3B82F6] text-white"
              : "bg-[var(--surface)] border border-[var(--border)]"
          }`}
        >
          <Filter className="w-5 h-5" />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </motion.div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Filter by Category</h3>
            {activeCategory !== "all" && (
              <button
                onClick={() => setActiveCategory("all")}
                className="text-sm text-[#3B82F6] flex items-center gap-1"
              >
                Clear filters <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-[#3B82F6] text-white"
                  : "bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)]"
              }`}
            >
              All
            </button>
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-[#3B82F6] text-white"
                    : "bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)]"
                }`}
              >
                {categoryLabels[category]?.[activeLanguage] || category}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Category Pills (horizontal scroll when filters closed) */}
      {!showFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 -mx-4 px-4"
        >
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-[#3B82F6] text-white"
                  : "bg-[var(--surface)] border border-[var(--border)]"
              }`}
            >
              All
            </button>
            {allCategories.slice(0, 8).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-[#3B82F6] text-white"
                    : "bg-[var(--surface)] border border-[var(--border)]"
                }`}
              >
                {categoryLabels[category]?.[activeLanguage] || category}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Results Count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-[var(--foreground-muted)] mb-4"
      >
        {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""} found
        {activeCategory !== "all" && ` in ${categoryLabels[activeCategory as ResourceCategory]?.[activeLanguage] || activeCategory}`}
      </motion.p>

      {/* Resources Grid */}
      <div className="space-y-4">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <ResourceCard resource={resource} />
            </motion.div>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-[var(--foreground-muted)] text-lg">No resources found</p>
            <p className="text-sm text-[var(--foreground-muted)] mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
