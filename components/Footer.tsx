import Link from "next/link";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects-data";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-hairline bg-bg/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <Wordmark />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {site.description}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="label text-muted">Work</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {projects.map((p) => (
              <li key={p.slug} className="flex items-center gap-3">
                <Link href={`/work/${p.slug}`} className="transition-colors hover:text-accent">
                  {p.name}
                </Link>
                <a
                  href={p.links[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="label text-muted transition-colors hover:text-accent"
                >
                  Live ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="label text-muted">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/#contact" className="transition-colors hover:text-accent">
                Start a project →
              </Link>
            </li>
            {site.email ? (
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent">
                  {site.email}
                </a>
              </li>
            ) : null}
            {site.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
            <li className="text-muted">{site.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 md:px-8">
          <span className="label text-muted">
            © {year} {site.name} {"//"} Kathmandu, NP
          </span>
          <span className="label text-muted">
            System status: <span className="text-live">Operational</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
