import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projectSlugs } from "@/lib/projects-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...projectSlugs.map((slug) => ({
      url: `${site.url}/work/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
