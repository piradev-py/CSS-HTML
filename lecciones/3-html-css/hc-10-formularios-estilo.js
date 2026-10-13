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
  titulo: "Formularios con estilo",
  xp: 50,
  objetivo: "Sabrás dar a tus formularios un aspecto moderno y accesible: letra a juego, campos redondeados, foco bien visible y avisos de error.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Los campos no heredan la letra",
      texto: "Los campos (`<input>`, `<button>`, `<select>`, `<textarea>`) son un poco rebeldes: **no heredan** la letra de la página. Aunque tu `body` tenga una letra grande y bonita, ellos siguen con la suya, pequeñita. 😒\n\nSe arregla con una línea: `font: inherit`.\n\n• `font` es una **abreviatura** que agrupa `font-family`, `font-size`, `font-weight`…\n• `inherit` significa «**hereda** el valor de tu padre».\n\nDespués ya puedes vestirlos como cualquier caja: `padding` para que respiren, un `border` suave y `border-radius` para redondear las esquinas.",
      ejemplo: {
        html: `<form>
  <label for="mascota">Nombre de tu mascota</label>
  <input type="text" id="mascota" name="mascota">
  <button>Guardar</button>
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
      consejo: "Empieza cualquier proyecto con formularios escribiendo `input, button { font: inherit; }`. Es una línea y te ahorra muchos sustos. (Si también usas `select` o `textarea`, añádelos a la lista)."
    },
    {
      tipo: "ejercicio",
      enunciado: "Arregla el formulario del club de lectura 📚. El HTML ya está escrito; tú escribe el CSS:\n\n• A los selectores `input` y `button` (juntos, separados por una coma) ponles `font` con el valor `inherit`.\n• Al selector `input` ponle `padding` de `8px`, `border` de `2px solid silver` y `border-radius` de `8px`.",
      cssBase: `body { font-family: serif; font-size: 20px; }
form { display: flex; flex-direction: column; gap: 8px; max-width: 320px; }
button { background-color: teal; color: white; border: none; padding: 8px; border-radius: 8px; }`,
      inicial: {
        html: `<form>
  <label for="libro">Tu libro favorito</label>
  <input type="text" id="libro" name="libro">
  <button>Recomendar</button>
</form>
`,
        css: ""
      },
      solucion: {
        html: `<form>
  <label for="libro">Tu libro favorito</label>
  <input type="text" id="libro" name="libro">
  <button>Recomendar</button>
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
        "Son dos reglas. La primera tiene dos selectores separados por una coma (input, button) y una sola propiedad. La segunda es solo para input, con tres propiedades.",
        "Debe quedarte así:\ninput,\nbutton {\n  font: inherit;\n}\ninput {\n  padding: 8px;\n  border: 2px solid silver;\n  border-radius: 8px;\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Un foco que se vea",
      texto: "Cuando haces clic en un campo, o llegas a él con la tecla **Tab**, ese campo tiene el **foco**: es donde caerá lo que escribas. Mucha gente navega solo con el teclado, así que tiene que verse **muy claro** dónde está el foco.\n\nYa conoces `:focus`. Para marcarlo, lo mejor es `outline`: un **contorno** que se dibuja por fuera del borde y no ocupa espacio (no empuja a nada). Se escribe igual que `border`: grosor, estilo y color.\n\nHaz clic en el primer campo del resultado y pulsa **Tab** varias veces: ¡mira cómo salta el contorno naranja! 🟠",
      ejemplo: {
        html: `<form>
  <label for="usuario">Usuario</label>
  <input type="text" id="usuario" name="usuario">
  <label for="clave">Contraseña</label>
  <input type="password" id="clave" name="clave">
  <button>Entrar</button>
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
      consejo: "Nunca borres el contorno con `outline: none` sin poner otro estilo de foco a cambio: quien usa el teclado se quedaría a ciegas. 🙈"
    },
    {
      tipo: "ejercicio",
      enunciado: "En el formulario de la tienda de mascotas 🐶, haz que el foco se vea bien:\n\n• Al selector `input:focus` ponle `outline` con el valor `3px solid darkorange`.\n\nCuando lo tengas, haz clic en el campo del resultado para ver el contorno.",
      cssBase: `body { font-family: sans-serif; font-size: 18px; }
form { display: flex; flex-direction: column; gap: 8px; max-width: 320px; }
input, button { font: inherit; }
input { padding: 8px; border: 2px solid silver; border-radius: 8px; }
button { background-color: steelblue; color: white; border: none; padding: 8px; border-radius: 8px; }`,
      inicial: {
        html: `<form>
  <label for="correo">Tu email</label>
  <input type="email" id="correo" name="correo">
  <button>Avisadme de las ofertas</button>
</form>
`,
        css: ""
      },
      solucion: {
        html: `<form>
  <label for="correo">Tu email</label>
  <input type="email" id="correo" name="correo">
  <button>Avisadme de las ofertas</button>
</form>
`,
        css: `input:focus {
  outline: 3px solid darkorange;
}
`
      },
      pistas: [
        "Una sola regla: el selector es input:focus (sin espacios) y dentro va la propiedad outline con sus tres valores, como un border.",
        "Debe quedarte así:\ninput:focus {\n  outline: 3px solid darkorange;\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Campos que avisan: :invalid y :valid",
      texto: "¿Recuerdas que `type=\"email\"` sabe si falta la @? CSS puede usar esa información con dos pseudo-clases:\n\n• `:invalid`: el valor del campo **no cumple** sus reglas (por ejemplo, un email sin @).\n• `:valid`: el valor **sí las cumple**.\n\nEn el ejemplo, el campo trae ya escrito `karts.com` gracias al atributo `value` (pone un texto inicial dentro del campo). Como no es un email, su borde sale rojo. Haz clic en él y escribe una @ (por ejemplo, `hola@karts.com`): ¡se pondrá verde al momento! ✅",
      ejemplo: {
        html: `<label for="email">Tu email</label>
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
      consejo: "Ojo: un campo con `required` que está vacío también cuenta como `:invalid`… ¡y saldría rojo antes de que escribas nada! Úsalo con cuidado en los campos obligatorios."
    },
    {
      tipo: "explicacion",
      titulo: "accent-color: casillas a juego",
      texto: "Las casillas (`checkbox`) y los botones de opción (`radio`) vienen con el azul del navegador. Para pintarlos del color de tu web, usa `accent-color` («color de acento»): `accent-color: darkorange;`\n\nEsta propiedad **se hereda**, así que puedes ponérsela al `form` entero y todas sus casillas y opciones la usarán. 🎨",
      ejemplo: {
        html: `<form>
  <p>
    <input type="checkbox" id="casco" name="casco" checked>
    <label for="casco">Traigo mi propio casco</label>
  </p>
  <fieldset>
    <legend>Tu nivel</legend>
    <input type="radio" id="rapido" name="nivel" value="rapido" checked>
    <label for="rapido">Piloto rápido</label>
    <input type="radio" id="tranqui" name="nivel" value="tranqui">
    <label for="tranqui">Piloto tranquilo</label>
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
      consejo: "¿Te acuerdas de `<fieldset>` y `<legend>`? Son cajas como cualquier otra: con `border`, `border-radius` y `padding` les quitas el marco gris del navegador y quedan a juego con tu web."
    },
    {
      tipo: "controles",
      instruccion: "Diseña tu propio campo: cambia lo redondo de sus esquinas, su relleno y el color de su borde, y el color de acento de la casilla. Haz clic en el campo y en la casilla para ver cómo quedan.",
      html: `<form>
  <label for="apodo">Tu apodo de piloto</label>
  <input type="text" id="apodo" name="apodo" class="campo">
  <p>
    <input type="checkbox" id="normas" name="normas" checked>
    <label for="normas">Acepto las normas del circuito</label>
  </p>
</form>`,
      cssBase: `body { font-family: sans-serif; font-size: 18px; }
form { display: flex; flex-direction: column; gap: 8px; max-width: 320px; }
.campo { font: inherit; border: 3px solid silver; }
.campo:focus { outline: 3px solid darkorange; }
#normas { width: 20px; height: 20px; vertical-align: middle; }`,
      controles: [
        { selector: ".campo", propiedad: "border-radius", tipo: "rango", min: 0, max: 24, valor: 8, unidad: "px" },
        { selector: ".campo", propiedad: "padding", tipo: "rango", min: 0, max: 20, valor: 8, unidad: "px" },
        { selector: ".campo", propiedad: "border-color", tipo: "color", valor: "#c0c0c0" },
        { selector: "form", propiedad: "accent-color", tipo: "color", valor: "#ff8c00" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "¿Por qué no conviene escribir outline: none en :focus sin poner otro estilo a cambio?",
      opciones: [
        "Porque quien navega con el teclado no sabría en qué campo está",
        "Porque el formulario dejaría de enviarse",
        "Porque el campo se volvería invisible"
      ],
      correcta: 0,
      explicacion: "El contorno del foco es la «flecha» de quien usa el teclado: le dice dónde va a escribir. Si lo quitas, pon otro estilo bien visible en su lugar."
    },
    {
      tipo: "reto",
      enunciado: "🏎️ ¡Inscripciones abiertas para el Gran Premio de Karts! Dale estilo al formulario (el HTML ya está hecho):\n\n1. Que los `input` y el `button` hereden la letra de la página con `font: inherit`.\n2. Redondea las esquinas de los campos `.campo` con un `border-radius` de `10px`.\n3. Cuando un `.campo` tenga el foco, que muestre un `outline` de `3px solid darkorange`.\n4. Si un `.campo` no es válido (`:invalid`), que su borde se ponga rojo: `border-color: crimson`. El email trae escrito `karts.com`, así que debería salir rojo ya.\n\n⭐ Extra (no se comprueba): pon `accent-color: darkorange` al formulario `.inscripcion` para pintar la casilla.",
      cssBase: `body { font-family: sans-serif; font-size: 18px; background-color: #fff3e0; }
.inscripcion { display: flex; flex-direction: column; gap: 8px; max-width: 340px; padding: 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgb(0 0 0 / 0.15); }
.inscripcion h2 { margin: 0 0 8px; }
.casilla { margin: 4px 0; }
.inscripcion button { background-color: #c2410c; color: white; font-weight: bold; border: none; padding: 10px; border-radius: 10px; }`,
      inicial: {
        html: `<form class="inscripcion">
  <h2>🏁 Gran Premio de Karts</h2>
  <label for="piloto">Nombre del piloto</label>
  <input type="text" id="piloto" name="piloto" class="campo">
  <label for="email">Email</label>
  <input type="email" id="email" name="email" class="campo" value="karts.com">
  <p class="casilla">
    <input type="checkbox" id="casco" name="casco" checked>
    <label for="casco">Traigo mi propio casco</label>
  </p>
  <button>¡Apúntame!</button>
</form>
`,
        css: `input,
button {
  /* 1. Que hereden la letra de la página */
}

.campo {
  padding: 10px;
  border: 2px solid silver;
  /* 2. Esquinas redondeadas de 10px */
}

.campo:focus {
  /* 3. Contorno de 3px, sólido y naranja oscuro */
}

/* 4. Borde rojo si el campo no es válido */


/* ⭐ Extra: casillas del color de la web */
`
      },
      comprobaciones: [
        {
          texto: "Los campos y el botón usan la misma letra que la página (`font: inherit`)",
          prueba: (doc, win) => {
            const tam = win.getComputedStyle(doc.body).fontSize;
            const elementos = [doc.querySelector("#piloto"), doc.querySelector("#email"), doc.querySelector("button")];
            return elementos.every(el => el && win.getComputedStyle(el).fontSize === tam);
          }
        },
        {
          texto: "Los campos `.campo` tienen las esquinas redondeadas",
          prueba: (doc, win) => {
            const campos = [...doc.querySelectorAll(".campo")];
            return campos.length >= 2 && campos.every(c => parseFloat(win.getComputedStyle(c).borderTopLeftRadius) >= 6);
          }
        },
        {
          texto: "Con el foco puesto, los campos muestran un contorno (`outline`) de al menos 3px",
          prueba: async (doc, win) => {
            const p = doc.querySelector("#piloto");
            if (!p || win.getComputedStyle(p).outlineStyle !== "none") return false;
            const v = await PRUEBA.clonar(doc, { estado: "focus" });
            const copia = v.doc.querySelector("#piloto");
            if (!copia) return false;
            const cs = v.win.getComputedStyle(copia);
            return cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) >= 3;
          }
        },
        {
          texto: "El email inválido tiene el borde rojo gracias a `:invalid` (y el nombre, que es válido, no)",
          prueba: (doc, win) => {
            const rojo = el => {
              const n = (win.getComputedStyle(el).borderTopColor.match(/[\d.]+/g) || []).map(Number);
              return n[0] > 150 && n[1] < 110 && n[2] < 110;
            };
            const email = doc.querySelector("#email");
            const piloto = doc.querySelector("#piloto");
            if (!email || !piloto) return false;
            return PRUEBA.reglas(doc, ":invalid").length > 0 && rojo(email) && !rojo(piloto);
          }
        }
      ],
      pistas: [
        "Rellena las reglas que ya tienes: font: inherit en la primera, border-radius en .campo y outline en .campo:focus. Para el paso 4 escribe una regla nueva con el selector .campo:invalid.",
        "Te debe quedar así:\ninput, button { font: inherit; }\nEn .campo añade: border-radius: 10px;\n.campo:focus { outline: 3px solid darkorange; }\n.campo:invalid { border-color: crimson; }"
      ],
      solucion: {
        html: `<form class="inscripcion">
  <h2>🏁 Gran Premio de Karts</h2>
  <label for="piloto">Nombre del piloto</label>
  <input type="text" id="piloto" name="piloto" class="campo">
  <label for="email">Email</label>
  <input type="email" id="email" name="email" class="campo" value="karts.com">
  <p class="casilla">
    <input type="checkbox" id="casco" name="casco" checked>
    <label for="casco">Traigo mi propio casco</label>
  </p>
  <button>¡Apúntame!</button>
</form>
`,
        css: `input,
button {
  font: inherit;
}

.campo {
  padding: 10px;
  border: 2px solid silver;
  border-radius: 10px;
}

.campo:focus {
  outline: 3px solid darkorange;
}

.campo:invalid {
  border-color: crimson;
}

.inscripcion {
  accent-color: darkorange;
}
`
      }
    }
  ]
});
