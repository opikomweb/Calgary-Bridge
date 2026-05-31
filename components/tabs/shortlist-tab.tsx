"use client";

import { useAppStore } from "@/lib/store";
import { resources, uiText, translations } from "@/lib/data";
import { Heart } from "lucide-react";
import ResourceCard from "../resource-card";

export default function ShortlistTab() {
  const { activeLanguage, bookmarkedResources } = useAppStore();

  const bookmarkedItems = resources.filter((resource) =>
    bookmarkedResources.includes(resource.id)
  );

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)] lg:min-h-[calc(100vh-80px)]">
      {/* Page Header */}
      <div className="px-5 md:px-8 pt-8 pb-4 md:pt-10 md:pb-6">
        <div className="flex items-center gap-3">
          <Heart className="h-5 w-5 md:h-6 md:w-6 text-pink-500" />
          <h2 className="text-xl md:text-2xl font-bold">
            {translations.shortlist?.[activeLanguage] || "Shortlist"}
          </h2>
          <span className="rounded-full bg-pink-500/20 px-2.5 py-1 text-sm font-semibold text-pink-500">
            {bookmarkedItems.length}
          </span>
        </div>
      </div>

      {bookmarkedItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-5 md:px-8 py-12 md:py-20">
          <div className="mb-6 flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.08]">
            <Heart className="h-10 w-10 md:h-12 md:w-12 text-[var(--foreground-muted)]" />
          </div>
          <p className="text-xl md:text-2xl font-semibold text-white/70">
            {uiText.emptyShortlist?.[activeLanguage] || "Your shortlist is empty"}
          </p>
          <p className="mt-3 text-sm md:text-base text-[var(--foreground-muted)] max-w-sm leading-relaxed">
            {uiText.emptyShortlistHint?.[activeLanguage] || "Tap the heart icon on any resource to save it here"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 md:gap-5 px-5 md:px-8 pb-24 md:pb-20">
          {bookmarkedItems.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} showNotes />
          ))}
        </div>
      )}
    </div>
  );
}
