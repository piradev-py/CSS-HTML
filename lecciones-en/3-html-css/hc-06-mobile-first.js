/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-06 (inglés)
   Mobile first — diseñar primero para el móvil (CSS base sin media
   query) y ampliar con @media (min-width: …) en cascada, de menor a
   mayor; reorganizar con Flexbox/Grid según el tamaño (y order).
   Notas:
   - Pasos con resultado: dispositivos: true.
   - Ejercicio con puntos de corte 600 y 1000 px: el revisor compara a
     375 (1 col), 800 (2 col) y 1280 px (3 col), así que también
     detecta el orden equivocado de las media queries.
   - El reto mide posiciones con getBoundingClientRect en copias de la
     página a 375, 700 y 1280 px (PRUEBA.clonar) y en el marco normal
     (800 px). «Al lado» acepta la barra a la derecha o a la izquierda.
   ============================================================ */
CURSO.registrar({
  id: "hc-06",
  titulo: "Mobile first",
  xp: 45,
  objetivo: "You'll know how to design the phone version first and expand it step by step for bigger screens with min-width.",
  glosario: [
    { termino: "mobile first", tema: "Responsive", para: "First the phone CSS (without `@media`) and then `@media (min-width)` for bigger screens.", ejemplo: ".grid {\n  display: grid;\n}\n@media (min-width: 1100px) {\n  .grid {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}", buscar: "mobile first strategy phone" },
    { termino: "cascading @media", tema: "Responsive", para: "Several `@media (min-width)` from smallest to largest: each one adds to the previous one.", ejemplo: "@media (min-width: 768px) {\n  .grid {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (min-width: 1100px) {\n  .grid {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}", buscar: "several media order tablet desktop" },
    { termino: "phone menu (.open)", tema: "Responsive", para: "On a phone the menu hides behind a button; with the `open` class it shows.", ejemplo: "nav ul {\n  display: none;\n}\nnav.open ul {\n  display: block;\n}", buscar: "phone menu hamburger collapse button open" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "The phone first",
      texto: "There are two ways to make a responsive website. You can design for the computer and then **remove** things for the phone (with `max-width`)… or the other way around: design for the phone first and then **add** things for big screens. This second way is called **mobile first**.\n\nIt's like packing a suitcase 🧳: first you put the essentials in your carry-on and, if they give you a big suitcase, you add extras.\n\n• The CSS **without** a media query is the phone version: simple, in one column.\n• With `@media (min-width: 768px)` you add what big screens need.",
      dispositivos: true,
      ejemplo: {
        html: `<div class="card">
  <h2>🐶 Rocky is looking for a home</h2>
  <p>Playful, affectionate and an expert sock thief.</p>
</div>`,
        css: `/* Base: phone */
.card {
  padding: 12px;
  font-size: 16px;
  background-color: lavender;
  border-radius: 10px;
}

/* From 768px up */
@media (min-width: 768px) {
  .card {
    padding: 32px;
    font-size: 24px;
  }
}`
      },
      consejo: "Why start with the phone? More than half of people browse on their phones, and the small design is the simplest one. It's easier to **add** things than to keep undoing them."
    },
    {
      tipo: "explicacion",
      titulo: "Cascading media queries",
      texto: "You can chain several `min-width`, from **smallest to largest**, like the steps of a staircase 🪜:\n\n• Base: 1 column (phone).\n• From 600 px: 2 columns.\n• From 900 px: 3 columns.\n\nOn a 1280 px screen **both** conditions are met, and the one written **further down** wins (remember the cascade? the last rule wins). That's why the order matters: from the smallest to the largest.\n\nDrag the dividers to see how the number of columns changes.",
      dispositivos: true,
      ejemplo: {
        html: `<div class="fruits">
  <div>🍓</div>
  <div>🍌</div>
  <div>🍇</div>
  <div>🍉</div>
  <div>🍍</div>
  <div>🥝</div>
</div>`,
        css: `.fruits {
  display: grid;
  gap: 8px;
}
.fruits div {
  background-color: honeydew;
  font-size: 32px;
  text-align: center;
  padding: 8px;
  border-radius: 8px;
}

@media (min-width: 600px) {
  .fruits {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .fruits {
    grid-template-columns: repeat(3, 1fr);
  }
}`
      },
      consejo: "If you put the 900 px one **before** the 600 px one, on big screens the 600 px one overrides it and you'll never see the 3 columns. From small to large, always!"
    },
    {
      tipo: "ejercicio",
      enunciado: "The pizzeria menu 🍕 is already ready for phones: one column (that's the base CSS, already written). Expand it, **mobile first**, with two media queries in this order:\n\n1. `@media (min-width: 600px)`: for the `.pizzas` selector, add `grid-template-columns` with the value `repeat(2, 1fr)`.\n2. `@media (min-width: 1000px)`: for the `.pizzas` selector, add `grid-template-columns` with the value `repeat(3, 1fr)`.\n\n⚠️ Careful with the braces: each `@media { }` has **inside** it another rule with its own `{ }`. Indentation (the spaces on the left) doesn't matter to the browser: what matters is that each `{` has its `}`.\n\nIf your result is narrower than 600 px you'll see a single column: drag the dividers to widen it.",
      dispositivos: true,
      cssBase: `body { font-family: sans-serif; }
.pizzas { display: grid; gap: 10px; }
.pizza { background-color: papayawhip; border: 2px solid tomato; border-radius: 10px; padding: 12px; text-align: center; font-size: 18px; }`,
      inicial: {
        html: `<div class="pizzas">
  <div class="pizza">🍕 Margherita</div>
  <div class="pizza">🍄 Mushroom</div>
  <div class="pizza">🌶️ Spicy</div>
  <div class="pizza">🧀 Four cheese</div>
  <div class="pizza">🍍 Hawaiian</div>
  <div class="pizza">🥬 Veggie</div>
</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="pizzas">
  <div class="pizza">🍕 Margherita</div>
  <div class="pizza">🍄 Mushroom</div>
  <div class="pizza">🌶️ Spicy</div>
  <div class="pizza">🧀 Four cheese</div>
  <div class="pizza">🍍 Hawaiian</div>
  <div class="pizza">🥬 Veggie</div>
</div>
`,
        css: `@media (min-width: 600px) {
  .pizzas {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1000px) {
  .pizzas {
    grid-template-columns: repeat(3, 1fr);
  }
}
`
      },
      pistas: [
        "Write two @media blocks, one below the other: first the 600px one and then the 1000px one. Inside each one goes a .pizzas rule with grid-template-columns.",
        "It should look like this:\n@media (min-width: 600px) {\n  .pizzas {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n@media (min-width: 1000px) {\n  .pizzas {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Rearranging the page by size",
      texto: "With Flexbox or Grid you can change **where** the parts of the page go depending on the width. The usual thing: on a phone, the main content and the sidebar go one **below** the other; on big screens, **side by side**.\n\nIn the example, the base is one column (`flex-direction: column`) and from 768 px it becomes a row with the content twice as wide (`flex: 2` and `flex: 1`).\n\nAnd a new trick: `order` changes the order in which the children of a flex or grid container are **shown** without touching the HTML. They're all `0`; with `order: -1`, the sidebar goes first, on the left.",
      dispositivos: true,
      ejemplo: {
        html: `<div class="page">
  <main>📰 Today's news: a cat learns to play the piano!</main>
  <aside>⭐ Most read</aside>
</div>`,
        css: `.page {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
main, aside {
  padding: 16px;
  border-radius: 10px;
}
main {
  background-color: lightyellow;
}
aside {
  background-color: lightblue;
}

@media (min-width: 768px) {
  .page {
    flex-direction: row;
  }
  main {
    flex: 2;
  }
  aside {
    flex: 1;
    order: -1;
  }
}`
      },
      consejo: "Use `order` carefully: people who browse with the keyboard or a screen reader follow the **HTML** order, not the one they see. Write the HTML in a logical order and use `order` only for small adjustments."
    },
    {
      tipo: "explicacion",
      titulo: "The phone menu",
      texto: "Five links in a row don't fit on a phone. The solution almost every website uses: **hide the menu** behind a button (☰).\n\nWith mobile first it's written like this:\n\n• **Base (phone):** the menu list, hidden with `display: none`; the ☰ button, visible.\n• `nav.open ul`: when the `nav` has the **open** class, the list shows. **JavaScript** will add that class when the button is pressed (you'll learn it in World 4).\n• **From 768px:** the other way around. The button hides and the list always shows, in a row.\n\nIn the example, the `nav` already has the `open` class: imagine you delete it and the list would disappear. Widen the window to see the desktop menu.",
      ejemplo: {
        html: `<header>
  <button class="menu-button">☰ Menu</button>
  <nav class="open">
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Recipes</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
</header>`,
        css: `nav ul {
  display: none;
  list-style: none;
  padding: 0;
}
nav.open ul {
  display: block;
}
@media (min-width: 768px) {
  .menu-button {
    display: none;
  }
  nav ul {
    display: flex;
    gap: 20px;
  }
}`
      },
      consejo: "The selector `nav.open` (without a space) means “a `nav` that **also** has the open class”. With a space, `nav .open`, it would look for something with that class **inside** the nav."
    },
    {
      tipo: "quiz",
      pregunta: "In mobile first CSS, which styles go outside any media query?",
      opciones: [
        "The phone version ones, which apply to all screens",
        "The computer version ones",
        "None: in mobile first everything goes inside media queries"
      ],
      correcta: 0,
      explicacion: "In mobile first, the base CSS (without a media query) is the phone version. Then the media queries with min-width add changes for bigger and bigger screens."
    },
    {
      tipo: "reto",
      enunciado: "The Solar Sound Festival website 🎸! On a phone everything goes in one column (that's already done: it's the base CSS). Make it **mobile first**:\n\n1. Add a media query `@media (min-width: 768px)` at the end.\n2. Inside it, put `.content` in a **row** (`flex-direction: row`), so the `.sidebar` sits next to the `.main` content.\n3. Also inside it, make `.main` **twice** as wide as `.sidebar` (with `flex`).\n\n⚠️ Careful with the braces: the `@media`'s `}` goes at the end, **after** closing the three rules inside. The spaces on the left don't matter; the braces do.\n\nTest it with 📱 and by dragging the dividers.",
      dispositivos: true,
      cssBase: `body { font-family: sans-serif; }
.header { background-color: darkorange; color: white; padding: 4px 16px; border-radius: 10px; margin-bottom: 16px; }
h2 { margin-top: 0; }`,
      inicial: {
        html: `<header class="header">
  <h1>🎸 Solar Sound Festival</h1>
</header>

<div class="content">
  <main class="main">
    <h2>Lineup</h2>
    <p>🎤 The Crickets · 🥁 Crazy Drum · 🎹 The Happy Keys</p>
    <p>Three days of open-air music, from July 12 to 14.</p>
  </main>
  <aside class="sidebar">
    <h2>Tickets</h2>
    <p>🎟️ 3-day pass: $60</p>
    <p>🎟️ One day: $25</p>
  </aside>
</div>
`,
        css: `/* Base (phone): everything in one column */
.content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main,
.sidebar {
  padding: 12px;
  border-radius: 10px;
}

.main {
  background-color: lemonchiffon;
}

.sidebar {
  background-color: lightcyan;
}

/* 1. Media query from 768px
   2. .content in a row
   3. .main twice as wide as .sidebar */
`
      },
      comprobaciones: [
        {
          texto: "On screens narrower than 768 px (like a phone), the `.sidebar` sits **below** the `.main` content",
          prueba: async (doc) => {
            for (const width of [375, 700]) {
              const v = await PRUEBA.clonar(doc, { ancho: width });
              const m = v.doc.querySelector(".main");
              const s = v.doc.querySelector(".sidebar");
              if (!m || !s) return false;
              if (s.getBoundingClientRect().top < m.getBoundingClientRect().bottom - 1) return false;
            }
            return true;
          }
        },
        {
          texto: "From 768 px (for example, at 800 and 1280 px), the `.sidebar` sits **next to** the `.main`",
          prueba: async (doc) => {
            const sideBySide = d => {
              const m = d.querySelector(".main")?.getBoundingClientRect();
              const s = d.querySelector(".sidebar")?.getBoundingClientRect();
              if (!m || !s) return false;
              return s.top < m.bottom - 1 && (s.left >= m.right - 1 || s.right <= m.left + 1);
            };
            const v = await PRUEBA.clonar(doc, { ancho: 1280 });
            return sideBySide(doc) && sideBySide(v.doc);
          }
        },
        {
          texto: "On a wide screen, the `.main` is **twice** as wide as the `.sidebar` and together they fill the row",
          prueba: async (doc) => {
            const v = await PRUEBA.clonar(doc, { ancho: 1280 });
            const c = v.doc.querySelector(".content")?.getBoundingClientRect();
            const m = v.doc.querySelector(".main")?.getBoundingClientRect();
            const s = v.doc.querySelector(".sidebar")?.getBoundingClientRect();
            if (!c || !m || !s || s.width <= 0) return false;
            const ratio = m.width / s.width;
            return ratio >= 1.7 && ratio <= 2.3 && m.width + s.width >= c.width * 0.9;
          }
        },
        {
          texto: "It's **mobile first**: the media query uses `min-width`",
          prueba: (doc) => /@media[^{]*min-width/.test(PRUEBA.textoCSS(doc))
        }
      ],
      pistas: [
        "Write @media (min-width: 768px) { … } at the end. Inside you need three rules: .content changes flex-direction, and .main and .sidebar use flex with different numbers (one twice the other).",
        "Add at the end:\n@media (min-width: 768px) {\n  .content {\n    flex-direction: row;\n  }\n  .main {\n    flex: 2;\n  }\n  .sidebar {\n    flex: 1;\n  }\n}"
      ],
      solucion: {
        html: `<header class="header">
  <h1>🎸 Solar Sound Festival</h1>
</header>

<div class="content">
  <main class="main">
    <h2>Lineup</h2>
    <p>🎤 The Crickets · 🥁 Crazy Drum · 🎹 The Happy Keys</p>
    <p>Three days of open-air music, from July 12 to 14.</p>
  </main>
  <aside class="sidebar">
    <h2>Tickets</h2>
    <p>🎟️ 3-day pass: $60</p>
    <p>🎟️ One day: $25</p>
  </aside>
</div>
`,
        css: `/* Base (phone): everything in one column */
.content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main,
.sidebar {
  padding: 12px;
  border-radius: 10px;
}

.main {
  background-color: lemonchiffon;
}

.sidebar {
  background-color: lightcyan;
}

@media (min-width: 768px) {
  .content {
    flex-direction: row;
  }
  .main {
    flex: 2;
  }
  .sidebar {
    flex: 1;
  }
}
`
      }
    }
  ]
});
