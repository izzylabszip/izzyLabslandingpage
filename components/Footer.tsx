import Link from "next/link";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects-data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-hairline bg-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <p className="studio-display text-5xl md:text-6xl">
            we build
            <br />
            <em>future</em>
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
            We turn ideas into digital products. Some begin with us. Others begin with you.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.12em] text-muted">Our builds</p>
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
                  className="text-xs text-muted transition-colors hover:text-accent"
                >
                  Live ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.12em] text-muted">Get in touch</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- home runs its own scripts and needs a full page load */}
              <a href="/#contact" className="transition-colors hover:text-accent">
                Start a conversation ↗
              </a>
            </li>
            <li>
              <Link href="/services" className="transition-colors hover:text-accent">
                Services
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
                <a href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-muted md:px-8">
          <span>
            © {year} izzyLabs · {site.location}
          </span>
          <span>Independent thinking. Shared ambition.</span>
        </div>
      </div>
    </footer>
  );
}
