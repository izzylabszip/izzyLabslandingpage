import { cn } from "@/lib/cn";

export function StatusPill({
  status,
  label,
  className,
}: {
  status: "live" | "beta";
  label?: string;
  className?: string;
}) {
  const live = status === "live";
  return (
    <span
      className={cn(
        "label inline-flex items-center gap-2 rounded-full border bg-bg/75 px-2.5 py-1.5 backdrop-blur",
        live ? "border-live/40 text-live" : "border-beta/40 text-beta",
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          live ? "motion-ambient animate-pulse-dot bg-live" : "bg-beta",
        )}
      />
      {label ?? (live ? "Live" : "Beta")}
    </span>
  );
}
