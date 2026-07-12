type StatusBadgeProps = {
  status: string;
};

const styles: Record<string, string> = {
  draft: "bg-slate-700/70 text-slate-200",
  review: "bg-amber-500/15 text-amber-200",
  revision_required: "bg-rose-500/15 text-rose-200",
  approved: "bg-emerald-500/15 text-emerald-200",
  rejected: "bg-rose-600/15 text-rose-300",
  published: "bg-emerald-600/15 text-emerald-300",
  archived: "bg-slate-600/15 text-slate-300",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${styles[status] ?? styles.review}`}>{status.replace(/_/g, " ")}</span>;
}
