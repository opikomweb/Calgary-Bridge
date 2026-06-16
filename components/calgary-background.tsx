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
          Using object-contain + bottom anchor so the full skyline — including
          the Calgary Tower's observation deck and antenna — is always fully
          visible and never clipped. The container is taller to give the tower
          room, and max-h is removed so it can breathe on large screens.
          Day mode: mix-blend-multiply drops the white backdrop.
          Dark mode: low opacity tint, normal blend. */}
      <div className="absolute inset-x-0 bottom-0 h-[52vh] min-h-[320px]">
        <Image
          src="/calgary-skyline-silhouette.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain object-bottom opacity-85 mix-blend-multiply dark:opacity-12 dark:mix-blend-normal"
        />
      </div>
    </div>
  );
}
