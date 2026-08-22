/**
 * /api/resource-enrichment
 *
 * Best-effort live enrichment for a resource card: coordinates, phone, and
 * hours pulled from free, no-key public data sources — never invented.
 *
 * Sources, tried in order, first match wins:
 *   1. Calgary Open Data (Socrata) — City of Calgary's own facility/business
 *      licence datasets. Most authoritative when a name match is found.
 *   2. OpenStreetMap Overpass API — community-maintained POI data, much
 *      broader coverage than Calgary Open Data but lower authority.
 *
 * Results are cached per (resourceId, source) in Supabase
 * `resource_enrichment_cache` with a TTL, so the same resource is never
 * re-geocoded/re-queried more than once a day across all users.
 *
 * If NEITHER source finds a confident name match, the route returns
 * `{ enriched: false }` and the UI renders the resource exactly as-is —
 * enrichment is additive-only, never a blocker and never a guess.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 0; // caching is handled at the Supabase layer, not HTTP

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

// ---------------------------------------------------------------------------
// Fuzzy name match — cheap token-overlap score, good enough to reject
// obviously-wrong matches without needing a real string-distance library.
// ---------------------------------------------------------------------------
function normalizeName(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\b(the|inc|society|association|centre|center|of|calgary)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenOverlapScore(a: string, b: string): number {
  const ta = new Set(normalizeName(a).split(" ").filter(Boolean));
  const tb = new Set(normalizeName(b).split(" ").filter(Boolean));
  if (ta.size === 0 || tb.size === 0) return 0;
  let shared = 0;
  ta.forEach((t) => { if (tb.has(t)) shared++; });
  return shared / Math.max(ta.size, tb.size);
}

const MATCH_THRESHOLD = 0.5; // require a meaningfully strong token overlap

// ---------------------------------------------------------------------------
// 1. Calgary Open Data (Socrata) — try a couple of relevant datasets.
// City-run facilities dataset is the most reliable for civic services.
//
// COVERAGE NOTE: dataset x34e-bcjz ("Community Services") only covers
// Attractions, Community Centres, Courts, Defibrillators, Health Clinics,
// Hospitals, Internet Access points, Libraries, Skate Parks, Social
// Development Centres, and Visitor Info — i.e. CITY-RUN civic amenities.
// It will never match the majority of this app's catalog (NGOs, shelters,
// legal aid clinics, food banks, immigrant-serving orgs), because those
// simply aren't in this dataset. That's expected, not a bug — Overpass
// (tried next) has much broader community-maintained coverage. Do not
// "fix" a miss here by loosening the match threshold; it's very likely a
// genuine absence, not a scoring failure.
// ---------------------------------------------------------------------------
async function tryCalgaryOpenData(name: string, address?: string) {
  try {
    const query = encodeURIComponent(name);
    const url = `https://data.calgary.ca/resource/x34e-bcjz.json?$q=${query}&$limit=5`;
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) return null;
    const rows: any[] = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) return null;

    let best: any = null;
    let bestScore = 0;
    for (const row of rows) {
      const candidateName = row.name ?? row.location_name ?? row.facility_name ?? "";
      if (!candidateName) continue;
      const score = tokenOverlapScore(name, candidateName);
      if (score > bestScore) { bestScore = score; best = row; }
    }
    if (!best || bestScore < MATCH_THRESHOLD) return null;

    const lat = parseFloat(best.latitude ?? best.point?.coordinates?.[1]);
    const lng = parseFloat(best.longitude ?? best.point?.coordinates?.[0]);

    return {
      source: "calgary-open-data" as const,
      matchedName: best.name ?? best.location_name ?? best.facility_name ?? null,
      lat: Number.isFinite(lat) ? lat : null,
      lng: Number.isFinite(lng) ? lng : null,
      phone: best.phone ?? null,
      hours: null,
      raw: best,
      score: bestScore,
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// 2. OpenStreetMap Overpass API — broader POI coverage, community-maintained.
// Search within a bounding box around Calgary for a name-matching node.
// ---------------------------------------------------------------------------
const CALGARY_BBOX = "50.84,-114.31,51.25,-113.86"; // south,west,north,east

async function tryOverpass(name: string) {
  try {
    const escaped = name.replace(/"/g, '\\"');
    // NOTE: capped at 20, not 5 — for a multi-branch org (a library system, a
    // chain), the regex name match can return far more than 5 candidates, and
    // Overpass does not return them in relevance order. A tight cap here means
    // the actual best match can be silently excluded from the pool before the
    // token-overlap scoring below ever sees it. 20 keeps the query cheap while
    // giving the real match a realistic chance of being included.
    const query = `
      [out:json][timeout:10];
      (
        node["name"~"${escaped}",i](${CALGARY_BBOX});
        way["name"~"${escaped}",i](${CALGARY_BBOX});
      );
      out center 20;
    `;
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        // Overpass API's fair-use policy rejects requests with no User-Agent
        // (returns 406 Not Acceptable) — Node's fetch sends none by default,
        // so every request silently failed until this was added.
        "User-Agent": "CalgaryConnect/1.0 (https://calgaryconnect.app; best-effort resource enrichment)",
      },
      body: query,
      signal: AbortSignal.timeout(9000),
    });
    if (!res.ok) return null;
    const json = await res.json();
    const elements: any[] = json.elements ?? [];
    if (elements.length === 0) return null;

    let best: any = null;
    let bestScore = 0;
    for (const el of elements) {
      const candidateName = el.tags?.name ?? "";
      if (!candidateName) continue;
      const score = tokenOverlapScore(name, candidateName);
      if (score > bestScore) { bestScore = score; best = el; }
    }
    if (!best || bestScore < MATCH_THRESHOLD) return null;

    const lat = best.lat ?? best.center?.lat ?? null;
    const lng = best.lon ?? best.center?.lon ?? null;
    const openingHours = best.tags?.opening_hours ?? null;
    const phone = best.tags?.phone ?? best.tags?.["contact:phone"] ?? null;

    return {
      source: "openstreetmap" as const,
      matchedName: best.tags?.name ?? null,
      lat,
      lng,
      phone,
      hours: openingHours,
      raw: best.tags ?? {},
      score: bestScore,
    };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  let body: { resourceId?: string; name?: string; address?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ enriched: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const { resourceId, name, address } = body;
  if (!resourceId || !name) {
    return NextResponse.json({ enriched: false, error: "resourceId and name are required" }, { status: 400 });
  }

  const supabase = getSupabase();

  // 1. Check cache (either source, most recent) before hitting live APIs.
  try {
    const { data: cached } = await supabase
      .from("resource_enrichment_cache")
      .select("*")
      .eq("resource_id", resourceId)
      .order("fetched_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (cached && Date.now() - new Date(cached.fetched_at).getTime() < CACHE_TTL_MS) {
      return NextResponse.json({
        enriched: true,
        fromCache: true,
        source: cached.source,
        matchedName: cached.matched_name,
        lat: cached.lat,
        lng: cached.lng,
        phone: cached.phone,
        hours: cached.hours,
      });
    }
  } catch (err) {
    console.error("[resource-enrichment] cache read error:", err);
  }

  // 2. Try Calgary Open Data first (higher authority), then OSM.
  const result = (await tryCalgaryOpenData(name, address)) ?? (await tryOverpass(name));

  if (!result) {
    return NextResponse.json({ enriched: false });
  }

  // 3. Persist to cache for next time (best-effort — never blocks the response).
  try {
    await supabase.from("resource_enrichment_cache").upsert(
      {
        resource_id: resourceId,
        source: result.source,
        lat: result.lat,
        lng: result.lng,
        hours: result.hours,
        phone: result.phone,
        matched_name: result.matchedName,
        raw_payload: result.raw,
        fetched_at: new Date().toISOString(),
      },
      { onConflict: "resource_id,source" }
    );
  } catch (err) {
    console.error("[resource-enrichment] cache write error:", err);
  }

  return NextResponse.json({
    enriched: true,
    fromCache: false,
    source: result.source,
    matchedName: result.matchedName,
    lat: result.lat,
    lng: result.lng,
    phone: result.phone,
    hours: result.hours,
  });
}
