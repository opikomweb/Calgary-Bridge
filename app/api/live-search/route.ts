import { NextResponse } from "next/server";
import { LIVE_SEARCH_INTENTS, buildQueryIntent, type LiveSearchIntent } from "@/lib/live-search-intents";
import type { ResourceCategory } from "@/lib/types";

export const runtime = "nodejs";

// Calgary city centre — used to bias and bound results to the city.
const CALGARY = { latitude: 51.0447, longitude: -114.0719 };
const RADIUS_M = 45000; // ~45km covers Calgary + immediate area

const MIN_RATING = 4.0;
const MIN_REVIEWS = 5;

// --- In-memory result cache (per warm server instance) -------------------
// Keyed by the resolved intent query so identical category/search lookups
// reuse a recent response instead of hitting the paid Places API again.
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes
const resultCache = new Map<string, { expires: number; payload: unknown }>();

function getCached(key: string): unknown | undefined {
  const hit = resultCache.get(key);
  if (!hit) return undefined;
  if (Date.now() > hit.expires) {
    resultCache.delete(key);
    return undefined;
  }
  return hit.payload;
}

function setCached(key: string, payload: unknown) {
  resultCache.set(key, { expires: Date.now() + CACHE_TTL_MS, payload });
  // Keep the cache from growing unbounded on long-lived instances.
  if (resultCache.size > 200) {
    const oldest = resultCache.keys().next().value;
    if (oldest) resultCache.delete(oldest);
  }
}

// --- Per-IP rate limiting (sliding window) -------------------------------
const RATE_LIMIT = 20; // requests
const RATE_WINDOW_MS = 1000 * 60; // per minute
const rateBuckets = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateBuckets.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  rateBuckets.set(ip, hits);
  return hits.length > RATE_LIMIT;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export interface LivePlace {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  mapsUrl?: string;
  rating?: number;
  reviews?: number;
  primaryType?: string;
  openNow?: boolean;
  coordinates?: { lat: number; lng: number };
}

interface PlacesApiPlace {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  websiteUri?: string;
  googleMapsUri?: string;
  rating?: number;
  userRatingCount?: number;
  primaryType?: string;
  types?: string[];
  businessStatus?: string;
  currentOpeningHours?: { openNow?: boolean };
  location?: { latitude: number; longitude: number };
}

function isOnTopic(place: PlacesApiPlace, intent: LiveSearchIntent): boolean {
  const name = (place.displayName?.text ?? "").toLowerCase();
  const type = (place.primaryType ?? "").toLowerCase();
  const allTypes = (place.types ?? []).map((t) => t.toLowerCase());

  // Drop explicitly excluded names.
  if (intent.exclude?.some((bad) => name.includes(bad.toLowerCase()))) return false;

  // Must match at least one on-topic keyword in the name OR be an allowed type.
  const keywordHit = intent.mustMatch.some((kw) => name.includes(kw.toLowerCase()) || type.includes(kw.toLowerCase()));
  const typeHit =
    intent.allowTypes.length > 0 &&
    (intent.allowTypes.includes(type) || allTypes.some((t) => intent.allowTypes.includes(t)));

  return keywordHit || typeHit;
}

async function searchPlaces(intent: LiveSearchIntent, apiKey: string): Promise<LivePlace[]> {
  const body: Record<string, unknown> = {
    textQuery: `${intent.query} in Calgary, Alberta`,
    maxResultCount: 20,
    locationBias: { circle: { center: CALGARY, radius: RADIUS_M } },
    regionCode: "CA",
    languageCode: "en",
  };
  if (intent.includedType) body.includedType = intent.includedType;

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": [
        "places.id",
        "places.displayName",
        "places.formattedAddress",
        "places.nationalPhoneNumber",
        "places.websiteUri",
        "places.googleMapsUri",
        "places.rating",
        "places.userRatingCount",
        "places.primaryType",
        "places.types",
        "places.businessStatus",
        "places.currentOpeningHours.openNow",
        "places.location",
      ].join(","),
    },
    body: JSON.stringify(body),
    // Cache identical category lookups briefly to control cost.
    next: { revalidate: 60 * 30 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Places API ${res.status}: ${text.slice(0, 300)}`);
  }

  const data = (await res.json()) as { places?: PlacesApiPlace[] };
  const places = data.places ?? [];

  return places
    .filter((p) => p.businessStatus !== "CLOSED_PERMANENTLY")
    .filter((p) => (p.rating ?? 0) >= MIN_RATING && (p.userRatingCount ?? 0) >= MIN_REVIEWS)
    .filter((p) => isOnTopic(p, intent))
    .map<LivePlace>((p) => ({
      id: p.id,
      name: p.displayName?.text ?? "Unknown",
      address: p.formattedAddress,
      phone: p.nationalPhoneNumber,
      website: p.websiteUri,
      mapsUrl: p.googleMapsUri,
      rating: p.rating,
      reviews: p.userRatingCount,
      primaryType: p.primaryType,
      openNow: p.currentOpeningHours?.openNow,
      coordinates: p.location ? { lat: p.location.latitude, lng: p.location.longitude } : undefined,
    }))
    // Highest rated, then most-reviewed, first.
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || (b.reviews ?? 0) - (a.reviews ?? 0))
    .slice(0, 9);
}

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Live search is not configured." }, { status: 503 });
  }

  if (isRateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "Too many searches. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let payload: { category?: string; query?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { category, query } = payload;

  let intent: LiveSearchIntent | undefined;
  if (category && category !== "all" && LIVE_SEARCH_INTENTS[category as ResourceCategory]) {
    intent = LIVE_SEARCH_INTENTS[category as ResourceCategory];
  } else if (query && query.trim().length >= 2) {
    intent = buildQueryIntent(query);
  }

  if (!intent) {
    return NextResponse.json({ error: "Provide a category or search query." }, { status: 400 });
  }

  const cacheKey = intent.query.toLowerCase().trim();
  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json(cached, { headers: { "X-Cache": "HIT" } });
  }

  try {
    const results = await searchPlaces(intent, apiKey);
    const response = { label: intent.label, results };
    setCached(cacheKey, response);
    return NextResponse.json(response, { headers: { "X-Cache": "MISS" } });
  } catch (err) {
    console.error("[v0] live-search error:", err);
    return NextResponse.json({ error: "Live search failed. Please try again." }, { status: 502 });
  }
}
