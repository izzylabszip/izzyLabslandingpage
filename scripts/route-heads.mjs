// Writes dist/_routes/<name>.html: a copy of dist/index.html whose <head>
// carries that route's own title, description, canonical and og/twitter URL.
//
// Why: the site is one static page that routes client-side (routes.js). Every
// path was rewritten to index.html, whose head is the homepage's, so Google
// saw /work/lami-nepal, /what-we-do, etc. as duplicates of "/" (canonical "/")
// and dropped them. script.js only fixes document.title after JS runs.
//
// Run after editing dist/index.html:  node scripts/route-heads.mjs
// The script exits 1 if any head field it must replace is missing, so a
// changed index.html cannot silently ship pages that still point to "/".
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const SITE = 'https://izzylabs.ca';
const routes = {
  '/work': ['work', 'Our work: apps and products we have built | izzyLabs',
    'Products izzyLabs designed and built end to end: Glow (beauty booking + AI skin scan), CareNearby (Ontario home care booking) and Lami Nepal (matchmaking).'],
  '/work/glow': ['work-glow', 'Glow: beauty booking app with its own AI skin scan | izzyLabs',
    "Beauty booking app: verified makeup artists and hairstylists, wedding and photoshoot bookings, and a free AI skin scan built on Glow's own measured skin engine."],
  '/work/carenearby': ['work-carenearby', 'CareNearby: Ontario home care booking app | izzyLabs',
    'Home care booking for Greater Sudbury, Ontario. Families browse police-checked Personal Support Workers and pick who comes, flat $25/hr, no agency markup.'],
  '/work/lami-nepal': ['work-lami-nepal', 'Lami Nepal: bilingual matchmaking app, Kathmandu | izzyLabs',
    'Full-service matchmaking in Kathmandu, established 2077 B.S. Nine services from compatible matching through legal marriage and venue booking.'],
  '/what-we-do': ['what-we-do', 'App, web and AI integration services in Canada | izzyLabs',
    'Product strategy and design, website and mobile app development, AI and LLM integration, and QA testing, from a product studio that ships its own apps too.'],
  '/about-us': ['about-us', 'About izzyLabs: an independent digital product studio',
    'izzyLabs is an independent digital product studio building its own apps, like Glow, and partner products from idea to launch.'],
  '/latest-news': ['latest-news', 'Latest news from izzyLabs',
    'Launches, product updates and what izzyLabs is building next.'],
  '/contact': ['contact', 'Contact izzyLabs: start an app, web or AI project',
    'Tell izzyLabs what you want to build: a website, a mobile app, AI integration, QA, or a complete product.'],
  '/ventures': ['ventures', 'Our ventures: products izzyLabs owns | izzyLabs',
    'Products izzyLabs builds and runs itself, starting with Glow, the beauty booking app with a free AI skin scan.'],
  '/clients': ['clients', 'Client work: apps built with partners | izzyLabs',
    'Partner products izzyLabs designed and built, including CareNearby for home care in Ontario and Lami Nepal for matchmaking in Kathmandu.'],
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const src = readFileSync('dist/index.html', 'utf8');

function swap(html, re, value, what, path) {
  if (!re.test(html)) {
    console.error(`route-heads: ${what} not found in dist/index.html (needed for ${path})`);
    process.exit(1);
  }
  return html.replace(re, value);
}

mkdirSync('dist/_routes', { recursive: true });
for (const [path, [name, title, desc]] of Object.entries(routes)) {
  const url = SITE + path, t = esc(title), d = esc(desc);
  let h = src;
  h = swap(h, /<title>[^<]*<\/title>/, `<title>${t}</title>`, '<title>', path);
  h = swap(h, /(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${d}$2`, 'meta description', path);
  h = swap(h, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`, 'canonical', path);
  h = swap(h, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`, 'og:url', path);
  h = swap(h, /(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${t}$2`, 'og:title', path);
  h = swap(h, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${d}$2`, 'og:description', path);
  h = swap(h, /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, `$1${t}$2`, 'twitter:title', path);
  h = swap(h, /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${d}$2`, 'twitter:description', path);
  writeFileSync(`dist/_routes/${name}.html`, h);
}
console.log(`route-heads: wrote ${Object.keys(routes).length} route pages`);
