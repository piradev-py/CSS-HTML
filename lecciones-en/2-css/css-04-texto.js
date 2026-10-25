/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-04 (inglés)
   Texto y fuentes — font-family (con fuentes de reserva),
   font-size, font-weight, font-style, text-decoration,
   text-transform, text-align y line-height.
   Nota: solo fuentes del sistema o genéricas (nada de internet).
   El reto mide el tamaño del título en vez de la negrita, porque
   los <h1> y <h2> ya salen en negrita por defecto.
   ============================================================ */
CURSO.registrar({
  id: "css-04",
  titulo: "Text and fonts",
  xp: 30,
  objetivo: "You'll know how to give your text personality by choosing the font, the size, the weight, the alignment and the space between lines.",
  glosario: [
    { termino: "font-family", tema: "Text", para: "The font, with a fallback one at the end in case it's missing.", ejemplo: "body {\n  font-family: \"Inter\", sans-serif;\n}", buscar: "font typeface typography" },
    { termino: "Web fonts (Google Fonts)", tema: "Text", para: "A `<link>` in the `<head>` downloads the font; then you use it with `font-family`.", ejemplo: "<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&display=swap\">", buscar: "google fonts download font link", lenguaje: "html" },
    { termino: "font-size", tema: "Text", para: "The size of the text.", ejemplo: "h2 {\n  font-size: 2rem;\n}", buscar: "text size big small" },
    { termino: "font-weight", tema: "Text", para: "The thickness: `400` normal, `700` bold (from 100 to 900).", ejemplo: "strong {\n  font-weight: 700;\n}", buscar: "bold weight thick" },
    { termino: "font-style", tema: "Text", para: "`italic` makes the text italic; `normal` takes it away.", ejemplo: "em {\n  font-style: normal;\n}", buscar: "italic slanted" },
    { termino: "text-decoration", tema: "Text", para: "Lines on the text: `underline`, `line-through` or `none` (to remove a link's underline).", ejemplo: "nav a {\n  text-decoration: none;\n}", buscar: "underline remove line link" },
    { termino: "text-transform", tema: "Text", para: "`uppercase` puts everything in CAPITALS.", ejemplo: ".kicker {\n  text-transform: uppercase;\n}", buscar: "uppercase lowercase capitals" },
    { termino: "letter-spacing", tema: "Text", para: "The space between letters; looks good on short text in capitals.", ejemplo: ".kicker {\n  letter-spacing: 0.2em;\n}", buscar: "space between letters spread" },
    { termino: "text-align", tema: "Text", para: "Aligns the text: `left`, `center`, `right`.", ejemplo: "th {\n  text-align: left;\n}", buscar: "align center text" },
    { termino: "line-height", tema: "Text", para: "The height of each line: `1.6` lets the text breathe.", ejemplo: "body {\n  line-height: 1.6;\n}", buscar: "line spacing space between lines" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "The font and its size",
      texto: "• `font-family` chooses the **font** (the typeface). You write a list: `Georgia, serif`. The browser tries the first one; if the computer doesn't have it, it uses the next. That's the **fallback font**!\n\nAlways put a generic family at the end: `serif` (letters with little “feet”), `sans-serif` (without feet), `monospace` (all letters equally wide, like a typewriter) or `cursive` (like handwriting).\n\n• `font-size` changes the **size** of the text. For now, in pixels: normal text is `16px`. ✍️",
      ejemplo: {
        html: `<h1>The Reading Dragon</h1>
<p>A bookshop with fire in its heart.</p>
<p class="code">Secret code: 1234</p>`,
        css: `h1 {
  font-family: Georgia, serif;
  font-size: 40px;
}
p {
  font-size: 18px;
}
.code {
  font-family: monospace;
}`
      },
      consejo: "If the font name has spaces, it goes in quotes: `font-family: \"Courier New\", monospace;`"
    },
    {
      tipo: "explicacion",
      titulo: "Web fonts",
      texto: "What if you want a font that your visitor's computer **doesn't have**? You can **load it from the internet**. The most common way is **Google Fonts**: a free library with hundreds of fonts.\n\nIt works in two steps:\n\n1. In the HTML `<head>`, a `<link>` that downloads it (Google Fonts gives you the line already written).\n2. In the CSS, you use it with `font-family` like any other… with its fallback font at the end!\n\nLook at the example: the `<link>` loads the **Pacifico** font and the heading uses it.",
      ejemplo: {
        html: `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap">
<h1>North Pole Ice Cream</h1>`,
        css: `h1 {
  font-family: "Pacifico", cursive;
}`
      },
      consejo: "Without internet, the font doesn't download and the browser uses the fallback. That's why `sans-serif` (or `serif`) is never missing at the end of the list."
    },
    {
      tipo: "explicacion",
      titulo: "Bold, italic and decorations",
      texto: "• `font-weight`: the **thickness**. `bold` is bold and `normal` is the usual one. It also takes numbers from 100 to 900: `400` is normal and `700` is bold.\n• `font-style: italic;` makes the text **italic**.\n• `text-decoration`: lines. `underline` underlines, `line-through` crosses out and `none` removes the line (from a link, for example).\n• `text-transform`: changes the **capitals**. `uppercase` puts everything in CAPITALS, `lowercase` in small letters and `capitalize` Puts A Capital On Each Word.\n• `letter-spacing`: the **space between letters**. `0.2em` spreads them out a little; it looks great on short text in capitals.",
      ejemplo: {
        html: `<p class="sale">Big sale</p>
<p class="before">Before: $20</p>
<p class="now">Now: $9</p>
<p class="note">Today only, or tomorrow, who knows</p>`,
        css: `.sale {
  text-transform: uppercase;
  letter-spacing: 0.2em;
}
.before {
  text-decoration: line-through;
}
.now {
  font-weight: bold;
}
.note {
  font-style: italic;
}`
      },
      consejo: "`<strong>` or `font-weight: bold`? If the word is **important**, use `<strong>`: that's HTML and it has meaning. If you just want it to **look** thicker, use CSS."
    },
    {
      tipo: "explicacion",
      titulo: "Align and let it breathe",
      texto: "• `text-align` **aligns** the text inside its box: `left`, `center`, `right` or `justify` (justified, like in newspapers).\n\n• `line-height` is the **height of each line**, that is, the air between lines. It's best written **without a unit**: `1.5` means “one and a half times the size of the text”.\n\nCramped text tires your eyes; with a `line-height` between `1.5` and `1.8` it reads beautifully. 😌",
      ejemplo: {
        html: `<h2>Ode to the lost sock</h2>
<p>You left one laundry Tuesday and left your partner alone in the drawer. We're still waiting for you.</p>`,
        css: `h2 {
  text-align: center;
}
p {
  text-align: center;
  line-height: 2;
}`
      },
      consejo: "CSS decimals use a **dot**, not a comma: `1.5`, never `1,5`. Remember that the comma is for separating things, like fallback fonts."
    },
    {
      tipo: "ejercicio",
      enunciado: "The HTML is already written. In the **CSS** tab, write:\n\n1. For the `h1`: `text-align: center;` and `font-family: Georgia, serif;`\n2. For the `p`: a `font-size` of `20px`.\n\n♟️",
      inicial: {
        html: `<h1>Happy Pawn Chess Club</h1>
<p>See you on Thursdays at six.</p>
`,
        css: ""
      },
      pistas: [
        "You need two rules: one for h1 with two properties inside (each with its semicolon) and another for p with font-size.",
        "It should look like this:\nh1 {\n  text-align: center;\n  font-family: Georgia, serif;\n}\np {\n  font-size: 20px;\n}"
      ],
      solucion: {
        html: `<h1>Happy Pawn Chess Club</h1>
<p>See you on Thursdays at six.</p>
`,
        css: `h1 {
  text-align: center;
  font-family: Georgia, serif;
}
p {
  font-size: 20px;
}
`
      }
    },
    {
      tipo: "controles",
      instruccion: "Design the concert poster 🎸: change the heading's size and alignment, try the font families on the paragraph and stretch its `line-height` to see how the lines breathe.",
      html: `<h1>The Crickets in concert</h1>
<p>Saturday at nine at night in the town square. Bring earplugs and lots of energy for jumping!</p>`,
      controles: [
        { selector: "h1", propiedad: "font-size", tipo: "rango", min: 16, max: 60, valor: 32, unidad: "px" },
        { selector: "h1", propiedad: "text-align", tipo: "opciones", opciones: ["left", "center", "right"], valor: "left" },
        { selector: "h1", propiedad: "text-transform", tipo: "opciones", opciones: ["none", "uppercase", "lowercase"], valor: "none" },
        { selector: "p", propiedad: "font-family", tipo: "opciones", opciones: ["serif", "sans-serif", "monospace", "cursive"], valor: "serif" },
        { selector: "p", propiedad: "line-height", tipo: "rango", min: 1, max: 3, paso: 0.1, valor: 1.2 }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Why do you write `font-family: Georgia, serif;` with two fonts?",
      opciones: [
        "To mix both fonts in the same text",
        "So that, if the computer doesn't have Georgia, it uses another font with feet",
        "To make the text bold"
      ],
      correcta: 1,
      explicacion: "It's the fallback font: the browser uses the first one on the list that's available. serif is a generic family that every computer has."
    },
    {
      tipo: "reto",
      enunciado: "Get the poster ready for The Crickets' tour 🦗. The HTML is already done. In the **CSS** tab:\n\n1. The `h1` heading: **centered** and with a size of **40px or more**.\n2. The subtitle (`.subtitle`): all in **CAPITALS** with `text-transform`.\n3. The `p` paragraph: comfortable line spacing, with a `line-height` of **1.5 or more**.",
      pestana: "css",
      inicial: {
        html: `<h1>The Crickets in concert</h1>
<h2 class="subtitle">Chirp-Chirp World Tour</h2>
<p>Come and hear the greatest hits of the noisiest band in the garden. There'll be popcorn, colored lights and a cricket who plays the drums with its back legs.</p>
`,
        css: `/* 1. h1: centered and 40px or more */

/* 2. .subtitle: in capitals */

/* 3. p: line-height of 1.5 or more */
`
      },
      comprobaciones: [
        {
          texto: "The <h1> heading is centered",
          prueba: (doc, win) => {
            const h1 = doc.querySelector("h1");
            return !!h1 && win.getComputedStyle(h1).textAlign === "center";
          }
        },
        {
          texto: "The <h1> heading is 40px or more",
          prueba: (doc, win) => {
            const h1 = doc.querySelector("h1");
            return !!h1 && (parseFloat(win.getComputedStyle(h1).fontSize) || 0) >= 40;
          }
        },
        {
          texto: "The subtitle (.subtitle) is in capitals",
          prueba: (doc, win) => {
            const sub = doc.querySelector(".subtitle");
            return !!sub && win.getComputedStyle(sub).textTransform === "uppercase";
          }
        },
        {
          texto: "The paragraph has line spacing of at least 1.5 times its text size",
          prueba: (doc, win) => {
            const p = doc.querySelector("p");
            if (!p) return false;
            const style = win.getComputedStyle(p);
            const height = parseFloat(style.lineHeight);
            const size = parseFloat(style.fontSize);
            return !isNaN(height) && !isNaN(size) && height >= size * 1.5 - 0.1;
          }
        }
      ],
      pistas: [
        "You need three rules: h1 with text-align and font-size, .subtitle with text-transform and p with line-height (without a unit).",
        "It should look something like this:\nh1 {\n  text-align: center;\n  font-size: 48px;\n}\n.subtitle {\n  text-transform: uppercase;\n}\np {\n  line-height: 1.6;\n}"
      ],
      solucion: {
        html: `<h1>The Crickets in concert</h1>
<h2 class="subtitle">Chirp-Chirp World Tour</h2>
<p>Come and hear the greatest hits of the noisiest band in the garden. There'll be popcorn, colored lights and a cricket who plays the drums with its back legs.</p>
`,
        css: `h1 {
  text-align: center;
  font-size: 48px;
}
.subtitle {
  text-transform: uppercase;
}
p {
  line-height: 1.6;
}
`
      }
    }
  ]
});
