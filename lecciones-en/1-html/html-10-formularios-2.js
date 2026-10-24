/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-10
   Formularios: más tipos de campo — email, number, password,
   radio, checkbox, fieldset/legend (agrupar opciones con su título),
   select/option, textarea y required.
   Nota: en las prácticas el motor intercepta el envío del
   formulario (no va a ningún sitio). Todos los campos llevan
   su <label for> + id.
   ============================================================ */
CURSO.registrar({
  id: "html-10",
  titulo: "Forms: more field types",
  xp: 45,
  objetivo: "You will know how to pick the right field for each piece of data: email, number, password, options, lists and long texts.",
  // Lo que enseña esta lección, para el glosario de las lecciones de proyecto (js/glosario.js)
  glosario: [
    { termino: "type=\"email\", \"number\", \"tel\"", tema: "Forms", para: "Fields for an email, a number or a phone.", ejemplo: "<input type=\"email\" id=\"email\" name=\"email\">\n<input type=\"tel\" id=\"phone\" name=\"phone\">", buscar: "email number phone" },
    { termino: "type=\"date\" and type=\"time\"", tema: "Forms", para: "Fields for picking a day or a time.", ejemplo: "<input type=\"date\" id=\"date\" name=\"date\">\n<input type=\"time\" id=\"time\" name=\"time\">", buscar: "date day time calendar" },
    { termino: "type=\"checkbox\"", tema: "Forms", para: "A box you can tick or leave unticked.", ejemplo: "<input type=\"checkbox\" id=\"privacy\" name=\"privacy\">\n<label for=\"privacy\">I accept the privacy policy</label>", buscar: "checkbox tick accept" },
    { termino: "type=\"radio\"", tema: "Forms", para: "Pick just one option: all of them share the same `name`.", ejemplo: "<input type=\"radio\" id=\"yes\" name=\"first\" value=\"yes\">\n<label for=\"yes\">Yes</label>", buscar: "option choose one" },
    { termino: "<fieldset> and <legend>", tema: "Forms", para: "They group fields with a title.", ejemplo: "<fieldset>\n  <legend>Your pet</legend>\n  …\n</fieldset>", buscar: "group grouping title" },
    { termino: "<select> and <option>", tema: "Forms", para: "A drop-down list of options.", ejemplo: "<select id=\"pet\" name=\"pet\">\n  <option value=\"dog\">Dog</option>\n  <option value=\"cat\">Cat</option>\n</select>", buscar: "dropdown list options choose" },
    { termino: "<textarea>", tema: "Forms", para: "A field for writing several lines.", ejemplo: "<textarea id=\"reason\" name=\"reason\"></textarea>", buscar: "long text comment message" },
    { termino: "required", tema: "Forms", para: "The field is required: the form is not sent empty.", ejemplo: "<input type=\"text\" id=\"name\" name=\"name\" required>", buscar: "required validate" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Every piece of data, its own field",
      texto: "Until now you used `<input type=\"text\">` for everything. But if you change the `type`, the browser lends you a hand:\n\n• `type=\"email\"`: it warns you if the @ is missing.\n• `type=\"number\"`: it only lets you write numbers and adds a few little arrows.\n• `type=\"password\"`: it covers what you write with dots, in case someone is looking. 🙈\n\nAnd a new attribute: `required`. If the field is empty, the form **is not sent** and a warning pops up. It is an attribute with no value: just writing the word is enough.",
      ejemplo: {
        html: `<form>
  <p>
    <label for="email">Your email</label>
    <input type="email" id="email" name="email" required>
  </p>
  <p>
    <label for="age">Your robot's age</label>
    <input type="number" id="age" name="age">
  </p>
  <p>
    <label for="password">Secret password</label>
    <input type="password" id="password" name="password">
  </p>
  <button>Send</button>
</form>`,
        css: ""
      },
      consejo: "On a mobile, `type=\"email\"` brings up a keyboard with the @ at hand and `type=\"number\"` a numbers-only one. Your users will thank you!"
    },
    {
      tipo: "explicacion",
      titulo: "Phones, dates and times",
      texto: "Three more types you will see in almost any booking or appointment form:\n\n• `type=\"tel\"`: for a **phone number**. On a mobile it brings up the dialling keyboard. 📱\n• `type=\"date\"`: for a **date**. The browser shows a calendar to pick the day. 📅\n• `type=\"time\"`: for a **time**. A picker for hours and minutes comes up. ⏰\n\nTry them out in the example: click on the date and on the time.",
      ejemplo: {
        html: `<form>
  <p>
    <label for="phone">Phone</label>
    <input type="tel" id="phone" name="phone">
  </p>
  <p>
    <label for="day">Day of the booking</label>
    <input type="date" id="day" name="day">
  </p>
  <p>
    <label for="time">Time</label>
    <input type="time" id="time" name="time">
  </p>
  <button>Book</button>
</form>`,
        css: ""
      },
      consejo: "Each browser draws its calendar its own way, but the value it sends is always the same: the date as `2026-10-20` (year-month-day) and the time as `09:30`."
    },
    {
      tipo: "explicacion",
      titulo: "Choosing options: radio and checkbox",
      texto: "When the user has to **choose**, there is no need to type:\n\n• `type=\"radio\"`: little circles where you can only mark **one** of the group. When you mark another one, the previous one gets unmarked. The group is formed by giving them all **the same `name`**.\n• `type=\"checkbox\"`: boxes where you tick **as many as you like**.\n\nThe `value` attribute is what gets sent when that option is ticked. Notice too that here the field goes **before** its `<label>`: that is the usual thing for circles and boxes.",
      ejemplo: {
        html: `<form>
  <p>Which superpower do you prefer?</p>
  <input type="radio" id="fly" name="power" value="fly">
  <label for="fly">Fly</label>
  <input type="radio" id="invisible" name="power" value="invisible">
  <label for="invisible">Be invisible</label>

  <p>What do you carry in your heroine's backpack?</p>
  <input type="checkbox" id="cape" name="backpack" value="cape">
  <label for="cape">Cape</label>
  <input type="checkbox" id="sandwich" name="backpack" value="sandwich">
  <label for="sandwich">Emergency sandwich</label>
</form>`,
        css: ""
      },
      consejo: "Typical mistake: if your radios have **different names**, the browser thinks they are different questions and lets you tick two of them! And thanks to the `<label>`, you can tap the text instead of aiming at the little circle."
    },
    {
      tipo: "explicacion",
      titulo: "Grouping options: fieldset and legend",
      texto: "Each little circle has its `<label>`, but where does the **question** go? If you write it in a `<p>`, a blind person using a **screen reader** hears “Fly, radio button”… fly for what? 🤔\n\nThat is what these are for:\n\n• `<fieldset>`: a box that **groups** fields that go together. The browser draws a frame around it.\n• `<legend>`: the **title** of the group. It comes first, inside the `<fieldset>`.\n\nNow the reader says “Which superpower do you prefer? Fly, radio button”. Always use them on radio and checkbox groups.",
      ejemplo: {
        html: `<form>
  <fieldset>
    <legend>Which superpower do you prefer?</legend>
    <input type="radio" id="fly" name="power" value="fly">
    <label for="fly">Fly</label>
    <input type="radio" id="invisible" name="power" value="invisible">
    <label for="invisible">Be invisible</label>
  </fieldset>
</form>`,
        css: ""
      },
      consejo: "The grey frame that shows up is the style the browser applies. In the HTML + CSS World you will learn to decorate it however you want."
    },
    {
      tipo: "ejercicio",
      enunciado: "Ask for the flavor of an ice cream 🍦. Write, in this order:\n\n1. A `<form>` with a `<fieldset>` inside.\n2. Inside the `<fieldset>`, first a `<legend>` that says **Ice cream flavor**.\n3. Then, an `<input>` with `type=\"radio\"`, `id=\"chocolate\"`, `name=\"flavor\"` and `value=\"chocolate\"`, followed by its `<label for=\"chocolate\">` saying **Chocolate**.\n4. Another one like it for **Strawberry** (`id`, `value` and `for` = `strawberry`, and the same `name=\"flavor\"`).",
      solucion: {
        html: `<form>
  <fieldset>
    <legend>Ice cream flavor</legend>
    <input type="radio" id="chocolate" name="flavor" value="chocolate">
    <label for="chocolate">Chocolate</label>
    <input type="radio" id="strawberry" name="flavor" value="strawberry">
    <label for="strawberry">Strawberry</label>
  </fieldset>
</form>`,
        css: ""
      },
      pistas: [
        "The order is: <form> → <fieldset> → <legend> with the title → the radios with their labels → close </fieldset> and </form>.",
        "Inside the fieldset:\n<legend>Ice cream flavor</legend>\n<input type=\"radio\" id=\"chocolate\" name=\"flavor\" value=\"chocolate\">\n<label for=\"chocolate\">Chocolate</label>\n…and the same with strawberry."
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Drop-down lists and long texts",
      texto: "Two more fields that are not `<input>`:\n\n• `<select>` creates a **drop-down list**. Each option goes inside it as an `<option>`: the `value` is what gets sent and the text is what you see.\n• `<textarea>` is a **big box** for writing several lines, like a comment. Unlike `<input>`, it **does have a closing tag**. The `rows` attribute says how many lines you see.\n\nWith both you keep using `<label for>` + `id`, just like always.",
      ejemplo: {
        html: `<form>
  <p>
    <label for="planet">Holiday planet</label>
    <select id="planet" name="planet">
      <option value="mars">Mars</option>
      <option value="saturn">Saturn (with rings)</option>
      <option value="pluto">Pluto (for the good old days)</option>
    </select>
  </p>
  <p>
    <label for="postcard">Write a postcard</label>
    <textarea id="postcard" name="postcard" rows="3"></textarea>
  </p>
</form>`,
        css: ""
      },
      consejo: "Radio or select? With **few** options (2–4), use radio: you see them all at a glance. With **many** (countries, years…), a select saves space."
    },
    {
      tipo: "ejercicio",
      enunciado: "Create the form for **adopting a dragon** 🐉. Write, in this order:\n\n1. A `<form>`. Everything else goes **inside** it (no `<p>`).\n2. A `<label>` with `for=\"age\"` saying **Dragon's age**.\n3. Below it, an `<input>` with `type=\"number\"`, `id=\"age\"`, `name=\"age\"` and `required`.\n4. A `<button>` saying **Adopt**.\n\nDo not add any other attribute. When you are done, try typing letters into the field, or press **Adopt** with the field empty.",
      solucion: {
        html: `<form>
  <label for="age">Dragon's age</label>
  <input type="number" id="age" name="age" required>
  <button>Adopt</button>
</form>`,
        css: ""
      },
      pistas: [
        "It is like the form from the previous lesson, but with type=\"number\" instead of \"text\". The attribute required is written as it is, without =\"…\".",
        "Inside the form go three lines:\n<label for=\"age\">Dragon's age</label>\n<input type=\"number\" id=\"age\" name=\"age\" required>\n<button>Adopt</button>"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "You ask for a T-shirt size and only ONE can be chosen. Which field do you use?",
      opciones: ["Several checkboxes", "Several radios with the same name", "A textarea"],
      correcta: 1,
      explicacion: "The radios of one group (same name) only allow one option to be marked. Checkboxes allow several to be marked, and a textarea is for writing long texts."
    },
    {
      tipo: "reto",
      enunciado: "Finish the pizzeria's survey 🍕. Each field with its `<label for>` and its `id`:\n\n1. Change the email field to `type=\"email\"` and make it required with `required`.\n2. Size: there is already a “Medium” radio inside its `<fieldset>`. Add another one **inside** it (for example “Family size”) with **the same `name`**.\n3. Ingredients: inside its `<fieldset>`, add at least two `checkbox` boxes.\n4. Crust: a `<select>` with at least two `<option>`.\n5. Comments: a `<textarea>`.",
      inicial: {
        html: `<h1>Pizza survey</h1>
<form>
  <!-- 1. Change this field to type email and make it required -->
  <p>
    <label for="email">Your email</label>
    <input type="text" id="email" name="email">
  </p>

  <fieldset>
    <legend>Size</legend>
    <input type="radio" id="medium" name="size" value="medium">
    <label for="medium">Medium</label>
    <!-- 2. Add another size radio with the same name -->
  </fieldset>

  <fieldset>
    <legend>Ingredients</legend>
    <!-- 3. Add at least two ingredients (checkbox) -->
  </fieldset>

  <!-- 4. Add the crust: a select with at least two options -->

  <!-- 5. Add the comments: a textarea -->

  <button>Send survey</button>
</form>
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "There is a required email field (type=\"email\" and required)",
          prueba: (doc) => Array.from(doc.querySelectorAll("input"))
            .some(i => i.type === "email" && i.required)
        },
        {
          texto: "There are at least two size options (radio) with the same name",
          prueba: (doc) => {
            const cuenta = {};
            Array.from(doc.querySelectorAll("input"))
              .filter(i => i.type === "radio" && i.name)
              .forEach(i => { cuenta[i.name] = (cuenta[i.name] || 0) + 1; });
            return Object.values(cuenta).some(n => n >= 2);
          }
        },
        {
          texto: "There are at least two ingredients (checkbox)",
          prueba: (doc) => Array.from(doc.querySelectorAll("input"))
            .filter(i => i.type === "checkbox").length >= 2
        },
        {
          texto: "There is a <select> with at least two <option> and a <textarea> for the comments",
          prueba: (doc) => (doc.querySelector("select")?.querySelectorAll("option").length || 0) >= 2
            && !!doc.querySelector("textarea")
        }
      ],
      pistas: [
        "Copy the shape of the examples: radios and checkboxes are written <input type=\"…\" id=\"…\" name=\"…\" value=\"…\"> followed by their <label for=\"…\">. The select carries its <option> inside, and the textarea opens and closes.",
        "Some pieces:\n<input type=\"email\" id=\"email\" name=\"email\" required>\n<input type=\"radio\" id=\"family\" name=\"size\" value=\"family\">\n<label for=\"family\">Family size</label>\n<input type=\"checkbox\" id=\"mushrooms\" name=\"ingredients\" value=\"mushrooms\">\n<label for=\"mushrooms\">Mushrooms</label>\n<select id=\"crust\" name=\"crust\"><option value=\"thin\">Thin</option><option value=\"thick\">Thick</option></select>\n<textarea id=\"comments\" name=\"comments\"></textarea>"
      ],
      solucion: {
        html: `<h1>Pizza survey</h1>
<form>
  <p>
    <label for="email">Your email</label>
    <input type="email" id="email" name="email" required>
  </p>

  <fieldset>
    <legend>Size</legend>
    <input type="radio" id="medium" name="size" value="medium">
    <label for="medium">Medium</label>
    <input type="radio" id="family" name="size" value="family">
    <label for="family">Family size</label>
  </fieldset>

  <fieldset>
    <legend>Ingredients</legend>
    <input type="checkbox" id="pineapple" name="ingredients" value="pineapple">
    <label for="pineapple">Pineapple (let the debate begin)</label>
    <input type="checkbox" id="mushrooms" name="ingredients" value="mushrooms">
    <label for="mushrooms">Mushrooms</label>
  </fieldset>

  <p>
    <label for="crust">Crust</label>
    <select id="crust" name="crust">
      <option value="thin">Thin and crispy</option>
      <option value="thick">Thick and fluffy</option>
    </select>
  </p>

  <p>
    <label for="comments">Comments</label>
    <textarea id="comments" name="comments" rows="3"></textarea>
  </p>

  <button>Send survey</button>
</form>
`,
        css: ""
      }
    }
  ]
});
