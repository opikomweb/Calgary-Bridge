"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function CalgaryAnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Base sky: a light, friendly "crayon Calgary blue" — soft enough that
          dark text always stays readable, deep navy at night. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#aed4f5] via-[#cfe6fa] to-[#f0f7ff] dark:from-[#040912] dark:via-[#08131f] dark:to-[#0c1c30]" />

      {/* Warm horizon wash near the bottom to add depth & a sunny prairie feel */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#fff4e0]/40 via-[#dcecff]/10 to-transparent dark:from-[#0a1c30]/40 dark:via-transparent dark:to-transparent" />

      {/* Real Calgary Skyline Image Background */}
      <div className="absolute inset-0">
        <Image
          src="/calgary-skyline-bg.png"
          alt=""
          fill
          className="object-cover object-bottom opacity-45 dark:opacity-60"
          priority
        />
        {/* Readability overlays: keep the MIDDLE (where text/cards sit) calm,
            but let the skyline stay crisp along the bottom. Lighter, cleaner
            washes (less flat gray) preserve the sky's blue and the skyline. */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#dcebff]/25 to-[#cfe4ff]/45 dark:via-[#050B14]/45 dark:to-[#050B14]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#dceaff]/40 via-transparent to-[#dceaff]/20 dark:from-[#050B14]/55 dark:to-[#050B14]/30" />
      </div>

      {/* Animated Aurora Glow at Top */}
      <motion.div
        animate={{
          opacity: [0.2, 0.34, 0.2],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 left-1/4 w-[700px] h-[350px] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.3) 0%, transparent 70%)" }}
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
          opacity: [0.22, 0.38, 0.22],
          x: [0, 25, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[450px] h-[180px] rounded-full blur-[70px]"
        style={{ background: "radial-gradient(ellipse, rgba(251,191,36,0.32) 0%, transparent 70%)" }}
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

// Long Calgary CTrain that glides along a gently curved rail line.
// Uses native SVG <animateMotion> (SMIL) so it stays lightweight — no JS
// animation loop. The path enters from slightly up on the left, dips down
// through the footer, then exits at an upward angle on the right, with
// rotate="auto" tilting the train naturally into the curve.
function CalgaryCTrain() {
  // Smooth rail path across the bottom: up-left → down (footer) → up-right.
  const RAIL = "M -260 60 C 170 28 440 150 760 138 S 1330 46 1720 8";

  return (
    <div className="absolute bottom-[68px] left-0 right-0 h-20 opacity-[0.45] sm:bottom-12 sm:h-28 sm:opacity-60 md:bottom-0 md:h-48 md:opacity-100 pointer-events-none overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 180"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          {/* Invisible motion path only — the rail line itself is intentionally
              not rendered so it never cuts through the footer text. */}
          <path id="ctrain-rail" d={RAIL} />
        </defs>

        {/* The long train, gliding along the (invisible) rail */}
        <g opacity="0.55" className="drop-shadow-[0_0_10px_rgba(56,189,248,0.25)]">
          <CTrainCars />
          <animateMotion dur="24s" repeatCount="indefinite" rotate="auto" calcMode="linear">
            <mpath href="#ctrain-rail" />
          </animateMotion>
        </g>
      </svg>
    </div>
  );
}

// A single CTrain car drawn around a center x; lead=true adds the cab nose.
function CTrainCar({ cx, lead = false }: { cx: number; lead?: boolean }) {
  const w = 104;
  const x = cx - w / 2;
  return (
    <g>
      {/* Body */}
      <rect x={x} y={-15} width={w} height={30} rx={9} fill="#C8CDD4" />
      {/* Red CTrain livery */}
      <rect x={x} y={-15} width={w} height={9} rx={6} fill="#D52B1E" />
      <rect x={x} y={9} width={w} height={6} rx={5} fill="#A2161C" opacity="0.55" />
      {/* Windows */}
      <g fill="#0B1E2D">
        <rect x={x + 9} y={-4} width={18} height={11} rx={2.5} />
        <rect x={x + 32} y={-4} width={18} height={11} rx={2.5} />
        <rect x={x + 55} y={-4} width={18} height={11} rx={2.5} />
        <rect x={x + 78} y={-4} width={16} height={11} rx={2.5} />
      </g>
      {/* Window glow */}
      <g fill="#7FD8FF" opacity="0.5">
        <rect x={x + 9} y={-4} width={18} height={3.5} rx={1.5} />
        <rect x={x + 32} y={-4} width={18} height={3.5} rx={1.5} />
        <rect x={x + 55} y={-4} width={18} height={3.5} rx={1.5} />
        <rect x={x + 78} y={-4} width={16} height={3.5} rx={1.5} />
      </g>
      {/* Cab nose + headlight on the lead car (front faces right) */}
      {lead && (
        <>
          <path d={`M${x + w} -15 q7 0 7 9 v12 q0 9 -7 9 z`} fill="#E63427" />
          <circle cx={x + w + 2} cy={8} r={2.2} fill="#FFE9A8" />
        </>
      )}
      {/* Wheels */}
      <circle cx={cx - 28} cy={17} r={4.5} fill="#1A2530" />
      <circle cx={cx - 28} cy={17} r={1.8} fill="#4A5563" />
      <circle cx={cx + 28} cy={17} r={4.5} fill="#1A2530" />
      <circle cx={cx + 28} cy={17} r={1.8} fill="#4A5563" />
    </g>
  );
}

// Four coupled cars forming a standard long CTrain. The whole drawing is
// shifted up by 22px so the WHEELS (not the body center) sit exactly on the
// motion path — keeping the train riding on the rail line, never above it.
function CTrainCars() {
  // Evenly spaced car centers, centered on origin. Lead car faces right.
  const positions = [-177, -59, 59, 177];
  return (
    <g transform="translate(0,-22)">
      {/* Soft shadow under the whole train, sitting on the rail */}
      <ellipse cx={0} cy={23} rx={245} ry={3} fill="#000000" opacity="0.3" />
      {/* Pantographs on alternating roofs */}
      <path d="M-118 -15 l8 -6 M-110 -21 l8 6" stroke="#6B7280" strokeWidth="1.5" />
      <path d="M0 -15 l8 -6 M8 -21 l8 6" stroke="#6B7280" strokeWidth="1.5" />
      <path d="M118 -15 l8 -6 M126 -21 l8 6" stroke="#6B7280" strokeWidth="1.5" />
      {/* Cars: three trailers + lead cab on the right */}
      {positions.map((cx, i) => (
        <CTrainCar key={cx} cx={cx} lead={i === positions.length - 1} />
      ))}
    </g>
  );
}
