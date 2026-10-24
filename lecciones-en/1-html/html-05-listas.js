/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-05
   Listas — <ul>, <ol>, <li> y listas dentro de listas.
   ============================================================ */
CURSO.registrar({
  id: "html-05",
  titulo: "Lists",
  xp: 30,
  objetivo: "You'll learn to create bulleted lists, numbered lists and lists inside lists.",
  // Lo que enseña esta lección, para el glosario de las lecciones de proyecto (js/glosario.js)
  glosario: [
    { termino: "<ul> and <li>", tema: "Lists", para: "A list with bullets (no order); each item goes in an `<li>`.", ejemplo: "<ul>\n  <li>Dogs</li>\n  <li>Cats</li>\n</ul>", buscar: "bullets list menu" },
    { termino: "<ol>", tema: "Lists", para: "A numbered list, for when the order matters.", ejemplo: "<ol>\n  <li>Make an appointment</li>\n  <li>Come to the clinic</li>\n</ol>", buscar: "numbered steps order" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Bulleted lists",
      texto: "A bulleted list (those little dots •) is written with two tags:\n\n• `<ul>` is the box that wraps **the whole** list. It comes from “unordered list”: a list with **no order**.\n• `<li>` is **each item** of the list (“list item”).\n\nUse it when order doesn't matter, like in an adventurer's backpack 🎒: it doesn't matter if you pack the flashlight or the sandwich first!",
      ejemplo: {
        html: `<h2>My adventure backpack</h2>
<ul>
  <li>Flashlight</li>
  <li>Treasure map</li>
  <li>Squid sandwich</li>
</ul>`,
        css: ""
      },
      consejo: "Inside a `<ul>` only `<li>` can go. If you write loose text in there, the browser gets all mixed up."
    },
    {
      tipo: "explicacion",
      titulo: "Numbered lists",
      texto: "When the **order matters**, use `<ol>` (“ordered list”: an **ordered** list). The items are still `<li>`, but the browser numbers them by itself: 1, 2, 3…\n\nIt's perfect for steps, rankings or the podium of a race 🏆. And the best part: if you add or remove an item, the numbers rearrange themselves!",
      ejemplo: {
        html: `<h2>The snail race podium</h2>
<ol>
  <li>Turbo</li>
  <li>Slimy</li>
  <li>Mrs. Slow</li>
</ol>`,
        css: ""
      },
      consejo: "Notice the indentation: the `<li>` sit a bit further to the right because they are **inside** the list."
    },
    {
      tipo: "explicacion",
      titulo: "Lists inside lists",
      texto: "Sometimes an item has details of its own. For that, you write a new list **inside an `<li>`**: right after its text and before its closing `</li>`.\n\nIt's like a folder with subfolders 🗂️. Watch how the browser nudges the small list inward and changes its bullet. You can mix types: an `<ol>` inside a `<ul>`, or the other way around.",
      ejemplo: {
        html: `<h2>The dragon's snack</h2>
<ul>
  <li>Spicy things
    <ul>
      <li>Chili peppers</li>
      <li>Wasabi</li>
    </ul>
  </li>
  <li>A glass of lava</li>
</ul>`,
        css: ""
      },
      consejo: "Typical mistake: putting the inner list **between** two `<li>`. The sublist lives **inside** an `<li>`, before its `</li>`."
    },
    {
      tipo: "ejercicio",
      enunciado: "Make a wizard's shopping list 🧙. Write a bulleted list `<ul>` with **two** `<li>` items:\n\n1. The first one says **Potion ingredients**. Inside it, right after that text and before its `</li>`, add another bulleted list `<ul>` with two `<li>`: **Toad eye** and **Troll hair**.\n2. The second one says **A new wand**.",
      pistas: [
        "Start with the big list: a <ul> with two <li>. Then go back to the first <li> and, right after its text (before </li>), write the small list: another <ul> with its two <li>.",
        "The first item looks like this:\n<li>Potion ingredients\n  <ul>\n    <li>Toad eye</li>\n    <li>Troll hair</li>\n  </ul>\n</li>\nBelow goes the second <li> and, at the end, the </ul> of the big list."
      ],
      solucion: {
        html: `<ul>
  <li>Potion ingredients
    <ul>
      <li>Toad eye</li>
      <li>Troll hair</li>
    </ul>
  </li>
  <li>A new wand</li>
</ul>
`,
        css: ""
      }
    },
    {
      tipo: "quiz",
      pregunta: "You want to add a list inside another list. Where do you write the inner list?",
      opciones: [
        "Inside an <li>, before its </li>",
        "Directly inside the <ul>, between two <li>",
        "After closing the first list"
      ],
      correcta: 0,
      explicacion: "The sublist belongs to a specific item, so it goes inside its <li>. Inside a <ul> or an <ol> only <li> can go."
    },
    {
      tipo: "reto",
      enunciado: "Write the recipe for the Strawberry Tsunami smoothie 🍓:\n\n• Below “Ingredients”, a bulleted list `<ul>` with **at least 3** ingredients.\n• Below “Steps”, a numbered list `<ol>` with **at least 3** steps.",
      inicial: {
        html: `<h1>Strawberry Tsunami smoothie</h1>

<h2>Ingredients</h2>
<!-- Bulleted list: strawberries, a banana, a glass of milk… -->

<h2>Steps</h2>
<!-- Numbered list: wash the fruit, put everything in the blender, blend… with the lid on! -->
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "There is a bulleted list <ul> with at least 3 ingredients",
          prueba: (doc) => Array.from(doc.querySelectorAll("ul")).some(ul =>
            Array.from(ul.children)
              .filter(c => c.tagName === "LI" && c.textContent.trim().length > 0).length >= 3)
        },
        {
          texto: "There is a numbered list <ol> with at least 3 steps",
          prueba: (doc) => Array.from(doc.querySelectorAll("ol")).some(ol =>
            Array.from(ol.children)
              .filter(c => c.tagName === "LI" && c.textContent.trim().length > 0).length >= 3)
        },
        {
          texto: "The ingredients (<ul>) come before the steps (<ol>)",
          prueba: (doc) => doc.querySelector("ul, ol")?.tagName === "UL"
        }
      ],
      pistas: [
        "The ingredients have no order, so they go in a <ul>. The steps do have one, so they go in an <ol>. Every item of both lists is an <li>.",
        "Below Ingredients:\n<ul>\n  <li>Strawberries</li>\n  <li>A banana</li>\n  <li>A glass of milk</li>\n</ul>\nAnd below Steps, the same but with <ol> and three steps."
      ],
      solucion: {
        html: `<h1>Strawberry Tsunami smoothie</h1>

<h2>Ingredients</h2>
<ul>
  <li>A handful of strawberries</li>
  <li>A banana</li>
  <li>A glass of milk</li>
</ul>

<h2>Steps</h2>
<ol>
  <li>Wash the strawberries and peel the banana.</li>
  <li>Put everything in the blender.</li>
  <li>Put the lid on (very important!) and blend.</li>
</ol>
`,
        css: ""
      }
    }
  ]
});
