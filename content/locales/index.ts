import { site } from "../site";
import { hero, mobileSection } from "../hero";
import { about } from "../about";
import { projects, work, caseCopy } from "../projects";
import { career, experience } from "../experience";
import { education, languages } from "../education";
import { skills, skillContent } from "../skills";
import { contact } from "../contact";
export const locales = ["en", "fr", "ar"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale =>
  locales.some((locale) => locale === value);
export const en = {
  site,
  hero,
  mobileSection,
  about,
  projects,
  work,
  caseCopy,
  career,
  experience,
  education,
  languages,
  skills: skills as Record<string, string[]>,
  skillContent,
  contact,
  ui: {
    skip: "Skip to content",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    language: "Language",
    clock: "Casablanca local time",
    validation: {
      name: "Please enter at least 2 characters.",
      email: "Please enter a valid email address.",
      message: "Please write at least 20 characters.",
    },
  },
};
export type Dictionary = typeof en;
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  if (locale === "fr") return (await import("./fr")).fr;
  if (locale === "ar") return (await import("./ar")).ar;
  return en;
}
