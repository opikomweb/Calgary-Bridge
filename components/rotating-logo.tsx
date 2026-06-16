"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// The three brand variations, cycled with a smooth crossfade.
const LOGOS = [
  { src: "/logo-gradient.png", alt: "Calgary Konnect" },
  { src: "/logo-silver.png", alt: "Calgary Konnect" },
  { src: "/logo-gold.png", alt: "Calgary Konnect" },
];

interface RotatingLogoProps {
  /** Tailwind padding utility applied to each image (e.g. "p-3"). */
  imgPadding?: string;
  /** How long each logo stays before crossfading (ms). */
  interval?: number;
  priority?: boolean;
}

export function RotatingLogo({ imgPadding = "p-3", interval = 3500, priority = false }: RotatingLogoProps) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % LOGOS.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src={LOGOS[index].src || "/placeholder.svg"}
          alt={LOGOS[index].alt}
          fill
          className={`object-contain ${imgPadding}`}
          priority={priority}
        />
      </motion.div>
    </AnimatePresence>
  );
}
