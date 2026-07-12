import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUserRole, type UserRole } from "@/lib/auth";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
};

export async function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const role = getUserRole(user);
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
