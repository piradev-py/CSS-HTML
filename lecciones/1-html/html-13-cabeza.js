/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-13
   La cabeza de la página — meta description, meta viewport
   (se adelanta; hc-05 la repasa), favicon con <link rel="icon">
   y Open Graph (og:title, og:description, og:image, og:type).
   Los pasos con resultado llevan vistaPrevia: true (el motor
   pinta bajo el resultado cómo se ve la página en un buscador
   y al compartir el enlace, leyendo su <head>).
   Reto: completar la cabeza de la web de una pizzería.
   ============================================================ */
CURSO.registrar({
  id: "html-13",
  titulo: "La cabeza de la página",
  xp: 40,
  objetivo: "Sabrás escribir en el <head> lo que leen el navegador, los buscadores y las redes sociales, aunque tú no lo veas.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Lo que tú no ves (y otros sí)",
      texto: "Ya sabes que en el `<head>` van el `<meta charset>` y el `<title>`. Pero la cabeza puede contar mucho más.\n\nPiensa en una caja de galletas 🍪: lo que te comes está dentro (el `<body>`), pero la caja lleva una etiqueta con el nombre, una descripción y una foto. Esa etiqueta la leen otros:\n\n• El **navegador**: el icono de la pestaña y cómo ajustar la página al móvil.\n• Los **buscadores**: el título y el resumen que salen en la lista de resultados.\n• Las **redes y las apps de mensajes**: la tarjeta con foto que aparece al compartir el enlace.\n\nDebajo del resultado verás cómo te ven un buscador y una red social. Esta página ya lo tiene todo.",
      vistaPrevia: true,
      ejemplo: {
        html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Perros con estilo · Peluquería canina</title>
  <meta name="description" content="Baños, cortes y peinados para perros de todos los tamaños. Pide cita.">
  <link rel="icon" href="recursos/img/perro.svg">
  <meta property="og:title" content="Perros con estilo">
  <meta property="og:description" content="Tu perro, recién peinado y feliz.">
  <meta property="og:image" content="recursos/img/perro.svg">
</head>
<body>
  <h1>Perros con estilo 🐶</h1>
  <p>Todo lo de la cabeza no se ve aquí: míralo debajo.</p>
</body>
</html>`,
        css: ""
      },
      consejo: "Todo eso son etiquetas **vacías** como `<meta charset>`: no llevan cierre. ¡Vamos a verlas una a una!"
    },
    {
      tipo: "explicacion",
      titulo: "Dos metas imprescindibles",
      texto: "Las etiquetas `<meta>` dan datos sobre la página con dos atributos: `name` (qué dato es) y `content` (su valor).\n\n• `<meta name=\"description\" content=\"…\">`: el **resumen** que enseña el buscador debajo del título. Una o dos frases que den ganas de entrar. Sin ella, el buscador coge un trozo cualquiera de tu página.\n• `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`: le dice al **móvil** «usa tu ancho de verdad y sin zoom». Sin ella, el móvil finge ser un ordenador y enseña tu web en miniatura, con letra de hormiga 🐜. Cópiala siempre tal cual.",
      vistaPrevia: true,
      ejemplo: {
        html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Recetas de la abuela Rosa</title>
  <meta name="description" content="Las recetas de toda la vida, paso a paso y sin complicaciones.">
</head>
<body>
  <h1>Recetas de la abuela Rosa 👵</h1>
</body>
</html>`,
        css: ""
      },
      consejo: "En el Mundo HTML + CSS volverás a ver la meta viewport, cuando hagas webs que se adaptan al móvil."
    },
    {
      tipo: "explicacion",
      titulo: "El icono de la pestaña: favicon",
      texto: "El **favicon** es el dibujito que sale en la pestaña del navegador, en los marcadores y en los buscadores, junto al título.\n\nSe pone con la etiqueta `<link>`, que **enlaza** la página con otro archivo:\n\n`<link rel=\"icon\" href=\"recursos/img/gato.svg\">`\n\n• `rel=\"icon\"` dice **qué relación** tiene ese archivo con la página: «es mi icono».\n• `href` dice **dónde está**, como en los enlaces `<a>`.\n\nComo `<meta>`, `<link>` es una etiqueta vacía: no lleva cierre.",
      vistaPrevia: true,
      ejemplo: {
        html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>El rincón del gato</title>
  <link rel="icon" href="recursos/img/gato.svg">
</head>
<body>
  <h1>El rincón del gato 🐱</h1>
</body>
</html>`,
        css: ""
      },
      consejo: "Un buen favicon es sencillo: se ve muy pequeño, así que un dibujo con mucho detalle se convierte en una mancha."
    },
    {
      tipo: "ejercicio",
      enunciado: "Completa la cabeza de esta página. Dentro del `<head>`, debajo del `<title>`, añade:\n\n1. Una `<meta>` con `name=\"description\"` y `content=\"Fotos de gatos durmiendo en sitios raros.\"`\n2. Un `<link>` con `rel=\"icon\"` y `href=\"recursos/img/gato.svg\"`\n\nMira la tarjeta del buscador debajo del resultado: tiene que salir tu resumen y el gato.",
      vistaPrevia: true,
      inicial: {
        html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Gatos dormilones</title>
</head>
<body>
  <h1>Gatos dormilones 😴</h1>
</body>
</html>
`
      },
      solucion: {
        html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Gatos dormilones</title>
  <meta name="description" content="Fotos de gatos durmiendo en sitios raros.">
  <link rel="icon" href="recursos/img/gato.svg">
</head>
<body>
  <h1>Gatos dormilones 😴</h1>
</body>
</html>
`,
        css: ""
      },
      pistas: [
        "Las dos etiquetas son vacías: no llevan cierre. La meta lleva dos atributos, name y content; el link también dos, rel y href.",
        "Debajo del <title> escribe:\n<meta name=\"description\" content=\"Fotos de gatos durmiendo en sitios raros.\">\n<link rel=\"icon\" href=\"recursos/img/gato.svg\">"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "La tarjeta al compartir: Open Graph",
      texto: "Cuando mandas un enlace por una app de mensajes o lo publicas en una red social, aparece una **tarjeta** con foto, título y frase. Esa tarjeta sale de unas metas llamadas **Open Graph** (por eso empiezan por `og:`):\n\n• `og:title`: el título de la tarjeta.\n• `og:description`: la frase de debajo.\n• `og:image`: la foto.\n• `og:type`: qué es; para una web normal, `website`.\n\nOjo a un detalle: estas metas usan `property` en vez de `name`:\n\n`<meta property=\"og:title\" content=\"Perros con estilo\">`",
      vistaPrevia: true,
      ejemplo: {
        html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Montañas para perezosos</title>
  <meta property="og:title" content="Montañas para perezosos">
  <meta property="og:description" content="Rutas con teleférico y merienda arriba.">
  <meta property="og:image" content="recursos/img/montana.svg">
  <meta property="og:type" content="website">
</head>
<body>
  <h1>Montañas para perezosos ⛰️</h1>
</body>
</html>`,
        css: ""
      },
      consejo: "En una web publicada de verdad, `og:image` debe llevar la dirección **completa** de la foto (`https://…`), porque la red social la pide desde fuera. Aquí, en el curso, vale con la ruta."
    },
    {
      tipo: "quiz",
      pregunta: "Quieres que el buscador enseñe un resumen de tu web bajo el título. ¿Qué escribes en el <head>?",
      opciones: [
        "<meta name=\"description\" content=\"…\">",
        "<meta property=\"og:image\" content=\"…\">",
        "<link rel=\"icon\" href=\"…\">"
      ],
      correcta: 0,
      explicacion: "La meta description es el resumen para los buscadores. og:image es la foto de la tarjeta al compartir el enlace, y el link rel=\"icon\" es el favicon de la pestaña."
    },
    {
      tipo: "reto",
      enunciado: "🍕 La pizzería **Tagui Pizza** ya tiene su página, pero la cabeza está casi vacía. Complétala dentro del `<head>`:\n\n1. La meta **viewport**, para que se vea bien en el móvil.\n2. Una meta **description** con un resumen de la pizzería (lo escribes tú).\n3. El **favicon**: la imagen `recursos/img/pizza.svg`.\n4. La tarjeta para compartir: `og:title`, `og:description` y `og:image` (otra vez `recursos/img/pizza.svg`).\n\nMira cómo cambian las tarjetas de debajo a medida que escribes.",
      vistaPrevia: true,
      inicial: {
        html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Tagui Pizza · Pizzas al horno de leña</title>
  <!-- Añade aquí la cabeza que falta -->
</head>
<body>
  <h1>Tagui Pizza 🍕</h1>
  <p>Masa de 48 horas, horno de leña y reparto en bici.</p>
</body>
</html>
`
      },
      comprobaciones: [
        {
          texto: "Hay una meta viewport con width=device-width",
          prueba: (doc) => /width\s*=\s*device-width/i.test(doc.querySelector('meta[name="viewport"]')?.getAttribute("content") || "")
        },
        {
          texto: "Hay una meta description con un resumen (al menos unas palabras)",
          prueba: (doc) => (doc.querySelector('meta[name="description"]')?.getAttribute("content") || "").trim().length >= 15
        },
        {
          texto: "Hay un favicon: un <link rel=\"icon\"> con la imagen de la pizza",
          prueba: (doc) => /pizza\.svg$/i.test(doc.querySelector('link[rel~="icon"]')?.getAttribute("href")?.trim() || "")
        },
        {
          texto: "La tarjeta para compartir tiene og:title, og:description y og:image (con su contenido)",
          prueba: (doc) => ["og:title", "og:description", "og:image"].every(p =>
            (doc.querySelector('meta[property="' + p + '"]')?.getAttribute("content") || "").trim().length > 0)
        }
      ],
      pistas: [
        "Todas son etiquetas vacías y van dentro del <head>. La viewport y la description usan name y content; el favicon es un <link> con rel=\"icon\" y href; las de la tarjeta usan property=\"og:…\" y content.",
        "Debajo del comentario escribe:\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<meta name=\"description\" content=\"Pizzas al horno de leña con masa de 48 horas.\">\n<link rel=\"icon\" href=\"recursos/img/pizza.svg\">\n<meta property=\"og:title\" content=\"Tagui Pizza\">\n<meta property=\"og:description\" content=\"Pizzas al horno de leña.\">\n<meta property=\"og:image\" content=\"recursos/img/pizza.svg\">"
      ],
      solucion: {
        html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Tagui Pizza · Pizzas al horno de leña</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Pizzas al horno de leña con masa de 48 horas y reparto en bici.">
  <link rel="icon" href="recursos/img/pizza.svg">
  <meta property="og:title" content="Tagui Pizza">
  <meta property="og:description" content="Pizzas al horno de leña, recién hechas y en tu puerta.">
  <meta property="og:image" content="recursos/img/pizza.svg">
  <meta property="og:type" content="website">
</head>
<body>
  <h1>Tagui Pizza 🍕</h1>
  <p>Masa de 48 horas, horno de leña y reparto en bici.</p>
</body>
</html>
`,
        css: ""
      }
    }
  ]
});
