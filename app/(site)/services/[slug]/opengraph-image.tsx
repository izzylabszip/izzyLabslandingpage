import { ImageResponse } from "next/og";
import { serviceBySlug, serviceSlugs } from "@/lib/services-data";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Prerendered at build for the same reason the case-study cards are: a link
   unfurl should not run Satori on demand for an image that never changes. */
export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export const alt = `${site.name} service`;

/**
 * Per-service share card.
 *
 * The three service pages had no og:image at all. Their generateMetadata sets
 * an openGraph object without an `images` key, and that suppresses the
 * root-level opengraph-image Next would otherwise inherit down — so every
 * share of a service page to LinkedIn or Slack, which is exactly where a
 * hiring-intent link gets passed around, rendered as a blank rectangle.
 *
 * Built to match the case-study cards rather than invent a second style: same
 * ink, same eyebrow rule, same URL footer.
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);

  const heading = service ? service.heading : site.name;
  const lede = service ? service.lede : "";
  const moduleId = service ? service.moduleId : "MODULE";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0b0d",
          padding: "68px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: 24, letterSpacing: 5, textTransform: "uppercase", color: "#5eead4" }}>
            {moduleId}
          </div>
          <div style={{ fontSize: 24, letterSpacing: 5, color: "#3a3f45", margin: "0 20px" }}>{"//"}</div>
          <div style={{ fontSize: 24, letterSpacing: 5, textTransform: "uppercase", color: "#8b9198" }}>
            {`${site.name} service`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: heading.length > 26 ? 76 : 96,
              lineHeight: 1,
              letterSpacing: -3,
              color: "#f2f3f5",
              maxWidth: 1000,
            }}
          >
            {heading}
          </div>
          <div style={{ marginTop: 26, fontSize: 32, lineHeight: 1.35, color: "#c3c8ce", maxWidth: 960 }}>
            {lede}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <div style={{ fontSize: 24, letterSpacing: 4, color: "#8b9198" }}>
            {`izzylabs.ca/services/${slug}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
