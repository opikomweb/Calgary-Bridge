"use client";

import { motion } from "framer-motion";

export function CalgaryAnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Navy Base */}
      <div className="absolute inset-0 bg-[#050B14]" />
      
      {/* Atmospheric Glow - Top Right (Behind Tower) */}
      <motion.div
        animate={{
          opacity: [0.25, 0.4, 0.25],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] right-[5%] w-[50%] h-[50%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(56, 189, 248, 0.04) 40%, transparent 70%)",
        }}
      />

      {/* ========== CALGARY TOWER - UPPER RIGHT CORNER ========== */}
      <div className="absolute top-8 right-12 w-[100px] h-[280px] z-10">
        <svg viewBox="0 0 80 280" className="w-full h-full" preserveAspectRatio="xMidYMin meet">
          {/* Tower Beacon Outer Glow */}
          <motion.circle
            cx="40"
            cy="15"
            r="25"
            animate={{
              opacity: [0.1, 0.25, 0.1],
              r: [20, 35, 20],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            fill="url(#beaconGlow)"
          />
          
          {/* Tower Beacon Middle Glow */}
          <motion.circle
            cx="40"
            cy="15"
            r="12"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              r: [10, 18, 10],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            fill="#FBBF24"
          />
          
          {/* Tower Beacon Core */}
          <motion.circle
            cx="40"
            cy="15"
            r="5"
            animate={{
              opacity: [0.7, 1, 0.7],
              r: [4, 7, 4],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            fill="#FEF3C7"
          />
          
          {/* Tower Spire */}
          <path
            d="M38 15 L40 5 L42 15 Z"
            fill="rgba(255,255,255,0.5)"
          />
          
          {/* Tower Antenna */}
          <rect x="39" y="15" width="2" height="35" fill="rgba(255,255,255,0.25)" rx="1" />
          
          {/* Observation Deck */}
          <ellipse cx="40" cy="55" rx="20" ry="8" fill="rgba(255,255,255,0.15)" />
          <ellipse cx="40" cy="52" rx="18" ry="6" fill="rgba(255,255,255,0.1)" />
          <rect x="36" y="48" width="8" height="10" fill="rgba(255,255,255,0.2)" rx="2" />
          
          {/* Tower Neck */}
          <path
            d="M35 60 L37 110 L43 110 L45 60 Z"
            fill="rgba(255,255,255,0.18)"
          />
          
          {/* Restaurant Level */}
          <ellipse cx="40" cy="115" rx="14" ry="5" fill="rgba(255,255,255,0.12)" />
          
          {/* Tower Shaft */}
          <path
            d="M34 115 L36 250 L44 250 L46 115 Z"
            fill="rgba(255,255,255,0.15)"
          />
          
          {/* Support Struts */}
          <path d="M36 115 L28 250" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          <path d="M44 115 L52 250" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          
          {/* Base */}
          <ellipse cx="40" cy="255" rx="22" ry="8" fill="rgba(255,255,255,0.1)" />
          
          <defs>
            <radialGradient id="beaconGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* ========== ROCKY MOUNTAINS SILHOUETTE - TOP ========== */}
      <div className="absolute top-0 left-0 right-0 h-[180px] opacity-[0.06]">
        <svg viewBox="0 0 1400 180" className="w-full h-full" preserveAspectRatio="xMidYMin slice">
          <path
            d="M0 180 L0 120 L50 100 L100 130 L150 80 L200 110 L250 60 L300 90 L350 40 L400 70 L450 30 L500 60 L550 20 L600 50 L650 25 L700 55 L750 35 L800 65 L850 45 L900 75 L950 55 L1000 85 L1050 65 L1100 95 L1150 75 L1200 105 L1250 85 L1300 115 L1350 95 L1400 125 L1400 180 Z"
            fill="currentColor"
            className="text-white"
          />
        </svg>
      </div>

      {/* ========== AURORA BOREALIS EFFECT ========== */}
      <motion.div
        animate={{
          opacity: [0.15, 0.3, 0.15],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[5%] left-[20%] w-[60%] h-[25%]"
        style={{
          background: "linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, transparent 100%)",
          filter: "blur(60px)",
          borderRadius: "50%",
        }}
      />

      {/* ========== SKYLINE SILHOUETTE - BOTTOM ========== */}
      <div className="absolute bottom-0 right-0 w-[70%] h-[20%] opacity-[0.06]">
        <svg viewBox="0 0 1000 200" className="w-full h-full" preserveAspectRatio="xMaxYMax slice">
          <path
            d="M1000 200 L1000 140 L980 140 L980 120 L960 120 L960 100 L940 100 L940 80 L920 80 L920 120 L900 120 L900 90 L880 90 L880 70 L860 70 L860 90 L840 90 L840 130 L820 130 L820 100 L800 100 L800 80 L780 80 L780 100 L760 100 L760 140 L740 140 L740 110 L720 110 L720 90 L700 90 L700 110 L680 110 L680 150 L660 150 L660 120 L640 120 L640 140 L620 140 L620 160 L600 160 L600 130 L580 130 L580 150 L560 150 L560 170 L540 170 L540 140 L520 140 L520 160 L500 160 L500 180 L0 180 L0 200 Z"
            fill="currentColor"
            className="text-white"
          />
        </svg>
      </div>

      {/* ========== PEACE BRIDGE ARC ========== */}
      <div className="absolute bottom-[12%] left-[5%] w-[35%] h-[12%] opacity-30">
        <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
          <motion.path
            d="M0 60 Q100 10 200 35 Q300 60 400 25"
            stroke="url(#bridgeGradient)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 4, ease: "easeOut" }}
          />
          {/* Bridge Cables */}
          {[50, 100, 150, 200, 250, 300, 350].map((x, i) => (
            <motion.line
              key={i}
              x1={x}
              y1={25 + Math.sin((x / 400) * Math.PI) * 25}
              x2={x}
              y2={70}
              stroke="rgba(56, 189, 248, 0.25)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 3 + i * 0.1 }}
            />
          ))}
          <defs>
            <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ========== ANIMATED BOW RIVER ========== */}
      <div className="absolute bottom-0 left-0 right-0 h-[18%]">
        <svg viewBox="0 0 1400 150" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="riverGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0" />
              <stop offset="30%" stopColor="#38BDF8" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#0EA5E9" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="riverGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
              <stop offset="40%" stopColor="#0EA5E9" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FBBF24" stopOpacity="0" />
              <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* River Stream 1 */}
          <motion.path
            d="M-200 90 Q200 60 400 75 Q600 90 800 65 Q1000 40 1600 80"
            stroke="url(#riverGradient1)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M-200 90 Q200 60 400 75 Q600 90 800 65 Q1000 40 1600 80",
                "M-200 75 Q200 90 400 65 Q600 40 800 75 Q1000 90 1600 60",
                "M-200 90 Q200 60 400 75 Q600 90 800 65 Q1000 40 1600 80",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* River Stream 2 */}
          <motion.path
            d="M-100 115 Q300 100 500 120 Q700 140 900 105 Q1100 70 1500 115"
            stroke="url(#riverGradient2)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M-100 115 Q300 100 500 120 Q700 140 900 105 Q1100 70 1500 115",
                "M-100 125 Q300 140 500 105 Q700 70 900 120 Q1100 140 1500 100",
                "M-100 115 Q300 100 500 120 Q700 140 900 105 Q1100 70 1500 115",
              ],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
          
          {/* Gold Accent Trail */}
          <motion.path
            d="M-300 135 Q100 120 300 130 Q500 145 700 125 Q900 105 1200 140"
            stroke="url(#goldAccent)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            animate={{
              opacity: [0.25, 0.5, 0.25],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* ========== FLOATING PARTICLES ========== */}
      <div className="absolute inset-0">
        {[
          { left: 10, top: 15, size: 2, delay: 0, duration: 18 },
          { left: 20, top: 8, size: 1.5, delay: 3, duration: 22 },
          { left: 35, top: 20, size: 2, delay: 1, duration: 20 },
          { left: 50, top: 12, size: 1.5, delay: 5, duration: 19 },
          { left: 65, top: 18, size: 2, delay: 2, duration: 21 },
          { left: 78, top: 25, size: 1.5, delay: 4, duration: 17 },
          { left: 88, top: 10, size: 2, delay: 6, duration: 23 },
        ].map((particle, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -60, 0],
              opacity: [0.15, 0.5, 0.15],
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

      {/* ========== SUBTLE GRID ========== */}
      <div 
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
}

// Small Calgary Tower for Footer
export function CalgaryTowerSmall({ className = "" }: { className?: string }) {
  return (
    <div className={`w-[50px] h-[120px] ${className}`}>
      <svg viewBox="0 0 50 120" className="w-full h-full">
        {/* Beacon Glow */}
        <motion.circle
          cx="25"
          cy="8"
          r="6"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          fill="#FBBF24"
        />
        {/* Beacon Core */}
        <circle cx="25" cy="8" r="2.5" fill="#FEF3C7" />
        {/* Antenna */}
        <rect x="24" y="8" width="2" height="15" fill="rgba(255,255,255,0.2)" rx="1" />
        {/* Observation Deck */}
        <ellipse cx="25" cy="28" rx="10" ry="4" fill="rgba(255,255,255,0.12)" />
        {/* Neck */}
        <path d="M22 30 L23 55 L27 55 L28 30 Z" fill="rgba(255,255,255,0.15)" />
        {/* Shaft */}
        <path d="M21 55 L22 110 L28 110 L29 55 Z" fill="rgba(255,255,255,0.12)" />
        {/* Base */}
        <ellipse cx="25" cy="112" rx="12" ry="4" fill="rgba(255,255,255,0.08)" />
      </svg>
    </div>
  );
}
