/** @type {import('next').NextConfig} */
/** @type {import('@next/bundle-analyzer')} */
/** @type {import('@plaiceholder/next')} */
const path = require("path");

// withBundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// });

const nextConfig = {
  reactStrictMode: true,
  experimental: {},
  images: {
    deviceSizes: [1200, 960, 576, 348],
    imageSizes: [1200, 960, 576, 348],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
      },
      {
        protocol: "https",
        hostname: "d3o99mc8r0f091.cloudfront.net",
      },
    ],
  },
  // webpack(config) {
  //   return {
  //     ...config,
  //   };
  // },
  webpack(config, { defaultLoaders }) {
    config.resolve.modules.push(__dirname);
    config.resolve.modules.push(path.resolve("./src"));
    return config;
  },
};

module.exports = nextConfig;
