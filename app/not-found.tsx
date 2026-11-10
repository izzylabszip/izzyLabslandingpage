import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

/* Renders in the bare root layout, so it brings the site shell itself. */
export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col bg-bg font-sans text-fg antialiased">
      <Nav />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-24 md:px-8">
        <p className="text-xs uppercase tracking-[0.12em] text-muted">404 / izzyLabs</p>
        <h1 className="studio-display mt-6 text-6xl md:text-8xl">
          Nothing here.
          <br />
          <em>Yet.</em>
        </h1>
        <p className="mt-6 max-w-md text-muted">
          The page you asked for does not exist. Head back home or open one of our builds.
        </p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- home runs its own scripts and needs a full page load */}
        <a
          href="/"
          className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm text-bg"
        >
          Back to izzyLabs <span aria-hidden>↗</span>
        </a>
      </main>
      <Footer />
    </div>
  );
}
