import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**', 
      }
    ]
  },
  env: {
    apiLink: process.env.apiLink,
    NEXT_PUBLIC_API_LINK: process.env.NEXT_PUBLIC_API_LINK
  }


};

export default nextConfig;
