/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-01
   ¿Qué es HTML? — página web, HTML y etiquetas.
   English version — head comment kept in Spanish for maintainers.
   ============================================================ */
CURSO.registrar({
  id: "html-01",
  titulo: "What is HTML?",
  xp: 20,
  objetivo: "You will understand what a web page is, what HTML is, and how to write a tag.",
  // Lo que enseña esta lección, para el glosario de las lecciones de proyecto (js/glosario.js)
  glosario: [
    { termino: "tag", tema: "The basics", para: "Marks the start and the end of a piece of the page: `<p>` opens and `</p>` closes.", ejemplo: "<p>Hello</p>", buscar: "opening closing element" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "What is a web page?",
      texto: "Every time you visit a website (a search engine, an online game, a pizzeria's menu…), your **browser** —the program you use to visit the internet, like Chrome or Firefox— receives a **text** file and turns it into what you see on screen.\n\nThat text is written in a special language the browser understands: **HTML**.\n\nAnd you're about to learn how to write it! 🎉",
      consejo: "Hi there! I'm **Tagui**, your travel buddy. Nobody is born knowing this: making mistakes is part of the game, so try things without fear."
    },
    {
      tipo: "explicacion",
      titulo: "What is HTML?",
      texto: "HTML is used to **mark** what each piece of text is: “this is a heading”, “this is a paragraph”, “this is an image”…\n\nIt's like putting **labels** on the boxes when you move house 📦: “books”, “kitchen”, “fragile”. Without labels, the browser would just see a pile of letters with no order.\n\nLook at the example: the browser knows the first line is a **heading** (that's why it draws it big) and the second one, a **paragraph**.",
      ejemplo: {
        html: `<h1>My cat Whiskers</h1>
<p>He loves sleeping on top of the keyboard.</p>`,
        css: ""
      },
      consejo: "HTML is not a programming language: it doesn't do math or make decisions. It only **describes** content. That's exactly why it's perfect to start with!"
    },
    {
      tipo: "explicacion",
      titulo: "What is a tag?",
      texto: "A **tag** is a keyword between the signs `<` and `>`. They almost always come in pairs:\n\n• `<p>` is the **opening tag**: “a paragraph starts here”.\n• `</p>` is the **closing tag**: it has a slash `/` and says “it ends here”.\n\nWhat sits in between is the **content**. All together (opening + content + closing) is called an **element**.",
      ejemplo: {
        html: `<p>I'm a very happy paragraph.</p>`,
        css: ""
      },
      consejo: "The most famous slip-up in the world: forgetting the slash `/` in the closing tag. Don't let it happen to you!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Your first element! Write a `<h1>` heading that says **Hello, world!**\n\nStart with the opening tag `<h1>`, then write the text, and finish with the closing tag `</h1>`.",
      pistas: [
        "An element has three parts: opening, content and closing. The closing tag looks just like the opening one, but with a / slash before the name.",
        "Write <h1>, right after it Hello, world! and, to finish, </h1>. All on the same line."
      ],
      solucion: {
        html: `<h1>Hello, world!</h1>
`,
        css: ""
      }
    },
    {
      tipo: "quiz",
      pregunta: "Which is the closing tag of a paragraph?",
      opciones: ["<p>", "</p>", "<close>"],
      correcta: 1,
      explicacion: "The closing tag looks just like the opening one, but with a / slash before the name: </p>."
    },
    {
      tipo: "reto",
      enunciado: "Turn this sentence into a paragraph: write the opening tag `<p>` right before the sentence and the closing tag `</p>` right after it.",
      inicial: {
        html: `I love pizza 🍕
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "There is a <p> paragraph",
          prueba: (doc) => !!doc.querySelector("p")
        },
        {
          texto: "The sentence is inside the paragraph",
          prueba: (doc) => (doc.querySelector("p")?.textContent.trim().length || 0) > 0
        }
      ],
      pistas: [
        "Tags wrap the text the way the bread of a sandwich 🥪 wraps the filling: one in front and one behind.",
        "It should end up like this: <p>I love pizza 🍕</p>"
      ],
      solucion: {
        html: `<p>I love pizza 🍕</p>
`,
        css: ""
      }
    }
  ]
});
