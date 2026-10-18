/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-08
   Transiciones — transition (propiedad, duración, curva y retardo),
   ease, linear, ease-in, ease-out, ease-in-out, varias propiedades
   separadas por comas y qué propiedades conviene animar
   (transform y opacity).
   Notas:
   - Duraciones tranquilas (0.3–0.6 s) en todos los ejemplos.
   - El ejercicio usa :hover: el revisor compara la propiedad
     transition y el valor final con el ratón encima.
   - El reto lee transitionProperty / transitionDuration (valores
     calculados, en segundos: "0.4s") y mira el :hover en una copia
     con PRUEBA.clonar (las transiciones salen ya terminadas).
     transition-property por defecto es "all" con 0s, por eso se
     exige además una duración mayor que 0.
   ============================================================ */
CURSO.registrar({
  id: "hc-08",
  titulo: "Transiciones",
  xp: 40,
  objetivo: "Sabrás suavizar los cambios de estilo con transition para que tus botones y tarjetas se muevan con elegancia.",
  glosario: [
    { termino: "transition", tema: "Transiciones", para: "Que un cambio de estilo (al pasar el ratón…) sea suave: propiedad y duración.", ejemplo: ".boton {\n  transition: background-color 0.2s, transform 0.2s;\n}", buscar: "suave transicion animar cambio duracion" },
    { termino: "ease, ease-in-out y retardo", tema: "Transiciones", para: "La curva del cambio y cuánto espera antes de empezar.", ejemplo: ".caja {\n  transition: transform 0.3s ease-in-out 0.1s;\n}", buscar: "curva velocidad retardo delay" },
    { termino: "qué animar", tema: "Transiciones", para: "Mejor `transform` y `opacity`: son suaves y no recolocan la página.", ejemplo: ".tarjeta {\n  transition: transform 0.2s, opacity 0.2s;\n}", buscar: "rendimiento suave que propiedades" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Del salto al deslizamiento",
      texto: "Hasta ahora, cuando pasas el ratón por un botón con `:hover`, el cambio es **de golpe**, como un interruptor de la luz 💡. Con `transition` (transición) el cambio se hace poco a poco, como una luz que se enciende despacio.\n\nLe dices **qué propiedad** suavizar y **cuánto tiempo** tarda: `transition: background-color 0.4s;` (la `s` son segundos).\n\nImportante: la `transition` va en la regla **normal** del elemento, no en la del `:hover`. Así el cambio es suave al entrar **y** al salir. Pasa el ratón por los dos botones y compara.",
      ejemplo: {
        html: `<button class="brusco">De golpe</button>
<button class="suave">Suavecito</button>`,
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
.suave {
  transition: background-color 0.4s;
}`
      },
      consejo: "Si la transición solo funciona al entrar y al salir va de golpe, seguramente la escribiste dentro del `:hover`. ¡Muévela a la regla normal!"
    },
    {
      tipo: "explicacion",
      titulo: "Curvas, retardo y varias propiedades",
      texto: "`transition` admite más datos, en este orden: **propiedad, duración, curva y retardo**: `transition: transform 0.5s ease-in-out 0.1s;`\n\nLa **curva** es cómo cambia la velocidad:\n• `ease`: la de serie; arranca con brío y frena suave.\n• `linear`: siempre igual, como un robot 🤖.\n• `ease-in`: arranca despacio. `ease-out`: frena despacio.\n• `ease-in-out`: arranca y frena despacio, muy natural.\n\nEl **retardo** es la espera antes de empezar. Y para suavizar varias propiedades, sepáralas con **comas**: `transition: background-color 0.4s, transform 0.4s;`",
      ejemplo: {
        html: `<div class="tarjeta">🚀 Pasa el ratón</div>`,
        css: `.tarjeta {
  display: inline-block;
  margin-top: 20px;
  padding: 20px;
  font-size: 20px;
  border-radius: 12px;
  background-color: lightblue;
  transition: background-color 0.5s ease-in-out, transform 0.5s ease-in-out;
}
.tarjeta:hover {
  background-color: gold;
  transform: translateY(-10px);
}`
      },
      consejo: "Existe `transition: all 0.4s;`, que suaviza **todo** lo que cambie. Es cómodo, pero puede animar cosas que no querías: mejor nombra las propiedades."
    },
    {
      tipo: "ejercicio",
      enunciado: "Haz que el botón de la tienda de helados 🍦 cambie de color con suavidad:\n\n• Al selector `.boton` ponle `transition` con el valor `background-color 0.4s`.\n• Al selector `.boton:hover` ponle `background-color` con el valor `seagreen`.\n\nEl botón ya tiene su color normal. Pasa el ratón por encima para probarlo.",
      cssBase: `body { font-family: sans-serif; }
.boton { padding: 12px 24px; font-size: 18px; color: white; background-color: mediumpurple; border: none; border-radius: 10px; }`,
      inicial: {
        html: `<h2>Heladería Polo Norte</h2>
<button class="boton">¡Quiero un helado!</button>
`,
        css: ""
      },
      solucion: {
        html: `<h2>Heladería Polo Norte</h2>
<button class="boton">¡Quiero un helado!</button>
`,
        css: `.boton {
  transition: background-color 0.4s;
}
.boton:hover {
  background-color: seagreen;
}
`
      },
      pistas: [
        "Necesitas dos reglas: la normal (.boton) lleva la transition con la propiedad y los segundos; la de .boton:hover lleva el color nuevo.",
        "Debe quedarte así:\n.boton {\n  transition: background-color 0.4s;\n}\n.boton:hover {\n  background-color: seagreen;\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "¿Qué conviene animar?",
      texto: "No todas las propiedades se animan igual de bien:\n\n• `transform` y `opacity` son las **campeonas** 🏆: el navegador las mueve como una pegatina sobre la página, sin recolocar nada. Van finas incluso en móviles sencillos.\n• `width`, `height`, `margin` o `top` obligan a **recolocar toda la página** en cada fotograma, y pueden ir a trompicones.\n\n¿Quieres que algo crezca o suba? Usa `transform: scale()` o `translateY()` en vez de cambiar su tamaño o su margen.\n\nY la duración: entre **0.2 s y 0.6 s** se nota suave sin hacer esperar.",
      ejemplo: {
        html: `<div class="foto">🐱 ¡Miau!</div>`,
        css: `.foto {
  display: inline-block;
  margin: 20px;
  padding: 30px;
  font-size: 24px;
  border-radius: 12px;
  background-color: peachpuff;
  opacity: 0.6;
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.foto:hover {
  opacity: 1;
  transform: scale(1.1);
}`
      },
      consejo: "Menos es más: una transición tranquila y corta queda elegante. Si todo baila y salta, la web cansa (y a algunas personas hasta las marea)."
    },
    {
      tipo: "controles",
      instruccion: "Pasa el ratón por la caja y mira cómo se desliza. Luego cambia la duración, la curva y el retardo, y vuelve a pasar el ratón para notar la diferencia.",
      html: `<div class="pista">
  <div class="coche">🚗</div>
</div>`,
      cssBase: `body { font-family: sans-serif; }
.pista { padding: 20px 10px; background-color: #eee; border-radius: 12px; }
.coche { display: inline-block; font-size: 40px; padding: 10px; background-color: white; border-radius: 10px; transition-property: transform; }
.pista:hover .coche { transform: translateX(150px); }`,
      controles: [
        { selector: ".coche", propiedad: "transition-duration", tipo: "rango", min: 0.1, max: 2, paso: 0.1, valor: 0.5, unidad: "s" },
        { selector: ".coche", propiedad: "transition-timing-function", tipo: "opciones", opciones: ["ease", "linear", "ease-in", "ease-out", "ease-in-out"], valor: "ease" },
        { selector: ".coche", propiedad: "transition-delay", tipo: "rango", min: 0, max: 1, paso: 0.1, valor: 0, unidad: "s" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "¿Dónde se escribe la transition para que el cambio sea suave al pasar el ratón y también al quitarlo?",
      opciones: [
        "En la regla normal del elemento (por ejemplo, .boton)",
        "Solo dentro de la regla :hover",
        "En el HTML, como un atributo"
      ],
      correcta: 0,
      explicacion: "En la regla normal, la transición vale siempre: al entrar en :hover y al salir. Si solo está en :hover, al quitar el ratón la regla desaparece y el cambio vuelve de golpe."
    },
    {
      tipo: "reto",
      enunciado: "Crea el botón de **«¡Jugar!»** de tu videojuego 🎮, que se ilumine y se eleve con suavidad al pasar el ratón:\n\n1. En `.boton:hover`, cambia el `background-color` a otro color.\n2. En `.boton:hover`, haz que el botón **suba 4 px** con `transform: translateY(-4px)`.\n3. En `.boton`, añade una `transition` para `background-color` **y** para `transform`, de entre **0.2 s y 0.6 s**.",
      cssBase: `body { font-family: sans-serif; text-align: center; padding-top: 30px; }`,
      inicial: {
        html: `<h2>Aventura en el castillo 🏰</h2>
<button class="boton">¡Jugar!</button>
`,
        css: `.boton {
  padding: 14px 32px;
  font-size: 22px;
  font-weight: bold;
  color: white;
  background-color: crimson;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 0 darkred;
  /* 3. Transición para background-color y transform */
}

.boton:hover {
  /* 1. Otro color de fondo */
  /* 2. Que suba 4px */
}
`
      },
      comprobaciones: [
        {
          texto: "Al pasar el ratón, el botón cambia de color de fondo",
          prueba: async (doc, win) => {
            const b = doc.querySelector(".boton");
            if (!b) return false;
            const v = await PRUEBA.clonar(doc, { estado: "hover" });
            const bh = v.doc.querySelector(".boton");
            if (!bh) return false;
            return v.win.getComputedStyle(bh).backgroundColor !== win.getComputedStyle(b).backgroundColor;
          }
        },
        {
          texto: "Al pasar el ratón, el botón sube (se mueve hacia arriba con transform)",
          prueba: async (doc) => {
            const v = await PRUEBA.clonar(doc, { estado: "hover" });
            const bh = v.doc.querySelector(".boton");
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
          texto: "El `.boton` tiene una transición para `background-color` y otra para `transform`",
          prueba: (doc, win) => {
            const b = doc.querySelector(".boton");
            if (!b) return false;
            const cs = win.getComputedStyle(b);
            const props = (cs.transitionProperty || "").split(",").map(s => s.trim());
            const durs = (cs.transitionDuration || "0s").split(",").map(s => parseFloat(s) || 0);
            const tiene = nombres => props.some((p, i) => nombres.includes(p) && durs[i % durs.length] > 0);
            return tiene(["background-color", "background", "all"]) && tiene(["transform", "translate", "all"]);
          }
        },
        {
          texto: "La transición dura entre 0.2 s y 0.6 s: ni brusca ni lenta",
          prueba: (doc, win) => {
            const b = doc.querySelector(".boton");
            if (!b) return false;
            const durs = (win.getComputedStyle(b).transitionDuration || "0s").split(",").map(s => parseFloat(s) || 0);
            return durs.every(d => d >= 0.2 && d <= 0.6);
          }
        }
      ],
      pistas: [
        "En .boton:hover van dos propiedades: background-color con un color nuevo y transform con translateY y un número negativo. En .boton, una sola transition con las dos propiedades separadas por una coma.",
        "En .boton añade:\n  transition: background-color 0.3s, transform 0.3s;\nY en .boton:hover escribe:\n  background-color: darkorange;\n  transform: translateY(-4px);"
      ],
      solucion: {
        html: `<h2>Aventura en el castillo 🏰</h2>
<button class="boton">¡Jugar!</button>
`,
        css: `.boton {
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

.boton:hover {
  background-color: darkorange;
  transform: translateY(-4px);
}
`
      }
    }
  ]
});
