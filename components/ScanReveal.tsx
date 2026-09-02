"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  /** Seconds. */
  delay?: number;
  /** Seconds. */
  duration?: number;
  className?: string;
  /** Applied to the clipped inner wrapper (e.g. `h-full` for equal-height grids). */
  innerClassName?: string;
  /** Fraction of the element that must be visible before the scan runs. */
  amount?: number;
};

const EASE = [0.65, 0, 0.35, 1] as const;

/**
 * Signature reveal. A 2px accent line sweeps top to bottom while the content
 * is un-clipped behind it, with a faint glow trailing the line. Runs once.
 * Falls back to a plain fade when the user prefers reduced motion.
 */
export function ScanReveal({
  children,
  delay = 0,
  duration = 0.65,
  className,
  innerClassName,
  amount = 0.2,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <motion.div
        ref={ref}
        className={cn(className, innerClassName)}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 0.35, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        className={innerClassName}
        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
        animate={inView ? { opacity: 1, clipPath: "inset(0 0 0% 0)" } : undefined}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 z-10 h-0.5 bg-accent"
        style={{
          boxShadow: "0 0 14px 2px var(--accent), 0 0 42px 8px var(--accent-soft)",
        }}
        initial={{ top: "0%", opacity: 0 }}
        animate={inView ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } : undefined}
        transition={{
          duration: duration + 0.1,
          delay,
          ease: EASE,
          times: [0, 0.08, 0.88, 1],
        }}
      >
        <span className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-accent-soft to-transparent" />
      </motion.div>
    </div>
  );
}
