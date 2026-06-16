"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wind, Droplets, Sun, AlertTriangle, Activity,
  ExternalLink, RefreshCw, Eye, Cloud, Loader2,
  Radio, ChevronRight, ArrowUpRight,
} from "lucide-react";

// ---- Types ------------------------------------------------------------------

type WeatherData = {
  temp: number;
  feelsLike: number;
  wmoCode: number;
  isDay: boolean;
  windKph: number;
  humidity: number;
  uvIndex: number;
};

type AlertItem = {
  title: string;
  issued: string;
  link: string;
};

type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  sourceUrl: string;
};

type AQHIData = {
  value: number;
  risk: string;
  label: string;
};

type PulseData = {
  weather: WeatherData | null;
  alerts: AlertItem[];
  aqhi: AQHIData | null;
  news: NewsItem[];
  fetchedAt: string;
};

// ---- Weather helpers --------------------------------------------------------

function wmoToDesc(code: number): string {
  if (code === 0) return "Clear sky";
  if (code <= 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code <= 49) return "Fog";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain showers";
  if (code <= 86) return "Snow showers";
  if (code <= 99) return "Thunderstorm";
  return "Variable";
}

function getSeasonLabel(temp: number, wmo: number): string {
  const month = new Date().getMonth();
  if (wmo >= 95) return "Thunderstorm Warning";
  if (wmo >= 71 && wmo <= 77) return "Snow Conditions";
  if ((wmo >= 51 && wmo <= 67) || (wmo >= 80 && wmo <= 82)) return "Rainy Day";
  if (month >= 5 && month <= 8 && temp >= 22) return "Warm Summer Day";
  if (month >= 5 && month <= 8) return "Summer Weather";
  if (month === 11 || month <= 1) return "Winter Weather";
  if (month >= 2 && month <= 4) return "Spring Weather";
  return "Autumn Weather";
}

/** Determine which scene to show based on WMO code */
type WeatherScene = "sunny" | "partly_cloudy" | "cloudy" | "rainy" | "snowy" | "stormy" | "night";
function getScene(wmo: number, isDay: boolean): WeatherScene {
  if (!isDay) return "night";
  if (wmo >= 95) return "stormy";
  if (wmo >= 71 && wmo <= 86) return "snowy";
  if ((wmo >= 51 && wmo <= 67) || (wmo >= 80 && wmo <= 82)) return "rainy";
  if (wmo >= 3) return "cloudy";
  if (wmo >= 1) return "partly_cloudy";
  return "sunny";
}

/** Sky gradient top colour per scene */
function skyGradient(scene: WeatherScene): string {
  switch (scene) {
    case "sunny":        return "from-[#0ea5e9] via-[#38bdf8] to-[#7dd3fc]";
    case "partly_cloudy":return "from-[#0284c7] via-[#38bdf8] to-[#bae6fd]";
    case "cloudy":       return "from-[#334155] via-[#475569] to-[#64748b]";
    case "rainy":        return "from-[#1e3a5f] via-[#1e4060] to-[#334155]";
    case "snowy":        return "from-[#1e3a5c] via-[#334155] to-[#94a3b8]";
    case "stormy":       return "from-[#0f172a] via-[#1e293b] to-[#334155]";
    case "night":        return "from-[#0f172a] via-[#1e1b4b] to-[#312e81]";
  }
}

/** Ambient overlay tint for scene card */
function ambientTint(scene: WeatherScene): string {
  switch (scene) {
    case "sunny":
    case "partly_cloudy": return "bg-yellow-400/[0.04]";
    case "rainy":         return "bg-blue-600/[0.06]";
    case "snowy":         return "bg-blue-200/[0.06]";
    case "stormy":        return "bg-slate-900/[0.10]";
    case "night":         return "bg-indigo-900/[0.10]";
    default:              return "";
  }
}

// ---- Animated SVG scenes ----------------------------------------------------

