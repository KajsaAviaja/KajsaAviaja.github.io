Velkommen! Denne side giver dig en praktisk introduktion til, hvordan du bygger dit eget webspil baseret på [[Sværd og Trolddom]].
Målet er at lære det grundlæggende i webudvikling med [[React]], mens du undervejs udvikler et webbaseret spil i samme stil som Sværd og Trolddom.

I dette kapitel ser vi kort på, hvad Sværd og Trolddom er, og hvilket spil du skal bygge.

# Hvad er Sværd og Trolddom

Sværd og Trolddom er en bogserie skrevet af Ian Livingstone. Det er et "choose your own adventure"-spil, hvor historien afhænger af dine valg. I hver bog er du en eventyrer, der begiver sig ud på en lang og farefuld rejse. De fleste bøger foregår i en fantasyverden, hvor du er udstyret med sværd, rustning, guld og proviant. Undervejs møder du forskellige karakterer, monstre og udfordringer, og du kan samle genstande, der gør det muligt at udforske nye dele af verdenen. I de fleste bøger skal du besejre en ond skurk for at vinde.

Når du starter spillet, bruger du to sekssidede terninger til at bestemme din evne, udholdenhed og held. Undervejs bruger du terningerne til at afgøre udfaldet af forskellige situationer. Det kan være alt fra kampe til udfald af samtaler. Under eventyret bruger du et eventyrskema til at holde styr på din evne, udholdenhed og held samt hvilke genstande og hvor meget guld du har.

Spillet foregår ved, at du bevæger dig igennem forskellige "rum" eller "situationer". Her møder du forskellige valgmuligheder. De kan fx være:

> Vil du klatre op i træet for at få bedre udsyn, gå til 287. Vil du i stedet undersøge kisten, gå til 181. Eller vil du gå tilbage til vejen og fortsætte mod nord, gå til 24.

Derfra fortsætter du til det valgte afsnit, og eventyret fortsætter, indtil du vinder eller dør.

# Svært og Trolddom

I denne guide bygger du spillet Svært og Trolddom. Du starter først med at lave et eventyrskema, hvor man kan angive eventyrerens navn. Derefter bygger vi de første rum, som gør det muligt at spille en meget simpel version af spillet, hvor man blot kan bevæge sig rundt i de forskellige "rum" eller "situationer".

Derefter implementerer du, at man kan møde de forskellige karakterer og situationer - det kan fx være en troldmand, der sælger et magisk sværd, en låst dør, du kun kan åbne med den rette nøgle, eller en trold, du vækker, hvis du larmer for meget. Ligesom i Sværd og Trolddom vil mange udfald være baseret på terningkast.

Du bygger spillet i faser, og undervejs lærer du mere og mere om webudvikling. Faserne er:

- Et grundlæggende spil, med eventyrskema, hvor du kan gå fra rum til rum.
- Indsamling af guld og andre genstande.
- Møder med karakterer, du kan handle med.
- Kampe mod monstre med købte eller fundne våben.
- Fælder, du kan falde i.

Undervejs introduceres du løbende til mere om webudvikling med [[React]]. Det bliver blandt andet:

- De basale funktioner i React
- Hvad en 'Single Page Application' er, og hvorfor den bruges
- Hvordan du navigerer mellem forskellige sider og rum
- Hvordan du gemmer data i browseren
- Hvordan terningkast imiteres
- Hvordan du styler hjemmesiden og laver responsive design
