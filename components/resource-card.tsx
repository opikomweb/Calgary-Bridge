"use client";

import { useAppStore } from "@/lib/store";
import { uiText } from "@/lib/data";
import type { Resource } from "@/lib/types";
import { Heart, Phone, MapPin, ExternalLink } from "lucide-react";

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
    <div
      className={`glass rounded-xl p-4 transition-all ${
        isCompleted && showNotes ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">
            {resource.title[activeLanguage]}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {resource.description[activeLanguage]}
          </p>
        </div>
        <button
          onClick={() => toggleBookmark(resource.id)}
          className={`flex-shrink-0 rounded-full p-2 transition-all active:scale-95 ${
            isBookmarked
              ? "bg-pink-500/20 text-pink-500"
              : "bg-white/5 text-muted-foreground hover:text-foreground"
          }`}
        >
          <Heart className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        {resource.phone && (
          <a
            href={`tel:${resource.phone}`}
            className="flex items-center gap-1.5 rounded-lg bg-primary/20 px-3 py-1.5 text-sm font-medium text-primary transition-all active:scale-95"
          >
            <Phone className="h-4 w-4" />
            {uiText.call[activeLanguage]}
          </a>
        )}
        {googleMapsUrl && (
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-accent/20 px-3 py-1.5 text-sm font-medium text-accent transition-all active:scale-95"
          >
            <MapPin className="h-4 w-4" />
            {uiText.directions[activeLanguage]}
          </a>
        )}
        {resource.website && (
          <a
            href={resource.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-foreground transition-all active:scale-95"
          >
            <ExternalLink className="h-4 w-4" />
            {uiText.visitSite[activeLanguage]}
          </a>
        )}
      </div>

      {/* Notes Section (only shown in Shortlist) */}
      {showNotes && (
        <div className="mt-4 border-t border-border pt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleResourceComplete(resource.id)}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all active:scale-95 ${
                isCompleted
                  ? "bg-green-500/20 text-green-500"
                  : "bg-white/10 text-muted-foreground"
              }`}
            >
              <div
                className={`h-4 w-4 rounded border-2 ${
                  isCompleted
                    ? "border-green-500 bg-green-500"
                    : "border-muted-foreground"
                }`}
              >
                {isCompleted && (
                  <svg viewBox="0 0 16 16" fill="white" className="h-full w-full">
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                )}
              </div>
              {uiText.markDone[activeLanguage]}
            </button>
          </div>
          <textarea
            value={note?.note ?? ""}
            onChange={(e) => setResourceNote(resource.id, e.target.value)}
            placeholder={uiText.addNotes[activeLanguage]}
            className="mt-3 w-full rounded-lg bg-white/5 p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            rows={2}
          />
        </div>
      )}
    </div>
  );
}
