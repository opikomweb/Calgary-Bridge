"use client";

import Image from "next/image";

// Clean, calm Calgary background with a premium skyline accent.
//
// Base is a soft, light "Calgary blue" gradient — the same calm surface the
// iKonnect Guide chat sits on — so dark and deep-blue text stays sharp and
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

      {/* Premium Calgary skyline silhouette, anchored to the bottom edge.
          Day mode: `mix-blend-multiply` drops the white backdrop so only the
          blue silhouette tints the gradient.
          Dark mode: no blend mode — use a very low opacity tinted silhouette
          so the image darkens naturally against the navy background without
          creating the bright-white "screen" bleed. */}
      <div className="absolute inset-x-0 bottom-0 h-[42vh] min-h-[260px] max-h-[460px]">
        <Image
          src="/calgary-skyline-silhouette.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom opacity-90 mix-blend-multiply dark:opacity-15 dark:mix-blend-normal"
        />
      </div>
    </div>
  );
}
