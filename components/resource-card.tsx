"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { categoryLabels } from "@/lib/data";
import type { Resource } from "@/lib/types";
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
  MoreHorizontal
} from "lucide-react";

interface ResourceCardProps {
  resource: Resource;
  showNotes?: boolean;
  variant?: "default" | "compact" | "detailed";
  onReport?: (resourceId: string) => void;
  onClaimBusiness?: (resourceId: string) => void;
}

const costLabels: Record<string, { label: string; color: string }> = {
  "free":          { label: "Free",          color: "text-white bg-emerald-600 dark:bg-emerald-500" },
  "low-cost":      { label: "Low Cost",      color: "text-white bg-emerald-600 dark:bg-emerald-500" },
  "sliding-scale": { label: "Sliding Scale", color: "text-white bg-amber-500" },
  "paid":          { label: "Paid",          color: "text-white bg-[#E1251B]" },
};

export default function ResourceCard({ resource, showNotes = false, variant = "default", onReport, onClaimBusiness }: ResourceCardProps) {
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

  const googleMapsUrl = resource.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.address)}`
    : null;

  const hasExtraDetails = resource.servicesOffered?.length || resource.eligibility || resource.hours || resource.languages?.length;

  if (variant === "compact") {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className={`group relative overflow-hidden rounded-2xl md:rounded-3xl bg-card border border-border hover:border-foreground/20 p-4 md:p-6 lg:p-8 transition-all duration-400 shadow-lg w-full ${isCompleted && showNotes ? "opacity-60" : ""}`}
      >
        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#1D4ED8]/5 via-transparent to-transparent" />
        
        <div className="relative z-10 w-full min-w-0">
          {/* Header Row: Tags + Actions */}
          <div className="flex items-start justify-between gap-2 mb-3">
            {/* Category Tags - Horizontal */}
            <div className="flex flex-wrap gap-1 md:gap-1.5 min-w-0 flex-1">
              {resource.category.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-xs font-semibold bg-[#1D4ED8]/12 dark:bg-sky-500/15 text-[#1D4ED8] dark:text-sky-400 max-w-[120px] truncate"
                >
                  {categoryLabels[cat]?.[activeLanguage] || cat}
                </span>
              ))}
              {resource.hiddenGem && (
                <span className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-xs font-semibold bg-[#E1251B]/12 text-[#E1251B] flex items-center gap-1">
                  <Gem className="w-2.5 h-2.5 md:w-3 md:h-3 flex-shrink-0" />
                  <span className="hidden sm:inline">Hidden Gem</span>
                </span>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleBookmark(resource.id)}
                className={`rounded-lg p-2 transition-all ${
                  isBookmarked
                    ? "bg-[#E1251B]/15 text-[#E1251B]"
                    : "bg-foreground/[0.06] text-[var(--foreground-muted)] hover:text-foreground hover:bg-foreground/[0.1]"
                }`}
              >
                <Heart className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              </motion.button>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMenu(!showMenu)}
                  className="rounded-lg p-2 bg-foreground/[0.06] text-[var(--foreground-muted)] hover:text-foreground hover:bg-foreground/[0.1] transition-all"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </motion.button>
                
                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -8 }}
                      className="absolute right-0 top-full mt-2 w-44 rounded-xl bg-popover border border-border shadow-2xl overflow-hidden z-20"
                    >
                      <button
                        onClick={() => { onClaimBusiness?.(resource.id); setShowMenu(false); }}
                        className="w-full flex items-center gap-2.5 px-4 py-3 text-left text-sm text-foreground/70 hover:bg-foreground/[0.06] hover:text-foreground transition-colors"
                      >
                        <Building2 className="w-4 h-4 flex-shrink-0" />
                        Claim this business
                      </button>
                      <button
                        onClick={() => { onReport?.(resource.id); setShowMenu(false); }}
                        className="w-full flex items-center gap-2.5 px-4 py-3 text-left text-sm text-foreground/70 hover:bg-foreground/[0.06] hover:text-foreground transition-colors border-t border-foreground/[0.06]"
                      >
                        <Flag className="w-4 h-4 flex-shrink-0" />
                        Report an issue
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base md:text-xl lg:text-2xl mb-2 leading-tight text-foreground break-words">
            {resource.title[activeLanguage]}
          </h3>
          
          {/* Description — break-words prevents overflow on narrow screens */}
          <p className="text-foreground/60 text-xs md:text-sm lg:text-base leading-relaxed mb-3 break-words">
            {resource.summary?.[activeLanguage] || resource.description[activeLanguage]}
          </p>

          {/* Cost Badge */}
          {resource.cost && (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-xs font-semibold mb-3 ${costLabels[resource.cost]?.color || ""}`}>
              <DollarSign className="w-3 h-3" />
              {costLabels[resource.cost]?.label || resource.cost}
            </span>
          )}

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {resource.phone && (
              <a
                href={`tel:${resource.phone}`}
                className="flex items-center gap-1.5 rounded-xl bg-[#1D4ED8] dark:bg-sky-500/15 px-3 py-2 text-xs md:text-sm font-semibold text-white dark:text-sky-400 transition-all hover:bg-[#1e40af] active:scale-95"
              >
                <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                Call
              </a>
            )}
            {googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open in Maps"
                className="flex items-center justify-center rounded-xl bg-foreground/[0.06] border border-foreground/[0.08] p-2 md:p-2.5 text-foreground transition-all hover:bg-foreground/[0.1] active:scale-95"
              >
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              </a>
            )}
            {resource.mapUrl && (
              <a
                href={resource.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Search on Maps"
                className="flex items-center justify-center rounded-xl bg-foreground/[0.06] border border-foreground/[0.08] p-2 md:p-2.5 text-foreground transition-all hover:bg-foreground/[0.1] active:scale-95"
              >
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              </a>
            )}
            {resource.website && (
              <a
                href={resource.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-foreground/[0.06] border border-foreground/[0.08] px-3 py-2 text-xs md:text-sm font-semibold text-foreground transition-all hover:bg-foreground/[0.1] active:scale-95"
              >
                <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
                Website
              </a>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Default full variant
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden rounded-2xl md:rounded-3xl bg-card border border-border hover:border-foreground/20 p-4 md:p-6 lg:p-8 transition-all duration-400 shadow-xl w-full ${isCompleted && showNotes ? "opacity-60" : ""}`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#1D4ED8]/5 via-transparent to-transparent" />
      
      <div className="relative z-10 w-full min-w-0">
        {/* Header Row: Tags + Heart Icon */}
        <div className="flex items-start justify-between gap-3 mb-4">
          {/* Category Tags */}
          <div className="flex flex-wrap gap-1.5 md:gap-2 min-w-0">
            {resource.category.slice(0, 3).map((cat) => (
              <span
                key={cat}
                  className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-semibold bg-[#1D4ED8]/12 dark:bg-sky-500/15 text-[#1D4ED8] dark:text-sky-400 truncate"
              >
                {categoryLabels[cat]?.[activeLanguage] || cat}
              </span>
            ))}
            {resource.featured && (
              <span className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-semibold bg-[#E1251B]/12 text-[#E1251B] flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                <span className="hidden sm:inline">Featured</span>
              </span>
            )}
            {resource.hiddenGem && (
              <span className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-semibold bg-[#E1251B]/12 text-[#E1251B] flex items-center gap-1">
                <Gem className="w-3 h-3" />
                <span className="hidden sm:inline">Hidden Gem</span>
              </span>
            )}
          </div>

          {/* Heart Bookmark */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleBookmark(resource.id)}
            className={`flex-shrink-0 rounded-lg md:rounded-xl p-2 md:p-2.5 transition-all ${
              isBookmarked
                ? "bg-[#E1251B]/15 text-[#E1251B]"
                : "bg-foreground/[0.06] text-[var(--foreground-muted)] hover:text-foreground hover:bg-foreground/[0.1]"
            }`}
          >
            <Heart className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
          </motion.button>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base md:text-xl lg:text-2xl mb-2 md:mb-3 leading-tight text-foreground break-words">
          {resource.title[activeLanguage]}
        </h3>
        
        {/* Description */}
        <p className="text-[var(--foreground-muted)] text-xs md:text-sm lg:text-base leading-relaxed break-words">
          {resource.description[activeLanguage]}
        </p>

        {/* Cost and Hours Row */}
        {(resource.cost || resource.hours) && (
          <div className="mt-4 flex flex-wrap items-center gap-2 md:gap-3">
            {resource.cost && (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-bold ${costLabels[resource.cost]?.color || ""}`}>
                <DollarSign className="w-3.5 h-3.5" />
                {costLabels[resource.cost]?.label || resource.cost}
              </span>
            )}
            {resource.hours && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-medium bg-foreground/[0.06] text-[var(--foreground-muted)]">
                <Clock className="w-3.5 h-3.5" />
                <span className="truncate max-w-[150px]">{resource.hours}</span>
              </span>
            )}
          </div>
        )}

          {(resource.phone || resource.address) && (
            <div className="mt-3 md:mt-4 flex flex-col gap-1.5 md:gap-2">
              {resource.phone && (
                <a
                  href={`tel:${resource.phone}`}
                  className="flex items-center gap-2 text-xs md:text-sm font-semibold text-[#E1251B] hover:underline"
                >
                  <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                  <span>{resource.phone}</span>
                </a>
              )}
              {resource.address && (
                <span className="flex items-start gap-2 min-w-0 text-xs md:text-sm text-foreground/70">
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0 mt-0.5" />
                  <span className="break-words">{resource.address}</span>
                </span>
              )}
            </div>
          )}

        {/* Expandable Details Section */}
        {hasExtraDetails && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-6 flex items-center gap-2 text-base text-[#1D4ED8] dark:text-sky-400 hover:text-[#1e40af] dark:hover:text-sky-300 transition-colors font-semibold"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-5 h-5" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5" />
                  Show more details
                </>
              )}
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pt-6 border-t border-foreground/[0.08] space-y-6">
                    {/* Services Offered */}
                    {resource.servicesOffered && resource.servicesOffered.length > 0 && (
                      <div>
                        <h4 className="text-base font-bold mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-[#1D4ED8] dark:text-sky-400" />
                          Services Offered
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {resource.servicesOffered.map((service, idx) => (
                            <span
                              key={idx}
                              className="px-4 py-2 rounded-xl text-sm bg-foreground/[0.06] text-[var(--foreground-muted)] border border-foreground/[0.06]"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Eligibility */}
                    {resource.eligibility && (
                      <div>
                        <h4 className="text-base font-bold mb-4 flex items-center gap-2">
                          <Users className="w-5 h-5 text-[#1D4ED8] dark:text-sky-400" />
                          Eligibility
                        </h4>
                        <p className="text-base text-[var(--foreground-muted)] bg-foreground/[0.04] rounded-2xl p-5 border border-foreground/[0.06]">
                          {resource.eligibility[activeLanguage]}
                        </p>
                      </div>
                    )}

                    {/* Languages Offered */}
                    {resource.languages && resource.languages.length > 0 && (
                      <div>
                        <h4 className="text-base font-bold mb-3">Languages Available</h4>
                        <p className="text-base text-[var(--foreground-muted)]">
                          {resource.languages.join(", ")}
                        </p>
                      </div>
                    )}

                    {/* Last Updated & Source */}
                    {(resource.lastUpdated || resource.source) && (
                      <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--foreground-muted)]">
                        {resource.lastUpdated && (
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Updated: {resource.lastUpdated}
                          </span>
                        )}
                        {resource.source && (
                          <span>Source: {resource.source}</span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Action Buttons */}
        <div className="mt-5 md:mt-8 flex flex-wrap gap-1.5 md:gap-3">
          {resource.phone && (
            <a
              href={`tel:${resource.phone}`}
              className="flex items-center gap-1.5 md:gap-2 rounded-xl bg-[#1D4ED8] dark:bg-sky-500/15 px-3 md:px-5 py-2 md:py-3 text-xs md:text-sm font-bold text-white dark:text-sky-400 transition-all hover:bg-[#1e40af] active:scale-95"
            >
              <Phone className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0" />
              Call
            </a>
          )}
          {googleMapsUrl && (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open in Maps"
              className="flex items-center justify-center rounded-xl bg-foreground/[0.06] border border-foreground/[0.08] p-2.5 md:p-3 text-foreground transition-all hover:bg-foreground/[0.1] active:scale-95"
            >
              <MapPin className="h-4 w-4 flex-shrink-0" />
            </a>
          )}
          {resource.mapUrl && (
            <a
              href={resource.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Search on Maps"
              className="flex items-center justify-center rounded-xl bg-foreground/[0.06] border border-foreground/[0.08] p-2.5 md:p-3 text-foreground transition-all hover:bg-foreground/[0.1] active:scale-95"
            >
              <MapPin className="h-4 w-4 flex-shrink-0" />
            </a>
          )}
          {resource.website && (
            <a
              href={resource.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl bg-foreground/[0.06] border border-foreground/[0.08] px-7 py-4 text-base font-bold transition-all hover:bg-foreground/[0.1] hover:border-foreground/[0.15] active:scale-95"
            >
              <ExternalLink className="h-5 w-5" />
              Website
            </a>
          )}
        </div>

        {/* Notes Section (only shown in Shortlist) */}
        {showNotes && (
          <div className="mt-8 pt-8 border-t border-foreground/[0.08]">
            <div className="flex items-center gap-4 mb-5">
              <button
                onClick={() => toggleResourceComplete(resource.id)}
                className={`flex items-center gap-3 rounded-2xl px-6 py-4 text-base font-bold transition-all active:scale-95 ${
                  isCompleted
                    ? "bg-[#1D4ED8]/20 dark:bg-sky-500/20 text-[#1D4ED8] dark:text-sky-400"
                    : "bg-foreground/[0.06] border border-foreground/[0.08] text-[var(--foreground-muted)] hover:text-foreground"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    isCompleted
                      ? "border-sky-400 bg-sky-400"
                      : "border-[var(--foreground-muted)]"
                  }`}
                >
                  {isCompleted && <Check className="w-4 h-4 text-foreground" />}
                </div>
                Mark as done
              </button>
            </div>
            <textarea
              value={note?.note ?? ""}
              onChange={(e) => setResourceNote(resource.id, e.target.value)}
              placeholder="Add personal notes..."
              className="w-full rounded-2xl bg-foreground/[0.04] border border-foreground/[0.08] p-5 text-base placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all resize-none"
              rows={3}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
