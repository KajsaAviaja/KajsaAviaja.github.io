I dette kapitel starter vi med at sætte det basale op, så vi kan udvikle vores hjemmeside. Vi starter med at installere alle nødvendige programmer, og derefter kan vi downloade startfilerne for vores hjemmeside.

I det følgende skal vi:

- Installere VSCode
- Installere Node.js
- Downloade projektet
- Installere Tailwind og React Router
- Sørge for at siden kører i vores browser

# VSCode

VS Code er det program, vi skriver vores kode i.
Vi gennemgår nu, hvordan man downloader **VSCode** (Visual Studio Code).

1. Gå ind på [code.visualstudio.com](https://code.visualstudio.com/)
2. Klik på den sorte download-knap midt på siden. Siden burde selv opdage, hvilket styresystem du bruger, og downloade den rigtige version. Ellers burde der være en knap med "Other platforms", hvor du kan vælge den rigtige platform.
3. Åbn filen, du lige har downloadet.
4. Accepter licensaftalen, og klik **Next**.
5. Under næste trin, **Select Additional Tasks**, anbefaler vi, at du sætter flueben ved:
   - Add "Open with Code" action to Windows Explorer file context menu
   - Add "Open with Code" action to Windows Explorer directory context menu
   - Register Code as an editor for supported files types
   - Add to PATH

     De 2 første punkter gør, at man kan højreklikke på en fil eller mappe og åbne den direkte i VSCode.

6. Klik **Install**, og til sidst **Exit**. VSCode burde nu åbne automatisk.

Afhængig af versionen kan der være forskel på rækkefølgen, og du bliver måske spurgt om, hvor programmet skal installeres - der er default fint.

# Node.js

**Node.js** er det, der gør, at vi kan køre kode skrevet i Typescript, samt til at installere alle de værktøjer og biblioteker (fx React og Tailwind), vi skal bruge undervejs.

1. Gå ind på [nodejs.org](https://nodejs.org/)
2. Tryk på knappen **Get Node.js**
3. Tryk på knappen **Windows Installer (.msi)** nederst på siden. Sørg for at det rigtige operativsystem er valgt.
   Download versionen der hedder **LTS** (Long Term Support) som er den mest stabile version.
4. Åbn filen, du lige har downloadet.
5. Klik **Next** på velkomstskærmen.
6. Accepter licensaftalen, og klik **Next**.
7. Standardplaceringen for installationen er fin, så klik **Next**.
8. Under **Custom Setup** bør du kunne lade alting stå som det er. Sørg for at
   - Node.js runtime
   - npm package manager
   - Add to PATH

   er markerede til at blive installeret - klik **Next**.

9. Hvis du bliver spurgt om at installere yderligere værktøjer (**Tools for Native Modules**), lader du bare boksen være umarkeret.
10. Klik **Install**.
11. Når installationen er færdig, skal du åbne en terminal (fx VSCodes indbyggede terminal, som du finder i topbaren under **Terminal** > **New Terminal**) og skrive

```bash
node -v
```

Det burde skrive versionen af Node.js, du har installeret, fx `v22.11.0`.

Hvis det ikke virker, kan du prøve at genstarte computeren eller bruge en anden terminal.

# Hent skabelonen

Nu hvor vi har vores værktøjer installeret, skal vi hente startfilerne til vores hjemmeside.

1. Download filen [her](/files/svaert-og-troldom-template.zip).
2. Find den downloadede zip-fil (typisk i din Downloads-mappe), højreklik på den, og vælg **Pak alt ud...** (Extract All...) for at udpakke den. Vælg en mappe, du kan finde igen.

Afhængig af hvilke indstillinger VSCode er blevet installeret med, kan du enten:

1. Find mappen i din stifinder
2. Højreklik på mappen og vælg **Open with Code**

Eller, hvis muligheden ikke er tilgængelig:

1. Åbn VSCode, og vælg **Fil** > **Åben Mappe...** i topbaren. Find og vælg den mappe, du lige har udpakket.
2. VSCode åbner nu projektet.

# Tailwind og React Router

Skabelonen er allerede bygget med React, Vite, Tailwind og React Router. De er alle sammen listet i projektets `package.json`, som fortæller, hvilke pakker projektet indeholder. De er dog kun listet og skal downloades, før de kan bruges. Det gør vi ved:

1. Åbn en terminal inde i VSCode under **Terminal** > **Ny Terminal**.
2. Skriv `npm install` i terminalen og tryk **Enter**

`npm` (Node Package Manager) læser `package.json` og henter koden fra alle de pakker, projektet har brug for, herunder Tailwind og React Router. De bliver herefter gemt i mappen `node_modules`.

# Kør siden i browseren

Nu er vi klar til at se vores hjemmeside køre.

1. I terminalen skriver du

```bash
npm run dev
```

Det starter hjemmesidens lokale server. Det er altså en side, du kun kan se lokalt på din egen pc.

2. Terminalen returnerer en adresse, typisk `http://localhost:8080`. Hold **Ctrl** nede, og klik på linket. Det burde åbne linket i din browser. Ellers kopier adressen ind i din browser.
3. Du skulle nu gerne se den simple forside fra skabelonen i din browser.

Så længe `npm run dev` kører i terminalen, vil siden automatisk opdatere sig selv, hver gang du gemmer en ændring i koden. Du stopper serveren igen ved at trykke **Ctrl + C** i terminalen eller lukke terminalen eller VSCode.
