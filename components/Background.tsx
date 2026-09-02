/** Fixed studio backdrop: faint grid, grain and a teal wash at the top. CSS only. */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-grid" />
      <div className="noise absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,var(--accent-soft),transparent_70%)]" />
    </div>
  );
}
