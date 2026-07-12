type ErrorStateProps = {
  title?: string;
  description?: string;
};

export function ErrorState({ title = "We hit a snag", description = "The mathematics workspace could not be loaded right now." }: ErrorStateProps) {
  return (
    <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-8 text-center">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-rose-100">{description}</p>
    </div>
  );
}
