import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ScanReveal } from "@/components/ScanReveal";

type Props = {
  id?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Centre the heading block, as Glow's landing page does. */
  center?: boolean;
};

/**
 * Section inside a product room. Uses the room's ink/line tokens so the same
 * component reads correctly on cream, bone, white or a dark band.
 */
export function RoomSection({
  id,
  eyebrow,
  title,
  lead,
  children,
  className,
  innerClassName,
  center,
}: Props) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-14 bg-room py-20 font-product text-ink md:py-28", className)}
    >
      <div className={cn("mx-auto max-w-6xl px-5 md:px-8", innerClassName)}>
        {eyebrow || title ? (
          <ScanReveal className={cn("mb-12 md:mb-16", center && "text-center")}>
            {eyebrow ? <p className="label text-accent">{eyebrow}</p> : null}
            {title ? (
              <h2
                className={cn(
                  "mt-5 text-3xl font-bold leading-[1.08] tracking-[-0.02em] md:text-5xl",
                  center && "mx-auto max-w-3xl",
                )}
              >
                {title}
              </h2>
            ) : null}
            {lead ? (
              <p
                className={cn(
                  "mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted",
                  center && "mx-auto",
                )}
              >
                {lead}
              </p>
            ) : null}
          </ScanReveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}
