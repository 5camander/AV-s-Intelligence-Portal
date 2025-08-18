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

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePath = join(process.cwd(), "webgis-static", ...params.path);
    const fileContent = await readFile(filePath, "utf8");

    return new NextResponse(fileContent, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    return new NextResponse("File not found", { status: 404 });
  }
}

export default nextConfig;
