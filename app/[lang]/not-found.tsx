"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { notFoundCopy } from "@/content/not-found";
export default function NotFound() {
  const params = useParams();
  const lang = params.lang === "fr" ? "fr" : params.lang === "ar" ? "ar" : "en";
  const copy = notFoundCopy[lang];
  return (
    <main id="main" className="wrap not-found">
      <div className="error-number">
        4<span>✳</span>4
      </div>
      <h1>{copy.heading}</h1>
      <p>{copy.text}</p>
      <Link className="button button-primary" href={`/${lang}`}>
        {copy.cta} ↗
      </Link>
    </main>
  );
}
