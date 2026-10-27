/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-01 (primera del mundo)
   ¿Qué es JavaScript? — JavaScript como «el cerebro de la web»,
   instrucción, console.log(), la consola, textos entre comillas
   y comentarios //.
   Notas:
   - Lección solo de consola: pestanas: ["js"] (el resultado es una
     consola grande).
   - Los ejercicios comparan las líneas de la consola: el enunciado
     da el texto exacto de cada console.log en negrita.
   - El segundo ejercicio trae código escrito: el alumno «apaga» una
     línea con //. El inicial muestra 4 líneas y la solución 3.
   - El reto mira win.__logs (líneas ya formateadas) y
     win.__errores.
   ============================================================ */
CURSO.registrar({
  id: "js-01",
  titulo: "What is JavaScript?",
  xp: 25,
  objetivo: "You will learn what JavaScript does on a web page and write your first instructions with console.log.",
  glosario: [
    { termino: "console.log()", tema: "Console", para: "Writes to the console: use it to see what a value is while you code.", ejemplo: "console.log(\"Hello, Huellas\");", buscar: "console show print debug" },
    { termino: "// comment", tema: "Console", para: "A note for people: the browser ignores it.", ejemplo: "// Mobile menu\nconsole.log(\"ready\");", buscar: "comment note explain" }
  ],
  pestanas: ["js"],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "The brain of the web",
      texto: "You already know how to build pages: **HTML** is the skeleton and **CSS** is the clothes and makeup. But your page still can't **think**: it doesn't respond when you press a button, it doesn't keep score, it doesn't remember your name…\n\nThat's what **JavaScript** (JS, to its friends) is for: the **brain** of the web. 🧠\n\nWith JavaScript you give **instructions** to the browser. An instruction is an order, like a step in a recipe. The browser reads them **top to bottom**, one by one. Each instruction usually ends with a semicolon `;`.\n\nIn the example there is your first instruction. On the right you can see what it does.",
      ejemplo: {
        js: `console.log("Hello, world!");`
      },
      consejo: "In this world you'll write in the **JS** tab ⚡. Don't worry! We'll go step by step, just like when you started with HTML."
    },
    {
      tipo: "explicacion",
      titulo: "The console: your notebook",
      texto: "What you see in the result is the **console**: a notebook where your program writes messages to you, the programmer. The people visiting the website don't see it.\n\n`console.log(…)` means \"write this to the console\". Look at its pieces:\n\n• `console`: the console.\n• `.log`: \"write it down\".\n• Inside the parentheses `( )`, what you want it to write down.\n\nEach `console.log` writes **one line**, and they come out in the same order you write them.",
      ejemplo: {
        js: `console.log("Hi, I'm Tagui");
console.log("I have two eyes and lots of eagerness to code");
console.log("Let's learn JavaScript!");`
      },
      consejo: "Capital and lowercase letters count: `console.log` is all lowercase. If you write `Console.log`, JavaScript has no idea what that is."
    },
    {
      tipo: "ejercicio",
      enunciado: "Write your first instruction: use `console.log` so the console shows **Hello, JavaScript!**",
      solucion: {
        js: `console.log("Hello, JavaScript!");
`
      },
      pistas: [
        "Write console.log, open a parenthesis, put the text in quotes and close the parenthesis. End with a semicolon.",
        "It should end up like this:\nconsole.log(\"Hello, JavaScript!\");"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Text goes in quotes",
      texto: "Have you noticed that text goes in **quotes**? That's how JavaScript knows it's a text and not one of its own commands.\n\nYou can use double quotes `\"Hello\"` or single quotes `'Hello'`: both work, but open and close with the same ones.\n\nIf you forget the quotes, JavaScript thinks `Pizza` is the name of something that already exists, can't find it… and complains. Look at the last line of the example: it has that mistake **on purpose**. The console tells you which line it's on and what happened. Errors are clues, not punishments! 🕵️",
      ejemplo: {
        js: `console.log("With double quotes");
console.log('With single quotes');
console.log(Pizza);`
      },
      consejo: "When you see an error, read the line the console points to. Almost always it's a quote, a parenthesis or a capital letter that got away."
    },
    {
      tipo: "explicacion",
      titulo: "Comments: notes for humans",
      texto: "Sometimes you want to leave a note in your code to remember what it does. That's what **comments** are for: everything after `//`, until the end of that line, JavaScript **ignores**.\n\nThey serve two purposes:\n\n• Explain your code (to other people, or to your future self).\n• \"Turn off\" an instruction without deleting it: put `//` in front and it stops running.\n\nIn HTML comments were `<!-- -->` and in CSS, `/* */`. In JavaScript, `//`.",
      ejemplo: {
        js: `// My first program
console.log("This line does show");
// console.log("This line doesn't show");
console.log("This one shows too"); // a note at the end`
      }
    },
    {
      tipo: "ejercicio",
      enunciado: "Tagui has written the ingredients of their pizza, but Tagui **doesn't like pineapple** 🍍.\n\nTurn the pineapple line into a **comment** by putting `//` in front of it (without deleting it), so the console only shows: **Pizza ingredients:**, **Tomato** and **Cheese**.",
      inicial: {
        js: `console.log("Pizza ingredients:");
console.log("Tomato");
console.log("Cheese");
console.log("Pineapple");
`
      },
      solucion: {
        js: `console.log("Pizza ingredients:");
console.log("Tomato");
console.log("Cheese");
// console.log("Pineapple");
`
      },
      pistas: [
        "Find the fourth line, the pineapple one, and write two slashes // right at the start.",
        "The last line should end up like this:\n// console.log(\"Pineapple\");"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Which of these instructions writes Hello to the console?",
      opciones: [
        "console.log(\"Hello\");",
        "Console.log(\"Hello\");",
        "console.log(Hello);"
      ],
      correcta: 0,
      explicacion: "console.log goes in lowercase and the text goes in quotes. With a capital C in Console, JavaScript can't find the console, and without quotes it thinks Hello is the name of something that doesn't exist."
    },
    {
      tipo: "reto",
      enunciado: "Introduce yourself in the console 👋:\n\n1. Show a **greeting** that contains the word **Hello** (for example, \"Hello! I'm Ana and I'm learning JavaScript\").\n2. Below it, show your favorite food with a sentence that says **favorite food** (for example, \"My favorite food is pizza\").\n3. No errors allowed: all text, in quotes.\n\nThe comments in the code tell you where each thing goes.",
      inicial: {
        js: `// 1. Show a greeting with the word "Hello"

// 2. Show your favorite food

`
      },
      comprobaciones: [
        {
          texto: "The console shows at least two messages",
          prueba: (doc, win) => (win.__logs || []).length >= 2
        },
        {
          texto: "One of the messages is a greeting with the word \"Hello\"",
          prueba: (doc, win) => (win.__logs || []).some(l => /hello/i.test(l))
        },
        {
          texto: "Another message mentions your \"favorite food\"",
          prueba: (doc, win) => (win.__logs || []).some(l => /favorite food/i.test(l))
        },
        {
          texto: "Your code has no errors (all text goes in quotes)",
          prueba: (doc, win) => (win.__logs || []).length > 0 && !(win.__errores || []).length
        }
      ],
      pistas: [
        "You need two console.log instructions, one under each comment. Each text goes in quotes inside the parentheses.",
        "For example:\nconsole.log(\"Hello! I'm Ana\");\nconsole.log(\"My favorite food is pizza\");"
      ],
      solucion: {
        js: `// 1. Show a greeting with the word "Hello"
console.log("Hello! I'm Ana and I'm learning JavaScript");

// 2. Show your favorite food
console.log("My favorite food is pizza 🍕");
`
      }
    }
  ]
});