function SunElement() {
  return (
    <g>
      {/* Glow halo */}
      <circle cx="68" cy="44" r="22" fill="rgba(251,191,36,0.18)" />
      {/* Sun disc */}
      <motion.circle
        cx="68" cy="44" r="14"
        fill="#FDE68A"
        animate={{ scale: [1, 1.06, 1], opacity: [0.95, 1, 0.95] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
      />
      {/* Rays */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x1 = 68 + 17 * Math.cos(angle);
        const y1 = 44 + 17 * Math.sin(angle);
        const x2 = 68 + 24 * Math.cos(angle);
        const y2 = 44 + 24 * Math.sin(angle);
        return (
          <motion.line
            key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.1, ease: "easeInOut" }}
          />
        );
      })}
    </g>
  );
}

function CloudElement({ x = 0, y = 0, scale = 1, opacity = 1, delay = 0, drift = 8 }: {
  x?: number; y?: number; scale?: number; opacity?: number; delay?: number; drift?: number;
}) {
  return (
    <motion.g
      transform={`translate(${x},${y}) scale(${scale})`}
      animate={{ x: [0, drift, 0] }}
      transition={{ repeat: Infinity, duration: 8 + delay, delay, ease: "easeInOut" }}
      style={{ opacity }}
    >
      <ellipse cx="22" cy="18" rx="14" ry="8" fill="rgba(255,255,255,0.92)" />
      <ellipse cx="36" cy="16" rx="10" ry="7" fill="rgba(255,255,255,0.92)" />
      <ellipse cx="12" cy="19" rx="9"  ry="6" fill="rgba(255,255,255,0.88)" />
      <rect x="4" y="19" width="44" height="6" rx="3" fill="rgba(255,255,255,0.88)" />
    </motion.g>
  );
}

function RainDrops() {
  return (
    <>
      {Array.from({ length: 18 }, (_, i) => {
        const cx = 10 + (i * 17) % 155;
        const cy = 32 + (i * 11) % 36;
        const delay = (i * 0.18) % 1.4;
        return (
          <motion.line
            key={i}
            x1={cx} y1={cy} x2={cx - 2} y2={cy + 9}
            stroke="rgba(147,197,253,0.85)" strokeWidth="1.5" strokeLinecap="round"
            animate={{ y: [0, 28, 0], opacity: [0, 0.9, 0] }}
            transition={{ repeat: Infinity, duration: 1.1, delay, ease: "linear" }}
          />
        );
      })}
    </>
  );
}

function SnowFlakes() {
  return (
    <>
      {Array.from({ length: 14 }, (_, i) => {
        const cx = 12 + (i * 13) % 152;
        const cy = 28 + (i * 9) % 30;
        const delay = (i * 0.22) % 1.8;
        return (
          <motion.circle
            key={i} cx={cx} cy={cy} r="2"
            fill="rgba(219,234,254,0.9)"
            animate={{ y: [0, 30, 0], opacity: [0, 1, 0], x: [0, (i % 2 === 0 ? 4 : -4), 0] }}
            transition={{ repeat: Infinity, duration: 1.8, delay, ease: "easeInOut" }}
          />
        );
      })}
    </>
  );
}

function LightningBolt({ x, y }: { x: number; y: number }) {
  return (
    <motion.polygon
      points={`${x},${y} ${x-5},${y+12} ${x+1},${y+12} ${x-4},${y+24} ${x+8},${y+9} ${x+2},${y+9}`}
      fill="#FDE68A"
      animate={{ opacity: [0, 1, 0, 1, 0] }}
      transition={{ repeat: Infinity, duration: 3.2, delay: x * 0.01, ease: "easeOut" }}
    />
  );
}

function StarField() {
  return (
    <>
      {Array.from({ length: 20 }, (_, i) => {
        const cx = 8 + (i * 19) % 155;
        const cy = 6 + (i * 7) % 32;
        return (
          <motion.circle
            key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.5 : 1}
            fill="white"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 + (i % 3), delay: (i * 0.15) % 2, ease: "easeInOut" }}
          />
        );
      })}
    </>
  );
}

