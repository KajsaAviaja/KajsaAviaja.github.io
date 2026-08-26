Dette kapitel giver en kort introduktion til webudvikling samt hvilke værktøjer der bruges til udvikling af svært og trolddom.

# Hvad Består en Hjemmeside af

En hjemmeside er bygget op af flere lag, der arbejder sammen. I bund og grund består det af

- **HTML** (HyperText Markup Language) som definerer hjemmesidens struktur. Det er her man definerer, hvad der er overskrifter, tekst, billeder, knapper og links.
- **CSS** (Cascading Style Sheets) bruges til at definere, hvordan hjemmesiden ser ud. Her kan man definere farver på tekst og baggrunde, skrifttyper, afstand og layout.
- **JavaScript** gør hjemmesiden interaktiv. Man bruger det til at definere, hvad hjemmesiden gør, når man fx klikker på en knap eller et link.

## HTML

**HTML** er skelettet i en hjemmeside. Med HTML markerer man, hvad de forskellige dele af indholdet er - fx en overskrift, et afsnit tekst, et billede eller en knap. Browseren læser denne struktur og bruger den til at vise siden på skærmen.

HTML er bygget op af forskellige tags, der beskriver kompositionen af hjemmesiden. Her er et eksempel der viser at tagget `<div>` indeholder `<h1>` og `<p>`

```html
<div>
  <h1>Dette er en overskrift</h1>
  <p>Dette er en paragraf</p>
</div>
```

Det vil på hjemmesiden, i en meget simpel version, se ud som:

![Eksempel på HTML-kode vist i browseren](/images/html_example_1.png)

## CSS

**CSS** bestemmer, hvordan HTML-indholdet skal se ud. Det er her man definerer farver, skrifttyper, afstand mellem elementer og hvordan elementer er placeret på siden. Det kan være at bestemme, om elementer skal stå over hinanden (som på billedet) eller ved siden af hinanden.

Man kan enten definere **CSS** i en separat fil

```css
h1 {
  background-color: blue;
}
p {
  background-color: red;
}
```

eller direkte i HTML-koden

```html
<div>
  <h1 style="background-color:blue;">Dette er en overskrift</h1>
  <p style="background-color:red;">Dette er en paragraf</p>
</div>
```

Hvor `background-color` definerer baggrundsfarven af et element.

Begge muligheder resulterer i noget, der ligner

![Eksempel på HTML-kode vist i browseren](/images/html_example_1_color.png)

## JavaScript

**JavaScript** bruges til at definere, hvad hjemmesiden gør, og hvordan den reagerer på ting, der sker. Det kan for eksempel være når man klikker på en knap, udfylder et felt eller ruller ned ad siden. Det er også JavaScript, der styrer logikken bag at gemme og ændre data.

Uden JavaScript ville en hjemmeside være statisk. Det vil sige at man kun kan se indholdet, men ikke interagere med det.

Her er et eksempel med en knap, der tæller op, hver gang man klikker på den.

```livecounter

```

Vi definerer i html en knap, med `id="knap"` som fortæller vores hjemmeside, hvilken knap det er

```html
<button id="knap">Jeg er klikket 0 gange</button>
```

og bruger JavaScript til at definere funktionaliteten

```js
let antalKlik = 0;

const knap = document.getElementById("knap");

knap.addEventListener("click", () => {
  antalKlik = antalKlik + 1;
  knap.textContent = "Jeg er klikket " + antalKlik + " gange";
});
```

I vores JavaScript-kode definerer vi først en variabel `let antalKlik = 0;` til at holde styr på, hvor mange gange vi har klikket på knappen.

Derefter skal vi finde knappen på vores hjemmeside, så vi kan tilføje funktionaliteten. Der bruger vi `document.getElementById("knap");`, hvor `document` definerer hele hjemmesiden, og `getElementById("knap");` finder elementet med id'et `"knap"`, altså den knap vi har defineret i html.

Vi kan nu definere, hvad der sker, når vi klikker på knappen

```js
knap.addEventListener("click", () => {
  antalKlik = antalKlik + 1;
  knap.textContent = "Jeg er klikket " + antalKlik + " gange";
});
```

