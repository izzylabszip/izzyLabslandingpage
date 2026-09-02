import Link from "next/link";

/** Text wordmark with a scan-line sweeping through its underline. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="izzylabs home"
      className={`group relative inline-flex items-baseline pb-1.5 text-[17px] font-semibold tracking-tight ${className}`}
    >
      <span className="text-fg">izzy</span>
      <span className="text-accent">labs</span>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 block h-px w-full overflow-hidden bg-hairline"
      >
        <span className="motion-ambient block h-full w-full animate-wordmark bg-accent" />
      </span>
    </Link>
  );
}
