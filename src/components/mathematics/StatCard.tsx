type StatCardProps = {
  label: string;
  value: string;
  detail: string;
  accent?: "amber" | "emerald" | "sky";
};

const accentStyles = {
  amber: "border-amber-400/30 bg-amber-500/10 text-amber-200",
  emerald: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
  sky: "border-sky-400/30 bg-sky-500/10 text-sky-200",
};

export function StatCard({ label, value, detail, accent = "amber" }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
      <div className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${accentStyles[accent]}`}>
        {label}
      </div>
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-7 text-slate-400">{detail}</p>
    </div>
  );
}
