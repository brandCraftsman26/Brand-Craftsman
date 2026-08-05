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
    ],
  },
  /* config options here */
};

export default nextConfig;
