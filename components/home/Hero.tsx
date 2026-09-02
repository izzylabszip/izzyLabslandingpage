import Link from "next/link";
import { ScanReveal } from "@/components/ScanReveal";
import { projects } from "@/lib/projects-data";

const PARTICLES = [
  { left: "12%", top: "22%", delay: "0s", size: 3 },
  { left: "78%", top: "18%", delay: "-6s", size: 2 },
  { left: "64%", top: "62%", delay: "-11s", size: 3 },
  { left: "28%", top: "74%", delay: "-3s", size: 2 },
  { left: "90%", top: "48%", delay: "-9s", size: 2 },
  { left: "44%", top: "36%", delay: "-14s", size: 2 },
  { left: "56%", top: "84%", delay: "-7s", size: 2 },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="motion-ambient absolute animate-drift rounded-full bg-accent/60"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              boxShadow: "0 0 12px 2px var(--accent-soft)",
            }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent-dim to-transparent" />
      </div>

      <div className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-6xl flex-col justify-center px-5 py-24 md:px-8">
        <ScanReveal duration={0.4}>
          <div className="label flex flex-wrap items-center gap-x-6 gap-y-2 text-muted">
            <span className="text-accent">Izzylabs // Kathmandu, NP</span>
            <span className="hidden items-center gap-2 sm:inline-flex">
              <span className="motion-ambient h-1.5 w-1.5 animate-pulse-dot rounded-full bg-live" />
              System status: operational
            </span>
          </div>
        </ScanReveal>

        <ScanReveal delay={0.15} duration={0.85} className="mt-8">
          <h1 className="max-w-5xl text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[6.25rem]">
            The studio that makes it <span className="text-accent">possible.</span>
          </h1>
        </ScanReveal>

        <ScanReveal delay={0.4} className="mt-8">
          <p className="max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            QA-driven engineering and full-stack + AI product development. The connective
            layer behind Glow, CareNearby and Lami Nepal.
          </p>
        </ScanReveal>

        <ScanReveal delay={0.55} className="mt-10">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/#work"
              className="label inline-flex items-center gap-2 rounded-panel bg-accent px-5 py-3.5 text-bg transition-[filter] hover:brightness-110"
            >
              View projects <span aria-hidden>→</span>
            </Link>
            <Link
              href="/#contact"
              className="label inline-flex items-center gap-2 rounded-panel border border-hairline px-5 py-3.5 text-fg transition-colors hover:border-accent hover:text-accent"
            >
              Start a project <span aria-hidden>→</span>
            </Link>
          </div>
        </ScanReveal>

        <ScanReveal delay={0.75} className="mt-20 md:mt-28">
          <div className="label flex flex-wrap items-center gap-x-8 gap-y-3 text-muted">
            <span>Specimens</span>
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                data-product={p.slug}
                className="inline-flex items-center gap-2 text-fg/80 transition-colors hover:text-accent-bright"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {p.name}
              </Link>
            ))}
          </div>
        </ScanReveal>
      </div>
    </section>
  );
}
