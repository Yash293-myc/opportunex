import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for optimized Docker deployment
  output: "standalone",

  // Allow external image domains if needed
  images: {
    remotePatterns: [],
  },

  // Experimental features
  experimental: {
    // Optimized package imports
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
