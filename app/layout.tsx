import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  Instrument_Serif,
  Noto_Sans_Devanagari,
  Bebas_Neue,
  Cormorant_Garamond,
  DM_Sans,
} from "next/font/google";
import { site } from "@/lib/site";
import { graph, organization, website, ldJson } from "@/lib/schema";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

/** Product rooms use the type the real products use. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-instrument",
  display: "swap",
});

/** Amit Blends sets its display type in Bebas Neue, so its room does too. */
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

/** The studio's own type, from the v30 design: Cormorant for display, DM Sans for text. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm",
  display: "swap",
});

/** Lami Nepal's room carries real Nepali copy, which needs Devanagari glyphs. */
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  /* The home page had no canonical at all. Every other indexable page on the
     site declares one, and the root is the page most likely to be reached
     with a stray query string on it. */
  alternates: { canonical: site.url },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${jakarta.variable} ${instrument.variable} ${bebas.variable} ${devanagari.variable} ${cormorant.variable} ${dmSans.variable}`}
    >
      {/* No classes here. The home page is the v30 design with its own
          stylesheet and body classes; every other page gets its shell from
          app/(site)/layout.tsx. suppressHydrationWarning because the home
          markup adds body classes before React hydrates. */}
      <body suppressHydrationWarning>
        {/* The studio's identity, on every page. It lived nowhere before this:
            a crawler or an assistant reading izzylabs.ca had no machine-readable
            statement of what this is, where it is, or what it sells. Individual
            pages add their own Service and BreadcrumbList nodes, which reference
            this one by @id rather than restating it. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: ldJson(graph(organization(), website())),
          }}
        />
        {children}
      </body>
    </html>
  );
}
