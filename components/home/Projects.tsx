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
      lead="Three live products, each built, tested and shipped by izzylabs. Open a panel to walk into its room, or go straight to the live product."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((p, i) => {
          const featured = p.slug === "glow";
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
