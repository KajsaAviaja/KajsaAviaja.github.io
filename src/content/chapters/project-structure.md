---
title: Project Struktur
excerpt: En kompakt vej gennem de regler, roller og rytmer, der betyder mest i starten.
order: 4
---

Vi fokuserer på filerne i mappen `src`, som indeholder 3 filer: `App.tsx`, `main.tsx` og `index.css`.

Filerne der ender på `.tsx` indeholder vores React-kode - hvor vi definerer hvordan siden ser ud, og hvordan den fungerer. Filen der ender på `.css` er, som navnet antyder, hvor vi definerer CSS - vores styling af siden.
Vi starter med at forklare, hvordan vi bruger tailwind.

# Styling med tailwind

I vores tilfælde bruger vi dog tailwind og ikke direkte css, og filen indeholder derfor bare

```css
@import "tailwindcss";
```

Det gør, at vi kan bruge tailwinds bibliotek af CSS-klasser i stedet for klasser, vi selv definerer.

# main.tsx

Nu ser vi på `main.tsx`, som indeholder

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

I toppen importerer vi forskellige komponenter, vi bruger på siden.

- `import { StrictMode } from "react";`: [StrictMode](https://react.dev/reference/react-dom/client/createRoot) fra React.
- `import { createRoot } from "react-dom/client";`: [createRoot](https://react.dev/reference/react-dom/client/createRoot) er endnu en funktion fra React, som bygger roden af vores side, som er det, der vises på hjemmesiden.
- `import "./index.css";` importerer vores stylingfil, så vi kan bruge tailwind her.
- `import App from "./App.tsx";` importerer indholdet af `App.tsx`.

# App.tsx

Det er i `App.tsx`, hvor vi begynder at definere det egentlige indhold på vores side. Filen indeholder en funktion `App()`, som i dette tilfælde returnerer ren html-kode

```tsx
function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <img src="/favicon.svg" alt="" className="h-16 w-16" />
      <h1 className="text-4xl font-semibold">Svært og Trolddom</h1>
    </div>
  );
}
```

html koden bestå af 3 elementer, vi har det yderste `<div>`-tag som indeholder de 2 andre elementer. Det beskriver hvordan siden skal visualiseres

```tsx
<div className="flex min-h-screen flex-col items-center justify-center gap-4">
  ...
</div>
```

`div` er et generelt tag, som kan bruges til det meste. Her definerer det det grundlæggende layout af siden - at indholdet skal fylde hele skærmens højde og stå centreret.

Inde i div'en har vi et `img`-tag, som viser sidens favicon:

```tsx
<img src="/favicon.svg" alt="" className="h-16 w-16" />
```

Og et `h1`-tag, som viser sidens overskrift:

```tsx
<h1 className="text-4xl font-semibold">Svært og Trolddom</h1>
```

Til sidst eksporterer vi `App`-komponenten, så den kan importeres og bruges i `main.tsx`:

```tsx
export default App;
```
