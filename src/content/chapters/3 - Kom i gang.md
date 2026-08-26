I dette kapitel starter vi med at sætte det basale op, så vi kan udvikle vores hjemmeside. Vi starter med at installere alle nødvendige programmer, og derefter henter vi vores startside fra Git.

I det følgende skal vi:

- Installere VSCode
- Installere Node.js
- Installere Git
- Klone en tom hjemmeside fra GitHub - hvor vi får en simpel forside
- Installere Tailwind og React Router
- Sørge for at siden kører i vores browser

# VSCode

Vi gennemgår nu, hvordan man downloader **VSCode** (Visual Studio Code), som er det program, vi skriver kode i.

1. Gå ind på [code.visualstudio.com](https://code.visualstudio.com/)
2. Klik på den sorte download-knap midt på siden. Siden burde selv opdage, hvilket styresystem du bruger, og downloade den rigtige version. Ellers burde der være en knap med "Other platforms".
3. Åbn den fil, du lige har downloadet.
4. Accepter licensaftalen, og klik **Next**.
5. Under næste trin, **Select Additional Tasks**, anbefaler vi, at du sætter flueben ved:
   - Add "Open with Code" action to Windows Explorer file context menu
   - Add "Open with Code" action to Windows Explorer directory context menu
   - Register Code as an editor for supported files types
   - Add to PATH
     De 2 første punkter gør, at man kan højreklikke på en fil eller mappe og åbne den direkte i VSCode.

6. Klik **Install**, og til sidst **Exit**. VSCode åbner nu automatisk.

Afhængig af versionen kan der være forskel på rækkefølgen, og du bliver måske spurgt om, hvor programmet skal installeres - der er default fint.

# Node.js

**Node.js** er det, der gør, at vi kan køre og teste vores hjemmeside lokalt på computeren, samt til at installere alle de værktøjer og biblioteker (fx React og Tailwind), vi skal bruge undervejs.

1. Gå ind på [nodejs.org](https://nodejs.org/)
2. Tryk på knappen **Get Node.js**
3. Tryk på knappen **Windows Installer (.msi)** nederst på siden. Sørg for at det rigtige operativsystem er valgt (Windows/macOS).
   Download versionen der hedder **LTS** (Long Term Support) - det er den mest stabile version, og den vi anbefaler man bruger.
4. Åbn den downloadede `.msi`-fil.
5. Klik **Next** på velkomstskærmen.
6. Accepter licensaftalen, og klik **Next**.
7. Standardplaceringen for installationen er fin - klik **Next**.
8. Under **Custom Setup** kan du bare lade alting stå som det er. Det vigtige er, at Node.js runtime, npm package manager og Add to PATH er markerede til at blive installeret - klik **Next**.
9. Hvis du bliver spurgt om at installere yderligere værktøjer (**Tools for Native Modules**), lader du bare boksen være umarkeret.
10. Klik **Install**, og accepter eventuelt at give programmet lov til at foretage ændringer på computeren.
11. Når installationen er færdig, skal du åbne en terminal (fx VSCodes indbyggede terminal, som du finder i topbaren under **Terminal** > **New Terminal**) og skrive

```bash
node -v
```

Det burde skrive versionen af Node.js, du har installeret, fx `v22.11.0`.

# Git

Vi gennemgår nu, hvordan vi henter **Git** og sætter det op, så vi kan bruge det til at hente (og senere gemme) kode fra GitHub.

1. Gå ind på [git-scm.com/downloads](https://git-scm.com/downloads)
2. Vælg **Windows**, og download den nyeste version (**64-bit Git for Windows Setup**).
3. Åbn den downloadede `.exe`-fil.
4. Accepter licensaftalen, og klik **Next**.
5. Standardplaceringen for installationen er fin - klik **Next**.
6. Under **Select Components** kan du lade standardvalgene stå, som de er - klik **Next**.
7. Under **Choosing the default editor used by Git** kan du vælge **Use Visual Studio Code as Git's default editor**, da vi allerede har installeret det.
8. De næste mange skærmbilleder (om PATH-miljøet, HTTPS-transport, linjeskift, terminal-emulator osv.) kan du roligt klikke **Next** igennem - standardindstillingerne er dem, vi skal bruge.
9. Klik til sidst **Install**, og vent på, at installationen bliver færdig.
10. Åbn en terminal, og skriv

```bash
git --version
```

Det burde skrive den version af Git, du har installeret, fx `git version 2.47.0`. Kan du se et versionsnummer, er installationen lykkedes.

# Klon startsiden

Nu hvor vi har vores værktøjer installeret, skal vi hente startfilerne til vores hjemmeside. Vi tager udgangspunkt i en tom skabelon-side, der ligger på GitHub på adressen [github.com/KajsaAviaja/svaert-og-trolddom-template](https://github.com/KajsaAviaja/svaert-og-trolddom-template).

1. Åbn en terminal, og naviger hen til den mappe, hvor du vil have projektet liggende, fx skrivebordet:

```bash
cd Desktop
```

2. Klon repositoriet ned på din computer:

```bash
git clone https://github.com/KajsaAviaja/svaert-og-trolddom-template.git
```

Det opretter en ny mappe, `svaert-og-trolddom-template`, med alle projektets filer.

3. Naviger ind i den nye mappe:

```bash
cd svaert-og-trolddom-template
```

4. Åbn mappen i VSCode:

```bash
code .
```

Nu skulle du gerne kunne se projektets filer i VSCode's sidepanel til venstre.

# Tailwind og React Router

Skabelonen er allerede bygget med React, Vite, Tailwind og React Router - de er alle sammen listet i projektets `package.json`, som fortæller, hvilke pakker projektet afhænger af. De er dog endnu ikke hentet ned på din computer, så det skal vi gøre nu.

1. Åbn en terminal inde i VSCode under **Terminal** > **New Terminal**. Den åbner automatisk i projektmappen.
2. Skriv

```bash
npm install
```

`npm` (Node Package Manager) læser `package.json` og henter alle de pakker, projektet har brug for - herunder Tailwind og React Router - ned i en mappe, der hedder `node_modules`. Det kan tage lidt tid, afhængig af din internetforbindelse.

# Kør siden i browseren

Nu er vi klar til at se vores hjemmeside køre.

1. I terminalen skriver du

```bash
npm run dev
```

Det starter Vite's udviklingsserver.

2. Terminalen skriver en adresse ud, typisk `http://localhost:8080`. Hold **Ctrl** nede, og klik på linket (eller kopier adressen ind i din browser).
3. Du skulle nu gerne se den simple forside fra skabelonen i din browser.

Så længe `npm run dev` kører i terminalen, vil siden automatisk opdatere sig selv, hver gang du gemmer en ændring i koden. Du stopper serveren igen ved at trykke **Ctrl + C** i terminalen.
