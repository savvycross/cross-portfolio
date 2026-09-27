import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { visibleProjects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...visibleProjects.map((p) => ({ url: `${site.url}/work/${p.slug}`, priority: 0.8 })),
  ];
}
