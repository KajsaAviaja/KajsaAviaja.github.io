// Glossary references are authored Obsidian-style in markdown, e.g.
//
//   [[Hooks]]
//   [[Web-API'er/Events]]                (disambiguates a term name that
//                                          exists in more than one section)
//   [[Arrays & array-metoder (map / filter / reduce / find)|arrays]]
//                                         (piped alias for the display text)
//
// This expands them into plain markdown links to the glossary page
// (`[label](/begreber#slug)`), which the renderer already knows how to
// style and navigate. An unresolved or ambiguous reference is logged to the
// terminal and left as plain text, rather than failing the whole page.

import type { GlossaryGroup } from '../data/glossary'

const WIKILINK_RE = /\[\[([^\]]+)\]\]/g
const FENCE_OPEN_RE = /^\s*(```|~~~)/

type Resolved = { name: string; slug: string }

function buildLookups(groups: GlossaryGroup[]) {
  const bySection = new Map<string, Map<string, Resolved>>()
  const byName = new Map<string, Resolved[]>()

  for (const group of groups) {
    const sectionKey = group.section.toLowerCase()
    let terms = bySection.get(sectionKey)
    if (!terms) {
      terms = new Map()
      bySection.set(sectionKey, terms)
    }

    for (const term of group.terms) {
      const resolved: Resolved = { name: term.name, slug: term.slug }
      terms.set(term.name.toLowerCase(), resolved)

      const nameKey = term.name.toLowerCase()
      const matches = byName.get(nameKey)
      if (matches) {
        matches.push(resolved)
      } else {
        byName.set(nameKey, [resolved])
      }
    }
  }

  return { bySection, byName }
}

function resolveByName(
  termPart: string,
  reference: string,
  sourceLabel: string,
  lookups: ReturnType<typeof buildLookups>,
): Resolved | null {
  const matches = lookups.byName.get(termPart.toLowerCase())
  if (!matches || matches.length === 0) {
    console.error(
      `Unknown glossary term [[${reference}]] (${sourceLabel}). Add it to src/data/glossary.ts or fix the typo.`,
    )
    return null
  }

  if (matches.length > 1) {
    console.error(
      `Ambiguous glossary term [[${reference}]] (${sourceLabel}): matches ${matches.length} terms with that name. ` +
        `Disambiguate with [[Section/${termPart}]].`,
    )
    return null
  }

  return matches[0]
}

function resolve(
  reference: string,
  sourceLabel: string,
  lookups: ReturnType<typeof buildLookups>,
): Resolved | null {
  const lastSlash = reference.lastIndexOf('/')

  // A handful of term names themselves contain a "/" (e.g. "Arrays &
  // array-metoder (map / filter / reduce / find)"), so a slash alone
  // doesn't mean "this is a Section/Term reference" — only treat it as one
  // when the text before the last slash is an actual glossary section name.
  if (lastSlash !== -1) {
    const sectionPart = reference.slice(0, lastSlash).trim()
    const termPart = reference.slice(lastSlash + 1).trim()
    const terms = lookups.bySection.get(sectionPart.toLowerCase())

    if (terms) {
      const term = terms.get(termPart.toLowerCase())
      if (!term) {
        console.error(
          `Unknown glossary term "${termPart}" in section "${sectionPart}" for [[${reference}]] (${sourceLabel}).`,
        )
        return null
      }
      return term
    }
  }

  return resolveByName(reference.trim(), reference, sourceLabel, lookups)
}

export function expandWikilinks(
  raw: string,
  groups: GlossaryGroup[],
  sourceLabel: string,
): string {
  const lookups = buildLookups(groups)
  let inFence = false

  return raw
    .split('\n')
    .map((line) => {
      if (FENCE_OPEN_RE.test(line)) {
        inFence = !inFence
        return line
      }
      if (inFence) return line

      return line.replace(WIKILINK_RE, (_full, inner: string) => {
        const pipeIndex = inner.indexOf('|')
        const reference = (pipeIndex === -1 ? inner : inner.slice(0, pipeIndex)).trim()
        const alias = pipeIndex === -1 ? undefined : inner.slice(pipeIndex + 1).trim()

        const term = resolve(reference, sourceLabel, lookups)
        if (!term) return alias ?? reference

        return `[${alias ?? term.name}](/begreber#${term.slug})`
      })
    })
    .join('\n')
}
