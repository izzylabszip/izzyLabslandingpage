import Link from "next/link";
import { ScanReveal } from "@/components/ScanReveal";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-6xl flex-col justify-center px-5 md:px-8">
      <ScanReveal>
        <p className="label text-beta">Scan result // 404</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
          No specimen found at this address.
        </h1>
        <p className="mt-5 max-w-md text-muted">
          The page you asked for is not in the lab. Head back to the studio or open one of the
          live products.
        </p>
        <Link
          href="/"
          className="label mt-8 inline-flex items-center gap-2 rounded-panel bg-accent px-5 py-3.5 text-bg"
        >
          Return to studio <span aria-hidden>→</span>
        </Link>
      </ScanReveal>
    </section>
  );
}
