import type { MetadataRoute } from "next";
import { crawlerAgents, privatePaths } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: crawlerAgents.map((userAgent) => ({
      userAgent,
      allow: "/",
      disallow: [...privatePaths],
    })),
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
