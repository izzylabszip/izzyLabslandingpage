"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects-data";
import { cn } from "@/lib/cn";
import { StatusPill } from "./StatusPill";

type Props = { project: Project; featured?: boolean };

/**
 * Specimen card. The preview pane is painted in the product's real surface and
 * accent, so the three products read as three different things at a glance.
 */
export function ProjectCard({ project, featured = false }: Props) {
  const live = project.links.find((l) => l.primary) ?? project.links[0];
  const [surface, accent, third] = project.theme.swatches;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={cn(
        "group panel relative flex flex-col overflow-hidden transition-colors duration-300",
        featured && "lg:col-span-2 lg:grid lg:grid-cols-2",
      )}
      style={{ borderColor: undefined }}
    >
      {/* Product-coloured preview */}
      <div className={cn("relative p-3", featured && "lg:p-4 lg:pr-0")}>
        <div
          className={cn(
            "relative flex flex-col justify-between overflow-hidden rounded-[6px] p-6",
            featured ? "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]" : "aspect-[4/3]",
          )}
          style={{ background: surface.hex }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 60% 60% at 80% 10%, ${accent.hex}33, transparent 70%)`,
            }}
          />
          <p
            className="relative font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: accent.hex }}
          >
            {project.theme.surface}
          </p>
          <div className="relative">
            <p
              className="text-2xl font-bold leading-[1.05] tracking-[-0.03em] md:text-3xl"
              /* Three rooms are light and want dark ink; Amit Blends' shopfront
                 is dark and wants cream. The card reads it off the theme rather
                 than growing another slug check. */
              style={{ color: project.theme.previewInk ?? "#1D1D1F" }}
            >
              {project.tagline}
            </p>
            <div className="mt-5 flex gap-1.5">
              {project.theme.swatches.map((s) => (
                <span
                  key={s.hex}
                  className="h-6 w-6 rounded-full ring-1 ring-black/10"
                  style={{ background: s.hex }}
                  title={`${s.name} ${s.hex}`}
                />
              ))}
            </div>
          </div>
          <span
            aria-hidden
            className="absolute bottom-0 left-0 h-1 w-full"
            style={{ background: `linear-gradient(to right, ${accent.hex}, ${third.hex})` }}
          />
        </div>
        <StatusPill
          status={project.status}
          label={project.statusLabel}
          className="absolute right-6 top-6"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="label flex items-center gap-3 text-muted">
          <span className="text-accent">Specimen_{project.index}</span>
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
                <p className="label text-accent">{a.label}</p>
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
            className="label inline-flex shrink-0 items-center gap-2 text-fg transition-colors group-hover:text-accent"
          >
            Enter the room <span aria-hidden>→</span>
          </Link>
          <a
            href={live.href}
            target="_blank"
            rel="noreferrer"
            className="label inline-flex min-w-0 max-w-full items-center gap-1.5 text-muted transition-colors hover:text-accent"
          >
            <span className="truncate">{live.label}</span> <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
