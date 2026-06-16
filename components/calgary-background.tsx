"use client";

// Clean, calm Calgary background.
//
// Previously this rendered a full skyline photo, an animated CTrain, cyan
// aurora glows and grid lines. Those elements muddied the content areas and
// reduced text contrast (deep-blue text was hard to read on Home / Explore).
//
// It is now a soft, light "Calgary blue" gradient — the same calm surface the
// iKonnect Guide chat sits on — so dark and deep-blue text stays sharp and
// readable on every tab. Dark mode keeps a deep navy equivalent.
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
    </div>
  );
}
