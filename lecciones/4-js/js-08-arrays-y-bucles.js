/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-08
   Arrays y bucles — array, índice (desde 0), length (ya visto en
   textos en js-07), push(), bucle for…of, acumular una suma y
   forEach() (también sobre la lista de querySelectorAll).
   Notas:
   - A propósito NO se enseñan while ni el for clásico con índice:
     el motor no protege contra bucles infinitos.
   - El reto obliga a calcular de verdad: un botón añade una ronda
     con push y hay que volver a sumar (un "500" escrito a mano
     no pasa la tercera comprobación).
   - Cuidado: los ${…} de los ejemplos van escapados (\${…}).
   ============================================================ */
CURSO.registrar({
  id: "js-08",
  titulo: "Arrays y bucles",
  xp: 45,
  objetivo: "Sabrás guardar listas de datos en un array y recorrerlas con un bucle para hacer algo con cada elemento.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Una lista con nombre: el array",
      texto: "Hasta ahora cada variable guardaba **un** dato. Un **array** guarda una **lista** de datos en orden, entre corchetes `[ ]` y separados por comas.\n\nImagínalo como un tren 🚂: cada vagón lleva un dato y tiene un número, su **índice**. ¡Ojo! Se empieza a contar por el **0**: el primer vagón es el `0`, el segundo el `1`…\n\nPara sacar un dato, escribe el nombre del array y el índice entre corchetes: `frutas[0]`.",
      ejemplo: {
        js: `const frutas = ["manzana", "pera", "plátano"];

console.log(frutas);     // la lista entera
console.log(frutas[0]);  // la primera
console.log(frutas[2]);  // la tercera
console.log(frutas[5]);  // no existe: undefined`
      },
      consejo: "¿Te sale `undefined` («sin definir»)? Has pedido un índice que no existe. Recuerda: si el array tiene 3 datos, los índices son 0, 1 y 2."
    },
    {
      tipo: "explicacion",
      titulo: "Cuántos hay y añadir más: length y push",
      texto: "¿Recuerdas `.length`, que daba la longitud de un texto? En un array te dice **cuántos datos** tiene: `frutas.length`.\n\nPara añadir un dato **al final** de la lista se usa `push` («empujar»): `frutas.push(\"kiwi\");`. Como el array cambia por dentro, puede seguir siendo `const`: la lista es la misma, solo que más larga.\n\nUn truco: el último dato siempre está en el índice `length - 1`.",
      ejemplo: {
        js: `const frutas = ["manzana", "pera", "plátano"];
console.log(frutas.length);

frutas.push("kiwi");
console.log(frutas);
console.log(frutas.length);
console.log(frutas[frutas.length - 1]); // la última`
      }
    },
    {
      tipo: "ejercicio",
      pestanas: ["js"],
      enunciado: "Prepara la mochila de tu aventurera 🎒. Escribe en JS:\n\n• Un array `mochila` con **espada**, **escudo** y **poción**, en ese orden.\n• Muestra en la consola el **primer** objeto de la mochila (saldrá **espada**).\n• Añade **mapa** al final con `push`.\n• Muestra en la consola cuántas cosas hay en la mochila (saldrá **4**).\n• Muestra en la consola la mochila entera.",
      inicial: { html: "", js: "" },
      solucion: {
        html: "",
        js: `const mochila = ["espada", "escudo", "poción"];
console.log(mochila[0]);

mochila.push("mapa");
console.log(mochila.length);
console.log(mochila);
`
      },
      pistas: [
        "El primer objeto está en el índice 0: mochila[0]. Para contar, mochila.length. Y para la mochila entera, console.log(mochila).",
        "Debe quedarte así:\nconst mochila = [\"espada\", \"escudo\", \"poción\"];\nconsole.log(mochila[0]);\n\nmochila.push(\"mapa\");\nconsole.log(mochila.length);\nconsole.log(mochila);"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Repetir para cada uno: for…of",
      texto: "¿Saludar a cada amigo de una lista de 100? No vas a escribir 100 líneas: usa un **bucle**, que repite unas órdenes una vez **por cada** dato del array.\n\n`for (const amigo of amigos) { … }` se lee: «**para cada** `amigo` **de** `amigos`, haz lo de las llaves». En cada vuelta, `amigo` vale el siguiente dato: primero `\"Ana\"`, luego `\"Leo\"`… Es como repartir caramelos 🍬 en una fila: uno a cada niño, hasta que no queda nadie.\n\nEl nombre `amigo` lo eliges tú; suele ser el singular del array.",
      ejemplo: {
        js: `const amigos = ["Ana", "Leo", "Sara"];

for (const amigo of amigos) {
  console.log(\`¡Hola, \${amigo}!\`);
}

console.log("Fin del bucle");`
      },
      consejo: "Si añades un amigo al array, el bucle lo saluda sin que cambies nada más. ¡Esa es la magia de los bucles! ✨"
    },
    {
      tipo: "ejercicio",
      pestanas: ["js"],
      enunciado: "Pon la música de tu fiesta 🎶. Escribe en JS:\n\n• Un array `canciones` con **La cumbia del gato**, **Rock del dinosaurio** y **Baladita de la luna**, en ese orden.\n• Recórrelo con `for…of` y muestra en la consola, para cada una, **Sonando: ** seguido de su nombre. La primera línea será **Sonando: La cumbia del gato**.",
      inicial: { html: "", js: "" },
      solucion: {
        html: "",
        js: `const canciones = ["La cumbia del gato", "Rock del dinosaurio", "Baladita de la luna"];

for (const cancion of canciones) {
  console.log(\`Sonando: \${cancion}\`);
}
`
      },
      pistas: [
        "Escribe el array y, debajo, for (const cancion of canciones) { … }. Dentro de las llaves, un console.log que junte \"Sonando: \" con cancion.",
        "Debe quedarte así:\nconst canciones = [\"La cumbia del gato\", \"Rock del dinosaurio\", \"Baladita de la luna\"];\n\nfor (const cancion of canciones) {\n  console.log(\"Sonando: \" + cancion);\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Sumar todo: el acumulador",
      texto: "Un uso clásico de los bucles: **sumar** todos los números de un array. El truco es una variable que va **acumulando**, como una hucha 🐷:\n\n1. Antes del bucle, `let total = 0;` (la hucha vacía).\n2. Dentro, en cada vuelta, `total = total + precio;` (meter una moneda).\n3. Después del bucle, `total` ya tiene la suma completa.\n\nOjo: `total` va con `let` (cambia) y **fuera** del bucle; si la creas dentro, empieza de cero en cada vuelta.",
      ejemplo: {
        html: `<p>🛒 Total de la compra: <b id="total"></b> €</p>`,
        js: `const precios = [3, 12, 5, 4];
let total = 0;

for (const precio of precios) {
  total = total + precio;
  console.log(\`Sumo \${precio}: llevo \${total}\`);
}

document.querySelector("#total").textContent = total;`
      }
    },
    {
      tipo: "explicacion",
      titulo: "Otra forma: forEach",
      texto: "Los arrays tienen una orden que hace lo mismo que `for…of`: `forEach` («para cada uno»). Le pasas una **función** y la ejecuta una vez por cada dato, dándoselo como parámetro:\n\n`amigos.forEach(amigo => console.log(amigo));`\n\nY lo mejor: la lista que devuelve `querySelectorAll` también tiene `forEach`. Así puedes cambiar **todos** los elementos de golpe. Pulsa el botón del resultado. 🌈",
      ejemplo: {
        html: `<ul>
  <li class="planeta">Mercurio</li>
  <li class="planeta">Venus</li>
  <li class="planeta">Tierra</li>
</ul>
<button id="colorear">Colorear todos</button>`,
        css: `.azul { color: royalblue; font-weight: bold; }`,
        js: `const planetas = document.querySelectorAll(".planeta");

document.querySelector("#colorear").addEventListener("click", () => {
  planetas.forEach(planeta => {
    planeta.classList.add("azul");
  });
});`
      },
      consejo: "`for…of` y `forEach` hacen lo mismo: usa el que te resulte más claro. Lo que **no** puedes hacer es `planetas.classList.add(…)` sobre la lista entera: la clase se pone elemento a elemento."
    },
    {
      tipo: "ejercicio",
      enunciado: "Termina tus tareas de casa de un solo clic 🧹. El HTML ya está escrito.\n\nAl pulsar el botón `#todas`, busca todos los elementos con la clase `tarea` (`querySelectorAll`) y, con `forEach`, añade a **cada uno** la clase `hecha`.",
      cssBase: `body { font-family: sans-serif; padding: 10px; }
ul { list-style: none; padding: 0; }
.tarea { padding: 8px 12px; margin-bottom: 6px; background-color: #fff3cd; border-radius: 8px; font-size: 18px; }
.tarea::before { content: "⬜ "; }
.hecha { background-color: #d1f2d9; text-decoration: line-through; color: #2f7a43; }
.hecha::before { content: "✅ "; }
button { padding: 9px 16px; font-size: 18px; border: none; border-radius: 8px; background-color: seagreen; color: white; }`,
      inicial: {
        html: `<ul>
  <li class="tarea">Hacer la cama</li>
  <li class="tarea">Pasear al perro</li>
  <li class="tarea">Regar las plantas</li>
</ul>
<button id="todas">Marcar todas</button>
`,
        js: ""
      },
      solucion: {
        html: `<ul>
  <li class="tarea">Hacer la cama</li>
  <li class="tarea">Pasear al perro</li>
  <li class="tarea">Regar las plantas</li>
</ul>
<button id="todas">Marcar todas</button>
`,
        js: `const tareas = document.querySelectorAll(".tarea");

document.querySelector("#todas").addEventListener("click", () => {
  tareas.forEach(tarea => {
    tarea.classList.add("hecha");
  });
});
`
      },
      acciones: [{ clic: "#todas" }],
      pistas: [
        "Guarda la lista con document.querySelectorAll(\".tarea\"). Dentro del addEventListener del botón, llama a tareas.forEach con una función que reciba cada tarea y le añada la clase.",
        "Debe quedarte así:\nconst tareas = document.querySelectorAll(\".tarea\");\n\ndocument.querySelector(\"#todas\").addEventListener(\"click\", () => {\n  tareas.forEach(tarea => {\n    tarea.classList.add(\"hecha\");\n  });\n});"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Con `const colores = [\"rojo\", \"verde\", \"azul\"];`, ¿qué muestra `console.log(colores[1]);`?",
      opciones: ["rojo", "verde", "azul"],
      correcta: 1,
      explicacion: "Los índices empiezan en 0: colores[0] es \"rojo\", colores[1] es \"verde\" y colores[2] es \"azul\"."
    },
    {
      tipo: "reto",
      enunciado: "Muestra el marcador de tu partida 🎮. Las puntuaciones de cada ronda ya están en el array `puntos`. Completa la función `mostrarResultado()`:\n\n1. Pon en `#rondas` cuántas rondas hay (la longitud del array).\n2. Suma todas las puntuaciones con un bucle y pon el resultado en `#total`.\n3. Al pulsar el botón `#extra`, añade `100` al array con `push` y vuelve a llamar a `mostrarResultado()` para que el marcador se actualice.",
      cssBase: `body { font-family: sans-serif; display: flex; justify-content: center; padding-top: 20px; background-color: #1e1b3a; color: white; }
.marcador { width: 300px; padding: 20px; border-radius: 16px; background-color: #2d2a55; text-align: center; box-shadow: 0 0 20px rgb(120 100 255 / 0.4); }
.marcador h2 { margin-top: 0; }
.marcador p { font-size: 20px; }
#rondas, #total { font-weight: bold; color: #ffd166; }
button { padding: 10px 18px; font-size: 18px; border: none; border-radius: 10px; background-color: #ffd166; color: #1e1b3a; font-weight: bold; }`,
      inicial: {
        html: `<section class="marcador">
  <h2>🏆 Resultado de la partida</h2>
  <p>Rondas jugadas: <span id="rondas">?</span></p>
  <p>Puntuación total: <span id="total">?</span></p>
  <button id="extra">Ronda extra (+100)</button>
</section>
`,
        js: `const puntos = [120, 80, 45, 200, 55];
const textoRondas = document.querySelector("#rondas");
const textoTotal = document.querySelector("#total");

function mostrarResultado() {
  // 1. Pon en textoRondas cuántas puntuaciones hay

  // 2. Suma todas las puntuaciones con un bucle

  // 3. Pon la suma en textoTotal
}

mostrarResultado();

// 4. Al pulsar #extra: añade 100 al array y vuelve a llamar a mostrarResultado()
`
      },
      comprobaciones: [
        {
          texto: "`#rondas` muestra cuántas puntuaciones hay: **5**",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            return v.doc.querySelector("#rondas")?.textContent.trim() === "5";
          }
        },
        {
          texto: "`#total` muestra la suma de todas las puntuaciones: **500**",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            return v.doc.querySelector("#total")?.textContent.trim() === "500";
          }
        },
        {
          texto: "Al pulsar **Ronda extra (+100)**, el marcador pasa a **6** rondas y **600** puntos (y a 7 y 700 si lo pulsas otra vez)",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const b = v.doc.querySelector("#extra");
            const r = v.doc.querySelector("#rondas");
            const t = v.doc.querySelector("#total");
            if (!b || !r || !t) return false;
            b.click();
            const una = r.textContent.trim() === "6" && t.textContent.trim() === "600";
            b.click();
            return una && r.textContent.trim() === "7" && t.textContent.trim() === "700";
          }
        }
      ],
      pistas: [
        "Dentro de la función: textoRondas.textContent = puntos.length; después, el acumulador (let suma = 0; y un for…of que vaya sumando cada punto) y, al final, textoTotal.textContent = suma. La suma debe empezar en 0 DENTRO de la función, para que cada vez cuente desde cero.",
        "La función debe quedar así:\nfunction mostrarResultado() {\n  textoRondas.textContent = puntos.length;\n  let suma = 0;\n  for (const punto of puntos) {\n    suma = suma + punto;\n  }\n  textoTotal.textContent = suma;\n}\nY abajo:\ndocument.querySelector(\"#extra\").addEventListener(\"click\", () => {\n  puntos.push(100);\n  mostrarResultado();\n});"
      ],
      solucion: {
        html: `<section class="marcador">
  <h2>🏆 Resultado de la partida</h2>
  <p>Rondas jugadas: <span id="rondas">?</span></p>
  <p>Puntuación total: <span id="total">?</span></p>
  <button id="extra">Ronda extra (+100)</button>
</section>
`,
        js: `const puntos = [120, 80, 45, 200, 55];
const textoRondas = document.querySelector("#rondas");
const textoTotal = document.querySelector("#total");

function mostrarResultado() {
  textoRondas.textContent = puntos.length;

  let suma = 0;
  for (const punto of puntos) {
    suma = suma + punto;
  }

  textoTotal.textContent = suma;
}

mostrarResultado();

document.querySelector("#extra").addEventListener("click", () => {
  puntos.push(100);
  mostrarResultado();
});
`
      }
    }
  ]
});
