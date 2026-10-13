/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-14 (FINAL DEL CURSO)
   Proyecto final: lista de tareas — sin conceptos nuevos. Junta
   estado en un array de objetos { texto, hecha }, una función
   pintar(), eventos (submit y click), ! para «dar la vuelta» a un
   booleano y localStorage con JSON.
   Construcción por etapas:
   - Ejercicio 1: pintar() (sin eventos).
   - Ejercicio 2: añadir con el formulario (inicial = etapa 1).
   - Ejercicio 3: marcar y borrar (inicial = etapa 2).
   - Reto: la app entera desde un esqueleto + guardar y cargar.
   Notas:
   - Cada tarea se pinta como
       <li class="hecha"> <button class="texto">…</button>
                          <button class="borrar">Borrar</button> </li>
     El texto es un <button> para que marcar funcione también con
     el teclado (accesible) sin enseñar nada nuevo.
   - Borrar se hace con for…of + push en un array nuevo (filter y
     splice no se han enseñado; el consejo menciona filter).
   - Las acciones del ejercicio 3 terminan añadiendo una tarea: así
     se re-pinta todo desde el array y suspende quien solo cambió
     la página (classList / remove) sin cambiar el estado.
   - El reto: cada comprobación empieza con
     PRUEBA.recargar(doc, { borrarDatos: true }); la última recarga
     esa copia (PRUEBA.recargar(v.doc)) para ver que se recuerda:
     marca → recarga → borra → recarga, para que un guardar()
     olvidado al marcar no quede tapado por el de borrar.
   - El JS de ejemplos y soluciones no usa plantillas de texto.
   ============================================================ */
