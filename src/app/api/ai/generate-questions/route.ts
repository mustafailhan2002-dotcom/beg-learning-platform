import { NextResponse } from "next/server";
import { createAiProviderAdapter } from "@/lib/ai-studio/adapter";
import type { QuestionGenerationPayload } from "@/lib/ai-studio/types";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<QuestionGenerationPayload>;

    if (!payload.subject || !payload.topic || !payload.qualification || !payload.difficulty) {
      return NextResponse.json({ error: "Missing required question generation fields." }, { status: 400 });
    }

    const adapter = await createAiProviderAdapter();
    const questions = await adapter.generateQuestions({
      subject: payload.subject,
      qualification: payload.qualification,
      topic: payload.topic,
      difficulty: payload.difficulty,
      questionType: payload.questionType ?? "Short response",
      numberOfQuestions: payload.numberOfQuestions ?? 1,
      marks: payload.marks ?? 2,
      commandWord: payload.commandWord ?? "Explain",
      bloomLevel: payload.bloomLevel ?? "Apply",
      calculator: payload.calculator ?? false,
    });

    return NextResponse.json({ success: true, data: questions });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown question generation error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
