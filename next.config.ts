import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/AV-s-Intelligence-Portal",
  assetPrefix: "/AV-s-Intelligence-Portal",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
