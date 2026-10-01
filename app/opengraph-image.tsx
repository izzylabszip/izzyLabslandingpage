import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/**
 * The site's share card.
 *
 * The root layout has declared `twitter: { card: "summary_large_image" }` since
 * the site went up, with no image anywhere to satisfy it. A large-image card
 * with no image does not fall back gracefully — LinkedIn, Slack and X render a
 * bare grey block with a URL under it, which is the version of this site most
 * people saw first, because a link is shared more often than it is typed.
 */
export default function Image() {
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
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#3fe0c5",
              marginRight: 18,
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#8b9198",
            }}
          >
            {`${site.name} // ${site.location}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.04,
              letterSpacing: -2,
              color: "#f2f3f5",
              maxWidth: 940,
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 30,
              lineHeight: 1.45,
              color: "#8b9198",
              maxWidth: 900,
            }}
          >
            {"QA-driven engineering studio. Full-stack, mobile and AI products, tested before they ship."}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ height: 3, width: 96, background: "#3fe0c5", marginRight: 28 }} />
          <div style={{ fontSize: 24, letterSpacing: 4, color: "#8b9198" }}>
            izzylabs.ca
          </div>
        </div>
      </div>
    ),
    size,
  );
}
