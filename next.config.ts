import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !!! WARNING !!!
    // Dangerously allow production builds to complete even if
    // your TypeScript types don't compile.
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(nextConfig);
