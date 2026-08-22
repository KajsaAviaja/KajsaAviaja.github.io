import { useEffect } from 'react'
import { NavLink } from 'react-router'
import { chapters } from '../data/chapters'

interface TableOfContentsProps {
  isOpen: boolean
  onClose: () => void
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

  const links = (
    <ul className="mt-4 space-y-3 border-l border-stone-900/10 dark:border-white/10">
      {chapters.map((chapter) => (
        <li key={chapter.slug}>
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
            {chapter.title}
          </NavLink>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <aside className="hidden lg:block">
        <nav
          aria-label="Indholdsfortegnelse"
          className="sticky top-8 w-52 justify-self-end"
        >
          <p className="text-xs uppercase tracking-[0.32em] text-amber-700/70 dark:text-amber-200/60">
            Indhold
          </p>
          {links}
        </nav>
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
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw] overflow-y-auto bg-stone-50 px-6 py-8 shadow-xl transition-transform duration-200 ease-out lg:hidden dark:bg-slate-950 ${
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
        {links}
      </nav>
    </>
  )
}

export default TableOfContents
