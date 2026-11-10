import type { Project } from "@/lib/projects-data";
import { workMedia } from "@/lib/work-media";
import { ScanReveal } from "@/components/ScanReveal";
import { DeviceFan } from "@/components/room/DeviceFan";

/**
 * The corridor into each room, in the v30 studio style: the product's real
 * icon, its name in the studio serif, and its real screens fanned beside it.
 */
export function RoomIntro({ project }: { project: Project }) {
  const media = workMedia[project.slug];
  const accent = project.theme.accent;

  return (
    <header className="relative overflow-hidden border-b border-hairline bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 70% at 78% 45%, ${accent}38, transparent 70%)`,
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-12 md:px-8 lg:min-h-[44rem] lg:grid-cols-12 lg:items-center lg:pb-16">
        <div className="lg:col-span-6">
          <ScanReveal duration={0.4}>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- home runs its own scripts and needs a full page load */}
              <a href="/#work" className="transition-colors hover:text-fg">
                Our builds
              </a>{" "}
              / {project.index}
            </p>
          </ScanReveal>

          <ScanReveal delay={0.1} duration={0.7}>
            <div className="mt-8 flex items-center gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element -- 512px static icon */}
              <img
                src={media.icon}
                alt={`${project.name} icon`}
                width={64}
                height={64}
                className="h-14 w-14 rounded-[24%] shadow-[0_10px_30px_rgba(0,0,0,.45)] md:h-16 md:w-16"
              />
              <span className="text-sm text-muted">{project.statusLabel}</span>
            </div>
            <h1 className="studio-display mt-6 text-6xl text-fg md:text-8xl">{project.name}</h1>
            <p className="studio-display mt-4 text-3xl italic text-fg/85 md:text-4xl">{project.tagline}</p>
          </ScanReveal>

          <ScanReveal delay={0.22}>
            <p className="mt-6 max-w-xl leading-relaxed text-muted">{project.description}</p>
          </ScanReveal>

          <ScanReveal delay={0.32}>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    l.primary
                      ? "inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm text-bg transition-opacity hover:opacity-85"
                      : "inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-2.5 text-sm text-fg transition-colors hover:border-fg"
                  }
                >
                  {l.label} <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </ScanReveal>
        </div>

        <div className="lg:col-span-6">
          <DeviceFan screens={media.screens} label={`${project.name} product screens`} />
        </div>

        <dl className="grid grid-cols-2 gap-6 border-t border-hairline pt-6 text-sm md:grid-cols-4 lg:col-span-12">
          {project.meta.map((m) => (
            <div key={m.label}>
              <dt className="text-xs uppercase tracking-[0.12em] text-muted">{m.label}</dt>
              <dd className="mt-2 text-fg/90">{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
