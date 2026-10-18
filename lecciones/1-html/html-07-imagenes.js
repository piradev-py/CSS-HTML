/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-07
   Imágenes — <img>, src, alt, width/height, <figure>, <figcaption>.
   Nota: la web debe funcionar sin internet, así que solo se usan
   las imágenes locales de recursos/img/. Las comprobaciones miran
   atributos (src, alt, width) y nunca si la imagen llegó a cargar.
   ============================================================ */
CURSO.registrar({
  id: "html-07",
  titulo: "Imágenes",
  xp: 35,
  objetivo: "Sabrás insertar imágenes accesibles con su texto alternativo y su pie de foto.",
  // Lo que enseña esta lección, para el glosario de las lecciones de proyecto (js/glosario.js)
  glosario: [
    { termino: "<img>", tema: "Imágenes", para: "Una imagen: `src` es el archivo y `alt`, el texto para quien no la ve. Etiqueta vacía.", ejemplo: "<img src=\"img/portada.jpg\" alt=\"Un perro y un gato tumbados al sol\">", buscar: "imagen foto dibujo" },
    { termino: "alt", tema: "Imágenes", para: "Describe la imagen; si es solo decoración, `alt=\"\"`.", ejemplo: "<img src=\"img/iconos/huella.svg\" alt=\"\">", buscar: "texto alternativo accesibilidad lector pantalla" },
    { termino: "width y height", tema: "Imágenes", para: "El tamaño de la imagen: así el navegador reserva su hueco y la página no salta.", ejemplo: "<img src=\"img/logo.svg\" alt=\"\" width=\"48\" height=\"48\">", buscar: "ancho alto tamano" },
    { termino: "loading=\"lazy\"", tema: "Imágenes", para: "Carga la imagen solo cuando se va a ver: la página abre antes.", ejemplo: "<img src=\"img/equipo-1.jpg\" alt=\"…\" width=\"300\" height=\"300\" loading=\"lazy\">", buscar: "carga diferida rapido rendimiento" },
    { termino: "<figure> y <figcaption>", tema: "Imágenes", para: "Una imagen con su pie de foto.", ejemplo: "<figure>\n  <img src=\"img/equipo-1.jpg\" alt=\"…\">\n  <figcaption>Dra. Marta Ruiz</figcaption>\n</figure>", buscar: "pie de foto leyenda equipo" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "La etiqueta <img>",
      texto: "Para poner una imagen se usa `<img>`. Es una **etiqueta vacía**: no tiene contenido ni etiqueta de cierre, como `<br>`.\n\nTodo lo importante va en sus atributos:\n\n• `src` dice **dónde está el archivo** de la imagen. Viene de «source», que significa «fuente» u «origen».\n• `width` cambia su **ancho**, en píxeles (los puntitos de la pantalla). Si solo pones el ancho, el alto se ajusta solo y la imagen no se deforma.\n\n`recursos/img/pizza.svg` es la **ruta**: el camino de carpetas hasta el archivo, como una dirección postal. 🍕",
      ejemplo: {
        html: `<img src="recursos/img/pizza.svg" alt="Una pizza de pepperoni con hojas de albahaca" width="200">`,
        css: ""
      },
      consejo: "En una web real, las imágenes también pueden venir de internet con una dirección completa, por ejemplo `src=\"https://ejemplo.com/gato.jpg\"`. Aquí usamos imágenes guardadas en la propia web para que todo funcione sin conexión."
    },
    {
      tipo: "explicacion",
      titulo: "alt: describe la imagen con palabras",
      texto: "El atributo `alt` (de «alternativo») es un texto que **describe la imagen**. Es obligatorio, y no por capricho:\n\n• Los **lectores de pantalla** lo leen en voz alta a las personas ciegas.\n• Si la imagen no carga, el navegador muestra ese texto en su lugar.\n• Los buscadores lo usan para saber qué hay en la foto.\n\nEn el ejemplo, la pizza carga bien, pero el archivo `dragon.svg` **no existe, a propósito**: en su lugar ves su `alt`… ¡y aun así sabes qué debería verse! 🐉",
      ejemplo: {
        html: `<p>Esta imagen sí existe:</p>
<img src="recursos/img/pizza.svg" alt="Una pizza de pepperoni con hojas de albahaca" width="120">

<p>Esta no existe (no hay ningún dragon.svg), así que el navegador muestra su alt:</p>
<img src="recursos/img/dragon.svg" alt="Un dragón verde comiendo palomitas en el cine">`,
        css: ""
      },
      consejo: "Un buen `alt` describe lo que se ve, como si se lo contaras por teléfono a un amigo. «Imagen» o «foto1» no ayudan a nadie; «Perro marrón sonriendo sobre la hierba», sí."
    },
    {
      tipo: "explicacion",
      titulo: "Foto con pie de foto: <figure> y <figcaption>",
      texto: "¿Quieres poner un texto debajo de la imagen, como en las revistas? Mete la imagen en una caja `<figure>` (figura) y añade dentro un `<figcaption>` (pie de figura).\n\nAsí el navegador sabe que ese texto **pertenece a esa imagen**, y no es un párrafo cualquiera.\n\nOjo: el `alt` describe la imagen para quien no la ve; el `<figcaption>` es un comentario que **todo el mundo** lee. Pueden decir cosas distintas.",
      ejemplo: {
        html: `<figure>
  <img src="recursos/img/montana.svg" alt="Montañas con la cima nevada bajo un sol amarillo" width="240">
  <figcaption>Mi excursión del domingo. Las piernas aún me tiemblan. ⛰️</figcaption>
</figure>`,
        css: ""
      }
    },
    {
      tipo: "explicacion",
      titulo: "width y height: que la página no salte",
      texto: "Las imágenes tardan un poquito en llegar. Si el navegador no sabe cuánto miden, al principio no les guarda sitio… y cuando llegan, **todo el texto salta** hacia abajo. ¡Qué rabia cuando ibas a pulsar un botón! 😤\n\nPor eso en las webs profesionales se ponen **los dos tamaños**, `width` **y** `height`, en la **misma proporción** que la imagen (si no, se deforma): así el navegador reserva el hueco exacto desde el principio.\n\nY otro atributo útil: `loading=\"lazy\"` (carga perezosa). Las imágenes que están **más abajo** en la página no se descargan hasta que te acercas a ellas. La página abre antes y gasta menos datos del móvil. 🦥",
      ejemplo: {
        html: `<img src="recursos/img/pizza.svg" alt="Una pizza de pepperoni con hojas de albahaca" width="160" height="120">
<p>Mucho texto de la carta…</p>
<img src="recursos/img/gato.svg" alt="La cara de un gato naranja con bigotes, sonriendo" width="160" height="120" loading="lazy">`,
        css: ""
      },
      consejo: "La imagen de arriba del todo (la que se ve nada más entrar) no lleva `loading=\"lazy\"`: esa tiene que salir cuanto antes. Úsalo en las de más abajo."
    },
    {
      tipo: "ejercicio",
      enunciado: "¡Pon en la página a Tagui, la mascota del curso! Escribe **una sola** etiqueta `<img>` con estos tres atributos, en este orden:\n\n• `src=\"recursos/img/logo-tagui.svg\"`\n• `alt` con el texto **Tagui, una etiqueta naranja con ojos grandes**\n• `width=\"120\"`\n\nRecuerda: `<img>` es una etiqueta vacía, así que no lleva cierre.",
      pistas: [
        "Todo va dentro de una sola etiqueta: <img …>. Escribe los tres atributos uno detrás de otro, separados por espacios y con la forma nombre=\"valor\".",
        "Empieza así:\n<img src=\"recursos/img/logo-tagui.svg\" alt=\"…\" …>\nRellena el alt con el texto del enunciado y añade el width=\"120\"."
      ],
      solucion: {
        html: `<img src="recursos/img/logo-tagui.svg" alt="Tagui, una etiqueta naranja con ojos grandes" width="120">
`,
        css: ""
      }
    },
    {
      tipo: "quiz",
      pregunta: "¿Para qué sirve el atributo alt de una imagen?",
      opciones: [
        "Para indicar dónde está guardado el archivo",
        "Para describir la imagen a quien no puede verla",
        "Para cambiar el tamaño de la imagen"
      ],
      correcta: 1,
      explicacion: "alt describe la imagen con palabras: lo usan los lectores de pantalla y aparece si la imagen no carga. El archivo se indica con src y el ancho con width."
    },
    {
      tipo: "reto",
      enunciado: "Monta la galería de tus mascotas 🐾:\n\n1. Mete la imagen del gato en un `<figure>`, dale un `alt` que la describa y añade un `<figcaption>` con un comentario.\n2. Haz lo mismo con el perro, cuya imagen está en `recursos/img/perro.svg`.\n3. Ponles a las dos un `width` (por ejemplo `150`) para que quepan bien.",
      inicial: {
        html: `<h1>Mis mascotas</h1>

<!-- 1. Mete esta imagen en un <figure>, ponle un alt descriptivo, un width y un <figcaption> -->
<img src="recursos/img/gato.svg">

<!-- 2. Haz lo mismo con el perro: recursos/img/perro.svg -->
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "Hay un <figure> con la imagen del gato y otro con la del perro",
          prueba: (doc) => {
            const figuras = Array.from(doc.querySelectorAll("figure"));
            return figuras.some(f => !!f.querySelector('img[src*="gato.svg"]')) &&
                   figuras.some(f => !!f.querySelector('img[src*="perro.svg"]'));
          }
        },
        {
          texto: "Las dos imágenes tienen un alt que las describe (no vacío)",
          prueba: (doc) => {
            const imgs = Array.from(doc.querySelectorAll("figure img"));
            return imgs.length >= 2 &&
                   imgs.every(i => (i.getAttribute("alt") || "").trim().length > 0);
          }
        },
        {
          texto: "Cada <figure> tiene un <figcaption> con texto",
          prueba: (doc) => {
            const figuras = Array.from(doc.querySelectorAll("figure"));
            return figuras.length >= 2 &&
                   figuras.every(f => (f.querySelector("figcaption")?.textContent.trim().length || 0) > 0);
          }
        },
        {
          texto: "Las dos imágenes tienen un ancho (width)",
          prueba: (doc) => {
            const imgs = Array.from(doc.querySelectorAll("figure img"));
            return imgs.length >= 2 &&
                   imgs.every(i => (parseInt(i.getAttribute("width") || "", 10) || 0) > 0);
          }
        }
      ],
      pistas: [
        "Cada mascota va en su propia caja: <figure> … </figure>. Dentro, primero la <img> con sus atributos src, alt y width, y debajo el <figcaption>.",
        "Para el gato quedaría así:\n<figure>\n  <img src=\"recursos/img/gato.svg\" alt=\"Gato naranja sonriendo\" width=\"150\">\n  <figcaption>Michi, rey del sofá.</figcaption>\n</figure>\nCopia la caja y cambia gato por perro."
      ],
      solucion: {
        html: `<h1>Mis mascotas</h1>

<figure>
  <img src="recursos/img/gato.svg" alt="Gato naranja con bigotes sonriendo bajo el sol" width="150">
  <figcaption>Michi, rey del sofá y ladrón de calcetines.</figcaption>
</figure>

<figure>
  <img src="recursos/img/perro.svg" alt="Perro marrón de orejas largas sacando la lengua sobre la hierba" width="150">
  <figcaption>Bruno, campeón mundial de perseguir su cola.</figcaption>
</figure>
`,
        css: ""
      }
    }
  ]
});
