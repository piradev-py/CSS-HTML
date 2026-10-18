/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-10
   Crear elementos desde JS — document.createElement(), poner
   texto y clases al elemento nuevo, append(), pintar un array de
   datos, crear elementos al pulsar un botón (con campo.value) y
   remove().
   Notas:
   - innerHTML solo aparece como advertencia (consejo): con texto
     que escribe el usuario es peligroso. Las soluciones usan
     createElement + textContent.
   - El reto NO usa <form> ni submit (eso llega en js-11): es un
     campo y un botón con click. El caso «campo vacío» repasa if
     de js-07 con campo.value === "" (el .trim() llega en js-11).
   - Cuidado: los ${…} de los ejemplos van escapados (\${…}).
   ============================================================ */
CURSO.registrar({
  id: "js-10",
  titulo: "Crear elementos desde JS",
  xp: 45,
  objetivo: "Sabrás fabricar etiquetas nuevas desde JavaScript, colocarlas en la página, pintar una lista a partir de un array y quitar elementos.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Fabricar una etiqueta nueva",
      texto: "Hasta ahora cambiabas elementos que ya estaban en el HTML. ¡Ahora vas a **fabricarlos**! Son tres pasos, como con una pieza de LEGO 🧱:\n\n1. **Crear** la pieza: `document.createElement(\"li\")` fabrica un `<li>` nuevo.\n2. **Prepararla**: ponle texto con `textContent` y, si quieres, clases con `classList.add`.\n3. **Encajarla**: `lista.append(li)` la mete al **final** de `lista`.\n\nHasta el paso 3, la etiqueta existe pero está «en el aire»: no se ve en la página.",
      ejemplo: {
        html: `<h3>🛒 Lista de la compra</h3>
<ul id="compra">
  <li>Pan</li>
</ul>`,
        js: `const compra = document.querySelector("#compra");

const nuevo = document.createElement("li");
nuevo.textContent = "Leche";
compra.append(nuevo);

console.log(compra);`
      },
      consejo: "Por internet verás `innerHTML` para meter HTML escrito como texto. ¡Cuidado! Si ese texto lo escribe el usuario, alguien podría colar código malicioso. Con `createElement` y `textContent` vas siempre a lo seguro."
    },
    {
      tipo: "ejercicio",
      enunciado: "Escribe en tu muro 📝 desde JavaScript. El HTML ya tiene un `<div id=\"muro\">` vacío. Dentro de él, con `createElement` y `append`, en este orden:\n\n• Crea un `<h2>` con el texto **Hola desde JS**.\n• Crea un `<p>` con el texto **Este párrafo lo he creado yo** y la clase `nota`.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
#muro { min-height: 60px; padding: 12px; border: 3px dashed #9b8ce0; border-radius: 12px; }
#muro h2 { margin-top: 0; color: #4b3fa0; }
.nota { padding: 8px 12px; background-color: #fff3a8; border-radius: 6px; transform: rotate(-1deg); }`,
      inicial: {
        html: `<div id="muro"></div>
`,
        js: ""
      },
      solucion: {
        html: `<div id="muro"></div>
`,
        js: `const muro = document.querySelector("#muro");

const titulo = document.createElement("h2");
titulo.textContent = "Hola desde JS";
muro.append(titulo);

const parrafo = document.createElement("p");
parrafo.textContent = "Este párrafo lo he creado yo";
parrafo.classList.add("nota");
muro.append(parrafo);
`
      },
      pistas: [
        "Repite los tres pasos dos veces: createElement, textContent (y classList.add para el párrafo) y muro.append(…). Primero el título, para que quede arriba.",
        "Debe quedarte así:\nconst muro = document.querySelector(\"#muro\");\n\nconst titulo = document.createElement(\"h2\");\ntitulo.textContent = \"Hola desde JS\";\nmuro.append(titulo);\n\nconst parrafo = document.createElement(\"p\");\nparrafo.textContent = \"Este párrafo lo he creado yo\";\nparrafo.classList.add(\"nota\");\nmuro.append(parrafo);"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Pintar un array en la página",
      texto: "Aquí se juntan todas las piezas que conoces: un **array** con datos, un **bucle** que lo recorre y, en cada vuelta, los **tres pasos** para fabricar un elemento.\n\nAsí funcionan casi todas las webs: los datos (productos, mensajes, canciones…) llegan en un array, y JavaScript fabrica una etiqueta por cada uno. Si mañana el array tiene 50 datos, la página tendrá 50 elementos sin tocar el HTML. ✨",
      ejemplo: {
        html: `<h3>🪐 Planetas rocosos</h3>
<ul id="planetas"></ul>`,
        js: `const planetas = ["Mercurio", "Venus", "Tierra", "Marte"];
const lista = document.querySelector("#planetas");

for (const planeta of planetas) {
  const li = document.createElement("li");
  li.textContent = planeta;
  lista.append(li);
}

console.log(\`He pintado \${planetas.length} planetas\`);`
      },
      consejo: "Crea el `li` **dentro** del bucle: necesitas una etiqueta nueva en cada vuelta. Si la creas fuera, solo hay una, y `append` la iría moviendo de sitio."
    },
    {
      tipo: "ejercicio",
      enunciado: "Pinta los ingredientes de la receta 🥞. El HTML ya tiene una lista vacía `<ul id=\"receta\">`.\n\n• Crea un array `ingredientes` con **Harina**, **Huevos**, **Leche** y **Azúcar**, en ese orden.\n• Recórrelo con un bucle y, por cada ingrediente, crea un `<li>` con su nombre y añádelo a `#receta`.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
#receta { padding: 12px 12px 12px 36px; background-color: #fff4e0; border-radius: 12px; font-size: 18px; }
#receta li { margin: 4px 0; }`,
      inicial: {
        html: `<h3>Tortitas para 4 personas</h3>
<ul id="receta"></ul>
`,
        js: ""
      },
      solucion: {
        html: `<h3>Tortitas para 4 personas</h3>
<ul id="receta"></ul>
`,
        js: `const ingredientes = ["Harina", "Huevos", "Leche", "Azúcar"];
const receta = document.querySelector("#receta");

for (const ingrediente of ingredientes) {
  const li = document.createElement("li");
  li.textContent = ingrediente;
  receta.append(li);
}
`
      },
      pistas: [
        "Escribe el array, guarda la lista con querySelector y usa for (const ingrediente of ingredientes) { … }. Dentro: createElement(\"li\"), textContent y append.",
        "Debe quedarte así:\nconst ingredientes = [\"Harina\", \"Huevos\", \"Leche\", \"Azúcar\"];\nconst receta = document.querySelector(\"#receta\");\n\nfor (const ingrediente of ingredientes) {\n  const li = document.createElement(\"li\");\n  li.textContent = ingrediente;\n  receta.append(li);\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Crear al pulsar un botón",
      texto: "Lo más divertido: que el usuario añada cosas. Juntas un **evento** con los tres pasos:\n\n1. Al pulsar el botón, lees lo escrito con `campo.value`.\n2. Fabricas el elemento con ese texto y lo encajas con `append`.\n3. Vacías el campo con `campo.value = \"\";` para que esté listo para el siguiente.\n\nY si el campo está vacío, mejor no añadir nada: para eso tienes el `if`. Escribe en el resultado y pulsa **Firmar**. ✍️",
      ejemplo: {
        html: `<h3>📖 Libro de visitas</h3>
<input id="firma" type="text">
<button id="firmar">Firmar</button>
<ul id="visitas"></ul>`,
        js: `const campo = document.querySelector("#firma");
const visitas = document.querySelector("#visitas");

document.querySelector("#firmar").addEventListener("click", () => {
  if (campo.value === "") {
    console.log("No has escrito nada");
  } else {
    const li = document.createElement("li");
    li.textContent = campo.value;
    visitas.append(li);
    campo.value = "";
  }
});`
      }
    },
    {
      tipo: "explicacion",
      titulo: "Quitar elementos: remove()",
      texto: "Igual que se añaden, se quitan. Cualquier elemento tiene la orden `remove()` («quitar»): `aviso.remove();` lo borra de la página, con todo lo que tenga dentro.\n\nEs lo que hace la ✖ de los anuncios, de las notificaciones o el botón de borrar una tarea. Pulsa **Cerrar** en el resultado.\n\nOjo: solo desaparece de la página que ves ahora. Si recargas, vuelve, porque el HTML original no ha cambiado. (Para recordar cosas al recargar hay una lección más adelante. 😉)",
      ejemplo: {
        html: `<div id="aviso">
  🍪 Esta web usa galletas de chocolate.
  <button id="cerrar">Cerrar ✖</button>
</div>
<p>Contenido de la página.</p>`,
        css: `#aviso { padding: 10px; background-color: #fff3cd; border-radius: 8px; }`,
        js: `const aviso = document.querySelector("#aviso");

document.querySelector("#cerrar").addEventListener("click", () => {
  aviso.remove();
  console.log("Aviso cerrado");
});`
      }
    },
    {
      tipo: "ejercicio",
      enunciado: "Que se pueda cerrar el anuncio del juego 🎉. El HTML ya está escrito.\n\nAl pulsar el botón `#cerrar`, quita de la página el elemento `#anuncio` entero (con su botón dentro) usando `remove()`.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
#anuncio { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 12px 16px; background-color: #4b3fa0; color: white; border-radius: 12px; font-size: 18px; }
#cerrar { padding: 6px 12px; border: none; border-radius: 8px; background-color: white; color: #4b3fa0; font-weight: bold; }`,
      inicial: {
        html: `<div id="anuncio">
  <p>🎉 ¡Nivel 2 desbloqueado!</p>
  <button id="cerrar">✖</button>
</div>
<h2>Mapa del mundo</h2>
`,
        js: ""
      },
      solucion: {
        html: `<div id="anuncio">
  <p>🎉 ¡Nivel 2 desbloqueado!</p>
  <button id="cerrar">✖</button>
</div>
<h2>Mapa del mundo</h2>
`,
        js: `const anuncio = document.querySelector("#anuncio");

document.querySelector("#cerrar").addEventListener("click", () => {
  anuncio.remove();
});
`
      },
      acciones: [{ clic: "#cerrar" }],
      pistas: [
        "Guarda #anuncio en una constante y, dentro del addEventListener del clic de #cerrar, llama a su remove().",
        "Debe quedarte así:\nconst anuncio = document.querySelector(\"#anuncio\");\n\ndocument.querySelector(\"#cerrar\").addEventListener(\"click\", () => {\n  anuncio.remove();\n});"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Un botón Quitar en cada elemento",
      texto: "¿Y si cada elemento de una lista necesita **su propio** botón de borrar, como las tareas o las citas? Al fabricar cada `<li>` en el bucle, fabricas también su botón y le pones **su propio escuchador**:\n\n1. Creas el `li` y el `button`.\n2. Al botón le dices: «cuando te pulsen, quita **tu** `li`» → `li.remove()`.\n3. Metes el botón **dentro** del `li` con `li.append(boton)`, y el `li` en la lista.\n\nCada botón recuerda cuál es su `li`, porque los dos se crearon en la misma vuelta del bucle. 🪄\n\nY un truco para cuando vuelvas a pintar una lista entera: vacíala antes con `lista.textContent = \"\";`, o los elementos se apilarían repetidos.",
      ejemplo: {
        html: `<ul id="juguetes"></ul>`,
        js: `const juguetes = ["Pelota", "Peluche", "Cuerda"];
const lista = document.querySelector("#juguetes");

for (const juguete of juguetes) {
  const li = document.createElement("li");
  li.textContent = juguete + " ";

  const boton = document.createElement("button");
  boton.textContent = "Quitar";
  boton.addEventListener("click", () => {
    li.remove();
  });

  li.append(boton);
  lista.append(li);
}`
      }
    },
    {
      tipo: "ejercicio",
      enunciado: "Haz la lista de la compra 🛒. El HTML ya tiene la lista `#compra` vacía. En la pestaña JS:\n\n1. Crea un array `productos` con **Leche**, **Pan** y **Huevos**.\n2. Recórrelo con `for…of` y, por cada producto, crea un `<li>` con su nombre (y un espacio detrás).\n3. Dentro de cada `<li>`, un `<button>` que diga **Quitar** y que, al pulsarlo, quite su `<li>` con `remove()`.\n\nLa revisión pulsará el primer **Quitar**: la leche tiene que desaparecer.",
      inicial: {
        html: `<ul id="compra"></ul>
`,
        js: ""
      },
      solucion: {
        html: `<ul id="compra"></ul>
`,
        js: `const productos = ["Leche", "Pan", "Huevos"];
const compra = document.querySelector("#compra");

for (const producto of productos) {
  const li = document.createElement("li");
  li.textContent = producto + " ";

  const boton = document.createElement("button");
  boton.textContent = "Quitar";
  boton.addEventListener("click", () => {
    li.remove();
  });

  li.append(boton);
  compra.append(li);
}
`
      },
      acciones: [{ clic: "#compra button" }],
      pistas: [
        "Es como el ejemplo de los juguetes: dentro del for…of creas el li y el button, al botón le pones un addEventListener que hace li.remove(), y al final li.append(boton) y compra.append(li).",
        "Debe quedarte así:\nconst productos = [\"Leche\", \"Pan\", \"Huevos\"];\nconst compra = document.querySelector(\"#compra\");\n\nfor (const producto of productos) {\n  const li = document.createElement(\"li\");\n  li.textContent = producto + \" \";\n\n  const boton = document.createElement(\"button\");\n  boton.textContent = \"Quitar\";\n  boton.addEventListener(\"click\", () => {\n    li.remove();\n  });\n\n  li.append(boton);\n  compra.append(li);\n}"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Has escrito `const li = document.createElement(\"li\");` y `li.textContent = \"Kiwi\";`, pero el Kiwi no aparece en la lista. ¿Qué falta?",
      opciones: [
        "Encajarlo en la lista con append, por ejemplo lista.append(li)",
        "Escribir el <li> también en el HTML",
        "Nada: tarda un poco en aparecer"
      ],
      correcta: 0,
      explicacion: "createElement fabrica la etiqueta, pero queda «en el aire» hasta que la metes en la página con append."
    },
    {
      tipo: "reto",
      enunciado: "Monta tu **playlist** 🎧. Las canciones ya están en el array `canciones`.\n\n1. Al cargar, pinta cada canción del array como un `<li>` dentro de `#playlist`.\n2. Al pulsar `#anadir`, crea un `<li>` con lo escrito en `#cancion` y añádelo **al final** de la lista.\n3. Después de añadirla, deja el campo vacío.\n4. Si el campo está vacío al pulsar, no añadas nada.",
      cssBase: `body { font-family: sans-serif; display: flex; justify-content: center; padding-top: 16px; background-color: #121826; color: white; }
.reproductor { width: 320px; padding: 20px; border-radius: 16px; background-color: #1f2a40; }
.reproductor h2 { margin-top: 0; }
#playlist { padding-left: 24px; }
#playlist li { padding: 6px 0; border-bottom: 1px solid #33415c; }
label { display: block; margin: 12px 0 6px; }
input { padding: 8px; font-size: 16px; border-radius: 8px; border: none; }
button { padding: 9px 14px; font-size: 16px; border: none; border-radius: 8px; background-color: #1db954; color: white; font-weight: bold; }`,
      inicial: {
        html: `<section class="reproductor">
  <h2>🎧 Mi playlist</h2>
  <ul id="playlist"></ul>
  <label for="cancion">Nueva canción:</label>
  <input id="cancion" type="text">
  <button id="anadir">Añadir</button>
</section>
`,
        js: `const canciones = ["La cumbia del gato", "Rock del dinosaurio", "Baladita de la luna"];
const lista = document.querySelector("#playlist");
const campo = document.querySelector("#cancion");

// 1. Pinta cada canción del array como un <li> dentro de la lista


// 2. Al pulsar #anadir:
//    - si el campo está vacío, no hagas nada
//    - si no, crea un <li> con lo escrito, añádelo a la lista y vacía el campo
`
      },
      comprobaciones: [
        {
          texto: "Al cargar, `#playlist` tiene un `<li>` por cada canción del array (3), en el mismo orden",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const lis = [...v.doc.querySelectorAll("#playlist li")].map(li => li.textContent);
            return lis.length === 3 && lis[0].includes("La cumbia del gato")
              && lis[1].includes("Rock del dinosaurio") && lis[2].includes("Baladita de la luna");
          }
        },
        {
          texto: "Al escribir una canción y pulsar **Añadir**, aparece al final de la lista",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const campo = v.doc.querySelector("#cancion");
            const boton = v.doc.querySelector("#anadir");
            if (!campo || !boton) return false;
            const antes = v.doc.querySelectorAll("#playlist li").length;
            PRUEBA.escribir(campo, "Bailando con mi perro");
            boton.click();
            const lis = v.doc.querySelectorAll("#playlist li");
            return lis.length === antes + 1 && lis[lis.length - 1].textContent.includes("Bailando con mi perro");
          }
        },
        {
          texto: "Después de añadirla, el campo se queda vacío",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const campo = v.doc.querySelector("#cancion");
            const boton = v.doc.querySelector("#anadir");
            if (!campo || !boton) return false;
            const antes = v.doc.querySelectorAll("#playlist li").length;
            PRUEBA.escribir(campo, "Tango del pingüino");
            boton.click();
            return v.doc.querySelectorAll("#playlist li").length === antes + 1 && campo.value === "";
          }
        },
        {
          texto: "Si pulsas **Añadir** con el campo vacío, la lista no cambia",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const campo = v.doc.querySelector("#cancion");
            const boton = v.doc.querySelector("#anadir");
            if (!campo || !boton) return false;
            // Primero se comprueba que el botón funciona, para que «no hacer nada nunca» no valga
            PRUEBA.escribir(campo, "Vals de la tortuga");
            boton.click();
            const antes = v.doc.querySelectorAll("#playlist li").length;
            if (antes === 0) return false;
            PRUEBA.escribir(campo, "");
            boton.click();
            return v.doc.querySelectorAll("#playlist li").length === antes;
          }
        }
      ],
      pistas: [
        "Para el punto 1, copia la idea de los ingredientes: un for…of sobre canciones que cree un li en cada vuelta. Para el resto, un addEventListener en #anadir con un if (campo.value === \"\") { … } else { … }: en el else, los tres pasos (createElement, textContent, append) y campo.value = \"\".",
        "Te debe quedar así:\nfor (const cancion of canciones) {\n  const li = document.createElement(\"li\");\n  li.textContent = cancion;\n  lista.append(li);\n}\n\ndocument.querySelector(\"#anadir\").addEventListener(\"click\", () => {\n  if (campo.value === \"\") {\n    console.log(\"Escribe una canción\");\n  } else {\n    const li = document.createElement(\"li\");\n    li.textContent = campo.value;\n    lista.append(li);\n    campo.value = \"\";\n  }\n});"
      ],
      solucion: {
        html: `<section class="reproductor">
  <h2>🎧 Mi playlist</h2>
  <ul id="playlist"></ul>
  <label for="cancion">Nueva canción:</label>
  <input id="cancion" type="text">
  <button id="anadir">Añadir</button>
</section>
`,
        js: `const canciones = ["La cumbia del gato", "Rock del dinosaurio", "Baladita de la luna"];
const lista = document.querySelector("#playlist");
const campo = document.querySelector("#cancion");

for (const cancion of canciones) {
  const li = document.createElement("li");
  li.textContent = cancion;
  lista.append(li);
}

document.querySelector("#anadir").addEventListener("click", () => {
  if (campo.value === "") {
    console.log("Escribe una canción");
  } else {
    const li = document.createElement("li");
    li.textContent = campo.value;
    lista.append(li);
    campo.value = "";
  }
});
`
      }
    }
  ]
});
