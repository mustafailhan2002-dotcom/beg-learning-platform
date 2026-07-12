export type ContentStatus = "draft" | "review" | "published" | "rejected";
export type Difficulty = "Foundation" | "Higher";
export type BloomLevel = "Remember" | "Understand" | "Apply" | "Analyse" | "Evaluate";

export type SubjectRecord = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type UnitRecord = {
  id: string;
  subject_id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type TopicRecord = {
  id: string;
  unit_id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type LessonRecord = {
  id: string;
  lesson_id: string;
  title: string;
  unit_id: string;
  topic_id: string | null;
  subject_id: string;
  status: ContentStatus;
  difficulty: Difficulty;
  learning_objectives: string[];
  explanation: string;
  worked_examples: string[];
  practice_questions: string[];
  homework: string;
  mark_scheme: string[];
  teacher_notes: string;
  created_at: string;
  updated_at: string;
};

export type QuestionRecord = {
  id: string;
  question_id: string;
  question_text: string;
  options: string[] | null;
  correct_answer: string;
  explanation: string;
  marks: number;
  difficulty: Difficulty;
  topic_id: string | null;
  unit_id: string;
  subject_id: string;
  command_word: string | null;
  bloom_level: BloomLevel | string | null;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
};

export type ReviewRecord = {
  id: string;
  content_type: "lesson" | "question";
  content_id: string;
  reviewer: string;
  decision: "approve" | "reject" | "revise";
  notes: string | null;
  created_at: string;
};
