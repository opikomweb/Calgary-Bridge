"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function CalgaryAnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Navy Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050B14] via-[#071119] to-[#0a1628]" />

      {/* Real Calgary Skyline Image Background */}
      <div className="absolute inset-0">
        <Image
          src="/calgary-skyline-bg.png"
          alt=""
          fill
          className="object-cover object-bottom opacity-50"
          priority
        />
        {/* Gradient overlays for content readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050B14]/80 via-transparent to-[#050B14]/40" />
      </div>

      {/* Animated Aurora Glow at Top */}
      <motion.div
        animate={{
          opacity: [0.12, 0.22, 0.12],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 left-1/4 w-[700px] h-[350px] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.18) 0%, transparent 70%)" }}
      />
      
      <motion.div
        animate={{
          opacity: [0.08, 0.16, 0.08],
          x: [0, 40, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-10 right-1/4 w-[500px] h-[250px] rounded-full blur-[80px]"
        style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.12) 0%, transparent 70%)" }}
      />

      {/* CTrain running back and forth along the bottom track */}
      <CalgaryCTrain />

      {/* Golden Accent Glow at Bottom Left */}
      <motion.div
        animate={{
          opacity: [0.15, 0.28, 0.15],
          x: [0, 25, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[450px] h-[180px] rounded-full blur-[70px]"
        style={{ background: "radial-gradient(ellipse, rgba(251,191,36,0.22) 0%, transparent 70%)" }}
      />

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />
    </div>
  );
}

// Small Calgary Tower decoration for footer (simple clean version)
export function CalgaryTowerSmall({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image
        src="/calgary-skyline-bg.png"
        alt=""
        width={120}
        height={60}
        className="object-cover object-center opacity-40"
      />
    </motion.div>
  );
}

// Cartoon Calgary CTrain that runs back and forth along the bottom track
function CalgaryCTrain() {
  return (
    <div className="absolute bottom-6 left-0 right-0 h-20 pointer-events-none overflow-hidden">
      {/* Subtle rail line */}
      <div className="absolute bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute bottom-[3px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/20 to-transparent" />

      {/* The train travels left <-> right forever, flipping direction at each end */}
      <motion.div
        className="absolute bottom-[6px]"
        initial={{ left: "-18%" }}
        animate={{ left: ["-18%", "108%", "-18%"] }}
        transition={{
          duration: 26,
          times: [0, 0.5, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Flip the sprite for each travel direction */}
        <motion.div
          animate={{ scaleX: [1, 1, -1, -1, 1] }}
          transition={{
            duration: 26,
            times: [0, 0.49, 0.51, 0.99, 1],
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <CTrainSprite />
        </motion.div>
      </motion.div>
    </div>
  );
}

// The Calgary CTrain sprite — red/silver Siemens light-rail car
function CTrainSprite() {
  return (
    <svg
      width="150"
      height="46"
      viewBox="0 0 150 46"
      fill="none"
      className="opacity-50 drop-shadow-[0_0_12px_rgba(56,189,248,0.25)]"
      aria-hidden="true"
    >
      {/* Shadow under the train */}
      <ellipse cx="75" cy="44" rx="62" ry="2.5" fill="#000000" opacity="0.35" />

      {/* Main body */}
      <rect x="6" y="8" width="138" height="28" rx="9" fill="#C8CDD4" />
      {/* Red CTrain livery stripe */}
      <rect x="6" y="8" width="138" height="9" rx="9" fill="#D52B1E" />
      <rect x="6" y="30" width="138" height="6" rx="6" fill="#A2161C" opacity="0.55" />

      {/* Front cab nose accent */}
      <path d="M138 8 q6 0 6 9 v10 q0 9 -6 9 z" fill="#E63427" />

      {/* Windows */}
      <g fill="#0B1E2D">
        <rect x="14" y="19" width="18" height="11" rx="2.5" />
        <rect x="37" y="19" width="18" height="11" rx="2.5" />
        <rect x="60" y="19" width="18" height="11" rx="2.5" />
        <rect x="83" y="19" width="18" height="11" rx="2.5" />
        <rect x="106" y="19" width="18" height="11" rx="2.5" />
        {/* Windshield */}
        <path d="M129 19 h7 q4 0 4 5 v1 q0 5 -4 5 h-7 z" />
      </g>
      {/* Window glow */}
      <g fill="#7FD8FF" opacity="0.5">
        <rect x="14" y="19" width="18" height="3.5" rx="1.5" />
        <rect x="37" y="19" width="18" height="3.5" rx="1.5" />
        <rect x="60" y="19" width="18" height="3.5" rx="1.5" />
        <rect x="83" y="19" width="18" height="3.5" rx="1.5" />
        <rect x="106" y="19" width="18" height="3.5" rx="1.5" />
      </g>

      {/* Headlight */}
      <circle cx="140" cy="31" r="2.2" fill="#FFE9A8" />

      {/* Wheels */}
      <circle cx="34" cy="38" r="5" fill="#1A2530" />
      <circle cx="34" cy="38" r="2" fill="#4A5563" />
      <circle cx="116" cy="38" r="5" fill="#1A2530" />
      <circle cx="116" cy="38" r="2" fill="#4A5563" />

      {/* Pantograph on roof */}
      <path d="M70 8 l8 -6 M78 2 l8 6" stroke="#6B7280" strokeWidth="1.5" />
    </svg>
  );
}
