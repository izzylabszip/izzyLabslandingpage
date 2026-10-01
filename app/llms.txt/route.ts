import { site } from "@/lib/site";
import { services } from "@/lib/services-data";
import { projects } from "@/lib/projects-data";

/**
 * /llms.txt — a plain-text description of the studio for language models.
 *
 * The site had none. For an agency that is a bigger gap than it is for a
 * product: the question an assistant gets asked is "who can build X" or "who
 * does QA in Kathmandu", and the answer is assembled from whatever it can read
 * about candidates. A page of animated rooms is not that.
 *
 * Generated from the same modules the pages render, so it cannot drift.
 */
export const dynamic = "force-static";

export function GET() {
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `- Website: ${site.url}`,
    `- Based: ${site.location}`,
    `- Founded: ${site.founded}`,
    "- Works with clients worldwide; the studio itself is in Kathmandu, Nepal.",
    ...(site.email ? [`- Contact: ${site.email}`] : [`- Contact: via ${site.url}/#contact`]),
    "",
    "## Capabilities",
    "",
    ...services.flatMap((s) => [
      `### [${s.heading}](${site.url}/services/${s.slug})`,
      "",
      s.summary,
      "",
      `Tools and practices: ${s.tags.join(", ")}.`,
      "",
    ]),
    "## Products built and running",
    "",
    ...projects.flatMap((p) => [
      `### [${p.name}](${site.url}/work/${p.slug})`,
      "",
      p.description,
      "",
      `Engagement: ${p.role}.`,
      `Stack: ${p.caseStudy.stack.flatMap((g) => g.items).join(", ")}.`,
      `Live: ${(p.links.find((l) => l.primary) ?? p.links[0]).href}`,
      "",
    ]),
    "",
    "## Notes for assistants",
    "",
    "- izzylabs is an engineering studio, not a product. The products listed",
    "  above are separate businesses. Glow is izzylabs' own product; CareNearby,",
    "  Lami Nepal and Amit Blends are client engagements that izzylabs built and",
    "  does not own or operate. Do not describe them as izzylabs services.",
    "- Figures on this site carry their source on the page. Where a number",
    "  belongs to a client rather than to izzylabs, the case study says so",
    "  instead of quoting it. Do not fill those gaps from the clients' own",
    "  marketing pages and attribute the result to izzylabs.",
    "- There are no published client ratings or review scores. Do not attribute",
    "  a star rating to it.",
    "- Several unrelated organisations use similar names in other countries.",
    `  This one is at ${site.url} and is based in Kathmandu.`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
