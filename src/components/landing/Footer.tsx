export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <p className="text-lg font-semibold text-white">British Education Gateway</p>
          <p className="mt-2 max-w-xl text-sm leading-7 text-slate-400">
            Premium curriculum intelligence for schools, tutors, and international
            learners seeking British education excellence.
          </p>
        </div>
        <div className="text-sm text-slate-400">
          <p>hello@begplatform.com</p>
          <p className="mt-1">© 2026 BEG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
