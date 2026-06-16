"use client";

/**
 * CalgaryPulsePanel
 *
 * Live city data panel displayed in the iKonnect Guide (AI tab) sidebar.
 * Data is fetched from /api/calgary-pulse which aggregates:
 *   - Open-Meteo      : temperature, feels-like, wind, humidity, UV, WMO code
 *   - Environment Canada : weather watches / warnings (Calgary ATOM feed)
 *   - MSC GeoMet-OGC  : Air Quality Health Index (AQHI)
 *
 * Refreshes automatically every 10 minutes via a useEffect interval.
 * Shows an animated skeleton while loading and graceful per-section fallbacks.
 */

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wind, Droplets, Sun, AlertTriangle, Activity,
  ExternalLink, RefreshCw, Thermometer, Eye,
  Cloud, CloudRain, CloudSnow, CloudSun, Loader2,
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

type AQHIData = {
  value: number;
  risk: string;
  label: string;
};

type PulseData = {
  weather: WeatherData | null;
  alerts: AlertItem[];
  aqhi: AQHIData | null;
  fetchedAt: string;
};

// ---- Helpers ----------------------------------------------------------------

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

function weatherGradient(wmo: number, temp: number): string {
  if (wmo >= 95) return "from-[#4A1010] via-[#6B1A1A] to-[#7C2020]";
  if (wmo >= 71 && wmo <= 77) return "from-[#0A2540] via-[#0E2E52] to-[#15396b]";
  if ((wmo >= 51 && wmo <= 67) || (wmo >= 80 && wmo <= 82)) return "from-[#1C3A4A] via-[#1e4060] to-[#1a3550]";
  if (temp >= 28) return "from-[#7C1D10] via-[#9B2A1A] to-[#B43A25]";
  if (temp >= 18) return "from-[#0A4A2A] via-[#0D5C34] to-[#0E6B3C]";
  if (temp >= 5) return "from-[#1A3A5C] via-[#1e4878] to-[#163D6E]";
  return "from-[#0A2540] via-[#0E2E52] to-[#15396b]";
}

function WeatherIcon({ wmo, isDay, className }: { wmo: number; isDay: boolean; className?: string }) {
  if (wmo >= 71 && wmo <= 86) return <CloudSnow className={className} />;
  if ((wmo >= 51 && wmo <= 67) || (wmo >= 80 && wmo <= 82)) return <CloudRain className={className} />;
  if (wmo >= 3) return <Cloud className={className} />;
  if (wmo >= 1) return isDay ? <CloudSun className={className} /> : <Cloud className={className} />;
  return isDay ? <Sun className={className} /> : <Cloud className={className} />;
}

function uvLabel(uv: number): { text: string; colour: string } {
  if (uv <= 2) return { text: "Low", colour: "text-emerald-600 dark:text-emerald-400" };
  if (uv <= 5) return { text: "Moderate", colour: "text-amber-500" };
  if (uv <= 7) return { text: "High", colour: "text-orange-500" };
  if (uv <= 10) return { text: "Very High", colour: "text-red-500" };
  return { text: "Extreme", colour: "text-red-700 font-bold" };
}

function aqhiColour(risk: string): string {
  if (risk === "Low") return "text-emerald-600 dark:text-emerald-400";
  if (risk === "Moderate") return "text-amber-500";
  if (risk === "High") return "text-orange-500";
  return "text-red-600";
}

function alertSeverityStyle(title: string): string {
  const t = title.toUpperCase();
  if (t.includes("RED") || t.includes("EXTREME") || t.includes("EMERGENCY")) return "border-[#E1251B]/50 bg-[#E1251B]/8";
  if (t.includes("ORANGE") || t.includes("WARNING")) return "border-orange-500/50 bg-orange-500/8";
  if (t.includes("YELLOW") || t.includes("WATCH")) return "border-amber-400/50 bg-amber-400/8";
  return "border-foreground/[0.1] bg-foreground/[0.04]";
}

