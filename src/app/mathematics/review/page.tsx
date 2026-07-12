import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MathematicsShell } from "@/components/mathematics/MathematicsShell";
import { reviewQueue } from "@/lib/mathematics/data";

export default function ReviewPage() {
  return (
    <ProtectedRoute>
      <MathematicsShell
        title="Teacher Review"
        eyebrow="Review queue"
        description="Approve, reject or return content for revision while tracking status history and reviewer notes."
        activePath="/mathematics/review"
        actions={
          <div className="rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-200">
            {reviewQueue.length} items awaiting review
          </div>
        }
      >
        <div className="space-y-4">
          {reviewQueue.map((item) => (
            <article key={item.id} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">{item.id}</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm text-slate-400">{item.contentType} • Reviewer: {item.reviewer}</p>
                </div>
                <div className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-sm font-semibold text-slate-200">
                  {item.status}
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <h3 className="font-semibold text-white">Review notes</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{item.notes}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <h3 className="font-semibold text-white">Actions</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Approve', 'Reject', 'Return for revision'].map((action) => (
                      <span key={action} className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <h3 className="font-semibold text-white">Status history</h3>
                <ul className="mt-3 space-y-2">
                  {item.history.map((entry) => (
                    <li key={entry.label} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-300">
                      <span>{entry.label}</span>
                      <span className="text-slate-400">{entry.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </MathematicsShell>
    </ProtectedRoute>
  );
}
