/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-07 (inglés)
   El modelo de caja — contenido, padding, border, margin,
   width/height, box-sizing: border-box y centrar con margin: 0 auto.
   Nota: border se usa aquí en su forma abreviada sin explicarla a
   fondo (eso es css-08). El reto mide el ancho total con
   getBoundingClientRect() y el centrado comparando los huecos a
   izquierda y derecha respecto al <body>.
   ============================================================ */
CURSO.registrar({
  id: "css-07",
  titulo: "The box model",
  xp: 45,
  objetivo: "You'll understand that everything is a box and you'll know how to control its content, its padding, its border and its margin.",
  glosario: [
    { termino: "padding", tema: "Boxes", para: "The padding: space between the content and the border.", ejemplo: ".service {\n  padding: 22px;\n}", buscar: "padding space inside" },
    { termino: "margin", tema: "Boxes", para: "The margin: space outside the border, between the box and its neighbors.", ejemplo: "footer {\n  margin-top: 40px;\n}", buscar: "margin space outside separate" },
    { termino: "margin: 0 auto", tema: "Boxes", para: "Centers a box that has a width: 0 on top and bottom, whatever is left over on the sides.", ejemplo: "section {\n  max-width: 1200px;\n  margin: 0 auto;\n}", buscar: "center box horizontal" },
    { termino: "width and height", tema: "Boxes", para: "The width and the height of a box.", ejemplo: ".logo {\n  width: 48px;\n  height: 48px;\n}", buscar: "width height size" },
    { termino: "max-width", tema: "Boxes", para: "The maximum width: the box shrinks on small screens but never goes beyond it.", ejemplo: "img {\n  max-width: 100%;\n}", buscar: "maximum width container" },
    { termino: "box-sizing: border-box", tema: "Boxes", para: "The `width` includes padding and border: the measurements add up.", ejemplo: "* {\n  box-sizing: border-box;\n}", buscar: "box measurements include padding border" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Everything is a box 📦",
      texto: "To the browser, **every element is a rectangular box**, even if you can't see it. And every box has 4 layers, like a present:\n\n• **Content**: the present (text, image…). Its size is controlled with `width` and `height`.\n• `padding`: the tissue paper between the present and the box.\n• `border`: the cardboard of the box.\n• `margin`: the space you leave between it and the other boxes.\n\nIn the example, the gold background reaches the border (it includes the padding), but the margin is transparent.",
      ejemplo: {
        html: `<div class="gift">🧸 A teddy bear</div>`,
        css: `.gift {
  width: 120px;
  padding: 20px;
  border: 6px solid crimson;
  margin: 20px;
  background-color: gold;
}`
      },
      consejo: "For now, write the border like this: `border: 6px solid crimson` (thickness, style and color). You'll see it in depth in the next lesson."
    },
    {
      tipo: "explicacion",
      titulo: "padding, margin and the trick for centering",
      texto: "With **one value**, `padding: 15px` pads all four sides equally. Same with `margin`.\n\nIf you only want one side, add its name: `-top`, `-right`, `-bottom` or `-left`. For example, `margin-bottom: 10px`.\n\nWith **two values**, the first is for top and bottom, and the second for left and right.\n\nAnd here's a famous trick: `margin: 0 auto` **centers** a box that has a `width`. The `auto` tells the browser: “split the leftover space equally between both sides”. 🎯",
      ejemplo: {
        html: `<p class="post-it">Buy milk. And cookies. Most of all, cookies.</p>`,
        css: `.post-it {
  width: 180px;
  padding: 15px;
  margin: 0 auto;
  background-color: khaki;
}`
      },
      consejo: "`margin: 0 auto` only centers if the box has a `width` smaller than its parent. If it takes up the full width, there's no space left over to split!"
    },
    {
      tipo: "explicacion",
      titulo: "max-width: the container of websites",
      texto: "A fixed `width` has a problem: if the screen is narrower than the box, the box **sticks out**. 😬\n\n`max-width` is smarter: the box takes up as much width as it can, **but never more** than you tell it. On a big screen it stays at its size; on a small one, it shrinks.\n\nTogether with `margin: 0 auto` it makes the **centered container** that almost every website uses: the content never stretches from edge to edge on a huge screen and stays in the center.\n\nIn the example, the box is 300px at most. Make the window narrower and you'll see it shrink.",
      ejemplo: {
        html: `<div class="container">I'm never wider than 300px and I'm always in the center.</div>`,
        css: `.container {
  max-width: 300px;
  margin: 0 auto;
  padding: 15px;
  background-color: lavender;
}`
      },
      consejo: "Websites usually use a `max-width` of between 1000px and 1200px for the main content. That way lines of text don't go on forever on big screens."
    },
    {
      tipo: "explicacion",
      titulo: "box-sizing: border-box",
      texto: "Surprise: by default, `width` measures **only the content**. The padding and the border are added **on the outside**.\n\nA box with `width: 200px`, `padding: 20px` and a `5px` border is really 200 + 20 + 20 + 5 + 5 = **250px**. What a mess of sums! 😵\n\nThe solution is `box-sizing: border-box`. With it, `width` measures **the whole box** (content + padding + border): if you say 200px, it's 200px, and the content shrinks to make room.\n\nCompare the two boxes in the example: they have the same CSS, except for `box-sizing`.",
      ejemplo: {
        html: `<div class="box">Without border-box: 250px</div>
<div class="box exact">With border-box: 200px</div>`,
        css: `.box {
  width: 200px;
  padding: 20px;
  border: 5px solid teal;
  margin-bottom: 10px;
  background-color: paleturquoise;
}
.exact {
  box-sizing: border-box;
}`
      },
      consejo: "Many professionals start every project with `* { box-sizing: border-box; }`. The asterisk `*` means “every element”. That way the sums always work out. 😉"
    },
    {
      tipo: "ejercicio",
      enunciado: "Give this note some breathing room. For the `.note` class, add:\n\n• a `padding` of `20px`,\n• a `margin` of `30px`,\n• and a `background-color` of `lightpink` (so you can see how far the padding goes).",
      inicial: {
        html: `<p class="note">Don't forget to water Frederick, the cactus. 🌵</p>
`,
        css: ""
      },
      solucion: {
        html: `<p class="note">Don't forget to water Frederick, the cactus. 🌵</p>
`,
        css: `.note {
  padding: 20px;
  margin: 30px;
  background-color: lightpink;
}
`
      },
      pistas: [
        "Everything goes in a single rule with the .note selector. With just one value, padding and margin apply to all four sides.",
        "It should look like this:\n.note {\n  padding: 20px;\n  margin: 30px;\n  background-color: lightpink;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "Play with the layers of the box. Turn up the padding and the border, and then switch `box-sizing` between `content-box` (the usual) and `border-box`: what happens to the total size? Also watch how the margin pushes the neighbor below.",
      html: `<div class="box">📦 I'm a box</div>
<p>I'm the neighbor below.</p>`,
      cssBase: "body { font-family: sans-serif; }\n.box { background-color: #ffd166; border-style: solid; border-color: #e76f51; }",
      controles: [
        { selector: ".box", propiedad: "width", tipo: "rango", min: 80, max: 300, valor: 180, unidad: "px" },
        { selector: ".box", propiedad: "padding", tipo: "rango", min: 0, max: 50, valor: 10, unidad: "px" },
        { selector: ".box", propiedad: "border-width", tipo: "rango", min: 0, max: 20, valor: 5, unidad: "px" },
        { selector: ".box", propiedad: "margin", tipo: "rango", min: 0, max: 50, valor: 10, unidad: "px" },
        { selector: ".box", propiedad: "box-sizing", tipo: "opciones", opciones: ["content-box", "border-box"], valor: "content-box" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "A box has width: 200px, padding: 10px and a 5px border. Without box-sizing: border-box, how wide is it in total?",
      opciones: ["200px", "215px", "230px"],
      correcta: 2,
      explicacion: "Without border-box, the padding and the border are added on both sides: 200 + 10 + 10 + 5 + 5 = 230px. With border-box it would be exactly 200px."
    },
    {
      tipo: "reto",
      enunciado: "Get Lola's birthday gift box ready 🎁. It already has `width: 300px`; now:\n\n1. Give it some padding (`padding`).\n2. Give it a border (`border`).\n3. Make the **total** width stay at 300px, even with padding and border.\n4. Center it on the page.",
      pestana: "css",
      inicial: {
        html: `<div class="gift">🎁 Happy birthday, Lola! There's a stuffed dinosaur inside.</div>
`,
        css: `.gift {
  width: 300px;
  background-color: pink;
  /* 1. Add some padding */
  /* 2. Add a border, for example: border: 6px solid crimson; */
  /* 3. Make the TOTAL width stay at 300px (box-sizing) */
  /* 4. Center it on the page (margin) */
}
`
      },
      comprobaciones: [
        {
          texto: "The box has padding",
          prueba: (doc, win) => {
            const el = doc.querySelector(".gift");
            if (!el) return false;
            const cs = win.getComputedStyle(el);
            return (parseFloat(cs.paddingLeft) || 0) > 0 && (parseFloat(cs.paddingTop) || 0) > 0;
          }
        },
        {
          texto: "The box has a border",
          prueba: (doc, win) => {
            const el = doc.querySelector(".gift");
            if (!el) return false;
            return (parseFloat(win.getComputedStyle(el).borderLeftWidth) || 0) > 0;
          }
        },
        {
          texto: "The box is 300px wide in total, counting padding and border",
          prueba: (doc) => {
            const width = doc.querySelector(".gift")?.getBoundingClientRect().width || 0;
            return Math.abs(width - 300) <= 1;
          }
        },
        {
          texto: "The box is centered on the page",
          prueba: (doc) => {
            const el = doc.querySelector(".gift");
            if (!el || !doc.body) return false;
            const r = el.getBoundingClientRect();
            const b = doc.body.getBoundingClientRect();
            const left = r.left - b.left;
            const right = b.right - r.right;
            return left > 5 && Math.abs(left - right) <= 2;
          }
        }
      ],
      pistas: [
        "For step 3 use box-sizing: border-box. To center it, remember the margin trick with two values: 0 for top and bottom, auto for the sides.",
        "Add these lines inside .gift:\npadding: 20px;\nborder: 6px solid crimson;\nbox-sizing: border-box;\nmargin: 0 auto;"
      ],
      solucion: {
        html: `<div class="gift">🎁 Happy birthday, Lola! There's a stuffed dinosaur inside.</div>
`,
        css: `.gift {
  width: 300px;
  background-color: pink;
  padding: 20px;
  border: 6px solid crimson;
  box-sizing: border-box;
  margin: 0 auto;
}
`
      }
    }
  ]
});
