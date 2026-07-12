import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ReviewCard } from "@/components/teacher/ReviewCard";
import { getTeacherReviewItems } from "@/lib/teacher/supabase";

export default async function TeacherReviewPage() {
  const items = await getTeacherReviewItems();

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.16),transparent_24%),linear-gradient(135deg,#07111f_0%,#0f1f3d_55%,#07111f_100%)] px-4 py-6 text-slate-100 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">Teacher Review Queue</p>
              <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Review and moderate content</h1>
              <p className="mt-3 max-w-3xl text-base leading-8 text-slate-400">Filter lessons and questions by status, topic, and qualification before approving or returning them for revision.</p>
            </div>
            <Link href="/teacher" className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:border-amber-400 hover:text-amber-300">Back to dashboard</Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Content type", value: "Lesson / Question" },
              { label: "Subject", value: "Mathematics" },
              { label: "Qualification", value: "Cambridge IGCSE" },
              { label: "Status", value: "Review / Revision" },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-900/70 px-4 py-4 text-sm text-slate-400">
                <p className="text-slate-500">{item.label}</p>
                <p className="mt-2 font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {items.map((item) => (
              <ReviewCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
