/** @type {import('next').NextConfig} */
/** @type {import('@next/bundle-analyzer')} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
      },
    ],
  },
  webpack(config) {
    console.log(config.plugins);
    return {
      ...config,
    };
  },
};

module.exports = withBundleAnalyzer(nextConfig);
