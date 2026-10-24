/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-03
   Títulos y párrafos — <h1>…<h6>, jerarquía y <p>.
   English version — head comment kept in Spanish for maintainers.
   ============================================================ */
CURSO.registrar({
  id: "html-03",
  titulo: "Headings and paragraphs",
  xp: 30,
  objetivo: "You will be able to use <h1>…<h6> and <p> to organize a text.",
  // Lo que enseña esta lección, para el glosario de las lecciones de proyecto (js/glosario.js)
  glosario: [
    { termino: "<h1> … <h6>", tema: "Text", para: "Headings from most to least important. Just one `<h1>` per page, and never skip levels.", ejemplo: "<h1>Pawprints</h1>\n<h2>Services</h2>\n<h3>Vaccination</h3>", buscar: "heading title header" },
    { termino: "<p>", tema: "Text", para: "A paragraph of text.", ejemplo: "<p>We take care of your pet.</p>", buscar: "paragraph text" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Six levels of headings",
      texto: "HTML has six heading tags: from `<h1>` to `<h6>`. The “h” stands for “heading”, which is another word for “title”.\n\nThink of a newspaper 📰:\n\n• `<h1>` is the front-page headline.\n• `<h2>` is the title of each section.\n• `<h3>` is the one for a subsection within a section…\n\n…and so on down to `<h6>`, the humblest of them all.",
      ejemplo: {
        html: `<h1>Forest News</h1>
<h2>Sports</h2>
<h3>The squirrel wins the jumping race</h3>
<h4>Statements from the turtle</h4>`,
        css: ""
      }
    },
    {
      tipo: "explicacion",
      titulo: "Just one <h1>, and no skipping steps",
      texto: "Two rules for using headings well:\n\n1. **Just one `<h1>` per page**: it's the main topic, like the title of a book.\n2. **Don't skip levels**: after an `<h2>` comes an `<h3>`, not an `<h5>`.\n\nWhy does it matter? Search engines and **screen readers** (programs that read the web out loud to blind people) use headings as a table of contents to move around the page.",
      ejemplo: {
        html: `<h1>Grandma's recipes</h1>
<h2>Sweet</h2>
<h3>Cinnamon cookies</h3>
<h2>Savory</h2>
<h3>Croquettes</h3>`,
        css: ""
      },
      consejo: "Don't pick a heading for its size, but for its **importance**. We'll change the size to our liking with CSS in World 2. 🎨"
    },
    {
      tipo: "explicacion",
      titulo: "Paragraphs and spaces",
      texto: "Each `<p>` is a **paragraph**: a block of text separated from the others.\n\nWatch out for something curious: HTML **ignores extra spaces and line breaks**. It doesn't matter if you press Enter ten times or type twenty spaces: the browser squashes them into just one.\n\nWant to separate two ideas? Use another `<p>`.",
      ejemplo: {
        html: `<p>Hello.        These spaces
and this line break
disappear.</p>
<p>And this is another, different paragraph.</p>`,
        css: ""
      },
      consejo: "Organizing a text with good headings and paragraphs is called **structuring**. It's the first thing a professional does, even before thinking about colors!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Write three headings, one below the other, going down one step each time (without skipping any):\n\n1. A `<h1>` that says **Space Guide**.\n2. A `<h2>` that says **Planets**.\n3. A `<h3>` that says **Mars, the red planet**.\n\nOnly those three headings: no paragraphs. 🚀",
      pistas: [
        "Each level has its number: the most important is <h1>, then <h2> and then <h3>. Each one closes with its same tag and a slash: <h2>…</h2>.",
        "Write <h1>Space Guide</h1> on the first line. Below, the <h2> with “Planets” and, last of all, the <h3> with “Mars, the red planet”."
      ],
      solucion: {
        html: `<h1>Space Guide</h1>
<h2>Planets</h2>
<h3>Mars, the red planet</h3>
`,
        css: ""
      }
    },
    {
      tipo: "quiz",
      pregunta: "Your page already has a <h1>. Which tag would you use for the title of a section?",
      opciones: ["Another <h1>", "<h2>", "<h6>, because it looks tiniest"],
      correcta: 1,
      explicacion: "Sections go with <h2>. There should only be one <h1>, and the level is chosen by importance, not by size."
    },
    {
      tipo: "reto",
      enunciado: "Create the data sheet of your favorite video game 🎮:\n\n• A `<h1>` with the name of the game.\n• Below it, two sections. Each one with a `<h2>` heading (for example, “Why I love it” and “My high score”) and a `<p>` paragraph below it.",
      inicial: {
        html: `<!-- 1. An h1 with the name of your favorite video game -->

<!-- 2. An h2 “Why I love it” and a paragraph below it -->

<!-- 3. An h2 “My high score” and another paragraph below it -->
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "There is a single <h1> and it has text",
          prueba: (doc) => {
            const h1s = doc.querySelectorAll("h1");
            return h1s.length === 1 && h1s[0].textContent.trim().length > 0;
          }
        },
        {
          texto: "There are at least two <h2> headings with text",
          prueba: (doc) => Array.from(doc.querySelectorAll("h2"))
            .filter(h => h.textContent.trim().length > 0).length >= 2
        },
        {
          texto: "There are at least two <p> paragraphs with text",
          prueba: (doc) => Array.from(doc.querySelectorAll("p"))
            .filter(p => p.textContent.trim().length > 0).length >= 2
        },
        {
          texto: "The <h1> comes before the <h2> headings",
          prueba: (doc) => doc.querySelector("h1, h2")?.tagName === "H1"
        }
      ],
      pistas: [
        "Start with the <h1> at the very top. Then, each section is a <h2> followed by a <p>.",
        "The structure is:\n<h1>Name of the game</h1>\n<h2>Why I love it</h2>\n<p>…</p>\n<h2>My high score</h2>\n<p>…</p>"
      ],
      solucion: {
        html: `<h1>Super Duck Kart</h1>

<h2>Why I love it</h2>
<p>I can throw bananas at my friends and still stay friends with them.</p>

<h2>My high score</h2>
<p>I came first in the Puddle Cup… once. 🏆</p>
`,
        css: ""
      }
    }
  ]
});
