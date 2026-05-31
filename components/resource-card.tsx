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
  Users
} from "lucide-react";

interface ResourceCardProps {
  resource: Resource;
  showNotes?: boolean;
  variant?: "default" | "compact" | "detailed";
}

const costLabels: Record<string, { label: string; color: string }> = {
  "free": { label: "Free", color: "text-emerald-500 bg-emerald-500/10" },
  "low-cost": { label: "Low Cost", color: "text-[#3B82F6] bg-[#3B82F6]/10" },
  "sliding-scale": { label: "Sliding Scale", color: "text-[#F5B942] bg-[#F5B942]/10" },
  "paid": { label: "Paid", color: "text-[var(--foreground-muted)] bg-[var(--surface)]" },
};

export default function ResourceCard({ resource, showNotes = false, variant = "default" }: ResourceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
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
        className={`premium-card transition-all ${isCompleted && showNotes ? "opacity-60" : ""}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Category Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {resource.category.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#3B82F6]/10 text-[#3B82F6]"
                >
                  {categoryLabels[cat]?.[activeLanguage] || cat}
                </span>
              ))}
              {resource.featured && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F5B942]/10 text-[#F5B942] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Featured
                </span>
              )}
              {resource.hiddenGem && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Hidden Gem
                </span>
              )}
            </div>

            <h3 className="font-semibold text-lg mb-2">
              {resource.title[activeLanguage]}
            </h3>
            <p className="text-[var(--foreground-muted)] text-sm leading-relaxed line-clamp-2">
              {resource.summary?.[activeLanguage] || resource.description[activeLanguage]}
            </p>

            {/* Cost Badge */}
            {resource.cost && (
              <div className="mt-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${costLabels[resource.cost]?.color || ""}`}>
                  <DollarSign className="w-3 h-3" />
                  {costLabels[resource.cost]?.label || resource.cost}
                </span>
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleBookmark(resource.id)}
            className={`flex-shrink-0 rounded-2xl p-3 transition-all ${
              isBookmarked
                ? "bg-pink-500/15 text-pink-500"
                : "bg-[var(--surface)] text-[var(--foreground-muted)] hover:text-white hover:bg-[var(--surface-hover)]"
            }`}
          >
            <Heart className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
          </motion.button>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-5 flex flex-wrap gap-2">
          {resource.phone && (
            <a
              href={`tel:${resource.phone}`}
              className="flex items-center gap-2 rounded-xl bg-[#3B82F6]/10 px-4 py-2.5 text-sm font-medium text-[#3B82F6] transition-all hover:bg-[#3B82F6]/20 active:scale-95"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
          )}
          {googleMapsUrl && (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-[#F5B942]/10 px-4 py-2.5 text-sm font-medium text-[#F5B942] transition-all hover:bg-[#F5B942]/20 active:scale-95"
            >
              <MapPin className="h-4 w-4" />
              Directions
            </a>
          )}
          {resource.website && (
            <a
              href={resource.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] px-4 py-2.5 text-sm font-medium transition-all hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] active:scale-95"
            >
              <ExternalLink className="h-4 w-4" />
              Website
            </a>
          )}
        </div>
      </motion.div>
    );
  }

  // Default full variant
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={`premium-card transition-all ${isCompleted && showNotes ? "opacity-60" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Category Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {resource.category.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#3B82F6]/10 text-[#3B82F6]"
              >
                {categoryLabels[cat]?.[activeLanguage] || cat}
              </span>
            ))}
            {resource.featured && (
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#F5B942]/10 text-[#F5B942] flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </span>
            )}
            {resource.hiddenGem && (
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Hidden Gem
              </span>
            )}
          </div>

          <h3 className="font-semibold text-xl mb-3">
            {resource.title[activeLanguage]}
          </h3>
          <p className="text-[var(--foreground-muted)] leading-relaxed">
            {resource.description[activeLanguage]}
          </p>

          {/* Cost and Hours Row */}
          {(resource.cost || resource.hours) && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {resource.cost && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${costLabels[resource.cost]?.color || ""}`}>
                  <DollarSign className="w-3.5 h-3.5" />
                  {costLabels[resource.cost]?.label || resource.cost}
                </span>
              )}
              {resource.hours && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--surface)] text-[var(--foreground-muted)]">
                  <Clock className="w-3.5 h-3.5" />
                  {resource.hours}
                </span>
              )}
            </div>
          )}

          {/* Contact Info */}
          {(resource.phone || resource.address) && (
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[var(--foreground-muted)]">
              {resource.phone && (
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {resource.phone}
                </span>
              )}
              {resource.address && (
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
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
          className={`flex-shrink-0 rounded-2xl p-3.5 transition-all ${
            isBookmarked
              ? "bg-pink-500/15 text-pink-500"
              : "bg-[var(--surface)] text-[var(--foreground-muted)] hover:text-white hover:bg-[var(--surface-hover)]"
          }`}
        >
          <Heart className={`h-6 w-6 ${isBookmarked ? "fill-current" : ""}`} />
        </motion.button>
      </div>

      {/* Expandable Details Section */}
      {hasExtraDetails && (
        <>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 flex items-center gap-2 text-sm text-[#3B82F6] hover:text-[#3B82F6]/80 transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
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
                <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-4">
                  {/* Services Offered */}
                  {resource.servicesOffered && resource.servicesOffered.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        Services Offered
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {resource.servicesOffered.map((service, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg text-xs bg-[var(--surface)] text-[var(--foreground-muted)] border border-[var(--border)]"
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
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#3B82F6]" />
                        Eligibility
                      </h4>
                      <p className="text-sm text-[var(--foreground-muted)] bg-[var(--surface)] rounded-xl p-3 border border-[var(--border)]">
                        {resource.eligibility[activeLanguage]}
                      </p>
                    </div>
                  )}

                  {/* Languages Offered */}
                  {resource.languages && resource.languages.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Languages Available</h4>
                      <p className="text-sm text-[var(--foreground-muted)]">
                        {resource.languages.join(", ")}
                      </p>
                    </div>
                  )}

                  {/* Last Updated & Source */}
                  {(resource.lastUpdated || resource.source) && (
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--foreground-muted)]">
                      {resource.lastUpdated && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
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
      <div className="mt-6 flex flex-wrap gap-3">
        {resource.phone && (
          <a
            href={`tel:${resource.phone}`}
            className="flex items-center gap-2 rounded-xl bg-[#3B82F6]/10 px-5 py-3 text-sm font-semibold text-[#3B82F6] transition-all hover:bg-[#3B82F6]/20 active:scale-95"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
        )}
        {googleMapsUrl && (
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-[#F5B942]/10 px-5 py-3 text-sm font-semibold text-[#F5B942] transition-all hover:bg-[#F5B942]/20 active:scale-95"
          >
            <MapPin className="h-4 w-4" />
            Directions
          </a>
        )}
        {resource.website && (
          <a
            href={resource.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] px-5 py-3 text-sm font-semibold transition-all hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] active:scale-95"
          >
            <ExternalLink className="h-4 w-4" />
            Website
          </a>
        )}
      </div>

      {/* Notes Section (only shown in Shortlist) */}
      {showNotes && (
        <div className="mt-6 pt-6 border-t border-[var(--border)]">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => toggleResourceComplete(resource.id)}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all active:scale-95 ${
                isCompleted
                  ? "bg-emerald-500/15 text-emerald-500"
                  : "bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-white"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                  isCompleted
                    ? "border-emerald-500 bg-emerald-500"
                    : "border-[var(--foreground-muted)]"
                }`}
              >
                {isCompleted && <Check className="w-3 h-3 text-white" />}
              </div>
              Mark as done
            </button>
          </div>
          <textarea
            value={note?.note ?? ""}
            onChange={(e) => setResourceNote(resource.id, e.target.value)}
            placeholder="Add personal notes..."
            className="w-full rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4 text-sm placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all resize-none"
            rows={3}
          />
        </div>
      )}
    </motion.div>
  );
}
