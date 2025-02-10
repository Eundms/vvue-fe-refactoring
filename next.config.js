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
    loader :'default',
    // loader: 'custom',
    // loaderFile: './custom-loader.js',
    domains: ['cdn.vvue.site'], 
    unoptimized: true, 

    remotePatterns: [
      {
        protocol: 'https',
        // hostname: 'vvue-bucket.s3.ap-northeast-2.amazonaws.com',
        hostname: 'cdn.vvue.site',
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
      // {
      //   source: '/backend/v1/api/:path*',
      //   destination: `${process.env.NEXT_PUBLIC_API_URL}/back/api/:path*`,
      // },
    ];
  },
  async headers() {
    return [
      {
        source: '/back/api/:path*', // CORS 적용할 API 경로
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://www.vvue.site', // 허용할 출처
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS', // 허용할 HTTP 메서드
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Origin, Content-Type, X-Auth-Token, Authorization', // 허용할 헤더
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true', // 쿠키 전달 허용
          },
        ],
      },
    ];
  },
  env: {
    NEXT_PUBLIC_FIREBASE_APIKEY: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECTID: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    NEXT_PUBLIC_FIREBASE_STORAGEBUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    NEXT_PUBLIC_FIREBASE_APPID: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENTID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
  },
});
module.exports = nextConfig;
