import Link from "next/link";
import type { Project } from "@/lib/projects-data";
import { ScanReveal } from "@/components/ScanReveal";

export function ProductNav({ prev, next }: { prev: Project; next: Project }) {
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <ScanReveal>
          <div className="grid gap-5 md:grid-cols-2">
            <Link
              href={`/work/${prev.slug}`}
              data-product={prev.slug}
              className="group panel p-6 transition-colors hover:border-accent-dim md:p-8"
            >
              <p className="label text-muted">← Previous specimen</p>
              <p className="mt-4 text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent-bright">
                {prev.name}
              </p>
              <p className="mt-2 text-sm text-muted">{prev.tagline}</p>
            </Link>
            <Link
              href={`/work/${next.slug}`}
              data-product={next.slug}
              className="group panel p-6 text-right transition-colors hover:border-accent-dim md:p-8"
            >
              <p className="label text-muted">Next specimen →</p>
              <p className="mt-4 text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent-bright">
                {next.name}
              </p>
              <p className="mt-2 text-sm text-muted">{next.tagline}</p>
            </Link>
          </div>
        </ScanReveal>

        <ScanReveal delay={0.15} className="mt-16 md:mt-20">
          <div className="flex flex-col items-start justify-between gap-6 border-t border-hairline pt-10 md:flex-row md:items-center">
            <div>
              <p className="label text-accent">Your product next</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
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
