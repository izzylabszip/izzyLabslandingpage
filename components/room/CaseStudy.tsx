import type { Project } from "@/lib/projects-data";
import { ScanReveal } from "@/components/ScanReveal";
import { AssetFrame } from "./AssetFrame";

/**
 * The case study, on the studio's own dark shell rather than the product's.
 *
 * The room above it shows what the product looks like. This shows what the
 * engagement was: problem, build, stack, outcome. It replaces the three-column
 * "build notes" summary that used to live in StudioOutro — that was a caption,
 * and a caption does not answer the question a prospective client arrives with,
 * which is "what did you actually do here and what came of it".
 *
 * Every number rendered below carries its provenance in `note`. Nothing in
 * this component invents one, and where a figure is the client's to publish
 * rather than ours, the metric says so in place of a value.
 */
export function CaseStudy({ project }: { project: Project }) {
  const cs = project.caseStudy;

  return (
    <section
      id="case-study"
      aria-labelledby="case-study-heading"
      className="relative scroll-mt-14 border-t border-hairline bg-bg font-sans"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div aria-hidden className="noise pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <ScanReveal>
          <p className="label text-accent">Case study {"//"} Specimen_{project.index}</p>
          <h2
            id="case-study-heading"
            className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-fg md:text-4xl"
          >
            {project.name}: {project.role}
          </h2>
        </ScanReveal>

        {/* 01 — Problem */}
        <div className="mt-16 grid gap-8 border-t border-hairline pt-10 md:mt-20 lg:grid-cols-12">
          <ScanReveal className="lg:col-span-4">
            <p className="label text-accent-dim">01</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg">
              {cs.problem.heading}
            </h3>
          </ScanReveal>
          <ScanReveal delay={0.1} className="lg:col-span-8">
            <div className="space-y-5">
              {cs.problem.body.map((p) => (
                <p key={p} className="leading-relaxed text-muted md:text-[17px]">
                  {p}
                </p>
              ))}
            </div>
          </ScanReveal>
        </div>

        {/* 02 — Build */}
        <div className="mt-16 grid gap-8 border-t border-hairline pt-10 md:mt-20 lg:grid-cols-12">
          <ScanReveal className="lg:col-span-4">
            <p className="label text-accent-dim">02</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg">
              {cs.build.heading}
            </h3>
            {cs.build.body.map((p) => (
              <p key={p} className="mt-4 leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </ScanReveal>
          <div className="lg:col-span-8">
            <ul className="grid gap-px overflow-hidden rounded-panel border border-hairline bg-hairline">
              {cs.build.items.map((item, i) => (
                <li key={item.title} className="bg-elevated">
                  <ScanReveal delay={Math.min(i, 3) * 0.08} className="p-6 md:p-7">
                    <p className="label text-accent">{String(i + 1).padStart(2, "0")}</p>
                    <h4 className="mt-3 text-lg font-semibold tracking-tight text-fg">
                      {item.title}
                    </h4>
                    <p className="mt-2.5 leading-relaxed text-muted">{item.body}</p>
                  </ScanReveal>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 03 — Stack */}
        <div className="mt-16 grid gap-8 border-t border-hairline pt-10 md:mt-20 lg:grid-cols-12">
          <ScanReveal className="lg:col-span-4">
            <p className="label text-accent-dim">03</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg">The stack</h3>
          </ScanReveal>
          <ScanReveal delay={0.1} className="lg:col-span-8">
            <dl className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {cs.stack.map((group) => (
                <div key={group.group}>
                  <dt className="label border-b border-hairline pb-3 text-muted">{group.group}</dt>
                  <dd>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="label rounded-full border border-hairline px-3 py-1.5 text-fg/90"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </ScanReveal>
        </div>

        {/* Pull quote — only once a real one exists. What is still missing
            is tracked in `quote.need` in the data file, never shown on the
            page: a visitor should not read our to-do list. */}
        {cs.quote.text ? (
          <ScanReveal delay={0.1} className="mt-16 md:mt-20">
            <figure className="panel border-l-2 border-l-accent p-7 md:p-10">
              <blockquote className="text-xl font-medium leading-snug tracking-tight text-fg md:text-2xl">
                &ldquo;{cs.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-hairline pt-5">
                <span className="label text-accent">{cs.quote.author}</span>
                {cs.quote.role ? (
                  <span className="label ml-3 text-muted">{cs.quote.role}</span>
                ) : null}
                {cs.quote.source ? (
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">{cs.quote.source}</p>
                ) : null}
              </figcaption>
            </figure>
          </ScanReveal>
        ) : null}

        {/* 04 — Outcome */}
        <div className="mt-16 grid gap-8 border-t border-hairline pt-10 md:mt-20 lg:grid-cols-12">
          <ScanReveal className="lg:col-span-4">
            <p className="label text-accent-dim">04</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg">
              {cs.outcome.heading}
            </h3>
          </ScanReveal>
          <ScanReveal delay={0.1} className="lg:col-span-8">
            <div className="space-y-5">
              {cs.outcome.body.map((p) => (
                <p key={p} className="leading-relaxed text-muted md:text-[17px]">
                  {p}
                </p>
              ))}
            </div>
          </ScanReveal>
        </div>

        <ScanReveal delay={0.12} className="mt-10">
          <dl className="grid gap-px overflow-hidden rounded-panel border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {cs.outcome.metrics.map((m) => (
              <div key={m.label} className="flex flex-col bg-elevated p-6">
                <dt className="label text-muted">{m.label}</dt>
                <dd className="mt-3 font-mono text-lg uppercase tracking-[0.06em] text-fg">
                  {m.value}
                </dd>
                {/* Provenance, in the markup rather than in a footnote. A number
                    a reader cannot trace is a number they are right to discount. */}
                {publicNote(m.note) ? (
                  <p className="mt-3 text-[12px] leading-relaxed text-muted">{publicNote(m.note)}</p>
                ) : null}
              </div>
            ))}
          </dl>
        </ScanReveal>

        {/* Assets */}
        <div className="mt-16 border-t border-hairline pt-10 md:mt-20">
          <ScanReveal>
            <h3 className="text-2xl font-semibold tracking-tight text-fg">From the product</h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">
              Real screens only. Where a frame below is empty it is because the shot has not been
              taken yet, and the frame carries the brief for it.
            </p>
          </ScanReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cs.assets.map((asset, i) => (
              <ScanReveal key={asset.id} delay={Math.min(i, 3) * 0.08}>
                <AssetFrame asset={asset} />
              </ScanReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// "[NEEDS: …]" markers are notes to ourselves in the data file. Strip them so
// they never reach a visitor; a note that was only a marker renders nothing.
function publicNote(note?: string) {
  return (note ?? "").replace(/\[NEEDS[^\]]*\]/g, "").trim();
}
