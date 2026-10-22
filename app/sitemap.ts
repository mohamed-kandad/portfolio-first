import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { locales } from "@/content/locales";
export default function sitemap() {
  return locales.flatMap((lang) => [
    {
      url: `${site.url}/${lang}`,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: {
          en: `${site.url}/en`,
          fr: `${site.url}/fr`,
          ar: `${site.url}/ar`,
        },
      },
    },
    ...projects.map((p) => ({
      url: `${site.url}/${lang}/projects/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${site.url}/${l}/projects/${p.slug}`]),
        ),
      },
    })),
  ]);
}
