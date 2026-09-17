export type GlossaryTerm = {
  slug: string;
  name: string;
  description: string;
};

export type GlossaryGroup = {
  section: string;
  terms: GlossaryTerm[];
};

type RawTerm = { slug: string; name: string; description: string };
type RawGroup = { section: string; terms: RawTerm[] };

const RAW_GLOSSARY: RawGroup[] = [
  {
    section: "Grundlæggende begreber",
    terms: [
      {
        slug: "kommentarer",
        name: "Kommentarer",
        description: "TBA",
      },
      {
        slug: "datastruktur",
        name: "Datastruktur",
        description: "TBA",
      },
      {
        slug: "api",
        name: "API",
        description: "TBA",
      },
      {
        slug: "build-tools",
        name: "Build tools",
        description: "TBA",
      },
    ],
  },
  {
    section: "JavaScript/TS grundlæggende",
    terms: [
      {
        slug: "variabler",
        name: "Variabler",
        description: "TBA",
      },
      {
        slug: "konstanter",
        name: "Konstanter",
        description: "TBA",
      },
      {
        slug: "strings-numbers-booleans",
        name: "Strings, numbers og booleans",
        description: "TBA",
      },
      {
        slug: "objekter",
        name: "Objekter",
        description: "TBA",
      },
      {
        slug: "funktioner",
        name: "Funktioner",
        description: "TBA",
      },
      {
        slug: "parametre",
        name: "Parametre",
        description: "TBA",
      },
      {
        slug: "events",
        name: "Events",
        description: "TBA",
      },
    ],
  },
  {
    section: "TypeScript",
    terms: [
      {
        slug: "typescript",
        name: "TypeScript",
        description: "TBA",
      },
      {
        slug: "typer",
        name: "Typer",
        description: "TBA",
      },
    ],
  },
  {
    section: "React",
    terms: [
      {
        slug: "react",
        name: "React",
        description: "TBA",
      },
      {
        slug: "jsx",
        name: "JSX",
        description: "TBA",
      },
      {
        slug: "komponenter",
        name: "Komponenter",
        description: "TBA",
      },
      {
        slug: "state",
        name: "State",
        description: "TBA",
      },
      {
        slug: "hooks",
        name: "Hooks",
        description: "TBA",
      },
      {
        slug: "use-state",
        name: "useState",
        description: "TBA",
      },
    ],
  },
];

export const GLOSSARY: GlossaryGroup[] = RAW_GLOSSARY;

export const GLOSSARY_TERMS_BY_SLUG: Map<string, GlossaryTerm> = new Map(
  GLOSSARY.flatMap((group) => group.terms).map((term) => [term.slug, term]),
);
