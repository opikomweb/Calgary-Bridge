"use client";

import { useAppStore } from "@/lib/store";
import { resources } from "@/lib/data";
import { useTranslations, registerStrings } from "@/lib/translation-context";

registerStrings(
  "Shortlist",
  "Your shortlist is empty",
  "Tap the heart icon on any resource to save it here",
);

export default function ShortlistTab() {
  const { activeLanguage, bookmarkedResources } = useAppStore();
  const tx = useTranslations({
    title: "Shortlist",
    empty: "Your shortlist is empty",
    emptyHint: "Tap the heart icon on any resource to save it here",
  });

  const bookmarkedItems = resources.filter((resource) =>
    bookmarkedResources.includes(resource.id)
  );

  return (
    <div className="pb-6">
      {/* Page Header */}
      <div className="px-5 md:px-8 pt-6 pb-4 md:pt-8 md:pb-5">
        <div className="flex items-center gap-3">
          <Heart className="h-5 w-5 text-[#E1251B]" />
          <h2 className="text-xl font-bold">
            {tx.title}
          </h2>
          <span className="rounded-full bg-[#E1251B]/15 px-2.5 py-1 text-sm font-semibold text-[#E1251B]">
            {bookmarkedItems.length}
          </span>
        </div>
      </div>

      {/*
        Desktop: flex row — Calgary Pulse LEFT, saved items RIGHT
        Mobile:  flex col — saved items FIRST (top), Calgary Pulse LAST (bottom)
        The `order` utilities achieve this without fighting CSS grid auto-placement.
      */}
      <div className="px-5 md:px-8 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

        {/* Saved items — order-1 on mobile (top), order-2 on desktop (right) */}
        <div className="w-full lg:flex-1 order-1 lg:order-2">
          {bookmarkedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-foreground/[0.06] border border-foreground/[0.08]">
                <Heart className="h-7 w-7 text-[var(--foreground-muted)]" />
              </div>
              <p className="text-base font-semibold text-foreground/70">
                {tx.empty}
              </p>
              <p className="mt-1.5 text-sm text-[var(--foreground-muted)] max-w-xs leading-relaxed">
                {tx.emptyHint}
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

        {/* Calgary Pulse — order-2 on mobile (bottom), order-1 on desktop (left) */}
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="w-full lg:w-[360px] xl:w-[400px] flex-shrink-0 order-2 lg:order-1 lg:sticky lg:top-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-[#1D4ED8]" />
            <h2 className="text-sm font-bold">Calgary Pulse</h2>
          </div>
          <CalgaryPulsePanel />
        </motion.aside>
      </div>
    </div>
  );
}
