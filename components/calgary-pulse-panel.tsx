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

/** Sky gradient colours per scene — used in SVG defs */
function skyColors(scene: WeatherScene): { top: string; mid: string; bot: string } {
  switch (scene) {
    case "sunny":         return { top: "#1a6eb5", mid: "#3ba8e0", bot: "#87d4f5" };
    case "partly_cloudy": return { top: "#1460a0", mid: "#2e90c8", bot: "#a8d8ef" };
    case "cloudy":        return { top: "#4a5568", mid: "#718096", bot: "#a0aec0" };
    case "rainy":         return { top: "#1a2e45", mid: "#2d4a6a", bot: "#4a6a8a" };
    case "snowy":         return { top: "#2d3d55", mid: "#5a6f88", bot: "#c8d8e8" };
    case "stormy":        return { top: "#0d1b2a", mid: "#1e2d3d", bot: "#2d3d4d" };
    case "night":         return { top: "#080d1a", mid: "#0f1b35", bot: "#1a2a4a" };
  }
}

// ---- Animated SVG scenes ----------------------------------------------------

function SunElement() {
  return (
    <g>
      {/* Outer glow */}
      <motion.circle cx="72" cy="42" r="26"
        fill="rgba(253,224,71,0.12)"
        animate={{ r: [26, 30, 26], opacity: [0.12, 0.18, 0.12] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      {/* Mid glow */}
      <circle cx="72" cy="42" r="18" fill="rgba(253,224,71,0.20)" />
      {/* Sun disc */}
      <motion.circle cx="72" cy="42" r="12"
        fill="#FDE047"
        animate={{ scale: [1, 1.04, 1], opacity: [0.92, 1, 0.92] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
      />
      {/* Rays */}
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i * 36 * Math.PI) / 180;
        return (
          <motion.line key={i}
            x1={72 + 15 * Math.cos(a)} y1={42 + 15 * Math.sin(a)}
            x2={72 + 23 * Math.cos(a)} y2={42 + 23 * Math.sin(a)}
            stroke="#FDE047" strokeWidth="2" strokeLinecap="round"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.15, ease: "easeInOut" }}
          />
        );
      })}
    </g>
  );
}

function CloudElement({ x = 0, y = 0, scaleX = 1, scaleY = 1, opacity = 1, delay = 0, drift = 8, dark = false }: {
  x?: number; y?: number; scaleX?: number; scaleY?: number; opacity?: number; delay?: number; drift?: number; dark?: boolean;
}) {
  const fill = dark ? "rgba(60,72,88,0.88)" : "rgba(255,255,255,0.94)";
  const fill2 = dark ? "rgba(50,62,78,0.82)" : "rgba(255,255,255,0.88)";
  return (
    <motion.g
      animate={{ x: [0, drift, 0] }}
      transition={{ repeat: Infinity, duration: 10 + delay * 2, delay, ease: "easeInOut" }}
      style={{ opacity }}
    >
      <g transform={`translate(${x},${y}) scale(${scaleX},${scaleY})`}>
        <ellipse cx="28" cy="14" rx="18" ry="10" fill={fill} />
        <ellipse cx="46" cy="12" rx="13" ry="9"  fill={fill} />
        <ellipse cx="14" cy="15" rx="11" ry="8"  fill={fill2} />
        <rect x="6" y="15" width="52" height="8" rx="4" fill={fill2} />
      </g>
    </motion.g>
  );
}

