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
    <div className="flex flex-col min-h-[calc(100vh-120px)]">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-pink-500" />
          <h2 className="text-lg font-semibold">
            {translations.shortlist?.[activeLanguage] || "Shortlist"}
          </h2>
          <span className="rounded-full bg-pink-500/20 px-2 py-0.5 text-sm text-pink-500">
            {bookmarkedItems.length}
          </span>
        </div>
      </div>

      {bookmarkedItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.08]">
            <Heart className="h-10 w-10 text-[var(--foreground-muted)]" />
          </div>
          <p className="text-xl font-medium text-white/70">
            {uiText.emptyShortlist?.[activeLanguage] || "Your shortlist is empty"}
          </p>
          <p className="mt-3 text-base text-[var(--foreground-muted)] max-w-sm">
            {uiText.emptyShortlistHint?.[activeLanguage] || "Tap the heart icon on any resource to save it here"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 p-4 pt-0">
          {bookmarkedItems.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} showNotes />
          ))}
        </div>
      )}
    </div>
  );
}
