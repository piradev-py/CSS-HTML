/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-11
   Flexbox (I): en fila y alineados — contenedor y elementos flex,
   display: flex, flex-direction, justify-content, align-items, gap
   y centrar algo en los dos ejes.
   Nota: el ejercicio no da estilos de colores (el CSS empieza vacío),
   así que usa emojis para que el efecto se vea sin decorar nada.
   ============================================================ */
CURSO.registrar({
  id: "css-11",
  titulo: "Flexbox (I): in a row and aligned",
  xp: 45,
  objetivo: "You'll learn to put elements in a row or a column with Flexbox and align them wherever you want, even in the exact center.",
  glosario: [
    { termino: "display: flex", tema: "Flexbox", para: "The container puts its children in a row.", ejemplo: "nav ul {\n  display: flex;\n}", buscar: "flex row container" },
    { termino: "flex-direction", tema: "Flexbox", para: "`row` in a row (the normal one) or `column` in a column.", ejemplo: ".menu {\n  display: flex;\n  flex-direction: column;\n}", buscar: "row column direction" },
    { termino: "gap", tema: "Flexbox", para: "The gap between the children (also in Grid).", ejemplo: "nav ul {\n  display: flex;\n  gap: 28px;\n}", buscar: "gap separate space between" },
    { termino: "justify-content", tema: "Flexbox", para: "Distributes along the direction of the row: `center`, `space-between`…", ejemplo: "header {\n  display: flex;\n  justify-content: space-between;\n}", buscar: "distribute ends center horizontal" },
    { termino: "align-items", tema: "Flexbox", para: "Aligns along the other direction: `center` centers vertically.", ejemplo: "header {\n  display: flex;\n  align-items: center;\n}", buscar: "align vertical center" },
    { termino: "centering with flex", tema: "Flexbox", para: "`justify-content` and `align-items` set to `center`: the exact center.", ejemplo: ".box {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}", buscar: "center middle exact" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "The container is in charge: display: flex",
      texto: "Until now, `<div>`s have been stacking one below another. **Flexbox** is a way of arranging boxes that changes everything.\n\nIt works like this: you pick a **parent** box (the **container**) and give it `display: flex`. Instantly, its **direct children** (the **flex items**) line up in a **row**, one next to the other.\n\nThink of a sergeant 🪖 and their soldiers: the sergeant shouts “line up!” and the soldiers obey. You only talk to the sergeant.",
      ejemplo: {
        html: `<div class="row">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
</div>`,
        css: `.row {
  display: flex;
  background-color: lavender;
}
.box {
  background-color: tomato;
  color: white;
  padding: 10px 20px;
}`
      },
      consejo: "Mistake number one: giving `display: flex` to the child boxes. No! It goes on the **parent**, the one holding all of them."
    },
    {
      tipo: "explicacion",
      titulo: "Row or column? flex-direction and gap",
      texto: "A flex container has a **main direction**, which you choose with `flex-direction`:\n\n• `row`: left to right. It's the **default**.\n• `column`: top to bottom.\n\nAnd to separate the elements without fighting with margins there's `gap`: `gap: 20px` leaves **20 px between each element**, but not at the outside edges.\n\nIn the example, the boxes no longer touch each other. You'll try the column stuff right away with the controls. 🎛️",
      ejemplo: {
        html: `<div class="row">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
</div>`,
        css: `.row {
  display: flex;
  flex-direction: row;
  gap: 20px;
  background-color: lavender;
}
.box {
  background-color: tomato;
  color: white;
  padding: 10px 20px;
}`
      },
      consejo: "`gap` is much more comfortable than putting margins on each box: a single value on the parent and all of them end up equally spaced."
    },
    {
      tipo: "explicacion",
      titulo: "Aligning: justify-content and align-items",
      texto: "Flexbox thinks in **two axes**, like two arrows:\n\n• `justify-content` places the elements along the **main direction** (in a row, horizontally): `flex-start` (at the start), `center`, `flex-end` (at the end), `space-between` (spread out, glued to the edges) and `space-around` (spread out, with breathing room at the edges).\n• `align-items` places them on the **other axis** (in a row, vertically): `flex-start`, `center`, `flex-end` or `stretch` (stretched, the default value).\n\nWith both set to `center`, something ends up **centered in the exact middle** 🎯. Before Flexbox, this was a nightmare!",
      ejemplo: {
        html: `<div class="stage">
  <div class="box">🎯</div>
</div>`,
        css: `.stage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;
  background-color: lavender;
}
.box {
  background-color: tomato;
  padding: 10px 20px;
}`
      },
      consejo: "A trick so you don't get mixed up: **justify** follows the main direction and **align** goes across it. If you switch to `column`, the roles swap!"
    },
    {
      tipo: "ejercicio",
      enunciado: "These three pets come out one below another. Put them in a row and centered! 🐾\n\nGive the `.pets` selector:\n\n• `display` with the value `flex`\n• `justify-content` with the value `center`\n• `gap` with the value `20px`\n\nThe HTML is already written: you only write the CSS.",
      cssBase: `body { font-family: sans-serif; }
.pets { background-color: lavender; padding: 10px; border-radius: 10px; }
.pets div { background-color: tomato; color: white; padding: 8px 14px; border-radius: 8px; font-weight: bold; }`,
      inicial: {
        html: `<div class="pets">
  <div>🐶 Toby</div>
  <div>🐱 Milo</div>
  <div>🐹 Peanut</div>
</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="pets">
  <div>🐶 Toby</div>
  <div>🐱 Milo</div>
  <div>🐹 Peanut</div>
</div>
`,
        css: `.pets {
  display: flex;
  justify-content: center;
  gap: 20px;
}
`
      },
      pistas: [
        "Write a single rule for the container: the .pets selector, some braces { } and inside them the three properties, each with its : and its ;",
        "It should end up like this:\n.pets {\n  display: flex;\n  justify-content: center;\n  gap: 20px;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "The lavender box already has `display: flex`. Press the buttons and move the slider to see how the boxes are arranged. Try `column` and notice that `justify-content` now rules vertically.",
      html: `<div class="row">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
</div>`,
      cssBase: `body { font-family: sans-serif; }
.row { display: flex; height: 180px; background-color: lavender; }
.box { background-color: tomato; color: white; padding: 8px 16px; font-weight: bold; }`,
      controles: [
        { selector: ".row", propiedad: "flex-direction", tipo: "opciones", opciones: ["row", "column"], valor: "row" },
        { selector: ".row", propiedad: "justify-content", tipo: "opciones", opciones: ["flex-start", "center", "flex-end", "space-between", "space-around"], valor: "flex-start" },
        { selector: ".row", propiedad: "align-items", tipo: "opciones", opciones: ["stretch", "flex-start", "center", "flex-end"], valor: "stretch" },
        { selector: ".row", propiedad: "gap", tipo: "rango", min: 0, max: 40, valor: 0, unidad: "px" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "You want to center a button right in the middle (horizontally and vertically) of a box with display: flex in a row. What do you write on the box?",
      opciones: [
        "justify-content: center; and align-items: center;",
        "Only align-items: center;",
        "display: center;"
      ],
      correcta: 0,
      explicacion: "justify-content centers along the main direction (horizontal in a row) and align-items on the other axis (vertical). You need both. And display: center doesn't exist."
    },
    {
      tipo: "reto",
      enunciado: "Design the button bar of your music player 🎵:\n\n1. Turn `.player` into a flex container.\n2. Spread the buttons **across the width** of the bar with `justify-content` (`space-between` or `space-around`).\n3. Center them **vertically** with `align-items`.",
      inicial: {
        html: `<div class="player">
  <button>🔀</button>
  <button>⏮️</button>
  <button>▶️</button>
  <button>⏭️</button>
  <button>🔁</button>
</div>
`,
        css: `.player {
  height: 80px;
  padding: 0 16px;
  background-color: #222;
  border-radius: 12px;
  /* 1. Turn it into a flex container */
  /* 2. Spread the buttons across the width */
  /* 3. Center them vertically */
}

button {
  font-size: 22px;
}
`
      },
      comprobaciones: [
        {
          texto: "The `.player` bar has display: flex",
          prueba: (doc, win) => {
            const r = doc.querySelector(".player");
            return !!r && win.getComputedStyle(r).display === "flex";
          }
        },
        {
          texto: "The buttons are spread across the width (space-between or space-around)",
          prueba: (doc, win) => {
            const r = doc.querySelector(".player");
            return !!r && ["space-between", "space-around", "space-evenly"].includes(win.getComputedStyle(r).justifyContent);
          }
        },
        {
          texto: "The buttons are centered vertically (align-items: center)",
          prueba: (doc, win) => {
            const r = doc.querySelector(".player");
            return !!r && win.getComputedStyle(r).alignItems === "center";
          }
        }
      ],
      pistas: [
        "The three properties go inside the .player rule, where the comments are: first display, then justify-content and then align-items.",
        "Add these three lines inside .player { … }:\n  display: flex;\n  justify-content: space-between;\n  align-items: center;"
      ],
      solucion: {
        html: `<div class="player">
  <button>🔀</button>
  <button>⏮️</button>
  <button>▶️</button>
  <button>⏭️</button>
  <button>🔁</button>
</div>
`,
        css: `.player {
  height: 80px;
  padding: 0 16px;
  background-color: #222;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  font-size: 22px;
}
`
      }
    }
  ]
});
