---
title: Webudvikling 101
excerpt: En introduktion til de værktøjer og teknologier, vi bygger webspillet med - forklaret for dig, der ikke har programmeret før.
order: 2
---

# Hvad Består en Hjemmeside af

En hjemmeside er bygget op af flere lag, der arbejder sammen. I bund og grund består det af

- **HTML** (HyperText Markup Language) er hjemmesidens struktur. Det er her indholdet defineres, altså overskrifter, tekst, billeder, knapper og links.
- **CSS** (Cascading Style Sheets) styrer, hvordan hjemmesiden ser ud, altså farver, skrifttyper, afstand og layout.
- **JavaScript** gør hjemmesiden interaktiv. Det gør det muligt for siden at reagere på brugerens handlinger og styre logikken bag funktionaliteten.

I dette projekt bruger vi en samling af moderne værktøjer til at håndtere hvert af disse lag.

Når man bygger et program, bruger man sjældent kun ét værktøj. Man samler i stedet en række værktøjer, der hver især er gode til deres eget - det kaldes tilsammen et **techstack**. I dette kapitel gennemgår vi de værktøjer, vi bruger til at bygge dette webspil, og hvad de bruges til.

# Typescript

Browseren (den, der viser hjemmesiden for dig) forstår kun ét programmeringssprog: **JavaScript**. Så uanset hvad vi skriver koden i, skal den før eller siden blive til JavaScript.

**TypeScript** er et sprog, der bygger ovenpå JavaScript. Det ser næsten ud som almindelig JavaScript, men med én vigtig tilføjelse: **typer**. En type beskriver, hvilken slags data en værdi er - fx om noget er et tal, en tekst eller sandt/falsk.

Forestil dig, at vi har skrevet et sted i koden, at en spillers "liv" altid skal være et tal (fx 10). Hvis vi et andet sted ved en fejl prøver at sætte liv til teksten "ti" i stedet for tallet 10, vil TypeScript advare os med det samme, mens vi skriver koden - i stedet for at spillet først crasher, når en spiller rent faktisk rammer den fejl under spil. Det gør det meget lettere at fange fejl tidligt, især når flere personer arbejder på det samme projekt.

# Vite

Koden vi skriver, ligger i mange forskellige filer og er ofte ikke skrevet på en måde, browseren kan læse direkte (fx fordi den er TypeScript og ikke JavaScript). **Vite** (udtales "veet") er et byggeværktøj, der tager alle vores filer og oversætter og samler dem til noget, en browser kan vise.

Vite gør også noget, der er meget rart under udvikling: Når vi gemmer en ændring i koden, opdaterer Vite automatisk siden i browseren med det samme, uden at vi selv skal genindlæse siden. Det gør det hurtigt at se, om en ændring virker som forventet.

# React

**React** er et bibliotek (altså en samling af færdig kode, andre har skrevet, som vi kan bruge) til at bygge det, brugeren ser og klikker på - det kaldes en brugergrænseflade.

Kernen i React er idéen om **komponenter**. En komponent er en lille, selvstændig byggeklods - fx en knap, en boks med tekst, eller et helt menupunkt - som man kan genbruge flere steder på siden. Ligesom man kan bygge mange forskellige ting med de samme LEGO-klodser, kan man bygge en hel hjemmeside ved at kombinere mindre komponenter. Hver komponent bestemmer selv, hvordan den ser ud, og hvordan den opfører sig, og React sørger for, at siden automatisk opdateres, når indholdet i en komponent ændrer sig - fx når spilleren foretager et valg.

# Tailwind

Når man skal bestemme, hvordan noget på en hjemmeside ser ud (farver, afstand, skriftstørrelse osv.), bruger man **CSS**. Normalt skriver man CSS i en separat fil, hvor man selv definerer regler for, hvordan tingene skal se ud.

**Tailwind** gør det lidt anderledes: I stedet for at skrive vores egne CSS-regler, tilføjer vi færdige klasser direkte på de elementer, vi vil style. Fx betyder klassen `text-center`, at teksten skal centreres, og `bg-red-500` betyder, at baggrunden skal være rød. Det er lidt ligesom at vælge fra en færdig menu af styling-muligheder, i stedet for selv at skulle opskrive opskriften fra bunden hver gang.

# React Router

De fleste hjemmesider, man kender, består af flere "sider" - fx en forside, en om-os-side og en kontakt-side. Normalt, når man klikker på et link, henter browseren en helt ny side fra internettet og genindlæser alting.

Vores webspil er derimod det, man kalder en **single-page application** - det vil sige, at der reelt kun er én side, som blot skifter indhold ud, alt efter hvor man er i spillet (fx et kapitel eller et valg). **React Router** er det værktøj, der styrer denne navigation: Det holder styr på, hvor i spillet man er (så man fx kan bruge browserens frem/tilbage-knapper), og skifter det viste indhold ud - uden at hele siden skal genindlæses fra bunden. Det gør det hele føles hurtigere og mere som en "app" end en traditionel hjemmeside.

# JSON

**JSON** (JavaScript Object Notation) er et format til at skrive data på en struktureret måde, som er letlæsligt for både mennesker og computere. Man kan i JSON definere forskellige objecter og lister.
Her er et eksempel på et JSON-object der beskriver et rum:

```json
{
  "titel": "En lang korridor",
  "tekst": "Du står i en lang mørk korridor. Til venstre er der en dør, og du kan se lys komme ud under døren.",
  "valg": ["Åbn døren", "Gå videre", "Gå tilbage"]
}
```

Eksemplet beskriver 3 properities. Hver property er skevet som en navn/værdi par.

Hver property har et navn:

- "titel"
- "tekst"
- "valg"

og en værdi

- "En lang korridor",
- "Du står i en lang mørk korridor. Til venstre er der en dør, og du kan se lys komme ud under døren.",
- ["Åbn døren", "Gå videre", "Gå tilbage"]

en værdi kan være mange forskellige ting, bla. tekst (strings), tal, lister og andre JSON-objekter. I vores eksempel er der 2 strings og en liste. Listen, `["Åbn døren", "Gå videre", "Gå tilbage"]`, består af 3 strings.

Vi bruger JSON til at gemme de forskellige rum i spillet.

# Git

Når flere personer arbejder på det samme projekt over tid, bliver det hurtigt svært at holde styr på, hvem der har ændret hvad, og hvordan man går tilbage, hvis noget går i stykker. **Git** er et versionsstyringssystem, der løser præcis det problem.

Med Git kan man løbende gemme "øjebliksbilleder", kaldet **commits**, af, hvordan koden så ud på et givent tidspunkt. Det betyder, at man altid kan:

- Se præcis, hvad der er blevet ændret, og hvornår.
- Gå tilbage til en tidligere version, hvis en ændring viser sig at være en fejl.
- Arbejde parallelt med andre uden at overskrive hinandens arbejde, fordi Git kan samle (merge) forskellige personers ændringer.

Det er det, der gør det muligt for flere at bidrage til det samme projekt uden at gå i vejen for hinanden.
