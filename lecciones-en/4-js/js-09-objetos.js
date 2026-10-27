/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-09 (inglés)
   Objetos — objeto, { clave: valor }, leer con punto, modificar
   y añadir propiedades, objetos dentro de un array (y recorrerlos
   con for…of, visto en js-08).
   Notas:
   - El primer ejercicio termina con console.log(objeto): la
     consola lo muestra como { name: "Luna", health: 70, … }, así
     que el revisor comprueba también las claves y su orden.
   - El reto deja que el alumno escriba el objeto él mismo (nombre
     libre) y comprueba la ficha pintada y el botón con
     PRUEBA.recargar en cada comprobación.
   - Cuidado: los ${…} de los ejemplos van escapados (\${…}).
   ============================================================ */
CURSO.registrar({
  id: "js-09",
  titulo: "Objects",
  xp: 40,
  objetivo: "You'll know how to group related data into an object, read it and change it, and store several objects in an array.",
  glosario: [
    { termino: "object { key: value }", tema: "Objects", para: "A record card with named data.", ejemplo: "const appointment = { pet: \"Dog\", date: \"2026-10-21\", time: \"10:00\" };", buscar: "object card data key" },
    { termino: "object.key", tema: "Objects", para: "Reads or changes a piece of data on the card.", ejemplo: "console.log(appointment.date);\nappointment.time = \"11:00\";", buscar: "access property dot" },
    { termino: "array of objects", tema: "Objects", para: "A list of cards: a website's data.", ejemplo: "const services = [\n  { name: \"Surgery\", pets: [\"dog\", \"cat\"] }\n];", buscar: "list cards data" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "A card with all the data",
      texto: "Imagine your cat's record card 🐱: name, age, color… You could create three separate variables, but it's handier to keep it all **together**, in an **object**.\n\nAn object goes between braces `{ }` and stores **key: value** pairs, separated by commas. The **key** is the name of the piece of data (like the label on a drawer) and the **value**, what's inside.\n\nTo read a piece of data, use a **dot**: `cat.name` reads “the cat's name”.",
      ejemplo: {
        js: `const cat = {
  name: "Misty",
  age: 3,
  color: "orange"
};

console.log(cat);
console.log(cat.name);
console.log(\`\${cat.name} is \${cat.age} years old\`);`
      },
      consejo: "Keys go **without quotes** and followed by a colon `:`. Between one pair and the next, a comma. Forgetting that comma is the most common mistake with objects!"
    },
    {
      tipo: "explicacion",
      titulo: "Changing and adding data",
      texto: "To **change** a piece of data, give it a new value with `=`: `cat.age = 4;`. You can also calculate it from the one it already has: `cat.age = cat.age + 1;` (happy birthday! 🎂).\n\nAnd if the key didn't exist, it gets **added**: `cat.vaccinated = true;`.\n\nWhat about `const`? It still works: the object is the same “box”, only what's inside changes. `const` only stops you from swapping the whole box for another one.",
      ejemplo: {
        js: `const cat = { name: "Misty", age: 3 };

cat.age = cat.age + 1;
cat.vaccinated = true;

console.log(cat);
console.log(cat.age);`
      }
    },
    {
      tipo: "ejercicio",
      pestanas: ["js"],
      enunciado: "Create your game's heroine 🏹. Write in JS:\n\n• An object `hero` with these keys, in this order: `name` with the value **Luna**, `health` with **100** and `weapon` with **bow**.\n• Show her name in the console with `hero.name`.\n• A troll hits her! Subtract **30** from her `health`.\n• Show her health in the console (it'll be **70**).\n• Show the whole `hero` object in the console.",
      inicial: { html: "", js: "" },
      solucion: {
        html: "",
        js: `const hero = {
  name: "Luna",
  health: 100,
  weapon: "bow"
};

console.log(hero.name);

hero.health = hero.health - 30;
console.log(hero.health);

console.log(hero);
`
      },
      pistas: [
        "The object goes between braces, with name: \"Luna\", health: 100 and weapon: \"bow\" separated by commas. To subtract: hero.health = hero.health - 30;",
        "It should look like this:\nconst hero = {\n  name: \"Luna\",\n  health: 100,\n  weapon: \"bow\"\n};\n\nconsole.log(hero.name);\n\nhero.health = hero.health - 30;\nconsole.log(hero.health);\n\nconsole.log(hero);"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "A list of cards: arrays of objects",
      texto: "The most common thing on the web is to have **lots** of cards: a shop's products, a chat's messages, a list's tasks… They're stored as an **array of objects**: a list where each element is a card.\n\nTo go through it, the usual `for…of`. On each round you have **a whole object**, and with the dot you get its data: `product.name`, `product.price`.\n\nYou can also go straight to one: `shop[0].name` is the name of the **first** product. 🛍️",
      ejemplo: {
        js: `const shop = [
  { name: "T-shirt", price: 15 },
  { name: "Cap", price: 8 },
  { name: "Socks", price: 4 }
];

for (const product of shop) {
  console.log(\`\${product.name}: $\${product.price}\`);
}

console.log(shop[0].name);`
      },
      consejo: "Read `shop[0].name` from left to right: “from the shop, element 0; and from that one, the name”."
    },
    {
      tipo: "ejercicio",
      pestanas: ["js"],
      enunciado: "Introduce the shelter's pets 🐾. Write in JS:\n\n• An array `pets` with three objects, in this order, each one with `name` and `species`: **Toby** (**dog**), **Misty** (**cat**) and **Coco** (**parrot**).\n• Go through it with `for…of` and show in the console, for each pet, its name, **is a** and its species. The first line will be **Toby is a dog**.",
      inicial: { html: "", js: "" },
      solucion: {
        html: "",
        js: `const pets = [
  { name: "Toby", species: "dog" },
  { name: "Misty", species: "cat" },
  { name: "Coco", species: "parrot" }
];

for (const pet of pets) {
  console.log(\`\${pet.name} is a \${pet.species}\`);
}
`
      },
      pistas: [
        "Each pet is an object between braces, and the three go inside the array's brackets, separated by commas. In the loop, use pet.name and pet.species.",
        "It should look like this:\nconst pets = [\n  { name: \"Toby\", species: \"dog\" },\n  { name: \"Misty\", species: \"cat\" },\n  { name: \"Coco\", species: \"parrot\" }\n];\n\nfor (const pet of pets) {\n  console.log(pet.name + \" is a \" + pet.species);\n}"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "With `const team = [{ name: \"Ana\", level: 3 }, { name: \"Leo\", level: 5 }];`, what does `console.log(team[1].name);` show?",
      opciones: ["Ana", "Leo", "5"],
      correcta: 1,
      explicacion: "team[1] is the SECOND object in the array (counting starts at 0), and from that object you read the name key: \"Leo\"."
    },
    {
      tipo: "reto",
      enunciado: "Create your video game character's card ⚔️:\n\n1. Create an object `character` with a `name` (whatever you like), `health` with the value `100` and `level` with the value `1`.\n2. Complete the function `renderCard()` so it puts the name in `#name`, the health in `#health` and the level in `#level`, and call it so the card shows when the page loads.\n3. When `#level-up` is pressed, the character goes up **1 level** and gains **10 health**: change the object and render the card again.",
      cssBase: `body { font-family: sans-serif; display: flex; justify-content: center; padding-top: 20px; background-color: #f0ebe3; }
.card { width: 260px; padding: 20px; border: 4px solid #6b4f2a; border-radius: 16px; background-color: #fffaf0; text-align: center; }
.card h2 { margin-top: 0; color: #6b4f2a; }
.card p { font-size: 20px; margin: 8px 0; }
#health, #level { font-weight: bold; }
button { margin-top: 10px; padding: 10px 18px; font-size: 18px; border: none; border-radius: 10px; background-color: #6b4f2a; color: white; }`,
      inicial: {
        html: `<article class="card">
  <h2 id="name">?</h2>
  <p>❤️ Health: <span id="health">?</span></p>
  <p>⭐ Level: <span id="level">?</span></p>
  <button id="level-up">Level up</button>
</article>
`,
        js: `// 1. Create the character object here (name, health and level)


function renderCard() {
  // 2. Put the character's name, health and level on the page
}

// Call renderCard() so the card shows when the page loads


// 3. When #level-up is pressed: add 1 to the level and 10 to the health, and render the card again
`
      },
      comprobaciones: [
        {
          texto: "When it loads, the card shows a name, **100** health and level **1**",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const name = (v.doc.querySelector("#name")?.textContent || "").trim();
            return name !== "" && name !== "?" && name !== "undefined"
              && v.doc.querySelector("#health")?.textContent.trim() === "100"
              && v.doc.querySelector("#level")?.textContent.trim() === "1";
          }
        },
        {
          texto: "When you press **Level up**, it goes to level **2** and **110** health",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            v.doc.querySelector("#level-up")?.click();
            return v.doc.querySelector("#level")?.textContent.trim() === "2"
              && v.doc.querySelector("#health")?.textContent.trim() === "110";
          }
        },
        {
          texto: "When you press it three times, it reaches level **4** and **130** health",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const b = v.doc.querySelector("#level-up");
            if (!b) return false;
            b.click(); b.click(); b.click();
            return v.doc.querySelector("#level")?.textContent.trim() === "4"
              && v.doc.querySelector("#health")?.textContent.trim() === "130";
          }
        }
      ],
      pistas: [
        "The object: const character = { name: \"…\", health: 100, level: 1 };. In renderCard, three lines with textContent and character.name, character.health and character.level. In the #level-up click, change character.level and character.health and call renderCard() again.",
        "It should look like this:\nconst character = { name: \"Kira\", health: 100, level: 1 };\n\nfunction renderCard() {\n  document.querySelector(\"#name\").textContent = character.name;\n  document.querySelector(\"#health\").textContent = character.health;\n  document.querySelector(\"#level\").textContent = character.level;\n}\n\nrenderCard();\n\ndocument.querySelector(\"#level-up\").addEventListener(\"click\", () => {\n  character.level = character.level + 1;\n  character.health = character.health + 10;\n  renderCard();\n});"
      ],
      solucion: {
        html: `<article class="card">
  <h2 id="name">?</h2>
  <p>❤️ Health: <span id="health">?</span></p>
  <p>⭐ Level: <span id="level">?</span></p>
  <button id="level-up">Level up</button>
</article>
`,
        js: `const character = {
  name: "Kira",
  health: 100,
  level: 1
};

function renderCard() {
  document.querySelector("#name").textContent = character.name;
  document.querySelector("#health").textContent = character.health;
  document.querySelector("#level").textContent = character.level;
}

renderCard();

document.querySelector("#level-up").addEventListener("click", () => {
  character.level = character.level + 1;
  character.health = character.health + 10;
  renderCard();
});
`
      }
    }
  ]
});