Vi bruger en `EventListener`, så koden reagerer hver gang, der er et `"click"`. Ved hvert `"click"` opdaterer vi variablen `antalKlik`, så der bliver tilføjet 1 hver gang man klikker. Og så opdaterer vi teksten på knappen `textContent`, så der står den nyeste værdi af `antalKlik` på knappen.

# Vores Techstack

I dette projekt bruger vi en samling af moderne værktøjer til at håndtere hvert af disse lag.

Når man bygger et program, bruger man sjældent kun ét værktøj. Man samler i stedet en række værktøjer, der hver især er gode til deres eget - det kaldes tilsammen et **techstack**. I dette kapitel gennemgår vi de værktøjer, vi bruger til at bygge dette webspil, og hvad de bruges til.

## TypeScript

Browseren (den, der viser hjemmesiden for dig) forstår kun ét programmeringssprog: **JavaScript**. Så uanset hvad vi skriver koden i, skal den før eller siden blive til JavaScript.

**TypeScript** er et sprog, der bygger ovenpå JavaScript. Det ser næsten ud som almindelig JavaScript, men med én vigtig tilføjelse: **typer**. En type beskriver, hvilken slags data en værdi er - fx om noget er et tal, en tekst eller sandt/falsk.

I TypeScript ville kode fra før se sådan ud:

```typescript
let antalKlik: number = 0;

const knap = document.getElementById("knap") as HTMLButtonElement;

knap.addEventListener("click", () => {
  antalKlik = antalKlik + 1;
  knap.textContent = "Jeg er klikket " + antalKlik + " gange";
});
```

Her fortæller vi TypeScript, at `antalKlik` altid skal være et tal (`number`), og at `knap` er en `HTMLButtonElement`. Gør vi noget forkert med disse, fx sætter `antalKlik` til en tekst, får vi en fejl med det samme. Her `"Jeg er klikket " + antalKlik + " gange"` vil automatisk blive til tal.

## Vite

Koden vi skriver, ligger i mange forskellige filer og er ofte ikke skrevet på en måde, browseren kan læse direkte (fx fordi den er TypeScript og ikke JavaScript). **Vite** (udtales "veet") er et byggeværktøj, der tager alle vores filer og oversætter og samler dem til noget, en browser kan vise.

Vite gør også noget, der er meget rart under udvikling: Når vi gemmer en ændring i koden, opdaterer Vite automatisk siden i browseren med det samme, uden at vi selv skal genindlæse siden. Det gør det hurtigt at se, om en ændring virker som forventet.

## React

**React** er et bibliotek (altså en samling af færdig kode, andre har skrevet, som vi kan bruge) til at bygge det, brugeren ser og klikker på - det kaldes en brugergrænseflade.

Kernen i React er idéen om **komponenter**. En komponent er en lille, selvstændig byggeklods - fx en knap, en boks med tekst, eller et helt menupunkt - som man kan genbruge flere steder på siden. Ligesom man kan bygge mange forskellige ting med de samme LEGO-klodser, kan man bygge en hel hjemmeside ved at kombinere mindre komponenter. Hver komponent bestemmer selv, hvordan den ser ud, og hvordan den opfører sig, og React sørger for, at siden automatisk opdateres, når indholdet i en komponent ændrer sig - fx når spilleren foretager et valg.

```tsx
function CounterDemo() {
  const [antalKlik, setAntalKlik] = useState(0);

  return (
    <div>
      <button
        type="button"
        onClick={() => setAntalKlik((n) => n + 1)}
        className="her defineres styling"
      >
        Jeg er klikket {antalKlik} gange
      </button>
    </div>
  );
}
```

I React-koden definerer vi først en variabel til at holde styr på, hvor mange gange vi har klikket, ligesom i JavaScript-eksemplet - men i stedet for en almindelig variabel bruger vi `const [antalKlik, setAntalKlik] = useState(0);`. `useState` er en indbygget funktion i React, kaldet en **hook**, der gør, at React kan huske en værdi hen over tid og automatisk opdatere skærmen, når værdien ændrer sig. `useState(0)` returnerer to ting: selve værdien, her kaldet `antalKlik`, og en funktion `setAntalKlik`, som vi bruger til at ændre værdien.

