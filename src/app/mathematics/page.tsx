import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MathematicsShell } from "@/components/mathematics/MathematicsShell";
import { StatCard } from "@/components/mathematics/StatCard";
import { lessons, questions, recentActivity, quickActions } from "@/lib/mathematics/data";

export default function MathematicsPage() {
  const publishedCount = lessons.filter((lesson) => lesson.status === "published").length;
  const awaitingReviewCount = questions.filter((question) => question.status === "review").length;

  return (
    <ProtectedRoute>
      <MathematicsShell
        title="BEG Mathematics Studio"
        eyebrow="Premium learning module"
        description="Coordinate curriculum design, lesson authoring, assessments and review workflows for IGCSE Mathematics."
        activePath="/mathematics"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total lessons" value={lessons.length.toString()} detail="Lesson assets in the library" accent="amber" />
          <StatCard label="Total questions" value={questions.length.toString()} detail="Assessment-ready question bank" accent="sky" />
          <StatCard label="Awaiting review" value={awaitingReviewCount.toString()} detail="Pending teacher approval" accent="emerald" />
          <StatCard label="Published content" value={publishedCount.toString()} detail="Live curriculum content" accent="amber" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Recent activity</h2>
              <span className="text-sm text-slate-400">Live updates</span>
            </div>
            <div className="mt-6 space-y-4">
              {recentActivity.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold text-white">Quick actions</h2>
            <div className="mt-6 space-y-3">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-amber-400/40 hover:text-white"
                >
                  <span>{action.title}</span>
                  <span className="text-amber-300">→</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </MathematicsShell>
    </ProtectedRoute>
  );
}
