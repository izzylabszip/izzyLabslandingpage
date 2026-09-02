import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectBySlug, projectSlugs, projects } from "@/lib/projects-data";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductStory } from "@/components/product/ProductStory";
import { ProductNav } from "@/components/product/ProductNav";
import { GlowConsole } from "@/components/product/GlowConsole";
import { CareCalm } from "@/components/product/CareCalm";
import { LamiEditorial } from "@/components/product/LamiEditorial";

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
    openGraph: {
      title: `${project.name} — izzylabs`,
      description: project.description,
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

  return (
    <div data-product={project.slug} className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,var(--accent-soft),transparent_70%)]"
      />
      <ProductHeader project={project} />
      {project.theme.mood === "console" ? <GlowConsole project={project} /> : null}
      {project.theme.mood === "calm" ? <CareCalm project={project} /> : null}
      {project.theme.mood === "editorial" ? <LamiEditorial project={project} /> : null}
      <ProductStory project={project} />
      <ProductNav prev={prev} next={next} />
    </div>
  );
}
