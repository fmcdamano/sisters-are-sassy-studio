/** @type {import('next').NextConfig} */
const nextConfig = {
  // nanoid v5 is ESM-only; transpile so webpack can bundle it correctly
  transpilePackages: ["nanoid"],
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow the QR code API used in email templates
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.qrserver.com",
      },
    ],
  },
  experimental: {
    // Exclude Prisma from the server bundle (uses native binaries)
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
  },
};

export default nextConfig;
