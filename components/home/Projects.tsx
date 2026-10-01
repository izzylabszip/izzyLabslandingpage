import { Section } from "@/components/Section";
import { ScanReveal } from "@/components/ScanReveal";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects-data";
import { cn } from "@/lib/cn";

export function Projects() {
  return (
    <Section
      id="work"
      eyebrow="Work // 02"
      title="Specimens"
      lead="Four live products, each built, tested and shipped by izzylabs. Open a panel to walk into its room and read the case study, or go straight to the live product."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((p, i) => {
          /* Glow leads and Amit Blends closes, both full width. With four
             specimens in a two-column grid that is what keeps the rows even —
             a half-width card alone on the last row reads as a layout bug. */
          const featured = p.slug === "glow" || p.slug === "amit-blends";
          return (
            <ScanReveal
              key={p.slug}
              delay={i * 0.1}
              amount={0.15}
              className={cn("h-full", featured && "lg:col-span-2")}
              innerClassName="h-full"
            >
              <ProjectCard project={p} featured={featured} />
            </ScanReveal>
          );
        })}
      </div>
    </Section>
  );
}
