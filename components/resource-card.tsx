"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { categoryLabels } from "@/lib/data";
import { translateBatch } from "@/lib/translate";
import type { Resource, Language, LocalizedString } from "@/lib/types";
import {
  Heart,
  Phone,
  MapPin,
  ExternalLink,
  Check,
  Star,
  Clock,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Gem,
  CheckCircle,
  Calendar,
  Users,
  Flag,
  Building2,
  MoreHorizontal,
} from "lucide-react";

interface ResourceCardProps {
  resource: Resource;
  showNotes?: boolean;
  variant?: "default" | "compact" | "detailed";
  onReport?: (resourceId: string) => void;
  onClaimBusiness?: (resourceId: string) => void;
}

/**
 * Resolves a LocalizedString for the active language.
 * Falls back to English when a translation isn't available yet.
 */
function resolveField(record: LocalizedString, lang: Language): string {
  return record[lang] ?? record.en;
}


const costLabels: Record<string, { label: string; color: string }> = {
  free:           { label: "Free",          color: "text-white bg-emerald-600 dark:bg-emerald-500" },
  "low-cost":     { label: "Low Cost",      color: "text-white bg-emerald-600 dark:bg-emerald-500" },
  "sliding-scale":{ label: "Sliding Scale", color: "text-white bg-amber-500" },
  paid:           { label: "Paid",          color: "text-white bg-[#E1251B]" },
};

