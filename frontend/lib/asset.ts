// Prefix a public asset path with the deployment basePath.
//
// next/image does NOT automatically prepend `basePath` to the `src` of a
// static export, so any image served from /public must go through this helper
// to resolve correctly under https://viviannchiang.github.io/unbox-your-vibe.
//
// Must stay in sync with `basePath` in next.config.mjs.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/unbox-your-vibe";

export function withBase(path: string): string {
  if (!path.startsWith("/")) return path; // leave absolute URLs/relative paths alone
  return `${BASE_PATH}${path}`;
}
