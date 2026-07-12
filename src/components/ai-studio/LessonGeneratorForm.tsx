"use client";

import { useState, type FormEvent } from "react";
import type { GeneratedLesson, LessonGenerationPayload } from "@/lib/ai-studio/types";

const initialState: LessonGenerationPayload = {
  subject: "IGCSE Mathematics",
  qualification: "Cambridge IGCSE",
  level: "Foundation",
  unit: "Number",
  topic: "Fractions",
  duration: "60 minutes",
  ageRange: "14-16",
  language: "English",
  difficulty: "Foundation",
  workedExamples: 2,
  practiceQuestions: 4,
  homeworkQuestions: 3,
};

export function LessonGeneratorForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lesson, setLesson] = useState<GeneratedLesson | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/ai/generate-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error ?? "Generation failed");
      }

      setLesson(payload.data as GeneratedLesson);
      setMessage("Lesson generated successfully. You can now save or review it.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to generate lesson");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-300">
            <span>Subject</span>
            <input value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Qualification</span>
            <select value={form.qualification} onChange={(event) => setForm({ ...form, qualification: event.target.value as LessonGenerationPayload["qualification"] })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white">
              <option>Cambridge IGCSE</option>
              <option>Pearson Edexcel</option>
              <option>OxfordAQA</option>
            </select>
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Level</span>
            <select value={form.level} onChange={(event) => setForm({ ...form, level: event.target.value as LessonGenerationPayload["level"] })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white">
              <option>Foundation</option>
              <option>Higher</option>
            </select>
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Unit</span>
            <input value={form.unit} onChange={(event) => setForm({ ...form, unit: event.target.value })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Topic</span>
            <input value={form.topic} onChange={(event) => setForm({ ...form, topic: event.target.value })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Lesson duration</span>
            <input value={form.duration} onChange={(event) => setForm({ ...form, duration: event.target.value })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Student age range</span>
            <input value={form.ageRange} onChange={(event) => setForm({ ...form, ageRange: event.target.value })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Language</span>
            <input value={form.language} onChange={(event) => setForm({ ...form, language: event.target.value })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Difficulty</span>
            <input value={form.difficulty} onChange={(event) => setForm({ ...form, difficulty: event.target.value })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Worked examples</span>
            <input type="number" min="1" value={form.workedExamples} onChange={(event) => setForm({ ...form, workedExamples: Number(event.target.value) })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Practice questions</span>
            <input type="number" min="1" value={form.practiceQuestions} onChange={(event) => setForm({ ...form, practiceQuestions: Number(event.target.value) })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Homework questions</span>
            <input type="number" min="1" value={form.homeworkQuestions} onChange={(event) => setForm({ ...form, homeworkQuestions: Number(event.target.value) })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white" />
          </label>
        </div>

        <button type="submit" disabled={loading} className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70">
          {loading ? "Generating…" : "Generate lesson"}
        </button>
        {message ? <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</p> : null}
        {error ? <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}
      </form>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        {loading ? (
          <div className="space-y-4">
            <div className="h-4 w-32 animate-pulse rounded-full bg-slate-800" />
            <div className="h-4 w-full animate-pulse rounded-full bg-slate-800" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-800" />
            <div className="h-4 w-4/5 animate-pulse rounded-full bg-slate-800" />
          </div>
        ) : lesson ? (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">{lesson.lessonId}</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{lesson.title}</h2>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <h3 className="font-semibold text-white">Learning objectives</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
                {lesson.learningObjectives.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <h3 className="font-semibold text-white">Teacher explanation</h3>
              <p className="mt-2 text-sm leading-7 text-slate-400">{lesson.teacherExplanation}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <h3 className="font-semibold text-white">Key vocabulary</h3>
              <p className="mt-2 text-sm text-slate-300">{lesson.keyVocabulary.join(", ")}</p>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/40 p-8 text-center">
            <h3 className="text-lg font-semibold text-white">Ready to generate</h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">Fill out the lesson brief and generate a complete teaching sequence for your class.</p>
          </div>
        )}
      </div>
    </div>
  );
}
