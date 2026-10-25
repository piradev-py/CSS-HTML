/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-09 (inglés)
   Display: bloque y en línea — display: block, inline,
   inline-block y none.
   Nota: el reto parte de unos enlaces con display: block (en vertical).
   «En fila» se comprueba con la posición vertical (top) de los tres
   botones visibles; el botón .secret lleva también la clase .button,
   así que se excluye con :not(.secret).
   ============================================================ */
CURSO.registrar({
  id: "css-09",
  titulo: "Display: block and inline",
  xp: 35,
  objetivo: "You'll understand how elements are placed by default and you'll know how to change it with display.",
  glosario: [
    { termino: "display: block", tema: "Display", para: "Takes up the whole row and pushes what comes next down.", ejemplo: ".brand strong {\n  display: block;\n}", buscar: "block whole row" },
    { termino: "display: inline", tema: "Display", para: "Stays in the line, like a word; it doesn't accept width or height.", ejemplo: ".checkbox {\n  display: inline;\n}", buscar: "inline line" },
    { termino: "display: inline-block", tema: "Display", para: "In the line, but with a box's width, height and padding.", ejemplo: ".button {\n  display: inline-block;\n}", buscar: "button inline box" },
    { termino: "display: none", tema: "Display", para: "Hides the element, as if it didn't exist.", ejemplo: ".hidden {\n  display: none;\n}", buscar: "hide remove" },
    { termino: "list-style: none", tema: "Display", para: "Removes a list's bullets (the trick behind menus).", ejemplo: "nav ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}", buscar: "bullets list menu dots" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Block and inline",
      texto: "Remember how `<div>` and `<p>` start on a new line, while `<span>` and `<strong>` stay inside the sentence? That way of being placed is decided by the `display` property:\n\n• `display: block`: starts on a new line and takes up **the whole width**, like a brick. 🧱\n• `display: inline`: stays in the sentence and takes up **only as much as its content**, like a word.\n\nEvery tag comes with one built in, but you can change it! In the example, the last span behaves like a block.",
      ejemplo: {
        html: `<div class="block">I'm a div: I take up the whole width</div>
<p>I'm a paragraph with <span class="inline">a span</span> inside.</p>
<span class="inline converted">I'm a span with display: block</span>`,
        css: `.block {
  background-color: lightblue;
}
.inline {
  background-color: gold;
}
.converted {
  display: block;
}`
      },
      consejo: "Changing `display` only changes **how it looks**, not what the tag means. A `<span>` with `display: block` is still a span."
    },
    {
      tipo: "explicacion",
      titulo: "inline-block: the best of both",
      texto: "Inline elements have a quirk: **they ignore `width` and `height`**. They're only as big as their content.\n\n`display: inline-block` mixes the best of both worlds:\n\n• It stays **in the line**, next to its neighbors, like `inline`.\n• But it **respects** `width` and `height`, like `block`.\n\nIn the example, both tiles have `width: 120px` and `height: 50px`… but only the `inline-block` one listens. Perfect for putting buttons in a row! 🔘",
      ejemplo: {
        html: `<p>
  <span class="tile">Inline</span>
  <span class="tile little-box">Inline-block</span>
</p>`,
        css: `.tile {
  width: 120px;
  height: 50px;
  background-color: lightgreen;
  border: 2px solid green;
}
.little-box {
  display: inline-block;
}`
      }
    },
    {
      tipo: "explicacion",
      titulo: "display: none: it disappears!",
      texto: "`display: none` makes an element **disappear completely**: you can't see it and it **takes up no space**, as if it had never existed. The other elements move to fill the gap.\n\nIt's useful for hiding things: a menu that isn't time to open yet, an error message that hasn't happened yet… or the ending of a movie. 🎬\n\nThe element is still in the HTML: you've just hidden it with CSS.",
      ejemplo: {
        html: `<p>The one to blame for everything is…</p>
<p class="spoiler">the butler!</p>
<p>The end.</p>`,
        css: `.spoiler {
  display: none;
}`
      },
      consejo: "Remember `opacity: 0`? It also makes an element invisible, but it **still takes up its space** (there's a gap). With `display: none` not even the gap is left."
    },
    {
      tipo: "ejercicio",
      enunciado: "Put these fish in a row, like in an aquarium 🐠. For the `.fish` class, add:\n\n• a `display` of `inline-block`,\n• a `width` of `80px`,\n• and a `background-color` of `lightblue`.",
      inicial: {
        html: `<ul>
  <li class="fish">Nemo</li>
  <li class="fish">Dory</li>
  <li class="fish">Bruce</li>
</ul>
`,
        css: ""
      },
      solucion: {
        html: `<ul>
  <li class="fish">Nemo</li>
  <li class="fish">Dory</li>
  <li class="fish">Bruce</li>
</ul>
`,
        css: `.fish {
  display: inline-block;
  width: 80px;
  background-color: lightblue;
}
`
      },
      pistas: [
        "A single rule with the .fish selector and three lines inside. Notice that inline-block is written with a hyphen in the middle.",
        "It should look like this:\n.fish {\n  display: inline-block;\n  width: 80px;\n  background-color: lightblue;\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Lists without bullets: the trick behind menus",
      texto: "Did you notice the fish still had their **bullet** (the little dot) and a gap on the left? Almost every website menu is a `<ul>` **list** in disguise, and to disguise it you need two things:\n\n• `list-style: none` removes the bullets.\n• `padding: 0` removes the gap the list leaves on the left for them.\n\nAnd with the `<li>` set to `inline-block`, you've got a menu in a row! 🧭",
      ejemplo: {
        html: `<ul class="menu">
  <li>Home</li>
  <li>Photos</li>
  <li>Contact</li>
</ul>`,
        css: `.menu {
  list-style: none;
  padding: 0;
}
.menu li {
  display: inline-block;
  margin-right: 16px;
}`
      },
      consejo: "The list is still a list: the browser and screen readers know they're menu options. You've just changed its outfit."
    },
    {
      tipo: "ejercicio",
      enunciado: "Turn this list into a menu. For the `.menu` class, add:\n\n• a `list-style` of `none`,\n• and a `padding` of `0`.",
      inicial: {
        html: `<ul class="menu">
  <li>Home</li>
  <li>Recipes</li>
  <li>Contact</li>
</ul>
`,
        css: ""
      },
      solucion: {
        html: `<ul class="menu">
  <li>Home</li>
  <li>Recipes</li>
  <li>Contact</li>
</ul>
`,
        css: `.menu {
  list-style: none;
  padding: 0;
}
`
      },
      pistas: [
        "A rule with the .menu selector and two lines inside: list-style and padding.",
        "It should look like this:\n.menu {\n  list-style: none;\n  padding: 0;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "Change the pets' `display` and move the sliders. Notice: with `inline`, width and height do nothing; with `inline-block` and `block`, they do. And what happens with `none`? 🙈",
      html: `<p>My pets:
  <span class="pet">🐶 Toby</span>
  <span class="pet">🐱 Kitty</span>
  <span class="pet">🐢 Flash</span>
</p>`,
      cssBase: "body { font-family: sans-serif; }\n.pet { background-color: #ffd6a5; border: 2px solid #f4a261; padding: 4px; }",
      controles: [
        { selector: ".pet", propiedad: "display", tipo: "opciones", opciones: ["inline", "inline-block", "block", "none"], valor: "inline" },
        { selector: ".pet", propiedad: "width", tipo: "rango", min: 40, max: 200, valor: 100, unidad: "px" },
        { selector: ".pet", propiedad: "height", tipo: "rango", min: 20, max: 80, valor: 40, unidad: "px" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "You gave a <span> width: 200px and nothing changes. Why?",
      opciones: [
        "Because you can't style a <span> with CSS",
        "Because it's an inline element, and inline elements ignore width",
        "Because you have to write 200 without px"
      ],
      correcta: 1,
      explicacion: "A <span> is inline by default, and inline elements ignore width and height. With display: inline-block (or block) it would listen to you."
    },
    {
      tipo: "reto",
      enunciado: "The menu on your video game website 🕹️ comes out vertical and looks awful. Fix it:\n\n1. Change the `display` of `.button` so the buttons go **in a row** without losing their width.\n2. Hide the `.secret` button so it **takes up no space**.",
      pestana: "css",
      inicial: {
        html: `<nav>
  <a class="button" href="#home">Home</a>
  <a class="button" href="#games">Games</a>
  <a class="button" href="#shop">Shop</a>
  <a class="button secret" href="#cheats">Cheats</a>
</nav>
`,
        css: `.button {
  display: block; /* 1. Change it so they go in a row and respect the width */
  width: 90px;
  padding: 10px;
  margin-bottom: 5px;
  color: white;
  background-color: tomato;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
}

.secret {
  /* 2. Hide it! Make it take up no space */
}
`
      },
      comprobaciones: [
        {
          texto: "The visible buttons have display: inline-block",
          prueba: (doc, win) => {
            const buttons = Array.from(doc.querySelectorAll(".button:not(.secret)"));
            return buttons.length >= 3 && buttons.every(b => win.getComputedStyle(b).display === "inline-block");
          }
        },
        {
          texto: "The three buttons are in the same row",
          prueba: (doc) => {
            const buttons = Array.from(doc.querySelectorAll(".button:not(.secret)"));
            if (buttons.length < 3) return false;
            const tops = buttons.map(b => b.getBoundingClientRect().top);
            return tops.every(t => Math.abs(t - tops[0]) <= 1);
          }
        },
        {
          texto: "The .secret button is hidden with display: none",
          prueba: (doc, win) => {
            const el = doc.querySelector(".secret");
            return !!el && win.getComputedStyle(el).display === "none";
          }
        }
      ],
      pistas: [
        "The value that keeps elements on the same line but respects their width is inline-block. To hide without leaving a gap, think display… none.",
        "Change display: block; to display: inline-block; inside .button, and write display: none; inside .secret."
      ],
      solucion: {
        html: `<nav>
  <a class="button" href="#home">Home</a>
  <a class="button" href="#games">Games</a>
  <a class="button" href="#shop">Shop</a>
  <a class="button secret" href="#cheats">Cheats</a>
</nav>
`,
        css: `.button {
  display: inline-block;
  width: 90px;
  padding: 10px;
  margin-bottom: 5px;
  color: white;
  background-color: tomato;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
}

.secret {
  display: none;
}
`
      }
    }
  ]
});
