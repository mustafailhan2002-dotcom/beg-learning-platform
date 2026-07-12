type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
};

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <article className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-amber-500/10">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-xl text-amber-300">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
    </article>
  );
}
