/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-12
   HTML semántico y accesible — header, nav, main, section,
   article, aside, footer y repaso de accesibilidad.
   Reto = el gran reto del Mundo HTML antes del proyecto web: convertir una página hecha
   con <div> en una página semántica (y arreglar un alt).
   Las imágenes son locales y no se comprueba que carguen.
   ============================================================ */
CURSO.registrar({
  id: "html-12",
  titulo: "Semantic and accessible HTML",
  xp: 50,
  objetivo: "You will know how to use tags that say what they are, so that search engines and screen readers understand your page.",
  // Lo que enseña esta lección, para el glosario de las lecciones de proyecto (js/glosario.js)
  glosario: [
    { termino: "<header>", tema: "Semantics", para: "The top part: logo, title and menu.", ejemplo: "<header>\n  <a href=\"#home\">Huellas</a>\n  <nav>…</nav>\n</header>", buscar: "header top logo" },
    { termino: "<nav>", tema: "Semantics", para: "The main menu of links.", ejemplo: "<nav>\n  <ul>\n    <li><a href=\"#services\">Services</a></li>\n  </ul>\n</nav>", buscar: "menu navigation links" },
    { termino: "<main>", tema: "Semantics", para: "The main content. One per page.", ejemplo: "<main>\n  <section id=\"services\">…</section>\n</main>", buscar: "main content" },
    { termino: "<section>", tema: "Semantics", para: "A part of the page about one topic, with its own title.", ejemplo: "<section id=\"team\">\n  <h2>Our team</h2>\n</section>", buscar: "section block part" },
    { termino: "<article>", tema: "Semantics", para: "Something that makes sense on its own: a news item, a card, an opinion.", ejemplo: "<article class=\"service\">\n  <h3>Vaccination</h3>\n  <p>…</p>\n</article>", buscar: "card news opinion" },
    { termino: "<aside>", tema: "Semantics", para: "Secondary content, the “by the way…” kind.", ejemplo: "<aside>\n  <p>Did you know that…?</p>\n</aside>", buscar: "aside sidebar secondary" },
    { termino: "<footer>", tema: "Semantics", para: "The bottom of the page: contact, authorship, the small print.", ejemplo: "<footer>\n  <p>© Huellas</p>\n</footer>", buscar: "footer bottom contact" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Tags with meaning",
      texto: "**Semantics** means “meaning”. Semantic HTML uses tags that **say what they are**.\n\nImagine a house where every door has the sign “room” 🚪 on it. Where is the kitchen? That is what a page built only with `<div>` is like. If the signs say “kitchen”, “bathroom” or “bedroom”, anyone can find their way around.\n\nWho is grateful for it?\n\n• **Screen readers**, which can jump straight to the menu or to the content.\n• **Search engines**, which understand your page better.\n• You, when you read your own code a month from now.",
      ejemplo: {
        html: `<div class="header">
  <p>🙈 I'm a header made with a div: nobody knows what I am.</p>
</div>
<header>
  <p>😎 I'm a header: everyone knows I'm the top of the page.</p>
</header>`,
        css: ""
      },
      consejo: "Notice: they look exactly the same! Semantics does not change the **look**, it changes the **meaning**. The look will be the CSS's job."
    },
    {
      tipo: "explicacion",
      titulo: "The four big zones",
      texto: "Almost every website has the same zones:\n\n• `<header>`: the **header**, right at the top. It usually carries the logo and the `<h1>`.\n• `<nav>`: the **menu** with the main links for getting around.\n• `<main>`: the **main content**, what makes that page unique. There is only **one** `<main>` per page.\n• `<footer>`: the **footer**, right at the bottom: authorship, contact, the small print.",
      ejemplo: {
        html: `<header>
  <h1>Cooking in space 🚀</h1>
  <nav>
    <a href="#recipe">Recipe</a>
    <a href="#contact">Contact</a>
  </nav>
</header>
<main>
  <h2 id="recipe">Gravity-free spaghetti</h2>
  <p>Trick: fasten them to the plate with velcro.</p>
</main>
<footer>
  <p id="contact">Written in orbit by Commander Lola.</p>
</footer>`,
        css: ""
      },
      consejo: "The `<nav>` usually goes **inside** the `<header>`, as in the example. And not every group of links is a nav: save it for the **main** menu."
    },
    {
      tipo: "explicacion",
      titulo: "Inside the main: section, article and aside",
      texto: "To organize the `<main>` there are three more tags:\n\n• `<section>`: a **part** of the page about one topic, with its own title.\n• `<article>`: something that makes sense **on its own**, even if you copied it to another website: a news item, a recipe, a comment.\n• `<aside>`: **secondary** content, of the “by the way…” kind: fun facts, related links.\n\nAnd the `<div>`? It is still useful, but only when no tag with meaning fits.",
      ejemplo: {
        html: `<main>
  <article>
    <h2>Pancakes that float</h2>
    <p>To turn them over you don't need a pan: just blow.</p>
  </article>
  <aside>
    <p>Did you know that food tastes saltier in space? 🧂</p>
  </aside>
</main>`,
        css: ""
      },
      consejo: "Accessibility checklist for the whole HTML World ✅\n• Every `<img>` with its `alt`.\n• Every field with its `<label for>`.\n• A single `<h1>` and headings without skipping levels.\n• Zones with semantic tags.\nIf you meet this, your HTML is already professional level!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Write a small piece of the **Cat Daily** 🐾. In this order, without any attributes:\n\n1. An `<article>` with two things inside:\n   • an `<h2>` saying **A cat shoves a glass off the table**\n   • and below it a `<p>` saying **It stared at it before pushing.**\n2. After the `</article>`, an `<aside>` with a `<p>` inside saying **Tip of the day: the box is worth more than the present.**",
      solucion: {
        html: `<article>
  <h2>A cat shoves a glass off the table</h2>
  <p>It stared at it before pushing.</p>
</article>
<aside>
  <p>Tip of the day: the box is worth more than the present.</p>
</aside>`,
        css: ""
      },
      pistas: [
        "The news item makes sense on its own, so it goes in <article>…</article> with its <h2> and its <p> inside. The tip is a “by the way…”, so it goes in <aside>…</aside>, which opens after the article closes.",
        "It should end up like this:\n<article>\n  <h2>A cat shoves a glass off the table</h2>\n  <p>It stared at it before pushing.</p>\n</article>\n<aside>\n  <p>Tip of the day: the box is worth more than the present.</p>\n</aside>"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Your website has a menu with links to “Home”, “Recipes” and “Contact”. Which tag do you wrap it in?",
      opciones: ["<div class=\"menu\">", "<nav>", "<footer>"],
      correcta: 1,
      explicacion: "<nav> says “I'm the navigation menu”, and screen readers let you jump straight to it. A div would work, but it says nothing; and <footer> is the bottom of the page."
    },
    {
      tipo: "reto",
      enunciado: "🐉 **The big challenge of the HTML World!** This website is built only with `<div>`. Turn it into a semantic page:\n\n1. The header (the one with the `<h1>`) → `<header>`, and the menu of links → `<nav>`.\n2. The main content → `<main>`.\n3. The bottom of the page → `<footer>`.\n4. Refresher: the image is missing its alternative text. Add an `alt` describing it.\n\nChange every `</div>` for the closing tag that goes with it too.",
      inicial: {
        html: `<!-- Change each <div> for its semantic tag (and its closing tag too!) -->
<div class="header">
  <h1>Lazy Hikers Club</h1>
  <div class="menu">
    <a href="#trail">Trail of the month</a>
    <a href="#contact">Contact</a>
  </div>
</div>

<div class="content">
  <h2 id="trail">Trail of the month: Siesta Peak</h2>
  <!-- This image is missing something important… -->
  <img src="recursos/img/montana.svg" width="200" height="150">
  <p>We go up by cable car, have a snack at the top and come down unhurried.</p>
</div>

<div class="footer">
  <p id="contact">Write to us whenever you want: we answer after the nap.</p>
</div>
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "The <h1> is inside a <header> and the menu links are inside a <nav>",
          prueba: (doc) => !!doc.querySelector("header h1")
            && doc.querySelectorAll("nav a").length >= 2
        },
        {
          texto: "The main content (the <h2> and the image) is inside a single <main>",
          prueba: (doc) => doc.querySelectorAll("main").length === 1
            && !!doc.querySelector("main h2")
            && !!doc.querySelector("main img")
        },
        {
          texto: "The bottom of the page is inside a <footer>",
          prueba: (doc) => !!doc.querySelector("footer p")
        },
        {
          texto: "The image has an alternative text (alt) that describes it",
          prueba: (doc) => (doc.querySelector("img")?.getAttribute("alt") || "").trim().length > 0
        }
      ],
      pistas: [
        "Go box by box: <div class=\"header\"> becomes <header>, <div class=\"menu\"> becomes <nav>, <div class=\"content\"> becomes <main> and <div class=\"footer\"> becomes <footer>. Remember: the last one you opened closes first. And add alt=\"…\" to the image.",
        "The header ends up like this:\n<header>\n  <h1>…</h1>\n  <nav>\n    <a href=\"#trail\">Trail of the month</a>\n    <a href=\"#contact\">Contact</a>\n  </nav>\n</header>\nThen <main>…</main> with the h2, the image and the paragraph, and <footer>…</footer> with the last paragraph. The image: <img src=\"recursos/img/montana.svg\" alt=\"Two snowy mountains under the sun\" width=\"200\" height=\"150\">"
      ],
      solucion: {
        html: `<header>
  <h1>Lazy Hikers Club</h1>
  <nav>
    <a href="#trail">Trail of the month</a>
    <a href="#contact">Contact</a>
  </nav>
</header>

<main>
  <h2 id="trail">Trail of the month: Siesta Peak</h2>
  <img src="recursos/img/montana.svg" alt="Two snowy mountains under the sun, with pine trees at their foot" width="200" height="150">
  <p>We go up by cable car, have a snack at the top and come down unhurried.</p>
</main>

<footer>
  <p id="contact">Write to us whenever you want: we answer after the nap.</p>
</footer>
`,
        css: ""
      }
    }
  ]
});
