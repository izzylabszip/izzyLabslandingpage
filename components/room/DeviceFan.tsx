"use client";

import { useRef, type CSSProperties, type PointerEvent } from "react";

/** Real product screens fanned in phone frames; they turn toward the pointer on fine-pointer devices. */
export function DeviceFan({ screens, label }: { screens: string[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--tx", (((event.clientX - rect.left) / rect.width - 0.5) * 2).toFixed(3));
    el.style.setProperty("--ty", (((event.clientY - rect.top) / rect.height - 0.5) * 2).toFixed(3));
  }

  function onLeave() {
    ref.current?.style.setProperty("--tx", "0");
    ref.current?.style.setProperty("--ty", "0");
  }

  const count = screens.length;
  return (
    <div
      ref={ref}
      className="device-fan"
      role="img"
      aria-label={label}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {screens.map((src, index) => {
        const offset = index - (count - 1) / 2;
        const style = {
          "--i": offset,
          "--a": Math.abs(offset),
          zIndex: 10 - Math.round(Math.abs(offset) * 2),
        } as CSSProperties;
        return (
          <div key={src} className="device-fan-phone" style={style}>
            {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized static screenshots, no optimisation needed */}
            <img src={src} alt="" width={390} height={844} decoding="async" fetchPriority={index === 1 ? "high" : "auto"} />
          </div>
        );
      })}
    </div>
  );
}
