import { site } from "@/lib/site";
import { services } from "@/lib/services-data";
import { projects, type Project } from "@/lib/projects-data";

/**
 * JSON-LD for the studio.
 *
 * The site had none at all, which is the single largest on-page gap on it: a
 * search engine or an assistant reading izzylabs.ca had no machine-readable
 * statement of what this is, where it is, or what it does. Everything below is
 * generated from lib/site.ts and lib/services-data.ts so it cannot disagree
 * with the page it sits on.
 *
 * The entity is an Organization that is also a ProfessionalService, with an
 * areaServed of "Worldwide" and an address locality of Kathmandu. Both are
 * true and they are not in tension: the studio is physically in Kathmandu and
 * the work is remote. Claiming a local business in a market we do not operate
 * in would be the mistake here.
 */

const ID = {
  org: `${site.url}/#organization`,
  website: `${site.url}/#website`,
};

/**
 * Next's own JSON-LD guide asks for this, and it costs nothing.
 *
 * Every string below is authored in a TypeScript module in this repo, so there
 * is no untrusted input and no live XSS here today. The escape exists for the
 * day a project description or a pull quote starts coming from a CMS or a
 * client form, because that change will not arrive with a reminder to revisit
 * the serialisation. Escaping `<` keeps a `</script>` inside any string from
 * closing the tag it sits in.
 */
export function ldJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function organization() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ID.org,
    name: site.name,
    alternateName: "Izzy Labs",
    description: site.description,
    url: site.url,
    slogan: site.tagline,
    foundingDate: String(site.founded),
    founder: {
      "@type": "Person",
      name: site.founder.name,
      jobTitle: site.founder.jobTitle,
      ...(site.founder.sameAs.length ? { sameAs: site.founder.sameAs } : {}),
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
    areaServed: { "@type": "Place", name: "Worldwide" },
    knowsAbout: services.map((s) => s.title),
    /* Email is optional in site.ts and omitted rather than emitted empty —
       an Organization with a blank contact point is worse than one without. */
    ...(site.email ? { email: site.email } : {}),
    ...(site.socials.length ? { sameAs: site.socials.map((s) => s.href) } : {}),
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.summary,
        serviceType: s.serviceType,
        provider: { "@id": ID.org },
      },
    })),
  };
}

export function website() {
  return {
    "@type": "WebSite",
    "@id": ID.website,
    url: site.url,
    name: site.name,
    inLanguage: "en",
    publisher: { "@id": ID.org },
  };
}

export function serviceSchema(slug: string) {
  const s = services.find((x) => x.slug === slug);
  if (!s) return null;
  const url = `${site.url}/services/${s.slug}`;
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: s.title,
    description: s.summary,
    serviceType: s.serviceType,
    url,
    provider: { "@id": ID.org },
    areaServed: { "@type": "Place", name: "Worldwide" },
  };
}

/**
 * A shipped product, as a CreativeWork.
 *
 * schema.org has no type for "a thing an agency built for a client", and the
 * near misses are worse than the generic: `Product` implies izzylabs sells
 * Glow, `Service` describes the engagement rather than the artefact, and
 * `SoftwareApplication` would be a lie about Lami Nepal's website and Amit
 * Blends' static site. `CreativeWork` with an explicit `creator` says the true
 * and narrow thing — this exists, izzylabs made it, it lives at that URL — and
 * stops there rather than reaching for a richer type it does not fit.
 *
 * `sameAs` points at the live product. That is the link that matters: it tells
 * a crawler the case study and the real thing are the same entity.
 */
export function creativeWork(project: Project) {
  const url = `${site.url}/work/${project.slug}`;
  const live = project.links.find((l) => l.primary) ?? project.links[0];

  return {
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name: project.name,
    alternateName: project.tagline,
    description: project.description,
    url,
    creator: { "@id": ID.org },
    /* The studio built it; the studio does not own it. Saying otherwise in
       markup is the kind of claim a client notices. */
    ...(live ? { sameAs: [live.href] } : {}),
    about: project.caseStudy.stack.flatMap((g) => g.items),
    inLanguage: "en",
    isPartOf: { "@id": ID.website },
  };
}

/**
 * The portfolio as an ItemList on the home page.
 *
 * The four specimens are already CreativeWork nodes on their own pages. This
 * says they are a set and what order they are in, which is the difference
 * between a crawler finding four unrelated pages and finding a body of work.
 * It is also the node an assistant answering "what has izzylabs built" can
 * read without loading four documents.
 */
export function workCollection() {
  return {
    "@type": "ItemList",
    "@id": `${site.url}/#work`,
    name: "Products built by izzylabs",
    numberOfItems: projects.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}/work/${p.slug}`,
      name: p.name,
      description: p.description,
    })),
  };
}

export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path}`,
    })),
  };
}

/** Wraps nodes in the graph envelope the pages actually render. */
export function graph(...nodes: unknown[]) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
