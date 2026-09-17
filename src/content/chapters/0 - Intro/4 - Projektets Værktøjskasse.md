I dette projekt bruges en samling af moderne værktøjer - projektets techstack - til at håndtere hvert af disse lag.
De gør det nemmere at udvikle en hjemmeside, da de kommer med en masse ekstra kode, som vi ikke behøver at skrive selv. De bygger også videre på JavaScript, som gør det nemmere at skrive kode uden at lave fejl.
I dette kapitel gennemgår vi kort de værktøjer, der bruges til at bygge vores webspil, og hvordan vi bruger dem.
Vi gennemgår det meget overfladisk og uden øvelser, men vi vender tilbage til de dele, vi aktivt bruger i vores kode i løbet af projektet.

# TypeScript

Browseren (den, der viser hjemmesiden for dig) forstår kun ét programmeringssprog: **JavaScript**. Så uanset hvad koden skrives i, skal den før eller siden blive til JavaScript.

**TypeScript** er et sprog, der bygger ovenpå JavaScript. Det ligner almindelig JavaScript, men det udvider sproget med typer. En type beskriver, hvilken slags data en værdi er. Det kan være at definere, at noget er et tal, en tekst eller sandt/falsk. Det bliver ofte defineret i en funktionsdeklaration eller i en variabel.

# Vite

**Vite** (udtales "veet") er et byggeværktøj, der gør det nemmere at bygge en hjemmeside, da vi ikke selv behøver at gøre det fra bunden. Hvis vi selv skrev hjemmesiden fra bunden, skulle vi selv stå for at give browseren de rigtige filer på det rigtige tidspunkt, der tager alle filerne og oversætter og samler dem til noget, en browser kan vise.
Det er Vite, der håndterer den lokale server, vi kan se siden på.

# React

## React Router

De fleste hjemmesider, man kender, består af flere "sider" - fx en forside, en om-os-side og en kontakt-side. Normalt, når man klikker på et link, henter browseren en helt ny side fra internettet og genindlæser alting. Det kan normalt være lidt besværligt at håndtere, så bruger vi React Router til at gøre det meget simpelt for os. Det gør, at vi ikke behøver at have separate filer til funktionalitet (JavaScript) og struktur (HTML), da det samler det i en TSX-fil.

## Tailwind CSS

CSS er tidligere introduceret som det, der bruges til at definere, hvordan siden ser ud. Normalt skriver man CSS i en separat fil, hvor man definerer regler for, hvordan tingene skal se ud. Det gør, at vi også kan undgå at bruge CSS-filer, så vi kun behøver at holde styr på TSX-filer.

# JSON

**JSON** (JavaScript Object Notation) er et format til at skrive data på en struktureret måde, som er letlæseligt for både mennesker og computere. Man kan i JSON definere forskellige objekter og lister. I vores projekt bruger vi JSON til at gemme de forskellige rum i spillet samt information om spillerens helbred, held, evne og andre ting.
