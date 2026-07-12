import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { GenerationJobRecord, GeneratedLesson, GeneratedQuestion } from "@/lib/ai-studio/types";

export async function saveGenerationJob(kind: "lesson" | "questions", job: Partial<GenerationJobRecord>, output: GeneratedLesson | GeneratedQuestion[] | null, errorMessage?: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("ai_generation_jobs").insert({
    kind,
    status: job.status ?? "draft",
    prompt_metadata: job.prompt_metadata ?? {},
    output_json: output as Record<string, unknown> | null,
    error_message: errorMessage ?? null,
    model_name: job.model_name ?? "mock-provider",
    token_usage: job.token_usage ?? 0,
    user_id: job.user_id ?? null,
    subject_id: job.subject_id ?? null,
    topic_id: job.topic_id ?? null,
  }).select().single();

  if (error) {
    throw error;
  }

  return data as GenerationJobRecord;
}

export async function saveGeneratedLesson(lesson: GeneratedLesson, jobId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("ai_generated_lessons").insert({
    id: crypto.randomUUID(),
    job_id: jobId,
    title: lesson.title,
    lesson_id: lesson.lessonId,
    subject: lesson.subject,
    topic: lesson.topic,
    qualification: lesson.qualification,
    level: lesson.level,
    duration: lesson.duration,
    output_json: lesson as unknown as Record<string, unknown>,
    status: "draft",
  }).select().single();

  if (error) {
    throw error;
  }

  return data;
}

export async function saveGeneratedQuestions(questions: GeneratedQuestion[], jobId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("ai_generated_questions").insert(
    questions.map((question) => ({
      id: crypto.randomUUID(),
      job_id: jobId,
      question_text: question.questionText,
      answer_options: question.answerOptions ?? [],
      correct_answer: question.correctAnswer,
      explanation: question.fullExplanation,
      mark_scheme: question.markScheme,
      examiner_tip: question.examinerTip,
      common_mistake: question.commonMistake,
      topic: question.topic,
      difficulty: question.difficulty,
      marks: question.marks,
      command_word: question.commandWord,
      bloom_level: question.bloomLevel,
      status: question.status,
      output_json: question as unknown as Record<string, unknown>,
    })),
  );

  if (error) {
    throw error;
  }

  return data;
}
