import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerHref: string;
  footerLabel: string;
};

export function AuthShell({
  title,
  subtitle,
  children,
  footerText,
  footerHref,
  footerLabel,
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_24%),linear-gradient(135deg,#07111f_0%,#0f1f3d_55%,#07111f_100%)] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center">
        <div className="max-w-xl flex-1 rounded-[2rem] border border-slate-800/80 bg-slate-950/60 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">
            British Education Gateway
          </p>
          <h1 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">{subtitle}</p>
          <div className="mt-8 rounded-3xl border border-amber-400/20 bg-amber-500/10 p-6 text-sm leading-7 text-slate-300">
            <p className="font-semibold text-amber-300">Why BEG?</p>
            <p className="mt-2">
              Secure access for students, teachers, school leaders, ministry officials, and platform administrators.
            </p>
          </div>
        </div>

        <div className="flex-1 rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur sm:p-8">
          {children}
          <p className="mt-6 text-center text-sm text-slate-400">
            {footerText}{" "}
            <Link href={footerHref} className="font-semibold text-amber-300 transition hover:text-amber-200">
              {footerLabel}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
