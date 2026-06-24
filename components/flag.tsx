"use client";

import { useState } from "react";

/**
 * Cross-platform flag renderer.
 *
 * Flag *emoji* (🇨🇦, 🇮🇳, …) do not render on Windows/Chrome and most desktop
 * browsers — they fall back to the two regional-indicator letters (e.g. "CA"),
 * which is exactly the bug users were seeing. To guarantee a real flag on every
 * platform we render an <img> from flagcdn.com (lightweight SVG), keyed off the
 * ISO 3166-1 alpha-2 country code. If the image ever fails to load we fall back
 * to the country code text so nothing breaks.
 */
export function Flag({
  countryCode,
  className = "",
  size = 16,
  title,
}: {
  /** ISO 3166-1 alpha-2 code, e.g. "CA", "IN", "PH". Case-insensitive. */
  countryCode: string;
  className?: string;
  /** Rendered width in px. Height follows the 4:3 flag ratio. */
  size?: number;
  title?: string;
}) {
  const [failed, setFailed] = useState(false);
  const code = countryCode.toLowerCase();
  const height = Math.round((size * 3) / 4);

  if (failed) {
    return (
      <span
        className={`inline-flex items-center justify-center font-bold text-foreground/60 ${className}`}
        style={{ width: size, fontSize: Math.round(size * 0.55) }}
        aria-hidden="true"
      >
        {countryCode.toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/${code}.svg`}
      width={size}
      height={height}
      alt={title ?? ""}
      title={title}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`inline-block object-cover rounded-[2px] ${className}`}
      style={{ width: size, height }}
      aria-hidden={title ? undefined : true}
    />
  );
}
