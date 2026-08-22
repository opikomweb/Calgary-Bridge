/**
 * lib/searxng.ts
 *
 * Thin client for a self-hosted SearXNG instance, used by Askonnect ONLY as
 * a last resort when the curated resource catalog produces zero matches.
 * Runs in graceful-degraded mode (returns null, never throws) until the
 * user provisions an instance and sets SEARXNG_INSTANCE_URL — see
 * SEARXNG_SETUP.md for the exact hosting runbook.
 */

export interface SearXNGResult {
  title: string;
  url: string;
  snippet?: string;
}

const REQUEST_TIMEOUT_MS = 6000;
const MAX_RESULTS = 5;

/**
 * Queries the configured SearXNG instance and returns up to MAX_RESULTS
 * results. Returns null (never throws) if the env var isn't set, the
 * instance is unreachable, or the request times out — callers must treat
 * null as "no live answer available" and degrade gracefully.
 */
export async function searchSearXNG(query: string): Promise<SearXNGResult[] | null> {
  const baseUrl = process.env.SEARXNG_INSTANCE_URL;
  if (!baseUrl) {
    console.log("[v0] searchSearXNG: SEARXNG_INSTANCE_URL is not set in this runtime");
    return null;
  }
  // TEMP DEBUG — remove once the live-search path is confirmed working in
  // production. Masks everything but the host so we never log a full
  // internal URL/credentials, while still confirming exactly what value
  // this runtime resolved (stale deployment, typo, trailing slash, etc).
  try {
    const u = new URL(baseUrl);
    console.log(`[v0] searchSearXNG: resolved SEARXNG_INSTANCE_URL host=${u.hostname} port=${u.port || "(default)"} protocol=${u.protocol}`);
  } catch {
    console.log("[v0] searchSearXNG: SEARXNG_INSTANCE_URL is set but failed to parse as a URL");
  }

  try {
    const url = `${baseUrl.replace(/\/+$/, "")}/search?q=${encodeURIComponent(query)}&format=json`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "CalgaryKonnect/1.0 (+https://calgarykonnect.ca; settlement-services directory)",
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.log(`[v0] searchSearXNG: non-OK response status=${res.status} statusText=${res.statusText}`);
      return null;
    }

    const data = await res.json();
    const rawResults: any[] = Array.isArray(data?.results) ? data.results : [];
    console.log(`[v0] searchSearXNG: received ${rawResults.length} raw results from instance`);
    if (rawResults.length === 0) return null;

    const results: SearXNGResult[] = rawResults
      .filter((r) => typeof r?.title === "string" && typeof r?.url === "string")
      .slice(0, MAX_RESULTS)
      .map((r) => ({
        title: r.title,
        url: r.url,
        snippet: typeof r.content === "string" ? r.content.slice(0, 240) : undefined,
      }));

    return results.length > 0 ? results : null;
  } catch (err) {
    // Network error, timeout, invalid JSON — all treated as "no live answer".
    console.log(`[v0] searchSearXNG: caught error — ${err instanceof Error ? `${err.name}: ${err.message}` : String(err)}`);
    return null;
  }
}
