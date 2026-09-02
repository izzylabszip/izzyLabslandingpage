import type { Project } from "@/lib/projects-data";
import { Section } from "@/components/Section";
import { ScanReveal } from "@/components/ScanReveal";
import { ScanImage } from "@/components/ScanImage";
import { ScanReadout } from "./ScanReadout";
import { Gallery } from "./Gallery";

/** Glow room: darkest, most scan-heavy. Console energy, rose-gold accent. */
export function GlowConsole({ project }: { project: Project }) {
  return (
    <>
      <Section eyebrow="Module // Face scan" title="The scan is the product">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ScanReveal>
              <div className="relative mx-auto w-full max-w-[300px]">
                <div
                  aria-hidden
                  className="corner-ticks motion-ambient pointer-events-none absolute -inset-4 animate-reticle"
                />
                <ScanImage
                  src={project.images.cover}
                  alt="Glow face-scan screen"
                  aspect="phone"
                  label="Glow // face_scan"
                  sizes="300px"
                  priority
                />
              </div>
            </ScanReveal>
          </div>
          <div className="lg:col-span-7">
            <ScanReveal delay={0.15}>
              <ScanReadout lines={project.readouts ?? []} />
            </ScanReveal>
            <ScanReveal delay={0.3}>
              <p className="mt-6 max-w-xl leading-relaxed text-muted">
                A client opens the camera, Glow captures a frame with Vision Camera, runs
                on-device analysis for tone and shape, then asks Gemini for the nuance. The
                result is not a score. It is a shortlist of artists whose work fits.
              </p>
            </ScanReveal>
          </div>
        </div>
      </Section>

      {project.audiences ? (
        <Section eyebrow="Marketplace // Two sides" title="Built for both sides" className="border-t border-hairline">
          <div className="grid gap-5 md:grid-cols-2">
            {project.audiences.map((a, i) => (
              <ScanReveal key={a.label} delay={i * 0.12} className="h-full" innerClassName="h-full">
                <div className="panel corner-ticks relative h-full p-7 md:p-9">
                  <p className="label text-accent-bright">{a.label}</p>
                  <ul className="mt-6 space-y-4">
                    {a.points.map((p, j) => (
                      <li key={p} className="flex items-start gap-4">
                        <span className="label mt-1 text-accent-dim">0{j + 1}</span>
                        <span className="text-lg leading-snug text-fg">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScanReveal>
            ))}
          </div>
        </Section>
      ) : null}

      <Section eyebrow="Telemetry" className="border-t border-hairline">
        <ScanReveal>
          <dl className="grid gap-px overflow-hidden rounded-panel border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {project.highlights.map((h) => (
              <div key={h.label} className="bg-elevated p-6">
                <dt className="label text-muted">{h.label}</dt>
                <dd className="mt-4 font-mono text-sm uppercase tracking-[0.1em] text-accent-bright">
                  {h.value}
                </dd>
              </div>
            ))}
          </dl>
        </ScanReveal>
      </Section>

      <Section eyebrow="Screens" className="border-t border-hairline">
        <Gallery project={project} count={3} aspect="phone" className="sm:grid-cols-3" />
      </Section>
    </>
  );
}
