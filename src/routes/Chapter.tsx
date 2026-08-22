import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Chapter as ChapterData } from "../data/chapters";

function useIsDarkTheme() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() =>
      setIsDark(root.classList.contains("dark")),
    );
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

function CodeBlock({
  language,
  isDark,
  code,
}: {
  language: string;
  isDark: boolean;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-stone-900/5 dark:bg-white/5">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Kopieret!" : "Kopiér"}
        title={copied ? "Kopieret!" : "Kopiér"}
        className="absolute top-2 right-2 rounded-md border border-stone-900/10 bg-stone-50/80 p-1.5 text-stone-500 transition-colors hover:border-amber-700/40 hover:text-amber-700 dark:border-white/10 dark:bg-slate-900/80 dark:text-stone-400 dark:hover:border-amber-200/40 dark:hover:text-amber-200"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 18C8.45 18 7.97917 17.8042 7.5875 17.4125C7.19583 17.0208 7 16.55 7 16V4C7 3.45 7.19583 2.97917 7.5875 2.5875C7.97917 2.19583 8.45 2 9 2H18C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V16C20 16.55 19.8042 17.0208 19.4125 17.4125C19.0208 17.8042 18.55 18 18 18H9ZM9 16H18V4H9V16ZM5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6H5V20H16V22H5Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <SyntaxHighlighter
        language={language}
        style={isDark ? oneDark : oneLight}
        customStyle={{ background: "transparent", width: "100%" }}
        codeTagProps={{
          style: { backgroundColor: "transparent" },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

function Chapter() {
  const chapter = useLoaderData<ChapterData>();
  const isDark = useIsDarkTheme();

  return (
    <article>
      <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl dark:text-white">
        {chapter.title}
      </h1>

      <div className="mt-6 space-y-4 text-base leading-7 text-stone-600 dark:text-stone-300">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="font-serif text-2xl text-stone-900 sm:text-3xl dark:text-white">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="font-serif text-xl text-stone-900 sm:text-2xl dark:text-white">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="font-serif text-lg text-stone-900 sm:text-xl dark:text-white">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="font-serif text-base font-semibold text-stone-900 sm:text-lg dark:text-white">
                {children}
              </h4>
            ),
            ul: ({ children }) => (
              <ul className="list-disc space-y-2 pl-6">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal space-y-2 pl-6">{children}</ol>
            ),
            a: ({ children, href }) => (
              <a
                href={href}
                className="text-amber-700 underline decoration-amber-700/40 underline-offset-2 hover:decoration-amber-700 dark:text-amber-200 dark:decoration-amber-200/40 dark:hover:decoration-amber-200"
              >
                {children}
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-amber-700/40 pl-4 italic text-stone-500 dark:border-amber-200/40 dark:text-stone-400">
                {children}
              </blockquote>
            ),
            hr: () => (
              <hr className="border-stone-900/10 dark:border-white/10" />
            ),
            pre: ({ children }) => <>{children}</>,
            code: ({ className, children }) => {
              const language = /language-(\w+)/.exec(className ?? "")?.[1];
              const isBlock = language !== undefined || String(children).includes("\n");

              if (!isBlock) {
                return (
                  <code className="rounded bg-stone-900/5 px-1.5 py-0.5 font-mono text-[0.9em] text-stone-900 dark:bg-white/5 dark:text-white">
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock
                  language={language ?? "text"}
                  isDark={isDark}
                  code={String(children).replace(/\n$/, "")}
                />
              );
            },
          }}
        >
          {chapter.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

export default Chapter;
