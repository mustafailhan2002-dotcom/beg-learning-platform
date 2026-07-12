import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isValidTransition, type ReviewStatus, type TeacherReviewItem } from "@/lib/teacher/types";
import { getUserRole } from "@/lib/auth";

const lessonsTable = "lessons";
const questionsTable = "questions";
const reviewAssignmentsTable = "review_assignments";
const reviewCommentsTable = "review_comments";
const statusHistoryTable = "content_status_history";

function getPriority(status: string, createdAt: string) {
  if (status === "review") return "high";
  if (status === "revision_required") return "urgent";
  if (status === "published") return "low";
  return "medium";
}

export async function getTeacherReviewItems() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = getUserRole(user);

  const [lessonsResponse, questionsResponse] = await Promise.all([
    supabase.from(lessonsTable).select("*").order("created_at", { ascending: false }),
    supabase.from(questionsTable).select("*").order("created_at", { ascending: false }),
  ]);

  if (lessonsResponse.error) throw lessonsResponse.error;
  if (questionsResponse.error) throw questionsResponse.error;

  const lessons = (lessonsResponse.data ?? []).map((lesson: Record<string, unknown>) => ({
    id: String(lesson.id),
    contentType: "lesson" as const,
    contentId: String(lesson.id),
    title: String(lesson.title ?? "Untitled lesson"),
    subject: "Mathematics",
    unit: "Core Algebra",
    topic: "Content",
    qualification: "Cambridge IGCSE",
    difficulty: String(lesson.difficulty ?? "Foundation"),
    status: String(lesson.status ?? "review") as ReviewStatus,
    generatedBy: "AI Studio",
    createdAt: String(lesson.created_at ?? new Date().toISOString()),
    reviewNotes: null,
    priority: getPriority(String(lesson.status ?? "review"), String(lesson.created_at ?? new Date().toISOString())),
    assignedReviewer: role === "teacher" ? user?.id ?? null : null,
    isPublished: String(lesson.status ?? "draft") === "published",
  }));

  const questions = (questionsResponse.data ?? []).map((question: Record<string, unknown>) => ({
    id: String(question.id),
    contentType: "question" as const,
    contentId: String(question.id),
    title: String(question.question_text ?? "Untitled question"),
    subject: "Mathematics",
    unit: "Core Algebra",
    topic: "Content",
    qualification: "Cambridge IGCSE",
    difficulty: String(question.difficulty ?? "Foundation"),
    status: String(question.status ?? "review") as ReviewStatus,
    generatedBy: "AI Studio",
    createdAt: String(question.created_at ?? new Date().toISOString()),
    reviewNotes: null,
    priority: getPriority(String(question.status ?? "review"), String(question.created_at ?? new Date().toISOString())),
    assignedReviewer: role === "teacher" ? user?.id ?? null : null,
    isPublished: String(question.status ?? "draft") === "published",
  }));

  return [...lessons, ...questions] as TeacherReviewItem[];
}

export async function getTeacherReviewItemById(id: string) {
  const items = await getTeacherReviewItems();
  return items.find((item) => item.id === id) ?? null;
}

export async function updateReviewStatus({
  contentId,
  contentType,
  previousStatus,
  newStatus,
  notes,
}: {
  contentId: string;
  contentType: "lesson" | "question";
  previousStatus: ReviewStatus;
  newStatus: ReviewStatus;
  notes?: string;
}) {
  if (!isValidTransition(previousStatus, newStatus)) {
    throw new Error(`Invalid transition from ${previousStatus} to ${newStatus}`);
  }

  const supabase = await createServerSupabaseClient();
  const table = contentType === "lesson" ? lessonsTable : questionsTable;
  const { error } = await supabase.from(table).update({ status: newStatus }).eq("id", contentId);

  if (error) throw error;

  const { data: { user } } = await supabase.auth.getUser();
  const reviewerId = user?.id ?? null;

  await supabase.from(reviewAssignmentsTable).insert({
    id: crypto.randomUUID(),
    reviewer_id: reviewerId,
    content_type: contentType,
    content_id: contentId,
    previous_status: previousStatus,
    new_status: newStatus,
    review_notes: notes ?? null,
    assigned_at: new Date().toISOString(),
    reviewed_at: new Date().toISOString(),
  });

  await supabase.from(reviewCommentsTable).insert({
    id: crypto.randomUUID(),
    reviewer_id: reviewerId,
    content_type: contentType,
    content_id: contentId,
    comment: notes ?? null,
    created_at: new Date().toISOString(),
  });

  await supabase.from(statusHistoryTable).insert({
    id: crypto.randomUUID(),
    content_type: contentType,
    content_id: contentId,
    previous_status: previousStatus,
    new_status: newStatus,
    review_notes: notes ?? null,
    reviewer_id: reviewerId,
    changed_at: new Date().toISOString(),
  });

  return { success: true };
}
