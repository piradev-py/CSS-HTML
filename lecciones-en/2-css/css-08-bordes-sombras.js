/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-08 (inglés)
   Bordes y sombras — border abreviado, border-radius (círculos con
   50%), box-shadow y text-shadow.
   Nota: el reto acepta border-radius en % (≥ 50%) o en px (≥ la mitad
   del ancho) para el círculo, y pide ≥ 5px en el botón para no
   confundirlo con el redondeo que algunos navegadores dan de serie.
   ============================================================ */
CURSO.registrar({
  id: "css-08",
  titulo: "Borders and shadows",
  xp: 35,
  objetivo: "You'll know how to decorate boxes with borders, rounded corners and shadows.",
  glosario: [
    { termino: "border", tema: "Borders and shadows", para: "The border in one line: thickness, style and color; `none` removes it.", ejemplo: "input {\n  border: 1px solid #cfdcd9;\n}", buscar: "border line remove" },
    { termino: "border-radius", tema: "Borders and shadows", para: "Rounds the corners.", ejemplo: ".service {\n  border-radius: 20px;\n}", buscar: "rounded corners" },
    { termino: "border-radius: 50%", tema: "Borders and shadows", para: "A square box becomes a circle.", ejemplo: ".review img {\n  border-radius: 50%;\n}", buscar: "circle round avatar" },
    { termino: "box-shadow", tema: "Borders and shadows", para: "The box's shadow: x, y, blur and color.", ejemplo: ".service {\n  box-shadow: 0 10px 30px rgb(18 51 47 / 0.08);\n}", buscar: "shadow box card" },
    { termino: "text-shadow", tema: "Borders and shadows", para: "A shadow for the letters.", ejemplo: "h1 {\n  text-shadow: 2px 2px 4px gray;\n}", buscar: "shadow text letters" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "border: three values in one",
      texto: "You already used `border` in the last lesson. It's a **shorthand** property: it puts three things together in a single line, in this order:\n\n• **thickness**: `3px`\n• **style**: `solid`, `dashed`, `dotted` or `double`\n• **color**: `tomato`\n\nIf you only want one side, use `border-top`, `border-right`, `border-bottom` or `border-left`. A `border-bottom` looks great as an elegant underline. ✏️",
      ejemplo: {
        html: `<p class="solid">Solid border</p>
<p class="dashed">Dashed border</p>
<p class="dotted">Dotted border</p>
<p class="underline">Only underneath</p>`,
        css: `.solid {
  border: 3px solid tomato;
}
.dashed {
  border: 3px dashed seagreen;
}
.dotted {
  border: 3px dotted royalblue;
}
.underline {
  border-bottom: 3px solid orange;
}`
      },
      consejo: "If you forget the style (`solid`, `dashed`…), the border doesn't show up! By default the style is `none`. It's the number one slip-up with borders."
    },
    {
      tipo: "explicacion",
      titulo: "border-radius: goodbye, corners",
      texto: "`border-radius` rounds the corners. The bigger the number, the more curve: `5px` is a soft touch and `20px`, a pill.\n\nAnd the star trick: on a **square** box (same `width` as `height`), `border-radius: 50%` turns it into a perfect **circle**. That's how the round avatars on social media are made. 🍩\n\nIt works even if the box has no border: what gets rounded is the background.",
      ejemplo: {
        html: `<div class="pill">Round corners</div>
<div class="circle">🍩</div>`,
        css: `.pill {
  width: 160px;
  padding: 10px;
  background-color: plum;
  border-radius: 20px;
}
.circle {
  width: 80px;
  height: 80px;
  margin-top: 10px;
  font-size: 50px;
  line-height: 80px;
  text-align: center;
  background-color: pink;
  border-radius: 50%;
}`
      },
      consejo: "If the box isn't square, `50%` will give you an oval, like an egg. 🥚"
    },
    {
      tipo: "explicacion",
      titulo: "Shadows: box-shadow and text-shadow",
      texto: "`box-shadow` gives the box a shadow and `text-shadow`, the letters. They're written the same way:\n\n`box-shadow: 0 8px 16px rgb(0 0 0 / 0.3);`\n\n• `0`: how far it moves to the **right**.\n• `8px`: how far it moves **down**.\n• `16px`: the **blur**, how fuzzy it is (0 = sharp edges).\n• The **color**: here, black at 30%, as you saw in the colors lesson.\n\nA soft shadow going down makes the box look like it's **floating**. ✨",
      ejemplo: {
        html: `<h1 class="neon">GAME OVER</h1>
<div class="card">Floating card</div>`,
        css: `.neon {
  color: gold;
  text-shadow: 3px 3px 0 purple;
}
.card {
  width: 160px;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 8px 16px rgb(0 0 0 / 0.3);
}`
      },
      consejo: "Shadows look best when they're **subtle** and transparent. A huge, opaque black shadow looks like an ink blot."
    },
    {
      tipo: "ejercicio",
      enunciado: "Give this collectible card a frame 🐉. For the `.card` class, add:\n\n• a `border` of `3px solid purple`,\n• and a `border-radius` of `15px`.",
      inicial: {
        html: `<div class="card">Legendary card: Gummy Dragon</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="card">Legendary card: Gummy Dragon</div>
`,
        css: `.card {
  border: 3px solid purple;
  border-radius: 15px;
}
`
      },
      pistas: [
        "A single rule with the .card selector. The border takes three values separated by spaces: thickness, style and color.",
        "It should look like this:\n.card {\n  border: 3px solid purple;\n  border-radius: 15px;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "Design your video game's button 🎮: round the corners, change the border style and try different shadows for the box and for the letters.",
      html: `<button class="play">Play!</button>`,
      cssBase: "body { font-family: sans-serif; padding: 30px; }\n.play { font-size: 28px; padding: 12px 32px; color: #3a0ca3; background-color: #ffbe0b; border: 4px solid #fb5607; }",
      controles: [
        { selector: ".play", propiedad: "border-radius", tipo: "rango", min: 0, max: 40, valor: 0, unidad: "px" },
        { selector: ".play", propiedad: "border-style", tipo: "opciones", opciones: ["solid", "dashed", "dotted", "double"], valor: "solid" },
        { selector: ".play", propiedad: "box-shadow", tipo: "opciones", opciones: ["none", "4px 4px 0 #3a0ca3", "0 8px 16px rgb(0 0 0 / 0.4)", "0 0 20px deeppink"], valor: "none" },
        { selector: ".play", propiedad: "text-shadow", tipo: "opciones", opciones: ["none", "2px 2px 0 white", "0 0 8px deeppink"], valor: "none" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "What turns a square box into a circle?",
      opciones: ["border-radius: 0", "border-radius: 50%", "border-radius: circle"],
      correcta: 1,
      explicacion: "With 50%, each corner curves up to half the box: if it's square, you get a circle. With 0 the corners stay pointy, and “circle” isn't a valid value."
    },
    {
      tipo: "reto",
      enunciado: "Get your video game's start screen ready 🐸:\n\n1. Make the `.avatar` **round**.\n2. Round the corners of the `.play` button (for example, `15px`).\n3. Give the button a shadow with `box-shadow`.",
      pestana: "css",
      inicial: {
        html: `<div class="avatar">🐸</div>
<p>Player: Ninja Frog</p>
<button class="play">Play!</button>
`,
        css: `.avatar {
  width: 80px;
  height: 80px;
  font-size: 50px;
  line-height: 80px;
  text-align: center;
  background-color: lightgreen;
  /* 1. Make it round */
}

.play {
  font-size: 24px;
  padding: 10px 30px;
  background-color: gold;
  border: 3px solid darkorange;
  /* 2. Rounded corners */
  /* 3. A shadow (box-shadow) */
}
`
      },
      comprobaciones: [
        {
          texto: "The avatar is a circle",
          prueba: (doc, win) => {
            const el = doc.querySelector(".avatar");
            if (!el) return false;
            const radius = win.getComputedStyle(el).borderTopLeftRadius || "";
            const n = parseFloat(radius) || 0;
            const width = el.getBoundingClientRect().width;
            return radius.includes("%") ? n >= 50 : width > 0 && n >= width / 2 - 0.5;
          }
        },
        {
          texto: "The button has rounded corners (5px or more)",
          prueba: (doc, win) => {
            const el = doc.querySelector(".play");
            if (!el) return false;
            return (parseFloat(win.getComputedStyle(el).borderTopLeftRadius) || 0) >= 5;
          }
        },
        {
          texto: "The button has a shadow (box-shadow)",
          prueba: (doc, win) => {
            const el = doc.querySelector(".play");
            if (!el) return false;
            const shadow = win.getComputedStyle(el).boxShadow || "none";
            return shadow !== "none";
          }
        }
      ],
      pistas: [
        "For the circle, the box has to be square (it already is: 80 × 80) and have border-radius: 50%. For the shadow, remember the order: right, down, blur and color.",
        "Add border-radius: 50%; inside .avatar, and inside .play:\nborder-radius: 15px;\nbox-shadow: 0 6px 12px rgb(0 0 0 / 0.3);"
      ],
      solucion: {
        html: `<div class="avatar">🐸</div>
<p>Player: Ninja Frog</p>
<button class="play">Play!</button>
`,
        css: `.avatar {
  width: 80px;
  height: 80px;
  font-size: 50px;
  line-height: 80px;
  text-align: center;
  background-color: lightgreen;
  border-radius: 50%;
}

.play {
  font-size: 24px;
  padding: 10px 30px;
  background-color: gold;
  border: 3px solid darkorange;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgb(0 0 0 / 0.3);
}
`
      }
    }
  ]
});
