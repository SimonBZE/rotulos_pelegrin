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
        {
          protocol: 'http',
          hostname: 'rotulos-pelegrin-git-alpha-rotulos-pelegrin.vercel.app',
          port: '3000',
          // pathname: '',
        },
        {
          protocol: 'http',
          hostname: 'https://rotulos-pelegrin-git-alpha-rotulos-pelegrin.vercel.app',
          port: '3000',
          // pathname: '',
        },
      ],
      formats: ['image/avif', 'image/webp'],
    },
    // ... otras configuraciones
  }