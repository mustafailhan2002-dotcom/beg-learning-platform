import { AuthForm } from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthShell";

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue your British Education Gateway learning journey."
      footerText="Need a new account?"
      footerHref="/register"
      footerLabel="Create one"
    >
      <AuthForm mode="login" />
    </AuthShell>
  );
}
