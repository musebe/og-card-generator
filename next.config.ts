// next.config.js

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // ✅ Add Cloudinary domain for generated images
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      // ✅ Add Imgur domain for template preview images
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
    ],
  },
};

export default nextConfig;