function Info() {
  return (
    <article>
      <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl dark:text-white">
        Info
      </h1>

      <p className="mt-4 max-w-prose text-base leading-7 text-stone-600 dark:text-stone-300">
        Svært og Trolddom er en gratis, webbaseret guide, der hjælper dig med at
        bygge dit eget webbaserede spil inspireret af bogserien Sværd og
        Trolddom. Du lærer at bygge hjemmesiden med værktøjer som React og
        TypeScript.
      </p>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="font-serif text-xl text-stone-900 sm:text-2xl dark:text-white">
            Om guiden
          </h2>
          <p className="mt-3 max-w-prose text-base leading-7 text-stone-600 dark:text-stone-300">
            Guiden er tiltænkt difg der har lidt eller ingen erfaring med
            webudvikling.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-stone-900 sm:text-2xl dark:text-white">
            Om Sværd og Trolddom
          </h2>
          <p className="mt-3 max-w-prose text-base leading-7 text-stone-600 dark:text-stone-300">
            Sværd og Trolddom er en bogserie skrevet af Ian Livingstone. Det er
            et "choose your own adventure"-spil, hvor historien afhænger af dine
            valg.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-stone-900 sm:text-2xl dark:text-white">
            Værktøjerne bag guiden
          </h2>
          <p className="mt-3 max-w-prose text-base leading-7 text-stone-600 dark:text-stone-300">
            Både guiden og spillet, du bygger, er lavet med React, TypeScript og
            Tailwind CSS.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-stone-900 sm:text-2xl dark:text-white">
            Kontakt
          </h2>
          <p className="mt-3 max-w-prose text-base leading-7 text-stone-600 dark:text-stone-300">
            Har du spørgsmål, rettelser eller feedback til guiden? Skriv til
            {" Kajsa Pedersen på "}
            <a
              href="mailto:kajsaaviaja@gmail.com"
              className="text-amber-700 underline underline-offset-2 dark:text-amber-200"
            >
              kajsaaviaja@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}

export default Info;
