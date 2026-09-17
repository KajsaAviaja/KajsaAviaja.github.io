import { useEffect, useId, useRef, useState } from "react";
import type { FocusEvent, MouseEvent, ReactNode } from "react";
import type { GlossaryTerm } from "../data/glossary";

const TRIGGER_CLASS =
  "text-teal-700 underline decoration-teal-700/40 underline-offset-2 hover:decoration-teal-700 dark:text-teal-300 dark:decoration-teal-300/40 dark:hover:decoration-teal-300";

function GlossaryTermTooltip({
  term,
  href,
  children,
}: {
  term: GlossaryTerm;
  href: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tooltipId = `glossary-tooltip-${useId()}`;

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function handleTriggerClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!open) {
      event.preventDefault();
      setOpen(true);
    }
  }

  function handleBlur(event: FocusEvent<HTMLSpanElement>) {
    if (!wrapperRef.current?.contains(event.relatedTarget as Node)) {
      setOpen(false);
    }
  }

  return (
    <span
      ref={wrapperRef}
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={handleBlur}
    >
      <a
        href={href}
        className={TRIGGER_CLASS}
        aria-describedby={open ? tooltipId : undefined}
        onClick={handleTriggerClick}
      >
        {children}
      </a>
      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-20 mb-0.5 w-max max-w-[min(16rem,calc(100vw-2rem))] -translate-x-1/2 rounded-md border border-stone-900/10 bg-white p-3 text-left text-sm leading-snug font-sans font-normal not-italic normal-case text-stone-600 shadow-lg dark:border-white/10 dark:bg-slate-900 dark:text-stone-300"
        >
          {term.description}
        </span>
      )}
    </span>
  );
}

export default GlossaryTermTooltip;
