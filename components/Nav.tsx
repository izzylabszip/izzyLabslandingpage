/* Same header as the v30 home page: pill nav left, wordmark centred, contact
   right. Plain <a> to the home page, not <Link>: home runs its own scripts and
   needs a full load to start them. */
const links = [
  { label: "Work", href: "/#world-originals" },
  { label: "Services", href: "/services" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-bg/90 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 md:px-8">
        <nav aria-label="Primary" className="flex items-center gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full bg-white/10 px-4 py-1.5 text-xs text-fg transition-colors hover:bg-white/20"
            >
              {l.label}
            </a>
          ))}
        </nav>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- home runs its own scripts and needs a full page load */}
        <a href="/" aria-label="izzyLabs home" className="text-[25px] font-semibold tracking-[-0.065em]">
          izzy<span className="font-normal">Labs</span>
        </a>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- home runs its own scripts and needs a full page load */}
        <a
          href="/#contact"
          aria-label="Get in touch"
          className="flex items-center gap-3 justify-self-end text-xs text-muted transition-colors hover:text-fg"
        >
          <span className="hidden sm:inline">Get in touch</span>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </span>
        </a>
      </div>
    </header>
  );
}
