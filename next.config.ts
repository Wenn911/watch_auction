import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export',
    distDir: 'dist',
    images: { unoptimized: true },
    reactCompiler: true,
    async redirects() {
        return [
            {
                source: "/",
                destination: "/active",
                permanent: true,
            }
        ];
    },
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },
};

export default nextConfig;
