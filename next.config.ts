import type { NextConfig } from "next";
import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/webgis-static/:path*",
        destination: "/webgis-static/:path*",
      },
    ];
  },
};

export default nextConfig;
