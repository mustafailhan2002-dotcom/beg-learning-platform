import { createClient } from "@/lib/supabase/client";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { LessonRecord, QuestionRecord, ReviewRecord, SubjectRecord, TopicRecord, UnitRecord } from "@/lib/mathematics/types";

const subjectsTable = "subjects";
const unitsTable = "units";
const topicsTable = "topics";
const lessonsTable = "lessons";
const questionsTable = "questions";
const reviewsTable = "content_reviews";

function isTeacherOrAdmin(role?: string | null) {
  return Boolean(
    role && ["teacher", "school_admin", "ministry", "super_admin"].includes(String(role).toLowerCase()),
  );
}

function getUserRoleFromMetadata(user?: { user_metadata?: { role?: string | null } | null } | null) {
  return user?.user_metadata?.role ?? null;
}

export async function getMathematicsDashboardData() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = getUserRoleFromMetadata(user);
  const canManage = isTeacherOrAdmin(role);

  const { data: subjectData, error: subjectError } = await supabase
    .from(subjectsTable)
    .select("*")
    .eq("slug", "igcse-mathematics")
    .maybeSingle<SubjectRecord>();

  if (subjectError) {
    throw subjectError;
  }

  if (!subjectData) {
    return {
      subject: null,
      lessons: [] as LessonRecord[],
      questions: [] as QuestionRecord[],
      reviews: [] as ReviewRecord[],
      canManage,
    };
  }

  const [{ data: lessonData, error: lessonError }, { data: questionData, error: questionError }, { data: reviewData, error: reviewError }] = await Promise.all([
    supabase.from(lessonsTable).select("*").eq("subject_id", subjectData.id).order("created_at", { ascending: false }),
    supabase.from(questionsTable).select("*").eq("subject_id", subjectData.id).order("created_at", { ascending: false }),
    supabase.from(reviewsTable).select("*").order("created_at", { ascending: false }),
  ]);

  if (lessonError) {
    throw lessonError;
  }

  if (questionError) {
    throw questionError;
  }

  if (reviewError) {
    throw reviewError;
  }

  const visibleLessons = (lessonData ?? []).filter((lesson) => canManage || lesson.status === "published") as LessonRecord[];
  const visibleQuestions = (questionData ?? []).filter((question) => canManage || question.status === "published") as QuestionRecord[];

  return {
    subject: subjectData,
    lessons: visibleLessons,
    questions: visibleQuestions,
    reviews: (reviewData ?? []) as ReviewRecord[],
    canManage,
  };
}

export async function getCurriculumData() {
  const supabase = await createServerSupabaseClient();
  const { data: subjectData, error: subjectError } = await supabase
    .from(subjectsTable)
    .select("*")
    .eq("slug", "igcse-mathematics")
    .maybeSingle<SubjectRecord>();

  if (subjectError) {
    throw subjectError;
  }

  if (!subjectData) {
    return { subject: null, units: [] as UnitRecord[], topicsByUnit: {} as Record<string, TopicRecord[]> };
  }

  const [{ data: unitsData, error: unitsError }, { data: topicsData, error: topicsError }] = await Promise.all([
    supabase.from(unitsTable).select("*").eq("subject_id", subjectData.id).order("name"),
    supabase.from(topicsTable).select("*").order("name"),
  ]);

  if (unitsError) {
    throw unitsError;
  }

  if (topicsError) {
    throw topicsError;
  }

  const topicsByUnit = (topicsData ?? []).reduce<Record<string, TopicRecord[]>>((acc, topic) => {
    acc[topic.unit_id] = acc[topic.unit_id] ?? [];
    acc[topic.unit_id].push(topic);
    return acc;
  }, {});

  return {
    subject: subjectData,
    units: (unitsData ?? []) as UnitRecord[],
    topicsByUnit,
  };
}

export async function getLessonsData() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = getUserRoleFromMetadata(user);
  const canManage = isTeacherOrAdmin(role);

  const { data: lessonsData, error } = await supabase.from(lessonsTable).select("*").order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  const visibleLessons = (lessonsData ?? []).filter((lesson) => canManage || lesson.status === "published") as LessonRecord[];

  return visibleLessons;
}

export async function getQuestionsData() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = getUserRoleFromMetadata(user);
  const canManage = isTeacherOrAdmin(role);

  const { data: questionsData, error } = await supabase.from(questionsTable).select("*").order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  const visibleQuestions = (questionsData ?? []).filter((question) => canManage || question.status === "published") as QuestionRecord[];

  return visibleQuestions;
}

export async function getReviewData() {
  const supabase = await createServerSupabaseClient();
  const { data: reviewsData, error } = await supabase.from(reviewsTable).select("*").order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (reviewsData ?? []) as ReviewRecord[];
}

export async function getBrowserSupabase() {
  return createClient();
}
