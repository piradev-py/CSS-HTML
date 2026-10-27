/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-16 (se ve como la 12)
   Fechas y horas — new Date(), getFullYear() (el año del pie),
   getHours()/getMinutes(), la fecha de hoy como texto
   "AAAA-MM-DD" con toLocaleDateString("sv-SE") y comparar fechas
   y horas como textos ("2026-10-20" >= hoy, "09:30" >= "09:00").
   Notas:
   - El id es js-16 aunque va entre js-15 y js-11: los ids no se
     cambian nunca (el progreso guardado va por id).
   - Es lo que usa «Huellas»: el año del pie y comprobar que la
     cita es a partir de hoy y dentro del horario.
   - Los ejercicios con la hora de verdad se revisan bien porque el
     alumno y la solución se ejecutan a la vez. El reto calcula
     ayer, hoy y mañana en la propia comprobación.
   - No se enseña restar fechas (necesitaría Math.round): el reto
     dice «ya pasó / es hoy / todavía falta» en vez de «faltan X días».
   ============================================================ */
CURSO.registrar({
  id: "js-16",
  titulo: "Dates and times",
  xp: 40,
  objetivo: "You'll learn to read the computer's date and time, write today's date as text, and compare dates and times.",
  glosario: [
    { termino: "new Date()", tema: "Dates", para: "The date and time right now.", ejemplo: "const now = new Date();", buscar: "date time now clock" },
    { termino: "getFullYear()", tema: "Dates", para: "The year of a date (the one in the footer).", ejemplo: "document.querySelector(\"#year\").textContent = new Date().getFullYear();", buscar: "ano year pie" },
    { termino: "toLocaleDateString(\"sv-SE\")", tema: "Dates", para: "The date as text in `YYYY-MM-DD`, just like a `date` field's value.", ejemplo: "const today = new Date().toLocaleDateString(\"sv-SE\");", buscar: "date today text format" },
    { termino: "comparing dates and times", tema: "Dates", para: "As texts with their zeros, `\"2026-10-21\" >= today` works.", ejemplo: "if (dateField.value >= today) {\n  console.log(\"It hasn't passed\");\n}", buscar: "comparar fecha pasada futura hora" },
    { termino: "getDay()", tema: "Dates", para: "The day of the week: 0 is Sunday, 1 Monday… 6 Saturday. With a field's date, give it its time.", ejemplo: "const day = new Date(dateField.value + \"T00:00\").getDay();\nif (day === 0) {\n  console.log(\"Sunday: closed\");\n}", buscar: "day week saturday sunday monday" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "The computer's clock: new Date()",
      texto: "JavaScript can look at the computer's clock. `new Date()` gives you a **date object** with the day and time **right now** 🕰️.\n\nFrom that object you get each piece of data with its command:\n\n• `getFullYear()`: the year, for example `2026`.\n• `getHours()`: the hour, from `0` to `23`.\n• `getMinutes()`: the minutes, from `0` to `59`.\n\nThe most typical use: the year in the footer. If you write it by hand in the HTML, on January 1st your website gets old; with `getFullYear()` it changes by itself.",
      ejemplo: {
        html: `<footer>© <span id="year"></span> Tagui Pizza</footer>`,
        js: `const now = new Date();

console.log(now);
console.log(now.getFullYear());
console.log(\`It's \${now.getHours()}:\${now.getMinutes()}\`);

document.querySelector("#year").textContent = now.getFullYear();`
      },
      consejo: "Press 🔄 Reload within a minute: you'll see the minutes change. The time is your computer's, every time the code runs!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Make sure the club's footer never gets old 📅. The HTML already has an empty `<span id=\"year\"></span>`.\n\nIn the JS tab, set the **current year** as the text of `#year`, using `new Date()` and `getFullYear()`.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
footer { padding: 12px; background-color: #2b2238; color: white; border-radius: 10px; text-align: center; }`,
      inicial: {
        html: `<h2>♟️ Chess club</h2>
<footer>© <span id="year"></span> Neighborhood chess club</footer>
`,
        js: ""
      },
      solucion: {
        html: `<h2>♟️ Chess club</h2>
<footer>© <span id="year"></span> Neighborhood chess club</footer>
`,
        js: `document.querySelector("#year").textContent = new Date().getFullYear();
`
      },
      pistas: [
        "Find #year with querySelector and change its textContent. The year comes from new Date().getFullYear().",
        "It should end up like this:\ndocument.querySelector(\"#year\").textContent = new Date().getFullYear();"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Today's date as text",
      texto: "To compare dates, the easiest way is to have them as **text** in the `YYYY-MM-DD` format: year, month and day, with leading zeros. For example `\"2026-10-18\"`.\n\nWhy that one? Because it's **exactly** what a `<input type=\"date\">` field gives in its `value`.\n\nToday's date in that format comes out like this:\n\n`new Date().toLocaleDateString(\"sv-SE\")`\n\n`toLocaleDateString` writes the date the way it's written in a country. `\"sv-SE\"` is Sweden, which writes it exactly like that. 🇸🇪 To show it to a person in Spain, use `\"es-ES\"`: `18/10/2026`.",
      ejemplo: {
        js: `const now = new Date();

console.log(now.toLocaleDateString("sv-SE"));
console.log(now.toLocaleDateString("es-ES"));`
      },
      consejo: "You'll see `toISOString()` online for this. Careful! It gives London's date, not yours: in Spain, right after midnight it would tell you it's still yesterday."
    },
    {
      tipo: "explicacion",
      titulo: "Compare dates and times",
      texto: "With the `YYYY-MM-DD` format, comparing dates is really easy: texts are compared letter by letter, like in a dictionary, and since the year comes first, then the month and then the day, **the order of the texts is the order of the calendar**.\n\n`\"2026-10-20\" >= \"2026-10-18\"` → `true`\n\nSame thing happens with times, if they come as `HH:MM` (what a `<input type=\"time\">` gives):\n\n`\"09:30\" >= \"09:00\"` → `true`\n\nThe trick works **only** if they all keep their zeros: `\"9:30\"` compared with `\"10:00\"` fails, because `9` comes after `1`.",
      ejemplo: {
        html: `<label for="day">Pick a day:</label>
<input type="date" id="day">
<p id="answer"></p>`,
        js: `const field = document.querySelector("#day");
const answer = document.querySelector("#answer");
const today = new Date().toLocaleDateString("sv-SE");

field.addEventListener("change", () => {
  if (field.value >= today) {
    answer.textContent = "✅ That day hasn't passed yet";
  } else {
    answer.textContent = "⌛ That day has already passed";
  }
});`
      },
      consejo: "What about the day of the week? `getDay()` gives it to you as a number: **0 is Sunday**, 1 Monday… and **6 Saturday**. With a field's date, write it with its time so it doesn't give you the previous day: `new Date(field.value + \"T00:00\").getDay()`."
    },
    {
      tipo: "ejercicio",
      pestanas: ["js"],
      enunciado: "Is the bakery open? 🥐 It opens from **07:30** to **14:00**. The variable `time` is already written. Below it:\n\n• If `time` is **greater than or equal to** `\"07:30\"` **and** **less than or equal to** `\"14:00\"`, show **Open** in the console.\n• If not, show **Closed**.\n\nTry changing the time to see both cases, but leave `\"13:45\"` when checking.",
      inicial: {
        html: "",
        js: `const time = "13:45";

`
      },
      solucion: {
        html: "",
        js: `const time = "13:45";

if (time >= "07:30" && time <= "14:00") {
  console.log("Open");
} else {
  console.log("Closed");
}
`
      },
      pistas: [
        "The two conditions are joined with && inside the if: time >= \"07:30\" && time <= \"14:00\". The times go in quotes: they're texts.",
        "Below the variable write:\nif (time >= \"07:30\" && time <= \"14:00\") {\n  console.log(\"Open\");\n} else {\n  console.log(\"Closed\");\n}"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Which of these comparisons gives a wrong result?",
      opciones: [
        "\"2026-03-05\" < \"2026-12-01\"",
        "\"9:30\" < \"10:00\"",
        "\"08:15\" < \"20:00\""
      ],
      correcta: 1,
      explicacion: "\"9:30\" < \"10:00\" gives false, even though 9:30 comes before 10:00: texts are compared letter by letter and 9 comes after 1. With its zero, \"09:30\" < \"10:00\" does give true."
    },
    {
      tipo: "reto",
      enunciado: "📆 Build a **date checker** for the school planner.\n\n1. Put the current year in `#year`.\n2. When `#check` is clicked, look at the chosen day in `#day` and write in `#message`:\n   • **That day has passed** if it's before today.\n   • **It's today** if it's today.\n   • **Still to come** if it's after today.\n\nFor today's date, use `toLocaleDateString(\"sv-SE\")`.",
      cssBase: `body { font-family: sans-serif; padding: 12px; background-color: #eef6ff; }
.planner { max-width: 320px; padding: 16px; border-radius: 14px; background-color: white; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
h2 { margin-top: 0; color: #1f5fcc; }
input, button { padding: 8px; font-size: 16px; }
button { border: none; border-radius: 8px; background-color: #1f5fcc; color: white; }
#message { font-size: 20px; font-weight: bold; }
footer { margin-top: 12px; color: #6d6278; }`,
      inicial: {
        html: `<section class="planner">
  <h2>📆 When is it?</h2>
  <label for="day">Day:</label>
  <input type="date" id="day">
  <button id="check">Check</button>
  <p id="message"></p>
</section>
<footer>© <span id="year"></span> School planner</footer>
`,
        js: `const field = document.querySelector("#day");
const message = document.querySelector("#message");

// 1. The current year in #year


// 2. When #check is clicked: "That day has passed", "It's today" or "Still to come"
`
      },
      comprobaciones: [
        {
          texto: "The current year shows in the footer",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            return v.doc.querySelector("#year")?.textContent.trim() === String(new Date().getFullYear());
          }
        },
        {
          texto: "With **yesterday's** day it says \"That day has passed\"",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const d = new Date();
            d.setDate(d.getDate() - 1);
            PRUEBA.escribir(v.doc.querySelector("#day"), d.toLocaleDateString("sv-SE"));
            v.doc.querySelector("#check")?.click();
            const t = (v.doc.querySelector("#message")?.textContent || "").toLowerCase();
            return t.includes("passed") && !t.includes("today") && !t.includes("come");
          }
        },
        {
          texto: "With **today's** day it says \"It's today\"",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            PRUEBA.escribir(v.doc.querySelector("#day"), new Date().toLocaleDateString("sv-SE"));
            v.doc.querySelector("#check")?.click();
            const t = (v.doc.querySelector("#message")?.textContent || "").toLowerCase();
            return t.includes("today") && !t.includes("passed") && !t.includes("come");
          }
        },
        {
          texto: "With **tomorrow's** day it says \"Still to come\"",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const d = new Date();
            d.setDate(d.getDate() + 1);
            PRUEBA.escribir(v.doc.querySelector("#day"), d.toLocaleDateString("sv-SE"));
            v.doc.querySelector("#check")?.click();
            const t = (v.doc.querySelector("#message")?.textContent || "").toLowerCase();
            return t.includes("come") && !t.includes("today") && !t.includes("passed");
          }
        }
      ],
      pistas: [
        "Save today's date in a constant: const today = new Date().toLocaleDateString(\"sv-SE\");. In the click, compare field.value with today using an if, an else if and an else: less than (<), equal (===) and everything else.",
        "It should end up like this:\ndocument.querySelector(\"#year\").textContent = new Date().getFullYear();\nconst today = new Date().toLocaleDateString(\"sv-SE\");\n\ndocument.querySelector(\"#check\").addEventListener(\"click\", () => {\n  if (field.value < today) {\n    message.textContent = \"That day has passed\";\n  } else if (field.value === today) {\n    message.textContent = \"It's today\";\n  } else {\n    message.textContent = \"Still to come\";\n  }\n});"
      ],
      solucion: {
        html: `<section class="planner">
  <h2>📆 When is it?</h2>
  <label for="day">Day:</label>
  <input type="date" id="day">
  <button id="check">Check</button>
  <p id="message"></p>
</section>
<footer>© <span id="year"></span> School planner</footer>
`,
        js: `const field = document.querySelector("#day");
const message = document.querySelector("#message");

document.querySelector("#year").textContent = new Date().getFullYear();
const today = new Date().toLocaleDateString("sv-SE");

document.querySelector("#check").addEventListener("click", () => {
  if (field.value < today) {
    message.textContent = "That day has passed";
  } else if (field.value === today) {
    message.textContent = "It's today";
  } else {
    message.textContent = "Still to come";
  }
});
`
      }
    }
  ]
});
