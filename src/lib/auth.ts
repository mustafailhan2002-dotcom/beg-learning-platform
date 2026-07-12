export type UserRole =
  | "student"
  | "teacher"
  | "school_admin"
  | "ministry"
  | "super_admin";

export const roleOptions: Array<{ value: UserRole; label: string }> = [
  { value: "student", label: "Student" },
  { value: "teacher", label: "Teacher" },
  { value: "school_admin", label: "School Admin" },
  { value: "ministry", label: "Ministry" },
  { value: "super_admin", label: "Super Admin" },
];

export function normalizeRole(role?: string | null): UserRole | null {
  if (!role) {
    return null;
  }

  const normalized = role.toLowerCase();

  if (normalized === "school admin") {
    return "school_admin";
  }

  if (normalized === "super admin") {
    return "super_admin";
  }

  return roleOptions.some((option) => option.value === normalized)
    ? (normalized as UserRole)
    : null;
}

export function getUserRole(user?: { user_metadata?: { role?: string | null } | null } | null) {
  const metadataRole = user?.user_metadata?.role;
  return normalizeRole(metadataRole);
}

export function getRoleLabel(role?: UserRole | null) {
  return roleOptions.find((option) => option.value === role)?.label ?? "Student";
}
