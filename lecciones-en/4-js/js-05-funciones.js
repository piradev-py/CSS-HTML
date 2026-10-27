/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-05 (inglés)
   Funciones — function (definir una «receta»), llamar a una
   función, parámetros, return y funciones flecha (solo
   presentación: se usarán en js-06 con los eventos).
   Notas:
   - ¡OJO! Ejemplos y soluciones con plantillas de texto llevan las
     comillas invertidas y los ${ escapados (\` y \${).
   - El primer ejercicio es solo de consola: lleva pestanas: ["js"]
     en el propio paso (leccion.js usa paso.pestanas si existe).
   - El reto usa win.eval("…") para llamar a la función del alumno:
     así vale tanto «function greet» como «const greet = () =>»
     (una const global no queda como propiedad de window, pero sí es
     visible para un eval indirecto en el ámbito global del marco).
   ============================================================ */
CURSO.registrar({
  id: "js-05",
  titulo: "Functions",
  xp: 40,
  objetivo: "You'll know how to group instructions into reusable functions, give them data with parameters and get a result back with return.",
  glosario: [
    { termino: "function", tema: "Functions", para: "A recipe with a name: you write it once and use it many times.", ejemplo: "function greet(name) {\n  return \"Hello, \" + name;\n}", buscar: "function recipe reuse" },
    { termino: "parameters and return", tema: "Functions", para: "What the function receives and what it gives back.", ejemplo: "function double(n) {\n  return n * 2;\n}\nconsole.log(double(4));", buscar: "parameter return result" },
    { termino: "arrow function", tema: "Functions", para: "The short way to write a function.", ejemplo: "const double = (n) => n * 2;", buscar: "arrow short" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "A function is a recipe",
      texto: "Imagine that every time you want a sponge cake you have to think through all the steps again. What a drag! Better to write the **recipe** once and, whenever you want cake, follow it. 🎂\n\nA **function** is just that: a group of instructions with a name.\n\n• **Defining** it is writing the recipe: `function`, a name, some parentheses `()` and, between braces `{ }`, the instructions. Writing the recipe **doesn't** cook anything.\n• **Calling** it is cooking: its name followed by `()`. For example, `singBirthday();`.\n\nYou can call it as many times as you want. In the example it's called **twice**.",
      ejemplo: {
        js: `function singBirthday() {
  console.log("Happy birthday to you 🎂");
  console.log("happy birthday to you");
}

singBirthday();
singBirthday();`
      },
      consejo: "To call a function, don't forget the parentheses: plain `singBirthday` does nothing; `singBirthday()` does run it."
    },
    {
      tipo: "explicacion",
      titulo: "Parameters: the ingredients",
      texto: "A milkshake recipe works for lots of fruits: “blend **the fruit** with milk”. The fruit changes each time. 🥤\n\nIn functions, the thing that changes is a **parameter**: a variable that goes between the parentheses when you define the function.\n\n`function greet(name) { … }`\n\nWhen you call it, you give it the value: `greet(\"Ana\")`. Inside the function, `name` is `\"Ana\"`. In the next call it can be something else.\n\nNeed several ingredients? Separate them with **commas**: `function introduce(name, age)`.",
      ejemplo: {
        js: `function greet(name) {
  console.log(\`Hi, \${name}! 👋\`);
}

greet("Ana");
greet("Leo");

function introduce(name, age) {
  console.log(\`\${name} is \${age} years old\`);
}

introduce("Luna", 4);`
      },
      consejo: "When you call it, the values go in the same order as the parameters: in `introduce(\"Luna\", 4)`, the first one is the name and the second, the age."
    },
    {
      tipo: "ejercicio",
      pestanas: ["js"],
      enunciado: "Introduce your pets 🐾:\n\n• Create a function `introduce` with a parameter `pet` that shows in the console, with a text template, **My pet's name is** followed by the name.\n• Then call it twice: with `\"Luna\"` and with `\"Tofu\"`.\n\nThe console should show **My pet's name is Luna** and **My pet's name is Tofu**.",
      solucion: {
        js: `function introduce(pet) {
  console.log(\`My pet's name is \${pet}\`);
}

introduce("Luna");
introduce("Tofu");
`
      },
      pistas: [
        "Write function introduce(pet) { … } and, between the braces, a console.log with a template (backticks) that has the ${pet} blank. Outside the braces, call the function twice.",
        "These are the lines:\nfunction introduce(pet) {\n  console.log( …template with: My pet's name is ${pet}… );\n}\nintroduce(\"Luna\");\nintroduce(\"Tofu\");"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "return: the function gives you something back",
      texto: "Until now functions **showed** things in the console. But often you want them to **give you back** a result for you to use, like a juicer: you put oranges in and it **gives you back** juice. 🍊\n\nThat's what `return` is for: `return amount * 8;`\n\nThe result appears right where you called the function, so you can store it in a variable or put it on the page with `textContent`.\n\nCareful: `return` also **ends** the function. Whatever you write below it, inside the function, doesn't run anymore.",
      ejemplo: {
        html: `<p>🍕 Five pizzas cost: <strong id="total"></strong></p>`,
        js: `function pizzaPrice(amount) {
  return amount * 8;
}

const three = pizzaPrice(3);
console.log(three);

const box = document.querySelector("#total");
box.textContent = \`$\${pizzaPrice(5)}\`;`
      },
      consejo: "`console.log` only **shows** a value in the console; `return` **hands it over** so you can use it. They're different things."
    },
    {
      tipo: "ejercicio",
      enunciado: "At the candy store 🍬 each candy costs $2. The HTML is already written.\n\n• Create a function `total` with a parameter `amount` that **returns** (with `return`) `amount * 2`.\n• Find `#total` and put what `total(6)` returns in its `textContent`. It should show **12**.",
      cssBase: `body { font-family: sans-serif; }
h2 { color: #c2255c; }
#total { font-weight: bold; color: #c2255c; }`,
      inicial: {
        html: `<h2>Candy store</h2>
<p>Six candies cost: $<span id="total"></span></p>
`,
        js: ""
      },
      solucion: {
        html: `<h2>Candy store</h2>
<p>Six candies cost: $<span id="total"></span></p>
`,
        js: `function total(amount) {
  return amount * 2;
}

const price = document.querySelector("#total");
price.textContent = total(6);
`
      },
      pistas: [
        "Inside the function you only need one line: return amount * 2; Then find #total with querySelector and give its .textContent total(6).",
        "It should look like this:\nfunction total(amount) {\n  return amount * 2;\n}\nconst price = document.querySelector(\"#total\");\nprice.textContent = total(6);"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Arrow functions: the short way",
      texto: "There's another way to write functions that you'll see **a lot**: **arrow functions**. They're called that because of their `=>` (an equals sign and a “greater than”).\n\n`const triple = (number) => { return number * 3; };`\n\nThey're stored in a constant and called just like the others: `triple(10)`.\n\nAnd if all it does is return something, you can drop the braces and the `return`: `const half = (number) => number / 2;`\n\nFor now it's enough that you recognize them: in the next lesson, with events, you'll use them often. ➡️",
      ejemplo: {
        js: `// Classic way
function double(number) {
  return number * 2;
}

// Arrow function: does the same
const triple = (number) => {
  return number * 3;
};

// Short arrow: only returns something
const half = (number) => number / 2;

console.log(double(10));
console.log(triple(10));
console.log(half(10));`
      },
      consejo: "Both ways are correct. Use whichever feels clearer to you; with time, the arrow will come naturally."
    },
    {
      tipo: "quiz",
      pregunta: "You write function greet() { console.log(\"Hello\"); } and nothing else. What shows up in the console?",
      opciones: [
        "Hello",
        "Nothing: the function is defined, but nobody has called it",
        "An error, because the return is missing"
      ],
      correcta: 1,
      explicacion: "Defining a function is writing the recipe, not cooking it. Until you write greet(); nothing runs. And return isn't required: you only use it when you want to give back a result."
    },
    {
      tipo: "reto",
      enunciado: "Welcome people to the book club 📚. The HTML is already written; you, in the JS tab:\n\n1. Create a function `greet` with a parameter `name` that **returns** (with `return`) a greeting that includes that name, for example: “Hi, Ana! Welcome to the club.”.\n2. Use the function to put the greeting for **Ana** in `#greeting1`.\n3. Use it again to put the greeting for **Leo** in `#greeting2`.",
      cssBase: `body { font-family: Georgia, serif; color: #343a40; background-color: #f8f0e3; padding: 8px 16px; }
h1 { color: #862e9c; }
p { font-size: 20px; }`,
      inicial: {
        html: `<h1>Book club</h1>
<p id="greeting1"></p>
<p id="greeting2"></p>
`,
        js: `// 1. Create the function greet(name) that RETURNS a greeting with that name

// 2. Put the greeting for Ana in #greeting1

// 3. Put the greeting for Leo in #greeting2

`
      },
      comprobaciones: [
        {
          texto: "There's a function called `greet`",
          prueba: (doc, win) => {
            try { return win.eval("typeof greet") === "function"; } catch (e) { return false; }
          }
        },
        {
          texto: "`greet(\"Zoe\")` returns (with `return`) a greeting that includes “Zoe”",
          prueba: (doc, win) => {
            try {
              const r = win.eval("greet(\"Zoe\")");
              return typeof r === "string" && r.includes("Zoe");
            } catch (e) { return false; }
          }
        },
        {
          texto: "`#greeting1` shows the greeting the function returns for Ana",
          prueba: (doc, win) => {
            try {
              const t = doc.querySelector("#greeting1")?.textContent || "";
              return t.includes("Ana") && t === String(win.eval("greet(\"Ana\")"));
            } catch (e) { return false; }
          }
        },
        {
          texto: "`#greeting2` shows the greeting the function returns for Leo",
          prueba: (doc, win) => {
            try {
              const t = doc.querySelector("#greeting2")?.textContent || "";
              return t.includes("Leo") && t === String(win.eval("greet(\"Leo\")"));
            } catch (e) { return false; }
          }
        }
      ],
      pistas: [
        "Inside the function, return and the greeting: you can use a text template with the ${name} blank. Then find #greeting1 and #greeting2 and, in the textContent of each one, put what greet(\"Ana\") and greet(\"Leo\") return.",
        "For example:\nfunction greet(name) {\n  return \"Hi, \" + name + \"! Welcome to the club.\";\n}\nconst greeting1 = document.querySelector(\"#greeting1\");\ngreeting1.textContent = greet(\"Ana\");\nconst greeting2 = document.querySelector(\"#greeting2\");\ngreeting2.textContent = greet(\"Leo\");"
      ],
      solucion: {
        html: `<h1>Book club</h1>
<p id="greeting1"></p>
<p id="greeting2"></p>
`,
        js: `// 1. Create the function greet(name) that RETURNS a greeting with that name
function greet(name) {
  return \`Hi, \${name}! Welcome to the club.\`;
}

// 2. Put the greeting for Ana in #greeting1
const greeting1 = document.querySelector("#greeting1");
greeting1.textContent = greet("Ana");

// 3. Put the greeting for Leo in #greeting2
const greeting2 = document.querySelector("#greeting2");
greeting2.textContent = greet("Leo");
`
      }
    }
  ]
});
