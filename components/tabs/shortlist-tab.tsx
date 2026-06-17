"use client";

import { useAppStore } from "@/lib/store";
import { resources, uiText, translations } from "@/lib/data";
import { Heart, TrendingUp } from "lucide-react";
import ResourceCard from "../resource-card";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const CalgaryPulsePanel = dynamic(
  () => import("@/components/calgary-pulse-panel").then(m => ({ default: m.CalgaryPulsePanel })),
  { ssr: false }
);

export default function ShortlistTab() {
  const { activeLanguage, bookmarkedResources } = useAppStore();

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
            {translations.shortlist?.[activeLanguage] ?? translations.shortlist?.en ?? "Shortlist"}
          </h2>
          <span className="rounded-full bg-[#E1251B]/15 px-2.5 py-1 text-sm font-semibold text-[#E1251B]">
            {bookmarkedItems.length}
          </span>
        </div>
      </div>

      {/*
        Desktop: 2 cols — Calgary Pulse LEFT (col-1), saved items RIGHT (col-2)
        Mobile:  single col DOM order — saved items FIRST, Calgary Pulse LAST
      */}
      <div className="px-5 md:px-8 grid lg:grid-cols-[360px_1fr] xl:grid-cols-[400px_1fr] gap-6 lg:gap-8 items-start">

        {/* Saved items — first in DOM (top on mobile, right col on desktop) */}
        <div className="lg:col-start-2 lg:row-start-1">
          {bookmarkedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-foreground/[0.06] border border-foreground/[0.08]">
                <Heart className="h-7 w-7 text-[var(--foreground-muted)]" />
              </div>
              <p className="text-base font-semibold text-foreground/70">
                {uiText.emptyShortlist?.[activeLanguage] ?? uiText.emptyShortlist?.en}
              </p>
              <p className="mt-1.5 text-sm text-[var(--foreground-muted)] max-w-xs leading-relaxed">
                {uiText.emptyShortlistHint?.[activeLanguage] ?? uiText.emptyShortlistHint?.en}
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

        {/* Calgary Pulse — second in DOM (bottom on mobile, left col on desktop) */}
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-start-1 lg:row-start-1 lg:sticky lg:top-4"
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
