# Svært og Trolddom Guide

En webbaseret guide til "Svært og Trolddom" — bygget som et undervisningsprojekt, der samtidig viser, hvordan man bygger en moderne hjemmeside med React.

Guiden samler kapitler om spillet og om det techstack, siden selv er bygget med, i én søgbar, kapitelinddelt hjemmeside med lys/mørk tema.

## Techstack

- **React 19** + **TypeScript** — komponenter og statisk typetjek
- **Vite** — dev-server og build
- **React Router** — navigation mellem forside og kapitler
- **Tailwind CSS 4** — styling
- **react-markdown** + **react-syntax-highlighter** — render af kapitelindhold og kodeeksempler

## Kom i gang

```bash
npm install
npm run dev
```

Siden kører herefter på den adresse, Vite udskriver i terminalen (typisk `http://localhost:5173`).

### Andre kommandoer

```bash
npm run build    # typetjek + produktionsbuild
npm run preview  # forhåndsvis produktionsbuild lokalt
npm run lint     # kør ESLint
```

## Struktur

```
src/
  content/chapters/   Kapitlernes indhold som Markdown-filer
  data/chapters.ts     Indlæser og parser kapitlerne (frontmatter + indhold)
  routes/              Sider: forside, kapitel, fejlside
  components/          Genbrugelige UI-dele (søgning, indholdsfortegnelse, temaskift)
  hooks/                useTheme til lys/mørk tema
```

### Tilføj et nyt kapitel

Opret en ny `.md`-fil i [src/content/chapters/](src/content/chapters/) med frontmatter:

```md
---
title: Titel på kapitlet
excerpt: Kort beskrivelse, vises i forhåndsvisninger.
order: 5
---

Kapitlets indhold i Markdown.
```

Kapitlet dukker automatisk op i navigationen, sorteret efter `order`.
