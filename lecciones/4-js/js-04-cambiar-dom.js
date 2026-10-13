/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-04
   Cambiar texto, estilos y clases — asignar textContent,
   elemento.style.propiedad (nombres en camelCase y valores con
   unidades), classList.add / remove / toggle y por qué preferir
   clases a style.
   Notas:
   - El revisor compara los estilos en línea por su valor calculado
     (#dc143c = crimson) y las clases sin importar el orden.
   - En el ejercicio 2 la tarjeta empieza con la clase «oculta»
     (display: none en cssBase): al quitarla, aparece.
   - El <body> se busca con querySelector("body"); document.body se
     menciona como atajo.
   - El reto deja el CSS de .modo-noche escrito en la pestaña CSS
     (inicial y solución iguales): el aspecto vive en el CSS.
   ============================================================ */
CURSO.registrar({
  id: "js-04",
  titulo: "Cambiar texto, estilos y clases",
  xp: 40,
  objetivo: "Sabrás cambiar desde JavaScript el texto, el estilo y las clases de cualquier elemento de la página.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Cambia el texto",
      texto: "En la lección anterior **leías** el texto con `textContent`. Para **cambiarlo**, usa `=`, igual que al guardar algo en una variable:\n\n`estado.textContent = \"¡Programando a tope!\";`\n\nSe lee: «guarda este texto nuevo como contenido de `estado`». El texto de antes desaparece y la página se actualiza al momento. ✨\n\nTu archivo HTML no cambia: cambia el árbol (el DOM) que el navegador tiene en memoria. Por eso, si recargas, vuelve a ejecutarse todo desde el principio. En el ejemplo, la consola muestra el texto antes y después del cambio.",
      ejemplo: {
        html: `<h1>Tagui</h1>
<p id="estado">😴 Durmiendo…</p>`,
        js: `const estado = document.querySelector("#estado");
console.log(estado.textContent);

estado.textContent = "⚡ ¡Programando a tope!";
console.log(estado.textContent);`
      },
      consejo: "Con `textContent` todo lo que escribes se muestra como texto. Si pones `<b>hola</b>`, verás las etiquetas escritas tal cual, no una negrita."
    },
    {
      tipo: "ejercicio",
      enunciado: "¡Has superado el nivel! 🕹️ Actualiza el marcador. El HTML ya está escrito.\n\n• Cambia el `textContent` de `#marcador` a **Puntos: 100**.\n• Cambia el `textContent` de `.mensaje` a **¡Nivel superado!**",
      cssBase: `body { font-family: monospace; text-align: center; color: #f8f9fa; background-color: #212529; }
#marcador { color: #ffd43b; }
.mensaje { font-size: 20px; }`,
      inicial: {
        html: `<h1 id="marcador">Puntos: 0</h1>
<p class="mensaje">Pulsa empezar para jugar</p>
`,
        js: ""
      },
      solucion: {
        html: `<h1 id="marcador">Puntos: 0</h1>
<p class="mensaje">Pulsa empezar para jugar</p>
`,
        js: `const marcador = document.querySelector("#marcador");
marcador.textContent = "Puntos: 100";

const mensaje = document.querySelector(".mensaje");
mensaje.textContent = "¡Nivel superado!";
`
      },
      pistas: [
        "Primero busca cada elemento con querySelector (# para el id, punto para la clase) y guárdalo en una constante. Después, a su .textContent dale el texto nuevo con =.",
        "Debe quedarte así:\nconst marcador = document.querySelector(\"#marcador\");\nmarcador.textContent = \"Puntos: 100\";\nconst mensaje = document.querySelector(\".mensaje\");\nmensaje.textContent = \"¡Nivel superado!\";"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Cambia el estilo con style",
      texto: "Cada elemento tiene un `style` con todas las propiedades de CSS. Para cambiar una:\n\n`titulo.style.color = \"white\";`\n\nDos detalles importantes:\n\n• Las propiedades con guion se escriben **juntas** y con la segunda palabra en **mayúscula**: `background-color` pasa a `backgroundColor`, y `font-size`, a `fontSize`. (En JavaScript, el guion significa «restar».)\n• El valor es un **texto**: va entre comillas y con sus unidades, `\"40px\"`.\n\nEsto pone un estilo **en línea** al elemento, como el atributo `style` de HTML.",
      ejemplo: {
        html: `<h1 id="titulo">Superhéroes</h1>`,
        js: `const titulo = document.querySelector("#titulo");
titulo.style.color = "white";
titulo.style.backgroundColor = "crimson";
titulo.style.fontSize = "40px";
titulo.style.padding = "10px";`
      },
      consejo: "¿Has puesto un tamaño y no hace nada? Mira si olvidaste la unidad: `\"40\"` no funciona, `\"40px\"` sí."
    },
    {
      tipo: "explicacion",
      titulo: "Pon y quita clases con classList",
      texto: "Cada elemento tiene una `classList`: la lista de sus clases. Con ella puedes:\n\n• `classList.add(\"hecha\")`: **añadir** la clase.\n• `classList.remove(\"hecha\")`: **quitarla**.\n• `classList.toggle(\"hecha\")`: si no la tiene, la pone; si la tiene, la quita. Como un **interruptor** de la luz 💡.\n\nEl aspecto de cada clase se escribe en el **CSS**, como siempre. JavaScript solo decide qué clases lleva cada elemento.\n\nPara el `<body>` vale `document.querySelector(\"body\")` (o el atajo `document.body`).",
      ejemplo: {
        html: `<ul>
  <li id="tarea1">Pasear al perro</li>
  <li id="tarea2" class="hecha">Hacer la compra</li>
  <li id="tarea3">Regar las plantas</li>
</ul>`,
        css: `.hecha {
  text-decoration: line-through;
  color: gray;
}
.importante {
  color: crimson;
  font-weight: bold;
}`,
        js: `const tarea1 = document.querySelector("#tarea1");
tarea1.classList.add("importante");

const tarea2 = document.querySelector("#tarea2");
tarea2.classList.remove("hecha");

const tarea3 = document.querySelector("#tarea3");
tarea3.classList.toggle("hecha");`
      },
      consejo: "En `classList` el nombre de la clase va **sin punto**: `add(\"hecha\")`, no `add(\".hecha\")`. El punto solo se pone en los selectores."
    },
    {
      tipo: "explicacion",
      titulo: "¿style o clases?",
      texto: "Con `style` y con `classList` cambias el aspecto. Entonces, ¿cuál usar? Los profesionales prefieren **clases** casi siempre:\n\n• **Cada cosa en su sitio**: el aspecto se queda en el CSS y JavaScript solo dice «ahora ponte esta ropa». 👕\n• **Muchas propiedades de golpe**: una clase cambia color, fondo y borde con una sola línea de JS.\n• **Más fácil de cambiar**: si mañana quieres otro color, lo cambias en el CSS sin tocar el JavaScript.\n• **Todo lo de CSS sigue funcionando**: `:hover`, transiciones, media queries…\n\n`style` queda para valores que calcula el propio programa, como mover algo a una posición exacta.",
      consejo: "Piensa en las clases como trajes ya preparados en el armario (el CSS). JavaScript no cose ropa: solo elige qué traje ponerse."
    },
    {
      tipo: "ejercicio",
      enunciado: "Anuncia la oferta del día 🍕. El HTML ya está escrito y el CSS de las clases ya está preparado.\n\n• Busca `#oferta` y ponle con `style` el `color` `crimson`.\n• Busca `#tarjeta` y quítale la clase `oculta` con `classList.remove`.\n• A la misma `#tarjeta`, añádele la clase `destacada` con `classList.add`.",
      cssBase: `body { font-family: sans-serif; }
.tarjeta { padding: 16px; border-radius: 12px; background-color: #fff3bf; }
.oculta { display: none; }
.destacada { border: 3px dashed tomato; font-weight: bold; }`,
      inicial: {
        html: `<h2 id="oferta">Oferta del día</h2>
<div id="tarjeta" class="tarjeta oculta">Pizza margarita a mitad de precio</div>
`,
        js: ""
      },
      solucion: {
        html: `<h2 id="oferta">Oferta del día</h2>
<div id="tarjeta" class="tarjeta oculta">Pizza margarita a mitad de precio</div>
`,
        js: `const oferta = document.querySelector("#oferta");
oferta.style.color = "crimson";

const tarjeta = document.querySelector("#tarjeta");
tarjeta.classList.remove("oculta");
tarjeta.classList.add("destacada");
`
      },
      pistas: [
        "Necesitas dos elementos: guarda #oferta y #tarjeta en constantes. A la primera, style.color con el valor entre comillas. A la segunda, classList.remove y classList.add, cada una con el nombre de la clase entre comillas y sin punto.",
        "Debe quedarte así:\nconst oferta = document.querySelector(\"#oferta\");\noferta.style.color = \"crimson\";\nconst tarjeta = document.querySelector(\"#tarjeta\");\ntarjeta.classList.remove(\"oculta\");\ntarjeta.classList.add(\"destacada\");"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "¿Por qué se suele preferir classList a style para cambiar el aspecto?",
      opciones: [
        "Porque el aspecto se queda en el CSS y JavaScript solo pone o quita la clase",
        "Porque style no funciona en los navegadores modernos",
        "Porque con classList no hace falta escribir CSS"
      ],
      correcta: 0,
      explicacion: "Las dos funcionan, pero con clases cada cosa está en su sitio: el CSS define cómo se ve cada clase y JavaScript solo decide cuándo ponerla. Así es más fácil de mantener y siguen funcionando :hover y las transiciones."
    },
    {
      tipo: "reto",
      enunciado: "Prepara tu diario para leer de noche 🌙. El HTML ya está escrito y en la pestaña CSS ya tienes el aspecto de la clase `modo-noche`. Tú, en la pestaña JS:\n\n1. Cambia el texto del título `<h1>` por otro (por ejemplo, **El diario de Ana**).\n2. Ponle al título un color con `style.color` (prueba con `gold`).\n3. Añade la clase `modo-noche` al `<body>`.",
      inicial: {
        html: `<h1>Mi diario</h1>
<p>Hoy he aprendido a cambiar la página con JavaScript.</p>
<p>Mañana aprenderé a hacer funciones.</p>
`,
        css: `/* El aspecto del modo noche ya está preparado */
body {
  font-family: sans-serif;
  padding: 16px;
  transition: background-color 0.5s, color 0.5s;
}

.modo-noche {
  background-color: #1e1b4b;
  color: #e0e7ff;
}
`,
        js: `// 1. Cambia el texto del título

// 2. Ponle un color al título con style

// 3. Añade la clase modo-noche al body

`
      },
      comprobaciones: [
        {
          texto: "El título `<h1>` tiene un texto nuevo, cambiado con `textContent`",
          prueba: (doc) => {
            const t = doc.querySelector("h1")?.textContent.trim() || "";
            const codigo = PRUEBA.codigo(doc);
            return t.length > 0 && t !== "Mi diario" && /\.textContent\s*=/.test(codigo);
          }
        },
        {
          texto: "El título tiene un color puesto con `style`",
          prueba: (doc) => (doc.querySelector("h1")?.style.color || "") !== ""
        },
        {
          texto: "El `<body>` tiene la clase `modo-noche`",
          prueba: (doc) => !!doc.body?.classList.contains("modo-noche")
        }
      ],
      pistas: [
        "Busca el título con querySelector(\"h1\") y el body con querySelector(\"body\"). Al título cámbiale el .textContent y el .style.color; al body, classList.add con el nombre de la clase (sin punto).",
        "Por ejemplo:\nconst titulo = document.querySelector(\"h1\");\ntitulo.textContent = \"El diario de Ana\";\ntitulo.style.color = \"gold\";\nconst cuerpo = document.querySelector(\"body\");\ncuerpo.classList.add(\"modo-noche\");"
      ],
      solucion: {
        html: `<h1>Mi diario</h1>
<p>Hoy he aprendido a cambiar la página con JavaScript.</p>
<p>Mañana aprenderé a hacer funciones.</p>
`,
        css: `/* El aspecto del modo noche ya está preparado */
body {
  font-family: sans-serif;
  padding: 16px;
  transition: background-color 0.5s, color 0.5s;
}

.modo-noche {
  background-color: #1e1b4b;
  color: #e0e7ff;
}
`,
        js: `// 1. Cambia el texto del título
const titulo = document.querySelector("h1");
titulo.textContent = "El diario de Ana";

// 2. Ponle un color al título con style
titulo.style.color = "gold";

// 3. Añade la clase modo-noche al body
const cuerpo = document.querySelector("body");
cuerpo.classList.add("modo-noche");
`
      }
    }
  ]
});
