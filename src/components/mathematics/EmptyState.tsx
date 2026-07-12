type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
};

export function EmptyState({ title, description, actionLabel }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-400">{description}</p>
      {actionLabel ? (
        <div className="mt-4 inline-flex rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-200">
          {actionLabel}
        </div>
      ) : null}
    </div>
  );
}
