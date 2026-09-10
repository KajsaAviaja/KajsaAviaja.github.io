import { Children, useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { useLoaderData } from "react-router";
import ReactMarkdown, { type Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Chapter as ChapterData } from "../data/chapters";

type CalloutType = "concept" | "task";

const COLOR_MARKER = /\[([^\]]+)\]\{([^}]+)\}/g;
const COLOR_TOKEN = /^(bg-)?([a-z]+(?:-\d{2,3})?)$/;

function parseColorSpec(spec: string): CSSProperties {
  const style: CSSProperties = {};

  for (const rawToken of spec.split(",")) {
    const token = COLOR_TOKEN.exec(rawToken.trim());
    if (!token) continue;

    const [, bgPrefix, color] = token;
    const value = `var(--color-${color})`;

    if (bgPrefix) {
      style.backgroundColor = value;
      style.borderRadius = "0.25rem";
      style.padding = "0.05em 0.35em";
    } else {
      style.color = value;
    }
  }

  return style;
}

function colorizeChildren(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child !== "string") return child;

    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let key = 0;

    for (const match of child.matchAll(COLOR_MARKER)) {
      const [full, text, spec] = match;
      const index = match.index ?? 0;

      if (index > lastIndex) parts.push(child.slice(lastIndex, index));
      parts.push(
        <span key={key++} style={parseColorSpec(spec)}>
          {text}
        </span>,
      );
      lastIndex = index + full.length;
    }

    if (parts.length === 0) return child;

    if (lastIndex < child.length) parts.push(child.slice(lastIndex));

    return parts;
  });
}

function Paragraph({ children }: { children?: ReactNode }) {
  return <p>{colorizeChildren(children)}</p>;
}

const CALLOUT_COLORS: Record<
  CalloutType,
  { border: string; bg: string; text: string }
> = {
  concept: {
    border: "border-teal-600/20 dark:border-teal-300/20",
    bg: "bg-teal-600/5 dark:bg-teal-400/5",
    text: "text-teal-700/90 dark:text-teal-300/90",
  },
  task: {
    border: "border-amber-600/20 dark:border-amber-300/20",
    bg: "bg-amber-600/5 dark:bg-amber-400/5",
    text: "text-amber-700/90 dark:text-amber-300/90",
  },
};

function CalloutBox({
  type,
  label,
  children,
}: {
  type: CalloutType;
  label: string;
  children: ReactNode;
}) {
  const colors = CALLOUT_COLORS[type];

  return (
    <div
      className={`w-full overflow-hidden rounded-lg border not-italic ${colors.border} ${colors.bg}`}
    >
      <div className="px-4 py-3">
        <p className={`font-serif text-base font-semibold ${colors.text}`}>
          {label}
        </p>
        <div className="mt-2 space-y-3">{children}</div>
      </div>
    </div>
  );
}

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

function parseFilename(meta: string | undefined): string | undefined {
  if (!meta) return undefined;
  const quoted = /filename=["']([^"']+)["']/.exec(meta);
  if (quoted) return quoted[1];
  const bare = /filename=(\S+)/.exec(meta);
  return bare?.[1];
}

