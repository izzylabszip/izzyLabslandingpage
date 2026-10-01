import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serviceBySlug, serviceSlugs, services } from "@/lib/services-data";
import { graph, serviceSchema, breadcrumbs, ldJson } from "@/lib/schema";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return {
    /* The search phrase first, the brand second. The layout template appends
       the studio name, so the title reads "QA and software testing —
       izzylabs" rather than leading with a name nobody is searching for. */
    title: service.heading,
    description: service.summary,
    alternates: { canonical: `${site.url}/services/${service.slug}` },
    openGraph: {
      title: `${service.heading} — ${site.name}`,
      description: service.summary,
      url: `${site.url}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  /* Organization and WebSite come from the root layout on every page; this
     references the org by @id rather than emitting a second copy of it. */
  const jsonLd = graph(
    serviceSchema(service.slug),
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Capabilities", path: "/services" },
      { name: service.title, path: `/services/${service.slug}` },
    ]),
  );

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="label mb-10 text-muted">
        <Link href="/" className="transition-colors hover:text-fg">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/services" className="transition-colors hover:text-fg">
          Capabilities
        </Link>
        <span className="mx-2">/</span>
        <span className="text-fg">{service.title}</span>
      </nav>

      <p className="label mb-4 text-muted">{service.moduleId}</p>
      <h1 className="text-balance text-4xl font-medium tracking-tight md:text-5xl">
        {service.heading}
      </h1>
      <p className="mt-6 text-lg text-muted md:text-xl">{service.lede}</p>

      <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tools and practices">
        {service.tags.map((t) => (
          <li key={t} className="label rounded-full border border-hairline px-3 py-1 text-muted">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-14 space-y-12">
        {service.sections.map((sec) => (
          <section key={sec.heading}>
            <h2 className="text-xl font-medium tracking-tight md:text-2xl">{sec.heading}</h2>
            <div className="mt-4 space-y-4">
              {sec.body.map((p) => (
                <p key={p} className="text-muted leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 border-t border-hairline pt-10">
        <Link href="/#contact" className="label text-fg underline underline-offset-4">
          Talk to us about {service.title.toLowerCase()}
        </Link>
      </div>

      <nav aria-label="Other capabilities" className="mt-12 border-t border-hairline pt-10">
        <h2 className="label mb-5 text-muted">Also</h2>
        <ul className="space-y-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/services/${o.slug}`}
                className="group flex items-baseline justify-between gap-4"
              >
                <span className="transition-colors group-hover:text-fg">{o.heading}</span>
                <span className="label shrink-0 text-muted">{o.moduleId}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/work/glow" className="text-muted transition-colors hover:text-fg">
              See the products this shipped in
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
