"use client";

import Image from "next/image";

// Clean, calm Calgary background with a premium skyline accent.
//
// Base is a soft, light "Calgary blue" gradient — the same calm surface the
// Askonnect chat sits on — so dark and deep-blue text stays sharp and
// readable on every tab. A single, refined Calgary skyline silhouette is
// anchored along the very bottom edge as a subtle brand watermark. It is kept
// faint (and uses multiply blending to drop its white backdrop) so it adds a
// premium sense of place without making the content areas busy. Dark mode
// keeps a deep navy equivalent.
export function CalgaryAnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Base: light, friendly Calgary-blue wash (matches the chat surface). */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#e6edfb] via-[#eef3fd] to-[#f4f8ff] dark:from-[#070d18] dark:via-[#0a1322] dark:to-[#0c1a2e]" />

      {/* Very soft top glow — only visible in day mode to avoid blue haze
          leaking onto dark surfaces. */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full blur-[120px] opacity-40 dark:opacity-0"
        style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)" }}
      />

      {/* Calgary iconic line-art, anchored to the bottom edge.
          The source image has a pure black background with white outlines.
          mix-blend-screen causes the black to become fully transparent, leaving
          only the white line-art visible — no white block artifact in any mode.
          Day mode: low opacity so lines are a subtle watermark.
          Dark mode: higher opacity + soft blue glow for a luminous feel. */}
      <div className="absolute inset-x-0 bottom-0 h-[45vh] min-h-[260px]">
        <Image
          src="/calgary-iconic.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain object-bottom mix-blend-screen opacity-[0.12] dark:opacity-[0.28]"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(147,210,255,0.18)) drop-shadow(0 0 2px rgba(255,255,255,0.12))'
          }}
        />
      </div>
    </div>
  );
}