CURSO.registrar({
  id: "js-14",
  titulo: "Proyecto final: lista de tareas",
  xp: 60,
  objetivo: "Construirás una aplicación completa de lista de tareas que añade, marca, borra y recuerda, juntando todo lo que has aprendido en el curso.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "El plan: el array manda",
      texto: "¡Último proyecto! 🏁 Una lista de tareas como las de verdad. El secreto de las aplicaciones bien hechas es una regla de oro:\n\n**Los datos mandan y la página obedece.**\n\n• Las tareas viven en un **array de objetos**: `{ texto: \"Regar las plantas\", hecha: false }`. Es el **estado** de la app.\n• Una función `pintar()` **vacía** la lista y la vuelve a crear entera a partir del array.\n• Cada vez que pase algo (añadir, marcar, borrar), cambias **el array** y llamas a `pintar()`.\n\nEn el ejemplo, una lista de la compra. Para vaciar la lista basta con `lista.textContent = \"\"`.",
      ejemplo: {
        html: `<ul id="compra"></ul>`,
        css: `.comprado {
  text-decoration: line-through;
  color: gray;
}`,
        js: `const lista = document.querySelector("#compra");

let compras = [
  { texto: "Pan", comprado: true },
  { texto: "Leche", comprado: false },
  { texto: "Plátanos", comprado: false }
];

function pintar() {
  lista.textContent = "";            // 1. Vacía la lista
  for (const cosa of compras) {      // 2. Un <li> por cada cosa
    const li = document.createElement("li");
    li.textContent = cosa.texto;
    if (cosa.comprado) {
      li.classList.add("comprado");
    }
    lista.append(li);
  }
}

pintar();`
      },
      consejo: "¿Por qué vaciar y repintar todo? Porque así la página **siempre** coincide con el array. Nada de cambios sueltos que luego no cuadran. 🧩"
    },
    {
      tipo: "ejercicio",
      enunciado: "**Etapa 1: pintar.** El HTML y el CSS ya están hechos, y el JS trae el array `tareas`. Escribe la función `pintar()` y llámala al final. Debe:\n\n• Vaciar `#lista` (`lista.textContent = \"\"`).\n• Por cada tarea, crear un `<li>` con la clase `hecha` **solo si** la tarea está hecha.\n• Dentro del `<li>`, primero un `<button>` con la clase `texto` y el texto de la tarea, y después otro `<button>` con la clase `borrar` y el texto **Borrar**.",
      cssBase: `body { font-family: sans-serif; margin: 0; padding: 16px; background-color: #f3f0ff; }
.app { max-width: 420px; margin: 0 auto; padding: 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 16px rgb(0 0 0 / 0.1); }
h1 { margin-top: 0; color: #5b3cc4; }
form { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
label { width: 100%; font-weight: bold; }
input { flex: 1; padding: 8px; font: inherit; border: 2px solid #c9bdf5; border-radius: 8px; }
form button { padding: 8px 16px; font: inherit; border: none; border-radius: 8px; background-color: #5b3cc4; color: white; }
#lista { list-style: none; margin: 0; padding: 0; }
#lista li { display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid #eee; }
.texto { flex: 1; padding: 6px; font: inherit; text-align: left; background: none; border: none; border-radius: 6px; cursor: pointer; }
.texto::before { content: "⬜ "; }
.hecha .texto { text-decoration: line-through; color: #999; }
.hecha .texto::before { content: "✅ "; }
.borrar { padding: 4px 10px; font: inherit; font-size: 14px; border: none; border-radius: 6px; background-color: #ffe3e3; color: #c92a2a; cursor: pointer; }`,
      inicial: {
        html: `<main class="app">
  <h1>📝 Mis tareas</h1>
  <form id="formulario" novalidate>
    <label for="nueva">Nueva tarea</label>
    <input id="nueva" type="text" placeholder="Ej.: Regar las plantas">
    <button>Añadir</button>
  </form>
  <ul id="lista"></ul>
</main>
`,
        js: `const lista = document.querySelector("#lista");

let tareas = [
  { texto: "Regar las plantas", hecha: false },
  { texto: "Pasear al perro", hecha: true },
  { texto: "Leer un cuento", hecha: false }
];

// Etapa 1: escribe aquí la función pintar() y llámala
`
      },
      solucion: {
        html: `<main class="app">
  <h1>📝 Mis tareas</h1>
  <form id="formulario" novalidate>
    <label for="nueva">Nueva tarea</label>
    <input id="nueva" type="text" placeholder="Ej.: Regar las plantas">
    <button>Añadir</button>
  </form>
  <ul id="lista"></ul>
</main>
`,
        js: `const lista = document.querySelector("#lista");

let tareas = [
  { texto: "Regar las plantas", hecha: false },
  { texto: "Pasear al perro", hecha: true },
  { texto: "Leer un cuento", hecha: false }
];

function pintar() {
  lista.textContent = "";
  for (const tarea of tareas) {
    const li = document.createElement("li");
    if (tarea.hecha) {
      li.classList.add("hecha");
    }

    const texto = document.createElement("button");
    texto.classList.add("texto");
    texto.textContent = tarea.texto;
    li.append(texto);

    const borrar = document.createElement("button");
    borrar.classList.add("borrar");
    borrar.textContent = "Borrar";
    li.append(borrar);

    lista.append(li);
  }
}

pintar();
`
      },
      pistas: [
        "Sigue el ejemplo de la compra: vacía la lista, recorre tareas con for…of y crea el <li>. La diferencia es que dentro del <li> no va el texto directamente, sino dos botones creados con createElement(\"button\"), cada uno con su classList.add y su textContent.",
        "Debe quedarte así:\nfunction pintar() {\n  lista.textContent = \"\";\n  for (const tarea of tareas) {\n    const li = document.createElement(\"li\");\n    if (tarea.hecha) {\n      li.classList.add(\"hecha\");\n    }\n    const texto = document.createElement(\"button\");\n    texto.classList.add(\"texto\");\n    texto.textContent = tarea.texto;\n    li.append(texto);\n    const borrar = document.createElement(\"button\");\n    borrar.classList.add(\"borrar\");\n    borrar.textContent = \"Borrar\";\n    li.append(borrar);\n    lista.append(li);\n  }\n}\n\npintar();"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Añadir tareas",
      texto: "Para añadir, usas lo que aprendiste validando formularios. En el `submit`:\n\n1. Frena el envío con `evento.preventDefault()`.\n2. Lee el campo con `trim()`. Si queda vacío, sal con `return`: no se añaden tareas vacías.\n3. **Cambia el array**: `tareas.push({ texto: texto, hecha: false })`.\n4. Vacía el campo (`campo.value = \"\"`) para escribir la siguiente.\n5. Llama a `pintar()`.\n\nFíjate: nunca creas el `<li>` nuevo a mano. Cambias el array y `pintar()` se encarga del resto. Prueba a añadir cosas a la compra.",
      ejemplo: {
        html: `<form id="formulario" novalidate>
  <input id="nueva" type="text" aria-label="Cosa que comprar">
  <button>Añadir</button>
</form>
<ul id="compra"></ul>`,
        css: `.comprado {
  text-decoration: line-through;
  color: gray;
}`,
        js: `const lista = document.querySelector("#compra");
const formulario = document.querySelector("#formulario");
const campo = document.querySelector("#nueva");

let compras = [{ texto: "Pan", comprado: true }];

function pintar() {
  lista.textContent = "";
  for (const cosa of compras) {
    const li = document.createElement("li");
    li.textContent = cosa.texto;
    if (cosa.comprado) {
      li.classList.add("comprado");
    }
    lista.append(li);
  }
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const texto = campo.value.trim();
  if (texto === "") {
    return;
  }
  compras.push({ texto: texto, comprado: false });
  campo.value = "";
  pintar();
});

pintar();`
      }
    },
    {
      tipo: "ejercicio",
      enunciado: "**Etapa 2: añadir.** El JS ya trae tu `pintar()` de la etapa 1. Escucha el `submit` de `#formulario` y:\n\n• Frena el envío con `preventDefault`.\n• Lee `#nueva` con `trim()`. Si queda vacío, termina con `return` (no se añade nada).\n• Si no, añade al array `{ texto: …, hecha: false }` con `push`, vacía el campo (`campo.value = \"\"`) y llama a `pintar()`.",
      cssBase: `body { font-family: sans-serif; margin: 0; padding: 16px; background-color: #f3f0ff; }
.app { max-width: 420px; margin: 0 auto; padding: 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 16px rgb(0 0 0 / 0.1); }
h1 { margin-top: 0; color: #5b3cc4; }
form { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
label { width: 100%; font-weight: bold; }
input { flex: 1; padding: 8px; font: inherit; border: 2px solid #c9bdf5; border-radius: 8px; }
form button { padding: 8px 16px; font: inherit; border: none; border-radius: 8px; background-color: #5b3cc4; color: white; }
#lista { list-style: none; margin: 0; padding: 0; }
#lista li { display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid #eee; }
.texto { flex: 1; padding: 6px; font: inherit; text-align: left; background: none; border: none; border-radius: 6px; cursor: pointer; }
.texto::before { content: "⬜ "; }
.hecha .texto { text-decoration: line-through; color: #999; }
.hecha .texto::before { content: "✅ "; }
.borrar { padding: 4px 10px; font: inherit; font-size: 14px; border: none; border-radius: 6px; background-color: #ffe3e3; color: #c92a2a; cursor: pointer; }`,
      inicial: {
        html: `<main class="app">
  <h1>📝 Mis tareas</h1>
  <form id="formulario" novalidate>
    <label for="nueva">Nueva tarea</label>
    <input id="nueva" type="text" placeholder="Ej.: Regar las plantas">
    <button>Añadir</button>
  </form>
  <ul id="lista"></ul>
</main>
`,
        js: `const lista = document.querySelector("#lista");
const formulario = document.querySelector("#formulario");
const campo = document.querySelector("#nueva");

let tareas = [
  { texto: "Regar las plantas", hecha: false },
  { texto: "Pasear al perro", hecha: true },
  { texto: "Leer un cuento", hecha: false }
];

function pintar() {
  lista.textContent = "";
  for (const tarea of tareas) {
    const li = document.createElement("li");
    if (tarea.hecha) {
      li.classList.add("hecha");
    }

    const texto = document.createElement("button");
    texto.classList.add("texto");
    texto.textContent = tarea.texto;
    li.append(texto);

    const borrar = document.createElement("button");
    borrar.classList.add("borrar");
    borrar.textContent = "Borrar";
    li.append(borrar);

    lista.append(li);
  }
}

// Etapa 2: escucha aquí el submit del formulario

pintar();
`
      },
      solucion: {
        html: `<main class="app">
  <h1>📝 Mis tareas</h1>
  <form id="formulario" novalidate>
    <label for="nueva">Nueva tarea</label>
    <input id="nueva" type="text" placeholder="Ej.: Regar las plantas">
    <button>Añadir</button>
  </form>
  <ul id="lista"></ul>
</main>
`,
        js: `const lista = document.querySelector("#lista");
const formulario = document.querySelector("#formulario");
const campo = document.querySelector("#nueva");

let tareas = [
  { texto: "Regar las plantas", hecha: false },
  { texto: "Pasear al perro", hecha: true },
  { texto: "Leer un cuento", hecha: false }
];

function pintar() {
  lista.textContent = "";
  for (const tarea of tareas) {
    const li = document.createElement("li");
    if (tarea.hecha) {
      li.classList.add("hecha");
    }

    const texto = document.createElement("button");
    texto.classList.add("texto");
    texto.textContent = tarea.texto;
    li.append(texto);

    const borrar = document.createElement("button");
    borrar.classList.add("borrar");
    borrar.textContent = "Borrar";
    li.append(borrar);

    lista.append(li);
  }
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const texto = campo.value.trim();
  if (texto === "") {
    return;
  }
  tareas.push({ texto: texto, hecha: false });
  campo.value = "";
  pintar();
});

pintar();
`
      },
      acciones: [
        { escribir: "#nueva", texto: "Hacer los deberes" },
        { enviar: "#formulario" },
        { escribir: "#nueva", texto: "" },
        { enviar: "#formulario" },
        { escribir: "#nueva", texto: "Ordenar el cuarto" },
        { enviar: "#formulario" }
      ],
      pistas: [
        "Es como el ejemplo de la compra: formulario.addEventListener(\"submit\", (evento) => { … }). Dentro: preventDefault, const texto = campo.value.trim(), un if que haga return si texto === \"\", y después push, vaciar el campo y pintar().",
        "Debe quedarte así:\nformulario.addEventListener(\"submit\", (evento) => {\n  evento.preventDefault();\n  const texto = campo.value.trim();\n  if (texto === \"\") {\n    return;\n  }\n  tareas.push({ texto: texto, hecha: false });\n  campo.value = \"\";\n  pintar();\n});"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Marcar y borrar",
      texto: "Los botones de cada tarea se crean **dentro** de `pintar()`, así que sus `addEventListener` también van ahí. Lo bonito: cada botón **recuerda su tarea** (la `tarea` de esa vuelta del `for…of`).\n\n• **Marcar**: `tarea.hecha = !tarea.hecha;` da la vuelta al booleano (`true` ↔ `false`). Luego, `pintar()`.\n• **Borrar**: crea un array nuevo con todas **menos** esa: recorre `tareas` y haz `push` de las que sean `!==` a `tarea`. Guárdalo en `tareas` y llama a `pintar()`.\n\nEn el ejemplo, pulsa una cosa para tacharla y ✕ para quitarla.",
      ejemplo: {
        html: `<ul id="compra"></ul>`,
        css: `.comprado {
  text-decoration: line-through;
  color: gray;
}`,
        js: `const lista = document.querySelector("#compra");

let compras = [
  { texto: "Pan", comprado: true },
  { texto: "Leche", comprado: false },
  { texto: "Plátanos", comprado: false }
];

function pintar() {
  lista.textContent = "";
  for (const cosa of compras) {
    const li = document.createElement("li");
    if (cosa.comprado) {
      li.classList.add("comprado");
    }

    const nombre = document.createElement("button");
    nombre.textContent = cosa.texto;
    nombre.addEventListener("click", () => {
      cosa.comprado = !cosa.comprado;
      pintar();
    });

    const quitar = document.createElement("button");
    quitar.textContent = "✕ quitar";
    quitar.addEventListener("click", () => {
      const quedan = [];
      for (const otra of compras) {
        if (otra !== cosa) {
          quedan.push(otra);
        }
      }
      compras = quedan;
      pintar();
    });

    li.append(nombre);
    li.append(quitar);
    lista.append(li);
  }
}

pintar();`
      },
      consejo: "Para borrar, el array tiene que ser `let` (vas a guardar en él uno nuevo). Cuando tengas más soltura descubrirás `filter`, un atajo que hace eso mismo en una línea. 😉"
    },
    {
      tipo: "ejercicio",
      enunciado: "**Etapa 3: marcar y borrar.** Dentro de `pintar()`, donde lo indican los comentarios:\n\n• Al pulsar el botón `.texto` de una tarea: `tarea.hecha = !tarea.hecha;` y `pintar()`.\n• Al pulsar su botón `.borrar`: crea un array nuevo con todas las tareas **menos** esa (`for…of` + `push` de las que sean `!==`), guárdalo en `tareas` y llama a `pintar()`.\n\nCambia siempre **el array** y repinta: no cambies las clases ni quites el `<li>` a mano.",
      cssBase: `body { font-family: sans-serif; margin: 0; padding: 16px; background-color: #f3f0ff; }
.app { max-width: 420px; margin: 0 auto; padding: 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 16px rgb(0 0 0 / 0.1); }
h1 { margin-top: 0; color: #5b3cc4; }
form { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
label { width: 100%; font-weight: bold; }
input { flex: 1; padding: 8px; font: inherit; border: 2px solid #c9bdf5; border-radius: 8px; }
form button { padding: 8px 16px; font: inherit; border: none; border-radius: 8px; background-color: #5b3cc4; color: white; }
#lista { list-style: none; margin: 0; padding: 0; }
#lista li { display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid #eee; }
.texto { flex: 1; padding: 6px; font: inherit; text-align: left; background: none; border: none; border-radius: 6px; cursor: pointer; }
.texto::before { content: "⬜ "; }
.hecha .texto { text-decoration: line-through; color: #999; }
.hecha .texto::before { content: "✅ "; }
.borrar { padding: 4px 10px; font: inherit; font-size: 14px; border: none; border-radius: 6px; background-color: #ffe3e3; color: #c92a2a; cursor: pointer; }`,
      inicial: {
        html: `<main class="app">
  <h1>📝 Mis tareas</h1>
  <form id="formulario" novalidate>
    <label for="nueva">Nueva tarea</label>
    <input id="nueva" type="text" placeholder="Ej.: Regar las plantas">
    <button>Añadir</button>
  </form>
  <ul id="lista"></ul>
</main>
`,
        js: `const lista = document.querySelector("#lista");
const formulario = document.querySelector("#formulario");
const campo = document.querySelector("#nueva");

let tareas = [
  { texto: "Regar las plantas", hecha: false },
  { texto: "Pasear al perro", hecha: true },
  { texto: "Leer un cuento", hecha: false }
];

function pintar() {
  lista.textContent = "";
  for (const tarea of tareas) {
    const li = document.createElement("li");
    if (tarea.hecha) {
      li.classList.add("hecha");
    }

    const texto = document.createElement("button");
    texto.classList.add("texto");
    texto.textContent = tarea.texto;
    // Etapa 3: al pulsar texto, da la vuelta a tarea.hecha y repinta

    li.append(texto);

    const borrar = document.createElement("button");
    borrar.classList.add("borrar");
    borrar.textContent = "Borrar";
    // Etapa 3: al pulsar borrar, quita esta tarea del array y repinta

    li.append(borrar);

    lista.append(li);
  }
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const texto = campo.value.trim();
  if (texto === "") {
    return;
  }
  tareas.push({ texto: texto, hecha: false });
  campo.value = "";
  pintar();
});

pintar();
`
      },
      solucion: {
        html: `<main class="app">
  <h1>📝 Mis tareas</h1>
  <form id="formulario" novalidate>
    <label for="nueva">Nueva tarea</label>
    <input id="nueva" type="text" placeholder="Ej.: Regar las plantas">
    <button>Añadir</button>
  </form>
  <ul id="lista"></ul>
</main>
`,
        js: `const lista = document.querySelector("#lista");
const formulario = document.querySelector("#formulario");
const campo = document.querySelector("#nueva");

let tareas = [
  { texto: "Regar las plantas", hecha: false },
  { texto: "Pasear al perro", hecha: true },
  { texto: "Leer un cuento", hecha: false }
];

function pintar() {
  lista.textContent = "";
  for (const tarea of tareas) {
    const li = document.createElement("li");
    if (tarea.hecha) {
      li.classList.add("hecha");
    }

    const texto = document.createElement("button");
    texto.classList.add("texto");
    texto.textContent = tarea.texto;
    texto.addEventListener("click", () => {
      tarea.hecha = !tarea.hecha;
      pintar();
    });
    li.append(texto);

    const borrar = document.createElement("button");
    borrar.classList.add("borrar");
    borrar.textContent = "Borrar";
    borrar.addEventListener("click", () => {
      const quedan = [];
      for (const otra of tareas) {
        if (otra !== tarea) {
          quedan.push(otra);
        }
      }
      tareas = quedan;
      pintar();
    });
    li.append(borrar);

    lista.append(li);
  }
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const texto = campo.value.trim();
  if (texto === "") {
    return;
  }
  tareas.push({ texto: texto, hecha: false });
  campo.value = "";
  pintar();
});

pintar();
`
      },
      acciones: [
        { clic: "#lista li:nth-child(1) .texto" },
        { clic: "#lista li:nth-child(2) .texto" },
        { clic: "#lista li:nth-child(3) .borrar" },
        { escribir: "#nueva", texto: "Hacer la cama" },
        { enviar: "#formulario" }
      ],
      pistas: [
        "Debajo de texto.textContent = …; escribe texto.addEventListener(\"click\", () => { … }) con las dos órdenes. Debajo de borrar.textContent = …; escribe borrar.addEventListener(\"click\", () => { … }) con el array nuevo, el for…of, el if con !== y el push.",
        "Las dos piezas son:\ntexto.addEventListener(\"click\", () => {\n  tarea.hecha = !tarea.hecha;\n  pintar();\n});\n\nborrar.addEventListener(\"click\", () => {\n  const quedan = [];\n  for (const otra of tareas) {\n    if (otra !== tarea) {\n      quedan.push(otra);\n    }\n  }\n  tareas = quedan;\n  pintar();\n});"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Que no se olvide: guardar y cargar",
      texto: "Tu lista funciona… hasta que recargas. 😅 Arréglalo con lo que sabes de localStorage:\n\n• Una función `guardar()` que haga `localStorage.setItem(\"tareas\", JSON.stringify(tareas))`.\n• Llámala **cada vez que cambie el array**: al añadir, al marcar y al borrar (justo antes de `pintar()`).\n• **Al empezar**, lee `\"tareas\"`: si no es `null`, conviértelo con `JSON.parse` y guárdalo en `tareas`. Después, `pintar()`.\n\nEl ejemplo añade una tarea cada vez que se ejecuta. Pulsa **🔄 Recargar** varias veces y mira la consola: ¡no se olvida de ninguna!",
      ejemplo: {
        js: `let tareas = [];

const guardadas = localStorage.getItem("tareas");
if (guardadas !== null) {
  tareas = JSON.parse(guardadas);
}
console.log("Al empezar hay " + tareas.length + " tareas guardadas");

tareas.push({ texto: "Tarea número " + (tareas.length + 1), hecha: false });
localStorage.setItem("tareas", JSON.stringify(tareas));
console.log(tareas);`
      },
      consejo: "El orden importa: primero **cargar** las tareas guardadas y después `pintar()`. Si pintas antes de cargar, verás la lista vacía. 🕵️"
    },
    {
      tipo: "explicacion",
      titulo: "Mira hasta dónde has llegado",
      texto: "Para un momento y mira atrás. 🌄\n\nEmpezaste sin saber qué era una etiqueta. Aprendiste a **construir** páginas con HTML, a **vestirlas** con CSS, a hacerlas **responsive**, accesibles y con animaciones… y ahora les das **cerebro** con JavaScript: eventos, datos, formularios, memoria y peticiones a un servidor.\n\nEl reto que viene junta todo eso en una aplicación de verdad, de las que la gente usa cada día. No tienes que acordarte de memoria: los ejercicios de esta lección son tu chuleta. Ve paso a paso, prueba a menudo y usa **🔄 Recargar**.\n\n¡A por el jefe final! 💪",
      consejo: "Cuando empezamos, yo era solo una etiqueta con ojos. Ahora soy una etiqueta con ojos **muy orgullosa** de ti. Programar no va de saberlo todo, sino de no rendirse. ¡Y tú no te has rendido! 🥹"
    },
    {
      tipo: "quiz",
      pregunta: "En tu lista de tareas, ¿qué haces cada vez que cambias el array `tareas` (al añadir, marcar o borrar)?",
      opciones: [
        "Llamo a guardar() y a pintar()",
        "Nada: la página se actualiza sola al cambiar el array",
        "Cambio el <li> a mano y me olvido del array"
      ],
      correcta: 0,
      explicacion: "El array es el que manda: guardar() lo copia en localStorage para que se recuerde y pintar() hace que la página coincida con él. Si cambias solo la página, el array y la pantalla dejan de cuadrar."
    },
    {
      tipo: "reto",
      enunciado: "🏆 **¡Jefe final de TODO el curso!** Construye tu lista de tareas completa. El HTML y el CSS ya están hechos; el JS trae un esqueleto:\n\n1. `pintar()`: un `<li>` por tarea (con la clase `hecha` si lo está), con un `<button class=\"texto\">` y un `<button class=\"borrar\">`.\n2. **Añadir** con el formulario (sin tareas vacías).\n3. **Marcar/desmarcar** al pulsar el texto y **borrar** con su botón.\n4. **Guardar** en localStorage (clave `tareas`) tras cada cambio y **cargar** al empezar.\n\nCuando las cuatro marcas estén en verde… habrás terminado el curso. 🎓",
      cssBase: `body { font-family: sans-serif; margin: 0; padding: 16px; background-color: #f3f0ff; }
.app { max-width: 420px; margin: 0 auto; padding: 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 16px rgb(0 0 0 / 0.1); }
h1 { margin-top: 0; color: #5b3cc4; }
form { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
label { width: 100%; font-weight: bold; }
input { flex: 1; padding: 8px; font: inherit; border: 2px solid #c9bdf5; border-radius: 8px; }
form button { padding: 8px 16px; font: inherit; border: none; border-radius: 8px; background-color: #5b3cc4; color: white; }
#lista { list-style: none; margin: 0; padding: 0; }
#lista li { display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid #eee; }
.texto { flex: 1; padding: 6px; font: inherit; text-align: left; background: none; border: none; border-radius: 6px; cursor: pointer; }
.texto::before { content: "⬜ "; }
.hecha .texto { text-decoration: line-through; color: #999; }
.hecha .texto::before { content: "✅ "; }
.borrar { padding: 4px 10px; font: inherit; font-size: 14px; border: none; border-radius: 6px; background-color: #ffe3e3; color: #c92a2a; cursor: pointer; }`,
      inicial: {
        html: `<main class="app">
  <h1>📝 Mis tareas</h1>
  <form id="formulario" novalidate>
    <label for="nueva">Nueva tarea</label>
    <input id="nueva" type="text" placeholder="Ej.: Regar las plantas">
    <button>Añadir</button>
  </form>
  <ul id="lista"></ul>
</main>
`,
        js: `const lista = document.querySelector("#lista");
const formulario = document.querySelector("#formulario");
const campo = document.querySelector("#nueva");

// El estado de la app: un array de objetos { texto, hecha }
let tareas = [];

// 1. guardar(): guarda el array en localStorage con la clave "tareas" (JSON.stringify)
function guardar() {

}

// 2. pintar(): vacía la lista y crea un <li> por tarea, con sus dos botones.
//    Al pulsar .texto: da la vuelta a tarea.hecha, guardar() y pintar()
//    Al pulsar .borrar: quita la tarea del array, guardar() y pintar()
function pintar() {

}

// 3. Al enviar el formulario: añade la tarea (si no está vacía), guardar() y pintar()

// 4. Al empezar: lee "tareas" de localStorage; si no es null, JSON.parse. Después, pintar()
`
      },
      comprobaciones: [
        {
          texto: "Puedes añadir tareas con el formulario, y las vacías no se añaden",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc, { borrarDatos: true });
            const d = v.doc;
            const campo = d.querySelector("#nueva");
            const form = d.querySelector("#formulario");
            if (!campo || !form) return false;
            PRUEBA.escribir(campo, "Comprar pan");
            form.requestSubmit();
            PRUEBA.escribir(campo, "   ");
            form.requestSubmit();
            const lis = d.querySelectorAll("#lista li");
            return lis.length === 1 && lis[0].textContent.includes("Comprar pan");
          }
        },
        {
          texto: "Al pulsar el texto de una tarea se marca como hecha (clase `hecha` en su `<li>`) y, al pulsarlo otra vez, se desmarca",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc, { borrarDatos: true });
            const d = v.doc;
            const form = d.querySelector("#formulario");
            if (!form) return false;
            PRUEBA.escribir(d.querySelector("#nueva"), "Leer un cuento");
            form.requestSubmit();
            d.querySelector("#lista li .texto")?.click();
            const marcada = d.querySelector("#lista li")?.classList.contains("hecha") === true;
            d.querySelector("#lista li .texto")?.click();
            const li = d.querySelector("#lista li");
            return marcada && !!li && !li.classList.contains("hecha") && d.querySelectorAll("#lista li").length === 1;
          }
        },
        {
          texto: "Al pulsar «Borrar», esa tarea desaparece y las demás se quedan",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc, { borrarDatos: true });
            const d = v.doc;
            const campo = d.querySelector("#nueva");
            const form = d.querySelector("#formulario");
            if (!campo || !form) return false;
            PRUEBA.escribir(campo, "Tarea A");
            form.requestSubmit();
            PRUEBA.escribir(campo, "Tarea B");
            form.requestSubmit();
            d.querySelector("#lista li .borrar")?.click();
            const lis = d.querySelectorAll("#lista li");
            return lis.length === 1 && lis[0].textContent.includes("Tarea B");
          }
        },
        {
          texto: "Al recargar la página, tus tareas siguen ahí: con las hechas marcadas y sin las borradas",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc, { borrarDatos: true });
            const d = v.doc;
            const campo = d.querySelector("#nueva");
            const form = d.querySelector("#formulario");
            if (!campo || !form) return false;
            for (const t of ["Leer un cuento", "Lavarme los dientes", "Hacer la cama"]) {
              PRUEBA.escribir(campo, t);
              form.requestSubmit();
            }
            // Marcar y recargar: ¿se recuerda la tarea hecha?
            d.querySelector("#lista li:nth-child(2) .texto")?.click();
            const v2 = await PRUEBA.recargar(d);
            const lis2 = v2.doc.querySelectorAll("#lista li");
            if (lis2.length !== 3 || !lis2[1].classList.contains("hecha")) return false;
            // Borrar y recargar: ¿se recuerda que ya no está?
            v2.doc.querySelector("#lista li:nth-child(3) .borrar")?.click();
            const v3 = await PRUEBA.recargar(v2.doc);
            const lis = v3.doc.querySelectorAll("#lista li");
            return lis.length === 2 &&
              lis[0].textContent.includes("Leer un cuento") && !lis[0].classList.contains("hecha") &&
              lis[1].textContent.includes("Lavarme los dientes") && lis[1].classList.contains("hecha");
          }
        }
      ],
      pistas: [
        "Vuelve a los ejercicios de esta lección: pintar() es el de la etapa 3 y el submit, el de la etapa 2. Lo nuevo: guardar() con setItem y JSON.stringify, llamarla antes de cada pintar() que va tras un cambio, y al final del código leer \"tareas\" con getItem y, si no es null, hacer tareas = JSON.parse(…) antes del pintar() inicial.",
        "Las piezas nuevas son:\nfunction guardar() {\n  localStorage.setItem(\"tareas\", JSON.stringify(tareas));\n}\n\n// en los dos clics y en el submit, justo antes de pintar():\nguardar();\n\n// al final del código:\nconst guardadas = localStorage.getItem(\"tareas\");\nif (guardadas !== null) {\n  tareas = JSON.parse(guardadas);\n}\npintar();\n\nEl resto (pintar con sus dos botones y el submit) es igual que en los ejercicios 2 y 3."
      ],
      solucion: {
        html: `<main class="app">
  <h1>📝 Mis tareas</h1>
  <form id="formulario" novalidate>
    <label for="nueva">Nueva tarea</label>
    <input id="nueva" type="text" placeholder="Ej.: Regar las plantas">
    <button>Añadir</button>
  </form>
  <ul id="lista"></ul>
</main>
`,
        js: `const lista = document.querySelector("#lista");
const formulario = document.querySelector("#formulario");
const campo = document.querySelector("#nueva");

// El estado de la app: un array de objetos { texto, hecha }
let tareas = [];

// 1. guardar(): guarda el array en localStorage
function guardar() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// 2. pintar(): la página obedece al array
function pintar() {
  lista.textContent = "";
  for (const tarea of tareas) {
    const li = document.createElement("li");
    if (tarea.hecha) {
      li.classList.add("hecha");
    }

    const texto = document.createElement("button");
    texto.classList.add("texto");
    texto.textContent = tarea.texto;
    texto.addEventListener("click", () => {
      tarea.hecha = !tarea.hecha;
      guardar();
      pintar();
    });
    li.append(texto);

    const borrar = document.createElement("button");
    borrar.classList.add("borrar");
    borrar.textContent = "Borrar";
    borrar.addEventListener("click", () => {
      const quedan = [];
      for (const otra of tareas) {
        if (otra !== tarea) {
          quedan.push(otra);
        }
      }
      tareas = quedan;
      guardar();
      pintar();
    });
    li.append(borrar);

    lista.append(li);
  }
}

// 3. Añadir una tarea nueva
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const texto = campo.value.trim();
  if (texto === "") {
    return;
  }
  tareas.push({ texto: texto, hecha: false });
  campo.value = "";
  guardar();
  pintar();
});

// 4. Al empezar: cargar lo guardado y pintar
const guardadas = localStorage.getItem("tareas");
if (guardadas !== null) {
  tareas = JSON.parse(guardadas);
}
pintar();
`
      }
    }
  ]
});
