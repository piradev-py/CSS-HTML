/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-11
   Validating forms — submit event, event.preventDefault(),
   review of field.value, .trim(), .includes("@"), the ! operator
   ("not") and accessible error messages (role="alert",
   aria-describedby and an error class, not just color).
   Notas:
   - Todos los formularios llevan novalidate: así el navegador no
     bloquea el submit con sus propios avisos y validamos con JS.
   - Los ejercicios usan acciones { escribir } + { enviar }: el
     evento es submit (requestSubmit no pulsa el botón), así que
     quien escuche "click" en el botón no aprueba.
   - El ejercicio del email comprueba también que el error y la
     clase "invalido" se quitan al corregirlo.
   - El reto usa PRUEBA.recargar en cada comprobación para que los
     envíos de una no se mezclen con los de la siguiente.
   - El JS de ejemplos y soluciones no usa plantillas de texto, así
     no hay que escapar comillas invertidas ni ${…}.
   ============================================================ */
CURSO.registrar({
  id: "js-11",
  titulo: "Validating forms",
  xp: 50,
  objetivo: "You'll learn to check what the user types into a form with JavaScript and to let them know with clear, accessible messages.",
  glosario: [
    { termino: "\"submit\" and preventDefault()", tema: "Forms", para: "When the form is submitted; `preventDefault()` stops the page from reloading.", ejemplo: "form.addEventListener(\"submit\", (event) => {\n  event.preventDefault();\n});", buscar: "submit form reload" },
    { termino: ".trim()", tema: "Forms", para: "Removes the spaces at the beginning and the end.", ejemplo: "const name = field.value.trim();", buscar: "spaces remove trim" },
    { termino: ".includes() (text)", tema: "Forms", para: "Does the text contain this?", ejemplo: "if (email.includes(\"@\")) {\n  console.log(\"It has an @\");\n}", buscar: "contains search text" },
    { termino: ".checked", tema: "Forms", para: "Is the checkbox (or the radio) checked?", ejemplo: "if (!checkbox.checked) {\n  error.textContent = \"Accept the privacy policy\";\n}", buscar: "checkbox checked radio" },
    { termino: "Number.isNaN()", tema: "Forms", para: "Is it not a number? To check that digits were typed.", ejemplo: "const onlyDigits = !Number.isNaN(Number(phone));", buscar: "number digits check" },
    { termino: "allGood flag", tema: "Forms", para: "A variable that starts at `true` and becomes `false` if any field fails.", ejemplo: "let allGood = true;\nif (name === \"\") {\n  allGood = false;\n}", buscar: "flag several fields errors" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "The submit event",
      texto: "When a form is submitted (with its button or by pressing **Enter**), the `\"submit\"` event fires. What normally happens is that the browser sends the data and **reloads the page**… and your code would lose everything!\n\nThat's why the first thing to do is stop that submission. The function that responds to the event receives an extra piece of data: the **event** itself. And the event has a parking brake: `event.preventDefault()` (\"prevents what you'd do by default\").\n\nAfter that, you read what was typed with `field.value`, as you already know, and decide what to do. Write something in the result and press **Search** (or Enter).",
      ejemplo: {
        html: `<form id="search" novalidate>
  <label for="dish">What do you want to cook?</label>
  <input id="dish" type="text">
  <button>Search</button>
</form>
<p id="result"></p>`,
        js: `const form = document.querySelector("#search");
const field = document.querySelector("#dish");
const result = document.querySelector("#result");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  result.textContent = "🍳 Searching recipes for: " + field.value;
  console.log("Form submitted");
});`
      },
      consejo: "Listen for the **form's** `\"submit\"`, not the button's `\"click\"`: that way it also works when someone presses Enter in the field. ⌨️"
    },
    {
      tipo: "ejercicio",
      enunciado: "Get the video game's entry screen 🎮 ready. The HTML is already written.\n\n• Listen for the `submit` event of the `#entry` form and, inside, stop the submission with `event.preventDefault()`.\n• Then, put in the `#message` paragraph the text **Let's play, ** followed by what was typed in the `#name` field and a **!** at the end. If `Lucía` is typed, it should say **Let's play, Lucía!**\n\nThe message should only appear when the form is **submitted**, not while typing.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
form { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
label { width: 100%; font-weight: bold; }
input, button { font: inherit; padding: 8px; border-radius: 8px; }
input { border: 2px solid slateblue; }
button { border: none; background-color: slateblue; color: white; }
#message { font-size: 24px; color: slateblue; }`,
      inicial: {
        html: `<form id="entry" novalidate>
  <label for="name">Player name</label>
  <input id="name" type="text">
  <button>Enter</button>
</form>
<p id="message"></p>
`,
        js: ""
      },
      solucion: {
        html: `<form id="entry" novalidate>
  <label for="name">Player name</label>
  <input id="name" type="text">
  <button>Enter</button>
</form>
<p id="message"></p>
`,
        js: `const form = document.querySelector("#entry");
const field = document.querySelector("#name");
const message = document.querySelector("#message");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  message.textContent = "Let's play, " + field.value + "!";
});
`
      },
      acciones: [
        { escribir: "#name", texto: "Lucía" },
        { enviar: "#entry" }
      ],
      pistas: [
        "Save the form, the field and the paragraph in constants. Then form.addEventListener(\"submit\", (event) => { … }) and, inside, first event.preventDefault() and then change the textContent of #message using field.value.",
        "It should end up like this:\nconst form = document.querySelector(\"#entry\");\nconst field = document.querySelector(\"#name\");\nconst message = document.querySelector(\"#message\");\n\nform.addEventListener(\"submit\", (event) => {\n  event.preventDefault();\n  message.textContent = \"Let's play, \" + field.value + \"!\";\n});"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Cleaning and checking: trim and includes",
      texto: "Validating means **checking** what was typed before accepting it. Two text tools help you:\n\n• `text.trim()` returns the text **without the spaces** at the beginning and the end. So someone who only types spaces leaves an empty text: `\"   \".trim() === \"\"` is `true`.\n• `text.includes(\"@\")` answers `true` or `false`: does it **include** that piece? Perfect to see whether an email has its @.\n\nAnd to ask the **opposite**, put `!` in front: it means \"not\". `!email.includes(\"@\")` reads as \"the email does **not** include an @\".\n\nLook at the example's console (the square brackets let you see where the spaces are).",
      ejemplo: {
        js: `const typed = "   Ana   ";
console.log("[" + typed + "]");
console.log("[" + typed.trim() + "]");
console.log("   ".trim() === "");

const email = "ana@mail.com";
console.log(email.includes("@"));
console.log("anamail.com".includes("@"));
console.log(!"anamail.com".includes("@"));`
      },
      consejo: "Always use `trim()` before checking whether a field is empty. Otherwise, a couple of spaces would slip through as if they were a name. 😉"
    },
    {
      tipo: "ejercicio",
      enunciado: "At the ice cream shop 🍦 they don't accept empty orders. The HTML is already written.\n\nWhen the `#order` form is **submitted** (stop the submission with `preventDefault`), read the `#flavor` field **without extra spaces** (use `trim()`) and:\n\n• If it's empty, put in `#notice` the text **Please type a flavor.**\n• If not, put in `#notice` **Coming right up, one ** followed by the flavor and a period. With `strawberry`: **Coming right up, one strawberry ice cream.**",
      cssBase: `body { font-family: sans-serif; padding: 10px; background-color: #fff8f0; }
form { display: flex; flex-wrap: wrap; gap: 8px; }
label { width: 100%; font-weight: bold; }
input, button { font: inherit; padding: 8px; border-radius: 8px; }
input { border: 2px solid hotpink; }
button { border: none; background-color: hotpink; color: white; }
#notice { font-size: 20px; font-weight: bold; color: #b0306b; }`,
      inicial: {
        html: `<form id="order" novalidate>
  <label for="flavor">What flavor do you want your ice cream?</label>
  <input id="flavor" type="text">
  <button>Order</button>
</form>
<p id="notice" role="alert"></p>
`,
        js: ""
      },
      solucion: {
        html: `<form id="order" novalidate>
  <label for="flavor">What flavor do you want your ice cream?</label>
  <input id="flavor" type="text">
  <button>Order</button>
</form>
<p id="notice" role="alert"></p>
`,
        js: `const form = document.querySelector("#order");
const field = document.querySelector("#flavor");
const notice = document.querySelector("#notice");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const flavor = field.value.trim();
  if (flavor === "") {
    notice.textContent = "Please type a flavor.";
  } else {
    notice.textContent = "Coming right up, one " + flavor + " ice cream.";
  }
});
`
      },
      acciones: [
        { escribir: "#flavor", texto: "   " },
        { enviar: "#order" },
        { escribir: "#flavor", texto: "strawberry" },
        { enviar: "#order" }
      ],
      pistas: [
        "Inside the submit, save field.value.trim() in a constant. Then an if that compares that constant with \"\" (empty text) and an else for the good message.",
        "Inside the addEventListener(\"submit\", (event) => { … }) write:\nevent.preventDefault();\nconst flavor = field.value.trim();\nif (flavor === \"\") {\n  notice.textContent = \"Please type a flavor.\";\n} else {\n  notice.textContent = \"Coming right up, one \" + flavor + \" ice cream.\";\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Error messages everyone understands",
      texto: "A good error message says **what's wrong and how to fix it**, and reaches everybody:\n\n• Put it in a `<p>` with `role=\"alert\"`: **screen readers** (programs that read the web out loud to blind people) read it as soon as it changes.\n• Link it to the field with `aria-describedby=\"the-error-id\"`: when you enter the field, the error is read too.\n• Mark the field with a class (`invalid`) to paint it red, but **don't rely on color alone**: the text is what matters.\n\nAnd remember to **remove** the error when it's fixed. Try the example with \"Jo\" and then with \"Jorge\".",
      ejemplo: {
        html: `<form id="club" novalidate>
  <label for="nickname">Your nickname</label>
  <input id="nickname" type="text" aria-describedby="error-nickname">
  <p id="error-nickname" class="error" role="alert"></p>
  <button>Join the club</button>
</form>`,
        css: `.error {
  color: #b00020;
  font-weight: bold;
}
.invalid {
  border: 2px solid #b00020;
  background-color: #fff0f0;
}`,
        js: `const form = document.querySelector("#club");
const field = document.querySelector("#nickname");
const error = document.querySelector("#error-nickname");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const nickname = field.value.trim();
  if (nickname.length < 3) {
    error.textContent = "⚠️ The nickname needs at least 3 letters.";
    field.classList.add("invalid");
  } else {
    error.textContent = "";
    field.classList.remove("invalid");
    console.log("Nickname accepted: " + nickname);
  }
});`
      },
      consejo: "Why `novalidate` on the `<form>`? It tells the browser \"don't validate yourself, I'll do it with JS\". And a pro tip: validating on the page helps whoever is typing, but the **server** must always check everything again."
    },
    {
      tipo: "ejercicio",
      enunciado: "Validate the newsletter's email 📬. The HTML is already written (the error is already linked with `aria-describedby`).\n\nWhen the `#newsletter` form is **submitted** (with `preventDefault`), read the `#email` field with `trim()` and:\n\n• If it does **not** include an `@`: put in `#error-email` the text **The email must have an @.** and add the `invalid` class to the `#email` field.\n• If it does: leave `#error-email` empty (`\"\"`) and remove the `invalid` class from the field.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
form { display: flex; flex-direction: column; gap: 8px; max-width: 320px; }
label { font-weight: bold; }
input, button { font: inherit; padding: 8px; border-radius: 8px; }
input { border: 2px solid #999; }
button { border: none; background-color: teal; color: white; }
.error { margin: 0; color: #b00020; font-weight: bold; }
.invalid { border-color: #b00020; background-color: #fff0f0; }`,
      inicial: {
        html: `<form id="newsletter" novalidate>
  <label for="email">Your email</label>
  <input id="email" type="email" aria-describedby="error-email">
  <p id="error-email" class="error" role="alert"></p>
  <button>Subscribe</button>
</form>
`,
        js: ""
      },
      solucion: {
        html: `<form id="newsletter" novalidate>
  <label for="email">Your email</label>
  <input id="email" type="email" aria-describedby="error-email">
  <p id="error-email" class="error" role="alert"></p>
  <button>Subscribe</button>
</form>
`,
        js: `const form = document.querySelector("#newsletter");
const field = document.querySelector("#email");
const error = document.querySelector("#error-email");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = field.value.trim();
  if (!email.includes("@")) {
    error.textContent = "The email must have an @.";
    field.classList.add("invalid");
  } else {
    error.textContent = "";
    field.classList.remove("invalid");
  }
});
`
      },
      acciones: [
        { escribir: "#email", texto: "tagui.correo.com" },
        { enviar: "#newsletter" },
        { escribir: "#email", texto: "tagui@correo.com" },
        { enviar: "#newsletter" }
      ],
      pistas: [
        "The if condition is !email.includes(\"@\") (\"the email doesn't include an @\"). In that case, two instructions: the error's textContent and classList.add. In the else, the two opposite ones: empty textContent and classList.remove.",
        "Inside the submit write:\nevent.preventDefault();\nconst email = field.value.trim();\nif (!email.includes(\"@\")) {\n  error.textContent = \"The email must have an @.\";\n  field.classList.add(\"invalid\");\n} else {\n  error.textContent = \"\";\n  field.classList.remove(\"invalid\");\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Many fields: checkboxes, radios and a flag",
      texto: "A real form has many fields, and each one needs **its own message**. Three new tools:\n\n• **Checkboxes and radios**: they have no useful `value`; you check whether they're marked with `.checked`, which is `true` or `false`. For a radio, ask about each option's: `document.querySelector(\"#first-yes\").checked`.\n• **Digits only**: `Number(\"600123456\")` turns the text into a number; if there are letters or spaces, it gives `NaN` (\"not a number\"). `Number.isNaN(…)` tells you whether that happened.\n• **A flag**: start with `let allGood = true;`. Each field that fails sets `allGood = false;` and its message. At the end, only if `allGood` is still `true` do you accept the form. 🚩\n\nTry the example with a phone number with spaces and the checkbox unchecked.",
      ejemplo: {
        html: `<form id="appointment" novalidate>
  <label for="phone">Phone (9 digits)</label>
  <input id="phone" type="tel" aria-describedby="error-phone">
  <p id="error-phone" class="error" role="alert"></p>

  <p>First visit?
    <input type="radio" id="first-yes" name="first"> <label for="first-yes">Yes</label>
    <input type="radio" id="first-no" name="first"> <label for="first-no">No</label>
  </p>

  <input type="checkbox" id="rules">
  <label for="rules">I accept the rules</label>
  <p id="error-rules" class="error" role="alert"></p>

  <button>Book appointment</button>
</form>`,
        css: `.error {
  color: #b00020;
  font-weight: bold;
}`,
        js: `const form = document.querySelector("#appointment");
const phoneError = document.querySelector("#error-phone");
const rulesError = document.querySelector("#error-rules");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let allGood = true;

  const phone = document.querySelector("#phone").value.trim();
  if (phone.length !== 9 || Number.isNaN(Number(phone))) {
    phoneError.textContent = "Type 9 digits, no spaces.";
    allGood = false;
  } else {
    phoneError.textContent = "";
  }

  if (!document.querySelector("#rules").checked) {
    rulesError.textContent = "You have to accept the rules.";
    allGood = false;
  } else {
    rulesError.textContent = "";
  }

  if (allGood) {
    const first = document.querySelector("#first-yes").checked;
    console.log("Appointment booked! First visit? " + first);
  }
});`
      },
      consejo: "Check **all** the fields even if the first one already fails: that way the person sees at once everything they have to fix, instead of one error each time they press the button."
    },
    {
      tipo: "quiz",
      pregunta: "What does `event.preventDefault()` do inside a form's `submit` event?",
      opciones: [
        "Stops the normal submission, so the page doesn't reload and your code decides what to do",
        "Erases everything that was typed in the fields",
        "Checks by itself that the email has an @"
      ],
      correcta: 0,
      explicacion: "Without preventDefault, the browser would send the form and reload the page. With it, you stop that submission and your JavaScript takes control: it validates, warns about the errors or shows the success message."
    },
    {
      tipo: "reto",
      enunciado: "Build the signup for the **explorers' club** 🧭. When the `#signup` form is **submitted** (stop the submission), read `#name` and `#email` with `trim()` and check whether the `#rules` checkbox is checked:\n\n1. Empty name → message in `#error-name` (for example, **Type your name.**).\n2. Email **without** an `@` → message in `#error-email` (for example, **The email must have an @.**).\n3. Unchecked box → message in `#error-rules` (for example, **You have to promise it.**).\n\nEach error goes in **its** paragraph, and **all** the fields are checked even if the first one already fails: if all three are wrong, all three messages appear at the same time.\n\nIf everything is fine → all three errors empty and, in `#success`, a message with the name: **Welcome, Ana!**\n\nCareful: if something fails, clear the success message, and the other way around. Don't let old messages stick around!",
      cssBase: `body { font-family: sans-serif; padding: 16px; background-color: #eef6f0; }
form { display: flex; flex-direction: column; gap: 6px; max-width: 340px; padding: 16px; background-color: white; border-radius: 12px; box-shadow: 0 2px 10px rgb(0 0 0 / 0.1); }
h2 { margin: 0 0 8px; color: #2f6b45; }
label { font-weight: bold; margin-top: 6px; }
input, button { font: inherit; padding: 8px; border-radius: 8px; }
input { border: 2px solid #9cc5a8; }
button { margin-top: 10px; border: none; background-color: #2f6b45; color: white; }
.error { margin: 6px 0 0; color: #b00020; font-weight: bold; }
.success { font-size: 20px; font-weight: bold; color: #2f6b45; }
.row { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
.row label { margin-top: 0; font-weight: normal; }`,
      inicial: {
        html: `<form id="signup" novalidate>
  <h2>Join the explorers' club 🧭</h2>
  <label for="name">Name</label>
  <input id="name" type="text" aria-describedby="error-name">
  <p id="error-name" class="error" role="alert"></p>
  <label for="email">Email</label>
  <input id="email" type="email" aria-describedby="error-email">
  <p id="error-email" class="error" role="alert"></p>
  <div class="row">
    <input type="checkbox" id="rules">
    <label for="rules">I promise to take care of nature</label>
  </div>
  <p id="error-rules" class="error" role="alert"></p>
  <button>Sign me up</button>
</form>
<p id="success" class="success" role="status"></p>
`,
        js: `const form = document.querySelector("#signup");
const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const rulesCheckbox = document.querySelector("#rules");
const nameError = document.querySelector("#error-name");
const emailError = document.querySelector("#error-email");
const rulesError = document.querySelector("#error-rules");
const success = document.querySelector("#success");

// 1. Listen for the form's "submit" event and stop the submission
// 2. Read the name and the email with trim() and check the box with .checked
// 3. With an allGood flag: the failing field writes ITS message in ITS paragraph
//    and sets the flag to false; the good one empties its paragraph
// 4. If allGood is still true → the success message with the name; otherwise, empty it
`
      },
      comprobaciones: [
        {
          texto: "If you submit the form with an empty name (or only spaces), an error appears in `#error-name`",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const d = v.doc;
            PRUEBA.escribir(d.querySelector("#name"), "   ");
            PRUEBA.escribir(d.querySelector("#email"), "ana@mail.com");
            d.querySelector("#signup")?.requestSubmit();
            const nameError = (d.querySelector("#error-name")?.textContent || "").trim();
            const success = (d.querySelector("#success")?.textContent || "").trim();
            return nameError !== "" && success === "";
          }
        },
        {
          texto: "If the email has no `@`, an error appears in `#error-email`",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const d = v.doc;
            PRUEBA.escribir(d.querySelector("#name"), "Ana");
            PRUEBA.escribir(d.querySelector("#email"), "ana.correo.com");
            d.querySelector("#signup")?.requestSubmit();
            const emailError = (d.querySelector("#error-email")?.textContent || "").trim();
            const success = (d.querySelector("#success")?.textContent || "").trim();
            return emailError !== "" && success === "";
          }
        },
        {
          texto: "The unchecked box gives its own error in `#error-rules`, and if all three fields are wrong, all THREE messages appear at once",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const d = v.doc;
            PRUEBA.escribir(d.querySelector("#name"), "Ana");
            PRUEBA.escribir(d.querySelector("#email"), "ana@mail.com");
            d.querySelector("#signup")?.requestSubmit();
            const text = sel => (d.querySelector(sel)?.textContent || "").trim();
            if (text("#error-rules") === "" || text("#success") !== "") return false;
            PRUEBA.escribir(d.querySelector("#name"), "   ");
            PRUEBA.escribir(d.querySelector("#email"), "ana.correo.com");
            d.querySelector("#signup")?.requestSubmit();
            return text("#error-name") !== "" &&
                   text("#error-email") !== "" &&
                   text("#error-rules") !== "" &&
                   text("#success") === "";
          }
        },
        {
          texto: "If everything is fine, all 3 errors are empty and `#success` welcomes the person by name",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const d = v.doc;
            const text = sel => (d.querySelector(sel)?.textContent || "").trim();
            PRUEBA.escribir(d.querySelector("#name"), "  Ana  ");
            PRUEBA.escribir(d.querySelector("#email"), "ana@mail.com");
            d.querySelector("#rules").checked = true;
            d.querySelector("#signup")?.requestSubmit();
            return text("#error-name") === "" &&
                   text("#error-email") === "" &&
                   text("#error-rules") === "" &&
                   (d.querySelector("#success")?.textContent || "").includes("Ana");
          }
        },
        {
          texto: "No old messages stick around: when you fix an error it disappears, and when you go wrong again the success message is cleared",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const d = v.doc;
            const form = d.querySelector("#signup");
            const name = d.querySelector("#name");
            const email = d.querySelector("#email");
            const rules = d.querySelector("#rules");
            const text = sel => (d.querySelector(sel)?.textContent || "").trim();
            if (!form || !name || !email || !rules) return false;
            PRUEBA.escribir(name, "");
            PRUEBA.escribir(email, "leo@correo.com");
            rules.checked = true;
            form.requestSubmit();
            if (text("#error-name") === "") return false;
            PRUEBA.escribir(name, "Leo");
            form.requestSubmit();
            if (text("#error-name") !== "" || text("#error-email") !== "" ||
                text("#error-rules") !== "" || !text("#success").includes("Leo")) return false;
            PRUEBA.escribir(email, "leo.correo.com");
            form.requestSubmit();
            return text("#error-email") !== "" && text("#success") === "";
          }
        }
      ],
      pistas: [
        "Inside the submit: preventDefault, the flag with let allGood = true; and an if / else per field, all three one after another. The failing field writes ITS message in ITS paragraph and sets allGood = false; the good one only empties its paragraph. And ALWAYS check the three fields, even if the first one is already wrong (no else if between fields).",
        "You could end up with something like this:\nlet allGood = true;\nconst name = nameField.value.trim();\nif (name === \"\") {\n  nameError.textContent = \"Type your name.\";\n  allGood = false;\n} else {\n  nameError.textContent = \"\";\n}\nWith the email (using if (!email.includes(\"@\"))) and with the checkbox (using if (!rulesCheckbox.checked)) it's the same. At the end:\nif (allGood) {\n  success.textContent = \"Welcome, \" + name + \"!\";\n} else {\n  success.textContent = \"\";\n}"
      ],
      solucion: {
        html: `<form id="signup" novalidate>
  <h2>Join the explorers' club 🧭</h2>
  <label for="name">Name</label>
  <input id="name" type="text" aria-describedby="error-name">
  <p id="error-name" class="error" role="alert"></p>
  <label for="email">Email</label>
  <input id="email" type="email" aria-describedby="error-email">
  <p id="error-email" class="error" role="alert"></p>
  <div class="row">
    <input type="checkbox" id="rules">
    <label for="rules">I promise to take care of nature</label>
  </div>
  <p id="error-rules" class="error" role="alert"></p>
  <button>Sign me up</button>
</form>
<p id="success" class="success" role="status"></p>
`,
        js: `const form = document.querySelector("#signup");
const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const rulesCheckbox = document.querySelector("#rules");
const nameError = document.querySelector("#error-name");
const emailError = document.querySelector("#error-email");
const rulesError = document.querySelector("#error-rules");
const success = document.querySelector("#success");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let allGood = true;

  const name = nameField.value.trim();
  if (name === "") {
    nameError.textContent = "Type your name.";
    allGood = false;
  } else {
    nameError.textContent = "";
  }

  const email = emailField.value.trim();
  if (!email.includes("@")) {
    emailError.textContent = "The email must have an @.";
    allGood = false;
  } else {
    emailError.textContent = "";
  }

  if (!rulesCheckbox.checked) {
    rulesError.textContent = "You have to promise it.";
    allGood = false;
  } else {
    rulesError.textContent = "";
  }

  if (allGood) {
    success.textContent = "Welcome, " + name + "!";
  } else {
    success.textContent = "";
  }
});
`
      }
    }
  ]
});
