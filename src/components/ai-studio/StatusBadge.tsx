type StatusBadgeProps = {
  status: string;
};

const styles: Record<string, string> = {
  generating: "border-sky-400/30 bg-sky-500/10 text-sky-200",
  draft: "border-slate-600 bg-slate-800 text-slate-200",
  review: "border-amber-400/30 bg-amber-500/10 text-amber-200",
  approved: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
  rejected: "border-rose-400/30 bg-rose-500/10 text-rose-200",
  published: "border-emerald-500/30 bg-emerald-600/10 text-emerald-100",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`rounded-full border px-3 py-1 text-sm font-semibold capitalize ${styles[status] ?? styles.draft}`}>{status}</span>;
}
