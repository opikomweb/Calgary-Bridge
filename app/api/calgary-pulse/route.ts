/**
 * /api/calgary-pulse
 *
 * Aggregates live data from five public, no-key Canadian data sources:
 *   1. Open-Meteo         — weather (temp, humidity, wind, UV, weather code)
 *   2. Environment Canada — weather alerts/watches (Calgary ATOM feed ab12)
 *   3. MSC GeoMet-OGC     — Air Quality Health Index (AQHI) for Calgary
 *   4. Multiple Calgary news RSS feeds — top headlines from trusted local media
 *
 * Cache: 10 minutes (Next.js revalidation). The client also refreshes
 * sequentially every 10 minutes via polling.
 */

import { NextResponse } from "next/server";

export const revalidate = 600; // 10 min server-side cache

// ---- 1. Weather (Open-Meteo) -----------------------------------------------
async function fetchWeather() {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=51.0447&longitude=-114.0719" +
    "&current=temperature_2m,apparent_temperature,weather_code,is_day,wind_speed_10m,relative_humidity_2m" +
    "&hourly=uv_index&forecast_days=1" +
    "&temperature_unit=celsius&timezone=America%2FDenver";
  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) throw new Error("Open-Meteo error");
  const json = await res.json();
  const c = json.current ?? {};
  // UV: use current hour index
  const hour = new Date().getHours();
  const uv: number = json.hourly?.uv_index?.[hour] ?? 0;
  return {
    temp: Math.round(c.temperature_2m ?? 0),
    feelsLike: Math.round(c.apparent_temperature ?? 0),
    wmoCode: c.weather_code ?? 0,
    isDay: (c.is_day ?? 1) === 1,
    windKph: Math.round(c.wind_speed_10m ?? 0),
    humidity: Math.round(c.relative_humidity_2m ?? 0),
    uvIndex: Math.round(uv),
  };
}

// ---- 2. Environment Canada weather alerts (ATOM) ----------------------------
async function fetchAlerts(): Promise<{ title: string; issued: string; link: string }[]> {
  const url = "https://weather.gc.ca/rss/battleboard/ab12_e.xml";
  const res = await fetch(url, {
    next: { revalidate: 600 },
    headers: { Accept: "application/atom+xml,application/xml,text/xml" },
  });
  if (!res.ok) return [];
  const text = await res.text();

  const entries: { title: string; issued: string; link: string }[] = [];
  // Simple regex parse — no DOM parser in edge/node
  const entryRx = /<entry>([\s\S]*?)<\/entry>/g;
  let m: RegExpExecArray | null;
  while ((m = entryRx.exec(text)) !== null) {
    const block = m[1];
    const titleM = /<title>([\s\S]*?)<\/title>/.exec(block);
    const linkM = /<link[^>]*href="([^"]+)"/.exec(block);
    const summaryM = /<summary[^>]*>([\s\S]*?)<\/summary>/.exec(block);
    const rawTitle = titleM?.[1]?.trim() ?? "";
    // Skip the feed-level title entry
    if (!rawTitle || rawTitle.toLowerCase().includes("no alerts")) continue;
    entries.push({
      title: rawTitle.replace(/<[^>]+>/g, "").trim(),
      issued: summaryM?.[1]?.replace(/<[^>]+>/g, "").replace("Issued:", "").trim() ?? "",
      link: linkM?.[1] ?? "https://weather.gc.ca/warnings/report_e.html?ab12",
    });
  }
  return entries.slice(0, 3);
}

// ---- 3. AQHI — Air Quality Health Index (MSC GeoMet OGC API) ----------------
async function fetchAQHI(): Promise<{ value: number; risk: string; label: string } | null> {
  const url =
    "https://api.weather.gc.ca/collections/aqhi-observations-realtime/items" +
    "?location_name_en=Calgary&f=json&limit=1&sortby=-observation_datetime";
  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) return null;
  const json = await res.json();
  const value: number = json.features?.[0]?.properties?.aqhi ?? 0;
  const risk =
    value <= 3 ? "Low" :
    value <= 6 ? "Moderate" :
    value <= 10 ? "High" : "Very High";
  const label =
    value <= 3 ? "Ideal for outdoor activity" :
    value <= 6 ? "Unusually sensitive individuals should reduce prolonged outdoor exertion" :
    value <= 10 ? "Reduce outdoor exertion — wear a mask if sensitive" :
    "Avoid outdoor exertion; health risk is very high";
  return { value: Math.round(value * 10) / 10, risk, label };
}

