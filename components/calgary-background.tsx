"use client";

import { motion } from "framer-motion";

export function CalgaryAnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Navy Base with Subtle Radial Light */}
      <div className="absolute inset-0 bg-[#050B14]" />
      
      {/* Atmospheric Glow - Top Right */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(56, 189, 248, 0.05) 40%, transparent 70%)",
        }}
      />
      
      {/* Atmospheric Glow - Bottom Left (Warm) */}
      <motion.div
        animate={{
          opacity: [0.2, 0.35, 0.2],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-[30%] -left-[20%] w-[60%] h-[60%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0.03) 40%, transparent 70%)",
        }}
      />

      {/* Calgary Skyline Silhouette - Right Side */}
      <div className="absolute bottom-0 right-0 w-[60%] h-[35%] opacity-[0.08]">
        <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="xMaxYMax slice">
          {/* Skyline Buildings */}
          <path
            d="M800 300 L800 180 L780 180 L780 160 L760 160 L760 140 L740 140 L740 180 L720 180 L720 120 L700 120 L700 100 L680 100 L680 120 L660 120 L660 180 L640 180 L640 150 L620 150 L620 130 L600 130 L600 150 L580 150 L580 180 L560 180 L560 200 L540 200 L540 160 L520 160 L520 140 L500 140 L500 160 L480 160 L480 200 L460 200 L460 220 L440 220 L440 180 L420 180 L420 200 L400 200 L400 240 L0 240 L0 300 Z"
            fill="currentColor"
            className="text-white"
          />
        </svg>
      </div>

      {/* Calgary Tower - Prominent Silhouette */}
      <div className="absolute bottom-0 right-[15%] w-[120px] h-[45%]">
        <svg viewBox="0 0 60 200" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
          {/* Tower Base */}
          <path
            d="M25 200 L25 120 L20 120 L20 100 L25 100 L25 60 L28 60 L28 20 L30 10 L32 20 L32 60 L35 60 L35 100 L40 100 L40 120 L35 120 L35 200 Z"
            fill="rgba(255,255,255,0.12)"
          />
          {/* Observation Deck */}
          <ellipse cx="30" cy="55" rx="12" ry="5" fill="rgba(255,255,255,0.15)" />
          {/* Tower Beacon Glow */}
          <motion.circle
            cx="30"
            cy="10"
            r="4"
            animate={{
              opacity: [0.4, 1, 0.4],
              r: [3, 5, 3],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            fill="#FBBF24"
          />
          <motion.circle
            cx="30"
            cy="10"
            r="8"
            animate={{
              opacity: [0.1, 0.3, 0.1],
              r: [6, 12, 6],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            fill="#FBBF24"
          />
        </svg>
      </div>

      {/* Peace Bridge Arc - Bottom */}
      <div className="absolute bottom-[8%] left-[10%] w-[40%] h-[15%] opacity-20">
        <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
          <motion.path
            d="M0 80 Q100 20 200 50 Q300 80 400 40"
            stroke="url(#bridgeGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
          />
          {/* Bridge Cables */}
          {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x, i) => (
            <motion.line
              key={i}
              x1={x}
              y1={35 + Math.sin((x / 400) * Math.PI) * 30}
              x2={x}
              y2={80}
              stroke="rgba(56, 189, 248, 0.3)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 2 + i * 0.1 }}
            />
          ))}
          <defs>
            <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Animated Bow River - Flowing Light Streams */}
      <div className="absolute bottom-0 left-0 right-0 h-[25%]">
        {/* Main River Flow */}
        <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="riverGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0" />
              <stop offset="30%" stopColor="#38BDF8" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#0EA5E9" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="riverGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
              <stop offset="40%" stopColor="#0EA5E9" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FBBF24" stopOpacity="0" />
              <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* River Stream 1 */}
          <motion.path
            d="M-200 120 Q200 80 400 100 Q600 120 800 90 Q1000 60 1400 100"
            stroke="url(#riverGradient1)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M-200 120 Q200 80 400 100 Q600 120 800 90 Q1000 60 1400 100",
                "M-200 100 Q200 120 400 90 Q600 60 800 100 Q1000 120 1400 80",
                "M-200 120 Q200 80 400 100 Q600 120 800 90 Q1000 60 1400 100",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* River Stream 2 */}
          <motion.path
            d="M-100 150 Q300 130 500 160 Q700 180 900 140 Q1100 100 1300 150"
            stroke="url(#riverGradient2)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M-100 150 Q300 130 500 160 Q700 180 900 140 Q1100 100 1300 150",
                "M-100 160 Q300 180 500 140 Q700 100 900 160 Q1100 180 1300 130",
                "M-100 150 Q300 130 500 160 Q700 180 900 140 Q1100 100 1300 150",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          {/* Gold Accent Trail */}
          <motion.path
            d="M-300 180 Q100 160 300 175 Q500 190 700 170 Q900 150 1100 180"
            stroke="url(#goldAccent)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M-300 180 Q100 160 300 175 Q500 190 700 170 Q900 150 1100 180",
                "M-300 170 Q100 190 300 165 Q500 140 700 180 Q900 190 1100 160",
                "M-300 180 Q100 160 300 175 Q500 190 700 170 Q900 150 1100 180",
              ],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </svg>
      </div>

      {/* Floating Particles - Stars/Snow */}
      <div className="absolute inset-0">
        {[
          { left: 8, top: 12, size: 2, delay: 0, duration: 15 },
          { left: 15, top: 25, size: 1.5, delay: 2, duration: 18 },
          { left: 25, top: 8, size: 2.5, delay: 4, duration: 20 },
          { left: 35, top: 18, size: 1.5, delay: 1, duration: 16 },
          { left: 45, top: 30, size: 2, delay: 5, duration: 22 },
          { left: 55, top: 15, size: 1.5, delay: 3, duration: 17 },
          { left: 65, top: 22, size: 2, delay: 6, duration: 19 },
          { left: 75, top: 10, size: 2.5, delay: 2, duration: 21 },
          { left: 85, top: 28, size: 1.5, delay: 4, duration: 18 },
          { left: 92, top: 18, size: 2, delay: 1, duration: 20 },
        ].map((particle, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -80, 0],
              x: [0, 20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
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

      {/* Subtle Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
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
