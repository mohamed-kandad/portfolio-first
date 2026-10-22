"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDown, Check, Copy, Download } from "lucide-react";
import { site } from "@/content/site";
import type { Dictionary, Locale } from "@/content/locales";

export function LocalTime({
  locale = "en",
  label = "Casablanca local time",
}: {
  locale?: Locale;
  label?: string;
}) {
  const [time, setTime] = useState("—:—");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat(
          locale === "ar" ? "ar-MA" : locale === "fr" ? "fr-FR" : "en-GB",
          {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: site.timezone,
          },
        ).format(new Date()),
      );
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, [locale]);
  return (
    <time className="local-time" aria-label={`${label} ${time}`}>
      {time} <span>MA</span>
    </time>
  );
}
export function MagneticLink({ label }: { label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <a
      ref={ref}
      className="button button-primary magnetic"
      href="#work"
      onPointerMove={(e) => {
        if (
          !ref.current ||
          !window.matchMedia(
            "(pointer: fine) and (prefers-reduced-motion: no-preference)",
          ).matches
        )
          return;
        const r = ref.current.getBoundingClientRect();
        ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.1}px,${(e.clientY - r.top - r.height / 2) * 0.12}px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {label}
      <ArrowDown size={17} />
    </a>
  );
}
export function SocialLinks({ contact }: { contact: Dictionary["contact"] }) {
  return (
    <div className="social-links">
      <a href={contact.github} target="_blank" rel="noopener noreferrer">
        {contact.socialLabels.github}
        <ArrowUpRight size={14} />
      </a>
      <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
        {contact.socialLabels.linkedin}
        <ArrowUpRight size={14} />
      </a>
    </div>
  );
}
export function CvLink({
  contact,
  confirm,
}: {
  contact: Dictionary["contact"];
  confirm: string;
}) {
  return contact.cv ? (
    <a className="button button-secondary" href={contact.cv} download>
      {contact.cvLabel}
      <Download size={16} />
    </a>
  ) : (
    <span className="cv-unavailable">
      <span className="button button-secondary" aria-disabled="true">
        {contact.cvLabel}
        <Download size={16} />
      </span>
      <small className="confirm-tag">{confirm}</small>
    </span>
  );
}
export function SkillExplorer({
  skills,
  skillContent,
  rtl = false,
}: {
  skills: Record<string, string[]>;
  skillContent: Dictionary["skillContent"];
  rtl?: boolean;
}) {
  const [selected, setSelected] = useState<string>(Object.keys(skills)[0]);
  const keys = Object.keys(skills) as (keyof typeof skills)[];
  return (
    <div className="skill-explorer">
      <div
        role="tablist"
        aria-label={skillContent.heading}
        className="skill-tabs"
      >
        {keys.map((key, i) => (
          <button
            key={key}
            id={`tab-${i}`}
            role="tab"
            aria-selected={selected === key}
            aria-controls={`skill-panel-${i}`}
            tabIndex={selected === key ? 0 : -1}
            onClick={() => setSelected(key)}
            onKeyDown={(e) => {
              let next = i;
              if (e.key === "ArrowRight")
                next = (i + (rtl ? -1 : 1) + keys.length) % keys.length;
              else if (e.key === "ArrowLeft")
                next = (i + (rtl ? 1 : -1) + keys.length) % keys.length;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = keys.length - 1;
              else return;
              e.preventDefault();
              setSelected(keys[next]);
              document.getElementById(`tab-${next}`)?.focus();
            }}
          >
            {key}
          </button>
        ))}
      </div>
      <div
        key={selected}
        role="tabpanel"
        className="skill-panel"
        id={`skill-panel-${keys.indexOf(selected)}`}
        aria-labelledby={`tab-${keys.indexOf(selected)}`}
        tabIndex={0}
      >
        {skills[selected].map((skill) => (
          <span className="skill-pill" key={skill}>
            {skill}
          </span>
        ))}
      </div>
      <div className="learning-row">
        <span>{skillContent.learningLabel}</span>
        {skillContent.learning.map((skill) => (
          <span key={skill} className="learning-pill">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
export function CopyEmail({ contact }: { contact: Dictionary["contact"] }) {
  const [copied, setCopied] = useState(false),
    [error, setError] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  return (
    <div className="email-block">
      <div className="email-line">
        <a dir="ltr" href={`mailto:${contact.email}`}>
          {contact.email}
          <ArrowUpRight size={22} />
        </a>
        <button
          className="copy-email"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(contact.email);
              setCopied(true);
              timer.current = setTimeout(() => setCopied(false), 2500);
            } catch {
              setError(contact.copyError);
            }
          }}
          aria-label={copied ? contact.copiedLabel : contact.copyLabel}
        >
          {copied ? <Check size={17} /> : <Copy size={17} />}
        </button>
      </div>
      <span className="copy-status" role="status">
        {copied ? contact.copiedLabel : error}
      </span>
    </div>
  );
}
