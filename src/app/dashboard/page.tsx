import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getRoleLabel, getUserRole } from "@/lib/auth";

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = getUserRole(user);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.16),transparent_24%),linear-gradient(135deg,#07111f_0%,#0f1f3d_55%,#07111f_100%)] px-6 py-16 text-slate-100 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">
                BEG Dashboard
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Welcome back, {user?.email ?? "Learner"}
              </h1>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-400">
                Your role: <span className="font-semibold text-amber-300">{getRoleLabel(role)}</span>
              </p>
            </div>
            <Link
              href="/"
              className="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-white transition hover:border-amber-400 hover:text-amber-300"
            >
              Back to home
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "Course Library",
                description: "Access curated British curriculum resources aligned to your learning journey.",
              },
              {
                title: "Assessment Studio",
                description: "Create and review AI-generated questions, answers, and lesson plans.",
              },
              {
                title: "Reporting Center",
                description: "Track outcomes, progress, and institutional performance insights.",
              },
            ].map((card) => (
              <div key={card.title} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                <h2 className="text-xl font-semibold text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-400">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