function CodeBlock({
  language,
  isDark,
  code,
  filename,
}: {
  language: string;
  isDark: boolean;
  code: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const copyButton = (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Kopieret!" : "Kopiér"}
      title={copied ? "Kopieret!" : "Kopiér"}
      className={
        filename
          ? "rounded-md p-1.5 text-stone-500 transition-colors hover:text-amber-700 dark:text-stone-400 dark:hover:text-amber-200"
          : "absolute top-2 right-2 rounded-md border border-stone-900/10 bg-stone-50/80 p-1.5 text-stone-500 transition-colors hover:border-amber-700/40 hover:text-amber-700 dark:border-white/10 dark:bg-slate-900/80 dark:text-stone-400 dark:hover:border-amber-200/40 dark:hover:text-amber-200"
      }
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
  );

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-stone-900/5 dark:bg-white/5">
      {filename ? (
        <div className="flex items-center justify-between border-b border-stone-900/10 px-4 py-1.5 dark:border-white/10">
          <span className="font-mono text-xs font-semibold text-stone-700 dark:text-stone-300">
            {filename}
          </span>
          {copyButton}
        </div>
      ) : (
        copyButton
      )}
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

function SolutionBox({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-stone-900/10 dark:border-white/10">
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-2 font-serif text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-900/5 dark:text-stone-300 dark:hover:bg-white/5"
      >
        <span>Løsning</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`text-stone-500 transition-transform dark:text-stone-400 ${visible ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {visible && (
        <div className="space-y-3 border-t border-stone-900/10 px-4 py-3 dark:border-white/10">
          {children}
        </div>
      )}
    </div>
  );
}

function CounterDemo() {
  const [antalKlik, setAntalKlik] = useState(0);

  return (
    <div className="flex justify-center rounded-lg bg-stone-900/5 p-6 dark:bg-white/5">
      <button
        type="button"
        onClick={() => setAntalKlik((n) => n + 1)}
        className="rounded-md bg-amber-700 px-4 py-2 font-medium text-white transition-colors hover:bg-amber-800 dark:bg-amber-200 dark:text-stone-900 dark:hover:bg-amber-300"
      >
        Jeg er klikket {antalKlik} gange
      </button>
    </div>
  );
}

function Chapter() {
  const chapter = useLoaderData<ChapterData>();
  const isDark = useIsDarkTheme();

  const nested = (source: string) => (
    <ReactMarkdown components={components}>{source}</ReactMarkdown>
  );

  // Environments are authored LaTeX-style in markdown (\begin{name}...\end{name},
  // see src/lib/environments.ts) and arrive here as fenced code blocks whose
  // language is the environment name.
  const ENVIRONMENTS: Record<
    string,
    (source: string, meta?: string) => ReactNode
  > = {
    livecounter: () => <CounterDemo />,
    solution: (source) => <SolutionBox>{nested(source)}</SolutionBox>,
    columns: (source) => (
      <div className="columns-1 gap-x-8 sm:columns-2 [&_li]:break-inside-avoid [&_ul]:space-y-2">
        {nested(source)}
      </div>
    ),
    center: (source) => <div className="text-center">{nested(source)}</div>,
    concept: (source, meta) => (
      <CalloutBox type="concept" label={meta?.trim() || "Concept"}>
        {nested(source)}
      </CalloutBox>
    ),
    task: (source) => (
      <CalloutBox type="task" label="Prøv selv">
        {nested(source)}
      </CalloutBox>
    ),
  };

  const components: Components = {
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
    p: Paragraph,
    li: ({ children }) => <li>{colorizeChildren(children)}</li>,
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
    hr: () => <hr className="border-stone-900/10 dark:border-white/10" />,
    img: ({ src, alt }) => (
      <img src={src} alt={alt} className="mx-auto block max-w-full" />
    ),
    pre: ({ children }) => <>{children}</>,
    code: ({ className, children, node }) => {
      const langToken = /language-(\S+)/.exec(className ?? "")?.[1];
      const filenameFromLangToken = parseFilename(langToken);
      const language = filenameFromLangToken ? undefined : langToken;
      const meta = (node?.data as { meta?: string } | undefined)?.meta;

      const environment = language ? ENVIRONMENTS[language] : undefined;
      if (environment) {
        return environment(String(children).replace(/\n$/, ""), meta);
      }

      const isBlock =
        langToken !== undefined || String(children).includes("\n");

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
          filename={filenameFromLangToken ?? parseFilename(meta)}
        />
      );
    },
  };

  return (
    <article>
      <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl dark:text-white">
        {chapter.order}. {chapter.title}
      </h1>

      <div className="mt-6 space-y-4 text-base leading-7 text-stone-600 dark:text-stone-300">
        <ReactMarkdown components={components}>
          {chapter.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

export default Chapter;
