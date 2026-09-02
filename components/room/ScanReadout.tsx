"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Line = { key: string; value: string };

/**
 * Simulated face-scan telemetry. Lines resolve one by one once in view.
 * `tone="room"` renders on a product room's light surface.
 */
export function ScanReadout({ lines, tone = "studio" }: { lines: Line[]; tone?: "studio" | "room" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const room = tone === "room";

  const total = reduced ? 0 : 0.4 + lines.length * 0.22;

  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setDone(true), total * 1000 + 200);
    return () => window.clearTimeout(t);
  }, [inView, total]);

  return (
    <div
      ref={ref}
      className={cn(
        "corner-ticks relative p-6 md:p-7",
        room ? "card" : "panel",
      )}
    >
      <div className={cn("label flex items-center justify-between", room ? "text-ink-muted" : "text-muted")}>
        <span>Face scan {"//"} readout</span>
        <span className="flex items-center gap-2">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              done ? "bg-accent" : "animate-ticker bg-accent",
            )}
          />
          <span className="text-accent">{done ? "Complete" : inView ? "Analyzing" : "Standby"}</span>
        </span>
      </div>

      <div className={cn("mt-5 h-px w-full overflow-hidden", room ? "bg-line" : "bg-hairline")}>
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={inView ? { width: "100%" } : undefined}
          transition={{ duration: total, ease: "easeInOut" }}
        />
      </div>

      <ul className="mt-5 space-y-3 font-mono text-[11px] uppercase tracking-[0.14em]">
        {lines.map((l, i) => (
          <motion.li
            key={l.key}
            initial={{ opacity: 0, x: -6 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ delay: reduced ? 0 : 0.35 + i * 0.22, duration: 0.3 }}
            className="flex items-center justify-between gap-6"
          >
            <span className={room ? "text-ink-muted" : "text-muted"}>{l.key}</span>
            <span className={room ? "font-semibold text-ink" : "text-fg"}>{l.value}</span>
          </motion.li>
        ))}
      </ul>

      <p className={cn("mt-6 text-xs leading-relaxed", room ? "text-ink-muted" : "text-muted")}>
        Illustrative readout. Real scans run on-device first, then a Gemini pass.
      </p>
    </div>
  );
}
