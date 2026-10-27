/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-12 (inglés)
   Guardar datos: localStorage — setItem, getItem (null si no hay
   nada), removeItem, que solo guarda texto, y JSON con
   JSON.stringify() / JSON.parse() para objetos y arrays.
   Notas:
   - El resultado tiene un localStorage «de práctica» (js/editor.js):
     sobrevive a 🔄 Recargar y a los cambios del código. Se explica
     en una frase y se invita a usar 🔄 Recargar para comprobarlo.
   - En las revisiones de ejercicios el localStorage empieza vacío y
     solo se comparan página y consola: por eso las soluciones
     muestran lo leído (en la página o en la consola).
   - El ejercicio de JSON distingue quien olvida JSON.parse: sin él,
     .length cuenta letras y for…of recorre letras, no cosas.
   - El reto empieza cada comprobación con
     PRUEBA.recargar(doc, { borrarDatos: true }) (si no, la copia
     compartiría el almacén con la página del reto) y después usa
     PRUEBA.recargar(v.doc) para ver si «se acuerda».
   - El JS de ejemplos y soluciones no usa plantillas de texto.
   ============================================================ */
CURSO.registrar({
  id: "js-12",
  titulo: "Saving data: localStorage",
  xp: 45,
  objetivo: "You'll know how to save data in the browser with localStorage so your page remembers it even after reloading.",
  glosario: [
    { termino: "localStorage.setItem / getItem", tema: "Saving data", para: "Saves and reads a text in the browser: it's still there after reloading.", ejemplo: "localStorage.setItem(\"huellas-appointments\", text);\nconst saved = localStorage.getItem(\"huellas-appointments\");", buscar: "save remember browser reload" },
    { termino: "JSON.stringify / JSON.parse", tema: "Saving data", para: "Turns an array or object into text to save it, and the other way around.", ejemplo: "localStorage.setItem(\"huellas-appointments\", JSON.stringify(appointments));\nlet appointments = JSON.parse(localStorage.getItem(\"huellas-appointments\")) || [];", buscar: "json text convert save array" },
    { termino: "removeItem()", tema: "Saving data", para: "Deletes what's saved under that name.", ejemplo: "localStorage.removeItem(\"huellas-appointments\");", buscar: "delete forget" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "A memory that doesn't get erased",
      texto: "When you reload a page, its variables get wiped like a whiteboard. 🧽 To remember something, the browser has a **drawer with labels**: `localStorage`.\n\n• `localStorage.setItem(\"key\", \"value\")` saves a value with its label (the **key**).\n• `localStorage.getItem(\"key\")` reads it.\n\nWhat you save stays in that browser even if you close the tab. It only saves **texts**.\n\nIn this course, the result has its own **practice** localStorage: it works just like the real one and survives the **🔄 Reload** button. The console lets you know with “💾 1 saved item” and a button to delete it.\n\nLook at the console and press **🔄 Reload**: the second time it remembers!",
      ejemplo: {
        js: `const before = localStorage.getItem("pet");
console.log("What I had saved: " + before);

localStorage.setItem("pet", "Whiskers");
console.log("Now I've saved: " + localStorage.getItem("pet"));`
      },
      consejo: "The first time it shows `null`: in JavaScript it means “nothing, empty”. There was nothing in the drawer with the \"pet\" label yet!"
    },
    {
      tipo: "explicacion",
      titulo: "Is anything saved? null and removeItem",
      texto: "If you ask for a key that doesn't exist, `getItem` returns `null`. That's how you know if it's the **first visit**:\n\n`if (saved === null) { … } else { … }`\n\nTo **delete** a key from the drawer: `localStorage.removeItem(\"key\")`.\n\nIn the example, a function `show()` reads the drawer and writes the greeting. It's called at the start and after each button. Try it: press **Remember**, then **🔄 Reload**… and then **Forget** and **🔄 Reload** again.",
      ejemplo: {
        html: `<p id="greeting"></p>
<button id="save">Remember Tagui</button>
<button id="forget">Forget</button>`,
        js: `const greeting = document.querySelector("#greeting");

function show() {
  const friend = localStorage.getItem("friend");
  if (friend === null) {
    greeting.textContent = "I don't remember anyone 🤷";
  } else {
    greeting.textContent = "I remember " + friend + " 😊";
  }
}

document.querySelector("#save").addEventListener("click", () => {
  localStorage.setItem("friend", "Tagui");
  show();
});

document.querySelector("#forget").addEventListener("click", () => {
  localStorage.removeItem("friend");
  show();
});

show();`
      },
      consejo: "localStorage isn't a secret place: anyone who uses that computer can see it. Never save passwords or private data there. 🔐"
    },
    {
      tipo: "ejercicio",
      enunciado: "Make the page remember your favorite animal 🐾. The HTML is already written.\n\n• **At the start**, read the `animal` key with `getItem`. If it's `null`, put the text **You haven't chosen an animal yet.** in `#favorite`. If there's something, put **Your favorite animal is: ** followed by what's saved.\n• **When** `#save` **is pressed**, save what's typed in `#field` with `setItem` under the `animal` key and put **Your favorite animal is: ** followed by what was typed in `#favorite`. With `penguin`: **Your favorite animal is: penguin**\n\nWhen it works, save one and press **🔄 Reload**: it'll remember it!",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
label { display: block; font-weight: bold; margin-bottom: 6px; }
input, button { font: inherit; padding: 8px; border-radius: 8px; }
input { border: 2px solid darkorange; }
button { border: none; background-color: darkorange; color: white; }
#favorite { font-size: 22px; color: #a34a00; }`,
      inicial: {
        html: `<label for="field">What's your favorite animal?</label>
<input id="field" type="text">
<button id="save">Save</button>
<p id="favorite"></p>
`,
        js: ""
      },
      solucion: {
        html: `<label for="field">What's your favorite animal?</label>
<input id="field" type="text">
<button id="save">Save</button>
<p id="favorite"></p>
`,
        js: `const field = document.querySelector("#field");
const favorite = document.querySelector("#favorite");

const saved = localStorage.getItem("animal");
if (saved === null) {
  favorite.textContent = "You haven't chosen an animal yet.";
} else {
  favorite.textContent = "Your favorite animal is: " + saved;
}

document.querySelector("#save").addEventListener("click", () => {
  localStorage.setItem("animal", field.value);
  favorite.textContent = "Your favorite animal is: " + field.value;
});
`
      },
      acciones: [
        { escribir: "#field", texto: "penguin" },
        { clic: "#save" }
      ],
      pistas: [
        "There are two parts. At the top, const saved = localStorage.getItem(\"animal\"); and an if / else that compares saved with null. Below, the button's addEventListener(\"click\", …) with setItem and the new text.",
        "It should look like this:\nconst field = document.querySelector(\"#field\");\nconst favorite = document.querySelector(\"#favorite\");\n\nconst saved = localStorage.getItem(\"animal\");\nif (saved === null) {\n  favorite.textContent = \"You haven't chosen an animal yet.\";\n} else {\n  favorite.textContent = \"Your favorite animal is: \" + saved;\n}\n\ndocument.querySelector(\"#save\").addEventListener(\"click\", () => {\n  localStorage.setItem(\"animal\", field.value);\n  favorite.textContent = \"Your favorite animal is: \" + field.value;\n});"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Saving objects and arrays: JSON",
      texto: "localStorage only saves **texts**. If you give it an object, it turns it into a useless `\"[object Object]\"` and you lose the data. 😱\n\nThe solution is called **JSON**: a way of writing objects and arrays as text. It's like a tent ⛺: you **fold** it to put it in your backpack and **unfold** it when you arrive.\n\n• `JSON.stringify(data)` → folds: turns the object or array into text.\n• `JSON.parse(text)` → unfolds: turns the text back into an object or array.\n\nLook at the console: the first line is the disaster; the others, how to do it right.",
      ejemplo: {
        js: `const player = { name: "Tagui", level: 3 };

localStorage.setItem("wrong", player);
console.log(localStorage.getItem("wrong"));

localStorage.setItem("player", JSON.stringify(player));
const text = localStorage.getItem("player");
console.log(text);

const recovered = JSON.parse(text);
console.log(recovered.name + " is on level " + recovered.level);`
      },
      consejo: "Easy rule: **stringify when saving, parse when reading**. Always as a pair, like socks. 🧦"
    },
    {
      tipo: "explicacion",
      titulo: "A list of objects that's remembered",
      texto: "What websites save most is a **list of things**: tasks, appointments, products in the cart… In other words, an **array of objects**. The recipe has three steps:\n\n1. **Load** at the start: `JSON.parse(localStorage.getItem(\"appointments\")) || []`. The first time nothing is saved, `getItem` gives `null`, and the `|| []` (“or, if not, an empty list”) makes you start with an empty array.\n2. **Change** the list: `appointments.push(newAppointment)`.\n3. **Save** the whole list again with `JSON.stringify`.\n\nThe example adds an appointment every time it runs. Look at the console: the list keeps growing!",
      ejemplo: {
        js: `let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

appointments.push({ pet: "Cat", time: "10:30" });
localStorage.setItem("appointments", JSON.stringify(appointments));

console.log("You have " + appointments.length + " saved appointments");
console.log(appointments);`
      },
      consejo: "**Always** save the whole list after changing it. If you do `push` and forget the `setItem`, the new appointment won't be there when you reload."
    },
    {
      tipo: "ejercicio",
      enunciado: "Save the adventurer's backpack 🎒. The HTML is already written and the JS brings the `items` array.\n\n1. Save `items` in localStorage under the `backpack` key, using `JSON.stringify`.\n2. Read the `backpack` key with `getItem` and show that text in the console.\n3. Turn it back into an array with `JSON.parse` and show in the console how many items it has with `.length` (**3**).\n4. With `for…of` over the recovered array, create an `<li>` for each item inside `#backpack`.",
      cssBase: `body { font-family: sans-serif; padding: 10px; background-color: #f5efe0; }
h2 { color: #6b4f1d; }
#backpack li { font-size: 20px; margin: 6px 0; }`,
      inicial: {
        html: `<h2>🎒 My backpack</h2>
<ul id="backpack"></ul>
`,
        js: `const items = ["sword", "potion", "map"];
`
      },
      solucion: {
        html: `<h2>🎒 My backpack</h2>
<ul id="backpack"></ul>
`,
        js: `const items = ["sword", "potion", "map"];

localStorage.setItem("backpack", JSON.stringify(items));

const text = localStorage.getItem("backpack");
console.log(text);

const recovered = JSON.parse(text);
console.log(recovered.length);

const list = document.querySelector("#backpack");
for (const item of recovered) {
  const li = document.createElement("li");
  li.textContent = item;
  list.append(li);
}
`
      },
      pistas: [
        "First setItem(\"backpack\", JSON.stringify(items)). Then store the getItem in a constant and console.log it. After that another constant with JSON.parse of that text: that's the one you go through with for…of (createElement, textContent and append).",
        "It should look like this:\nlocalStorage.setItem(\"backpack\", JSON.stringify(items));\n\nconst text = localStorage.getItem(\"backpack\");\nconsole.log(text);\n\nconst recovered = JSON.parse(text);\nconsole.log(recovered.length);\n\nconst list = document.querySelector(\"#backpack\");\nfor (const item of recovered) {\n  const li = document.createElement(\"li\");\n  li.textContent = item;\n  list.append(li);\n}"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "You do `localStorage.setItem(\"player\", player)` with an object, without `JSON.stringify`. What gets saved?",
      opciones: [
        "The text \"[object Object]\": the data is lost",
        "The whole object, perfect to read later",
        "Nothing: localStorage throws an error and the page stops"
      ],
      correcta: 0,
      explicacion: "localStorage turns everything into text, and an object converted “roughly” ends up as \"[object Object]\". That's why you use JSON.stringify when saving and JSON.parse when reading."
    },
    {
      tipo: "reto",
      enunciado: "Make your **bird-watching notebook** 🐦: notes that are saved even if the page reloads. The HTML is already written.\n\n1. At the **start**, load the `sightings` key with `JSON.parse(...) || []` and draw each object in `#list` as `<li>Sparrow: 3</li>` (with `createElement`, like in js-10).\n2. When the `#form` form is **submitted** (stop the submission): create an object `{ species, count }` with the species using `trim()` and the count using `Number()`, `push` it to the array, save the whole list with `JSON.stringify` and draw `#list` again.\n3. When `#clear` (“Clear the notebook”) is pressed: delete the key with `removeItem(\"sightings\")`, empty the array and leave `#list` empty.\n\nTest it for real: write down a sighting and press **🔄 Reload**. The page remembers. 🧠",
      cssBase: `body { font-family: sans-serif; display: flex; justify-content: center; padding-top: 20px; background-color: #e8f4fd; }
.card { width: 320px; padding: 20px; background-color: white; border-radius: 16px; box-shadow: 0 2px 10px rgb(0 0 0 / 0.1); text-align: center; }
h2 { margin: 0 0 12px; color: #1c5d99; }
form { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
label { width: 100%; font-weight: bold; }
input, button { font: inherit; padding: 8px; border-radius: 8px; }
input { border: 2px solid #8cc0eb; }
button { border: none; background-color: #1c5d99; color: white; }
#list { text-align: left; padding-left: 24px; margin: 14px 0; }
#list li { margin: 4px 0; }
#clear { margin-top: 16px; background-color: transparent; color: #1c5d99; text-decoration: underline; }`,
      inicial: {
        html: `<div class="card">
  <h2>Your bird-watching notebook 🐦</h2>
  <form id="form" novalidate>
    <label for="species">Species</label>
    <input id="species" type="text">
    <label for="count">Count</label>
    <input id="count" type="number">
    <button>Write down</button>
  </form>
  <ul id="list"></ul>
  <button id="clear" type="button">Clear the notebook</button>
</div>
`,
        js: `const form = document.querySelector("#form");
const speciesField = document.querySelector("#species");
const countField = document.querySelector("#count");
const list = document.querySelector("#list");
const clear = document.querySelector("#clear");

// 1. At the start: load the "sightings" key with JSON.parse(...) || []
//    and draw each object in #list with createElement (like in js-10)

// 2. When the form is submitted: stop the submission, create { species: ..., count: ... }
//    (species with trim(), count with Number()), push it, save with JSON.stringify and draw the list again

// 3. When "Clear the notebook" is pressed: removeItem("sightings"), empty the array and leave the list empty
`
      },
      comprobaciones: [
        {
          texto: "When you write down “Sparrow” and 3, an `<li>` that says “Sparrow” and “3” appears in `#list`",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc, { borrarDatos: true });
            PRUEBA.escribir(v.doc.querySelector("#species"), "Sparrow");
            PRUEBA.escribir(v.doc.querySelector("#count"), "3");
            v.doc.querySelector("#form")?.requestSubmit();
            const lis = Array.from(v.doc.querySelectorAll("#list li"));
            return lis.some(li => li.textContent.includes("Sparrow") && li.textContent.includes("3"));
          }
        },
        {
          texto: "The note is saved under the `sightings` key as an array with 1 object (its species is Sparrow and its count, 3)",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc, { borrarDatos: true });
            PRUEBA.escribir(v.doc.querySelector("#species"), "Sparrow");
            PRUEBA.escribir(v.doc.querySelector("#count"), "3");
            v.doc.querySelector("#form")?.requestSubmit();
            const data = JSON.parse(v.win.localStorage?.getItem("sightings") || "null");
            return Array.isArray(data) && data.length === 1 &&
                   data[0].species === "Sparrow" && Number(data[0].count) === 3;
          }
        },
        {
          texto: "Two notes stay in order and the species is cleaned with `trim()`: after reloading the 2 are still there",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc, { borrarDatos: true });
            PRUEBA.escribir(v.doc.querySelector("#species"), "Sparrow");
            PRUEBA.escribir(v.doc.querySelector("#count"), "3");
            v.doc.querySelector("#form")?.requestSubmit();
            PRUEBA.escribir(v.doc.querySelector("#species"), "  Blackbird  ");
            PRUEBA.escribir(v.doc.querySelector("#count"), "1");
            v.doc.querySelector("#form")?.requestSubmit();
            const v2 = await PRUEBA.recargar(v.doc);
            const texts = Array.from(v2.doc.querySelectorAll("#list li")).map(li => li.textContent);
            return texts.length === 2 &&
                   texts[0].includes("Sparrow") && texts[0].includes("3") &&
                   texts[1].includes("Blackbird") && texts[1].includes("1");
          }
        },
        {
          texto: "Starting from scratch gives no errors and the list starts empty; after writing one down and reloading, there's 1 `<li>`",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc, { borrarDatos: true });
            if (v.doc.querySelectorAll("#list li").length !== 0) return false;
            if ((v.win.__errores || []).length > 0) return false;
            PRUEBA.escribir(v.doc.querySelector("#species"), "Sparrow");
            PRUEBA.escribir(v.doc.querySelector("#count"), "3");
            v.doc.querySelector("#form")?.requestSubmit();
            const v2 = await PRUEBA.recargar(v.doc);
            return v2.doc.querySelectorAll("#list li").length === 1;
          }
        },
        {
          texto: "“Clear the notebook” empties everything: the `sightings` key disappears and `#list` is left empty, also after reloading",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc, { borrarDatos: true });
            PRUEBA.escribir(v.doc.querySelector("#species"), "Sparrow");
            PRUEBA.escribir(v.doc.querySelector("#count"), "3");
            v.doc.querySelector("#form")?.requestSubmit();
            v.doc.querySelector("#clear")?.click();
            if (v.win.localStorage?.getItem("sightings") !== null) return false;
            if (v.doc.querySelectorAll("#list li").length !== 0) return false;
            const v2 = await PRUEBA.recargar(v.doc);
            return v2.win.localStorage?.getItem("sightings") === null &&
                   v2.doc.querySelectorAll("#list li").length === 0;
          }
        }
      ],
      pistas: [
        "Three blocks: at the top, loading with let sightings = JSON.parse(localStorage.getItem(\"sightings\")) || []; and a function draw() that empties #list and adds an <li> for each object (createElement, textContent with species + \": \" + count, and append). Then, the addEventListener(\"submit\", …) with preventDefault, push, setItem and draw(). And the addEventListener(\"click\", …) on clear with removeItem, the list to [] and #list empty.",
        "It should look like this:\nlet sightings = JSON.parse(localStorage.getItem(\"sightings\")) || [];\n\nfunction draw() {\n  list.textContent = \"\";\n  for (const s of sightings) {\n    const li = document.createElement(\"li\");\n    li.textContent = s.species + \": \" + s.count;\n    list.append(li);\n  }\n}\ndraw();\n\nform.addEventListener(\"submit\", (event) => {\n  event.preventDefault();\n  sightings.push({ species: speciesField.value.trim(), count: Number(countField.value) });\n  localStorage.setItem(\"sightings\", JSON.stringify(sightings));\n  draw();\n});\n\nclear.addEventListener(\"click\", () => {\n  localStorage.removeItem(\"sightings\");\n  sightings = [];\n  list.textContent = \"\";\n});"
      ],
      solucion: {
        html: `<div class="card">
  <h2>Your bird-watching notebook 🐦</h2>
  <form id="form" novalidate>
    <label for="species">Species</label>
    <input id="species" type="text">
    <label for="count">Count</label>
    <input id="count" type="number">
    <button>Write down</button>
  </form>
  <ul id="list"></ul>
  <button id="clear" type="button">Clear the notebook</button>
</div>
`,
        js: `const form = document.querySelector("#form");
const speciesField = document.querySelector("#species");
const countField = document.querySelector("#count");
const list = document.querySelector("#list");
const clear = document.querySelector("#clear");

// 1. At the start: load the saved list (or an empty one) and draw it
let sightings = JSON.parse(localStorage.getItem("sightings")) || [];

function draw() {
  list.textContent = "";
  for (const sighting of sightings) {
    const li = document.createElement("li");
    li.textContent = sighting.species + ": " + sighting.count;
    list.append(li);
  }
}
draw();

// 2. When submitted: add the note, save the whole list and draw again
form.addEventListener("submit", (event) => {
  event.preventDefault();
  sightings.push({
    species: speciesField.value.trim(),
    count: Number(countField.value)
  });
  localStorage.setItem("sightings", JSON.stringify(sightings));
  draw();
});

// 3. "Clear the notebook": forget all the notes
clear.addEventListener("click", () => {
  localStorage.removeItem("sightings");
  sightings = [];
  list.textContent = "";
});
`
      }
    }
  ]
});
