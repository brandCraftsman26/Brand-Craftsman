import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pmqrpaombgsflfhgmfrw.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
