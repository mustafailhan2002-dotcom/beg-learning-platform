import { AiStudioShell } from "@/components/ai-studio/AiStudioShell";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { QuestionGeneratorForm } from "@/components/ai-studio/QuestionGeneratorForm";

export default function QuestionGeneratorPage() {
  return (
    <ProtectedRoute>
      <AiStudioShell title="Question Generator" eyebrow="Assessment authoring" description="Create exam-style questions with answers, worked solutions, and mark schemes in one workflow." activePath="/ai-studio/question-generator">
        <QuestionGeneratorForm />
      </AiStudioShell>
    </ProtectedRoute>
  );
}
