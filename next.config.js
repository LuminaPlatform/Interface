/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const bundleAnalyzer = require("@next/bundle-analyzer");

const nextConfig = {
  reactStrictMode: true
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true"
});

module.exports = withBundleAnalyzer(nextConfig);
