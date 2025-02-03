/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "uzhvtfbyhflpnwjgbljl.supabase.co",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
