/** @type {import('next').NextConfig} */

// Served from a GitHub Pages project site: https://viviannchiang.github.io/unbox-your-vibe
// Override with NEXT_PUBLIC_BASE_PATH="" to test at the root locally.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/unbox-your-vibe";

const nextConfig = {
  output: "export", // emit a fully static site into ./out
  basePath,
  trailingSlash: true, // each route becomes a folder/index.html — reliable on GitHub Pages
  images: {
    unoptimized: true, // no server-side image optimizer in a static export
  },
};

export default nextConfig;
