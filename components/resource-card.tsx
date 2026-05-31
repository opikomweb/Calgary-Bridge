"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { categoryLabels } from "@/lib/data";
import type { Resource } from "@/lib/types";
import { Heart, Phone, MapPin, ExternalLink, Check } from "lucide-react";

interface ResourceCardProps {
  resource: Resource;
  showNotes?: boolean;
}

export default function ResourceCard({ resource, showNotes = false }: ResourceCardProps) {
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

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`glass-card rounded-2xl p-5 transition-all card-hover ${
        isCompleted && showNotes ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Category Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {resource.category.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#0ea5e9]/15 text-[#0ea5e9]"
              >
                {categoryLabels[cat]?.[activeLanguage] || cat}
              </span>
            ))}
            {resource.featured && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#f59e0b]/15 text-[#f59e0b]">
                Featured
              </span>
            )}
          </div>

          <h3 className="font-semibold text-lg text-white mb-2">
            {resource.title[activeLanguage]}
          </h3>
          <p className="text-[var(--foreground-muted)] text-sm leading-relaxed line-clamp-2">
            {resource.summary?.[activeLanguage] || resource.description[activeLanguage]}
          </p>

          {/* Contact Info */}
          {(resource.phone || resource.address) && (
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[var(--foreground-muted)]">
              {resource.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {resource.phone}
                </span>
              )}
              {resource.address && (
                <span className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
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
          className={`flex-shrink-0 rounded-full p-2.5 transition-all ${
            isBookmarked
              ? "bg-pink-500/20 text-pink-500"
              : "bg-[var(--surface)] text-[var(--foreground-muted)] hover:text-white"
          }`}
        >
          <Heart className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
        </motion.button>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        {resource.phone && (
          <a
            href={`tel:${resource.phone}`}
            className="flex items-center gap-1.5 rounded-xl bg-[#0ea5e9]/15 px-4 py-2 text-sm font-medium text-[#0ea5e9] transition-all hover:bg-[#0ea5e9]/25 active:scale-95"
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
            className="flex items-center gap-1.5 rounded-xl bg-[#f59e0b]/15 px-4 py-2 text-sm font-medium text-[#f59e0b] transition-all hover:bg-[#f59e0b]/25 active:scale-95"
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
            className="flex items-center gap-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] px-4 py-2 text-sm font-medium transition-all hover:bg-[var(--surface-hover)] active:scale-95"
          >
            <ExternalLink className="h-4 w-4" />
            Website
          </a>
        )}
      </div>

      {/* Notes Section (only shown in Shortlist) */}
      {showNotes && (
        <div className="mt-5 pt-5 border-t border-[var(--border)]">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => toggleResourceComplete(resource.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
                isCompleted
                  ? "bg-green-500/20 text-green-500"
                  : "bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground-muted)]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                  isCompleted
                    ? "border-green-500 bg-green-500"
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
            className="w-full rounded-xl bg-[var(--surface)] border border-[var(--border)] p-4 text-sm placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[#0ea5e9] transition-colors resize-none"
            rows={2}
          />
        </div>
      )}
    </motion.div>
  );
}
