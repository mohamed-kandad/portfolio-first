import { profile, projects } from "@/content/portfolio";
export default function sitemap() {
  return [
    { url: profile.siteUrl, changeFrequency: "monthly" as const, priority: 1 },
    ...projects.map((p) => ({
      url: `${profile.siteUrl}/projects/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
