/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-02
   The structure of a page — skeleton, head, body, nesting.
   English version — head comment kept in Spanish for maintainers.
   Nota: el navegador SIEMPRE crea <html>, <head> y <body>, así que
   el reto comprueba cosas que no se autogeneran (<meta charset>,
   <title> con texto concreto y un <h1>).
   ============================================================ */
CURSO.registrar({
  id: "html-02",
  titulo: "The structure of a page",
  xp: 30,
  objetivo: "You will be able to write the skeleton of every web page, and know what goes in the head and what goes in the body.",
  // Lo que enseña esta lección, para el glosario de las lecciones de proyecto (js/glosario.js)
  glosario: [
    { termino: "<!DOCTYPE html>", tema: "Structure", para: "The first line: it tells the browser this is modern HTML.", ejemplo: "<!DOCTYPE html>", buscar: "skeleton page structure" },
    { termino: "<html lang=\"en\">", tema: "Structure", para: "The box that wraps the whole page; `lang` says which language it is in.", ejemplo: "<html lang=\"en\">\n  …\n</html>", buscar: "language skeleton" },
    { termino: "<head> and <body>", tema: "Structure", para: "The head (what you don't see) and the body (what you do see).", ejemplo: "<head>\n  <title>My website</title>\n</head>\n<body>\n  <h1>Hello</h1>\n</body>", buscar: "head body skeleton" },
    { termino: "<meta charset=\"UTF-8\">", tema: "The head", para: "So that accented letters and special characters show up correctly. It goes in the `<head>`.", ejemplo: "<meta charset=\"UTF-8\">", buscar: "accents letters characters" },
    { termino: "<title>", tema: "The head", para: "The text of the browser tab, and the one search engines use.", ejemplo: "<title>Pawprints · Vet clinic</title>", buscar: "tab title name" },
    { termino: "<!-- comment -->", tema: "The basics", para: "A note for people: the browser never shows it.", ejemplo: "<!-- The menu starts here -->", buscar: "note hidden comment" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "The skeleton of a page",
      texto: "A “real” page has a **skeleton** that is always the same:\n\n• `<!DOCTYPE html>` tells the browser: “this is modern HTML”.\n• `<html>` is the box that wraps everything.\n• `<head>` is the **head**: information about the page that isn't seen.\n• `<body>` is the **body**: everything that is seen.\n\nLike a person: what you think (the head) isn't seen; your clothes and your smile (the body) are. 😄",
      ejemplo: {
        html: `<!DOCTYPE html>
<html>
  <head>
    <title>My page</title>
  </head>
  <body>
    <h1>Hello!</h1>
  </body>
</html>`,
        css: ""
      },
      consejo: "If you forget one of these tags, the browser tries to fix it all by itself. But professionals write them **always**: it's like buckling your seatbelt."
    },
    {
      tipo: "explicacion",
      titulo: "Inside the head",
      texto: "In `<head>` you will always put these two things:\n\n• `<meta charset=\"UTF-8\">`: it tells the browser how to read the letters, so that accented characters and emoji show up correctly. It has no closing tag.\n• `<title>`: the text that appears on the browser **tab**.\n\nThat `charset=\"UTF-8\"` is an **attribute**: an extra piece of data written inside the opening tag. Just like `lang=\"en\"` on `<html>`, which says the page is in English. We'll look at attributes in depth in the Links lesson.",
      ejemplo: {
        html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Cooking with Tagui</title>
  </head>
  <body>
    <h1>Tomorrow: churros with hot chocolate</h1>
  </body>
</html>`,
        css: ""
      },
      consejo: "The `<title>` doesn't appear inside the page, but on the tab. And it's what shows up in search engines when someone finds your website!"
    },
    {
      tipo: "explicacion",
      titulo: "Boxes inside boxes",
      texto: "Notice: `<head>` and `<body>` are **inside** `<html>`. Putting one tag inside another is called **nesting**, like Russian dolls 🪆.\n\nThe golden rule: **the last one you opened is the first one you close**.\n\n✔ `<body><h1>Hello</h1></body>`\n✘ `<body><h1>Hello</body></h1>`\n\nThat's why the inner tags are written a bit further to the right, with spaces. That is called **indentation**, and it helps you see at a glance what is inside what.",
      consejo: "Trick: whatever you write between `<!--` and `-->` is a **comment**. The browser ignores it, so it's a way to leave notes in the code. I'll use them to give you instructions in the challenges!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Write the complete skeleton of a page from scratch, in this order:\n\n1. `<!DOCTYPE html>`\n2. `<html>` with the attribute `lang=\"en\"`. Everything else goes inside it.\n3. The head `<head>`, and inside it: `<meta charset=\"UTF-8\">` and a `<title>` that says **Tagui's house**.\n4. Below the head, the body `<body>`, and inside it: a heading `<h1>` that says **Welcome to my house!**\n\nClose every tag (except the meta, which has no closing tag) and remember: the last one you opened is the first one you close. 🪆",
      pistas: [
        "Go from the outside in, like Russian dolls: write <html lang=\"en\">…</html> first; inside it, <head>…</head> and below it <body>…</body>. Then fill in each box.",
        "The order is:\n<!DOCTYPE html>\n<html lang=\"en\">\n<head> with <meta charset=\"UTF-8\"> and <title>Tagui's house</title> inside, and then </head>\n<body> with <h1>Welcome to my house!</h1> inside, and then </body>\n</html>"
      ],
      solucion: {
        html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Tagui's house</title>
  </head>
  <body>
    <h1>Welcome to my house!</h1>
  </body>
</html>
`,
        css: ""
      }
    },
    {
      tipo: "quiz",
      pregunta: "Where do you write the content that is visible on the page?",
      opciones: ["Inside <head>", "Inside <body>", "Inside <title>"],
      correcta: 1,
      explicacion: "Everything visible goes in <body>, the body. In <head> goes information about the page, like the <title> of the tab."
    },
    {
      tipo: "reto",
      enunciado: "Complete the skeleton of your pet's website (real or made up):\n\n1. In the head, add `<meta charset=\"UTF-8\">`.\n2. In the head, add a `<title>` that contains the word **pet**.\n3. In the body, add a heading `<h1>` with its name.",
      inicial: {
        html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- 1. Add the charset meta here -->
    <!-- 2. Add a title with the word “pet” here -->
  </head>
  <body>
    <!-- 3. Add an h1 with your pet's name here -->
    <p>My pet sleeps about 20 hours a day. I'm so jealous!</p>
  </body>
</html>
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "There is a <meta charset=\"UTF-8\"> tag",
          prueba: (doc) => Array.from(doc.querySelectorAll("meta[charset]"))
            .some(m => (m.getAttribute("charset") || "").trim().toLowerCase() === "utf-8")
        },
        {
          texto: "There is a <title> that contains the word “pet”",
          prueba: (doc) => Array.from(doc.querySelectorAll("title"))
            .some(t => (t.textContent || "").toLowerCase().includes("pet"))
        },
        {
          texto: "There is a <h1> heading with your pet's name",
          prueba: (doc) => (doc.querySelector("h1")?.textContent.trim().length || 0) > 0
        }
      ],
      pistas: [
        "The meta and the title go inside <head>, one below the other. The meta has no closing tag; the title does: <title>…</title>.",
        "Inside <head> write:\n<meta charset=\"UTF-8\">\n<title>My pet's website</title>\nAnd inside <body>, above the paragraph: <h1>Fluffy</h1>"
      ],
      solucion: {
        html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My pet's website</title>
  </head>
  <body>
    <h1>Fluffy</h1>
    <p>My pet sleeps about 20 hours a day. I'm so jealous!</p>
  </body>
</html>
`,
        css: ""
      }
    }
  ]
});
