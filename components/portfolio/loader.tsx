"use client";
import { useEffect, useRef } from "react";
import { loaderCopy } from "@/content/loader";
import type { Locale } from "@/content/locales";
export function IntroLoader({ locale = "en" }: { locale?: Locale }) {
  const root = useRef<HTMLDivElement>(null),
    count = useRef<HTMLSpanElement>(null),
    phase = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      el.hidden = true;
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 1300);
      el.style.setProperty("--scan", String(progress));
      if (count.current)
        count.current.textContent = String(Math.round(progress * 100)).padStart(
          3,
          "0",
        );
      if (phase.current)
        phase.current.textContent =
          loaderCopy[locale].phases[Math.min(2, Math.floor(progress * 3))];
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const timer = setTimeout(() => {
      el.hidden = true;
    }, 1900);
    const skip = () => {
      if (reduce.matches) {
        el.hidden = true;
        cancelAnimationFrame(frame);
      }
    };
    reduce.addEventListener("change", skip);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      reduce.removeEventListener("change", skip);
    };
  }, [locale]);
  const copy = loaderCopy[locale];
  return (
    <div className="creative-loader" ref={root} aria-hidden="true">
      <div className="loader-shutter shutter-start" />
      <div className="loader-shutter shutter-end" />
      <div className="loader-stage">
        <div className="loader-top">
          <span className="loader-live-dot" />
          <span>{copy.eyebrow}</span>
          <span className="loader-edition">MK — 001</span>
        </div>
        <div className="loader-frame">
          <i />
          <i />
          <i />
          <i />
          <div className="loader-orbit" />
          <div className="loader-word" dir="ltr">
            <span>MK</span>
            <span>MK</span>
            <b>.</b>
          </div>
          <div className="loader-scanline" />
          <span className="loader-coordinate" dir="ltr">
            33.57° N / 7.59° W
          </span>
          <span className="loader-frame-caption">{copy.caption}</span>
        </div>
        <div className="loader-bottom">
          <div>
            <span className="loader-phase-number" dir="ltr">
              [ <span ref={count}>000</span> ]
            </span>
            <span className="loader-phase" ref={phase}>
              {copy.phases[0]}
            </span>
          </div>
          <span className="loader-code" dir="ltr">
            {"idea → code → experience"}
          </span>
        </div>
        <div className="loader-meter">
          <span />
        </div>
        <span className="loader-credit">{copy.footer}</span>
      </div>
    </div>
  );
}