/** Mountain silhouette (shared across all scenes) */
function MountainCityscape() {
  return (
    <g>
      {/* Background mountains */}
      <polygon points="0,68 28,36 56,68" fill="rgba(15,23,42,0.55)" />
      <polygon points="18,68 52,22 86,68" fill="rgba(15,23,42,0.65)" />
      <polygon points="60,68 88,30 116,68" fill="rgba(15,23,42,0.55)" />
      <polygon points="100,68 124,38 148,68" fill="rgba(15,23,42,0.50)" />
      <polygon points="130,68 154,42 178,68" fill="rgba(15,23,42,0.45)" />
      {/* City buildings foreground */}
      <rect x="0"   y="52" width="12" height="16" fill="rgba(15,23,42,0.75)" rx="1" />
      <rect x="14"  y="46" width="10" height="22" fill="rgba(15,23,42,0.80)" rx="1" />
      <rect x="26"  y="50" width="8"  height="18" fill="rgba(15,23,42,0.70)" rx="1" />
      <rect x="36"  y="44" width="14" height="24" fill="rgba(15,23,42,0.82)" rx="1" />
      {/* Calgary Tower */}
      <rect x="72"  y="48" width="6"  height="20" fill="rgba(15,23,42,0.88)" rx="0.5" />
      <rect x="70"  y="45" width="10" height="5"  fill="rgba(15,23,42,0.88)" rx="1" />
      <rect x="74"  y="36" width="2"  height="12" fill="rgba(15,23,42,0.88)" />
      <circle cx="75" cy="34" r="3"  fill="rgba(15,23,42,0.88)" />
      <rect x="74.5" y="30" width="1" height="6" fill="rgba(15,23,42,0.88)" />
      {/* More buildings right */}
      <rect x="86"  y="50" width="10" height="18" fill="rgba(15,23,42,0.78)" rx="1" />
      <rect x="98"  y="54" width="8"  height="14" fill="rgba(15,23,42,0.72)" rx="1" />
      <rect x="108" y="48" width="12" height="20" fill="rgba(15,23,42,0.80)" rx="1" />
      <rect x="122" y="52" width="9"  height="16" fill="rgba(15,23,42,0.70)" rx="1" />
      <rect x="133" y="46" width="11" height="22" fill="rgba(15,23,42,0.78)" rx="1" />
      <rect x="146" y="55" width="8"  height="13" fill="rgba(15,23,42,0.65)" rx="1" />
      <rect x="156" y="50" width="10" height="18" fill="rgba(15,23,42,0.72)" rx="1" />
      {/* Ground strip */}
      <rect x="0" y="65" width="180" height="4" fill="rgba(15,23,42,0.75)" />
    </g>
  );
}

