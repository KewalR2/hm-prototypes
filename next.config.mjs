/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true
  },
  images: { unoptimized: true },
  eslint: {
    // Disable ESLint during build for deployment
    ignoreDuringBuilds: true
  },
  typescript: {
    // Disable TypeScript checks during build for deployment
    ignoreBuildErrors: true
  }
};

export default nextConfig;