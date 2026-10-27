/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-14 (última del mundo)
   Variables CSS — propiedades personalizadas --name, var(),
   :root («el selector de toda la página») y valor de reserva.
   Nota: el reto es el gran reto del Mundo CSS antes del proyecto web (variables +
   Flexbox + caja y bordes). Para comprobar que el alumno usa
   var() de verdad, las pruebas cambian la variable en <html>
   con style.setProperty, miden el color y lo dejan como estaba.
   ============================================================ */
CURSO.registrar({
  id: "css-14",
  titulo: "CSS variables",
  xp: 40,
  objetivo: "You'll learn to store colors and measurements in named variables and change the look of a whole page by touching a single line.",
  glosario: [
    { termino: ":root", tema: "Variables", para: "The selector of the whole page: that's where variables live.", ejemplo: ":root {\n  --primary: #1f7a6b;\n}", buscar: "root page variables" },
    { termino: "--name", tema: "Variables", para: "A variable: a named value you can use many times.", ejemplo: ":root {\n  --radius: 20px;\n  --shadow: 0 10px 30px rgb(18 51 47 / 0.08);\n}", buscar: "variable custom property store" },
    { termino: "var()", tema: "Variables", para: "Uses the value of a variable.", ejemplo: ".button {\n  background-color: var(--primary);\n}", buscar: "use variable" },
    { termino: "var(--x, fallback)", tema: "Variables", para: "If the variable doesn't exist, it uses the second value.", ejemplo: "a {\n  color: var(--link, teal);\n}", buscar: "fallback plan b default" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Storing a value with a name",
      texto: "Imagine your website uses the same purple in 30 places and one day you want to change it to green. 30 changes? What a drag! 😩\n\n**CSS variables** are like the contacts in your phone 📱: instead of remembering a number, you save it with a name. Like this:\n\n• You **create** them with a name that starts with **two dashes**: `--main-color: purple;`\n• You **use** them with `var()`: `color: var(--main-color);`\n\nWe store them in `:root`, which is **the selector of the whole page**: whatever you put there, every element can use.",
      ejemplo: {
        html: `<h1>My rock band</h1>
<button>Listen to us!</button>`,
        css: `:root {
  --main-color: purple;
}
h1 {
  color: var(--main-color);
}
button {
  background-color: var(--main-color);
  color: white;
}`
      },
      consejo: "Careful with names: `--main-color` and `--Main-Color` are **different** variables (capital letters count here). Use lowercase and dashes, like in classes."
    },
    {
      tipo: "explicacion",
      titulo: "A whole theme in one go",
      texto: "The real magic happens when the whole page gets its colors from a few variables. That set of colors and styles is called a **theme**.\n\nIn the example, the card's border, the heading and the button all come from **two** variables. If your store changes its colors tomorrow, you only touch those two lines in `:root` and everything updates by itself. ✨\n\nAnd they're not just for colors: any value works, for example a measurement like `--radius: 12px`.",
      ejemplo: {
        html: `<div class="card">
  <h2>Jumping Sneakers</h2>
  <button>Buy</button>
</div>`,
        css: `:root {
  --main-color: teal;
  --button-color: orange;
}
.card {
  border: 4px solid var(--main-color);
  padding: 12px;
}
h2 {
  color: var(--main-color);
}
button {
  background-color: var(--button-color);
}`
      }
    },
    {
      tipo: "explicacion",
      titulo: "Plan B: the fallback value",
      texto: "What if you use a variable that **doesn't exist** (because you typed it wrong or forgot to create it)? Then the property doesn't apply and the browser ignores it, without saying anything.\n\nFor those slip-ups, `var()` accepts a **fallback value**: you write it after a comma, and it's used only if the variable doesn't exist. Like the car's spare tire 🛞.\n\nIn the example, `--heading-color` isn't created anywhere, so the heading comes out `crimson`. On the other hand, `--background` does exist, so its fallback is never used.",
      ejemplo: {
        html: `<h1>Welcome aboard!</h1>
<p>Heading to the treasure island.</p>`,
        css: `:root {
  --background: lightyellow;
}
h1 {
  color: var(--heading-color, crimson);
}
body {
  background-color: var(--background, gray);
}`
      },
      consejo: "If something doesn't change color when you expect it to, check letter by letter the name of the variable in both places: creating it and using it. One dash less and it's a different one!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Give your bakery some color with a variable 🧁.\n\n• In the `:root` selector, create the variable `--main-color` with the value `hotpink`.\n• To the `h1` selector, add `color` with the value `var(--main-color)`.\n• To the `.sale` selector, add `background-color` with the value `var(--main-color)`.\n\nThe HTML is already written: you only write the CSS.",
      cssBase: `body { font-family: sans-serif; }
.sale { padding: 10px 14px; border-radius: 8px; font-weight: bold; }`,
      inicial: {
        html: `<h1>Sweet Cloud Bakery</h1>
<p class="sale">Today: muffins at half price!</p>
`,
        css: ""
      },
      solucion: {
        html: `<h1>Sweet Cloud Bakery</h1>
<p class="sale">Today: muffins at half price!</p>
`,
        css: `:root {
  --main-color: hotpink;
}
h1 {
  color: var(--main-color);
}
.sale {
  background-color: var(--main-color);
}
`
      },
      pistas: [
        "You need three rules: :root creates the variable (a name with two dashes, a colon and the value) and the other two use it by writing var(--main-color) as the value.",
        "It should end up like this:\n:root {\n  --main-color: hotpink;\n}\nh1 {\n  color: var(--main-color);\n}\n.sale {\n  background-color: var(--main-color);\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "The whole card gets its colors and corners from three variables. Change only the `:root` variables and watch everything transform at once.",
      html: `<div class="card">
  <h2>Thunder FC ⚡</h2>
  <p>Next match: Saturday</p>
  <button>Buy tickets</button>
</div>`,
      cssBase: `body { font-family: sans-serif; }
.card { border: 4px solid var(--main-color); border-radius: var(--radius); padding: 16px; }
h2 { color: var(--main-color); margin: 0 0 8px; }
button { background-color: var(--button-color); color: white; border: none; padding: 8px 16px; border-radius: var(--radius); font-size: 16px; }`,
      controles: [
        { selector: ":root", propiedad: "--main-color", tipo: "color", valor: "#6a1b9a" },
        { selector: ":root", propiedad: "--button-color", tipo: "color", valor: "#ff9800" },
        { selector: ":root", propiedad: "--radius", tipo: "rango", min: 0, max: 30, valor: 12, unidad: "px" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "You write color: var(--blue, navy); but you haven't created the variable --blue anywhere. What color does the text come out?",
      opciones: [
        "navy, the fallback value",
        "Blue, because the variable is named --blue",
        "Red, to warn you about the error"
      ],
      correcta: 0,
      explicacion: "Since --blue doesn't exist, var() uses the value that comes after the comma: navy. The name of a variable is just that, a name: it doesn't give it any color."
    },
    {
      tipo: "reto",
      enunciado: "🏆 **The big challenge of the CSS world!** Build your soccer team's website ⚽ so that its colors come from **two variables**:\n\n1. In `:root`, create `--team-color` (for example `purple`) and `--text-color` (for example `white`).\n2. Swap the fixed colors for variables: the `background-color` of `.header` and the `border` color of `.player` use `var(--team-color)`; the `color` of `.header` uses `var(--text-color)`.\n3. Put the `.header` in a row with Flexbox and center its items vertically.\n\nWhen it works, change the value of `--team-color` (try `teal`) and watch the whole theme change!",
      inicial: {
        html: `<header class="header">
  <span class="badge">⚽</span>
  <h1>Thunder FC</h1>
</header>

<div class="players">
  <div class="player">🧤 Goalkeeper</div>
  <div class="player">🛡️ Defender</div>
  <div class="player">🎯 Striker</div>
</div>
`,
        css: `/* 1. Create the variables --team-color and --text-color here */
:root {

}

.header {
  /* 3. In a row with flex and centered vertically */
  gap: 12px;
  padding: 12px;
  background-color: purple; /* 2. Use var(--team-color) */
  color: white;             /* 2. Use var(--text-color) */
  border-radius: 12px;
}

.header h1 {
  margin: 0;
  font-size: 24px;
}

.badge {
  font-size: 36px;
}

.players {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

.player {
  flex: 1;
  padding: 12px 4px;
  border: 3px solid purple; /* 2. Use var(--team-color) */
  border-radius: 8px;
  text-align: center;
}
`
      },
      comprobaciones: [
        {
          texto: "In `:root` the variables --team-color and --text-color exist",
          prueba: (doc, win) => {
            const cs = win.getComputedStyle(doc.documentElement);
            return cs.getPropertyValue("--team-color").trim() !== ""
              && cs.getPropertyValue("--text-color").trim() !== "";
          }
        },
        {
          texto: "The header's background and the players' border come from --team-color",
          prueba: (doc, win) => {
            const head = doc.querySelector(".header");
            const jug = doc.querySelector(".player");
            if (!head || !jug) return false;
            const raiz = doc.documentElement;
            raiz.style.setProperty("--team-color", "rgb(1, 2, 3)");
            const ok = win.getComputedStyle(head).backgroundColor === "rgb(1, 2, 3)"
              && win.getComputedStyle(jug).borderTopColor === "rgb(1, 2, 3)";
            raiz.style.removeProperty("--team-color");
            return ok;
          }
        },
        {
          texto: "The header's text color comes from --text-color",
          prueba: (doc, win) => {
            const head = doc.querySelector(".header");
            if (!head) return false;
            const raiz = doc.documentElement;
            raiz.style.setProperty("--text-color", "rgb(4, 5, 6)");
            const ok = win.getComputedStyle(head).color === "rgb(4, 5, 6)";
            raiz.style.removeProperty("--text-color");
            return ok;
          }
        },
        {
          texto: "The `.header` is flex and centers its items vertically (align-items: center)",
          prueba: (doc, win) => {
            const head = doc.querySelector(".header");
            if (!head) return false;
            const cs = win.getComputedStyle(head);
            return cs.display === "flex" && cs.alignItems === "center";
          }
        }
      ],
      pistas: [
        "Variables are created inside :root with two dashes (--team-color: purple;) and used with var(--team-color) instead of the fixed color. For the header you need display and align-items.",
        "In :root write:\n  --team-color: purple;\n  --text-color: white;\nIn .header add display: flex; and align-items: center;, and change purple to var(--team-color) and white to var(--text-color). In .player the border becomes: border: 3px solid var(--team-color);"
      ],
      solucion: {
        html: `<header class="header">
  <span class="badge">⚽</span>
  <h1>Thunder FC</h1>
</header>

<div class="players">
  <div class="player">🧤 Goalkeeper</div>
  <div class="player">🛡️ Defender</div>
  <div class="player">🎯 Striker</div>
</div>
`,
        css: `:root {
  --team-color: purple;
  --text-color: white;
}

.header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: var(--team-color);
  color: var(--text-color);
  border-radius: 12px;
}

.header h1 {
  margin: 0;
  font-size: 24px;
}

.badge {
  font-size: 36px;
}

.players {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

.player {
  flex: 1;
  padding: 12px 4px;
  border: 3px solid var(--team-color);
  border-radius: 8px;
  text-align: center;
}
`
      }
    }
  ]
});
