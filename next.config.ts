import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => [
    {
      source: "/",
      destination: "/resumes",
      statusCode: 302,
    },
  ],
};

export default nextConfig;
