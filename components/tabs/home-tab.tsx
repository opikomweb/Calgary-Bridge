"use client";

import { useAppStore } from "@/lib/store";
import { resources, roleLabels, uiText } from "@/lib/data";
import type { UserRole } from "@/lib/types";
import { Search } from "lucide-react";
import ResourceCard from "../resource-card";

const categories: (UserRole | "all")[] = ["all", "newcomer", "senior", "business", "ngo", "creator"];

export default function HomeTab() {
  const { activeLanguage, activeCategory, setActiveCategory, searchQuery, setSearchQuery } =
    useAppStore();

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      activeCategory === "all" || resource.category.includes(activeCategory);
    const matchesSearch =
      searchQuery === "" ||
      resource.title[activeLanguage].toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description[activeLanguage].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Search Bar */}
      <div className="glass-light relative rounded-xl">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={uiText.search[activeLanguage]}
          className="w-full rounded-xl bg-transparent py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Category Chips */}
      <div className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "glass-light hover:bg-white/10"
            }`}
          >
            {category === "all"
              ? "All"
              : roleLabels[category][activeLanguage]}
          </button>
        ))}
      </div>

      {/* Resources List */}
      <div className="flex flex-col gap-3">
        {filteredResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">No resources found</p>
        </div>
      )}
    </div>
  );
}
