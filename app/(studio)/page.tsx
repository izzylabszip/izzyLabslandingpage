import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Projects } from "@/components/home/Projects";
import { Capabilities } from "@/components/home/Capabilities";
import { Contact } from "@/components/home/Contact";
import { graph, workCollection, ldJson } from "@/lib/schema";

export default function HomePage() {
  /* Organization and WebSite come from the root layout. This adds only the
     thing that is specific to this page: the portfolio, as an ordered set. */
  const jsonLd = graph(workCollection());

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }}
      />
      <Hero />
      <Manifesto />
      <Projects />
      <Capabilities />
      <Contact />
    </>
  );
}
