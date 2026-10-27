/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-05 (inglés)
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
  titulo: "Responsive design and media queries",
  xp: 50,
  objetivo: "You'll know how to make a page adapt to any screen, from a phone to a computer, with fluid images and media queries.",
  glosario: [
    { termino: "@media", tema: "Responsive", para: "CSS that only applies if a condition is met, like the screen width.", ejemplo: "@media (max-width: 600px) {\n  h1 {\n    font-size: 2rem;\n  }\n}", buscar: "media query condition screen" },
    { termino: "min-width and max-width (in @media)", tema: "Responsive", para: "`min-width`: from that width up; `max-width`: up to that width.", ejemplo: "@media (min-width: 768px) {\n  .grid {\n    grid-template-columns: 1fr 1fr;\n  }\n}", buscar: "minimum maximum width breakpoint" },
    { termino: "fluid images", tema: "Responsive", para: "`max-width: 100%` and `height: auto`: the image never sticks out of its box.", ejemplo: "img {\n  max-width: 100%;\n  height: auto;\n}", buscar: "fluid image overflow" },
    { termino: "<meta name=\"viewport\">", tema: "Responsive", para: "Without it, the phone shows the website in miniature and `@media` doesn't work.", ejemplo: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">", buscar: "phone scale viewport", lenguaje: "html" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "One website, a thousand screens",
      texto: "Your website will be seen on phones, tablets, laptops and huge screens. A **responsive** website rearranges itself to look good on all of them, like water taking the shape of the glass 💧.\n\nFirst step, which you already know from “The head of the page”: in the `<head>` always write the `<meta name=\"viewport\">` tag from the example. Without it, the phone pretends to be a computer screen and shows you the website in miniature, with ant-sized letters 🐜. With it you tell it: “use your real width” (`width=device-width`) “and no zoom” (`initial-scale=1`).\n\nIn this course the result already looks good without it, but don't forget it in your real websites.",
      dispositivos: true,
      ejemplo: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My responsive website</title>
</head>
<body>
  <h1>I adapt to everything! 📱💻</h1>
  <p>Drag the column dividers or press 📱 Phone to see me narrow.</p>
</body>
</html>`,
        css: `body {
  font-family: sans-serif;
}`
      },
      consejo: "To test responsive design, look at the result's bar: the **💻 Full width** and **📱 Phone** buttons change the width, and the number in **px** tells you how wide it is now. You can also drag the column dividers!"
    },
    {
      tipo: "explicacion",
      titulo: "Fluid images: max-width: 100%",
      texto: "A photo is as big as it is: if it's 400 px wide and the screen is only 375, it sticks out on one side. 😬\n\nThe solution is a rule you'll see on almost every website: `img { max-width: 100%; }`. You already know `max-width` (maximum width): with `100%` you tell the image “never be wider than your box”. If it fits, it keeps its size; if it doesn't, it shrinks without getting distorted.\n\nThis is called a **fluid image**. In the example, the box is at most 250 px wide and the 400 px mountain shrinks to fit.",
      dispositivos: true,
      ejemplo: {
        html: `<div class="frame">
  <img src="recursos/img/montana.svg" alt="A snowy mountain">
</div>`,
        css: `.frame {
  max-width: 250px;
  border: 4px solid teal;
}
img {
  max-width: 100%;
}`
      },
      consejo: "Put `img { max-width: 100%; }` at the start of all your projects. It's one line and it saves you a lot of scares."
    },
    {
      tipo: "ejercicio",
      enunciado: "The mountain photo is 400 px wide and sticks out of its frame 🏔️. Make it fluid:\n\n• For the `img` selector, add `max-width` with the value `100%`.\n\nThe HTML is already written: you only write the CSS.",
      dispositivos: true,
      cssBase: `body { font-family: sans-serif; }
.frame { max-width: 260px; border: 4px solid teal; border-radius: 8px; padding: 6px; }`,
      inicial: {
        html: `<div class="frame">
  <img src="recursos/img/montana.svg" alt="A snowy mountain">
  <p>Trip to Snowy Peak</p>
</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="frame">
  <img src="recursos/img/montana.svg" alt="A snowy mountain">
  <p>Trip to Snowy Peak</p>
</div>
`,
        css: `img {
  max-width: 100%;
}
`
      },
      pistas: [
        "Write a rule for the img tag with a single property: the maximum width, as a percentage.",
        "It should look like this:\nimg {\n  max-width: 100%;\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Media queries: CSS with conditions",
      texto: "A **media query** is CSS that only applies **if a condition is met**, like “if it rains, take an umbrella” ☔:\n\n• `@media (max-width: 600px) { … }` → “if the screen is **600 px or less**”.\n• `@media (min-width: 900px) { … }` → “if it's **900 px or more**”.\n\nInside the braces you write normal rules. The widths where the design changes are called **breakpoints**.\n\nIn the example, the text comes from an `::after` (you saw it in Pseudo-elements) and changes with the width. Press 📱 or drag the dividers!",
      dispositivos: true,
      ejemplo: {
        html: `<p class="screen"></p>`,
        css: `.screen {
  padding: 20px;
  font-family: sans-serif;
  font-size: 22px;
  text-align: center;
  background-color: lightgreen;
}
.screen::after {
  content: "💻 Medium screen";
}

@media (max-width: 600px) {
  .screen {
    background-color: gold;
  }
  .screen::after {
    content: "📱 Small screen";
  }
}

@media (min-width: 900px) {
  .screen {
    background-color: plum;
  }
  .screen::after {
    content: "🖥️ Large screen";
  }
}`
      },
      consejo: "Notice the **two sets of braces**: one opens and closes the `@media` and the others, each rule inside. If you forget to close one, everything below stops working. Write media queries **at the end** of the CSS so they win in the cascade."
    },
    {
      tipo: "ejercicio",
      enunciado: "On large screens, today's menu goes in a row. On a phone it doesn't fit: stack it! 🍽️\n\nWrite a media query `@media (max-width: 600px)` and, inside it:\n\n• For the `.row` selector, add `flex-direction` with the value `column`.\n• For the `.box` selector, add `background-color` with the value `lightskyblue`.\n\nThe row already has `display: flex`. Check the change with the 📱 Phone button.",
      dispositivos: true,
      cssBase: `body { font-family: sans-serif; }
.row { display: flex; gap: 10px; }
.box { flex: 1; background-color: gold; padding: 16px 8px; border-radius: 10px; text-align: center; font-size: 18px; }`,
      inicial: {
        html: `<div class="row">
  <div class="box">🍕 Pizza</div>
  <div class="box">🍔 Burger</div>
  <div class="box">🌮 Tacos</div>
</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="row">
  <div class="box">🍕 Pizza</div>
  <div class="box">🍔 Burger</div>
  <div class="box">🌮 Tacos</div>
</div>
`,
        css: `@media (max-width: 600px) {
  .row {
    flex-direction: column;
  }
  .box {
    background-color: lightskyblue;
  }
}
`
      },
      pistas: [
        "Start with @media (max-width: 600px) { and close it at the end with }. Inside go two normal rules, each with its own braces.",
        "It should look like this:\n@media (max-width: 600px) {\n  .row {\n    flex-direction: column;\n  }\n  .box {\n    background-color: lightskyblue;\n  }\n}"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "When do the rules in @media (max-width: 600px) { … } apply?",
      opciones: [
        "When the screen is 600 px or less",
        "When the screen is 600 px or more",
        "Always, but only to 600 px images"
      ],
      correcta: 0,
      explicacion: "max-width means “maximum width”: the condition is met as long as the screen isn't wider than 600 px. For “600 px or more” you'd use min-width."
    },
    {
      tipo: "reto",
      enunciado: "Build your photo gallery 📷 so it looks good on a computer and on a phone:\n\n1. Give `.gallery` **3 equal columns**.\n2. Make the photos **fluid**: never wider than their cell.\n3. Add a media query `@media (max-width: 600px)` so that, on small screens, the gallery has **a single column**.\n\nTest it with the 💻 and 📱 buttons.",
      dispositivos: true,
      cssBase: `body { font-family: sans-serif; }
h1 { color: teal; }`,
      inicial: {
        html: `<h1>My gallery 📷</h1>
<div class="gallery">
  <img src="recursos/img/gato.svg" alt="A cat">
  <img src="recursos/img/perro.svg" alt="A dog">
  <img src="recursos/img/pizza.svg" alt="A pizza">
  <img src="recursos/img/montana.svg" alt="A mountain">
  <img src="recursos/img/gato.svg" alt="Another cat">
  <img src="recursos/img/perro.svg" alt="Another dog">
</div>
`,
        css: `.gallery {
  display: grid;
  gap: 10px;
  /* 1. Three equal columns */
}

.gallery img {
  border-radius: 8px;
  /* 2. Never wider than its cell */
}

/* 3. Media query: up to 600px, a single column */
`
      },
      comprobaciones: [
        {
          texto: "On a wide screen (1280 px), `.gallery` has 3 columns",
          prueba: async (doc) => {
            const v = await PRUEBA.clonar(doc, { ancho: 1280 });
            const g = v.doc.querySelector(".gallery");
            if (!g) return false;
            const cols = v.win.getComputedStyle(g).gridTemplateColumns || "none";
            return cols !== "none" && cols.trim().split(/\s+/).length === 3;
          }
        },
        {
          texto: "On a phone (375 px), `.gallery` changes to a single column",
          prueba: async (doc) => {
            const count = async width => {
              const v = await PRUEBA.clonar(doc, { ancho: width });
              const g = v.doc.querySelector(".gallery");
              if (!g) return 0;
              const cols = v.win.getComputedStyle(g).gridTemplateColumns || "none";
              return cols === "none" ? 1 : cols.trim().split(/\s+/).length;
            };
            return (await count(375)) === 1 && (await count(1280)) === 3;
          }
        },
        {
          texto: "The photos are fluid: on a phone they don't stick out of the gallery",
          prueba: async (doc) => {
            const v = await PRUEBA.clonar(doc, { ancho: 375 });
            const g = v.doc.querySelector(".gallery");
            const photos = [...v.doc.querySelectorAll(".gallery img")];
            if (!g || !photos.length) return false;
            const edge = g.getBoundingClientRect().right;
            return photos.every(img => v.win.getComputedStyle(img).maxWidth === "100%"
              || img.getBoundingClientRect().right <= edge + 1);
          }
        }
      ],
      pistas: [
        "For the columns use grid-template-columns with repeat (like in the Grid lesson). The photos need max-width. At the end, the media query changes grid-template-columns again, this time to a single column.",
        "In .gallery add grid-template-columns: repeat(3, 1fr);\nIn .gallery img add max-width: 100%;\nAt the end write:\n@media (max-width: 600px) {\n  .gallery {\n    grid-template-columns: 1fr;\n  }\n}"
      ],
      solucion: {
        html: `<h1>My gallery 📷</h1>
<div class="gallery">
  <img src="recursos/img/gato.svg" alt="A cat">
  <img src="recursos/img/perro.svg" alt="A dog">
  <img src="recursos/img/pizza.svg" alt="A pizza">
  <img src="recursos/img/montana.svg" alt="A mountain">
  <img src="recursos/img/gato.svg" alt="Another cat">
  <img src="recursos/img/perro.svg" alt="Another dog">
</div>
`,
        css: `.gallery {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
}

.gallery img {
  border-radius: 8px;
  max-width: 100%;
}

@media (max-width: 600px) {
  .gallery {
    grid-template-columns: 1fr;
  }
}
`
      }
    }
  ]
});
