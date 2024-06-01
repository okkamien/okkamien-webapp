/** @type {import('next').NextConfig} */
const siteMapJson = require('./app/dictionaries/site-map.json')

const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  async rewrites() {
    return [
      {
        source: siteMapJson.events,
        destination: '/events',
      },
      {
        source: `${siteMapJson.events}/:slug`,
        destination: '/events/:slug',
      },
      {
        source: siteMapJson.facilities,
        destination: '/facilities',
      },
      {
        source: `${siteMapJson.facilities}/:slug`,
        destination: '/facilities/:slug',
      },
      {
        source: siteMapJson.news,
        destination: '/news',
      },
      {
        source: `${siteMapJson.news}/:slug`,
        destination: '/news/:slug',
      },
      {
        source: siteMapJson.workshops,
        destination: '/workshops',
      },
      {
        source: `${siteMapJson.workshops}/:slug`,
        destination: '/workshops/:slug',
      },
    ]
  },
}

module.exports = nextConfig
