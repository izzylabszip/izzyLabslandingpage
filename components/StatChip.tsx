export function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2.5 py-4 pr-6 pl-6 first:pl-0 md:pr-10 md:pl-10">
      <span className="label text-muted">{label}</span>
      <span className="font-mono text-sm uppercase tracking-[0.12em] text-fg">{value}</span>
    </div>
  );
}

export function StatRow({ items }: { items: readonly { label: string; value: string }[] }) {
  return (
    <div className="flex flex-wrap divide-x divide-hairline border-y border-hairline">
      {items.map((s) => (
        <StatChip key={s.label} label={s.label} value={s.value} />
      ))}
    </div>
  );
}
