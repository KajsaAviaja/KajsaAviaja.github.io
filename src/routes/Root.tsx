import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import TableOfContents from "../components/TableOfContents";
import SearchBar from "../components/SearchBar";
import ThemeToggle from "../components/ThemeToggle";

function Root() {
  const [isTocOpen, setIsTocOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsTocOpen(false);
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-stone-50 text-stone-800 dark:bg-slate-950 dark:text-stone-100">
      <div className="mx-auto grid min-h-screen w-full max-w-352 grid-cols-1 px-6 py-8 sm:px-10 lg:grid-cols-[1fr_min(48rem,100%)_1fr] lg:gap-8">
        <TableOfContents isOpen={isTocOpen} onClose={() => setIsTocOpen(false)} />

        <div className="flex flex-1 flex-col">
          <header className="flex flex-col gap-4 border-b border-stone-900/10 pb-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
            <Link to="/" className="shrink-0">
              <p className="text-xs uppercase tracking-[0.4em] text-amber-700/80 dark:text-amber-200/70">
                Svært og Trolddom Guide
              </p>
            </Link>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsTocOpen(true)}
                aria-label="Åbn indholdsfortegnelse"
                title="Åbn indholdsfortegnelse"
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-stone-900/10 text-stone-500 transition-colors hover:border-amber-700/40 hover:text-amber-700 lg:hidden dark:border-white/10 dark:text-stone-400 dark:hover:border-amber-200/40 dark:hover:text-amber-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  className="size-4.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <SearchBar />
              <ThemeToggle />
            </div>
          </header>

          <div className="flex-1 py-8">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Root;
