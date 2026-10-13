/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-07
   Condiciones — booleanos (true/false), comparaciones (===, !==,
   >, <, >=, <=), if, else, else if, && y ||. Introduce además la
   longitud de un texto (texto.length / campo.value.length), que
   necesita el reto del semáforo (js-08 la extiende a arrays).
   Notas:
   - Las condiciones se practican siempre con eventos y varias
     `acciones` con valores distintos: así una solución sin if
     (que pinte siempre el mismo texto) no se aprueba.
   - Se compara longitud (un número) en vez de campo.value con
     números: así no hace falta explicar todavía Number().
   - El reto prueba los bordes (6 y 9 → media, 10 → fuerte) para
     que el alumno piense en < frente a <=; el enunciado lo dice.
   - Cuidado: los ${…} de los ejemplos van escapados (\${…}).
   ============================================================ */
CURSO.registrar({
  id: "js-07",
  titulo: "Condiciones",
  xp: 40,
  objetivo: "Sabrás hacer que tu código tome decisiones con if, else y comparaciones.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "¿Verdadero o falso?",
      texto: "Para tomar decisiones, el código hace **preguntas** que solo tienen dos respuestas: `true` (verdadero) o `false` (falso). Estos dos valores se llaman **booleanos**.\n\nLas preguntas se hacen con **comparaciones**:\n• `===` ¿es igual? · `!==` ¿es distinto?\n• `>` ¿es mayor? · `<` ¿es menor?\n• `>=` ¿mayor o igual? · `<=` ¿menor o igual?\n\nMira en la consola qué responde cada pregunta. 🤔",
      ejemplo: {
        js: `const edad = 12;

console.log(edad > 10);          // ¿12 es mayor que 10?
console.log(edad < 5);           // ¿12 es menor que 5?
console.log(edad === 12);        // ¿12 es igual a 12?
console.log("gato" === "perro"); // ¿son el mismo texto?
console.log("gato" !== "perro"); // ¿son distintos?`
      },
      consejo: "Un `=` **guarda** un valor en una variable; tres `===` **comparan**. Si escribes `if (edad = 12)` no preguntas nada: ¡cambias la edad! Es un error clásico."
    },
    {
      tipo: "explicacion",
      titulo: "Si pasa esto… y si no…",
      texto: "Con `if` («si») el código solo se ejecuta cuando la pregunta es `true`. Con `else` («si no») eliges qué hacer cuando es `false`. Es como en la vida: **si** llueve, coges el paraguas ☔; **si no**, las gafas de sol 😎.\n\nLa pregunta va entre **paréntesis** y lo que se hace en cada caso, entre **llaves**.\n\nEn el ejemplo, la comprobación ocurre al pulsar el botón. Escribe una respuesta, pulsa y prueba también con `Marte`.",
      ejemplo: {
        html: `<p>¿Cuál es el planeta rojo?</p>
<input id="respuesta" type="text">
<button id="comprobar">Comprobar</button>
<p id="resultado"></p>`,
        js: `const respuesta = document.querySelector("#respuesta");
const resultado = document.querySelector("#resultado");

document.querySelector("#comprobar").addEventListener("click", () => {
  if (respuesta.value === "Marte") {
    resultado.textContent = "¡Correcto! 🚀";
  } else {
    resultado.textContent = "Casi… prueba otra vez";
  }
});`
      },
      consejo: "Para el ordenador, `\"marte\"` y `\"Marte\"` son textos **distintos**: las mayúsculas cuentan al comparar con `===`."
    },
    {
      tipo: "ejercicio",
      enunciado: "La puerta del castillo 🏰 solo se abre con la contraseña correcta. El HTML ya está escrito.\n\nAl pulsar el botón `#entrar`:\n• Si lo escrito en `#clave` es exactamente `tesoro`, pon en `#puerta` el texto **¡Bienvenido al castillo!**\n• Si no, pon **Contraseña incorrecta**.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
input { padding: 8px; font-size: 18px; border-radius: 8px; border: 2px solid #666; }
button { padding: 9px 16px; font-size: 18px; border: none; border-radius: 8px; background-color: #6b4f2a; color: white; }
#puerta { font-size: 22px; font-weight: bold; }`,
      inicial: {
        html: `<label for="clave">Contraseña:</label>
<input id="clave" type="text">
<button id="entrar">Entrar</button>
<p id="puerta">🔒 La puerta está cerrada</p>
`,
        js: ""
      },
      solucion: {
        html: `<label for="clave">Contraseña:</label>
<input id="clave" type="text">
<button id="entrar">Entrar</button>
<p id="puerta">🔒 La puerta está cerrada</p>
`,
        js: `const clave = document.querySelector("#clave");
const puerta = document.querySelector("#puerta");

document.querySelector("#entrar").addEventListener("click", () => {
  if (clave.value === "tesoro") {
    puerta.textContent = "¡Bienvenido al castillo!";
  } else {
    puerta.textContent = "Contraseña incorrecta";
  }
});
`
      },
      acciones: [
        { escribir: "#clave", texto: "dragón" },
        { clic: "#entrar" },
        { escribir: "#clave", texto: "tesoro" },
        { clic: "#entrar" }
      ],
      pistas: [
        "Dentro del addEventListener del clic va un if que compara clave.value con \"tesoro\" usando ===. En las llaves del if, un texto; en las del else, el otro.",
        "Debe quedarte así:\nconst clave = document.querySelector(\"#clave\");\nconst puerta = document.querySelector(\"#puerta\");\n\ndocument.querySelector(\"#entrar\").addEventListener(\"click\", () => {\n  if (clave.value === \"tesoro\") {\n    puerta.textContent = \"¡Bienvenido al castillo!\";\n  } else {\n    puerta.textContent = \"Contraseña incorrecta\";\n  }\n});"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "¿Cuántas letras tiene? .length",
      texto: "Todo texto sabe cuántos caracteres tiene (letras, números, espacios y símbolos): es su **longitud**, y se lee con `.length`.\n\n`\"gato\".length` vale `4`.\n\nCon un campo de texto: `campo.value.length` te dice cuántos caracteres hay escritos. Es un **número**, así que puedes compararlo con `>`, `<`, `>=`… ¡Perfecto para un `if`!\n\nEscribe en el resultado y mira cómo cambia la cuenta.",
      ejemplo: {
        html: `<label for="tuit">¿Qué estás pensando?</label>
<input id="tuit" type="text">
<p id="cuenta">0 caracteres</p>`,
        js: `const tuit = document.querySelector("#tuit");
const cuenta = document.querySelector("#cuenta");

console.log("gato".length);

tuit.addEventListener("input", () => {
  cuenta.textContent = \`\${tuit.value.length} caracteres\`;
});`
      },
      consejo: "`length` va **sin paréntesis**: no es una orden que se ejecuta, sino un dato que el texto ya tiene guardado."
    },
    {
      tipo: "ejercicio",
      enunciado: "Elige el apodo de tu jugador 🎮, pero que no sea demasiado largo. El HTML ya está escrito.\n\nCon el evento `input` del campo `#apodo`:\n• Si el apodo tiene **más de 8** caracteres, pon en `#aviso` el texto **Demasiado largo**.\n• Si no, pon **Perfecto**.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
input { padding: 8px; font-size: 18px; border-radius: 8px; border: 2px solid seagreen; }
#aviso { font-size: 20px; font-weight: bold; }`,
      inicial: {
        html: `<label for="apodo">Tu apodo:</label>
<input id="apodo" type="text">
<p id="aviso">Escribe un apodo</p>
`,
        js: ""
      },
      solucion: {
        html: `<label for="apodo">Tu apodo:</label>
<input id="apodo" type="text">
<p id="aviso">Escribe un apodo</p>
`,
        js: `const apodo = document.querySelector("#apodo");
const aviso = document.querySelector("#aviso");

apodo.addEventListener("input", () => {
  if (apodo.value.length > 8) {
    aviso.textContent = "Demasiado largo";
  } else {
    aviso.textContent = "Perfecto";
  }
});
`
      },
      acciones: [
        { escribir: "#apodo", texto: "Rayo" },
        { escribir: "#apodo", texto: "Supercampeona" },
        { escribir: "#apodo", texto: "Tormenta" }
      ],
      pistas: [
        "Escucha el evento \"input\" del campo y, dentro, un if que pregunte si apodo.value.length es mayor que 8.",
        "Debe quedarte así:\nconst apodo = document.querySelector(\"#apodo\");\nconst aviso = document.querySelector(\"#aviso\");\n\napodo.addEventListener(\"input\", () => {\n  if (apodo.value.length > 8) {\n    aviso.textContent = \"Demasiado largo\";\n  } else {\n    aviso.textContent = \"Perfecto\";\n  }\n});"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Más de dos caminos: else if, && y ||",
      texto: "¿Y si hay más de dos opciones? Encadena preguntas con `else if` («si no, si…»). Se comprueban **en orden** y solo se ejecuta la **primera** que sea `true`.\n\nTambién puedes unir preguntas:\n• `&&` («y»): `true` solo si **las dos** lo son.\n• `||` («o»): `true` si **al menos una** lo es.\n\nCon 75 puntos, ¿qué medalla toca? Míralo en la consola y piensa qué saldría con 95 o con 40.",
      ejemplo: {
        js: `const puntos = 75;

if (puntos >= 90) {
  console.log("🥇 Medalla de oro");
} else if (puntos >= 70) {
  console.log("🥈 Medalla de plata");
} else {
  console.log("Sigue entrenando 💪");
}

const dia = "sábado";
const haceSol = true;
console.log(dia === "sábado" || dia === "domingo"); // ¿es fin de semana?
console.log(dia === "sábado" && haceSol === true);  // ¿sábado y con sol?`
      },
      consejo: "El orden importa: si preguntas primero `puntos >= 70`, ¡un 95 se llevaría la plata! Pon antes la condición más exigente."
    },
    {
      tipo: "quiz",
      pregunta: "Con `const edad = 15;`, ¿qué muestra `console.log(edad >= 12 && edad < 14);`?",
      opciones: ["true", "false", "15"],
      correcta: 1,
      explicacion: "Con && las dos preguntas deben ser verdaderas. 15 >= 12 es true, pero 15 < 14 es false, así que el resultado es false."
    },
    {
      tipo: "reto",
      enunciado: "Crea un **semáforo de contraseña** 🚦. Mientras se escribe en `#clave` (evento `input`), mira cuántos caracteres tiene y pon en `#nivel`:\n\n1. Menos de 6 caracteres: el texto **débil** y el color `red`.\n2. De 6 a 9 caracteres (ambos incluidos): **media** y el color `orange`.\n3. 10 caracteres o más: **fuerte** y el color `green`.\n\nPara el color usa `nivel.style.color`.",
      cssBase: `body { font-family: sans-serif; padding: 20px; background-color: #f4f4f8; }
.caja { max-width: 320px; padding: 16px; background-color: white; border-radius: 12px; box-shadow: 0 2px 10px rgb(0 0 0 / 0.1); }
label { display: block; font-weight: bold; margin-bottom: 6px; }
input { width: 100%; box-sizing: border-box; padding: 8px; font-size: 18px; border-radius: 8px; border: 2px solid #999; }
#nivel { font-size: 22px; font-weight: bold; text-transform: uppercase; }`,
      inicial: {
        html: `<div class="caja">
  <label for="clave">Elige una contraseña</label>
  <input id="clave" type="password">
  <p id="nivel">Escribe una contraseña</p>
</div>
`,
        js: `const clave = document.querySelector("#clave");
const nivel = document.querySelector("#nivel");

clave.addEventListener("input", () => {
  const largo = clave.value.length;

  // Menos de 6: "débil" en red
  // De 6 a 9: "media" en orange
  // 10 o más: "fuerte" en green
});
`
      },
      comprobaciones: [
        {
          texto: "Con una contraseña corta, como `gato`, dice **débil** en rojo",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const n = v.doc.querySelector("#nivel");
            if (!n) return false;
            PRUEBA.escribir(v.doc.querySelector("#clave"), "gato");
            return /d[eé]bil/i.test(n.textContent) && v.win.getComputedStyle(n).color === "rgb(255, 0, 0)";
          }
        },
        {
          texto: "Con 6 caracteres (`gatito`) y con 9 (`gatito123`) dice **media** en naranja",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const n = v.doc.querySelector("#nivel");
            const c = v.doc.querySelector("#clave");
            if (!n || !c) return false;
            const esMedia = () => n.textContent.toLowerCase().includes("media") && v.win.getComputedStyle(n).color === "rgb(255, 165, 0)";
            PRUEBA.escribir(c, "gatito");
            const seis = esMedia();
            PRUEBA.escribir(c, "gatito123");
            return seis && esMedia();
          }
        },
        {
          texto: "Con 10 caracteres o más (`superclave`) dice **fuerte** en verde",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const n = v.doc.querySelector("#nivel");
            if (!n) return false;
            PRUEBA.escribir(v.doc.querySelector("#clave"), "superclave");
            return n.textContent.toLowerCase().includes("fuerte") && v.win.getComputedStyle(n).color === "rgb(0, 128, 0)";
          }
        }
      ],
      pistas: [
        "Usa if, else if y else con la variable largo. Pregunta primero si largo < 6, después si largo < 10 (si llega ahí, ya sabes que tiene 6 o más) y, si no, es fuerte. En cada caso, cambia textContent y style.color.",
        "Dentro del addEventListener, debajo de const largo, escribe:\nif (largo < 6) {\n  nivel.textContent = \"débil\";\n  nivel.style.color = \"red\";\n} else if (largo < 10) {\n  nivel.textContent = \"media\";\n  nivel.style.color = \"orange\";\n} else {\n  nivel.textContent = \"fuerte\";\n  nivel.style.color = \"green\";\n}"
      ],
      solucion: {
        html: `<div class="caja">
  <label for="clave">Elige una contraseña</label>
  <input id="clave" type="password">
  <p id="nivel">Escribe una contraseña</p>
</div>
`,
        js: `const clave = document.querySelector("#clave");
const nivel = document.querySelector("#nivel");

clave.addEventListener("input", () => {
  const largo = clave.value.length;

  if (largo < 6) {
    nivel.textContent = "débil";
    nivel.style.color = "red";
  } else if (largo < 10) {
    nivel.textContent = "media";
    nivel.style.color = "orange";
  } else {
    nivel.textContent = "fuerte";
    nivel.style.color = "green";
  }
});
`
      }
    }
  ]
});