export default function ResourceCard({
  resource,
  showNotes = false,
  variant = "default",
  onReport,
  onClaimBusiness,
}: ResourceCardProps) {
  // Cards start collapsed — user taps to reveal full details
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const {
    activeLanguage,
    bookmarkedResources,
    toggleBookmark,
    resourceNotes,
    setResourceNote,
    toggleResourceComplete,
  } = useAppStore();

  const isBookmarked = bookmarkedResources.includes(resource.id);
  const note = resourceNotes[resource.id];
  const isCompleted = note?.completed ?? false;

  // ── Runtime translation ────────────────────────────────────────────────
  // Title and description start with the best available static translation.
  // When the user selects a language that has no static entry, the Google
  // Translate API fills it in asynchronously.
  const [title, setTitle] = useState(() => resolveField(resource.title, activeLanguage));
  const [description, setDescription] = useState(() => resolveField(resource.description, activeLanguage));
  // Eligibility uses a ref+state pair so it's always accessible regardless of
  // TS control-flow narrowing around the compact variant early return.
  const [eligibilityText, setEligibilityText] = useState(
    () => resource.eligibility ? resolveField(resource.eligibility, activeLanguage) : ""
  );

  useEffect(() => {
    let cancelled = false;
    const sourceTitle = resource.title.en;
    const sourceDesc  = resource.description.en;
    const sourceElig  = resource.eligibility?.en ?? "";

    // Use static translation if available for this language
    const staticTitle = resolveField(resource.title, activeLanguage);
    const staticDesc  = resolveField(resource.description, activeLanguage);
    const staticElig  = resource.eligibility
      ? resolveField(resource.eligibility, activeLanguage)
      : "";

    const needsTitle = staticTitle === sourceTitle && activeLanguage !== "en";
    const needsDesc  = staticDesc  === sourceDesc  && activeLanguage !== "en";
    const needsElig  = sourceElig && staticElig === sourceElig && activeLanguage !== "en";

    // Set static values immediately
    setTitle(staticTitle);
    setDescription(staticDesc);
    if (resource.eligibility) setEligibilityText(staticElig);

    // Batch-translate anything that still needs it
    const toTranslate: string[] = [];
    const indices: ("title" | "desc" | "elig")[] = [];
    if (needsTitle) { toTranslate.push(sourceTitle); indices.push("title"); }
    if (needsDesc)  { toTranslate.push(sourceDesc);  indices.push("desc");  }
    if (needsElig && sourceElig)  { toTranslate.push(sourceElig);  indices.push("elig");  }

    if (toTranslate.length > 0) {
      translateBatch(toTranslate, activeLanguage).then((results) => {
        if (cancelled) return;
        results.forEach((r, i) => {
          if (indices[i] === "title") setTitle(r);
          if (indices[i] === "desc")  setDescription(r);
          if (indices[i] === "elig")  setEligibilityText(r);
        });
      });
    }

    return () => { cancelled = true; };
  }, [activeLanguage, resource.id]);

  const googleMapsUrl = resource.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.address)}`
    : null;

  const hasExtraDetails =
    resource.servicesOffered?.length || resource.eligibility || resource.hours || resource.languages?.length;

  // ── Compact variant (used in shortlist summary, etc.) ──────────────────
  if (variant === "compact") {
    return (
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ duration: 0.15 }}
      className={`group relative overflow-hidden rounded-xl bg-card border border-border/60 hover:border-foreground/20 hover:shadow-sm transition-all duration-200 w-full ${
        isCompleted && showNotes ? "opacity-60" : ""
      }`}
    >
      <button
        className="w-full text-left"
        onClick={() => setIsExpanded((v) => !v)}
      >
        <div className="flex items-center gap-2 px-3 py-3 min-w-0">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground leading-snug mb-1">
              {title}
            </p>
            <div className="flex flex-wrap gap-1">
              {resource.category.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="px-1.5 py-px rounded text-[10px] font-medium bg-[#1D4ED8]/10 dark:bg-sky-500/15 text-[#1D4ED8] dark:text-sky-400 leading-tight"
                >
                  {categoryLabels[cat]?.[activeLanguage] || cat}
                </span>
              ))}
              {resource.hiddenGem && (
                <span className="px-1.5 py-px rounded text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center gap-0.5 leading-tight">
                  <Gem className="w-2.5 h-2.5" />
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-0.5 flex-shrink-0 self-start pt-0.5">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={(e) => { e.stopPropagation(); toggleBookmark(resource.id); }}
              className={`rounded-lg p-1.5 transition-all ${
                isBookmarked
                  ? "text-[#E1251B]"
                  : "text-foreground/30 hover:text-foreground/60"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${isBookmarked ? "fill-current" : ""}`} />
            </motion.button>
            <ChevronDown
              className={`h-4 w-4 text-foreground/25 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </button>

        {/* Expanded detail */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 border-t border-foreground/[0.06] pt-3 space-y-3">
                <p className="text-xs text-foreground/60 leading-relaxed">
                  {resource.summary?.[activeLanguage] || description}
                </p>
                {resource.cost && (
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${costLabels[resource.cost]?.color || ""}`}>
                    <DollarSign className="w-3 h-3" />
                    {costLabels[resource.cost]?.label || resource.cost}
                  </span>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {resource.phone && (
                    <a href={`tel:${resource.phone}`} className="flex items-center gap-1 rounded-lg bg-[#1D4ED8] px-2.5 py-1.5 text-xs font-semibold text-white active:scale-95">
                      <Phone className="h-3 w-3" /> Call
                    </a>
                  )}
                  {googleMapsUrl && (
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Maps" className="flex items-center justify-center rounded-lg bg-foreground/[0.06] border border-foreground/[0.08] p-1.5 text-foreground active:scale-95">
                      <MapPin className="h-3 w-3" />
                    </a>
                  )}
                  {resource.website && (
                    <a href={resource.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-lg bg-foreground/[0.06] border border-foreground/[0.08] px-2.5 py-1.5 text-xs font-semibold text-foreground active:scale-95">
                      <ExternalLink className="h-3 w-3" /> Website
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // ── Default / full variant ─────────────────────────────────────────────
  // Collapsed: [tags inline · title] fills the row, [heart · chevron] right
  // Expanded:  description, cost, phone, address, actions, extra details
  return (
    <motion.div
      transition={{ duration: 0.15 }}
      className={`group relative overflow-hidden rounded-xl bg-card border border-border/60 hover:border-foreground/20 hover:shadow-sm transition-all duration-200 w-full ${
        isCompleted && showNotes ? "opacity-60" : ""
      }`}
    >
      {/* ── Collapsed header ── */}
      <button
        className="w-full text-left"
        onClick={() => setIsExpanded((v) => !v)}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2 px-3 py-3 min-w-0">
          {/* Left: title + inline tags badge row */}
          <div className="flex-1 min-w-0">
            {/* Title — full width, wraps naturally */}
            <h3 className="font-semibold text-sm leading-snug text-foreground mb-1">
              {title}
            </h3>
            {/* Tags row — sit below title, flush left, no indent */}
            <div className="flex flex-wrap gap-1">
              {resource.category.slice(0, 3).map((cat) => (
                <span
                  key={cat}
                  className="px-1.5 py-px rounded text-[10px] font-medium bg-[#1D4ED8]/10 dark:bg-sky-500/15 text-[#1D4ED8] dark:text-sky-400 leading-tight"
                >
                  {categoryLabels[cat]?.[activeLanguage] || cat}
                </span>
              ))}
              {resource.featured && (
                <span className="px-1.5 py-px rounded text-[10px] font-semibold bg-[#E1251B]/10 text-[#E1251B] leading-tight flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-current" />
                </span>
              )}
              {resource.hiddenGem && (
                <span className="px-1.5 py-px rounded text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 leading-tight flex items-center gap-0.5">
                  <Gem className="w-2.5 h-2.5" />
                </span>
              )}
            </div>
          </div>

          {/* Right: heart + chevron — always flush right, never grow */}
          <div className="flex items-center gap-0.5 flex-shrink-0 self-start pt-0.5">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={(e) => { e.stopPropagation(); toggleBookmark(resource.id); }}
              className={`rounded-lg p-1.5 transition-all ${
                isBookmarked
                  ? "text-[#E1251B]"
                  : "text-foreground/30 hover:text-foreground/60"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${isBookmarked ? "fill-current" : ""}`} />
            </motion.button>
            <ChevronDown
              className={`h-4 w-4 text-foreground/25 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </button>

      {/* ── Expanded content ── */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-foreground/[0.06] pt-3 space-y-3">
              {/* Description */}
              <p className="text-xs md:text-sm text-[var(--foreground-muted)] leading-relaxed">
                {description}
              </p>

              {/* Cost + Hours */}
              {(resource.cost || resource.hours) && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {resource.cost && (
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${costLabels[resource.cost]?.color || ""}`}>
                      <DollarSign className="w-3 h-3" />
                      {costLabels[resource.cost]?.label || resource.cost}
                    </span>
                  )}
                  {resource.hours && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-foreground/[0.06] text-[var(--foreground-muted)]">
                      <Clock className="w-3 h-3" />
                      <span className="truncate max-w-[140px]">{resource.hours}</span>
                    </span>
                  )}
                </div>
              )}

              {/* Phone + Address */}
              {(resource.phone || resource.address) && (
                <div className="flex flex-col gap-1">
                  {resource.phone && (
                    <a href={`tel:${resource.phone}`} className="flex items-center gap-1.5 text-xs font-semibold text-[#E1251B] hover:underline">
                      <Phone className="w-3 h-3 flex-shrink-0" />
                      {resource.phone}
                    </a>
                  )}
                  {resource.address && (
                    <span className="flex items-start gap-1.5 text-xs text-foreground/70">
                      <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">{resource.address}</span>
                    </span>
                  )}
                </div>
              )}

              {/* Show more extra details */}
              {hasExtraDetails && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); /* extra details toggled below */ }}
                    className="flex items-center gap-1.5 text-xs text-[#1D4ED8] dark:text-sky-400 font-semibold hover:underline"
                    // handled by a nested inner state — see ExtraDetails below
                  />
                  <ExtraDetails resource={resource} activeLanguage={activeLanguage} eligibilityText={eligibilityText} />
                </>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {resource.phone && (
                  <a href={`tel:${resource.phone}`} className="flex items-center gap-1.5 rounded-lg bg-[#1D4ED8] px-3 py-2 text-xs font-bold text-white hover:bg-[#1e40af] active:scale-95 transition-all">
                    <Phone className="h-3.5 w-3.5" /> Call
                  </a>
                )}
                {googleMapsUrl && (
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Maps" className="flex items-center justify-center rounded-lg bg-foreground/[0.06] border border-foreground/[0.08] p-2 text-foreground hover:bg-foreground/[0.1] active:scale-95 transition-all">
                    <MapPin className="h-3.5 w-3.5" />
                  </a>
                )}
                {resource.website && (
                  <a href={resource.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-lg bg-foreground/[0.06] border border-foreground/[0.08] px-3 py-2 text-xs font-semibold text-foreground hover:bg-foreground/[0.1] active:scale-95 transition-all">
                    <ExternalLink className="h-3.5 w-3.5" /> Website
                  </a>
                )}
                {/* Context menu */}
                <div className="relative ml-auto">
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
                    className="flex items-center justify-center rounded-lg bg-foreground/[0.06] border border-foreground/[0.08] p-2 text-[var(--foreground-muted)] hover:bg-foreground/[0.1] active:scale-95 transition-all"
                  >
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                  <AnimatePresence>
                    {showMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -6 }}
                        className="absolute right-0 top-full mt-1.5 w-44 rounded-xl bg-popover border border-border shadow-xl overflow-hidden z-20"
                      >
                        <button
                          onClick={() => { onClaimBusiness?.(resource.id); setShowMenu(false); }}
                          className="w-full flex items-center gap-2.5 px-4 py-3 text-left text-sm text-foreground/70 hover:bg-foreground/[0.06] hover:text-foreground transition-colors"
                        >
                          <Building2 className="w-4 h-4" /> Claim this business
                        </button>
                        <button
                          onClick={() => { onReport?.(resource.id); setShowMenu(false); }}
                          className="w-full flex items-center gap-2.5 px-4 py-3 text-left text-sm text-foreground/70 hover:bg-foreground/[0.06] hover:text-foreground transition-colors border-t border-foreground/[0.06]"
                        >
                          <Flag className="w-4 h-4" /> Report an issue
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Notes (shortlist only) */}
              {showNotes && (
                <div className="pt-3 border-t border-foreground/[0.08]">
                  <div className="flex items-center gap-3 mb-3">
                    <button
                      onClick={() => toggleResourceComplete(resource.id)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all active:scale-95 ${
                        isCompleted
                          ? "bg-[#1D4ED8]/20 text-[#1D4ED8]"
                          : "bg-foreground/[0.06] border border-foreground/[0.08] text-[var(--foreground-muted)] hover:text-foreground"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${isCompleted ? "border-sky-400 bg-sky-400" : "border-[var(--foreground-muted)]"}`}>
                        {isCompleted && <Check className="w-3 h-3 text-white" />}
                      </div>
                      Mark as done
                    </button>
                  </div>
                  <textarea
                    value={note?.note ?? ""}
                    onChange={(e) => setResourceNote(resource.id, e.target.value)}
                    placeholder="Add personal notes..."
                    className="w-full rounded-xl bg-foreground/[0.04] border border-foreground/[0.08] p-3 text-sm placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all resize-none"
                    rows={3}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Extra expandable details nested inside an already-expanded card
function ExtraDetails({ resource, activeLanguage, eligibilityText }: { 
  resource: Resource; 
  activeLanguage: Language;
  eligibilityText: string;
}) {
  const [open, setOpen] = useState(false);
  const has = resource.servicesOffered?.length || resource.eligibility || resource.languages?.length || resource.lastUpdated || resource.source;
  if (!has) return null;
  return (
    <div>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
        className="flex items-center gap-1 text-xs text-[#1D4ED8] dark:text-sky-400 font-semibold hover:underline"
      >
        {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        {open ? "Show less" : "Show more details"}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-3">
              {resource.servicesOffered && resource.servicesOffered.length > 0 && (
                <div>
                  <p className="text-xs font-bold mb-1.5 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#1D4ED8]" /> Services Offered
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {resource.servicesOffered.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg text-[10px] bg-foreground/[0.06] text-[var(--foreground-muted)] border border-foreground/[0.06]">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {resource.eligibility && (
                <div>
                  <p className="text-xs font-bold mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#1D4ED8]" /> Eligibility
                  </p>
                  <p className="text-xs text-[var(--foreground-muted)] bg-foreground/[0.04] rounded-lg p-2 border border-foreground/[0.06]">
                    {eligibilityText || resolveField(resource.eligibility, activeLanguage)}
                  </p>
                </div>
              )}
              {resource.languages && resource.languages.length > 0 && (
                <p className="text-xs text-[var(--foreground-muted)]">
                  <span className="font-semibold">Languages:</span> {resource.languages.join(", ")}
                </p>
              )}
              {(resource.lastUpdated || resource.source) && (
                <div className="flex flex-wrap gap-3 text-[10px] text-[var(--foreground-muted)]">
                  {resource.lastUpdated && (
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Updated: {resource.lastUpdated}</span>
                  )}
                  {resource.source && <span>Source: {resource.source}</span>}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
