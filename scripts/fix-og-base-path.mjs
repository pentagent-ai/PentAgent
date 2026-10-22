// Next.js prefixes file-based metadata images (opengraph-image, icons) with basePath,
// and metadataBase already carries the same sub-path, so the absolute OG/Twitter image
// URL comes out as .../PentAgent/PentAgent/opengraph-image.png. Collapse the duplicate.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "/PentAgent";
if (!base) process.exit(0);
const doubled = `${base}${base}/`;
let fixed = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(html|txt)$/.test(name)) {
      const text = readFileSync(path, "utf8");
      if (text.includes(doubled)) {
        writeFileSync(path, text.split(doubled).join(`${base}/`));
        fixed += 1;
      }
    }
  }
}

walk("out");
console.log(`fix-og-base-path: fixed ${fixed} file(s)`);
