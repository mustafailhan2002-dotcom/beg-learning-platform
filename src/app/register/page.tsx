import { AuthForm } from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthShell";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Choose your role and unlock secure access to BEG tools and resources."
      footerText="Already registered?"
      footerHref="/login"
      footerLabel="Sign in"
    >
      <AuthForm mode="register" />
    </AuthShell>
  );
}
