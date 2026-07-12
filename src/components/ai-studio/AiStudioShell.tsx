import Link from "next/link";
import type { ReactNode } from "react";

type AiStudioShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  activePath: string;
  children: ReactNode;
};

const navItems = [
  { href: "/ai-studio", label: "Dashboard" },
  { href: "/ai-studio/lesson-generator", label: "Lesson Generator" },
  { href: "/ai-studio/question-generator", label: "Question Generator" },
  { href: "/ai-studio/history", label: "History" },
  { href: "/ai-studio/review", label: "Review" },
];

export function AiStudioShell({ title, eyebrow, description, activePath, children }: AiStudioShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.16),transparent_24%),linear-gradient(135deg,#07111f_0%,#0f1f3d_55%,#07111f_100%)] px-4 py-6 text-slate-100 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <aside className="w-full lg:w-72">
          <div className="sticky top-6 rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">BEG</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">AI Content Studio</h2>
            <p className="mt-2 text-sm leading-7 text-slate-400">Generate curriculum content and send it to teacher review in a unified workspace.</p>
            <nav className="mt-8 space-y-2">
              {navItems.map((item) => {
                const active = activePath === item.href;
                return (
                  <Link key={item.href} href={item.href} className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition ${active ? "border-amber-400/40 bg-amber-500/10 text-amber-200" : "border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700 hover:text-white"}`}>
                    <span className="font-semibold">{item.label}</span>
                    <span className="text-sm">→</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="flex-1">
          <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur sm:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">{eyebrow}</p>
              <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
              <p className="mt-3 max-w-3xl text-base leading-8 text-slate-400">{description}</p>
            </div>
            <div className="mt-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
