import type { Dictionary } from "@/content/locales";
export function Footer({ contact }: { contact: Dictionary["contact"] }) {
  return (
    <footer className="footer wrap">
      <span>{contact.footer}</span>
      <span>{contact.location}</span>
    </footer>
  );
}
