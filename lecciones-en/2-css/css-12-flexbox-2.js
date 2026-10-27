/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-12
   Flexbox (II): repartir el espacio — flex-wrap, flex-grow,
   flex-shrink, flex-basis, la abreviatura flex: 1 y align-self.
   Nota: el reto se comprueba en un iframe de 800px de ancho; las
   pruebas miden tamaños con getBoundingClientRect, no el texto CSS.
   ============================================================ */
CURSO.registrar({
  id: "css-12",
  titulo: "Flexbox (II): sharing out the space",
  xp: 45,
  objetivo: "You'll learn to decide which flex elements grow, which ones shrink, and how they jump to a new line when they don't fit.",
  glosario: [
    { termino: "flex-wrap", tema: "Flexbox", para: "`wrap`: the children jump to the next line when they don't fit.", ejemplo: ".cards {\n  display: flex;\n  flex-wrap: wrap;\n}", buscar: "wrap next line don't fit" },
    { termino: "flex-grow", tema: "Flexbox", para: "How much a child grows to fill up what's left over.", ejemplo: ".search-bar {\n  flex-grow: 1;\n}", buscar: "grow fill leftover" },
    { termino: "flex-shrink", tema: "Flexbox", para: "How much it shrinks when it doesn't fit; `0` stops it from shrinking.", ejemplo: ".logo {\n  flex-shrink: 0;\n}", buscar: "shrink" },
    { termino: "flex-basis", tema: "Flexbox", para: "A child's starting size, before it grows or shrinks.", ejemplo: ".card {\n  flex-basis: 200px;\n}", buscar: "starting size base" },
    { termino: "flex: 1", tema: "Flexbox", para: "Shortcut: all the children with `flex: 1` share the space out equally.", ejemplo: ".column {\n  flex: 1;\n}", buscar: "share equal shortcut" },
    { termino: "align-self", tema: "Flexbox", para: "One child lines itself up differently from the others.", ejemplo: ".button {\n  align-self: flex-end;\n}", buscar: "align just one" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "When they don't fit: flex-wrap",
      texto: "By default, a flex container squeezes **all** of its children onto **one single line**, even if they don't fit. How does it manage? It **shrinks** them, like a sweater in the washing machine 🧺. That's what `flex-shrink` (shrinking) controls: the default value is `1`, and with `flex-shrink: 0` the element refuses to shrink.\n\nIf you'd rather have them jump to the line below, like the words in a paragraph, give the container `flex-wrap: wrap` (wrapping).\n\nIn the example, each box is 100 px wide: the ones that don't fit drop down to the next row.",
      ejemplo: {
        html: `<div class="row">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
  <div class="box">4</div>
  <div class="box">5</div>
  <div class="box">6</div>
</div>`,
        css: `.row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.box {
  width: 100px;
  background-color: tomato;
  color: white;
  padding: 10px 0;
  text-align: center;
}`
      },
      consejo: "The default value is `flex-wrap: nowrap` (no wrapping). If you see flex items squashed or spilling off the screen, you're almost certainly missing a `wrap`!"
    },
    {
      tipo: "explicacion",
      titulo: "Sharing out the leftover space: flex-grow and flex-basis",
      texto: "Now for the opposite case: there's **leftover** space in the row. Who gets it?\n\n• `flex-basis` is the element's **starting size** along the main axis (in a row, its initial width).\n• `flex-grow` (growing) says **how many shares** of the leftover space it eats up. The default is `0`: nobody grows.\n\nIt's like sharing out the leftover pizza 🍕: with `flex-grow: 1` you get one slice; with `flex-grow: 2`, two slices.\n\nIn the example, they all start out 60 px wide; box 2 grows by one share and box 3 by twice that.",
      ejemplo: {
        html: `<div class="row">
  <div class="box">1</div>
  <div class="box two">2</div>
  <div class="box three">3</div>
</div>`,
        css: `.row {
  display: flex;
  gap: 10px;
}
.box {
  flex-basis: 60px;
  background-color: tomato;
  color: white;
  padding: 10px 0;
  text-align: center;
}
.two { flex-grow: 1; }
.three { flex-grow: 2; }`
      }
    },
    {
      tipo: "explicacion",
      titulo: "The flex: 1 shortcut and the rebel align-self",
      texto: "Writing three properties gets tiring, so there's a shorthand: `flex`. The most famous one is `flex: 1`, which means “grow 1, shrink 1, start from 0”. The result: **everything that has it measures the same** and they share the whole row out equally.\n\nAnd if one element wants to go its own way, it uses `align-self` (align itself): it skips the parent's `align-items` **just for that one**. It accepts the same values: `flex-start`, `center`, `flex-end`…\n\nIn the example, all the boxes sit at the top, except for the rebel one 😎.",
      ejemplo: {
        html: `<div class="row">
  <div class="box">1</div>
  <div class="box rebel">2</div>
  <div class="box">3</div>
</div>`,
        css: `.row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  height: 120px;
  background-color: lavender;
}
.box {
  flex: 1;
  background-color: tomato;
  color: white;
  padding: 10px 0;
  text-align: center;
}
.rebel { align-self: flex-end; }`
      },
      consejo: "`flex: 1` is one of the CSS lines you'll write most in your life: equal columns, buttons that fill a bar, search bars that take up the whole width… Jot it down!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Fix the bar of your shopping app 🛒: the title should take up all the space between the two icons.\n\n• On the `.bar` selector, set `display` to `flex`.\n• On the `.title` selector, set `flex-grow` to `1` and `text-align` to `center`.\n\nThe HTML is already written: you only write the CSS.",
      cssBase: `body { font-family: sans-serif; }
.bar { background-color: #333; color: white; padding: 8px; border-radius: 10px; font-size: 20px; }
.bar div { padding: 6px 10px; }
.title { background-color: tomato; border-radius: 6px; font-weight: bold; }`,
      inicial: {
        html: `<div class="bar">
  <div>🏠</div>
  <div class="title">My shopping list</div>
  <div>⚙️</div>
</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="bar">
  <div>🏠</div>
  <div class="title">My shopping list</div>
  <div>⚙️</div>
</div>
`,
        css: `.bar {
  display: flex;
}
.title {
  flex-grow: 1;
  text-align: center;
}
`
      },
      pistas: [
        "You need two rules: one for the container (.bar) and one for the element that grows (.title).",
        "It should end up like this:\n.bar {\n  display: flex;\n}\n.title {\n  flex-grow: 1;\n  text-align: center;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "The lavender row already has `display: flex`. Raise the `flex-basis` until the boxes no longer fit and try `wrap`. Then make box 2 grow and send box 3 somewhere else with `align-self`.",
      html: `<div class="row">
  <div class="box">1</div>
  <div class="box two">2</div>
  <div class="box three">3</div>
  <div class="box">4</div>
  <div class="box">5</div>
</div>`,
      cssBase: `body { font-family: sans-serif; }
.row { display: flex; align-items: flex-start; gap: 8px; min-height: 160px; background-color: lavender; }
.box { background-color: tomato; color: white; padding: 8px 0; text-align: center; font-weight: bold; }
.two { background-color: royalblue; }
.three { background-color: seagreen; }`,
      controles: [
        { selector: ".row", propiedad: "flex-wrap", tipo: "opciones", opciones: ["nowrap", "wrap"], valor: "nowrap" },
        { selector: ".box", propiedad: "flex-basis", tipo: "rango", min: 40, max: 200, valor: 60, unidad: "px" },
        { selector: ".two", propiedad: "flex-grow", tipo: "rango", min: 0, max: 3, valor: 0, unidad: "" },
        { selector: ".three", propiedad: "align-self", tipo: "opciones", opciones: ["auto", "flex-start", "center", "flex-end"], valor: "auto" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "You have 10 cards in a flex container and they don't fit: they all look squashed into a single row. What fixes it?",
      opciones: [
        "flex-wrap: wrap on the container",
        "flex-grow: 1 on each card",
        "align-self: center on each card"
      ],
      correcta: 0,
      explicacion: "With flex-wrap: wrap, the cards that don't fit jump to the next line instead of shrinking. flex-grow is for sharing out the leftover space (here it's missing), and align-self only changes the alignment of one element."
    },
    {
      tipo: "reto",
      enunciado: "Finish the page of your collection of magic cards 🃏:\n\n1. Make the text field (`input`) of the search bar **grow** and fill all the leftover space, leaving the button snug against the right.\n2. Let the cards in `.collection` **jump to the next line** when they don't fit, so they don't get squashed.",
      inicial: {
        html: `<div class="search-bar">
  <label for="search">Search:</label>
  <input type="text" id="search">
  <button>Go</button>
</div>

<div class="collection">
  <div class="card">🐉 Dragon</div>
  <div class="card">🧙 Wizard</div>
  <div class="card">🦄 Unicorn</div>
  <div class="card">🤖 Robot</div>
  <div class="card">👻 Ghost</div>
  <div class="card">🧜 Mermaid</div>
</div>
`,
        css: `.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

input {
  /* 1. Make it grow and fill all the leftover space */
}

.collection {
  display: flex;
  gap: 10px;
  /* 2. Make the cards jump to the next line if they don't fit */
}

.card {
  width: 150px;
  padding: 20px 10px;
  background-color: gold;
  border-radius: 8px;
  text-align: center;
}
`
      },
      comprobaciones: [
        {
          texto: "The text field grows (flex-grow) and the button stays snug against the right edge",
          prueba: (doc, win) => {
            const box = doc.querySelector(".search-bar");
            const field = doc.querySelector(".search-bar input");
            const boton = doc.querySelector(".search-bar button");
            if (!box || !field || !boton) return false;
            const grows = parseFloat(win.getComputedStyle(field).flexGrow) > 0;
            const snug = Math.abs(boton.getBoundingClientRect().right - box.getBoundingClientRect().right) < 2;
            return grows && snug;
          }
        },
        {
          texto: "The `.collection` has flex-wrap: wrap",
          prueba: (doc, win) => {
            const c = doc.querySelector(".collection");
            return !!c && win.getComputedStyle(c).flexWrap === "wrap";
          }
        },
        {
          texto: "No card gets squashed: they all measure at least 150 px wide",
          prueba: (doc) => {
            const cards = Array.from(doc.querySelectorAll(".collection .card"));
            return cards.length >= 6 && cards.every(c => c.getBoundingClientRect().width >= 150);
          }
        }
      ],
      pistas: [
        "For the text field, use the property that shares out the leftover space (flex-grow, or the flex shorthand). For the cards, the property that lets them jump to the next line goes on the .collection container.",
        "Write flex-grow: 1; inside input { … } and flex-wrap: wrap; inside .collection { … }."
      ],
      solucion: {
        html: `<div class="search-bar">
  <label for="search">Search:</label>
  <input type="text" id="search">
  <button>Go</button>
</div>

<div class="collection">
  <div class="card">🐉 Dragon</div>
  <div class="card">🧙 Wizard</div>
  <div class="card">🦄 Unicorn</div>
  <div class="card">🤖 Robot</div>
  <div class="card">👻 Ghost</div>
  <div class="card">🧜 Mermaid</div>
</div>
`,
        css: `.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

input {
  flex-grow: 1;
}

.collection {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.card {
  width: 150px;
  padding: 20px 10px;
  background-color: gold;
  border-radius: 8px;
  text-align: center;
}
`
      }
    }
  ]
});
