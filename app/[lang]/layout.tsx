import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  DM_Sans,
  Noto_Sans_Arabic,
} from "next/font/google";
import "../globals.css";
import { site } from "@/content/site";
import { getDictionary, isLocale, locales } from "@/content/locales";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/portfolio/navigation";
const heading = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "800"],
  variable: "--font-heading",
  display: "swap",
});
const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s · Mohamed Kandad" },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    images: ["/og.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg" },
};
const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "800"],
  variable: "--font-arabic",
  display: "swap",
});
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = await getDictionary(lang);
  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      data-scroll-behavior="smooth"
      className={`${heading.variable} ${body.variable} ${arabic.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          {d.ui.skip}
        </a>
        <Navigation
          key={lang}
          locale={lang}
          site={d.site}
          contact={d.contact}
          ui={d.ui}
        />
        {children}
      </body>
    </html>
  );
}
