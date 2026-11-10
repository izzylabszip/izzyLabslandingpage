import { readFileSync } from "node:fs";
import path from "node:path";
import Script from "next/script";
import { graph, workCollection, ldJson } from "@/lib/schema";

/* The home page is the v30 studio design, served as written: its markup,
   stylesheets and scripts live in home.html and public/studio. It is a
   hash-routed page (work, what we do, about, news, the CareNearby case), so
   it is rendered once as static HTML and its own scripts take over. Read at
   build time; the route is static. */
const markup = readFileSync(path.join(process.cwd(), "app/(home)/home.html"), "utf8");

export default function HomePage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&family=DM+Sans:wght@400;500;600&display=swap"
        precedence="studio"
      />
      <link rel="stylesheet" href="/studio/styles.css" precedence="studio" />
      <link rel="stylesheet" href="/studio/care.css" precedence="studio" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(graph(workCollection())) }}
      />
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: markup }} />
      <Script src="/studio/script.js" strategy="afterInteractive" />
      <Script src="/studio/care.js" strategy="afterInteractive" />
    </>
  );
}
