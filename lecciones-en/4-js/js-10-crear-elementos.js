/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-10
   Crear elementos desde JS — document.createElement(), poner
   texto y clases al elemento nuevo, append(), pintar un array de
   datos, crear elementos al pulsar un botón (con campo.value) y
   remove().
   Notas:
   - innerHTML solo aparece como advertencia (consejo): con texto
     que escribe el usuario es peligroso. Las soluciones usan
     createElement + textContent.
   - El reto NO usa <form> ni submit (eso llega en js-11): es un
     campo y un botón con click. El caso «campo vacío» repasa if
     de js-07 con campo.value === "" (el .trim() llega en js-11).
   - Cuidado: los ${…} de los ejemplos van escapados (\${…}).
   ============================================================ */
CURSO.registrar({
  id: "js-10",
  titulo: "Creating elements from JS",
  xp: 45,
  objetivo: "You'll learn how to build new tags from JavaScript, place them on the page, paint a list from an array, and remove elements.",
  glosario: [
    { termino: "document.createElement()", tema: "Creating elements", para: "Builds a new tag (still outside the page).", ejemplo: "const card = document.createElement(\"article\");", buscar: "create new tag element" },
    { termino: "append()", tema: "Creating elements", para: "Puts an element inside another one, at the end.", ejemplo: "list.append(card);", buscar: "put add inside page" },
    { termino: "remove()", tema: "Creating elements", para: "Takes an element off the page.", ejemplo: "notice.remove();", buscar: "remove delete element" },
    { termino: "painting a list", tema: "Creating elements", para: "Empty the container and create one element per piece of data.", ejemplo: "list.textContent = \"\";\nfor (const appointment of appointments) {\n  const li = document.createElement(\"li\");\n  li.textContent = appointment.date;\n  list.append(li);\n}", buscar: "paint repaint show data" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Build a new tag",
      texto: "Until now you were changing elements that were already in the HTML. Now you're going to **build** them! It's three steps, like with a LEGO piece 🧱:\n\n1. **Create** the piece: `document.createElement(\"li\")` builds a new `<li>`.\n2. **Prepare it**: give it text with `textContent` and, if you want, classes with `classList.add`.\n3. **Fit it in**: `list.append(li)` puts it at the **end** of `list`.\n\nUntil step 3, the tag exists but it's “in midair”: you can't see it on the page.",
      ejemplo: {
        html: `<h3>🛒 Shopping list</h3>
<ul id="shopping">
  <li>Bread</li>
</ul>`,
        js: `const shopping = document.querySelector("#shopping");

const newItem = document.createElement("li");
newItem.textContent = "Milk";
shopping.append(newItem);

console.log(shopping);`
      },
      consejo: "On the internet you'll see `innerHTML` used to insert HTML written as text. Careful! If that text is written by the user, someone could sneak in malicious code. With `createElement` and `textContent` you always play it safe."
    },
    {
      tipo: "ejercicio",
      enunciado: "Write on your wall 📝 from JavaScript. The HTML already has an empty `<div id=\"wall\">`. Inside it, using `createElement` and `append`, in this order:\n\n• Create an `<h2>` with the text **Hello from JS**.\n• Create a `<p>` with the text **This paragraph was made by me** and the class `note`.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
#wall { min-height: 60px; padding: 12px; border: 3px dashed #9b8ce0; border-radius: 12px; }
#wall h2 { margin-top: 0; color: #4b3fa0; }
.note { padding: 8px 12px; background-color: #fff3a8; border-radius: 6px; transform: rotate(-1deg); }`,
      inicial: {
        html: `<div id="wall"></div>
`,
        js: ""
      },
      solucion: {
        html: `<div id="wall"></div>
`,
        js: `const wall = document.querySelector("#wall");

const title = document.createElement("h2");
title.textContent = "Hello from JS";
wall.append(title);

const paragraph = document.createElement("p");
paragraph.textContent = "This paragraph was made by me";
paragraph.classList.add("note");
wall.append(paragraph);
`
      },
      pistas: [
        "Repeat the three steps twice: createElement, textContent (and classList.add for the paragraph) and wall.append(…). Do the title first, so it ends up on top.",
        "It should look like this:\nconst wall = document.querySelector(\"#wall\");\n\nconst title = document.createElement(\"h2\");\ntitle.textContent = \"Hello from JS\";\nwall.append(title);\n\nconst paragraph = document.createElement(\"p\");\nparagraph.textContent = \"This paragraph was made by me\";\nparagraph.classList.add(\"note\");\nwall.append(paragraph);"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Paint an array on the page",
      texto: "Here all the pieces you know come together: an **array** with data, a **loop** that goes through it and, on each lap, the **three steps** to build an element.\n\nThis is how almost every website works: the data (products, messages, songs…) arrives in an array, and JavaScript builds a tag for each one. If tomorrow the array has 50 pieces of data, the page will have 50 elements without touching the HTML. ✨",
      ejemplo: {
        html: `<h3>🪐 Rocky planets</h3>
<ul id="planets"></ul>`,
        js: `const planets = ["Mercury", "Venus", "Earth", "Mars"];
const list = document.querySelector("#planets");

for (const planet of planets) {
  const li = document.createElement("li");
  li.textContent = planet;
  list.append(li);
}

console.log(\`I painted \${planets.length} planets\`);`
      },
      consejo: "Create the `li` **inside** the loop: you need a new tag on each lap. If you create it outside, there is only one, and `append` would keep moving it around."
    },
    {
      tipo: "ejercicio",
      enunciado: "Paint the recipe's ingredients 🥞. The HTML already has an empty list `<ul id=\"recipe\">`.\n\n• Create an array `ingredients` with **Flour**, **Eggs**, **Milk** and **Sugar**, in that order.\n• Go through it with a loop and, for each ingredient, create an `<li>` with its name and add it to `#recipe`.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
#recipe { padding: 12px 12px 12px 36px; background-color: #fff4e0; border-radius: 12px; font-size: 18px; }
#recipe li { margin: 4px 0; }`,
      inicial: {
        html: `<h3>Pancakes for 4</h3>
<ul id="recipe"></ul>
`,
        js: ""
      },
      solucion: {
        html: `<h3>Pancakes for 4</h3>
<ul id="recipe"></ul>
`,
        js: `const ingredients = ["Flour", "Eggs", "Milk", "Sugar"];
const recipe = document.querySelector("#recipe");

for (const ingredient of ingredients) {
  const li = document.createElement("li");
  li.textContent = ingredient;
  recipe.append(li);
}
`
      },
      pistas: [
        "Write the array, save the list with querySelector and use for (const ingredient of ingredients) { … }. Inside: createElement(\"li\"), textContent and append.",
        "It should look like this:\nconst ingredients = [\"Flour\", \"Eggs\", \"Milk\", \"Sugar\"];\nconst recipe = document.querySelector(\"#recipe\");\n\nfor (const ingredient of ingredients) {\n  const li = document.createElement(\"li\");\n  li.textContent = ingredient;\n  recipe.append(li);\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Create when a button is clicked",
      texto: "The most fun part: letting the user add things. You combine an **event** with the three steps:\n\n1. When the button is clicked, you read what was typed with `field.value`.\n2. You build the element with that text and fit it in with `append`.\n3. You empty the field with `field.value = \"\";` so it's ready for the next one.\n\nAnd if the field is empty, better not to add anything: that's what the `if` is for. Write in the result and press **Sign**. ✍️",
      ejemplo: {
        html: `<h3>📖 Guest book</h3>
<input id="signature" type="text">
<button id="sign">Sign</button>
<ul id="visits"></ul>`,
        js: `const field = document.querySelector("#signature");
const visits = document.querySelector("#visits");

document.querySelector("#sign").addEventListener("click", () => {
  if (field.value === "") {
    console.log("You didn't write anything");
  } else {
    const li = document.createElement("li");
    li.textContent = field.value;
    visits.append(li);
    field.value = "";
  }
});`
      }
    },
    {
      tipo: "explicacion",
      titulo: "Removing elements: remove()",
      texto: "Just like they're added, they're removed. Any element has the order `remove()`: `notice.remove();` deletes it from the page, with everything inside it.\n\nIt's what the ✖ on ads and notifications does, or a to-do's delete button. Press **Close** in the result.\n\nCareful: it only disappears from the page you see now. If you reload, it comes back, because the original HTML hasn't changed. (There's a lesson later on remembering things across reloads. 😉)",
      ejemplo: {
        html: `<div id="notice">
  🍪 This website uses chocolate cookies.
  <button id="close">Close ✖</button>
</div>
<p>Page content.</p>`,
        css: `#notice { padding: 10px; background-color: #fff3cd; border-radius: 8px; }`,
        js: `const notice = document.querySelector("#notice");

document.querySelector("#close").addEventListener("click", () => {
  notice.remove();
  console.log("Notice closed");
});`
      }
    },
    {
      tipo: "ejercicio",
      enunciado: "Make the game's ad closable 🎉. The HTML is already written.\n\nWhen the `#close` button is clicked, remove the whole `#ad` element from the page (with its button inside) using `remove()`.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
#ad { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 12px 16px; background-color: #4b3fa0; color: white; border-radius: 12px; font-size: 18px; }
#close { padding: 6px 12px; border: none; border-radius: 8px; background-color: white; color: #4b3fa0; font-weight: bold; }`,
      inicial: {
        html: `<div id="ad">
  <p>🎉 Level 2 unlocked!</p>
  <button id="close">✖</button>
</div>
<h2>World map</h2>
`,
        js: ""
      },
      solucion: {
        html: `<div id="ad">
  <p>🎉 Level 2 unlocked!</p>
  <button id="close">✖</button>
</div>
<h2>World map</h2>
`,
        js: `const ad = document.querySelector("#ad");

document.querySelector("#close").addEventListener("click", () => {
  ad.remove();
});
`
      },
      acciones: [{ clic: "#close" }],
      pistas: [
        "Save #ad in a constant and, inside #close's click addEventListener, call its remove().",
        "It should look like this:\nconst ad = document.querySelector(\"#ad\");\n\ndocument.querySelector(\"#close\").addEventListener(\"click\", () => {\n  ad.remove();\n});"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "A Remove button on each element",
      texto: "What if every element in a list needs **its own** delete button, like to-dos or appointments? As you build each `<li>` in the loop, you also build its button and give it **its own listener**:\n\n1. You create the `li` and the `button`.\n2. You tell the button: “when someone clicks you, remove **your** `li`” → `li.remove()`.\n3. You put the button **inside** the `li` with `li.append(button)`, and the `li` in the list.\n\nEach button remembers which `li` is its own, because both were created in the same lap of the loop. 🪄\n\nAnd a trick for when you're going to paint a whole list again: empty it first with `list.textContent = \"\";`, otherwise the elements would pile up repeated.",
      ejemplo: {
        html: `<ul id="toys"></ul>`,
        js: `const toys = ["Ball", "Plush", "Rope"];
const list = document.querySelector("#toys");

for (const toy of toys) {
  const li = document.createElement("li");
  li.textContent = toy + " ";

  const button = document.createElement("button");
  button.textContent = "Remove";
  button.addEventListener("click", () => {
    li.remove();
  });

  li.append(button);
  list.append(li);
}`
      }
    },
    {
      tipo: "ejercicio",
      enunciado: "Make the shopping list 🛒. The HTML already has the `#shopping` list, empty. In the JS tab:\n\n1. Create an array `products` with **Milk**, **Bread** and **Eggs**.\n2. Go through it with `for…of` and, for each product, create an `<li>` with its name (and a space after it).\n3. Inside each `<li>`, a `<button>` that says **Remove** and, when clicked, removes its `<li>` with `remove()`.\n\nThe checker will click the first **Remove**: the milk has to disappear.",
      inicial: {
        html: `<ul id="shopping"></ul>
`,
        js: ""
      },
      solucion: {
        html: `<ul id="shopping"></ul>
`,
        js: `const products = ["Milk", "Bread", "Eggs"];
const shopping = document.querySelector("#shopping");

for (const product of products) {
  const li = document.createElement("li");
  li.textContent = product + " ";

  const button = document.createElement("button");
  button.textContent = "Remove";
  button.addEventListener("click", () => {
    li.remove();
  });

  li.append(button);
  shopping.append(li);
}
`
      },
      acciones: [{ clic: "#shopping button" }],
      pistas: [
        "It's like the toys example: inside the for…of you create the li and the button, you give the button an addEventListener that does li.remove(), and at the end li.append(button) and shopping.append(li).",
        "It should look like this:\nconst products = [\"Milk\", \"Bread\", \"Eggs\"];\nconst shopping = document.querySelector(\"#shopping\");\n\nfor (const product of products) {\n  const li = document.createElement(\"li\");\n  li.textContent = product + \" \";\n\n  const button = document.createElement(\"button\");\n  button.textContent = \"Remove\";\n  button.addEventListener(\"click\", () => {\n    li.remove();\n  });\n\n  li.append(button);\n  shopping.append(li);\n}"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "You wrote `const li = document.createElement(\"li\");` and `li.textContent = \"Kiwi\";`, but the Kiwi doesn't show up in the list. What's missing?",
      opciones: [
        "Fit it into the list with append, for example list.append(li)",
        "Writing the <li> in the HTML too",
        "Nothing: it takes a while to show up"
      ],
      correcta: 0,
      explicacion: "createElement builds the tag, but it stays “in midair” until you put it on the page with append."
    },
    {
      tipo: "reto",
      enunciado: "Build your **playlist** 🎧. The songs are already in the `songs` array.\n\n1. On load, paint each song from the array as an `<li>` inside `#playlist`.\n2. When `#add` is clicked, create an `<li>` with what was typed in `#song` and add it **at the end** of the list.\n3. After adding it, leave the field empty.\n4. If the field is empty when clicked, don't add anything.",
      cssBase: `body { font-family: sans-serif; display: flex; justify-content: center; padding-top: 16px; background-color: #121826; color: white; }
.player { width: 320px; padding: 20px; border-radius: 16px; background-color: #1f2a40; }
.player h2 { margin-top: 0; }
#playlist { padding-left: 24px; }
#playlist li { padding: 6px 0; border-bottom: 1px solid #33415c; }
label { display: block; margin: 12px 0 6px; }
input { padding: 8px; font-size: 16px; border-radius: 8px; border: none; }
button { padding: 9px 14px; font-size: 16px; border: none; border-radius: 8px; background-color: #1db954; color: white; font-weight: bold; }`,
      inicial: {
        html: `<section class="player">
  <h2>🎧 My playlist</h2>
  <ul id="playlist"></ul>
  <label for="song">New song:</label>
  <input id="song" type="text">
  <button id="add">Add</button>
</section>
`,
        js: `const songs = ["The cat cumbia", "The dinosaur rock", "The little moon ballad"];
const list = document.querySelector("#playlist");
const field = document.querySelector("#song");

// 1. Paint each song from the array as an <li> inside the list


// 2. When #add is clicked:
//    - if the field is empty, do nothing
//    - otherwise, create an <li> with what was typed, add it to the list, and empty the field
`
      },
      comprobaciones: [
        {
          texto: "On load, `#playlist` has one `<li>` per song in the array (3), in the same order",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const lis = [...v.doc.querySelectorAll("#playlist li")].map(li => li.textContent);
            return lis.length === 3 && lis[0].includes("The cat cumbia")
              && lis[1].includes("The dinosaur rock") && lis[2].includes("The little moon ballad");
          }
        },
        {
          texto: "When you type a song and press **Add**, it appears at the end of the list",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const field = v.doc.querySelector("#song");
            const button = v.doc.querySelector("#add");
            if (!field || !button) return false;
            const before = v.doc.querySelectorAll("#playlist li").length;
            PRUEBA.escribir(field, "Dancing with my dog");
            button.click();
            const lis = v.doc.querySelectorAll("#playlist li");
            return lis.length === before + 1 && lis[lis.length - 1].textContent.includes("Dancing with my dog");
          }
        },
        {
          texto: "After adding it, the field is left empty",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const field = v.doc.querySelector("#song");
            const button = v.doc.querySelector("#add");
            if (!field || !button) return false;
            const before = v.doc.querySelectorAll("#playlist li").length;
            PRUEBA.escribir(field, "The penguin tango");
            button.click();
            return v.doc.querySelectorAll("#playlist li").length === before + 1 && field.value === "";
          }
        },
        {
          texto: "If you press **Add** with the field empty, the list doesn't change",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const field = v.doc.querySelector("#song");
            const button = v.doc.querySelector("#add");
            if (!field || !button) return false;
            // First it checks that the button works, so that "never do anything" isn't enough
            PRUEBA.escribir(field, "The turtle waltz");
            button.click();
            const before = v.doc.querySelectorAll("#playlist li").length;
            if (before === 0) return false;
            PRUEBA.escribir(field, "");
            button.click();
            return v.doc.querySelectorAll("#playlist li").length === before;
          }
        }
      ],
      pistas: [
        "For point 1, copy the ingredients idea: a for…of over songs that creates an li on each lap. For the rest, an addEventListener on #add with an if (field.value === \"\") { … } else { … }: in the else, the three steps (createElement, textContent, append) and field.value = \"\".",
        "It should look like this:\nfor (const song of songs) {\n  const li = document.createElement(\"li\");\n  li.textContent = song;\n  list.append(li);\n}\n\ndocument.querySelector(\"#add\").addEventListener(\"click\", () => {\n  if (field.value === \"\") {\n    console.log(\"Write a song\");\n  } else {\n    const li = document.createElement(\"li\");\n    li.textContent = field.value;\n    list.append(li);\n    field.value = \"\";\n  }\n});"
      ],
      solucion: {
        html: `<section class="player">
  <h2>🎧 My playlist</h2>
  <ul id="playlist"></ul>
  <label for="song">New song:</label>
  <input id="song" type="text">
  <button id="add">Add</button>
</section>
`,
        js: `const songs = ["The cat cumbia", "The dinosaur rock", "The little moon ballad"];
const list = document.querySelector("#playlist");
const field = document.querySelector("#song");

for (const song of songs) {
  const li = document.createElement("li");
  li.textContent = song;
  list.append(li);
}

document.querySelector("#add").addEventListener("click", () => {
  if (field.value === "") {
    console.log("Write a song");
  } else {
    const li = document.createElement("li");
    li.textContent = field.value;
    list.append(li);
    field.value = "";
  }
});
`
      }
    }
  ]
});
