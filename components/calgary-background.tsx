"use client";

import Image from "next/image";

// Full-page background with the Calgary iconic line-art anchored bottom.
// The image uses mix-blend-screen so the black background becomes transparent —
// only the white line-art silhouette is visible at all screen sizes.
// A graduated overlay sits on top to protect any content scrolled over it.
export function CalgaryAnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Base page gradient — calm light blue in day, deep navy in dark */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#e6edfb] via-[#eef3fd] to-[#f4f8ff] dark:from-[#070d18] dark:via-[#0a1322] dark:to-[#0c1a2e]" />

      {/* Subtle top radial bloom — day only */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full blur-[120px] opacity-40 dark:opacity-0"
        style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)" }}
      />

      {/* Calgary iconic line-art — FULL WIDTH, anchored bottom.
          object-contain preserves aspect ratio so building tops are never clipped.
          object-bottom keeps the skyline ground flush with the viewport bottom.
          mix-blend-screen = pure black becomes transparent, white outlines show. */}
      <div className="absolute inset-x-0 bottom-0 h-[45vh] min-h-[240px] max-h-[380px]">
        <Image
          src="/calgary-iconic.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain object-bottom mix-blend-screen"
          style={{ opacity: "var(--skyline-opacity, 0.13)" }}
        />
        {/* Day-mode opacity token */}
        <style>{`
          :root { --skyline-opacity: 0.13; }
          .dark { --skyline-opacity: 0.30; }
        `}</style>
      </div>

      {/* Content-protection overlay — same height as image container */}
      <div className="absolute inset-x-0 bottom-0 h-[45vh] min-h-[240px] max-h-[380px]
                      bg-gradient-to-b
                      from-[#eef3fd]/90 via-[#eef3fd]/40 to-transparent
                      dark:from-[#0a1322]/90 dark:via-[#0a1322]/40 dark:to-transparent
                      pointer-events-none" />
    </div>
  );
}
