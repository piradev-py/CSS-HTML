/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-01
   ¿Qué es CSS? — el «maquillaje» de la web: regla, selector,
   propiedad, valor, ; y { }, dónde se escribe (<style>, archivo
   .css + <link>) y los nombres de colores (color, background-color).
   ============================================================ */
CURSO.registrar({
  id: "css-01",
  titulo: "What is CSS?",
  xp: 25,
  objetivo: "You will understand what CSS is and write your first rules to give color to a page.",
  glosario: [
    { termino: "CSS rule", tema: "Rules", para: "A selector and, between `{ }`, the properties with their value; each one ends in `;`.", ejemplo: "h1 {\n  color: teal;\n}", buscar: "selector property value braces semicolon" },
    { termino: "<link rel=\"stylesheet\">", tema: "Rules", para: "In the `<head>`, links a separate `.css` file to the page.", ejemplo: "<link rel=\"stylesheet\" href=\"styles.css\">", buscar: "link stylesheet css file", lenguaje: "html" },
    { termino: "<style>", tema: "Rules", para: "CSS written inside the HTML itself, in the `<head>`.", ejemplo: "<style>\n  body {\n    background-color: white;\n  }\n</style>", buscar: "styles inside the html", lenguaje: "html" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "The web's makeup",
      texto: "With HTML you already know how to build the **content** of a page: headings, paragraphs, lists… But it all comes out black and white, so serious! 🙃\n\nTo change its **look** (colors, sizes, fonts, positions) there is **CSS**. If HTML is the skeleton, CSS is the **clothes and the makeup**.\n\nCSS stands for “Cascading Style Sheets”. You'll get what the “cascade” part means in lesson 5.\n\nLook at the example: the HTML is the usual one, but one line of CSS paints the heading purple.",
      ejemplo: {
        html: `<h1>My cat Whiskers</h1>
<p>He loves sleeping on top of the keyboard.</p>`,
        css: `h1 {
  color: purple;
}`
      },
      consejo: "Welcome to the CSS World! 🎨 Here everything changes as soon as you type, so play without fear: if something breaks, you delete it and that's it."
    },
    {
      tipo: "explicacion",
      titulo: "Anatomy of a rule",
      texto: "CSS is written in **rules**. Each rule has three pieces:\n\n• The **selector** says **who** you are decorating: `h1` means “all the h1s”.\n• The **property** says **what** you change: `color` is the color of the text.\n• The **value** says **how** you leave it: `white`.\n\nThe properties go between **curly braces** `{ }`. Between property and value goes a **colon** `:` and each line ends in a **semicolon** `;`. You can put several inside the same rule.\n\n`background-color` is the **background color**. Colors can be written using their name in English: `red`, `gold`, `tomato`, `hotpink`… there are about 140!",
      ejemplo: {
        html: `<h1>Don Cheese Pizzeria</h1>`,
        css: `h1 {
  color: white;
  background-color: darkorange;
}`
      },
      consejo: "The most typical mistake: forgetting the `;` at the end of a line. Then the browser doesn't understand the next one and ignores it without warning. If something “doesn't work”, look for the missing semicolon!"
    },
    {
      tipo: "explicacion",
      titulo: "Where do you write CSS?",
      texto: "In this course, you write it in the **CSS** tab of the editor. The engine of the site inserts it for you inside a `<style>` tag, in the head of the page.\n\nIn a real website you have two options:\n\n• Write it inside `<style>…</style>`, in the `<head>`, like in the example.\n• Save it in a **separate file** whose name ends in `.css` (for example `styles.css`) and link it from the `<head>` with `<link rel=\"stylesheet\" href=\"styles.css\">`.\n\nThe second one is what professionals use: a single style file serves all the pages of the site. 📁",
      ejemplo: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>My site</title>
  <style>
    h1 { color: teal; }
  </style>
</head>
<body>
  <h1>Hello, CSS!</h1>
</body>
</html>`,
        css: ""
      },
      consejo: "Short rules can also be written on a single line, like `h1 { color: teal; }`. The browser doesn't care: spaces and line breaks are just so you can read it better."
    },
    {
      tipo: "ejercicio",
      enunciado: "The HTML is already written. You just write CSS in the **CSS** tab:\n\n1. A rule for the `h1` headings that sets `color: tomato;`\n2. Another rule for the `p` paragraphs that sets `color: seagreen;`\n\nRemember: selector, curly braces `{ }`, property, colon `:`, value and semicolon `;`.",
      inicial: {
        html: `<h1>Don Cheese Pizzeria</h1>
<p>The cheesiest pizza in the neighborhood.</p>
`,
        css: ""
      },
      pistas: [
        "Each rule starts with the selector (the tag name, without < >) and then opens braces. Inside goes property: value;",
        "It should end up like this:\nh1 {\n  color: tomato;\n}\np {\n  color: seagreen;\n}"
      ],
      solucion: {
        html: `<h1>Don Cheese Pizzeria</h1>
<p>The cheesiest pizza in the neighborhood.</p>
`,
        css: `h1 {
  color: tomato;
}
p {
  color: seagreen;
}
`
      }
    },
    {
      tipo: "controles",
      instruccion: "Now, a bit of magic! ✨ Move the slider and pick colors. Watch the CSS that is being written by itself below the controls.\n\n`font-size` changes the **size of the text** (you'll look at it in depth in “Text and fonts”). The colors come with a code that starts with `#`: that's another way to write them, and you'll learn it in the “Colors” lesson.",
      html: `<h1>Hello, CSS!</h1>
<p>Change the controls and watch what happens.</p>`,
      controles: [
        { selector: "h1", propiedad: "font-size", tipo: "rango", min: 16, max: 72, valor: 32, unidad: "px" },
        { selector: "h1", propiedad: "color", tipo: "color", valor: "#e44d26" },
        { selector: "body", propiedad: "background-color", tipo: "color", valor: "#fff8e7" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "In the rule `p { color: blue; }`, what is `color`?",
      opciones: ["The selector", "The property", "The value"],
      correcta: 1,
      explicacion: "`p` is the selector (who you decorate), `color` is the property (what you change) and `blue` is the value (how you leave it)."
    },
    {
      tipo: "reto",
      enunciado: "Bring the dinosaur club's site to life 🦖. Write in the **CSS** tab:\n\n1. A rule that paints the `h1` heading in a color (whatever you want, for example `darkgreen`).\n2. A rule that sets a background color to the `body` (for example `lightyellow`).\n\nChoose colors that stand out from each other — the heading has to be readable!",
      pestana: "css",
      inicial: {
        html: `<h1>Dinosaur Club</h1>
<p>We roar softly here.</p>
`,
        css: `/* 1. Paint the h1 with a color */

/* 2. Give the body a background color (background-color) */
`
      },
      comprobaciones: [
        {
          texto: "The <h1> heading has a color that isn't the usual black",
          prueba: (doc, win) => {
            const h1 = doc.querySelector("h1");
            return !!h1 && win.getComputedStyle(h1).color !== "rgb(0, 0, 0)";
          }
        },
        {
          texto: "The <body> has a background color",
          prueba: (doc, win) => {
            const fondo = win.getComputedStyle(doc.body).backgroundColor;
            return fondo !== "rgba(0, 0, 0, 0)" && fondo !== "transparent";
          }
        },
        {
          texto: "The heading is readable: its color is different from the background color",
          prueba: (doc, win) => {
            const h1 = doc.querySelector("h1");
            if (!h1) return false;
            return win.getComputedStyle(h1).color !== win.getComputedStyle(doc.body).backgroundColor;
          }
        }
      ],
      pistas: [
        "You need two rules: one with the h1 selector and the color property, and another with the body selector and the background-color property.",
        "It should end up something like this:\nh1 {\n  color: darkgreen;\n}\nbody {\n  background-color: lightyellow;\n}"
      ],
      solucion: {
        html: `<h1>Dinosaur Club</h1>
<p>We roar softly here.</p>
`,
        css: `h1 {
  color: darkgreen;
}
body {
  background-color: lightyellow;
}
`
      }
    }
  ]
});
