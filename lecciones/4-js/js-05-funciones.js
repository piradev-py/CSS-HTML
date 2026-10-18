/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-05
   Funciones — function (definir una «receta»), llamar a una
   función, parámetros, return y funciones flecha (solo
   presentación: se usarán en js-06 con los eventos).
   Notas:
   - ¡OJO! Ejemplos y soluciones con plantillas de texto llevan las
     comillas invertidas y los ${ escapados (\` y \${).
   - El primer ejercicio es solo de consola: lleva pestanas: ["js"]
     en el propio paso (leccion.js usa paso.pestanas si existe).
   - El reto usa win.eval("…") para llamar a la función del alumno:
     así vale tanto «function saludar» como «const saludar = () =>»
     (una const global no queda como propiedad de window, pero sí es
     visible para un eval indirecto en el ámbito global del marco).
   ============================================================ */
CURSO.registrar({
  id: "js-05",
  titulo: "Funciones",
  xp: 40,
  objetivo: "Sabrás agrupar instrucciones en funciones reutilizables, darles datos con parámetros y recibir un resultado con return.",
  glosario: [
    { termino: "function", tema: "Funciones", para: "Una receta con nombre: se escribe una vez y se usa muchas.", ejemplo: "function saludar(nombre) {\n  return \"Hola, \" + nombre;\n}", buscar: "funcion receta reutilizar" },
    { termino: "parámetros y return", tema: "Funciones", para: "Lo que recibe la función y lo que devuelve.", ejemplo: "function doble(n) {\n  return n * 2;\n}\nconsole.log(doble(4));", buscar: "parametro devolver resultado" },
    { termino: "función flecha", tema: "Funciones", para: "La forma corta de escribir una función.", ejemplo: "const doble = (n) => n * 2;", buscar: "flecha arrow corta" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Una función es una receta",
      texto: "Imagina que cada vez que quieres un bizcocho tienes que volver a pensar todos los pasos. ¡Qué pereza! Mejor escribes la **receta** una vez y, cuando quieras bizcocho, la sigues. 🎂\n\nUna **función** es eso: un grupo de instrucciones con nombre.\n\n• **Definirla** es escribir la receta: `function`, un nombre, unos paréntesis `()` y, entre llaves `{ }`, las instrucciones. Escribir la receta **no** cocina nada.\n• **Llamarla** es cocinar: su nombre seguido de `()`. Por ejemplo, `cantarCumple();`.\n\nPuedes llamarla todas las veces que quieras. En el ejemplo se llama **dos** veces.",
      ejemplo: {
        js: `function cantarCumple() {
  console.log("Cumpleaños feliz 🎂");
  console.log("te deseamos a ti");
}

cantarCumple();
cantarCumple();`
      },
      consejo: "Para llamar a una función, no olvides los paréntesis: `cantarCumple` a secas no hace nada; `cantarCumple()` sí la ejecuta."
    },
    {
      tipo: "explicacion",
      titulo: "Parámetros: los ingredientes",
      texto: "Una receta de batido sirve para muchas frutas: «bate **la fruta** con leche». La fruta cambia cada vez. 🥤\n\nEn las funciones, eso que cambia es un **parámetro**: una variable que va entre los paréntesis al definir la función.\n\n`function saludar(nombre) { … }`\n\nAl llamarla, le das el valor: `saludar(\"Ana\")`. Dentro de la función, `nombre` vale `\"Ana\"`. En la siguiente llamada puede valer otra cosa.\n\n¿Necesitas varios ingredientes? Sepáralos con **comas**: `function presentar(nombre, edad)`.",
      ejemplo: {
        js: `function saludar(nombre) {
  console.log(\`¡Hola, \${nombre}! 👋\`);
}

saludar("Ana");
saludar("Leo");

function presentar(nombre, edad) {
  console.log(\`\${nombre} tiene \${edad} años\`);
}

presentar("Luna", 4);`
      },
      consejo: "Al llamar, los valores van en el mismo orden que los parámetros: en `presentar(\"Luna\", 4)`, el primero es el nombre y el segundo, la edad."
    },
    {
      tipo: "ejercicio",
      pestanas: ["js"],
      enunciado: "Presenta a tus mascotas 🐾:\n\n• Crea una función `presentar` con un parámetro `mascota` que muestre en la consola, con una plantilla de texto, **Mi mascota se llama** seguido del nombre.\n• Después, llámala dos veces: con `\"Luna\"` y con `\"Tofu\"`.\n\nEn la consola deben salir **Mi mascota se llama Luna** y **Mi mascota se llama Tofu**.",
      solucion: {
        js: `function presentar(mascota) {
  console.log(\`Mi mascota se llama \${mascota}\`);
}

presentar("Luna");
presentar("Tofu");
`
      },
      pistas: [
        "Escribe function presentar(mascota) { … } y, entre las llaves, un console.log con una plantilla (comillas invertidas) que tenga el hueco ${mascota}. Fuera de las llaves, llama a la función dos veces.",
        "Son estas líneas:\nfunction presentar(mascota) {\n  console.log( …plantilla con: Mi mascota se llama ${mascota}… );\n}\npresentar(\"Luna\");\npresentar(\"Tofu\");"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "return: la función te devuelve algo",
      texto: "Hasta ahora las funciones **mostraban** cosas en la consola. Pero muchas veces quieres que te **devuelvan** un resultado para usarlo tú, como una exprimidora: metes naranjas y te **devuelve** zumo. 🍊\n\nPara eso está `return` («devolver»): `return cantidad * 8;`\n\nEl resultado aparece justo donde llamaste a la función, así que puedes guardarlo en una variable o ponerlo en la página con `textContent`.\n\nOjo: `return` también **termina** la función. Lo que escribas debajo, dentro de ella, ya no se ejecuta.",
      ejemplo: {
        html: `<p>🍕 Cinco pizzas cuestan: <strong id="total"></strong></p>`,
        js: `function precioPizzas(cantidad) {
  return cantidad * 8;
}

const tres = precioPizzas(3);
console.log(tres);

const caja = document.querySelector("#total");
caja.textContent = \`\${precioPizzas(5)} €\`;`
      },
      consejo: "`console.log` solo **enseña** un valor en la consola; `return` lo **entrega** para que puedas usarlo. Son cosas distintas."
    },
    {
      tipo: "ejercicio",
      enunciado: "En la tienda de chuches 🍬 cada chuche cuesta 2 €. El HTML ya está escrito.\n\n• Crea una función `total` con un parámetro `cantidad` que **devuelva** (con `return`) `cantidad * 2`.\n• Busca `#total` y pon en su `textContent` lo que devuelve `total(6)`. Debe salir **12**.",
      cssBase: `body { font-family: sans-serif; }
h2 { color: #c2255c; }
#total { font-weight: bold; color: #c2255c; }`,
      inicial: {
        html: `<h2>Tienda de chuches</h2>
<p>Seis chuches cuestan: <span id="total"></span> €</p>
`,
        js: ""
      },
      solucion: {
        html: `<h2>Tienda de chuches</h2>
<p>Seis chuches cuestan: <span id="total"></span> €</p>
`,
        js: `function total(cantidad) {
  return cantidad * 2;
}

const precio = document.querySelector("#total");
precio.textContent = total(6);
`
      },
      pistas: [
        "Dentro de la función solo hace falta una línea: return cantidad * 2; Después, busca #total con querySelector y a su .textContent dale total(6).",
        "Debe quedarte así:\nfunction total(cantidad) {\n  return cantidad * 2;\n}\nconst precio = document.querySelector(\"#total\");\nprecio.textContent = total(6);"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Funciones flecha: la forma corta",
      texto: "Hay otra forma de escribir funciones que verás **muchísimo**: las **funciones flecha**. Se llaman así por su `=>` (un igual y un «mayor que»).\n\n`const triple = (numero) => { return numero * 3; };`\n\nSe guardan en una constante y se llaman igual que las demás: `triple(10)`.\n\nY si lo único que hace es devolver algo, puedes quitar las llaves y el `return`: `const mitad = (numero) => numero / 2;`\n\nDe momento basta con que las reconozcas: en la próxima lección, con los eventos, las usarás a menudo. ➡️",
      ejemplo: {
        js: `// Forma clásica
function doble(numero) {
  return numero * 2;
}

// Función flecha: hace lo mismo
const triple = (numero) => {
  return numero * 3;
};

// Flecha corta: solo devuelve algo
const mitad = (numero) => numero / 2;

console.log(doble(10));
console.log(triple(10));
console.log(mitad(10));`
      },
      consejo: "Las dos formas son correctas. Usa la que te resulte más clara; con el tiempo, la flecha te saldrá sola."
    },
    {
      tipo: "quiz",
      pregunta: "Escribes function saludar() { console.log(\"Hola\"); } y nada más. ¿Qué sale en la consola?",
      opciones: [
        "Hola",
        "Nada: la función está definida, pero nadie la ha llamado",
        "Un error, porque falta el return"
      ],
      correcta: 1,
      explicacion: "Definir una función es escribir la receta, no cocinarla. Hasta que no escribas saludar(); no se ejecuta nada. Y return no es obligatorio: solo se usa cuando quieres devolver un resultado."
    },
    {
      tipo: "reto",
      enunciado: "Da la bienvenida al club de lectura 📚. El HTML ya está escrito; tú, en la pestaña JS:\n\n1. Crea una función `saludar` con un parámetro `nombre` que **devuelva** (con `return`) un saludo que incluya ese nombre, por ejemplo: «¡Hola, Ana! Te damos la bienvenida al club.».\n2. Usa la función para poner en `#saludo1` el saludo para **Ana**.\n3. Úsala otra vez para poner en `#saludo2` el saludo para **Leo**.",
      cssBase: `body { font-family: Georgia, serif; color: #343a40; background-color: #f8f0e3; padding: 8px 16px; }
h1 { color: #862e9c; }
p { font-size: 20px; }`,
      inicial: {
        html: `<h1>Club de lectura</h1>
<p id="saludo1"></p>
<p id="saludo2"></p>
`,
        js: `// 1. Crea la función saludar(nombre) que DEVUELVA un saludo con ese nombre

// 2. Pon en #saludo1 el saludo para Ana

// 3. Pon en #saludo2 el saludo para Leo

`
      },
      comprobaciones: [
        {
          texto: "Existe una función llamada `saludar`",
          prueba: (doc, win) => {
            try { return win.eval("typeof saludar") === "function"; } catch (e) { return false; }
          }
        },
        {
          texto: "`saludar(\"Zoe\")` devuelve (con `return`) un saludo que incluye «Zoe»",
          prueba: (doc, win) => {
            try {
              const r = win.eval("saludar(\"Zoe\")");
              return typeof r === "string" && r.includes("Zoe");
            } catch (e) { return false; }
          }
        },
        {
          texto: "En `#saludo1` aparece el saludo que la función devuelve para Ana",
          prueba: (doc, win) => {
            try {
              const t = doc.querySelector("#saludo1")?.textContent || "";
              return t.includes("Ana") && t === String(win.eval("saludar(\"Ana\")"));
            } catch (e) { return false; }
          }
        },
        {
          texto: "En `#saludo2` aparece el saludo que la función devuelve para Leo",
          prueba: (doc, win) => {
            try {
              const t = doc.querySelector("#saludo2")?.textContent || "";
              return t.includes("Leo") && t === String(win.eval("saludar(\"Leo\")"));
            } catch (e) { return false; }
          }
        }
      ],
      pistas: [
        "Dentro de la función, return y el saludo: puedes usar una plantilla de texto con el hueco ${nombre}. Después busca #saludo1 y #saludo2 y, en el textContent de cada uno, pon lo que devuelve saludar(\"Ana\") y saludar(\"Leo\").",
        "Por ejemplo:\nfunction saludar(nombre) {\n  return \"¡Hola, \" + nombre + \"! Te damos la bienvenida al club.\";\n}\nconst saludo1 = document.querySelector(\"#saludo1\");\nsaludo1.textContent = saludar(\"Ana\");\nconst saludo2 = document.querySelector(\"#saludo2\");\nsaludo2.textContent = saludar(\"Leo\");"
      ],
      solucion: {
        html: `<h1>Club de lectura</h1>
<p id="saludo1"></p>
<p id="saludo2"></p>
`,
        js: `// 1. Crea la función saludar(nombre) que DEVUELVA un saludo con ese nombre
function saludar(nombre) {
  return \`¡Hola, \${nombre}! Te damos la bienvenida al club.\`;
}

// 2. Pon en #saludo1 el saludo para Ana
const saludo1 = document.querySelector("#saludo1");
saludo1.textContent = saludar("Ana");

// 3. Pon en #saludo2 el saludo para Leo
const saludo2 = document.querySelector("#saludo2");
saludo2.textContent = saludar("Leo");
`
      }
    }
  ]
});