/** Full animated weather SVG canvas */
function WeatherScene({ scene }: { scene: WeatherScene }) {
  return (
    <svg
      viewBox="0 0 180 70"
      className="w-full h-full"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden
    >
      {/* Sky */}
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={scene === "sunny" ? "#0ea5e9" : scene === "night" ? "#0f172a" : scene === "stormy" ? "#1e293b" : scene === "rainy" ? "#1e3a5f" : "#334155"} />
          <stop offset="100%" stopColor={scene === "sunny" ? "#7dd3fc" : scene === "night" ? "#312e81" : scene === "stormy" ? "#334155" : scene === "rainy" ? "#334155" : "#94a3b8"} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="180" height="70" fill="url(#skyGrad)" />

      {/* Scene-specific elements */}
      {scene === "night" && <StarField />}
      {(scene === "sunny") && <SunElement />}
      {(scene === "partly_cloudy") && (
        <>
          <SunElement />
          <CloudElement x={40} y={18} scale={0.8} opacity={0.92} delay={0} drift={10} />
        </>
      )}
      {scene === "cloudy" && (
        <>
          <CloudElement x={10}  y={8}  scale={1.1}  opacity={0.90} delay={0}   drift={12} />
          <CloudElement x={65}  y={4}  scale={0.85} opacity={0.80} delay={1.5} drift={8}  />
          <CloudElement x={105} y={10} scale={0.95} opacity={0.85} delay={0.8} drift={10} />
        </>
      )}
      {scene === "rainy" && (
        <>
          <CloudElement x={5}   y={6}  scale={1.05} opacity={0.85} delay={0}   drift={6} />
          <CloudElement x={70}  y={3}  scale={0.90} opacity={0.80} delay={1}   drift={5} />
          <CloudElement x={115} y={8}  scale={0.95} opacity={0.82} delay={0.6} drift={7} />
          <RainDrops />
        </>
      )}
      {scene === "snowy" && (
        <>
          <CloudElement x={8}   y={4}  scale={1.0}  opacity={0.80} delay={0}   drift={5} />
          <CloudElement x={80}  y={2}  scale={0.88} opacity={0.75} delay={1.2} drift={4} />
          <CloudElement x={118} y={6}  scale={0.92} opacity={0.78} delay={0.7} drift={6} />
          <SnowFlakes />
        </>
      )}
      {scene === "stormy" && (
        <>
          <CloudElement x={0}   y={2}  scale={1.2}  opacity={0.90} delay={0}   drift={4} />
          <CloudElement x={75}  y={0}  scale={1.1}  opacity={0.85} delay={0.5} drift={3} />
          <CloudElement x={110} y={4}  scale={1.0}  opacity={0.88} delay={1.0} drift={5} />
          <RainDrops />
          <LightningBolt x={55} y={28} />
          <LightningBolt x={105} y={24} />
        </>
      )}
      {scene === "night" && (
        <>
          {/* Moon */}
          <motion.circle cx="140" cy="18" r="11" fill="#e2e8f0"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
          <circle cx="145" cy="14" r="8" fill={scene === "night" ? "#1e1b4b" : "transparent"} />
          <CloudElement x={90} y={20} scale={0.7} opacity={0.45} delay={2} drift={6} />
        </>
      )}

      {/* City/mountain silhouette always on top */}
      <MountainCityscape />
    </svg>
  );
}

// ---- News helpers -----------------------------------------------------------

function sourceBadgeStyle(source: string): { pill: string; tag: string } {
  if (source.includes("660") || source.includes("CityNews"))
    return { pill: "bg-[#1D4ED8]/10 text-[#1D4ED8] ring-1 ring-[#1D4ED8]/20", tag: "bg-[#1D4ED8]/10 text-[#1D4ED8]" };
  if (source.includes("CBC"))
    return { pill: "bg-[#CB2B2B]/10 text-[#CB2B2B] ring-1 ring-[#CB2B2B]/20", tag: "bg-[#CB2B2B]/10 text-[#CB2B2B]" };
  if (source.includes("Global"))
    return { pill: "bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-600/20", tag: "bg-emerald-600/10 text-emerald-700 dark:text-emerald-400" };
  if (source.includes("Herald"))
    return { pill: "bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/20", tag: "bg-amber-500/10 text-amber-700 dark:text-amber-400" };
  return { pill: "bg-foreground/[0.08] text-foreground/60", tag: "bg-foreground/[0.06] text-foreground/50" };
}

function shortSourceName(source: string): string {
  if (source.includes("660") || source.includes("CityNews")) return "660";
  if (source.includes("CBC")) return "CBC";
  if (source.includes("Global")) return "Global";
  if (source.includes("Herald")) return "Herald";
  return source.slice(0, 6);
}

