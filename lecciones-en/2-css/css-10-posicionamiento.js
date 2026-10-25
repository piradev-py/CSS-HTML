/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-10 (inglés)
   Posicionamiento — position (static, relative, absolute, sticky
   con un ejercicio de cabecera; fixed solo se menciona),
   top/right/bottom/left, padre con relative y z-index.
   Nota: el reto comprueba la position calculada de la tarjeta y de la
   pegatina, y los valores calculados de top y right (10px). En un
   elemento static, top/right calculados valen "auto" (parseFloat → NaN),
   así que el código inicial falla.
   ============================================================ */
CURSO.registrar({
  id: "css-10",
  titulo: "Positioning",
  xp: 45,
  objetivo: "You'll know how to take elements out of the normal flow and place them exactly where you want with position.",
  glosario: [
    { termino: "position: relative", tema: "Positioning", para: "Moves a little from its spot and acts as the parent for `absolute` elements.", ejemplo: ".hero-photo {\n  position: relative;\n}", buscar: "relative parent reference" },
    { termino: "position: absolute", tema: "Positioning", para: "Leaves the flow and is placed relative to the parent with `relative`.", ejemplo: ".note {\n  position: absolute;\n  top: -56px;\n  right: -20px;\n}", buscar: "absolute sticker corner on top" },
    { termino: "top, right, bottom, left", tema: "Positioning", para: "How far it sits from each side when you place it.", ejemplo: ".note {\n  top: 0;\n  right: 0;\n}", buscar: "top right bottom left place" },
    { termino: "position: fixed", tema: "Positioning", para: "Pinned to the screen even when you scroll down.", ejemplo: ".notice {\n  position: fixed;\n  bottom: 16px;\n}", buscar: "fixed screen" },
    { termino: "position: sticky", tema: "Positioning", para: "Sits in its spot and, when you scroll down, stays stuck (with `top`).", ejemplo: "header {\n  position: sticky;\n  top: 0;\n}", buscar: "sticky header stays when scrolling" },
    { termino: "scroll-margin-top", tema: "Positioning", para: "With a `sticky` header, the gap left at the top when jumping to a section: that way its heading isn't covered.", ejemplo: "section {\n  scroll-margin-top: 90px;\n}", buscar: "header covers heading jump anchor link menu" },
    { termino: "z-index", tema: "Positioning", para: "Who stays on top when they overlap: the bigger number wins.", ejemplo: "header {\n  z-index: 10;\n}", buscar: "on top layers in front" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "The normal flow and position: relative",
      texto: "Normally boxes are placed **one after another**, like the words in a book. That's called the **normal flow**, and it's what `position: static`, the default value, does.\n\nWith `position: relative`, the box can **move from its spot** with `top`, `right`, `bottom` and `left`. For example, `top: 10px` pushes it 10px from the top (that is, down) and `left: 40px`, 40px from the left.\n\nLook at box 2: it has moved, but **its gap is still there**. The others act as if it hadn't moved. 👻",
      ejemplo: {
        html: `<div class="box">1</div>
<div class="box moved">2</div>
<div class="box">3</div>`,
        css: `.box {
  width: 60px;
  padding: 10px;
  margin-bottom: 5px;
  background-color: lightblue;
}
.moved {
  position: relative;
  top: 10px;
  left: 40px;
  background-color: orange;
}`
      }
    },
    {
      tipo: "explicacion",
      titulo: "absolute: the fridge magnet",
      texto: "`position: absolute` **takes the box out of the flow**: the others forget about it and take its place. Then `top`, `right`, `bottom` and `left` place it relative to its **positioned parent**.\n\nPositioned parent? It's the closest container that has `position: relative` (or any value that isn't `static`).\n\nThink of a **fridge magnet** 🧲: the fridge (`relative`) is the reference, and the magnet (`absolute`) sticks wherever you tell it. In the example, 10px from the bottom and 10px from the right.",
      ejemplo: {
        html: `<div class="fridge">
  Kitchen fridge
  <span class="magnet">🍕</span>
</div>`,
        css: `.fridge {
  position: relative;
  width: 200px;
  height: 120px;
  padding: 10px;
  background-color: lightgray;
  border-radius: 10px;
}
.magnet {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 30px;
}`
      },
      consejo: "If no parent has `position: relative`, the magnet sticks… to the whole page! That's why `relative` on the parent and `absolute` on the child almost always go together."
    },
    {
      tipo: "explicacion",
      titulo: "z-index, fixed and sticky",
      texto: "When two positioned boxes **overlap**, `z-index` decides which one goes on top: the **highest** number wins, like in a stack of cards. 🃏 It only works on boxes with a `position` other than `static`.\n\nAnd two more `position` values worth knowing:\n\n• `fixed`: stays pinned to the screen even when you *scroll* (move through the page), like the chat button on lots of websites.\n• `sticky`: moves normally until it reaches the edge of the screen, and there it stays stuck. Ideal for menus.\n\nA detail about websites with a `sticky` header: if a menu link jumps to a section (`#services`), its heading ends up **under** the header. You fix it by giving sections a gap at the top when jumping, as tall as the header: `section { scroll-margin-top: 90px; }`.\n\nIn a moment you'll try `sticky` with a real header.",
      ejemplo: {
        html: `<div class="card red">Red: z-index 2</div>
<div class="card blue">Blue: z-index 1</div>`,
        css: `.card {
  position: absolute;
  width: 110px;
  height: 70px;
  padding: 10px;
  color: white;
}
.red {
  top: 20px;
  left: 20px;
  z-index: 2;
  background-color: crimson;
}
.blue {
  top: 60px;
  left: 90px;
  z-index: 1;
  background-color: royalblue;
}`
      },
      consejo: "Change the numbers in your head: if the blue one had `z-index: 3`, it would go over the red one."
    },
    {
      tipo: "ejercicio",
      enunciado: "Get ready for liftoff! 🚀 Move the rocket from its spot. For the `.rocket` class, add:\n\n• a `position` of `relative`,\n• a `top` of `20px`,\n• and a `left` of `50px`.",
      inicial: {
        html: `<div class="rocket">🚀 Liftoff!</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="rocket">🚀 Liftoff!</div>
`,
        css: `.rocket {
  position: relative;
  top: 20px;
  left: 50px;
}
`
      },
      pistas: [
        "A single rule with the .rocket selector. Without position: relative, top and left do nothing.",
        "It should look like this:\n.rocket {\n  position: relative;\n  top: 20px;\n  left: 50px;\n}"
      ]
    },
    {
      tipo: "ejercicio",
      enunciado: "Make the blog's header **stay put** when you scroll down the page 📌. For the `.header` class, add:\n\n• a `position` of `sticky`,\n• a `top` of `0` (it sticks right at the top),\n• and a `background-color` of `white`, so the text passing underneath doesn't show through.\n\nThen scroll down the result and watch it stay stuck.",
      inicial: {
        html: `<header class="header">🍰 The bakery blog</header>
<p>Today we made cheesecake.</p>
<p>Yesterday, chocolate cookies.</p>
<p>On Monday, fresh croissants.</p>
<p>On Sunday, lemon sponge cake.</p>
<p>On Saturday, muffins.</p>
<p>On Friday, donuts.</p>
<p>On Thursday, country bread.</p>
<p>On Wednesday, puff pastry palmiers.</p>
<p>On Tuesday, apple pie.</p>
<p>And tomorrow, a surprise!</p>
`,
        css: ""
      },
      solucion: {
        html: `<header class="header">🍰 The bakery blog</header>
<p>Today we made cheesecake.</p>
<p>Yesterday, chocolate cookies.</p>
<p>On Monday, fresh croissants.</p>
<p>On Sunday, lemon sponge cake.</p>
<p>On Saturday, muffins.</p>
<p>On Friday, donuts.</p>
<p>On Thursday, country bread.</p>
<p>On Wednesday, puff pastry palmiers.</p>
<p>On Tuesday, apple pie.</p>
<p>And tomorrow, a surprise!</p>
`,
        css: `.header {
  position: sticky;
  top: 0;
  background-color: white;
}
`
      },
      pistas: [
        "A rule with the .header selector and three lines: position, top and background-color.",
        "It should look like this:\n.header {\n  position: sticky;\n  top: 0;\n  background-color: white;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "Place the sticker with the sliders. Try the sticker's three `position` values… and then take the `relative` off the card (set it to `static`) to see where it runs off to. 🏃",
      html: `<div class="card">
  <p>Turbo 3000 Sneakers</p>
  <span class="sticker">NEW!</span>
</div>`,
      cssBase: "body { font-family: sans-serif; }\n.card { height: 120px; margin-top: 40px; padding: 10px; background-color: #e0f2fe; border: 2px solid #0284c7; border-radius: 12px; }\n.sticker { padding: 4px 8px; color: white; background-color: crimson; border-radius: 6px; }",
      controles: [
        { selector: ".sticker", propiedad: "position", tipo: "opciones", opciones: ["static", "relative", "absolute"], valor: "absolute" },
        { selector: ".sticker", propiedad: "top", tipo: "rango", min: 0, max: 120, valor: 10, unidad: "px" },
        { selector: ".sticker", propiedad: "left", tipo: "rango", min: 0, max: 250, valor: 10, unidad: "px" },
        { selector: ".card", propiedad: "position", tipo: "opciones", opciones: ["relative", "static"], valor: "relative" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "You want to place a sticker with position: absolute in the corner of a card. What does the card need?",
      opciones: ["position: relative", "display: none", "z-index: 100"],
      correcta: 0,
      explicacion: "An absolute element is placed relative to its positioned parent. With position: relative, the card becomes the reference; without it, the sticker would be placed relative to the whole page."
    },
    {
      tipo: "reto",
      enunciado: "A new product has arrived at the shop! 🛹 Put the **NEW!** sticker in the top right corner of the card:\n\n1. Make `.product` the sticker's reference with `position: relative`.\n2. Take `.sticker` out of the flow with `position: absolute`.\n3. Place it with `top: 10px` and `right: 10px`.",
      pestana: "css",
      inicial: {
        html: `<div class="product">
  <h2>Flying Skateboard</h2>
  <p>Floats a hand's width off the ground. Not suitable for puddles.</p>
  <span class="sticker">NEW!</span>
</div>
`,
        css: `.product {
  width: 250px;
  padding: 20px;
  background-color: lavender;
  border-radius: 12px;
  /* 1. Make it the sticker's reference */
}

.sticker {
  padding: 5px 10px;
  color: white;
  background-color: crimson;
  border-radius: 8px;
  /* 2. Take it out of the flow with position */
  /* 3. Place it at the top right with top and right */
}
`
      },
      comprobaciones: [
        {
          texto: "The .product card has position: relative",
          prueba: (doc, win) => {
            const el = doc.querySelector(".product");
            return !!el && win.getComputedStyle(el).position === "relative";
          }
        },
        {
          texto: "The sticker has position: absolute",
          prueba: (doc, win) => {
            const el = doc.querySelector(".sticker");
            return !!el && win.getComputedStyle(el).position === "absolute";
          }
        },
        {
          texto: "The sticker is 10px from the top edge (top)",
          prueba: (doc, win) => {
            const el = doc.querySelector(".sticker");
            if (!el) return false;
            return Math.abs(parseFloat(win.getComputedStyle(el).top) - 10) <= 0.5;
          }
        },
        {
          texto: "The sticker is 10px from the right edge (right)",
          prueba: (doc, win) => {
            const el = doc.querySelector(".sticker");
            if (!el) return false;
            return Math.abs(parseFloat(win.getComputedStyle(el).right) - 10) <= 0.5;
          }
        }
      ],
      pistas: [
        "The card gets position: relative and the sticker position: absolute. Then top sets the distance from the top and right, the distance from the right.",
        "Add position: relative; inside .product, and inside .sticker:\nposition: absolute;\ntop: 10px;\nright: 10px;"
      ],
      solucion: {
        html: `<div class="product">
  <h2>Flying Skateboard</h2>
  <p>Floats a hand's width off the ground. Not suitable for puddles.</p>
  <span class="sticker">NEW!</span>
</div>
`,
        css: `.product {
  width: 250px;
  padding: 20px;
  background-color: lavender;
  border-radius: 12px;
  position: relative;
}

.sticker {
  padding: 5px 10px;
  color: white;
  background-color: crimson;
  border-radius: 8px;
  position: absolute;
  top: 10px;
  right: 10px;
}
`
      }
    }
  ]
});
