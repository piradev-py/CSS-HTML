/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-15 (se ve como la 11)
   Filtrar listas — filter() con una función flecha que devuelve
   true/false, el array original no cambia, includes() como
   condición, quitar un dato con filter(x => x !== dato) y volver
   a pintar una lista filtrada al pulsar un botón.
   Notas:
   - El id es js-15 aunque va entre js-10 y js-11: los ids no se
     cambian nunca (el progreso guardado va por id).
   - Es lo que usa «Huellas»: filtrar servicios por mascota y
     cancelar una cita con citas.filter(c => c !== cita).
   - Reto: catálogo de mascotas en adopción con botones Todos /
     Perros / Gatos; cada comprobación empieza con PRUEBA.recargar.
   ============================================================ */
CURSO.registrar({
  id: "js-15",
  titulo: "Filtrar listas",
  xp: 45,
  objetivo: "Sabrás quedarte solo con algunos elementos de un array con filter() y enseñar en la página la lista filtrada.",
  glosario: [
    { termino: "filter()", tema: "Filtrar", para: "Un array nuevo solo con los elementos que cumplen la condición.", ejemplo: "const paraGatos = servicios.filter((s) => s.mascotas.includes(\"gato\"));", buscar: "filtrar quedarse algunos" },
    { termino: ".includes() (array)", tema: "Filtrar", para: "¿Está este valor en el array?", ejemplo: "if (mascotas.includes(\"perro\")) {\n  console.log(\"Sí\");\n}", buscar: "esta en la lista contiene" },
    { termino: "quitar con filter", tema: "Filtrar", para: "Quitar un elemento: quedarse con todos los que no son él.", ejemplo: "citas = citas.filter((otra) => otra !== cita);", buscar: "quitar borrar eliminar uno" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Quedarte con algunos: filter()",
      texto: "Muchas veces no quieres **todos** los datos de un array, solo **algunos**: los productos baratos, las canciones de rock, las citas de hoy…\n\nPara eso los arrays tienen `filter` («filtrar»). Le pasas una función que mira **cada** elemento y responde `true` (me lo quedo) o `false` (fuera). Es como un colador 🥣: lo que cumple la condición pasa, lo demás se queda fuera.\n\n`const baratos = precios.filter(precio => precio < 10);`\n\n`filter` te **devuelve un array nuevo** con los que pasan. El original no cambia: sigue teniendo todos.",
      ejemplo: {
        js: `const canciones = [
  { titulo: "Rock del dinosaurio", genero: "rock" },
  { titulo: "La cumbia del gato", genero: "cumbia" },
  { titulo: "Rock de la abuela", genero: "rock" }
];

const rockeras = canciones.filter(cancion => cancion.genero === "rock");

console.log(rockeras.length);
rockeras.forEach(cancion => console.log(cancion.titulo));
console.log(canciones.length);`
      },
      consejo: "La función flecha de `filter` **devuelve** la condición (sin llaves ni `return`, como `mitad` en la lección de Funciones). Si la condición sale `true`, el elemento se queda."
    },
    {
      tipo: "ejercicio",
      pestanas: ["js"],
      enunciado: "Busca chollos en la tienda 🏷️. Escribe en JS:\n\n• Un array `precios` con **12**, **5**, **30**, **8** y **3**, en ese orden.\n• Una constante `baratos` con los precios **menores que 10**, usando `filter`.\n• Muestra `baratos` en la consola (saldrá `[5, 8, 3]`).",
      inicial: { html: "", js: "" },
      solucion: {
        html: "",
        js: `const precios = [12, 5, 30, 8, 3];
const baratos = precios.filter(precio => precio < 10);
console.log(baratos);
`
      },
      pistas: [
        "Dentro de filter va una función flecha que recibe cada precio y devuelve si es menor que 10: precio => precio < 10.",
        "Debe quedarte así:\nconst precios = [12, 5, 30, 8, 3];\nconst baratos = precios.filter(precio => precio < 10);\nconsole.log(baratos);"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "¿Está en la lista? includes()",
      texto: "Otra pregunta muy útil: ¿este array **contiene** tal cosa? Para eso está `includes` («incluye»), que responde `true` o `false`:\n\n`[\"perro\", \"gato\"].includes(\"gato\")` → `true`\n\nY como responde `true`/`false`, es perfecto **dentro** de un `filter`. Por ejemplo, si cada juego guarda en un array las consolas donde funciona, te quedas con los que funcionan en una:\n\n`juegos.filter(juego => juego.consolas.includes(\"switch\"))`",
      ejemplo: {
        js: `const juegos = [
  { nombre: "Granja feliz", consolas: ["switch", "pc"] },
  { nombre: "Carreras locas", consolas: ["pc"] },
  { nombre: "Pingüino saltarín", consolas: ["switch"] }
];

console.log(juegos[0].consolas.includes("pc"));

const paraSwitch = juegos.filter(juego => juego.consolas.includes("switch"));
paraSwitch.forEach(juego => console.log(juego.nombre));`
      }
    },
    {
      tipo: "ejercicio",
      pestanas: ["js"],
      enunciado: "¿Qué puedo cocinar con huevos? 🥚 El array `recetas` ya está escrito. Debajo:\n\n• Crea una constante `conHuevo` con las recetas cuyos `ingredientes` incluyen **huevo**, usando `filter` e `includes`.\n• Muestra en la consola el `nombre` de cada una, una por línea (saldrán **Tortilla** y **Flan**).",
      inicial: {
        html: "",
        js: `const recetas = [
  { nombre: "Tortilla", ingredientes: ["huevo", "patata", "cebolla"] },
  { nombre: "Ensalada", ingredientes: ["lechuga", "tomate"] },
  { nombre: "Flan", ingredientes: ["huevo", "leche", "azúcar"] }
];

`
      },
      solucion: {
        html: "",
        js: `const recetas = [
  { nombre: "Tortilla", ingredientes: ["huevo", "patata", "cebolla"] },
  { nombre: "Ensalada", ingredientes: ["lechuga", "tomate"] },
  { nombre: "Flan", ingredientes: ["huevo", "leche", "azúcar"] }
];

const conHuevo = recetas.filter(receta => receta.ingredientes.includes("huevo"));
conHuevo.forEach(receta => console.log(receta.nombre));
`
      },
      pistas: [
        "La condición del filter es receta.ingredientes.includes(\"huevo\"). Después recorre conHuevo con forEach (o for…of) y muestra receta.nombre.",
        "Debajo del array escribe:\nconst conHuevo = recetas.filter(receta => receta.ingredientes.includes(\"huevo\"));\nconHuevo.forEach(receta => console.log(receta.nombre));"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Quitar uno de la lista",
      texto: "`filter` también sirve para **quitar** un dato del array: te quedas con todos **menos** ese. La condición es «distinto de»: `!==`.\n\n`invitados = invitados.filter(invitado => invitado !== \"Luis\");`\n\nFíjate en dos cosas:\n\n• Como `filter` da un array **nuevo**, lo guardas en la misma variable. Por eso esa variable se crea con `let`, no con `const`.\n• Es lo que necesitas para un botón «Cancelar» o «Quitar» que borre el dato de verdad, no solo de la página: así, cuando aprendas a guardar datos, se guardará la lista ya sin él.",
      ejemplo: {
        js: `let invitados = ["Ana", "Luis", "Marta"];

invitados = invitados.filter(invitado => invitado !== "Luis");

console.log(invitados);`
      }
    },
    {
      tipo: "ejercicio",
      pestanas: ["js"],
      enunciado: "El gato se ha comido un juguete 🐱. Escribe en JS:\n\n• Una variable `juguetes` (con `let`) con **Pelota**, **Ratón** y **Cuerda**, en ese orden.\n• Quita **Ratón** con `filter` y guarda el resultado en la misma variable `juguetes`.\n• Muestra `juguetes` en la consola (saldrá `[\"Pelota\", \"Cuerda\"]`).",
      inicial: { html: "", js: "" },
      solucion: {
        html: "",
        js: `let juguetes = ["Pelota", "Ratón", "Cuerda"];
juguetes = juguetes.filter(juguete => juguete !== "Ratón");
console.log(juguetes);
`
      },
      pistas: [
        "La condición es «distinto de Ratón»: juguete => juguete !== \"Ratón\". Y el resultado se guarda otra vez en juguetes (sin volver a escribir let).",
        "Debe quedarte así:\nlet juguetes = [\"Pelota\", \"Ratón\", \"Cuerda\"];\njuguetes = juguetes.filter(juguete => juguete !== \"Ratón\");\nconsole.log(juguetes);"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Filtrar en la página con botones",
      texto: "Ahora, a la página. El truco es tener **una función** que pinta la lista que le pases:\n\n1. `pintar(lista)` vacía el `<ul>` con `textContent = \"\"` y crea un `<li>` por cada dato (como en la lección de Crear elementos).\n2. Al cargar, `pintar(todas)`.\n3. Cada botón llama a `pintar` con la lista **filtrada**.\n\nAsí, la misma función sirve para todo. Pulsa los botones del resultado. 🍎",
      ejemplo: {
        html: `<button id="todas">Todas</button>
<button id="frutas">Solo frutas</button>
<ul id="compra"></ul>`,
        js: `const compras = [
  { nombre: "Manzanas", tipo: "fruta" },
  { nombre: "Pan", tipo: "panadería" },
  { nombre: "Plátanos", tipo: "fruta" }
];
const lista = document.querySelector("#compra");

function pintar(productos) {
  lista.textContent = "";
  for (const producto of productos) {
    const li = document.createElement("li");
    li.textContent = producto.nombre;
    lista.append(li);
  }
}

pintar(compras);

document.querySelector("#todas").addEventListener("click", () => {
  pintar(compras);
});
document.querySelector("#frutas").addEventListener("click", () => {
  pintar(compras.filter(producto => producto.tipo === "fruta"));
});`
      },
      consejo: "Si te olvidas de vaciar la lista al principio de `pintar`, cada clic **añade** los elementos debajo de los que ya había, y se repiten."
    },
    {
      tipo: "quiz",
      pregunta: "Tienes `const notas = [4, 9, 6];` y escribes `const aprobadas = notas.filter(nota => nota >= 5);`. ¿Qué hay después en `notas`?",
      opciones: ["[9, 6]", "[4, 9, 6]", "[4]"],
      correcta: 1,
      explicacion: "filter no toca el array original: devuelve uno nuevo. aprobadas vale [9, 6] y notas sigue siendo [4, 9, 6]."
    },
    {
      tipo: "reto",
      enunciado: "🐾 El refugio quiere que la gente encuentre su mascota ideal. Las mascotas ya están en el array `mascotas`.\n\n1. Escribe una función `pintar(elegidas)` que vacíe `#mascotas` y cree un `<li>` con el `nombre` de cada mascota de `elegidas`.\n2. Al cargar, pinta **todas**.\n3. Al pulsar `#perros`, pinta solo las de `especie` **perro**; al pulsar `#gatos`, solo las de **gato**.\n4. Al pulsar `#todas`, vuelve a pintar todas.",
      cssBase: `body { font-family: sans-serif; padding: 12px; background-color: #fff8ef; }
h2 { margin-top: 0; color: #7a3e12; }
button { padding: 8px 14px; margin-right: 4px; font-size: 15px; border: 2px solid #e0a46b; border-radius: 999px; background-color: white; }
#mascotas { padding-left: 24px; font-size: 18px; }
#mascotas li { margin: 6px 0; }`,
      inicial: {
        html: `<h2>🐾 Adopta en el refugio</h2>
<button id="todas">Todas</button>
<button id="perros">Perros</button>
<button id="gatos">Gatos</button>
<ul id="mascotas"></ul>
`,
        js: `const mascotas = [
  { nombre: "Toby", especie: "perro" },
  { nombre: "Misi", especie: "gato" },
  { nombre: "Lola", especie: "perro" },
  { nombre: "Nube", especie: "gato" },
  { nombre: "Rocky", especie: "perro" }
];
const lista = document.querySelector("#mascotas");

// 1. La función pintar(elegidas): vacía #mascotas y crea un <li> por mascota


// 2. Al cargar, pinta todas


// 3 y 4. Los botones #perros, #gatos y #todas
`
      },
      comprobaciones: [
        {
          texto: "Al cargar, la lista tiene las 5 mascotas",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            const nombres = [...v.doc.querySelectorAll("#mascotas li")].map(li => li.textContent);
            return nombres.length === 5 && nombres[0].includes("Toby") && nombres[4].includes("Rocky");
          }
        },
        {
          texto: "Al pulsar **Perros** salen solo Toby, Lola y Rocky",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            v.doc.querySelector("#perros")?.click();
            const nombres = [...v.doc.querySelectorAll("#mascotas li")].map(li => li.textContent.trim());
            return nombres.join(",") === "Toby,Lola,Rocky";
          }
        },
        {
          texto: "Al pulsar **Perros** y luego **Gatos** salen solo Misi y Nube (sin repetidos)",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            v.doc.querySelector("#perros")?.click();
            v.doc.querySelector("#gatos")?.click();
            const nombres = [...v.doc.querySelectorAll("#mascotas li")].map(li => li.textContent.trim());
            return nombres.join(",") === "Misi,Nube";
          }
        },
        {
          texto: "Al pulsar **Todas** después de filtrar, vuelven a salir las 5",
          prueba: async (doc) => {
            const v = await PRUEBA.recargar(doc);
            v.doc.querySelector("#gatos")?.click();
            if (v.doc.querySelectorAll("#mascotas li").length !== 2) return false;
            v.doc.querySelector("#todas")?.click();
            return v.doc.querySelectorAll("#mascotas li").length === 5;
          }
        }
      ],
      pistas: [
        "Copia la idea del ejemplo de la compra: pintar(elegidas) empieza con lista.textContent = \"\" y luego un for…of que crea los li. Cada botón llama a pintar con mascotas.filter(…).",
        "Te debe quedar así:\nfunction pintar(elegidas) {\n  lista.textContent = \"\";\n  for (const mascota of elegidas) {\n    const li = document.createElement(\"li\");\n    li.textContent = mascota.nombre;\n    lista.append(li);\n  }\n}\n\npintar(mascotas);\n\ndocument.querySelector(\"#perros\").addEventListener(\"click\", () => {\n  pintar(mascotas.filter(mascota => mascota.especie === \"perro\"));\n});\nY lo mismo para #gatos (con \"gato\") y para #todas (con pintar(mascotas))."
      ],
      solucion: {
        html: `<h2>🐾 Adopta en el refugio</h2>
<button id="todas">Todas</button>
<button id="perros">Perros</button>
<button id="gatos">Gatos</button>
<ul id="mascotas"></ul>
`,
        js: `const mascotas = [
  { nombre: "Toby", especie: "perro" },
  { nombre: "Misi", especie: "gato" },
  { nombre: "Lola", especie: "perro" },
  { nombre: "Nube", especie: "gato" },
  { nombre: "Rocky", especie: "perro" }
];
const lista = document.querySelector("#mascotas");

function pintar(elegidas) {
  lista.textContent = "";
  for (const mascota of elegidas) {
    const li = document.createElement("li");
    li.textContent = mascota.nombre;
    lista.append(li);
  }
}

pintar(mascotas);

document.querySelector("#todas").addEventListener("click", () => {
  pintar(mascotas);
});
document.querySelector("#perros").addEventListener("click", () => {
  pintar(mascotas.filter(mascota => mascota.especie === "perro"));
});
document.querySelector("#gatos").addEventListener("click", () => {
  pintar(mascotas.filter(mascota => mascota.especie === "gato"));
});
`
      }
    }
  ]
});
