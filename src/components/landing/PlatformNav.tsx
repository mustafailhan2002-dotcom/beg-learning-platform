import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Platform Dashboard" },
  { href: "/mathematics", label: "Mathematics Studio" },
  { href: "/ai-studio", label: "AI Content Studio" },
  { href: "/teacher", label: "Teacher Portal" },
  { href: "/login", label: "Login" },
];

export function PlatformNav() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-slate-800/80 bg-slate-950/70 px-5 py-3 backdrop-blur">
      <Link href="/" className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">
        BEG
      </Link>
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
        {links.map((item) => (
          <Link key={item.href} href={item.href} className="transition hover:text-white">
            {item.label}
          </Link>
        ))}
        <Link
          href="/dashboard"
          className="rounded-full bg-amber-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-amber-400"
        >
          Open Platform
        </Link>
      </div>
    </nav>
  );
}
