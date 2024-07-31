/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        // pathname: "/taskify/**",
      },
    ],
  },
};

export default nextConfig;
