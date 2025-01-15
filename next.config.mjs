import withBundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})({
  reactStrictMode: true,
  compiler: {
    emotion: true
  },
  async rewrites() {
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'local') {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`
        }
      ]
    } else {
      return []
    }
  }
})

export default nextConfig
