"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ExternalLink, Snowflake, Flower2, Sun, Leaf } from "lucide-react";

interface SeasonalEvent {
  name: string;
  when: string;
  location: string;
  description: string;
  href: string;
  cost: "Free" | "Paid" | "Free & Paid";
}

interface Season {
  id: "winter" | "spring" | "summer" | "fall";
  label: string;
  icon: React.ElementType;
  accent: string;
  events: SeasonalEvent[];
}

// Recurring, annually-repeating Calgary events described by season/timing
// rather than fixed dates, so the card stays accurate year after year without
// needing edits every January.
const SEASONS: Season[] = [
  {
    id: "winter",
    label: "Winter",
    icon: Snowflake,
    accent: "#38BDF8",
    events: [
      {
        name: "Bowness Park Outdoor Skating",
        when: "December-February, weather permitting",
        location: "Bowness Park",
        description: "Free-to-skate outdoor rink with on-site skate rentals — a classic Calgary winter evening out.",
        href: "https://www.calgary.ca/parks/locations/bowness-park.html",
        cost: "Free & Paid",
      },
      {
        name: "WinSport Ski & Snowboard Season",
        when: "Late November-March",
        location: "WinSport, Canada Olympic Park",
        description: "Downhill skiing, snowboarding, and tubing minutes from downtown, with lessons for all ages.",
        href: "https://winsport.ca",
        cost: "Paid",
      },
      {
        name: "Zoo Lights",
        when: "Late November-early January, evenings",
        location: "Calgary Zoo",
        description: "The zoo transforms into an illuminated wonderland after dark — a popular family holiday tradition.",
        href: "https://www.calgaryzoo.com",
        cost: "Paid",
      },
    ],
  },
  {
    id: "spring",
    label: "Spring",
    icon: Flower2,
    accent: "#22C55E",
    events: [
      {
        name: "Beakerhead & STEAM Community Events",
        when: "Varies through spring",
        location: "Locations across Calgary",
        description: "Hands-on science, art, and engineering pop-up events for curious kids and adults alike.",
        href: "https://beakerhead.com",
        cost: "Free & Paid",
      },
      {
        name: "Lilac Festival (4 St SW)",
        when: "Early June (late spring)",
        location: "4 Street SW, Calgary",
        description: "One of Calgary's biggest free street festivals — live music, food trucks, and local vendors.",
        href: "https://www.calgary4thstreetlilacfestival.com",
        cost: "Free",
      },
      {
        name: "Farmers' Markets Reopen",
        when: "April-May reopenings",
        location: "Multiple locations citywide",
        description: "Calgary's seasonal farmers markets return for the year with fresh local produce and makers.",
        href: "https://www.calgary.ca",
        cost: "Free",
      },
    ],
  },
  {
    id: "summer",
    label: "Summer",
    icon: Sun,
    accent: "#F59E0B",
    events: [
      {
        name: "Calgary Stampede",
        when: "10 days, early-mid July",
        location: "Stampede Park",
        description: "Calgary's world-famous rodeo and exhibition — chuckwagon races, midway rides, concerts, and free pancake breakfasts across the city.",
        href: "https://www.calgarystampede.com",
        cost: "Paid",
      },
      {
        name: "Calgary Pride Festival & Parade",
        when: "Late August-early September",
        location: "Beltline",
        description: "One of Western Canada's largest Pride celebrations — free, family-friendly, and welcoming to all.",
        href: "https://calgarypride.ca",
        cost: "Free",
      },
      {
        name: "Spruce Meadows 'Continental' & 'National' Tournaments",
        when: "June-September, select weekends",
        location: "Spruce Meadows",
        description: "World-class equestrian show-jumping with free general-admission grounds passes on many tournament days.",
        href: "https://www.sprucemeadows.com",
        cost: "Free & Paid",
      },
    ],
  },
  {
    id: "fall",
    label: "Fall",
    icon: Leaf,
    accent: "#E1251B",
    events: [
      {
        name: "Fairy Tales Presents Queer Film Festival",
        when: "Late September-October",
        location: "Venues across Calgary",
        description: "Western Canada's longest-running 2SLGBTQ+ film festival, screening local and international queer cinema.",
        href: "https://fairytalesfilmfest.com",
        cost: "Paid",
      },
      {
        name: "GlobalFest Fireworks Festival",
        when: "Mid-to-late August (early fall)",
        location: "Elliston Park",
        description: "International fireworks competition paired with a multicultural festival grounds — a Calgary summer-into-fall favourite.",
        href: "https://globalfest.ca",
        cost: "Paid",
      },
      {
        name: "Culture Days Calgary",
        when: "Last weekend of September",
        location: "Venues across Calgary",
        description: "Free, city-wide open house of arts and culture organizations offering hands-on activities and behind-the-scenes access.",
        href: "https://culturedays.ca",
        cost: "Free",
      },
    ],
  },
];

export default function EventsCalendarCard() {
  const [activeSeason, setActiveSeason] = useState<Season["id"]>("summer");
  const current = SEASONS.find((s) => s.id === activeSeason) ?? SEASONS[0];

  return (
    <div className="rounded-2xl md:rounded-3xl border border-foreground/[0.08] bg-card shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 md:px-6 pt-5 md:pt-6 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1D4ED8]/10 flex-shrink-0">
          <Calendar className="w-5 h-5 text-[#1D4ED8]" />
        </div>
        <div>
          <h3 className="font-bold text-foreground text-base md:text-lg leading-tight">
            Calgary&apos;s Annual Events
          </h3>
          <p className="text-sm text-foreground/60 leading-tight">Recurring things to do, by season</p>
        </div>
      </div>

      {/* Season tabs */}
      <div className="flex gap-1.5 px-4 md:px-5 pb-4 overflow-x-auto">
        {SEASONS.map((season) => {
          const isActive = season.id === activeSeason;
          return (
            <button
              key={season.id}
              onClick={() => setActiveSeason(season.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "text-white shadow-sm"
                  : "text-foreground/60 bg-foreground/[0.04] hover:bg-foreground/[0.07]"
              }`}
              style={isActive ? { background: season.accent } : undefined}
            >
              <season.icon className="w-3.5 h-3.5" />
              {season.label}
            </button>
          );
        })}
      </div>

      {/* Events list */}
      <div className="px-4 md:px-5 pb-5 md:pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeason}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2.5"
          >
            {current.events.map((event) => (
              <a
                key={event.name}
                href={event.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1.5 rounded-xl border border-foreground/[0.07] bg-background/40 hover:bg-background/70 hover:border-foreground/[0.14] transition-all p-3.5 md:p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-foreground text-sm md:text-base leading-snug">
                    {event.name}
                  </h4>
                  <ExternalLink className="w-3.5 h-3.5 text-foreground/35 group-hover:text-foreground/60 flex-shrink-0 mt-0.5 transition-colors" />
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">{event.description}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5 text-xs text-foreground/55">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {event.when}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </span>
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
                    style={{ background: `${current.accent}14`, color: current.accent }}
                  >
                    {event.cost}
                  </span>
                </div>
              </a>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
