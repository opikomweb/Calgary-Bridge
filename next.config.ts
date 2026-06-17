import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve modern formats (avif first, then webp) for all next/image calls
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Compress all responses with gzip/br
  compress: true,

  // React compiler for automatic memoisation (reduces re-renders)
  // Key moved to top-level per Next.js 16 docs
  reactCompiler: true,

  // Strip console.* in production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
