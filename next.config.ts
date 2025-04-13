import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    // ¡Advertencia! Esto permitirá que el build se complete incluso con errores de ESLint
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
