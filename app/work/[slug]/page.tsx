import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectBySlug, projectSlugs, projects } from "@/lib/projects-data";
import { graph, creativeWork, breadcrumbs, ldJson } from "@/lib/schema";
import { site } from "@/lib/site";
import { RoomIntro } from "@/components/room/RoomIntro";
import { StudioOutro } from "@/components/room/StudioOutro";
import { GlowRoom } from "@/components/room/GlowRoom";
import { CareRoom } from "@/components/room/CareRoom";
import { LamiRoom } from "@/components/room/LamiRoom";
import { AmitRoom } from "@/components/room/AmitRoom";
import { CaseStudy } from "@/components/room/CaseStudy";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  const url = `${site.url}/work/${project.slug}`;
  return {
    /* The product name alone ranks for nothing and tells a searcher nothing.
       searchTitle carries the stack and the place, and is kept short enough
       that the layout template's " — izzylabs" suffix still fits in the ~60
       characters a result actually renders. */
    title: `${project.name} — ${project.searchTitle}`,
    description: project.metaDescription ?? project.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.name} — ${site.name}`,
      description: project.metaDescription ?? project.description,
      url,
      type: "article",
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const i = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  const jsonLd = graph(
    creativeWork(project),
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Work", path: "/#work" },
      { name: project.name, path: `/work/${project.slug}` },
    ]),
  );

  return (
    <div data-room={project.slug}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }}
      />
      <RoomIntro project={project} />
      {project.slug === "glow" ? <GlowRoom /> : null}
      {project.slug === "carenearby" ? <CareRoom /> : null}
      {project.slug === "lami-nepal" ? <LamiRoom /> : null}
      {project.slug === "amit-blends" ? <AmitRoom /> : null}
      <CaseStudy project={project} />
      <StudioOutro project={project} prev={prev} next={next} />
    </div>
  );
}
