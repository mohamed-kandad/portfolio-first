"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import type { Dictionary, Locale } from "@/content/locales";
const ids = ["home", "about", "work", "experience", "skills", "contact"];
export function Navigation({
  locale,
  site,
  contact,
  ui,
}: {
  locale: Locale;
  site: Dictionary["site"];
  contact: Dictionary["contact"];
  ui: Dictionary["ui"];
}) {
  const [open, setOpen] = useState(false),
    [scrolled, setScrolled] = useState(false),
    [active, setActive] = useState("home");
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 20);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-15% 0px -65% 0px" },
    );
    const observe = () => {
      observer.disconnect();
      document
        .querySelectorAll("main section[id]")
        .forEach((el) => observer.observe(el));
    };
    observe();
    window.addEventListener("portfolio:ready", observe);
    const keyboard = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", keyboard);
    return () => {
      window.removeEventListener("scroll", scroll);
      observer.disconnect();
      window.removeEventListener("portfolio:ready", observe);
      window.removeEventListener("keydown", keyboard);
    };
  }, []);
  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <Link
          href={`/${locale}#home`}
          className="monogram"
          aria-label={site.name}
        >
          {site.monogram}
          <span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label={ui.mainNav}>
          {site.nav.map((label, i) => (
            <Link
              key={ids[i]}
              href={`/${locale}#${ids[i]}`}
              className={active === ids[i] ? "active" : ""}
              aria-current={active === ids[i] ? "location" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <select
            className="language-select"
            aria-label={ui.language}
            value={locale}
            onChange={(e) => {
              const suffix = pathname.replace(/^\/(en|fr|ar)(?=\/|$)/, "");
              router.push(`/${e.target.value}${suffix}${window.location.hash}`);
            }}
          >
            <option value="en" lang="en">
              EN
            </option>
            <option value="fr" lang="fr">
              FR
            </option>
            <option value="ar" lang="ar">
              عربي
            </option>
          </select>
          <a
            href={contact.cv}
            className="nav-resume button button-secondary"
            download
            aria-label={contact.cvLabel}
          >
            <span>{locale === "ar" ? "السيرة" : "CV"}</span>
            <Download size={15} />
          </a>
          <Link className="nav-cta" href={`/${locale}#contact`}>
            {site.navCta}
            <ArrowUpRight size={16} />
          </Link>
          <button
            className="mobile-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? site.close : site.menu}
            <span>{open ? "−" : "+"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label={ui.mobileNav}>
          {site.nav.map((label, i) => (
            <Link
              key={ids[i]}
              href={`/${locale}#${ids[i]}`}
              onClick={() => setOpen(false)}
            >
              <small>0{i + 1}</small>
              {label}
              <ArrowUpRight />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
