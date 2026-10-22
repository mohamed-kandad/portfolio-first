import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, Smartphone } from "lucide-react";
import { getDictionary, isLocale } from "@/content/locales";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HeroPortrait } from "@/components/portfolio/hero-portrait";
import { IntroLoader } from "@/components/portfolio/loader";
import { ProjectVisual } from "@/components/portfolio/project-visual";
import {
  MagneticLink,
  LocalTime,
  SocialLinks,
  CvLink,
  SkillExplorer,
  CopyEmail,
} from "@/components/portfolio/interactions";
import { ContactForm } from "@/components/portfolio/contact-form";
import { ConfirmTag } from "@/components/portfolio/confirm-tag";
import { SiteEffects } from "@/components/portfolio/effects";
import { Footer } from "@/components/portfolio/footer";
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = await getDictionary(lang);
  return {
    title: { absolute: d.site.title },
    description: d.site.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", fr: "/fr", ar: "/ar", "x-default": "/en" },
    },
    openGraph: {
      title: d.site.title,
      description: d.site.description,
      locale: lang,
    },
  };
}
export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = await getDictionary(lang);
  const {
    hero,
    mobileSection,
    about,
    projects,
    work,
    career,
    experience,
    education,
    languages,
    skillContent,
    contact,
    site,
  } = d;
  const configured = Boolean(
    process.env.RESEND_API_KEY &&
    process.env.CONTACT_FROM &&
    process.env.CONTACT_TO,
  );
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={hero.portrait.src}
        fetchPriority="high"
      />
      <IntroLoader locale={lang} />
      <main id="main">
        <section id="home" className="hero">
          <HeroPortrait hero={hero} />
          <div className="wrap hero-wrap">
            <h1>
              {hero.headline.map((line, i) => (
                <span className={`hero-line line-${i}`} key={line}>
                  <span>{line}</span>
                </span>
              ))}
            </h1>
            <div className="hero-details">
              <div className="hero-chips">
                {hero.chips.map((chip, i) => (
                  <span className={i === 0 ? "featured" : ""} key={chip}>
                    {chip}
                  </span>
                ))}
              </div>
              <p className="hero-intro">
                <strong>{hero.greeting}</strong> — {hero.intro}
              </p>
              <div className="hero-buttons">
                <MagneticLink label={hero.workCta} />
                <CvLink contact={contact} confirm={site.confirm} />
              </div>
              <SocialLinks contact={contact} />
              <div className="availability">
                <span className="status-dot" />
                <span>{hero.availability}</span>
                <LocalTime locale={lang} label={d.ui.clock} />
              </div>
            </div>
            <a className="scroll-indicator" href="#native">
              <span />
              {hero.scroll}
              <ArrowDown size={13} />
            </a>
          </div>
        </section>
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy}>
                {hero.marquee.map((item) => (
                  <span key={item}>
                    {item}
                    <i>✦</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <section id="native" className="native-section">
          <div className="wrap section">
            <div className="native-heading" data-reveal>
              <div className="eyebrow">
                <Smartphone size={15} />
                {mobileSection.eyebrow}
              </div>
              <h2>
                {mobileSection.heading[0]}
                <br />
                <span>{mobileSection.heading[1]}</span>
              </h2>
            </div>
            <div className="native-grid">
              {mobileSection.items.map((item, i) => (
                <article key={item.title}>
                  <span className="item-number">0{i + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="about" className="wrap section about-section">
          <div className="eyebrow" data-reveal>
            {about.eyebrow}
          </div>
          <h2 data-reveal>
            {about.headline[0]}
            <br />
            <span>{about.headline[1]}</span>
          </h2>
          <div className="about-grid">
            <div className="about-copy" data-reveal>
              {about.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
            <figure className="about-portrait" data-reveal>
              <Image
                src={hero.portrait.src}
                alt={hero.portrait.alt}
                width={hero.portrait.width}
                height={hero.portrait.height}
                sizes="(max-width: 860px) 90vw, 40vw"
              />
              <figcaption>{about.caption}</figcaption>
            </figure>
          </div>
          <div className="about-highlights">
            {about.highlights.map((item) => (
              <div key={item.value}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>
        <section id="work" className="wrap section work-section">
          <div className="section-heading" data-reveal>
            <div>
              <div className="eyebrow">{work.eyebrow}</div>
              <h2>{work.heading}</h2>
            </div>
            <p>{work.intro}</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article
                key={project.slug}
                className={`project-row project-${project.kind}`}
              >
                <div className="project-copy">
                  <span className="project-number">{project.number}</span>
                  <div className="project-category">{project.category}</div>
                  <h3>
                    <Link href={`/${lang}/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <p>{project.description}</p>
                  <div className="tech-tags">
                    {project.stack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <Link
                    className="case-link"
                    href={`/${lang}/projects/${project.slug}`}
                  >
                    {work.caseLink}
                    <ArrowUpRight size={17} />
                  </Link>
                  <div className="pending-tags">
                    {project.pending.map((item) => (
                      <ConfirmTag key={item} label={site.confirm}>
                        {item}
                      </ConfirmTag>
                    ))}
                  </div>
                </div>
                <Link
                  href={`/${lang}/projects/${project.slug}`}
                  className="project-preview"
                  aria-label={`${work.caseLink}: ${project.title}`}
                >
                  <ProjectVisual kind={project.kind} note={work.visualNote} />
                </Link>
              </article>
            ))}
          </div>
          <details className="other-work">
            <summary>
              {work.other}
              <span>+</span>
            </summary>
            <div>
              {experience.map((item) => (
                <div className="other-work-row" key={item.company}>
                  <h3>{item.company}</h3>
                  <p>{item.summary}</p>
                </div>
              ))}
            </div>
          </details>
        </section>
        <section id="experience" className="wrap section experience-section">
          <div className="eyebrow" data-reveal>
            {career.eyebrow}
          </div>
          <h2 data-reveal>{career.heading}</h2>
          <div className="timeline">
            <span className="timeline-track">
              <span className="timeline-progress" />
            </span>
            {experience.map((item) => (
              <article className="experience-item" key={item.company}>
                <div className="experience-company">
                  <span className="timeline-dot" />
                  <h3>{item.company}</h3>
                  <time>{item.dates}</time>
                </div>
                <div className="experience-description">
                  <h4>
                    {item.role}
                    <span> · {item.location}</span>
                  </h4>
                  <ul>
                    {item.responsibilities.map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className="education-languages">
            <div>
              <h3>{education.heading}</h3>
              {education.items.map((item) => (
                <div className="education-item" key={item.title}>
                  <h4>{item.title}</h4>
                  <p>
                    {item.school}
                    <span>{item.dates}</span>
                  </p>
                </div>
              ))}
            </div>
            <div>
              <h3>{languages.heading}</h3>
              {languages.items.map((item) => (
                <div className="language-item" key={item.name}>
                  <span>{item.name}</span>
                  <span>{item.level}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="skills" className="wrap section skills-section">
          <div className="eyebrow" data-reveal>
            {skillContent.eyebrow}
          </div>
          <h2 data-reveal>{skillContent.heading}</h2>
          <SkillExplorer
            key={lang}
            skills={d.skills}
            skillContent={skillContent}
            rtl={lang === "ar"}
          />
        </section>
        <section id="contact" className="contact-section">
          <div className="wrap section">
            <div className="eyebrow" data-reveal>
              {contact.eyebrow}
            </div>
            <h2 data-reveal>
              {contact.headline[0]}
              <br />
              <span>{contact.headline[1]}</span>
            </h2>
            <p className="contact-subtitle">{contact.subtitle}</p>
            <div className="contact-grid">
              <div>
                <CopyEmail contact={contact} />
                <div className="contact-actions">
                  <SocialLinks contact={contact} />
                  <CvLink contact={contact} confirm={site.confirm} />
                </div>
                <p className="contact-phone">
                  <a href={contact.phoneHref}>{contact.phone}</a>
                  <span> · {contact.location}</span>
                </p>
              </div>
              <ContactForm
                key={lang}
                configured={configured}
                contact={contact}
                locale={lang}
                validation={d.ui.validation}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer contact={contact} />
      <SiteEffects />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: site.name,
            jobTitle: "Full-Stack & React Native Developer",
            url: site.url,
            email: contact.email,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Casablanca",
              addressCountry: "MA",
            },
            sameAs: [contact.github, contact.linkedin],
            knowsAbout: [
              "React Native",
              "Next.js",
              "Node.js",
              "TypeScript",
              "MongoDB",
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
