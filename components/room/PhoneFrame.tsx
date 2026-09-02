import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** CSS device frame. Cheap, sharp at any size, and needs no screenshot asset. */
export function PhoneFrame({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[300px]", className)}>
      <div className="relative rounded-[38px] border border-black/10 bg-[#111] p-2.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]">
        <div className="relative overflow-hidden rounded-[30px] bg-surface">
          <div className="flex items-center justify-between px-5 pb-1 pt-3">
            <span className="font-mono text-[9px] font-medium text-ink">9:41</span>
            <span className="h-4 w-16 rounded-full bg-[#111]" />
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-ink/30" />
              <span className="h-1.5 w-1.5 rounded-full bg-ink/30" />
              <span className="h-1.5 w-3 rounded-[2px] border border-ink/30" />
            </span>
          </div>
          {children}
        </div>
      </div>
      {label ? (
        <p className="label mt-4 text-center text-ink-muted">{label}</p>
      ) : null}
    </div>
  );
}
