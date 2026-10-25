/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-06 (inglés)
   Unidades de medida — px, %, em, rem, vw/vh y cuándo usar cada una.
   Nota: width/height se presentan aquí de pasada (se ven a fondo en
   css-07). El reto se evalúa en un iframe de 800×600, así que nunca
   compara contra valores absolutos de vh/vw: compara proporciones
   (alto de la portada = win.innerHeight, ancho de la caja = 50 % del
   de la portada) y el tamaño en rem contra la letra de <html>.
   ============================================================ */
CURSO.registrar({
  id: "css-06",
  titulo: "Units of measurement",
  xp: 35,
  objetivo: "You'll know how to measure with px, %, em, rem, vw and vh, and choose the right unit for each thing.",
  glosario: [
    { termino: "px", tema: "Units", para: "Pixels: a fixed measurement.", ejemplo: ".appointment-card {\n  padding: 28px;\n}", buscar: "pixels fixed" },
    { termino: "%", tema: "Units", para: "A percentage of the parent.", ejemplo: "table {\n  width: 100%;\n}", buscar: "percentage width parent" },
    { termino: "rem", tema: "Units", para: "Times the page's text size (usually 16 px): ideal for text.", ejemplo: "h1 {\n  font-size: 3.1rem;\n}", buscar: "rem text root" },
    { termino: "em", tema: "Units", para: "Times the element's own text size.", ejemplo: ".kicker {\n  letter-spacing: 0.2em;\n}", buscar: "em text element" },
    { termino: "vw and vh", tema: "Units", para: "1% of the screen's width (`vw`) or height (`vh`).", ejemplo: ".hero {\n  height: 100vh;\n}", buscar: "screen height width window viewport" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "px and %: fixed and relative measurements",
      texto: "A **unit** is what's stuck to the number and says what it's measured in, like meters or pounds.\n\nTo try them out we'll use two new properties: `width` and `height`. You'll see them in depth in the next lesson.\n\n• `px` (pixels, the tiny dots on the screen) is a **fixed** measurement: 150px is 150px anywhere.\n• `%` is **relative** to the box that contains it, its **parent**: `width: 50%` is half the parent's width. If the parent grows, the box grows with it. 📏",
      ejemplo: {
        html: `<div class="fixed">I'm 150px</div>
<div class="half">I'm 50%</div>`,
        css: `.fixed {
  width: 150px;
  background-color: orange;
}
.half {
  width: 50%;
  background-color: lightgreen;
}`
      },
      consejo: "Imagine the window gets narrower: the `150px` box doesn't change, but the `50%` one always takes up half. That's why `%` is ideal for designs that adapt!"
    },
    {
      tipo: "explicacion",
      titulo: "em and rem: measurements based on text size",
      texto: "These two units are measured in **text sizes**:\n\n• `rem` uses the text size of **the whole page** (the one on the `<html>` tag) as its reference, which is usually **16px**. So `2rem` = 32px, wherever the element is.\n• `em`, in font sizes, uses the text size of **its parent** as its reference. If the parent is 20px, `1.5em` = 30px.\n\nLook at the example: both paragraphs say 1.5, but the `em` one comes out bigger because its parent box has 20px text. 🔍",
      ejemplo: {
        html: `<div class="box">
  <p class="with-rem">1.5rem = 24px</p>
  <p class="with-em">1.5em = 30px</p>
</div>`,
        css: `.box {
  font-size: 20px;
}
.with-rem {
  font-size: 1.5rem;
}
.with-em {
  font-size: 1.5em;
}`
      },
      consejo: "In CSS, decimals are written with a **dot**, never a comma: `1.5rem`, not `1,5rem`. And if you're not sure which of the two to use, go with `rem`: it doesn't depend on where the element is, so there are no surprises."
    },
    {
      tipo: "explicacion",
      titulo: "vw and vh: screen measurements",
      texto: "The **viewport** is the part of the browser where the page is shown.\n\n• `1vw` is 1% of the viewport's **width**.\n• `1vh` is 1% of the viewport's **height**.\n\nSo `height: 100vh` makes something take up **the whole height of the screen**: perfect for hero sections.\n\nQuick cheat sheet:\n• Text → `rem`.\n• Widths that adapt → `%`.\n• Full-screen hero sections → `vh` and `vw`.\n• Fine details (borders, shadows) → `px`.",
      ejemplo: {
        html: `<div class="stripe">50vw wide and 30vh tall</div>`,
        css: `.stripe {
  width: 50vw;
  height: 30vh;
  background-color: hotpink;
}`
      },
      consejo: "Here, the “viewport” is the result box itself. If you resize the browser, you'll see the pink stripe adapt. 📐"
    },
    {
      tipo: "ejercicio",
      enunciado: "This is a pizzeria's sign 🍕. The HTML is done; you write the CSS:\n\n• For the `h1`, a `font-size` of `3rem`.\n• For the `.notice` class, a `width` of `50%` and a `background-color` of `gold`.",
      inicial: {
        html: `<h1>Mamma Mia Pizzeria</h1>
<p class="notice">Today, the second pizza is free!</p>
`,
        css: ""
      },
      solucion: {
        html: `<h1>Mamma Mia Pizzeria</h1>
<p class="notice">Today, the second pizza is free!</p>
`,
        css: `h1 {
  font-size: 3rem;
}
.notice {
  width: 50%;
  background-color: gold;
}
`
      },
      pistas: [
        "There are two rules: one with the h1 selector and another with .notice (with a dot, because it's a class). The number is stuck to the unit, with no space: 3rem, 50%.",
        "It should look like this:\nh1 {\n  font-size: 3rem;\n}\n.notice {\n  width: 50%;\n  background-color: gold;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "Move the sliders: the width is in `%` of the result box, the height in `vh` (percentage of the viewport's height) and the text in `rem`. Watch the CSS write itself!",
      html: `<div class="box">Hi! I measure in units 📏</div>`,
      cssBase: "body { font-family: sans-serif; margin: 0; }\n.box { background-color: #8ecae6; color: #023047; }",
      controles: [
        { selector: ".box", propiedad: "width", tipo: "rango", min: 10, max: 100, valor: 50, unidad: "%" },
        { selector: ".box", propiedad: "height", tipo: "rango", min: 10, max: 100, valor: 30, unidad: "vh" },
        { selector: ".box", propiedad: "font-size", tipo: "rango", min: 0.5, max: 3, paso: 0.25, valor: 1, unidad: "rem" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "If the page's text size is 16px (the usual), how much is 2rem?",
      opciones: ["2px", "18px", "32px"],
      correcta: 2,
      explicacion: "1rem is the page's text size (16px), so 2rem is double that: 16 × 2 = 32px."
    },
    {
      tipo: "reto",
      enunciado: "Build the title screen for the video game **Cat Galaxy** 🐱🚀:\n\n1. Make `.hero` take up **the whole height of the screen** with `height: 100vh`.\n2. Give `.title` a `font-size` of `3rem`.\n3. Make `.box` **half** the width of the hero with `width: 50%`.",
      pestana: "css",
      inicial: {
        html: `<section class="hero">
  <h1 class="title">Cat Galaxy</h1>
  <div class="box">Press to start the adventure!</div>
</section>
`,
        css: `.hero {
  background-color: midnightblue;
  color: white;
  /* 1. Make it take up the whole height of the screen (vh) */
}

.title {
  /* 2. Text size of 3rem */
}

.box {
  background-color: hotpink;
  /* 3. Half the width of the hero (%) */
}
`
      },
      comprobaciones: [
        {
          texto: "The hero is as tall as the screen (100vh)",
          prueba: (doc, win) => {
            const height = doc.querySelector(".hero")?.getBoundingClientRect().height || 0;
            return win.innerHeight > 0 && Math.abs(height - win.innerHeight) <= 2;
          }
        },
        {
          texto: "The title is 3rem (three times the page's normal text size)",
          prueba: (doc, win) => {
            const t = doc.querySelector(".title");
            if (!t) return false;
            const base = parseFloat(win.getComputedStyle(doc.documentElement).fontSize) || 16;
            const size = parseFloat(win.getComputedStyle(t).fontSize) || 0;
            return Math.abs(size - 3 * base) <= 0.5;
          }
        },
        {
          texto: "The pink box is half as wide as the hero",
          prueba: (doc) => {
            const hero = doc.querySelector(".hero")?.getBoundingClientRect().width || 0;
            const box = doc.querySelector(".box")?.getBoundingClientRect().width || 0;
            return hero > 0 && Math.abs(box / hero - 0.5) <= 0.02;
          }
        }
      ],
      pistas: [
        "Each thing goes in its own rule: the height in .hero, the font-size in .title and the width in .box. Remember: vh for the screen, rem for text and % for “part of the parent”.",
        "Add these lines, each one in its rule:\n.hero → height: 100vh;\n.title → font-size: 3rem;\n.box → width: 50%;"
      ],
      solucion: {
        html: `<section class="hero">
  <h1 class="title">Cat Galaxy</h1>
  <div class="box">Press to start the adventure!</div>
</section>
`,
        css: `.hero {
  background-color: midnightblue;
  color: white;
  height: 100vh;
}

.title {
  font-size: 3rem;
}

.box {
  background-color: hotpink;
  width: 50%;
}
`
      }
    }
  ]
});
