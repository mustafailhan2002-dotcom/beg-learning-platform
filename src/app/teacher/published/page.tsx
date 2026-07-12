import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { StatusBadge } from "@/components/teacher/StatusBadge";
import { getTeacherReviewItems } from "@/lib/teacher/supabase";

export default async function TeacherPublishedPage() {
  const items = (await getTeacherReviewItems()).filter((item) => item.status === "published");

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.16),transparent_24%),linear-gradient(135deg,#07111f_0%,#0f1f3d_55%,#07111f_100%)] px-4 py-6 text-slate-100 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">Published Content</p>
              <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Live lessons and questions</h1>
            </div>
            <Link href="/teacher" className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:border-amber-400 hover:text-amber-300">Back to dashboard</Link>
          </div>

          <div className="mt-8 space-y-4">
            {items.length > 0 ? items.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">{item.contentType}</p>
                    <h2 className="mt-2 text-lg font-semibold text-white">{item.title}</h2>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
              </div>
            )) : <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/40 p-8 text-center text-slate-400">No published content yet.</div>}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
