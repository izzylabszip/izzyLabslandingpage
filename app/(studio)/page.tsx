import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Projects } from "@/components/home/Projects";
import { Capabilities } from "@/components/home/Capabilities";
import { Contact } from "@/components/home/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Projects />
      <Capabilities />
      <Contact />
    </>
  );
}
