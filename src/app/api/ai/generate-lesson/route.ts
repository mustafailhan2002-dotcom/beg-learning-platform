import { NextResponse } from "next/server";
import { createAiProviderAdapter } from "@/lib/ai-studio/adapter";
import type { LessonGenerationPayload } from "@/lib/ai-studio/types";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<LessonGenerationPayload>;

    if (!payload.subject || !payload.topic || !payload.qualification || !payload.level) {
      return NextResponse.json({ error: "Missing required lesson generation fields." }, { status: 400 });
    }

    const adapter = await createAiProviderAdapter();
    const lesson = await adapter.generateLesson({
      subject: payload.subject,
      qualification: payload.qualification,
      level: payload.level,
      unit: payload.unit ?? "Core Unit",
      topic: payload.topic,
      duration: payload.duration ?? "60 minutes",
      ageRange: payload.ageRange ?? "14-16",
      language: payload.language ?? "English",
      difficulty: payload.difficulty ?? "Foundation",
      workedExamples: payload.workedExamples ?? 2,
      practiceQuestions: payload.practiceQuestions ?? 4,
      homeworkQuestions: payload.homeworkQuestions ?? 3,
    });

    return NextResponse.json({ success: true, data: lesson });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown lesson generation error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
