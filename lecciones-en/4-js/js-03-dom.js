/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-03 (inglés)
   Seleccionar elementos (DOM) — el DOM como árbol de la página,
   document, querySelector(), querySelectorAll() (solo para verla
   en la consola: recorrer listas llega en js-08) y leer
   textContent.
   Notas:
   - Desde aquí hay HTML: viene escrito en inicial.html y el alumno
     solo escribe JS. La solución repite exactamente ese HTML.
   - No se usan plantillas de texto (sin escapes especiales).
   - El reto mira win.__logs y el código del alumno
     (PRUEBA.codigo) para ver que lee con textContent.
   ============================================================ */
CURSO.registrar({
  id: "js-03",
  titulo: "Selecting elements (DOM)",
  xp: 35,
  objetivo: "You'll know how to find any element on the page from JavaScript with querySelector and read its text with textContent.",
  glosario: [
    { termino: "document.querySelector()", tema: "DOM", para: "The first element that matches a CSS selector.", ejemplo: "const menu = document.querySelector(\"nav\");", buscar: "find element select dom" },
    { termino: "document.querySelectorAll()", tema: "DOM", para: "All the elements that match the selector (a list).", ejemplo: "const links = document.querySelectorAll(\"nav a\");", buscar: "all list select several" },
    { termino: "textContent", tema: "DOM", para: "An element's text: you can read it and change it.", ejemplo: "document.querySelector(\"#year\").textContent = \"2026\";", buscar: "text read write change" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "The DOM: your page is a tree",
      texto: "When the browser reads your HTML, it builds a **family tree** of the page in its memory 🌳. That tree is called the **DOM** (Document Object Model).\n\n• `document` is the grandmother: it represents the **whole** page.\n• Inside it is `<body>`, the mother.\n• Inside `<body>`, its daughters: an `<h1>`, a `<ul>`…\n• And inside the `<ul>`, the granddaughters: the `<li>` elements.\n\nJavaScript doesn't touch your HTML file: it touches that tree. If you change a branch, the page changes right away.\n\nAnd some good news: your JavaScript runs when the page is **already built**, so all the elements are ready for you to look for them.",
      consejo: "That's why from now on the HTML comes already written: in the **JS** tab you write the code that finds it and, in the next lesson, changes it."
    },
    {
      tipo: "explicacion",
      titulo: "querySelector: search with CSS selectors",
      texto: "To find an element, ask `document`:\n\n`document.querySelector(\"selector\")`\n\nInside the quotes goes a **CSS selector**, the same ones you already know!: `\"h1\"`, `\".slogan\"` (class), `\"#title\"` (id), `\"ul li\"`…\n\n`querySelector` gives you back the **first** element that matches. The usual thing is to store it in a constant to use it later.\n\nIn the example, the console shows you the elements it found. Notice: with `\"li\"` it only finds the **first** pizza.",
      ejemplo: {
        html: `<h1 id="title">🍕 Tagui's Pizzeria</h1>
<p class="slogan">The roundest pizzas in the neighborhood</p>
<ul>
  <li>Margherita</li>
  <li>Four cheese</li>
  <li>Hawaiian</li>
</ul>`,
        js: `const title = document.querySelector("#title");
console.log(title);

const slogan = document.querySelector(".slogan");
console.log(slogan);

const firstPizza = document.querySelector("li");
console.log(firstPizza);`
      },
      consejo: "If it doesn't find anything, it returns `null` (which means “nothing”). Check the selector: is the `#` or the `.` missing? Do the capital letters match? `\"#Title\"` and `\"#title\"` aren't the same."
    },
    {
      tipo: "explicacion",
      titulo: "textContent: read the text",
      texto: "You've got the element. What if you only want **what it says**, without tags? Ask for its `textContent`:\n\n`title.textContent`\n\nThe dot `.` means “of”: “the `textContent` **of** `title`”. Just like in `console.log`, which was “the `log` of the `console`”.\n\nIn the example, first the element is found and then its text is shown in the console.",
      ejemplo: {
        html: `<h1>Strawberry milkshake 🍓</h1>
<p class="time">Ready in 5 minutes</p>`,
        js: `const title = document.querySelector("h1");
console.log(title.textContent);

const time = document.querySelector(".time");
console.log(time.textContent);`
      }
    },
    {
      tipo: "ejercicio",
      enunciado: "Read the video game's info card 🎮. The HTML is already written.\n\n• Find the `#game` element with `querySelector` and show its `textContent` in the console. It should say **Castle adventure**.\n• Then find `.price` and show its `textContent`. It should say **$20**.",
      cssBase: `body { font-family: sans-serif; }
.card { padding: 16px; border-radius: 12px; background-color: #e7f5ff; }
.card h1 { margin: 0 0 8px; color: #1864ab; }
.card p { margin: 4px 0; }`,
      inicial: {
        html: `<div class="card">
  <h1 id="game">Castle adventure</h1>
  <p class="genre">Platformer</p>
  <p class="price">$20</p>
</div>
`,
        js: ""
      },
      solucion: {
        html: `<div class="card">
  <h1 id="game">Castle adventure</h1>
  <p class="genre">Platformer</p>
  <p class="price">$20</p>
</div>
`,
        js: `const game = document.querySelector("#game");
console.log(game.textContent);

const price = document.querySelector(".price");
console.log(price.textContent);
`
      },
      pistas: [
        "For an id the selector starts with # and for a class, with a dot. Store each element in a constant and then show its .textContent with console.log.",
        "It should look like this:\nconst game = document.querySelector(\"#game\");\nconsole.log(game.textContent);\nconst price = document.querySelector(\".price\");\nconsole.log(price.textContent);"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "querySelectorAll: all at once",
      texto: "`querySelector` only gives you the **first** one. If you want **all** the ones that match the selector, use `querySelectorAll`.\n\nIt gives you back a **list** of elements. The console shows it like this: `NodeList(3) [<li>, <li>, <li>]`. The number in parentheses says how many it found. 📋\n\nFor now we'll only look at it in the console. In the **arrays and loops** lesson you'll learn to go through the list to do something with each element.",
      ejemplo: {
        html: `<ul>
  <li class="planet">Mercury</li>
  <li class="planet">Venus</li>
  <li class="planet">Earth</li>
  <li>The Moon (not a planet)</li>
</ul>`,
        js: `const first = document.querySelector(".planet");
console.log(first);

const all = document.querySelectorAll(".planet");
console.log(all);`
      },
      consejo: "Notice the “All” at the end: `querySelector` gives one and `querySelectorAll` gives all of them. A few letters change the result a lot!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Check the shopping list 🛒. The HTML is already written.\n\n• With `querySelectorAll`, show in the console the list of **all** the elements with the `fruit` class.\n• Then, with `querySelector`, find the first `.fruit` and show its `textContent`. It should say **Apples**.",
      cssBase: `body { font-family: sans-serif; }
.fruit { color: #2b8a3e; font-weight: bold; }`,
      inicial: {
        html: `<h2>Shopping list</h2>
<ul>
  <li class="fruit">Apples</li>
  <li class="fruit">Bananas</li>
  <li>Bread</li>
  <li class="fruit">Strawberries</li>
</ul>
`,
        js: ""
      },
      solucion: {
        html: `<h2>Shopping list</h2>
<ul>
  <li class="fruit">Apples</li>
  <li class="fruit">Bananas</li>
  <li>Bread</li>
  <li class="fruit">Strawberries</li>
</ul>
`,
        js: `const fruits = document.querySelectorAll(".fruit");
console.log(fruits);

const firstFruit = document.querySelector(".fruit");
console.log(firstFruit.textContent);
`
      },
      pistas: [
        "Two searches with the same selector \".fruit\": one with querySelectorAll (you show it as it is) and another with querySelector (of that one you show its .textContent).",
        "It should look like this:\nconst fruits = document.querySelectorAll(\".fruit\");\nconsole.log(fruits);\nconst firstFruit = document.querySelector(\".fruit\");\nconsole.log(firstFruit.textContent);"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "The HTML has a <p class=\"note\">. Which instruction finds it?",
      opciones: [
        "document.querySelector(\"note\")",
        "document.querySelector(\".note\")",
        "document.querySelector(\".Note\")"
      ],
      correcta: 1,
      explicacion: "The selector is the same as in CSS: a class is written with a dot in front, and capital letters count. Without the dot it would look for a <note> tag, and .Note is a different class."
    },
    {
      tipo: "reto",
      enunciado: "Play detective with the milkshake recipe 🕵️. The HTML is already written; you, in the JS tab:\n\n1. Show the text of the `<h1>` heading in the console.\n2. Show the text of the **first** `<p>` paragraph.\n3. Show the list of **all** the paragraphs with `querySelectorAll`.\n\nRead the texts with `textContent`: no copying them by hand. 😉",
      cssBase: `body { font-family: sans-serif; color: #5c3d2e; background-color: #fff9db; }
h1 { color: #e67700; }
.tip { font-style: italic; }`,
      inicial: {
        html: `<h1>Banana milkshake 🍌</h1>
<p>Ready in 5 minutes and no cooking.</p>
<p>Ingredients: a banana, a glass of milk and a spoonful of honey.</p>
<p class="tip">If you want it extra cool, add ice.</p>
`,
        js: `// 1. The heading's text

// 2. The first paragraph's text

// 3. The list of all the paragraphs

`
      },
      comprobaciones: [
        {
          texto: "The console shows the heading's text",
          prueba: (doc, win) => {
            const t = doc.querySelector("h1")?.textContent.trim();
            return !!t && (win.__logs || []).some(l => l.includes(t) && !l.trim().startsWith("<"));
          }
        },
        {
          texto: "The console shows the first paragraph's text",
          prueba: (doc, win) => {
            const t = doc.querySelector("p")?.textContent.trim();
            return !!t && (win.__logs || []).some(l => l.includes(t) && !l.trim().startsWith("<"));
          }
        },
        {
          texto: "The console shows the list of all the paragraphs (`querySelectorAll`)",
          prueba: (doc, win) => {
            const n = doc.querySelectorAll("p").length;
            return (win.__logs || []).some(l => l.trim().startsWith("NodeList(" + n + ")"));
          }
        },
        {
          texto: "You read the page's texts with `textContent`",
          prueba: (doc) => {
            const code = PRUEBA.codigo(doc);
            return /\.textContent\b/.test(code);
          }
        }
      ],
      pistas: [
        "For the heading use the selector \"h1\" and for the first paragraph, \"p\" (querySelector always gives the first one). For the list, querySelectorAll(\"p\"). Remember: for each element, show its .textContent.",
        "For example:\nconst title = document.querySelector(\"h1\");\nconsole.log(title.textContent);\nconst paragraph = document.querySelector(\"p\");\nconsole.log(paragraph.textContent);\nconst paragraphs = document.querySelectorAll(\"p\");\nconsole.log(paragraphs);"
      ],
      solucion: {
        html: `<h1>Banana milkshake 🍌</h1>
<p>Ready in 5 minutes and no cooking.</p>
<p>Ingredients: a banana, a glass of milk and a spoonful of honey.</p>
<p class="tip">If you want it extra cool, add ice.</p>
`,
        js: `// 1. The heading's text
const title = document.querySelector("h1");
console.log(title.textContent);

// 2. The first paragraph's text
const paragraph = document.querySelector("p");
console.log(paragraph.textContent);

// 3. The list of all the paragraphs
const paragraphs = document.querySelectorAll("p");
console.log(paragraphs);
`
      }
    }
  ]
});
