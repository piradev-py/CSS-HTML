/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-02 (inglés)
   Pseudo-clases — :hover, :active, :focus (estados) y
   :first-child, :last-child, :nth-child() (posición).
   Nota: el reto comprueba el :hover con PRUEBA.clonar(doc,
   { estado: "hover" }) en una fila PAR, para que suspenda si
   li:hover está antes de li:nth-child(even) y pierde la cascada
   (las dos pesan lo mismo). El enunciado y una pista lo avisan.
   ============================================================ */
CURSO.registrar({
  id: "hc-02",
  titulo: "Pseudo-classes",
  xp: 45,
  objetivo: "You'll know how to change an element's style when you hover over it, press it or it has focus, and according to its place in a list.",
  glosario: [
    { termino: ":hover", tema: "Pseudo-classes", para: "The style when the mouse is over it.", ejemplo: ".button:hover {\n  background-color: #155e53;\n}", buscar: "mouse over hover" },
    { termino: ":active", tema: "Pseudo-classes", para: "The style while it's being pressed.", ejemplo: ".button:active {\n  transform: scale(0.97);\n}", buscar: "press click" },
    { termino: ":focus", tema: "Pseudo-classes", para: "The style of the element that has focus (the keyboard is on it).", ejemplo: "input:focus {\n  border-color: #1f7a6b;\n}", buscar: "focus keyboard tab" },
    { termino: ":first-child and :last-child", tema: "Pseudo-classes", para: "The first and the last child of their parent.", ejemplo: "li:last-child {\n  border-bottom: none;\n}", buscar: "first last child" },
    { termino: ":nth-child()", tema: "Pseudo-classes", para: "By its place: `even`, `odd` or a number.", ejemplo: "tr:nth-child(even) {\n  background-color: #f7faf8;\n}", buscar: "even odd alternate rows place" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Styles with a state: :hover and :active",
      texto: "A **pseudo-class** is a word you stick to the selector with a **colon** and it means “only when…”. It's like saying “the button **when** the mouse is over it”.\n\n• `:hover` → while the mouse is **over** the element.\n• `:active` → while you're **pressing** it (the moment of the click).\n\nYou don't have to touch the HTML: the browser knows by itself when each thing happens. Move the mouse over the button in the result and click without letting go. 🖱️",
      ejemplo: {
        html: `<button class="button">Press me!</button>`,
        css: `.button {
  background-color: royalblue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
}
.button:hover {
  background-color: tomato;
}
.button:active {
  background-color: darkred;
}`
      },
      consejo: "Careful: in `.button:hover` there's no space before the colon. With a space (`.button :hover`) it would mean something else and wouldn't work the way you expect."
    },
    {
      tipo: "explicacion",
      titulo: "Focus: :focus",
      texto: "**Focus** marks which element on the page is “listening” to the keyboard ⌨️. A text field gets it when you click on it to type, and so do links and buttons when you jump from one to the next with the **Tab** key.\n\n`:focus` styles the element that has focus. It's very important for **accessibility**: some people browse using only the keyboard and need to see where they are at all times.\n\nClick the field in the result and then press **Tab** to jump to the button.",
      ejemplo: {
        html: `<input type="text" placeholder="Your nickname">
<button>Save</button>`,
        css: `input,
button {
  font-size: 18px;
  padding: 6px 10px;
}
input:focus {
  background-color: lightyellow;
}
button:focus {
  background-color: gold;
}`
      },
      consejo: "In the navigation bar lesson you'll meet a cousin of `:focus` made for links: `:focus-visible`."
    },
    {
      tipo: "explicacion",
      titulo: "By their place: :first-child, :last-child and :nth-child()",
      texto: "Other pseudo-classes don't look at what you do, but at **the place** an element has among its **siblings** (the ones that share the same parent), like in the line at school:\n\n• `li:first-child` → the **first** one.\n• `li:last-child` → the **last** one.\n• `li:nth-child(3)` → the **third** one (use any number you want).\n• `li:nth-child(even)` → the **even** ones (2nd, 4th, 6th…) and `li:nth-child(odd)`, the **odd** ones.\n\nThat's how the alternating colored rows of tables and lists are made. 🦓",
      ejemplo: {
        html: `<ol>
  <li>Pizza</li>
  <li>Tacos</li>
  <li>Sushi</li>
  <li>Paella</li>
  <li>Burgers</li>
</ol>`,
        css: `li:first-child {
  font-weight: bold;
}
li:nth-child(even) {
  background-color: lavender;
}
li:last-child {
  color: crimson;
}`
      },
      consejo: "A pseudo-class weighs the same as a class. If `li:hover` and `li:nth-child(even)` change the same property, the one **further down** wins (the cascade!)."
    },
    {
      tipo: "ejercicio",
      enunciado: "Make this video game button 🎮 react to the mouse. For the `.button:hover` selector, add:\n\n• `background-color` with the value `gold`\n• `color` with the value `black`\n\nThe HTML is already written: you only write the CSS. When you're done, move the mouse over the button.",
      cssBase: `body { font-family: sans-serif; }
.button { background-color: mediumpurple; color: white; border: none; padding: 12px 24px; border-radius: 10px; font-size: 18px; }`,
      inicial: {
        html: `<button class="button">Jump!</button>
`,
        css: ""
      },
      solucion: {
        html: `<button class="button">Jump!</button>
`,
        css: `.button:hover {
  background-color: gold;
  color: black;
}
`
      },
      pistas: [
        "It's a single rule. The selector is the class with the pseudo-class stuck to it, without spaces: .button:hover. The two properties go inside.",
        "It should look like this:\n.button:hover {\n  background-color: gold;\n  color: black;\n}"
      ]
    },
    {
      tipo: "ejercicio",
      enunciado: "Get the snail race 🐌 results ready:\n\n• For the `li:first-child` selector, add `color` with the value `goldenrod` (it's the winner!).\n• For the `li:nth-child(even)` selector, add `background-color` with the value `lavender`.\n\nThe HTML is already written: you only write the CSS.",
      cssBase: `body { font-family: sans-serif; }
.race li { padding: 6px 10px; font-size: 18px; }`,
      inicial: {
        html: `<ol class="race">
  <li>Turbo</li>
  <li>Slimy</li>
  <li>Slow Lightning</li>
  <li>Speedy Shell</li>
</ol>
`,
        css: ""
      },
      solucion: {
        html: `<ol class="race">
  <li>Turbo</li>
  <li>Slimy</li>
  <li>Slow Lightning</li>
  <li>Speedy Shell</li>
</ol>
`,
        css: `li:first-child {
  color: goldenrod;
}
li:nth-child(even) {
  background-color: lavender;
}
`
      },
      pistas: [
        "You need two rules. Copy the selectors exactly as in the instructions: li:first-child for the first one and li:nth-child(even) for the even ones.",
        "It should look like this:\nli:first-child {\n  color: goldenrod;\n}\nli:nth-child(even) {\n  background-color: lavender;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "Pick the color of the even rows and of the row the mouse is over. Then move the mouse over the list. Since `li:hover` goes **below**, it also wins on the even rows.",
      html: `<ul class="list">
  <li>🎸 Garage rock</li>
  <li>🎹 Piano in the rain</li>
  <li>🥁 Desert drums</li>
  <li>🎺 Midnight trumpet</li>
  <li>🎻 Lighthouse violin</li>
</ul>`,
      cssBase: `body { font-family: sans-serif; }
.list { list-style: none; padding: 0; max-width: 320px; border: 2px solid #ddd; border-radius: 10px; overflow: hidden; }
.list li { padding: 10px 14px; }`,
      controles: [
        { selector: "li:nth-child(even)", propiedad: "background-color", tipo: "color", valor: "#e6e6fa" },
        { selector: "li:hover", propiedad: "background-color", tipo: "color", valor: "#ffd166" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "In a list of 6 items, which rows does li:nth-child(even) color?",
      opciones: [
        "The 2nd, the 4th and the 6th (the even ones)",
        "The 1st, the 3rd and the 5th (the odd ones)",
        "Only the last one"
      ],
      correcta: 0,
      explicacion: "even picks places 2, 4, 6… For the odd ones you use odd, and for the last one, :last-child."
    },
    {
      tipo: "reto",
      enunciado: "Style your dance playlist 🎧. The HTML is already done; in the **CSS** tab:\n\n1. Give the **even** rows a different background color with `:nth-child`.\n2. Make **any row** (the even ones too) change its background when you **hover** over it. Write this rule **below** the previous one.\n3. Remove the bottom border from the **last** song, which doesn't need it.",
      pestana: "css",
      cssBase: `body { font-family: sans-serif; background-color: #f4f1ff; }
h1 { font-size: 24px; color: #4a3f8c; }
.songs { list-style: none; padding: 0; max-width: 380px; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgb(0 0 0 / 0.1); }`,
      inicial: {
        html: `<h1>🎧 My dance playlist</h1>
<ul class="songs">
  <li>The robot dance</li>
  <li>Salsa with fries</li>
  <li>Disco on the moon</li>
  <li>Dinosaur cumbia</li>
  <li>Reggae for cats</li>
  <li>Midnight pop</li>
</ul>
`,
        css: `.songs li {
  padding: 10px 14px;
  border-bottom: 1px solid #ddd;
}

/* 1. Even rows with a different background */

/* 2. Row with the mouse over it (write it BELOW number 1) */

/* 3. The last row, without a bottom border */
`
      },
      comprobaciones: [
        {
          texto: "The even rows have a different background from the odd ones",
          prueba: (doc, win) => {
            const lis = doc.querySelectorAll(".songs li");
            if (lis.length < 4) return false;
            const bg = el => win.getComputedStyle(el).backgroundColor;
            return bg(lis[1]) !== bg(lis[0]) && bg(lis[2]) === bg(lis[0]) && bg(lis[3]) === bg(lis[1]);
          }
        },
        {
          texto: "When you hover, any row changes its background (the even ones too)",
          prueba: async (doc, win) => {
            const lis = doc.querySelectorAll(".songs li");
            if (lis.length < 2) return false;
            const v = await PRUEBA.clonar(doc, { estado: "hover" });
            const copies = v.doc.querySelectorAll(".songs li");
            if (copies.length < 2) return false;
            return [0, 1].every(i =>
              v.win.getComputedStyle(copies[i]).backgroundColor !== win.getComputedStyle(lis[i]).backgroundColor);
          }
        },
        {
          texto: "The last song has no bottom border, but the others do",
          prueba: (doc, win) => {
            const lis = doc.querySelectorAll(".songs li");
            if (lis.length < 2) return false;
            const last = win.getComputedStyle(lis[lis.length - 1]);
            const first = win.getComputedStyle(lis[0]);
            return parseFloat(last.borderBottomWidth) === 0 && parseFloat(first.borderBottomWidth) > 0;
          }
        }
      ],
      pistas: [
        "Use .songs li:nth-child(even) for the even ones, .songs li:hover for the mouse and .songs li:last-child for the last one. If the even rows don't change with the mouse, the :hover rule is above the :nth-child one: move it below!",
        "Write, in this order:\n.songs li:nth-child(even) {\n  background-color: #f1ecff;\n}\n.songs li:hover {\n  background-color: gold;\n}\n.songs li:last-child {\n  border-bottom: none;\n}"
      ],
      solucion: {
        html: `<h1>🎧 My dance playlist</h1>
<ul class="songs">
  <li>The robot dance</li>
  <li>Salsa with fries</li>
  <li>Disco on the moon</li>
  <li>Dinosaur cumbia</li>
  <li>Reggae for cats</li>
  <li>Midnight pop</li>
</ul>
`,
        css: `.songs li {
  padding: 10px 14px;
  border-bottom: 1px solid #ddd;
}

.songs li:nth-child(even) {
  background-color: #f1ecff;
}

.songs li:hover {
  background-color: gold;
}

.songs li:last-child {
  border-bottom: none;
}
`
      }
    }
  ]
});
