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

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'oe')
    .replace(/å/g, 'aa')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
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
  const body = entry.raw.replace(/\r\n/g, '\n').trim()

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
