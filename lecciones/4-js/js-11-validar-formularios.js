/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-11
   Validar formularios — evento submit, evento.preventDefault(),
   repaso de campo.value, .trim(), .includes("@"), el operador !
   («no») y mensajes de error accesibles (role="alert",
   aria-describedby y una clase de error, no solo el color).
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
  titulo: "Validar formularios",
  xp: 50,
  objetivo: "Sabrás comprobar con JavaScript lo que escribe el usuario en un formulario y avisarle con mensajes claros y accesibles.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "El evento submit",
      texto: "Cuando se envía un formulario (con su botón o pulsando **Enter**), salta el evento `\"submit\"` (enviar). Lo normal es que el navegador mande los datos y **recargue la página**… ¡y tu código perdería todo!\n\nPor eso, lo primero es frenar ese envío. La función que responde al evento recibe un dato extra: el propio **evento**. Y el evento tiene un freno de mano: `evento.preventDefault()` («evita lo que harías por defecto»).\n\nDespués, lees lo escrito con `campo.value`, como ya sabes, y decides qué hacer. Escribe algo en el resultado y pulsa **Buscar** (o Enter).",
      ejemplo: {
        html: `<form id="buscador" novalidate>
  <label for="plato">¿Qué quieres cocinar?</label>
  <input id="plato" type="text">
  <button>Buscar</button>
</form>
<p id="resultado"></p>`,
        js: `const formulario = document.querySelector("#buscador");
const campo = document.querySelector("#plato");
const resultado = document.querySelector("#resultado");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  resultado.textContent = "🍳 Buscando recetas de: " + campo.value;
  console.log("Formulario enviado");
});`
      },
      consejo: "Escucha el `\"submit\"` del **formulario**, no el `\"click\"` del botón: así también funciona cuando alguien pulsa Enter en el campo. ⌨️"
    },
    {
      tipo: "ejercicio",
      enunciado: "Prepara la pantalla de entrada del videojuego 🎮. El HTML ya está escrito.\n\n• Escucha el evento `submit` del formulario `#entrada` y, dentro, frena el envío con `evento.preventDefault()`.\n• Después, pon en el párrafo `#mensaje` el texto **¡A jugar, ** seguido de lo escrito en el campo `#nombre` y un **!** al final. Si se escribe `Lucía`, debe decir **¡A jugar, Lucía!**\n\nEl mensaje solo debe aparecer al **enviar**, no mientras se escribe.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
form { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
label { width: 100%; font-weight: bold; }
input, button { font: inherit; padding: 8px; border-radius: 8px; }
input { border: 2px solid slateblue; }
button { border: none; background-color: slateblue; color: white; }
#mensaje { font-size: 24px; color: slateblue; }`,
      inicial: {
        html: `<form id="entrada" novalidate>
  <label for="nombre">Nombre de jugador</label>
  <input id="nombre" type="text">
  <button>Entrar</button>
</form>
<p id="mensaje"></p>
`,
        js: ""
      },
      solucion: {
        html: `<form id="entrada" novalidate>
  <label for="nombre">Nombre de jugador</label>
  <input id="nombre" type="text">
  <button>Entrar</button>
</form>
<p id="mensaje"></p>
`,
        js: `const formulario = document.querySelector("#entrada");
const campo = document.querySelector("#nombre");
const mensaje = document.querySelector("#mensaje");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  mensaje.textContent = "¡A jugar, " + campo.value + "!";
});
`
      },
      acciones: [
        { escribir: "#nombre", texto: "Lucía" },
        { enviar: "#entrada" }
      ],
      pistas: [
        "Guarda en constantes el formulario, el campo y el párrafo. Luego formulario.addEventListener(\"submit\", (evento) => { … }) y, dentro, primero evento.preventDefault() y después cambia el textContent de #mensaje usando campo.value.",
        "Debe quedarte así:\nconst formulario = document.querySelector(\"#entrada\");\nconst campo = document.querySelector(\"#nombre\");\nconst mensaje = document.querySelector(\"#mensaje\");\n\nformulario.addEventListener(\"submit\", (evento) => {\n  evento.preventDefault();\n  mensaje.textContent = \"¡A jugar, \" + campo.value + \"!\";\n});"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Limpiar y comprobar: trim e includes",
      texto: "Validar es **comprobar** lo escrito antes de darlo por bueno. Dos herramientas de los textos te ayudan:\n\n• `texto.trim()` devuelve el texto **sin los espacios** del principio y del final. Así, alguien que solo escribe espacios deja un texto vacío: `\"   \".trim() === \"\"` es `true`.\n• `texto.includes(\"@\")` responde `true` o `false`: ¿**incluye** ese trozo? Perfecto para ver si un email lleva su @.\n\nY para preguntar lo **contrario**, pon `!` delante: significa «no». `!email.includes(\"@\")` se lee «el email **no** incluye @».\n\nMira la consola del ejemplo (los corchetes son para que veas dónde están los espacios).",
      ejemplo: {
        js: `const escrito = "   Ana   ";
console.log("[" + escrito + "]");
console.log("[" + escrito.trim() + "]");
console.log("   ".trim() === "");

const email = "ana@correo.com";
console.log(email.includes("@"));
console.log("anacorreo.com".includes("@"));
console.log(!"anacorreo.com".includes("@"));`
      },
      consejo: "Usa siempre `trim()` antes de comprobar si un campo está vacío. Si no, un par de espacios «colarían» como si fueran un nombre. 😉"
    },
    {
      tipo: "ejercicio",
      enunciado: "En la heladería 🍦 no aceptan pedidos vacíos. El HTML ya está escrito.\n\nAl **enviar** el formulario `#pedido` (frena el envío con `preventDefault`), lee el campo `#sabor` **sin espacios** de más (usa `trim()`) y:\n\n• Si queda vacío, pon en `#aviso` el texto **Escribe un sabor, por favor.**\n• Si no, pon en `#aviso` **Marchando un helado de ** seguido del sabor y un punto. Con `fresa`: **Marchando un helado de fresa.**",
      cssBase: `body { font-family: sans-serif; padding: 10px; background-color: #fff8f0; }
form { display: flex; flex-wrap: wrap; gap: 8px; }
label { width: 100%; font-weight: bold; }
input, button { font: inherit; padding: 8px; border-radius: 8px; }
input { border: 2px solid hotpink; }
button { border: none; background-color: hotpink; color: white; }
#aviso { font-size: 20px; font-weight: bold; color: #b0306b; }`,
      inicial: {
        html: `<form id="pedido" novalidate>
  <label for="sabor">¿De qué sabor quieres tu helado?</label>
  <input id="sabor" type="text">
  <button>Pedir</button>
</form>
<p id="aviso" role="alert"></p>
`,
        js: ""
      },
      solucion: {
        html: `<form id="pedido" novalidate>
  <label for="sabor">¿De qué sabor quieres tu helado?</label>
  <input id="sabor" type="text">
  <button>Pedir</button>
</form>
<p id="aviso" role="alert"></p>
`,
        js: `const formulario = document.querySelector("#pedido");
const campo = document.querySelector("#sabor");
const aviso = document.querySelector("#aviso");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const sabor = campo.value.trim();
  if (sabor === "") {
    aviso.textContent = "Escribe un sabor, por favor.";
  } else {
    aviso.textContent = "Marchando un helado de " + sabor + ".";
  }
});
`
      },
      acciones: [
        { escribir: "#sabor", texto: "   " },
        { enviar: "#pedido" },
        { escribir: "#sabor", texto: "fresa" },
        { enviar: "#pedido" }
      ],
      pistas: [
        "Dentro del submit, guarda en una constante campo.value.trim(). Después un if que compare esa constante con \"\" (texto vacío) y un else para el mensaje bueno.",
        "Dentro del addEventListener(\"submit\", (evento) => { … }) escribe:\nevento.preventDefault();\nconst sabor = campo.value.trim();\nif (sabor === \"\") {\n  aviso.textContent = \"Escribe un sabor, por favor.\";\n} else {\n  aviso.textContent = \"Marchando un helado de \" + sabor + \".\";\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Errores que todo el mundo entiende",
      texto: "Un buen mensaje de error dice **qué falla y cómo arreglarlo**, y llega a todas las personas:\n\n• Ponlo en un `<p>` con `role=\"alert\"`: los **lectores de pantalla** (programas que leen la web en voz alta a personas ciegas) lo leen en cuanto cambia.\n• Enlázalo al campo con `aria-describedby=\"id-del-error\"`: al entrar en el campo, también se lee el error.\n• Marca el campo con una clase (`invalido`) para pintarlo de rojo, pero **no te fíes solo del color**: el texto es lo importante.\n\nY recuerda **quitar** el error cuando se corrige. Prueba el ejemplo con «Jo» y luego con «Jorge».",
      ejemplo: {
        html: `<form id="club" novalidate>
  <label for="apodo">Tu apodo</label>
  <input id="apodo" type="text" aria-describedby="error-apodo">
  <p id="error-apodo" class="error" role="alert"></p>
  <button>Entrar al club</button>
</form>`,
        css: `.error {
  color: #b00020;
  font-weight: bold;
}
.invalido {
  border: 2px solid #b00020;
  background-color: #fff0f0;
}`,
        js: `const formulario = document.querySelector("#club");
const campo = document.querySelector("#apodo");
const error = document.querySelector("#error-apodo");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const apodo = campo.value.trim();
  if (apodo.length < 3) {
    error.textContent = "⚠️ El apodo necesita al menos 3 letras.";
    campo.classList.add("invalido");
  } else {
    error.textContent = "";
    campo.classList.remove("invalido");
    console.log("Apodo aceptado: " + apodo);
  }
});`
      },
      consejo: "¿Por qué `novalidate` en el `<form>`? Le dice al navegador «no valides tú, que ya lo hago yo con JS». Y un truco de profesional: validar en la página ayuda a quien escribe, pero el **servidor** siempre debe volver a comprobarlo todo."
    },
    {
      tipo: "ejercicio",
      enunciado: "Valida el email del boletín 📬. El HTML ya está escrito (el error ya está enlazado con `aria-describedby`).\n\nAl **enviar** el formulario `#boletin` (con `preventDefault`), lee el campo `#email` con `trim()` y:\n\n• Si **no** incluye una `@`: pon en `#error-email` el texto **El email debe llevar una @.** y añade al campo `#email` la clase `invalido`.\n• Si la incluye: deja `#error-email` vacío (`\"\"`) y quita al campo la clase `invalido`.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
form { display: flex; flex-direction: column; gap: 8px; max-width: 320px; }
label { font-weight: bold; }
input, button { font: inherit; padding: 8px; border-radius: 8px; }
input { border: 2px solid #999; }
button { border: none; background-color: teal; color: white; }
.error { margin: 0; color: #b00020; font-weight: bold; }
.invalido { border-color: #b00020; background-color: #fff0f0; }`,
      inicial: {
        html: `<form id="boletin" novalidate>
  <label for="email">Tu email</label>
  <input id="email" type="email" aria-describedby="error-email">
  <p id="error-email" class="error" role="alert"></p>
  <button>Suscribirme</button>
</form>
`,
        js: ""
      },
      solucion: {
        html: `<form id="boletin" novalidate>
  <label for="email">Tu email</label>
  <input id="email" type="email" aria-describedby="error-email">
  <p id="error-email" class="error" role="alert"></p>
  <button>Suscribirme</button>
</form>
`,
        js: `const formulario = document.querySelector("#boletin");
const campo = document.querySelector("#email");
const error = document.querySelector("#error-email");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const email = campo.value.trim();
  if (!email.includes("@")) {
    error.textContent = "El email debe llevar una @.";
    campo.classList.add("invalido");
  } else {
    error.textContent = "";
    campo.classList.remove("invalido");
  }
});
`
      },
      acciones: [
        { escribir: "#email", texto: "tagui.correo.com" },
        { enviar: "#boletin" },
        { escribir: "#email", texto: "tagui@correo.com" },
        { enviar: "#boletin" }
      ],
      pistas: [
        "La condición del if es !email.includes(\"@\") («el email no incluye @»). En ese caso, dos órdenes: el textContent del error y classList.add. En el else, las dos contrarias: textContent vacío y classList.remove.",
        "Dentro del submit escribe:\nevento.preventDefault();\nconst email = campo.value.trim();\nif (!email.includes(\"@\")) {\n  error.textContent = \"El email debe llevar una @.\";\n  campo.classList.add(\"invalido\");\n} else {\n  error.textContent = \"\";\n  campo.classList.remove(\"invalido\");\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Muchos campos: casillas, radios y una bandera",
      texto: "Un formulario de verdad tiene muchos campos, y cada uno necesita **su propio mensaje**. Tres herramientas nuevas:\n\n• **Casillas y radios**: no tienen `value` útil; se mira si están marcados con `.checked`, que vale `true` o `false`. Para un radio, pregunta por el de cada opción: `document.querySelector(\"#primera-si\").checked`.\n• **Solo cifras**: `Number(\"600123456\")` convierte el texto en número; si hay letras o espacios, da `NaN` («no es un número»). `Number.isNaN(…)` te dice si ha pasado eso.\n• **Una bandera**: empieza con `let todoBien = true;`. Cada campo que falle pone `todoBien = false;` y su mensaje. Al final, solo si `todoBien` sigue en `true`, aceptas el formulario. 🚩\n\nPrueba el ejemplo con un teléfono con espacios y sin marcar la casilla.",
      ejemplo: {
        html: `<form id="cita" novalidate>
  <label for="telefono">Teléfono (9 cifras)</label>
  <input id="telefono" type="tel" aria-describedby="error-telefono">
  <p id="error-telefono" class="error" role="alert"></p>

  <p>¿Primera visita?
    <input type="radio" id="primera-si" name="primera"> <label for="primera-si">Sí</label>
    <input type="radio" id="primera-no" name="primera"> <label for="primera-no">No</label>
  </p>

  <input type="checkbox" id="normas">
  <label for="normas">Acepto las normas</label>
  <p id="error-normas" class="error" role="alert"></p>

  <button>Pedir cita</button>
</form>`,
        css: `.error {
  color: #b00020;
  font-weight: bold;
}`,
        js: `const formulario = document.querySelector("#cita");
const errorTelefono = document.querySelector("#error-telefono");
const errorNormas = document.querySelector("#error-normas");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  let todoBien = true;

  const telefono = document.querySelector("#telefono").value.trim();
  if (telefono.length !== 9 || Number.isNaN(Number(telefono))) {
    errorTelefono.textContent = "Escribe 9 cifras, sin espacios.";
    todoBien = false;
  } else {
    errorTelefono.textContent = "";
  }

  if (!document.querySelector("#normas").checked) {
    errorNormas.textContent = "Tienes que aceptar las normas.";
    todoBien = false;
  } else {
    errorNormas.textContent = "";
  }

  if (todoBien) {
    const primera = document.querySelector("#primera-si").checked;
    console.log("¡Cita pedida! ¿Primera visita? " + primera);
  }
});`
      },
      consejo: "Comprueba **todos** los campos aunque el primero ya falle: así la persona ve de una vez todo lo que tiene que corregir, y no un error cada vez que pulsa el botón."
    },
    {
      tipo: "quiz",
      pregunta: "¿Qué hace `evento.preventDefault()` dentro del evento `submit` de un formulario?",
      opciones: [
        "Frena el envío normal, para que la página no se recargue y tu código decida qué hacer",
        "Borra todo lo que se ha escrito en los campos",
        "Comprueba él solo que el email lleva @"
      ],
      correcta: 0,
      explicacion: "Sin preventDefault, el navegador enviaría el formulario y recargaría la página. Con él, frenas ese envío y tu JavaScript toma el control: valida, avisa de los errores o muestra el mensaje de éxito."
    },
    {
      tipo: "reto",
      enunciado: "Haz el registro del **club de exploradores** 🧭. Al **enviar** el formulario `#registro` (frena el envío), lee `#nombre` y `#email` con `trim()` y:\n\n1. Si el nombre está vacío → un mensaje de error en `#error` (por ejemplo, **Escribe tu nombre.**).\n2. Si no, y el email **no** lleva `@` → otro error en `#error` (por ejemplo, **El email debe llevar una @.**).\n3. Si todo está bien → `#error` vacío y, en `#exito`, un mensaje con el nombre: **¡Te damos la bienvenida, Ana!**\n\nOjo: cuando sale un error, borra el éxito, y al revés. ¡Que no se queden mensajes viejos!",
      cssBase: `body { font-family: sans-serif; padding: 16px; background-color: #eef6f0; }
form { display: flex; flex-direction: column; gap: 6px; max-width: 340px; padding: 16px; background-color: white; border-radius: 12px; box-shadow: 0 2px 10px rgb(0 0 0 / 0.1); }
h2 { margin: 0 0 8px; color: #2f6b45; }
label { font-weight: bold; margin-top: 6px; }
input, button { font: inherit; padding: 8px; border-radius: 8px; }
input { border: 2px solid #9cc5a8; }
button { margin-top: 10px; border: none; background-color: #2f6b45; color: white; }
.error { margin: 6px 0 0; color: #b00020; font-weight: bold; }
.exito { font-size: 20px; font-weight: bold; color: #2f6b45; }`,
      inicial: {
        html: `<form id="registro" novalidate>
  <h2>Únete al club de exploradores 🧭</h2>
  <label for="nombre">Nombre</label>
  <input id="nombre" type="text" aria-describedby="error">
  <label for="email">Email</label>
  <input id="email" type="email" aria-describedby="error">
  <p id="error" class="error" role="alert"></p>
  <button>Registrarme</button>
</form>
<p id="exito" class="exito" role="status"></p>
`,
        js: `const formulario = document.querySelector("#registro");
const campoNombre = document.querySelector("#nombre");
const campoEmail = document.querySelector("#email");
const error = document.querySelector("#error");
const exito = document.querySelector("#exito");

// 1. Escucha el evento "submit" del formulario y frena el envío
// 2. Lee el nombre y el email con trim()
// 3. Nombre vacío → error · email sin @ → error · todo bien → éxito
//    (y acuérdate de vaciar el mensaje que no toca)
`
      },
      comprobaciones: [
        {
          texto: "Si envías el formulario con el nombre vacío (o solo con espacios), sale un error en `#error`",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const d = v.doc;
            PRUEBA.escribir(d.querySelector("#nombre"), "   ");
            PRUEBA.escribir(d.querySelector("#email"), "ana@correo.com");
            d.querySelector("#registro")?.requestSubmit();
            const error = (d.querySelector("#error")?.textContent || "").trim();
            const exito = (d.querySelector("#exito")?.textContent || "").trim();
            return error !== "" && exito === "";
          }
        },
        {
          texto: "Si el email no lleva `@`, sale un error en `#error`",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const d = v.doc;
            PRUEBA.escribir(d.querySelector("#nombre"), "Ana");
            PRUEBA.escribir(d.querySelector("#email"), "ana.correo.com");
            d.querySelector("#registro")?.requestSubmit();
            const error = (d.querySelector("#error")?.textContent || "").trim();
            const exito = (d.querySelector("#exito")?.textContent || "").trim();
            return error !== "" && exito === "";
          }
        },
        {
          texto: "Si todo está bien, `#error` queda vacío y `#exito` da la bienvenida con el nombre",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const d = v.doc;
            PRUEBA.escribir(d.querySelector("#nombre"), "  Ana  ");
            PRUEBA.escribir(d.querySelector("#email"), "ana@correo.com");
            d.querySelector("#registro")?.requestSubmit();
            const error = (d.querySelector("#error")?.textContent || "").trim();
            const exito = d.querySelector("#exito")?.textContent || "";
            return error === "" && exito.includes("Ana");
          }
        },
        {
          texto: "No se quedan mensajes viejos: al corregir un error desaparece, y al equivocarte otra vez se borra el éxito",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const d = v.doc;
            const form = d.querySelector("#registro");
            const nombre = d.querySelector("#nombre");
            const email = d.querySelector("#email");
            const texto = sel => (d.querySelector(sel)?.textContent || "").trim();
            if (!form || !nombre || !email) return false;
            PRUEBA.escribir(nombre, "");
            PRUEBA.escribir(email, "leo@correo.com");
            form.requestSubmit();
            if (texto("#error") === "") return false;
            PRUEBA.escribir(nombre, "Leo");
            form.requestSubmit();
            if (texto("#error") !== "" || !texto("#exito").includes("Leo")) return false;
            PRUEBA.escribir(email, "leo.correo.com");
            form.requestSubmit();
            return texto("#error") !== "" && texto("#exito") === "";
          }
        }
      ],
      pistas: [
        "Dentro del submit: preventDefault, dos constantes con los valores ya limpios (trim) y un if / else if / else. En cada rama, escribe los dos mensajes: el que toca, con su texto, y el otro vacío (\"\").",
        "Te debe quedar así:\nformulario.addEventListener(\"submit\", (evento) => {\n  evento.preventDefault();\n  const nombre = campoNombre.value.trim();\n  const email = campoEmail.value.trim();\n  if (nombre === \"\") {\n    error.textContent = \"Escribe tu nombre.\";\n    exito.textContent = \"\";\n  } else if (!email.includes(\"@\")) {\n    error.textContent = \"El email debe llevar una @.\";\n    exito.textContent = \"\";\n  } else {\n    error.textContent = \"\";\n    exito.textContent = \"¡Te damos la bienvenida, \" + nombre + \"!\";\n  }\n});"
      ],
      solucion: {
        html: `<form id="registro" novalidate>
  <h2>Únete al club de exploradores 🧭</h2>
  <label for="nombre">Nombre</label>
  <input id="nombre" type="text" aria-describedby="error">
  <label for="email">Email</label>
  <input id="email" type="email" aria-describedby="error">
  <p id="error" class="error" role="alert"></p>
  <button>Registrarme</button>
</form>
<p id="exito" class="exito" role="status"></p>
`,
        js: `const formulario = document.querySelector("#registro");
const campoNombre = document.querySelector("#nombre");
const campoEmail = document.querySelector("#email");
const error = document.querySelector("#error");
const exito = document.querySelector("#exito");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nombre = campoNombre.value.trim();
  const email = campoEmail.value.trim();

  if (nombre === "") {
    error.textContent = "Escribe tu nombre.";
    exito.textContent = "";
  } else if (!email.includes("@")) {
    error.textContent = "El email debe llevar una @.";
    exito.textContent = "";
  } else {
    error.textContent = "";
    exito.textContent = "¡Te damos la bienvenida, " + nombre + "!";
  }
});
`
      }
    }
  ]
});