I modsætning til JavaScript-eksemplet skal vi ikke selv finde knappen på siden med `getElementById`. I React skriver vi i stedet direkte, hvordan siden skal se ud, i en syntaks der kaldes **JSX** - det er det, der står inde i `return (...)`. Her definerer vi en `<button>` med en `onClick`, der bestemmer, hvad der skal ske, når man klikker på knappen.

```tsx
<button
  type="button"
  onClick={() => setAntalKlik((n) => n + 1)}
  className="her defineres styling"
>
  Jeg er klikket {antalKlik} gange
</button>
```

Vi bruger `onClick`, så koden reagerer, hver gang der bliver klikket på knappen. Ved hvert klik kalder vi `setAntalKlik((n) => n + 1)`. Her giver vi `setAntalKlik` en lille funktion, `(n) => n + 1`, i stedet for bare et tal. `n` er her den nuværende værdi af `antalKlik`, og funktionen fortæller React, at den nye værdi skal være `n + 1`, altså den gamle værdi plus 1. Fordi vi bruger `setAntalKlik` i stedet for selv at ændre variablen direkte, ved React, at værdien er ændret, og opdaterer automatisk teksten `Jeg er klikket {antalKlik} gange` på skærmen - modsat JavaScript-eksemplet, hvor vi selv skulle opdatere `knap.textContent` manuelt.

### React Router

De fleste hjemmesider, man kender, består af flere "sider" - fx en forside, en om-os-side og en kontakt-side. Normalt, når man klikker på et link, henter browseren en helt ny side fra internettet og genindlæser alting.

Vores webspil er derimod det, man kalder en **single-page application** - det vil sige, at der reelt kun er én side, som blot skifter indhold ud, alt efter hvor man er i spillet (fx et kapitel eller et valg). **React Router** er det værktøj, der styrer denne navigation: Det holder styr på, hvor i spillet man er (så man fx kan bruge browserens frem/tilbage-knapper), og skifter det viste indhold ud - uden at hele siden skal genindlæses fra bunden. Det gør det hele føles hurtigere og mere som en "app" end en traditionel hjemmeside.

## Tailwind

Vi har tidligere introduceret CSS, som bruges til at definere, hvordan siden ser ud. Normalt skriver man CSS i en separat fil, hvor man definerer regler for, hvordan tingene skal se ud.

I vores projekt bruger vi Tailwind i stedet for almindelig CSS. Tailwind tilbyder en masse foruddefinerede CSS-klasser, vi kan bruge direkte i vores kode. Vi kan altså skrive

```html
<div>
  <h1 style="bg-blue">Dette er en overskrift</h1>
  <p style="bg-red">Dette er en paragraf</p>
</div>
```

Hvor vi i stedet for at skrive `"background-color:blue;"` skriver `"bg-blue"`.  
Det gør, at vi ikke behøver at skrive nogen CSS-filer, hvilket kan gøre det lidt nemmere at holde styr på projektet og style elementer, da det hele foregår i én fil.

## JSON

**JSON** (JavaScript Object Notation) er et format til at skrive data på en struktureret måde, som er letlæseligt for både mennesker og computere. Man kan i JSON definere forskellige objekter og lister.
Her er et eksempel på et JSON-objekt, der beskriver et rum:

```json
{
  "titel": "En lang korridor",
  "tekst": "Du står i en lang mørk korridor. Til venstre er der en dør, og du kan se lys komme ud under døren.",
  "valg": ["Åbn døren", "Gå videre", "Gå tilbage"]
}
```

Eksemplet beskriver 3 properties. Hver property er skrevet som et navn/værdi-par.

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

## Git

Når man arbejder på det samme projekt over tid, bliver det hurtigt svært at holde styr på, hvem der har ændret hvad og hvornår, og hvordan man går tilbage, hvis noget går i stykker. **Git** er et versionsstyringssystem, der løser det problem.

Med Git kan man løbende gemme "øjebliksbilleder", kaldet **commits**, af, hvordan koden så ud på et givent tidspunkt. Det betyder, at man kan, se præcis, hvad der er blevet ændret, og hvornår, gå tilbage til en tidligere version, hvis en ændring viser sig at være en fejl. Når man samarbejder flere sammen kan det også bruges til at arbejde parallelt med andre uden at overskrive hinandens arbejde, fordi Git kan samle (merge) forskellige personers ændringer.

I dette projekt bruger vi hovedsageligt git til at hente startfilerne som ligger på git.
