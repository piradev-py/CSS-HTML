/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-07
   Transformaciones — transform con translate() (y translateX/Y),
   rotate(), scale(), varias funciones a la vez, transform-origin y
   las propiedades sueltas rotate / scale / translate (que usan los
   controles, porque cada deslizador necesita su propia propiedad).
   Notas:
   - transform calculado sale como matrix(a, b, c, d, e, f) o "none".
     El reto saca el ángulo con atan2(b, a) y la escala con
     √(a² + b²), y suma lo que pongan las propiedades sueltas
     rotate / scale por si el alumno las usa.
   - El :hover del reto se mira en una copia con PRUEBA.clonar.
   - Sin transiciones todavía: el cambio con :hover es instantáneo
     (se suaviza en hc-08).
   ============================================================ */
CURSO.registrar({
  id: "hc-07",
  titulo: "Transforms",
  xp: 40,
  objetivo: "You'll learn to move, rotate and scale elements with transform without shifting the rest of the page.",
  glosario: [
    { termino: "transform: translate()", tema: "Transforms", para: "Moves the element without pushing the others.", ejemplo: ".service:hover {\n  transform: translateY(-4px);\n}", buscar: "move shift lift up" },
    { termino: "rotate() and scale()", tema: "Transforms", para: "Rotates (in `deg`) or enlarges and shrinks (1 is its size).", ejemplo: ".card:hover {\n  transform: rotate(5deg) scale(1.1);\n}", buscar: "spin rotate scale enlarge" },
    { termino: "transform-origin", tema: "Transforms", para: "The point it rotates or grows from.", ejemplo: ".card {\n  transform-origin: bottom center;\n}", buscar: "turning point origin" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Move without pushing: translate()",
      texto: "If you move a box with `margin`, sometimes you push its neighbors. The `transform` property changes how an element **looks** without changing its spot on the page: the other boxes don't even notice. It's like a hologram 👻: the box stays in its slot, but you see it somewhere else.\n\nThe first function is `translate(x, y)`: `transform: translate(30px, 10px)` moves it 30 px to the right and 10 px down. With negative numbers, to the left and up.\n\nFor a single axis: `translateX(30px)` or `translateY(-10px)`. Careful! On the web, negative Y goes **up**.",
      ejemplo: {
        html: `<div class="row">
  <div class="box">1</div>
  <div class="box moved">2</div>
  <div class="box">3</div>
</div>`,
        css: `.row {
  display: flex;
  gap: 10px;
}
.box {
  width: 60px;
  padding: 16px 0;
  background-color: tomato;
  color: white;
  text-align: center;
}
.moved {
  transform: translate(20px, 30px);
  background-color: royalblue;
}`
      },
      consejo: "`transform` doesn't work on **inline** elements like `<span>` or `<a>`. If you don't see any effect, give them `display: inline-block`."
    },
    {
      tipo: "explicacion",
      titulo: "Rotate and scale: rotate() and scale()",
      texto: "• `rotate(15deg)` **rotates** the element. `deg` means degrees: `360deg` is a full turn. Positive turns like clock hands 🕐; negative, the other way.\n• `scale(1.5)` **enlarges or shrinks** it, no unit: `1` is its normal size, `2` is twice as big and `0.5` is half.\n\nWant several at once? Write them **in the same** `transform`, separated by spaces: `transform: rotate(-10deg) scale(1.2);`. If you write two `transform`s in the same rule, the second one steps on the first (the cascade again!).",
      ejemplo: {
        html: `<div class="row">
  <div class="box rotated">🐱</div>
  <div class="box big">🐶</div>
  <div class="box both">🐰</div>
</div>`,
        css: `.row {
  display: flex;
  gap: 30px;
  padding: 20px;
}
.box {
  width: 60px;
  height: 60px;
  font-size: 36px;
  text-align: center;
  background-color: lightyellow;
  border: 2px solid orange;
  border-radius: 8px;
}
.rotated {
  transform: rotate(20deg);
}
.big {
  transform: scale(1.3);
}
.both {
  transform: rotate(-15deg) scale(0.8);
}`
      },
      consejo: "Modern trick: there are also the **individual** properties `translate`, `rotate` and `scale` (for example `rotate: 20deg;` or `scale: 1.3;`). They do the same and don't step on each other. You'll use them in a moment in the controls."
    },
    {
      tipo: "ejercicio",
      enunciado: "Give Tagui's exam a tilted **PASSED!** stamp, a bit bigger, like the real ones 📝.\n\n• On the `.stamp` selector, give `transform` the value `rotate(-15deg) scale(1.2)`.\n\nThe HTML is already written: you only write the CSS.",
      cssBase: `body { font-family: sans-serif; }
.exam { background-color: white; border: 1px solid #ccc; border-radius: 8px; padding: 16px 24px 30px; max-width: 320px; }
.stamp { display: inline-block; margin: 10px 0 0 20px; padding: 6px 14px; border: 4px solid crimson; border-radius: 8px; color: crimson; font-size: 22px; font-weight: bold; }`,
      inicial: {
        html: `<div class="exam">
  <h2>Tagui's exam</h2>
  <p>Grade: 10</p>
  <p class="stamp">PASSED!</p>
</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="exam">
  <h2>Tagui's exam</h2>
  <p>Grade: 10</p>
  <p class="stamp">PASSED!</p>
</div>
`,
        css: `.stamp {
  transform: rotate(-15deg) scale(1.2);
}
`
      },
      pistas: [
        "One single rule for .stamp with one single property, transform. Inside go the two functions, one after another and separated by a space.",
        "It should look like this:\n.stamp {\n  transform: rotate(-15deg) scale(1.2);\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "The turning point: transform-origin",
      texto: "An element rotates and grows from its **center**. But you can change that point with `transform-origin`, like when you pin a note with a thumbtack 📌: it spins around the thumbtack.\n\nIts values are positions: `top`, `bottom`, `left`, `right` and `center`, combined: `transform-origin: bottom left` is the bottom-left corner.\n\nIn the example, both cards rotate the same, but the blue one rotates from below, like a drop-down door.",
      ejemplo: {
        html: `<div class="table">
  <div class="card">🃏</div>
  <div class="card from-below">🃏</div>
</div>`,
        css: `.table {
  display: flex;
  gap: 60px;
  padding: 30px 40px;
}
.card {
  width: 70px;
  height: 100px;
  font-size: 40px;
  text-align: center;
  line-height: 100px;
  background-color: white;
  border: 2px solid #333;
  border-radius: 8px;
  transform: rotate(25deg);
}
.from-below {
  transform-origin: bottom left;
  background-color: lightblue;
}`
      },
      consejo: "Do you remember `:hover`? With `.card:hover { transform: scale(1.1); }` the card grows when you hover over it. For now it changes in a snap; in the next lesson you'll learn to smooth it out."
    },
    {
      tipo: "controles",
      instruccion: "Here we use the individual properties `rotate`, `scale` and `translate`, one per slider. Rotate, enlarge and move the card, and change the turning point with `transform-origin` to see the difference.",
      html: `<div class="table">
  <div class="card">🃏</div>
</div>`,
      cssBase: `body { font-family: sans-serif; }
.table { display: flex; justify-content: center; padding: 70px 0; }
.card { width: 80px; height: 115px; font-size: 48px; text-align: center; line-height: 115px; background-color: white; border: 2px solid #333; border-radius: 10px; box-shadow: 0 2px 6px rgb(0 0 0 / 0.3); }`,
      controles: [
        { selector: ".card", propiedad: "rotate", tipo: "rango", min: -180, max: 180, valor: 0, unidad: "deg" },
        { selector: ".card", propiedad: "scale", tipo: "rango", min: 0.5, max: 2, paso: 0.1, valor: 1 },
        { selector: ".card", propiedad: "translate", tipo: "rango", min: -80, max: 80, valor: 0, unidad: "px" },
        { selector: ".card", propiedad: "transform-origin", tipo: "opciones", opciones: ["center", "top left", "bottom center", "bottom right"], valor: "center" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "You move a box with transform: translate(50px, 0). What happens to the boxes next to it?",
      opciones: [
        "Nothing: they stay in place, as if the box hadn't moved",
        "They move 50 px apart to make room for it",
        "They move 50 px along with it"
      ],
      correcta: 0,
      explicacion: "transform only changes how the element looks. Its slot on the page stays in the same place, so the neighbors don't even notice (unlike margin, which does push them)."
    },
    {
      tipo: "reto",
      enunciado: "Open your hand of cards into a **fan** 🃏 and make the middle card stand out:\n\n1. Make all the `.card`s rotate **from below, in the center** (`transform-origin`).\n2. Rotate the `.left` card **15 degrees to the left**.\n3. Rotate the `.right` card **15 degrees to the right**.\n4. Make the `.center` card **grow** when you hover over it (for example, to `1.2`).",
      cssBase: `body { font-family: sans-serif; }
h2 { text-align: center; }
.deck { display: flex; justify-content: center; padding: 30px 0 50px; }
.card { width: 90px; height: 130px; margin: 0 -6px; display: flex; align-items: center; justify-content: center; background-color: white; border: 2px solid #333; border-radius: 10px; font-size: 30px; font-weight: bold; box-shadow: 0 2px 6px rgb(0 0 0 / 0.3); }
.left, .right { color: crimson; }
.center { position: relative; z-index: 1; }`,
      inicial: {
        html: `<h2>My card hand</h2>
<div class="deck">
  <div class="card left">A♥</div>
  <div class="card center">K♠</div>
  <div class="card right">Q♦</div>
</div>
`,
        css: `/* 1. They all rotate from below, in the center */
.card {

}

/* 2. 15 degrees to the left */
.left {

}

/* 3. 15 degrees to the right */
.right {

}

/* 4. It grows when you hover */
.center:hover {

}
`
      },
      comprobaciones: [
        {
          texto: "The `.left` card is rotated to the left (degrees in negative)",
          prueba: (doc, win) => {
            const el = doc.querySelector(".left");
            if (!el) return false;
            const cs = win.getComputedStyle(el);
            let grados = 0;
            const m = (cs.transform || "none").match(/\(([^)]*)\)/);
            if (m) {
              const n = m[1].split(",").map(parseFloat);
              grados += Math.atan2(n[1] || 0, n[0] || 0) * 180 / Math.PI;
            }
            const r = (cs.rotate || "").match(/(-?[\d.]+)deg/);
            if (r) grados += parseFloat(r[1]);
            return grados < -1;
          }
        },
        {
          texto: "The `.right` card is rotated to the right (degrees in positive)",
          prueba: (doc, win) => {
            const el = doc.querySelector(".right");
            if (!el) return false;
            const cs = win.getComputedStyle(el);
            let grados = 0;
            const m = (cs.transform || "none").match(/\(([^)]*)\)/);
            if (m) {
              const n = m[1].split(",").map(parseFloat);
              grados += Math.atan2(n[1] || 0, n[0] || 0) * 180 / Math.PI;
            }
            const r = (cs.rotate || "").match(/(-?[\d.]+)deg/);
            if (r) grados += parseFloat(r[1]);
            return grados > 1;
          }
        },
        {
          texto: "The cards rotate from below (`transform-origin` in the bottom part)",
          prueba: (doc, win) => {
            const cartas = [...doc.querySelectorAll(".left, .right")];
            if (cartas.length < 2) return false;
            return cartas.every(el => {
              const y = parseFloat((win.getComputedStyle(el).transformOrigin || "").split(" ")[1]);
              return !isNaN(y) && y >= el.offsetHeight - 1;
            });
          }
        },
        {
          texto: "When you hover, the `.center` card grows (and without the mouse it has its normal size)",
          prueba: async (doc, win) => {
            const escala = (w, el) => {
              const cs = w.getComputedStyle(el);
              let e = 1;
              const m = (cs.transform || "none").match(/\(([^)]*)\)/);
              if (m) {
                const n = m[1].split(",").map(parseFloat);
                e *= Math.hypot(n[0] || 0, n[1] || 0);
              }
              const s = parseFloat(cs.scale);
              if (!isNaN(s)) e *= s;
              return e;
            };
            const normal = doc.querySelector(".center");
            if (!normal) return false;
            const v = await PRUEBA.clonar(doc, { estado: "hover" });
            const encima = v.doc.querySelector(".center");
            if (!encima) return false;
            return escala(win, normal) <= 1.01 && escala(v.win, encima) > 1.05;
          }
        }
      ],
      pistas: [
        "On .card use transform-origin with two words (bottom and center). On .left and .right, transform with rotate and the degrees (negative to the left). On .center:hover, transform with scale.",
        "It should look like this:\n.card { transform-origin: bottom center; }\n.left { transform: rotate(-15deg); }\n.right { transform: rotate(15deg); }\n.center:hover { transform: scale(1.2); }"
      ],
      solucion: {
        html: `<h2>My card hand</h2>
<div class="deck">
  <div class="card left">A♥</div>
  <div class="card center">K♠</div>
  <div class="card right">Q♦</div>
</div>
`,
        css: `/* 1. They all rotate from below, in the center */
.card {
  transform-origin: bottom center;
}

/* 2. 15 degrees to the left */
.left {
  transform: rotate(-15deg);
}

/* 3. 15 degrees to the right */
.right {
  transform: rotate(15deg);
}

/* 4. It grows when you hover */
.center:hover {
  transform: scale(1.2);
}
`
      }
    }
  ]
});
