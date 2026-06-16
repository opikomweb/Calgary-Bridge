"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Layers, Search, MapPin } from "lucide-react";
import type { Resource, ResourceCategory } from "@/lib/types";
import { categoryLabels } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import ResourceCard from "./resource-card";

interface SimilarGroup {
  category: ResourceCategory;
  resources: Resource[];
}

interface SearchExtrasProps {
  query: string;
  similar: SimilarGroup[];
}

export default function SearchExtras({ query, similar }: SearchExtrasProps) {
  const { activeLanguage } = useAppStore();
  const [open, setOpen] = useState(false);

  const q = query.trim();
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(`${q} Calgary`)}`;
  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(`${q} Calgary`)}`;

  const totalSimilar = similar.reduce((n, g) => n + g.resources.length, 0);

  return (
    <div className="mt-8 md:mt-10 space-y-5">
      {/* ===== Similar categories accordion ===== */}
      {similar.length > 0 && (
        <div className="rounded-2xl border border-white/60 bg-[var(--card)]/85 backdrop-blur-xl shadow-lg shadow-[#0A2540]/10 overflow-hidden">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 text-left hover:bg-foreground/[0.04] transition-colors"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#1D4ED8]/[0.12] border border-[#1D4ED8]/25">
                <Layers className="h-5 w-5 text-[#1D4ED8]" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground leading-snug">
                  Want to see similar categories?
                </p>
                <p className="text-sm text-foreground/65 leading-relaxed">
                  {totalSimilar} related result{totalSimilar !== 1 ? "s" : ""} that may also help with &quot;{q}&quot;
                </p>
              </div>
            </div>
            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 text-foreground/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="px-5 md:px-6 pb-6 pt-1 space-y-6">
                  {similar.map((group) => (
                    <div key={group.category}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#1D4ED8] mb-3">
                        {categoryLabels[group.category][activeLanguage]}
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {group.resources.map((r) => (
                          <ResourceCard key={r.id} resource={r} variant="compact" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ===== Can't find it? Search live on Google / Google Maps ===== */}
      <div className="rounded-2xl border border-white/60 bg-[var(--card)]/85 backdrop-blur-xl shadow-lg shadow-[#0A2540]/10 p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-semibold text-foreground leading-snug">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <p className="text-sm text-foreground/65 leading-relaxed">
              Search live on Google or Google Maps for &quot;{q}&quot; in Calgary.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-foreground/[0.06] border border-foreground/[0.1] text-sm font-semibold text-foreground/80 hover:bg-foreground/[0.1] transition-colors"
            >
              <Search className="h-4 w-4" />
              Search Google
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-[#1D4ED8] text-white text-sm font-semibold hover:bg-[#1D4ED8]/90 transition-colors"
            >
              <MapPin className="h-4 w-4" />
              Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
