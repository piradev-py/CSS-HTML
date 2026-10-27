/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-08
   Arrays y bucles — array, índice (desde 0), length (ya visto en
   textos en js-07), push(), bucle for…of, acumular una suma y
   forEach() (también sobre la lista de querySelectorAll).
   Notas:
   - A propósito NO se enseñan while ni el for clásico con índice:
     el motor no protege contra bucles infinitos.
   - El reto obliga a calcular de verdad: un botón añade una ronda
     con push y hay que volver a sumar (un "500" escrito a mano
     no pasa la tercera comprobación).
   - Cuidado: los ${…} de los ejemplos van escapados (\${…}).
   ============================================================ */
CURSO.registrar({
  id: "js-08",
  titulo: "Arrays and loops",
  xp: 45,
  objetivo: "You'll learn to save lists of data in an array and go through them with a loop to do something with each item.",
  glosario: [
    { termino: "array", tema: "Arrays", para: "A list of values between `[ ]`.", ejemplo: "const pets = [\"dog\", \"cat\", \"exotic\"];", buscar: "list array brackets" },
    { termino: "push()", tema: "Arrays", para: "Adds an element to the end of the array.", ejemplo: "appointments.push(appointment);", buscar: "add append end" },
    { termino: "for…of", tema: "Arrays", para: "Repeats something for each element of the array.", ejemplo: "for (const service of services) {\n  console.log(service.name);\n}", buscar: "loop go through each one" },
    { termino: "forEach()", tema: "Arrays", para: "Another way to loop; it also works with `querySelectorAll`.", ejemplo: "links.forEach((link) => {\n  link.classList.remove(\"active\");\n});", buscar: "go through each one list" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "A list with a name: the array",
      texto: "So far, each variable held **one** piece of data. An **array** holds a **list** of data in order, between brackets `[ ]` and separated by commas.\n\nThink of it like a train 🚂: each car carries a piece of data and has a number, its **index**. Careful! Counting starts at **0**: the first car is `0`, the second is `1`…\n\nTo pull out a piece of data, write the name of the array and the index between brackets: `fruits[0]`.",
      ejemplo: {
        js: `const fruits = ["apple", "pear", "banana"];

console.log(fruits);     // the whole list
console.log(fruits[0]);  // the first one
console.log(fruits[2]);  // the third one
console.log(fruits[5]);  // doesn't exist: undefined`
      },
      consejo: "Do you get `undefined` (“not defined”)? You asked for an index that doesn't exist. Remember: if the array has 3 items, the indexes are 0, 1 and 2."
    },
    {
      tipo: "explicacion",
      titulo: "How many there are and adding more: length and push",
      texto: "Remember `.length`, which gave the length of a text? On an array it tells you **how many items** it has: `fruits.length`.\n\nTo add an item **to the end** of the list, you use `push`: `fruits.push(\"kiwi\");`. Since the array only changes on the inside, it can stay `const`: the list is the same one, just longer.\n\nA trick: the last item is always at index `length - 1`.",
      ejemplo: {
        js: `const fruits = ["apple", "pear", "banana"];
console.log(fruits.length);

fruits.push("kiwi");
console.log(fruits);
console.log(fruits.length);
console.log(fruits[fruits.length - 1]); // the last one`
      }
    },
    {
      tipo: "ejercicio",
      pestanas: ["js"],
      enunciado: "Pack your adventurer's backpack 🎒. Write this in JS:\n\n• An array `backpack` with **sword**, **shield** and **potion**, in that order.\n• Show the **first** item of the backpack in the console (it will be **sword**).\n• Add **map** to the end with `push`.\n• Show in the console how many things are in the backpack (it will be **4**).\n• Show the whole backpack in the console.",
      inicial: { html: "", js: "" },
      solucion: {
        html: "",
        js: `const backpack = ["sword", "shield", "potion"];
console.log(backpack[0]);

backpack.push("map");
console.log(backpack.length);
console.log(backpack);
`
      },
      pistas: [
        "The first item is at index 0: backpack[0]. To count, backpack.length. And for the whole backpack, console.log(backpack).",
        "It should look like this:\nconst backpack = [\"sword\", \"shield\", \"potion\"];\nconsole.log(backpack[0]);\n\nbackpack.push(\"map\");\nconsole.log(backpack.length);\nconsole.log(backpack);"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Repeat for each one: for…of",
      texto: "Saying hi to every friend on a list of 100? You're not going to write 100 lines: use a **loop**, which repeats a few orders once **for each** item of the array.\n\n`for (const friend of friends) { … }` reads: “**for each** `friend` **of** `friends`, do what's inside the braces”. On each pass, `friend` holds the next item: first `\"Ana\"`, then `\"Leo\"`… It's like handing out candies 🍬 in a line: one to each kid, until no one is left.\n\nThe name `friend` is your choice; it's usually the singular of the array.",
      ejemplo: {
        js: `const friends = ["Ana", "Leo", "Sara"];

for (const friend of friends) {
  console.log(\`Hi, \${friend}!\`);
}

console.log("End of the loop");`
      },
      consejo: "If you add a friend to the array, the loop says hi to them without you changing anything else. That's the magic of loops! ✨"
    },
    {
      tipo: "ejercicio",
      pestanas: ["js"],
      enunciado: "Set up the music for your party 🎶. Write this in JS:\n\n• An array `songs` with **The cat's cumbia**, **The dinosaur rock** and **Little moon ballad**, in that order.\n• Go through it with `for…of` and show in the console, for each one, **Now playing: ** followed by its name. The first line will be **Now playing: The cat's cumbia**.",
      inicial: { html: "", js: "" },
      solucion: {
        html: "",
        js: `const songs = ["The cat's cumbia", "The dinosaur rock", "Little moon ballad"];

for (const song of songs) {
  console.log(\`Now playing: \${song}\`);
}
`
      },
      pistas: [
        "Write the array and, below it, for (const song of songs) { … }. Inside the braces, a console.log that joins \"Now playing: \" with song.",
        "It should look like this:\nconst songs = [\"The cat's cumbia\", \"The dinosaur rock\", \"Little moon ballad\"];\n\nfor (const song of songs) {\n  console.log(\"Now playing: \" + song);}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Adding it all up: the accumulator",
      texto: "A classic use of loops: **adding up** all the numbers in an array. The trick is a variable that keeps **accumulating**, like a piggy bank 🐷:\n\n1. Before the loop, `let total = 0;` (the empty piggy bank).\n2. Inside, on each pass, `total = total + price;` (dropping in a coin).\n3. After the loop, `total` already holds the complete sum.\n\nCareful: `total` uses `let` (it changes) and sits **outside** the loop; if you create it inside, it starts from zero on every pass.",
      ejemplo: {
        html: `<p>🛒 Total of your purchase: <b id="total"></b> $</p>`,
        js: `const prices = [3, 12, 5, 4];
let total = 0;

for (const price of prices) {
  total = total + price;
  console.log(\`Adding \${price}: I'm at \${total}\`);
}

document.querySelector("#total").textContent = total;`
      }
    },
    {
      tipo: "explicacion",
      titulo: "Another way: forEach",
      texto: "Arrays have an order that does the same as `for…of`: `forEach` (“for each one”). You hand it a **function** and it runs it once for each item, passing it as a parameter:\n\n`friends.forEach(friend => console.log(friend));`\n\nAnd the best part: the list that `querySelectorAll` returns also has `forEach`. That way you can change **all** the elements at once. Press the button in the result. 🌈",
      ejemplo: {
        html: `<ul>
  <li class="planet">Mercury</li>
  <li class="planet">Venus</li>
  <li class="planet">Earth</li>
</ul>
<button id="color-in">Color them all</button>`,
        css: `.blue { color: royalblue; font-weight: bold; }`,
        js: `const planets = document.querySelectorAll(".planet");

document.querySelector("#color-in").addEventListener("click", () => {
  planets.forEach(planet => {
    planet.classList.add("blue");
  });
});`
      },
      consejo: "`for…of` and `forEach` do the same thing: use whichever feels clearer to you. What you **can't** do is `planets.classList.add(…)` on the whole list: the class is added one element at a time."
    },
    {
      tipo: "ejercicio",
      enunciado: "Finish your household chores in one click 🧹. The HTML is already written.\n\nWhen the `#all` button is pressed, find all the elements with the class `task` (`querySelectorAll`) and, with `forEach`, add the class `done` to **each one**.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
ul { list-style: none; padding: 0; }
.task { padding: 8px 12px; margin-bottom: 6px; background-color: #fff3cd; border-radius: 8px; font-size: 18px; }
.task::before { content: "⬜ "; }
.done { background-color: #d1f2d9; text-decoration: line-through; color: #2f7a43; }
.done::before { content: "✅ "; }
button { padding: 9px 16px; font-size: 18px; border: none; border-radius: 8px; background-color: seagreen; color: white; }`,
      inicial: {
        html: `<ul>
  <li class="task">Make the bed</li>
  <li class="task">Walk the dog</li>
  <li class="task">Water the plants</li>
</ul>
<button id="all">Mark them all</button>
`,
        js: ""
      },
      solucion: {
        html: `<ul>
  <li class="task">Make the bed</li>
  <li class="task">Walk the dog</li>
  <li class="task">Water the plants</li>
</ul>
<button id="all">Mark them all</button>
`,
        js: `const tasks = document.querySelectorAll(".task");

document.querySelector("#all").addEventListener("click", () => {
  tasks.forEach(task => {
    task.classList.add("done");
  });
});
`
      },
      acciones: [{ clic: "#all" }],
      pistas: [
        "Save the list with document.querySelectorAll(\".task\"). Inside the button's addEventListener, call tasks.forEach with a function that receives each task and adds the class to it.",
        "It should look like this:\nconst tasks = document.querySelectorAll(\".task\");\n\ndocument.querySelector(\"#all\").addEventListener(\"click\", () => {\n  tasks.forEach(task => {\n    task.classList.add(\"done\");\n  });\n});"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "With `const colors = [\"red\", \"green\", \"blue\"];`, what does `console.log(colors[1]);` show?",
      opciones: ["red", "green", "blue"],
      correcta: 1,
      explicacion: "Indexes start at 0: colors[0] is \"red\", colors[1] is \"green\" and colors[2] is \"blue\"."
    },
    {
      tipo: "reto",
      enunciado: "Show the scoreboard of your game 🎮. The scores of each round are already in the `points` array. Complete the `showResult()` function:\n\n1. Put in `#rounds` how many rounds there are (the length of the array).\n2. Add up all the scores with a loop and put the result in `#total`.\n3. When the `#extra` button is pressed, add `100` to the array with `push` and call `showResult()` again so the scoreboard updates.",
      cssBase: `body { font-family: sans-serif; display: flex; justify-content: center; padding-top: 20px; background-color: #1e1b3a; color: white; }
.scoreboard { width: 300px; padding: 20px; border-radius: 16px; background-color: #2d2a55; text-align: center; box-shadow: 0 0 20px rgb(120 100 255 / 0.4); }
.scoreboard h2 { margin-top: 0; }
.scoreboard p { font-size: 20px; }
#rounds, #total { font-weight: bold; color: #ffd166; }
button { padding: 10px 18px; font-size: 18px; border: none; border-radius: 10px; background-color: #ffd166; color: #1e1b3a; font-weight: bold; }`,
      inicial: {
        html: `<section class="scoreboard">
  <h2>🏆 Game result</h2>
  <p>Rounds played: <span id="rounds">?</span></p>
  <p>Total score: <span id="total">?</span></p>
  <button id="extra">Extra round (+100)</button>
</section>
`,
        js: `const points = [120, 80, 45, 200, 55];
const roundsText = document.querySelector("#rounds");
const totalText = document.querySelector("#total");

function showResult() {
  // 1. Put in roundsText how many scores there are

  // 2. Add up all the scores with a loop

  // 3. Put the sum in totalText
}

showResult();

// 4. When #extra is pressed: add 100 to the array and call showResult() again
`
      },
      comprobaciones: [
        {
          texto: "`#rounds` shows how many scores there are: **5**",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            return v.doc.querySelector("#rounds")?.textContent.trim() === "5";
          }
        },
        {
          texto: "`#total` shows the sum of all the scores: **500**",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            return v.doc.querySelector("#total")?.textContent.trim() === "500";
          }
        },
        {
          texto: "When you press **Extra round (+100)**, the scoreboard goes to **6** rounds and **600** points (and to 7 and 700 if you press it again)",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const b = v.doc.querySelector("#extra");
            const r = v.doc.querySelector("#rounds");
            const t = v.doc.querySelector("#total");
            if (!b || !r || !t) return false;
            b.click();
            const una = r.textContent.trim() === "6" && t.textContent.trim() === "600";
            b.click();
            return una && r.textContent.trim() === "7" && t.textContent.trim() === "700";
          }
        }
      ],
      pistas: [
        "Inside the function: roundsText.textContent = points.length; then the accumulator (let sum = 0; and a for…of that keeps adding each point) and, at the end, totalText.textContent = sum. The sum must start at 0 INSIDE the function, so it counts from zero every time.",
        "The function should look like this:\nfunction showResult() {\n  roundsText.textContent = points.length;\n  let sum = 0;\n  for (const point of points) {\n    sum = sum + point;\n  }\n  totalText.textContent = sum;\n}\nAnd below:\ndocument.querySelector(\"#extra\").addEventListener(\"click\", () => {\n  points.push(100);\n  showResult();\n});"
      ],
      solucion: {
        html: `<section class="scoreboard">
  <h2>🏆 Game result</h2>
  <p>Rounds played: <span id="rounds">?</span></p>
  <p>Total score: <span id="total">?</span></p>
  <button id="extra">Extra round (+100)</button>
</section>
`,
        js: `const points = [120, 80, 45, 200, 55];
const roundsText = document.querySelector("#rounds");
const totalText = document.querySelector("#total");

function showResult() {
  roundsText.textContent = points.length;

  let sum = 0;
  for (const point of points) {
    sum = sum + point;
  }

  totalText.textContent = sum;
}

showResult();

document.querySelector("#extra").addEventListener("click", () => {
  points.push(100);
  showResult();
});
`
      }
    }
  ]
});
