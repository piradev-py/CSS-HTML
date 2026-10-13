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
      texto: "El atributo `alt` (de «alternativo») es un texto que **describe la imagen**. Es obligatorio, y no por capricho:\n\n• Los **lectores de pantalla** lo leen en voz alta a las personas ciegas.\n• Si la imagen no carga, el navegador muestra ese texto en su lugar.\n• Los buscadores lo usan para saber qué hay en la foto.\n\nEn el ejemplo, el archivo `dragon.svg` **no existe**… ¡y aun así sabes qué debería verse! 🐉",
      ejemplo: {
        html: `<img src="recursos/img/dragon.svg" alt="Un dragón verde comiendo palomitas en el cine">`,
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
      tipo: "pruebalo",
      instruccion: "Juega con las imágenes:\n\n• Cambia el número de `width` y mira cómo crece o encoge.\n• Cambia el `src` por otra imagen: `recursos/img/gato.svg`, `recursos/img/perro.svg`, `recursos/img/pizza.svg` o `recursos/img/montana.svg`.\n• Escribe mal la ruta a propósito (por ejemplo `gatoo.svg`) y verás aparecer el texto del `alt`.",
      inicial: {
        html: `<h1>Conoce a Tagui</h1>
<figure>
  <img src="recursos/img/logo-tagui.svg" alt="Tagui, una etiqueta naranja con ojos grandes y una sonrisa" width="120">
  <figcaption>Tagui, la mascota de este curso, posando para la foto.</figcaption>
</figure>
`,
        css: "",
        js: ""
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
