import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath:
    process.env.NODE_ENV === "production" ? "/AV-s-Intelligence-Portal" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/AV-s-Intelligence-Portal" : "",
};

export default nextConfig;