function alertIconColour(title: string): string {
  const t = title.toUpperCase();
  if (t.includes("RED") || t.includes("EXTREME")) return "text-[#E1251B]";
  if (t.includes("ORANGE") || t.includes("WARNING")) return "text-orange-500";
  if (t.includes("YELLOW") || t.includes("WATCH")) return "text-amber-500";
  return "text-foreground/50";
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
      <div className="h-36 rounded-2xl bg-foreground/[0.08]" />
      <div className="h-28 rounded-2xl bg-foreground/[0.06]" />
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="h-20 rounded-2xl bg-foreground/[0.05]" />
        ))}
      </div>
    </div>
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

  // Initial load + auto-refresh every 10 minutes
  useEffect(() => {
    load();
    const id = setInterval(() => load(true), 10 * 60 * 1000);
    return () => clearInterval(id);
  }, [load]);

  // Update the "X min ago" stamp every minute without re-fetching
  useEffect(() => {
    const id = setInterval(() => {
      if (data?.fetchedAt) setLastUpdated(timeAgo(data.fetchedAt));
    }, 60_000);
    return () => clearInterval(id);
  }, [data]);

  if (loading) return <PulseSkeleton />;

  const { weather, alerts, aqhi } = data ?? { weather: null, alerts: [], aqhi: null };

  return (
    <div className="space-y-5">

      {/* Header row: last updated + manual refresh */}
      <div className="flex items-center justify-between text-xs text-foreground/45">
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

      {/* ---- Weather Card ------------------------------------------------- */}
      {weather ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative overflow-hidden rounded-2xl p-5 xl:p-6 bg-gradient-to-br ${weatherGradient(weather.wmoCode, weather.temp)} border border-white/10 shadow-lg shadow-black/20`}
        >
          <div className="pointer-events-none absolute -top-10 -right-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" />

          {/* Main row */}
          <div className="relative flex items-center gap-4 mb-4">
            <div className="w-12 h-12 xl:w-14 xl:h-14 flex-shrink-0 rounded-2xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center">
              <WeatherIcon wmo={weather.wmoCode} isDay={weather.isDay} className="w-6 h-6 xl:w-7 xl:h-7 text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-lg xl:text-xl leading-tight text-white">
                {getSeasonLabel(weather.temp, weather.wmoCode)}
              </p>
              <p className="text-sm text-white/70 mt-0.5">
                {weather.temp}°C · feels {weather.feelsLike}°C · {wmoToDesc(weather.wmoCode)}
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="relative grid grid-cols-3 gap-2 mt-3">
            {/* Wind */}
            <div className="flex flex-col items-center gap-1 rounded-xl bg-white/10 py-2.5 px-1">
              <Wind className="w-4 h-4 text-white/70" />
              <span className="text-sm font-bold text-white">{weather.windKph}</span>
              <span className="text-[10px] text-white/60 uppercase tracking-wide">km/h</span>
            </div>
            {/* Humidity */}
            <div className="flex flex-col items-center gap-1 rounded-xl bg-white/10 py-2.5 px-1">
              <Droplets className="w-4 h-4 text-white/70" />
              <span className="text-sm font-bold text-white">{weather.humidity}%</span>
              <span className="text-[10px] text-white/60 uppercase tracking-wide">Humidity</span>
            </div>
            {/* UV */}
            <div className="flex flex-col items-center gap-1 rounded-xl bg-white/10 py-2.5 px-1">
              <Sun className="w-4 h-4 text-white/70" />
              <span className="text-sm font-bold text-white">{weather.uvIndex}</span>
              <span className="text-[10px] text-white/60 uppercase tracking-wide">UV</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="h-40 rounded-2xl bg-foreground/[0.06] flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-foreground/30" />
        </div>
      )}

      {/* ---- Air Quality (AQHI) ------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] p-4 xl:p-5"
      >
        <div className="flex items-center gap-3 mb-2.5">
          <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-[#1D4ED8]/15 ring-1 ring-[#1D4ED8]/25 flex items-center justify-center">
            <Activity className="w-4 h-4 text-[#1D4ED8] dark:text-[#60A5FA]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-foreground leading-tight">Air Quality (AQHI)</p>
            <p className="text-xs text-foreground/50 mt-0.5">Environment Canada · Calgary</p>
          </div>
          {aqhi && (
            <div className="text-right flex-shrink-0">
              <span className={`text-2xl font-black ${aqhiColour(aqhi.risk)}`}>{aqhi.value}</span>
              <p className={`text-xs font-bold mt-0.5 ${aqhiColour(aqhi.risk)}`}>{aqhi.risk}</p>
            </div>
          )}
          {!aqhi && <span className="text-xs text-foreground/40">Unavailable</span>}
        </div>
        {aqhi && (
          <p className="text-xs text-foreground/60 leading-relaxed pl-12">{aqhi.label}</p>
        )}
      </motion.div>

      {/* ---- Weather Alerts (Environment Canada) -------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-foreground/50 flex-shrink-0" />
          <h3 className="text-sm font-bold text-foreground/80 uppercase tracking-wider">
            Active Alerts
          </h3>
          <span className="ml-auto text-[10px] text-foreground/40">Environment Canada</span>
        </div>

        <AnimatePresence mode="popLayout">
          {alerts.length === 0 ? (
            <motion.div
              key="no-alerts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/8"
            >
              <div className="w-8 h-8 flex-shrink-0 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">No active alerts</p>
                <p className="text-xs text-foreground/50 mt-0.5">All clear for Calgary</p>
              </div>
            </motion.div>
          ) : (
            alerts.map((alert, i) => (
              <motion.a
                key={alert.link + i}
                href={alert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`flex items-start gap-3 p-4 rounded-2xl border mb-2.5 last:mb-0 transition-all hover:opacity-80 ${alertSeverityStyle(alert.title)}`}
              >
                <div className="w-8 h-8 flex-shrink-0 rounded-xl bg-foreground/[0.08] flex items-center justify-center mt-0.5">
                  <AlertTriangle className={`w-4 h-4 ${alertIconColour(alert.title)}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-foreground leading-snug line-clamp-2">{alert.title}</p>
                  {alert.issued && (
                    <p className="text-xs text-foreground/50 mt-1">{alert.issued}</p>
                  )}
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-foreground/30 flex-shrink-0 mt-0.5" />
              </motion.a>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* ---- Source attribution ------------------------------------------- */}
      <p className="text-[10px] text-foreground/30 text-center leading-relaxed pt-1">
        Data: Open-Meteo · Environment Canada · MSC GeoMet-OGC · Auto-refreshes every 10 min
      </p>

    </div>
  );
}
