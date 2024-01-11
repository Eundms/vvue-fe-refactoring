/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === 'production';

const runtimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: prod ? false : true,
});
const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  //output: 'standalone',
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // hostname: 'vvue-bucket.s3.ap-northeast-2.amazonaws.com',
        hostname: 'vvue-s3.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
  async rewrites() {
    return [
      // {
      //   source: '/api/auth',
      //   destination: 'http://vvue.site/api/auth',
      // },
      // {
      //   source: '/api/auth/refresh-access-token',
      //   destination: 'http://vvue.site/api/auth/refresh-access-token',
      // },
      // {
      //   source: '/api/auth/:path*',
      //   destination: 'http://vvue.site/api/auth/:path*',
      // },
      // {
      //   source: '/api/:path*',
      //   destination: 'http://vvue.site/api/:path*',
      // },
      // source: 유저가 진입할 path
      // destination: 유저가 이동할 path
      // {
      //   source: '/backend/v1/api/:path*',
      //   destination: 'https://vvue.site/v1/api/:path*',
      // },
      {
        source: '/backend/v1/api/:path*',
        destination: 'http://vvue.site:8080/back/api/:path*',
      },
      {
        source: '/pictures/:path*',
        destination: 'https://vvue.site/pictures/:path*',
      },
    ];
  },
});

module.exports = nextConfig;
