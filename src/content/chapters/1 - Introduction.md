Denne side tilbyder en praktisk introduktion til hvordan man kan lave et webspil baseret på sværd og trolddom med brug af værktøjer som React og TypeScript.
Det primære mål er at tilegne sig færdigheder til selv at udvikle webbaserede spil i samme stil og få en generel viden om udvikling af hjemmesider med React og TypeScript.

I dette kapitel præsenterer vi kort hvad Sværd og Trolddom er, hvilke værktøjer vi bruger og hvorfor, og hvilket spil vi gerne vil udvikle.

# Hvad er Sværd og Trolddom

Sværd og Trolddom er en bogserie skrevet af Ian Livingstone. Det er en "choose your own adventure", hvor historien er afhængig af spillerens valg. I hver bog er man en person der begiver sig ud på et eventyr. De fleste bøger foregår i en fantasyverden, hvor man er udstyret med sværd, rustning, guld og proviant. Undervejs møder man forskellige karakterer og udfordringer og har mulighed for at samle forskellige genstande der gør det muligt at udforske andre dele af verdenen. I de fleste bøger skal spilleren ud og besejre en ond skurk for at vinde.

Når man starter spillet, bruges to sekssidede terninger til at bestemme spillerens evne, udholdenhed og held. Undervejs bruges terningerne også til at bestemme udfaldet af forskellige situationer, fx. kampe. Under eventyret bruger man et eventyrskema til at holde styr på sin evne, udholdenhed og held samt hvilke genstande man har, og hvor meget guld man har.

Spillet foregår ved at man bevæger sig igennem forskellige 'rum', eller 'situationer'. Her kan man møde forskellige valgmuligheder. Disse kan fx være:

> Vil du klatre op i træet for at få bedre udsyn, gå til 287. Vil du i stedet undersøge kisten, gå til 181. Eller vil du gå tilbage til vejen og fortsætte mod nord, gå til 24.

Derfra fortsætter man til det valgte afsnit, hvorefter eventyret fortsætter indtil man vinder eller dør.

# Introduktion til Webudvikling

En hjemmeside er grundlæggende bygget op af tre lag: **struktur** (hvad indholdet er), **styling** (hvordan det ser ud) og **funktionalitet** (hvordan siden opfører sig og reagerer på brugeren). Disse tre lag håndteres typisk med hvert deres værktøj, og tilsammen udgør de det, man kalder et **techstack**. Oprindeligt har man ofte brugt HTML til strukturen, CSS til styling og JavaScript til at definere funktionaliteten. I dette forløb bruger vi dog nyere værktøjer, bl.a. React, TypeScript og Tailwind til at dække de tre lag - det gennemgår vi i detaljer i næste kapitel.

Når man snakker om webudvikling, snakker man ofte om **frontend** og **backend**. Frontend er det, brugeren ser og interagerer med. Det er det, vi har beskrevet ovenfor. Backend er derimod den del, der kører på en server, og som typisk står for at gemme og håndtere data permanent.

I dette forløb fokuserer vi næsten udelukkende på frontend. For at undgå at skulle bygge en rigtig backend, tyr vi til et par genveje undervejs, og vi bruger browserens egen hukommelse til at gemme data lokalt i stedet for på en server. Det gør, at vi kan koncentrere os om at lære frontend-værktøjerne at kende.

# Svært og Trolddom

Svært og Trolddom er et spil der kører i en webbrowser, som er baseret på Sværd og Trolddom. Det indeholder mange af de samme elementer som Sværd og Trolddom, men der er også mulighed for at tilføje flere elementer senere i forløbet.

Grundlæggende skal man kunne lave en **karakter** med navn, ejendele og færdigheder, som kan bevæge sig rundt i verdenen. Verdenen er defineret som **rum**, eller afsnit, og kan ligesom i Sværd og Trolddom være steder som egentlige rum, en kælder, en bjergside eller et vejkryds.

I hvert rum kan man møde forskellige karakterer og situationer. Det kan for eksempel være en troldmand der sælger et magisk sværd, en låst dør man kun kan åbne med den rette nøgle, eller en trold man vækker, hvis man larmer for meget.

Ligesom i Sværd og Trolddom vil mange udfald være baseret på terningkast.

Vi vil udvikle spillet i etapper, samtidig med at vi lærer mere om webudvikling. Rækkefølgen er:

- En simpel udgave, hvor man kan gå fra rum til rum.
- Mulighed for at samle guld.
- Mulighed for at møde karakterer, som vi kan handle med.
- Mulighed for at slås mod monstre med våben, vi har købt.
