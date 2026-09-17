import { useEffect, useState } from "react";
import { GLOSSARY, type GlossaryTerm } from "../data/glossary";

type ViewMode = "grouped" | "alphabetical";

function Glossary() {
  const [view, setView] = useState<ViewMode>("grouped");

  // A link to /begreber#slug is a plain <a>, so it's a full page navigation.
  // The browser tries to scroll to the #slug element before React has
  // rendered it, so that native scroll-on-load silently does nothing —
  // this does it again once the term is actually in the DOM.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    document.getElementById(hash)?.scrollIntoView({ block: "start" });
  }, []);

  const alphabetical = GLOSSARY.flatMap((group) => group.terms).sort((a, b) =>
    a.name.localeCompare(b.name, "da"),
  );

  const termRow = ({ name, description, slug }: GlossaryTerm) => (
    <div
      key={name}
      id={slug}
      className="grid grid-cols-1 gap-x-6 gap-y-1 border-b border-stone-900/10 pb-3 sm:grid-cols-[12rem_1fr] scroll-mt-6 dark:border-white/10"
    >
      <dt className="text-base font-semibold text-stone-800 dark:text-stone-100">
        {name}
      </dt>
      <dd className="text-base text-stone-400 italic dark:text-stone-500">
        {description}
      </dd>
    </div>
  );

  const viewButton = (mode: ViewMode, label: string) => (
    <button
      type="button"
      onClick={() => setView(mode)}
      className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.16em] transition-colors ${
        view === mode
          ? "border-amber-700/40 text-amber-700 dark:border-amber-200/40 dark:text-amber-200"
          : "border-stone-900/10 text-stone-500 hover:border-amber-700/40 hover:text-amber-700 dark:border-white/10 dark:text-stone-400 dark:hover:border-amber-200/40 dark:hover:text-amber-200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <article>
      <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl dark:text-white">
        Begreber
      </h1>

      <p className="mt-4 max-w-prose text-base leading-7 text-stone-600 dark:text-stone-300">
        En samlet ordliste over de begreber, der bliver introduceret undervejs i
        guiden.
      </p>

      <div className="mt-6 flex gap-2">
        {viewButton("grouped", "Gruppér efter emne")}
        {viewButton("alphabetical", "Sortér alfabetisk")}
      </div>

      {view === "grouped" ? (
        <div className="mt-8 space-y-10">
          {GLOSSARY.map((group) => (
            <section key={group.section}>
              <h2 className="font-serif text-xl text-stone-900 sm:text-2xl dark:text-white">
                {group.section}
              </h2>

              <dl className="mt-4 space-y-3">{group.terms.map(termRow)}</dl>
            </section>
          ))}
        </div>
      ) : (
        <dl className="mt-8 space-y-3">{alphabetical.map(termRow)}</dl>
      )}
    </article>
  );
}

export default Glossary;
