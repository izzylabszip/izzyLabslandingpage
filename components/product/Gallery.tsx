import type { Project } from "@/lib/projects-data";
import { ScanImage } from "@/components/ScanImage";
import { ScanReveal } from "@/components/ScanReveal";
import { cn } from "@/lib/cn";

type Props = {
  project: Project;
  count: number;
  aspect: "phone" | "wide" | "card" | "tall" | "square";
  className?: string;
  itemClassName?: string;
};

/** Renders real gallery assets when present, otherwise in-theme empty frames. */
export function Gallery({ project, count, aspect, className, itemClassName }: Props) {
  const items = Array.from({ length: count }, (_, i) => project.images.gallery?.[i]);
  return (
    <div className={cn("grid gap-5", className)}>
      {items.map((img, i) => (
        <ScanReveal key={i} delay={i * 0.1} amount={0.2}>
          <ScanImage
            src={img?.src}
            alt={img?.alt ?? `${project.name} screen ${i + 1}`}
            aspect={aspect}
            label={`${project.name} // screen_0${i + 1}`}
            className={itemClassName}
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        </ScanReveal>
      ))}
    </div>
  );
}
