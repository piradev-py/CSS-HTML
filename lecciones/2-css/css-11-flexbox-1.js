/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-11
   Flexbox (I): en fila y alineados — contenedor y elementos flex,
   display: flex, flex-direction, justify-content, align-items, gap
   y centrar algo en los dos ejes.
   Nota: el ejercicio no da estilos de colores (el CSS empieza vacío),
   así que usa emojis para que el efecto se vea sin decorar nada.
   ============================================================ */
CURSO.registrar({
  id: "css-11",
  titulo: "Flexbox (I): en fila y alineados",
  xp: 45,
  objetivo: "Sabrás poner elementos en fila o en columna con Flexbox y alinearlos donde quieras, incluso en el centro exacto.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "El contenedor manda: display: flex",
      texto: "Hasta ahora, los `<div>` se apilaban uno debajo de otro. **Flexbox** es una forma de colocar cajas que lo cambia todo.\n\nFunciona así: eliges una caja **padre** (el **contenedor**) y le pones `display: flex`. Al instante, sus **hijos directos** (los **elementos flex**) se ponen en **fila**, uno al lado del otro.\n\nPiensa en un sargento 🪖 y sus soldados: el sargento grita «¡en fila!» y los soldados obedecen. Tú solo hablas con el sargento.",
      ejemplo: {
        html: `<div class="fila">
  <div class="caja">1</div>
  <div class="caja">2</div>
  <div class="caja">3</div>
</div>`,
        css: `.fila {
  display: flex;
  background-color: lavender;
}
.caja {
  background-color: tomato;
  color: white;
  padding: 10px 20px;
}`
      },
      consejo: "El error número uno: poner `display: flex` a las cajas hijas. ¡No! Va en el **padre**, el que las contiene a todas."
    },
    {
      tipo: "explicacion",
      titulo: "¿Fila o columna? flex-direction y gap",
      texto: "Un contenedor flex tiene una **dirección principal**, que eliges con `flex-direction`:\n\n• `row` (fila): de izquierda a derecha. Es la que viene **por defecto**.\n• `column` (columna): de arriba abajo.\n\nY para separar los elementos sin pelearte con márgenes existe `gap` (hueco): `gap: 20px` deja **20 px entre cada elemento**, pero no en los bordes de fuera.\n\nEn el ejemplo, las cajas ya no se tocan. Lo de la columna lo probarás enseguida con los controles. 🎛️",
      ejemplo: {
        html: `<div class="fila">
  <div class="caja">1</div>
  <div class="caja">2</div>
  <div class="caja">3</div>
</div>`,
        css: `.fila {
  display: flex;
  flex-direction: row;
  gap: 20px;
  background-color: lavender;
}
.caja {
  background-color: tomato;
  color: white;
  padding: 10px 20px;
}`
      },
      consejo: "`gap` es mucho más cómodo que poner márgenes a cada caja: un solo valor en el padre y todas quedan separadas por igual."
    },
    {
      tipo: "explicacion",
      titulo: "Alinear: justify-content y align-items",
      texto: "Flexbox piensa en **dos ejes**, como dos flechas:\n\n• `justify-content` coloca los elementos a lo largo de la **dirección principal** (en una fila, en horizontal): `flex-start` (al principio), `center`, `flex-end` (al final), `space-between` (repartidos, pegados a los bordes) y `space-around` (repartidos, con aire en los bordes).\n• `align-items` los coloca en el **otro eje** (en una fila, en vertical): `flex-start`, `center`, `flex-end` o `stretch` (estirados, el valor por defecto).\n\nCon los dos en `center`, algo queda **centrado en el medio exacto** 🎯. ¡Antes de Flexbox esto era una pesadilla!",
      ejemplo: {
        html: `<div class="escenario">
  <div class="caja">🎯</div>
</div>`,
        css: `.escenario {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;
  background-color: lavender;
}
.caja {
  background-color: tomato;
  padding: 10px 20px;
}`
      },
      consejo: "Truco para no liarte: **justify** sigue la dirección principal y **align** va cruzado. Si cambias a `column`, ¡los papeles se intercambian!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Estas tres mascotas salen una debajo de otra. ¡Ponlas en fila y centradas! 🐾\n\nAl selector `.mascotas` ponle:\n\n• `display` con el valor `flex`\n• `justify-content` con el valor `center`\n• `gap` con el valor `20px`\n\nEl HTML ya está escrito: tú solo escribes el CSS.",
      cssBase: `body { font-family: sans-serif; }
.mascotas { background-color: lavender; padding: 10px; border-radius: 10px; }
.mascotas div { background-color: tomato; color: white; padding: 8px 14px; border-radius: 8px; font-weight: bold; }`,
      inicial: {
        html: `<div class="mascotas">
  <div>🐶 Toby</div>
  <div>🐱 Misi</div>
  <div>🐹 Bolita</div>
</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="mascotas">
  <div>🐶 Toby</div>
  <div>🐱 Misi</div>
  <div>🐹 Bolita</div>
</div>
`,
        css: `.mascotas {
  display: flex;
  justify-content: center;
  gap: 20px;
}
`
      },
      pistas: [
        "Escribe una sola regla para el contenedor: el selector .mascotas, unas llaves { } y dentro las tres propiedades, cada una con su : y su ;",
        "Debe quedarte así:\n.mascotas {\n  display: flex;\n  justify-content: center;\n  gap: 20px;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "La caja lavanda ya tiene `display: flex`. Pulsa los botones y mueve el deslizador para ver cómo se colocan las cajas. Prueba `column` y fíjate en que `justify-content` pasa a mandar en vertical.",
      html: `<div class="fila">
  <div class="caja">1</div>
  <div class="caja">2</div>
  <div class="caja">3</div>
</div>`,
      cssBase: `body { font-family: sans-serif; }
.fila { display: flex; height: 180px; background-color: lavender; }
.caja { background-color: tomato; color: white; padding: 8px 16px; font-weight: bold; }`,
      controles: [
        { selector: ".fila", propiedad: "flex-direction", tipo: "opciones", opciones: ["row", "column"], valor: "row" },
        { selector: ".fila", propiedad: "justify-content", tipo: "opciones", opciones: ["flex-start", "center", "flex-end", "space-between", "space-around"], valor: "flex-start" },
        { selector: ".fila", propiedad: "align-items", tipo: "opciones", opciones: ["stretch", "flex-start", "center", "flex-end"], valor: "stretch" },
        { selector: ".fila", propiedad: "gap", tipo: "rango", min: 0, max: 40, valor: 0, unidad: "px" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Quieres centrar un botón justo en el medio (en horizontal y en vertical) de una caja con display: flex en fila. ¿Qué le escribes a la caja?",
      opciones: [
        "justify-content: center; y align-items: center;",
        "Solo align-items: center;",
        "display: center;"
      ],
      correcta: 0,
      explicacion: "justify-content centra en la dirección principal (horizontal en una fila) y align-items en el otro eje (vertical). Hacen falta los dos. Y display: center no existe."
    },
    {
      tipo: "reto",
      enunciado: "Diseña la barra de botones de tu reproductor de música 🎵:\n\n1. Convierte `.reproductor` en un contenedor flex.\n2. Reparte los botones **a lo ancho** de la barra con `justify-content` (`space-between` o `space-around`).\n3. Céntralos **en vertical** con `align-items`.",
      inicial: {
        html: `<div class="reproductor">
  <button>🔀</button>
  <button>⏮️</button>
  <button>▶️</button>
  <button>⏭️</button>
  <button>🔁</button>
</div>
`,
        css: `.reproductor {
  height: 80px;
  padding: 0 16px;
  background-color: #222;
  border-radius: 12px;
  /* 1. Conviértelo en un contenedor flex */
  /* 2. Reparte los botones a lo ancho */
  /* 3. Céntralos en vertical */
}

button {
  font-size: 22px;
}
`
      },
      comprobaciones: [
        {
          texto: "La barra `.reproductor` tiene display: flex",
          prueba: (doc, win) => {
            const r = doc.querySelector(".reproductor");
            return !!r && win.getComputedStyle(r).display === "flex";
          }
        },
        {
          texto: "Los botones están repartidos a lo ancho (space-between o space-around)",
          prueba: (doc, win) => {
            const r = doc.querySelector(".reproductor");
            return !!r && ["space-between", "space-around", "space-evenly"].includes(win.getComputedStyle(r).justifyContent);
          }
        },
        {
          texto: "Los botones están centrados en vertical (align-items: center)",
          prueba: (doc, win) => {
            const r = doc.querySelector(".reproductor");
            return !!r && win.getComputedStyle(r).alignItems === "center";
          }
        }
      ],
      pistas: [
        "Las tres propiedades van dentro de la regla .reproductor, en el sitio de los comentarios: primero display, luego justify-content y luego align-items.",
        "Añade estas tres líneas dentro de .reproductor { … }:\n  display: flex;\n  justify-content: space-between;\n  align-items: center;"
      ],
      solucion: {
        html: `<div class="reproductor">
  <button>🔀</button>
  <button>⏮️</button>
  <button>▶️</button>
  <button>⏭️</button>
  <button>🔁</button>
</div>
`,
        css: `.reproductor {
  height: 80px;
  padding: 0 16px;
  background-color: #222;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  font-size: 22px;
}
`
      }
    }
  ]
});
