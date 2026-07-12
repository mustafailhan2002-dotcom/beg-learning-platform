type SubjectCardProps = {
  name: string;
  description: string;
  href?: string;
};

export function SubjectCard({ name, description }: SubjectCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 transition duration-300 hover:border-sky-400/40 hover:bg-slate-900">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-400">
        Subject
      </p>
      <h3 className="mt-3 text-xl font-semibold text-white">{name}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-400">{description}</p>
    </div>
  );
}
