import type { NextConfig } from "next";

// GitHub Pages serves this site from https://pentagent-ai.github.io/PentAgent/.
// Set NEXT_PUBLIC_BASE_PATH="" to build for a root domain instead.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/PentAgent";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
