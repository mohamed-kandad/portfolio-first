"use client";
import { useEffect } from "react";
export function SiteEffects() {
  useEffect(() => {
    window.dispatchEvent(new Event("portfolio:ready"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            reveal.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    if (!reduced.matches)
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        el.classList.add("will-reveal");
        reveal.observe(el);
      });
    const section = document.getElementById("experience"),
      line = document.querySelector<HTMLElement>(".timeline-progress");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!section || !line) return;
      const rect = section.getBoundingClientRect(),
        progress = Math.max(
          0,
          Math.min(
            1,
            (window.innerHeight * 0.7 - rect.top) /
              (rect.height - window.innerHeight * 0.25),
          ),
        );
      line.style.transform = `scaleY(${reduced.matches ? 1 : progress})`;
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    return () => {
      reveal.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      document
        .querySelectorAll(".will-reveal")
        .forEach((el) => el.classList.remove("will-reveal"));
    };
  }, []);
  return null;
}
