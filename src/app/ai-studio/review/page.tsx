import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AiStudioShell } from "@/components/ai-studio/AiStudioShell";
import { StatusBadge } from "@/components/ai-studio/StatusBadge";

const reviewItems = [
  { title: "Lesson: Ratio and proportion", status: "review" as const, note: "Check the worked example sequence and ensure the language is age-appropriate." },
  { title: "Question set: Simultaneous equations", status: "draft" as const, note: "Add an additional higher-tier challenge question before publishing." },
];

export default function ReviewPage() {
  return (
    <ProtectedRoute>
      <AiStudioShell title="Review Queue" eyebrow="Teacher moderation" description="Review generated assets before they are published to learners." activePath="/ai-studio/review">
        <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          {reviewItems.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <StatusBadge status={item.status} />
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.note}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button className="rounded-full border border-emerald-400/40 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/10">Approve</button>
                <button className="rounded-full border border-amber-400/40 px-4 py-2 text-sm font-semibold text-amber-200 transition hover:bg-amber-500/10">Request edits</button>
                <button className="rounded-full border border-rose-400/40 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/10">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </AiStudioShell>
    </ProtectedRoute>
  );
}
