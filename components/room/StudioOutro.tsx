import Link from "next/link";
import type { Project } from "@/lib/projects-data";
import { ScanReveal } from "@/components/ScanReveal";

/** Back out of the room into the studio: build notes, then the next specimen. */
export function StudioOutro({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: Project;
  next: Project;
}) {
  return (
    <section className="relative bg-bg font-sans">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div aria-hidden className="noise pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <ScanReveal>
          <p className="label text-accent">izzylabs build notes</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-fg md:text-4xl">
            {project.name} at a glance
          </h2>
        </ScanReveal>

        <ScanReveal className="mt-12">
          <dl className="grid gap-px overflow-hidden rounded-panel border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {project.highlights.map((h) => (
              <div key={h.label} className="bg-elevated p-5">
                <dt className="label text-muted">{h.label}</dt>
                <dd className="mt-3 font-mono text-sm uppercase tracking-[0.1em] text-fg">
                  {h.value}
                </dd>
              </div>
            ))}
          </dl>
        </ScanReveal>

        <ScanReveal delay={0.12} className="mt-16 md:mt-20">
          <div className="grid gap-5 md:grid-cols-2">
            <Link
              href={`/work/${prev.slug}`}
              className="group panel p-6 transition-colors hover:border-accent-dim md:p-7"
            >
              <p className="label text-muted">← Previous specimen</p>
              <p className="mt-4 text-2xl font-semibold tracking-tight text-fg transition-colors group-hover:text-accent">
                {prev.name}
              </p>
              <p className="mt-2 text-sm text-muted">{prev.theme.note}</p>
            </Link>
            <Link
              href={`/work/${next.slug}`}
              className="group panel p-6 text-right transition-colors hover:border-accent-dim md:p-7"
            >
              <p className="label text-muted">Next specimen →</p>
              <p className="mt-4 text-2xl font-semibold tracking-tight text-fg transition-colors group-hover:text-accent">
                {next.name}
              </p>
              <p className="mt-2 text-sm text-muted">{next.theme.note}</p>
            </Link>
          </div>
        </ScanReveal>

        <ScanReveal delay={0.2} className="mt-16 md:mt-20">
          <div className="flex flex-col items-start justify-between gap-6 border-t border-hairline pt-10 md:flex-row md:items-center">
            <div>
              <p className="label text-accent">Your product next</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-fg md:text-3xl">
                Want a room like this one?
              </p>
            </div>
            <Link
              href="/#contact"
              className="label inline-flex items-center gap-2 rounded-panel bg-accent px-5 py-3.5 text-bg transition-[filter] hover:brightness-110"
            >
              Start a project <span aria-hidden>→</span>
            </Link>
          </div>
        </ScanReveal>
      </div>
    </section>
  );
}
