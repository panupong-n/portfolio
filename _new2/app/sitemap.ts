import type { MetadataRoute } from "next";
import { locales } from "@/lib/content";
import { site } from "@/lib/profile";
import { projectMeta } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const alt = (path: string) => ({ languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])) });
  return locales.flatMap((l) => [
    { url: `${site.url}/${l}`, changeFrequency: "monthly" as const, priority: 1, alternates: alt("") },
    ...projectMeta.map((p) => ({
      url: `${site.url}/${l}/work/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: alt(`/work/${p.slug}`),
    })),
  ]);
}
