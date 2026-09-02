import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectBySlug, projectSlugs, projects } from "@/lib/projects-data";
import { RoomIntro } from "@/components/room/RoomIntro";
import { StudioOutro } from "@/components/room/StudioOutro";
import { GlowRoom } from "@/components/room/GlowRoom";
import { CareRoom } from "@/components/room/CareRoom";
import { LamiRoom } from "@/components/room/LamiRoom";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
    openGraph: { title: `${project.name} — izzylabs`, description: project.description },
  };
}

export default async function ProductPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const i = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <div data-room={project.slug}>
      <RoomIntro project={project} />
      {project.slug === "glow" ? <GlowRoom /> : null}
      {project.slug === "carenearby" ? <CareRoom /> : null}
      {project.slug === "lami-nepal" ? <LamiRoom /> : null}
      <StudioOutro project={project} prev={prev} next={next} />
    </div>
  );
}
