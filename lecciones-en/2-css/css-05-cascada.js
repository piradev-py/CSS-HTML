/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-05 (inglés)
   La cascada: ¿quién gana? — orden (la última gana),
   especificidad (etiqueta < clase < id), herencia y por qué
   evitar !important.
   Nota: el reto comprueba que no se usa !important quitando antes
   los comentarios del CSS (el inicial lo menciona en un comentario).
   ============================================================ */
CURSO.registrar({
  id: "css-05",
  titulo: "The cascade: who wins?",
  xp: 40,
  objetivo: "You'll understand why a style sometimes “doesn't apply” and you'll know how to fix it: order, specificity and inheritance.",
  glosario: [
    { termino: "cascade (the last one wins)", tema: "Cascade", para: "If two equally strong rules clash, the one further down wins.", ejemplo: "p {\n  color: gray;\n}\np {\n  color: black;\n}", buscar: "order last wins conflict" },
    { termino: "specificity", tema: "Cascade", para: "If they clash, the most specific selector wins: tag < class < id.", ejemplo: ".button {\n  color: white;\n}", buscar: "specificity who wins class id" },
    { termino: "inheritance", tema: "Cascade", para: "Children inherit `color`, `font-family`, `font-size`… from their parent (boxes don't).", ejemplo: "body {\n  color: #2b3b39;\n}", buscar: "inherit parent children" },
    { termino: "!important (avoid it)", tema: "Cascade", para: "It beats everything and then nothing can beat it: better fix the selector.", ejemplo: "p {\n  color: black !important;\n}", buscar: "important force" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "A tie: the last one wins",
      texto: "What happens if two rules give a different value to the **same property** of the **same element** at once? A fight! 🥊\n\nIf the selectors are equally strong, the rule **further down** wins. CSS is read from top to bottom, like water falling down a **cascade**, and whatever falls last is what stays. That's why it's called that!\n\nIn the example, both selectors are `p`. The second rule says `red`… and the paragraph comes out red.",
      ejemplo: {
        html: `<p>What color am I?</p>`,
        css: `p {
  color: blue;
  background-color: lightyellow;
}
p {
  color: red;
}`
      },
      consejo: "Only **repeated** properties fight. The yellow background from the first rule has no rival, so it still applies. Rules add up!"
    },
    {
      tipo: "explicacion",
      titulo: "Specificity: the most specific wins",
      texto: "If the selectors are **not** equally strong, the order doesn't matter: the **most specific** one wins. That's called **specificity**.\n\nPicture the teacher giving orders: “Everyone: gray T-shirt.” “The basketball team: orange.” “Lucy: red.” What does Lucy wear? The red one, because that order is **just for her**!\n\nThe strength of selectors:\n\n**tag** (`p`) < **class** (`.notice`) < **id** (`#urgent`)\n\nIn the example, the `p` rule comes last… and it still loses to the class and the id.",
      ejemplo: {
        html: `<p>I'm a normal paragraph.</p>
<p class="notice">I have a class.</p>
<p class="notice" id="urgent">I have a class and an id.</p>`,
        css: `#urgent {
  background-color: tomato;
}
.notice {
  background-color: orange;
}
p {
  background-color: lightgray;
}`
      },
      consejo: "There's a wild card, `!important` (`color: red !important;`), that beats almost everything. It's like shouting in class: it works once, but then everyone shouts and nobody understands anything. Better use a more specific selector."
    },
    {
      tipo: "explicacion",
      titulo: "Inheritance: like parent, like child",
      texto: "Some properties **are inherited**: if you give them to a box, the elements inside get them too, the way children inherit their mother's eyes. 👀\n\nAlmost all **text** properties are inherited: `color`, `font-family`, `font-size`, `line-height`… Others, like `background-color`, are **not**.\n\nCareful: what's inherited is the **weakest** thing of all. If an element has its own rule, even a simple `.rebel`, that rule wins over what it inherits, even if the parent uses an id!",
      ejemplo: {
        html: `<div id="box">
  <h2>Grandma's inheritance</h2>
  <p>This paragraph inherits the color.</p>
  <p class="rebel">This one has its own rule.</p>
</div>`,
        css: `#box {
  color: purple;
  font-family: monospace;
}
.rebel {
  color: green;
}`
      },
      consejo: "That's why it's so handy to put the font on the `body`: every text on the page inherits it and you only write it once."
    },
    {
      tipo: "ejercicio",
      enunciado: "The HTML is already written. In the **CSS** tab, write these three rules, **in this order**:\n\n1. For the id `#today`, `color: crimson;`\n2. For the class `.extra`, `color: orange;`\n3. For the `body`, `color: gray;`\n\nThen look at the result: the `body` comes last, but only the first paragraph inherits its gray. Inheritance and specificity in action! 🕹️",
      inicial: {
        html: `<p>Morning shift</p>
<p class="extra">Afternoon shift</p>
<p class="extra" id="today">Night shift</p>
`,
        css: ""
      },
      pistas: [
        "Three rules, each with its selector: #today (hash), .extra (dot) and body (nothing). Inside each one, just the color property.",
        "It should look like this:\n#today {\n  color: crimson;\n}\n.extra {\n  color: orange;\n}\nbody {\n  color: gray;\n}"
      ],
      solucion: {
        html: `<p>Morning shift</p>
<p class="extra">Afternoon shift</p>
<p class="extra" id="today">Night shift</p>
`,
        css: `#today {
  color: crimson;
}
.extra {
  color: orange;
}
body {
  color: gray;
}
`
      }
    },
    {
      tipo: "quiz",
      pregunta: "A button has `class=\"button\"` and `id=\"buy\"`. The CSS says `#buy { color: red; }` first and then `.button { color: blue; }`. What color is the text?",
      opciones: [
        "Blue, because that rule comes last",
        "Red, because the id is more specific than the class",
        "Black, because the two rules cancel each other out"
      ],
      correcta: 1,
      explicacion: "Order only decides when there's a tie in strength. There isn't one here: an id always beats a class, wherever it goes."
    },
    {
      tipo: "reto",
      enunciado: "🕵️ **CSS detective.** In the sock shop, the **Buy** button should be green (`green`)… but it's still gray. Another rule is beating it.\n\n1. Find out why the `.buy` rule loses.\n2. Fix it **without using** `!important` and **without deleting** the shop's rule: the **See more** button must stay gray and the button text, white.",
      pestana: "css",
      inicial: {
        html: `<h1>Crazy Socks</h1>
<div id="shop">
  <p>Unicorn socks: $5</p>
  <button class="buy">Buy</button>
  <button>See more</button>
</div>
`,
        css: `/* Style for the shop's buttons (don't delete it) */
#shop button {
  background-color: gray;
  color: white;
}

/* We want the Buy button in green, but it's still gray.
   Why does this rule lose? Fix it without !important. */
.buy {
  background-color: green;
}
`
      },
      comprobaciones: [
        {
          texto: "The Buy button has a green background (green)",
          prueba: (doc, win) => {
            const button = doc.querySelector(".buy");
            return !!button && win.getComputedStyle(button).backgroundColor === "rgb(0, 128, 0)";
          }
        },
        {
          texto: "The See more button still has a gray background (gray)",
          prueba: (doc, win) => {
            const other = doc.querySelector("#shop button:not(.buy)");
            return !!other && win.getComputedStyle(other).backgroundColor === "rgb(128, 128, 128)";
          }
        },
        {
          texto: "The text on both buttons is still white",
          prueba: (doc, win) => {
            const buttons = Array.from(doc.querySelectorAll("#shop button"));
            return buttons.length >= 2 && buttons.every(b => win.getComputedStyle(b).color === "rgb(255, 255, 255)");
          }
        },
        {
          texto: "You didn't use !important",
          prueba: (doc) => !Array.from(doc.querySelectorAll("style")).some(s =>
            /!\s*important/i.test((s.textContent || "").replace(/\/\*[\s\S]*?\*\//g, "")))
        }
      ],
      pistas: [
        "Compare the strength of the two selectors: #shop button has an id, and .buy only a class. The id always wins, even if the class comes later. You need a more specific selector for the Buy button.",
        "Put the id in front of the class, so your selector also has an id and, on top of that, a class:\n#shop .buy {\n  background-color: green;\n}"
      ],
      solucion: {
        html: `<h1>Crazy Socks</h1>
<div id="shop">
  <p>Unicorn socks: $5</p>
  <button class="buy">Buy</button>
  <button>See more</button>
</div>
`,
        css: `/* Style for the shop's buttons (don't delete it) */
#shop button {
  background-color: gray;
  color: white;
}

/* Now the selector has id + class: it's more specific and wins */
#shop .buy {
  background-color: green;
}
`
      }
    }
  ]
});
