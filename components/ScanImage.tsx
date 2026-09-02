"use client";

import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

function subscribePointer(onChange: () => void) {
  const mq = window.matchMedia(FINE_POINTER);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getPointer = () => window.matchMedia(FINE_POINTER).matches;
const getServerPointer = () => null;

type Aspect = "phone" | "wide" | "square" | "card" | "tall" | "featured";

type Props = {
  src?: string;
  alt: string;
  aspect?: Aspect;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Shown inside the empty frame when no asset is supplied yet. */
  label?: string;
};

type Phase = "idle" | "scanning" | "done";

const ASPECT: Record<Aspect, string> = {
  phone: "aspect-[9/19]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
  card: "aspect-[4/3]",
  tall: "aspect-[3/4]",
  /** 16:10 when stacked, fills the grid row height once the card goes two-column. */
  featured: "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]",
};

/**
 * Screenshot frame with the scan-pass interaction. Hover on fine pointers,
 * plays once when scrolled into view on touch devices, tap to replay.
 * Renders an in-theme empty frame when no asset exists yet.
 */
export function ScanImage({
  src,
  alt,
  aspect = "card",
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  label,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  /** null on the server and during hydration, then true for mouse/trackpad, false for touch. */
  const hoverable: boolean | null = useSyncExternalStore(
    subscribePointer,
    getPointer,
    getServerPointer,
  );
  const running = useRef(false);
  const timers = useRef<number[]>([]);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();

  const run = useCallback(() => {
    if (running.current || reduced) return;
    running.current = true;
    setPhase("scanning");
    timers.current = [
      window.setTimeout(() => setPhase("done"), 1000),
      window.setTimeout(() => {
        setPhase("idle");
        running.current = false;
      }, 2600),
    ];
  }, [reduced]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (inView && hoverable === false) run();
  }, [inView, hoverable, run]);

  return (
    <div
      ref={ref}
      onMouseEnter={hoverable ? run : undefined}
      onClick={hoverable === false ? run : undefined}
      className={cn(
        "group relative overflow-hidden rounded-panel border border-hairline bg-elevated",
        ASPECT[aspect],
        className,
      )}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <EmptyFrame label={label ?? alt} />
      )}

      {/* scan band */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0",
          phase === "scanning" && "animate-scan-x opacity-100",
        )}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, transparent 78%, var(--accent-soft) 96%, var(--accent) 100%)",
        }}
      />

      {/* reticle */}
      <div
        aria-hidden
        className={cn(
          "corner-ticks pointer-events-none absolute inset-3 transition-opacity duration-300",
          phase === "idle" ? "opacity-0" : "opacity-100",
        )}
      />

      {/* readout */}
      <div
        aria-live="polite"
        className={cn(
          "label pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-sm bg-bg/80 px-2 py-1.5 backdrop-blur transition-opacity duration-300",
          phase === "idle" ? "opacity-0" : "opacity-100",
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            phase === "done" ? "bg-live" : "animate-ticker bg-accent",
          )}
        />
        <span className={phase === "done" ? "text-live" : "text-accent-bright"}>
          {phase === "done" ? "Scan complete" : "Analyzing..."}
        </span>
      </div>
    </div>
  );
}

function EmptyFrame({ label }: { label: string }) {
  return (
    <div className="bg-grid-fine absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-soft),transparent_65%)] opacity-70" />
      <div className="corner-ticks absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 opacity-80" />
      <div className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-accent/70" />
      <div className="absolute left-1/2 top-1/2 h-5 w-px -translate-y-1/2 bg-accent/70" />
      <span className="label absolute left-3 top-3 text-muted">Awaiting asset</span>
      <span className="label absolute bottom-3 right-3 max-w-[70%] truncate text-muted/70">
        {label}
      </span>
    </div>
  );
}
