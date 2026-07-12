import { AiStudioShell } from "@/components/ai-studio/AiStudioShell";
import { LessonGeneratorForm } from "@/components/ai-studio/LessonGeneratorForm";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function LessonGeneratorPage() {
  return (
    <ProtectedRoute>
      <AiStudioShell title="Lesson Generator" eyebrow="AI lesson authoring" description="Generate a complete lesson plan with objectives, examples, practice and assessment notes in one pass." activePath="/ai-studio/lesson-generator">
        <LessonGeneratorForm />
      </AiStudioShell>
    </ProtectedRoute>
  );
}
