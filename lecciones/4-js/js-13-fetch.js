/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-13
   Pedir datos con fetch — asincronía («pedir y esperar»), fetch(),
   servidor y URL, async / await, respuesta.json(), respuesta.ok y
   respuesta.status (404), try / catch.
   Notas:
   - Los archivos datos/chistes.json y datos/animales.json los sirve
     el motor sin internet (campo `datos` de la lección, ver
     js/editor.js). datos/dinosaurios.json NO existe a propósito:
     da 404 y sirve para practicar respuesta.ok.
   - Ejercicios deterministas: nada de azar.
   - Cambio respecto al PLAN: el reto es «siguiente chiste» (con
     vuelta al principio) en vez de «chiste al azar», para no meter
     Math.random/Math.floor sin enseñarlos y poder comprobarlo con
     exactitud.
   - La comprobación del error en el reto recarga la página con
     PRUEBA.recargar(doc, { sinDatos: ["chistes.json"] }): en esa
     copia el fetch del alumno recibe un 404.
   - Las comprobaciones leen los chistes de
     CURSO.lecciones["js-13"].datos (sin variables globales, porque
     el verificador carga todas las lecciones en la misma página).
   - El JS de ejemplos y soluciones no usa plantillas de texto.
   ============================================================ */
CURSO.registrar({
  id: "js-13",
  titulo: "Pedir datos con fetch",
  xp: 55,
  objetivo: "Sabrás pedir datos a un servidor con fetch, esperar la respuesta con async y await, mostrarlos en la página y avisar si algo falla.",
  glosario: [
    { termino: "fetch()", tema: "Datos de internet", para: "Pide un archivo o unos datos; la respuesta llega después.", ejemplo: "const respuesta = await fetch(\"datos/opiniones.json\");", buscar: "pedir datos archivo internet" },
    { termino: "async / await", tema: "Datos de internet", para: "`await` espera la respuesta; solo se usa dentro de una función `async`.", ejemplo: "async function cargar() {\n  const respuesta = await fetch(\"datos/opiniones.json\");\n  const datos = await respuesta.json();\n}", buscar: "esperar asincrono" },
    { termino: ".json()", tema: "Datos de internet", para: "Convierte la respuesta en datos de JavaScript.", ejemplo: "const opiniones = await respuesta.json();", buscar: "json convertir respuesta" },
    { termino: "try / catch", tema: "Datos de internet", para: "Si algo falla dentro de `try`, se va a `catch` en vez de romper la página.", ejemplo: "try {\n  const respuesta = await fetch(\"datos/opiniones.json\");\n} catch (error) {\n  console.log(\"No se pudo cargar\");\n}", buscar: "error fallo capturar" }
  ],
  datos: {
    "chistes.json": [
      { pregunta: "¿Qué le dice una iguana a su hermana gemela?", respuesta: "¡Somos iguanitas!" },
      { pregunta: "¿Por qué está triste el libro de matemáticas?", respuesta: "Porque tiene muchos problemas." },
      { pregunta: "¿Qué hace una abeja en el gimnasio?", respuesta: "¡Zum-ba!" },
      { pregunta: "¿Cuál es el animal más antiguo?", respuesta: "La cebra, porque está en blanco y negro." },
      { pregunta: "¿Qué le dice un semáforo a otro?", respuesta: "No me mires, que me estoy cambiando." },
      { pregunta: "¿Qué le dijo el cero al ocho?", respuesta: "¡Qué cinturón tan bonito!" }
    ],
    "animales.json": [
      { nombre: "Pingüino", emoji: "🐧" },
      { nombre: "Pulpo", emoji: "🐙" },
      { nombre: "Koala", emoji: "🐨" },
      { nombre: "Tortuga", emoji: "🐢" }
    ]
  },
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Pedir y esperar",
      texto: "Muchas webs muestran datos que no están en la página: el tiempo, mensajes, vídeos… Viven en un **servidor**, un ordenador que guarda los archivos y los datos de la web, y hay que **pedirlos**.\n\nPedir lleva tiempo, como encargar una pizza 🍕: llamas y, mientras llega, sigues con lo tuyo. Que el código no se quede parado esperando se llama **asincronía**.\n\nPara pedir se usa `fetch(\"dirección\")` (traer). En una web real, `datos/chistes.json` sería un archivo de tu servidor; también puedes pedir a otras webs con su dirección completa (`https://…`). Aquí usaremos los archivos de la lección, que funcionan sin internet.\n\nFíjate en el **orden** de la consola.",
      ejemplo: {
        js: `async function pedir() {
  console.log("📞 Pido los chistes…");
  const respuesta = await fetch("datos/chistes.json");
  console.log("📦 ¡Ha llegado la respuesta! Estado: " + respuesta.status);
}

pedir();
console.log("Mientras espero, sigo con lo mío 🎵");`
      },
      consejo: "La línea de «Mientras espero» está al final del código… ¡pero sale antes que la respuesta! Eso es la asincronía: el resto del código no espera a que llegue la pizza."
    },
    {
      tipo: "explicacion",
      titulo: "async, await y .json()",
      texto: "Dentro de la función hay dos palabras nuevas:\n\n• `await` (esperar): «espera aquí hasta que llegue y luego sigue». Solo funciona dentro de una función marcada con `async` (asíncrona).\n• La respuesta es como un **sobre** 📩. Para abrirlo y convertir su JSON en arrays y objetos, usa `await respuesta.json()`. Es como el `JSON.parse` de la lección anterior, pero también hay que esperarlo.\n\nCon los datos ya en un array, píntalos como sabes: `forEach`, `createElement` y `append`. Mira cómo aparece primero «Cargando…» y, al momento, los chistes.",
      ejemplo: {
        html: `<p id="estado">Cargando chistes…</p>
<ul id="lista"></ul>`,
        js: `const estado = document.querySelector("#estado");
const lista = document.querySelector("#lista");

async function cargarChistes() {
  const respuesta = await fetch("datos/chistes.json");
  const chistes = await respuesta.json();
  estado.textContent = "Han llegado " + chistes.length + " chistes:";
  chistes.forEach((chiste) => {
    const li = document.createElement("li");
    li.textContent = chiste.pregunta;
    lista.append(li);
  });
}

cargarChistes();`
      },
      consejo: "¿Te sale el error «await is only valid in async functions»? Te has olvidado de escribir `async` delante de `function`. ¡Van siempre juntos!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Pide la lista de animales del zoo 🦁. El HTML ya está escrito. El archivo `datos/animales.json` es un array de objetos así: `[{ nombre: \"Pingüino\", emoji: \"🐧\" }, …]`.\n\n• Crea una función `async` que pida `datos/animales.json` con `fetch` y lo convierta con `await respuesta.json()`.\n• Muestra en la consola **Han llegado 4 animales** (usa `.length`).\n• Crea un `<li>` por animal dentro de `#animales`, con el emoji, un espacio y el nombre: **🐧 Pingüino**\n• No te olvides de llamar a la función.",
      cssBase: `body { font-family: sans-serif; padding: 10px; background-color: #eef8ee; }
h2 { color: #2e7d32; }
#animales li { font-size: 22px; margin: 6px 0; }`,
      inicial: {
        html: `<h2>Animales del zoo</h2>
<ul id="animales"></ul>
`,
        js: ""
      },
      solucion: {
        html: `<h2>Animales del zoo</h2>
<ul id="animales"></ul>
`,
        js: `const lista = document.querySelector("#animales");

async function cargarAnimales() {
  const respuesta = await fetch("datos/animales.json");
  const animales = await respuesta.json();
  console.log("Han llegado " + animales.length + " animales");
  animales.forEach((animal) => {
    const li = document.createElement("li");
    li.textContent = animal.emoji + " " + animal.nombre;
    lista.append(li);
  });
}

cargarAnimales();
`
      },
      pistas: [
        "Copia la forma del ejemplo anterior: async function, const respuesta = await fetch(…), const animales = await respuesta.json(). Luego el console.log con animales.length y un forEach que cree cada <li> con animal.emoji + \" \" + animal.nombre.",
        "Debe quedarte así:\nconst lista = document.querySelector(\"#animales\");\n\nasync function cargarAnimales() {\n  const respuesta = await fetch(\"datos/animales.json\");\n  const animales = await respuesta.json();\n  console.log(\"Han llegado \" + animales.length + \" animales\");\n  animales.forEach((animal) => {\n    const li = document.createElement(\"li\");\n    li.textContent = animal.emoji + \" \" + animal.nombre;\n    lista.append(li);\n  });\n}\n\ncargarAnimales();"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Cuando algo sale mal",
      texto: "Pedir cosas por internet puede fallar de dos maneras:\n\n1. **El servidor contesta «no lo tengo»**: por ejemplo, si escribes mal el nombre del archivo. Entonces `respuesta.ok` es `false` y `respuesta.status` vale `404` (el famoso «no encontrado»).\n2. **No llega ninguna respuesta** (sin internet, por ejemplo): `fetch` lanza un error y el código se pararía.\n\nPara el segundo caso existe `try { … } catch (error) { … }`: «**intenta** esto y, si algo falla, haz esto otro». Es la red de seguridad del trapecista. 🎪\n\nEn el ejemplo, el archivo está mal escrito a propósito (`chistez`). Corrígelo a `chistes` en tu cabeza: así se vería el éxito.",
      ejemplo: {
        html: `<p id="estado">Cargando…</p>`,
        js: `const estado = document.querySelector("#estado");

async function cargar() {
  try {
    const respuesta = await fetch("datos/chistez.json");
    if (!respuesta.ok) {
      estado.textContent = "😕 No encuentro el archivo (error " + respuesta.status + ")";
      return;
    }
    const chistes = await respuesta.json();
    estado.textContent = "✅ Han llegado " + chistes.length + " chistes";
  } catch (error) {
    estado.textContent = "🔌 No se pudo conectar. ¿Hay internet?";
    console.log(error);
  }
}

cargar();`
      },
      consejo: "El `return` dentro del `if` hace que la función termine ahí mismo: si no hay archivo, no tiene sentido intentar abrir el sobre con `.json()`."
    },
    {
      tipo: "ejercicio",
      enunciado: "Prueba el éxito y el error con dos botones. El HTML ya está escrito. Ojo: `datos/dinosaurios.json` **no existe** (¡se extinguieron! 🦖).\n\nCrea una función `async` con un parámetro `archivo` que, dentro de un `try`:\n• Pida ese `archivo` con `fetch`.\n• Si `respuesta.ok` es `false`, ponga en `#estado` **Error ** seguido de `respuesta.status` (**Error 404**) y termine con `return`.\n• Si no, lo convierta con `.json()` y ponga **Han llegado ** + la cantidad + ** elementos** (**Han llegado 4 elementos**).\n• En el `catch`, ponga **Sin conexión**.\n\nEl botón `#animales` la llama con `\"datos/animales.json\"` y `#dinosaurios`, con `\"datos/dinosaurios.json\"`.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
button { font: inherit; padding: 8px 14px; margin-right: 6px; border: none; border-radius: 8px; background-color: #3949ab; color: white; }
#estado { font-size: 22px; font-weight: bold; color: #3949ab; }`,
      inicial: {
        html: `<button id="animales">Pedir animales</button>
<button id="dinosaurios">Pedir dinosaurios</button>
<p id="estado">Pulsa un botón</p>
`,
        js: ""
      },
      solucion: {
        html: `<button id="animales">Pedir animales</button>
<button id="dinosaurios">Pedir dinosaurios</button>
<p id="estado">Pulsa un botón</p>
`,
        js: `const estado = document.querySelector("#estado");

async function pedir(archivo) {
  try {
    const respuesta = await fetch(archivo);
    if (!respuesta.ok) {
      estado.textContent = "Error " + respuesta.status;
      return;
    }
    const datos = await respuesta.json();
    estado.textContent = "Han llegado " + datos.length + " elementos";
  } catch (error) {
    estado.textContent = "Sin conexión";
  }
}

document.querySelector("#animales").addEventListener("click", () => {
  pedir("datos/animales.json");
});

document.querySelector("#dinosaurios").addEventListener("click", () => {
  pedir("datos/dinosaurios.json");
});
`
      },
      acciones: [
        { clic: "#dinosaurios" },
        { clic: "#animales" }
      ],
      pistas: [
        "Copia la forma del ejemplo anterior, pero con fetch(archivo) en vez de un nombre fijo. Después, dos addEventListener(\"click\", () => { pedir(\"…\"); }), uno por botón, cada uno con su archivo.",
        "Debe quedarte así:\nconst estado = document.querySelector(\"#estado\");\n\nasync function pedir(archivo) {\n  try {\n    const respuesta = await fetch(archivo);\n    if (!respuesta.ok) {\n      estado.textContent = \"Error \" + respuesta.status;\n      return;\n    }\n    const datos = await respuesta.json();\n    estado.textContent = \"Han llegado \" + datos.length + \" elementos\";\n  } catch (error) {\n    estado.textContent = \"Sin conexión\";\n  }\n}\n\ndocument.querySelector(\"#animales\").addEventListener(\"click\", () => {\n  pedir(\"datos/animales.json\");\n});\n\ndocument.querySelector(\"#dinosaurios\").addEventListener(\"click\", () => {\n  pedir(\"datos/dinosaurios.json\");\n});"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "¿Qué hace `await` en `const respuesta = await fetch(\"datos/chistes.json\");`?",
      opciones: [
        "Espera a que llegue la respuesta antes de seguir con la siguiente línea de la función",
        "Hace que el archivo se descargue más deprisa",
        "Muestra la respuesta en la consola"
      ],
      correcta: 0,
      explicacion: "await pausa la función async hasta que llega la respuesta (sin congelar el resto de la página). Así, en la línea siguiente ya puedes usar respuesta con tranquilidad."
    },
    {
      tipo: "reto",
      enunciado: "Construye **la máquina de chistes** 🤖. El HTML ya está escrito.\n\n1. **Al empezar**, pide **una sola vez** `datos/chistes.json` con `fetch` (en una función `async`, con `try`/`catch` y `respuesta.ok`) y guarda la lista en la variable `chistes`.\n2. Si algo falla, pon en `#pregunta`: **No puedo cargar los chistes 😢**\n3. **Al pulsar** `#otro`, muestra la `pregunta` del chiste que toca en `#pregunta` y su `respuesta` en `#respuesta`. Cada pulsación, el **siguiente**; después del último, vuelta al primero.",
      cssBase: `body { font-family: sans-serif; display: flex; justify-content: center; padding-top: 20px; background-color: #fff4d6; }
.maquina { width: 340px; padding: 20px; background-color: white; border: 4px solid #f2b705; border-radius: 20px; text-align: center; box-shadow: 0 4px 0 #d49b00; }
h2 { margin-top: 0; }
#pregunta { font-size: 20px; font-weight: bold; min-height: 2.5em; }
#respuesta { font-size: 18px; color: #b35c00; min-height: 1.5em; }
button { font: inherit; padding: 10px 20px; border: none; border-radius: 30px; background-color: #f2b705; color: #3d2c00; font-weight: bold; }`,
      inicial: {
        html: `<div class="maquina">
  <h2>🤖 La máquina de chistes</h2>
  <p id="pregunta">Pulsa el botón para oír un chiste</p>
  <p id="respuesta"></p>
  <button id="otro">Contar un chiste</button>
</div>
`,
        js: `const textoPregunta = document.querySelector("#pregunta");
const textoRespuesta = document.querySelector("#respuesta");
const boton = document.querySelector("#otro");

let chistes = [];   // aquí guardarás los chistes cuando lleguen
let posicion = 0;   // qué chiste toca contar (empieza en el primero)

// 1. Función async que pide "datos/chistes.json" y guarda la lista en chistes
//    (con try/catch y respuesta.ok: si algo falla, avisa en #pregunta)

// 2. Llama a esa función al empezar

// 3. Al pulsar el botón: muestra el chiste de la posición que toca,
//    suma 1 a posicion y, si te pasas del último, vuelve a 0
`
      },
      comprobaciones: [
        {
          texto: "Al pulsar «Contar un chiste» aparecen la pregunta y la respuesta del primer chiste",
          prueba: async (doc) => {
            const lista = CURSO.lecciones["js-13"]?.datos?.["chistes.json"] || [];
            if (!lista.length) return false;
            const v = await PRUEBA.recargar(doc);
            v.doc.querySelector("#otro")?.click();
            const texto = sel => v.doc.querySelector(sel)?.textContent || "";
            return PRUEBA.esperarA(() => texto("#pregunta").includes(lista[0].pregunta) && texto("#respuesta").includes(lista[0].respuesta), 1200);
          }
        },
        {
          texto: "Cada vez que pulsas sale el siguiente chiste y, después del último, vuelve a salir el primero",
          prueba: async (doc) => {
            const lista = CURSO.lecciones["js-13"]?.datos?.["chistes.json"] || [];
            if (lista.length < 2) return false;
            const v = await PRUEBA.recargar(doc);
            const boton = v.doc.querySelector("#otro");
            if (!boton) return false;
            for (const chiste of lista.concat([lista[0]])) {
              boton.click();
              const ok = await PRUEBA.esperarA(() => (v.doc.querySelector("#pregunta")?.textContent || "").includes(chiste.pregunta), 200);
              if (!ok) return false;
            }
            return true;
          }
        },
        {
          texto: "Si los chistes no se pueden cargar, `#pregunta` avisa: **No puedo cargar los chistes**",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc, { sinDatos: ["chistes.json"] });
            return await PRUEBA.esperarA(() => (v.doc.querySelector("#pregunta")?.textContent || "").toLowerCase().includes("no puedo cargar"), 800);
          }
        }
      ],
      pistas: [
        "La función de carga es como la del ejercicio de los dos botones, pero al final guarda la lista: chistes = await respuesta.json(); (sin const: la variable ya existe). En el clic: const chiste = chistes[posicion]; pinta chiste.pregunta y chiste.respuesta, suma 1 a posicion y, con un if, vuelve a 0 cuando posicion === chistes.length.",
        "Te debe quedar así:\nasync function cargarChistes() {\n  try {\n    const respuesta = await fetch(\"datos/chistes.json\");\n    if (!respuesta.ok) {\n      textoPregunta.textContent = \"No puedo cargar los chistes 😢\";\n      return;\n    }\n    chistes = await respuesta.json();\n  } catch (error) {\n    textoPregunta.textContent = \"No puedo cargar los chistes 😢\";\n  }\n}\n\ncargarChistes();\n\nboton.addEventListener(\"click\", () => {\n  if (chistes.length === 0) {\n    return;\n  }\n  const chiste = chistes[posicion];\n  textoPregunta.textContent = chiste.pregunta;\n  textoRespuesta.textContent = chiste.respuesta;\n  posicion = posicion + 1;\n  if (posicion === chistes.length) {\n    posicion = 0;\n  }\n});"
      ],
      solucion: {
        html: `<div class="maquina">
  <h2>🤖 La máquina de chistes</h2>
  <p id="pregunta">Pulsa el botón para oír un chiste</p>
  <p id="respuesta"></p>
  <button id="otro">Contar un chiste</button>
</div>
`,
        js: `const textoPregunta = document.querySelector("#pregunta");
const textoRespuesta = document.querySelector("#respuesta");
const boton = document.querySelector("#otro");

let chistes = [];   // aquí guardarás los chistes cuando lleguen
let posicion = 0;   // qué chiste toca contar (empieza en el primero)

async function cargarChistes() {
  try {
    const respuesta = await fetch("datos/chistes.json");
    if (!respuesta.ok) {
      textoPregunta.textContent = "No puedo cargar los chistes 😢";
      return;
    }
    chistes = await respuesta.json();
  } catch (error) {
    textoPregunta.textContent = "No puedo cargar los chistes 😢";
  }
}

cargarChistes();

boton.addEventListener("click", () => {
  // Si los chistes aún no han llegado, no hacemos nada
  if (chistes.length === 0) {
    return;
  }
  const chiste = chistes[posicion];
  textoPregunta.textContent = chiste.pregunta;
  textoRespuesta.textContent = chiste.respuesta;
  posicion = posicion + 1;
  if (posicion === chistes.length) {
    posicion = 0;
  }
});
`
      }
    }
  ]
});
