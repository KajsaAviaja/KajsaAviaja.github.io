Før vi starter på at udvikle spillet, gennemgår vi, hvad en hjemmeside egentligt er. Vi gennemgår først, hvad en hjemmeside består af, og så gennemgår vi de forskellige områder, hvor vi løbende laver øvelser, hvor vi bruger de forskellige elementer.

En hjemmeside er grundlæggende bygget op af tre lag:

- **struktur** - hvad indholdet er
- **styling** - hvordan det ser ud
- **funktionalitet** - hvordan siden opfører sig og reagerer på brugeren

De tre lag bliver håndteret af hver deres teknologi:

- **HTML** (HyperText Markup Language) som definerer hjemmesidens struktur. Det er her du definerer, hvad der er overskrifter, tekst, billeder, knapper og links.
- **CSS** (Cascading Style Sheets) bruges til at definere, hvordan hjemmesiden ser ud. Her kan du definere farver på tekst og baggrunde, skrifttyper, afstand og layout.
- **JavaScript** gør hjemmesiden interaktiv. Du bruger det til at definere, hvad hjemmesiden gør, når du fx klikker på en knap eller et link.

Senere i dette forløb bliver du dog introduceret til nyere værktøjer, der dækker disse 3 lag, men en hjemmeside vil altid i bund og grund bestå af disse 3 lag, så vi starter først med at gennemgå det basale.

Når du snakker om webudvikling, snakker du ofte om **frontend** og **backend**. Frontend er det, du som bruger ser og interagerer med. Det er det, der er beskrevet ovenfor. Backend er derimod den del, der kører på en server, som din browser kommunikerer med over internettet, og som typisk står for at sende data, du kan se i din browser, og håndtere og gemme data permanent.

I dette forløb fokuserer vi hovedsageligt på frontend. Vi vil derfor tage et par genveje undervejs for at undgå at udvikle en rigtig backend. Vi skal nok gøre opmærksom på, når vi gør noget nemmere end backend. Det gør, at du kan koncentrere dig om at lære frontend-værktøjerne at kende.

\begin{task}

Vi vil nu gennemgå, hvordan man bygger en basal hjemmeside. Til det bruger vi et lille projekt, du kan downloade [her](/files/Basis%20Hjemmeside.zip). Start med at unzippe filen og åbn mappen i VSCode. Dette kan enten gøres ved at højreklikke på mappen og vælge `Open with Code` eller ved at åbne VSCode og vælge `Fil > Åben Mappe...` og finde mappen, du lige har downloadet.

Find nu mappen i din stifinder, åbn mappen og højreklik på filen `struktur.html` og vælg `Åben`. Det burde åbne en side i din browser med teksten **Velkommen!**.
\end{task}

# HTML

**HTML** definerer skelettet i en hjemmeside. Du bruger HTML til at strukturere hjemmesiden og definere, hvad de forskellige dele af indholdet er. Fx en overskrift, et afsnit med tekst, et billede eller en knap. Browseren læser denne struktur og bruger den til at vise indholdet af siden på skærmen.

HTML er bygget op af en række _HTML-elementer_, der beskriver kompositionen af hjemmesiden.

\begin{concept}[HTML-element]
Et HTML-element består af et starttag, et sluttag og indhold:
\begin{center}
`<tagnavn>indhold...</tagnavn>`
\end{center}
Tagnavnet er navnet på et HTML-element, der kan findes [her](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)
Du kan også have HTML-elementer uden indhold; disse kaldes tomme elementer og består kun af et tag, enten `<tagnavn/>` eller `<tagnavn>`.
\end{concept}

Filen `SimpelHjemmeside.html` indeholder:

```html filename="SimpelHjemmeside.html"
<!DOCTYPE html>
<html lang="da">
  <head>
    <meta charset="UTF-8" />
    <title>Velkommen!</title>
    <link rel="stylesheet" href="styling.css" />
  </head>
  <body>
    <h1>Velkommen!</h1>
    <script src="funtionalitet.js"></script>
  </body>
</html>
```

Den består af HTML-elementerne:

- `<!DOCTYPE>` er faktisk ikke et HTML-element. Definerer dokumenttypen, her definerer det, at dokumentet er af typen HTML.
- `<html></html>` definerer roden af dokumentet, det er heri man skriver alle HTML-elementer, der bruges på siden.
- `<head></head>` indeholder meta-data for dokumentet. Det er ting, man ikke ser på siden, men her definerer man information, der er brugbar for browseren. Det er her, man definerer sproget, hvad der står i tabben i browseren, og hvad styling der bruges.
- `<meta>`, `<titel></titel>` og `<link/>` definerer det nævnte ovenfor.
- `<body></body>` indeholder alt hvad vi kan se på hjemmesiden.
- `<h1></h1>` definerer en overskrift. Det definerer altså, at _Velkommen!_ er en overskrift.
- `<script></script>` på trods af, at det ligger i `<body>`, kan man ikke se dette element. Det bruges i stedet til at definere, hvor man kan finde filen, der definerer funktionaliteten.

