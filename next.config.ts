import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const basePath = isProd ? "/Portfolio" : "";

const nextConfig: NextConfig = {
    output: "export",
    trailingSlash: true,
    basePath: basePath,
    env: {
        NEXT_PUBLIC_BASE_PATH: basePath,
    },
    images: {
        unoptimized: true,
        formats: ["image/avif", "image/webp"],
    },
};

export default nextConfig;

