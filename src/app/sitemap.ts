import type { MetadataRoute } from "next";
import { getAllPostPairs } from "@/data/blog";
import { projectsData } from "@/data/projects";

const BASE = "https://www.bertugtas.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pairs = getAllPostPairs();

  const postEntries: MetadataRoute.Sitemap = pairs.map((pair) => ({
    url: `${BASE}/blog/${pair.slug}`,
    lastModified: new Date(pair.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `${BASE}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...postEntries,
    ...projectEntries,
  ];
}
