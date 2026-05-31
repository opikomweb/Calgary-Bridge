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
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="px-8 lg:px-14 pt-14 pb-12 max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">Explore Resources</h1>
            <p className="text-xl text-[var(--foreground-muted)] max-w-2xl">
              Every verified Calgary service and program, searchable and filterable.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="px-8 lg:px-14 py-12 max-w-[1200px]">

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 flex gap-4"
      >
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--foreground-muted)]" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-16 pl-16 pr-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-lg placeholder:text-[var(--foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 focus:border-[#38BDF8] transition-all"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all ${
            showFilters || activeCategory !== "all"
              ? "bg-[#38BDF8] text-white shadow-lg shadow-sky-500/25"
              : "bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)]"
          }`}
        >
          <Filter className="w-5 h-5" />
          <span>Filter</span>
        </button>
      </motion.div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Filter by Category</h3>
            {activeCategory !== "all" && (
              <button
                onClick={() => setActiveCategory("all")}
                className="text-base text-[#38BDF8] flex items-center gap-2 hover:underline"
              >
                Clear filters <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-5 py-3 text-base font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-[#38BDF8] text-white shadow-lg shadow-sky-500/25"
                  : "bg-[var(--background)] border border-[var(--border)] hover:border-[var(--border-hover)]"
              }`}
            >
              All
            </button>
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-3 text-base font-medium transition-all ${
                  activeCategory === category
                    ? "bg-[#38BDF8] text-white shadow-lg shadow-sky-500/25"
                    : "bg-[var(--background)] border border-[var(--border)] hover:border-[var(--border-hover)]"
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
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-5 py-3 text-base font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-[#38BDF8] text-white shadow-lg shadow-sky-500/25"
                  : "bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)]"
              }`}
            >
              All
            </button>
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-3 text-base font-medium transition-all ${
                  activeCategory === category
                    ? "bg-[#38BDF8] text-white shadow-lg shadow-sky-500/25"
                    : "bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)]"
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
        className="text-base text-[var(--foreground-muted)] mb-8"
      >
        {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""} found
        {activeCategory !== "all" && ` in ${categoryLabels[activeCategory as ResourceCategory]?.[activeLanguage] || activeCategory}`}
      </motion.p>

      {/* Resources Grid — 2 columns desktop, 32px gap */}
      <div className="grid lg:grid-cols-2 gap-8 pb-16">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.025 }}
            >
              <ResourceCard resource={resource} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-2 text-center py-28">
            <div className="w-24 h-24 rounded-full bg-[var(--surface)] flex items-center justify-center mx-auto mb-8">
              <Search className="w-12 h-12 text-[var(--foreground-muted)]" />
            </div>
            <p className="text-2xl font-semibold text-[var(--foreground-muted)]">No resources found</p>
            <p className="text-lg text-[var(--foreground-muted)] mt-3">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
