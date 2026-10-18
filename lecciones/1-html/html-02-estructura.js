/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-02
   La estructura de una página — esqueleto, head, body, anidar.
   Nota: el navegador SIEMPRE crea <html>, <head> y <body>, así que
   el reto comprueba cosas que no se autogeneran (<meta charset>,
   <title> con texto concreto y un <h1>).
   ============================================================ */
CURSO.registrar({
  id: "html-02",
  titulo: "La estructura de una página",
  xp: 30,
  objetivo: "Sabrás escribir el esqueleto de toda página web y qué va en la cabeza y qué en el cuerpo.",
  // Lo que enseña esta lección, para el glosario de las lecciones de proyecto (js/glosario.js)
  glosario: [
    { termino: "<!DOCTYPE html>", tema: "Estructura", para: "La primera línea: avisa de que es HTML moderno.", ejemplo: "<!DOCTYPE html>", buscar: "esqueleto pagina" },
    { termino: "<html lang=\"es\">", tema: "Estructura", para: "La caja que envuelve toda la página; `lang` dice en qué idioma está.", ejemplo: "<html lang=\"es\">\n  …\n</html>", buscar: "idioma esqueleto" },
    { termino: "<head> y <body>", tema: "Estructura", para: "La cabeza (lo que no se ve) y el cuerpo (lo que sí se ve).", ejemplo: "<head>\n  <title>Mi web</title>\n</head>\n<body>\n  <h1>Hola</h1>\n</body>", buscar: "cabeza cuerpo esqueleto" },
    { termino: "<meta charset=\"UTF-8\">", tema: "La cabeza", para: "Para que las tildes y la ñ se vean bien. Va en el `<head>`.", ejemplo: "<meta charset=\"UTF-8\">", buscar: "tildes acentos letras" },
    { termino: "<title>", tema: "La cabeza", para: "El texto de la pestaña del navegador y de los buscadores.", ejemplo: "<title>Huellas · Clínica veterinaria</title>", buscar: "pestaña titulo nombre" },
    { termino: "<!-- comentario -->", tema: "Lo básico", para: "Una nota para personas: el navegador no la enseña.", ejemplo: "<!-- Aquí empieza el menú -->", buscar: "nota apunte ocultar" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "El esqueleto de una página",
      texto: "Una página «de verdad» tiene un **esqueleto** que siempre es el mismo:\n\n• `<!DOCTYPE html>` avisa al navegador: «esto es HTML moderno».\n• `<html>` es la caja que lo envuelve todo.\n• `<head>` es la **cabeza**: información sobre la página que no se ve.\n• `<body>` es el **cuerpo**: todo lo que sí se ve.\n\nComo una persona: lo que piensas (la cabeza) no se ve; tu ropa y tu sonrisa (el cuerpo), sí. 😄",
      ejemplo: {
        html: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi página</title>
  </head>
  <body>
    <h1>¡Hola!</h1>
  </body>
</html>`,
        css: ""
      },
      consejo: "Si se te olvida alguna de estas etiquetas, el navegador intenta arreglarlo él solito. Pero los profesionales las escriben **siempre**: es como ponerse el cinturón."
    },
    {
      tipo: "explicacion",
      titulo: "Dentro de la cabeza",
      texto: "En `<head>` pondrás siempre estas dos cosas:\n\n• `<meta charset=\"UTF-8\">`: le dice al navegador cómo leer las letras, para que las tildes y la ñ se vean bien. No lleva etiqueta de cierre.\n• `<title>`: el texto que aparece en la **pestaña** del navegador.\n\nEse `charset=\"UTF-8\"` es un **atributo**: un dato extra que se escribe dentro de la etiqueta de apertura. Igual que `lang=\"es\"` en `<html>`, que avisa de que la página está en español. Los atributos los veremos a fondo en la lección de Enlaces.",
      ejemplo: {
        html: `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Cocina con Tagui</title>
  </head>
  <body>
    <h1>Mañana: churros con chocolate</h1>
  </body>
</html>`,
        css: ""
      },
      consejo: "El `<title>` no aparece dentro de la página, sino en la pestaña. ¡Y es lo que sale en los buscadores cuando alguien encuentra tu web!"
    },
    {
      tipo: "explicacion",
      titulo: "Cajas dentro de cajas",
      texto: "Fíjate: `<head>` y `<body>` están **dentro** de `<html>`. Meter una etiqueta dentro de otra se llama **anidar**, como las muñecas rusas 🪆.\n\nLa regla de oro: **se cierra primero la última que abriste**.\n\n✔ `<body><h1>Hola</h1></body>`\n✘ `<body><h1>Hola</body></h1>`\n\nPor eso las etiquetas de dentro se escriben un poco más a la derecha, con espacios. Eso se llama **sangría** y sirve para ver de un vistazo qué está dentro de qué.",
      consejo: "Truco: lo que escribas entre `<!--` y `-->` es un **comentario**. El navegador lo ignora, así que sirve para dejar notas en el código. ¡Yo los usaré para darte instrucciones en los retos!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Escribe desde cero el esqueleto completo de una página, en este orden:\n\n1. `<!DOCTYPE html>`\n2. `<html>` con el atributo `lang=\"es\"`. Todo lo demás va dentro de él.\n3. La cabeza `<head>`, y dentro: `<meta charset=\"UTF-8\">` y un `<title>` que diga **La casa de Tagui**.\n4. Debajo de la cabeza, el cuerpo `<body>`, y dentro: un título `<h1>` que diga **¡Bienvenido a mi casa!**\n\nCierra cada etiqueta (menos la meta, que no lleva cierre) y recuerda: se cierra primero la última que abriste. 🪆",
      pistas: [
        "Ve de fuera hacia dentro, como las muñecas rusas: escribe primero <html lang=\"es\">…</html>; dentro, <head>…</head> y debajo <body>…</body>. Después rellena cada caja.",
        "El orden es:\n<!DOCTYPE html>\n<html lang=\"es\">\n<head> con <meta charset=\"UTF-8\"> y <title>La casa de Tagui</title> dentro, y luego </head>\n<body> con <h1>¡Bienvenido a mi casa!</h1> dentro, y luego </body>\n</html>"
      ],
      solucion: {
        html: `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>La casa de Tagui</title>
  </head>
  <body>
    <h1>¡Bienvenido a mi casa!</h1>
  </body>
</html>
`,
        css: ""
      }
    },
    {
      tipo: "quiz",
      pregunta: "¿Dónde escribes el contenido que se ve en la página?",
      opciones: ["Dentro de <head>", "Dentro de <body>", "Dentro de <title>"],
      correcta: 1,
      explicacion: "Todo lo visible va en <body>, el cuerpo. En <head> va información sobre la página, como el <title> de la pestaña."
    },
    {
      tipo: "reto",
      enunciado: "Completa el esqueleto de la web de tu mascota (real o inventada):\n\n1. En la cabeza, añade `<meta charset=\"UTF-8\">`.\n2. En la cabeza, añade un `<title>` que contenga la palabra **mascota**.\n3. En el cuerpo, añade un título `<h1>` con su nombre.",
      inicial: {
        html: `<!DOCTYPE html>
<html lang="es">
  <head>
    <!-- 1. Añade aquí la meta charset -->
    <!-- 2. Añade aquí un title con la palabra «mascota» -->
  </head>
  <body>
    <!-- 3. Añade aquí un h1 con el nombre de tu mascota -->
    <p>Mi mascota duerme unas 20 horas al día. ¡Qué envidia!</p>
  </body>
</html>
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "Hay una etiqueta <meta charset=\"UTF-8\">",
          prueba: (doc) => Array.from(doc.querySelectorAll("meta[charset]"))
            .some(m => (m.getAttribute("charset") || "").trim().toLowerCase() === "utf-8")
        },
        {
          texto: "Hay un <title> que contiene la palabra «mascota»",
          prueba: (doc) => Array.from(doc.querySelectorAll("title"))
            .some(t => (t.textContent || "").toLowerCase().includes("mascota"))
        },
        {
          texto: "Hay un título <h1> con el nombre de tu mascota",
          prueba: (doc) => (doc.querySelector("h1")?.textContent.trim().length || 0) > 0
        }
      ],
      pistas: [
        "La meta y el title van dentro de <head>, uno debajo del otro. La meta no lleva cierre; el title sí: <title>…</title>.",
        "Dentro de <head> escribe:\n<meta charset=\"UTF-8\">\n<title>La web de mi mascota</title>\nY dentro de <body>, encima del párrafo: <h1>Pelusa</h1>"
      ],
      solucion: {
        html: `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>La web de mi mascota</title>
  </head>
  <body>
    <h1>Pelusa</h1>
    <p>Mi mascota duerme unas 20 horas al día. ¡Qué envidia!</p>
  </body>
</html>
`,
        css: ""
      }
    }
  ]
});
