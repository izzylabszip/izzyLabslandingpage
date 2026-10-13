// Tells Bing (and the other IndexNow engines: Yandex, Seznam, Naver) about
// every URL in this site's sitemap, so new and changed pages are crawled in
// hours instead of whenever Bing next looks. ChatGPT's live answers lean on
// Bing's index, so a page Bing hasn't crawled barely exists there.
//
// Google does not take IndexNow; it reads the Sitemap line in robots.txt and
// the sitemap submitted in Search Console.
//
//   node scripts/indexnow.mjs            # submit every sitemap URL
//   node scripts/indexnow.mjs --dry-run  # list them, submit nothing
//
// Run it after a deploy that adds or changes pages. The key file at
// /<KEY>.txt must be live first, or the submission is rejected (403).
const SITE = process.env.INDEXNOW_SITE || 'https://izzylabs.ca';
const KEY = '46ec704e1cdd4ba6a152724897494532';
const dryRun = process.argv.includes('--dry-run');

async function locs(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  const xml = await res.text();
  const found = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  // A sitemap index lists other sitemaps; follow them.
  if (/<sitemapindex/i.test(xml)) return (await Promise.all(found.map(locs))).flat();
  return found;
}

const host = new URL(SITE).host;
const urls = [...new Set(await locs(new URL(process.env.INDEXNOW_SITEMAP || '/sitemap.xml', SITE).href))]
  .filter((u) => new URL(u).host === host);
if (urls.length === 0) throw new Error('sitemap listed no URLs on ' + host);
console.log(`${urls.length} URLs on ${host}`);
if (dryRun) { console.log(urls.join('\n')); process.exit(0); }

const keyRes = await fetch(`${SITE}/${KEY}.txt`);
const keyBody = keyRes.ok ? (await keyRes.text()).trim() : '';
if (keyBody !== KEY) throw new Error(`key file ${SITE}/${KEY}.txt is not live (HTTP ${keyRes.status}); deploy first`);

for (let i = 0; i < urls.length; i += 10000) {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls.slice(i, i + 10000) }),
  });
  // 200 = accepted, 202 = accepted, key validation pending.
  if (res.status !== 200 && res.status !== 202) throw new Error(`IndexNow HTTP ${res.status}: ${await res.text()}`);
  console.log(`submitted ${Math.min(urls.length - i, 10000)} URLs: HTTP ${res.status}`);
}
