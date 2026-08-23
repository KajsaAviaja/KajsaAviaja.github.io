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

function parseChapter(path: string, raw: string): Chapter {
  const slug = path.split('/').pop()!.replace(/\.md$/, '')
  const normalized = raw.replace(/\r\n/g, '\n')
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) {
    throw new Error(`Chapter "${slug}" is missing frontmatter`)
  }

  const [, frontmatter, body] = match
  const fields = Object.fromEntries(
    frontmatter
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const index = line.indexOf(':')
        return [line.slice(0, index).trim(), line.slice(index + 1).trim()]
      }),
  )

  const order = Number(fields.order ?? 0)

  return {
    slug,
    title: fields.title ?? slug,
    excerpt: fields.excerpt ?? '',
    order,
    content: numberHeadings(body.trim(), order),
  }
}

export const chapters: Chapter[] = Object.entries(modules)
  .map(([path, raw]) => parseChapter(path, raw))
  .sort((a, b) => a.order - b.order)

export function getChapter(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug)
}
