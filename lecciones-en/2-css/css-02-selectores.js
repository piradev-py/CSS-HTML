/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-02
   Selectores — etiqueta, .clase, #id, agrupar con coma y
   selector descendiente (espacio).
   Nota: los ejemplos y el reto evitan que dos reglas peleen por la
   misma propiedad del mismo elemento: la cascada llega en css-05.
   ============================================================ */
CURSO.registrar({
  id: "css-02",
  titulo: "Selectors",
  xp: 35,
  objetivo: "You will aim exactly at the elements you want to decorate using tags, classes, ids and combinations.",
  glosario: [
    { termino: "tag (p, h1…)", tema: "Selectors", para: "Chooses all the elements with that tag.", ejemplo: "p {\n  color: gray;\n}", buscar: "selector tag all" },
    { termino: ".clase", tema: "Selectors", para: "Chooses the elements with that `class`; it can be repeated in many.", ejemplo: ".service {\n  padding: 22px;\n}", buscar: "selector class dot" },
    { termino: "#id", tema: "Selectors", para: "Chooses the single element with that `id`.", ejemplo: "#schedule {\n  max-width: 800px;\n}", buscar: "selector id hash" },
    { termino: "a, b (grouping)", tema: "Selectors", para: "The same rule for several selectors, separated by commas.", ejemplo: "h1, h2, h3 {\n  color: darkslategray;\n}", buscar: "grouping comma several at once" },
    { termino: "a b (descendant)", tema: "Selectors", para: "Chooses `b` only if it is inside `a` (with a space between the two).", ejemplo: "nav a {\n  text-decoration: none;\n}", buscar: "descendant inside of space combinator" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "By tag or by class",
      texto: "The **selector** is the aim of CSS: it decides who gets the style. 🎯\n\n• **Tag selector**: the name of the tag, like `p`. It decorates **every** paragraph on the page.\n• **Class selector**: a **dot** followed by the nickname you gave with `class`, like `.favorite`. It decorates **only** the elements that carry that class, whatever tag they have.\n\nRemember how we said in the HTML World that `class` was a sticker for the CSS? Well, here comes its moment!",
      ejemplo: {
        html: `<h2>My video games</h2>
<p>Mario Kart</p>
<p class="favorite">Zelda</p>
<p>Tetris</p>`,
        css: `p {
  color: gray;
}
.favorite {
  background-color: gold;
}`
      },
      consejo: "In the HTML the class is written without a dot (`class=\"favorite\"`) and in the CSS, with a dot (`.favorite`). Forgetting the dot is mistake number one!"
    },
    {
      tipo: "explicacion",
      titulo: "By id, and several at once",
      texto: "• **Id selector**: a **hash** `#` followed by the id, like `#captain`. Since an id is unique on the page, it points at **a single element**: it's the sniper of selectors.\n\n• **Grouping with commas**: if several selectors share the same style, separate them with commas and write the rule only once. `h1, h2` means “the h1s **and also** the h2s”.\n\nThat way you don't repeat the same code twice. ✂️",
      ejemplo: {
        html: `<h1>My team</h1>
<h2>Forwards</h2>
<p id="captain">Lola</p>
<p>Rose</p>`,
        css: `h1, h2 {
  color: navy;
}
#captain {
  background-color: gold;
}`
      },
      consejo: "If something repeats (several elements with the same style), use a **class**. Keep the **id** for what is truly unique."
    },
    {
      tipo: "explicacion",
      titulo: "The one inside…: the space",
      texto: "Sometimes you want to decorate something **only if it is inside** something else. For that you write two selectors separated by a **space**: that's the **descendant selector**.\n\n`.sale span` means “the `span` elements that are **inside** something with the class `sale`”. The other spans stay as they were.\n\nIn the example, only the sale price comes out in red. 🏷️",
      ejemplo: {
        html: `<p>Normal price: <span>$5</span></p>
<div class="sale">
  <p>On sale! <span>$3</span></p>
</div>`,
        css: `.sale span {
  color: red;
}`
      },
      consejo: "Trick to read it: start from the **right**. `.sale span` reads “a span… that is inside .sale”. And careful with the space — here it does matter!"
    },
    {
      tipo: "ejercicio",
      enunciado: "The HTML is already written. Write three rules in the **CSS** tab:\n\n1. To the `h1` headings, `color: darkgreen;`\n2. To the `.warning` class, `color: crimson;`\n3. To the `#hours` id, `color: teal;`\n\nWatch out for the dot of the class and the hash of the id. 🦁",
      inicial: {
        html: `<h1>Whiskerville Zoo</h1>
<p class="warning">Do not feed the penguins.</p>
<p id="hours">Open from 10:00 to 18:00.</p>
`,
        css: ""
      },
      pistas: [
        "The tag selector is just the name (h1), the class one starts with a dot (.warning) and the id one with a hash (#hours).",
        "It should end up like this:\nh1 {\n  color: darkgreen;\n}\n.warning {\n  color: crimson;\n}\n#hours {\n  color: teal;\n}"
      ],
      solucion: {
        html: `<h1>Whiskerville Zoo</h1>
<p class="warning">Do not feed the penguins.</p>
<p id="hours">Open from 10:00 to 18:00.</p>
`,
        css: `h1 {
  color: darkgreen;
}
.warning {
  color: crimson;
}
#hours {
  color: teal;
}
`
      }
    },
    {
      tipo: "quiz",
      pregunta: "Which selector decorates only the element that has `id=\"boss\"`?",
      opciones: ["boss", ".boss", "#boss"],
      correcta: 2,
      explicacion: "The id is selected with a hash: #boss. With a dot (.boss) you'd look for a class, and with nothing (boss) you'd look for a <boss> tag, which doesn't exist."
    },
    {
      tipo: "reto",
      enunciado: "Paca's Fruit Stand needs color! 🍍 The HTML is already done. In the **CSS** tab:\n\n1. Set a text color to **every** fruit (the `li` elements).\n2. Set a background color **only** to the tropical ones (`class=\"tropical\"`).\n3. Set a **different** background color, **only** to your favorite (`id=\"favorite\"`).\n\nThe colors: whichever you want.",
      pestana: "css",
      inicial: {
        html: `<h1>Paca's Fruit Stand</h1>
<ul>
  <li>Apple</li>
  <li class="tropical">Pineapple</li>
  <li id="favorite">Strawberry</li>
  <li class="tropical">Mango</li>
  <li>Pear</li>
</ul>
`,
        css: `/* 1. Every fruit (li): a text color */

/* 2. Only the tropical ones (.tropical): a background color */

/* 3. Only your favorite (#favorite): another background color */
`
      },
      comprobaciones: [
        {
          texto: "Every fruit has the same text color, and it isn't black",
          prueba: (doc, win) => {
            const colores = Array.from(doc.querySelectorAll("li")).map(li => win.getComputedStyle(li).color);
            return colores.length > 0 && colores.every(c => c === colores[0]) && colores[0] !== "rgb(0, 0, 0)";
          }
        },
        {
          texto: "Both tropical fruits have a background color… and the ones that aren't tropical or favorite don't",
          prueba: (doc, win) => {
            const transparente = el => win.getComputedStyle(el).backgroundColor === "rgba(0, 0, 0, 0)";
            const tropicales = Array.from(doc.querySelectorAll("li.tropical"));
            const normales = Array.from(doc.querySelectorAll("li:not(.tropical):not(#favorite)"));
            return tropicales.length === 2 && tropicales.every(li => !transparente(li)) &&
                   normales.length > 0 && normales.every(transparente);
          }
        },
        {
          texto: "Your favorite (#favorite) has a background color different from the tropical ones",
          prueba: (doc, win) => {
            const fav = doc.querySelector("#favorite");
            const tropical = doc.querySelector(".tropical");
            if (!fav || !tropical) return false;
            const fondoFav = win.getComputedStyle(fav).backgroundColor;
            return fondoFav !== "rgba(0, 0, 0, 0)" && fondoFav !== win.getComputedStyle(tropical).backgroundColor;
          }
        }
      ],
      pistas: [
        "You need three rules, one per selector: li (every fruit), .tropical (with a dot) and #favorite (with a hash). The last two use background-color.",
        "It should end up something like this:\nli {\n  color: darkgreen;\n}\n.tropical {\n  background-color: gold;\n}\n#favorite {\n  background-color: pink;\n}"
      ],
      solucion: {
        html: `<h1>Paca's Fruit Stand</h1>
<ul>
  <li>Apple</li>
  <li class="tropical">Pineapple</li>
  <li id="favorite">Strawberry</li>
  <li class="tropical">Mango</li>
  <li>Pear</li>
</ul>
`,
        css: `li {
  color: darkgreen;
}
.tropical {
  background-color: gold;
}
#favorite {
  background-color: pink;
}
`
      }
    }
  ]
});
