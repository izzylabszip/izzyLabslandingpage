import Image from "next/image";
import type { AssetSlot } from "@/lib/projects-data";
import { cn } from "@/lib/cn";

const ASPECT: Record<AssetSlot["aspect"], string> = {
  phone: "aspect-[9/19.5]",
  wide: "aspect-[16/10]",
  tall: "aspect-[3/4]",
};

/**
 * A screenshot slot, filled or empty.
 *
 * When `src` is missing this renders a labelled frame carrying the spec for
 * the shot instead of quietly collapsing. That is the point: an empty slot on
 * a case study is a task, and a task that is invisible does not get done. It
 * is also the honest alternative to a stock photo or a rendered mockup of a
 * screen that does not exist.
 */
export function AssetFrame({ asset, className }: { asset: AssetSlot; className?: string }) {
  const ratio = ASPECT[asset.aspect];

  if (asset.src) {
    return (
      <figure className={cn("min-w-0", className)}>
        <div className={cn("relative overflow-hidden rounded-panel border border-hairline", ratio)}>
          <Image
            src={asset.src}
            alt={asset.alt ?? asset.caption}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
        <figcaption className="label mt-3 text-muted">{asset.caption}</figcaption>
      </figure>
    );
  }

  return (
    <figure className={cn("min-w-0", className)}>
      <div
        className={cn(
          "corner-ticks relative flex flex-col justify-between overflow-hidden rounded-panel border border-dashed border-hairline bg-elevated p-5",
          ratio,
        )}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-fine opacity-40" />
        <p className="label relative flex items-center gap-2 text-accent">
          <span className="motion-ambient h-1.5 w-1.5 animate-ticker rounded-full bg-accent" />
          Awaiting asset
        </p>
        <p className="relative text-[13px] leading-relaxed text-muted">{asset.spec}</p>
      </div>
      <figcaption className="label mt-3 text-muted">{asset.caption}</figcaption>
    </figure>
  );
}
