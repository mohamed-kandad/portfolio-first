import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects, caseCopy } from "@/content/projects";
import { ProjectVisual } from "@/components/portfolio/project-visual";
import { ConfirmTag } from "@/components/portfolio/confirm-tag";
import { Footer } from "@/components/portfolio/footer";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project?.title, description: project?.description };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params,
    project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <>
      <main id="main" className="case-page">
        <header className="wrap section case-header">
          <Link href="/#work" className="text-link">
            <ArrowLeft size={16} />
            {caseCopy.back}
          </Link>
          <div className="eyebrow">
            {project.number} / {project.category}
          </div>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <div className="tech-tags">
            {project.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </header>
        <div className="wrap case-visual">
          <ProjectVisual kind={project.kind} large />
          <p>{caseCopy.visualNote}</p>
        </div>
        {[
          { title: caseCopy.labels[0], text: project.overview },
          { title: caseCopy.labels[1], text: project.businessNeed },
          { title: caseCopy.labels[2], text: project.architecture },
        ].map((item, i) => (
          <section className="wrap section case-block" key={item.title}>
            <span className="eyebrow">
              0{i + 1} / {item.title}
            </span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </section>
        ))}
        <section className="wrap section case-block">
          <span className="eyebrow">04 / {caseCopy.labels[3]}</span>
          <div>
            <h2>{caseCopy.labels[3]}</h2>
            <ul className="case-features">
              {project.capabilities.map((feature) => (
                <li key={feature}>
                  {feature}
                  <ArrowUpRight size={16} />
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="wrap section case-block">
          <span className="eyebrow">05 / {caseCopy.labels[4]}</span>
          <div>
            <h2>{caseCopy.labels[4]}</h2>
            <ConfirmTag />
            <p>{project.challenges}</p>
          </div>
        </section>
        <section className="wrap section case-block">
          <span className="eyebrow">06 / {caseCopy.labels[5]}</span>
          <div>
            <h2>{caseCopy.labels[5]}</h2>
            <ConfirmTag />
            <p>{project.contribution}</p>
          </div>
        </section>
        {project.results && (
          <section className="wrap section case-block">
            <span className="eyebrow">07 / {caseCopy.labels[6]}</span>
            <div>
              <h2>{caseCopy.labels[6]}</h2>
              <p>{project.results}</p>
            </div>
          </section>
        )}
        <section className="wrap section case-pending">
          <span className="eyebrow">{caseCopy.pending}</span>
          <div className="pending-tags">
            {project.pending.map((item) => (
              <ConfirmTag key={item}>{item}</ConfirmTag>
            ))}
          </div>
        </section>
        <section className="wrap section next-project">
          <span className="eyebrow">{caseCopy.next}</span>
          <Link href={`/projects/${next.slug}`}>
            {next.title}
            <ArrowUpRight />
          </Link>
          <Link className="text-link" href="/#contact">
            {caseCopy.contact}
            <ArrowUpRight size={16} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
