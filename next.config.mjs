/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true
  },
  output: 'export',
  basePath: '/hm-prototypes',
  images: { unoptimized: true }
};

export default nextConfig;