function formatPubDate(raw: string): string {
  if (!raw) return "";
  try {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return "";
    const now = Date.now();
    const diff = now - d.getTime();
    const m = Math.floor(diff / 60000);
    if (m < 2) return "Just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return d.toLocaleDateString("en-CA", { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

function aqhiColour(risk: string): string {
  if (risk === "Low") return "text-emerald-600 dark:text-emerald-400";
  if (risk === "Moderate") return "text-amber-500";
  if (risk === "High") return "text-orange-500";
  return "text-red-600";
}

function alertSeverityStyle(title: string): string {
  const t = title.toUpperCase();
  if (t.includes("RED") || t.includes("EXTREME") || t.includes("EMERGENCY")) return "border-[#E1251B]/40 bg-[#E1251B]/6";
  if (t.includes("ORANGE") || t.includes("WARNING")) return "border-orange-500/40 bg-orange-500/6";
  if (t.includes("YELLOW") || t.includes("WATCH")) return "border-amber-400/40 bg-amber-400/6";
  return "border-foreground/[0.08] bg-foreground/[0.03]";
}

function alertIconColour(title: string): string {
  const t = title.toUpperCase();
  if (t.includes("RED") || t.includes("EXTREME")) return "text-[#E1251B]";
  if (t.includes("ORANGE") || t.includes("WARNING")) return "text-orange-500";
  return "text-amber-500";
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 2) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ---- Skeleton ---------------------------------------------------------------

function PulseSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-40 rounded-2xl bg-foreground/[0.08]" />
      <div className="h-24 rounded-2xl bg-foreground/[0.06]" />
      <div className="space-y-2">
        {[1, 2].map((i) => <div key={i} className="h-16 rounded-xl bg-foreground/[0.05]" />)}
      </div>
      <div className="h-5 rounded-lg bg-foreground/[0.06] w-28" />
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-11 rounded-xl bg-foreground/[0.04]" />)}
      </div>
    </div>
  );
}

// ---- Accordion news item ----------------------------------------------------

