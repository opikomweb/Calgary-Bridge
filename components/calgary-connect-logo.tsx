"use client";

/**
 * CalgaryConnectLogo — v2
 *
 * Inline SVG brand mark matching the reference design:
 *   - Calgary Tower (deep red / crimson) in foreground
 *   - Arch bridge (deep blue) behind the tower
 *   - Subtle wave swoosh (blue) at the base
 *   - Wordmark: "Calgary" (deep navy / white in dark mode) + "Connect" (Calgary red)
 *
 * Usage:
 *   <CalgaryConnectLogo size="sm" />   // icon-only for very small slots
 *   <CalgaryConnectLogo size="md" />   // icon + wordmark (default)
 *   <CalgaryConnectLogo size="lg" />   // larger
 *   <CalgaryConnectLogo iconOnly />    // just the tower+bridge mark
 */

interface CalgaryConnectLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  iconOnly?: boolean;
  className?: string;
  /** Override text colors for dark surfaces */
  darkSurface?: boolean;
}

const sizes = {
  xs: { icon: 28, fontSize: 11, gap: 5 },
  sm: { icon: 36, fontSize: 13, gap: 6 },
  md: { icon: 44, fontSize: 16, gap: 8 },
  lg: { icon: 56, fontSize: 20, gap: 10 },
  xl: { icon: 72, fontSize: 26, gap: 12 },
};

export function CalgaryConnectLogo({
  size = "md",
  iconOnly = false,
  className = "",
  darkSurface = false,
}: CalgaryConnectLogoProps) {
  const { icon: iconSize, fontSize, gap } = sizes[size];

  // Colors — bridge and tower always the same; wordmark uses CSS vars for auto dark-mode
  const towerColor = "#C0121B";
  const towerAccent = "#E1251B";
  const bridgeColor = darkSurface ? "#60A5FA" : "#1D4ED8";
  const waveColor   = darkSurface ? "#93C5FD" : "#3B82F6";
  // Wordmark text colors via CSS variables so they respond to .dark class automatically
  // If darkSurface is explicitly set, force the overridden colours
  const navyStyle: React.CSSProperties = darkSurface
    ? { color: "#ffffff" }
    : { color: "var(--foreground, #0b2239)" };
  const redText = "#E1251B";

  return (
    <div
      className={`flex items-center select-none ${className}`}
      style={{ gap: iconOnly ? 0 : gap }}
      role="img"
      aria-label="Calgary Connect"
    >
      {/* ── Tower + Bridge SVG mark ── */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        {/* Bridge arch — behind the tower */}
        {/* Main arch curve */}
        <path
          d="M8 58 Q40 14 72 58"
          stroke={bridgeColor}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Bridge vertical suspension lines */}
        <line x1="22" y1="44" x2="22" y2="58" stroke={bridgeColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <line x1="31" y1="33" x2="31" y2="58" stroke={bridgeColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <line x1="40" y1="28" x2="40" y2="58" stroke={bridgeColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <line x1="49" y1="33" x2="49" y2="58" stroke={bridgeColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <line x1="58" y1="44" x2="58" y2="58" stroke={bridgeColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

        {/* Wave swoosh */}
        <path
          d="M6 62 Q20 56 34 62 Q48 68 62 62 Q70 58 74 62"
          stroke={waveColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />

        {/* Tower base/shaft */}
        <rect x="37" y="42" width="6" height="16" rx="1" fill={towerColor} />
        {/* Tower neck (narrower) */}
        <rect x="38.5" y="32" width="3" height="12" rx="0.5" fill={towerColor} />
        {/* Observation deck — rounded rectangle */}
        <rect x="33" y="27" width="14" height="8" rx="4" fill={towerColor} />
        {/* Observation deck accent ring lines */}
        <line x1="36" y1="29" x2="36" y2="33" stroke={towerAccent} strokeWidth="1" opacity="0.6" />
        <line x1="40" y1="28" x2="40" y2="35" stroke={towerAccent} strokeWidth="1" opacity="0.7" />
        <line x1="44" y1="29" x2="44" y2="33" stroke={towerAccent} strokeWidth="1" opacity="0.6" />
        {/* Top mast */}
        <rect x="39.5" y="20" width="1.5" height="8" rx="0.75" fill={towerColor} />
        {/* Top cap */}
        <circle cx="40" cy="19" r="2" fill={towerAccent} />
      </svg>

      {/* ── Wordmark ── */}
      {!iconOnly && (
        <div style={{ lineHeight: 1, flexShrink: 0 }}>
          <span
            style={{
              display: "block",
              fontSize,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              ...navyStyle,
            }}
          >
            Calgary
          </span>
          <span
            style={{
              display: "block",
              fontSize,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: redText,
              lineHeight: 1.05,
              marginTop: 1,
            }}
          >
            Connect
          </span>
        </div>
      )}
    </div>
  );
}
