/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-11
   Cajas genéricas: div y span — agrupar en bloque y en línea,
   y el atributo class como preparación para el Mundo CSS.
   Nota: todavía no hay CSS, así que class no cambia nada visible;
   el reto comprueba las clases con querySelector(".clase").
   ============================================================ */
CURSO.registrar({
  id: "html-11",
  titulo: "Cajas genéricas: div y span",
  xp: 30,
  objetivo: "Sabrás agrupar contenido con <div> y <span> y ponerles un apodo con class para darles estilo más adelante.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "<div>: una caja sin nombre",
      texto: "A veces quieres **agrupar** varios elementos para tratarlos como un todo: un título con su párrafo, una ficha, una tarjeta…\n\nPara eso existe `<div>` (de «division», división). Es como una **caja de cartón lisa** 📦: guarda cosas, pero no dice qué hay dentro.\n\nEs un elemento **de bloque**: empieza en una línea nueva y ocupa todo el ancho. Mira el resultado del ejemplo: ¡no se nota nada! El div es invisible; su trabajo es solo agrupar.",
      ejemplo: {
        html: `<div>
  <h2>Pingüino emperador</h2>
  <p>Mide más de un metro y jamás tiene frío.</p>
</div>
<div>
  <h2>Pingüino de Magallanes</h2>
  <p>Vive en Sudamérica y rebuzna como un burro.</p>
</div>`,
        css: ""
      },
      consejo: "Un `<div>` **no significa nada**. Si existe una etiqueta que dice lo que es (`<p>`, `<h2>`, `<ul>`, `<button>`…), usa esa. El div es el último recurso, solo para agrupar. ¡En la próxima lección conocerás cajas con nombre propio!"
    },
    {
      tipo: "explicacion",
      titulo: "<span>: una caja dentro de la frase",
      texto: "`<span>` es el hermano pequeño del div. También es una caja sin significado, pero **en línea**: se queda dentro de la frase, sin saltar de línea, igual que `<strong>` o `<em>`.\n\nSirve para «agarrar» unas pocas palabras y, más adelante, darles un estilo especial: un precio, un nombre, una puntuación…\n\nEn el ejemplo hay dos span… y tampoco se notan. ¡Paciencia, ya les llegará su momento! ✨",
      ejemplo: {
        html: `<p>Sabor del día: <span>chicle de fresa</span>, por solo <span>2 €</span> la bola.</p>`,
        css: ""
      },
      consejo: "Si quieres decir que algo es **importante**, sigue usando `<strong>`. El span es para cuando solo quieres envolver un trozo de texto, sin darle ningún significado."
    },
    {
      tipo: "explicacion",
      titulo: "El atributo class: un apodo",
      texto: "Cualquier etiqueta puede llevar el atributo `class`: un **apodo** que te inventas tú, como `<div class=\"carta\">`.\n\nAhora mismo **no cambia nada en pantalla**. Es como poner una pegatina con nombre a la caja: en el Mundo CSS diremos «pinta de dorado todo lo que lleve la pegatina carta» 🎨.\n\n¿Y en qué se diferencia del `id`? Un id es **único** (como un DNI). Una class se puede **repetir** en muchos elementos, y un elemento puede tener **varias**, separadas por espacios: `class=\"carta rara\"`.",
      ejemplo: {
        html: `<div class="carta">
  <h2>Burbujón</h2>
  <p>Tipo: <span class="tipo">agua</span></p>
</div>
<div class="carta rara">
  <h2>Chispitas</h2>
  <p>Tipo: <span class="tipo">eléctrico</span></p>
</div>`,
        css: ""
      },
      consejo: "Elige apodos que digan **qué es** la cosa (`precio`, `carta`), no cómo se ve (`rojo`, `grande`): si mañana el precio pasa a ser verde, el nombre seguirá teniendo sentido. Y escríbelos en minúsculas, sin tildes ni espacios (un espacio separa dos clases)."
    },
    {
      tipo: "ejercicio",
      enunciado: "Escribe un párrafo `<p>` que diga **Mi grupo favorito es Los Calcetines Desparejados**. 🎸\n\nDentro de ese párrafo, envuelve **solo** el nombre del grupo (**Los Calcetines Desparejados**) en un `<span>` con `class=\"grupo\"`.\n\nNo añadas ningún otro atributo ni etiqueta. Fíjate en que, en el resultado, la frase sigue en una sola línea: el span no la parte.",
      solucion: {
        html: `<p>Mi grupo favorito es <span class="grupo">Los Calcetines Desparejados</span></p>`,
        css: ""
      },
      pistas: [
        "Primero escribe el párrafo completo con <p>…</p>. Luego pon <span class=\"grupo\"> justo antes de «Los» y </span> justo después de «Desparejados».",
        "Debe quedarte así:\n<p>Mi grupo favorito es <span class=\"grupo\">Los Calcetines Desparejados</span></p>"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "En la frase «El helado cuesta 2 €» quieres envolver solo el precio para darle color más adelante. ¿Qué caja usas?",
      opciones: ["<div>, porque es una caja", "<span>, porque va dentro de la frase", "<h2>, para que se vea más"],
      correcta: 1,
      explicacion: "El <span> es una caja en línea: envuelve el precio sin sacarlo de la frase. Un <div> lo pondría en una línea aparte, y un <h2> es un título, no un precio."
    },
    {
      tipo: "reto",
      enunciado: "Prepara la ficha de este personaje de videojuego 🎮 para darle estilo en el Mundo CSS:\n\n1. Envuelve el título y los dos párrafos dentro de un `<div class=\"ficha\">`.\n2. En el párrafo del nivel, envuelve **solo el número** con `<span class=\"nivel\">`.",
      inicial: {
        html: `<!-- 1. Envuelve TODA la ficha en un <div class="ficha"> -->
<h2>Gloria, la Gallina Guerrera</h2>
<p>Arma: espada de plumas</p>
<!-- 2. Envuelve solo el número en un <span class="nivel"> -->
<p>Nivel: 12</p>
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "Hay un <div> con class=\"ficha\"",
          prueba: (doc) => !!doc.querySelector("div.ficha")
        },
        {
          texto: "El título <h2> y los dos párrafos están dentro de la ficha",
          prueba: (doc) => !!doc.querySelector("div.ficha h2")
            && doc.querySelectorAll("div.ficha p").length >= 2
        },
        {
          texto: "El número del nivel está dentro de un <span class=\"nivel\"> de la ficha",
          prueba: (doc) => /\d/.test(doc.querySelector("div.ficha span.nivel")?.textContent || "")
        }
      ],
      pistas: [
        "El div rodea a todo, como una caja: escribe <div class=\"ficha\"> encima del <h2> y </div> debajo del último párrafo. El span rodea solo al 12.",
        "Debe quedarte así:\n<div class=\"ficha\">\n  <h2>Gloria, la Gallina Guerrera</h2>\n  <p>Arma: espada de plumas</p>\n  <p>Nivel: <span class=\"nivel\">12</span></p>\n</div>"
      ],
      solucion: {
        html: `<div class="ficha">
  <h2>Gloria, la Gallina Guerrera</h2>
  <p>Arma: espada de plumas</p>
  <p>Nivel: <span class="nivel">12</span></p>
</div>
`,
        css: ""
      }
    }
  ]
});