function RainDrops() {
  return (
    <>
      {Array.from({ length: 22 }, (_, i) => {
        const cx = 5 + (i * 14) % 280;
        const cy = 20 + (i * 9) % 50;
        const delay = (i * 0.14) % 1.2;
        return (
          <motion.line key={i}
            x1={cx} y1={cy} x2={cx - 2} y2={cy + 11}
            stroke="rgba(147,197,253,0.7)" strokeWidth="1.5" strokeLinecap="round"
            animate={{ y: [0, 40, 0], opacity: [0, 0.85, 0] }}
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
      {Array.from({ length: 18 }, (_, i) => {
        const cx = 8 + (i * 16) % 274;
        const cy = 18 + (i * 8) % 48;
        const delay = (i * 0.2) % 2.0;
        return (
          <motion.circle key={i} cx={cx} cy={cy} r={i % 4 === 0 ? 2.5 : 1.8}
            fill="rgba(226,232,240,0.9)"
            animate={{ y: [0, 35, 0], opacity: [0, 1, 0], x: [0, i % 2 === 0 ? 5 : -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, delay, ease: "easeInOut" }}
          />
        );
      })}
    </>
  );
}

function LightningBolt({ x, y }: { x: number; y: number }) {
  return (
    <motion.polygon
      points={`${x},${y} ${x-6},${y+14} ${x+1},${y+14} ${x-5},${y+30} ${x+10},${y+11} ${x+3},${y+11}`}
      fill="#FDE68A"
      animate={{ opacity: [0, 1, 0.2, 1, 0] }}
      transition={{ repeat: Infinity, duration: 3.8, delay: x * 0.008, ease: "easeOut" }}
    />
  );
}

function StarField() {
  return (
    <>
      {Array.from({ length: 28 }, (_, i) => {
        const cx = 5 + (i * 23) % 280;
        const cy = 4 + (i * 7) % 55;
        const r = i % 4 === 0 ? 1.8 : i % 3 === 0 ? 1.3 : 0.9;
        return (
          <motion.circle key={i} cx={cx} cy={cy} r={r}
            fill="white"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ repeat: Infinity, duration: 1.8 + (i % 4), delay: (i * 0.18) % 2.5, ease: "easeInOut" }}
          />
        );
      })}
    </>
  );
}

/**
 * Panoramic mountain + Calgary skyline silhouette.
 * viewBox: 0 0 300 100 — wide 3:1 panorama.
 * Five mountain layers for depth (far→near), then city buildings, Calgary Tower.
 */
function PanoramicLandscape({ scene }: { scene: WeatherScene }) {
  // Mountain tint adapts to weather mood
  const isLight = scene === "sunny" || scene === "partly_cloudy";
  const snow = scene === "snowy";

  const mtn = (alpha: number) =>
    snow ? `rgba(210,220,235,${alpha})` : isLight ? `rgba(15,30,60,${alpha})` : `rgba(10,20,40,${alpha})`;
  const mtnSnow = (alpha: number) => `rgba(235,242,252,${alpha})`;
  const bld = (alpha: number) =>
    isLight ? `rgba(10,20,50,${alpha})` : `rgba(5,12,30,${alpha})`;

  return (
    <g>
      {/* Layer 1 — farthest mountains, lightest */}
      <polygon points="0,78 22,52 44,78"   fill={mtn(0.28)} />
      <polygon points="16,78 44,38 72,78"  fill={mtn(0.30)} />
      <polygon points="55,78 78,44 101,78" fill={mtn(0.28)} />
      <polygon points="88,78 108,50 128,78" fill={mtn(0.26)} />
      <polygon points="115,78 134,55 153,78" fill={mtn(0.24)} />
      <polygon points="140,78 160,48 180,78" fill={mtn(0.22)} />
      <polygon points="170,78 192,54 214,78" fill={mtn(0.20)} />
      <polygon points="200,78 220,50 240,78" fill={mtn(0.22)} />
      <polygon points="230,78 256,42 282,78" fill={mtn(0.24)} />
      <polygon points="262,78 285,52 300,78" fill={mtn(0.22)} />

      {/* Snow caps on far mountains (snowy scene) */}
      {snow && <>
        <polygon points="44,38 38,48 50,48"  fill={mtnSnow(0.7)} />
        <polygon points="108,50 103,58 113,58" fill={mtnSnow(0.65)} />
        <polygon points="256,42 251,52 261,52" fill={mtnSnow(0.68)} />
      </>}

      {/* Layer 2 — mid mountains, medium */}
      <polygon points="0,82 30,48 60,82"    fill={mtn(0.45)} />
      <polygon points="40,82 74,30 108,82"  fill={mtn(0.50)} />
      <polygon points="90,82 120,36 150,82" fill={mtn(0.48)} />
      <polygon points="138,82 165,44 192,82" fill={mtn(0.46)} />
      <polygon points="180,82 210,32 240,82" fill={mtn(0.52)} />
      <polygon points="225,82 255,40 285,82" fill={mtn(0.48)} />
      <polygon points="265,82 290,50 300,82" fill={mtn(0.44)} />

      {/* Snow caps on mid mountains */}
      {snow && <>
        <polygon points="74,30 67,44 81,44"   fill={mtnSnow(0.80)} />
        <polygon points="120,36 114,48 126,48" fill={mtnSnow(0.75)} />
        <polygon points="210,32 203,46 217,46" fill={mtnSnow(0.80)} />
      </>}

      {/* Layer 3 — near mountains, darkest */}
      <polygon points="0,88 40,56 80,88"     fill={mtn(0.68)} />
      <polygon points="60,88 100,42 140,88"  fill={mtn(0.72)} />
      <polygon points="120,88 158,52 196,88" fill={mtn(0.70)} />
      <polygon points="178,88 220,44 262,88" fill={mtn(0.72)} />
      <polygon points="248,88 278,58 300,88" fill={mtn(0.66)} />

      {/* City buildings — sits in front of mountains */}
      {/* Far-right cluster */}
      <rect x="240" y="76" width="10" height="14" rx="1" fill={bld(0.70)} />
      <rect x="253" y="71" width="8"  height="19" rx="1" fill={bld(0.75)} />
      <rect x="264" y="74" width="11" height="16" rx="1" fill={bld(0.70)} />
      <rect x="278" y="68" width="9"  height="22" rx="1" fill={bld(0.78)} />
      <rect x="290" y="72" width="10" height="18" rx="1" fill={bld(0.72)} />

      {/* Right cluster */}
      <rect x="196" y="74" width="9"  height="16" rx="1" fill={bld(0.74)} />
      <rect x="207" y="68" width="11" height="22" rx="1" fill={bld(0.78)} />
      <rect x="221" y="71" width="8"  height="19" rx="1" fill={bld(0.72)} />
      <rect x="232" y="75" width="6"  height="15" rx="1" fill={bld(0.68)} />

      {/* Centre-right cluster */}
      <rect x="148" y="72" width="10" height="18" rx="1" fill={bld(0.76)} />
      <rect x="161" y="65" width="12" height="25" rx="1" fill={bld(0.80)} />
      <rect x="176" y="68" width="8"  height="22" rx="1" fill={bld(0.78)} />

      {/* Calgary Tower — centrepiece around x=128 */}
      {/* Tower shaft */}
      <rect x="124" y="68" width="7" height="22" rx="0.5" fill={bld(0.92)} />
      {/* Elevator shaft (thinner top) */}
      <rect x="126" y="55" width="3" height="16" fill={bld(0.92)} />
      {/* Observation deck — the distinctive round collar */}
      <ellipse cx="127.5" cy="54" rx="8" ry="4" fill={bld(0.94)} />
      <rect x="119.5" y="52" width="16" height="4" rx="2" fill={bld(0.94)} />
      {/* Glass ring on deck */}
      <ellipse cx="127.5" cy="52" rx="7" ry="2.5"
        fill="none" stroke={isLight ? "rgba(150,210,255,0.5)" : "rgba(100,160,220,0.35)"} strokeWidth="0.8" />
      {/* Antenna */}
      <rect x="127" y="42" width="1.2" height="12" fill={bld(0.96)} />
      {/* Antenna tip glow (night or stormy) */}
      {(scene === "night" || scene === "stormy") && (
        <motion.circle cx="127.6" cy="42" r="1.5"
          fill="#ff4444"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        />
      )}

      {/* Left cluster */}
      <rect x="62"  y="74" width="9"  height="16" rx="1" fill={bld(0.76)} />
      <rect x="73"  y="68" width="11" height="22" rx="1" fill={bld(0.80)} />
      <rect x="87"  y="71" width="8"  height="19" rx="1" fill={bld(0.75)} />
      <rect x="98"  y="66" width="12" height="24" rx="1" fill={bld(0.82)} />
      <rect x="113" y="70" width="8"  height="20" rx="1" fill={bld(0.78)} />

      {/* Far-left cluster */}
      <rect x="0"   y="76" width="10" height="14" rx="1" fill={bld(0.70)} />
      <rect x="12"  y="70" width="9"  height="20" rx="1" fill={bld(0.75)} />
      <rect x="24"  y="73" width="11" height="17" rx="1" fill={bld(0.72)} />
      <rect x="38"  y="67" width="8"  height="23" rx="1" fill={bld(0.78)} />
      <rect x="49"  y="71" width="10" height="19" rx="1" fill={bld(0.74)} />

      {/* Foreground ground strip — gradient from dark to transparent top */}
      <defs>
        <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(8,15,30,0)" />
          <stop offset="100%" stopColor="rgba(8,15,30,0.92)" />
        </linearGradient>
      </defs>
      <rect x="0" y="82" width="300" height="18" fill="url(#groundGrad)" />
    </g>
  );
}

/** Full animated weather SVG canvas — wide 3:1 panoramic */
function WeatherScene({ scene }: { scene: WeatherScene }) {
  const sky = skyColors(scene);
  return (
    <svg
      viewBox="0 0 300 100"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={sky.top} />
          <stop offset="55%"  stopColor={sky.mid} />
          <stop offset="100%" stopColor={sky.bot} />
        </linearGradient>
        {/* Horizon glow for sunny/partly cloudy */}
        {(scene === "sunny" || scene === "partly_cloudy") && (
          <radialGradient id="horizonGlow" cx="50%" cy="78%" r="55%">
            <stop offset="0%"   stopColor="rgba(255,200,80,0.28)" />
            <stop offset="100%" stopColor="rgba(255,200,80,0)" />
          </radialGradient>
        )}
      </defs>

      {/* Sky fill */}
      <rect x="0" y="0" width="300" height="100" fill="url(#skyGrad)" />

      {/* Horizon glow */}
      {(scene === "sunny" || scene === "partly_cloudy") && (
        <rect x="0" y="0" width="300" height="100" fill="url(#horizonGlow)" />
      )}

      {/* Night stars */}
      {scene === "night" && <StarField />}

      {/* Moon (night) */}
      {scene === "night" && (
        <>
          <motion.circle cx="248" cy="22" r="14"
            fill="#e8eef5"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          />
          {/* Shadow slice to make crescent */}
          <circle cx="253" cy="18" r="12" fill={sky.top} />
        </>
      )}

      {/* Sun */}
      {(scene === "sunny" || scene === "partly_cloudy") && <SunElement />}

      {/* Clouds */}
      {scene === "partly_cloudy" && (
        <>
          <CloudElement x={100} y={20} scaleX={1.2} scaleY={0.9} opacity={0.88} delay={0}   drift={14} />
          <CloudElement x={210} y={30} scaleX={0.9} scaleY={0.8} opacity={0.72} delay={2}   drift={10} />
        </>
      )}
      {scene === "cloudy" && (
        <>
          <CloudElement x={0}   y={8}  scaleX={1.3} scaleY={1.0} opacity={0.90} delay={0}   drift={16} dark />
          <CloudElement x={90}  y={5}  scaleX={1.1} scaleY={0.95} opacity={0.82} delay={1.5} drift={12} dark />
          <CloudElement x={175} y={10} scaleX={1.2} scaleY={1.0} opacity={0.86} delay={0.8} drift={14} dark />
          <CloudElement x={240} y={4}  scaleX={0.9} scaleY={0.88} opacity={0.78} delay={2.5} drift={10} dark />
        </>
      )}
      {scene === "rainy" && (
        <>
          <CloudElement x={0}   y={4}  scaleX={1.4} scaleY={1.1} opacity={0.88} delay={0}   drift={8}  dark />
          <CloudElement x={90}  y={2}  scaleX={1.2} scaleY={1.0} opacity={0.82} delay={1}   drift={6}  dark />
          <CloudElement x={190} y={5}  scaleX={1.3} scaleY={1.05} opacity={0.85} delay={0.6} drift={7}  dark />
          <RainDrops />
        </>
      )}
      {scene === "snowy" && (
        <>
          <CloudElement x={0}   y={3}  scaleX={1.3} scaleY={1.0} opacity={0.80} delay={0}   drift={5}  dark />
          <CloudElement x={100} y={1}  scaleX={1.1} scaleY={0.9} opacity={0.75} delay={1.5} drift={4}  dark />
          <CloudElement x={195} y={4}  scaleX={1.2} scaleY={0.95} opacity={0.78} delay={0.8} drift={6}  dark />
          <SnowFlakes />
        </>
      )}
      {scene === "stormy" && (
        <>
          <CloudElement x={0}   y={0}  scaleX={1.5} scaleY={1.2} opacity={0.92} delay={0}   drift={4}  dark />
          <CloudElement x={110} y={-2} scaleX={1.4} scaleY={1.15} opacity={0.88} delay={0.5} drift={3}  dark />
          <CloudElement x={210} y={2}  scaleX={1.3} scaleY={1.1} opacity={0.90} delay={1.0} drift={5}  dark />
          <RainDrops />
          <LightningBolt x={88}  y={38} />
          <LightningBolt x={188} y={34} />
        </>
      )}

      {/* Panoramic landscape (mountains + city + Calgary Tower) always on top */}
      <PanoramicLandscape scene={scene} />
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
          className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/30 border border-white/10"
          style={{ aspectRatio: "16/7" }}
        >
          {/* Full-bleed animated panorama — fills the entire card */}
          <div className="absolute inset-0">
            <WeatherScene scene={scene} />
          </div>

          {/* Top-left: frosted glass info strip */}
          <div className="absolute top-3 left-3 right-3 z-10">
            <div className="inline-flex flex-col gap-0.5 backdrop-blur-md bg-black/28 rounded-xl px-3 py-2 border border-white/10">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/55">Calgary, AB</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white leading-none drop-shadow">{weather.temp}°C</span>
                <span className="text-xs font-semibold text-white/80">{getSeasonLabel(weather.temp, weather.wmoCode)}</span>
              </div>
              <p className="text-[10px] text-white/60">
                Feels {weather.feelsLike}°C &middot; {wmoToDesc(weather.wmoCode)}
              </p>
            </div>
          </div>

          {/* Bottom: stat bar — glass strip sitting over the cityscape */}
          <div className="absolute bottom-0 inset-x-0 z-10">
            <div className="backdrop-blur-md bg-black/30 border-t border-white/10 grid grid-cols-3 divide-x divide-white/10">
              <div className="flex items-center justify-center gap-1.5 py-2">
                <Wind className="w-3 h-3 text-white/55 flex-shrink-0" />
                <div className="text-center">
                  <span className="text-sm font-black text-white leading-none">{weather.windKph}</span>
                  <span className="text-[8px] text-white/45 block uppercase tracking-wide">km/h</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5 py-2">
                <Droplets className="w-3 h-3 text-white/55 flex-shrink-0" />
                <div className="text-center">
                  <span className="text-sm font-black text-white leading-none">{weather.humidity}%</span>
                  <span className="text-[8px] text-white/45 block uppercase tracking-wide">Humid</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5 py-2">
                <Sun className="w-3 h-3 text-white/55 flex-shrink-0" />
                <div className="text-center">
                  <span className="text-sm font-black text-white leading-none">{weather.uvIndex}</span>
                  <span className="text-[8px] text-white/45 block uppercase tracking-wide">UV</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="rounded-2xl bg-foreground/[0.06] flex items-center justify-center" style={{ aspectRatio: "16/7" }}>
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
