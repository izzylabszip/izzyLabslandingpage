import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services-data";
import { graph, breadcrumbs } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Capabilities — QA, full-stack and AI",
  description:
    "What izzylabs does: QA and software testing, full-stack web and mobile development, and AI integration with evaluation and guardrails. A studio in Kathmandu working worldwide.",
  alternates: { canonical: `${site.url}/services` },
};

export default function ServicesPage() {
  const jsonLd = graph(
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Capabilities", path: "/services" },
    ]),
  );

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="label mb-10 text-muted">
        <Link href="/" className="transition-colors hover:text-fg">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-fg">Capabilities</span>
      </nav>

      <h1 className="text-balance text-4xl font-medium tracking-tight md:text-5xl">
        What the studio does
      </h1>
      <p className="mt-6 text-lg text-muted md:text-xl">
        Three things, properly, rather than a list of everything. Each one has shipped inside a
        product that is live.
      </p>

      <ul className="mt-14 space-y-10">
        {services.map((s) => (
          <li key={s.slug} className="border-t border-hairline pt-8">
            <p className="label mb-3 text-muted">{s.moduleId}</p>
            <h2 className="text-2xl font-medium tracking-tight">
              <Link href={`/services/${s.slug}`} className="transition-colors hover:text-muted">
                {s.heading}
              </Link>
            </h2>
            <p className="mt-3 text-muted leading-relaxed">{s.summary}</p>
            <Link
              href={`/services/${s.slug}`}
              className="label mt-4 inline-block text-fg underline underline-offset-4"
            >
              Read more
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
