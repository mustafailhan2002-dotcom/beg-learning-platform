export type GenerationStatus = "generating" | "draft" | "review" | "approved" | "rejected" | "published";
export type Qualification = "Cambridge IGCSE" | "Pearson Edexcel" | "OxfordAQA";
export type LessonLevel = "Foundation" | "Higher";

export type LessonGenerationPayload = {
  subject: string;
  qualification: Qualification;
  level: LessonLevel;
  unit: string;
  topic: string;
  duration: string;
  ageRange: string;
  language: string;
  difficulty: string;
  workedExamples: number;
  practiceQuestions: number;
  homeworkQuestions: number;
};

export type QuestionGenerationPayload = {
  subject: string;
  qualification: Qualification;
  topic: string;
  difficulty: string;
  questionType: string;
  numberOfQuestions: number;
  marks: number;
  commandWord: string;
  bloomLevel: string;
  calculator: boolean;
};

export type GeneratedLesson = {
  lessonId: string;
  title: string;
  learningObjectives: string[];
  successCriteria: string[];
  priorKnowledge: string[];
  keyVocabulary: string[];
  starterActivity: string;
  teacherExplanation: string;
  workedExamples: Array<{ title: string; solution: string }>;
  guidedPractice: string[];
  independentPractice: string[];
  homework: string[];
  examStyleQuestions: string[];
  markScheme: string[];
  commonMistakes: string[];
  teacherNotes: string[];
  studentSummary: string[];
  revisionFlashcards: Array<{ front: string; back: string }>;
  subject: string;
  topic: string;
  qualification: Qualification;
  level: LessonLevel;
  duration: string;
};

export type GeneratedQuestion = {
  id: string;
  questionText: string;
  answerOptions?: string[];
  correctAnswer: string;
  fullExplanation: string;
  markScheme: string[];
  examinerTip: string;
  commonMistake: string;
  topic: string;
  difficulty: string;
  marks: number;
  commandWord: string;
  bloomLevel: string;
  status: GenerationStatus;
};

export type GenerationJobRecord = {
  id: string;
  user_id: string | null;
  subject_id: string | null;
  topic_id: string | null;
  kind: "lesson" | "questions";
  status: GenerationStatus;
  prompt_metadata: Record<string, unknown>;
  output_json: Record<string, unknown> | null;
  error_message: string | null;
  model_name: string | null;
  token_usage: number | null;
  created_at: string;
  updated_at: string;
};
