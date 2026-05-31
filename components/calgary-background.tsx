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

      {/* Animated Floating Particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: `${(i * 4) % 100}%`,
            y: "110%",
            opacity: 0,
          }}
          animate={{
            y: "-10%",
            opacity: [0, 0.5, 0.3, 0],
          }}
          transition={{
            duration: 14 + (i % 6) * 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "linear",
          }}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${(i * 4 + 3) % 96}%`,
            background: i % 4 === 0 ? "#FBBF24" : "#38BDF8",
            boxShadow: i % 4 === 0 ? "0 0 10px #FBBF24" : "0 0 8px #38BDF8",
          }}
        />
      ))}

      {/* Animated Bow River Light Streams at Bottom */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-40 opacity-70"
        viewBox="0 0 1920 160"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="riverGradientMain" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.3" />
            <stop offset="25%" stopColor="#38BDF8" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="riverGradientSecondary" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.1" />
            <stop offset="40%" stopColor="#22D3EE" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
          </linearGradient>
          <filter id="riverGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Main river flow - animated */}
        <motion.path
          d="M-100,80 Q300,50 650,70 T1300,55 T1920,75 L2020,75"
          fill="none"
          stroke="url(#riverGradientMain)"
          strokeWidth="3"
          filter="url(#riverGlow)"
          animate={{
            d: [
              "M-100,80 Q300,50 650,70 T1300,55 T1920,75",
              "M-100,65 Q300,85 650,55 T1300,80 T1920,60",
              "M-100,80 Q300,50 650,70 T1300,55 T1920,75",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Secondary flowing stream */}
        <motion.path
          d="M-50,110 Q400,85 800,100 T1400,90 T2020,105"
          fill="none"
          stroke="url(#riverGradientSecondary)"
          strokeWidth="2"
          filter="url(#riverGlow)"
          animate={{
            d: [
              "M-50,110 Q400,85 800,100 T1400,90 T2020,105",
              "M-50,95 Q400,115 800,85 T1400,110 T2020,90",
              "M-50,110 Q400,85 800,100 T1400,90 T2020,105",
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>

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
