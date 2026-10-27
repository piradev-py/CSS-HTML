/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-09 (inglés)
   Animaciones — @keyframes (from/to), animation-name,
   animation-duration, animation-iteration-count (infinite),
   animation-direction (alternate), animation-timing-function,
   la abreviatura animation y @media (prefers-reduced-motion).
   Notas:
   - Animaciones TRANQUILAS (preferencia del usuario): ciclos de
     2–3 s, ease-in-out, alternate y desplazamientos pequeños. El
     «cargando» gira lineal, pero sin prisa (1.2 s por vuelta).
   - El revisor de ejercicios para las animaciones en su primer
     fotograma: por eso el «from» de cada @keyframes cambia algo
     (opacity 0, translateY(0)) y así se nota si falta el guion.
   - La regla de movimiento reducido no se puede comparar en un
     ejercicio (se evalúa siempre como «movimiento normal»): se
     practica en el reto con PRUEBA.clonar({ movimiento: "reducido" }).
   ============================================================ */
CURSO.registrar({
  id: "hc-09",
  titulo: "Animations",
  xp: 50,
  objetivo: "You'll know how to create animations that play by themselves with @keyframes and animation, and how to calm them down for people who prefer less motion.",
  glosario: [
    { termino: "@keyframes", tema: "Animations", para: "The frames of an animation: how it starts (`from`) and how it ends (`to`).", ejemplo: "@keyframes fade-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}", buscar: "frames animation keyframes" },
    { termino: "animation", tema: "Animations", para: "Applies an animation: name, duration and curve (and repetitions).", ejemplo: ".hero-text {\n  animation: fade-in 0.7s ease-out;\n}", buscar: "animate play" },
    { termino: "infinite and alternate", tema: "Animations", para: "`infinite` repeats nonstop; `alternate` goes there and back.", ejemplo: ".ghost {\n  animation: float 2s ease-in-out infinite alternate;\n}", buscar: "repeat forever back and forth" },
    { termino: "prefers-reduced-motion", tema: "Animations", para: "If the person asks for less motion, remove animations and transitions.", ejemplo: "@media (prefers-reduced-motion: reduce) {\n  .hero-text {\n    animation: none;\n  }\n}", buscar: "less motion accessibility reduce" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Animations that play by themselves: @keyframes",
      texto: "With `transition` something changes **when something happens**: you hover and the button changes color. But sometimes you want something to move **by itself**, without anyone touching it: an icon that floats, a “loading” spinner that turns… That's an **animation**.\n\nIt's done in two parts, like a play 🎭:\n\n1. The **script**: `@keyframes` and a name you choose. Inside you say how it starts (`from`) and how it ends (`to`).\n2. The **actor**: you tell the element which script to perform with `animation-name` and how long it lasts with `animation-duration` (in seconds: `2s`).\n\nIn the example, the heading appears little by little when the page loads.",
      ejemplo: {
        html: `<h1 class="title">Welcome to the aquarium! 🐠</h1>`,
        css: `@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.title {
  animation-name: fade-in;
  animation-duration: 2s;
}`
      },
      consejo: "This animation plays **only once**, when the page loads. If you missed it, go to the previous step and come back. 😉 And careful: the name of the `@keyframes` and the one in `animation-name` have to be **exactly the same**."
    },
    {
      tipo: "ejercicio",
      enunciado: "Make the movie theater poster 🎬 appear little by little.\n\n1. Create a `@keyframes` called `fade-in` that goes `from` an `opacity` of `0` `to` an `opacity` of `1`.\n2. For the `.poster` selector, add `animation-name` with the value `fade-in` and `animation-duration` with the value `2s`.\n\nThe HTML is already written: you only write the CSS.",
      cssBase: `body { font-family: sans-serif; }
.poster { background-color: midnightblue; color: gold; padding: 16px; border-radius: 12px; text-align: center; }`,
      inicial: {
        html: `<div class="poster">
  <h1>Tonight: The Space Penguins 🐧🚀</h1>
</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="poster">
  <h1>Tonight: The Space Penguins 🐧🚀</h1>
</div>
`,
        css: `@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.poster {
  animation-name: fade-in;
  animation-duration: 2s;
}
`
      },
      pistas: [
        "First the script: @keyframes fade-in { … } with two blocks inside, from { … } and to { … }, each with its opacity. Then, a normal rule for .poster with the two animation-… properties.",
        "It should look like this:\n@keyframes fade-in {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.poster {\n  animation-name: fade-in;\n  animation-duration: 2s;\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Repeat, go there and back",
      texto: "Three more properties so the animation never ends and is smooth:\n\n• `animation-iteration-count`: how many times it repeats. A number (`3`) or `infinite`, which means **nonstop**.\n• `animation-direction: alternate`: it goes from `from` to `to` and then **comes back** from `to` to `from`, like a swing. Without it, when it finishes it jumps straight back to the start.\n• `animation-timing-function`: the speed curve. You already know `ease-in-out` (starts and stops smoothly) from transitions.\n\nIn the example, the balloon goes up and down very slowly, forever. 🎈",
      ejemplo: {
        html: `<div class="balloon">🎈</div>`,
        css: `@keyframes float {
  from { transform: translateY(0); }
  to { transform: translateY(-20px); }
}
.balloon {
  font-size: 60px;
  margin-top: 30px;
  animation-name: float;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
}`
      },
      consejo: "Five lines is a lot. That's why there's the **shorthand** `animation`, which says it all at once:\n`animation: float 3s ease-in-out infinite alternate;`\nAn easy order to remember it: name, duration, curve, repetitions and direction."
    },
    {
      tipo: "ejercicio",
      enunciado: "The flying saucer 🛸 wants to float. The `@keyframes float` is already written: don't touch it.\n\nBelow it, for the `.saucer` selector, add the `animation` shorthand with the value `float 3s ease-in-out infinite alternate`.",
      pestana: "css",
      cssBase: `body { background-color: #1b1f3b; }
.saucer { font-size: 64px; text-align: center; margin-top: 40px; }`,
      inicial: {
        html: `<div class="saucer">🛸</div>
`,
        css: `@keyframes float {
  from { transform: translateY(0); }
  to { transform: translateY(-20px); }
}
`
      },
      solucion: {
        html: `<div class="saucer">🛸</div>
`,
        css: `@keyframes float {
  from { transform: translateY(0); }
  to { transform: translateY(-20px); }
}
.saucer {
  animation: float 3s ease-in-out infinite alternate;
}
`
      },
      pistas: [
        "Write a new rule for .saucer below the @keyframes, with a single property: animation. The five values go one after another, separated by spaces.",
        "Below the @keyframes add:\n.saucer {\n  animation: float 3s ease-in-out infinite alternate;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "The bee already has an animation that repeats nonstop. Change its duration, its curve and its direction. Notice what happens with `normal`: at the end of each round, it jumps straight back to the start! That's because this animation **ends in a different place** from where it starts: here `alternate` is the right one. In the next step you'll see when `normal` is correct.",
      html: `<div class="bee">🐝</div>`,
      cssBase: `@keyframes float {
  from { transform: translateY(0); }
  to { transform: translateY(-20px); }
}
body { background-color: #fff8db; }
.bee { font-size: 64px; text-align: center; margin-top: 40px; animation: float 3s ease-in-out infinite alternate; }`,
      controles: [
        { selector: ".bee", propiedad: "animation-duration", tipo: "rango", min: 2, max: 6, paso: 0.5, valor: 3, unidad: "s" },
        { selector: ".bee", propiedad: "animation-timing-function", tipo: "opciones", opciones: ["ease-in-out", "linear", "ease"], valor: "ease-in-out" },
        { selector: ".bee", propiedad: "animation-direction", tipo: "opciones", opciones: ["alternate", "normal"], valor: "alternate" }
      ]
    },
    {
      tipo: "explicacion",
      titulo: "alternate or normal? Like in real life",
      texto: "`normal` isn't a mistake: it's the default value and real websites use it a lot. The rule is simple:\n\n• If the animation **ends where it starts**, use `normal`. A “loading” spinner that turns from `0deg` to `360deg` ends the same way it started: there's no jump.\n• If it goes **from one place to another** (floating, swinging), use `alternate` so it comes back smoothly.\n\nAnother very common trick: write the way there and back inside the `@keyframes` with **percentages**: `0%` (start), `50%` (middle) and `100%` (end). If `0%` and `100%` are the same, there's no jump with `normal`. 💓",
      ejemplo: {
        html: `<div class="row">
  <div class="loader"></div>
  <div class="heart">💗</div>
</div>`,
        css: `@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes beat {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
.row {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 30px;
}
.loader {
  width: 40px;
  height: 40px;
  border: 6px solid lavender;
  border-top-color: rebeccapurple;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
}
.heart {
  font-size: 50px;
  animation: beat 2s ease-in-out infinite;
}`
      },
      consejo: "Notice: neither of them uses `alternate` and neither of them jumps. In the challenge, the castle's “loading” spinner turns exactly like this."
    },
    {
      tipo: "explicacion",
      titulo: "Less motion, please",
      texto: "Motion on screen makes some people **dizzy** or distracts them a lot. That's why systems (Windows, Mac, phones…) have an option called **reduce motion**.\n\nYour CSS can ask whether it's on with an `@media`, like in responsive design. But instead of the width, it asks about that preference: `@media (prefers-reduced-motion: reduce)`. Inside, you remove the animation with `animation: none` (or make it slower and gentler). And if your page has **transitions** (buttons that rise when you hover), remove them too with `transition: none`.\n\n👀 If your computer has “reduce motion” turned on, in this example you'll see the balloon **still**. It isn't broken! It's exactly what we want for people who ask for it.",
      ejemplo: {
        html: `<div class="balloon">🎈</div>`,
        css: `@keyframes float {
  from { transform: translateY(0); }
  to { transform: translateY(-20px); }
}
.balloon {
  font-size: 60px;
  margin-top: 30px;
  animation: float 3s ease-in-out infinite alternate;
}
@media (prefers-reduced-motion: reduce) {
  .balloon {
    animation: none;
  }
}`
      },
      consejo: "Write the `@media` **after** the normal rule: they have the same specificity, so the last one wins. And get used to adding it every time you make an animation that repeats: it's five lines that make your website kinder for everyone. 💜"
    },
    {
      tipo: "quiz",
      pregunta: "You write animation: float 3s ease-in-out infinite alternate; what does the word alternate do?",
      opciones: [
        "It makes the animation go there and back: from from to to and then from to to from",
        "It makes the animation repeat nonstop",
        "It makes the animation go faster and faster"
      ],
      correcta: 0,
      explicacion: "alternate changes the direction on each repetition, like a swing. The word that makes it never stop is infinite."
    },
    {
      tipo: "reto",
      enunciado: "👻 The haunted castle is loading! Bring it to life:\n\n1. Write a `@keyframes float` that goes `from` a `transform: translateY(0)` `to` a `transform: translateY(-20px)`, and give it to the `.ghost` with `animation: float 3s ease-in-out infinite alternate;`.\n2. Make the `.loader` spin nonstop with the `@keyframes spin`, which is already written: `animation: spin 1.2s linear infinite;` (`linear` means “always at the same speed”, perfect for spinning).\n3. Respect people who prefer less motion: at the end, inside `@media (prefers-reduced-motion: reduce)`, remove the `.ghost`'s animation with `animation: none`.\n\n⚠️ If your computer has “reduce motion” turned on, when you do step 3 you'll see the ghost **still** (and a 🐢 in the result). That's the sign it works! To see it float, delete the `@media` for a moment or, on Windows, turn on Settings → Accessibility → Visual effects → **Animation effects**.",
      cssBase: `body { font-family: sans-serif; }
.scene { background-color: #2e1f47; color: white; text-align: center; padding: 40px 16px 20px; border-radius: 16px; }
.scene p { margin: 0; }`,
      inicial: {
        html: `<div class="scene">
  <div class="ghost">👻</div>
  <div class="loader"></div>
  <p>Loading the haunted castle…</p>
</div>
`,
        css: `.ghost {
  font-size: 72px;
  /* 1. Give it the float animation here */
}

/* 1. Write the script here: the @keyframes float */


.loader {
  width: 40px;
  height: 40px;
  margin: 20px auto;
  border: 6px solid lavender;
  border-top-color: rebeccapurple;
  border-radius: 50%;
  /* 2. Give it the spin animation here */
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 3. Less motion for people who ask for it */
`
      },
      comprobaciones: [
        {
          texto: "The `@keyframes float` exists and the `.ghost` uses it as its animation",
          prueba: (doc, win) => {
            const g = doc.querySelector(".ghost");
            if (!g) return false;
            return /@keyframes\s+float\s*\{/.test(PRUEBA.textoCSS(doc))
              && win.getComputedStyle(g).animationName === "float";
          }
        },
        {
          texto: "The `float` script really moves the ghost (check that `translateY` is spelled right and that the number has `px`)",
          prueba: (doc, win) => {
            // Finds the @keyframes float. The browser drops misspelled declarations: they end up empty.
            let script = null;
            const walk = list => {
              for (const r of list) {
                if (r.name === "float" && r.cssRules && r.cssRules[0] && "keyText" in r.cssRules[0]) script = r;
                else if (r.cssRules) walk(r.cssRules);
              }
            };
            for (const sheet of doc.styleSheets) {
              try { walk(sheet.cssRules); } catch (e) { /* sheet not accessible */ }
            }
            if (!script) return false;
            // Measures each frame's offset with a test box
            const measure = t => {
              const box = doc.createElement("div");
              box.style.transform = t;
              doc.body.appendChild(box);
              const m = win.getComputedStyle(box).transform;
              box.remove();
              const n = (m.match(/\(([^)]*)\)/) || [, ""])[1].split(",").map(parseFloat);
              return n.length === 6 ? [n[4], n[5]] : n.length === 16 ? [n[12], n[13]] : [0, 0];
            };
            const points = [];
            let hasStart = false, hasEnd = false;
            for (const k of script.cssRules) {
              if (!k.style.transform) continue;
              const keys = k.keyText.split(",").map(s => s.trim());
              if (keys.includes("0%") || keys.includes("from")) hasStart = true;
              if (keys.includes("100%") || keys.includes("to")) hasEnd = true;
              points.push(measure(k.style.transform));
            }
            // If the start or the end is missing (or misspelled), the element starts from its place: (0, 0)
            if (!hasStart || !hasEnd) points.push([0, 0]);
            return points.some(a => points.some(b => Math.hypot(a[0] - b[0], a[1] - b[1]) >= 5));
          }
        },
        {
          texto: "The ghost floats nonstop and back and forth (`infinite` and `alternate`)",
          prueba: (doc, win) => {
            const g = doc.querySelector(".ghost");
            if (!g) return false;
            const cs = win.getComputedStyle(g);
            return cs.animationIterationCount === "infinite" && cs.animationDirection === "alternate";
          }
        },
        {
          texto: "The `.loader` spins nonstop with the `spin` animation",
          prueba: (doc, win) => {
            const l = doc.querySelector(".loader");
            if (!l) return false;
            const cs = win.getComputedStyle(l);
            return cs.animationName === "spin" && cs.animationIterationCount === "infinite";
          }
        },
        {
          texto: "With “reduce motion” turned on, the ghost stays still (`animation: none` inside the `@media`)",
          prueba: async (doc, win) => {
            const g = doc.querySelector(".ghost");
            if (!g || win.getComputedStyle(g).animationName !== "float") return false;
            const v = await PRUEBA.clonar(doc, { movimiento: "reducido" });
            const copy = v.doc.querySelector(".ghost");
            return !!copy && v.win.getComputedStyle(copy).animationName === "none";
          }
        }
      ],
      pistas: [
        "The script is written outside any rule: @keyframes float { from { … } to { … } }, with a transform in each block. Then copy the animation line from the instructions into .ghost and the other one into .loader. The @media goes at the very end, with the .ghost { animation: none; } rule inside.",
        "It should look like this:\n@keyframes float {\n  from { transform: translateY(0); }\n  to { transform: translateY(-20px); }\n}\nIn .ghost: animation: float 3s ease-in-out infinite alternate;\nIn .loader: animation: spin 1.2s linear infinite;\nAnd at the end:\n@media (prefers-reduced-motion: reduce) {\n  .ghost {\n    animation: none;\n  }\n}"
      ],
      solucion: {
        html: `<div class="scene">
  <div class="ghost">👻</div>
  <div class="loader"></div>
  <p>Loading the haunted castle…</p>
</div>
`,
        css: `.ghost {
  font-size: 72px;
  animation: float 3s ease-in-out infinite alternate;
}

@keyframes float {
  from { transform: translateY(0); }
  to { transform: translateY(-20px); }
}

.loader {
  width: 40px;
  height: 40px;
  margin: 20px auto;
  border: 6px solid lavender;
  border-top-color: rebeccapurple;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .ghost {
    animation: none;
  }
}
`
      }
    }
  ]
});
