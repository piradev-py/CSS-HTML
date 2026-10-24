/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-07
   Imágenes — <img>, src, alt, width/height, <figure>, <figcaption>.
   Nota: la web debe funcionar sin internet, así que solo se usan
   las imágenes locales de recursos/img/. Las comprobaciones miran
   atributos (src, alt, width, height, loading) y nunca si la imagen llegó a cargar.
   ============================================================ */
CURSO.registrar({
  id: "html-07",
  titulo: "Images",
  xp: 35,
  objetivo: "You'll learn how to insert accessible images with their alternative text and their caption.",
  // Lo que enseña esta lección, para el glosario de las lecciones de proyecto (js/glosario.js)
  glosario: [
    { termino: "<img>", tema: "Images", para: "An image: `src` is the file and `alt` the text for those who can't see it. An empty tag.", ejemplo: "<img src=\"img/portada.jpg\" alt=\"A dog and a cat lying in the sun\">", buscar: "image photo picture" },
    { termino: "alt", tema: "Images", para: "Describes the image; if it's only decoration, `alt=\"\"`.", ejemplo: "<img src=\"img/iconos/huella.svg\" alt=\"\">", buscar: "alternative text accessibility screen reader" },
    { termino: "width and height", tema: "Images", para: "The size of the image: that way the browser reserves its spot and the page doesn't jump.", ejemplo: "<img src=\"img/logo.svg\" alt=\"\" width=\"48\" height=\"48\">", buscar: "width height size" },
    { termino: "loading=\"lazy\"", tema: "Images", para: "Loads the image only when it's about to be seen: the page opens sooner.", ejemplo: "<img src=\"img/equipo-1.jpg\" alt=\"…\" width=\"300\" height=\"300\" loading=\"lazy\">", buscar: "lazy loading fast performance" },
    { termino: "<figure> and <figcaption>", tema: "Images", para: "An image with its caption.", ejemplo: "<figure>\n  <img src=\"img/equipo-1.jpg\" alt=\"…\">\n  <figcaption>Dr. Marta Ruiz</figcaption>\n</figure>", buscar: "caption figure team" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "The <img> tag",
      texto: "To put an image on a page you use `<img>`. It's an **empty tag**: it has no content and no closing tag, like `<br>`.\n\nEverything important goes in its attributes:\n\n• `src` says **where the image file is**. It comes from “source”, which means “origin”.\n• `width` changes its **width**, in pixels (the tiny dots of the screen). If you only set the width, the height adjusts by itself and the image doesn't deform.\n\n`recursos/img/pizza.svg` is the **path**: the route of folders to the file, like a postal address. 🍕",
      ejemplo: {
        html: `<img src="recursos/img/pizza.svg" alt="A pepperoni pizza with basil leaves" width="200">`,
        css: ""
      },
      consejo: "On a real website, images can also come from the internet with a full address, for example `src=\"https://example.com/cat.jpg\"`. Here we use images stored on the website itself so everything works without a connection."
    },
    {
      tipo: "explicacion",
      titulo: "alt: describe the image with words",
      texto: "The `alt` attribute (from “alternative”) is a text that **describes the image**. It's mandatory, and not just for the sake of it:\n\n• **Screen readers** read it out loud to blind people.\n• If the image doesn't load, the browser shows that text in its place.\n• Search engines use it to know what's in the photo.\n\nIn the example, the pizza loads fine, but the file `dragon.svg` **doesn't exist, on purpose**: you see its `alt` instead… and even so you know what should be seen! 🐉",
      ejemplo: {
        html: `<p>This image does exist:</p>
<img src="recursos/img/pizza.svg" alt="A pepperoni pizza with basil leaves" width="120">

<p>This one doesn't exist (there is no dragon.svg), so the browser shows its alt:</p>
<img src="recursos/img/dragon.svg" alt="A green dragon eating popcorn at the movies">`,
        css: ""
      },
      consejo: "A good `alt` describes what you see, as if you were telling it to a friend over the phone. “Image” or “photo1” helps no one; “Brown dog smiling on the grass” does."
    },
    {
      tipo: "explicacion",
      titulo: "Photo with a caption: <figure> and <figcaption>",
      texto: "Do you want to put a text below the image, like in magazines? Put the image inside a `<figure>` box (figure) and add a `<figcaption>` inside it (figure caption).\n\nThat way the browser knows that text **belongs to that image**, and it isn't just any paragraph.\n\nHeads-up: the `alt` describes the image for those who can't see it; the `<figcaption>` is a comment that **everyone** reads. They can say different things.",
      ejemplo: {
        html: `<figure>
  <img src="recursos/img/montana.svg" alt="Mountains with a snowy peak under a yellow sun" width="240">
  <figcaption>My Sunday hike. My legs are still shaking. ⛰️</figcaption>
</figure>`
      }
    },
    {
      tipo: "explicacion",
      titulo: "width and height: so the page doesn't jump",
      texto: "Images take a little while to arrive. If the browser doesn't know how big they are, at first it doesn't save a spot for them… and when they arrive, **all the text jumps** downward. So annoying when you were about to tap a button! 😤\n\nThat's why professional websites set **both sizes**, `width` **and** `height`, in the **same proportion** as the image (otherwise it deforms): that way the browser reserves the exact spot from the start.\n\nAnd another useful attribute: `loading=\"lazy\"` (lazy loading). Images that are **further down** the page don't download until you get close to them. The page opens sooner and uses less mobile data. 🦥",
      ejemplo: {
        html: `<img src="recursos/img/pizza.svg" alt="A pepperoni pizza with basil leaves" width="160" height="120">
<p>Lots of text from the menu…</p>
<img src="recursos/img/gato.svg" alt="The face of an orange cat with whiskers, smiling" width="160" height="120" loading="lazy">`,
        css: ""
      },
      consejo: "The image at the very top (the one you see as soon as you arrive) doesn't get `loading=\"lazy\"`: that one has to show up as soon as possible. Use it on the ones further down."
    },
    {
      tipo: "ejercicio",
      enunciado: "Put Tagui, the course mascot, on the page! Write **one single** `<img>` tag with these four attributes, in this order:\n\n• `src=\"recursos/img/logo-tagui.svg\"`\n• `alt` with the text **Tagui, an orange tag with big eyes**\n• `width=\"120\"`\n• `height=\"120\"` (the image is square)\n\nRemember: `<img>` is an empty tag, so it has no closing tag.",
      pistas: [
        "Everything goes inside one single tag: <img …>. Write the four attributes one after another, separated by spaces and in the form name=\"value\".",
        "Start like this:\n<img src=\"recursos/img/logo-tagui.svg\" alt=\"…\" …>\nFill in the alt with the text from the exercise, add the width=\"120\" and, since the image is square, the height=\"120\"."
      ],
      solucion: {
        html: `<img src="recursos/img/logo-tagui.svg" alt="Tagui, an orange tag with big eyes" width="120" height="120">
`,
        css: ""
      }
    },
    {
      tipo: "quiz",
      pregunta: "What is the alt attribute of an image for?",
      opciones: [
        "To say where the file is stored",
        "To describe the image to those who can't see it",
        "To change the size of the image"
      ],
      correcta: 1,
      explicacion: "alt describes the image with words: screen readers use it, and it shows up if the image doesn't load. The file goes in src and the width goes in width."
    },
    {
      tipo: "reto",
      enunciado: "Build the gallery of your pets 🐾:\n\n1. Put the cat image inside a `<figure>`, give it an `alt` that describes it and add a `<figcaption>` with a comment.\n2. Do the same with the dog, whose image is at `recursos/img/perro.svg`.\n3. Give both of them `width` **and** `height` in the same proportion as the image (for example `160` and `120`), so the browser reserves their exact spot and the page doesn't jump.\n4. To the dog image (it's further down) add `loading=\"lazy\"`, so it doesn't load until it is seen.",
      inicial: {
        html: `<h1>My pets</h1>

<!-- 1. Put this image inside a <figure>, give it a descriptive alt, a width and a height, and a <figcaption> -->
<img src="recursos/img/gato.svg">

<!-- 2. Do the same with the dog: recursos/img/perro.svg -->
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "There is a <figure> with the cat image and another one with the dog image",
          prueba: (doc) => {
            const figuras = Array.from(doc.querySelectorAll("figure"));
            return figuras.some(f => !!f.querySelector('img[src*="gato.svg"]')) &&
                   figuras.some(f => !!f.querySelector('img[src*="perro.svg"]'));
          }
        },
        {
          texto: "Both images have an alt that describes them (not empty)",
          prueba: (doc) => {
            const imgs = Array.from(doc.querySelectorAll("figure img"));
            return imgs.length >= 2 &&
                   imgs.every(i => (i.getAttribute("alt") || "").trim().length > 0);
          }
        },
        {
          texto: "Each <figure> has a <figcaption> with text",
          prueba: (doc) => {
            const figuras = Array.from(doc.querySelectorAll("figure"));
            return figuras.length >= 2 &&
                   figuras.every(f => (f.querySelector("figcaption")?.textContent.trim().length || 0) > 0);
          }
        },
        {
          texto: "Both images have width and height in the proportion of the image (they measure 400×300, for example 160 and 120)",
          prueba: (doc) => {
            const imgs = Array.from(doc.querySelectorAll("figure img"));
            return imgs.length >= 2 &&
                   imgs.every(i => {
                     const w = parseInt(i.getAttribute("width") || "", 10) || 0;
                     const h = parseInt(i.getAttribute("height") || "", 10) || 0;
                     if (w <= 0 || h <= 0) return false;
                     const r = w / h;
                     return r >= 1.25 && r <= 1.42;
                   });
          }
        },
        {
          texto: "The dog image has loading=\"lazy\"",
          prueba: (doc) => {
            const perro = doc.querySelector('img[src*="perro.svg"]');
            return !!perro && perro.getAttribute("loading") === "lazy";
          }
        }
      ],
      pistas: [
        "Each pet goes in its own box: <figure> … </figure>. Inside, first the <img> with its attributes src, alt, width and height, and below it the <figcaption>.",
        "The images measure 400×300, so the width is 4/3 of the height. For example: width=\"160\" height=\"120\". If the two numbers don't keep that proportion, the image deforms.\nFor the cat it would look like this:\n<figure>\n  <img src=\"recursos/img/gato.svg\" alt=\"Orange cat smiling\" width=\"160\" height=\"120\">\n  <figcaption>Michi, king of the sofa.</figcaption>\n</figure>\nCopy the box and change the cat for the dog. To the dog's img, which is further down, add loading=\"lazy\"."
      ],
      solucion: {
        html: `<h1>My pets</h1>

<figure>
  <img src="recursos/img/gato.svg" alt="Orange cat with whiskers smiling under the sun" width="160" height="120">
  <figcaption>Michi, king of the sofa and sock thief.</figcaption>
</figure>

<figure>
  <img src="recursos/img/perro.svg" alt="Brown dog with long ears sticking its tongue out on the grass" width="160" height="120" loading="lazy">
  <figcaption>Bruno, world champion at chasing his tail.</figcaption>
</figure>
`,
        css: ""
      }
    }
  ]
});
