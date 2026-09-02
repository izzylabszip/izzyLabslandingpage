import type { Project } from "@/lib/projects-data";
import { Section } from "@/components/Section";
import { ScanReveal } from "@/components/ScanReveal";
import { ScanImage } from "@/components/ScanImage";
import { Gallery } from "./Gallery";

/** CareNearby room: calmer, imagery-led, more whitespace, fewer readouts. */
export function CareCalm({ project }: { project: Project }) {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <ScanReveal>
            <ScanImage
              src={project.images.cover}
              alt="CareNearby booking interface"
              aspect="wide"
              label="CareNearby // booking"
              sizes="(min-width: 1152px) 1088px, 100vw"
              priority
            />
          </ScanReveal>
          <ScanReveal delay={0.2}>
            <p className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
              <span>Greater Sudbury, Ontario</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
              <span>15 km service radius</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
              <span>Canada-wide instance in progress</span>
            </p>
          </ScanReveal>
        </div>
      </section>

      <Section className="border-t border-hairline" innerClassName="max-w-5xl">
        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {project.highlights.map((h, i) => (
            <ScanReveal key={h.label} delay={i * 0.1}>
              <p className="text-3xl font-semibold tracking-tight text-fg md:text-4xl">{h.value}</p>
              <p className="mt-3 text-sm text-muted">{h.label}</p>
            </ScanReveal>
          ))}
        </div>
      </Section>

      {project.features ? (
        <Section
          eyebrow="What it does"
          title="Care you choose, not care you are assigned"
          className="border-t border-hairline"
          innerClassName="max-w-5xl"
        >
          <div className="grid gap-x-14 gap-y-12 md:grid-cols-2">
            {project.features.map((f, i) => (
              <ScanReveal key={f.title} delay={i * 0.1}>
                <div className="h-px w-10 bg-accent" />
                <h3 className="mt-6 text-xl font-semibold tracking-tight md:text-2xl">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{f.blurb}</p>
              </ScanReveal>
            ))}
          </div>
        </Section>
      ) : null}

      <Section className="border-t border-hairline" innerClassName="max-w-5xl">
        <ScanReveal>
          <div className="rounded-panel border border-accent-dim bg-accent-soft p-8 md:p-12">
            <p className="label text-accent-bright">Client engagement</p>
            <p className="mt-5 max-w-2xl text-xl leading-relaxed text-fg md:text-2xl">
              CareNearby is a freelance client project. izzylabs built and tested the product;
              CareNearby operates it for families across Greater Sudbury, with a Canadian
              rollout underway.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="label inline-flex items-center gap-2 text-fg transition-colors hover:text-accent-bright"
                >
                  {l.label} <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </div>
        </ScanReveal>
      </Section>

      <section className="border-t border-hairline py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Gallery project={project} count={2} aspect="wide" className="md:grid-cols-2" />
        </div>
      </section>
    </>
  );
}
