/**
 * lib/geo.ts
 *
 * Client-side distance calculation from the browser's own geolocation to a
 * resource's coordinates. No server round-trip, no third-party geocoding
 * API — just the haversine formula against whatever lat/lng the resource
 * (or its live enrichment) provides.
 */

const EARTH_RADIUS_KM = 6371;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** Great-circle distance between two lat/lng points, in kilometers. */
export function haversineDistanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

/** Human-friendly distance label: "450 m away" below 1km, else "3.2 km away". */
export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m away`;
  return `${km.toFixed(1)} km away`;
}

let cachedPosition: GeolocationPosition | null = null;
let inFlight: Promise<GeolocationPosition | null> | null = null;

/**
 * Requests the browser's geolocation once per page session and caches the
 * result (successes AND the "denied/unavailable" outcome) so we never
 * re-prompt the permission dialog per-card as a user scrolls a results list.
 * Returns null silently on denial/unsupported — distance is a nice-to-have,
 * never a blocker.
 */
export function getCachedPosition(): Promise<GeolocationPosition | null> {
  if (cachedPosition) return Promise.resolve(cachedPosition);
  if (inFlight) return inFlight;
  if (typeof navigator === "undefined" || !navigator.geolocation) {
    return Promise.resolve(null);
  }

  inFlight = new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        cachedPosition = pos;
        inFlight = null;
        resolve(pos);
      },
      () => {
        inFlight = null;
        resolve(null);
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 5 * 60 * 1000 }
    );
  });
  return inFlight;
}
