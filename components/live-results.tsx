"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, Phone, ExternalLink, Globe, Loader2, Search, BadgeCheck } from "lucide-react";
import type { LivePlace } from "@/app/api/live-search/route";
import type { ResourceCategory } from "@/lib/types";

interface LiveResultsProps {
  category: ResourceCategory | "all";
  query: string;
  categoryLabel: string;
}

export default function LiveResults({ category, query, categoryLabel }: LiveResultsProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [results, setResults] = useState<LivePlace[]>([]);
  const [label, setLabel] = useState("");
  const [error, setError] = useState("");

  const canSearch = (category !== "all" && !!category) || query.trim().length >= 2;

  async function runSearch() {
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/live-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, query }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Live search failed.");
      setResults(data.results ?? []);
      setLabel(data.label ?? "");
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Live search failed.");
      setStatus("error");
    }
  }

  const subject =
    query.trim().length >= 2
      ? `"${query.trim()}"`
      : categoryLabel.toLowerCase();

  return (
    <div className="mt-10 md:mt-14">
      {/* Trigger / header */}
      <div className="rounded-2xl md:rounded-3xl border border-[#38BDF8]/20 bg-card p-5 md:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/25">
              <MapPin className="h-5 w-5 text-[#38BDF8]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg md:text-xl font-bold text-foreground leading-snug">
                Search live on Google Maps
              </h3>
              <p className="text-sm text-foreground/50 leading-relaxed max-w-md">
                Find verified, highly-rated providers for {subject} near you &mdash; pulled live and
                ranked by rating and reviews.
              </p>
            </div>
          </div>

          <button
            onClick={runSearch}
            disabled={!canSearch || status === "loading"}
            className="flex-shrink-0 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl font-semibold text-sm bg-[#E1251B] text-white hover:bg-[#B91C1C] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching&hellip;
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                {status === "done" ? "Search again" : "Search live"}
              </>
            )}
          </button>
        </div>

        {!canSearch && (
          <p className="mt-3 text-xs text-foreground/40">
            Pick a category or type a search term to enable live results.
          </p>
        )}
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-sm text-[#E1251B]"
          >
            {error}
          </motion.p>
        )}

        {status === "done" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6"
          >
            {results.length === 0 ? (
              <p className="text-sm text-foreground/45 py-6 text-center">
                No verified live matches found right now. Your curated resources above are still the
                best place to start.
              </p>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <BadgeCheck className="h-4 w-4 text-[#38BDF8]" />
                  <p className="text-sm font-medium text-foreground/70">
                    Live from Google Maps
                    <span className="text-foreground/40"> &middot; {results.length} verified result{results.length !== 1 ? "s" : ""}</span>
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                  {results.map((place, i) => (
                    <LivePlaceCard key={place.id} place={place} index={i} />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LivePlaceCard({ place, index }: { place: LivePlace; index: number }) {
  const mapsUrl =
    place.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      place.address ? `${place.name} ${place.address}` : place.name
    )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="rounded-2xl border border-foreground/[0.07] bg-foreground/[0.025] hover:bg-foreground/[0.04] hover:border-foreground/[0.12] transition-colors p-5 flex flex-col"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-semibold text-foreground leading-snug text-balance">{place.name}</h4>
        {typeof place.rating === "number" && (
          <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-foreground/[0.10] text-foreground text-xs font-semibold">
            <Star className="h-3 w-3 fill-current text-[#38BDF8]" />
            {place.rating.toFixed(1)}
          </span>
        )}
      </div>

      {(place.reviews || place.openNow !== undefined) && (
        <div className="mt-1.5 flex items-center gap-2 text-xs text-foreground/65">
          {place.reviews ? <span>{place.reviews} Google reviews</span> : null}
          {place.openNow !== undefined && (
            <>
              {place.reviews ? <span className="text-foreground/30">&middot;</span> : null}
              <span className={place.openNow ? "text-[#22C55E] font-semibold" : "text-foreground/55"}>
                {place.openNow ? "Open now" : "Closed now"}
              </span>
            </>
          )}
        </div>
      )}

      {place.address && (
        <p className="mt-3 flex items-start gap-2 text-sm text-foreground/80 leading-relaxed">
          <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-foreground/50" />
          <span>{place.address}</span>
        </p>
      )}

      <div className="mt-4 pt-4 border-t border-foreground/[0.06] flex flex-wrap items-center gap-2">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#38BDF8]/15 text-[#38BDF8] hover:bg-[#38BDF8]/25 transition-colors text-xs font-medium"
        >
          <MapPin className="h-3.5 w-3.5" />
          Directions
        </a>
        {place.phone && (
          <a
            href={`tel:${place.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground/[0.05] text-foreground/70 hover:bg-foreground/[0.08] transition-colors text-xs font-medium"
          >
            <Phone className="h-3.5 w-3.5" />
            {place.phone}
          </a>
        )}
        {place.website && (
          <a
            href={place.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground/[0.05] text-foreground/70 hover:bg-foreground/[0.08] transition-colors text-xs font-medium"
          >
            <Globe className="h-3.5 w-3.5" />
            Website
          </a>
        )}
      </div>
    </motion.div>
  );
}
