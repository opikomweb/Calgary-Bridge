"use client";

import { useEffect, useState } from "react";
import type { Resource } from "@/lib/types";
import { getCachedPosition, haversineDistanceKm, formatDistance } from "@/lib/geo";

export interface EnrichmentResult {
  source: "calgary-open-data" | "openstreetmap";
  matchedName: string | null;
  lat: number | null;
  lng: number | null;
  phone: string | null;
  hours: string | null;
}

interface EnrichmentState {
  enrichment: EnrichmentResult | null;
  distanceLabel: string | null;
  loading: boolean;
}

/**
 * Fetches best-effort live enrichment (coordinates/phone/hours) for a
 * resource ONLY when it's missing that data already, and only once the
 * card is actually expanded — no point spending an API call on a card the
 * user never opens. Purely additive: curated fields always win over
 * anything this hook returns; this only fills gaps.
 */
export function useResourceEnrichment(resource: Resource, enabled: boolean): EnrichmentState {
  const [enrichment, setEnrichment] = useState<EnrichmentResult | null>(null);
  const [distanceLabel, setDistanceLabel] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const missingSomething = !resource.hours || !resource.phone || !resource.coordinates;

  useEffect(() => {
    if (!enabled || !missingSomething) return;
    let cancelled = false;
    setLoading(true);

    fetch("/api/resource-enrichment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resourceId: resource.id,
        name: resource.title.en,
        address: resource.address,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled || !data?.enriched) return;
        setEnrichment({
          source: data.source,
          matchedName: data.matchedName ?? null,
          lat: data.lat ?? null,
          lng: data.lng ?? null,
          phone: data.phone ?? null,
          hours: data.hours ?? null,
        });
      })
      .catch(() => {
        // Best-effort only — silently render the resource exactly as-is.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, resource.id]);

  // Distance: prefer curated coordinates, fall back to enrichment's.
  useEffect(() => {
    if (!enabled) return;
    const coords = resource.coordinates ?? (enrichment?.lat && enrichment?.lng
      ? { lat: enrichment.lat, lng: enrichment.lng }
      : null);
    if (!coords) return;

    let cancelled = false;
    getCachedPosition().then((pos) => {
      if (cancelled || !pos) return;
      const km = haversineDistanceKm(
        { lat: pos.coords.latitude, lng: pos.coords.longitude },
        coords
      );
      setDistanceLabel(formatDistance(km));
    });
    return () => {
      cancelled = true;
    };
  }, [enabled, resource.coordinates, enrichment?.lat, enrichment?.lng]);

  return { enrichment, distanceLabel, loading };
}
