import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  // Necesario para GitHub Pages (proyecto en /crazymangos)
  basePath: isProd ? "/crazymangos" : "",
  assetPrefix: isProd ? "/crazymangos" : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
