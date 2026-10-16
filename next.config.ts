import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images in /public are optimised once at build time (webp), so the runtime
  // optimiser is not needed.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
