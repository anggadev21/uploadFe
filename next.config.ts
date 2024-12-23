import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
		BASE_URL: process.env.base_url,
	},
};

export default nextConfig;
