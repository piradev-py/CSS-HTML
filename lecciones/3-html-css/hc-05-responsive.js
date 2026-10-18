/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-05
   Responsive y media queries — qué es responsive, la etiqueta
   <meta name="viewport">, imágenes fluidas (max-width: 100%),
   @media con max-width / min-width y puntos de corte.
   Notas:
   - Los pasos con resultado llevan dispositivos: true (botones
     💻 Libre / 📱 Móvil y la medida en px del resultado).
   - El revisor de ejercicios compara a 800, 375 y 1280 px cuando la
     solución tiene @media: los puntos de corte están en 600 / 900 px.
   - El reto mide en copias de la página a 375 y 1280 px
     (PRUEBA.clonar) y cuenta las columnas partiendo el valor
     calculado de grid-template-columns («415px 415px 415px»).
   ============================================================ */
CURSO.registrar({
  id: "hc-05",
  titulo: "Responsive y media queries",
  xp: 50,
  objetivo: "Sabrás hacer que una página se adapte a cualquier pantalla, del móvil al ordenador, con imágenes fluidas y media queries.",
  glosario: [
    { termino: "@media", tema: "Responsive", para: "CSS que solo se aplica si se cumple una condición, como el ancho de la pantalla.", ejemplo: "@media (max-width: 600px) {\n  h1 {\n    font-size: 2rem;\n  }\n}", buscar: "media query condicion pantalla" },
    { termino: "min-width y max-width (en @media)", tema: "Responsive", para: "`min-width`: desde ese ancho hacia arriba; `max-width`: hasta ese ancho.", ejemplo: "@media (min-width: 768px) {\n  .rejilla {\n    grid-template-columns: 1fr 1fr;\n  }\n}", buscar: "ancho minimo maximo punto de corte" },
    { termino: "imágenes fluidas", tema: "Responsive", para: "`max-width: 100%` y `height: auto`: la imagen nunca se sale de su caja.", ejemplo: "img {\n  max-width: 100%;\n  height: auto;\n}", buscar: "imagen fluida no se sale" },
    { termino: "<meta name=\"viewport\">", tema: "Responsive", para: "Sin ella, el móvil enseña la web en miniatura y las `@media` no funcionan.", ejemplo: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">", buscar: "movil escala viewport", lenguaje: "html" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Una web, mil pantallas",
      texto: "Tu web se verá en móviles, tabletas, portátiles y pantallas enormes. Una web **responsive** (adaptable) se reorganiza sola para verse bien en todas, como el agua que toma la forma del vaso 💧.\n\nPrimer paso, que ya conoces de «La cabeza de la página»: en el `<head>` escribe siempre la etiqueta `<meta name=\"viewport\">` del ejemplo. Sin ella, el móvil finge ser una pantalla de ordenador y te enseña la web en miniatura, con letra de hormiga 🐜. Con ella le dices: «usa tu ancho de verdad» (`width=device-width`) «y sin zoom» (`initial-scale=1`).\n\nEn este curso el resultado ya se ve bien sin ella, pero en tus webs reales no la olvides.",
      dispositivos: true,
      ejemplo: {
        html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mi web adaptable</title>
</head>
<body>
  <h1>¡Me adapto a todo! 📱💻</h1>
  <p>Arrastra los separadores de las columnas o pulsa 📱 Móvil para verme estrecha.</p>
</body>
</html>`,
        css: `body {
  font-family: sans-serif;
}`
      },
      consejo: "Para probar lo responsive, mira la barra del resultado: los botones **💻 Libre** y **📱 Móvil** cambian el ancho, y el número en **px** te dice cuánto mide ahora. ¡También puedes arrastrar los separadores de las columnas!"
    },
    {
      tipo: "explicacion",
      titulo: "Imágenes fluidas: max-width: 100%",
      texto: "Una foto mide lo que mide: si tiene 400 px de ancho y la pantalla solo 375, se sale por un lado. 😬\n\nLa solución es una regla que verás en casi todas las webs: `img { max-width: 100%; }`. Ya conoces `max-width` (ancho máximo): con `100%` le dices a la imagen «nunca seas más ancha que tu caja». Si cabe, se queda con su tamaño; si no cabe, se encoge sin deformarse.\n\nA esto se le llama **imagen fluida**. En el ejemplo, la caja mide como mucho 250 px y la montaña de 400 px se encoge para caber.",
      dispositivos: true,
      ejemplo: {
        html: `<div class="marco">
  <img src="recursos/img/montana.svg" alt="Una montaña nevada">
</div>`,
        css: `.marco {
  max-width: 250px;
  border: 4px solid teal;
}
img {
  max-width: 100%;
}`
      },
      consejo: "Pon `img { max-width: 100%; }` al principio de todos tus proyectos. Es una línea y te ahorra muchos sustos."
    },
    {
      tipo: "ejercicio",
      enunciado: "La foto de la montaña mide 400 px y se sale de su marco 🏔️. Hazla fluida:\n\n• Al selector `img` ponle `max-width` con el valor `100%`.\n\nEl HTML ya está escrito: tú solo escribes el CSS.",
      dispositivos: true,
      cssBase: `body { font-family: sans-serif; }
.marco { max-width: 260px; border: 4px solid teal; border-radius: 8px; padding: 6px; }`,
      inicial: {
        html: `<div class="marco">
  <img src="recursos/img/montana.svg" alt="Una montaña nevada">
  <p>Excursión al Pico Nevado</p>
</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="marco">
  <img src="recursos/img/montana.svg" alt="Una montaña nevada">
  <p>Excursión al Pico Nevado</p>
</div>
`,
        css: `img {
  max-width: 100%;
}
`
      },
      pistas: [
        "Escribe una regla para la etiqueta img con una sola propiedad: el ancho máximo, en porcentaje.",
        "Debe quedarte así:\nimg {\n  max-width: 100%;\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Media queries: CSS con condiciones",
      texto: "Una **media query** es CSS que solo se aplica **si se cumple una condición**, como «si llueve, coge el paraguas» ☔:\n\n• `@media (max-width: 600px) { … }` → «si la pantalla mide **600 px o menos**».\n• `@media (min-width: 900px) { … }` → «si mide **900 px o más**».\n\nDentro de las llaves escribes reglas normales. Esos anchos donde el diseño cambia se llaman **puntos de corte**.\n\nEn el ejemplo, el texto sale de un `::after` (lo viste en Pseudo-elementos) y cambia según el ancho. ¡Pulsa 📱 o arrastra los separadores!",
      dispositivos: true,
      ejemplo: {
        html: `<p class="pantalla"></p>`,
        css: `.pantalla {
  padding: 20px;
  font-family: sans-serif;
  font-size: 22px;
  text-align: center;
  background-color: lightgreen;
}
.pantalla::after {
  content: "💻 Pantalla mediana";
}

@media (max-width: 600px) {
  .pantalla {
    background-color: gold;
  }
  .pantalla::after {
    content: "📱 Pantalla pequeña";
  }
}

@media (min-width: 900px) {
  .pantalla {
    background-color: plum;
  }
  .pantalla::after {
    content: "🖥️ Pantalla grande";
  }
}`
      },
      consejo: "Fíjate en las **dos llaves**: unas abren y cierran la `@media` y otras, cada regla de dentro. Si se te olvida cerrar una, todo lo de abajo deja de funcionar. Escribe las media queries **al final** del CSS para que ganen en la cascada."
    },
    {
      tipo: "ejercicio",
      enunciado: "En pantallas grandes, el menú del día va en fila. En el móvil no cabe: ¡apílalo! 🍽️\n\nEscribe una media query `@media (max-width: 600px)` y, dentro de ella:\n\n• Al selector `.fila` ponle `flex-direction` con el valor `column`.\n• Al selector `.caja` ponle `background-color` con el valor `lightskyblue`.\n\nLa fila ya tiene `display: flex`. Comprueba el cambio con el botón 📱 Móvil.",
      dispositivos: true,
      cssBase: `body { font-family: sans-serif; }
.fila { display: flex; gap: 10px; }
.caja { flex: 1; background-color: gold; padding: 16px 8px; border-radius: 10px; text-align: center; font-size: 18px; }`,
      inicial: {
        html: `<div class="fila">
  <div class="caja">🍕 Pizza</div>
  <div class="caja">🍔 Hamburguesa</div>
  <div class="caja">🌮 Tacos</div>
</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="fila">
  <div class="caja">🍕 Pizza</div>
  <div class="caja">🍔 Hamburguesa</div>
  <div class="caja">🌮 Tacos</div>
</div>
`,
        css: `@media (max-width: 600px) {
  .fila {
    flex-direction: column;
  }
  .caja {
    background-color: lightskyblue;
  }
}
`
      },
      pistas: [
        "Empieza con @media (max-width: 600px) { y ciérrala al final con }. Dentro van dos reglas normales, cada una con sus propias llaves.",
        "Debe quedarte así:\n@media (max-width: 600px) {\n  .fila {\n    flex-direction: column;\n  }\n  .caja {\n    background-color: lightskyblue;\n  }\n}"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "¿Cuándo se aplican las reglas de @media (max-width: 600px) { … }?",
      opciones: [
        "Cuando la pantalla mide 600 px o menos",
        "Cuando la pantalla mide 600 px o más",
        "Siempre, pero solo a las imágenes de 600 px"
      ],
      correcta: 0,
      explicacion: "max-width significa «ancho máximo»: la condición se cumple mientras la pantalla no pase de 600 px. Para «600 px o más» usarías min-width."
    },
    {
      tipo: "reto",
      enunciado: "Monta tu galería de fotos 📷 para que se vea bien en el ordenador y en el móvil:\n\n1. Haz que `.galeria` tenga **3 columnas iguales**.\n2. Haz que las fotos sean **fluidas**: que nunca sean más anchas que su casilla.\n3. Añade una media query `@media (max-width: 600px)` para que, en pantallas pequeñas, la galería tenga **una sola columna**.\n\nPruébala con los botones 💻 y 📱.",
      dispositivos: true,
      cssBase: `body { font-family: sans-serif; }
h1 { color: teal; }`,
      inicial: {
        html: `<h1>Mi galería 📷</h1>
<div class="galeria">
  <img src="recursos/img/gato.svg" alt="Un gato">
  <img src="recursos/img/perro.svg" alt="Un perro">
  <img src="recursos/img/pizza.svg" alt="Una pizza">
  <img src="recursos/img/montana.svg" alt="Una montaña">
  <img src="recursos/img/gato.svg" alt="Otro gato">
  <img src="recursos/img/perro.svg" alt="Otro perro">
</div>
`,
        css: `.galeria {
  display: grid;
  gap: 10px;
  /* 1. Tres columnas iguales */
}

.galeria img {
  border-radius: 8px;
  /* 2. Que nunca sea más ancha que su casilla */
}

/* 3. Media query: hasta 600px, una sola columna */
`
      },
      comprobaciones: [
        {
          texto: "En una pantalla ancha (1280 px), la `.galeria` tiene 3 columnas",
          prueba: async (doc) => {
            const v = await PRUEBA.clonar(doc, { ancho: 1280 });
            const g = v.doc.querySelector(".galeria");
            if (!g) return false;
            const cols = v.win.getComputedStyle(g).gridTemplateColumns || "none";
            return cols !== "none" && cols.trim().split(/\s+/).length === 3;
          }
        },
        {
          texto: "En el móvil (375 px), la `.galeria` pasa a tener 1 sola columna",
          prueba: async (doc) => {
            const contar = async ancho => {
              const v = await PRUEBA.clonar(doc, { ancho });
              const g = v.doc.querySelector(".galeria");
              if (!g) return 0;
              const cols = v.win.getComputedStyle(g).gridTemplateColumns || "none";
              return cols === "none" ? 1 : cols.trim().split(/\s+/).length;
            };
            return (await contar(375)) === 1 && (await contar(1280)) === 3;
          }
        },
        {
          texto: "Las fotos son fluidas: en el móvil no se salen de la galería",
          prueba: async (doc) => {
            const v = await PRUEBA.clonar(doc, { ancho: 375 });
            const g = v.doc.querySelector(".galeria");
            const fotos = [...v.doc.querySelectorAll(".galeria img")];
            if (!g || !fotos.length) return false;
            const borde = g.getBoundingClientRect().right;
            return fotos.every(img => v.win.getComputedStyle(img).maxWidth === "100%"
              || img.getBoundingClientRect().right <= borde + 1);
          }
        }
      ],
      pistas: [
        "Para las columnas usa grid-template-columns con repeat (como en la lección de Grid). Las fotos necesitan max-width. Al final, la media query vuelve a cambiar grid-template-columns, esta vez a una sola columna.",
        "En .galeria añade grid-template-columns: repeat(3, 1fr);\nEn .galeria img añade max-width: 100%;\nAl final escribe:\n@media (max-width: 600px) {\n  .galeria {\n    grid-template-columns: 1fr;\n  }\n}"
      ],
      solucion: {
        html: `<h1>Mi galería 📷</h1>
<div class="galeria">
  <img src="recursos/img/gato.svg" alt="Un gato">
  <img src="recursos/img/perro.svg" alt="Un perro">
  <img src="recursos/img/pizza.svg" alt="Una pizza">
  <img src="recursos/img/montana.svg" alt="Una montaña">
  <img src="recursos/img/gato.svg" alt="Otro gato">
  <img src="recursos/img/perro.svg" alt="Otro perro">
</div>
`,
        css: `.galeria {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
}

.galeria img {
  border-radius: 8px;
  max-width: 100%;
}

@media (max-width: 600px) {
  .galeria {
    grid-template-columns: 1fr;
  }
}
`
      }
    }
  ]
});
