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

  return {
    slug,
    title: fields.title ?? slug,
    excerpt: fields.excerpt ?? '',
    order: Number(fields.order ?? 0),
    content: body.trim(),
  }
}

export const chapters: Chapter[] = Object.entries(modules)
  .map(([path, raw]) => parseChapter(path, raw))
  .sort((a, b) => a.order - b.order)

export function getChapter(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug)
}
