/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-05
   Listas — <ul>, <ol>, <li> y listas dentro de listas.
   ============================================================ */
CURSO.registrar({
  id: "html-05",
  titulo: "Listas",
  xp: 30,
  objetivo: "Sabrás crear listas con viñetas, listas numeradas y listas dentro de listas.",
  // Lo que enseña esta lección, para el glosario de las lecciones de proyecto (js/glosario.js)
  glosario: [
    { termino: "<ul> y <li>", tema: "Listas", para: "Lista con puntos (sin orden); cada elemento va en un `<li>`.", ejemplo: "<ul>\n  <li>Perros</li>\n  <li>Gatos</li>\n</ul>", buscar: "lista puntos vinetas menu" },
    { termino: "<ol>", tema: "Listas", para: "Lista numerada, cuando el orden importa.", ejemplo: "<ol>\n  <li>Pide cita</li>\n  <li>Ven a la clínica</li>\n</ol>", buscar: "numerada pasos orden" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Listas con viñetas",
      texto: "Una lista con viñetas (esos puntitos •) se escribe con dos etiquetas:\n\n• `<ul>` es la caja que envuelve **toda** la lista. Viene de «unordered list»: lista **sin orden**.\n• `<li>` es **cada elemento** de la lista («list item»).\n\nÚsala cuando el orden da igual, como en la mochila de un aventurero 🎒: ¡no importa si metes antes la linterna o el bocadillo!",
      ejemplo: {
        html: `<h2>Mi mochila de aventuras</h2>
<ul>
  <li>Linterna</li>
  <li>Mapa del tesoro</li>
  <li>Bocadillo de calamares</li>
</ul>`,
        css: ""
      },
      consejo: "Dentro de `<ul>` solo pueden ir `<li>`. Si escribes texto suelto ahí dentro, el navegador se hace un lío."
    },
    {
      tipo: "explicacion",
      titulo: "Listas numeradas",
      texto: "Cuando el **orden importa**, usa `<ol>` («ordered list»: lista **ordenada**). Los elementos siguen siendo `<li>`, pero el navegador los numera él solo: 1, 2, 3…\n\nEs perfecta para pasos, rankings o el podio de una carrera 🏆. Y lo mejor: si añades o quitas un elemento, ¡los números se recolocan solos!",
      ejemplo: {
        html: `<h2>Podio de la carrera de caracoles</h2>
<ol>
  <li>Turbo</li>
  <li>Babosín</li>
  <li>Doña Lenta</li>
</ol>`,
        css: ""
      },
      consejo: "Fíjate en la sangría: los `<li>` van un poco más a la derecha porque están **dentro** de la lista."
    },
    {
      tipo: "explicacion",
      titulo: "Listas dentro de listas",
      texto: "A veces un elemento tiene sus propios detalles. Para eso escribes una lista nueva **dentro de un `<li>`**: justo después de su texto y antes de su cierre `</li>`.\n\nEs como una carpeta con subcarpetas 🗂️. Mira cómo el navegador mete hacia dentro la lista pequeña y le cambia la viñeta. Puedes mezclar tipos: una `<ol>` dentro de una `<ul>`, o al revés.",
      ejemplo: {
        html: `<h2>Merienda del dragón</h2>
<ul>
  <li>Cosas picantes
    <ul>
      <li>Guindillas</li>
      <li>Wasabi</li>
    </ul>
  </li>
  <li>Un vaso de lava</li>
</ul>`,
        css: ""
      },
      consejo: "Error típico: poner la lista de dentro **entre** dos `<li>`. La sublista vive **dentro** de un `<li>`, antes de su `</li>`."
    },
    {
      tipo: "ejercicio",
      enunciado: "Haz la lista de la compra de un mago 🧙. Escribe una lista con viñetas `<ul>` con **dos** elementos `<li>`:\n\n1. El primero dice **Ingredientes de pociones**. Dentro de él, después de ese texto y antes de su `</li>`, mete otra lista con viñetas `<ul>` con dos `<li>`: **Ojo de sapo** y **Pelo de troll**.\n2. El segundo dice **Una varita nueva**.",
      pistas: [
        "Empieza por la lista grande: un <ul> con dos <li>. Luego vuelve al primer <li> y, justo después de su texto (antes de </li>), escribe la lista pequeña: otro <ul> con sus dos <li>.",
        "El primer elemento queda así:\n<li>Ingredientes de pociones\n  <ul>\n    <li>Ojo de sapo</li>\n    <li>Pelo de troll</li>\n  </ul>\n</li>\nDebajo va el segundo <li> y, al final, el </ul> de la lista grande."
      ],
      solucion: {
        html: `<ul>
  <li>Ingredientes de pociones
    <ul>
      <li>Ojo de sapo</li>
      <li>Pelo de troll</li>
    </ul>
  </li>
  <li>Una varita nueva</li>
</ul>
`,
        css: ""
      }
    },
    {
      tipo: "quiz",
      pregunta: "Quieres añadir una lista dentro de otra. ¿Dónde se escribe la lista de dentro?",
      opciones: [
        "Dentro de un <li>, antes de su </li>",
        "Directamente dentro del <ul>, entre dos <li>",
        "Después de cerrar la primera lista"
      ],
      correcta: 0,
      explicacion: "La sublista pertenece a un elemento concreto, así que va dentro de su <li>. Dentro de <ul> u <ol> solo pueden ir <li>."
    },
    {
      tipo: "reto",
      enunciado: "Escribe la receta del batido Tsunami de Fresa 🍓:\n\n• Debajo de «Ingredientes», una lista con viñetas `<ul>` con **al menos 3** ingredientes.\n• Debajo de «Pasos», una lista numerada `<ol>` con **al menos 3** pasos.",
      inicial: {
        html: `<h1>Batido Tsunami de Fresa</h1>

<h2>Ingredientes</h2>
<!-- Lista con viñetas: fresas, un plátano, un vaso de leche… -->

<h2>Pasos</h2>
<!-- Lista numerada: lavar la fruta, meterlo todo en la batidora, batir… ¡con la tapa puesta! -->
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "Hay una lista con viñetas <ul> con al menos 3 ingredientes",
          prueba: (doc) => Array.from(doc.querySelectorAll("ul")).some(ul =>
            Array.from(ul.children)
              .filter(c => c.tagName === "LI" && c.textContent.trim().length > 0).length >= 3)
        },
        {
          texto: "Hay una lista numerada <ol> con al menos 3 pasos",
          prueba: (doc) => Array.from(doc.querySelectorAll("ol")).some(ol =>
            Array.from(ol.children)
              .filter(c => c.tagName === "LI" && c.textContent.trim().length > 0).length >= 3)
        },
        {
          texto: "Los ingredientes (<ul>) van antes que los pasos (<ol>)",
          prueba: (doc) => doc.querySelector("ul, ol")?.tagName === "UL"
        }
      ],
      pistas: [
        "Los ingredientes no tienen orden, así que van en una <ul>. Los pasos sí lo tienen, así que van en una <ol>. Cada elemento de las dos listas es un <li>.",
        "Debajo de Ingredientes:\n<ul>\n  <li>Fresas</li>\n  <li>Un plátano</li>\n  <li>Un vaso de leche</li>\n</ul>\nY debajo de Pasos, lo mismo pero con <ol> y tres pasos."
      ],
      solucion: {
        html: `<h1>Batido Tsunami de Fresa</h1>

<h2>Ingredientes</h2>
<ul>
  <li>Un puñado de fresas</li>
  <li>Un plátano</li>
  <li>Un vaso de leche</li>
</ul>

<h2>Pasos</h2>
<ol>
  <li>Lava las fresas y pela el plátano.</li>
  <li>Mételo todo en la batidora.</li>
  <li>Pon la tapa (¡muy importante!) y bate.</li>
</ol>
`,
        css: ""
      }
    }
  ]
});
