import type { NextConfig } from "next";

// GITHUB_PAGES=1 builds a fully static site into /out for GitHub Pages
// (served from /<repo-name>). Without it, it's a normal Next.js build (e.g. Vercel).
const pages = process.env.GITHUB_PAGES === "1";
const basePath = pages ? process.env.PAGES_BASE_PATH ?? "/cross-portfolio" : undefined;

const nextConfig: NextConfig = {
  ...(pages ? { output: "export", basePath, trailingSlash: true } : {}),
  images: {
    unoptimized: pages,
    qualities: [75, 95],
    remotePatterns: [{ protocol: "https", hostname: "i.vimeocdn.com" }],
  },
};

export default nextConfig;
