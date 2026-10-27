/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-01 (primera del mundo)
   Maqueta una tarjeta — descomponer un diseño en cajas,
   max-width, object-fit: cover y overflow: hidden.
   Nota: las imágenes de recursos/img son SVG de 400×300 sin
   preserveAspectRatio, así que sin object-fit NO se estiran: se
   quedan pequeñas y dejan huecos (el texto lo explica así).
   El reto mide el centrado con getBoundingClientRect respecto al
   padre (body), para no depender de la barra de desplazamiento.
   ============================================================ */
CURSO.registrar({
  id: "hc-01",
  titulo: "Build a card",
  xp: 45,
  objetivo: "You'll learn to turn a design into boxes and build a card with a well-cropped photo, a maximum width, and centered on the page.",
  glosario: [
    { termino: "think in boxes", tema: "Cards", para: "Before writing, draw the design as boxes inside boxes: each box is an element.", ejemplo: "<article class=\"service\">\n  <img src=\"img/servicio-medicina.jpg\" alt=\"\">\n  <h3>General medicine</h3>\n</article>", buscar: "layout design boxes flat plan", lenguaje: "html" },
    { termino: "object-fit: cover", tema: "Cards", para: "The photo fills its slot without getting distorted: anything left over is cropped.", ejemplo: ".service img {\n  height: 200px;\n  object-fit: cover;\n}", buscar: "crop photo fill distort" },
    { termino: "overflow: hidden", tema: "Cards", para: "Hides whatever sticks out of the box (for example, the corners of a photo).", ejemplo: ".card {\n  border-radius: 20px;\n  overflow: hidden;\n}", buscar: "hide sticks out crop" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "First, think in boxes",
      texto: "Welcome to the HTML + CSS World! 🧩 Here we put everything together to build pieces of real websites.\n\nBefore writing code, professionals look at the design and **break it into boxes**, like taking apart a LEGO toy 🧱. Ask yourself three questions:\n\n1. What's the **big box**? Here, the card (an `<article>`, because it makes sense on its own).\n2. What boxes are **inside** it, and in what order? Photo, name, description and button.\n3. Do they go in a **row** or in a **column**? In a column, one below the other.\n\nIn the example we've drawn the border of each box so you can see them.",
      ejemplo: {
        html: `<article class="card">
  <img src="recursos/img/gato.svg" alt="Smiling orange cat" width="160">
  <h2>Michi</h2>
  <p>Expert at napping in the sun.</p>
  <button>Adopt</button>
</article>`,
        css: `.card {
  width: 200px;
  padding: 8px;
  border: 3px dashed royalblue;
}
.card img,
.card h2,
.card p,
.card button {
  border: 2px dashed tomato;
}`
      },
      consejo: "Make this drawing on paper before you start: once the boxes are clear, the HTML almost writes itself and the CSS is much easier."
    },
    {
      tipo: "explicacion",
      titulo: "A maximum width: max-width",
      texto: "With `width: 300px` the box measures 300px **always**… even if the screen is narrower. Result: it sticks out on one side. 😬\n\n`max-width: 300px` is a **maximum width**, like an elastic belt: if there's room, the box measures 300px; if there isn't, it **shrinks** to fit.\n\nIn the example, the gray frame is a slot only 220px wide (like a very narrow phone). The red box, with `width`, sticks out. The green one, with `max-width`, adapts.",
      ejemplo: {
        html: `<div class="gap">
  <p class="fixed">width: 300px</p>
  <p class="flexible">max-width: 300px</p>
</div>`,
        css: `.gap {
  width: 220px;
  border: 3px dashed gray;
}
.fixed {
  width: 300px;
  background-color: tomato;
}
.flexible {
  max-width: 300px;
  background-color: mediumseagreen;
}`
      },
      consejo: "`max-width` and `margin: 0 auto` (from the box model lesson) are the perfect pair: the box doesn't grow too much and ends up centered."
    },
    {
      tipo: "explicacion",
      titulo: "Photos that fill their slot: object-fit",
      texto: "In a card, the photo usually has a fixed slot, for example `width: 100%` and `height: 150px`. But the photo has its own shape, and it doesn't match: regular photos get **stretched** like a rubber band, and our drawings stay **small** with gaps. Neither looks good.\n\n`object-fit: cover` fixes it: the photo **fills the whole slot** without getting distorted, and whatever's left over gets cropped, like a photo inside a frame. 🖼️\n\n(Its cousin `object-fit: contain` does the opposite: it fits the whole photo in, even if gaps are left.)",
      ejemplo: {
        html: `<div class="row">
  <img class="photo" src="recursos/img/perro.svg" alt="Brown dog sticking its tongue out">
  <img class="photo cover" src="recursos/img/perro.svg" alt="The same dog, filling its whole slot">
</div>`,
        css: `.row {
  display: flex;
  gap: 16px;
}
.photo {
  width: 140px;
  height: 140px;
  background-color: lavender;
}
.cover {
  object-fit: cover;
}`
      }
    },
    {
      tipo: "explicacion",
      titulo: "Hiding whatever sticks out: overflow",
      texto: "Last trick. If the card has rounded corners, the photo inside **doesn't** round off on its own: its square corners poke out. 📐\n\n`overflow` decides what happens to whatever **sticks out** of a box. With `overflow: hidden` (“whatever sticks out, hide it”), the card crops everything that doesn't fit its shape, and the photo follows its curves.\n\nCompare the two cards: same photo, same corners, but only the second one has `overflow: hidden`.",
      ejemplo: {
        html: `<div class="row">
  <div class="card">
    <img class="photo" src="recursos/img/perro.svg" alt="Brown dog sticking its tongue out">
    <p>Without overflow</p>
  </div>
  <div class="card crop">
    <img class="photo" src="recursos/img/perro.svg" alt="The same dog, with its corners cropped">
    <p>overflow: hidden</p>
  </div>
</div>`,
        css: `.row {
  display: flex;
  gap: 16px;
}
.card {
  width: 150px;
  border-radius: 30px;
  background-color: lavender;
  text-align: center;
}
.photo {
  display: block;
  width: 100%;
  height: 130px;
  object-fit: cover;
}
.crop {
  overflow: hidden;
}`
      },
      consejo: "See the `display: block` on the photo? Images are inline elements and leave a little gap below, as if they were a letter. With `block`, it disappears."
    },
    {
      tipo: "ejercicio",
      enunciado: "Toby's photo 🐶 looks small, with gaps, and doesn't follow the rounded corners of its card. Fix it with the two tricks:\n\n• On the `.photo` selector, put `object-fit` with the value `cover`.\n• On the `.card` selector, put `overflow` with the value `hidden`.\n\nThe HTML is already written: you only write the CSS.",
      cssBase: `body { font-family: sans-serif; background-color: #fdf0e3; }
.card { width: 220px; border-radius: 24px; background-color: white; box-shadow: 0 8px 16px rgb(0 0 0 / 0.15); }
.photo { display: block; width: 100%; height: 210px; background-color: #ffd6a5; }
.card h2 { margin: 0; padding: 12px; text-align: center; color: #7f5539; }`,
      inicial: {
        html: `<div class="card">
  <img class="photo" src="recursos/img/perro.svg" alt="Brown long-eared dog sticking its tongue out">
  <h2>Toby</h2>
</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="card">
  <img class="photo" src="recursos/img/perro.svg" alt="Brown long-eared dog sticking its tongue out">
  <h2>Toby</h2>
</div>
`,
        css: `.photo {
  object-fit: cover;
}
.card {
  overflow: hidden;
}
`
      },
      pistas: [
        "You need two rules: one for .photo (so it fills its slot) and one for .card (so it hides whatever sticks out). Each one takes a single property.",
        "It should end up like this:\n.photo {\n  object-fit: cover;\n}\n.card {\n  overflow: hidden;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "Play with the card: change its maximum width, set the photo to `cover` and then change `overflow` to `hidden`. Watch the top corners!",
      html: `<div class="card">
  <img class="photo" src="recursos/img/pizza.svg" alt="A pepperoni pizza">
  <p>Pizza of the day 🍕</p>
</div>`,
      cssBase: `body { font-family: sans-serif; background-color: #fdf0e3; }
.card { margin: 0 auto; border-radius: 30px; background-color: white; box-shadow: 0 8px 16px rgb(0 0 0 / 0.15); }
.photo { display: block; width: 100%; height: 150px; }
.card p { margin: 0; padding: 12px; text-align: center; font-weight: bold; }`,
      controles: [
        { selector: ".card", propiedad: "max-width", tipo: "rango", min: 120, max: 400, valor: 260, unidad: "px" },
        { selector: ".card", propiedad: "overflow", tipo: "opciones", opciones: ["visible", "hidden"], valor: "visible" },
        { selector: ".photo", propiedad: "object-fit", tipo: "opciones", opciones: ["contain", "cover"], valor: "contain" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "What does max-width: 300px do to a box?",
      opciones: [
        "It can get narrower if there's no room, but never wider than 300px",
        "It always measures exactly 300px, whether it fits or not",
        "It measures at least 300px and can grow as much as it wants"
      ],
      correcta: 0,
      explicacion: "max-width is a maximum width: the box gets up to 300px if there's room and shrinks if there isn't. That's why it's perfect for cards that have to look good on a phone."
    },
    {
      tipo: "reto",
      enunciado: "Build Michi's adoption card 🐱. The HTML is already done; in the **CSS** tab:\n\n1. Give the `.card` a **maximum width** of `320px`.\n2. **Center it** on the page.\n3. Give it a soft **shadow**.\n4. Make the `.photo` **fill its slot** without getting distorted, and make the card **hide** whatever sticks out, so the photo follows its rounded corners.",
      pestana: "css",
      cssBase: `body { font-family: sans-serif; background-color: #fdf0e3; padding: 20px 0; }
.info h2 { margin: 0 0 6px; color: #e76f51; }
.info p { margin: 0 0 14px; line-height: 1.5; color: #555; }
.info button { background-color: #e76f51; color: white; border: none; padding: 10px 18px; border-radius: 999px; font-size: 16px; }`,
      inicial: {
        html: `<article class="card">
  <img class="photo" src="recursos/img/gato.svg" alt="Smiling orange cat under the sun">
  <div class="info">
    <h2>Michi</h2>
    <p>She's 3 years old, purrs like an engine, and is an expert at napping in the sun.</p>
    <button>I want to adopt her!</button>
  </div>
</article>
`,
        css: `.card {
  background-color: white;
  border-radius: 20px;
  /* 1. Maximum width of 320px */
  /* 2. Center it on the page */
  /* 3. A soft shadow */
  /* 4. Hide whatever sticks out */
}

.photo {
  display: block;
  width: 100%;
  height: 180px;
  /* 4. Fill its slot without getting distorted */
}

.info {
  padding: 16px;
}
`
      },
      comprobaciones: [
        {
          texto: "The card has a maximum width (`max-width`) between 250px and 400px",
          prueba: (doc, win) => {
            const t = doc.querySelector(".card");
            if (!t) return false;
            const max = parseFloat(win.getComputedStyle(t).maxWidth);
            return max >= 250 && max <= 400;
          }
        },
        {
          texto: "The card is centered on the page (the same gap on each side)",
          prueba: (doc) => {
            const t = doc.querySelector(".card");
            const padre = t?.parentElement;
            if (!t || !padre) return false;
            const r = t.getBoundingClientRect();
            const p = padre.getBoundingClientRect();
            const izquierda = r.left - p.left;
            const derecha = p.right - r.right;
            return r.width < p.width - 20 && Math.abs(izquierda - derecha) <= 2;
          }
        },
        {
          texto: "The photo fills its slot without getting distorted (`object-fit: cover`) and the card hides whatever sticks out (`overflow: hidden`)",
          prueba: (doc, win) => {
            const t = doc.querySelector(".card");
            const f = doc.querySelector(".card .photo");
            if (!t || !f) return false;
            const ct = win.getComputedStyle(t);
            const recorta = v => v === "hidden" || v === "clip";
            return win.getComputedStyle(f).objectFit === "cover" && recorta(ct.overflowX) && recorta(ct.overflowY);
          }
        },
        {
          texto: "The card has a shadow (`box-shadow`)",
          prueba: (doc, win) => {
            const t = doc.querySelector(".card");
            return !!t && win.getComputedStyle(t).boxShadow !== "none";
          }
        }
      ],
      pistas: [
        "In .card you need max-width for the maximum width, the box model's margin to center it, box-shadow for the shadow, and overflow to hide whatever sticks out. In .photo, object-fit.",
        "Inside .card add:\n  max-width: 320px;\n  margin: 0 auto;\n  box-shadow: 0 8px 16px rgb(0 0 0 / 0.2);\n  overflow: hidden;\nAnd inside .photo add: object-fit: cover;"
      ],
      solucion: {
        html: `<article class="card">
  <img class="photo" src="recursos/img/gato.svg" alt="Smiling orange cat under the sun">
  <div class="info">
    <h2>Michi</h2>
    <p>She's 3 years old, purrs like an engine, and is an expert at napping in the sun.</p>
    <button>I want to adopt her!</button>
  </div>
</article>
`,
        css: `.card {
  background-color: white;
  border-radius: 20px;
  max-width: 320px;
  margin: 0 auto;
  box-shadow: 0 8px 16px rgb(0 0 0 / 0.2);
  overflow: hidden;
}

.photo {
  display: block;
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.info {
  padding: 16px;
}
`
      }
    }
  ]
});
