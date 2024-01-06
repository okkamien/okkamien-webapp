/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: ['localhost'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
