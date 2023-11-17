/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
  };
  
  module.exports = {
    images: {
      domains: ['localhost'],
      formats: ['image/avif', 'image/webp'],
    },
    // ... otras configuraciones
  }