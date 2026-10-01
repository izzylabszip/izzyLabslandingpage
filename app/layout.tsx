import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  Instrument_Serif,
  Noto_Sans_Devanagari,
  Bebas_Neue,
} from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
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
      className={`${inter.variable} ${jetbrains.variable} ${jakarta.variable} ${instrument.variable} ${bebas.variable} ${devanagari.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-fg">
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
        <Nav />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
