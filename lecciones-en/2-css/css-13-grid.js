/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-13
   Grid — display: grid, grid-template-columns, la unidad fr,
   repeat(), gap y grid-column: span 2.
   Nota: el valor calculado de grid-template-columns sale en px
   («200px 200px 200px»), así que el reto cuenta las columnas
   partiendo ese texto y mide anchos con getBoundingClientRect.
   ============================================================ */
CURSO.registrar({
  id: "css-13",
  titulo: "Grid",
  xp: 50,
  objetivo: "You'll learn to create grids of rows and columns with CSS Grid and make an element span several cells.",
  glosario: [
    { termino: "display: grid", tema: "Grid", para: "The container lays out its children in a grid.", ejemplo: ".grid {\n  display: grid;\n}", buscar: "grid" },
    { termino: "grid-template-columns", tema: "Grid", para: "How many columns there are and how wide each one is.", ejemplo: ".footer-columns {\n  display: grid;\n  grid-template-columns: 2fr 2fr 1.5fr 1fr;\n}", buscar: "columns width" },
    { termino: "fr", tema: "Grid", para: "A share of the leftover space: `1fr 1fr` are two equal columns.", ejemplo: ".hero {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}", buscar: "fraction share part" },
    { termino: "repeat()", tema: "Grid", para: "Repeats columns without writing them all out.", ejemplo: ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}", buscar: "repeat equal columns" },
    { termino: "grid-column: span 2", tema: "Grid", para: "A child spans two columns.", ejemplo: ".featured {\n  grid-column: span 2;\n}", buscar: "span several columns" },
    { termino: "grid-column: 1 / 3", tema: "Grid", para: "A child goes from line 1 to line 3: it spans the first two columns.", ejemplo: ".appointment-card {\n  grid-column: 1 / 3;\n}", buscar: "lines span columns" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "A grid: display: grid",
      texto: "Flexbox is great for placing things in **one** direction: a row **or** a column. But sometimes you want **rows and columns at the same time**, like a chess board ♟️ or a box of chocolates.\n\nFor that, there's **Grid**. Just like with Flexbox, everything starts at the **parent**: you give it `display: grid` and tell it which columns you want with `grid-template-columns`. Each value is **one column** with its width.\n\nThe children place themselves, cell by cell, and when a row fills up they start a new one. The rows are created automatically!",
      ejemplo: {
        html: `<div class="grid">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
  <div class="box">4</div>
  <div class="box">5</div>
</div>`,
        css: `.grid {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  gap: 8px;
}
.box {
  background-color: tomato;
  color: white;
  padding: 10px 0;
  text-align: center;
}`
      },
      consejo: "`gap` works just like in Flexbox: it separates the cells, both between columns and between rows."
    },
    {
      tipo: "explicacion",
      titulo: "The fr unit and repeat()",
      texto: "Setting widths in pixels is rigid. Grid brings a new unit: `fr` (from \"fraction\"). `1fr` means **one share of the leftover space**.\n\nWith `1fr 2fr 1fr`, the width is split into 4 pieces: the middle column gets **2** and the side ones get **1** each. Like sharing out a chocolate bar 🍫.\n\nAnd if you want many equal columns, you don't need to write `1fr 1fr 1fr 1fr`: use `repeat(4, 1fr)`, which means \"repeat `1fr` 4 times\".",
      ejemplo: {
        html: `<div class="grid">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
  <div class="box">4</div>
  <div class="box">5</div>
  <div class="box">6</div>
</div>`,
        css: `.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 8px;
}
.box {
  background-color: tomato;
  color: white;
  padding: 10px 0;
  text-align: center;
}`
      },
      consejo: "`repeat(3, 1fr)` is the favorite trick for making 3 equal columns that adapt to any screen."
    },
    {
      tipo: "explicacion",
      titulo: "Spanning several cells: grid-column: span 2",
      texto: "By default, each child takes up **one** cell. But you can make an element wider than the others with `grid-column: span 2`: it takes up **two columns** in a row.\n\nThis property doesn't go on the parent, but on the **child** you want to enlarge. The others rearrange themselves into the cells that are left over.\n\nIt's perfect for highlighting something: the main photo in a gallery, the most important news story… 📰\n\nYou can also say **which line to which line** it goes: the columns are separated by numbered lines starting at 1, so `grid-column: 1 / 3` goes from line 1 to line 3, that is, the first two columns.",
      ejemplo: {
        html: `<div class="grid">
  <div class="box big">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
  <div class="box">4</div>
  <div class="box">5</div>
</div>`,
        css: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.box {
  background-color: tomato;
  color: white;
  padding: 10px 0;
  text-align: center;
}
.big {
  grid-column: span 2;
  background-color: royalblue;
}`
      },
      consejo: "Flexbox or Grid? Quick rule: if you're thinking about **one row** (a menu, a button bar), Flexbox. If you're thinking about **rows and columns** (a gallery, a board), Grid."
    },
    {
      tipo: "ejercicio",
      enunciado: "Place the candies in their chocolate box 🍬, in 3 equal columns.\n\nOn the `.chocolate-box` selector, add:\n\n• `display` with the value `grid`\n• `grid-template-columns` with the value `repeat(3, 1fr)`\n• `gap` with the value `10px`\n\nThe HTML is already written: you only write the CSS.",
      cssBase: `.chocolate-box { background-color: saddlebrown; padding: 10px; border-radius: 12px; max-width: 320px; }
.chocolate-box div { background-color: wheat; border-radius: 10px; padding: 10px 0; font-size: 32px; text-align: center; }`,
      inicial: {
        html: `<div class="chocolate-box">
  <div>🍫</div>
  <div>🍬</div>
  <div>🍭</div>
  <div>🍩</div>
  <div>🍪</div>
  <div>🧁</div>
</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="chocolate-box">
  <div>🍫</div>
  <div>🍬</div>
  <div>🍭</div>
  <div>🍩</div>
  <div>🍪</div>
  <div>🧁</div>
</div>
`,
        css: `.chocolate-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
`
      },
      pistas: [
        "Write a single rule for the .chocolate-box container with three properties. Watch out with repeat: inside the parentheses goes the number of columns, a comma, and the width of each one.",
        "It should end up like this:\n.chocolate-box {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "The box already has `display: grid`. Try different columns, change the gap, and make the blue box span 2 or 3 cells.",
      html: `<div class="grid">
  <div class="box first">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
  <div class="box">4</div>
  <div class="box">5</div>
  <div class="box">6</div>
  <div class="box">7</div>
</div>`,
      cssBase: `body { font-family: sans-serif; }
.grid { display: grid; background-color: lavender; }
.box { background-color: tomato; color: white; padding: 10px 0; text-align: center; font-weight: bold; }
.first { background-color: royalblue; }`,
      controles: [
        { selector: ".grid", propiedad: "grid-template-columns", tipo: "opciones", opciones: ["1fr 1fr", "1fr 1fr 1fr", "repeat(4, 1fr)", "1fr 2fr 1fr", "80px 1fr"], valor: "1fr 1fr 1fr" },
        { selector: ".grid", propiedad: "gap", tipo: "rango", min: 0, max: 30, valor: 8, unidad: "px" },
        { selector: ".first", propiedad: "grid-column", tipo: "opciones", opciones: ["auto", "span 2", "span 3"], valor: "auto" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "What do you get with grid-template-columns: repeat(4, 1fr)?",
      opciones: [
        "4 columns of the same width",
        "4 rows of the same height",
        "Each element repeating 4 times"
      ],
      correcta: 0,
      explicacion: "repeat(4, 1fr) is the same as writing 1fr 1fr 1fr 1fr: four columns that share the width equally. The rows are created automatically."
    },
    {
      tipo: "reto",
      enunciado: "Two grids on one page! 🎲\n\n1. Turn `.board` into a tic-tac-toe game: a grid of **3 equal columns** with a `gap` of `5px` between cells.\n2. Turn `.gallery` into a grid of **3 equal columns** with a gap of `10px`.\n3. Make the `.featured` photo span **two columns**.",
      inicial: {
        html: `<h2>Tic-tac-toe</h2>
<div class="board">
  <div>❌</div>
  <div>⭕</div>
  <div></div>
  <div></div>
  <div>❌</div>
  <div></div>
  <div>⭕</div>
  <div></div>
  <div>❌</div>
</div>

<h2>My trips</h2>
<div class="gallery">
  <div class="photo featured">🏖️</div>
  <div class="photo">🏔️</div>
  <div class="photo">🌋</div>
  <div class="photo">🏜️</div>
</div>
`,
        css: `.board {
  width: 230px;
  background-color: #333;
  /* 1. Grid of 3 equal columns with gap of 5px */
}

.board div {
  height: 70px;
  background-color: white;
  font-size: 40px;
  text-align: center;
}

.gallery {
  /* 2. Grid of 3 equal columns with gap of 10px */
}

.photo {
  height: 80px;
  background-color: skyblue;
  border-radius: 8px;
  font-size: 40px;
  text-align: center;
}

.featured {
  /* 3. Make it span two columns */
}
`
      },
      comprobaciones: [
        {
          texto: "The `.board` is a grid (display: grid) of 3 columns with a gap between cells",
          prueba: (doc, win) => {
            const t = doc.querySelector(".board");
            if (!t) return false;
            const cs = win.getComputedStyle(t);
            const columnas = cs.gridTemplateColumns.trim().split(/\s+/).length;
            return cs.display === "grid" && cs.gridTemplateColumns !== "none" && columnas === 3
              && parseFloat(cs.columnGap) > 0 && parseFloat(cs.rowGap) > 0;
          }
        },
        {
          texto: "The `.gallery` is a grid (display: grid) of 3 columns",
          prueba: (doc, win) => {
            const g = doc.querySelector(".gallery");
            if (!g) return false;
            const cs = win.getComputedStyle(g);
            const columnas = cs.gridTemplateColumns.trim().split(/\s+/).length;
            return cs.display === "grid" && cs.gridTemplateColumns !== "none" && columnas === 3;
          }
        },
        {
          texto: "The `.featured` photo spans two columns (it's wider than the others)",
          prueba: (doc) => {
            const d = doc.querySelector(".gallery .featured");
            const otra = doc.querySelector(".gallery .photo:not(.featured)");
            if (!d || !otra) return false;
            return d.getBoundingClientRect().width > otra.getBoundingClientRect().width * 1.5;
          }
        }
      ],
      pistas: [
        "Both containers need the same thing: display: grid, grid-template-columns with 3 equal columns (repeat saves you writing it) and their gap. The featured photo uses grid-column.",
        "Inside .board add:\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 5px;\nIn .gallery, the same but with gap: 10px; and in .featured write grid-column: span 2;"
      ],
      solucion: {
        html: `<h2>Tic-tac-toe</h2>
<div class="board">
  <div>❌</div>
  <div>⭕</div>
  <div></div>
  <div></div>
  <div>❌</div>
  <div></div>
  <div>⭕</div>
  <div></div>
  <div>❌</div>
</div>

<h2>My trips</h2>
<div class="gallery">
  <div class="photo featured">🏖️</div>
  <div class="photo">🏔️</div>
  <div class="photo">🌋</div>
  <div class="photo">🏜️</div>
</div>
`,
        css: `.board {
  width: 230px;
  background-color: #333;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

.board div {
  height: 70px;
  background-color: white;
  font-size: 40px;
  text-align: center;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.photo {
  height: 80px;
  background-color: skyblue;
  border-radius: 8px;
  font-size: 40px;
  text-align: center;
}

.featured {
  grid-column: span 2;
}
`
      }
    }
  ]
});
