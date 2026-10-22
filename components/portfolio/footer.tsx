import { contact } from "@/content/contact";
export function Footer() {
  return (
    <footer className="footer wrap">
      <span>{contact.footer}</span>
      <span>{contact.location}</span>
    </footer>
  );
}
