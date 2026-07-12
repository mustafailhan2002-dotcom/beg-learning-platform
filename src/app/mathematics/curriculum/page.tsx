import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ErrorState } from "@/components/mathematics/ErrorState";
import { MathematicsShell } from "@/components/mathematics/MathematicsShell";
import { getCurriculumData } from "@/lib/mathematics/supabase";

export default async function CurriculumPage() {
  try {
    const { subject, units, topicsByUnit } = await getCurriculumData();

    return (
      <ProtectedRoute>
        <MathematicsShell title="IGCSE Mathematics Curriculum" eyebrow="Curriculum architecture" description="A structured curriculum map aligned to the major IGCSE Mathematics domains and core number topics." activePath="/mathematics/curriculum">
          <div className="space-y-4">
            {!subject ? (
              <ErrorState title="Curriculum not found" description="The IGCSE Mathematics subject record has not been created in Supabase yet." />
            ) : null}
            {units.map((unit) => (
              <section key={unit.id} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">{unit.name}</h2>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{unit.description ?? "Core mathematics content for British curriculum learners."}</p>
                  </div>
                  <div className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-200">Core unit</div>
                </div>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {(topicsByUnit[unit.id] ?? []).map((topic) => (
                    <div key={topic.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <h3 className="font-semibold text-white">{topic.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-400">{topic.description ?? "Curriculum topic"}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </MathematicsShell>
      </ProtectedRoute>
    );
  } catch {
    return (
      <ProtectedRoute>
        <MathematicsShell title="IGCSE Mathematics Curriculum" eyebrow="Curriculum architecture" description="A structured curriculum map aligned to the major IGCSE Mathematics domains and core number topics." activePath="/mathematics/curriculum">
          <ErrorState title="Unable to load curriculum" description="Ensure the Supabase tables and seed data are available for this module." />
        </MathematicsShell>
      </ProtectedRoute>
    );
  }
}
