import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"],
  },
};

// output: "export",

export default withNextIntl(nextConfig);
