import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projectSlugs } from "@/lib/projects-data";
import { serviceSlugs } from "@/lib/services-data";

/**
 * No `lastModified`.
 *
 * It used to be `new Date()` on every entry, evaluated at build time — which
 * told Google that every page on the site changed every time anything
 * deployed, including a CSS tweak. That is not a small inaccuracy: the fastest
 * way to make a crawler ignore lastmod permanently is to send it a fresh one
 * for pages that did not change.
 *
 * There is no per-page modification date to read here — the content is TypeScript
 * modules, not dated files — so the honest answer is to omit the field. Google
 * treats a missing lastmod as "no signal", which is exactly right, and much
 * better than a confident wrong one.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/services`, changeFrequency: "monthly", priority: 0.9 },
    ...serviceSlugs.map((slug) => ({
      url: `${site.url}/services/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projectSlugs.map((slug) => ({
      url: `${site.url}/work/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
