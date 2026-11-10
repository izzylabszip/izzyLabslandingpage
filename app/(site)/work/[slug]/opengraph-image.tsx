import { ImageResponse } from "next/og";
import { projectBySlug, projectSlugs } from "@/lib/projects-data";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Prerenders the four cards at build time. Without this the route is rendered
   on demand, which means every Slack, LinkedIn and X crawler that unfurls a
   case-study link runs Satori on the server for an image that never changes. */
export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

/* A per-slug alt would be better, but generateImageMetadata is the wrong tool
   for it — it exists to emit several images per route, and using it for one
   costs a nested [__metadata_id__] segment. The card's own text carries the
   detail; this is the fallback a screen reader gets. */
export const alt = `${site.name} case study`;

/**
 * Per-case-study share card, painted in the product's own palette.
 *
 * These exist because the case studies are meant to be shared — on LinkedIn,
 * in a proposal, in a reply to somebody asking whether we have built this
 * before. That is the moment the card is the whole advert, and four identical
 * grey blocks would waste it. The swatch row is the product's real brand
 * colours, the same ones the room renders in.
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0b0d",
            color: "#f2f3f5",
            fontSize: 64,
          }}
        >
          {site.name}
        </div>
      ),
      size,
    );
  }

  const accent = project.theme.accent;

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
          <div
            style={{
              fontSize: 24,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: accent,
            }}
          >
            {`Specimen_${project.index}`}
          </div>
          <div style={{ fontSize: 24, letterSpacing: 5, color: "#3a3f45", margin: "0 20px" }}>
            {"//"}
          </div>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#8b9198",
            }}
          >
            {`${site.name} case study`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1,
              letterSpacing: -3,
              color: "#f2f3f5",
            }}
          >
            {project.name}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 36,
              lineHeight: 1.3,
              color: "#c3c8ce",
              maxWidth: 960,
            }}
          >
            {project.searchTitle}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 26,
              lineHeight: 1.4,
              color: "#8b9198",
              maxWidth: 900,
            }}
          >
            {project.role}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            {project.theme.swatches.map((s) => (
              <div
                key={s.hex}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 999,
                  background: s.hex,
                  marginRight: 14,
                  /* Amit Blends' first swatch is near-black and would vanish
                     into the card. The ring is what makes a dark palette
                     legible on a dark card. */
                  border: "2px solid rgba(255, 255, 255, 0.16)",
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: 24, letterSpacing: 4, color: "#8b9198" }}>
            {`izzylabs.ca/work/${project.slug}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
