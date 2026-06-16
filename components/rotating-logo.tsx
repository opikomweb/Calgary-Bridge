"use client";

import Image from "next/image";

interface RotatingLogoProps {
  /** Tailwind padding utility applied to the image (e.g. "p-3"). */
  imgPadding?: string;
  priority?: boolean;
  /**
   * "light" → navy-lettered logo for LIGHT surfaces (default).
   * "dark"  → white-lettered logo for DARK surfaces (e.g. the landing hero).
   */
  variant?: "light" | "dark";
}

/**
 * Calgary Connect brand mark.
 *
 * Renders the single, transparent-background logo (Calgary Tower + bridge +
 * "Calgary Connect" wordmark) so it can sit large and clean directly on a
 * surface — no dark badge needed. Two variants keep the wordmark legible on
 * both light and dark backgrounds. The component name is kept for backwards
 * compatibility with existing call sites.
 */
export function RotatingLogo({ imgPadding = "p-0", priority = false, variant = "light" }: RotatingLogoProps) {
  const src =
    variant === "dark"
      ? "/calgary-connect-logo-light.png"
      : "/calgary-connect-logo-transparent.png";

  return (
    <Image
      src={src}
      alt="Calgary Connect"
      fill
      sizes="(max-width: 1024px) 200px, 320px"
      className={`object-contain ${imgPadding}`}
      priority={priority}
    />
  );
}
