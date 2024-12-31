import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiUrl: "https://dummyjson.com",
  },
};

export default nextConfig;
