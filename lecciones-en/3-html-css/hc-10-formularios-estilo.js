/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-10
   Formularios con estilo — font: inherit en los campos, estilos
   de input y button, :focus bien visible con outline, :invalid
   y :valid, y accent-color.
   Notas:
   - :focus sí se fuerza en el revisor (en todos los elementos a
     la vez); en el reto se compara la página normal con
     PRUEBA.clonar({ estado: "focus" }).
   - :invalid / :valid NO se fuerzan: dependen del valor real. Por
     eso el email trae escrito un valor inválido (value="karts.com")
     y así el estilo :invalid se ve con la página quieta.
   - El campo de texto del reto no es required: vacío cuenta como
     :valid, y sirve para comprobar que el rojo sale de :invalid.
   ============================================================ */
CURSO.registrar({
  id: "hc-10",
  titulo: "Styled forms",
  xp: 50,
  objetivo: "You'll learn to give your forms a modern, accessible look: matching fonts, rounded fields, a clearly visible focus and error warnings.",
  glosario: [
    { termino: "font: inherit", tema: "Forms", para: "Fields don't inherit the page's font by default: this makes them inherit it.", ejemplo: "input, select, textarea, button {\n  font: inherit;\n}", buscar: "inherit font fields" },
    { termino: "outline", tema: "Forms", para: "A contour drawn outside the border, ideal for focus.", ejemplo: "input:focus {\n  outline: 3px solid rgb(31 122 107 / 0.2);\n}", buscar: "visible focus outline" },
    { termino: ":invalid and :valid", tema: "Forms", para: "The field meets or doesn't meet what's asked of it (`required`, `type=\"email\"`…).", ejemplo: "input:valid {\n  border-color: #1f7a6b;\n}", buscar: "valid invalid error" },
    { termino: ":user-invalid and :user-valid", tema: "Forms", para: "Like `:invalid`/`:valid`, but only after the person has touched the field.", ejemplo: "input:user-invalid {\n  border-color: #c23a52;\n  background-color: #fdf2f4;\n}", buscar: "red error after typing" },
    { termino: "accent-color", tema: "Forms", para: "The color of checkboxes and radio buttons.", ejemplo: "input {\n  accent-color: #1f7a6b;\n}", buscar: "checkbox radio color accent" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Fields don't inherit the font",
      texto: "Fields (`<input>`, `<button>`, `<select>`, `<textarea>`) are a bit rebellious: **they don't inherit** the page's font. Even if your `body` has a big, pretty font, they stick to their own tiny one. 😒\n\nOne line fixes it: `font: inherit`.\n\n• `font` is a **shorthand** that groups `font-family`, `font-size`, `font-weight`…\n• `inherit` means “**inherit the value from your parent**”.\n\nAfter that you can dress them like any other box: `padding` so they can breathe, a soft `border` and `border-radius` to round the corners.",
      ejemplo: {
        html: `<form>
  <label for="pet">Your pet's name</label>
  <input type="text" id="pet" name="pet">
  <button>Save</button>
</form>`,
        css: `body {
  font-family: sans-serif;
  font-size: 18px;
}
input,
button {
  font: inherit;
}
input {
  padding: 8px;
  border: 2px solid silver;
  border-radius: 8px;
}`
      },
      consejo: "Start any project with forms by writing `input, button { font: inherit; }`. It's one line and it saves you a lot of unpleasant surprises. (If you also use `select` or `textarea`, add them to the list)."
    },
    {
      tipo: "ejercicio",
      enunciado: "Fix the book club's form 📚. The HTML is already written; you write the CSS:\n\n• To the selectors `input` and `button` (together, separated by a comma) give `font` the value `inherit`.\n• To the selector `input` give `padding` of `8px`, `border` of `2px solid silver` and `border-radius` of `8px`.",
      cssBase: `body { font-family: serif; font-size: 20px; }
form { display: flex; flex-direction: column; gap: 8px; max-width: 320px; }
button { background-color: teal; color: white; border: none; padding: 8px; border-radius: 8px; }`,
      inicial: {
        html: `<form>
  <label for="book">Your favorite book</label>
  <input type="text" id="book" name="book">
  <button>Recommend</button>
</form>
`,
        css: ""
      },
      solucion: {
        html: `<form>
  <label for="book">Your favorite book</label>
  <input type="text" id="book" name="book">
  <button>Recommend</button>
</form>
`,
        css: `input,
button {
  font: inherit;
}
input {
  padding: 8px;
  border: 2px solid silver;
  border-radius: 8px;
}
`
      },
      pistas: [
        "There are two rules. The first has two selectors separated by a comma (input, button) and a single property. The second is only for input, with three properties.",
        "It should look like this:\ninput,\nbutton {\n  font: inherit;\n}\ninput {\n  padding: 8px;\n  border: 2px solid silver;\n  border-radius: 8px;\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "A focus you can see",
      texto: "When you click a field, or reach it with the **Tab** key, that field has the **focus**: it's where whatever you type will land. Many people navigate with the keyboard only, so it has to be **very clear** where the focus is.\n\nYou already know `:focus`. To mark it, the best thing is `outline`: a **contour** drawn outside the border that takes up no space (it doesn't push anything). It's written like `border`: width, style and color.\n\nClick the first field of the result and press **Tab** a few times: watch the orange contour jump! 🟠",
      ejemplo: {
        html: `<form>
  <label for="username">Username</label>
  <input type="text" id="username" name="username">
  <label for="password">Password</label>
  <input type="password" id="password" name="password">
  <button>Log in</button>
</form>`,
        css: `body {
  font-family: sans-serif;
}
form {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 260px;
}
input,
button {
  font: inherit;
  padding: 6px;
}
input:focus,
button:focus {
  outline: 3px solid darkorange;
}`
      },
      consejo: "Never remove the contour with `outline: none` without putting another focus style in its place: keyboard users would be left in the dark. 🙈"
    },
    {
      tipo: "ejercicio",
      enunciado: "In the pet store's form 🐶, make the focus clearly visible:\n\n• To the selector `input:focus` give `outline` the value `3px solid darkorange`.\n\nWhen you have it, click the field in the result to see the contour.",
      cssBase: `body { font-family: sans-serif; font-size: 18px; }
form { display: flex; flex-direction: column; gap: 8px; max-width: 320px; }
input, button { font: inherit; }
input { padding: 8px; border: 2px solid silver; border-radius: 8px; }
button { background-color: steelblue; color: white; border: none; padding: 8px; border-radius: 8px; }`,
      inicial: {
        html: `<form>
  <label for="email">Your email</label>
  <input type="email" id="email" name="email">
  <button>Notify me about the deals</button>
</form>
`,
        css: ""
      },
      solucion: {
        html: `<form>
  <label for="email">Your email</label>
  <input type="email" id="email" name="email">
  <button>Notify me about the deals</button>
</form>
`,
        css: `input:focus {
  outline: 3px solid darkorange;
}
`
      },
      pistas: [
        "A single rule: the selector is input:focus (no spaces) and inside goes the property outline with its three values, like a border.",
        "It should look like this:\ninput:focus {\n  outline: 3px solid darkorange;\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Fields that warn: :invalid and :valid",
      texto: "Remember that `type=\"email\"` knows when the @ is missing? CSS can use that information with two pseudo-classes:\n\n• `:invalid`: the field's value **doesn't meet** its rules (for example, an email without an @).\n• `:valid`: the value **does meet them**.\n\nIn the example, the field comes with `karts.com` already typed in, thanks to the `value` attribute (it puts some initial text inside the field). Since it isn't an email, its border shows up red. Click it and type an @ (for example, `hello@karts.com`): it will turn green right away! ✅",
      ejemplo: {
        html: `<label for="email">Your email</label>
<input type="email" id="email" name="email" value="karts.com">`,
        css: `body {
  font-family: sans-serif;
}
input {
  font: inherit;
  padding: 8px;
  border: 3px solid silver;
  border-radius: 8px;
}
input:invalid {
  border-color: crimson;
}
input:valid {
  border-color: seagreen;
}`
      },
      consejo: "Careful: a `required` field that is empty also counts as `:invalid`… and it would show up red before you type anything! The next step has the solution."
    },
    {
      tipo: "explicacion",
      titulo: "Red only when it should: :user-invalid",
      texto: "Imagine opening a form and **all** the required fields already showing up in red, before you type anything. How overwhelming! 😰\n\nThat's what `:user-invalid` and `:user-valid` are for. They work like `:invalid` and `:valid`, but **they wait until the person touches the field**: they kick in when you type something and leave the field, or when you try to submit the form.\n\nIn the example, the field is required and empty, but it shows up gray. Type something without an @, click outside… now it does show up red!",
      ejemplo: {
        html: `<label for="email">Your email</label>
<input type="email" id="email" name="email" required>`,
        css: `body {
  font-family: sans-serif;
}
input {
  font: inherit;
  padding: 8px;
  border: 3px solid silver;
  border-radius: 8px;
}
input:user-invalid {
  border-color: crimson;
}
input:user-valid {
  border-color: seagreen;
}`
      },
      consejo: "In real forms, use `:user-invalid` for the red warnings: they only get in the way when there's actually something to fix."
    },
    {
      tipo: "explicacion",
      titulo: "accent-color: checkboxes that match",
      texto: "Checkboxes (`checkbox`) and radio buttons (`radio`) come with the browser's blue. To paint them your site's color, use `accent-color` (“accent color”): `accent-color: darkorange;`\n\nThis property **is inherited**, so you can put it on the whole `form` and all its checkboxes and radios will use it. 🎨",
      ejemplo: {
        html: `<form>
  <p>
    <input type="checkbox" id="helmet" name="helmet" checked>
    <label for="helmet">I bring my own helmet</label>
  </p>
  <fieldset>
    <legend>Your level</legend>
    <input type="radio" id="fast" name="level" value="fast" checked>
    <label for="fast">Fast driver</label>
    <input type="radio" id="relaxed" name="level" value="relaxed">
    <label for="relaxed">Relaxed driver</label>
  </fieldset>
</form>`,
        css: `form {
  font-family: sans-serif;
  accent-color: darkorange;
}
fieldset {
  border: 2px dashed darkorange;
  border-radius: 12px;
}
legend {
  font-weight: bold;
  padding: 0 6px;
}`
      },
      consejo: "Do you remember `<fieldset>` and `<legend>`? They're boxes like any other: with `border`, `border-radius` and `padding` you remove the browser's gray frame and they match your site."
    },
    {
      tipo: "controles",
      instruccion: "Design your own field: change how rounded its corners are, its padding and the color of its border, and the accent color of the checkbox. Click the field and the checkbox to see how they look.",
      html: `<form>
  <label for="nickname">Your driver nickname</label>
  <input type="text" id="nickname" name="nickname" class="field">
  <p>
    <input type="checkbox" id="rules" name="rules" checked>
    <label for="rules">I accept the track rules</label>
  </p>
</form>`,
      cssBase: `body { font-family: sans-serif; font-size: 18px; }
form { display: flex; flex-direction: column; gap: 8px; max-width: 320px; }
.field { font: inherit; border: 3px solid silver; }
.field:focus { outline: 3px solid darkorange; }
#rules { width: 20px; height: 20px; vertical-align: middle; }`,
      controles: [
        { selector: ".field", propiedad: "border-radius", tipo: "rango", min: 0, max: 24, valor: 8, unidad: "px" },
        { selector: ".field", propiedad: "padding", tipo: "rango", min: 0, max: 20, valor: 8, unidad: "px" },
        { selector: ".field", propiedad: "border-color", tipo: "color", valor: "#c0c0c0" },
        { selector: "form", propiedad: "accent-color", tipo: "color", valor: "#ff8c00" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Why is it a bad idea to write outline: none on :focus without putting another style in its place?",
      opciones: [
        "Because people navigating with the keyboard wouldn't know which field they're on",
        "Because the form would stop being submitted",
        "Because the field would become invisible"
      ],
      correcta: 0,
      explicacion: "The focus contour is the keyboard user's “arrow”: it tells them where they're about to type. If you remove it, put another clearly visible style in its place."
    },
    {
      tipo: "reto",
      enunciado: "🏎️ Sign-ups are open for the Karts Grand Prix! Give the form some style (the HTML is already done):\n\n1. Have the `input`s and the `button` inherit the page's font with `font: inherit`.\n2. Round the corners of the `.field` fields with a `border-radius` of `10px`.\n3. When a `.field` has the focus, have it show an `outline` of `3px solid darkorange`.\n4. If a `.field` isn't valid (`:invalid`), have its border turn red: `border-color: crimson`. The email comes with `karts.com` typed in, so it should already show up red.\n\n⭐ Extra (not checked): give `accent-color: darkorange` to the `.signup` form to paint the checkbox.",
      cssBase: `body { font-family: sans-serif; font-size: 18px; background-color: #fff3e0; }
.signup { display: flex; flex-direction: column; gap: 8px; max-width: 340px; padding: 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgb(0 0 0 / 0.15); }
.signup h2 { margin: 0 0 8px; }
.checkbox { margin: 4px 0; }
.signup button { background-color: #c2410c; color: white; font-weight: bold; border: none; padding: 10px; border-radius: 10px; }`,
      inicial: {
        html: `<form class="signup">
  <h2>🏁 Karts Grand Prix</h2>
  <label for="driver">Driver's name</label>
  <input type="text" id="driver" name="driver" class="field">
  <label for="email">Email</label>
  <input type="email" id="email" name="email" class="field" value="karts.com">
  <p class="checkbox">
    <input type="checkbox" id="helmet" name="helmet" checked>
    <label for="helmet">I bring my own helmet</label>
  </p>
  <button>Sign me up!</button>
</form>
`,
        css: `input,
button {
  /* 1. Inherit the page's font */
}

.field {
  padding: 10px;
  border: 2px solid silver;
  /* 2. Rounded corners of 10px */
}

.field:focus {
  /* 3. Contour of 3px, solid and dark orange */
}

/* 4. Red border when the field isn't valid */


/* ⭐ Extra: checkboxes in the site's color */
`
      },
      comprobaciones: [
        {
          texto: "The fields and the button use the same font as the page (`font: inherit`)",
          prueba: (doc, win) => {
            const tam = win.getComputedStyle(doc.body).fontSize;
            const elementos = [doc.querySelector("#driver"), doc.querySelector("#email"), doc.querySelector("button")];
            return elementos.every(el => el && win.getComputedStyle(el).fontSize === tam);
          }
        },
        {
          texto: "The `.field` fields have rounded corners",
          prueba: (doc, win) => {
            const campos = [...doc.querySelectorAll(".field")];
            return campos.length >= 2 && campos.every(c => parseFloat(win.getComputedStyle(c).borderTopLeftRadius) >= 6);
          }
        },
        {
          texto: "With the focus on, the fields show a contour (`outline`) of at least 3px",
          prueba: async (doc, win) => {
            const p = doc.querySelector("#driver");
            if (!p || win.getComputedStyle(p).outlineStyle !== "none") return false;
            const v = await PRUEBA.clonar(doc, { estado: "focus" });
            const copia = v.doc.querySelector("#driver");
            if (!copia) return false;
            const cs = v.win.getComputedStyle(copia);
            return cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) >= 3;
          }
        },
        {
          texto: "The invalid email has a red border thanks to `:invalid` (and the driver name, which is valid, doesn't)",
          prueba: (doc, win) => {
            const rojo = el => {
              const n = (win.getComputedStyle(el).borderTopColor.match(/[\d.]+/g) || []).map(Number);
              return n[0] > 150 && n[1] < 110 && n[2] < 110;
            };
            const email = doc.querySelector("#email");
            const piloto = doc.querySelector("#driver");
            if (!email || !piloto) return false;
            return PRUEBA.reglas(doc, ":invalid").length > 0 && rojo(email) && !rojo(piloto);
          }
        }
      ],
      pistas: [
        "Fill in the rules you already have: font: inherit in the first one, border-radius in .field and outline in .field:focus. For step 4 write a new rule with the selector .field:invalid.",
        "It should look like this:\ninput, button { font: inherit; }\nIn .field add: border-radius: 10px;\n.field:focus { outline: 3px solid darkorange; }\n.field:invalid { border-color: crimson; }"
      ],
      solucion: {
        html: `<form class="signup">
  <h2>🏁 Karts Grand Prix</h2>
  <label for="driver">Driver's name</label>
  <input type="text" id="driver" name="driver" class="field">
  <label for="email">Email</label>
  <input type="email" id="email" name="email" class="field" value="karts.com">
  <p class="checkbox">
    <input type="checkbox" id="helmet" name="helmet" checked>
    <label for="helmet">I bring my own helmet</label>
  </p>
  <button>Sign me up!</button>
</form>
`,
        css: `input,
button {
  font: inherit;
}

.field {
  padding: 10px;
  border: 2px solid silver;
  border-radius: 10px;
}

.field:focus {
  outline: 3px solid darkorange;
}

.field:invalid {
  border-color: crimson;
}

.signup {
  accent-color: darkorange;
}
`
      }
    }
  ]
});
