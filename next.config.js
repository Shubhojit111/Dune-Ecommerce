/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "impulse-theme-fashion.myshopify.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "coresg-normal.trae.ai",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
