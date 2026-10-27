/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-07 (inglés)
   Condiciones — booleanos (true/false), comparaciones (===, !==,
   >, <, >=, <=), if, else, else if, && y ||. Introduce además la
   longitud de un texto (texto.length / campo.value.length), que
   necesita el reto del semáforo (js-08 la extiende a arrays).
   Notas:
   - Las condiciones se practican siempre con eventos y varias
     `acciones` con valores distintos: así una solución sin if
     (que pinte siempre el mismo texto) no se aprueba.
   - Se compara longitud (un número) en vez de campo.value con
     números: así no hace falta explicar todavía Number().
   - El reto prueba los bordes (6 y 9 → medium, 10 → strong) para
     que el alumno piense en < frente a <=; el enunciado lo dice.
   - Cuidado: los ${…} de los ejemplos van escapados (\${…}).
   ============================================================ */
CURSO.registrar({
  id: "js-07",
  titulo: "Conditions",
  xp: 40,
  objetivo: "You'll know how to make your code make decisions with if, else and comparisons.",
  glosario: [
    { termino: "if / else", tema: "Conditions", para: "Does one thing if the condition is met and another if it isn't.", ejemplo: "if (appointments.length === 0) {\n  notice.textContent = \"No appointments\";\n} else {\n  notice.textContent = \"\";\n}", buscar: "if condition decide" },
    { termino: "=== and !==", tema: "Conditions", para: "Is it equal? Is it different?", ejemplo: "if (field.value !== \"\") {\n  console.log(\"Written\");\n}", buscar: "equal different compare" },
    { termino: "> < >= <=", tema: "Conditions", para: "Greater, less, greater or equal, less or equal (also with time texts).", ejemplo: "if (time >= \"09:00\" && time <= \"20:30\") {\n  console.log(\"Open\");\n}", buscar: "greater less compare" },
    { termino: "&& and ||", tema: "Conditions", para: "`&&`: both are met; `||`: one is enough.", ejemplo: "const valid = email.includes(\"@\") && email.includes(\".\");", buscar: "and or several conditions" },
    { termino: ".length", tema: "Conditions", para: "How many characters a text has (or how many elements, an array).", ejemplo: "if (phone.length === 9) {\n  console.log(\"Good\");\n}", buscar: "length letters how many" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "True or false?",
      texto: "To make decisions, code asks **questions** that only have two answers: `true` or `false`. These two values are called **booleans**.\n\nQuestions are asked with **comparisons**:\n• `===` is it equal? · `!==` is it different?\n• `>` is it greater? · `<` is it less?\n• `>=` greater or equal? · `<=` less or equal?\n\nLook in the console at what each question answers. 🤔",
      ejemplo: {
        js: `const age = 12;

console.log(age > 10);          // is 12 greater than 10?
console.log(age < 5);           // is 12 less than 5?
console.log(age === 12);        // is 12 equal to 12?
console.log("cat" === "dog");   // are they the same text?
console.log("cat" !== "dog");   // are they different?`
      },
      consejo: "One `=` **stores** a value in a variable; three `===` **compare**. If you write `if (age = 12)` you aren't asking anything: you're changing the age! It's a classic mistake."
    },
    {
      tipo: "explicacion",
      titulo: "If this happens… and if not…",
      texto: "With `if` the code only runs when the question is `true`. With `else` you choose what to do when it's `false`. It's like in real life: **if** it rains, you take the umbrella ☔; **otherwise**, the sunglasses 😎.\n\nThe question goes in **parentheses** and what happens in each case, in **braces**.\n\nIn the example, the check happens when you press the button. Type an answer, press it and also try `Mars`.",
      ejemplo: {
        html: `<p>Which is the red planet?</p>
<input id="answer" type="text">
<button id="check">Check</button>
<p id="result"></p>`,
        js: `const answer = document.querySelector("#answer");
const result = document.querySelector("#result");

document.querySelector("#check").addEventListener("click", () => {
  if (answer.value === "Mars") {
    result.textContent = "Correct! 🚀";
  } else {
    result.textContent = "Almost… try again";
  }
});`
      },
      consejo: "For the computer, `\"mars\"` and `\"Mars\"` are **different** texts: capital letters count when comparing with `===`."
    },
    {
      tipo: "ejercicio",
      enunciado: "The castle door 🏰 only opens with the right password. The HTML is already written.\n\nWhen the `#enter` button is pressed:\n• If what's typed in `#password` is exactly `treasure`, put the text **Welcome to the castle!** in `#door`.\n• If not, put **Wrong password**.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
input { padding: 8px; font-size: 18px; border-radius: 8px; border: 2px solid #666; }
button { padding: 9px 16px; font-size: 18px; border: none; border-radius: 8px; background-color: #6b4f2a; color: white; }
#door { font-size: 22px; font-weight: bold; }`,
      inicial: {
        html: `<label for="password">Password:</label>
<input id="password" type="text">
<button id="enter">Enter</button>
<p id="door">🔒 The door is closed</p>
`,
        js: ""
      },
      solucion: {
        html: `<label for="password">Password:</label>
<input id="password" type="text">
<button id="enter">Enter</button>
<p id="door">🔒 The door is closed</p>
`,
        js: `const password = document.querySelector("#password");
const door = document.querySelector("#door");

document.querySelector("#enter").addEventListener("click", () => {
  if (password.value === "treasure") {
    door.textContent = "Welcome to the castle!";
  } else {
    door.textContent = "Wrong password";
  }
});
`
      },
      acciones: [
        { escribir: "#password", texto: "dragon" },
        { clic: "#enter" },
        { escribir: "#password", texto: "treasure" },
        { clic: "#enter" }
      ],
      pistas: [
        "Inside the click's addEventListener goes an if that compares password.value with \"treasure\" using ===. In the if's braces, one text; in the else's, the other.",
        "It should look like this:\nconst password = document.querySelector(\"#password\");\nconst door = document.querySelector(\"#door\");\n\ndocument.querySelector(\"#enter\").addEventListener(\"click\", () => {\n  if (password.value === \"treasure\") {\n    door.textContent = \"Welcome to the castle!\";\n  } else {\n    door.textContent = \"Wrong password\";\n  }\n});"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "How many characters? .length",
      texto: "Every text knows how many characters it has (letters, numbers, spaces and symbols): it's its **length**, and you read it with `.length`.\n\n`\"cat\".length` is `3`.\n\nWith a text field: `field.value.length` tells you how many characters are typed. It's a **number**, so you can compare it with `>`, `<`, `>=`… Perfect for an `if`!\n\nType in the result and watch the count change.",
      ejemplo: {
        html: `<label for="post">What are you thinking?</label>
<input id="post" type="text">
<p id="count">0 characters</p>`,
        js: `const post = document.querySelector("#post");
const count = document.querySelector("#count");

console.log("cat".length);

post.addEventListener("input", () => {
  count.textContent = \`\${post.value.length} characters\`;
});`
      },
      consejo: "`length` goes **without parentheses**: it isn't an instruction that runs, but a piece of data the text already has stored."
    },
    {
      tipo: "ejercicio",
      enunciado: "Choose your player's nickname 🎮, but not too long. The HTML is already written.\n\nWith the `input` event of the `#nickname` field:\n• If the nickname has **more than 8** characters, put the text **Too long** in `#notice`.\n• If not, put **Perfect**.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
input { padding: 8px; font-size: 18px; border-radius: 8px; border: 2px solid seagreen; }
#notice { font-size: 20px; font-weight: bold; }`,
      inicial: {
        html: `<label for="nickname">Your nickname:</label>
<input id="nickname" type="text">
<p id="notice">Type a nickname</p>
`,
        js: ""
      },
      solucion: {
        html: `<label for="nickname">Your nickname:</label>
<input id="nickname" type="text">
<p id="notice">Type a nickname</p>
`,
        js: `const nickname = document.querySelector("#nickname");
const notice = document.querySelector("#notice");

nickname.addEventListener("input", () => {
  if (nickname.value.length > 8) {
    notice.textContent = "Too long";
  } else {
    notice.textContent = "Perfect";
  }
});
`
      },
      acciones: [
        { escribir: "#nickname", texto: "Bolt" },
        { escribir: "#nickname", texto: "Superchampion" },
        { escribir: "#nickname", texto: "Starfire" }
      ],
      pistas: [
        "Listen to the field's \"input\" event and, inside, an if that asks whether nickname.value.length is greater than 8.",
        "It should look like this:\nconst nickname = document.querySelector(\"#nickname\");\nconst notice = document.querySelector(\"#notice\");\n\nnickname.addEventListener(\"input\", () => {\n  if (nickname.value.length > 8) {\n    notice.textContent = \"Too long\";\n  } else {\n    notice.textContent = \"Perfect\";\n  }\n});"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "More than two paths: else if, && and ||",
      texto: "What if there are more than two options? Chain questions with `else if`. They're checked **in order** and only the **first** one that's `true` runs.\n\nYou can also join questions:\n• `&&` (“and”): `true` only if **both** are.\n• `||` (“or”): `true` if **at least one** is.\n\nWith 75 points, which medal do you get? Look in the console and think about what would come out with 95 or with 40.",
      ejemplo: {
        js: `const points = 75;

if (points >= 90) {
  console.log("🥇 Gold medal");
} else if (points >= 70) {
  console.log("🥈 Silver medal");
} else {
  console.log("Keep training 💪");
}

const day = "Saturday";
const sunny = true;
console.log(day === "Saturday" || day === "Sunday"); // is it the weekend?
console.log(day === "Saturday" && sunny === true);   // Saturday and sunny?`
      },
      consejo: "Order matters: if you ask `points >= 70` first, a 95 would get silver! Put the most demanding condition first."
    },
    {
      tipo: "quiz",
      pregunta: "With `const age = 15;`, what does `console.log(age >= 12 && age < 14);` show?",
      opciones: ["true", "false", "15"],
      correcta: 1,
      explicacion: "With && both questions must be true. 15 >= 12 is true, but 15 < 14 is false, so the result is false."
    },
    {
      tipo: "reto",
      enunciado: "Make a **password traffic light** 🚦. While typing in `#password` (`input` event), check how many characters it has and put in `#level`:\n\n1. Fewer than 6 characters: the text **weak** and the color `red`.\n2. From 6 to 9 characters (both included): **medium** and the color `orange`.\n3. 10 characters or more: **strong** and the color `green`.\n\nFor the color use `level.style.color`.",
      cssBase: `body { font-family: sans-serif; padding: 20px; background-color: #f4f4f8; }
.box { max-width: 320px; padding: 16px; background-color: white; border-radius: 12px; box-shadow: 0 2px 10px rgb(0 0 0 / 0.1); }
label { display: block; font-weight: bold; margin-bottom: 6px; }
input { width: 100%; box-sizing: border-box; padding: 8px; font-size: 18px; border-radius: 8px; border: 2px solid #999; }
#level { font-size: 22px; font-weight: bold; text-transform: uppercase; }`,
      inicial: {
        html: `<div class="box">
  <label for="password">Choose a password</label>
  <input id="password" type="password">
  <p id="level">Type a password</p>
</div>
`,
        js: `const password = document.querySelector("#password");
const level = document.querySelector("#level");

password.addEventListener("input", () => {
  const length = password.value.length;

  // Fewer than 6: "weak" in red
  // From 6 to 9: "medium" in orange
  // 10 or more: "strong" in green
});
`
      },
      comprobaciones: [
        {
          texto: "With a short password, like `cat`, it says **weak** in red",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const n = v.doc.querySelector("#level");
            if (!n) return false;
            PRUEBA.escribir(v.doc.querySelector("#password"), "cat");
            return /weak/i.test(n.textContent) && v.win.getComputedStyle(n).color === "rgb(255, 0, 0)";
          }
        },
        {
          texto: "With 6 characters (`kitten`) and with 9 (`kitten123`) it says **medium** in orange",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const n = v.doc.querySelector("#level");
            const c = v.doc.querySelector("#password");
            if (!n || !c) return false;
            const isMedium = () => n.textContent.toLowerCase().includes("medium") && v.win.getComputedStyle(n).color === "rgb(255, 165, 0)";
            PRUEBA.escribir(c, "kitten");
            const six = isMedium();
            PRUEBA.escribir(c, "kitten123");
            return six && isMedium();
          }
        },
        {
          texto: "With 10 characters or more (`superstrong`) it says **strong** in green",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const n = v.doc.querySelector("#level");
            if (!n) return false;
            PRUEBA.escribir(v.doc.querySelector("#password"), "superstrong");
            return n.textContent.toLowerCase().includes("strong") && v.win.getComputedStyle(n).color === "rgb(0, 128, 0)";
          }
        }
      ],
      pistas: [
        "Use if, else if and else with the length variable. First ask whether length < 6, then whether length < 10 (if it gets there, you already know it has 6 or more) and, if not, it's strong. In each case, change textContent and style.color.",
        "Inside the addEventListener, below const length, write:\nif (length < 6) {\n  level.textContent = \"weak\";\n  level.style.color = \"red\";\n} else if (length < 10) {\n  level.textContent = \"medium\";\n  level.style.color = \"orange\";\n} else {\n  level.textContent = \"strong\";\n  level.style.color = \"green\";\n}"
      ],
      solucion: {
        html: `<div class="box">
  <label for="password">Choose a password</label>
  <input id="password" type="password">
  <p id="level">Type a password</p>
</div>
`,
        js: `const password = document.querySelector("#password");
const level = document.querySelector("#level");

password.addEventListener("input", () => {
  const length = password.value.length;

  if (length < 6) {
    level.textContent = "weak";
    level.style.color = "red";
  } else if (length < 10) {
    level.textContent = "medium";
    level.style.color = "orange";
  } else {
    level.textContent = "strong";
    level.style.color = "green";
  }
});
`
      }
    }
  ]
});
