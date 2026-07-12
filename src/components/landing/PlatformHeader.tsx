import Link from "next/link";

type PlatformHeaderProps = {
  activePath?: string;
};

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/mathematics", label: "Mathematics" },
  { href: "/ai-studio", label: "AI Studio" },
  { href: "/teacher", label: "Teacher" },
];

export function PlatformHeader({ activePath = "/dashboard" }: PlatformHeaderProps) {
  return (
    <div className="mb-8 rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-4 shadow-lg shadow-slate-950/30 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">Platform navigation</div>
        <div className="flex flex-wrap items-center gap-2">
          {links.map((item) => {
            const isActive = activePath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-amber-500 text-slate-950"
                    : "border border-slate-700 text-slate-300 hover:border-amber-400 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/dashboard" className="rounded-full bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-200 transition hover:bg-sky-500/25">
            Open Platform
          </Link>
        </div>
      </div>
    </div>
  );
}
