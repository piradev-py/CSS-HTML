/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-08
   Transiciones — transition (propiedad, duración, curva y retardo),
   ease, linear, ease-in, ease-out, ease-in-out, varias propiedades
   separadas por comas y qué propiedades conviene animar
   (transform y opacity).
   ============================================================ */
CURSO.registrar({
  id: "hc-08",
  titulo: "Transitions",
  xp: 40,
  objetivo: "You'll learn to smooth out style changes with transition so your buttons and cards move with elegance.",
  glosario: [
    { termino: "transition", tema: "Transitions", para: "Making a style change (on hover…) smooth: property and duration.", ejemplo: ".button {\n  transition: background-color 0.2s, transform 0.2s;\n}", buscar: "smooth transition animate change duration" },
    { termino: "ease, ease-in-out and delay", tema: "Transitions", para: "The curve of the change and how long it waits before starting.", ejemplo: ".box {\n  transition: transform 0.3s ease-in-out 0.1s;\n}", buscar: "curve speed delay" },
    { termino: "what to animate", tema: "Transitions", para: "Prefer `transform` and `opacity`: they're smooth and don't reflow the page.", ejemplo: ".card {\n  transition: transform 0.2s, opacity 0.2s;\n}", buscar: "performance smooth which properties" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "From the jump to the glide",
      texto: "Until now, when you hover over a button with `:hover`, the change is **instant**, like a light switch 💡. With `transition` the change happens little by little, like a light that turns on slowly.\n\nYou tell it **which property** to smooth and **how long** it takes: `transition: background-color 0.4s;` (the `s` stands for seconds).\n\nImportant: the `transition` goes in the element's **normal** rule, not in the `:hover` one. That way the change is smooth going in **and** coming out. Hover over the two buttons and compare.",
      ejemplo: {
        html: `<button class="abrupt">Instant</button>
<button class="smooth">Smooth</button>`,
        css: `button {
  padding: 12px 20px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: slateblue;
}
button:hover {
  background-color: hotpink;
}
.smooth {
  transition: background-color 0.4s;
}`
      },
      consejo: "If the transition only works going in and coming out is instant, you probably wrote it inside the `:hover`. Move it to the normal rule!"
    },
    {
      tipo: "explicacion",
      titulo: "Curves, delay and several properties",
      texto: "`transition` accepts more values, in this order: **property, duration, curve and delay**: `transition: transform 0.5s ease-in-out 0.1s;`\n\nThe **curve** is how the speed changes:\n• `ease`: the default one; it starts with energy and slows down gently.\n• `linear`: always the same, like a robot 🤖.\n• `ease-in`: starts slowly. `ease-out`: slows down gently.\n• `ease-in-out`: starts and slows down gently, very natural.\n\nThe **delay** is the wait before starting. And to smooth several properties, separate them with **commas**: `transition: background-color 0.4s, transform 0.4s;`",
      ejemplo: {
        html: `<div class="card">🚀 Hover over me</div>`,
        css: `.card {
  display: inline-block;
  margin-top: 20px;
  padding: 20px;
  font-size: 20px;
  border-radius: 12px;
  background-color: lightblue;
  transition: background-color 0.5s ease-in-out, transform 0.5s ease-in-out;
}
.card:hover {
  background-color: gold;
  transform: translateY(-10px);
}`
      },
      consejo: "There's also `transition: all 0.4s;`, which smooths **everything** that changes. It's convenient, but it can animate things you didn't want: better to name the properties."
    },
    {
      tipo: "ejercicio",
      enunciado: "Make the ice cream shop's button 🍦 change color smoothly:\n\n• On the `.button` selector, add `transition` with the value `background-color 0.4s`.\n• On the `.button:hover` selector, add `background-color` with the value `seagreen`.\n\nThe button already has its normal color. Hover over it to try it out.",
      cssBase: `body { font-family: sans-serif; }
.button { padding: 12px 24px; font-size: 18px; color: white; background-color: mediumpurple; border: none; border-radius: 10px; }`,
      inicial: {
        html: `<h2>North Pole Ice Cream Shop</h2>
<button class="button">I want an ice cream!</button>
`,
        css: ""
      },
      solucion: {
        html: `<h2>North Pole Ice Cream Shop</h2>
<button class="button">I want an ice cream!</button>
`,
        css: `.button {
  transition: background-color 0.4s;
}
.button:hover {
  background-color: seagreen;
}
`
      },
      pistas: [
        "You need two rules: the normal one (.button) carries the transition with the property and the seconds; the .button:hover one carries the new color.",
        "It should end up like this:\n.button {\n  transition: background-color 0.4s;\n}\n.button:hover {\n  background-color: seagreen;\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "What's worth animating?",
      texto: "Not all properties animate equally well:\n\n• `transform` and `opacity` are the **champions** 🏆: the browser moves them like a sticker on top of the page, without reflowing anything. They run smoothly even on simple phones.\n• `width`, `height`, `margin` or `top` force the browser to **reflow the whole page** on every frame, and they can be jumpy.\n\nWant something to grow or rise? Use `transform: scale()` or `translateY()` instead of changing its size or margin.\n\nAnd the duration: between **0.2 s and 0.6 s** feels smooth without making people wait.",
      ejemplo: {
        html: `<div class="photo">🐱 Meow!</div>`,
        css: `.photo {
  display: inline-block;
  margin: 20px;
  padding: 30px;
  font-size: 24px;
  border-radius: 12px;
  background-color: peachpuff;
  opacity: 0.6;
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.photo:hover {
  opacity: 1;
  transform: scale(1.1);
}`
      },
      consejo: "Less is more: a calm, short transition looks elegant. If everything dances and bounces, the website is tiring (and it even makes some people dizzy)."
    },
    {
      tipo: "controles",
      instruccion: "Hover over the box and watch it glide. Then change the duration, the curve and the delay, and hover again to notice the difference.",
      html: `<div class="track">
  <div class="car">🚗</div>
</div>`,
      cssBase: `body { font-family: sans-serif; }
.track { padding: 20px 10px; background-color: #eee; border-radius: 12px; }
.car { display: inline-block; font-size: 40px; padding: 10px; background-color: white; border-radius: 10px; transition-property: transform; }
.track:hover .car { transform: translateX(150px); }`,
      controles: [
        { selector: ".car", propiedad: "transition-duration", tipo: "rango", min: 0.1, max: 2, paso: 0.1, valor: 0.5, unidad: "s" },
        { selector: ".car", propiedad: "transition-timing-function", tipo: "opciones", opciones: ["ease", "linear", "ease-in", "ease-out", "ease-in-out"], valor: "ease" },
        { selector: ".car", propiedad: "transition-delay", tipo: "rango", min: 0, max: 1, paso: 0.1, valor: 0, unidad: "s" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Where do you write the transition so the change is smooth on hover and also when you stop hovering?",
      opciones: [
        "In the element's normal rule (for example, .button)",
        "Only inside the :hover rule",
        "In the HTML, as an attribute"
      ],
      correcta: 0,
      explicacion: "In the normal rule, the transition applies always: when entering :hover and when leaving. If it's only in :hover, when you stop hovering the rule disappears and the change snaps back."
    },
    {
      tipo: "reto",
      enunciado: "Create the **“Play!”** button of your video game 🎮, lighting up and rising smoothly on hover:\n\n1. In `.button:hover`, change the `background-color` to another color.\n2. In `.button:hover`, make the button **rise 4 px** with `transform: translateY(-4px)`.\n3. In `.button`, add a `transition` for `background-color` **and** for `transform`, between **0.2 s and 0.6 s**.",
      cssBase: `body { font-family: sans-serif; text-align: center; padding-top: 30px; }`,
      inicial: {
        html: `<h2>Adventure in the Castle 🏰</h2>
<button class="button">Play!</button>
`,
        css: `.button {
  padding: 14px 32px;
  font-size: 22px;
  font-weight: bold;
  color: white;
  background-color: crimson;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 0 darkred;
  /* 3. Transition for background-color and transform */
}

.button:hover {
  /* 1. A new background color */
  /* 2. Make it rise 4px */
}
`
      },
      comprobaciones: [
        {
          texto: "On hover, the button changes its background color",
          prueba: async (doc, win) => {
            const b = doc.querySelector(".button");
            if (!b) return false;
            const v = await PRUEBA.clonar(doc, { estado: "hover" });
            const bh = v.doc.querySelector(".button");
            if (!bh) return false;
            return v.win.getComputedStyle(bh).backgroundColor !== win.getComputedStyle(b).backgroundColor;
          }
        },
        {
          texto: "On hover, the button rises (moves up with transform)",
          prueba: async (doc) => {
            const v = await PRUEBA.clonar(doc, { estado: "hover" });
            const bh = v.doc.querySelector(".button");
            if (!bh) return false;
            const cs = v.win.getComputedStyle(bh);
            let y = 0;
            const m = (cs.transform || "none").match(/\(([^)]*)\)/);
            if (m) {
              const n = m[1].split(",").map(parseFloat);
              y += (n.length === 16 ? n[13] : n[5]) || 0;
            }
            const t = (cs.translate || "none").trim().split(/\s+/);
            if (t.length > 1) y += parseFloat(t[1]) || 0;
            return y < -1;
          }
        },
        {
          texto: "The `.button` has a transition for `background-color` and another for `transform`",
          prueba: (doc, win) => {
            const b = doc.querySelector(".button");
            if (!b) return false;
            const cs = win.getComputedStyle(b);
            const props = (cs.transitionProperty || "").split(",").map(s => s.trim());
            const durs = (cs.transitionDuration || "0s").split(",").map(s => parseFloat(s) || 0);
            const has = names => props.some((p, i) => names.includes(p) && durs[i % durs.length] > 0);
            return has(["background-color", "background", "all"]) && has(["transform", "translate", "all"]);
          }
        },
        {
          texto: "The transition lasts between 0.2 s and 0.6 s: neither abrupt nor slow",
          prueba: (doc, win) => {
            const b = doc.querySelector(".button");
            if (!b) return false;
            const durs = (win.getComputedStyle(b).transitionDuration || "0s").split(",").map(s => parseFloat(s) || 0);
            return durs.every(d => d >= 0.2 && d <= 0.6);
          }
        }
      ],
      pistas: [
        "In .button:hover go two properties: background-color with a new color and transform with translateY and a negative number. In .button, a single transition with both properties separated by a comma.",
        "In .button add:\n  transition: background-color 0.3s, transform 0.3s;\nAnd in .button:hover write:\n  background-color: darkorange;\n  transform: translateY(-4px);"
      ],
      solucion: {
        html: `<h2>Adventure in the Castle 🏰</h2>
<button class="button">Play!</button>
`,
        css: `.button {
  padding: 14px 32px;
  font-size: 22px;
  font-weight: bold;
  color: white;
  background-color: crimson;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 0 darkred;
  transition: background-color 0.3s, transform 0.3s;
}

.button:hover {
  background-color: darkorange;
  transform: translateY(-4px);
}
`
      }
    }
  ]
});
