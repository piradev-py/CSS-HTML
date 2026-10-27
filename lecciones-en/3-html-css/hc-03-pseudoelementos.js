/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-03 (inglés)
   Pseudo-elementos — ::before, ::after, content,
   ::first-letter y ::selection.
   Notas:
   - getComputedStyle(el, "::before").content devuelve el texto
     entre comillas ("\"✓ \""), así que el reto busca el ✓ dentro.
   - El ✓ no está en el teclado: el CSS inicial del reto lo trae
     en un comentario para copiarlo.
   - ::selection no se usa en ejercicios (no se puede leer de forma
     fiable); en el reto se comprueba con PRUEBA.reglas.
   - La letra capital se mide con getComputedStyle(el, "::first-letter")
     y, por si el navegador no lo calculara, se mira la regla escrita.
   ============================================================ */
CURSO.registrar({
  id: "hc-03",
  titulo: "Pseudo-elements",
  xp: 40,
  objetivo: "You'll know how to add decoration with CSS without touching the HTML: text before and after an element, drop caps and the color of selected text.",
  glosario: [
    { termino: "::before and ::after", tema: "Pseudo-elements", para: "A box that CSS creates at the start or the end of the element; it needs `content`.", ejemplo: ".kicker::after {\n  content: \"\";\n  display: block;\n  width: 36px;\n  height: 3px;\n  background-color: #1f7a6b;\n}", buscar: "before after decoration content line" },
    { termino: "content", tema: "Pseudo-elements", para: "What a `::before` or `::after` shows: a text, or `\"\"` for an empty box.", ejemplo: ".price::after {\n  content: \" dollars\";\n}", buscar: "content text pseudo" },
    { termino: "::first-letter", tema: "Pseudo-elements", para: "The first letter (drop cap).", ejemplo: "p::first-letter {\n  font-size: 40px;\n}", buscar: "drop cap first letter" },
    { termino: "linear-gradient()", tema: "Pseudo-elements", para: "A gradient from one color to another; it goes in `background`.", ejemplo: ".layer {\n  background: linear-gradient(to right, white, rgb(255 255 255 / 0));\n}", buscar: "gradient fade transparent background" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Ghost boxes: ::before and ::after",
      texto: "A **pseudo-element** is a part of an element that **doesn't exist in the HTML**: CSS creates it. It's written with **two** colons (`::`).\n\n• `::before` adds something **at the start**, inside the element.\n• `::after` adds it **at the end**.\n\nWhat shows up is set by the `content` property, with the text in quotes. Without `content` nothing shows up! 👻\n\nIn the example, the HTML only says “Spicy potatoes” and “4.50”: the fire and the word “dollars” are added by CSS.",
      ejemplo: {
        html: `<p class="dish">Spicy potatoes</p>
<p class="price">4.50</p>`,
        css: `.dish::before {
  content: "🔥 ";
}
.price::after {
  content: " dollars";
  color: gray;
}`
      },
      consejo: "A trick so you don't mix them up: **one** `:` is a pseudo-class (a state or a place, like `:hover`). **Two** `::` are a pseudo-element (a new or special part, like `::before`)."
    },
    {
      tipo: "explicacion",
      titulo: "Drop caps and selected text",
      texto: "Some pseudo-elements don't create anything new; instead they pick **a piece** of the element:\n\n• `::first-letter` → the **first letter**. That's how the giant drop caps in storybooks are made. 📖\n• `::selection` → the text the user **selects** with the mouse. You can change its background and its color.\n\nTry it in the result: drag the mouse over the text to select it.",
      ejemplo: {
        html: `<p>Once upon a time there was a dragon who was afraid of mice. Every time it saw one, it climbed onto a chair!</p>`,
        css: `p::first-letter {
  font-size: 40px;
  color: crimson;
}
p::selection {
  background-color: gold;
}`
      },
      consejo: "What you add with `content` is **decoration**: it can't be selected or copied, and some screen readers don't read it. Important things always go in the HTML."
    },
    {
      tipo: "explicacion",
      titulo: "A layer on top: ::after with a gradient",
      texto: "With `content: \"\"` (empty) the pseudo-element brings no text: it's an **empty box** you can paint. If you also give it `position: absolute` (and the parent `position: relative`), you can place it **on top of** whatever you want.\n\nAnd to paint it, a **gradient**: `linear-gradient(to right, color1, color2)` goes little by little from one color to another, from left to right. It goes in `background`, as if it were an image.\n\nIn the example, the layer covers the left half of the box and goes from the background color to transparent (`/ 0` at the end of the `rgb()`): the box seems to **fade** into the page. 🌫️",
      ejemplo: {
        html: `<div class="photo">Photo</div>`,
        css: `.photo {
  position: relative;
  height: 120px;
  background-color: teal;
  color: white;
  text-align: right;
}
.photo::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 50%;
  background: linear-gradient(to right, white, rgb(255 255 255 / 0));
}`
      },
      consejo: "`to right` goes from left to right; there are also `to left`, `to bottom` and `to top`. If the layer covers something that has to be clicked, that something needs a higher `z-index`."
    },
    {
      tipo: "ejercicio",
      enunciado: "Warn which pizza is spicy 🌶️ without touching the HTML. For the `.spicy::after` selector, add:\n\n• `content` with the value `\" hot!\"` (it starts with a **space**, so it doesn't stick to the name)\n• `color` with the value `red`\n\nThe HTML is already written: you only write the CSS.",
      cssBase: `body { font-family: sans-serif; }
h2 { color: #c1121f; }
li { font-size: 18px; padding: 4px 0; }`,
      inicial: {
        html: `<h2>Don Cheese Pizzeria</h2>
<ul>
  <li>Margherita</li>
  <li class="spicy">Diavola</li>
  <li>Four cheese</li>
</ul>
`,
        css: ""
      },
      solucion: {
        html: `<h2>Don Cheese Pizzeria</h2>
<ul>
  <li>Margherita</li>
  <li class="spicy">Diavola</li>
  <li>Four cheese</li>
</ul>
`,
        css: `.spicy::after {
  content: " hot!";
  color: red;
}
`
      },
      pistas: [
        "It's a single rule with the .spicy::after selector. The content text goes in quotes, with the space inside the quotes.",
        "It should look like this:\n.spicy::after {\n  content: \" hot!\";\n  color: red;\n}"
      ]
    },
    {
      tipo: "ejercicio",
      enunciado: "Turn the start of this story 🐢 into a real book. For the `.story::first-letter` selector, add:\n\n• `font-size` with the value `48px`\n• `color` with the value `seagreen`\n\nThe HTML is already written: you only write the CSS.",
      cssBase: `body { font-family: serif; }
.story { font-size: 18px; line-height: 1.6; max-width: 420px; }`,
      inicial: {
        html: `<p class="story">Once upon a time there was a turtle who dreamed of winning a rocket race.</p>
`,
        css: ""
      },
      solucion: {
        html: `<p class="story">Once upon a time there was a turtle who dreamed of winning a rocket race.</p>
`,
        css: `.story::first-letter {
  font-size: 48px;
  color: seagreen;
}
`
      },
      pistas: [
        "It's a single rule: the selector is the class with the pseudo-element stuck to it, .story::first-letter, and the two properties go inside.",
        "It should look like this:\n.story::first-letter {\n  font-size: 48px;\n  color: seagreen;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "Pick the decoration that `::before` puts in front of the heading and change the size and color of the paragraph's drop cap.",
      html: `<h2>Diary of an explorer</h2>
<p>Today I found a cave full of crystals that glow in the dark. Tomorrow I'll come back with a bigger flashlight.</p>`,
      cssBase: `body { font-family: sans-serif; }
p { font-size: 17px; line-height: 1.6; }`,
      controles: [
        { selector: "h2::before", propiedad: "content", tipo: "opciones", opciones: ["\"⭐ \"", "\"🧭 \"", "\"👉 \"", "none"], valor: "\"⭐ \"" },
        { selector: "p::first-letter", propiedad: "font-size", tipo: "rango", min: 16, max: 64, valor: 40, unidad: "px" },
        { selector: "p::first-letter", propiedad: "color", tipo: "color", valor: "#e76f51" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "You write .warning::before { color: red; } but nothing shows up in front of the warning. What's missing?",
      opciones: [
        "The content property, with what you want to show up",
        "Writing <before> in the HTML",
        "Changing the two colons to just one"
      ],
      correcta: 0,
      explicacion: "::before and ::after only show up if they have content. Without it, the browser doesn't create the ghost box, no matter how many colors you give it."
    },
    {
      tipo: "reto",
      enunciado: "Decorate your achievements wall 🏅 with CSS only. The HTML is already done; in the **CSS** tab:\n\n1. Put a `✓ ` in front of each achievement in the list with `::before` (you can copy the ✓ from the comment).\n2. Turn the first letter of the `.intro` paragraph into a **drop cap**: at least **twice** as big (and, if you want, a different color).\n3. Choose a background color for the text **selected** with the mouse.",
      pestana: "css",
      cssBase: `body { font-family: sans-serif; background-color: #fffaf0; }
h1 { font-size: 26px; color: #b5651d; }
.intro { font-size: 18px; line-height: 1.6; max-width: 480px; }
.achievements { list-style: none; padding: 0; }
.achievements li { font-size: 18px; }`,
      inicial: {
        html: `<h1>🏅 My achievements this week</h1>
<p class="intro">This week I've been on fire: I've learned loads of new things and I'm not going to stop.</p>
<ul class="achievements">
  <li>I finished World CSS</li>
  <li>I made my first grid with Grid</li>
  <li>I understood pseudo-classes</li>
</ul>
`,
        css: `/* 1. Put "✓ " in front of each achievement (copy the ✓ from here) */
.achievements li {
  padding: 6px 0;
}

/* 2. Drop cap: the first letter of .intro, big and colored */

/* 3. Background color of the selected text */
`
      },
      comprobaciones: [
        {
          texto: "Each achievement in the list starts with a ✓ added with `::before`",
          prueba: (doc, win) => {
            const lis = [...doc.querySelectorAll(".achievements li")];
            return lis.length >= 3 && lis.every(li => /[✓✔]/.test(win.getComputedStyle(li, "::before").content || ""));
          }
        },
        {
          texto: "The first letter of `.intro` is at least twice as big as the rest of the text (`::first-letter`)",
          prueba: (doc, win) => {
            const p = doc.querySelector(".intro");
            if (!p) return false;
            const normal = parseFloat(win.getComputedStyle(p).fontSize) || 16;
            const letter = parseFloat(win.getComputedStyle(p, "::first-letter").fontSize) || 0;
            if (letter >= normal * 2) return true;
            // Por si el navegador no calcula ::first-letter: se mira la regla escrita
            return PRUEBA.reglas(doc, "first-letter").some(r => {
              const base = r.selectorText.split(",").filter(s => /first-letter/.test(s)).map(s => s.replace(/::?first-letter/g, "").trim());
              let matches = false;
              try { matches = base.some(s => p.matches(s || "*")); } catch (e) { matches = false; }
              const size = String(r.style.fontSize || "");
              const n = parseFloat(size) || 0;
              const big = /px$/.test(size) ? n >= normal * 2 : /rem$/.test(size) ? n * 16 >= normal * 2 : /em$/.test(size) ? n >= 2 : false;
              return matches && big;
            });
          }
        },
        {
          texto: "You've chosen a color for the selected text (`::selection`)",
          prueba: (doc) => PRUEBA.reglas(doc, "::selection").some(r => !!(r.style.backgroundColor || r.style.color))
        }
      ],
      pistas: [
        "You need three new rules: .achievements li::before with content, .intro::first-letter with font-size (18px × 2 = 36px or more) and color, and ::selection with background-color.",
        "Write:\n.achievements li::before {\n  content: \"✓ \";\n  color: seagreen;\n}\n.intro::first-letter {\n  font-size: 48px;\n  color: #e76f51;\n}\n::selection {\n  background-color: gold;\n}"
      ],
      solucion: {
        html: `<h1>🏅 My achievements this week</h1>
<p class="intro">This week I've been on fire: I've learned loads of new things and I'm not going to stop.</p>
<ul class="achievements">
  <li>I finished World CSS</li>
  <li>I made my first grid with Grid</li>
  <li>I understood pseudo-classes</li>
</ul>
`,
        css: `.achievements li {
  padding: 6px 0;
}

.achievements li::before {
  content: "✓ ";
  color: seagreen;
}

.intro::first-letter {
  font-size: 48px;
  color: #e76f51;
}

::selection {
  background-color: gold;
}
`
      }
    }
  ]
});
