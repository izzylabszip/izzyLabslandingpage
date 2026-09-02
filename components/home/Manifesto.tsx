import Link from "next/link";
import type { ReactNode } from "react";
import { Section } from "@/components/Section";
import { ScanReveal } from "@/components/ScanReveal";
import { StatRow } from "@/components/StatChip";
import { site } from "@/lib/site";
import { projectBySlug, type Project } from "@/lib/projects-data";

function P({ slug, children }: { slug: Project["slug"]; children: ReactNode }) {
  const accent = projectBySlug(slug)?.theme.accent ?? "var(--accent)";
  return (
    <Link
      href={`/work/${slug}`}
      className="underline decoration-1 underline-offset-8 transition-opacity hover:opacity-80"
      style={{ color: accent, textDecorationColor: `${accent}66` }}
    >
      {children}
    </Link>
  );
}

export function Manifesto() {
  return (
    <Section id="about" className="border-t border-hairline">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-3">
          <ScanReveal>
            <p className="label text-accent">Manifesto // 01</p>
          </ScanReveal>
        </div>
        <div className="md:col-span-9">
          <ScanReveal>
            <p className="text-2xl font-medium leading-[1.3] tracking-tight text-muted md:text-4xl">
              <P slug="glow">Glow</P> helps beauticians get discovered.{" "}
              <P slug="carenearby">CareNearby</P> connects caregivers with the families who need
              them. <P slug="lami-nepal">Lami</P> helps people find each other.{" "}
              <span className="text-fg">We are the studio that makes all of it possible.</span>
            </p>
          </ScanReveal>
        </div>
      </div>

      <ScanReveal className="mt-16 md:mt-20">
        <StatRow items={site.stats} />
      </ScanReveal>
    </Section>
  );
}
