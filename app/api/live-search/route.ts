import { NextResponse } from "next/server";
import { LIVE_SEARCH_INTENTS, buildQueryIntent, type LiveSearchIntent } from "@/lib/live-search-intents";
import type { ResourceCategory } from "@/lib/types";

export const runtime = "nodejs";

// Calgary city centre — used to bias and bound results to the city.
const CALGARY = { latitude: 51.0447, longitude: -114.0719 };
const RADIUS_M = 45000; // ~45km covers Calgary + immediate area

const MIN_RATING = 4.0;
const MIN_REVIEWS = 5;

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

  try {
    const results = await searchPlaces(intent, apiKey);
    return NextResponse.json({ label: intent.label, results });
  } catch (err) {
    console.error("[v0] live-search error:", err);
    return NextResponse.json({ error: "Live search failed. Please try again." }, { status: 502 });
  }
}
