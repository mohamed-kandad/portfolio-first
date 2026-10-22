"use client";
import { useEffect, useRef } from "react";
import { hero } from "@/content/hero";
export function IntroLoader() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.hidden = true;
      return;
    }
    const timer = setTimeout(() => {
      root.hidden = true;
    }, 1900);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div ref={ref} className="intro-loader" aria-hidden="true">
      <div className="loader-mask">
        <span>{hero.name}</span>
      </div>
      <div className="loader-progress" />
    </div>
  );
}
