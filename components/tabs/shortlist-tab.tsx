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
    <div className="flex flex-col">
      {/* Page Header */}
      <div className="px-5 md:px-8 pt-6 pb-4 md:pt-10 md:pb-6">
        <div className="flex items-center gap-3">
          <Heart className="h-5 w-5 md:h-6 md:w-6 text-[#E1251B]" />
          <h2 className="text-xl md:text-2xl font-bold">
            {translations.shortlist?.[activeLanguage] ?? translations.shortlist?.en ?? "Shortlist"}
          </h2>
          <span className="rounded-full bg-[#E1251B]/15 px-2.5 py-1 text-sm font-semibold text-[#E1251B]">
            {bookmarkedItems.length}
          </span>
        </div>
      </div>

      {bookmarkedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center px-5 md:px-8 py-12 md:py-16">
          <div className="mb-5 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-foreground/[0.06] border border-foreground/[0.08]">
            <Heart className="h-8 w-8 md:h-10 md:w-10 text-[var(--foreground-muted)]" />
          </div>
          <p className="text-lg md:text-2xl font-semibold text-foreground/70">
            {uiText.emptyShortlist?.[activeLanguage] ?? uiText.emptyShortlist?.en}
          </p>
          <p className="mt-2 text-sm md:text-base text-[var(--foreground-muted)] max-w-sm leading-relaxed">
            {uiText.emptyShortlistHint?.[activeLanguage] ?? uiText.emptyShortlistHint?.en}
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
