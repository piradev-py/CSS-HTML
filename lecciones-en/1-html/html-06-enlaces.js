/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-06
   Enlaces — <a>, atributos, href, URL, target="_blank" +
   rel="noopener", id y enlaces internos con #.
   Nota: en el resultado, los enlaces externos NO navegan (el motor
   los intercepta y muestra una página de prueba con un enlace para
   volver); los que empiezan por # sí saltan dentro del resultado.
   Por eso el reto comprueba atributos, no la navegación.
   ============================================================ */
CURSO.registrar({
  id: "html-06",
  titulo: "Links",
  xp: 35,
  objetivo: "You'll learn how to link to other websites and to other parts of the same page.",
  // Lo que enseña esta lección, para el glosario de las lecciones de proyecto (js/glosario.js)
  glosario: [
    { termino: "<a href=\"…\">", tema: "Links", para: "A link: `href` says where it goes.", ejemplo: "<a href=\"https://www.example.com\">Visit us</a>", buscar: "link url anchor" },
    { termino: "href=\"#id\"", tema: "Links", para: "Link to a part of the same page: the one with that `id`.", ejemplo: "<a href=\"#booking\">Book your appointment</a>\n…\n<section id=\"booking\">…</section>", buscar: "anchor jump section menu" },
    { termino: "target=\"_blank\"", tema: "Links", para: "Opens the link in a new tab (with `rel=\"noopener\"`, for safety).", ejemplo: "<a href=\"https://maps.google.com\" target=\"_blank\" rel=\"noopener\">Get directions</a>", buscar: "new tab window map" },
    { termino: "href=\"tel:\" and href=\"mailto:\"", tema: "Links", para: "Links that call a phone number or write an email.", ejemplo: "<a href=\"tel:+34910000000\">910 000 000</a>\n<a href=\"mailto:hola@huellas.es\">hola@huellas.es</a>", buscar: "phone call email contact" },
    { termino: "href=\"otra.html\"", tema: "Links", para: "Link to another page of your website, by its file name.", ejemplo: "<a href=\"privacidad.html\">Privacy</a>", buscar: "own page file relative path" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Your first link",
      texto: "**Links** are the web's superpower: one click and you jump to another page. They are created with `<a>` (from “anchor” ⚓).\n\nBut `<a>` needs to know **where** to go, and the `href` attribute tells it. An **attribute** is an extra piece of data that goes inside the opening tag, always like this: `name=\"value\"`.\n\nThe value of `href` is a **URL**: the address of a page, like the address of a house 🏠. The ones for other websites start with `https://`.",
      ejemplo: {
        html: `<p>Did you know the axolotl can regrow its legs?
<a href="https://en.wikipedia.org/wiki/Ambystoma_mexicanum">Discover more about the axolotl</a>.</p>`,
        css: ""
      },
      consejo: "The link text should say **where it goes**. “Click here” helps no one; “Discover more about the axolotl” does. And notice: `<a>` is an **inline** tag, it lives inside the sentence."
    },
    {
      tipo: "explicacion",
      titulo: "Opening in a new tab",
      texto: "A tag can carry **several attributes**, separated by spaces:\n\n• `target=\"_blank\"` opens the link in a **new tab**, and your page stays open behind it.\n• `rel=\"noopener\"` is a safety belt 🔒: it stops the new page from being able to touch yours. Modern browsers already do it on their own, but adding it next to `target=\"_blank\"` costs nothing and also protects on older ones.\n\nUse it sensibly: opening tabs without warning is confusing, so save it for links to other websites.",
      ejemplo: {
        html: `<p>
  <a href="https://www.nasa.gov" target="_blank" rel="noopener">NASA space photos (opens in a new tab)</a>
</p>`,
        css: ""
      },
      consejo: "A kind detail: if the link opens in a new tab, say so in the text, like in the example. That way nobody gets surprise tabs!"
    },
    {
      tipo: "explicacion",
      titulo: "Jumping within the same page",
      texto: "A link can also take you to **another part of the same page**, like the index of a book 📖:\n\n1. Give the destination a name with the `id` attribute: `<h2 id=\"desserts\">`.\n2. In the `href`, write that name with a hash in front: `href=\"#desserts\"`.\n\nThe `id` is like an ID card for a tag: it **cannot repeat** on the page and it takes no spaces (use hyphens: `my-desserts`).",
      ejemplo: {
        html: `<h1>The Happy Monster Restaurant</h1>
<p><a href="#desserts">Go straight to the desserts</a></p>
<h2>Starters</h2>
<p>Bat soup (bat not included).</p>
<h2>Mains</h2>
<p>Lava burger with volcanic potatoes.</p>
<h2 id="desserts">Desserts</h2>
<p>Cobweb cake with cream.</p>`,
        css: ""
      },
      consejo: "Tip: `href=\"#\"` with no name takes you to the top of the page. Perfect for a “Back to top” link!"
    },
    {
      tipo: "explicacion",
      titulo: "Calling, writing an email… or going to another page of yours",
      texto: "A link can take you to many more places:\n\n• `href=\"tel:+34912345678\"`: on a phone, when you tap it, it **calls** that number. 📞 You write it with no spaces and with the country code.\n• `href=\"mailto:hola@example.com\"`: it opens the email app so you can **write an email** to that address. ✉️\n• `href=\"privacidad.html\"`: it takes you to **another page of your own website**. If both files are in the same folder, the file name is enough: it's a **relative path**, like the one for images.",
      ejemplo: {
        html: `<p>La Nube Bakery</p>
<p>Phone: <a href="tel:+34912345678">912 345 678</a></p>
<p>Email: <a href="mailto:hola@lanube.example">hola@lanube.example</a></p>
<p><a href="privacidad.html">Privacy policy</a></p>`,
        css: ""
      },
      consejo: "The link text can be the pretty number (with spaces), but the `href` always goes with no spaces: `tel:+34912345678`."
    },
    {
      tipo: "ejercicio",
      enunciado: "Write a `<a>` link about the octopuses 🐙 that opens in a new tab. It carries these three attributes:\n\n• `href=\"https://en.wikipedia.org/wiki/Octopoda\"`\n• `target=\"_blank\"`\n• `rel=\"noopener\"`\n\nAnd its text says **Octopuses on Wikipedia**.\n\nWhen you have it, click it: since you are on the practice website, you don't leave this page; you'll see a test page with the address and a link to go back.",
      pistas: [
        "All the attributes go inside the opening tag <a …>, separated by spaces and always like this: name=\"value\". The text goes between <a …> and </a>.",
        "Start like this:\n<a href=\"https://en.wikipedia.org/wiki/Octopoda\" target=\"_blank\" …>\nStill missing: the rel, the text “Octopuses on Wikipedia” and the closing </a>."
      ],
      solucion: {
        html: `<a href="https://en.wikipedia.org/wiki/Octopoda" target="_blank" rel="noopener">Octopuses on Wikipedia</a>
`,
        css: ""
      }
    },
    {
      tipo: "quiz",
      pregunta: "On your page you have <h2 id=\"bonus\">Secret level</h2>. Which link jumps to it?",
      opciones: [
        "<a href=\"bonus\">Secret level</a>",
        "<a href=\"#bonus\">Secret level</a>",
        "<a id=\"#bonus\">Secret level</a>"
      ],
      correcta: 1,
      explicacion: "The destination is written in the href, with a hash # in front of the id name: href=\"#bonus\"."
    },
    {
      tipo: "reto",
      enunciado: "Create the menu of the **Capybara Fan Club**, with a link on each `<li>`:\n\n1. One to Wikipedia: `https://en.wikipedia.org/wiki/Hydrochoerus_hydrochaeris`\n2. Another to any website (starting with `https://`) that opens in a **new tab**.\n3. One that jumps to the “Meetings” section. Before that, give that `<h2>` an `id`.",
      inicial: {
        html: `<h1>Capybara Fan Club</h1>

<ul>
  <li><!-- 1. Link to Wikipedia --></li>
  <li><!-- 2. Link to another website, in a new tab --></li>
  <li><!-- 3. Link that jumps to “Meetings” --></li>
</ul>

<h2>Who we are</h2>
<p>People convinced that the capybara is the calmest animal on the planet.</p>

<!-- Give this h2 an id, for example id="meetings" -->
<h2>Meetings</h2>
<p>Every Saturday by the pond. Bring fruit: they love watermelon!</p>
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "There are at least two links with text to other websites (their href starts with https://)",
          prueba: (doc) => Array.from(doc.querySelectorAll("a"))
            .filter(a => /^https?:\/\//i.test((a.getAttribute("href") || "").trim())
              && a.textContent.trim().length > 0).length >= 2
        },
        {
          texto: "One of those links opens in a new tab (target=\"_blank\")",
          prueba: (doc) => Array.from(doc.querySelectorAll("a"))
            .some(a => /^https?:\/\//i.test((a.getAttribute("href") || "").trim())
              && (a.getAttribute("target") || "").trim().toLowerCase() === "_blank")
        },
        {
          texto: "There is a link with text whose href starts with # and points to an id that exists on the page",
          prueba: (doc) => Array.from(doc.querySelectorAll("a")).some(a => {
            const href = (a.getAttribute("href") || "").trim();
            const nombre = href.slice(1);
            return href.charAt(0) === "#" && nombre.length > 0
              && !!doc.getElementById(nombre) && a.textContent.trim().length > 0;
          })
        }
      ],
      pistas: [
        "Each link is an <a> tag with its href attribute, written inside a <li> instead of the comment. The new-tab one also carries target=\"_blank\". And the jump one needs the <h2> to have an id.",
        "Something like this:\n<li><a href=\"https://en.wikipedia.org/wiki/Hydrochoerus_hydrochaeris\">Capybaras on Wikipedia</a></li>\n<li><a href=\"https://www.youtube.com\" target=\"_blank\" rel=\"noopener\">Videos (another tab)</a></li>\n<li><a href=\"#meetings\">Our meetings</a></li>\nAnd below: <h2 id=\"meetings\">Meetings</h2>"
      ],
      solucion: {
        html: `<h1>Capybara Fan Club</h1>

<ul>
  <li><a href="https://en.wikipedia.org/wiki/Hydrochoerus_hydrochaeris">Capybaras on Wikipedia</a></li>
  <li><a href="https://www.youtube.com/results?search_query=capybaras" target="_blank" rel="noopener">Capybara videos (opens in a new tab)</a></li>
  <li><a href="#meetings">Our meetings</a></li>
</ul>

<h2>Who we are</h2>
<p>People convinced that the capybara is the calmest animal on the planet.</p>

<h2 id="meetings">Meetings</h2>
<p>Every Saturday by the pond. Bring fruit: they love watermelon!</p>
`,
        css: ""
      }
    }
  ]
});
