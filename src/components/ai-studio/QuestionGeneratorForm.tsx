"use client";

import { useState, type FormEvent } from "react";
import type { GeneratedQuestion, QuestionGenerationPayload } from "@/lib/ai-studio/types";

const initialState: QuestionGenerationPayload = {
  subject: "IGCSE Mathematics",
  qualification: "Cambridge IGCSE",
  topic: "Algebra",
  difficulty: "Foundation",
  questionType: "Short response",
  numberOfQuestions: 5,
  marks: 2,
  commandWord: "Explain",
  bloomLevel: "Apply",
  calculator: false,
};

export function QuestionGeneratorForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/ai/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error ?? "Generation failed");
      }

      setQuestions(payload.data as GeneratedQuestion[]);
      setMessage("Question set generated successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to generate questions");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-300">
            <span>Subject</span>
            <input value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Topic</span>
            <input value={form.topic} onChange={(event) => setForm({ ...form, topic: event.target.value })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Difficulty</span>
            <input value={form.difficulty} onChange={(event) => setForm({ ...form, difficulty: event.target.value })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Number of questions</span>
            <input type="number" min="1" value={form.numberOfQuestions} onChange={(event) => setForm({ ...form, numberOfQuestions: Number(event.target.value) })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Question type</span>
            <input value={form.questionType} onChange={(event) => setForm({ ...form, questionType: event.target.value })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Marks</span>
            <input type="number" min="1" value={form.marks} onChange={(event) => setForm({ ...form, marks: Number(event.target.value) })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Command word</span>
            <input value={form.commandWord} onChange={(event) => setForm({ ...form, commandWord: event.target.value })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white" />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Bloom level</span>
            <input value={form.bloomLevel} onChange={(event) => setForm({ ...form, bloomLevel: event.target.value })} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-white" />
          </label>
        </div>
        <label className="flex items-center gap-3 text-sm text-slate-300">
          <input type="checkbox" checked={form.calculator} onChange={(event) => setForm({ ...form, calculator: event.target.checked })} className="h-4 w-4 rounded border-slate-700 bg-slate-950" />
          Calculator allowed
        </label>

        <button type="submit" disabled={loading} className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70">
          {loading ? "Generating…" : "Generate questions"}
        </button>
        {message ? <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</p> : null}
        {error ? <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}
      </form>

      <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        {loading ? (
          <div className="space-y-3">
            <div className="h-4 w-28 animate-pulse rounded-full bg-slate-800" />
            <div className="h-4 w-full animate-pulse rounded-full bg-slate-800" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-800" />
          </div>
        ) : questions.length > 0 ? (
          questions.map((question, index) => (
            <div key={question.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">Question {index + 1}</p>
              <p className="mt-2 text-sm leading-7 text-slate-200">{question.questionText}</p>
              <p className="mt-3 text-sm text-slate-400">Answer: {question.correctAnswer}</p>
              {question.fullExplanation ? <p className="mt-2 text-sm text-slate-400">Explanation: {question.fullExplanation}</p> : null}
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/40 p-8 text-center">
            <h3 className="text-lg font-semibold text-white">Awaiting your first set</h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">Generate a question bank and it will appear here for review and publication.</p>
          </div>
        )}
      </div>
    </div>
  );
}
