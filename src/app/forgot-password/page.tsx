import { AuthForm } from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthShell";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Recover access"
      subtitle="We will help you reset your password and get back into your BEG account."
      footerText="Remembered your password?"
      footerHref="/login"
      footerLabel="Return to sign in"
    >
      <AuthForm mode="forgot-password" />
    </AuthShell>
  );
}
