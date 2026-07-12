import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AiStudioShell } from "@/components/ai-studio/AiStudioShell";
import { StatusBadge } from "@/components/ai-studio/StatusBadge";

const stats = [
  { label: "Total generated lessons", value: "12", detail: "Lesson assets currently available" },
  { label: "Total generated questions", value: "84", detail: "Exam-style questions in the studio" },
  { label: "Awaiting teacher review", value: "7", detail: "Ready for review" },
  { label: "Published content", value: "38", detail: "Live across the curriculum" },
];

const recentGenerations = [
  { title: "Fractions lesson drafted", status: "review", detail: "Created 60 minutes ago" },
  { title: "Question set generated", status: "draft", detail: "Created 2 hours ago" },
  { title: "Revision cards published", status: "published", detail: "Created yesterday" },
];

export default function AiStudioPage() {
  return (
    <ProtectedRoute>
      <AiStudioShell title="AI Content Studio" eyebrow="Generative workspace" description="Generate high-quality lesson plans and question banks for the British curriculum with teacher review built in." activePath="/ai-studio">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Recent generations</h2>
              <Link href="/ai-studio/history" className="text-sm text-amber-300">View history</Link>
            </div>
            <div className="mt-6 space-y-4">
              {recentGenerations.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-white">{item.title}</p>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold text-white">Quick actions</h2>
            <div className="mt-6 space-y-3">
              {[
                { title: "Generate a lesson", href: "/ai-studio/lesson-generator" },
                { title: "Generate questions", href: "/ai-studio/question-generator" },
                { title: "Review pending items", href: "/ai-studio/review" },
              ].map((item) => (
                <Link key={item.title} href={item.href} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-amber-400/40 hover:text-white">
                  <span>{item.title}</span>
                  <span className="text-amber-300">→</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </AiStudioShell>
    </ProtectedRoute>
  );
}
