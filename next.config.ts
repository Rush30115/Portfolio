import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
    output: "export",
    trailingSlash: true,
    basePath: isProd ? "/Portfolio" : "",
    images: {
        unoptimized: true,
        formats: ["image/avif", "image/webp"],
    },
};

export default nextConfig;

