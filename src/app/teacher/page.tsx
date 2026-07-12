import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { StatusBadge } from "@/components/teacher/StatusBadge";
import { getTeacherReviewItems } from "@/lib/teacher/supabase";

export default async function TeacherPage() {
  const items = await getTeacherReviewItems();
  const pending = items.filter((item) => item.status === "review").length;
  const revisions = items.filter((item) => item.status === "revision_required").length;
  const approved = items.filter((item) => item.status === "approved").length;
  const published = items.filter((item) => item.status === "published").length;

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.16),transparent_24%),linear-gradient(135deg,#07111f_0%,#0f1f3d_55%,#07111f_100%)] px-4 py-6 text-slate-100 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">BEG Teacher Workspace</p>
              <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Teacher Review and Publishing Workflow</h1>
              <p className="mt-3 max-w-3xl text-base leading-8 text-slate-400">Review AI-generated mathematics content, manage revision notes, and publish approved lessons and questions.</p>
            </div>
            <div className="rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-200">{pending} awaiting review</div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Awaiting review", value: pending },
              { label: "Returned for revision", value: revisions },
              { label: "Approved this week", value: approved },
              { label: "Published content", value: published },
            ].map((card) => (
              <div key={card.label} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">{card.label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Recent review activity</h2>
                <Link href="/teacher/review" className="text-sm text-amber-300">Open queue</Link>
              </div>
              <div className="mt-6 space-y-3">
                {items.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3">
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.contentType} · {item.subject}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-xl font-semibold text-white">Quick links</h2>
              <div className="mt-6 space-y-3">
                {[
                  { title: "Review queue", href: "/teacher/review" },
                  { title: "Published content", href: "/teacher/published" },
                  { title: "Revision requests", href: "/teacher/revisions" },
                ].map((item) => (
                  <Link key={item.title} href={item.href} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-amber-400/40 hover:text-white">
                    <span>{item.title}</span>
                    <span className="text-amber-300">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
