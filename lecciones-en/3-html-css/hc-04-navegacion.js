/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-04
   Barra de navegación — patrón nav ▸ ul ▸ li ▸ a, quitar
   viñetas (list-style), Flexbox aplicado, enlace activo con una
   clase y :hover / :focus-visible en enlaces.
   Notas:
   - El patrón se dibuja primero con ▸ y los ejemplos usan selectores
     descendientes (nav a, .menu a). El combinador hijo (>) se enseña
     después con un submenú, que es donde se nota la diferencia.
   - El motor trata :focus-visible como :focus al revisar, así que
     el reto lo comprueba con PRUEBA.clonar(doc, { estado: "focus" }).
   ============================================================ */
CURSO.registrar({
  id: "hc-04",
  titulo: "Navigation bar",
  xp: 50,
  objetivo: "You'll learn to build the typical navigation menu of any website: links in a row, no bullets, with the current link highlighted, and links that react to the mouse and the keyboard.",
  glosario: [
    { termino: "nav > ul > li > a", tema: "Menus", para: "The skeleton of every menu: a list of links inside `nav`.", ejemplo: "<nav>\n  <ul>\n    <li><a href=\"#home\">Home</a></li>\n  </ul>\n</nav>", buscar: "menu navigation list links", lenguaje: "html" },
    { termino: "a > b (direct child)", tema: "Menus", para: "Picks `b` only if it's a direct child of `a` (not a grandchild).", ejemplo: "nav > ul > li {\n  display: inline-block;\n}", buscar: "direct child combinator greater than" },
    { termino: "active link (.active)", tema: "Menus", para: "A class on the link of the current page or section, to highlight it.", ejemplo: "nav a.active {\n  color: #12332f;\n  font-weight: 600;\n}", buscar: "current highlight marked" },
    { termino: ":focus-visible", tema: "Menus", para: "Focus only when navigating with the keyboard: an outline you can actually see.", ejemplo: "a:focus-visible {\n  outline: 3px solid #1f7a6b;\n}", buscar: "keyboard focus outline accessibility outline" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "The skeleton of every menu",
      texto: "Almost every website in the world builds its menu with the same four boxes, one inside another:\n\n**nav ▸ ul ▸ li ▸ a**\n\n• `<nav>`: the navigation box (you already know it from semantic HTML).\n• `<ul>`: because a menu is, deep down, **a list** of links.\n• `<li>`: one list item per option.\n• `<a>`: the actual link, the one you click.\n\nUsing a list helps screen readers: they announce “list of 3 items” and the person knows how many options there are. This is what it looks like without CSS… let's fix that now! 🔧",
      ejemplo: {
        html: `<nav>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#games">Games</a></li>
    <li><a href="#shop">Shop</a></li>
  </ul>
</nav>`,
        css: ""
      }
    },
    {
      tipo: "explicacion",
      titulo: "No bullets and in a row",
      texto: "Three steps turn that list into a menu:\n\n1. **Remove the bullets** with `list-style: none` on the `ul`.\n2. **Remove the indent**: the `ul` comes with a left padding and margins by default. We clear them with `padding: 0` and `margin: 0`.\n3. **Put it in a row** with Flexbox: `display: flex` and a `gap` to separate them.\n\nThen, the links: no underline with `text-decoration: none` and some padding so they're easy to click. 👆",
      ejemplo: {
        html: `<nav>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#games">Games</a></li>
    <li><a href="#shop">Shop</a></li>
  </ul>
</nav>`,
        css: `nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 8px;
}
nav a {
  display: block;
  padding: 8px 14px;
  background-color: royalblue;
  color: white;
  text-decoration: none;
  border-radius: 8px;
}`
      },
      consejo: "The link's `display: block` makes its padding really count: that way **the whole** button is clickable, not just the letters."
    },
    {
      tipo: "explicacion",
      titulo: "The active link, :hover and :focus-visible",
      texto: "A good menu tells you **where you are**: the link for the current page carries a class, for example `class=\"active\"`, and you give it a different style.\n\nIt also reacts to what you do:\n\n• `:hover` → with the mouse over it.\n• `:focus-visible` → the focus you can **see** when you navigate with the keyboard (**Tab** key). If you click with the mouse, it doesn't show up, so it doesn't get in the way.\n\nSince they usually carry the same style, they're written together, separated by a comma. Click the result and press **Tab**. ⌨️",
      ejemplo: {
        html: `<nav>
  <ul>
    <li><a class="active" href="#home">Home</a></li>
    <li><a href="#games">Games</a></li>
    <li><a href="#shop">Shop</a></li>
  </ul>
</nav>`,
        css: `nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 8px;
}
nav a {
  display: block;
  padding: 8px 14px;
  background-color: royalblue;
  color: white;
  text-decoration: none;
  border-radius: 8px;
}
.active {
  background-color: tomato;
}
nav a:hover,
nav a:focus-visible {
  background-color: gold;
  color: black;
}`
      },
      consejo: "Why does `.active` come out red if `nav a` says blue? Because `nav a` carries no class and `.active` does: the class carries more weight. And `nav a:hover` carries even more, which is why it wins over both."
    },
    {
      tipo: "ejercicio",
      enunciado: "Turn this list into the menu of your games website 🕹️. On the `nav ul` selector put:\n\n• `list-style` with the value `none`\n• `padding` with the value `0`\n• `display` with the value `flex`\n• `gap` with the value `24px`\n\nThe HTML is already written: you only write the CSS.",
      cssBase: `body { font-family: sans-serif; }
nav { background-color: #264653; padding: 12px 16px; border-radius: 10px; }
nav ul { margin: 0; }
nav a { color: white; text-decoration: none; font-weight: bold; }`,
      inicial: {
        html: `<nav>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#games">Games</a></li>
    <li><a href="#ranking">Ranking</a></li>
  </ul>
</nav>
`,
        css: ""
      },
      solucion: {
        html: `<nav>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#games">Games</a></li>
    <li><a href="#ranking">Ranking</a></li>
  </ul>
</nav>
`,
        css: `nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 24px;
}
`
      },
      pistas: [
        "It's a single rule for nav ul with four properties: one removes the bullets, one the indent, and the other two put the links in a row with a gap.",
        "It should look like this:\nnav ul {\n  list-style: none;\n  padding: 0;\n  display: flex;\n  gap: 24px;\n}"
      ]
    },
    {
      tipo: "ejercicio",
      enunciado: "Make the links of this music menu 🎵 react to the mouse **and** the keyboard. Write **a single rule** with the `nav a:hover` and `nav a:focus-visible` selectors separated by a comma, and give it:\n\n• `background-color` with the value `gold`\n• `color` with the value `black`\n\nThe HTML is already written: you only write the CSS.",
      cssBase: `body { font-family: sans-serif; }
nav ul { list-style: none; padding: 0; margin: 0; display: flex; gap: 8px; }
nav a { display: block; padding: 8px 14px; background-color: #6a4c93; color: white; text-decoration: none; border-radius: 8px; }`,
      inicial: {
        html: `<nav>
  <ul>
    <li><a href="#news">News</a></li>
    <li><a href="#artists">Artists</a></li>
    <li><a href="#playlists">Playlists</a></li>
  </ul>
</nav>
`,
        css: ""
      },
      solucion: {
        html: `<nav>
  <ul>
    <li><a href="#news">News</a></li>
    <li><a href="#artists">Artists</a></li>
    <li><a href="#playlists">Playlists</a></li>
  </ul>
</nav>
`,
        css: `nav a:hover,
nav a:focus-visible {
  background-color: gold;
  color: black;
}
`
      },
      pistas: [
        "Write the two selectors, nav a:hover and nav a:focus-visible, separated by a comma before the opening brace. Inside go the two properties.",
        "It should look like this:\nnav a:hover,\nnav a:focus-visible {\n  background-color: gold;\n  color: black;\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Only direct children: the > combinator",
      texto: "Many menus have **submenus**: a list inside another list. And that's where the space selector gets too clever: `.menu li` picks **all** the `li` elements inside, also the submenu's.\n\nA **combinator** is the symbol that joins two selectors (the space is one). The **child combinator** `>` is stricter: `.menu > li` means “the `li` elements that are **direct children** of `.menu`”, exactly one level below. Grandchildren don't count.\n\nIn the example, only the main options get the red line; Sweets and Savory stay without it. 👨‍👧",
      ejemplo: {
        html: `<ul class="menu">
  <li><a href="#home">Home</a></li>
  <li><a href="#recipes">Recipes</a>
    <ul>
      <li><a href="#sweets">Sweets</a></li>
      <li><a href="#savory">Savory</a></li>
    </ul>
  </li>
  <li><a href="#contact">Contact</a></li>
</ul>`,
        css: `.menu > li {
  border-left: 6px solid tomato;
  padding-left: 8px;
  margin-bottom: 6px;
}`
      },
      consejo: "Do you remember the skeleton **nav ▸ ul ▸ li ▸ a**? In CSS you write it just like that: `nav > ul > li > a`. Each `>` goes down **one single** level. The spaces around the `>` are optional: `.menu>li` also works."
    },
    {
      tipo: "ejercicio",
      enunciado: "This games menu 🎮 has a submenu inside **Games**. Put a line **only on the main options**: on the `.menu > li` selector put `border-left` with the value `6px solid tomato`.\n\nCareful: if you use the space (`.menu li`) instead of `>`, the line will also show on Puzzles and Races… and that's not what's being asked.",
      cssBase: `body { font-family: sans-serif; }
.menu { list-style: none; padding: 0; }
.menu ul { list-style: none; padding-left: 20px; }
.menu li { padding: 4px 8px; margin-bottom: 4px; }
.menu a { color: #264653; font-weight: bold; text-decoration: none; }`,
      inicial: {
        html: `<ul class="menu">
  <li><a href="#home">Home</a></li>
  <li><a href="#games">Games</a>
    <ul>
      <li><a href="#puzzles">Puzzles</a></li>
      <li><a href="#races">Races</a></li>
    </ul>
  </li>
  <li><a href="#ranking">Ranking</a></li>
</ul>
`,
        css: ""
      },
      solucion: {
        html: `<ul class="menu">
  <li><a href="#home">Home</a></li>
  <li><a href="#games">Games</a>
    <ul>
      <li><a href="#puzzles">Puzzles</a></li>
      <li><a href="#races">Races</a></li>
    </ul>
  </li>
  <li><a href="#ranking">Ranking</a></li>
</ul>
`,
        css: `.menu > li {
  border-left: 6px solid tomato;
}
`
      },
      pistas: [
        "Use the child combinator between .menu and li: that way you only pick the li elements exactly one level below .menu.",
        "It should look like this:\n.menu > li {\n  border-left: 6px solid tomato;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "The bar is already flex. Try spreading the logo and the menu apart with `justify-content` (look at `space-between`: logo on one side and menu on the other, the most typical design) and change the gap between the links.",
      html: `<header class="navbar">
  <span class="logo">🚀 Rockets</span>
  <nav>
    <ul class="menu">
      <li><a class="active" href="#home">Home</a></li>
      <li><a href="#travel">Travel</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>`,
      cssBase: `body { font-family: sans-serif; }
.navbar { display: flex; align-items: center; padding: 10px 14px; background-color: #1d3557; border-radius: 10px; }
.logo { color: white; font-weight: bold; font-size: 18px; }
.menu { list-style: none; padding: 0; margin: 0; display: flex; }
.menu a { display: block; padding: 6px 10px; color: white; text-decoration: none; border-radius: 6px; }
.menu .active { background-color: #e63946; }`,
      controles: [
        { selector: ".navbar", propiedad: "justify-content", tipo: "opciones", opciones: ["flex-start", "center", "space-between", "flex-end"], valor: "flex-start" },
        { selector: ".menu", propiedad: "gap", tipo: "rango", min: 0, max: 30, valor: 4, unidad: "px" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "What is :focus-visible for on the links of a menu?",
      opciones: [
        "To highlight the link you reach while navigating with the keyboard (Tab key)",
        "To mark the link of the page you're on",
        "So the menu only shows on mobile"
      ],
      correcta: 0,
      explicacion: ":focus-visible kicks in when you reach a link with the keyboard. The page you're on is marked with a class, like .active, which you add yourself in the HTML."
    },
    {
      tipo: "reto",
      enunciado: "Build the menu for **Recipe Time**, your recipes website 🍳. The HTML is already done; in the **CSS** tab:\n\n1. In the `.navbar`, put the logo on the **left** and the menu on the **right** with Flexbox.\n2. Remove the bullets from the `.menu`, plus its padding and margin, and put its links **in a row**.\n3. Highlight the `.active` link with **a different background**.\n4. Make the menu links change background on **mouse over** and when **reached with the keyboard** (Tab).",
      pestana: "css",
      cssBase: `body { font-family: sans-serif; background-color: #fff8f0; }`,
      inicial: {
        html: `<header class="navbar">
  <a class="logo" href="#home">🍳 Recipe Time</a>
  <nav>
    <ul class="menu">
      <li><a href="#home">Home</a></li>
      <li><a class="active" href="#recipes">Recipes</a></li>
      <li><a href="#desserts">Desserts</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>
`,
        css: `.navbar {
  padding: 10px 16px;
  background-color: #2b2d42;
  border-radius: 12px;
  /* 1. Logo on the left and menu on the right (Flexbox) */
}

.logo {
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
}

.menu {
  /* 2. No bullets, no padding or margin, and the links in a row */
}

.menu a {
  display: block;
  padding: 8px 12px;
  color: white;
  text-decoration: none;
  border-radius: 8px;
}

/* 3. The .active link, with a different background */

/* 4. Menu links on mouse over or with keyboard focus */
`
      },
      comprobaciones: [
        {
          texto: "The `.navbar` uses Flexbox with the logo on the left and the menu on the right",
          prueba: (doc, win) => {
            const navbar = doc.querySelector(".navbar");
            const logo = doc.querySelector(".navbar .logo");
            const nav = doc.querySelector(".navbar nav");
            if (!navbar || !logo || !nav) return false;
            const rb = navbar.getBoundingClientRect();
            const rl = logo.getBoundingClientRect();
            const rn = nav.getBoundingClientRect();
            return win.getComputedStyle(navbar).display === "flex"
              && rl.left - rb.left < 40 && rb.right - rn.right < 40 && rn.left > rl.right;
          }
        },
        {
          texto: "The menu has no bullets and its links are in a row",
          prueba: (doc, win) => {
            const lis = [...doc.querySelectorAll(".menu li")];
            const links = [...doc.querySelectorAll(".menu a")];
            if (lis.length < 2 || links.length < 2) return false;
            const tops = links.map(a => a.getBoundingClientRect().top);
            return lis.every(li => win.getComputedStyle(li).listStyleType === "none")
              && tops.every(t => Math.abs(t - tops[0]) <= 1);
          }
        },
        {
          texto: "The `.active` link has a different background from the other links",
          prueba: (doc, win) => {
            const active = doc.querySelector(".menu .active");
            const other = doc.querySelector(".menu a:not(.active)");
            if (!active || !other) return false;
            const fa = win.getComputedStyle(active).backgroundColor;
            return fa !== "rgba(0, 0, 0, 0)" && fa !== win.getComputedStyle(other).backgroundColor;
          }
        },
        {
          texto: "The menu links change background on mouse over (`:hover`) and when reached with the keyboard (`:focus-visible`)",
          prueba: async (doc, win) => {
            const link = doc.querySelector(".menu a:not(.active)");
            if (!link) return false;
            const normal = win.getComputedStyle(link).backgroundColor;
            const changes = async state => {
              const v = await PRUEBA.clonar(doc, { estado: state });
              const copy = v.doc.querySelector(".menu a:not(.active)");
              return !!copy && v.win.getComputedStyle(copy).backgroundColor !== normal;
            };
            return (await changes("hover")) && (await changes("focus"));
          }
        }
      ],
      pistas: [
        "The .navbar needs display: flex and justify-content: space-between (with align-items: center it stays centered vertically). In .menu: list-style, padding, margin and display: flex. For point 4, one rule with two selectors separated by a comma: .menu a:hover and .menu a:focus-visible.",
        "Add to .navbar:\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\nIn .menu:\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  gap: 8px;\nAnd below:\n.active {\n  background-color: tomato;\n}\n.menu a:hover,\n.menu a:focus-visible {\n  background-color: #8d99ae;\n}"
      ],
      solucion: {
        html: `<header class="navbar">
  <a class="logo" href="#home">🍳 Recipe Time</a>
  <nav>
    <ul class="menu">
      <li><a href="#home">Home</a></li>
      <li><a class="active" href="#recipes">Recipes</a></li>
      <li><a href="#desserts">Desserts</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>
`,
        css: `.navbar {
  padding: 10px 16px;
  background-color: #2b2d42;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 8px;
}

.menu a {
  display: block;
  padding: 8px 12px;
  color: white;
  text-decoration: none;
  border-radius: 8px;
}

.active {
  background-color: tomato;
}

.menu a:hover,
.menu a:focus-visible {
  background-color: #8d99ae;
}
`
      }
    }
  ]
});
