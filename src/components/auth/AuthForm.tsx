"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { roleOptions, type UserRole } from "@/lib/auth";

type AuthMode = "login" | "register" | "forgot-password";

type AuthFormProps = {
  mode: AuthMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createClient();

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setError(error.message);
          return;
        }

        router.push("/dashboard");
        return;
      }

      if (mode === "register") {
        const origin = window.location.origin;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${origin}/auth/callback`,
            data: { role },
          },
        });

        if (error) {
          setError(error.message);
          return;
        }

        setMessage("Registration successful. Please check your inbox to confirm your email.");
        return;
      }

      const origin = window.location.origin;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback`,
      });

      if (error) {
        setError(error.message);
        return;
      }

      setMessage("Password reset instructions have been sent to your inbox.");
    } finally {
      setLoading(false);
    }
  };

  const heading =
    mode === "login"
      ? "Sign in to your BEG workspace"
      : mode === "register"
        ? "Create your BEG account"
        : "Reset your password";

  const subheading =
    mode === "login"
      ? "Access your curriculum tools with secure single sign-on."
      : mode === "register"
        ? "Join the platform as a student, educator, or administrator."
        : "Enter the email tied to your account and we will send reset instructions.";

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">{heading}</h2>
        <p className="mt-2 text-sm leading-7 text-slate-400">{subheading}</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm text-slate-300">
          <span className="mb-2 block font-medium">Email address</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400"
            placeholder="name@school.com"
          />
        </label>

        {mode !== "forgot-password" && (
          <label className="block text-sm text-slate-300">
            <span className="mb-2 block font-medium">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400"
              placeholder="••••••••"
            />
          </label>
        )}

        {mode === "register" && (
          <label className="block text-sm text-slate-300">
            <span className="mb-2 block font-medium">Role</span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as UserRole)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        )}

        {error && <p className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200">{error}</p>}
        {message && <p className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-200">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading
            ? "Please wait..."
            : mode === "login"
              ? "Sign in"
              : mode === "register"
                ? "Create account"
                : "Send reset link"}
        </button>
      </form>

      {mode === "login" && (
        <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
          <Link href="/forgot-password" className="transition hover:text-amber-300">
            Forgot password?
          </Link>
          <Link href="/register" className="transition hover:text-amber-300">
            Create an account
          </Link>
        </div>
      )}

      {mode === "register" && (
        <div className="mt-4 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-amber-300 transition hover:text-amber-200">
            Sign in
          </Link>
        </div>
      )}

      {mode === "forgot-password" && (
        <div className="mt-4 text-center text-sm text-slate-400">
          Back to{" "}
          <Link href="/login" className="font-semibold text-amber-300 transition hover:text-amber-200">
            sign in
          </Link>
        </div>
      )}
    </div>
  );
}
