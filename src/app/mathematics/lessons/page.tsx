import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { EmptyState } from "@/components/mathematics/EmptyState";
import { ErrorState } from "@/components/mathematics/ErrorState";
import { MathematicsShell } from "@/components/mathematics/MathematicsShell";
import { getLessonsData } from "@/lib/mathematics/supabase";

export default async function LessonsPage() {
  try {
    const lessons = await getLessonsData();

    return (
      <ProtectedRoute>
        <MathematicsShell title="Lesson Management" eyebrow="Authoring workspace" description="Create and manage IGCSE Mathematics lessons with objectives, examples, practice, homework and teacher notes." activePath="/mathematics/lessons">
          {lessons.length > 0 ? (
            <div className="space-y-4">
              {lessons.map((lesson) => (
                <article key={lesson.id} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">{lesson.lesson_id}</p>
                      <h2 className="mt-2 text-xl font-semibold text-white">{lesson.title}</h2>
                    </div>
                    <div className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-sm font-semibold text-slate-200">{lesson.status}</div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Difficulty</p>
                      <p className="mt-2 text-sm text-slate-300">{lesson.difficulty}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Learning objectives</p>
                      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
                        {lesson.learning_objectives.map((objective) => (
                          <li key={objective}>{objective}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 xl:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <h3 className="font-semibold text-white">Explanation</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-400">{lesson.explanation}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <h3 className="font-semibold text-white">Worked examples</h3>
                      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
                        {lesson.worked_examples.map((example) => (
                          <li key={example}>{example}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <h3 className="font-semibold text-white">Practice questions</h3>
                      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
                        {lesson.practice_questions.map((question) => (
                          <li key={question}>{question}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <h3 className="font-semibold text-white">Homework</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-400">{lesson.homework}</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <h3 className="font-semibold text-white">Teacher notes</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{lesson.teacher_notes}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="No lessons yet" description="Launch your first IGCSE Mathematics lesson with objectives, examples and a mark scheme." actionLabel="Create lesson" />
          )}
        </MathematicsShell>
      </ProtectedRoute>
    );
  } catch {
    return (
      <ProtectedRoute>
        <MathematicsShell title="Lesson Management" eyebrow="Authoring workspace" description="Create and manage IGCSE Mathematics lessons with objectives, examples, practice, homework and teacher notes." activePath="/mathematics/lessons">
          <ErrorState title="Unable to load lessons" description="The lessons table may need the latest migration and seed data in Supabase." />
        </MathematicsShell>
      </ProtectedRoute>
    );
  }
}