function NewsAccordionItem({ item, index }: { item: NewsItem; index: number }) {
  const [open, setOpen] = useState(false);
  const style = sourceBadgeStyle(item.source);
  // Truncate title to ~55 chars for the collapsed hook
  const hook = item.title.length > 58 ? item.title.slice(0, 55).trimEnd() + "…" : item.title;
  const hasMore = item.title.length > 58;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.28 + index * 0.04 }}
      className="rounded-xl border border-foreground/[0.08] bg-foreground/[0.02] hover:border-foreground/[0.14] transition-colors duration-200 overflow-hidden"
    >
      {/* Collapsed row — always visible */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left group"
        aria-expanded={open}
      >
        {/* Source tag */}
        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded flex-shrink-0 leading-none uppercase tracking-wide ${style.tag}`}>
          {shortSourceName(item.source)}
        </span>

        {/* Hook text */}
        <span className="flex-1 min-w-0 text-xs font-semibold text-foreground/85 leading-snug line-clamp-1">
          {hook}
        </span>

        {/* Timestamp */}
        {item.pubDate && (
          <span className="text-[9px] text-foreground/35 flex-shrink-0 pr-1">
            {formatPubDate(item.pubDate)}
          </span>
        )}

        {/* Expand chevron */}
        <ChevronRight
          className={`w-3.5 h-3.5 flex-shrink-0 text-foreground/30 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        />
      </button>

      {/* Expanded panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-0 border-t border-foreground/[0.06]">
              {/* Full title */}
              <p className="text-xs text-foreground/80 leading-relaxed mt-2.5">
                {item.title}
              </p>
              {/* Red CTA link */}
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2.5 text-xs font-bold text-[#E1251B] hover:text-[#b91c1c] transition-colors group"
              >
                Read full story
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              {/* Source attribution */}
              <p className="text-[9px] text-foreground/35 mt-1">via {item.source}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ---- Main component ---------------------------------------------------------

export function CalgaryPulsePanel() {
  const [data, setData] = useState<PulseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const load = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    try {
      const res = await fetch("/api/calgary-pulse", { cache: "no-store" });
      if (!res.ok) throw new Error("fetch failed");
      const json: PulseData = await res.json();
      setData(json);
      setLastUpdated(timeAgo(json.fetchedAt));
    } catch {
      // keep stale data if available
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(() => load(true), 10 * 60 * 1000);
    return () => clearInterval(id);
  }, [load]);

  useEffect(() => {
    const id = setInterval(() => {
      if (data?.fetchedAt) setLastUpdated(timeAgo(data.fetchedAt));
    }, 60_000);
    return () => clearInterval(id);
  }, [data]);

  if (loading) return <PulseSkeleton />;

  const { weather, alerts, aqhi, news } = data ?? { weather: null, alerts: [], aqhi: null, news: [] };
  const scene = weather ? getScene(weather.wmoCode, weather.isDay) : "sunny";

  return (
    <div className="space-y-4">

      {/* Header: last updated + refresh */}
      <div className="flex items-center justify-between text-xs text-foreground/40">
        <span>Updated {lastUpdated}</span>
        <button
          onClick={() => load(true)}
          disabled={refreshing}
          aria-label="Refresh Calgary Pulse data"
          className="flex items-center gap-1 hover:text-foreground/70 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* ---- Animated Weather Card ---------------------------------------- */}
      {weather ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 shadow-xl shadow-black/20"
          style={{ minHeight: "170px" }}
        >
          {/* Animated sky + cityscape scene fills the entire card */}
          <div className={`absolute inset-0 bg-gradient-to-b ${skyGradient(scene)}`} />
          <div className="absolute inset-0">
            <WeatherScene scene={scene} />
          </div>

          {/* Dark overlay so text always reads well */}
          <div className="absolute inset-0 bg-black/20 dark:bg-black/30" />
          {/* Ambient scene tint */}
          <div className={`absolute inset-0 ${ambientTint(scene)}`} />

          {/* Content layer */}
          <div className="relative z-10 p-4 xl:p-5 flex flex-col h-full" style={{ minHeight: "170px" }}>
            {/* Top info */}
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">Calgary</p>
              <p className="text-xl xl:text-2xl font-black text-white leading-tight drop-shadow-sm">
                {weather.temp}°C
              </p>
              <p className="text-xs font-semibold text-white/90 mt-0.5">
                {getSeasonLabel(weather.temp, weather.wmoCode)}
              </p>
              <p className="text-[11px] text-white/65 mt-0.5">
                Feels {weather.feelsLike}°C · {wmoToDesc(weather.wmoCode)}
              </p>
            </div>

            {/* Stat pills anchored to bottom */}
            <div className="grid grid-cols-3 gap-1.5 mt-3">
              <div className="flex flex-col items-center gap-0.5 rounded-xl bg-black/25 backdrop-blur-sm py-2">
                <Wind className="w-3.5 h-3.5 text-white/70" />
                <span className="text-sm font-bold text-white leading-none">{weather.windKph}</span>
                <span className="text-[9px] text-white/55 uppercase tracking-wide">km/h</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 rounded-xl bg-black/25 backdrop-blur-sm py-2">
                <Droplets className="w-3.5 h-3.5 text-white/70" />
                <span className="text-sm font-bold text-white leading-none">{weather.humidity}%</span>
                <span className="text-[9px] text-white/55 uppercase tracking-wide">Humid</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 rounded-xl bg-black/25 backdrop-blur-sm py-2">
                <Sun className="w-3.5 h-3.5 text-white/70" />
                <span className="text-sm font-bold text-white leading-none">{weather.uvIndex}</span>
                <span className="text-[9px] text-white/55 uppercase tracking-wide">UV</span>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="h-44 rounded-2xl bg-foreground/[0.06] flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-foreground/30" />
        </div>
      )}

      {/* ---- AQHI --------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-3 rounded-xl border border-foreground/[0.08] bg-foreground/[0.03] px-4 py-3"
      >
        <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-[#1D4ED8]/12 flex items-center justify-center">
          <Activity className="w-4 h-4 text-[#1D4ED8] dark:text-[#60A5FA]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-foreground/80">Air Quality · AQHI</p>
          {aqhi && <p className="text-[10px] text-foreground/50 mt-0.5 leading-snug">{aqhi.label}</p>}
        </div>
        {aqhi ? (
          <div className="text-right flex-shrink-0">
            <span className={`text-xl font-black leading-none ${aqhiColour(aqhi.risk)}`}>{aqhi.value}</span>
            <p className={`text-[10px] font-bold mt-0.5 ${aqhiColour(aqhi.risk)}`}>{aqhi.risk}</p>
          </div>
        ) : (
          <span className="text-xs text-foreground/35">—</span>
        )}
      </motion.div>

      {/* ---- Weather Alerts ----------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-3.5 h-3.5 text-foreground/45 flex-shrink-0" />
          <p className="text-[10px] font-bold text-foreground/60 uppercase tracking-widest">Active Alerts</p>
          <span className="ml-auto text-[9px] text-foreground/35">Environment Canada</span>
        </div>

        <AnimatePresence mode="popLayout">
          {alerts.length === 0 ? (
            <motion.div
              key="no-alerts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2.5 p-3 rounded-xl border border-emerald-500/25 bg-emerald-500/6"
            >
              <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">All clear</p>
                <p className="text-[10px] text-foreground/45">No active alerts for Calgary</p>
              </div>
            </motion.div>
          ) : (
            alerts.map((alert, i) => (
              <motion.a
                key={alert.link + i}
                href={alert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl border mb-1.5 last:mb-0 hover:opacity-80 transition-opacity ${alertSeverityStyle(alert.title)}`}
              >
                <AlertTriangle className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${alertIconColour(alert.title)}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-foreground leading-snug line-clamp-2">{alert.title}</p>
                  {alert.issued && <p className="text-[10px] text-foreground/45 mt-0.5">{alert.issued}</p>}
                </div>
                <ExternalLink className="w-3 h-3 text-foreground/30 flex-shrink-0 mt-0.5" />
              </motion.a>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* ---- Calgary Headlines -------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Section header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-foreground/[0.06]">
          <div className="w-6 h-6 flex-shrink-0 rounded-md bg-[#E1251B]/10 flex items-center justify-center">
            <Radio className="w-3 h-3 text-[#E1251B]" />
          </div>
          <p className="text-[10px] font-black text-foreground/70 uppercase tracking-widest flex-1">
            Calgary Headlines
          </p>
          <span className="flex items-center gap-1 text-[9px] text-foreground/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            Live
          </span>
        </div>

        {/* Source pills */}
        <div className="flex flex-wrap gap-1 mb-3">
          {(["660 CityNews", "CBC Calgary", "Global News", "Calgary Herald"] as const).map((src) => {
            const s = sourceBadgeStyle(src);
            return (
              <span key={src} className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${s.pill}`}>
                {src}
              </span>
            );
          })}
        </div>

        {/* Accordion headline list */}
        <div className="space-y-1.5">
          {news.length === 0 ? (
            <div className="flex items-center gap-2.5 p-3 rounded-xl border border-foreground/[0.08] bg-foreground/[0.03]">
              <p className="text-xs text-foreground/45">Headlines unavailable — check back shortly.</p>
            </div>
          ) : (
            news.map((item, i) => (
              <NewsAccordionItem key={item.link + i} item={item} index={i} />
            ))
          )}
        </div>
      </motion.div>

      {/* Attribution */}
      <p className="text-[9px] text-foreground/25 text-center leading-relaxed pt-1">
        Open-Meteo · Environment Canada · MSC GeoMet-OGC · 660 CityNews · CBC · Global News · Calgary Herald
      </p>

    </div>
  );
}