\begin{task}
Åbn `SimpelHjemmeside.html` i browseren, som beskrevet ovenfor, og i VS Code. Under `<h1>Velkommen!</h1>` tilføj et nyt element `<p></p>`. Elementet `<p>` er brugt til paragraffer. Skriv noget tekst mellem start-tagget `<p>` og slut-tagget `</p>`. Hvis du gemmer dokumentet og reloader siden, burde du kunne se den tekst, du har tilføjet, under "Velkommen!".

\begin{solution}
Indholdet på siden kunne se ud som:

```html filename="SimpelHjemmeside.html"
<!DOCTYPE html>
<html lang="da">
  <head>
    <meta charset="UTF-8" />
    <title>Velkommen!</title>
    <link rel="stylesheet" href="styling.css" />
  </head>
  <body>
    <h1>Velkommen!</h1>
    <p>Her er et eksempel på en hjemmeside</p>
    <script src="funtionalitet.js"></script>
  </body>
</html>
```

\end{solution}
\end{task}

\begin{task}
Nu tilføjer du et nyt tag, som har brug for noget mere information. Tilføj et nyt element under `<p></p>`: et nyt element `<button></button>`. I modsætning til `<h1>` og `<p>` er `<button>` et interaktivt element, og vi skal derfor tilføje nogle attributter. Vi giver den derfor et navn, så vi kan finde knappen, når vi angiver funktionalitet senere. Vi skal derfor ændre starttaget til `<button id="mit_id">`. Ligesom med `<h1>` og `<p>` kan du tilføje tekst mellem start- og sluttagget, som bliver vist på siden.
Hvis du gemmer dokumentet og reloader siden, burde du kunne se den knap, du har tilføjet.

\begin{solution}
Indholdet på siden kunne se ud som:

```html filename="SimpelHjemmeside.html"
<!DOCTYPE html>
<html lang="da">
  <head>
    <meta charset="UTF-8" />
    <title>Velkommen!</title>
    <link rel="stylesheet" href="styling.css" />
  </head>
  <body>
    <h1>Velkommen!</h1>
    <p>Her er et eksempel på en hjemmeside</p>
    <button id="mit_id">Klik mig!</button>
    <script src="funtionalitet.js"></script>
  </body>
</html>
```

\end{solution}
\end{task}

# CSS

**CSS** bestemmer, hvordan HTML-indholdet skal se ud. Det er her du definerer farver, skrifttyper, afstand mellem elementer og hvordan elementer er placeret på siden. Det kan være at bestemme, om elementer skal stå over hinanden eller ved siden af hinanden.

Du kan enten definere **CSS** i en separat fil eller direkte i HTML-koden.

Filen `styling.css` indeholder den styling, der bliver brugt på vores simple hjemmeside. Den indeholder koden

```css
body {
  font-family: sans-serif;
  text-align: center;
  margin-top: 100px;
}
```

hvor `body {...}` er en CSS-regel, der bestemmer, hvordan elementet `<body>...</body>` ser ud. De indeholder en række deklarationer, såsom `font-family: sans-serif;`, der alle angiver værdien på en property. Der eksisterer mange properties, og vi vil ikke gennemgå dem her, men de kan findes [her](https://www.w3schools.com/cssref/index.php).

\begin{concept}[CSS-regel]
En CSS-regel består af en `Selector` og et sæt deklarationer. De angiver, hvordan et HTML-element ser ud ved hjælp af en række properties. En CSS-regel har formen:

```css
Selector {
  property: Value;
}
```

hvor `Selector` er navnet på reglen og bestemmer det HTML-element, vi vil style.

`Property: Value;` er en deklaration og består af et navn på en CSS-egenskab `Property` og en værdi `Value`.

Flere CSS-deklarationer adskilles med semikoloner, og deklarationsblokke omsluttes af krøllede parenteser.
\end{concept}

\begin{task}
Prøv at ændre på farven på `<button>`. Her skal du oprette en ny regel `button {}` og tilføje en property `background-color`. En liste med farver, der er understøttet, kan findes [her](https://www.w3schools.com/cssref/css_colors.php).

\begin{solution}
Reglen for at bestemme baggrundsfarven på knappen kunne se ud som:

```css
button {
  background-color: Aqua;
}
```

\end{solution}
\end{task}

# JavaScript

TBA
