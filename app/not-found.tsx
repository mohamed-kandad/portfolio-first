import Link from "next/link";
import { site } from "@/content/site";
export default function NotFound() {
  return (
    <main id="main" className="wrap not-found">
      <span className="eyebrow">{site.notFound.eyebrow}</span>
      <div className="error-number">
        4<span>✳</span>4
      </div>
      <h1>{site.notFound.heading}</h1>
      <p>{site.notFound.text}</p>
      <Link className="button button-primary" href="/">
        {site.notFound.cta} ↗
      </Link>
    </main>
  );
}
