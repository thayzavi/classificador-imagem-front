import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  /* outras opções de configuração podem ser adicionadas aqui */
};

export default nextConfig;
