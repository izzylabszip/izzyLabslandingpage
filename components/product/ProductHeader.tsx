import Link from "next/link";
import type { Project } from "@/lib/projects-data";
import { ScanReveal } from "@/components/ScanReveal";
import { StatusPill } from "@/components/StatusPill";
import { cn } from "@/lib/cn";

export function ProductHeader({ project }: { project: Project }) {
  return (
    <header className="relative border-b border-hairline">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-16">
        <ScanReveal duration={0.4}>
          <div className="label flex flex-wrap items-center gap-x-4 gap-y-2 text-muted">
            <Link href="/#work" className="transition-colors hover:text-fg">
              Work
            </Link>
            <span aria-hidden>{"//"}</span>
            <span className="text-accent-bright">Specimen_{project.index}</span>
            <span aria-hidden>{"//"}</span>
            <span>{project.theme.mood} room</span>
          </div>
        </ScanReveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <ScanReveal delay={0.1} duration={0.8}>
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-5xl font-semibold tracking-[-0.03em] md:text-7xl">
                  {project.name}
                </h1>
                <StatusPill status={project.status} label={project.statusLabel} />
              </div>
            </ScanReveal>
            <ScanReveal delay={0.25}>
              <p className="mt-5 text-2xl font-medium tracking-tight text-accent-bright md:text-3xl">
                {project.tagline}
              </p>
            </ScanReveal>
            <ScanReveal delay={0.35}>
              <p className="mt-5 max-w-2xl leading-relaxed text-muted md:text-lg">
                {project.description}
              </p>
            </ScanReveal>
            <ScanReveal delay={0.45}>
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "label inline-flex items-center gap-2 rounded-panel px-5 py-3.5 transition-[filter,color,border-color]",
                      l.primary
                        ? "bg-accent text-bg hover:brightness-110"
                        : "border border-hairline text-fg hover:border-accent hover:text-accent-bright",
                    )}
                  >
                    {l.primary ? "Open live product" : l.label} <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
              {project.links[0]?.primary ? (
                <p className="label mt-3 text-muted">{project.links[0].label}</p>
              ) : null}
            </ScanReveal>
          </div>

          <div className="lg:col-span-4">
            <ScanReveal delay={0.5}>
              <dl className="panel divide-y divide-hairline font-mono text-[11px] uppercase tracking-[0.14em]">
                {project.meta.map((m) => (
                  <div key={m.label} className="flex items-start justify-between gap-4 px-5 py-3.5">
                    <dt className="text-muted">{m.label}</dt>
                    <dd className="text-right text-fg">{m.value}</dd>
                  </div>
                ))}
                <div className="flex items-start justify-between gap-4 px-5 py-3.5">
                  <dt className="text-muted">Role</dt>
                  <dd className="text-right text-fg">{project.role}</dd>
                </div>
              </dl>
            </ScanReveal>
          </div>
        </div>
      </div>
    </header>
  );
}
