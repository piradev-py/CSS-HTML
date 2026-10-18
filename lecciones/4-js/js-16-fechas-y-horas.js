/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-16 (se ve como la 12)
   Fechas y horas — new Date(), getFullYear() (el año del pie),
   getHours()/getMinutes(), la fecha de hoy como texto
   "AAAA-MM-DD" con toLocaleDateString("sv-SE") y comparar fechas
   y horas como textos ("2026-10-20" >= hoy, "09:30" >= "09:00").
   Notas:
   - El id es js-16 aunque va entre js-15 y js-11: los ids no se
     cambian nunca (el progreso guardado va por id).
   - Es lo que usa «Huellas»: el año del pie y comprobar que la
     cita es a partir de hoy y dentro del horario.
   - Los ejercicios con la hora de verdad se revisan bien porque el
     alumno y la solución se ejecutan a la vez. El reto calcula
     ayer, hoy y mañana en la propia comprobación.
   - No se enseña restar fechas (necesitaría Math.round): el reto
     dice «ya pasó / es hoy / todavía falta» en vez de «faltan X días».
   ============================================================ */
CURSO.registrar({
  id: "js-16",
  titulo: "Fechas y horas",
  xp: 40,
  objetivo: "Sabrás leer la fecha y la hora del ordenador, escribir la fecha de hoy como texto y comparar fechas y horas.",
  glosario: [
    { termino: "new Date()", tema: "Fechas", para: "La fecha y la hora de ahora.", ejemplo: "const ahora = new Date();", buscar: "fecha hora ahora reloj" },
    { termino: "getFullYear()", tema: "Fechas", para: "El año de una fecha (el del pie de la web).", ejemplo: "document.querySelector(\"#anio\").textContent = new Date().getFullYear();", buscar: "ano year pie" },
    { termino: "toLocaleDateString(\"sv-SE\")", tema: "Fechas", para: "La fecha como texto `AAAA-MM-DD`, igual que la de un campo `date`.", ejemplo: "const hoy = new Date().toLocaleDateString(\"sv-SE\");", buscar: "fecha hoy texto formato" },
    { termino: "comparar fechas y horas", tema: "Fechas", para: "Como textos con sus ceros, `\"2026-10-21\" >= hoy` funciona.", ejemplo: "if (campoFecha.value >= hoy) {\n  console.log(\"No ha pasado\");\n}", buscar: "comparar fecha pasada futura hora" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "El reloj del ordenador: new Date()",
      texto: "JavaScript puede mirar el reloj del ordenador. `new Date()` te da un **objeto fecha** con el día y la hora de **este momento** 🕰️.\n\nDe ese objeto sacas cada dato con su orden:\n\n• `getFullYear()`: el año, por ejemplo `2026`.\n• `getHours()`: la hora, de `0` a `23`.\n• `getMinutes()`: los minutos, de `0` a `59`.\n\nLo más típico: el año del pie de página. Si lo escribes a mano en el HTML, el 1 de enero tu web se queda vieja; con `getFullYear()` se cambia sola.",
      ejemplo: {
        html: `<footer>© <span id="anio"></span> Tagui Pizza</footer>`,
        js: `const ahora = new Date();

console.log(ahora);
console.log(ahora.getFullYear());
console.log(\`Son las \${ahora.getHours()} y \${ahora.getMinutes()}\`);

document.querySelector("#anio").textContent = ahora.getFullYear();`
      },
      consejo: "Pulsa 🔄 Recargar dentro de un minuto: verás cambiar los minutos. ¡La hora es la de tu ordenador, cada vez que se ejecuta el código!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Que el pie del club no se quede viejo nunca 📅. El HTML ya tiene un `<span id=\"anio\"></span>` vacío.\n\nEn la pestaña JS, pon como texto de `#anio` el **año actual**, con `new Date()` y `getFullYear()`.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
footer { padding: 12px; background-color: #2b2238; color: white; border-radius: 10px; text-align: center; }`,
      inicial: {
        html: `<h2>♟️ Club de ajedrez</h2>
<footer>© <span id="anio"></span> Club de ajedrez del barrio</footer>
`,
        js: ""
      },
      solucion: {
        html: `<h2>♟️ Club de ajedrez</h2>
<footer>© <span id="anio"></span> Club de ajedrez del barrio</footer>
`,
        js: `document.querySelector("#anio").textContent = new Date().getFullYear();
`
      },
      pistas: [
        "Busca #anio con querySelector y cámbiale el textContent. El año sale de new Date().getFullYear().",
        "Debe quedarte así:\ndocument.querySelector(\"#anio\").textContent = new Date().getFullYear();"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "La fecha de hoy como texto",
      texto: "Para comparar fechas, lo más cómodo es tenerlas como **texto** con el formato `AAAA-MM-DD`: año, mes y día, con ceros delante. Por ejemplo `\"2026-10-18\"`.\n\n¿Por qué ese? Porque es **justo** el que da un campo `<input type=\"date\">` en su `value`.\n\nLa fecha de hoy con ese formato sale así:\n\n`new Date().toLocaleDateString(\"sv-SE\")`\n\n`toLocaleDateString` escribe la fecha como se hace en un país. `\"sv-SE\"` es Suecia, que la escribe justo así. 🇸🇪 Para enseñársela a una persona en España, usa `\"es-ES\"`: `18/10/2026`.",
      ejemplo: {
        js: `const ahora = new Date();

console.log(ahora.toLocaleDateString("sv-SE"));
console.log(ahora.toLocaleDateString("es-ES"));`
      },
      consejo: "Por internet verás `toISOString()` para esto. ¡Ojo! Da la fecha de Londres, no la tuya: en España, justo después de medianoche te diría que aún es ayer."
    },
    {
      tipo: "explicacion",
      titulo: "Comparar fechas y horas",
      texto: "Con el formato `AAAA-MM-DD`, comparar fechas es facilísimo: los textos se comparan letra a letra, como en el diccionario, y como el año va primero, luego el mes y luego el día, **el orden de los textos es el orden del calendario**.\n\n`\"2026-10-20\" >= \"2026-10-18\"` → `true`\n\nCon las horas pasa lo mismo, si van como `HH:MM` (lo que da un `<input type=\"time\">`):\n\n`\"09:30\" >= \"09:00\"` → `true`\n\nEl truco funciona **solo** si todas llevan sus ceros: `\"9:30\"` comparado con `\"10:00\"` falla, porque el `9` va después del `1`.",
      ejemplo: {
        html: `<label for="dia">Elige un día:</label>
<input type="date" id="dia">
<p id="respuesta"></p>`,
        js: `const campo = document.querySelector("#dia");
const respuesta = document.querySelector("#respuesta");
const hoy = new Date().toLocaleDateString("sv-SE");

campo.addEventListener("change", () => {
  if (campo.value >= hoy) {
    respuesta.textContent = "✅ Ese día todavía no ha pasado";
  } else {
    respuesta.textContent = "⌛ Ese día ya pasó";
  }
});`
      }
    },
    {
      tipo: "ejercicio",
      pestanas: ["js"],
      enunciado: "¿Está abierta la panadería? 🥐 Abre de **07:30** a **14:00**. La variable `hora` ya está escrita. Debajo:\n\n• Si `hora` es **mayor o igual** que `\"07:30\"` **y** **menor o igual** que `\"14:00\"`, muestra en la consola **Abierto**.\n• Si no, muestra **Cerrado**.\n\nPrueba a cambiar la hora para ver los dos casos, pero deja `\"13:45\"` al revisar.",
      inicial: {
        html: "",
        js: `const hora = "13:45";

`
      },
      solucion: {
        html: "",
        js: `const hora = "13:45";

if (hora >= "07:30" && hora <= "14:00") {
  console.log("Abierto");
} else {
  console.log("Cerrado");
}
`
      },
      pistas: [
        "Las dos condiciones van unidas con && dentro del if: hora >= \"07:30\" && hora <= \"14:00\". Las horas, entre comillas: son textos.",
        "Debajo de la variable escribe:\nif (hora >= \"07:30\" && hora <= \"14:00\") {\n  console.log(\"Abierto\");\n} else {\n  console.log(\"Cerrado\");\n}"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "¿Cuál de estas comparaciones da un resultado equivocado?",
      opciones: [
        "\"2026-03-05\" < \"2026-12-01\"",
        "\"9:30\" < \"10:00\"",
        "\"08:15\" < \"20:00\""
      ],
      correcta: 1,
      explicacion: "\"9:30\" < \"10:00\" da false, aunque las 9:30 van antes que las 10:00: los textos se comparan letra a letra y el 9 va después del 1. Con su cero, \"09:30\" < \"10:00\" sí da true."
    },
    {
      tipo: "reto",
      enunciado: "📆 Haz un **comprobador de fechas** para la agenda del cole.\n\n1. Pon en `#anio` el año actual.\n2. Al pulsar `#comprobar`, mira el día elegido en `#dia` y escribe en `#mensaje`:\n   • **Ya pasó** si es antes de hoy.\n   • **Es hoy** si es hoy.\n   • **Todavía falta** si es después de hoy.\n\nPara la fecha de hoy, usa `toLocaleDateString(\"sv-SE\")`.",
      cssBase: `body { font-family: sans-serif; padding: 12px; background-color: #eef6ff; }
.agenda { max-width: 320px; padding: 16px; border-radius: 14px; background-color: white; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
h2 { margin-top: 0; color: #1f5fcc; }
input, button { padding: 8px; font-size: 16px; }
button { border: none; border-radius: 8px; background-color: #1f5fcc; color: white; }
#mensaje { font-size: 20px; font-weight: bold; }
footer { margin-top: 12px; color: #6d6278; }`,
      inicial: {
        html: `<section class="agenda">
  <h2>📆 ¿Cuándo es?</h2>
  <label for="dia">Día:</label>
  <input type="date" id="dia">
  <button id="comprobar">Comprobar</button>
  <p id="mensaje"></p>
</section>
<footer>© <span id="anio"></span> Agenda del cole</footer>
`,
        js: `const campo = document.querySelector("#dia");
const mensaje = document.querySelector("#mensaje");

// 1. El año actual en #anio


// 2. Al pulsar #comprobar: «Ya pasó», «Es hoy» o «Todavía falta»
`
      },
      comprobaciones: [
        {
          texto: "En el pie sale el año actual",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            return v.doc.querySelector("#anio")?.textContent.trim() === String(new Date().getFullYear());
          }
        },
        {
          texto: "Con el día de **ayer** dice «Ya pasó»",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const d = new Date();
            d.setDate(d.getDate() - 1);
            PRUEBA.escribir(v.doc.querySelector("#dia"), d.toLocaleDateString("sv-SE"));
            v.doc.querySelector("#comprobar")?.click();
            const t = (v.doc.querySelector("#mensaje")?.textContent || "").toLowerCase();
            return t.includes("pas") && !t.includes("hoy") && !t.includes("falta");
          }
        },
        {
          texto: "Con el día de **hoy** dice «Es hoy»",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            PRUEBA.escribir(v.doc.querySelector("#dia"), new Date().toLocaleDateString("sv-SE"));
            v.doc.querySelector("#comprobar")?.click();
            const t = (v.doc.querySelector("#mensaje")?.textContent || "").toLowerCase();
            return t.includes("hoy") && !t.includes("pas") && !t.includes("falta");
          }
        },
        {
          texto: "Con el día de **mañana** dice «Todavía falta»",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const d = new Date();
            d.setDate(d.getDate() + 1);
            PRUEBA.escribir(v.doc.querySelector("#dia"), d.toLocaleDateString("sv-SE"));
            v.doc.querySelector("#comprobar")?.click();
            const t = (v.doc.querySelector("#mensaje")?.textContent || "").toLowerCase();
            return t.includes("falta") && !t.includes("hoy") && !t.includes("pas");
          }
        }
      ],
      pistas: [
        "Guarda la fecha de hoy en una constante: const hoy = new Date().toLocaleDateString(\"sv-SE\");. En el clic, compara campo.value con hoy usando un if, un else if y un else: menor que (<), igual (===) y lo demás.",
        "Te debe quedar así:\ndocument.querySelector(\"#anio\").textContent = new Date().getFullYear();\nconst hoy = new Date().toLocaleDateString(\"sv-SE\");\n\ndocument.querySelector(\"#comprobar\").addEventListener(\"click\", () => {\n  if (campo.value < hoy) {\n    mensaje.textContent = \"Ya pasó\";\n  } else if (campo.value === hoy) {\n    mensaje.textContent = \"Es hoy\";\n  } else {\n    mensaje.textContent = \"Todavía falta\";\n  }\n});"
      ],
      solucion: {
        html: `<section class="agenda">
  <h2>📆 ¿Cuándo es?</h2>
  <label for="dia">Día:</label>
  <input type="date" id="dia">
  <button id="comprobar">Comprobar</button>
  <p id="mensaje"></p>
</section>
<footer>© <span id="anio"></span> Agenda del cole</footer>
`,
        js: `const campo = document.querySelector("#dia");
const mensaje = document.querySelector("#mensaje");

document.querySelector("#anio").textContent = new Date().getFullYear();
const hoy = new Date().toLocaleDateString("sv-SE");

document.querySelector("#comprobar").addEventListener("click", () => {
  if (campo.value < hoy) {
    mensaje.textContent = "Ya pasó";
  } else if (campo.value === hoy) {
    mensaje.textContent = "Es hoy";
  } else {
    mensaje.textContent = "Todavía falta";
  }
});
`
      }
    }
  ]
});
