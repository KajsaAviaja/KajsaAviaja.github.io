// Custom environments in chapter markdown are authored LaTeX-style, e.g.
//
//   \begin{task}
//   Do the thing.
//   \end{task}
//
//   \begin{concept}[Funktion]
//   A function is ...
//   \end{concept}
//
// This expands them into the fenced-code-block form the renderer understands
// (```task ... ```, ```concept Funktion ... ```), escalating backtick fence
// length automatically wherever environments are nested so authors never have
// to hand-count backticks.

type Node =
  | { type: 'text'; lines: string[] }
  | { type: 'env'; name: string; info?: string; children: Node[] }

const BEGIN_RE = /^\\begin\{(\w+)\}(?:\[(.*)\])?$/
const END_RE = /^\\end\{(\w+)\}$/
const FENCE_OPEN_RE = /^(`{3,}|~{3,})/

function parseNodes(
  lines: string[],
  start: number,
  closingName: string | null,
): { nodes: Node[]; index: number } {
  const nodes: Node[] = []
  let textBuffer: string[] = []
  let i = start

  const flushText = () => {
    if (textBuffer.length > 0) {
      nodes.push({ type: 'text', lines: textBuffer })
      textBuffer = []
    }
  }

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    if (closingName !== null) {
      const endMatch = END_RE.exec(trimmed)
      if (endMatch && endMatch[1] === closingName) {
        flushText()
        return { nodes, index: i + 1 }
      }
    }

    const beginMatch = BEGIN_RE.exec(trimmed)
    if (beginMatch) {
      flushText()
      const [, name, info] = beginMatch
      const { nodes: children, index: nextIndex } = parseNodes(lines, i + 1, name)
      nodes.push({ type: 'env', name, info, children })
      i = nextIndex
      continue
    }

    const endMatchAny = END_RE.exec(trimmed)
    if (endMatchAny) {
      throw new Error(
        `Unmatched \\end{${endMatchAny[1]}} (no open \\begin{${endMatchAny[1]}})`,
      )
    }

    const fenceMatch = FENCE_OPEN_RE.exec(line)
    if (fenceMatch) {
      const marker = fenceMatch[1][0]
      const markerLen = fenceMatch[1].length
      const closeRe = new RegExp(`^${marker === '`' ? '`' : '~'}{${markerLen},}\\s*$`)

      textBuffer.push(line)
      i += 1
      while (i < lines.length) {
        textBuffer.push(lines[i])
        const isClose = closeRe.test(lines[i])
        i += 1
        if (isClose) break
      }
      continue
    }

    textBuffer.push(line)
    i += 1
  }

  flushText()

  if (closingName !== null) {
    throw new Error(`Unmatched \\begin{${closingName}} (no \\end{${closingName}})`)
  }

  return { nodes, index: i }
}

function longestBacktickRun(text: string): number {
  const matches = text.match(/`+/g)
  if (!matches) return 0
  return Math.max(...matches.map((m) => m.length))
}

function serializeNode(node: Node): string[] {
  if (node.type === 'text') return node.lines

  const childLines = node.children.flatMap(serializeNode)
  const childText = childLines.join('\n')
  const fenceLen = Math.max(3, longestBacktickRun(childText) + 1)
  const fence = '`'.repeat(fenceLen)
  const infoStr = node.info ? `${node.name} ${node.info}` : node.name

  return [`${fence}${infoStr}`, ...childLines, fence]
}

export function expandEnvironments(source: string): string {
  const lines = source.split('\n')
  const { nodes, index } = parseNodes(lines, 0, null)

  if (index !== lines.length) {
    throw new Error('Failed to parse custom environments: unexpected leftover content')
  }

  return nodes.flatMap(serializeNode).join('\n')
}
