import Link from "next/link";
import type { Project } from "@/lib/projects-data";
import { ScanReveal } from "@/components/ScanReveal";
import { StatusPill } from "@/components/StatusPill";
import { cn } from "@/lib/cn";

/**
 * The corridor. A dark izzylabs strip that frames the room you are about to
 * enter, so switching products still reads as one studio's site.
 */
export function RoomIntro({ project }: { project: Project }) {
  return (
    <header className="relative overflow-hidden border-b border-hairline bg-bg">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div aria-hidden className="noise pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: `linear-gradient(to bottom, transparent, ${project.theme.swatches[0].hex}22)`,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <ScanReveal duration={0.4}>
          <div className="label flex flex-wrap items-center gap-x-4 gap-y-2 text-muted">
            <Link href="/#work" className="transition-colors hover:text-fg">
              izzylabs
            </Link>
            <span aria-hidden>{"//"}</span>
            <span className="text-accent">Specimen_{project.index}</span>
            <span aria-hidden>{"//"}</span>
            <span>Entering room</span>
          </div>
        </ScanReveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <ScanReveal delay={0.1} duration={0.7}>
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-4xl font-semibold tracking-[-0.03em] text-fg md:text-6xl">
                  {project.name}
                </h1>
                <StatusPill status={project.status} label={project.statusLabel} />
              </div>
            </ScanReveal>
            <ScanReveal delay={0.22}>
              <p className="mt-4 max-w-xl leading-relaxed text-muted">{project.description}</p>
            </ScanReveal>
            <ScanReveal delay={0.32}>
              <div className="mt-7 flex flex-wrap gap-3">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "label inline-flex items-center gap-2 rounded-panel px-4 py-3 transition-colors",
                      l.primary
                        ? "text-bg"
                        : "border border-hairline text-fg hover:border-accent hover:text-accent",
                    )}
                    style={l.primary ? { background: project.theme.accent } : undefined}
                  >
                    {l.label} <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            </ScanReveal>
          </div>

          <div className="lg:col-span-5">
            <ScanReveal delay={0.42}>
              <div className="panel p-5">
                <p className="label text-muted">Room palette</p>
                <div className="mt-4 flex gap-2">
                  {project.theme.swatches.map((s) => (
                    <div key={s.hex} className="flex-1">
                      <div
                        className="h-12 rounded-md border border-hairline"
                        style={{ background: s.hex }}
                      />
                      <p className="label mt-2 truncate text-muted">{s.name}</p>
                    </div>
                  ))}
                </div>
                <dl className="mt-5 space-y-2.5 border-t border-hairline pt-4 font-mono text-[11px] uppercase tracking-[0.14em]">
                  {project.meta.map((m) => (
                    <div key={m.label} className="flex gap-3">
                      <dt className="w-20 shrink-0 text-muted">{m.label}</dt>
                      <dd className="min-w-0 text-fg/90">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </ScanReveal>
          </div>
        </div>
      </div>
    </header>
  );
}
