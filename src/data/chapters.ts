import { expandEnvironments } from '../lib/environments'
import { expandWikilinks } from '../lib/wikilinks'
import { slugify } from '../lib/slugify'
import { GLOSSARY } from './glossary'

export type Chapter = {
  slug: string
  title: string
  excerpt: string
  order: number
  section?: string
  content: string
}

const modules = import.meta.glob('/src/content/chapters/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function numberHeadings(body: string, order: number): string {
  const counters = { h1: 0, h2: 0, h3: 0, h4: 0 }
  let inFence = false

  return body
    .split('\n')
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence
        return line
      }
      if (inFence) return line

      const match = /^(#{1,4})\s+(.*)$/.exec(line)
      if (!match) return line

      const level = match[1].length
      if (level === 1) {
        counters.h1 += 1
        counters.h2 = 0
        counters.h3 = 0
        counters.h4 = 0
      } else if (level === 2) {
        counters.h2 += 1
        counters.h3 = 0
        counters.h4 = 0
      } else if (level === 3) {
        counters.h3 += 1
        counters.h4 = 0
      } else {
        counters.h4 += 1
      }

      const number = [order, counters.h1, counters.h2, counters.h3, counters.h4]
        .slice(0, level + 1)
        .join('.')

      return `${match[1]} ${number} ${match[2]}`
    })
    .join('\n')
}

const CONCEPT_FENCE_RE = /^(`{3,})concept(?:\s+(.*))?$/

// Concept callouts need a stable, unique #slug so the "Definitioner i dette
// kapitel" list (built from the same content string, see Chapter.tsx) can
// link straight to the matching box. That id is computed here, once, at
// module load — not inside the React render (which briefly ran it via a
// mutable counter closed over by the `concept` environment renderer) since
// StrictMode renders every component function twice and discarded the first
// call's return value while keeping its side effect on the counter, handing
// out the wrong (already-incremented) slug to the actually-rendered box.
function embedConceptSlugs(body: string): string {
  const counts = new Map<string, number>()

  return body
    .split('\n')
    .map((line) => {
      const match = CONCEPT_FENCE_RE.exec(line)
      if (!match) return line

      const [, fence, rawTitle] = match
      const title = rawTitle?.trim() || 'Concept'
      const base = slugify(title)
      const count = counts.get(base) ?? 0
      counts.set(base, count + 1)
      const slug = count === 0 ? base : `${base}-${count + 1}`

      return `${fence}concept ${slug} ${title}`
    })
    .join('\n')
}

function buildExcerpt(body: string): string {
  const firstParagraph = body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith('#'))

  if (!firstParagraph) return ''

  const text = firstParagraph.replace(/\s+/g, ' ').trim()
  return text.length > 160 ? `${text.slice(0, 160).trim()}…` : text
}

function parseNamePart(name: string): { order: number; title: string } {
  const match = /^(\d+)\s*-\s*(.+)$/.exec(name)

  if (!match) {
    throw new Error(`"${name}" must be named "[order] - [title]"`)
  }

  return { order: Number(match[1]), title: match[2] }
}

type Entry = {
  fileOrder: number
  fileTitle: string
  section?: { order: number; title: string }
  raw: string
}

function parseEntry(path: string, raw: string): Entry {
  const relative = path.replace('/src/content/chapters/', '')
  const parts = relative.split('/')
  const filename = parts.pop()!.replace(/\.md$/, '')
  const { order: fileOrder, title: fileTitle } = parseNamePart(filename)

  const section = parts.length > 0 ? parseNamePart(parts[0]) : undefined

  return { fileOrder, fileTitle, section, raw }
}

// Chapters outside subfolders come first (ordered by their own number), then
// each section subfolder in order, with its chapters ordered within it. The
// [order] prefixes only control this ordering: the final numbering shown on
// the site is a single continuous sequence (1, 2, 3, ...) across everything.
function orderEntries(entries: Entry[]): Entry[] {
  const rootEntries = entries
    .filter((entry) => !entry.section)
    .sort((a, b) => a.fileOrder - b.fileOrder)

  const sectionGroups = new Map<string, { order: number; title: string; entries: Entry[] }>()
  for (const entry of entries) {
    if (!entry.section) continue
    const key = `${entry.section.order}-${entry.section.title}`
    const group = sectionGroups.get(key)
    if (group) {
      group.entries.push(entry)
    } else {
      sectionGroups.set(key, { order: entry.section.order, title: entry.section.title, entries: [entry] })
    }
  }

  const sortedSections = [...sectionGroups.values()].sort((a, b) => a.order - b.order)
  for (const group of sortedSections) {
    group.entries.sort((a, b) => a.fileOrder - b.fileOrder)
  }

  return [...rootEntries, ...sortedSections.flatMap((group) => group.entries)]
}

export const chapters: Chapter[] = orderEntries(
  Object.entries(modules).map(([path, raw]) => parseEntry(path, raw)),
).map((entry, index) => {
  const order = index + 1
  const withLinks = expandWikilinks(
    entry.raw.replace(/\r\n/g, '\n').trim(),
    GLOSSARY,
    entry.fileTitle,
  )
  const body = embedConceptSlugs(expandEnvironments(withLinks))

  return {
    slug: slugify(entry.fileTitle),
    title: entry.fileTitle,
    excerpt: buildExcerpt(body),
    order,
    section: entry.section?.title,
    content: numberHeadings(body, order),
  }
})

export function getChapter(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug)
}
