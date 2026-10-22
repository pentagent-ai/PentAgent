import type { MetadataRoute } from "next";
import { flatPublished } from "@/lib/docs/nav";
import { siteConfig } from "@/lib/site";

const routes: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/pilot", priority: 0.8 },
  { path: "/docs", priority: 0.7 },
  ...flatPublished().map((item) => ({
    path: item.href,
    priority: item.href.startsWith("/docs/getting-started") ? 0.7 : 0.5,
  })),
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
