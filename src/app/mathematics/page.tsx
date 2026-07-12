import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PlatformHeader } from "@/components/landing/PlatformHeader";
import { ErrorState } from "@/components/mathematics/ErrorState";
import { MathematicsShell } from "@/components/mathematics/MathematicsShell";
import { StatCard } from "@/components/mathematics/StatCard";
import { getMathematicsDashboardData } from "@/lib/mathematics/supabase";

export default async function MathematicsPage() {
  try {
    const { lessons, questions, canManage } = await getMathematicsDashboardData();
    const publishedCount = lessons.filter((lesson) => lesson.status === "published").length;
    const awaitingReviewCount = questions.filter((question) => question.status === "review").length;
    const recentItems = [
      ...lessons.slice(0, 2).map((lesson) => ({ title: `Lesson updated: ${lesson.title}`, detail: `${lesson.status} • ${lesson.difficulty}` })),
      ...questions.slice(0, 2).map((question) => ({ title: `Question updated: ${question.question_text}`, detail: `${question.status} • ${question.topic_id ?? "General"}` })),
    ].slice(0, 4);

    return (
      <ProtectedRoute>
        <MathematicsShell title="BEG Mathematics Studio" eyebrow="Premium learning module" description="Coordinate curriculum design, lesson authoring, assessments and review workflows for IGCSE Mathematics." activePath="/mathematics">
          <PlatformHeader activePath="/mathematics" />
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
                {recentItems.length > 0 ? recentItems.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{item.detail}</p>
                  </div>
                )) : <p className="text-sm text-slate-400">No recent activity has been recorded yet.</p>}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-xl font-semibold text-white">Quick actions</h2>
              <div className="mt-6 space-y-3">
                {[
                  { title: "Create lesson", href: "/mathematics/lessons" },
                  { title: "Add question", href: "/mathematics/questions" },
                  { title: "Open review queue", href: "/mathematics/review" },
                ].map((action) => (
                  <Link key={action.title} href={action.href} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-amber-400/40 hover:text-white">
                    <span>{action.title}</span>
                    <span className="text-amber-300">→</span>
                  </Link>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-100">
                {canManage ? "You can manage the mathematics curriculum and review workflows." : "You are viewing the published mathematics content for learners."}
              </div>
            </section>
          </div>
        </MathematicsShell>
      </ProtectedRoute>
    );
  } catch {
    return (
      <ProtectedRoute>
        <MathematicsShell title="BEG Mathematics Studio" eyebrow="Premium learning module" description="Coordinate curriculum design, lesson authoring, assessments and review workflows for IGCSE Mathematics." activePath="/mathematics">
          <ErrorState title="Unable to load mathematics studio" description="Confirm the Supabase migration and seed data have been applied." />
        </MathematicsShell>
      </ProtectedRoute>
    );
  }
}
