/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-08
   Bordes y sombras — border abreviado, border-radius (círculos con
   50%), box-shadow y text-shadow.
   Nota: el reto acepta border-radius en % (≥ 50%) o en px (≥ la mitad
   del ancho) para el círculo, y pide ≥ 5px en el botón para no
   confundirlo con el redondeo que algunos navegadores dan de serie.
   ============================================================ */
CURSO.registrar({
  id: "css-08",
  titulo: "Bordes y sombras",
  xp: 35,
  objetivo: "Sabrás decorar cajas con bordes, esquinas redondeadas y sombras.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "border: tres valores en uno",
      texto: "Ya usaste `border` en la lección anterior. Es una propiedad **abreviada**: junta tres cosas en una sola línea, en este orden:\n\n• **grosor**: `3px`\n• **estilo**: `solid` (liso), `dashed` (rayas), `dotted` (puntos) o `double` (doble)\n• **color**: `tomato`\n\nSi solo quieres un lado, usa `border-top`, `border-right`, `border-bottom` o `border-left`. Un `border-bottom` queda genial como subrayado elegante. ✏️",
      ejemplo: {
        html: `<p class="liso">Borde liso</p>
<p class="rayas">Borde a rayas</p>
<p class="puntos">Borde de puntitos</p>
<p class="subrayado">Solo por debajo</p>`,
        css: `.liso {
  border: 3px solid tomato;
}
.rayas {
  border: 3px dashed seagreen;
}
.puntos {
  border: 3px dotted royalblue;
}
.subrayado {
  border-bottom: 3px solid orange;
}`
      },
      consejo: "Si te olvidas del estilo (`solid`, `dashed`…), ¡el borde no aparece! Por defecto el estilo es `none` (ninguno). Es el despiste número uno con los bordes."
    },
    {
      tipo: "explicacion",
      titulo: "border-radius: adiós a las esquinas",
      texto: "`border-radius` redondea las esquinas. Cuanto más grande el número, más curva: `5px` es un toque suave y `20px`, una pastilla.\n\nY el truco estrella: en una caja **cuadrada** (mismo `width` que `height`), `border-radius: 50%` la convierte en un **círculo** perfecto. Así se hacen los avatares redondos de las redes sociales. 🍩\n\nFunciona aunque la caja no tenga borde: lo que se redondea es el fondo.",
      ejemplo: {
        html: `<div class="pastilla">Esquinas redondas</div>
<div class="circulo">🍩</div>`,
        css: `.pastilla {
  width: 160px;
  padding: 10px;
  background-color: plum;
  border-radius: 20px;
}
.circulo {
  width: 80px;
  height: 80px;
  margin-top: 10px;
  font-size: 50px;
  line-height: 80px;
  text-align: center;
  background-color: pink;
  border-radius: 50%;
}`
      },
      consejo: "Si la caja no es cuadrada, el `50%` te dará un óvalo, como un huevo. 🥚"
    },
    {
      tipo: "explicacion",
      titulo: "Sombras: box-shadow y text-shadow",
      texto: "`box-shadow` pone sombra a la caja y `text-shadow`, a las letras. Se escriben igual:\n\n`box-shadow: 0 8px 16px rgb(0 0 0 / 0.3);`\n\n• `0`: cuánto se mueve hacia la **derecha**.\n• `8px`: cuánto se mueve hacia **abajo**.\n• `16px`: el **desenfoque**, lo borrosa que es (0 = bordes nítidos).\n• El **color**: aquí, negro al 30 %, como viste en la lección de colores.\n\nUna sombra suave y hacia abajo hace que la caja parezca **flotar**. ✨",
      ejemplo: {
        html: `<h1 class="neon">GAME OVER</h1>
<div class="carta">Carta flotante</div>`,
        css: `.neon {
  color: gold;
  text-shadow: 3px 3px 0 purple;
}
.carta {
  width: 160px;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 8px 16px rgb(0 0 0 / 0.3);
}`
      },
      consejo: "Las sombras quedan mejor **sutiles** y con transparencia. Una sombra negra, opaca y enorme parece un borrón de tinta."
    },
    {
      tipo: "ejercicio",
      enunciado: "Ponle un marco a esta carta coleccionable 🐉. A la clase `.carta` ponle:\n\n• un `border` de `3px solid purple`,\n• y un `border-radius` de `15px`.",
      inicial: {
        html: `<div class="carta">Carta legendaria: Dragón de Gominola</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="carta">Carta legendaria: Dragón de Gominola</div>
`,
        css: `.carta {
  border: 3px solid purple;
  border-radius: 15px;
}
`
      },
      pistas: [
        "Una sola regla con el selector .carta. El border lleva tres valores separados por espacios: grosor, estilo y color.",
        "Debe quedarte así:\n.carta {\n  border: 3px solid purple;\n  border-radius: 15px;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "Diseña el botón de tu videojuego 🎮: redondea las esquinas, cambia el estilo del borde y prueba distintas sombras para la caja y para las letras.",
      html: `<button class="jugar">¡Jugar!</button>`,
      cssBase: "body { font-family: sans-serif; padding: 30px; }\n.jugar { font-size: 28px; padding: 12px 32px; color: #3a0ca3; background-color: #ffbe0b; border: 4px solid #fb5607; }",
      controles: [
        { selector: ".jugar", propiedad: "border-radius", tipo: "rango", min: 0, max: 40, valor: 0, unidad: "px" },
        { selector: ".jugar", propiedad: "border-style", tipo: "opciones", opciones: ["solid", "dashed", "dotted", "double"], valor: "solid" },
        { selector: ".jugar", propiedad: "box-shadow", tipo: "opciones", opciones: ["none", "4px 4px 0 #3a0ca3", "0 8px 16px rgb(0 0 0 / 0.4)", "0 0 20px deeppink"], valor: "none" },
        { selector: ".jugar", propiedad: "text-shadow", tipo: "opciones", opciones: ["none", "2px 2px 0 white", "0 0 8px deeppink"], valor: "none" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "¿Qué convierte una caja cuadrada en un círculo?",
      opciones: ["border-radius: 0", "border-radius: 50%", "border-radius: circle"],
      correcta: 1,
      explicacion: "Con 50% cada esquina se curva hasta la mitad de la caja: si es cuadrada, sale un círculo. Con 0 las esquinas quedan en pico, y «circle» no es un valor válido."
    },
    {
      tipo: "reto",
      enunciado: "Prepara la pantalla de inicio de tu videojuego 🐸:\n\n1. Haz que el `.avatar` sea **redondo**.\n2. Redondea las esquinas del botón `.jugar` (por ejemplo, `15px`).\n3. Ponle al botón una sombra con `box-shadow`.",
      pestana: "css",
      inicial: {
        html: `<div class="avatar">🐸</div>
<p>Jugador: Rana Ninja</p>
<button class="jugar">¡Jugar!</button>
`,
        css: `.avatar {
  width: 80px;
  height: 80px;
  font-size: 50px;
  line-height: 80px;
  text-align: center;
  background-color: lightgreen;
  /* 1. Hazlo redondo */
}

.jugar {
  font-size: 24px;
  padding: 10px 30px;
  background-color: gold;
  border: 3px solid darkorange;
  /* 2. Esquinas redondeadas */
  /* 3. Una sombra (box-shadow) */
}
`
      },
      comprobaciones: [
        {
          texto: "El avatar es un círculo",
          prueba: (doc, win) => {
            const el = doc.querySelector(".avatar");
            if (!el) return false;
            const radio = win.getComputedStyle(el).borderTopLeftRadius || "";
            const n = parseFloat(radio) || 0;
            const ancho = el.getBoundingClientRect().width;
            return radio.includes("%") ? n >= 50 : ancho > 0 && n >= ancho / 2 - 0.5;
          }
        },
        {
          texto: "El botón tiene las esquinas redondeadas (5px o más)",
          prueba: (doc, win) => {
            const el = doc.querySelector(".jugar");
            if (!el) return false;
            return (parseFloat(win.getComputedStyle(el).borderTopLeftRadius) || 0) >= 5;
          }
        },
        {
          texto: "El botón tiene sombra (box-shadow)",
          prueba: (doc, win) => {
            const el = doc.querySelector(".jugar");
            if (!el) return false;
            const sombra = win.getComputedStyle(el).boxShadow || "none";
            return sombra !== "none";
          }
        }
      ],
      pistas: [
        "Para el círculo, la caja tiene que ser cuadrada (ya lo es: 80 × 80) y llevar border-radius: 50%. Para la sombra recuerda el orden: derecha, abajo, desenfoque y color.",
        "Añade border-radius: 50%; dentro de .avatar, y dentro de .jugar:\nborder-radius: 15px;\nbox-shadow: 0 6px 12px rgb(0 0 0 / 0.3);"
      ],
      solucion: {
        html: `<div class="avatar">🐸</div>
<p>Jugador: Rana Ninja</p>
<button class="jugar">¡Jugar!</button>
`,
        css: `.avatar {
  width: 80px;
  height: 80px;
  font-size: 50px;
  line-height: 80px;
  text-align: center;
  background-color: lightgreen;
  border-radius: 50%;
}

.jugar {
  font-size: 24px;
  padding: 10px 30px;
  background-color: gold;
  border: 3px solid darkorange;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgb(0 0 0 / 0.3);
}
`
      }
    }
  ]
});
