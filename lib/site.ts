/**
 * The public origin.
 *
 * This used to fall back to localhost silently. That is fine in dev and quietly
 * catastrophic in a production build: canonical tags, Open Graph URLs, the
 * sitemap and llms.txt are all derived from it, so a missing environment
 * variable would publish a site that tells Google its address is
 * http://localhost:3000 — and nothing anywhere would fail.
 *
 * Vercel sets NEXT_PUBLIC_SITE_URL today, so this changes nothing about the
 * current deployment. It changes what happens the day somebody rotates the
 * project settings and does not notice.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  // Vercel's own URL is a reasonable second choice — a preview hostname is
  // wrong, but it is wrong in a way that still points at this deployment.
  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is not set. A production build without it publishes " +
        "localhost canonical URLs, Open Graph tags and sitemap entries. Set it in " +
        "the project's environment variables and rebuild.",
    );
  }

  return "http://localhost:3000";
}

export const site = {
  name: "izzylabs",
  tagline: "The studio that makes it possible.",
  description:
    "izzylabs is a QA-driven engineering studio in Kathmandu building full-stack and AI products. The engine behind Glow, CareNearby and Lami Nepal.",
  url: resolveSiteUrl(),
  location: "Kathmandu, NP",
  founded: 2026,
  /** Optional. Shown in the footer only when set. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  socials: [] as { label: string; href: string }[],
  stats: [
    { label: "Projects shipped", value: "03" },
    { label: "Founded", value: "2026" },
    { label: "Based", value: "Kathmandu, NP" },
    { label: "Focus", value: "QA + Full-stack + AI" },
  ],
  modules: [
    {
      id: "MODULE_01",
      title: "QA & Testing",
      body: "Manual, regression and API testing baked into every build. Cypress, Postman and Selenium, with test plans written before the first commit.",
      tags: ["Cypress", "Postman", "Selenium", "Regression"],
    },
    {
      id: "MODULE_02",
      title: "Full-stack Development",
      body: "Web and mobile products end to end. Next.js and Expo front ends, typed APIs, payments, auth and the deployment pipeline that keeps them live.",
      tags: ["Next.js", "Expo / React Native", "TypeScript", "Stripe"],
    },
    {
      id: "MODULE_03",
      title: "AI Integration",
      body: "Gemini-backed features, on-device ML and vision pipelines that ship inside real apps, with evaluation and guardrails, not demos.",
      tags: ["Gemini", "On-device ML", "Vision", "Evaluation"],
    },
  ],
} as const;
