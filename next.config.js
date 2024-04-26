/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
    domains: ['cdn.simplehash.com', 'gateway.ipfscdn.io', 'media.artblocks.io', '**.thirdwebcdn.com', '**.seadn.io', 'lh3.googleusercontent.com', 'i.seadn.io', 'openseauserdata.com', 'rarible.mypinata.cloud', 'media-proxy.artblocks.io', 'raw.seadn.io', 'img.reservoir.tools', 'blur.io'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config 
  },
  async redirects() {
    return [
      {
        source: '/profile/:address/offers',
        destination: '/profile/:address/offers/ethereum',
        permanent: true,
      },
      {
        source: '/profile/:address/collected',
        destination: '/profile/:address/collected/ethereum',
        permanent: true,
      },
      {
        source: '/profile/:address/bids',
        destination: '/profile/:address/bids/ethereum',
        permanent: true,
      },
      {
        source: '/profile/:address/asks',
        destination: '/profile/:address/asks/ethereum',
        permanent: true,
      },
      {
        source: '/profile/:address/activity',
        destination: '/profile/:address/activity/ethereum',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
