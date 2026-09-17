import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * The AI crawlers are named rather than left to the wildcard.
 *
 * A wildcard Allow already lets them in, so this changes nothing about who can
 * read the site today. What it changes is what happens when somebody later
 * adds a Disallow to the wildcard rule for an unrelated reason — most robots
 * parsers apply the most specific matching group and ignore the rest, so a
 * named group survives that and an implied permission does not.
 *
 * Google-Extended is the one worth understanding: it does not affect Search
 * ranking at all. It controls whether Gemini and the AI Overviews may use the
 * content for grounding. For a studio whose customers increasingly ask an
 * assistant "who can build this" before they ever open a search results page,
 * being readable there is the point.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: "/api/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
