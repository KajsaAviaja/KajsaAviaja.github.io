import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { chapters, type Chapter } from '../data/chapters'

type Result = {
  chapter: Chapter
  snippet: string
}

function buildSnippet(chapter: Chapter, query: string): string {
  const index = chapter.content.toLowerCase().indexOf(query.toLowerCase())

  if (index === -1) {
    return chapter.excerpt
  }

  const start = Math.max(0, index - 40)
  const end = Math.min(chapter.content.length, index + query.length + 60)
  const prefix = start > 0 ? '…' : ''
  const suffix = end < chapter.content.length ? '…' : ''

  return `${prefix}${chapter.content.slice(start, end).trim()}${suffix}`
}

function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const results = useMemo<Result[]>(() => {
    const trimmed = query.trim().toLowerCase()

    if (!trimmed) return []

    return chapters
      .filter(
        (chapter) =>
          chapter.title.toLowerCase().includes(trimmed) ||
          chapter.excerpt.toLowerCase().includes(trimmed) ||
          chapter.content.toLowerCase().includes(trimmed),
      )
      .map((chapter) => ({ chapter, snippet: buildSnippet(chapter, trimmed) }))
      .slice(0, 8)
  }, [query])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function goToChapter(chapter: Chapter) {
    navigate(`/chapters/${chapter.slug}`)
    setQuery('')
    setIsOpen(false)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setIsOpen(false)
      return
    }

    if (!results.length) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => (current + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => (current - 1 + results.length) % results.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      goToChapter(results[activeIndex].chapter)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xs">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-400 dark:text-stone-500"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Søg i guiden…"
          aria-label="Søg i guiden"
          className="w-full rounded-full border border-stone-900/10 bg-stone-900/5 py-2 pr-3 pl-9 text-sm text-stone-800 placeholder:text-stone-400 focus:border-amber-700/40 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-200/40"
        />
      </div>

      {isOpen && query.trim() && (
        <ul className="absolute top-full right-0 left-0 z-10 mt-2 max-h-80 overflow-y-auto rounded-xl border border-stone-900/10 bg-stone-50 py-2 shadow-lg dark:border-white/10 dark:bg-slate-900">
          {results.length === 0 && (
            <li className="px-4 py-2 text-sm text-stone-500 dark:text-stone-400">
              Ingen resultater
            </li>
          )}
          {results.map((result, index) => (
            <li key={result.chapter.slug}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => goToChapter(result.chapter)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`block w-full px-4 py-2 text-left ${
                  index === activeIndex
                    ? 'bg-amber-700/10 dark:bg-amber-200/10'
                    : ''
                }`}
              >
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                  {result.chapter.title}
                </p>
                <p className="mt-0.5 line-clamp-2 text-xs text-stone-500 dark:text-stone-400">
                  {result.snippet}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
