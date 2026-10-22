import { contact } from "./contact";
import { site } from "./site";
export const profile = {
  name: site.name,
  location: contact.location,
  timezone: site.timezone,
  available: true,
  email: contact.email,
  github: contact.github,
  linkedin: contact.linkedin,
  cv: contact.cv,
  siteUrl: site.url,
};
export { projects, type Project } from "./projects";
export { skills } from "./skills";
export { experience } from "./experience";
