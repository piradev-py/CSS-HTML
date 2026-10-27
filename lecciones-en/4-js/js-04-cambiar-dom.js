/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-04 (inglés)
   Cambiar texto, estilos y clases — asignar textContent,
   elemento.style.propiedad (nombres en camelCase y valores con
   unidades), classList.add / remove / toggle y por qué preferir
   clases a style.
   Notas:
   - El revisor compara los estilos en línea por su valor calculado
     (#dc143c = crimson) y las clases sin importar el orden.
   - En el ejercicio 2 la tarjeta empieza con la clase «hidden»
     (display: none en cssBase): al quitarla, aparece.
   - El <body> se busca con querySelector("body"); document.body se
     menciona como atajo.
   - El reto deja el CSS de .night-mode escrito en la pestaña CSS
     (inicial y solución iguales): el aspecto vive en el CSS.
   ============================================================ */
CURSO.registrar({
  id: "js-04",
  titulo: "Changing the page (DOM)",
  xp: 40,
  objetivo: "You'll know how to change the text, style and classes of any element on the page from JavaScript.",
  glosario: [
    { termino: "classList.add / remove / toggle", tema: "DOM", para: "Adds, removes or toggles a class (better than touching `style`).", ejemplo: "menu.classList.toggle(\"open\");", buscar: "class add remove toggle" },
    { termino: "classList.contains()", tema: "DOM", para: "Does it have that class? Gives `true` or `false`.", ejemplo: "if (menu.classList.contains(\"open\")) {\n  console.log(\"open\");\n}", buscar: "has class check" },
    { termino: "setAttribute()", tema: "DOM", para: "Changes an attribute, like `aria-expanded`.", ejemplo: "button.setAttribute(\"aria-expanded\", \"true\");", buscar: "attribute aria expanded accessibility" },
    { termino: "element.style", tema: "DOM", para: "Changes a style directly (for one-off cases).", ejemplo: "box.style.color = \"teal\";", buscar: "css style from js" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Change the text",
      texto: "In the previous lesson you **read** the text with `textContent`. To **change it**, use `=`, the same as when storing something in a variable:\n\n`status.textContent = \"⚡ Coding away!\";`\n\nIt reads: \"store this new text as the content of `status`\". The old text disappears and the page updates right away. ✨\n\nYour HTML file doesn't change: the tree (the DOM) the browser keeps in memory changes. That's why, if you reload, everything runs again from the start. In the example, the console shows the text before and after the change.",
      ejemplo: {
        html: `<h1>Tagui</h1>
<p id="status">😴 Sleeping…</p>`,
        js: `const status = document.querySelector("#status");
console.log(status.textContent);

status.textContent = "⚡ Coding away!";
console.log(status.textContent);`
      },
      consejo: "With `textContent` everything you write shows up as text. If you put `<b>hi</b>`, you'll see the tags written as they are, not bold text."
    },
    {
      tipo: "ejercicio",
      enunciado: "You beat the level! 🕹️ Update the scoreboard. The HTML is already written.\n\n• Change the `textContent` of `#scoreboard` to **Score: 100**.\n• Change the `textContent` of `.message` to **Level passed!**",
      cssBase: `body { font-family: monospace; text-align: center; color: #f8f9fa; background-color: #212529; }
#scoreboard { color: #ffd43b; }
.message { font-size: 20px; }`,
      inicial: {
        html: `<h1 id="scoreboard">Score: 0</h1>
<p class="message">Press start to play</p>
`,
        js: ""
      },
      solucion: {
        html: `<h1 id="scoreboard">Score: 0</h1>
<p class="message">Press start to play</p>
`,
        js: `const scoreboard = document.querySelector("#scoreboard");
scoreboard.textContent = "Score: 100";

const message = document.querySelector(".message");
message.textContent = "Level passed!";
`
      },
      pistas: [
        "First find each element with querySelector (# for the id, a dot for the class) and store it in a constant. Then, give its .textContent the new text with =.",
        "It should look like this:\nconst scoreboard = document.querySelector(\"#scoreboard\");\nscoreboard.textContent = \"Score: 100\";\nconst message = document.querySelector(\".message\");\nmessage.textContent = \"Level passed!\";"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Change the style with style",
      texto: "Each element has a `style` with all the CSS properties. To change one:\n\n`title.style.color = \"white\";`\n\nTwo important details:\n\n• Properties with a hyphen are written **joined** and with the second word in **capitals**: `background-color` becomes `backgroundColor`, and `font-size` becomes `fontSize`. (In JavaScript, the hyphen means \"subtract\".)\n• The value is a **text**: it goes in quotes and with its units, `\"40px\"`.\n\nThis puts a style **inline** on the element, like the HTML `style` attribute.",
      ejemplo: {
        html: `<h1 id="title">Superheroes</h1>`,
        js: `const title = document.querySelector("#title");
title.style.color = "white";
title.style.backgroundColor = "crimson";
title.style.fontSize = "40px";
title.style.padding = "10px";`
      },
      consejo: "Did you set a size and nothing happens? Check if you forgot the unit: `\"40\"` doesn't work, `\"40px\"` does."
    },
    {
      tipo: "explicacion",
      titulo: "Add and remove classes with classList",
      texto: "Each element has a `classList`: the list of its classes. With it you can:\n\n• `classList.add(\"done\")`: **add** the class.\n• `classList.remove(\"done\")`: **remove it**.\n• `classList.toggle(\"done\")`: if it doesn't have it, it adds it; if it has it, it removes it. Like a **light switch** 💡.\n\nEach class's look is written in the **CSS**, as always. JavaScript only decides which classes each element carries.\n\nFor the `<body>`, `document.querySelector(\"body\")` works (or the shortcut `document.body`).",
      ejemplo: {
        html: `<ul>
  <li id="task1">Walk the dog</li>
  <li id="task2" class="done">Go grocery shopping</li>
  <li id="task3">Water the plants</li>
</ul>`,
        css: `.done {
  text-decoration: line-through;
  color: gray;
}
.important {
  color: crimson;
  font-weight: bold;
}`,
        js: `const task1 = document.querySelector("#task1");
task1.classList.add("important");

const task2 = document.querySelector("#task2");
task2.classList.remove("done");

const task3 = document.querySelector("#task3");
task3.classList.toggle("done");`
      },
      consejo: "In `classList` the class name goes **without the dot**: `add(\"done\")`, not `add(\".done\")`. The dot only goes in the selectors."
    },
    {
      tipo: "explicacion",
      titulo: "style or classes?",
      texto: "With `style` and with `classList` you change the look. So which should you use? Professionals prefer **classes** almost always:\n\n• **Everything in its place**: the look stays in the CSS and JavaScript only says \"now wear these clothes\". 👕\n• **Many properties at once**: one class changes color, background and border with a single line of JS.\n• **Easier to change**: if tomorrow you want another color, you change it in the CSS without touching the JavaScript.\n• **Everything from CSS keeps working**: `:hover`, transitions, media queries…\n\n`style` is left for values the program calculates itself, like moving something to an exact position.",
      consejo: "Think of the classes as outfits already prepared in the closet (the CSS). JavaScript doesn't sew clothes: it only picks which outfit to wear."
    },
    {
      tipo: "explicacion",
      titulo: "Changing attributes: setAttribute",
      texto: "The HTML **attributes** (`src`, `alt`, `href`…) can also be read and changed:\n\n• `element.getAttribute(\"src\")`: **reads** the value of an attribute.\n• `element.setAttribute(\"src\", \"dog.svg\")`: **puts** a new value on it.\n\nA very important use: `aria-expanded`. It's an attribute that tells **screen readers** whether a dropdown menu is open (`\"true\"`) or closed (`\"false\"`). Someone who can't see the screen doesn't know whether the menu just opened… unless you tell them! 🦻\n\nIn the example, JavaScript changes the photo to a dog's and marks the menu button as open. Check the console.",
      ejemplo: {
        html: `<button id="menu" aria-expanded="false">☰ Menu</button>
<p><img id="photo" src="recursos/img/gato.svg" alt="An orange cat's face" width="160" height="120"></p>`,
        js: `const photo = document.querySelector("#photo");
photo.setAttribute("src", "recursos/img/perro.svg");
photo.setAttribute("alt", "A dog");

const button = document.querySelector("#menu");
console.log("Before:", button.getAttribute("aria-expanded"));
button.setAttribute("aria-expanded", "true");
console.log("After:", button.getAttribute("aria-expanded"));`
      },
      consejo: "When you change an image with `src`, change its `alt` too: otherwise the screen reader would keep describing the previous photo."
    },
    {
      tipo: "ejercicio",
      enunciado: "Announce the deal of the day 🍕. The HTML is already written and the CSS of the classes is already prepared.\n\n• Find `#offer` and give it `color: crimson` with `style`.\n• Find `#card` and remove the `hidden` class with `classList.remove`.\n• To that same `#card`, add the `featured` class with `classList.add`.",
      cssBase: `body { font-family: sans-serif; }
.card { padding: 16px; border-radius: 12px; background-color: #fff3bf; }
.hidden { display: none; }
.featured { border: 3px dashed tomato; font-weight: bold; }`,
      inicial: {
        html: `<h2 id="offer">Deal of the day</h2>
<div id="card" class="card hidden">Margherita pizza at half price</div>
`,
        js: ""
      },
      solucion: {
        html: `<h2 id="offer">Deal of the day</h2>
<div id="card" class="card hidden">Margherita pizza at half price</div>
`,
        js: `const offer = document.querySelector("#offer");
offer.style.color = "crimson";

const card = document.querySelector("#card");
card.classList.remove("hidden");
card.classList.add("featured");
`
      },
      pistas: [
        "You need two elements: store #offer and #card in constants. To the first one, style.color with the value in quotes. To the second one, classList.remove and classList.add, each one with the class name in quotes and without the dot.",
        "It should look like this:\nconst offer = document.querySelector(\"#offer\");\noffer.style.color = \"crimson\";\nconst card = document.querySelector(\"#card\");\ncard.classList.remove(\"hidden\");\ncard.classList.add(\"featured\");"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Why is classList usually preferred over style for changing the look?",
      opciones: [
        "Because the look stays in the CSS and JavaScript only adds or removes the class",
        "Because style doesn't work in modern browsers",
        "Because with classList you don't need to write CSS"
      ],
      correcta: 0,
      explicacion: "Both work, but with classes everything is in its place: the CSS defines what each class looks like and JavaScript only decides when to put it on. That way it's easier to maintain and :hover and transitions keep working."
    },
    {
      tipo: "reto",
      enunciado: "Get your diary ready for reading at night 🌙. The HTML is already written and in the CSS tab you already have the look of the `night-mode` class. You, in the JS tab:\n\n1. Change the `<h1>` heading's text to something else (for example, **Ana's diary**).\n2. Give the heading a color with `style.color` (try `gold`).\n3. Add the `night-mode` class to the `<body>`.",
      inicial: {
        html: `<h1>My diary</h1>
<p>Today I learned to change the page with JavaScript.</p>
<p>Tomorrow I'll learn to make functions.</p>
`,
        css: `/* The night-mode look is already prepared */
body {
  font-family: sans-serif;
  padding: 16px;
  transition: background-color 0.5s, color 0.5s;
}

.night-mode {
  background-color: #1e1b4b;
  color: #e0e7ff;
}
`,
        js: `// 1. Change the heading's text

// 2. Give the heading a color with style

// 3. Add the night-mode class to the body

`
      },
      comprobaciones: [
        {
          texto: "The `<h1>` heading has new text, changed with `textContent`",
          prueba: (doc) => {
            const t = doc.querySelector("h1")?.textContent.trim() || "";
            const codigo = PRUEBA.codigo(doc);
            return t.length > 0 && t !== "My diary" && /\.textContent\s*=/.test(codigo);
          }
        },
        {
          texto: "The heading has a color set with `style`",
          prueba: (doc) => (doc.querySelector("h1")?.style.color || "") !== ""
        },
        {
          texto: "The `<body>` has the `night-mode` class",
          prueba: (doc) => !!doc.body?.classList.contains("night-mode")
        }
      ],
      pistas: [
        "Find the heading with querySelector(\"h1\") and the body with querySelector(\"body\"). Change the heading's .textContent and .style.color; on the body, use classList.add with the class name (without the dot).",
        "For example:\nconst title = document.querySelector(\"h1\");\ntitle.textContent = \"Ana's diary\";\ntitle.style.color = \"gold\";\nconst body = document.querySelector(\"body\");\nbody.classList.add(\"night-mode\");"
      ],
      solucion: {
        html: `<h1>My diary</h1>
<p>Today I learned to change the page with JavaScript.</p>
<p>Tomorrow I'll learn to make functions.</p>
`,
        css: `/* The night-mode look is already prepared */
body {
  font-family: sans-serif;
  padding: 16px;
  transition: background-color 0.5s, color 0.5s;
}

.night-mode {
  background-color: #1e1b4b;
  color: #e0e7ff;
}
`,
        js: `// 1. Change the heading's text
const title = document.querySelector("h1");
title.textContent = "Ana's diary";

// 2. Give the heading a color with style
title.style.color = "gold";

// 3. Add the night-mode class to the body
const body = document.querySelector("body");
body.classList.add("night-mode");
`
      }
    }
  ]
});
