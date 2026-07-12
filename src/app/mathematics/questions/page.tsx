import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MathematicsShell } from "@/components/mathematics/MathematicsShell";
import { EmptyState } from "@/components/mathematics/EmptyState";
import { questions } from "@/lib/mathematics/data";

export default function QuestionsPage() {
  return (
    <ProtectedRoute>
      <MathematicsShell
        title="Question Bank"
        eyebrow="Assessment studio"
        description="Maintain a structured bank of exam-style questions with solutions, marks, difficulty and Bloom alignment."
        activePath="/mathematics/questions"
      >
        {questions.length > 0 ? (
          <div className="space-y-4">
            {questions.map((question) => (
              <article key={question.id} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">{question.id}</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">{question.text}</h2>
                  </div>
                  <div className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-sm font-semibold text-slate-200">
                    {question.status}
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Marks</p>
                    <p className="mt-2 text-sm text-slate-300">{question.marks}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Difficulty</p>
                    <p className="mt-2 text-sm text-slate-300">{question.difficulty}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Topic</p>
                    <p className="mt-2 text-sm text-slate-300">{question.topic}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Bloom</p>
                    <p className="mt-2 text-sm text-slate-300">{question.bloomLevel}</p>
                  </div>
                </div>

                {question.options ? (
                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {question.options.map((option) => (
                      <div key={option} className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
                        {option}
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <h3 className="font-semibold text-white">Correct answer</h3>
                    <p className="mt-2 text-sm text-slate-300">{question.correctAnswer}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <h3 className="font-semibold text-white">Explanation</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{question.explanation}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="No questions yet" description="Add your first exam-style question with marks, topic tags, and a full explanation." actionLabel="Add question" />
        )}
      </MathematicsShell>
    </ProtectedRoute>
  );
}
