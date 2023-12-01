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
    domains: ['cdn.simplehash.com', 'gateway.ipfscdn.io', 'media.artblocks.io', '**.thirdwebcdn.com', '**.seadn.io', 'lh3.googleusercontent.com', 'i.seadn.io', 'openseauserdata.com', 'rarible.mypinata.cloud', 'media-proxy.artblocks.io', 'raw.seadn.io', 'img.reservoir.tools'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config 
  },
}

module.exports = nextConfig
