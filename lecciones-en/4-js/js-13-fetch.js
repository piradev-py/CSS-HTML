/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-13
   Fetching data with fetch — asynchrony ("ask and wait"), fetch(),
   server and URL, async / await, response.json(), response.ok and
   response.status (404), try / catch.
   Notas:
   - The files datos/jokes.json and datos/animals.json are served
     by the engine without internet (lesson field `datos`, see
     js/editor.js). datos/dinosaurs.json does NOT exist on purpose:
     it gives 404 and is used to practice response.ok.
   - Ejercicios deterministas: nada de azar.
   - Cambio respecto al PLAN: el reto es "siguiente chiste" (con
     vuelta al principio) en vez de "chiste al azar", para no meter
     Math.random/Math.floor sin enseñarlos y poder comprobarlo con
     exactitud.
   - The error check in the reto reloads the page with
     PRUEBA.recargar(doc, { sinDatos: ["jokes.json"] }): in that
     copy the student's fetch receives a 404.
   - The checks read the jokes from
     CURSO.lecciones["js-13"].datos (no global variables, because
     the verifier loads all the lessons in the same page).
   - El JS de ejemplos y soluciones no usa plantillas de texto.
   ============================================================ */
CURSO.registrar({
  id: "js-13",
  titulo: "Fetching data with fetch",
  xp: 55,
  objetivo: "You will learn to ask a server for data with fetch, wait for the response with async and await, show it on the page and warn when something goes wrong.",
  glosario: [
    { termino: "fetch()", tema: "Data from the internet", para: "Asks for a file or some data; the response arrives later.", ejemplo: "const response = await fetch(\"datos/reviews.json\");", buscar: "ask for data file internet" },
    { termino: "async / await", tema: "Data from the internet", para: "`await` waits for the response; it is only used inside an `async` function.", ejemplo: "async function load() {\n  const response = await fetch(\"datos/reviews.json\");\n  const data = await response.json();\n}", buscar: "wait asynchronous" },
    { termino: ".json()", tema: "Data from the internet", para: "Turns the response into JavaScript data.", ejemplo: "const reviews = await response.json();", buscar: "json convert response" },
    { termino: "try / catch", tema: "Data from the internet", para: "If something fails inside `try`, it goes to `catch` instead of breaking the page.", ejemplo: "try {\n  const response = await fetch(\"datos/reviews.json\");\n} catch (error) {\n  console.log(\"Could not load\");\n}", buscar: "error failure catch" }
  ],
  datos: {
    "jokes.json": [
      { question: "Why did the cookie go to the doctor?", answer: "Because it was feeling crumbly!" },
      { question: "What do you call a bear with no teeth?", answer: "A gummy bear!" },
      { question: "Why did the student eat his homework?", answer: "Because the teacher said it was a piece of cake!" },
      { question: "What is a snake's favorite subject?", answer: "Hissssstory!" },
      { question: "Why can't your nose be 12 inches long?", answer: "Because then it would be a foot!" },
      { question: "What did the zero say to the eight?", answer: "Nice belt!" }
    ],
    "animals.json": [
      { name: "Penguin", emoji: "🐧" },
      { name: "Octopus", emoji: "🐙" },
      { name: "Koala", emoji: "🐨" },
      { name: "Turtle", emoji: "🐢" }
    ]
  },
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Ask and wait",
      texto: "Many websites show data that is not on the page: the weather, messages, videos… It lives on a **server**, a computer that stores the website's files and data, and you have to **ask for it**.\n\nAsking takes time, like ordering a pizza 🍕: you call and, while it arrives, you keep doing your thing. When code doesn't freeze while waiting, that is called **asynchrony**.\n\nTo ask for data you use `fetch(\"address\")` (traer). On a real website, `datos/jokes.json` would be a file on your server; you can also ask other websites for their full address (`https://…`). Here we will use the lesson's files, which work without internet.\n\nWatch the **order** of the console.",
      ejemplo: {
        js: `async function request() {
  console.log("📞 Requesting the jokes…");
  const response = await fetch("datos/jokes.json");
  console.log("📦 The response has arrived! Status: " + response.status);
}

request();
console.log("While I wait, I keep doing my thing 🎵");`
      },
      consejo: "The While I wait line is at the end of the code… but it shows up before the response! That is asynchrony: the rest of the code doesn't wait for the pizza to arrive."
    },
    {
      tipo: "explicacion",
      titulo: "async, await and .json()",
      texto: "Inside the function there are two new things:\n\n• `await` (wait): \"wait here until it arrives, then keep going\". It only works inside a function marked with `async` (an asynchronous one).\n• The response is like an **envelope** 📩. To open it and turn its JSON into arrays and objects, use `await response.json()`. It is like the `JSON.parse` from the previous lesson, but you also have to wait for it.\n\nOnce the data is in an array, paint it the way you know: `forEach`, `createElement` and `append`. Watch how Loading… appears first and, a moment later, the jokes.",
      ejemplo: {
        html: `<p id="status">Loading jokes…</p>
<ul id="list"></ul>`,
        js: `const status = document.querySelector("#status");
const list = document.querySelector("#list");

async function loadJokes() {
  const response = await fetch("datos/jokes.json");
  const jokes = await response.json();
  status.textContent = jokes.length + " jokes have arrived:";
  jokes.forEach((joke) => {
    const li = document.createElement("li");
    li.textContent = joke.question;
    list.append(li);
  });
}

loadJokes();`
      },
      consejo: "Do you get the error await is only valid in async functions? You forgot to write `async` in front of `function`. They always go together!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Ask for the zoo's list of animals 🦁. The HTML is already written. The file `datos/animals.json` is an array of objects like this: `[{ name: \"Penguin\", emoji: \"🐧\" }, …]`.\n\n• Create an `async` function that asks for `datos/animals.json` with `fetch` and turns it with `await response.json()`.\n• Show in the console **4 animals have arrived** (use `.length`).\n• Create an `<li>` per animal inside `#animals`, with the emoji, a space and the name: **🐧 Penguin**\n• Don't forget to call the function.",
      cssBase: `body { font-family: sans-serif; padding: 10px; background-color: #eef8ee; }
h2 { color: #2e7d32; }
#animals li { font-size: 22px; margin: 6px 0; }`,
      inicial: {
        html: `<h2>Zoo animals</h2>
<ul id="animals"></ul>
`,
        js: ""
      },
      solucion: {
        html: `<h2>Zoo animals</h2>
<ul id="animals"></ul>
`,
        js: `const list = document.querySelector("#animals");

async function loadAnimals() {
  const response = await fetch("datos/animals.json");
  const animals = await response.json();
  console.log(animals.length + " animals have arrived");
  animals.forEach((animal) => {
    const li = document.createElement("li");
    li.textContent = animal.emoji + " " + animal.name;
    list.append(li);
  });
}

loadAnimals();
`
      },
      pistas: [
        "Copy the shape of the previous example: async function, const response = await fetch(…), const animals = await response.json(). Then the console.log with animals.length and a forEach that creates each <li> with animal.emoji + \" \" + animal.name.",
        "It should look like this:\nconst list = document.querySelector(\"#animals\");\n\nasync function loadAnimals() {\n  const response = await fetch(\"datos/animals.json\");\n  const animals = await response.json();\n  console.log(animals.length + \" animals have arrived\");\n  animals.forEach((animal) => {\n    const li = document.createElement(\"li\");\n    li.textContent = animal.emoji + \" \" + animal.name;\n    list.append(li);\n  });\n}\n\nloadAnimals();"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "When something goes wrong",
      texto: "Asking the internet for things can fail in two ways:\n\n1. **The server answers \"I don't have it\"**: for example, if you misspell the file name. Then `response.ok` is `false` and `response.status` is `404` (the famous \"not found\").\n2. **No response arrives at all** (no internet, for example): `fetch` throws an error and the code would freeze.\n\nFor the second case there is `try { … } catch (error) { … }`: \"**try** this and, if something fails, do this instead\". It is the trapeze artist's safety net. 🎪\n\nIn the example, the file is misspelled on purpose (`jokez`). Fix it to `jokes` in your head: that is what success would look like.",
      ejemplo: {
        html: `<p id="status">Loading…</p>`,
        js: `const status = document.querySelector("#status");

async function load() {
  try {
    const response = await fetch("datos/jokez.json");
    if (!response.ok) {
      status.textContent = "😕 I can't find the file (error " + response.status + ")";
      return;
    }
    const jokes = await response.json();
    status.textContent = "✅ " + jokes.length + " jokes have arrived";
  } catch (error) {
    status.textContent = "🔌 Could not connect. Is there internet?";
    console.log(error);
  }
}

load();`
      },
      consejo: "The `return` inside the `if` makes the function end right there: if there is no file, there's no point trying to open the envelope with `.json()`."
    },
    {
      tipo: "ejercicio",
      enunciado: "Try success and error with two buttons. The HTML is already written. Careful: `datos/dinosaurs.json` **does not exist** (they went extinct! 🦖).\n\nCreate an `async` function with a `file` parameter that, inside a `try`:\n• Asks for that `file` with `fetch`.\n• If `response.ok` is `false`, put **Error ** followed by `response.status` in `#status` (**Error 404**) and end with `return`.\n• If not, turn it with `.json()` and put the amount + ** items have arrived** in `#status` (**4 items have arrived**).\n• In the `catch`, put **No connection**.\n\nThe button `#animals` calls it with `\"datos/animals.json\"` and `#dinosaurs` with `\"datos/dinosaurs.json\"`.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
button { font: inherit; padding: 8px 14px; margin-right: 6px; border: none; border-radius: 8px; background-color: #3949ab; color: white; }
#status { font-size: 22px; font-weight: bold; color: #3949ab; }`,
      inicial: {
        html: `<button id="animals">Ask for animals</button>
<button id="dinosaurs">Ask for dinosaurs</button>
<p id="status">Press a button</p>
`,
        js: ""
      },
      solucion: {
        html: `<button id="animals">Ask for animals</button>
<button id="dinosaurs">Ask for dinosaurs</button>
<p id="status">Press a button</p>
`,
        js: `const status = document.querySelector("#status");

async function request(file) {
  try {
    const response = await fetch(file);
    if (!response.ok) {
      status.textContent = "Error " + response.status;
      return;
    }
    const data = await response.json();
    status.textContent = data.length + " items have arrived";
  } catch (error) {
    status.textContent = "No connection";
  }
}

document.querySelector("#animals").addEventListener("click", () => {
  request("datos/animals.json");
});

document.querySelector("#dinosaurs").addEventListener("click", () => {
  request("datos/dinosaurs.json");
});
`
      },
      acciones: [
        { clic: "#dinosaurs" },
        { clic: "#animals" }
      ],
      pistas: [
        "Copy the shape of the previous example, but with fetch(file) instead of a fixed name. Then two addEventListener(\"click\", () => { request(\"…\"); }), one per button, each with its file.",
        "It should look like this:\nconst status = document.querySelector(\"#status\");\n\nasync function request(file) {\n  try {\n    const response = await fetch(file);\n    if (!response.ok) {\n      status.textContent = \"Error \" + response.status;\n      return;\n    }\n    const data = await response.json();\n    status.textContent = data.length + \" items have arrived\";\n  } catch (error) {\n    status.textContent = \"No connection\";\n  }\n}\n\ndocument.querySelector(\"#animals\").addEventListener(\"click\", () => {\n  request(\"datos/animals.json\");\n});\n\ndocument.querySelector(\"#dinosaurs\").addEventListener(\"click\", () => {\n  request(\"datos/dinosaurs.json\");\n});"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "What does `await` do in `const response = await fetch(\"datos/jokes.json\");`?",
      opciones: [
        "It waits for the response to arrive before moving on to the next line of the function",
        "It makes the file download faster",
        "It shows the response in the console"
      ],
      correcta: 0,
      explicacion: "await pauses the async function until the response arrives (without freezing the rest of the page). That way, on the next line you can use response with peace of mind."
    },
    {
      tipo: "reto",
      enunciado: "Build **the joke machine** 🤖. The HTML is already written.\n\n1. **At the start**, ask for `datos/jokes.json` **just once** with `fetch` (in an `async` function, with `try`/`catch` and `response.ok`) and save the list in the variable `jokes`.\n2. If something fails, put in `#question`: **I can't load the jokes 😢**\n3. **When you press** `#another`, show the joke's `question` in `#question` and its `answer` in `#answer`. Each press, the **next** one; after the last one, back to the first.",
      cssBase: `body { font-family: sans-serif; display: flex; justify-content: center; padding-top: 20px; background-color: #fff4d6; }
.machine { width: 340px; padding: 20px; background-color: white; border: 4px solid #f2b705; border-radius: 20px; text-align: center; box-shadow: 0 4px 0 #d49b00; }
h2 { margin-top: 0; }
#question { font-size: 20px; font-weight: bold; min-height: 2.5em; }
#answer { font-size: 18px; color: #b35c00; min-height: 1.5em; }
button { font: inherit; padding: 10px 20px; border: none; border-radius: 30px; background-color: #f2b705; color: #3d2c00; font-weight: bold; }`,
      inicial: {
        html: `<div class="machine">
  <h2>🤖 The joke machine</h2>
  <p id="question">Press the button to hear a joke</p>
  <p id="answer"></p>
  <button id="another">Tell a joke</button>
</div>
`,
        js: `const questionText = document.querySelector("#question");
const answerText = document.querySelector("#answer");
const button = document.querySelector("#another");

let jokes = [];   // you will save the jokes here when they arrive
let position = 0;   // which joke is next (starts at the first one)

// 1. Async function that asks for "datos/jokes.json" and saves the list in jokes
//    (with try/catch and response.ok: if something fails, warn in #question)

// 2. Call that function at the start

// 3. When the button is pressed: show the joke at the position that's next,
//    add 1 to position and, if you go past the last one, go back to 0
`
      },
      comprobaciones: [
        {
          texto: "When you press Tell a joke, the first joke's question and answer appear",
          prueba: async (doc) => {
            const list = CURSO.lecciones["js-13"]?.datos?.["jokes.json"] || [];
            if (!list.length) return false;
            const v = await PRUEBA.recargar(doc);
            v.doc.querySelector("#another")?.click();
            const texto = sel => v.doc.querySelector(sel)?.textContent || "";
            return PRUEBA.esperarA(() => texto("#question").includes(list[0].question) && texto("#answer").includes(list[0].answer), 1200);
          }
        },
        {
          texto: "Each press shows the next joke and, after the last one, the first one comes back",
          prueba: async (doc) => {
            const list = CURSO.lecciones["js-13"]?.datos?.["jokes.json"] || [];
            if (list.length < 2) return false;
            const v = await PRUEBA.recargar(doc);
            const button = v.doc.querySelector("#another");
            if (!button) return false;
            for (const joke of list.concat([list[0]])) {
              button.click();
              const ok = await PRUEBA.esperarA(() => (v.doc.querySelector("#question")?.textContent || "").includes(joke.question), 200);
              if (!ok) return false;
            }
            return true;
          }
        },
        {
          texto: "If the jokes can't be loaded, `#question` warns: **I can't load the jokes**",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc, { sinDatos: ["jokes.json"] });
            return await PRUEBA.esperarA(() => (v.doc.querySelector("#question")?.textContent || "").toLowerCase().includes("can't load"), 800);
          }
        }
      ],
      pistas: [
        "The loading function is like the one from the two-buttons exercise, but at the end it saves the list: jokes = await response.json(); (no const: the variable already exists). On the click: const joke = jokes[position]; paint joke.question and joke.answer, add 1 to position and, with an if, go back to 0 when position === jokes.length.",
        "It should look like this:\nasync function loadJokes() {\n  try {\n    const response = await fetch(\"datos/jokes.json\");\n    if (!response.ok) {\n      questionText.textContent = \"I can't load the jokes 😢\";\n      return;\n    }\n    jokes = await response.json();\n  } catch (error) {\n    questionText.textContent = \"I can't load the jokes 😢\";\n  }\n}\n\nloadJokes();\n\nbutton.addEventListener(\"click\", () => {\n  if (jokes.length === 0) {\n    return;\n  }\n  const joke = jokes[position];\n  questionText.textContent = joke.pregunta;\n  answerText.textContent = joke.respuesta;\n  position = position + 1;\n  if (position === jokes.length) {\n    position = 0;\n  }\n});"
      ],
      solucion: {
        html: `<div class="machine">
  <h2>🤖 The joke machine</h2>
  <p id="question">Press the button to hear a joke</p>
  <p id="answer"></p>
  <button id="another">Tell a joke</button>
</div>
`,
        js: `const questionText = document.querySelector("#question");
const answerText = document.querySelector("#answer");
const button = document.querySelector("#another");

let jokes = [];   // you will save the jokes here when they arrive
let position = 0;   // which joke is next (starts at the first one)

async function loadJokes() {
  try {
    const response = await fetch("datos/jokes.json");
    if (!response.ok) {
      questionText.textContent = "I can't load the jokes 😢";
      return;
    }
    jokes = await response.json();
  } catch (error) {
    questionText.textContent = "I can't load the jokes 😢";
  }
}

loadJokes();

button.addEventListener("click", () => {
  // If the jokes haven't arrived yet, we do nothing
  if (jokes.length === 0) {
    return;
  }
  const joke = jokes[position];
  questionText.textContent = joke.question;
  answerText.textContent = joke.answer;
  position = position + 1;
  if (position === jokes.length) {
    position = 0;
  }
});
`
      }
    }
  ]
});
