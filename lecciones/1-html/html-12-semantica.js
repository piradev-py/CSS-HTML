/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-12
   HTML semántico y accesible — header, nav, main, section,
   article, aside, footer y repaso de accesibilidad.
   Reto = el gran reto del Mundo HTML antes del proyecto web: convertir una página hecha
   con <div> en una página semántica (y arreglar un alt).
   Las imágenes son locales y no se comprueba que carguen.
   ============================================================ */
CURSO.registrar({
  id: "html-12",
  titulo: "HTML semántico y accesible",
  xp: 50,
  objetivo: "Sabrás usar etiquetas que dicen lo que son para que buscadores y lectores de pantalla entiendan tu página.",
  // Lo que enseña esta lección, para el glosario de las lecciones de proyecto (js/glosario.js)
  glosario: [
    { termino: "<header>", tema: "Semántica", para: "La cabecera: logo, título y menú.", ejemplo: "<header>\n  <a href=\"#inicio\">Huellas</a>\n  <nav>…</nav>\n</header>", buscar: "cabecera arriba logo" },
    { termino: "<nav>", tema: "Semántica", para: "El menú principal de enlaces.", ejemplo: "<nav>\n  <ul>\n    <li><a href=\"#servicios\">Servicios</a></li>\n  </ul>\n</nav>", buscar: "menu navegacion enlaces" },
    { termino: "<main>", tema: "Semántica", para: "El contenido principal. Uno por página.", ejemplo: "<main>\n  <section id=\"servicios\">…</section>\n</main>", buscar: "principal contenido" },
    { termino: "<section>", tema: "Semántica", para: "Una parte de la página sobre un tema, con su título.", ejemplo: "<section id=\"equipo\">\n  <h2>Nuestro equipo</h2>\n</section>", buscar: "seccion parte bloque" },
    { termino: "<article>", tema: "Semántica", para: "Algo que tiene sentido por sí solo: una noticia, una tarjeta, una opinión.", ejemplo: "<article class=\"servicio\">\n  <h3>Vacunación</h3>\n  <p>…</p>\n</article>", buscar: "tarjeta noticia opinion" },
    { termino: "<aside>", tema: "Semántica", para: "Contenido secundario, de «por cierto…».", ejemplo: "<aside>\n  <p>¿Sabías que…?</p>\n</aside>", buscar: "lateral secundario" },
    { termino: "<footer>", tema: "Semántica", para: "El pie de la página: contacto, autoría, letra pequeña.", ejemplo: "<footer>\n  <p>© Huellas</p>\n</footer>", buscar: "pie abajo contacto" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Etiquetas con significado",
      texto: "**Semántica** significa «significado». Un HTML semántico usa etiquetas que **dicen lo que son**.\n\nImagina una casa donde todas las puertas tienen el cartel «habitación» 🚪. ¿Dónde está la cocina? Así es una página hecha solo con `<div>`. Si los carteles dicen «cocina», «baño» o «dormitorio», cualquiera se orienta.\n\n¿Quién lo agradece?\n\n• Los **lectores de pantalla**, que pueden saltar directos al menú o al contenido.\n• Los **buscadores**, que entienden mejor tu página.\n• Tú, cuando leas tu código dentro de un mes.",
      ejemplo: {
        html: `<div class="cabecera">
  <p>🙈 Soy una cabecera hecha con div: nadie sabe qué soy.</p>
</div>
<header>
  <p>😎 Soy un header: todo el mundo sabe que soy la cabecera.</p>
</header>`,
        css: ""
      },
      consejo: "Fíjate: ¡se ven exactamente igual! La semántica no cambia el **aspecto**, cambia el **significado**. El aspecto será cosa del CSS."
    },
    {
      tipo: "explicacion",
      titulo: "Las cuatro grandes zonas",
      texto: "Casi todas las webs tienen las mismas zonas:\n\n• `<header>`: la **cabecera**, arriba del todo. Suele llevar el logo y el `<h1>`.\n• `<nav>`: el **menú** con los enlaces principales para navegar.\n• `<main>`: el **contenido principal**, lo que hace única a esa página. Solo hay **un** `<main>` por página.\n• `<footer>`: el **pie**, abajo del todo: autoría, contacto, letra pequeña.",
      ejemplo: {
        html: `<header>
  <h1>Cocina en el espacio 🚀</h1>
  <nav>
    <a href="#receta">Receta</a>
    <a href="#contacto">Contacto</a>
  </nav>
</header>
<main>
  <h2 id="receta">Espaguetis sin gravedad</h2>
  <p>Truco: sujétalos al plato con velcro.</p>
</main>
<footer>
  <p id="contacto">Escrito en órbita por la comandante Lola.</p>
</footer>`,
        css: ""
      },
      consejo: "El `<nav>` suele ir **dentro** del `<header>`, como en el ejemplo. Y no todo grupo de enlaces es un nav: resérvalo para el menú **principal**."
    },
    {
      tipo: "explicacion",
      titulo: "Dentro del main: section, article y aside",
      texto: "Para ordenar el `<main>` hay tres etiquetas más:\n\n• `<section>`: una **parte** de la página sobre un tema, con su propio título.\n• `<article>`: algo que tiene sentido **por sí solo**, aunque lo copiaras en otra web: una noticia, una receta, un comentario.\n• `<aside>`: contenido **secundario**, de «por cierto…»: curiosidades, enlaces relacionados.\n\n¿Y el `<div>`? Sigue siendo útil, pero solo cuando ninguna etiqueta con significado encaja.",
      ejemplo: {
        html: `<main>
  <article>
    <h2>Tortitas que flotan</h2>
    <p>Para darles la vuelta no necesitas sartén: solo sopla.</p>
  </article>
  <aside>
    <p>¿Sabías que en el espacio la comida sabe más sosa? 🧂</p>
  </aside>
</main>`,
        css: ""
      },
      consejo: "Checklist de accesibilidad de todo el Mundo HTML ✅\n• Cada `<img>` con su `alt`.\n• Cada campo con su `<label for>`.\n• Un solo `<h1>` y títulos sin saltar niveles.\n• Zonas con etiquetas semánticas.\n¡Si cumples esto, tu HTML ya es de nivel profesional!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Escribe un trocito del **Diario Gatuno** 🐾. En este orden, sin ningún atributo:\n\n1. Un `<article>` con dos cosas dentro:\n   • un `<h2>` que diga **Un gato tira un vaso de la mesa**\n   • y debajo un `<p>` que diga **Lo miró fijamente antes de empujarlo.**\n2. Después del `</article>`, un `<aside>` con un `<p>` dentro que diga **Consejo del día: la caja vale más que el regalo.**",
      solucion: {
        html: `<article>
  <h2>Un gato tira un vaso de la mesa</h2>
  <p>Lo miró fijamente antes de empujarlo.</p>
</article>
<aside>
  <p>Consejo del día: la caja vale más que el regalo.</p>
</aside>`,
        css: ""
      },
      pistas: [
        "La noticia tiene sentido por sí sola, por eso va en <article>…</article> con su <h2> y su <p> dentro. El consejo es un «por cierto…», por eso va en <aside>…</aside>, que se abre después de cerrar el article.",
        "Debe quedarte así:\n<article>\n  <h2>Un gato tira un vaso de la mesa</h2>\n  <p>Lo miró fijamente antes de empujarlo.</p>\n</article>\n<aside>\n  <p>Consejo del día: la caja vale más que el regalo.</p>\n</aside>"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Tu web tiene un menú con enlaces a «Inicio», «Recetas» y «Contacto». ¿Con qué etiqueta lo envuelves?",
      opciones: ["<div class=\"menu\">", "<nav>", "<footer>"],
      correcta: 1,
      explicacion: "<nav> dice «soy el menú de navegación», y los lectores de pantalla permiten saltar directamente a él. Un div funcionaría, pero no dice nada; y <footer> es el pie de página."
    },
    {
      tipo: "reto",
      enunciado: "🐉 **¡El gran reto del Mundo HTML!** Esta web está hecha solo con `<div>`. Conviértela en una página semántica:\n\n1. La cabecera (la del `<h1>`) → `<header>`, y el menú de enlaces → `<nav>`.\n2. El contenido principal → `<main>`.\n3. El pie de página → `<footer>`.\n4. Repaso: a la imagen le falta su texto alternativo. Añádele un `alt` que la describa.\n\nCambia también cada `</div>` por el cierre que le toque.",
      inicial: {
        html: `<!-- Cambia cada <div> por su etiqueta semántica (¡y su cierre también!) -->
<div class="cabecera">
  <h1>Club de Excursionistas Perezosos</h1>
  <div class="menu">
    <a href="#ruta">Ruta del mes</a>
    <a href="#contacto">Contacto</a>
  </div>
</div>

<div class="contenido">
  <h2 id="ruta">Ruta del mes: el Pico Siesta</h2>
  <!-- A esta imagen le falta algo importante… -->
  <img src="recursos/img/montana.svg" width="200" height="150">
  <p>Subimos en teleférico, merendamos arriba y bajamos sin prisa.</p>
</div>

<div class="pie">
  <p id="contacto">Escríbenos cuando quieras: contestamos después de la siesta.</p>
</div>
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "El <h1> está dentro de un <header> y los enlaces del menú dentro de un <nav>",
          prueba: (doc) => !!doc.querySelector("header h1")
            && doc.querySelectorAll("nav a").length >= 2
        },
        {
          texto: "El contenido principal (el <h2> y la imagen) está dentro de un único <main>",
          prueba: (doc) => doc.querySelectorAll("main").length === 1
            && !!doc.querySelector("main h2")
            && !!doc.querySelector("main img")
        },
        {
          texto: "El pie de página está dentro de un <footer>",
          prueba: (doc) => !!doc.querySelector("footer p")
        },
        {
          texto: "La imagen tiene un texto alternativo (alt) que la describe",
          prueba: (doc) => (doc.querySelector("img")?.getAttribute("alt") || "").trim().length > 0
        }
      ],
      pistas: [
        "Ve de caja en caja: <div class=\"cabecera\"> pasa a ser <header>, <div class=\"menu\"> pasa a ser <nav>, <div class=\"contenido\"> pasa a ser <main> y <div class=\"pie\"> pasa a ser <footer>. Recuerda: se cierra primero la última que abriste. Y a la imagen añádele alt=\"…\".",
        "La cabecera queda así:\n<header>\n  <h1>…</h1>\n  <nav>\n    <a href=\"#ruta\">Ruta del mes</a>\n    <a href=\"#contacto\">Contacto</a>\n  </nav>\n</header>\nLuego <main>…</main> con el h2, la imagen y el párrafo, y <footer>…</footer> con el último párrafo. La imagen: <img src=\"recursos/img/montana.svg\" alt=\"Dos montañas nevadas bajo el sol\" width=\"200\" height=\"150\">"
      ],
      solucion: {
        html: `<header>
  <h1>Club de Excursionistas Perezosos</h1>
  <nav>
    <a href="#ruta">Ruta del mes</a>
    <a href="#contacto">Contacto</a>
  </nav>
</header>

<main>
  <h2 id="ruta">Ruta del mes: el Pico Siesta</h2>
  <img src="recursos/img/montana.svg" alt="Dos montañas nevadas bajo el sol, con pinos al pie" width="200" height="150">
  <p>Subimos en teleférico, merendamos arriba y bajamos sin prisa.</p>
</main>

<footer>
  <p id="contacto">Escríbenos cuando quieras: contestamos después de la siesta.</p>
</footer>
`,
        css: ""
      }
    }
  ]
});
