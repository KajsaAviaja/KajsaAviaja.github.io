Det første vi gør, er at lave en side kaldet eventyrskemaet, hvor vi kan bestemme eventyrerens navn.
Vi kommer til at lære

- Hvordan man laver funktionalitet for at navigere mellem flere sider
- Hvordan vi laver en ny side
- Hvordan vi gemmer data i browseren

Når vi starter med at udvikle, åbner vi altid projektet i VSCode og starter vores lokale hjemmeside i terminalen ved

```
npm run dev
```

og starter med at se, om vi kan åbne siden i vores browser.

# Oprettelse af siden "Eventyrskema"

Vi starter med at lave en ny mappe i `src`, som vi kalder `pages`. Det er her, vi tilføjer alle nye sider.
I mappen `src/pages` tilføjer vi en ny fil, som vi kalder `Eventyrskema.tsx`.

For at gøre det nemmere for os selv kopierer vi alt indhold fra `App.tsx` ind i `Eventyrskema.tsx`.
Den burde altså indeholde:

```tsx
function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <img src="/favicon.svg" alt="" className="h-16 w-16" />
      <h1 className="text-4xl font-semibold">Svært og Trolddom</h1>
    </div>
  );
}

export default App;
```

Derefter omdøber vi navnet på funktionen `function App()` til `function Eventyrskema()` og erstatter `App` på sidste linje med `Eventyrskema`.

Inden vi ændrer på, hvad der er på siden, skal vi tilføje funktionalitet, så vi kan se siden i vores browser.

# Brug React Router

Som vi har nævnt tidligere, bruger vi biblioteket **React Router** til at håndtere flere sider på vores hjemmeside. Det er ved hjælp af dette, at vi kan definere forskellige "sub-sider" på vores hjemmeside.
Vi tilføjer funktionaliteten til
`main.tsx`

Her skal vi bruge funktionen `createBrowserRouter` til at definere vores sider, og hvilke url'er de ligger på.
Vi tilføjer følgende kode til `main.tsx` for at definere vores _routes_ eller url'er:

```tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "eventyrskema", element: <Eventyrskema /> }],
  },
]);
```

Her definerer vi, at i vores rod, på url'en `http://localhost:8080/`, viser siden `<App />`, og at siden `http://localhost:8080/eventyrskema` viser `<Eventyrskema />`.

For at bruge routeren skal vi opdatere `main.tsx`, så den bruger vores `router` i stedet for kun at vise `<App />`. Vi erstatter derfor `<App />` med `<RouterProvider router={router} />`

Vores `main.tsx` skal derfor nu indeholde:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Eventyrskema from "./pages/Eventyrskema.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "eventyrskema", element: <Eventyrskema /> }],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
```

Husk at gemme alle filerne, ellers vil de ikke blive opdateret i browseren.

Gem filen, og gå ind på `http://localhost:8080/eventyrskema` i din browser. Du skulle nu gerne se den samme side som på forsiden, blot på en ny url - det betyder, at vores nye side og router virker.
