export function LoadingState({ label = "Loading mathematics content" }: { label?: string }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
      <p className="mt-4 text-sm font-semibold text-slate-200">{label}</p>
      <p className="mt-2 text-sm text-slate-400">Fetching the latest curriculum data from Supabase.</p>
    </div>
  );
}
