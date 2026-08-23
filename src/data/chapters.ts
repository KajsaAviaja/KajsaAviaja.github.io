export type Chapter = {
  slug: string
  title: string
  excerpt: string
  order: number
  content: string
}

const modules = import.meta.glob('/src/content/chapters/*.md', {
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

function parseChapter(path: string, raw: string): Chapter {
  const filename = path.split('/').pop()!.replace(/\.md$/, '')
  const match = /^(\d+)\s*-\s*(.+)$/.exec(filename)

  if (!match) {
    throw new Error(`Chapter file "${filename}" must be named "[order] - [title].md"`)
  }

  const [, orderText, title] = match
  const order = Number(orderText)
  const body = raw.replace(/\r\n/g, '\n').trim()

  return {
    slug: slugify(title),
    title,
    excerpt: buildExcerpt(body),
    order,
    content: numberHeadings(body, order),
  }
}

export const chapters: Chapter[] = Object.entries(modules)
  .map(([path, raw]) => parseChapter(path, raw))
  .sort((a, b) => a.order - b.order)

export function getChapter(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug)
}
