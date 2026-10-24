/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-12
   Guardar datos: localStorage — setItem, getItem (null si no hay
   nada), removeItem, que solo guarda texto, y JSON con
   JSON.stringify() / JSON.parse() para objetos y arrays.
   Notas:
   - El resultado tiene un localStorage «de práctica» (js/editor.js):
     sobrevive a 🔄 Recargar y a los cambios del código. Se explica
     en una frase y se invita a usar 🔄 Recargar para comprobarlo.
   - En las revisiones de ejercicios el localStorage empieza vacío y
     solo se comparan página y consola: por eso las soluciones
     muestran lo leído (en la página o en la consola).
   - El ejercicio de JSON distingue quien olvida JSON.parse: sin él,
     .length cuenta letras y for…of recorre letras, no cosas.
   - El reto empieza cada comprobación con
     PRUEBA.recargar(doc, { borrarDatos: true }) (si no, la copia
     compartiría el almacén con la página del reto) y después usa
     PRUEBA.recargar(v.doc) para ver si «se acuerda».
   - El JS de ejemplos y soluciones no usa plantillas de texto.
   ============================================================ */
CURSO.registrar({
  id: "js-12",
  titulo: "Guardar datos: localStorage",
  xp: 45,
  objetivo: "Sabrás guardar datos en el navegador con localStorage para que tu página los recuerde aunque se recargue.",
  glosario: [
    { termino: "localStorage.setItem / getItem", tema: "Guardar datos", para: "Guarda y lee un texto en el navegador: sigue ahí al recargar.", ejemplo: "localStorage.setItem(\"huellas-citas\", texto);\nconst guardado = localStorage.getItem(\"huellas-citas\");", buscar: "guardar recordar navegador recargar" },
    { termino: "JSON.stringify / JSON.parse", tema: "Guardar datos", para: "Convierte un array u objeto en texto para guardarlo, y al revés.", ejemplo: "localStorage.setItem(\"huellas-citas\", JSON.stringify(citas));\nlet citas = JSON.parse(localStorage.getItem(\"huellas-citas\")) || [];", buscar: "json texto convertir guardar array" },
    { termino: "removeItem()", tema: "Guardar datos", para: "Borra lo guardado con ese nombre.", ejemplo: "localStorage.removeItem(\"huellas-citas\");", buscar: "borrar olvidar" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Una memoria que no se borra",
      texto: "Cuando recargas una página, sus variables se borran como una pizarra. 🧽 Para recordar algo, el navegador tiene un **cajón con etiquetas**: `localStorage` (almacén local).\n\n• `localStorage.setItem(\"clave\", \"valor\")` guarda un valor con su etiqueta (la **clave**).\n• `localStorage.getItem(\"clave\")` lo lee.\n\nLo guardado se queda en ese navegador aunque cierres la pestaña. Solo guarda **textos**.\n\nEn este curso, el resultado tiene su propio localStorage **de práctica**: funciona igual que el de verdad y sobrevive al botón **🔄 Recargar**. La consola te avisa con «💾 1 dato guardado» y un botón para borrarlo.\n\nMira la consola y pulsa **🔄 Recargar**: ¡la segunda vez ya lo recuerda!",
      ejemplo: {
        js: `const antes = localStorage.getItem("mascota");
console.log("Lo que había guardado: " + antes);

localStorage.setItem("mascota", "Bigotes");
console.log("Ahora he guardado: " + localStorage.getItem("mascota"));`
      },
      consejo: "La primera vez sale `null`: en JavaScript significa «nada, vacío». ¡Todavía no había nada en el cajón con la etiqueta \"mascota\"!"
    },
    {
      tipo: "explicacion",
      titulo: "¿Hay algo guardado? null y removeItem",
      texto: "Si pides una clave que no existe, `getItem` devuelve `null`. Así sabes si es la **primera visita**:\n\n`if (guardado === null) { … } else { … }`\n\nPara **borrar** una clave del cajón: `localStorage.removeItem(\"clave\")`.\n\nEn el ejemplo, una función `mostrar()` lee el cajón y escribe el saludo. Se llama al empezar y después de cada botón. Prueba: pulsa **Recordar**, luego **🔄 Recargar**… y después **Olvidar** y otra vez **🔄 Recargar**.",
      ejemplo: {
        html: `<p id="saludo"></p>
<button id="guardar">Recordar a Tagui</button>
<button id="olvidar">Olvidar</button>`,
        js: `const saludo = document.querySelector("#saludo");

function mostrar() {
  const amigo = localStorage.getItem("amigo");
  if (amigo === null) {
    saludo.textContent = "No recuerdo a nadie 🤷";
  } else {
    saludo.textContent = "Me acuerdo de " + amigo + " 😊";
  }
}

document.querySelector("#guardar").addEventListener("click", () => {
  localStorage.setItem("amigo", "Tagui");
  mostrar();
});

document.querySelector("#olvidar").addEventListener("click", () => {
  localStorage.removeItem("amigo");
  mostrar();
});

mostrar();`
      },
      consejo: "localStorage no es un sitio secreto: cualquiera que use ese ordenador puede verlo. Nunca guardes ahí contraseñas ni datos privados. 🔐"
    },
    {
      tipo: "ejercicio",
      enunciado: "Haz que la página recuerde tu animal favorito 🐾. El HTML ya está escrito.\n\n• **Al empezar**, lee con `getItem` la clave `animal`. Si es `null`, pon en `#favorito` el texto **Aún no has elegido animal.** Si hay algo, pon **Tu animal favorito es: ** seguido de lo guardado.\n• **Al pulsar** `#guardar`, guarda con `setItem` en la clave `animal` lo escrito en `#campo` y pon en `#favorito` **Tu animal favorito es: ** seguido de lo escrito. Con `pingüino`: **Tu animal favorito es: pingüino**\n\nCuando funcione, guarda uno y pulsa **🔄 Recargar**: ¡lo recordará!",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
label { display: block; font-weight: bold; margin-bottom: 6px; }
input, button { font: inherit; padding: 8px; border-radius: 8px; }
input { border: 2px solid darkorange; }
button { border: none; background-color: darkorange; color: white; }
#favorito { font-size: 22px; color: #a34a00; }`,
      inicial: {
        html: `<label for="campo">¿Cuál es tu animal favorito?</label>
<input id="campo" type="text">
<button id="guardar">Guardar</button>
<p id="favorito"></p>
`,
        js: ""
      },
      solucion: {
        html: `<label for="campo">¿Cuál es tu animal favorito?</label>
<input id="campo" type="text">
<button id="guardar">Guardar</button>
<p id="favorito"></p>
`,
        js: `const campo = document.querySelector("#campo");
const favorito = document.querySelector("#favorito");

const guardado = localStorage.getItem("animal");
if (guardado === null) {
  favorito.textContent = "Aún no has elegido animal.";
} else {
  favorito.textContent = "Tu animal favorito es: " + guardado;
}

document.querySelector("#guardar").addEventListener("click", () => {
  localStorage.setItem("animal", campo.value);
  favorito.textContent = "Tu animal favorito es: " + campo.value;
});
`
      },
      acciones: [
        { escribir: "#campo", texto: "pingüino" },
        { clic: "#guardar" }
      ],
      pistas: [
        "Son dos partes. Arriba, const guardado = localStorage.getItem(\"animal\"); y un if / else que compare guardado con null. Abajo, el addEventListener(\"click\", …) del botón con setItem y el texto nuevo.",
        "Debe quedarte así:\nconst campo = document.querySelector(\"#campo\");\nconst favorito = document.querySelector(\"#favorito\");\n\nconst guardado = localStorage.getItem(\"animal\");\nif (guardado === null) {\n  favorito.textContent = \"Aún no has elegido animal.\";\n} else {\n  favorito.textContent = \"Tu animal favorito es: \" + guardado;\n}\n\ndocument.querySelector(\"#guardar\").addEventListener(\"click\", () => {\n  localStorage.setItem(\"animal\", campo.value);\n  favorito.textContent = \"Tu animal favorito es: \" + campo.value;\n});"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Guardar objetos y arrays: JSON",
      texto: "localStorage solo guarda **textos**. Si le das un objeto, lo convierte en un inútil `\"[object Object]\"` y pierdes los datos. 😱\n\nLa solución se llama **JSON**: una forma de escribir objetos y arrays como texto. Es como una tienda de campaña ⛺: la **doblas** para meterla en la mochila y la **despliegas** al llegar.\n\n• `JSON.stringify(datos)` → dobla: convierte el objeto o array en texto.\n• `JSON.parse(texto)` → despliega: convierte el texto otra vez en objeto o array.\n\nMira la consola: la primera línea es el desastre; las otras, cómo se hace bien.",
      ejemplo: {
        js: `const jugador = { nombre: "Tagui", nivel: 3 };

localStorage.setItem("mal", jugador);
console.log(localStorage.getItem("mal"));

localStorage.setItem("jugador", JSON.stringify(jugador));
const texto = localStorage.getItem("jugador");
console.log(texto);

const recuperado = JSON.parse(texto);
console.log(recuperado.nombre + " está en el nivel " + recuperado.nivel);`
      },
      consejo: "Regla fácil: **stringify al guardar, parse al leer**. Siempre en pareja, como los calcetines. 🧦"
    },
    {
      tipo: "explicacion",
      titulo: "Una lista de objetos que se recuerda",
      texto: "Lo que más se guarda en las webs es una **lista de cosas**: tareas, citas, productos del carrito… Es decir, un **array de objetos**. La receta tiene tres pasos:\n\n1. **Cargar** al empezar: `JSON.parse(localStorage.getItem(\"citas\")) || []`. La primera vez no hay nada guardado, `getItem` da `null`, y el `|| []` («o, si no, una lista vacía») hace que empieces con un array vacío.\n2. **Cambiar** la lista: `citas.push(nuevaCita)`.\n3. **Guardar** la lista entera otra vez con `JSON.stringify`.\n\nEl ejemplo añade una cita cada vez que se ejecuta. Mira la consola: ¡la lista va creciendo!",
      ejemplo: {
        js: `let citas = JSON.parse(localStorage.getItem("citas")) || [];

citas.push({ mascota: "Gato", hora: "10:30" });
localStorage.setItem("citas", JSON.stringify(citas));

console.log("Tienes " + citas.length + " citas guardadas");
console.log(citas);`
      },
      consejo: "Guarda **siempre** la lista entera después de cambiarla. Si haces `push` y se te olvida el `setItem`, al recargar la cita nueva no estará."
    },
    {
      tipo: "ejercicio",
      enunciado: "Guarda la mochila del aventurero 🎒. El HTML ya está escrito y el JS trae el array `cosas`.\n\n1. Guarda `cosas` en localStorage con la clave `mochila`, usando `JSON.stringify`.\n2. Lee la clave `mochila` con `getItem` y muestra ese texto en la consola.\n3. Conviértelo otra vez en array con `JSON.parse` y muestra en la consola cuántas cosas tiene con `.length` (**3**).\n4. Con `for…of` sobre el array recuperado, crea un `<li>` por cada cosa dentro de `#mochila`.",
      cssBase: `body { font-family: sans-serif; padding: 10px; background-color: #f5efe0; }
h2 { color: #6b4f1d; }
#mochila li { font-size: 20px; margin: 6px 0; }`,
      inicial: {
        html: `<h2>🎒 Mi mochila</h2>
<ul id="mochila"></ul>
`,
        js: `const cosas = ["espada", "poción", "mapa"];
`
      },
      solucion: {
        html: `<h2>🎒 Mi mochila</h2>
<ul id="mochila"></ul>
`,
        js: `const cosas = ["espada", "poción", "mapa"];

localStorage.setItem("mochila", JSON.stringify(cosas));

const texto = localStorage.getItem("mochila");
console.log(texto);

const recuperadas = JSON.parse(texto);
console.log(recuperadas.length);

const lista = document.querySelector("#mochila");
for (const cosa of recuperadas) {
  const li = document.createElement("li");
  li.textContent = cosa;
  lista.append(li);
}
`
      },
      pistas: [
        "Primero setItem(\"mochila\", JSON.stringify(cosas)). Luego guarda en una constante el getItem y haz console.log de ella. Después otra constante con JSON.parse de ese texto: esa es la que recorres con for…of (createElement, textContent y append).",
        "Debe quedarte así:\nlocalStorage.setItem(\"mochila\", JSON.stringify(cosas));\n\nconst texto = localStorage.getItem(\"mochila\");\nconsole.log(texto);\n\nconst recuperadas = JSON.parse(texto);\nconsole.log(recuperadas.length);\n\nconst lista = document.querySelector(\"#mochila\");\nfor (const cosa of recuperadas) {\n  const li = document.createElement(\"li\");\n  li.textContent = cosa;\n  lista.append(li);\n}"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Haces `localStorage.setItem(\"jugador\", jugador)` con un objeto, sin `JSON.stringify`. ¿Qué se guarda?",
      opciones: [
        "El texto \"[object Object]\": los datos se pierden",
        "El objeto completo, perfecto para leerlo después",
        "Nada: localStorage da un error y se para la página"
      ],
      correcta: 0,
      explicacion: "localStorage convierte todo en texto, y un objeto convertido «a lo bruto» queda como \"[object Object]\". Por eso se usa JSON.stringify al guardar y JSON.parse al leer."
    },
    {
      tipo: "reto",
      enunciado: "Haz tu **cuaderno de avistamientos de aves** 🐦: apuntes que se guardan aunque se recargue la página. El HTML ya está escrito.\n\n1. Al **empezar**, carga la clave `avistamientos` con `JSON.parse(...) || []` y pinta cada objeto en `#lista` como `<li>Gorrión: 3</li>` (con `createElement`, como en js-10).\n2. Al **enviar** el formulario `#formulario` (frena el envío): crea un objeto `{ especie, cantidad }` con la especie con `trim()` y la cantidad con `Number()`, hazle `push` al array, guarda la lista entera con `JSON.stringify` y vuelve a pintar `#lista`.\n3. Al pulsar `#borrar` («Borrar el cuaderno»): borra la clave con `removeItem(\"avistamientos\")`, vacía el array y deja `#lista` vacía.\n\nPruébalo de verdad: apunta algún avistamiento y pulsa **🔄 Recargar**. La página se acuerda. 🧠",
      cssBase: `body { font-family: sans-serif; display: flex; justify-content: center; padding-top: 20px; background-color: #e8f4fd; }
.tarjeta { width: 320px; padding: 20px; background-color: white; border-radius: 16px; box-shadow: 0 2px 10px rgb(0 0 0 / 0.1); text-align: center; }
h2 { margin: 0 0 12px; color: #1c5d99; }
form { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
label { width: 100%; font-weight: bold; }
input, button { font: inherit; padding: 8px; border-radius: 8px; }
input { border: 2px solid #8cc0eb; }
button { border: none; background-color: #1c5d99; color: white; }
#lista { text-align: left; padding-left: 24px; margin: 14px 0; }
#lista li { margin: 4px 0; }
#borrar { margin-top: 16px; background-color: transparent; color: #1c5d99; text-decoration: underline; }`,
      inicial: {
        html: `<div class="tarjeta">
  <h2>Tu cuaderno de avistamientos 🐦</h2>
  <form id="formulario" novalidate>
    <label for="especie">Especie</label>
    <input id="especie" type="text">
    <label for="cantidad">Cantidad</label>
    <input id="cantidad" type="number">
    <button>Apuntar</button>
  </form>
  <ul id="lista"></ul>
  <button id="borrar" type="button">Borrar el cuaderno</button>
</div>
`,
        js: `const formulario = document.querySelector("#formulario");
const campoEspecie = document.querySelector("#especie");
const campoCantidad = document.querySelector("#cantidad");
const lista = document.querySelector("#lista");
const borrar = document.querySelector("#borrar");

// 1. Al empezar: carga la clave "avistamientos" con JSON.parse(...) || []
//    y pinta cada objeto en #lista con createElement (como en js-10)

// 2. Al enviar el formulario: frena el envío, crea { especie: ..., cantidad: ... }
//    (especie con trim(), cantidad con Number()), haz push, guarda con JSON.stringify y vuelve a pintar la lista

// 3. Al pulsar «Borrar el cuaderno»: removeItem("avistamientos"), vacía el array y deja la lista vacía
`
      },
      comprobaciones: [
        {
          texto: "Al apuntar «Gorrión» y 3, en `#lista` aparece un `<li>` que dice «Gorrión» y «3»",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc, { borrarDatos: true });
            PRUEBA.escribir(v.doc.querySelector("#especie"), "Gorrión");
            PRUEBA.escribir(v.doc.querySelector("#cantidad"), "3");
            v.doc.querySelector("#formulario")?.requestSubmit();
            const lis = Array.from(v.doc.querySelectorAll("#lista li"));
            return lis.some(li => li.textContent.includes("Gorrión") && li.textContent.includes("3"));
          }
        },
        {
          texto: "El apunte se guarda en la clave `avistamientos` como un array con 1 objeto (su especie es Gorrión y su cantidad, 3)",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc, { borrarDatos: true });
            PRUEBA.escribir(v.doc.querySelector("#especie"), "Gorrión");
            PRUEBA.escribir(v.doc.querySelector("#cantidad"), "3");
            v.doc.querySelector("#formulario")?.requestSubmit();
            const datos = JSON.parse(v.win.localStorage?.getItem("avistamientos") || "null");
            return Array.isArray(datos) && datos.length === 1 &&
                   datos[0].especie === "Gorrión" && Number(datos[0].cantidad) === 3;
          }
        },
        {
          texto: "Dos apuntes quedan en orden y la especie se limpia con `trim()`: al recargar siguen los 2",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc, { borrarDatos: true });
            PRUEBA.escribir(v.doc.querySelector("#especie"), "Gorrión");
            PRUEBA.escribir(v.doc.querySelector("#cantidad"), "3");
            v.doc.querySelector("#formulario")?.requestSubmit();
            PRUEBA.escribir(v.doc.querySelector("#especie"), "  Mirlo  ");
            PRUEBA.escribir(v.doc.querySelector("#cantidad"), "1");
            v.doc.querySelector("#formulario")?.requestSubmit();
            const v2 = await PRUEBA.recargar(v.doc);
            const textos = Array.from(v2.doc.querySelectorAll("#lista li")).map(li => li.textContent);
            return textos.length === 2 &&
                   textos[0].includes("Gorrión") && textos[0].includes("3") &&
                   textos[1].includes("Mirlo") && textos[1].includes("1");
          }
        },
        {
          texto: "Empezar de cero no da errores y la lista arranca vacía; tras apuntar uno y recargar, hay 1 `<li>`",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc, { borrarDatos: true });
            if (v.doc.querySelectorAll("#lista li").length !== 0) return false;
            if ((v.win.__errores || []).length > 0) return false;
            PRUEBA.escribir(v.doc.querySelector("#especie"), "Gorrión");
            PRUEBA.escribir(v.doc.querySelector("#cantidad"), "3");
            v.doc.querySelector("#formulario")?.requestSubmit();
            const v2 = await PRUEBA.recargar(v.doc);
            return v2.doc.querySelectorAll("#lista li").length === 1;
          }
        },
        {
          texto: "«Borrar el cuaderno» lo vacía todo: la clave `avistamientos` desaparece y `#lista` queda vacía, también al recargar",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc, { borrarDatos: true });
            PRUEBA.escribir(v.doc.querySelector("#especie"), "Gorrión");
            PRUEBA.escribir(v.doc.querySelector("#cantidad"), "3");
            v.doc.querySelector("#formulario")?.requestSubmit();
            v.doc.querySelector("#borrar")?.click();
            if (v.win.localStorage?.getItem("avistamientos") !== null) return false;
            if (v.doc.querySelectorAll("#lista li").length !== 0) return false;
            const v2 = await PRUEBA.recargar(v.doc);
            return v2.win.localStorage?.getItem("avistamientos") === null &&
                   v2.doc.querySelectorAll("#lista li").length === 0;
          }
        }
      ],
      pistas: [
        "Tres bloques: arriba, la carga con let avistamientos = JSON.parse(localStorage.getItem(\"avistamientos\")) || []; y una función pintar() que vacía #lista y le añade un <li> por cada objeto (createElement, textContent con especie + \": \" + cantidad, y append). Después, el addEventListener(\"submit\", …) con preventDefault, push, setItem y pintar(). Y el addEventListener(\"click\", …) en borrar con removeItem, la lista a [] y #lista vacía.",
        "Te debe quedar así:\nlet avistamientos = JSON.parse(localStorage.getItem(\"avistamientos\")) || [];\n\nfunction pintar() {\n  lista.textContent = \"\";\n  for (const a of avistamientos) {\n    const li = document.createElement(\"li\");\n    li.textContent = a.especie + \": \" + a.cantidad;\n    lista.append(li);\n  }\n}\npintar();\n\nformulario.addEventListener(\"submit\", (evento) => {\n  evento.preventDefault();\n  avistamientos.push({ especie: campoEspecie.value.trim(), cantidad: Number(campoCantidad.value) });\n  localStorage.setItem(\"avistamientos\", JSON.stringify(avistamientos));\n  pintar();\n});\n\nborrar.addEventListener(\"click\", () => {\n  localStorage.removeItem(\"avistamientos\");\n  avistamientos = [];\n  lista.textContent = \"\";\n});"
      ],
      solucion: {
        html: `<div class="tarjeta">
  <h2>Tu cuaderno de avistamientos 🐦</h2>
  <form id="formulario" novalidate>
    <label for="especie">Especie</label>
    <input id="especie" type="text">
    <label for="cantidad">Cantidad</label>
    <input id="cantidad" type="number">
    <button>Apuntar</button>
  </form>
  <ul id="lista"></ul>
  <button id="borrar" type="button">Borrar el cuaderno</button>
</div>
`,
        js: `const formulario = document.querySelector("#formulario");
const campoEspecie = document.querySelector("#especie");
const campoCantidad = document.querySelector("#cantidad");
const lista = document.querySelector("#lista");
const borrar = document.querySelector("#borrar");

// 1. Al empezar: cargar la lista guardada (o una vacía) y pintarla
let avistamientos = JSON.parse(localStorage.getItem("avistamientos")) || [];

function pintar() {
  lista.textContent = "";
  for (const avistamiento of avistamientos) {
    const li = document.createElement("li");
    li.textContent = avistamiento.especie + ": " + avistamiento.cantidad;
    lista.append(li);
  }
}
pintar();

// 2. Al enviar: añadir el apunte, guardar la lista entera y volver a pintar
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  avistamientos.push({
    especie: campoEspecie.value.trim(),
    cantidad: Number(campoCantidad.value)
  });
  localStorage.setItem("avistamientos", JSON.stringify(avistamientos));
  pintar();
});

// 3. «Borrar el cuaderno»: olvidar todos los apuntes
borrar.addEventListener("click", () => {
  localStorage.removeItem("avistamientos");
  avistamientos = [];
  lista.textContent = "";
});
`
      }
    }
  ]
});
