/** @type {import('next').NextConfig} */
/** @type {import('@next/bundle-analyzer')} */
/** @type {import('@plaiceholder/next')} */

// withBundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// });

const nextConfig = {
  reactStrictMode: true,
  experimental: {},
  images: {
    deviceSizes: [1200, 960, 576, 348, 140],
    imageSizes: [1200, 960, 576, 348, 140],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
      },
      {
        protocol: "https",
        hostname: "maju-bucket.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
  webpack(config) {
    return {
      ...config,
    };
  },
};

module.exports = nextConfig;
