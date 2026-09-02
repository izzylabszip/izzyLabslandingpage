import type { Project } from "@/lib/projects-data";
import { Section } from "@/components/Section";
import { ScanReveal } from "@/components/ScanReveal";
import { Gallery } from "./Gallery";

const TEAM = ["Matchmakers", "Astrologer & Vastu", "Legal advisor", "Counselors", "Media & profile"];

/** Lami Nepal room: warm, celebratory, editorial. Cream band breaks the dark shell. */
export function LamiEditorial({ project }: { project: Project }) {
  return (
    <>
      {project.services ? (
        <section className="bg-cream text-[#1a1114]">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
            <ScanReveal>
              <p className="label text-accent">Service catalog // 0{project.services.length}</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
                A full-service house for the whole journey, from first match to the wedding
                itself.
              </h2>
            </ScanReveal>

            <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {project.services.map((s, i) => (
                <ScanReveal key={s.title} delay={(i % 3) * 0.1} amount={0.3}>
                  <li className="border-t border-[#1a1114]/15 pt-5">
                    <span className="font-mono text-xs tracking-[0.18em] text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-[#1a1114]/70">{s.blurb}</p>
                  </li>
                </ScanReveal>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <Section eyebrow="The house" className="border-t border-hairline">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ScanReveal>
              <p className="text-2xl font-medium leading-[1.3] tracking-tight text-fg md:text-4xl">
                Established <span className="text-gold">2077 B.S.</span> in Kathmandu. A team of
                matchmakers, an astrologer, a legal advisor and counselors, with an app that
                keeps members close to the people helping them.
              </p>
            </ScanReveal>
            <ScanReveal delay={0.15}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {TEAM.map((t) => (
                  <li
                    key={t}
                    className="label rounded-full border border-accent-dim px-3 py-2 text-accent-bright"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </ScanReveal>
          </div>
          <div className="lg:col-span-5">
            <ScanReveal delay={0.2}>
              <dl className="divide-y divide-hairline border-y border-hairline">
                {project.highlights.map((h) => (
                  <div key={h.label} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="label text-muted">{h.label}</dt>
                    <dd className="text-right font-medium text-gold">{h.value}</dd>
                  </div>
                ))}
              </dl>
            </ScanReveal>
          </div>
        </div>
      </Section>

      <Section eyebrow="Platform" className="border-t border-hairline">
        <Gallery project={project} count={3} aspect="tall" className="sm:grid-cols-3" />
      </Section>
    </>
  );
}
