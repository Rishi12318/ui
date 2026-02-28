import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.shutterstock.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "assets-news.housing.com" },
      { protocol: "https", hostname: "img.jagranjosh.com" },
      { protocol: "https", hostname: "cdn.finshots.app" },
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "akm-img-a-in.tosshub.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.constructionspecifier.com" },
      { protocol: "https", hostname: "media.istockphoto.com" },
      { protocol: "https", hostname: "thumbs.dreamstime.com" },
    ],
  },
};

export default nextConfig;
