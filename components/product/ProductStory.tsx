import type { Project } from "@/lib/projects-data";
import { Section } from "@/components/Section";
import { ScanReveal } from "@/components/ScanReveal";

export function ProductStory({ project }: { project: Project }) {
  return (
    <Section eyebrow="Case notes" className="border-t border-hairline">
      <div className="grid gap-10 md:grid-cols-3">
        {project.story.map((s, i) => (
          <ScanReveal key={s.heading} delay={i * 0.12}>
            <p className="label text-accent-dim">0{i + 1}</p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight">{s.heading}</h3>
            <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
          </ScanReveal>
        ))}
      </div>
    </Section>
  );
}
