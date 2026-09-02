import { Section } from "@/components/Section";
import { ScanReveal } from "@/components/ScanReveal";
import { ModuleCard } from "@/components/ModuleCard";
import { site } from "@/lib/site";

const PROCESS = ["Discover", "Build", "Test", "Ship", "Monitor"];

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      eyebrow="Capabilities // 03"
      title="System modules"
      lead="Three modules, one pipeline. QA is not a phase at the end. It runs through every build we ship."
      className="border-t border-hairline"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {site.modules.map((m, i) => (
          <ScanReveal key={m.id} delay={i * 0.12} className="h-full" innerClassName="h-full">
            <ModuleCard id={m.id} title={m.title} body={m.body} tags={m.tags} />
          </ScanReveal>
        ))}
      </div>

      <ScanReveal className="mt-10">
        <ol className="label flex flex-wrap items-center gap-x-3 gap-y-3 border-y border-hairline py-5 text-muted">
          <li className="mr-3 text-accent">Process</li>
          {PROCESS.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              <span className="text-fg">
                <span className="text-accent-dim">0{i + 1}</span> {step}
              </span>
              {i < PROCESS.length - 1 ? <span aria-hidden>→</span> : null}
            </li>
          ))}
        </ol>
      </ScanReveal>
    </Section>
  );
}
