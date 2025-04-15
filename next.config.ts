import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true
  }
};

export default nextConfig;