// ---- 4. Calgary news RSS feeds ---------------------------------------------

type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  sourceUrl: string;
};

const NEWS_FEEDS: { name: string; url: string; siteUrl: string }[] = [
  {
    name: "660 CityNews",
    url: "https://www.660citynews.com/feed/",
    siteUrl: "https://calgary.citynews.ca",
  },
  {
    name: "CBC Calgary",
    url: "https://www.cbc.ca/cmlink/rss-canada-calgary",
    siteUrl: "https://www.cbc.ca/news/canada/calgary",
  },
  {
    name: "Global News",
    url: "https://globalnews.ca/calgary/feed/",
    siteUrl: "https://globalnews.ca/calgary/",
  },
  {
    name: "Calgary Herald",
    url: "https://calgaryherald.com/feed/",
    siteUrl: "https://calgaryherald.com",
  },
];

/** Parse a single RSS 2.0 feed and return up to `limit` items. */
function parseRSS(xml: string, sourceName: string, siteUrl: string, limit = 3): NewsItem[] {
  const items: NewsItem[] = [];
  // Match <item> blocks
  const itemRx = /<item[^>]*>([\s\S]*?)<\/item>/g;
  // Strip CDATA wrappers and HTML tags
  const clean = (s: string) =>
    s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/<[^>]+>/g, "").trim();

  let m: RegExpExecArray | null;
  while ((m = itemRx.exec(xml)) !== null && items.length < limit) {
    const block = m[1];
    const titleM = /<title[^>]*>([\s\S]*?)<\/title>/.exec(block);
    const linkM = /<link>([\s\S]*?)<\/link>/.exec(block) ??
      /<link[^/].*?href="([^"]+)"/.exec(block);
    const dateM = /<pubDate>([\s\S]*?)<\/pubDate>/.exec(block) ??
      /<dc:date>([\s\S]*?)<\/dc:date>/.exec(block);

    const title = clean(titleM?.[1] ?? "").replace(/&amp;/g, "&").replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    const link  = clean(linkM?.[1] ?? "");
    const pubDate = clean(dateM?.[1] ?? "");

    if (!title || !link) continue;
    // Skip obvious feed-level title duplicates
    if (title === sourceName || title === "CBC | Calgary News") continue;

    items.push({ title, link, pubDate, source: sourceName, sourceUrl: siteUrl });
  }
  return items;
}

async function fetchOneFeed(feed: (typeof NEWS_FEEDS)[0]): Promise<NewsItem[]> {
  try {
    const res = await fetch(feed.url, {
      next: { revalidate: 600 },
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; CalgaryKonnect/1.0)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      redirect: "follow",
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRSS(xml, feed.name, feed.siteUrl, 2);
  } catch {
    return [];
  }
}

async function fetchNews(): Promise<NewsItem[]> {
  const results = await Promise.allSettled(NEWS_FEEDS.map(fetchOneFeed));
  const all: NewsItem[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") all.push(...r.value);
  }
  // Sort by pubDate descending, most-recent first
  all.sort((a, b) => {
    const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return db - da;
  });
  return all.slice(0, 8); // top 8 across all sources
}

// ---- Handler ----------------------------------------------------------------
export async function GET() {
  try {
    const [weather, alerts, aqhi, news] = await Promise.allSettled([
      fetchWeather(),
      fetchAlerts(),
      fetchAQHI(),
      fetchNews(),
    ]);

    return NextResponse.json(
      {
        weather:  weather.status  === "fulfilled" ? weather.value  : null,
        alerts:   alerts.status   === "fulfilled" ? alerts.value   : [],
        aqhi:     aqhi.status     === "fulfilled" ? aqhi.value     : null,
        news:     news.status     === "fulfilled" ? news.value     : [],
        fetchedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120",
        },
      }
    );
  } catch (err) {
    console.error("[calgary-pulse]", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
