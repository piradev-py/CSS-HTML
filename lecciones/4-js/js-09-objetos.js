/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-09
   Objetos — objeto, { clave: valor }, leer con punto, modificar
   y añadir propiedades, objetos dentro de un array (y recorrerlos
   con for…of, visto en js-08).
   Notas:
   - El primer ejercicio termina con console.log(objeto): la
     consola lo muestra como { nombre: "Luna", vida: 70, … }, así
     que el revisor comprueba también las claves y su orden.
   - El reto deja que el alumno escriba el objeto él mismo (nombre
     libre) y comprueba la ficha pintada y el botón con
     PRUEBA.recargar en cada comprobación.
   - Cuidado: los ${…} de los ejemplos van escapados (\${…}).
   ============================================================ */
CURSO.registrar({
  id: "js-09",
  titulo: "Objetos",
  xp: 40,
  objetivo: "Sabrás agrupar datos relacionados en un objeto, leerlos y cambiarlos, y guardar varios objetos en un array.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Una ficha con todos los datos",
      texto: "Imagina la ficha de tu gato 🐱: nombre, edad, color… Podrías crear tres variables sueltas, pero es más cómodo guardarlo todo **junto**, en un **objeto**.\n\nUn objeto va entre llaves `{ }` y guarda parejas **clave: valor**, separadas por comas. La **clave** es el nombre del dato (como la etiqueta de un cajón) y el **valor**, lo que hay dentro.\n\nPara leer un dato, usa un **punto**: `gato.nombre` se lee «el nombre del gato».",
      ejemplo: {
        js: `const gato = {
  nombre: "Misi",
  edad: 3,
  color: "naranja"
};

console.log(gato);
console.log(gato.nombre);
console.log(\`\${gato.nombre} tiene \${gato.edad} años\`);`
      },
      consejo: "Las claves van **sin comillas** y seguidas de dos puntos `:`. Entre una pareja y la siguiente, una coma. ¡Olvidar esa coma es el error más típico con los objetos!"
    },
    {
      tipo: "explicacion",
      titulo: "Cambiar y añadir datos",
      texto: "Para **cambiar** un dato, asígnale un valor nuevo con `=`: `gato.edad = 4;`. También puedes calcularlo a partir del que ya tiene: `gato.edad = gato.edad + 1;` (¡feliz cumpleaños! 🎂).\n\nY si la clave no existía, se **añade**: `gato.vacunado = true;`.\n\n¿Y el `const`? Sigue valiendo: el objeto es la misma «caja», solo cambia lo que hay dentro. `const` solo impide cambiar la caja entera por otra.",
      ejemplo: {
        js: `const gato = { nombre: "Misi", edad: 3 };

gato.edad = gato.edad + 1;
gato.vacunado = true;

console.log(gato);
console.log(gato.edad);`
      }
    },
    {
      tipo: "ejercicio",
      pestanas: ["js"],
      enunciado: "Crea a la heroína de tu juego 🏹. Escribe en JS:\n\n• Un objeto `heroe` con estas claves, en este orden: `nombre` con el valor **Luna**, `vida` con **100** y `arma` con **arco**.\n• Muestra en la consola su nombre con `heroe.nombre`.\n• ¡Un trol le golpea! Réstale **30** a su `vida`.\n• Muestra en la consola su vida (saldrá **70**).\n• Muestra en la consola el objeto `heroe` entero.",
      inicial: { html: "", js: "" },
      solucion: {
        html: "",
        js: `const heroe = {
  nombre: "Luna",
  vida: 100,
  arma: "arco"
};

console.log(heroe.nombre);

heroe.vida = heroe.vida - 30;
console.log(heroe.vida);

console.log(heroe);
`
      },
      pistas: [
        "El objeto va entre llaves, con nombre: \"Luna\", vida: 100 y arma: \"arco\" separados por comas. Para restar: heroe.vida = heroe.vida - 30;",
        "Debe quedarte así:\nconst heroe = {\n  nombre: \"Luna\",\n  vida: 100,\n  arma: \"arco\"\n};\n\nconsole.log(heroe.nombre);\n\nheroe.vida = heroe.vida - 30;\nconsole.log(heroe.vida);\n\nconsole.log(heroe);"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Una lista de fichas: arrays de objetos",
      texto: "Lo más habitual en la web es tener **muchas** fichas: los productos de una tienda, los mensajes de un chat, las tareas de una lista… Se guardan como un **array de objetos**: una lista donde cada elemento es una ficha.\n\nPara recorrerla, el `for…of` de siempre. En cada vuelta tienes **un objeto entero**, y con el punto sacas sus datos: `producto.nombre`, `producto.precio`.\n\nTambién puedes ir directo a uno: `tienda[0].nombre` es el nombre del **primer** producto. 🛍️",
      ejemplo: {
        js: `const tienda = [
  { nombre: "Camiseta", precio: 15 },
  { nombre: "Gorra", precio: 8 },
  { nombre: "Calcetines", precio: 4 }
];

for (const producto of tienda) {
  console.log(\`\${producto.nombre}: \${producto.precio} €\`);
}

console.log(tienda[0].nombre);`
      },
      consejo: "Lee `tienda[0].nombre` de izquierda a derecha: «de la tienda, el elemento 0; y de ese, el nombre»."
    },
    {
      tipo: "ejercicio",
      pestanas: ["js"],
      enunciado: "Presenta a las mascotas del refugio 🐾. Escribe en JS:\n\n• Un array `mascotas` con tres objetos, en este orden, cada uno con `nombre` y `especie`: **Toby** (**perro**), **Misi** (**gato**) y **Coco** (**loro**).\n• Recórrelo con `for…of` y muestra en la consola, para cada mascota, su nombre, **es un** y su especie. La primera línea será **Toby es un perro**.",
      inicial: { html: "", js: "" },
      solucion: {
        html: "",
        js: `const mascotas = [
  { nombre: "Toby", especie: "perro" },
  { nombre: "Misi", especie: "gato" },
  { nombre: "Coco", especie: "loro" }
];

for (const mascota of mascotas) {
  console.log(\`\${mascota.nombre} es un \${mascota.especie}\`);
}
`
      },
      pistas: [
        "Cada mascota es un objeto entre llaves, y los tres van dentro de los corchetes del array, separados por comas. En el bucle, usa mascota.nombre y mascota.especie.",
        "Debe quedarte así:\nconst mascotas = [\n  { nombre: \"Toby\", especie: \"perro\" },\n  { nombre: \"Misi\", especie: \"gato\" },\n  { nombre: \"Coco\", especie: \"loro\" }\n];\n\nfor (const mascota of mascotas) {\n  console.log(mascota.nombre + \" es un \" + mascota.especie);\n}"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Con `const equipo = [{ nombre: \"Ana\", nivel: 3 }, { nombre: \"Leo\", nivel: 5 }];`, ¿qué muestra `console.log(equipo[1].nombre);`?",
      opciones: ["Ana", "Leo", "5"],
      correcta: 1,
      explicacion: "equipo[1] es el SEGUNDO objeto del array (se cuenta desde 0), y de ese objeto se lee la clave nombre: \"Leo\"."
    },
    {
      tipo: "reto",
      enunciado: "Crea la ficha de tu personaje de videojuego ⚔️:\n\n1. Crea un objeto `personaje` con un `nombre` (el que quieras), `vida` con el valor `100` y `nivel` con el valor `1`.\n2. Completa la función `pintarFicha()` para que ponga el nombre en `#nombre`, la vida en `#vida` y el nivel en `#nivel`, y llámala para que la ficha se vea al cargar.\n3. Al pulsar `#subir`, el personaje sube **1 nivel** y gana **10 de vida**: cambia el objeto y vuelve a pintar la ficha.",
      cssBase: `body { font-family: sans-serif; display: flex; justify-content: center; padding-top: 20px; background-color: #f0ebe3; }
.ficha { width: 260px; padding: 20px; border: 4px solid #6b4f2a; border-radius: 16px; background-color: #fffaf0; text-align: center; }
.ficha h2 { margin-top: 0; color: #6b4f2a; }
.ficha p { font-size: 20px; margin: 8px 0; }
#vida, #nivel { font-weight: bold; }
button { margin-top: 10px; padding: 10px 18px; font-size: 18px; border: none; border-radius: 10px; background-color: #6b4f2a; color: white; }`,
      inicial: {
        html: `<article class="ficha">
  <h2 id="nombre">?</h2>
  <p>❤️ Vida: <span id="vida">?</span></p>
  <p>⭐ Nivel: <span id="nivel">?</span></p>
  <button id="subir">Subir de nivel</button>
</article>
`,
        js: `// 1. Crea aquí el objeto personaje (nombre, vida y nivel)


function pintarFicha() {
  // 2. Pon el nombre, la vida y el nivel del personaje en la página
}

// Llama a pintarFicha() para que la ficha se vea al cargar


// 3. Al pulsar #subir: suma 1 al nivel y 10 a la vida, y vuelve a pintar la ficha
`
      },
      comprobaciones: [
        {
          texto: "Al cargar, la ficha muestra un nombre, **100** de vida y nivel **1**",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const nombre = (v.doc.querySelector("#nombre")?.textContent || "").trim();
            return nombre !== "" && nombre !== "?" && nombre !== "undefined"
              && v.doc.querySelector("#vida")?.textContent.trim() === "100"
              && v.doc.querySelector("#nivel")?.textContent.trim() === "1";
          }
        },
        {
          texto: "Al pulsar **Subir de nivel**, pasa a nivel **2** y a **110** de vida",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            v.doc.querySelector("#subir")?.click();
            return v.doc.querySelector("#nivel")?.textContent.trim() === "2"
              && v.doc.querySelector("#vida")?.textContent.trim() === "110";
          }
        },
        {
          texto: "Al pulsar tres veces, llega a nivel **4** y **130** de vida",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const b = v.doc.querySelector("#subir");
            if (!b) return false;
            b.click(); b.click(); b.click();
            return v.doc.querySelector("#nivel")?.textContent.trim() === "4"
              && v.doc.querySelector("#vida")?.textContent.trim() === "130";
          }
        }
      ],
      pistas: [
        "El objeto: const personaje = { nombre: \"…\", vida: 100, nivel: 1 };. En pintarFicha, tres líneas con textContent y personaje.nombre, personaje.vida y personaje.nivel. En el clic de #subir, cambia personaje.nivel y personaje.vida y llama otra vez a pintarFicha().",
        "Te debe quedar así:\nconst personaje = { nombre: \"Kira\", vida: 100, nivel: 1 };\n\nfunction pintarFicha() {\n  document.querySelector(\"#nombre\").textContent = personaje.nombre;\n  document.querySelector(\"#vida\").textContent = personaje.vida;\n  document.querySelector(\"#nivel\").textContent = personaje.nivel;\n}\n\npintarFicha();\n\ndocument.querySelector(\"#subir\").addEventListener(\"click\", () => {\n  personaje.nivel = personaje.nivel + 1;\n  personaje.vida = personaje.vida + 10;\n  pintarFicha();\n});"
      ],
      solucion: {
        html: `<article class="ficha">
  <h2 id="nombre">?</h2>
  <p>❤️ Vida: <span id="vida">?</span></p>
  <p>⭐ Nivel: <span id="nivel">?</span></p>
  <button id="subir">Subir de nivel</button>
</article>
`,
        js: `const personaje = {
  nombre: "Kira",
  vida: 100,
  nivel: 1
};

function pintarFicha() {
  document.querySelector("#nombre").textContent = personaje.nombre;
  document.querySelector("#vida").textContent = personaje.vida;
  document.querySelector("#nivel").textContent = personaje.nivel;
}

pintarFicha();

document.querySelector("#subir").addEventListener("click", () => {
  personaje.nivel = personaje.nivel + 1;
  personaje.vida = personaje.vida + 10;
  pintarFicha();
});
`
      }
    }
  ]
});
