/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-09
   Formularios: campos y etiquetas — <form>, <label for> + id,
   <input type="text">, name, placeholder, <button>.
   Nota: en la web de prácticas el motor intercepta el envío del
   formulario y muestra un aviso. Los demás tipos de campo
   (email, checkbox, select…) son de html-10.
   ============================================================ */
CURSO.registrar({
  id: "html-09",
  titulo: "Forms: fields and labels",
  xp: 40,
  objetivo: "You'll be able to create a simple form with well-labelled text fields and a button.",
  // Lo que enseña esta lección, para el glosario de las lecciones de proyecto (js/glosario.js)
  glosario: [
    { termino: "<form>", tema: "Forms", para: "The box of a form.", ejemplo: "<form id=\"form-appointment\">\n  …\n</form>", buscar: "form" },
    { termino: "<label for=\"…\">", tema: "Forms", para: "The text of a field; `for` holds the field's `id` and links them together.", ejemplo: "<label for=\"name\">Your name</label>\n<input type=\"text\" id=\"name\" name=\"name\">", buscar: "label text field accessibility" },
    { termino: "<input type=\"text\">", tema: "Forms", para: "A field to type into; `name` is the name of the data.", ejemplo: "<input type=\"text\" id=\"name\" name=\"name\" placeholder=\"Anna\">", buscar: "field box type" },
    { termino: "placeholder", tema: "Forms", para: "Sample text inside the empty field (it does not replace the `label`).", ejemplo: "<input type=\"text\" placeholder=\"Anna\">", buscar: "example hint gray" },
    { termino: "<button>", tema: "Forms", para: "A button; inside a form, it submits it.", ejemplo: "<button type=\"submit\">Book an appointment</button>", buscar: "button submit" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "What is a form?",
      texto: "A **form** is the part of a website where **you type** and the page picks up what you write: search engines, sign-ups, orders… It's like the paper form you fill in at the library. 📋\n\n• `<form>` is the box that wraps the whole form.\n• `<input type=\"text\">` is a **text field**: a little box where you type. It's an empty tag, with no closing tag.\n• `<button>` is a **button**. If it's inside a `<form>`, pressing it **submits** the form.",
      ejemplo: {
        html: `<form>
  <input type="text">
  <button>Search recipes</button>
</form>`,
        css: ""
      },
      consejo: "On a real website, when you submit, the data travels to a **server** (another computer that receives it and saves it). Here, in the practice pages, it doesn't go anywhere: you'll only see a notice. So don't be shy and press all the buttons!"
    },
    {
      tipo: "explicacion",
      titulo: "Each field with its <label>",
      texto: "An empty field doesn't say what you should type. That's what `<label>` is for: the field's **label**, like the one on a pantry jar. 🫙\n\nSo that the `<label>` and its field end up **linked**:\n\n1. Give the field an `id` (a unique name on the page, as you saw in Links).\n2. Put that same name in the `for` attribute of the `<label>`.\n\nThis way a screen reader will say “Your plant's name, text field”. And on top of that, when you click the text the cursor jumps to the field!",
      ejemplo: {
        html: `<form>
  <label for="plant">Your plant's name</label>
  <input type="text" id="plant">
</form>`,
        css: ""
      },
      consejo: "The trick is that `for` and `id` are **exactly the same**, letter by letter. If you write `for=\"plant\"` and `id=\"Plant\"`, they're no longer recognized: capitals count."
    },
    {
      tipo: "explicacion",
      titulo: "name and placeholder",
      texto: "Two more attributes that almost every field carries:\n\n• `name` is the name the **data travels** with when it's submitted. If the field has `name=\"flavor\"` and you type “strawberry”, the server receives `flavor=strawberry`. Without `name`, that data is not sent.\n• `placeholder` is a **sample text** in gray that appears inside the empty field and disappears as you type.\n\nNotice how each `<label>` + field pair goes inside a `<p>`, so they don't all end up on the same line.",
      ejemplo: {
        html: `<form>
  <p>
    <label for="flavor">Ice cream flavor</label>
    <input type="text" id="flavor" name="flavor" placeholder="Strawberry, chocolate…">
  </p>
  <button>Order ice cream</button>
</form>`,
        css: ""
      },
      consejo: "The `placeholder` **never replaces the `<label>`**: as soon as you start typing, it disappears, and you no longer know what it was asking for. 🍦"
    },
    {
      tipo: "ejercicio",
      enunciado: "Create the form of the **Wizard academy** 🧙. Write, in this order:\n\n1. A `<form>`. Everything else goes **inside** it (this time without `<p>`).\n2. A `<label>` with `for=\"spell\"` that says **Your favorite spell**.\n3. Below it, an `<input>` with `type=\"text\"`, `id=\"spell\"`, `name=\"spell\"` and `placeholder=\"Abracadabra\"`.\n4. A `<button>` that says **Sign me up**.\n\nDon't add any other attributes. When you're done, click the label's text: the cursor will jump to the field!",
      solucion: {
        html: `<form>
  <label for="spell">Your favorite spell</label>
  <input type="text" id="spell" name="spell" placeholder="Abracadabra">
  <button>Sign me up</button>
</form>`,
        css: ""
      },
      pistas: [
        "Open with <form> and close with </form> at the end, after the button. The for of the <label> and the id of the <input> have to be the same: spell. Remember that <input> has no closing tag.",
        "Inside the form go three lines:\n<label for=\"spell\">Your favorite spell</label>\n<input type=\"text\" id=\"spell\" name=\"spell\" placeholder=\"Abracadabra\">\n<button>Sign me up</button>"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "How do you link a <label> with its text field?",
      opciones: [
        "Writing the same text in the label and in the placeholder",
        "Putting in the label's for the same value as the field's id",
        "Placing the label just above the field"
      ],
      correcta: 1,
      explicacion: "The for of the <label> must be the same as the field's id. Being close together is not enough: without for and id, the browser doesn't know they go together."
    },
    {
      tipo: "reto",
      enunciado: "Finish the form of the **dinosaur fan club** 🦖:\n\n1. Link the “Name” `<label>` with its field: `for` on the label, `id` on the field.\n2. Add a “City” `<label>` and a text field for the city, also linked and with its `name`.\n3. Add a button that says **Join**.",
      inicial: {
        html: `<h1>Dinosaur fan club 🦖</h1>
<form>
  <p>
    <!-- 1. Link this label with its field (for + id) -->
    <label>Name</label>
    <input type="text" name="name" placeholder="Rex Smith">
  </p>

  <!-- 2. Add here a “City” label and its text field, linked and with name -->

  <!-- 3. Add here a button that says “Join” -->
</form>
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "Inside the <form> there are at least two text fields, each one with its name",
          prueba: (doc) => Array.from(doc.querySelectorAll("form input"))
            .filter(i => i.type === "text" && (i.getAttribute("name") || "").trim().length > 0).length >= 2
        },
        {
          texto: "Each text field has a linked <label> (the label's for is the same as the field's id)",
          prueba: (doc) => {
            const campos = Array.from(doc.querySelectorAll("form input")).filter(i => i.type === "text");
            const labels = Array.from(doc.querySelectorAll("label[for]"));
            return campos.length >= 2 && campos.every(i =>
              i.id.length > 0 &&
              doc.getElementById(i.id) === i &&
              labels.some(l => l.getAttribute("for") === i.id && l.textContent.trim().length > 0));
          }
        },
        {
          texto: "There is a <label> that says “Name” and another one that says “City”",
          prueba: (doc) => {
            const textos = Array.from(doc.querySelectorAll("label")).map(l => l.textContent.toLowerCase());
            return textos.some(t => t.includes("name")) && textos.some(t => t.includes("city"));
          }
        },
        {
          texto: "Inside the <form> there is a <button> that says “Join”",
          prueba: (doc) => Array.from(doc.querySelectorAll("form button"))
            .some(b => b.textContent.toLowerCase().includes("join"))
        }
      ],
      pistas: [
        "Choose a name for each field, for example “name” and “city”. Put it in the <input>'s id and, exactly the same, in its <label>'s for. The button goes inside the <form>, before </form>.",
        "The city part would look like this:\n<p>\n  <label for=\"city\">City</label>\n  <input type=\"text\" id=\"city\" name=\"city\">\n</p>\nAnd the button: <button>Join</button>"
      ],
      solucion: {
        html: `<h1>Dinosaur fan club 🦖</h1>
<form>
  <p>
    <label for="name">Name</label>
    <input type="text" id="name" name="name" placeholder="Rex Smith">
  </p>

  <p>
    <label for="city">City</label>
    <input type="text" id="city" name="city" placeholder="Jurassic North">
  </p>

  <button>Join</button>
</form>
`,
        css: ""
      }
    }
  ]
});