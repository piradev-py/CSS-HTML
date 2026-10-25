/* ============================================================
   <CSS-HTML> · CSS World · Lesson css-03
   Colors — color and background-color with names, hexadecimal
   #rrggbb and rgb(); transparency with rgb(… / 0.5) and opacity.
   ============================================================ */
CURSO.registrar({
  id: "css-03",
  titulo: "Colors",
  xp: 30,
  objetivo: "You'll know how to write colors in various ways (name, hexadecimal, and rgb) and use them with transparency in text and backgrounds.",
  glosario: [
    { termino: "color", tema: "Colors", para: "The text color.", ejemplo: "a {\n  color: #1f7a6b;\n}", buscar: "color font text" },
    { termino: "background-color", tema: "Colors", para: "The background color of a box.", ejemplo: "footer {\n  background-color: #f7faf8;\n}", buscar: "background color" },
    { termino: "#rrggbb", tema: "Colors", para: "A color in hexadecimal: red, green, and blue, from `00` to `ff`.", ejemplo: "h1 {\n  color: #12332f;\n}", buscar: "hexadecimal color code" },
    { termino: "rgb()", tema: "Colors", para: "A color mixing red, green, and blue light (from 0 to 255); after `/`, the transparency.", ejemplo: ".box {\n  background-color: rgb(18 51 47 / 0.08);\n}", buscar: "rgb transparency alpha semitransparent" },
    { termino: "opacity", tema: "Colors", para: "Makes an entire element transparent, along with everything inside it (from 0 to 1).", ejemplo: ".note {\n  opacity: 0.8;\n}", buscar: "transparent opacity" },
    { termino: "contrast", tema: "Colors", para: "Text and background clearly distinct so everyone can read it (minimum 4.5 to 1, AA level).", ejemplo: "body {\n  color: #2b3b39;\n  background-color: white;\n}", buscar: "contrast accessibility readable aa" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Hexadecimal colors",
      texto: "You already know `color` (the text) and `background-color` (the background), and named colors, like `tomato`. But 140 names fall short... the screen can display millions of colors!\n\nThe most common way is **hexadecimal**: a `#` and six characters, in three pairs: **red**, **green**, and **blue** (`#RRGGBB`).\n\nEach pair goes from `00` (none of that color) to `ff` (maximum). You count from 0 to 9 and then from `a` to `f`.\n\n• `#ff0000` → full red, nothing else: **red**.\n• `#000000` → nothing at all: **black**.\n• `#ffffff` → everything at maximum: **white**.",
      ejemplo: {
        html: `<p class="tomato">Tomato: #ff6347</p>
<p class="mint">Mint: #98ff98</p>
<p class="grape">Grape: #b39ddb</p>`,
        css: `.tomato {
  background-color: #ff6347;
}
.mint {
  background-color: #98ff98;
}
.grape {
  background-color: #b39ddb;
}`
      },
      consejo: "Nobody memorizes these codes 😅. Designers copy them from a color picker (you'll play with one in a moment) and paste them into CSS."
    },
    {
      tipo: "explicacion",
      titulo: "rgb(): mixing lights",
      texto: "Another way to write the same thing is `rgb(red green blue)`, with three numbers from **0** to **255** separated by spaces.\n\nImagine three colored flashlights pointing at the same wall 🔦: the higher the number, the brighter that flashlight shines.\n\n• `rgb(255 0 0)` → only red: **red**.\n• `rgb(255 255 0)` → red + green: **yellow**! With light, mixing works like that.\n• `rgb(0 0 0)` → all turned off: **black**.\n\nHexadecimal and rgb are the same color written in two ways: `ff` is worth the same as `255`.",
      ejemplo: {
        html: `<p class="lemon">Lemon: rgb(255 230 0)</p>
<p class="sky">Sky: rgb(135 206 235)</p>`,
        css: `.lemon {
  background-color: rgb(255 230 0);
}
.sky {
  background-color: rgb(135 206 235);
}`
      },
      consejo: "In other people's code you'll see numbers separated by commas: `rgb(255, 230, 0)`. That also works and means the exact same thing."
    },
    {
      tipo: "explicacion",
      titulo: "Transparency: the slash and opacity",
      texto: "There are two ways to make something semi-transparent, like colored glass:\n\n• Inside `rgb()`, add a **slash** `/` and a number from **0** (invisible) to **1** (opaque): `rgb(255 0 0 / 0.5)` is red at 50%. Only that **color** becomes transparent.\n• The `opacity` property makes the **entire element** transparent: background, text... everything!\n\nIn the example, both boxes are red at 50% on a gold background. Look at the text: in the first one it's perfectly readable; in the second one, it looks faded. 👻",
      ejemplo: {
        html: `<div class="background">
  <p class="half">Background at 50%</p>
  <p class="ghost">Everything at 50%</p>
</div>`,
        css: `.background {
  background-color: gold;
}
.half {
  background-color: rgb(255 0 0 / 0.5);
}
.ghost {
  background-color: red;
  opacity: 0.5;
}`
      },
      consejo: "`opacity: 0` makes an element invisible... but it's still there taking up space! It's like a ghost sitting on a chair."
    },
    {
      tipo: "explicacion",
      titulo: "Contrast: making it readable",
      texto: "A gorgeous color is useless if the text **can't be read**. **Contrast** measures how well text stands out from its background, with a number: from 1 (identical, invisible) to 21 (black on white).\n\nThe rule professional websites use (called **AA**):\n\n• Normal text: contrast of **4.5** or higher.\n• Large text (headings): **3** or higher.\n\nIn the example, light gray on white doesn't even reach 2: many people wouldn't be able to read it. Dark gray is over 10. 👓\n\nTo measure it, open the **browser developer tools** (F12 key), select some text and check its color: the browser tells you the contrast and whether it meets AA.",
      ejemplo: {
        html: `<p class="weak">Light gray: barely readable.</p>
<p class="good">Dark gray: perfectly readable.</p>`,
        css: `.weak {
  color: #cccccc;
}
.good {
  color: #444444;
}`
      },
      consejo: "And a golden rule: color should **never** be the only clue. If a field with an error turns red, also add a message: some people can't tell red from green."
    },
    {
      tipo: "ejercicio",
      enunciado: "The HTML is already written. Write in the **CSS** tab:\n\n1. On `body`, a `background-color` of `#fff3e0` (in hexadecimal).\n2. On `h1`, a `color` of `rgb(214 51 132)`.\n\nAn ice cream shop with lots of style! 🍨",
      inicial: {
        html: `<h1>North Pole Ice Cream</h1>
<p>Handmade ice cream since 1987.</p>
`,
        css: ""
      },
      pistas: [
        "You need two rules: one for body with background-color and another for h1 with color. Copy the values as they are, with the # and with parentheses.",
        "It should look like this:\nbody {\n  background-color: #fff3e0;\n}\nh1 {\n  color: rgb(214 51 132);\n}"
      ],
      solucion: {
        html: `<h1>North Pole Ice Cream</h1>
<p>Handmade ice cream since 1987.</p>
`,
        css: `body {
  background-color: #fff3e0;
}
h1 {
  color: rgb(214 51 132);
}
`
      }
    },
    {
      tipo: "controles",
      instruccion: "Play with the color pickers on the card 🎨 and see how the hexadecimal codes change in CSS. Then, lower the `opacity` and notice how the **entire** card (background and text) becomes transparent.",
      html: `<div class="card">
  <h2>Pistachio ice cream</h2>
  <p>Creamy, green, and very serious.</p>
</div>`,
      controles: [
        { selector: ".card", propiedad: "background-color", tipo: "color", valor: "#c5e1a5" },
        { selector: "h2", propiedad: "color", tipo: "color", valor: "#2e7d32" },
        { selector: ".card", propiedad: "opacity", tipo: "rango", min: 0, max: 1, paso: 0.1, valor: 1 }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "You want a card's background to be semi-transparent, but its text to remain perfectly readable. What do you write?",
      opciones: [
        "opacity: 0.5;",
        "background-color: rgb(255 255 255 / 0.5);",
        "color: transparent;"
      ],
      correcta: 1,
      explicacion: "With the slash inside rgb(), only the background color becomes transparent. opacity would affect the entire card, including text, and color: transparent would make the text invisible."
    },
    {
      tipo: "reto",
      enunciado: "Style the ice cream shop menu 🍦. The HTML is already done. In the **CSS** tab:\n\n1. Add a background color to the menu (`.menu`). Try hexadecimal, for example `#fde2e4`.\n2. Add a text color (other than black) to the `h1` heading. Try with `rgb()`.\n3. Pistachio is sold out: make the `.sold-out` flavor look **semi-transparent**, for example with `opacity: 0.4`.",
      pestana: "css",
      inicial: {
        html: `<div class="menu">
  <h1>North Pole Ice Cream</h1>
  <ul>
    <li>Strawberry</li>
    <li>Chocolate</li>
    <li class="sold-out">Pistachio (sold out!)</li>
  </ul>
</div>
`,
        css: `/* 1. A background color for .menu */

/* 2. A text color for the h1 */

/* 3. Make the .sold-out flavor semi-transparent */
`
      },
      comprobaciones: [
        {
          texto: "The menu (.menu) has a background color",
          prueba: (doc, win) => {
            const menu = doc.querySelector(".menu");
            return !!menu && win.getComputedStyle(menu).backgroundColor !== "rgba(0, 0, 0, 0)";
          }
        },
        {
          texto: "The <h1> heading has a text color that isn't black",
          prueba: (doc, win) => {
            const h1 = doc.querySelector("h1");
            return !!h1 && win.getComputedStyle(h1).color !== "rgb(0, 0, 0)";
          }
        },
        {
          texto: "The sold-out flavor (.sold-out) is semi-transparent, but not invisible",
          prueba: (doc, win) => {
            const li = doc.querySelector(".sold-out");
            if (!li) return false;
            const estilo = win.getComputedStyle(li);
            const opacidad = parseFloat(estilo.opacity);
            const alfa = (estilo.color.match(/^rgba\(.*,\s*([\d.]+)\)$/) || [])[1];
            return (opacidad > 0 && opacidad < 1) || (alfa !== undefined && parseFloat(alfa) > 0 && parseFloat(alfa) < 1);
          }
        }
      ],
      pistas: [
        "You need three rules: .menu with background-color, h1 with color, and .sold-out with opacity (a number between 0 and 1).",
        "It should look something like this:\n.menu {\n  background-color: #fde2e4;\n}\nh1 {\n  color: rgb(200 30 90);\n}\n.sold-out {\n  opacity: 0.4;\n}"
      ],
      solucion: {
        html: `<div class="menu">
  <h1>North Pole Ice Cream</h1>
  <ul>
    <li>Strawberry</li>
    <li>Chocolate</li>
    <li class="sold-out">Pistachio (sold out!)</li>
  </ul>
</div>
`,
        css: `.menu {
  background-color: #fde2e4;
}
h1 {
  color: rgb(200 30 90);
}
.sold-out {
  opacity: 0.4;
}
`
      }
    }
  ]
});
