"use client";

import { motion } from "framer-motion";

export function CalgaryAnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Navy Base - Matching Calgary Bridge brand */}
      <div className="absolute inset-0 bg-[#050a12]" />
      
      {/* Atmospheric Glow - Behind Tower */}
      <motion.div
        animate={{
          opacity: [0.2, 0.35, 0.2],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[5%] right-[0%] w-[45%] h-[45%] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(14, 116, 144, 0.15) 0%, rgba(8, 51, 68, 0.08) 40%, transparent 70%)",
        }}
      />

      {/* ========== CALGARY TOWER - UPPER RIGHT (Brand Style) ========== */}
      <div className="absolute top-6 right-10 w-[90px] h-[260px] z-10">
        <svg viewBox="0 0 90 280" className="w-full h-full" preserveAspectRatio="xMidYMin meet">
          <defs>
            {/* Tower body gradient - silver/white like brand */}
            <linearGradient id="towerBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="40%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="60%" stopColor="rgba(255,255,255,0.25)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
            {/* Observation deck gradient */}
            <linearGradient id="deckGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
            </linearGradient>
            {/* Beacon glow gradient */}
            <radialGradient id="beaconGlowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Beacon Outer Glow - Animated */}
          <motion.circle
            cx="45"
            cy="12"
            r="20"
            animate={{
              opacity: [0.15, 0.35, 0.15],
              r: [18, 28, 18],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            fill="url(#beaconGlowGrad)"
          />
          
          {/* Beacon Middle Glow */}
          <motion.circle
            cx="45"
            cy="12"
            r="10"
            animate={{
              opacity: [0.4, 0.8, 0.4],
              r: [8, 12, 8],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            fill="#FBBF24"
          />
          
          {/* Beacon Core - Bright */}
          <motion.circle
            cx="45"
            cy="12"
            r="4"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            fill="#FEF9C3"
          />
          
          {/* Spire/Antenna */}
          <rect x="43.5" y="12" width="3" height="28" fill="url(#towerBodyGrad)" rx="1.5" />
          
          {/* Observation Deck - Distinctive saucer shape */}
          <ellipse cx="45" cy="48" rx="22" ry="8" fill="url(#deckGrad)" />
          <ellipse cx="45" cy="44" rx="18" ry="5" fill="rgba(255,255,255,0.15)" />
          {/* Deck windows hint */}
          <ellipse cx="45" cy="46" rx="16" ry="4" fill="none" stroke="rgba(56,189,248,0.15)" strokeWidth="0.5" />
          
          {/* Upper neck */}
          <path d="M40 55 L42 90 L48 90 L50 55 Z" fill="url(#towerBodyGrad)" />
          
          {/* Restaurant level bulge */}
          <ellipse cx="45" cy="95" rx="10" ry="4" fill="rgba(255,255,255,0.12)" />
          
          {/* Main shaft */}
          <path d="M39 98 L41 240 L49 240 L51 98 Z" fill="url(#towerBodyGrad)" />
          
          {/* Support struts - angled */}
          <path d="M41 98 L30 240" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
          <path d="M49 98 L60 240" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
          
          {/* Base platform */}
          <ellipse cx="45" cy="245" rx="20" ry="6" fill="rgba(255,255,255,0.08)" />
        </svg>
      </div>

      {/* ========== FAINT SKYLINE SILHOUETTE - RIGHT ========== */}
      <div className="absolute bottom-0 right-0 w-[60%] h-[22%] opacity-[0.04]">
        <svg viewBox="0 0 800 200" className="w-full h-full" preserveAspectRatio="xMaxYMax slice">
          <path
            d="M800 200 L800 100 L790 100 L790 80 L780 80 L780 60 L770 60 L770 80 L760 80 L760 100 L750 100 L750 70 L740 70 L740 50 L730 50 L730 70 L720 70 L720 90 L710 90 L710 110 L700 110 L700 90 L690 90 L690 70 L680 70 L680 90 L670 90 L670 120 L660 120 L660 100 L650 100 L650 80 L640 80 L640 100 L630 100 L630 130 L620 130 L620 110 L610 110 L610 90 L600 90 L600 110 L590 110 L590 140 L580 140 L580 120 L570 120 L570 100 L560 100 L560 120 L550 120 L550 150 L540 150 L540 130 L530 130 L530 150 L520 150 L520 160 L0 160 L0 200 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* ========== ANIMATED BOW RIVER - Luminous Flowing Streams ========== */}
      <div className="absolute bottom-0 left-0 right-0 h-[20%]">
        <svg viewBox="0 0 1600 180" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            {/* Primary river gradient */}
            <linearGradient id="riverPrimary" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0" />
              <stop offset="20%" stopColor="#38BDF8" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#38BDF8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
            </linearGradient>
            {/* Secondary river gradient */}
            <linearGradient id="riverSecondary" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
              <stop offset="30%" stopColor="#22D3EE" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
            </linearGradient>
            {/* Gold accent gradient */}
            <linearGradient id="goldRiver" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
              <stop offset="30%" stopColor="#FBBF24" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Primary River Stream - Main cyan flow */}
          <motion.path
            d="M-100 100 Q200 70 450 85 Q700 100 950 60 Q1200 20 1700 70"
            stroke="url(#riverPrimary)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M-100 100 Q200 70 450 85 Q700 100 950 60 Q1200 20 1700 70",
                "M-100 80 Q200 100 450 70 Q700 40 950 85 Q1200 100 1700 55",
                "M-100 100 Q200 70 450 85 Q700 100 950 60 Q1200 20 1700 70",
              ],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Secondary River Stream */}
          <motion.path
            d="M-200 130 Q150 110 400 125 Q650 140 900 100 Q1150 60 1800 110"
            stroke="url(#riverSecondary)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M-200 130 Q150 110 400 125 Q650 140 900 100 Q1150 60 1800 110",
                "M-200 115 Q150 140 400 105 Q650 70 900 125 Q1150 140 1800 90",
                "M-200 130 Q150 110 400 125 Q650 140 900 100 Q1150 60 1800 110",
              ],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          
          {/* Gold Accent Trail - Bottom */}
          <motion.path
            d="M-300 155 Q100 140 350 150 Q600 160 850 135 Q1100 110 1600 145"
            stroke="url(#goldRiver)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* ========== FLOATING LIGHT PARTICLES ========== */}
      <div className="absolute inset-0">
        {[
          { left: 12, top: 18, size: 1.5, delay: 0, duration: 20 },
          { left: 25, top: 10, size: 2, delay: 4, duration: 24 },
          { left: 40, top: 22, size: 1.5, delay: 2, duration: 22 },
          { left: 55, top: 14, size: 2, delay: 6, duration: 18 },
          { left: 70, top: 20, size: 1.5, delay: 3, duration: 21 },
          { left: 82, top: 8, size: 2, delay: 5, duration: 19 },
        ].map((particle, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-white"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      {/* ========== SUBTLE GRID PATTERN ========== */}
      <div 
        className="absolute inset-0 opacity-[0.008]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}

// Small Calgary Tower for Footer
export function CalgaryTowerSmall({ className = "" }: { className?: string }) {
  return (
    <div className={`w-[40px] h-[100px] ${className}`}>
      <svg viewBox="0 0 40 100" className="w-full h-full">
        {/* Beacon Glow */}
        <motion.circle
          cx="20"
          cy="8"
          r="5"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          fill="#FBBF24"
        />
        {/* Beacon Core */}
        <circle cx="20" cy="8" r="2" fill="#FEF9C3" />
        {/* Antenna */}
        <rect x="19" y="8" width="2" height="12" fill="rgba(255,255,255,0.2)" rx="1" />
        {/* Observation Deck */}
        <ellipse cx="20" cy="24" rx="10" ry="4" fill="rgba(255,255,255,0.18)" />
        {/* Neck */}
        <path d="M17 27 L18 45 L22 45 L23 27 Z" fill="rgba(255,255,255,0.15)" />
        {/* Shaft */}
        <path d="M16 45 L17 92 L23 92 L24 45 Z" fill="rgba(255,255,255,0.12)" />
        {/* Base */}
        <ellipse cx="20" cy="94" rx="10" ry="3" fill="rgba(255,255,255,0.08)" />
      </svg>
    </div>
  );
}
