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
    <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-2">
        <Heart className="h-5 w-5 text-pink-500" />
        <h2 className="text-lg font-semibold">
          {translations.shortlist?.[activeLanguage] || "Shortlist"}
        </h2>
        <span className="rounded-full bg-pink-500/20 px-2 py-0.5 text-sm text-pink-500">
          {bookmarkedItems.length}
        </span>
      </div>

      {bookmarkedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
            <Heart className="h-8 w-8 text-[var(--foreground-muted)]" />
          </div>
          <p className="text-[var(--foreground-muted)]">
            {uiText.emptyShortlist?.[activeLanguage] || "Your shortlist is empty"}
          </p>
          <p className="mt-2 text-sm text-[var(--foreground-muted)]">
            {uiText.emptyShortlistHint?.[activeLanguage] || "Tap the heart icon on any resource to save it here"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {bookmarkedItems.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} showNotes />
          ))}
        </div>
      )}
    </div>
  );
}
