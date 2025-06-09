import type { NextConfig } from 'next';

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
});

const nextConfig: NextConfig = {
  // Enable static export for offline distribution
  // output: 'export', // Commented out for development
  // trailingSlash: true, // Commented out for development
  images: {
    unoptimized: true,
  },
};

module.exports = withPWA(nextConfig);
