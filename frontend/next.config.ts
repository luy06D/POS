import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.DOMAIN!,
      }
    ],
    dangerouslyAllowLocalIP: true
  }
};

export default nextConfig;
