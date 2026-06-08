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

// Long Calgary CTrain that glides along a gently curved rail line.
// Uses native SVG <animateMotion> (SMIL) so it stays lightweight — no JS
// animation loop. The path enters from slightly up on the left, dips down
// through the footer, then exits at an upward angle on the right, with
// rotate="auto" tilting the train naturally into the curve.
function CalgaryCTrain() {
  // Smooth rail path across the bottom: up-left → down (footer) → up-right.
  const RAIL = "M -260 60 C 170 28 440 150 760 138 S 1330 46 1720 8";

  return (
    <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 180"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="railGrad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#38BDF8" stopOpacity="0" />
            <stop offset="0.5" stopColor="#38BDF8" stopOpacity="0.35" />
            <stop offset="1" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>
          <path id="ctrain-rail" d={RAIL} />
        </defs>

        {/* Visible rail line (soft glow + crisp line) */}
        <use href="#ctrain-rail" stroke="url(#railGrad)" strokeWidth="6" strokeLinecap="round" opacity="0.4" />
        <use href="#ctrain-rail" stroke="url(#railGrad)" strokeWidth="1.5" strokeLinecap="round" />

        {/* The long train, gliding along the rail */}
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

// Three coupled cars centered at origin (so animateMotion glides it cleanly).
function CTrainCars() {
  return (
    <g>
      {/* Soft shadow under the whole train */}
      <ellipse cx={0} cy={21} rx={185} ry={3} fill="#000000" opacity="0.3" />
      {/* Pantograph */}
      <path d="M-60 -15 l8 -6 M-52 -21 l8 6" stroke="#6B7280" strokeWidth="1.5" />
      <path d="M60 -15 l8 -6 M68 -21 l8 6" stroke="#6B7280" strokeWidth="1.5" />
      {/* Cars: rear, middle, lead(front) */}
      <CTrainCar cx={-118} />
      <CTrainCar cx={0} />
      <CTrainCar cx={118} lead />
    </g>
  );
}
