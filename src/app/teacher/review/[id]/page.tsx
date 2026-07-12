import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { StatusBadge } from "@/components/teacher/StatusBadge";
import { updateReviewStatus } from "@/lib/teacher/supabase";
import { getTeacherReviewItemById } from "@/lib/teacher/supabase";

export default async function TeacherReviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getTeacherReviewItemById(id);

  async function handleAction(formData: FormData) {
    "use server";
    const notes = String(formData.get("notes") ?? "");
    const action = String(formData.get("action") ?? "review");
    if (!item) return;
    await updateReviewStatus({
      contentId: item.contentId,
      contentType: item.contentType,
      previousStatus: item.status,
      newStatus: action === "revision" ? "revision_required" : action === "approve" ? "approved" : action === "publish" ? "published" : action === "reject" ? "rejected" : "review",
      notes: notes || undefined,
    });
  }

  if (!item) {
    return (
      <ProtectedRoute>
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.16),transparent_24%),linear-gradient(135deg,#07111f_0%,#0f1f3d_55%,#07111f_100%)] px-4 py-6 text-slate-100 sm:px-6 lg:px-8 lg:py-10">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-6">Item not found.</div>
        </main>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.16),transparent_24%),linear-gradient(135deg,#07111f_0%,#0f1f3d_55%,#07111f_100%)] px-4 py-6 text-slate-100 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">Review detail</p>
              <h1 className="mt-3 text-3xl font-semibold text-white">{item.title}</h1>
            </div>
            <StatusBadge status={item.status} />
          </div>

          <form action={handleAction} className="mt-8 space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-xl font-semibold text-white">Content summary</h2>
              <div className="mt-4 grid gap-3 text-sm text-slate-400 sm:grid-cols-2">
                <div><span className="text-slate-500">Type:</span> {item.contentType}</div>
                <div><span className="text-slate-500">Subject:</span> {item.subject}</div>
                <div><span className="text-slate-500">Topic:</span> {item.topic}</div>
                <div><span className="text-slate-500">Qualification:</span> {item.qualification}</div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-xl font-semibold text-white">Review notes</h2>
              <textarea name="notes" rows={5} className="mt-4 w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white" placeholder="Add notes for the reviewer or content creator" />
            </div>

            <div className="flex flex-wrap gap-3">
              <button formAction={handleAction} type="submit" name="action" value="approve" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">Approve</button>
              <button formAction={handleAction} type="submit" name="action" value="reject" className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-slate-950">Reject</button>
              <button formAction={handleAction} type="submit" name="action" value="revision" className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950">Return for revision</button>
              <button formAction={handleAction} type="submit" name="action" value="publish" className="rounded-full border border-amber-400/30 px-4 py-2 text-sm font-semibold text-amber-200">Publish</button>
              <Link href="/teacher/review" className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-white">Back</Link>
            </div>
          </form>
        </div>
      </main>
    </ProtectedRoute>
  );
}
