/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-04
   Texto y fuentes — font-family (con fuentes de reserva),
   font-size, font-weight, font-style, text-decoration,
   text-transform, text-align y line-height.
   Nota: solo fuentes del sistema o genéricas (nada de internet).
   El reto mide el tamaño del título en vez de la negrita, porque
   los <h1> y <h2> ya salen en negrita por defecto.
   ============================================================ */
CURSO.registrar({
  id: "css-04",
  titulo: "Texto y fuentes",
  xp: 30,
  objetivo: "Sabrás dar personalidad a tus textos eligiendo la fuente, el tamaño, el grosor, la alineación y el espacio entre líneas.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "La fuente y su tamaño",
      texto: "• `font-family` elige la **fuente** (el tipo de letra). Se escribe una lista: `Georgia, serif`. El navegador prueba la primera; si el ordenador no la tiene, usa la siguiente. ¡Es la **fuente de reserva**!\n\nAl final pon siempre una familia genérica: `serif` (letras con «patitas»), `sans-serif` (sin patitas), `monospace` (todas igual de anchas, como una máquina de escribir) o `cursive` (como escrita a mano).\n\n• `font-size` cambia el **tamaño** de la letra. Por ahora, en píxeles: el texto normal mide `16px`. ✍️",
      ejemplo: {
        html: `<h1>El Dragón Lector</h1>
<p>Librería con fuego en el corazón.</p>
<p class="codigo">Código secreto: 1234</p>`,
        css: `h1 {
  font-family: Georgia, serif;
  font-size: 40px;
}
p {
  font-size: 18px;
}
.codigo {
  font-family: monospace;
}`
      },
      consejo: "Si el nombre de la fuente tiene espacios, va entre comillas: `font-family: \"Courier New\", monospace;`"
    },
    {
      tipo: "explicacion",
      titulo: "Negrita, cursiva y adornos",
      texto: "• `font-weight`: el **grosor**. `bold` es negrita y `normal`, la de siempre. También admite números del 100 al 900: `400` es normal y `700`, negrita.\n• `font-style: italic;` pone la letra en **cursiva**.\n• `text-decoration`: rayas. `underline` subraya, `line-through` tacha y `none` quita la raya (por ejemplo, a un enlace).\n• `text-transform`: cambia las **mayúsculas**. `uppercase` lo pone todo en MAYÚSCULAS, `lowercase` en minúsculas y `capitalize` pone En Mayúscula Cada Palabra.",
      ejemplo: {
        html: `<p class="oferta">Gran oferta</p>
<p class="antes">Antes: 20 €</p>
<p class="ahora">Ahora: 9 €</p>
<p class="nota">Solo hoy, o mañana, quién sabe</p>`,
        css: `.oferta {
  text-transform: uppercase;
}
.antes {
  text-decoration: line-through;
}
.ahora {
  font-weight: bold;
}
.nota {
  font-style: italic;
}`
      },
      consejo: "¿`<strong>` o `font-weight: bold`? Si la palabra es **importante**, usa `<strong>`: eso es HTML y tiene significado. Si solo quieres que **se vea** más gruesa, usa CSS."
    },
    {
      tipo: "explicacion",
      titulo: "Alinear y dejar respirar",
      texto: "• `text-align` **alinea** el texto dentro de su caja: `left` (izquierda), `center` (centro), `right` (derecha) o `justify` (justificado, como en los periódicos).\n\n• `line-height` es la **altura de cada línea**, o sea, el aire entre renglones. Lo mejor es escribirlo **sin unidad**: `1.5` significa «una vez y media el tamaño de la letra».\n\nUn texto apretado cansa la vista; con `line-height` entre `1.5` y `1.8` se lee de maravilla. 😌",
      ejemplo: {
        html: `<h2>Oda al calcetín perdido</h2>
<p>Te fuiste un martes de colada y dejaste a tu pareja sola en el cajón. Aún te esperamos.</p>`,
        css: `h2 {
  text-align: center;
}
p {
  text-align: center;
  line-height: 2;
}`
      },
      consejo: "En los decimales de CSS se usa **punto**, no coma: `1.5`, nunca `1,5`. Recuerda que la coma sirve para separar cosas, como las fuentes de reserva."
    },
    {
      tipo: "ejercicio",
      enunciado: "El HTML ya está escrito. Escribe en la pestaña **CSS**:\n\n1. A los `h1`: `text-align: center;` y `font-family: Georgia, serif;`\n2. A los `p`: un `font-size` de `20px`.\n\n♟️",
      inicial: {
        html: `<h1>Club de Ajedrez Peón Feliz</h1>
<p>Nos vemos los jueves a las seis.</p>
`,
        css: ""
      },
      pistas: [
        "Necesitas dos reglas: una para h1 con dos propiedades dentro (cada una con su punto y coma) y otra para p con font-size.",
        "Debe quedarte así:\nh1 {\n  text-align: center;\n  font-family: Georgia, serif;\n}\np {\n  font-size: 20px;\n}"
      ],
      solucion: {
        html: `<h1>Club de Ajedrez Peón Feliz</h1>
<p>Nos vemos los jueves a las seis.</p>
`,
        css: `h1 {
  text-align: center;
  font-family: Georgia, serif;
}
p {
  font-size: 20px;
}
`
      }
    },
    {
      tipo: "controles",
      instruccion: "Diseña el cartel del concierto 🎸: cambia el tamaño y la alineación del título, prueba las familias de fuentes en el párrafo y estira su `line-height` para ver cómo respiran las líneas.",
      html: `<h1>Los Grillos en concierto</h1>
<p>Sábado a las nueve de la noche en la plaza del pueblo. ¡Trae tapones para los oídos y muchas ganas de saltar!</p>`,
      controles: [
        { selector: "h1", propiedad: "font-size", tipo: "rango", min: 16, max: 60, valor: 32, unidad: "px" },
        { selector: "h1", propiedad: "text-align", tipo: "opciones", opciones: ["left", "center", "right"], valor: "left" },
        { selector: "h1", propiedad: "text-transform", tipo: "opciones", opciones: ["none", "uppercase", "lowercase"], valor: "none" },
        { selector: "p", propiedad: "font-family", tipo: "opciones", opciones: ["serif", "sans-serif", "monospace", "cursive"], valor: "serif" },
        { selector: "p", propiedad: "line-height", tipo: "rango", min: 1, max: 3, paso: 0.1, valor: 1.2 }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "¿Por qué se escribe `font-family: Georgia, serif;` con dos fuentes?",
      opciones: [
        "Para mezclar las dos fuentes en el mismo texto",
        "Para que, si el ordenador no tiene Georgia, use otra fuente con patitas",
        "Para que el texto salga en negrita"
      ],
      correcta: 1,
      explicacion: "Es la fuente de reserva: el navegador usa la primera de la lista que tenga disponible. serif es una familia genérica que todos los ordenadores tienen."
    },
    {
      tipo: "reto",
      enunciado: "Prepara el cartel de la gira de Los Grillos 🦗. El HTML ya está hecho. En la pestaña **CSS**:\n\n1. El título `h1`: **centrado** y con un tamaño de **40px o más**.\n2. El subtítulo (`.subtitulo`): todo en **MAYÚSCULAS** con `text-transform`.\n3. El párrafo `p`: un interlineado cómodo, con `line-height` de **1.5 o más**.",
      pestana: "css",
      inicial: {
        html: `<h1>Los Grillos en concierto</h1>
<h2 class="subtitulo">Gira Cri-cri por el mundo</h2>
<p>Ven a escuchar los mayores éxitos de la banda más ruidosa del jardín. Habrá palomitas, luces de colores y un grillo que toca la batería con las patas de atrás.</p>
`,
        css: `/* 1. h1: centrado y de 40px o más */

/* 2. .subtitulo: en mayúsculas */

/* 3. p: line-height de 1.5 o más */
`
      },
      comprobaciones: [
        {
          texto: "El título <h1> está centrado",
          prueba: (doc, win) => {
            const h1 = doc.querySelector("h1");
            return !!h1 && win.getComputedStyle(h1).textAlign === "center";
          }
        },
        {
          texto: "El título <h1> mide 40px o más",
          prueba: (doc, win) => {
            const h1 = doc.querySelector("h1");
            return !!h1 && (parseFloat(win.getComputedStyle(h1).fontSize) || 0) >= 40;
          }
        },
        {
          texto: "El subtítulo (.subtitulo) está en mayúsculas",
          prueba: (doc, win) => {
            const sub = doc.querySelector(".subtitulo");
            return !!sub && win.getComputedStyle(sub).textTransform === "uppercase";
          }
        },
        {
          texto: "El párrafo tiene un interlineado de al menos 1.5 veces el tamaño de su letra",
          prueba: (doc, win) => {
            const p = doc.querySelector("p");
            if (!p) return false;
            const estilo = win.getComputedStyle(p);
            const alto = parseFloat(estilo.lineHeight);
            const letra = parseFloat(estilo.fontSize);
            return !isNaN(alto) && !isNaN(letra) && alto >= letra * 1.5 - 0.1;
          }
        }
      ],
      pistas: [
        "Necesitas tres reglas: h1 con text-align y font-size, .subtitulo con text-transform y p con line-height (sin unidad).",
        "Debe quedarte algo así:\nh1 {\n  text-align: center;\n  font-size: 48px;\n}\n.subtitulo {\n  text-transform: uppercase;\n}\np {\n  line-height: 1.6;\n}"
      ],
      solucion: {
        html: `<h1>Los Grillos en concierto</h1>
<h2 class="subtitulo">Gira Cri-cri por el mundo</h2>
<p>Ven a escuchar los mayores éxitos de la banda más ruidosa del jardín. Habrá palomitas, luces de colores y un grillo que toca la batería con las patas de atrás.</p>
`,
        css: `h1 {
  text-align: center;
  font-size: 48px;
}
.subtitulo {
  text-transform: uppercase;
}
p {
  line-height: 1.6;
}
`
      }
    }
  ]
});
