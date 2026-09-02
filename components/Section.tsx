import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ScanReveal } from "./ScanReveal";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children: ReactNode;
  className?: string;
  /** Applied to the inner container. */
  innerClassName?: string;
};

export function Section({ id, eyebrow, title, lead, children, className, innerClassName }: Props) {
  return (
    <section id={id} className={cn("relative scroll-mt-14 py-20 md:py-28", className)}>
      <div className={cn("mx-auto max-w-6xl px-5 md:px-8", innerClassName)}>
        {eyebrow || title ? (
          <ScanReveal className="mb-12 md:mb-16">
            {eyebrow ? <p className="label text-accent">{eyebrow}</p> : null}
            {title ? (
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
            ) : null}
            {lead ? <p className="mt-4 max-w-2xl text-muted md:text-lg">{lead}</p> : null}
          </ScanReveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}
