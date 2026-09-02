"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects-data";
import { cn } from "@/lib/cn";
import { ScanImage } from "./ScanImage";
import { StatusPill } from "./StatusPill";

type Props = { project: Project; featured?: boolean };

/**
 * Specimen card. Carries its own `data-product` so the pill, meta and hover
 * border preview the product's palette while the shell around it stays teal.
 */
export function ProjectCard({ project, featured = false }: Props) {
  const live = project.links.find((l) => l.primary) ?? project.links[0];

  return (
    <motion.article
      data-product={project.slug}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={cn(
        "group panel relative flex flex-col overflow-hidden transition-colors duration-300 hover:border-accent-dim",
        featured && "lg:col-span-2 lg:grid lg:grid-cols-2",
      )}
    >
      <div className={cn("relative p-3", featured && "lg:p-4 lg:pr-0")}>
        <ScanImage
          src={project.images.cover}
          alt={`${project.name} interface`}
          aspect={featured ? "featured" : "card"}
          label={`${project.name} // cover`}
          className="rounded-[6px]"
          sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
        />
        <StatusPill
          status={project.status}
          label={project.statusLabel}
          className="absolute right-6 top-6"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="label flex items-center gap-3 text-muted">
          <span className="text-accent-bright">Specimen_{project.index}</span>
          <span aria-hidden>{"//"}</span>
          <span>{project.theme.mood}</span>
        </div>

        <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">{project.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted md:text-[15px]">
          {project.description}
        </p>

        {featured && project.audiences ? (
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-hairline pt-5">
            {project.audiences.map((a) => (
              <div key={a.label}>
                <p className="label text-accent-bright">{a.label}</p>
                <ul className="mt-3 space-y-1.5 text-[13px] leading-snug text-muted">
                  {a.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span aria-hidden className="text-accent">
                        ›
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}

        <dl className="mt-6 grid gap-2 border-t border-hairline pt-5 font-mono text-[11px] uppercase tracking-[0.14em]">
          {project.meta.map((m) => (
            <div key={m.label} className="flex gap-3">
              <dt className="w-24 shrink-0 text-muted">{m.label}</dt>
              <dd className="min-w-0 break-words text-fg/90">{m.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-7">
          <Link
            href={`/work/${project.slug}`}
            className="label inline-flex shrink-0 items-center gap-2 text-fg transition-colors group-hover:text-accent-bright"
          >
            View project <span aria-hidden>→</span>
          </Link>
          <a
            href={live.href}
            target="_blank"
            rel="noreferrer"
            className="label inline-flex min-w-0 max-w-full items-center gap-1.5 text-muted transition-colors hover:text-accent-bright"
          >
            <span className="truncate">{live.label}</span> <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
