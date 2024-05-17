/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "export"
,  };
  
  module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '127.0.0.1',
          port: '1337',
          // pathname: '',
        },
        {
          protocol: 'http',
          hostname: '127.0.0.1',
          port: '1337',
          // pathname: '',
        },
        {
          protocol: 'http',
          hostname: 'proyectos.pelegrindesign.com',
          // port: '3000',
          // pathname: '',
        },
        {
          protocol: 'http',
          hostname: 'https://rotulos-pelegrin-git-alpha-rotulos-pelegrin.vercel.app',
          // port: '3000',
          // pathname: '',
        },
      ],
      formats: ['image/avif', 'image/webp'],
    },
    env: {
      NEXT_PUBLIC_SOCKET_URL: 'https://rotulos-pelegrin-git-alpha-rotulos-pelegrin.vercel.app',
    },
    // ... otras configuraciones
  }