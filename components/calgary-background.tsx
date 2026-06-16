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

      {/* Very soft top glow for a touch of depth — kept faint so it never
          tints the area where text and cards sit. */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full blur-[120px] opacity-50 dark:opacity-30"
        style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.10) 0%, transparent 70%)" }}
      />

      {/* Premium Calgary skyline silhouette, anchored to the bottom edge.
          `mix-blend-mode: multiply` lets the white backdrop of the art fall
          away so only the soft-blue silhouette tints the gradient. Low opacity
          keeps it a tasteful watermark rather than a busy backdrop. */}
      <div className="absolute inset-x-0 bottom-0 h-[42vh] min-h-[260px] max-h-[460px]">
        <Image
          src="/calgary-skyline-silhouette.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom opacity-95 mix-blend-multiply dark:opacity-30 dark:mix-blend-screen"
        />
      </div>
    </div>
  );
}
