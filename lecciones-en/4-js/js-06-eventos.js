/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-06
   Eventos — qué es un evento, addEventListener, click, input,
   una función como respuesta, variables que cambian con cada
   clic (contador = contador + 1, += y ++) y leer lo escrito en
   un campo con campo.value (js-11 lo repasa y añade .trim()).
   Notas:
   - Todos los ejercicios llevan `acciones`: sin ellas se
     aprobarían con el editor vacío.
   - El ejercicio del interruptor detecta el error de escribir
     encender() con paréntesis: la luz saldría ya encendida y la
     página inicial no coincidiría.
   - El reto usa PRUEBA.recargar en cada comprobación para que
     los clics de una no se sumen a los de la siguiente.
   - Cuidado: los ${…} de los ejemplos van escapados (\${…}).
   ============================================================ */
CURSO.registrar({
  id: "js-06",
  titulo: "Events: responding to the user",
  xp: 45,
  objetivo: "You will be able to make your page react when someone presses a button or types in a field.",
  glosario: [
    { termino: "addEventListener", tema: "Events", para: "It does something when an event happens on an element.", ejemplo: "button.addEventListener(\"click\", () => {\n  menu.classList.toggle(\"open\");\n});", buscar: "event listen click press" },
    { termino: "\"click\" and \"input\"", tema: "Events", para: "`click`: when you press; `input`: every time something is typed in a field.", ejemplo: "field.addEventListener(\"input\", () => {\n  console.log(field.value);\n});", buscar: "click type field" },
    { termino: "field.value", tema: "Events", para: "What is written or chosen in a field.", ejemplo: "const name = document.querySelector(\"#name\").value;", buscar: "value read field typed" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "The page listens",
      texto: "An **event** is something that happens on the page: a click, a key, the mouse moving… It's like the doorbell at home 🔔: you're not staring at the door all day, but **when it rings**, you go and open.\n\nWith `addEventListener` you tell an element: «when **this** happens to you, do **that**». You pass it two things:\n\n1. The name of the event, in quotes: `\"click\"` (press).\n2. The function that will run every time it happens.\n\nPress the button in the result and watch the page and the console.",
      ejemplo: {
        html: `<button id="greet">Press here</button>
<p id="message">Nobody has pressed me yet.</p>`,
        js: `const button = document.querySelector("#greet");
const message = document.querySelector("#message");

function sayHello() {
  message.textContent = "Hello! You pressed me 👋";
  console.log("Click on the button");
}

button.addEventListener("click", sayHello);`
      },
      consejo: "Write `sayHello` **without parentheses**. If you put `sayHello()`, the function runs right at that moment, without waiting for the click. It's mistake number one with events!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Make the light bulb switch work. The HTML is already written.\n\n• Find the button `#switch` and the paragraph `#bulb`.\n• Create a function that changes the text of `#bulb` to **On** and adds the class `on` to it.\n• Make that function run on the `click` event of the `#switch` button.\n\nAt first the bulb must stay **Off**: it only turns on when pressed.",
      cssBase: `body { font-family: sans-serif; text-align: center; padding-top: 20px; }
.bulb { display: inline-block; padding: 16px 28px; font-size: 22px; border-radius: 40px; background-color: #ddd; color: #555; }
.bulb::before { content: "💡 "; }
.on { background-color: gold; color: #5a4400; box-shadow: 0 0 30px gold; }
button { display: block; margin: 20px auto 0; padding: 10px 20px; font-size: 18px; border: none; border-radius: 8px; background-color: slateblue; color: white; }`,
      inicial: {
        html: `<p id="bulb" class="bulb">Off</p>
<button id="switch">Turn on</button>
`,
        js: ""
      },
      solucion: {
        html: `<p id="bulb" class="bulb">Off</p>
<button id="switch">Turn on</button>
`,
        js: `const lightSwitch = document.querySelector("#switch");
const bulb = document.querySelector("#bulb");

function turnOn() {
  bulb.textContent = "On";
  bulb.classList.add("on");
}

lightSwitch.addEventListener("click", turnOn);
`
      },
      acciones: [{ clic: "#switch" }],
      pistas: [
        "First store the two elements in constants with document.querySelector. Then write the function with the two commands (textContent and classList.add). Finally, lightSwitch.addEventListener(\"click\", …) with the name of the function, no parentheses.",
        "It should look like this:\nconst lightSwitch = document.querySelector(\"#switch\");\nconst bulb = document.querySelector(\"#bulb\");\n\nfunction turnOn() {\n  bulb.textContent = \"On\";\n  bulb.classList.add(\"on\");\n}\n\nlightSwitch.addEventListener(\"click\", turnOn);"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Counting clicks",
      texto: "What if you want to count how many times it gets pressed? Keep the count in a variable with `let` (with `const` you couldn't change it) and, **inside** the function, add 1 to it:\n\n`clicks = clicks + 1;`\n\nRead it right to left: «take whatever `clicks` is worth, add 1 to it and store it back in `clicks`». There are two shortcuts that do the same: `clicks += 1;` and `clicks++;`.\n\nAlso notice in the example: the function is written **inside** the `addEventListener`, as an arrow function `() => { … }`. It's very common when the function is only used there.",
      ejemplo: {
        html: `<button id="cookie">🍪 Eat a cookie</button>
<p>Cookies eaten: <span id="count">0</span></p>`,
        js: `let clicks = 0;
const cookie = document.querySelector("#cookie");
const count = document.querySelector("#count");

cookie.addEventListener("click", () => {
  clicks = clicks + 1;
  count.textContent = clicks;
  console.log(\`You've eaten \${clicks} cookies\`);
});`
      },
      consejo: "The variable `let clicks = 0;` goes **outside** the function. If you put it inside, it starts back at 0 on every click and your counter will never get past 1. 😅"
    },
    {
      tipo: "explicacion",
      titulo: "Listening to what is typed: input and value",
      texto: "Text fields (`<input>`) have their own event: `\"input\"`. It fires **every time** what's typed changes: with every letter you add or delete.\n\nTo know what is typed, read the field's `value` property: `field.value`. It is always **text**, even if you type numbers.\n\nType in the field in the result and watch the heading change as you type. ⌨️",
      ejemplo: {
        html: `<label for="title">Your movie's title:</label>
<input id="title" type="text">
<h2 id="sign">(no title)</h2>`,
        js: `const field = document.querySelector("#title");
const sign = document.querySelector("#sign");

field.addEventListener("input", () => {
  sign.textContent = \`🎬 \${field.value}\`;
});`
      },
      consejo: "`value` is what's typed in the field; `textContent` is the text of a normal tag, like a `<p>`. In an `<input>`, `textContent` is always empty."
    },
    {
      tipo: "ejercicio",
      enunciado: "Greet the pet while their name is typed. The HTML is already written.\n\n• Listen to the `input` event of the `#name` field.\n• Every time it fires, put in the `#greeting` paragraph the text **Hello, ** followed by whatever is typed in the field. If `Toby` is typed, it must say **Hello, Toby**.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
label { display: block; margin-bottom: 6px; font-weight: bold; }
input { padding: 8px; font-size: 18px; border: 2px solid #c2410c; border-radius: 8px; }
#greeting { font-size: 24px; color: #c2410c; }`,
      inicial: {
        html: `<label for="name">What's your pet's name?</label>
<input id="name" type="text">
<p id="greeting">🐾</p>
`,
        js: ""
      },
      solucion: {
        html: `<label for="name">What's your pet's name?</label>
<input id="name" type="text">
<p id="greeting">🐾</p>
`,
        js: `const name = document.querySelector("#name");
const greeting = document.querySelector("#greeting");

name.addEventListener("input", () => {
  greeting.textContent = \`Hello, \${name.value}\`;
});
`
      },
      acciones: [
        { escribir: "#name", texto: "Toby" },
        { escribir: "#name", texto: "Misi" }
      ],
      pistas: [
        "Store the field and the paragraph in constants. Then name.addEventListener(\"input\", () => { … }) and, inside, change the textContent of #greeting using name.value.",
        "It should look like this:\nconst name = document.querySelector(\"#name\");\nconst greeting = document.querySelector(\"#greeting\");\n\nname.addEventListener(\"input\", () => {\n  greeting.textContent = \"Hello, \" + name.value;\n});\n(A template string with backticks works too.)"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "You have the function `jump()` and you want it to run when a button is pressed. Which line is the right one?",
      opciones: [
        "button.addEventListener(\"click\", jump);",
        "button.addEventListener(\"click\", jump());",
        "button.addEventListener(click, jump);"
      ],
      correcta: 0,
      explicacion: "You pass the function by its name, without parentheses, so the browser calls it when the click arrives. With jump() it would run right away, and the name of the event goes in quotes: \"click\"."
    },
    {
      tipo: "reto",
      enunciado: "Create the **like** button ❤️ of your social network:\n\n1. Every time the `#like` button is pressed, the `#counter` counter must **add 1** (it starts at 0).\n2. When pressed, also add the class `active` to the button (it will turn red) with `classList.add`.",
      cssBase: `body { font-family: sans-serif; display: flex; justify-content: center; padding-top: 30px; background-color: #f4f4f8; }
.post { width: 280px; padding: 16px; background-color: white; border-radius: 16px; box-shadow: 0 2px 10px rgb(0 0 0 / 0.1); text-align: center; }
.photo { font-size: 80px; margin: 0; }
#like { padding: 10px 20px; font-size: 18px; border: 2px solid crimson; border-radius: 30px; background-color: white; color: crimson; }
#like.active { background-color: crimson; color: white; }`,
      inicial: {
        html: `<article class="post">
  <p class="photo">🐶</p>
  <p>Toby at the beach</p>
  <button id="like">❤️ Like</button>
  <p><span id="counter">0</span> likes</p>
</article>
`,
        js: `const button = document.querySelector("#like");
const counter = document.querySelector("#counter");

// 1. Create a variable with let to count the likes (it starts at 0)

// 2. Listen to the button's click and, inside:
//    - add 1 to your variable
//    - put its value in the counter
//    - add the class "active" to the button
`
      },
      comprobaciones: [
        {
          texto: "Pressing the button once, the counter shows **1**",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            v.doc.querySelector("#like")?.click();
            return v.doc.querySelector("#counter")?.textContent.trim() === "1";
          }
        },
        {
          texto: "Pressing it three times, it shows **3**: it adds 1 on every click",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const b = v.doc.querySelector("#like");
            if (!b) return false;
            b.click(); b.click(); b.click();
            return v.doc.querySelector("#counter")?.textContent.trim() === "3";
          }
        },
        {
          texto: "At first the button doesn't have the class `active`, and after pressing it does",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const b = v.doc.querySelector("#like");
            if (!b || b.classList.contains("active")) return false;
            b.click();
            return b.classList.contains("active");
          }
        }
      ],
      pistas: [
        "You need let likes = 0; outside the function (if you put it inside, it goes back to 0 on every click). Then button.addEventListener(\"click\", () => { … }) and, inside, the three commands: add up, display and add the class.",
        "It should look like this:\nlet likes = 0;\n\nbutton.addEventListener(\"click\", () => {\n  likes = likes + 1;\n  counter.textContent = likes;\n  button.classList.add(\"active\");\n});"
      ],
      solucion: {
        html: `<article class="post">
  <p class="photo">🐶</p>
  <p>Toby at the beach</p>
  <button id="like">❤️ Like</button>
  <p><span id="counter">0</span> likes</p>
</article>
`,
        js: `const button = document.querySelector("#like");
const counter = document.querySelector("#counter");

let likes = 0;

button.addEventListener("click", () => {
  likes = likes + 1;
  counter.textContent = likes;
  button.classList.add("active");
});
`
      }
    }
  ]
});
