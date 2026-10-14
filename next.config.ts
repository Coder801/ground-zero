import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Static export for Cloudflare Pages: no server, so no runtime image optimizer.
    // Work photos are pre-compressed to WebP and served as-is.
    output: "export",
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
