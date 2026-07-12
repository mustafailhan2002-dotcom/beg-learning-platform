import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ErrorState } from "@/components/mathematics/ErrorState";
import { LoadingState } from "@/components/mathematics/LoadingState";
import { getRoleLabel, getUserRole } from "@/lib/auth";
import { getMathematicsDashboardData } from "@/lib/mathematics/supabase";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = getUserRole(user);

  try {
    const { lessons, questions, reviews, canManage } = await getMathematicsDashboardData();

    return (
      <ProtectedRoute>
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.16),transparent_24%),linear-gradient(135deg,#07111f_0%,#0f1f3d_55%,#07111f_100%)] px-6 py-16 text-slate-100 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">BEG Dashboard</p>
                <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Welcome back, {user?.email ?? "Learner"}</h1>
                <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-400">
                  Your role: <span className="font-semibold text-amber-300">{getRoleLabel(role)}</span>
                </p>
              </div>
              <Link href="/" className="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-white transition hover:border-amber-400 hover:text-amber-300">
                Back to home
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Lessons", value: lessons.length.toString(), detail: canManage ? "Editable content" : "Published lessons" },
                { label: "Questions", value: questions.length.toString(), detail: canManage ? "Question bank items" : "Published questions" },
                { label: "Reviews", value: reviews.length.toString(), detail: "Pending review activity" },
                { label: "Access", value: canManage ? "Teacher" : "Student", detail: canManage ? "Full authoring access" : "Read-only published content" },
              ].map((card) => (
                <div key={card.label} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">{card.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{card.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                <h2 className="text-xl font-semibold text-white">Quick access</h2>
                <div className="mt-6 space-y-3">
                  {[
                    { title: "Open Mathematics Studio", href: "/mathematics" },
                    { title: "Explore curriculum", href: "/mathematics/curriculum" },
                    { title: "Review teacher queue", href: "/mathematics/review" },
                  ].map((item) => (
                    <Link key={item.title} href={item.href} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-amber-400/40 hover:text-white">
                      <span>{item.title}</span>
                      <span className="text-amber-300">→</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                <h2 className="text-xl font-semibold text-white">Studio status</h2>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {canManage ? "You can create, review, and publish new content." : "You can read published lessons and questions from the mathematics studio."}
                </p>
              </div>
            </div>
          </div>
        </main>
      </ProtectedRoute>
    );
  } catch {
    return (
      <ProtectedRoute>
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.16),transparent_24%),linear-gradient(135deg,#07111f_0%,#0f1f3d_55%,#07111f_100%)] px-6 py-16 text-slate-100 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur">
            <ErrorState title="Unable to load dashboard data" description="Check your Supabase connection and confirm the migration has been applied." />
          </div>
        </main>
      </ProtectedRoute>
    );
  }
}
