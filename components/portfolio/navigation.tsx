"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { site } from "@/content/site";
import { contact } from "@/content/contact";
export function Navigation() {
  const [open, setOpen] = useState(false),
    [scrolled, setScrolled] = useState(false),
    [active, setActive] = useState("home");
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 20);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
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
          href="/#home"
          className="monogram"
          aria-label={`${site.name} home`}
        >
          {site.monogram}
          <span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {site.nav.map((item) => (
            <Link
              key={item}
              href={`/#${item.toLowerCase()}`}
              className={active === item.toLowerCase() ? "active" : ""}
              aria-current={
                active === item.toLowerCase() ? "location" : undefined
              }
            >
              {item}
            </Link>
          ))}
          <a href={contact.cv} className="nav-resume" download>
            {contact.cvLabel}
            <Download size={15} />
          </a>
        </nav>
        <div className="nav-actions">
          <Link className="nav-cta" href="/#contact">
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
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {site.nav.map((item, i) => (
            <Link
              key={item}
              href={`/#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
            >
              <small>0{i + 1}</small>
              {item}
              <ArrowUpRight />
            </Link>
          ))}
          <a
            href={contact.cv}
            className="nav-resume"
            download
            onClick={() => setOpen(false)}
          >
            {contact.cvLabel}
            <Download size={18} />
          </a>
        </nav>
      )}
    </header>
  );
}
