import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: { bodySizeLimit: "4mb" },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fmbsaxtpoehorxoh.public.blob.vercel-storage.com",
      },
    ],
  },
  /* config options here */
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/resumes",
        statusCode: 307,
      },
    ];
  },
};

export default nextConfig;
