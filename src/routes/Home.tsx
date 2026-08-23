import { Link, useLoaderData } from "react-router";
import type { Chapter } from "../data/chapters";

function Home() {
  const chapters = useLoaderData<Chapter[]>();
  const firstChapter = chapters[0];

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-serif text-2xl text-stone-900 sm:text-3xl dark:text-white">
          Velkommen!
        </h2>
        <p className="mt-3 max-w-prose text-base leading-7 text-stone-600 dark:text-stone-300">
          Denne guide viser trin for trin, hvordan du bygger Svært og
          Trolddom, et webbaseret eventyrspil inspireret af Sværd og
          Trolddom, med værktøjer som React, TypeScript og Tailwind.
        </p>
        {firstChapter && (
          <Link
            to={`/chapters/${firstChapter.slug}`}
            className="mt-5 inline-block text-sm uppercase tracking-[0.32em] text-amber-700/80 hover:text-amber-700 dark:text-amber-200/70 dark:hover:text-amber-200"
          >
            Start her &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
