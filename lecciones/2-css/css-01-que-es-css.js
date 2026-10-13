/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-01
   ¿Qué es CSS? — el «maquillaje» de la web: regla, selector,
   propiedad, valor, ; y { }, dónde se escribe (<style>, archivo
   .css + <link>) y los nombres de colores (color, background-color).
   ============================================================ */
CURSO.registrar({
  id: "css-01",
  titulo: "¿Qué es CSS?",
  xp: 25,
  objetivo: "Entenderás qué es CSS y escribirás tus primeras reglas para dar color a una página.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "El maquillaje de la web",
      texto: "Con HTML ya sabes construir el **contenido** de una página: títulos, párrafos, listas… Pero todo sale en blanco y negro, ¡muy serio! 🙃\n\nPara cambiar su **aspecto** (colores, tamaños, fuentes, posiciones) existe **CSS**. Si el HTML es el esqueleto, el CSS es la **ropa y el maquillaje**.\n\nCSS significa «Cascading Style Sheets»: **hojas de estilo en cascada**. Lo de «cascada» lo entenderás en la lección 5.\n\nMira el ejemplo: el HTML es el de siempre, pero una línea de CSS pinta el título de morado.",
      ejemplo: {
        html: `<h1>Mi gato Bigotes</h1>
<p>Le encanta dormir encima del teclado.</p>`,
        css: `h1 {
  color: purple;
}`
      },
      consejo: "¡Te doy la bienvenida al Mundo CSS! 🎨 Aquí todo cambia en cuanto escribes, así que juega sin miedo: si algo se rompe, borras y listo."
    },
    {
      tipo: "explicacion",
      titulo: "Anatomía de una regla",
      texto: "El CSS se escribe en **reglas**. Cada regla tiene tres piezas:\n\n• El **selector** dice **a quién** decoras: `h1` significa «a todos los h1».\n• La **propiedad** dice **qué** cambias: `color` es el color de la letra.\n• El **valor** dice **cómo** lo dejas: `white`.\n\nLas propiedades van entre **llaves** `{ }`. Entre propiedad y valor va **dos puntos** `:` y cada línea termina en **punto y coma** `;`. Puedes poner varias dentro de la misma regla.\n\n`background-color` es el **color de fondo**. Los colores se pueden escribir por su nombre en inglés: `red`, `gold`, `tomato`, `hotpink`… ¡hay unos 140!",
      ejemplo: {
        html: `<h1>Pizzería Don Queso</h1>`,
        css: `h1 {
  color: white;
  background-color: darkorange;
}`
      },
      consejo: "El fallo más típico: olvidar el `;` al final de una línea. Entonces el navegador no entiende la siguiente y la ignora sin avisar. Si algo «no sale», ¡busca el punto y coma perdido!"
    },
    {
      tipo: "explicacion",
      titulo: "¿Dónde se escribe el CSS?",
      texto: "En este curso, lo escribes en la pestaña **CSS** del editor. El motor de la web lo mete por ti dentro de una etiqueta `<style>`, en la cabeza de la página.\n\nEn una web de verdad tienes dos opciones:\n\n• Escribirlo dentro de `<style>…</style>`, en el `<head>`, como en el ejemplo.\n• Guardarlo en un **archivo aparte** que termina en `.css` (por ejemplo `estilos.css`) y enlazarlo desde el `<head>` con `<link rel=\"stylesheet\" href=\"estilos.css\">`.\n\nLa segunda es la que usan los profesionales: un solo archivo de estilos sirve para todas las páginas de la web. 📁",
      ejemplo: {
        html: `<!DOCTYPE html>
<html lang="es">
<head>
  <title>Mi web</title>
  <style>
    h1 { color: teal; }
  </style>
</head>
<body>
  <h1>¡Hola, CSS!</h1>
</body>
</html>`,
        css: ""
      },
      consejo: "Las reglas cortas también se pueden escribir en una sola línea, como `h1 { color: teal; }`. Al navegador le da igual: los espacios y saltos de línea son solo para que tú lo leas mejor."
    },
    {
      tipo: "ejercicio",
      enunciado: "El HTML ya está escrito. Tú solo escribe CSS en la pestaña **CSS**:\n\n1. Una regla para los `h1` que ponga `color: tomato;`\n2. Otra regla para los `p` que ponga `color: seagreen;`\n\nRecuerda: selector, llaves `{ }`, propiedad, dos puntos `:`, valor y punto y coma `;`.",
      inicial: {
        html: `<h1>Pizzería Don Queso</h1>
<p>La pizza más quesuda del barrio.</p>
`,
        css: ""
      },
      pistas: [
        "Cada regla empieza por el selector (el nombre de la etiqueta, sin < >) y después abre llaves. Dentro va propiedad: valor;",
        "Debe quedarte así:\nh1 {\n  color: tomato;\n}\np {\n  color: seagreen;\n}"
      ],
      solucion: {
        html: `<h1>Pizzería Don Queso</h1>
<p>La pizza más quesuda del barrio.</p>
`,
        css: `h1 {
  color: tomato;
}
p {
  color: seagreen;
}
`
      }
    },
    {
      tipo: "controles",
      instruccion: "¡Ahora, un poco de magia! ✨ Mueve el deslizador y elige colores. Fíjate en el CSS que se va escribiendo solo debajo de los controles.\n\n`font-size` cambia el **tamaño de la letra** (lo verás a fondo en «Texto y fuentes»). Los colores salen con un código que empieza por `#`: es otra forma de escribirlos, la aprenderás en la lección «Colores».",
      html: `<h1>¡Hola, CSS!</h1>
<p>Cambia los controles y mira qué pasa.</p>`,
      controles: [
        { selector: "h1", propiedad: "font-size", tipo: "rango", min: 16, max: 72, valor: 32, unidad: "px" },
        { selector: "h1", propiedad: "color", tipo: "color", valor: "#e44d26" },
        { selector: "body", propiedad: "background-color", tipo: "color", valor: "#fff8e7" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "En la regla `p { color: blue; }`, ¿qué es `color`?",
      opciones: ["El selector", "La propiedad", "El valor"],
      correcta: 1,
      explicacion: "`p` es el selector (a quién decoras), `color` es la propiedad (qué cambias) y `blue` es el valor (cómo lo dejas)."
    },
    {
      tipo: "reto",
      enunciado: "Dale vida a la web del club de los dinosaurios 🦖. Escribe en la pestaña **CSS**:\n\n1. Una regla que pinte el título `h1` de un color (el que quieras, por ejemplo `darkgreen`).\n2. Una regla que ponga un color de fondo al `body` (por ejemplo `lightyellow`).\n\nElige colores que se distingan bien, ¡que el título se tiene que leer!",
      pestana: "css",
      inicial: {
        html: `<h1>Club de los dinosaurios</h1>
<p>Aquí rugimos en voz baja.</p>
`,
        css: `/* 1. Pinta el h1 de un color */

/* 2. Pon un color de fondo (background-color) al body */
`
      },
      comprobaciones: [
        {
          texto: "El título <h1> tiene un color que no es el negro de siempre",
          prueba: (doc, win) => {
            const h1 = doc.querySelector("h1");
            return !!h1 && win.getComputedStyle(h1).color !== "rgb(0, 0, 0)";
          }
        },
        {
          texto: "El <body> tiene un color de fondo",
          prueba: (doc, win) => {
            const fondo = win.getComputedStyle(doc.body).backgroundColor;
            return fondo !== "rgba(0, 0, 0, 0)" && fondo !== "transparent";
          }
        },
        {
          texto: "El título se puede leer: su color es distinto del color de fondo",
          prueba: (doc, win) => {
            const h1 = doc.querySelector("h1");
            if (!h1) return false;
            return win.getComputedStyle(h1).color !== win.getComputedStyle(doc.body).backgroundColor;
          }
        }
      ],
      pistas: [
        "Necesitas dos reglas: una con el selector h1 y la propiedad color, y otra con el selector body y la propiedad background-color.",
        "Debe quedarte algo así:\nh1 {\n  color: darkgreen;\n}\nbody {\n  background-color: lightyellow;\n}"
      ],
      solucion: {
        html: `<h1>Club de los dinosaurios</h1>
<p>Aquí rugimos en voz baja.</p>
`,
        css: `h1 {
  color: darkgreen;
}
body {
  background-color: lightyellow;
}
`
      }
    }
  ]
});
