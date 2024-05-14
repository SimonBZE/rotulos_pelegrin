/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
  };
  
  module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'pelegrin.up.railway.app',
          port: '3000',
          // pathname: '',
        },
      ],
      formats: ['image/avif', 'image/webp'],
    },
    // ... otras configuraciones
  }