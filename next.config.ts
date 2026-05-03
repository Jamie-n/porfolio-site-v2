import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /**
   * Avoid broken / missing `.next/server/vendor-chunks/*` for large dependency
   * trees (webpack splits them; cache or interrupted dev can leave stale refs).
   */
  serverExternalPackages: [
    "react-syntax-highlighter",
    "refractor",
    "react-markdown",
    "rehype-sanitize",
    "tailwind-merge",
    "clsx",
  ],
};

export default nextConfig;
