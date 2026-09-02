import Link from "next/link";
import { Wordmark } from "./Wordmark";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
        <Wordmark />
        <nav aria-label="Primary" className="flex items-center gap-5 md:gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="label text-muted transition-colors hover:text-fg"
            >
              {l.label}
            </Link>
          ))}
          <span className="label hidden items-center gap-2 text-muted md:inline-flex">
            <span className="motion-ambient h-1.5 w-1.5 animate-pulse-dot rounded-full bg-live" />
            Operational
          </span>
        </nav>
      </div>
    </header>
  );
}
