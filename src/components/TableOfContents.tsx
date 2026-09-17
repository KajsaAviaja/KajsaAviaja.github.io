import { useEffect } from 'react'
import { NavLink } from 'react-router'
import { chapters, type Chapter } from '../data/chapters'

interface TableOfContentsProps {
  isOpen: boolean
  onClose: () => void
}

type Group = { section?: string; chapters: Chapter[] }

function groupBySection(items: Chapter[]): Group[] {
  return items.reduce<Group[]>((groups, chapter) => {
    const last = groups[groups.length - 1]
    if (last && last.section === chapter.section) {
      last.chapters.push(chapter)
    } else {
      groups.push({ section: chapter.section, chapters: [chapter] })
    }
    return groups
  }, [])
}

function TableOfContents({ isOpen, onClose }: TableOfContentsProps) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const chapterLink = (chapter: Chapter) => (
    <NavLink
      to={`/chapters/${chapter.slug}`}
      onClick={onClose}
      className={({ isActive }) =>
        `-ml-px block border-l pl-4 text-sm leading-5 transition-colors ${
          isActive
            ? 'border-amber-700/70 text-amber-700 dark:border-amber-200/70 dark:text-amber-200'
            : 'border-transparent text-stone-500 hover:border-stone-900/20 hover:text-stone-800 dark:text-stone-400 dark:hover:border-white/20 dark:hover:text-stone-200'
        }`
      }
    >
      {chapter.order}. {chapter.title}
    </NavLink>
  )

  const footerLink = (to: string, icon: string, label: string) => (
    <NavLink
      to={to}
      onClick={onClose}
      className={({ isActive }) =>
        `flex items-center gap-2 text-sm leading-5 transition-colors ${
          isActive
            ? 'text-amber-700 dark:text-amber-200'
            : 'text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200'
        }`
      }
    >
      <img src={icon} alt="" className="size-6 shrink-0 dark:invert" />
      {label}
    </NavLink>
  )

  const footerLinks = (
    <div className="space-y-3 border-t border-stone-900/10 pt-4 dark:border-white/20">
      {footerLink('/begreber', '/icons/dictionary.svg', 'Begreber')}
      {footerLink('/info', '/icons/info.svg', 'Info')}
    </div>
  )

  const links = (
    <ul className="mt-4 space-y-3">
      {groupBySection(chapters).map((group, index) =>
        group.section ? (
          <li key={`${group.section}-${index}`} className={index > 0 ? 'pt-1' : undefined}>
            <p className="text-[11px] font-medium tracking-[0.16em] text-stone-500 uppercase dark:text-stone-400">
              {group.section}
            </p>
            <ul className="mt-2 space-y-3 border-l border-stone-900/10 dark:border-white/20">
              {group.chapters.map((chapter) => (
                <li key={chapter.slug}>{chapterLink(chapter)}</li>
              ))}
            </ul>
          </li>
        ) : (
          <li key={`root-${index}`}>
            <ul className="space-y-3 border-l border-stone-900/10 dark:border-white/20">
              {group.chapters.map((chapter) => (
                <li key={chapter.slug}>{chapterLink(chapter)}</li>
              ))}
            </ul>
          </li>
        ),
      )}
    </ul>
  )

  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-8 flex h-[calc(100vh-4rem)] w-52 flex-col justify-self-end overflow-y-auto">
          <nav aria-label="Indholdsfortegnelse">
            <p className="text-xs uppercase tracking-[0.32em] text-amber-700/70 dark:text-amber-200/60">
              Indhold
            </p>
            {links}
          </nav>

          <div className="mt-auto pt-4">{footerLinks}</div>
        </div>
      </aside>

      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-stone-950/40 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <nav
        aria-label="Indholdsfortegnelse"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[80vw] flex-col bg-stone-50 px-6 py-8 shadow-xl transition-transform duration-200 ease-out lg:hidden dark:bg-slate-950 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.32em] text-amber-700/70 dark:text-amber-200/60">
            Indhold
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Luk indholdsfortegnelse"
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-stone-900/10 text-stone-500 transition-colors hover:border-amber-700/40 hover:text-amber-700 dark:border-white/10 dark:text-stone-400 dark:hover:border-amber-200/40 dark:hover:text-amber-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              className="size-4"
              aria-hidden="true"
            >
              <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {links}
          <div className="mt-auto pt-4">{footerLinks}</div>
        </div>
      </nav>
    </>
  )
}

export default TableOfContents
