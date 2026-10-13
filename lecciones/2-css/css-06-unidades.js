/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-06
   Unidades de medida — px, %, em, rem, vw/vh y cuándo usar cada una.
   Nota: width/height se presentan aquí de pasada (se ven a fondo en
   css-07). El reto se evalúa en un iframe de 800×600, así que nunca
   compara contra valores absolutos de vh/vw: compara proporciones
   (alto de la portada = win.innerHeight, ancho de la caja = 50 % del
   de la portada) y el tamaño en rem contra la letra de <html>.
   ============================================================ */
CURSO.registrar({
  id: "css-06",
  titulo: "Unidades de medida",
  xp: 35,
  objetivo: "Sabrás medir con px, %, em, rem, vw y vh, y elegir la unidad adecuada para cada cosa.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "px y %: medida fija y medida relativa",
      texto: "Una **unidad** es lo que va pegado al número y dice en qué se mide, como los metros o los kilos.\n\nPara probarlas usaremos dos propiedades nuevas: `width` (ancho) y `height` (alto). Las verás a fondo en la próxima lección.\n\n• `px` (píxeles, los puntitos de la pantalla) es una medida **fija**: 150px son 150px en cualquier sitio.\n• `%` es **relativa** a la caja que la contiene, su **padre**: `width: 50%` es la mitad del ancho del padre. Si el padre crece, la caja crece con él. 📏",
      ejemplo: {
        html: `<div class="fija">Mido 150px</div>
<div class="mitad">Mido el 50%</div>`,
        css: `.fija {
  width: 150px;
  background-color: orange;
}
.mitad {
  width: 50%;
  background-color: lightgreen;
}`
      },
      consejo: "Imagina que la ventana se estrecha: la caja de `150px` no cambia, pero la del `50%` siempre ocupa la mitad. ¡Por eso `%` es ideal para diseños que se adaptan!"
    },
    {
      tipo: "explicacion",
      titulo: "em y rem: medidas que dependen de la letra",
      texto: "Estas dos unidades se miden en **tamaños de letra**:\n\n• `rem` toma como referencia la letra de **toda la página** (la de la etiqueta `<html>`), que normalmente mide **16px**. Así, `2rem` = 32px, esté donde esté el elemento.\n• `em`, en el tamaño de letra, toma como referencia la letra de **su padre**. Si el padre tiene 20px, `1.5em` = 30px.\n\nMira el ejemplo: los dos párrafos ponen 1.5, pero el de `em` sale más grande porque su caja padre tiene letra de 20px. 🔍",
      ejemplo: {
        html: `<div class="caja">
  <p class="con-rem">1.5rem = 24px</p>
  <p class="con-em">1.5em = 30px</p>
</div>`,
        css: `.caja {
  font-size: 20px;
}
.con-rem {
  font-size: 1.5rem;
}
.con-em {
  font-size: 1.5em;
}`
      },
      consejo: "En CSS los decimales se escriben con **punto**, nunca con coma: `1.5rem`, no `1,5rem`. Y si dudas entre las dos, usa `rem`: no depende de dónde esté el elemento, así que no da sorpresas."
    },
    {
      tipo: "explicacion",
      titulo: "vw y vh: medidas de la pantalla",
      texto: "La **ventana** (en inglés, *viewport*) es el trozo del navegador donde se ve la página.\n\n• `1vw` es el 1 % del **ancho** de la ventana.\n• `1vh` es el 1 % del **alto** de la ventana.\n\nAsí, `height: 100vh` hace que algo ocupe **toda la altura de la pantalla**: perfecto para portadas.\n\nChuleta rápida:\n• Letras → `rem`.\n• Anchos que se adaptan → `%`.\n• Portadas a pantalla completa → `vh` y `vw`.\n• Detalles finos (bordes, sombras) → `px`.",
      ejemplo: {
        html: `<div class="franja">50vw de ancho y 30vh de alto</div>`,
        css: `.franja {
  width: 50vw;
  height: 30vh;
  background-color: hotpink;
}`
      },
      consejo: "Aquí, la «ventana» es el propio recuadro de resultado. Si cambias el tamaño del navegador, verás cómo la franja rosa se adapta. 📐"
    },
    {
      tipo: "ejercicio",
      enunciado: "Este es el cartel de una pizzería 🍕. El HTML ya está hecho; tú escribe el CSS:\n\n• A los `h1`, un `font-size` de `3rem`.\n• A la clase `.aviso`, un `width` de `50%` y un `background-color` de `gold`.",
      inicial: {
        html: `<h1>Pizzería Mamma Mía</h1>
<p class="aviso">¡Hoy, la segunda pizza es gratis!</p>
`,
        css: ""
      },
      solucion: {
        html: `<h1>Pizzería Mamma Mía</h1>
<p class="aviso">¡Hoy, la segunda pizza es gratis!</p>
`,
        css: `h1 {
  font-size: 3rem;
}
.aviso {
  width: 50%;
  background-color: gold;
}
`
      },
      pistas: [
        "Son dos reglas: una con el selector h1 y otra con .aviso (con punto, porque es una clase). El número va pegado a la unidad, sin espacio: 3rem, 50%.",
        "Debe quedarte así:\nh1 {\n  font-size: 3rem;\n}\n.aviso {\n  width: 50%;\n  background-color: gold;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "Mueve los deslizadores: el ancho va en `%` del recuadro, el alto en `vh` (porcentaje del alto de la ventana) y la letra en `rem`. ¡Mira el CSS que se va escribiendo!",
      html: `<div class="caja">¡Hola! Mido en unidades 📏</div>`,
      cssBase: "body { font-family: sans-serif; margin: 0; }\n.caja { background-color: #8ecae6; color: #023047; }",
      controles: [
        { selector: ".caja", propiedad: "width", tipo: "rango", min: 10, max: 100, valor: 50, unidad: "%" },
        { selector: ".caja", propiedad: "height", tipo: "rango", min: 10, max: 100, valor: 30, unidad: "vh" },
        { selector: ".caja", propiedad: "font-size", tipo: "rango", min: 0.5, max: 3, paso: 0.25, valor: 1, unidad: "rem" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Si la letra de la página mide 16px (lo normal), ¿cuánto mide 2rem?",
      opciones: ["2px", "18px", "32px"],
      correcta: 2,
      explicacion: "1rem es el tamaño de letra de la página (16px), así que 2rem es el doble: 16 × 2 = 32px."
    },
    {
      tipo: "reto",
      enunciado: "Monta la portada del videojuego **Galaxia Gatuna** 🐱🚀:\n\n1. Haz que `.portada` ocupe **toda la altura de la pantalla** con `height: 100vh`.\n2. Pon al `.titulo` un `font-size` de `3rem`.\n3. Haz que `.caja` mida la **mitad** del ancho de la portada con `width: 50%`.",
      pestana: "css",
      inicial: {
        html: `<section class="portada">
  <h1 class="titulo">Galaxia Gatuna</h1>
  <div class="caja">¡Pulsa para empezar la aventura!</div>
</section>
`,
        css: `.portada {
  background-color: midnightblue;
  color: white;
  /* 1. Que ocupe toda la altura de la pantalla (vh) */
}

.titulo {
  /* 2. Tamaño de letra de 3rem */
}

.caja {
  background-color: hotpink;
  /* 3. La mitad del ancho de la portada (%) */
}
`
      },
      comprobaciones: [
        {
          texto: "La portada es tan alta como la pantalla (100vh)",
          prueba: (doc, win) => {
            const alto = doc.querySelector(".portada")?.getBoundingClientRect().height || 0;
            return win.innerHeight > 0 && Math.abs(alto - win.innerHeight) <= 2;
          }
        },
        {
          texto: "El título mide 3rem (el triple de la letra normal de la página)",
          prueba: (doc, win) => {
            const t = doc.querySelector(".titulo");
            if (!t) return false;
            const base = parseFloat(win.getComputedStyle(doc.documentElement).fontSize) || 16;
            const tam = parseFloat(win.getComputedStyle(t).fontSize) || 0;
            return Math.abs(tam - 3 * base) <= 0.5;
          }
        },
        {
          texto: "La caja rosa mide la mitad de ancho que la portada",
          prueba: (doc) => {
            const portada = doc.querySelector(".portada")?.getBoundingClientRect().width || 0;
            const caja = doc.querySelector(".caja")?.getBoundingClientRect().width || 0;
            return portada > 0 && Math.abs(caja / portada - 0.5) <= 0.02;
          }
        }
      ],
      pistas: [
        "Cada cosa va en su regla: el alto (height) en .portada, el tamaño de letra (font-size) en .titulo y el ancho (width) en .caja. Recuerda: vh para la pantalla, rem para letras y % para «parte del padre».",
        "Añade estas líneas, cada una en su regla:\n.portada → height: 100vh;\n.titulo → font-size: 3rem;\n.caja → width: 50%;"
      ],
      solucion: {
        html: `<section class="portada">
  <h1 class="titulo">Galaxia Gatuna</h1>
  <div class="caja">¡Pulsa para empezar la aventura!</div>
</section>
`,
        css: `.portada {
  background-color: midnightblue;
  color: white;
  height: 100vh;
}

.titulo {
  font-size: 3rem;
}

.caja {
  background-color: hotpink;
  width: 50%;
}
`
      }
    }
  ]
});
