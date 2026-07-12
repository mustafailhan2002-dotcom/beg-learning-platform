import Link from "next/link";

export default function ChemistryPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.16),transparent_24%),linear-gradient(135deg,#07111f_0%,#0f1f3d_55%,#07111f_100%)] px-6 py-16 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">Coming soon</p>
        <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Chemistry Studio</h1>
        <p className="mt-4 text-lg leading-8 text-slate-400">
          This subject hub is being prepared for the next release of the British Education Gateway platform.
        </p>
        <div className="mt-8">
          <Link href="/" className="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-white transition hover:border-amber-400 hover:text-amber-300">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
