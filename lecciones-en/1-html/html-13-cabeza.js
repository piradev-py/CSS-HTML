/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-13
   La cabeza de la página — meta description, meta viewport
   (se adelanta; hc-05 la repasa), favicon con <link rel="icon">
   y Open Graph (og:title, og:description, og:image, og:type).
   Los pasos con resultado llevan vistaPrevia: true (el motor
   pinta bajo el resultado cómo se ve la página en un buscador
   y al compartir el enlace, leyendo su <head>).
   Reto: completar la cabeza de la web de una pizzería.
   ============================================================ */
CURSO.registrar({
  id: "html-13",
  titulo: "The head of the page",
  xp: 40,
  objetivo: "You will know how to write in the <head> what the browser, the search engines and social networks read, even though you don't see it yourself.",
  // Lo que enseña esta lección, para el glosario de las lecciones de proyecto (js/glosario.js)
  glosario: [
    { termino: "<meta name=\"description\">", tema: "The head", para: "The summary the search engine shows under the title.", ejemplo: "<meta name=\"description\" content=\"Your neighborhood veterinary clinic…\">", buscar: "summary search engine google seo" },
    { termino: "<meta name=\"viewport\">", tema: "The head", para: "For the phone to use its real width. Copy it as is.", ejemplo: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">", buscar: "mobile responsive screen" },
    { termino: "<link rel=\"icon\">", tema: "The head", para: "The favicon: the icon on the tab.", ejemplo: "<link rel=\"icon\" href=\"img/favicon.svg\">", buscar: "favicon tab icon" },
    { termino: "Open Graph (og:…)", tema: "The head", para: "The card that shows up when sharing the link. They use `property`.", ejemplo: "<meta property=\"og:title\" content=\"Huellas\">\n<meta property=\"og:description\" content=\"…\">\n<meta property=\"og:image\" content=\"img/portada.jpg\">\n<meta property=\"og:type\" content=\"website\">", buscar: "social media share card whatsapp" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "What you don't see (and others do)",
      texto: "You already know that the `<meta charset>` and the `<title>` go inside the `<head>`. But the head can tell a lot more.\n\nThink of a box of cookies 🍪: what you eat is inside (the `<body>`), but the box carries a label with the name, a description and a photo. Others read that label:\n\n• The **browser**: the tab icon and how to fit the page to a phone.\n• **Search engines**: the title and the summary that show up in the results list.\n• **Social networks and messaging apps**: the card with a photo that appears when sharing the link.\n\nBelow the result you will see how a search engine and a social network see you. This page already has everything.",
      vistaPrevia: true,
      ejemplo: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Stylish Dogs · Dog grooming</title>
  <meta name="description" content="Baths, cuts and hairdos for dogs of every size. Book an appointment.">
  <link rel="icon" href="recursos/img/perro.svg">
  <meta property="og:title" content="Stylish Dogs">
  <meta property="og:description" content="Your dog, freshly groomed and happy.">
  <meta property="og:image" content="recursos/img/perro.svg">
</head>
<body>
  <h1>Stylish Dogs 🐶</h1>
  <p>Everything in the head is not visible here: look below.</p>
</body>
</html>`,
        css: ""
      },
      consejo: "All of those are **empty** tags like `<meta charset>`: they take no closing tag. Let's look at them one by one!"
    },
    {
      tipo: "explicacion",
      titulo: "Two essential metas",
      texto: "The `<meta>` tags give data about the page with two attributes: `name` (which piece of data it is) and `content` (its value).\n\n• `<meta name=\"description\" content=\"…\">`: the **summary** the search engine shows under the title. One or two sentences that make you want to click in. Without it, the search engine grabs any random piece of your page.\n• `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`: it tells the **phone** “use your real width, without zooming”. Without it, the phone pretends to be a computer and shows your website in miniature, with ant-sized text 🐜. Always copy it exactly as is.",
      vistaPrevia: true,
      ejemplo: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Grandma Rosa's recipes</title>
  <meta name="description" content="The recipes you've always known, step by step and hassle-free.">
</head>
<body>
  <h1>Grandma Rosa's recipes 👵</h1>
</body>
</html>`,
        css: ""
      },
      consejo: "In the HTML + CSS World you will meet the meta viewport again, when you build websites that adapt to phones."
    },
    {
      tipo: "explicacion",
      titulo: "The icon on the tab: favicon",
      texto: "The **favicon** is the little picture that shows up on the browser tab, in the bookmarks and in search engines, next to the title.\n\nYou put it in with the `<link>` tag, which **links** the page to another file:\n\n`<link rel=\"icon\" href=\"recursos/img/gato.svg\">`\n\n• `rel=\"icon\"` says **what relationship** that file has with the page: “it is my icon”.\n• `href` says **where it is**, just like in the `<a>` links.\n\nLike `<meta>`, `<link>` is an empty tag: it takes no closing tag.",
      vistaPrevia: true,
      ejemplo: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The cat's corner</title>
  <link rel="icon" href="recursos/img/gato.svg">
</head>
<body>
  <h1>The cat's corner 🐱</h1>
</body>
</html>`,
        css: ""
      },
      consejo: "A good favicon is simple: it is seen very small, so a drawing with lots of detail turns into a blob."
    },
    {
      tipo: "ejercicio",
      enunciado: "Complete the head of this page. Inside the `<head>`, below the `<title>`, add:\n\n1. A `<meta>` with `name=\"description\"` and `content=\"Photos of cats sleeping in odd places.\"`\n2. A `<link>` with `rel=\"icon\"` and `href=\"recursos/img/gato.svg\"`\n\nLook at the search engine card below the result: your summary and the cat must show up.",
      vistaPrevia: true,
      inicial: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sleepy cats</title>
</head>
<body>
  <h1>Sleepy cats 😴</h1>
</body>
</html>
`
      },
      solucion: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sleepy cats</title>
  <meta name="description" content="Photos of cats sleeping in odd places.">
  <link rel="icon" href="recursos/img/gato.svg">
</head>
<body>
  <h1>Sleepy cats 😴</h1>
</body>
</html>
`,
        css: ""
      },
      pistas: [
        "Both tags are empty: they take no closing tag. The meta has two attributes, name and content; the link also two, rel and href.",
        "Below the <title> write:\n<meta name=\"description\" content=\"Photos of cats sleeping in odd places.\">\n<link rel=\"icon\" href=\"recursos/img/gato.svg\">"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "The card when sharing: Open Graph",
      texto: "When you send a link through a messaging app or post it on a social network, a **card** appears with a picture, a title and a sentence. That card comes from some metas called **Open Graph** (which is why they start with `og:`):\n\n• `og:title`: the card's title.\n• `og:description`: the sentence below it.\n• `og:image`: the picture.\n• `og:type`: what it is; for a normal website, `website`.\n\nWatch out for one detail: these metas use `property` instead of `name`:\n\n`<meta property=\"og:title\" content=\"Stylish Dogs\">`",
      vistaPrevia: true,
      ejemplo: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mountains for sloths</title>
  <meta property="og:title" content="Mountains for sloths">
  <meta property="og:description" content="Cable car routes and a snack at the top.">
  <meta property="og:image" content="recursos/img/montana.svg">
  <meta property="og:type" content="website">
</head>
<body>
  <h1>Mountains for sloths ⛰️</h1>
</body>
</html>`,
        css: ""
      },
      consejo: "On a website published for real, `og:image` must carry the **full** address of the picture (`https://…`), because the social network asks for it from outside. Here, in the course, the path is fine."
    },
    {
      tipo: "quiz",
      pregunta: "You want the search engine to show a summary of your website under the title. What do you write in the <head>?",
      opciones: [
        "<meta name=\"description\" content=\"…\">",
        "<meta property=\"og:image\" content=\"…\">",
        "<link rel=\"icon\" href=\"…\">"
      ],
      correcta: 0,
      explicacion: "The meta description is the summary for the search engines. og:image is the picture of the card you get when sharing the link, and link rel=\"icon\" is the tab's favicon."
    },
    {
      tipo: "reto",
      enunciado: "🍕 The pizzeria **Tagui Pizza** already has its page, but the head is almost empty. Complete it inside the `<head>`:\n\n1. The **viewport** meta, so it looks right on the phone.\n2. A **description** meta with a summary of the pizzeria (you write it).\n3. The **favicon**: the image `recursos/img/pizza.svg`.\n4. The share card: `og:title`, `og:description` and `og:image` (again `recursos/img/pizza.svg`).\n\nWatch how the cards below change as you write.",
      vistaPrevia: true,
      inicial: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tagui Pizza · Wood-fired pizzas</title>
  <!-- Add here the missing head -->
</head>
<body>
  <h1>Tagui Pizza 🍕</h1>
  <p>48-hour dough, wood-fired oven and delivery by bike.</p>
</body>
</html>
`
      },
      comprobaciones: [
        {
          texto: "There is a meta viewport with width=device-width",
          prueba: (doc) => /width\s*=\s*device-width/i.test(doc.querySelector('meta[name="viewport"]')?.getAttribute("content") || "")
        },
        {
          texto: "There is a meta description with a summary (at least a few words)",
          prueba: (doc) => (doc.querySelector('meta[name="description"]')?.getAttribute("content") || "").trim().length >= 15
        },
        {
          texto: "There is a favicon: a <link rel=\"icon\"> with the pizza image",
          prueba: (doc) => /pizza\.svg$/i.test(doc.querySelector('link[rel~="icon"]')?.getAttribute("href")?.trim() || "")
        },
        {
          texto: "The share card has og:title, og:description and og:image (with their content)",
          prueba: (doc) => ["og:title", "og:description", "og:image"].every(p =>
            (doc.querySelector('meta[property="' + p + '"]')?.getAttribute("content") || "").trim().length > 0)
        }
      ],
      pistas: [
        "All of them are empty tags and go inside the <head>. The viewport and the description use name and content; the favicon is a <link> with rel=\"icon\" and href; the card ones use property=\"og:…\" and content.",
        "Below the comment write:\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<meta name=\"description\" content=\"Wood-fired pizzas with 48-hour dough.\">\n<link rel=\"icon\" href=\"recursos/img/pizza.svg\">\n<meta property=\"og:title\" content=\"Tagui Pizza\">\n<meta property=\"og:description\" content=\"Wood-fired pizzas.\">\n<meta property=\"og:image\" content=\"recursos/img/pizza.svg\">"
      ],
      solucion: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tagui Pizza · Wood-fired pizzas</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Wood-fired pizzas with 48-hour dough and delivery by bike.">
  <link rel="icon" href="recursos/img/pizza.svg">
  <meta property="og:title" content="Tagui Pizza">
  <meta property="og:description" content="Wood-fired pizzas, freshly made at your door.">
  <meta property="og:image" content="recursos/img/pizza.svg">
  <meta property="og:type" content="website">
</head>
<body>
  <h1>Tagui Pizza 🍕</h1>
  <p>48-hour dough, wood-fired oven and delivery by bike.</p>
</body>
</html>
`,
        css: ""
      }
    }
  ]
});
