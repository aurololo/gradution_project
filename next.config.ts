import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Ensure images work properly
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
  // Handle environment variables gracefully
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
};

export default nextConfig;
