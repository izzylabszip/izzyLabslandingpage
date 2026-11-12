"use strict";
// BreadcrumbList structured data for izzyLabs' named routes.
//
// This site is a single-page app: Vercel rewrites every URL in
// dist/sitemap.xml to dist/index.html, and dist/routes.js together with
// routeView() in dist/script.js switches the visible screen in place.
// One static BreadcrumbList in <head> would therefore claim the same
// trail on every route, so the trail that matches the current screen
// is swapped in here on each route change (routeView() dispatches a
// "contentroutechange" event on document). The homepage ("/", route
// "#top") deliberately gets no BreadcrumbList: a one-item "Home"
// trail would be fake.
//
// Every "item" URL below copies dist/sitemap.xml exactly — https, and
// only the homepage URL ends with a slash, matching the sitemap.
// Trail names use the site's own screen names: the project names from
// dist/case-studies.js, the info-page titles in routeView(), and the
// work-view titles routeView() sets for /ventures and /clients.
const breadcrumbTrails = {
  "#all-work": [
    ["Home", "https://izzylabs.ca/"],
    ["Work", "https://izzylabs.ca/work"],
  ],
  "#work-glow": [
    ["Home", "https://izzylabs.ca/"],
    ["Work", "https://izzylabs.ca/work"],
    ["Glow", "https://izzylabs.ca/work/glow"],
  ],
  "#work-carenearby": [
    ["Home", "https://izzylabs.ca/"],
    ["Work", "https://izzylabs.ca/work"],
    ["CareNearby", "https://izzylabs.ca/work/carenearby"],
  ],
  "#work-lami": [
    ["Home", "https://izzylabs.ca/"],
    ["Work", "https://izzylabs.ca/work"],
    ["Lami Nepal", "https://izzylabs.ca/work/lami-nepal"],
  ],
  "#what-we-do": [
    ["Home", "https://izzylabs.ca/"],
    ["What we do", "https://izzylabs.ca/what-we-do"],
  ],
  "#about-us": [
    ["Home", "https://izzylabs.ca/"],
    ["About us", "https://izzylabs.ca/about-us"],
  ],
  "#latest-news": [
    ["Home", "https://izzylabs.ca/"],
    ["Latest news", "https://izzylabs.ca/latest-news"],
  ],
  "#contact": [
    ["Home", "https://izzylabs.ca/"],
    ["Get in touch", "https://izzylabs.ca/contact"],
  ],
  "#world-originals": [
    ["Home", "https://izzylabs.ca/"],
    ["Our ventures", "https://izzylabs.ca/ventures"],
  ],
  "#world-clients": [
    ["Home", "https://izzylabs.ca/"],
    ["Client work", "https://izzylabs.ca/clients"],
  ],
};

function updateBreadcrumbSchema() {
  const trail = breadcrumbTrails[routeId()];
  let schema = document.getElementById("breadcrumb-schema");
  if (!trail) {
    if (schema) schema.remove();
    return;
  }
  if (!schema) {
    schema = document.createElement("script");
    schema.id = "breadcrumb-schema";
    schema.type = "application/ld+json";
    document.head.appendChild(schema);
  }
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, item], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item,
    })),
  });
}

document.addEventListener("contentroutechange", updateBreadcrumbSchema);
// routeView() in dist/script.js has already run (and already dispatched
// its first "contentroutechange") by the time this file loads, so set
// the trail for the initial screen directly as well.
updateBreadcrumbSchema();
