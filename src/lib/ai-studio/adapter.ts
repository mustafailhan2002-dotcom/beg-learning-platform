import type { GeneratedLesson, GeneratedQuestion, LessonGenerationPayload, QuestionGenerationPayload } from "@/lib/ai-studio/types";

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export async function generateLessonMock(payload: LessonGenerationPayload): Promise<GeneratedLesson> {
  return {
    lessonId: createId("LESSON"),
    title: `${payload.subject} • ${payload.topic} (${payload.level})`,
    learningObjectives: [
      `Explain the core ideas of ${payload.topic}`,
      `Apply knowledge to exam-style problems`,
    ],
    successCriteria: ["Students can describe the concept clearly", "Students can solve model questions independently"],
    priorKnowledge: ["Basic arithmetic fluency", "Recall of prior units"],
    keyVocabulary: [payload.topic, "concept", "reasoning"],
    starterActivity: `Begin with a quick recap of ${payload.topic} and ask learners to identify one key idea.`,
    teacherExplanation: `Provide a structured explanation of ${payload.topic} using worked examples and clear modelling.`,
    workedExamples: [
      { title: "Worked example 1", solution: `Model a full solution for ${payload.topic}` },
      { title: "Worked example 2", solution: `Extend the idea to a second supported example` },
    ],
    guidedPractice: [`Complete ${payload.workedExamples} scaffolded questions as a class`],
    independentPractice: [`Attempt ${payload.practiceQuestions} questions independently`],
    homework: [`Complete ${payload.homeworkQuestions} questions for homework`],
    examStyleQuestions: [`Explain the concept in a short exam-style response`, `Solve a multi-step question involving ${payload.topic}`],
    markScheme: ["Award method marks for correct reasoning", "Award communication marks for clear explanation"],
    commonMistakes: ["Forgetting to simplify the final answer", "Skipping units in the solution"],
    teacherNotes: ["Use a concrete example first", "Check understanding after each step"],
    studentSummary: ["I can explain the main idea", "I can solve a similar question independently"],
    revisionFlashcards: [{ front: payload.topic, back: "Core idea and example" }],
    subject: payload.subject,
    topic: payload.topic,
    qualification: payload.qualification,
    level: payload.level,
    duration: payload.duration,
  };
}

export async function generateQuestionsMock(payload: QuestionGenerationPayload): Promise<GeneratedQuestion[]> {
  return Array.from({ length: payload.numberOfQuestions }, (_, index) => ({
    id: createId("Q"),
    questionText: `${payload.topic} question ${index + 1}: ${payload.questionType} with ${payload.marks} marks`,
    answerOptions: payload.questionType === "Multiple choice" ? ["A", "B", "C", "D"] : undefined,
    correctAnswer: "A",
    fullExplanation: `Explain the method clearly for ${payload.topic}.`,
    markScheme: [`Award ${payload.marks} mark${payload.marks > 1 ? "s" : ""} for the correct response`],
    examinerTip: "Show structure and working clearly.",
    commonMistake: "Rushing the final step.",
    topic: payload.topic,
    difficulty: payload.difficulty,
    marks: payload.marks,
    commandWord: payload.commandWord,
    bloomLevel: payload.bloomLevel,
    status: "draft",
  }));
}

export async function createAiProviderAdapter() {
  return {
    generateLesson: generateLessonMock,
    generateQuestions: generateQuestionsMock,
  };
}
