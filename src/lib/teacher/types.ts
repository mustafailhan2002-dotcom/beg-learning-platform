export type ReviewStatus = "draft" | "review" | "revision_required" | "approved" | "rejected" | "published" | "archived";
export type ReviewPriority = "low" | "medium" | "high" | "urgent";
export type ReviewContentType = "lesson" | "question";

export type TeacherReviewItem = {
  id: string;
  contentType: ReviewContentType;
  contentId: string;
  title: string;
  subject: string;
  unit: string;
  topic: string;
  qualification: string;
  difficulty: string;
  status: ReviewStatus;
  generatedBy: string;
  createdAt: string;
  reviewNotes: string | null;
  priority: ReviewPriority;
  assignedReviewer: string | null;
  isPublished: boolean;
};

export function isValidTransition(from: ReviewStatus, to: ReviewStatus) {
  const transitions: Record<ReviewStatus, ReviewStatus[]> = {
    draft: ["review"],
    review: ["approved", "revision_required", "rejected"],
    revision_required: ["review", "approved"],
    approved: ["published"],
    rejected: ["review"],
    published: ["archived"],
    archived: [],
  };

  return transitions[from]?.includes(to) ?? false;
}
