import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Tree-shake heavy barrel packages so only used exports ship (lowers TBT).
    // recharts + framer-motion are the big ones; lucide-react is on by default.
    experimental: {
        optimizePackageImports: ["recharts", "framer-motion"],
    },
};

export default nextConfig;
