/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-03
   Seleccionar elementos (DOM) — el DOM como árbol de la página,
   document, querySelector(), querySelectorAll() (solo para verla
   en la consola: recorrer listas llega en js-08) y leer
   textContent.
   Notas:
   - Desde aquí hay HTML: viene escrito en inicial.html y el alumno
     solo escribe JS. La solución repite exactamente ese HTML.
   - No se usan plantillas de texto (sin escapes especiales).
   - El reto mira win.__logs y el código del alumno
     (PRUEBA.codigo) para ver que lee con textContent.
   ============================================================ */
CURSO.registrar({
  id: "js-03",
  titulo: "Seleccionar elementos (DOM)",
  xp: 35,
  objetivo: "Sabrás encontrar desde JavaScript cualquier elemento de la página con querySelector y leer su texto con textContent.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "El DOM: tu página es un árbol",
      texto: "Cuando el navegador lee tu HTML, construye en su memoria un **árbol genealógico** de la página 🌳. Ese árbol se llama **DOM** (Modelo de Objetos del Documento).\n\n• `document` es la abuela: representa **toda** la página.\n• Dentro está `<body>`, la madre.\n• Dentro de `<body>`, sus hijas: un `<h1>`, un `<ul>`…\n• Y dentro de `<ul>`, las nietas: los `<li>`.\n\nJavaScript no toca tu archivo HTML: toca ese árbol. Si cambias una rama, la página cambia al momento.\n\nY una buena noticia: tu JavaScript se ejecuta cuando la página **ya está construida**, así que todos los elementos están listos para que los busques.",
      consejo: "Por eso a partir de ahora el HTML ya viene escrito: tú escribes en la pestaña **JS** el código que lo busca y, en la próxima lección, lo cambia."
    },
    {
      tipo: "explicacion",
      titulo: "querySelector: busca con selectores CSS",
      texto: "Para encontrar un elemento, pregúntale a `document`:\n\n`document.querySelector(\"selector\")`\n\nEntre las comillas va un **selector CSS**, ¡los mismos que ya conoces!: `\"h1\"`, `\".lema\"` (clase), `\"#titulo\"` (id), `\"ul li\"`…\n\n`querySelector` te devuelve el **primer** elemento que encaja. Lo normal es guardarlo en una constante para usarlo después.\n\nEn el ejemplo, la consola te enseña los elementos que ha encontrado. Fíjate: con `\"li\"` solo encuentra la **primera** pizza.",
      ejemplo: {
        html: `<h1 id="titulo">🍕 Pizzería Tagui</h1>
<p class="lema">Las pizzas más redondas del barrio</p>
<ul>
  <li>Margarita</li>
  <li>Cuatro quesos</li>
  <li>Hawaiana</li>
</ul>`,
        js: `const titulo = document.querySelector("#titulo");
console.log(titulo);

const lema = document.querySelector(".lema");
console.log(lema);

const primeraPizza = document.querySelector("li");
console.log(primeraPizza);`
      },
      consejo: "Si no encuentra nada, devuelve `null` (que significa «nada»). Revisa el selector: ¿falta el `#` o el `.`? ¿Las mayúsculas coinciden? `\"#Titulo\"` y `\"#titulo\"` no son lo mismo."
    },
    {
      tipo: "explicacion",
      titulo: "textContent: lee el texto",
      texto: "Ya tienes el elemento. ¿Y si solo quieres **lo que pone**, sin etiquetas? Pídele su `textContent` (su «contenido de texto»):\n\n`titulo.textContent`\n\nEl punto `.` significa «de»: «el `textContent` **de** `titulo`». Igual que en `console.log`, que era «el `log` de la `console`».\n\nEn el ejemplo, primero se busca el elemento y después se muestra su texto en la consola.",
      ejemplo: {
        html: `<h1>Batido de fresa 🍓</h1>
<p class="tiempo">Listo en 5 minutos</p>`,
        js: `const titulo = document.querySelector("h1");
console.log(titulo.textContent);

const tiempo = document.querySelector(".tiempo");
console.log(tiempo.textContent);`
      }
    },
    {
      tipo: "ejercicio",
      enunciado: "Lee la ficha del videojuego 🎮. El HTML ya está escrito.\n\n• Busca con `querySelector` el elemento `#juego` y muestra en la consola su `textContent`. Debe salir **Aventura en el castillo**.\n• Después busca `.precio` y muestra su `textContent`. Debe salir **20 €**.",
      cssBase: `body { font-family: sans-serif; }
.ficha { padding: 16px; border-radius: 12px; background-color: #e7f5ff; }
.ficha h1 { margin: 0 0 8px; color: #1864ab; }
.ficha p { margin: 4px 0; }`,
      inicial: {
        html: `<div class="ficha">
  <h1 id="juego">Aventura en el castillo</h1>
  <p class="genero">Plataformas</p>
  <p class="precio">20 €</p>
</div>
`,
        js: ""
      },
      solucion: {
        html: `<div class="ficha">
  <h1 id="juego">Aventura en el castillo</h1>
  <p class="genero">Plataformas</p>
  <p class="precio">20 €</p>
</div>
`,
        js: `const juego = document.querySelector("#juego");
console.log(juego.textContent);

const precio = document.querySelector(".precio");
console.log(precio.textContent);
`
      },
      pistas: [
        "Para un id el selector empieza por # y para una clase, por un punto. Guarda cada elemento en una constante y luego muestra en console.log su .textContent.",
        "Debe quedarte así:\nconst juego = document.querySelector(\"#juego\");\nconsole.log(juego.textContent);\nconst precio = document.querySelector(\".precio\");\nconsole.log(precio.textContent);"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "querySelectorAll: todos a la vez",
      texto: "`querySelector` te da solo el **primero**. Si quieres **todos** los que encajan con el selector, usa `querySelectorAll` («seleccionar todos»).\n\nTe devuelve una **lista** de elementos. La consola la muestra así: `NodeList(3) [<li>, <li>, <li>]`. El número entre paréntesis dice cuántos ha encontrado. 📋\n\nDe momento solo la miraremos en la consola. En la lección de **arrays y bucles** aprenderás a recorrer la lista para hacer algo con cada elemento.",
      ejemplo: {
        html: `<ul>
  <li class="planeta">Mercurio</li>
  <li class="planeta">Venus</li>
  <li class="planeta">Tierra</li>
  <li>La Luna (no es un planeta)</li>
</ul>`,
        js: `const primero = document.querySelector(".planeta");
console.log(primero);

const todos = document.querySelectorAll(".planeta");
console.log(todos);`
      },
      consejo: "Fíjate en la «s» del final: `querySelector` da uno y `querySelectorAll` da todos. ¡Una letra cambia mucho el resultado!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Revisa la lista de la compra 🛒. El HTML ya está escrito.\n\n• Con `querySelectorAll`, muestra en la consola la lista de **todos** los elementos con la clase `fruta`.\n• Después, con `querySelector`, busca el primer `.fruta` y muestra su `textContent`. Debe salir **Manzanas**.",
      cssBase: `body { font-family: sans-serif; }
.fruta { color: #2b8a3e; font-weight: bold; }`,
      inicial: {
        html: `<h2>Lista de la compra</h2>
<ul>
  <li class="fruta">Manzanas</li>
  <li class="fruta">Plátanos</li>
  <li>Pan</li>
  <li class="fruta">Fresas</li>
</ul>
`,
        js: ""
      },
      solucion: {
        html: `<h2>Lista de la compra</h2>
<ul>
  <li class="fruta">Manzanas</li>
  <li class="fruta">Plátanos</li>
  <li>Pan</li>
  <li class="fruta">Fresas</li>
</ul>
`,
        js: `const frutas = document.querySelectorAll(".fruta");
console.log(frutas);

const primeraFruta = document.querySelector(".fruta");
console.log(primeraFruta.textContent);
`
      },
      pistas: [
        "Dos búsquedas con el mismo selector \".fruta\": una con querySelectorAll (la muestras tal cual) y otra con querySelector (de esa muestras su .textContent).",
        "Debe quedarte así:\nconst frutas = document.querySelectorAll(\".fruta\");\nconsole.log(frutas);\nconst primeraFruta = document.querySelector(\".fruta\");\nconsole.log(primeraFruta.textContent);"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "En el HTML hay un <p class=\"nota\">. ¿Qué instrucción lo encuentra?",
      opciones: [
        "document.querySelector(\"nota\")",
        "document.querySelector(\".nota\")",
        "document.querySelector(\".Nota\")"
      ],
      correcta: 1,
      explicacion: "El selector es el mismo que en CSS: una clase se escribe con un punto delante, y las mayúsculas cuentan. Sin el punto buscaría una etiqueta <nota>, y .Nota es otra clase distinta."
    },
    {
      tipo: "reto",
      enunciado: "Haz de detective en la receta del batido 🕵️. El HTML ya está escrito; tú, en la pestaña JS:\n\n1. Muestra en la consola el texto del título `<h1>`.\n2. Muestra el texto del **primer** párrafo `<p>`.\n3. Muestra la lista de **todos** los párrafos con `querySelectorAll`.\n\nLee los textos con `textContent`: nada de copiarlos a mano. 😉",
      cssBase: `body { font-family: sans-serif; color: #5c3d2e; background-color: #fff9db; }
h1 { color: #e67700; }
.consejo { font-style: italic; }`,
      inicial: {
        html: `<h1>Batido de plátano 🍌</h1>
<p>Listo en 5 minutos y sin cocinar.</p>
<p>Ingredientes: un plátano, un vaso de leche y una cucharada de miel.</p>
<p class="consejo">Si lo quieres más fresquito, añade hielo.</p>
`,
        js: `// 1. El texto del título

// 2. El texto del primer párrafo

// 3. La lista de todos los párrafos

`
      },
      comprobaciones: [
        {
          texto: "La consola muestra el texto del título",
          prueba: (doc, win) => {
            const t = doc.querySelector("h1")?.textContent.trim();
            return !!t && (win.__logs || []).some(l => l.includes(t) && !l.trim().startsWith("<"));
          }
        },
        {
          texto: "La consola muestra el texto del primer párrafo",
          prueba: (doc, win) => {
            const t = doc.querySelector("p")?.textContent.trim();
            return !!t && (win.__logs || []).some(l => l.includes(t) && !l.trim().startsWith("<"));
          }
        },
        {
          texto: "La consola muestra la lista de todos los párrafos (`querySelectorAll`)",
          prueba: (doc, win) => {
            const n = doc.querySelectorAll("p").length;
            return (win.__logs || []).some(l => l.trim().startsWith("NodeList(" + n + ")"));
          }
        },
        {
          texto: "Lees los textos de la página con `textContent`",
          prueba: (doc) => {
            const codigo = PRUEBA.codigo(doc);
            return /\.textContent\b/.test(codigo);
          }
        }
      ],
      pistas: [
        "Para el título usa el selector \"h1\" y para el primer párrafo, \"p\" (querySelector siempre da el primero). Para la lista, querySelectorAll(\"p\"). Recuerda: de cada elemento, muestra su .textContent.",
        "Por ejemplo:\nconst titulo = document.querySelector(\"h1\");\nconsole.log(titulo.textContent);\nconst parrafo = document.querySelector(\"p\");\nconsole.log(parrafo.textContent);\nconst parrafos = document.querySelectorAll(\"p\");\nconsole.log(parrafos);"
      ],
      solucion: {
        html: `<h1>Batido de plátano 🍌</h1>
<p>Listo en 5 minutos y sin cocinar.</p>
<p>Ingredientes: un plátano, un vaso de leche y una cucharada de miel.</p>
<p class="consejo">Si lo quieres más fresquito, añade hielo.</p>
`,
        js: `// 1. El texto del título
const titulo = document.querySelector("h1");
console.log(titulo.textContent);

// 2. El texto del primer párrafo
const parrafo = document.querySelector("p");
console.log(parrafo.textContent);

// 3. La lista de todos los párrafos
const parrafos = document.querySelectorAll("p");
console.log(parrafos);
`
      }
    }
  ]
});
