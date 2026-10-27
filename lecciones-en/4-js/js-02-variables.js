/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-02
   Variables y consola — variable, let, const, textos (strings),
   números, operadores + - * / y plantillas de texto con
   comillas invertidas y ${…}.
   Notas:
   - Lección solo de consola: pestanas: ["js"].
   - ¡OJO! Los ejemplos y soluciones con plantillas llevan las
     comillas invertidas y los ${ escapados (\` y \${) porque viven
     dentro de template literals de este archivo.
   - En los textos (mini-markdown) no se puede mostrar una comilla
     invertida dentro de `código`: se describe con palabras y se
     enseña en el ejemplo.
   - El reto mira win.__logs (busca dos números, el segundo 7 veces
     el primero) y el código del alumno
     (PRUEBA.codigo) para ver que usa variables, * y
     una plantilla.
   ============================================================ */
CURSO.registrar({
  id: "js-02",
  titulo: "Variables and the console",
  xp: 35,
  objetivo: "You'll learn to save data in variables with let and const, do math, and build sentences with text templates.",
  glosario: [
    { termino: "let", tema: "Variables", para: "A variable whose value can change.", ejemplo: "let visits = 0;\nvisits = visits + 1;", buscar: "variable change save value" },
    { termino: "const", tema: "Variables", para: "A variable that is not assigned again (the usual choice).", ejemplo: "const clinic = \"Huellas\";", buscar: "constant fixed variable" },
    { termino: "text templates", tema: "Variables", para: "A text with blanks `${…}`, between backticks.", ejemplo: "const name = \"Lucy\";\nconsole.log(`Hello, ${name}`);", buscar: "template backtick string join text" }
  ],
  pestanas: ["js"],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Variables: boxes with labels",
      texto: "Imagine a **box with a label** 📦: you put something inside and, thanks to the label, you find it later. That's a **variable**.\n\n`let pet = \"Luna\";` reads like this:\n\n• `let`: \"create a new box\".\n• `pet`: the label (the variable's name).\n• `=`: \"put it inside\" (here it doesn't mean \"equal\").\n• `\"Luna\"`: what you're saving.\n\nThen, to use what's inside, write the name **without quotes**: `console.log(pet)`. If you add quotes, the word \"pet\" comes out as-is. Compare both in the example!",
      ejemplo: {
        js: `let pet = "Luna";
console.log(pet);
console.log("pet");`
      },
      consejo: "Variable names: no spaces and no accents. If it's two words, join them and capitalize the second one: `favoriteFood`. And be careful: `Pet` and `pet` are different boxes!"
    },
    {
      tipo: "explicacion",
      titulo: "Text and numbers",
      texto: "In a variable you can save different kinds of data. The first two:\n\n• **Text** (in English, \"string\"): it goes between quotes. `\"Luna\"`.\n• **Number**: it goes **without** quotes. `5`, `3.5` (decimals use a **period**, not a comma).\n\nWith numbers you can do math, like on a calculator 🧮: `+` adds, `-` subtracts, `*` multiplies and `/` divides.\n\nBut careful: with text, `+` doesn't add, it **glues**! `\"5\" + \"3\"` gives `53`. Look at the last line of the example.",
      ejemplo: {
        js: `let apples = 5;
let pears = 3;
console.log(apples + pears);
console.log(apples - pears);
console.log(apples * 2);
console.log(10 / 4);
console.log("5" + "3");`
      },
      consejo: "If a calculation comes out strange, check whether your numbers have quotes: `\"5\"` is a text that looks like a number, not a number."
    },
    {
      tipo: "ejercicio",
      enunciado: "At the video game store 🎮 each game costs **20** and you buy **3**.\n\n• Use `let` to create a `price` variable that stores the number `20`.\n• Use `let` to create an `amount` variable that stores the number `3`.\n• Show the total in the console by multiplying the two variables. It should come out **60**.",
      solucion: {
        js: `let price = 20;
let amount = 3;
console.log(price * amount);
`
      },
      pistas: [
        "First create the two variables, each one on its own line: let, the name, = and the number (no quotes). Then, inside console.log, multiply the variables with *.",
        "It should end up like this:\nlet price = 20;\nlet amount = 3;\nconsole.log(price * amount);"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "let or const: will it change?",
      texto: "There are two ways to create a variable:\n\n• `let`: a box you can **empty and refill** later. To change it, write its name, `=` and the new value, **without** repeating `let`: `lives = lives - 1;` (\"take the lives that there are, subtract 1 and save it\").\n• `const`: a **sealed** box 🔒. It's filled once and can't be changed again. If you try, JavaScript complains (look at the last line of the example).\n\nThe professionals' rule: use `const` whenever you can, and `let` only for what's going to change.",
      ejemplo: {
        js: `const player = "Tagui";
let lives = 3;
console.log(lives);

lives = lives - 1;
console.log(lives);
console.log(player);

player = "Another"; // This gives an error!`
      },
      consejo: "`let` or `const` is written **only once**, when you create the box. If you write `let lives` again, JavaScript warns you that the box already exists."
    },
    {
      tipo: "explicacion",
      titulo: "Text templates: sentences with blanks",
      texto: "To mix text and variables you can glue it all together with `+`, but it's easy to get tangled up with the quotes and the spaces.\n\nThere's something more comfortable: **text templates**. They're like a form with blanks to fill in:\n\n1. Instead of regular quotes, use **backticks**: on a Spanish layout, the key to the right of **P**; on a Latin American one, **Alt Gr** + the **}** key (press it and then the space bar).\n2. Inside, each blank is written `${nameOfTheVariable}` and it fills in by itself.\n\nIn a blank you can also do some math: `${age + 1}`. Compare the `+` version and the template version in the example.",
      ejemplo: {
        js: `const name = "Luna";
const age = 4;
console.log("Hello, " + name + "!");
console.log(\`Hello, \${name}!\`);
console.log(\`\${name} is \${age} years old\`);
console.log(\`Next year she'll turn \${age + 1}\`);`
      },
      consejo: "The blanks `${…}` only work with backticks. With regular quotes, `${name}` comes out written exactly like that. It's the most typical slip-up!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Keep the scoreboard of a game 🕹️:\n\n• Use `const` to create a `player` variable with the text `\"Tagui\"`.\n• Use `let` to create a `points` variable with the number `100`.\n• With a **text template**, show in the console **Tagui has 100 points**.\n• Then add 50 to `points` (without writing `let` again) and show the same template once more: now it should come out **Tagui has 150 points**.",
      solucion: {
        js: `const player = "Tagui";
let points = 100;
console.log(\`\${player} has \${points} points\`);
points = points + 50;
console.log(\`\${player} has \${points} points\`);
`
      },
      pistas: [
        "The template goes between backticks (to the right of P; on Latin American keyboards, Alt Gr + }) and each variable goes inside ${ }. To add: points = points + 50;",
        "It's five lines: create player with const and points with let; then console.log with the template (backticks and inside: ${player} has ${points} points); then points = points + 50; and finally the same console.log again."
      ]
    },
    {
      tipo: "quiz",
      pregunta: "What comes out in the console with console.log(\"4\" + \"2\"); ?",
      opciones: [
        "6",
        "42",
        "An error"
      ],
      correcta: 1,
      explicacion: "With quotes, \"4\" and \"2\" are texts, not numbers. And with text the + doesn't add: it glues them. That's why you get 42. Without quotes, 4 + 2 would indeed give 6."
    },
    {
      tipo: "reto",
      enunciado: "Work out your dog's age in **human years** 🐶 (they say each dog year equals **7** human years):\n\n1. Save your dog's name (real or made up) in a variable.\n2. Save its age in dog years (a number) in another variable.\n3. Work out its human age by **multiplying** that variable by `7` with `*`, and save it in another variable.\n4. Show in the console a sentence with a **text template** that says the dog age first and then the human age, for example: **Rex is 5 years old, which is 35 human years**.",
      inicial: {
        js: `// 1. Your dog's name

// 2. Its age in dog years

// 3. Its age in human years (multiply by 7)

// 4. Show the sentence with a text template

`
      },
      comprobaciones: [
        {
          texto: "You save the data in variables (with `const` or `let`)",
          prueba: (doc) => {
            const codigo = PRUEBA.codigo(doc);
            return /\b(const|let)\s+[A-Za-z_$][\w$]*\s*=/.test(codigo);
          }
        },
        {
          texto: "You work out the human age by multiplying with `*`",
          prueba: (doc) => {
            const codigo = PRUEBA.codigo(doc);
            return /\*/.test(codigo);
          }
        },
        {
          texto: "You show the sentence with a text template (backticks and blanks `${…}`)",
          prueba: (doc) => {
            const codigo = PRUEBA.codigo(doc);
            return /`[^`]*\$\{[^}]+\}[^`]*`/.test(codigo);
          }
        },
        {
          texto: "The console shows the dog age and, after it, the human age (7 times as much)",
          prueba: (doc, win) => (win.__logs || []).some(l => {
            const n = (String(l).match(/\d+(\.\d+)?/g) || []).map(Number);
            return n.some((a, i) => a > 0 && n.slice(i + 1).some(b => Math.abs(b - a * 7) < 0.001));
          })
        }
      ],
      pistas: [
        "Use const for the name (a text between quotes) and for the age (a number without quotes). The human age is the age multiplied by 7: age * 7. At the end, a console.log with a template.",
        "For example:\nconst name = \"Rex\";\nconst age = 5;\nconst humanAge = age * 7;\nAnd in the console.log, between backticks: ${name} is ${age} years old, which is ${humanAge} human years"
      ],
      solucion: {
        js: `// 1. Your dog's name
const name = "Rex";

// 2. Its age in dog years
const age = 5;

// 3. Its age in human years (multiply by 7)
const humanAge = age * 7;

// 4. Show the sentence with a text template
console.log(\`\${name} is \${age} years old, which is \${humanAge} human years\`);
`
      }
    }
  ]
});
