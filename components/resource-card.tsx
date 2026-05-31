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
  Sparkles,
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
  "free": { label: "Free", color: "text-emerald-400 bg-emerald-500/15" },
  "low-cost": { label: "Low Cost", color: "text-sky-400 bg-sky-500/15" },
  "sliding-scale": { label: "Sliding Scale", color: "text-amber-400 bg-amber-500/15" },
  "paid": { label: "Paid", color: "text-slate-400 bg-slate-500/15" },
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
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className={`group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-800/60 border border-white/[0.08] hover:border-white/[0.15] p-8 md:p-10 transition-all duration-400 ${isCompleted && showNotes ? "opacity-60" : ""}`}
        style={{
          boxShadow: "0 4px 24px -8px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.03)",
        }}
      >
        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent" />
        
        <div className="relative z-10">
          {/* Header Row: Tags + Actions */}
          <div className="flex items-start justify-between gap-4 mb-6">
            {/* Category Tags - Horizontal */}
            <div className="flex flex-wrap gap-2.5">
              {resource.category.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-sky-500/15 text-sky-400"
                >
                  {categoryLabels[cat]?.[activeLanguage] || cat}
                </span>
              ))}
              {resource.hiddenGem && (
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-purple-500/15 text-purple-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Hidden Gem
                </span>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleBookmark(resource.id)}
                className={`rounded-xl p-3 transition-all ${
                  isBookmarked
                    ? "bg-pink-500/20 text-pink-400"
                    : "bg-white/[0.06] text-[var(--foreground-muted)] hover:text-white hover:bg-white/[0.1]"
                }`}
              >
                <Heart className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
              </motion.button>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMenu(!showMenu)}
                  className="rounded-xl p-3 bg-white/[0.06] text-[var(--foreground-muted)] hover:text-white hover:bg-white/[0.1] transition-all"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </motion.button>
                
                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -8 }}
                      className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-[#0a1628] border border-white/[0.1] shadow-2xl overflow-hidden z-20"
                    >
                      <button
                        onClick={() => {
                          onClaimBusiness?.(resource.id);
                          setShowMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-5 py-4 text-left text-sm text-white/70 hover:bg-white/[0.06] hover:text-white transition-colors"
                      >
                        <Building2 className="w-4 h-4" />
                        Claim this business
                      </button>
                      <button
                        onClick={() => {
                          onReport?.(resource.id);
                          setShowMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-5 py-4 text-left text-sm text-white/70 hover:bg-white/[0.06] hover:text-white transition-colors border-t border-white/[0.06]"
                      >
                        <Flag className="w-4 h-4" />
                        Report an issue
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Title - Full Width */}
          <h3 className="font-bold text-2xl mb-4 leading-tight text-white">
            {resource.title[activeLanguage]}
          </h3>
          
          {/* Description - Full Width with Better Line Height */}
          <p className="text-white/60 text-base leading-[1.75] mb-6">
            {resource.summary?.[activeLanguage] || resource.description[activeLanguage]}
          </p>

          {/* Cost Badge */}
          {resource.cost && (
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 ${costLabels[resource.cost]?.color || ""}`}>
              <DollarSign className="w-4 h-4" />
              {costLabels[resource.cost]?.label || resource.cost}
            </span>
          )}

          {/* Quick Action Buttons - Full Width */}
          <div className="flex flex-wrap gap-3">
            {resource.phone && (
              <a
                href={`tel:${resource.phone}`}
                className="flex items-center gap-2.5 rounded-2xl bg-sky-500/15 px-6 py-3.5 text-base font-semibold text-sky-400 transition-all hover:bg-sky-500/25 active:scale-95"
              >
                <Phone className="h-5 w-5" />
                Call
              </a>
            )}
            {googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-2xl bg-amber-500/15 px-6 py-3.5 text-base font-semibold text-amber-400 transition-all hover:bg-amber-500/25 active:scale-95"
              >
                <MapPin className="h-5 w-5" />
                Directions
              </a>
            )}
            {resource.website && (
              <a
                href={resource.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-2xl bg-white/[0.06] border border-white/[0.08] px-6 py-3.5 text-base font-semibold transition-all hover:bg-white/[0.1] hover:border-white/[0.15] active:scale-95"
              >
                <ExternalLink className="h-5 w-5" />
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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-slate-800/70 border border-white/[0.08] hover:border-white/[0.15] p-10 md:p-12 transition-all duration-400 ${isCompleted && showNotes ? "opacity-60" : ""}`}
      style={{
        boxShadow: "0 8px 32px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)",
      }}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            {/* Category Tags */}
            <div className="flex flex-wrap gap-3 mb-6">
              {resource.category.slice(0, 3).map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-sky-500/15 text-sky-400"
                >
                  {categoryLabels[cat]?.[activeLanguage] || cat}
                </span>
              ))}
              {resource.featured && (
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-amber-500/15 text-amber-400 flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current" />
                  Featured
                </span>
              )}
              {resource.hiddenGem && (
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-purple-500/15 text-purple-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Hidden Gem
                </span>
              )}
            </div>

            <h3 className="font-bold text-2xl md:text-3xl mb-5 leading-tight text-white">
              {resource.title[activeLanguage]}
            </h3>
            <p className="text-[var(--foreground-muted)] text-lg leading-relaxed">
              {resource.description[activeLanguage]}
            </p>

            {/* Cost and Hours Row */}
            {(resource.cost || resource.hours) && (
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {resource.cost && (
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${costLabels[resource.cost]?.color || ""}`}>
                    <DollarSign className="w-4 h-4" />
                    {costLabels[resource.cost]?.label || resource.cost}
                  </span>
                )}
                {resource.hours && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/[0.06] text-[var(--foreground-muted)]">
                    <Clock className="w-4 h-4" />
                    {resource.hours}
                  </span>
                )}
              </div>
            )}

            {/* Contact Info */}
            {(resource.phone || resource.address) && (
              <div className="mt-6 flex flex-wrap items-center gap-6 text-base text-[var(--foreground-muted)]">
                {resource.phone && (
                  <span className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    {resource.phone}
                  </span>
                )}
                {resource.address && (
                  <span className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">{resource.address}</span>
                  </span>
                )}
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleBookmark(resource.id)}
            className={`flex-shrink-0 rounded-2xl p-4 transition-all ${
              isBookmarked
                ? "bg-pink-500/20 text-pink-400"
                : "bg-white/[0.06] text-[var(--foreground-muted)] hover:text-white hover:bg-white/[0.1]"
            }`}
          >
            <Heart className={`h-7 w-7 ${isBookmarked ? "fill-current" : ""}`} />
          </motion.button>
        </div>

        {/* Expandable Details Section */}
        {hasExtraDetails && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-6 flex items-center gap-2 text-base text-sky-400 hover:text-sky-300 transition-colors font-semibold"
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
                  <div className="mt-6 pt-6 border-t border-white/[0.08] space-y-6">
                    {/* Services Offered */}
                    {resource.servicesOffered && resource.servicesOffered.length > 0 && (
                      <div>
                        <h4 className="text-base font-bold mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          Services Offered
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {resource.servicesOffered.map((service, idx) => (
                            <span
                              key={idx}
                              className="px-4 py-2 rounded-xl text-sm bg-white/[0.06] text-[var(--foreground-muted)] border border-white/[0.06]"
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
                          <Users className="w-5 h-5 text-sky-400" />
                          Eligibility
                        </h4>
                        <p className="text-base text-[var(--foreground-muted)] bg-white/[0.04] rounded-2xl p-5 border border-white/[0.06]">
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
        <div className="mt-8 flex flex-wrap gap-4">
          {resource.phone && (
            <a
              href={`tel:${resource.phone}`}
              className="flex items-center gap-3 rounded-2xl bg-sky-500/15 px-7 py-4 text-base font-bold text-sky-400 transition-all hover:bg-sky-500/25 active:scale-95"
            >
              <Phone className="h-5 w-5" />
              Call
            </a>
          )}
          {googleMapsUrl && (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl bg-amber-500/15 px-7 py-4 text-base font-bold text-amber-400 transition-all hover:bg-amber-500/25 active:scale-95"
            >
              <MapPin className="h-5 w-5" />
              Directions
            </a>
          )}
          {resource.website && (
            <a
              href={resource.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] px-7 py-4 text-base font-bold transition-all hover:bg-white/[0.1] hover:border-white/[0.15] active:scale-95"
            >
              <ExternalLink className="h-5 w-5" />
              Website
            </a>
          )}
        </div>

        {/* Notes Section (only shown in Shortlist) */}
        {showNotes && (
          <div className="mt-8 pt-8 border-t border-white/[0.08]">
            <div className="flex items-center gap-4 mb-5">
              <button
                onClick={() => toggleResourceComplete(resource.id)}
                className={`flex items-center gap-3 rounded-2xl px-6 py-4 text-base font-bold transition-all active:scale-95 ${
                  isCompleted
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-white/[0.06] border border-white/[0.08] text-[var(--foreground-muted)] hover:text-white"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    isCompleted
                      ? "border-emerald-400 bg-emerald-400"
                      : "border-[var(--foreground-muted)]"
                  }`}
                >
                  {isCompleted && <Check className="w-4 h-4 text-white" />}
                </div>
                Mark as done
              </button>
            </div>
            <textarea
              value={note?.note ?? ""}
              onChange={(e) => setResourceNote(resource.id, e.target.value)}
              placeholder="Add personal notes..."
              className="w-full rounded-2xl bg-white/[0.04] border border-white/[0.08] p-5 text-base placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all resize-none"
              rows={3}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
