// Prefix for files in /public when the site is served from a sub-path (GitHub Pages).
// next/link and next/navigation add the base path themselves; plain <img>, next/image
// with a string src, and fetch() do not.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string): string {
  return `${basePath}${path}`;
}
