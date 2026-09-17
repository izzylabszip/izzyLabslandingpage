import { site } from "@/lib/site";
import { services } from "@/lib/services-data";

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
