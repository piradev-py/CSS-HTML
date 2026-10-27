/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-15 (inglés; se ve como la 11)
   Filtrar listas — filter() con una función flecha que devuelve
   true/false, el array original no cambia, includes() como
   condición, quitar un dato con filter(x => x !== dato) y volver
   a pintar una lista filtrada al pulsar un botón.
   Notas:
   - El id es js-15 aunque va entre js-10 y js-11: los ids no se
     cambian nunca (el progreso guardado va por id).
   - Es lo que usa «Huellas»: filtrar servicios por mascota y
     cancelar una cita con citas.filter(c => c !== cita).
   - Reto: catálogo de mascotas en adopción con botones Todos /
     Perros / Gatos; cada comprobación empieza con PRUEBA.recargar.
   ============================================================ */
CURSO.registrar({
  id: "js-15",
  titulo: "Filtering lists",
  xp: 45,
  objetivo: "You'll know how to keep only some of the elements of an array with filter() and show the filtered list on the page.",
  glosario: [
    { termino: "filter()", tema: "Filtering", para: "A new array with only the elements that meet the condition.", ejemplo: "const forCats = services.filter((s) => s.pets.includes(\"cat\"));", buscar: "filter keep some" },
    { termino: ".includes() (array)", tema: "Filtering", para: "Is this value in the array?", ejemplo: "if (pets.includes(\"dog\")) {\n  console.log(\"Yes\");\n}", buscar: "in the list contains" },
    { termino: "removing with filter", tema: "Filtering", para: "Remove an element: keep all the ones that aren't it.", ejemplo: "appointments = appointments.filter((other) => other !== appointment);", buscar: "remove delete one" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Keeping only some: filter()",
      texto: "Often you don't want **all** the data in an array, only **some**: the cheap products, the rock songs, today's appointments…\n\nThat's what arrays have `filter` for. You give it a function that looks at **each** element and answers `true` (I keep it) or `false` (out). It's like a strainer 🥣: whatever meets the condition goes through, the rest stays out.\n\n`const cheap = prices.filter(price => price < 10);`\n\n`filter` **gives you back a new array** with the ones that pass. The original doesn't change: it still has all of them.",
      ejemplo: {
        js: `const songs = [
  { title: "Dinosaur rock", genre: "rock" },
  { title: "The cat's cumbia", genre: "cumbia" },
  { title: "Grandma's rock", genre: "rock" }
];

const rockSongs = songs.filter(song => song.genre === "rock");

console.log(rockSongs.length);
rockSongs.forEach(song => console.log(song.title));
console.log(songs.length);`
      },
      consejo: "The arrow function in `filter` **returns** the condition (no braces or `return`, like `half` in the Functions lesson). If the condition comes out `true`, the element stays."
    },
    {
      tipo: "ejercicio",
      pestanas: ["js"],
      enunciado: "Hunt for bargains in the shop 🏷️. Write in JS:\n\n• An array `prices` with **12**, **5**, **30**, **8** and **3**, in that order.\n• A constant `cheap` with the prices **less than 10**, using `filter`.\n• Show `cheap` in the console (it'll be `[5, 8, 3]`).",
      inicial: { html: "", js: "" },
      solucion: {
        html: "",
        js: `const prices = [12, 5, 30, 8, 3];
const cheap = prices.filter(price => price < 10);
console.log(cheap);
`
      },
      pistas: [
        "Inside filter goes an arrow function that receives each price and returns whether it's less than 10: price => price < 10.",
        "It should look like this:\nconst prices = [12, 5, 30, 8, 3];\nconst cheap = prices.filter(price => price < 10);\nconsole.log(cheap);"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Is it in the list? includes()",
      texto: "Another very useful question: does this array **contain** a certain thing? That's what `includes` is for, and it answers `true` or `false`:\n\n`[\"dog\", \"cat\"].includes(\"cat\")` → `true`\n\nAnd since it answers `true`/`false`, it's perfect **inside** a `filter`. For example, if each game stores in an array the consoles it works on, you keep the ones that work on one of them:\n\n`games.filter(game => game.consoles.includes(\"switch\"))`",
      ejemplo: {
        js: `const games = [
  { name: "Happy farm", consoles: ["switch", "pc"] },
  { name: "Crazy races", consoles: ["pc"] },
  { name: "Jumping penguin", consoles: ["switch"] }
];

console.log(games[0].consoles.includes("pc"));

const forSwitch = games.filter(game => game.consoles.includes("switch"));
forSwitch.forEach(game => console.log(game.name));`
      }
    },
    {
      tipo: "ejercicio",
      pestanas: ["js"],
      enunciado: "What can I cook with eggs? 🥚 The `recipes` array is already written. Below it:\n\n• Create a constant `withEgg` with the recipes whose `ingredients` include **egg**, using `filter` and `includes`.\n• Show in the console the `name` of each one, one per line (you'll get **Omelet** and **Flan**).",
      inicial: {
        html: "",
        js: `const recipes = [
  { name: "Omelet", ingredients: ["egg", "potato", "onion"] },
  { name: "Salad", ingredients: ["lettuce", "tomato"] },
  { name: "Flan", ingredients: ["egg", "milk", "sugar"] }
];

`
      },
      solucion: {
        html: "",
        js: `const recipes = [
  { name: "Omelet", ingredients: ["egg", "potato", "onion"] },
  { name: "Salad", ingredients: ["lettuce", "tomato"] },
  { name: "Flan", ingredients: ["egg", "milk", "sugar"] }
];

const withEgg = recipes.filter(recipe => recipe.ingredients.includes("egg"));
withEgg.forEach(recipe => console.log(recipe.name));
`
      },
      pistas: [
        "The filter's condition is recipe.ingredients.includes(\"egg\"). Then go through withEgg with forEach (or for…of) and show recipe.name.",
        "Below the array write:\nconst withEgg = recipes.filter(recipe => recipe.ingredients.includes(\"egg\"));\nwithEgg.forEach(recipe => console.log(recipe.name));"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Removing one from the list",
      texto: "`filter` also works to **remove** a piece of data from the array: you keep all of them **except** that one. The condition is “not equal to”: `!==`.\n\n`guests = guests.filter(guest => guest !== \"Luis\");`\n\nNotice two things:\n\n• Since `filter` gives a **new** array, you store it in the same variable. That's why that variable is created with `let`, not with `const`.\n• It's what you need for a “Cancel” or “Remove” button that really deletes the data, not just from the page: that way, when you learn to save data, the list will be saved without it.",
      ejemplo: {
        js: `let guests = ["Ana", "Luis", "Marta"];

guests = guests.filter(guest => guest !== "Luis");

console.log(guests);`
      }
    },
    {
      tipo: "ejercicio",
      pestanas: ["js"],
      enunciado: "The cat has eaten a toy 🐱. Write in JS:\n\n• A variable `toys` (with `let`) with **Ball**, **Mouse** and **Rope**, in that order.\n• Remove **Mouse** with `filter` and store the result in the same variable `toys`.\n• Show `toys` in the console (it'll be `[\"Ball\", \"Rope\"]`).",
      inicial: { html: "", js: "" },
      solucion: {
        html: "",
        js: `let toys = ["Ball", "Mouse", "Rope"];
toys = toys.filter(toy => toy !== "Mouse");
console.log(toys);
`
      },
      pistas: [
        "The condition is “not equal to Mouse”: toy => toy !== \"Mouse\". And the result is stored again in toys (without writing let again).",
        "It should look like this:\nlet toys = [\"Ball\", \"Mouse\", \"Rope\"];\ntoys = toys.filter(toy => toy !== \"Mouse\");\nconsole.log(toys);"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Filtering on the page with buttons",
      texto: "Now, to the page. The trick is to have **one function** that renders whatever list you give it:\n\n1. `render(list)` empties the `<ul>` with `textContent = \"\"` and creates an `<li>` for each item (like in the Creating elements lesson).\n2. When the page loads, `render(all)`.\n3. Each button calls `render` with the **filtered** list.\n\nThat way, the same function works for everything. Press the buttons in the result. 🍎",
      ejemplo: {
        html: `<button id="all">All</button>
<button id="fruits">Only fruit</button>
<ul id="shopping"></ul>`,
        js: `const groceries = [
  { name: "Apples", type: "fruit" },
  { name: "Bread", type: "bakery" },
  { name: "Bananas", type: "fruit" }
];
const list = document.querySelector("#shopping");

function render(products) {
  list.textContent = "";
  for (const product of products) {
    const li = document.createElement("li");
    li.textContent = product.name;
    list.append(li);
  }
}

render(groceries);

document.querySelector("#all").addEventListener("click", () => {
  render(groceries);
});
document.querySelector("#fruits").addEventListener("click", () => {
  render(groceries.filter(product => product.type === "fruit"));
});`
      },
      consejo: "If you forget to empty the list at the start of `render`, each click **adds** the elements below the ones that were already there, and they repeat."
    },
    {
      tipo: "quiz",
      pregunta: "You have `const grades = [4, 9, 6];` and you write `const passed = grades.filter(grade => grade >= 5);`. What's in `grades` afterwards?",
      opciones: ["[9, 6]", "[4, 9, 6]", "[4]"],
      correcta: 1,
      explicacion: "filter doesn't touch the original array: it returns a new one. passed is [9, 6] and grades is still [4, 9, 6]."
    },
    {
      tipo: "reto",
      enunciado: "🐾 The shelter wants people to find their ideal pet. The pets are already in the `pets` array.\n\n1. Write a function `render(chosen)` that empties `#pets` and creates an `<li>` with the `name` of each pet in `chosen`.\n2. When the page loads, render **all** of them.\n3. When `#dogs` is pressed, render only the ones whose `species` is **dog**; when `#cats` is pressed, only the **cat** ones.\n4. When `#all` is pressed, render all of them again.",
      cssBase: `body { font-family: sans-serif; padding: 12px; background-color: #fff8ef; }
h2 { margin-top: 0; color: #7a3e12; }
button { padding: 8px 14px; margin-right: 4px; font-size: 15px; border: 2px solid #e0a46b; border-radius: 999px; background-color: white; }
#pets { padding-left: 24px; font-size: 18px; }
#pets li { margin: 6px 0; }`,
      inicial: {
        html: `<h2>🐾 Adopt at the shelter</h2>
<button id="all">All</button>
<button id="dogs">Dogs</button>
<button id="cats">Cats</button>
<ul id="pets"></ul>
`,
        js: `const pets = [
  { name: "Toby", species: "dog" },
  { name: "Misty", species: "cat" },
  { name: "Lola", species: "dog" },
  { name: "Cloud", species: "cat" },
  { name: "Rocky", species: "dog" }
];
const list = document.querySelector("#pets");

// 1. The function render(chosen): empties #pets and creates an <li> per pet


// 2. When the page loads, render all of them


// 3 and 4. The #dogs, #cats and #all buttons
`
      },
      comprobaciones: [
        {
          texto: "When it loads, the list has the 5 pets",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const names = [...v.doc.querySelectorAll("#pets li")].map(li => li.textContent);
            return names.length === 5 && names[0].includes("Toby") && names[4].includes("Rocky");
          }
        },
        {
          texto: "When you press **Dogs**, only Toby, Lola and Rocky show up",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            v.doc.querySelector("#dogs")?.click();
            const names = [...v.doc.querySelectorAll("#pets li")].map(li => li.textContent.trim());
            return names.join(",") === "Toby,Lola,Rocky";
          }
        },
        {
          texto: "When you press **Dogs** and then **Cats**, only Misty and Cloud show up (no repeats)",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            v.doc.querySelector("#dogs")?.click();
            v.doc.querySelector("#cats")?.click();
            const names = [...v.doc.querySelectorAll("#pets li")].map(li => li.textContent.trim());
            return names.join(",") === "Misty,Cloud";
          }
        },
        {
          texto: "When you press **All** after filtering, the 5 show up again",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            v.doc.querySelector("#cats")?.click();
            if (v.doc.querySelectorAll("#pets li").length !== 2) return false;
            v.doc.querySelector("#all")?.click();
            return v.doc.querySelectorAll("#pets li").length === 5;
          }
        }
      ],
      pistas: [
        "Copy the idea from the shopping example: render(chosen) starts with list.textContent = \"\" and then a for…of that creates the li elements. Each button calls render with pets.filter(…).",
        "It should look like this:\nfunction render(chosen) {\n  list.textContent = \"\";\n  for (const pet of chosen) {\n    const li = document.createElement(\"li\");\n    li.textContent = pet.name;\n    list.append(li);\n  }\n}\n\nrender(pets);\n\ndocument.querySelector(\"#dogs\").addEventListener(\"click\", () => {\n  render(pets.filter(pet => pet.species === \"dog\"));\n});\nAnd the same for #cats (with \"cat\") and for #all (with render(pets))."
      ],
      solucion: {
        html: `<h2>🐾 Adopt at the shelter</h2>
<button id="all">All</button>
<button id="dogs">Dogs</button>
<button id="cats">Cats</button>
<ul id="pets"></ul>
`,
        js: `const pets = [
  { name: "Toby", species: "dog" },
  { name: "Misty", species: "cat" },
  { name: "Lola", species: "dog" },
  { name: "Cloud", species: "cat" },
  { name: "Rocky", species: "dog" }
];
const list = document.querySelector("#pets");

function render(chosen) {
  list.textContent = "";
  for (const pet of chosen) {
    const li = document.createElement("li");
    li.textContent = pet.name;
    list.append(li);
  }
}

render(pets);

document.querySelector("#all").addEventListener("click", () => {
  render(pets);
});
document.querySelector("#dogs").addEventListener("click", () => {
  render(pets.filter(pet => pet.species === "dog"));
});
document.querySelector("#cats").addEventListener("click", () => {
  render(pets.filter(pet => pet.species === "cat"));
});
`
      }
    }
  ]
});
