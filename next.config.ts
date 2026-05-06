import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    minimumCacheTTL: 60,
    formats: ["image/webp"],   // webp is sharp + small
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],  // ✅ includes 4K
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
