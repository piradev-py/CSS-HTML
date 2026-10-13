/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-06
   Eventos — qué es un evento, addEventListener, click, input,
   una función como respuesta, variables que cambian con cada
   clic (contador = contador + 1, += y ++) y leer lo escrito en
   un campo con campo.value (js-11 lo repasa y añade .trim()).
   Notas:
   - Todos los ejercicios llevan `acciones`: sin ellas se
     aprobarían con el editor vacío.
   - El ejercicio del interruptor detecta el error de escribir
     encender() con paréntesis: la luz saldría ya encendida y la
     página inicial no coincidiría.
   - El reto usa PRUEBA.recargar en cada comprobación para que
     los clics de una no se sumen a los de la siguiente.
   - Cuidado: los ${…} de los ejemplos van escapados (\${…}).
   ============================================================ */
CURSO.registrar({
  id: "js-06",
  titulo: "Eventos",
  xp: 45,
  objetivo: "Sabrás hacer que tu página reaccione cuando alguien pulsa un botón o escribe en un campo.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "La página escucha",
      texto: "Un **evento** es algo que pasa en la página: un clic, una tecla, el ratón que se mueve… Es como el timbre de casa 🔔: tú no estás todo el rato mirando la puerta, pero **cuando suena**, vas a abrir.\n\nCon `addEventListener` («añade alguien que escuche») le dices a un elemento: «cuando te pase **esto**, haz **esto otro**». Le pasas dos cosas:\n\n1. El nombre del evento, entre comillas: `\"click\"` (pulsar).\n2. La función que se ejecutará cada vez que ocurra.\n\nPulsa el botón del resultado y mira la página y la consola.",
      ejemplo: {
        html: `<button id="saludar">Pulsa aquí</button>
<p id="mensaje">Todavía nadie me ha pulsado.</p>`,
        js: `const boton = document.querySelector("#saludar");
const mensaje = document.querySelector("#mensaje");

function decirHola() {
  mensaje.textContent = "¡Hola! Me has pulsado 👋";
  console.log("Clic en el botón");
}

boton.addEventListener("click", decirHola);`
      },
      consejo: "Escribe `decirHola` **sin paréntesis**. Si pones `decirHola()`, la función se ejecuta en ese mismo momento, sin esperar al clic. ¡Es el despiste número uno con los eventos!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Haz que funcione el interruptor de la bombilla. El HTML ya está escrito.\n\n• Busca el botón `#interruptor` y el párrafo `#bombilla`.\n• Crea una función que cambie el texto de `#bombilla` a **Encendida** y le añada la clase `encendida`.\n• Haz que esa función se ejecute con el evento `click` del botón `#interruptor`.\n\nAl principio la bombilla debe seguir **Apagada**: solo se enciende al pulsar.",
      cssBase: `body { font-family: sans-serif; text-align: center; padding-top: 20px; }
.bombilla { display: inline-block; padding: 16px 28px; font-size: 22px; border-radius: 40px; background-color: #ddd; color: #555; }
.bombilla::before { content: "💡 "; }
.encendida { background-color: gold; color: #5a4400; box-shadow: 0 0 30px gold; }
button { display: block; margin: 20px auto 0; padding: 10px 20px; font-size: 18px; border: none; border-radius: 8px; background-color: slateblue; color: white; }`,
      inicial: {
        html: `<p id="bombilla" class="bombilla">Apagada</p>
<button id="interruptor">Encender</button>
`,
        js: ""
      },
      solucion: {
        html: `<p id="bombilla" class="bombilla">Apagada</p>
<button id="interruptor">Encender</button>
`,
        js: `const interruptor = document.querySelector("#interruptor");
const bombilla = document.querySelector("#bombilla");

function encender() {
  bombilla.textContent = "Encendida";
  bombilla.classList.add("encendida");
}

interruptor.addEventListener("click", encender);
`
      },
      acciones: [{ clic: "#interruptor" }],
      pistas: [
        "Primero guarda los dos elementos en constantes con document.querySelector. Después escribe la función con las dos órdenes (textContent y classList.add). Por último, interruptor.addEventListener(\"click\", …) con el nombre de la función, sin paréntesis.",
        "Debe quedarte así:\nconst interruptor = document.querySelector(\"#interruptor\");\nconst bombilla = document.querySelector(\"#bombilla\");\n\nfunction encender() {\n  bombilla.textContent = \"Encendida\";\n  bombilla.classList.add(\"encendida\");\n}\n\ninterruptor.addEventListener(\"click\", encender);"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Contar clics",
      texto: "¿Y si quieres contar cuántas veces se pulsa? Guarda la cuenta en una variable con `let` (con `const` no se podría cambiar) y, **dentro** de la función, súmale 1:\n\n`clics = clics + 1;`\n\nSe lee de derecha a izquierda: «coge lo que vale `clics`, súmale 1 y guárdalo otra vez en `clics`». Hay dos atajos que hacen lo mismo: `clics += 1;` y `clics++;`.\n\nFíjate también en el ejemplo: la función va escrita **dentro** del `addEventListener`, como función flecha `() => { … }`. Es muy habitual cuando la función solo se usa ahí.",
      ejemplo: {
        html: `<button id="galleta">🍪 Cómete una galleta</button>
<p>Galletas comidas: <span id="cuenta">0</span></p>`,
        js: `let clics = 0;
const galleta = document.querySelector("#galleta");
const cuenta = document.querySelector("#cuenta");

galleta.addEventListener("click", () => {
  clics = clics + 1;
  cuenta.textContent = clics;
  console.log(\`Llevas \${clics} galletas\`);
});`
      },
      consejo: "La variable `let clics = 0;` va **fuera** de la función. Si la pones dentro, vuelve a empezar en 0 en cada clic y tu contador nunca pasará de 1. 😅"
    },
    {
      tipo: "explicacion",
      titulo: "Escuchar lo que se escribe: input y value",
      texto: "Los campos de texto (`<input>`) tienen su propio evento: `\"input\"`. Salta **cada vez** que cambia lo escrito: con cada letra que pones o borras.\n\nPara saber qué hay escrito, lee la propiedad `value` (valor) del campo: `campo.value`. Siempre es un **texto**, aunque escribas números.\n\nEscribe en el campo del resultado y mira cómo el título cambia a la vez que tecleas. ⌨️",
      ejemplo: {
        html: `<label for="titulo">Título de tu película:</label>
<input id="titulo" type="text">
<h2 id="cartel">(sin título)</h2>`,
        js: `const campo = document.querySelector("#titulo");
const cartel = document.querySelector("#cartel");

campo.addEventListener("input", () => {
  cartel.textContent = \`🎬 \${campo.value}\`;
});`
      },
      consejo: "`value` es lo que hay escrito en el campo; `textContent` es el texto de una etiqueta normal, como un `<p>`. En un `<input>`, `textContent` siempre está vacío."
    },
    {
      tipo: "ejercicio",
      enunciado: "Saluda a la mascota mientras se escribe su nombre. El HTML ya está escrito.\n\n• Escucha el evento `input` del campo `#nombre`.\n• Cada vez que salte, pon en el párrafo `#saludo` el texto **Hola, ** seguido de lo que hay escrito en el campo. Si se escribe `Toby`, debe decir **Hola, Toby**.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
label { display: block; margin-bottom: 6px; font-weight: bold; }
input { padding: 8px; font-size: 18px; border: 2px solid #c2410c; border-radius: 8px; }
#saludo { font-size: 24px; color: #c2410c; }`,
      inicial: {
        html: `<label for="nombre">¿Cómo se llama tu mascota?</label>
<input id="nombre" type="text">
<p id="saludo">🐾</p>
`,
        js: ""
      },
      solucion: {
        html: `<label for="nombre">¿Cómo se llama tu mascota?</label>
<input id="nombre" type="text">
<p id="saludo">🐾</p>
`,
        js: `const nombre = document.querySelector("#nombre");
const saludo = document.querySelector("#saludo");

nombre.addEventListener("input", () => {
  saludo.textContent = \`Hola, \${nombre.value}\`;
});
`
      },
      acciones: [
        { escribir: "#nombre", texto: "Toby" },
        { escribir: "#nombre", texto: "Misi" }
      ],
      pistas: [
        "Guarda el campo y el párrafo en constantes. Luego nombre.addEventListener(\"input\", () => { … }) y, dentro, cambia el textContent de #saludo usando nombre.value.",
        "Debe quedarte así:\nconst nombre = document.querySelector(\"#nombre\");\nconst saludo = document.querySelector(\"#saludo\");\n\nnombre.addEventListener(\"input\", () => {\n  saludo.textContent = \"Hola, \" + nombre.value;\n});\n(También vale con una plantilla de texto con comillas invertidas.)"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Tienes la función `saltar()` y quieres que se ejecute al pulsar un botón. ¿Qué línea es la correcta?",
      opciones: [
        "boton.addEventListener(\"click\", saltar);",
        "boton.addEventListener(\"click\", saltar());",
        "boton.addEventListener(click, saltar);"
      ],
      correcta: 0,
      explicacion: "Se pasa la función por su nombre, sin paréntesis, para que el navegador la llame cuando llegue el clic. Con saltar() se ejecutaría ya mismo, y el nombre del evento va entre comillas: \"click\"."
    },
    {
      tipo: "reto",
      enunciado: "Crea el botón de **me gusta** ❤️ de tu red social:\n\n1. Cada vez que se pulse el botón `#me-gusta`, el contador `#contador` debe **sumar 1** (empieza en 0).\n2. Al pulsarlo, añade también al botón la clase `activo` (se pondrá rojo) con `classList.add`.",
      cssBase: `body { font-family: sans-serif; display: flex; justify-content: center; padding-top: 30px; background-color: #f4f4f8; }
.publicacion { width: 280px; padding: 16px; background-color: white; border-radius: 16px; box-shadow: 0 2px 10px rgb(0 0 0 / 0.1); text-align: center; }
.foto { font-size: 80px; margin: 0; }
#me-gusta { padding: 10px 20px; font-size: 18px; border: 2px solid crimson; border-radius: 30px; background-color: white; color: crimson; }
#me-gusta.activo { background-color: crimson; color: white; }`,
      inicial: {
        html: `<article class="publicacion">
  <p class="foto">🐶</p>
  <p>Toby en la playa</p>
  <button id="me-gusta">❤️ Me gusta</button>
  <p><span id="contador">0</span> me gusta</p>
</article>
`,
        js: `const boton = document.querySelector("#me-gusta");
const contador = document.querySelector("#contador");

// 1. Crea una variable con let para contar los me gusta (empieza en 0)

// 2. Escucha el clic del botón y, dentro:
//    - suma 1 a tu variable
//    - pon su valor en el contador
//    - añade la clase "activo" al botón
`
      },
      comprobaciones: [
        {
          texto: "Al pulsar el botón una vez, el contador marca **1**",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            v.doc.querySelector("#me-gusta")?.click();
            return v.doc.querySelector("#contador")?.textContent.trim() === "1";
          }
        },
        {
          texto: "Al pulsarlo tres veces, marca **3**: suma 1 en cada clic",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const b = v.doc.querySelector("#me-gusta");
            if (!b) return false;
            b.click(); b.click(); b.click();
            return v.doc.querySelector("#contador")?.textContent.trim() === "3";
          }
        },
        {
          texto: "Al principio el botón no tiene la clase `activo`, y al pulsarlo sí",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const b = v.doc.querySelector("#me-gusta");
            if (!b || b.classList.contains("activo")) return false;
            b.click();
            return b.classList.contains("activo");
          }
        }
      ],
      pistas: [
        "Necesitas let meGusta = 0; fuera de la función (si la pones dentro, vuelve a 0 en cada clic). Luego boton.addEventListener(\"click\", () => { … }) y, dentro, las tres órdenes: sumar, pintar y añadir la clase.",
        "Te debe quedar así:\nlet meGusta = 0;\n\nboton.addEventListener(\"click\", () => {\n  meGusta = meGusta + 1;\n  contador.textContent = meGusta;\n  boton.classList.add(\"activo\");\n});"
      ],
      solucion: {
        html: `<article class="publicacion">
  <p class="foto">🐶</p>
  <p>Toby en la playa</p>
  <button id="me-gusta">❤️ Me gusta</button>
  <p><span id="contador">0</span> me gusta</p>
</article>
`,
        js: `const boton = document.querySelector("#me-gusta");
const contador = document.querySelector("#contador");

let meGusta = 0;

boton.addEventListener("click", () => {
  meGusta = meGusta + 1;
  contador.textContent = meGusta;
  boton.classList.add("activo");
});
`
      }
    }
  ]
});
