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
  if (!baseUrl) return null;

  try {
    const url = `${baseUrl.replace(/\/+$/, "")}/search?q=${encodeURIComponent(query)}&format=json`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "CalgaryKonnect/1.0 (+https://calgarykonnect.ca; settlement-services directory)",
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!res.ok) return null;

    const data = await res.json();
    const rawResults: any[] = Array.isArray(data?.results) ? data.results : [];
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
  } catch {
    // Network error, timeout, invalid JSON — all treated as "no live answer".
    return null;
  }
}
