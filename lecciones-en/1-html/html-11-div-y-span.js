/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-11
   Cajas genéricas: div y span — agrupar en bloque y en línea,
   y el atributo class como preparación para el Mundo CSS.
   Nota: todavía no hay CSS, así que class no cambia nada visible;
   el reto comprueba las clases con querySelector(".clase").
   ============================================================ */
CURSO.registrar({
  id: "html-11",
  titulo: "Generic boxes: div and span",
  xp: 30,
  objetivo: "You will know how to group content with <div> and <span> and give them a nickname with class to style them later.",
  // Lo que enseña esta lección, para el glosario de las lecciones de proyecto (js/glosario.js)
  glosario: [
    { termino: "<div>", tema: "Boxes", para: "A block box with no meaning, for grouping (and styling later).", ejemplo: "<div class=\"card\">\n  …\n</div>", buscar: "box block group container" },
    { termino: "<span>", tema: "Boxes", para: "An inline box, for a piece inside a sentence.", ejemplo: "<p>Level <span class=\"level\">3</span></p>", buscar: "piece line" },
    { termino: "class", tema: "Boxes", para: "A nickname for the element; the CSS will use it. It can repeat.", ejemplo: "<article class=\"service\">…</article>", buscar: "class nickname name style" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "<div>: a nameless box",
      texto: "Sometimes you want to **group** several elements and treat them as one thing: a heading with its paragraph, a record card, a card…\n\nThat is what `<div>` exists for (from “division”). It is like a **plain cardboard box** 📦: it keeps things, but does not say what is inside.\n\nIt is a **block** element: it starts on a new line and takes up the whole width. Look at the result of the example: you notice nothing! The div is invisible; its only job is to group.",
      ejemplo: {
        html: `<div>
  <h2>Emperor penguin</h2>
  <p>It is over a metre tall and is never cold.</p>
</div>
<div>
  <h2>Magellanic penguin</h2>
  <p>It lives in South America and brays like a donkey.</p>
</div>`,
        css: ""
      },
      consejo: "A `<div>` **means nothing**. If there is a tag that says what it is (`<p>`, `<h2>`, `<ul>`, `<button>`…), use that one. The div is the last resort, just for grouping. In the next lesson you will meet boxes with a name of their own!"
    },
    {
      tipo: "explicacion",
      titulo: "<span>: a box inside the sentence",
      texto: "`<span>` is the div's little sibling. It is also a box with no meaning, but **inline**: it stays inside the sentence, without breaking the line, just like `<strong>` or `<em>`.\n\nIt serves to “grab” a few words and, later on, give them a special style: a price, a name, a score…\n\nIn the example there are two spans… and they are not noticeable either. Patience, their moment will come! ✨",
      ejemplo: {
        html: `<p>Flavor of the day: <span>strawberry gum</span>, for just <span>2 €</span> a scoop.</p>`,
        css: ""
      },
      consejo: "If you want to say that something is **important**, keep using `<strong>`. The span is for when you only want to wrap a piece of text, without giving it any meaning."
    },
    {
      tipo: "explicacion",
      titulo: "The class attribute: a nickname",
      texto: "Any tag can carry the `class` attribute: a **nickname** you make up yourself, like `<div class=\"card\">`.\n\nRight now it **changes nothing on screen**. It is like sticking a name sticker on the box: in the CSS World we will say “paint gold everything that carries the card sticker” 🎨.\n\nAnd how is it different from `id`? An id is **unique** (like an ID card). A class can **repeat** on many elements, and one element can have **several**, separated by spaces: `class=\"card rare\"`.",
      ejemplo: {
        html: `<div class="card">
  <h2>Bubbles</h2>
  <p>Type: <span class="type">water</span></p>
</div>
<div class="card rare">
  <h2>Sparkles</h2>
  <p>Type: <span class="type">electric</span></p>
</div>`,
        css: ""
      },
      consejo: "Pick nicknames that say **what** the thing is (`price`, `card`), not how it looks (`red`, `big`): if tomorrow the price turns green, the name will still make sense. And write them in lowercase, with no accents or spaces (a space separates two classes)."
    },
    {
      tipo: "ejercicio",
      enunciado: "Write a `<p>` paragraph saying **My favourite band is The Odd Socks**. 🎸\n\nInside that paragraph, wrap **only** the band's name (**The Odd Socks**) in a `<span>` with `class=\"band\"`.\n\nDo not add any other attribute or tag. Notice that, in the result, the sentence is still on one single line: the span does not break it.",
      solucion: {
        html: `<p>My favourite band is <span class="band">The Odd Socks</span></p>`,
        css: ""
      },
      pistas: [
        "First write the whole paragraph with <p>…</p>. Then put <span class=\"band\"> right before “The” and </span> right after “Socks”.",
        "It should end up like this:\n<p>My favourite band is <span class=\"band\">The Odd Socks</span></p>"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "In the sentence “The ice cream costs 2 €” you want to wrap just the price to colour it later. Which box do you use?",
      opciones: ["<div>, because it is a box", "<span>, because it goes inside the sentence", "<h2>, so it is easier to see"],
      correcta: 1,
      explicacion: "The <span> is an inline box: it wraps the price without taking it out of the sentence. A <div> would put it on a separate line, and an <h2> is a heading, not a price."
    },
    {
      tipo: "reto",
      enunciado: "Get this video game character's card 🎮 ready to give it style in the CSS World:\n\n1. Wrap the heading and the two paragraphs inside a `<div class=\"card\">`.\n2. In the level paragraph, wrap **only the number** with `<span class=\"level\">`.",
      inicial: {
        html: `<!-- 1. Wrap the WHOLE card in a <div class="card"> -->
<h2>Gloria, the Warrior Hen</h2>
<p>Weapon: feather sword</p>
<!-- 2. Wrap only the number in a <span class="level"> -->
<p>Level: 12</p>
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "There is a <div> with class=\"card\"",
          prueba: (doc) => !!doc.querySelector("div.card")
        },
        {
          texto: "The <h2> heading and the two paragraphs are inside the card",
          prueba: (doc) => !!doc.querySelector("div.card h2")
            && doc.querySelectorAll("div.card p").length >= 2
        },
        {
          texto: "The level number is inside a <span class=\"level\"> of the card",
          prueba: (doc) => /\d/.test(doc.querySelector("div.card span.level")?.textContent || "")
        }
      ],
      pistas: [
        "The div wraps everything, like a box: write <div class=\"card\"> above the <h2> and </div> below the last paragraph. The span wraps only the 12.",
        "It should end up like this:\n<div class=\"card\">\n  <h2>Gloria, the Warrior Hen</h2>\n  <p>Weapon: feather sword</p>\n  <p>Level: <span class=\"level\">12</span></p>\n</div>"
      ],
      solucion: {
        html: `<div class="card">
  <h2>Gloria, the Warrior Hen</h2>
  <p>Weapon: feather sword</p>
  <p>Level: <span class="level">12</span></p>
</div>
`,
        css: ""
      }
    }
  ]
});
