/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-13
   Grid — display: grid, grid-template-columns, la unidad fr,
   repeat(), gap y grid-column: span 2.
   Nota: el valor calculado de grid-template-columns sale en px
   («200px 200px 200px»), así que el reto cuenta las columnas
   partiendo ese texto y mide anchos con getBoundingClientRect.
   ============================================================ */
CURSO.registrar({
  id: "css-13",
  titulo: "Grid",
  xp: 50,
  objetivo: "Sabrás crear cuadrículas de filas y columnas con CSS Grid y hacer que un elemento ocupe varias casillas.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Una cuadrícula: display: grid",
      texto: "Flexbox es genial para colocar cosas en **una** dirección: una fila **o** una columna. Pero a veces quieres **filas y columnas a la vez**, como un tablero de ajedrez ♟️ o una caja de bombones.\n\nPara eso existe **Grid** (rejilla). Igual que con Flexbox, todo empieza en el **padre**: le pones `display: grid` y le dices qué columnas quieres con `grid-template-columns`. Cada valor es **una columna** con su ancho.\n\nLos hijos se van colocando solos, casilla a casilla, y cuando una fila se llena empiezan otra. ¡Las filas se crean solas!",
      ejemplo: {
        html: `<div class="rejilla">
  <div class="caja">1</div>
  <div class="caja">2</div>
  <div class="caja">3</div>
  <div class="caja">4</div>
  <div class="caja">5</div>
</div>`,
        css: `.rejilla {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  gap: 8px;
}
.caja {
  background-color: tomato;
  color: white;
  padding: 10px 0;
  text-align: center;
}`
      },
      consejo: "`gap` funciona igual que en Flexbox: separa las casillas, tanto entre columnas como entre filas."
    },
    {
      tipo: "explicacion",
      titulo: "La unidad fr y repeat()",
      texto: "Poner los anchos en píxeles es rígido. Grid trae una unidad nueva: `fr` (de «fracción»). `1fr` significa **una parte del espacio libre**.\n\nCon `1fr 2fr 1fr`, el ancho se parte en 4 trozos: la columna del medio se lleva **2** y las de los lados, **1** cada una. Como repartir una tableta de chocolate 🍫.\n\nY si quieres muchas columnas iguales, no hace falta escribir `1fr 1fr 1fr 1fr`: usa `repeat(4, 1fr)`, que significa «repite 4 veces `1fr`».",
      ejemplo: {
        html: `<div class="rejilla">
  <div class="caja">1</div>
  <div class="caja">2</div>
  <div class="caja">3</div>
  <div class="caja">4</div>
  <div class="caja">5</div>
  <div class="caja">6</div>
</div>`,
        css: `.rejilla {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 8px;
}
.caja {
  background-color: tomato;
  color: white;
  padding: 10px 0;
  text-align: center;
}`
      },
      consejo: "`repeat(3, 1fr)` es el truco favorito para hacer 3 columnas iguales que se adaptan a cualquier pantalla."
    },
    {
      tipo: "explicacion",
      titulo: "Ocupar varias casillas: grid-column: span 2",
      texto: "Por defecto, cada hijo ocupa **una** casilla. Pero puedes hacer que un elemento sea más ancho que los demás con `grid-column: span 2` (abarcar 2): ocupa **dos columnas** seguidas.\n\nEsta propiedad no va en el padre, sino en el **hijo** que quieres agrandar. Los demás se recolocan solos en las casillas que quedan libres.\n\nEs perfecto para destacar algo: la foto principal de una galería, la noticia más importante… 📰",
      ejemplo: {
        html: `<div class="rejilla">
  <div class="caja grande">1</div>
  <div class="caja">2</div>
  <div class="caja">3</div>
  <div class="caja">4</div>
  <div class="caja">5</div>
</div>`,
        css: `.rejilla {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.caja {
  background-color: tomato;
  color: white;
  padding: 10px 0;
  text-align: center;
}
.grande {
  grid-column: span 2;
  background-color: royalblue;
}`
      },
      consejo: "¿Flexbox o Grid? Regla rápida: si piensas en **una fila** (un menú, una barra de botones), Flexbox. Si piensas en **filas y columnas** (una galería, un tablero), Grid."
    },
    {
      tipo: "ejercicio",
      enunciado: "Coloca los dulces en su caja de bombones 🍬, en 3 columnas iguales.\n\nAl selector `.bombonera` ponle:\n\n• `display` con el valor `grid`\n• `grid-template-columns` con el valor `repeat(3, 1fr)`\n• `gap` con el valor `10px`\n\nEl HTML ya está escrito: tú solo escribes el CSS.",
      cssBase: `.bombonera { background-color: saddlebrown; padding: 10px; border-radius: 12px; max-width: 320px; }
.bombonera div { background-color: wheat; border-radius: 10px; padding: 10px 0; font-size: 32px; text-align: center; }`,
      inicial: {
        html: `<div class="bombonera">
  <div>🍫</div>
  <div>🍬</div>
  <div>🍭</div>
  <div>🍩</div>
  <div>🍪</div>
  <div>🧁</div>
</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="bombonera">
  <div>🍫</div>
  <div>🍬</div>
  <div>🍭</div>
  <div>🍩</div>
  <div>🍪</div>
  <div>🧁</div>
</div>
`,
        css: `.bombonera {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
`
      },
      pistas: [
        "Escribe una sola regla para el contenedor .bombonera con tres propiedades. Ojo con repeat: dentro de los paréntesis va el número de columnas, una coma y el ancho de cada una.",
        "Debe quedarte así:\n.bombonera {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "La caja ya tiene `display: grid`. Prueba distintas columnas, cambia el hueco y haz que la caja azul ocupe 2 o 3 casillas.",
      html: `<div class="rejilla">
  <div class="caja primera">1</div>
  <div class="caja">2</div>
  <div class="caja">3</div>
  <div class="caja">4</div>
  <div class="caja">5</div>
  <div class="caja">6</div>
  <div class="caja">7</div>
</div>`,
      cssBase: `body { font-family: sans-serif; }
.rejilla { display: grid; background-color: lavender; }
.caja { background-color: tomato; color: white; padding: 10px 0; text-align: center; font-weight: bold; }
.primera { background-color: royalblue; }`,
      controles: [
        { selector: ".rejilla", propiedad: "grid-template-columns", tipo: "opciones", opciones: ["1fr 1fr", "1fr 1fr 1fr", "repeat(4, 1fr)", "1fr 2fr 1fr", "80px 1fr"], valor: "1fr 1fr 1fr" },
        { selector: ".rejilla", propiedad: "gap", tipo: "rango", min: 0, max: 30, valor: 8, unidad: "px" },
        { selector: ".primera", propiedad: "grid-column", tipo: "opciones", opciones: ["auto", "span 2", "span 3"], valor: "auto" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "¿Qué consigues con grid-template-columns: repeat(4, 1fr)?",
      opciones: [
        "4 columnas del mismo ancho",
        "4 filas del mismo alto",
        "Que cada elemento se repita 4 veces"
      ],
      correcta: 0,
      explicacion: "repeat(4, 1fr) es lo mismo que escribir 1fr 1fr 1fr 1fr: cuatro columnas que se reparten el ancho a partes iguales. Las filas se crean solas."
    },
    {
      tipo: "reto",
      enunciado: "¡Dos cuadrículas en una página! 🎲\n\n1. Convierte `.tablero` en un tres en raya: una cuadrícula de **3 columnas iguales** con un hueco (`gap`) de `5px` entre casillas.\n2. Convierte `.galeria` en una cuadrícula de **3 columnas iguales** con un hueco de `10px`.\n3. Haz que la foto `.destacada` ocupe **dos columnas**.",
      inicial: {
        html: `<h2>Tres en raya</h2>
<div class="tablero">
  <div>❌</div>
  <div>⭕</div>
  <div></div>
  <div></div>
  <div>❌</div>
  <div></div>
  <div>⭕</div>
  <div></div>
  <div>❌</div>
</div>

<h2>Mis viajes</h2>
<div class="galeria">
  <div class="foto destacada">🏖️</div>
  <div class="foto">🏔️</div>
  <div class="foto">🌋</div>
  <div class="foto">🏜️</div>
</div>
`,
        css: `.tablero {
  width: 230px;
  background-color: #333;
  /* 1. Cuadrícula de 3 columnas iguales con gap de 5px */
}

.tablero div {
  height: 70px;
  background-color: white;
  font-size: 40px;
  text-align: center;
}

.galeria {
  /* 2. Cuadrícula de 3 columnas iguales con gap de 10px */
}

.foto {
  height: 80px;
  background-color: skyblue;
  border-radius: 8px;
  font-size: 40px;
  text-align: center;
}

.destacada {
  /* 3. Que ocupe dos columnas */
}
`
      },
      comprobaciones: [
        {
          texto: "El `.tablero` es una cuadrícula (display: grid) de 3 columnas con hueco entre casillas",
          prueba: (doc, win) => {
            const t = doc.querySelector(".tablero");
            if (!t) return false;
            const cs = win.getComputedStyle(t);
            const columnas = cs.gridTemplateColumns.trim().split(/\s+/).length;
            return cs.display === "grid" && cs.gridTemplateColumns !== "none" && columnas === 3
              && parseFloat(cs.columnGap) > 0 && parseFloat(cs.rowGap) > 0;
          }
        },
        {
          texto: "La `.galeria` es una cuadrícula (display: grid) de 3 columnas",
          prueba: (doc, win) => {
            const g = doc.querySelector(".galeria");
            if (!g) return false;
            const cs = win.getComputedStyle(g);
            const columnas = cs.gridTemplateColumns.trim().split(/\s+/).length;
            return cs.display === "grid" && cs.gridTemplateColumns !== "none" && columnas === 3;
          }
        },
        {
          texto: "La foto `.destacada` ocupa dos columnas (es más ancha que las demás)",
          prueba: (doc) => {
            const d = doc.querySelector(".galeria .destacada");
            const otra = doc.querySelector(".galeria .foto:not(.destacada)");
            if (!d || !otra) return false;
            return d.getBoundingClientRect().width > otra.getBoundingClientRect().width * 1.5;
          }
        }
      ],
      pistas: [
        "Los dos contenedores necesitan lo mismo: display: grid, grid-template-columns con 3 columnas iguales (repeat te ahorra escribir) y su gap. La foto destacada usa grid-column.",
        "Dentro de .tablero añade:\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 5px;\nEn .galeria, lo mismo pero con gap: 10px; y en .destacada escribe grid-column: span 2;"
      ],
      solucion: {
        html: `<h2>Tres en raya</h2>
<div class="tablero">
  <div>❌</div>
  <div>⭕</div>
  <div></div>
  <div></div>
  <div>❌</div>
  <div></div>
  <div>⭕</div>
  <div></div>
  <div>❌</div>
</div>

<h2>Mis viajes</h2>
<div class="galeria">
  <div class="foto destacada">🏖️</div>
  <div class="foto">🏔️</div>
  <div class="foto">🌋</div>
  <div class="foto">🏜️</div>
</div>
`,
        css: `.tablero {
  width: 230px;
  background-color: #333;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

.tablero div {
  height: 70px;
  background-color: white;
  font-size: 40px;
  text-align: center;
}

.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.foto {
  height: 80px;
  background-color: skyblue;
  border-radius: 8px;
  font-size: 40px;
  text-align: center;
}

.destacada {
  grid-column: span 2;
}
`
      }
    }
  ]
});
