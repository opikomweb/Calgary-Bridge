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
 * Panoramic landscape — Calgary Foothills rolling ridgelines + downtown skyline.
 * Uses SVG cubic-bezier paths so ridgelines are gently curved (not triangular).
 * viewBox: 0 0 300 100
 *
 * Layer order (back to front):
 *   1. Far ridge   — palest, highest horizon
 *   2. Mid ridge   — medium, wide rolls
 *   3. Near ridge  — darkest, fills bottom
 *   4. City blocks + Calgary Tower
 *   5. Ground vignette
 */
function PanoramicLandscape({ scene }: { scene: WeatherScene }) {
  const isLight = scene === "sunny" || scene === "partly_cloudy";
  const snow    = scene === "snowy";

  // Colour helpers
  const mF = (a: number) =>  // far ridge — slate-blue tint
    snow ? `rgba(190,210,232,${a})` : isLight ? `rgba(80,110,160,${a})` : `rgba(50,70,110,${a})`;
  const mM = (a: number) =>  // mid ridge
    snow ? `rgba(160,185,215,${a})` : isLight ? `rgba(40,65,110,${a})` : `rgba(25,45,80,${a})`;
  const mN = (a: number) =>  // near ridge — darkest
    snow ? `rgba(130,155,192,${a})` : isLight ? `rgba(18,35,70,${a})` : `rgba(10,22,50,${a})`;
  const bld = (a: number) =>
    isLight ? `rgba(10,18,45,${a})` : `rgba(5,10,28,${a})`;
  const snowFill = `rgba(238,245,255,0.88)`;

  return (
    <g>
      {/* ── Far ridge: smooth rolling Foothills silhouette ── */}
      {/* Gently curved path — no pyramids, natural undulation */}
      <path
        d="M0,76 C15,72 25,62 40,60 C55,58 65,66 80,64
           C95,62 108,54 125,52 C142,50 155,58 170,56
           C185,54 198,62 215,60 C232,58 248,50 265,52
           C280,54 292,62 300,60 L300,100 L0,100 Z"
        fill={mF(0.38)}
      />
      {/* Snow caps on far ridge peaks */}
      {snow && (
        <path
          d="M38,60 C40,56 42,54 44,52 C46,54 48,58 50,60 Z
             M123,52 C125,48 127,46 129,44 C131,46 133,50 135,52 Z
             M263,52 C265,48 267,46 269,44 C271,46 273,50 275,52 Z"
          fill={snowFill}
        />
      )}

      {/* ── Mid ridge ── */}
      <path
        d="M0,82 C12,76 22,68 38,65 C54,62 68,70 85,67
           C102,64 115,55 135,53 C155,51 168,62 188,60
           C208,58 222,66 242,64 C262,62 278,70 300,68
           L300,100 L0,100 Z"
        fill={mM(0.52)}
      />
      {snow && (
        <path
          d="M133,53 C135,49 137,47 139,45 C141,47 143,51 145,53 Z"
          fill={snowFill}
        />
      )}

      {/* ── Near ridge — foreground hills ── */}
      <path
        d="M0,88 C20,82 38,74 60,72 C80,70 98,78 120,76
           C140,74 158,66 180,68 C202,70 220,78 245,76
           C268,74 284,80 300,78 L300,100 L0,100 Z"
        fill={mN(0.70)}
      />

      {/* ── City skyline — flat-roofed Calgary blocks ── */}
      {/* Far-right cluster */}
      <rect x="252" y="74" width="9"  height="16" rx="0.5" fill={bld(0.68)} />
      <rect x="264" y="70" width="7"  height="20" rx="0.5" fill={bld(0.74)} />
      <rect x="274" y="72" width="10" height="18" rx="0.5" fill={bld(0.70)} />
      <rect x="287" y="67" width="8"  height="23" rx="0.5" fill={bld(0.76)} />

      {/* Right cluster */}
      <rect x="204" y="73" width="8"  height="17" rx="0.5" fill={bld(0.72)} />
      <rect x="215" y="67" width="10" height="23" rx="0.5" fill={bld(0.78)} />
      <rect x="228" y="70" width="7"  height="20" rx="0.5" fill={bld(0.74)} />
      <rect x="238" y="74" width="11" height="16" rx="0.5" fill={bld(0.68)} />

      {/* Centre-right */}
      <rect x="155" y="71" width="9"  height="19" rx="0.5" fill={bld(0.74)} />
      <rect x="167" y="64" width="11" height="26" rx="0.5" fill={bld(0.80)} />
      <rect x="181" y="68" width="8"  height="22" rx="0.5" fill={bld(0.76)} />
      <rect x="192" y="72" width="9"  height="18" rx="0.5" fill={bld(0.70)} />

      {/* ── Calgary Tower — centrepiece, x≈130 ── */}
      {/* Base shaft */}
      <rect x="127" y="70" width="6" height="20" rx="0.5" fill={bld(0.92)} />
      {/* Tapering elevator shaft up */}
      <rect x="129" y="56" width="2.5" height="16" fill={bld(0.92)} />
      {/* Observation deck — distinctive horizontal slab */}
      <rect x="122" y="54" width="16" height="3.5" rx="1.5" fill={bld(0.95)} />
      <ellipse cx="130" cy="54" rx="8" ry="2.2" fill={bld(0.94)} />
      {/* Deck glass highlight */}
      <ellipse cx="130" cy="53.2" rx="6.5" ry="1.2"
        fill="none"
        stroke={isLight ? "rgba(160,220,255,0.55)" : "rgba(100,160,220,0.30)"}
        strokeWidth="0.7"
      />
      {/* Antenna */}
      <rect x="129.6" y="42" width="1" height="13" fill={bld(0.96)} />
      {(scene === "night" || scene === "stormy") && (
        <motion.circle cx="130.1" cy="42" r="1.3"
          fill="#ff3333"
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        />
      )}

      {/* Centre-left */}
      <rect x="100" y="69" width="8"  height="21" rx="0.5" fill={bld(0.80)} />
      <rect x="111" y="65" width="10" height="25" rx="0.5" fill={bld(0.84)} />
      <rect x="144" y="70" width="8"  height="20" rx="0.5" fill={bld(0.76)} />

      {/* Left cluster */}
      <rect x="65"  y="73" width="9"  height="17" rx="0.5" fill={bld(0.74)} />
      <rect x="76"  y="67" width="10" height="23" rx="0.5" fill={bld(0.80)} />
      <rect x="89"  y="70" width="8"  height="20" rx="0.5" fill={bld(0.76)} />

      {/* Far-left cluster */}
      <rect x="14"  y="74" width="9"  height="16" rx="0.5" fill={bld(0.70)} />
      <rect x="26"  y="68" width="10" height="22" rx="0.5" fill={bld(0.76)} />
      <rect x="39"  y="71" width="8"  height="19" rx="0.5" fill={bld(0.72)} />
      <rect x="51"  y="66" width="11" height="24" rx="0.5" fill={bld(0.78)} />

      {/* ── Ground vignette — fades bottom to dark ── */}
      <defs>
        <linearGradient id="gVig" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(5,12,28,0)" />
          <stop offset="100%" stopColor="rgba(5,12,28,0.88)" />
        </linearGradient>
      </defs>
      <rect x="0" y="80" width="300" height="20" fill="url(#gVig)" />
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

  // Hook: first 110 chars of title, ends at a word boundary — gives a proper teaser
  const HOOK_LEN = 110;
  const hook =
    item.title.length > HOOK_LEN
      ? item.title.slice(0, item.title.lastIndexOf(" ", HOOK_LEN)).trimEnd() + "…"
      : item.title;
  const hasMore = item.title.length > HOOK_LEN;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.22 + index * 0.035 }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-3 py-3 text-left group border-b border-foreground/[0.07] last:border-0"
        aria-expanded={open}
      >
        {/* Bullet / source colour accent */}
        <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
          item.source.includes("660") || item.source.includes("CityNews") ? "bg-[#1D4ED8]" :
          item.source.includes("CBC") ? "bg-[#CB2B2B]" :
          item.source.includes("Global") ? "bg-emerald-600" :
          "bg-amber-500"
        }`} />

        <div className="flex-1 min-w-0">
          {/* Source + timestamp inline */}
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-[9px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded ${style.tag}`}>
              {shortSourceName(item.source)}
            </span>
            {item.pubDate && (
              <span className="text-[9px] text-foreground/35">{formatPubDate(item.pubDate)}</span>
            )}
          </div>
          {/* Hook sentence — substantive 1–2 sentence teaser */}
          <p className="text-[11px] font-semibold text-foreground/85 leading-snug">
            {hook}
          </p>
        </div>

        {/* Arrow — rotates on open */}
        <ChevronRight
          className={`w-3.5 h-3.5 flex-shrink-0 mt-1.5 transition-transform duration-200 ${
            open ? "rotate-90 text-[#E1251B]" : "text-foreground/30 group-hover:text-foreground/55"
          }`}
        />
      </button>

      {/* Expanded: full title + red CTA */}
      <AnimatePresence initial={false}>
        {open && hasMore && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-5 pb-3 pt-1">
              <p className="text-[11px] text-foreground/70 leading-relaxed mb-2">
                {item.title}
              </p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E1251B] hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Read full story
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        )}
        {open && !hasMore && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-5 pb-3 pt-0">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E1251B] hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Read full story
                <ArrowUpRight className="w-3 h-3" />
              </a>
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

          {/* Top-left: very light frosted info strip — nearly transparent */}
          <div className="absolute top-3 left-3 z-10">
            <div className="inline-flex flex-col gap-0.5 backdrop-blur-sm bg-black/[0.12] rounded-xl px-3 py-2 border border-white/[0.12]">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/70">Calgary, AB</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white leading-none" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.45)" }}>{weather.temp}°C</span>
                <span className="text-xs font-semibold text-white/90" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.40)" }}>{getSeasonLabel(weather.temp, weather.wmoCode)}</span>
              </div>
              <p className="text-[10px] text-white/75" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.35)" }}>
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

      {/* ---- What's Happening in Calgary ---------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Coloured section header band */}
        <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#E1251B] dark:bg-[#b91c1c] mb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-white/80 flex-shrink-0" />
            <p className="text-[11px] font-black text-white uppercase tracking-[0.14em]">
              What&apos;s Happening in Calgary
            </p>
          </div>
          <span className="flex items-center gap-1.5 text-[9px] text-white/65 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Live
          </span>
        </div>

        {/* Source legend — compact inline row, no background pills */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mb-3 px-1">
          {(["660 CityNews", "CBC Calgary", "Global News", "Calgary Herald"] as const).map((src) => {
            const dotColor =
              src.includes("660") ? "bg-[#1D4ED8]" :
              src.includes("CBC") ? "bg-[#CB2B2B]" :
              src.includes("Global") ? "bg-emerald-600" : "bg-amber-500";
            return (
              <span key={src} className="flex items-center gap-1 text-[9px] text-foreground/45 font-medium">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor}`} />
                {src}
              </span>
            );
          })}
        </div>

        {/* Headline list — no card backgrounds, just divider lines */}
        <div>
          {news.length === 0 ? (
            <p className="text-xs text-foreground/45 py-3 pl-5">Headlines unavailable — check back shortly.</p>
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
