import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AiStudioShell } from "@/components/ai-studio/AiStudioShell";
import { StatusBadge } from "@/components/ai-studio/StatusBadge";

const historyItems = [
  { title: "Fractions lesson plan", status: "review" as const, detail: "Generated 2 hours ago" },
  { title: "Algebra question set", status: "draft" as const, detail: "Generated yesterday" },
  { title: "Quadratic revision cards", status: "published" as const, detail: "Published 3 days ago" },
];

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <AiStudioShell title="Generation History" eyebrow="Audit trail" description="Review your recent AI-assisted content creations and their workflow state." activePath="/ai-studio/history">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Recent items</h2>
            <Link href="/ai-studio" className="text-sm text-amber-300">Back to studio</Link>
          </div>
          <div className="mt-6 space-y-4">
            {historyItems.map((item) => (
              <div key={item.title} className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
                </div>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        </div>
      </AiStudioShell>
    </ProtectedRoute>
  );
}
