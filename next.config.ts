import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.ngrok-free.app",
      },
      {
        protocol: "https",
        hostname: "**.ngrok.io",
      },
    ],
  },
  allowedDevOrigins: [
    "https://*.ngrok-free.app",
    "https://*.ngrok.io",
  ],
};

export default nextConfig;
