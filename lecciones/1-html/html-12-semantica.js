/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-12
   HTML semántico y accesible — header, nav, main, section,
   article, aside, footer y repaso de accesibilidad.
   Reto = jefe final del Mundo HTML: convertir una página hecha
   con <div> en una página semántica (y arreglar un alt).
   Las imágenes son locales y no se comprueba que carguen.
   ============================================================ */
CURSO.registrar({
  id: "html-12",
  titulo: "HTML semántico y accesible",
  xp: 50,
  objetivo: "Sabrás usar etiquetas que dicen lo que son para que buscadores y lectores de pantalla entiendan tu página.",
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
      tipo: "pruebalo",
      instruccion: "Esta página ya es semántica 🐾. Añade dentro de la `<section>` un segundo `<article>` con otra noticia gatuna (con su `<h3>` y su `<p>`).\n\nDespués cambia `<aside>` y `</aside>` por `<div>` y `</div>`. ¿Ves alguna diferencia? Ninguna a la vista… pero un lector de pantalla sí la nota.",
      inicial: {
        html: `<header>
  <h1>El Diario Gatuno</h1>
  <nav>
    <a href="#noticias">Noticias</a>
    <a href="#contacto">Contacto</a>
  </nav>
</header>

<main>
  <section id="noticias">
    <h2>Noticias</h2>
    <article>
      <h3>Un gato tira un vaso de la mesa</h3>
      <img src="recursos/img/gato.svg" alt="Gato naranja de ojos grandes con cara de inocente" width="200" height="150">
      <p>Los testigos aseguran que lo miró fijamente antes de empujarlo.</p>
    </article>
  </section>
  <aside>
    <p>Consejo del día: la caja vale más que el regalo.</p>
  </aside>
</main>

<footer>
  <p id="contacto">Redacción: encima del radiador.</p>
</footer>
`,
        css: "",
        js: ""
      }
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
      enunciado: "🐉 **¡Jefe final del Mundo HTML!** Esta web está hecha solo con `<div>`. Conviértela en una página semántica:\n\n1. La cabecera (la del `<h1>`) → `<header>`, y el menú de enlaces → `<nav>`.\n2. El contenido principal → `<main>`.\n3. El pie de página → `<footer>`.\n4. Repaso: a la imagen le falta su texto alternativo. Añádele un `alt` que la describa.\n\nCambia también cada `</div>` por el cierre que le toque.",
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
