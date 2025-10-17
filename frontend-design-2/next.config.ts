import type { NextConfig } from "next";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if running on Vercel (Vercel sets outputFileTracingRoot automatically)
const isVercel = process.env.VERCEL === '1';

const nextConfig: NextConfig = {
  // Image optimization for IPFS and external sources
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.mypinata.cloud',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Turbopack configuration (only set locally to avoid conflict with Vercel's outputFileTracingRoot)
  ...(!isVercel && {
    turbopack: {
      root: __dirname,
    },
  }),

  // Webpack configuration for Web3 compatibility (used when Turbopack falls back to Webpack)
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    // Ignore warnings from Web3 packages
    config.ignoreWarnings = [
      { module: /node_modules\/@walletconnect/ },
      { module: /node_modules\/wagmi/ },
    ];
    return config;
  },

  // Production optimizations
  compress: true,
  poweredByHeader: false,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // TypeScript strict mode
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint during builds
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
