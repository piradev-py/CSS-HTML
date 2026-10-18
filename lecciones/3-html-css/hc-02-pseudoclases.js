/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-02
   Pseudo-clases — :hover, :active, :focus (estados) y
   :first-child, :last-child, :nth-child() (posición).
   Nota: el reto comprueba el :hover con PRUEBA.clonar(doc,
   { estado: "hover" }) en una fila PAR, para que suspenda si
   li:hover está antes de li:nth-child(even) y pierde la cascada
   (las dos pesan lo mismo). El enunciado y una pista lo avisan.
   ============================================================ */
CURSO.registrar({
  id: "hc-02",
  titulo: "Pseudo-clases",
  xp: 45,
  objetivo: "Sabrás cambiar el estilo de un elemento cuando le pasas el ratón, lo pulsas o tiene el foco, y según el puesto que ocupa en una lista.",
  glosario: [
    { termino: ":hover", tema: "Pseudo-clases", para: "El estilo cuando el ratón está encima.", ejemplo: ".boton:hover {\n  background-color: #155e53;\n}", buscar: "raton encima pasar" },
    { termino: ":active", tema: "Pseudo-clases", para: "El estilo mientras se pulsa.", ejemplo: ".boton:active {\n  transform: scale(0.97);\n}", buscar: "pulsar clic presionar" },
    { termino: ":focus", tema: "Pseudo-clases", para: "El estilo del elemento que tiene el foco (el teclado está en él).", ejemplo: "input:focus {\n  border-color: #1f7a6b;\n}", buscar: "foco teclado tab" },
    { termino: ":first-child y :last-child", tema: "Pseudo-clases", para: "El primer y el último hijo de su padre.", ejemplo: "li:last-child {\n  border-bottom: none;\n}", buscar: "primero ultimo hijo" },
    { termino: ":nth-child()", tema: "Pseudo-clases", para: "Por su puesto: `even` (pares), `odd` (impares) o un número.", ejemplo: "tr:nth-child(even) {\n  background-color: #f7faf8;\n}", buscar: "pares impares filas alternas puesto" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Estilos con estado: :hover y :active",
      texto: "Una **pseudo-clase** es una palabra que se pega al selector con **dos puntos** y significa «solo cuando…». Es como decir «el botón **cuando** tiene el ratón encima».\n\n• `:hover` → mientras el ratón está **encima** del elemento.\n• `:active` → mientras lo estás **pulsando** (el instante del clic).\n\nNo tienes que tocar el HTML: el navegador sabe solo cuándo pasa cada cosa. Pasa el ratón por el botón del resultado y haz clic sin soltar. 🖱️",
      ejemplo: {
        html: `<button class="boton">¡Pulsa!</button>`,
        css: `.boton {
  background-color: royalblue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
}
.boton:hover {
  background-color: tomato;
}
.boton:active {
  background-color: darkred;
}`
      },
      consejo: "Ojo: en `.boton:hover` no hay espacio antes de los dos puntos. Con espacio (`.boton :hover`) significaría otra cosa y no funcionaría como esperas."
    },
    {
      tipo: "explicacion",
      titulo: "El foco: :focus",
      texto: "El **foco** marca qué elemento de la página está «escuchando» al teclado ⌨️. Lo recibe un campo de texto cuando haces clic en él para escribir, y también los enlaces y botones cuando saltas de uno a otro con la tecla **Tab**.\n\n`:focus` da estilo al elemento que tiene el foco. Es muy importante para la **accesibilidad**: hay personas que navegan solo con el teclado y necesitan ver en todo momento dónde están.\n\nHaz clic en el campo del resultado y después pulsa **Tab** para saltar al botón.",
      ejemplo: {
        html: `<input type="text" placeholder="Tu apodo">
<button>Guardar</button>`,
        css: `input,
button {
  font-size: 18px;
  padding: 6px 10px;
}
input:focus {
  background-color: lightyellow;
}
button:focus {
  background-color: gold;
}`
      },
      consejo: "En la lección de la barra de navegación conocerás a un primo de `:focus` pensado para los enlaces: `:focus-visible`."
    },
    {
      tipo: "explicacion",
      titulo: "Según su puesto: :first-child, :last-child y :nth-child()",
      texto: "Otras pseudo-clases no miran lo que haces, sino **el puesto** que ocupa un elemento entre sus **hermanos** (los que comparten el mismo padre), como en la fila del cole:\n\n• `li:first-child` → el **primero**.\n• `li:last-child` → el **último**.\n• `li:nth-child(3)` → el **tercero** (pon el número que quieras).\n• `li:nth-child(even)` → los **pares** (2.º, 4.º, 6.º…) y `li:nth-child(odd)`, los **impares**.\n\nLas filas de colores alternos de las tablas y las listas se hacen así. 🦓",
      ejemplo: {
        html: `<ol>
  <li>Pizza</li>
  <li>Tacos</li>
  <li>Sushi</li>
  <li>Paella</li>
  <li>Croquetas</li>
</ol>`,
        css: `li:first-child {
  font-weight: bold;
}
li:nth-child(even) {
  background-color: lavender;
}
li:last-child {
  color: crimson;
}`
      },
      consejo: "Una pseudo-clase pesa lo mismo que una clase. Si `li:hover` y `li:nth-child(even)` cambian la misma propiedad, gana la que esté **más abajo** (¡la cascada!)."
    },
    {
      tipo: "ejercicio",
      enunciado: "Haz que este botón de videojuego 🎮 reaccione al ratón. Al selector `.boton:hover` ponle:\n\n• `background-color` con el valor `gold`\n• `color` con el valor `black`\n\nEl HTML ya está escrito: tú solo escribes el CSS. Cuando termines, pasa el ratón por el botón.",
      cssBase: `body { font-family: sans-serif; }
.boton { background-color: mediumpurple; color: white; border: none; padding: 12px 24px; border-radius: 10px; font-size: 18px; }`,
      inicial: {
        html: `<button class="boton">¡Saltar!</button>
`,
        css: ""
      },
      solucion: {
        html: `<button class="boton">¡Saltar!</button>
`,
        css: `.boton:hover {
  background-color: gold;
  color: black;
}
`
      },
      pistas: [
        "Es una sola regla. El selector es la clase con la pseudo-clase pegada, sin espacios: .boton:hover. Dentro van las dos propiedades.",
        "Debe quedarte así:\n.boton:hover {\n  background-color: gold;\n  color: black;\n}"
      ]
    },
    {
      tipo: "ejercicio",
      enunciado: "Prepara la clasificación de la carrera de caracoles 🐌:\n\n• Al selector `li:first-child` ponle `color` con el valor `goldenrod` (¡es el ganador!).\n• Al selector `li:nth-child(even)` ponle `background-color` con el valor `lavender`.\n\nEl HTML ya está escrito: tú solo escribes el CSS.",
      cssBase: `body { font-family: sans-serif; }
.carrera li { padding: 6px 10px; font-size: 18px; }`,
      inicial: {
        html: `<ol class="carrera">
  <li>Turbo</li>
  <li>Babosín</li>
  <li>Rayo Lento</li>
  <li>Concha Veloz</li>
</ol>
`,
        css: ""
      },
      solucion: {
        html: `<ol class="carrera">
  <li>Turbo</li>
  <li>Babosín</li>
  <li>Rayo Lento</li>
  <li>Concha Veloz</li>
</ol>
`,
        css: `li:first-child {
  color: goldenrod;
}
li:nth-child(even) {
  background-color: lavender;
}
`
      },
      pistas: [
        "Necesitas dos reglas. Copia los selectores tal cual del enunciado: li:first-child para el primero y li:nth-child(even) para los pares.",
        "Debe quedarte así:\nli:first-child {\n  color: goldenrod;\n}\nli:nth-child(even) {\n  background-color: lavender;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "Elige el color de las filas pares y el de la fila que tiene el ratón encima. Después, pasa el ratón por la lista. Como `li:hover` va **debajo**, gana también en las filas pares.",
      html: `<ul class="lista">
  <li>🎸 Rock del garaje</li>
  <li>🎹 Piano bajo la lluvia</li>
  <li>🥁 Tambores del desierto</li>
  <li>🎺 Trompeta de medianoche</li>
  <li>🎻 Violín del faro</li>
</ul>`,
      cssBase: `body { font-family: sans-serif; }
.lista { list-style: none; padding: 0; max-width: 320px; border: 2px solid #ddd; border-radius: 10px; overflow: hidden; }
.lista li { padding: 10px 14px; }`,
      controles: [
        { selector: "li:nth-child(even)", propiedad: "background-color", tipo: "color", valor: "#e6e6fa" },
        { selector: "li:hover", propiedad: "background-color", tipo: "color", valor: "#ffd166" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "En una lista de 6 elementos, ¿qué filas pinta li:nth-child(even)?",
      opciones: [
        "La 2.ª, la 4.ª y la 6.ª (las pares)",
        "La 1.ª, la 3.ª y la 5.ª (las impares)",
        "Solo la última"
      ],
      correcta: 0,
      explicacion: "even significa «par» en inglés, así que elige los puestos 2, 4, 6… Para los impares se usa odd, y para el último, :last-child."
    },
    {
      tipo: "reto",
      enunciado: "Dale estilo a tu lista de canciones para bailar 🎧. El HTML ya está hecho; en la pestaña **CSS**:\n\n1. Pon un fondo de otro color a las filas **pares** con `:nth-child`.\n2. Haz que **cualquier fila** (también las pares) cambie de fondo al **pasar el ratón** por encima. Escribe esta regla **debajo** de la anterior.\n3. Quita el borde de abajo a la **última** canción, que no lo necesita.",
      pestana: "css",
      cssBase: `body { font-family: sans-serif; background-color: #f4f1ff; }
h1 { font-size: 24px; color: #4a3f8c; }
.canciones { list-style: none; padding: 0; max-width: 380px; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgb(0 0 0 / 0.1); }`,
      inicial: {
        html: `<h1>🎧 Mi lista para bailar</h1>
<ul class="canciones">
  <li>El baile del robot</li>
  <li>Salsa con patatas</li>
  <li>Disco en la luna</li>
  <li>Cumbia del dinosaurio</li>
  <li>Reggae para gatos</li>
  <li>Pop de medianoche</li>
</ul>
`,
        css: `.canciones li {
  padding: 10px 14px;
  border-bottom: 1px solid #ddd;
}

/* 1. Filas pares con otro fondo */

/* 2. Fila con el ratón encima (escríbela DEBAJO de la 1) */

/* 3. La última fila, sin borde inferior */
`
      },
      comprobaciones: [
        {
          texto: "Las filas pares tienen un fondo distinto al de las impares",
          prueba: (doc, win) => {
            const lis = doc.querySelectorAll(".canciones li");
            if (lis.length < 4) return false;
            const fondo = el => win.getComputedStyle(el).backgroundColor;
            return fondo(lis[1]) !== fondo(lis[0]) && fondo(lis[2]) === fondo(lis[0]) && fondo(lis[3]) === fondo(lis[1]);
          }
        },
        {
          texto: "Al pasar el ratón, cualquier fila cambia de fondo (también las pares)",
          prueba: async (doc, win) => {
            const lis = doc.querySelectorAll(".canciones li");
            if (lis.length < 2) return false;
            const v = await PRUEBA.clonar(doc, { estado: "hover" });
            const copias = v.doc.querySelectorAll(".canciones li");
            if (copias.length < 2) return false;
            return [0, 1].every(i =>
              v.win.getComputedStyle(copias[i]).backgroundColor !== win.getComputedStyle(lis[i]).backgroundColor);
          }
        },
        {
          texto: "La última canción no tiene borde inferior, pero las demás sí",
          prueba: (doc, win) => {
            const lis = doc.querySelectorAll(".canciones li");
            if (lis.length < 2) return false;
            const ultima = win.getComputedStyle(lis[lis.length - 1]);
            const primera = win.getComputedStyle(lis[0]);
            return parseFloat(ultima.borderBottomWidth) === 0 && parseFloat(primera.borderBottomWidth) > 0;
          }
        }
      ],
      pistas: [
        "Usa .canciones li:nth-child(even) para las pares, .canciones li:hover para el ratón y .canciones li:last-child para la última. Si las filas pares no cambian con el ratón, es que la regla :hover está más arriba que la de :nth-child: ¡muévela debajo!",
        "Escribe, en este orden:\n.canciones li:nth-child(even) {\n  background-color: #f1ecff;\n}\n.canciones li:hover {\n  background-color: gold;\n}\n.canciones li:last-child {\n  border-bottom: none;\n}"
      ],
      solucion: {
        html: `<h1>🎧 Mi lista para bailar</h1>
<ul class="canciones">
  <li>El baile del robot</li>
  <li>Salsa con patatas</li>
  <li>Disco en la luna</li>
  <li>Cumbia del dinosaurio</li>
  <li>Reggae para gatos</li>
  <li>Pop de medianoche</li>
</ul>
`,
        css: `.canciones li {
  padding: 10px 14px;
  border-bottom: 1px solid #ddd;
}

.canciones li:nth-child(even) {
  background-color: #f1ecff;
}

.canciones li:hover {
  background-color: gold;
}

.canciones li:last-child {
  border-bottom: none;
}
`
      }
    }
  ]
});
