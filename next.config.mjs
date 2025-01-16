/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  productionBrowserSourceMaps: true,
  async rewrites() {
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'local') {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
        },
      ];
    } else {
      return [];
    }
  },
};

export default nextConfig;
