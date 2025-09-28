import type { NextConfig } from "next";

import "./src/lib/env/client";
import "./src/lib/env/server";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.kjsr.or.id",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
