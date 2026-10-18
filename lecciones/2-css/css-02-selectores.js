/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-02
   Selectores — etiqueta, .clase, #id, agrupar con coma y
   selector descendiente (espacio).
   Nota: los ejemplos y el reto evitan que dos reglas peleen por la
   misma propiedad del mismo elemento: la cascada llega en css-05.
   ============================================================ */
CURSO.registrar({
  id: "css-02",
  titulo: "Selectores",
  xp: 35,
  objetivo: "Sabrás apuntar exactamente a los elementos que quieres decorar con etiquetas, clases, ids y combinaciones.",
  glosario: [
    { termino: "etiqueta (p, h1…)", tema: "Selectores", para: "Elige todos los elementos de esa etiqueta.", ejemplo: "p {\n  color: gray;\n}", buscar: "selector etiqueta todos" },
    { termino: ".clase", tema: "Selectores", para: "Elige los elementos con ese `class`; se puede repetir en muchos.", ejemplo: ".servicio {\n  padding: 22px;\n}", buscar: "selector clase class punto" },
    { termino: "#id", tema: "Selectores", para: "Elige el único elemento con ese `id`.", ejemplo: "#horario {\n  max-width: 800px;\n}", buscar: "selector id almohadilla" },
    { termino: "a, b (agrupar)", tema: "Selectores", para: "La misma regla para varios selectores, separados por comas.", ejemplo: "h1, h2, h3 {\n  color: darkslategray;\n}", buscar: "agrupar coma varios a la vez" },
    { termino: "a b (descendiente)", tema: "Selectores", para: "Elige `b` solo si está dentro de `a` (con un espacio entre los dos).", ejemplo: "nav a {\n  text-decoration: none;\n}", buscar: "descendiente dentro de espacio combinador" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Por etiqueta o por clase",
      texto: "El **selector** es la puntería del CSS: decide a quién le cae el estilo. 🎯\n\n• **Selector de etiqueta**: el nombre de la etiqueta, como `p`. Decora **todos** los párrafos de la página.\n• **Selector de clase**: un **punto** seguido del apodo que pusiste con `class`, como `.favorito`. Decora **solo** los elementos que llevan esa clase, sean de la etiqueta que sean.\n\n¿Recuerdas que en el Mundo HTML dijimos que `class` era una pegatina para el CSS? ¡Pues aquí está su momento!",
      ejemplo: {
        html: `<h2>Mis videojuegos</h2>
<p>Mario Kart</p>
<p class="favorito">Zelda</p>
<p>Tetris</p>`,
        css: `p {
  color: gray;
}
.favorito {
  background-color: gold;
}`
      },
      consejo: "En el HTML la clase se escribe sin punto (`class=\"favorito\"`) y en el CSS, con punto (`.favorito`). ¡Olvidar el punto es el despiste número uno!"
    },
    {
      tipo: "explicacion",
      titulo: "Por id, y varios a la vez",
      texto: "• **Selector de id**: una **almohadilla** `#` seguida del id, como `#capitana`. Como un id es único en la página, apunta a **un solo elemento**: es el francotirador de los selectores.\n\n• **Agrupar con coma**: si varios selectores llevan el mismo estilo, sepáralos con comas y escribe la regla una sola vez. `h1, h2` significa «los h1 **y también** los h2».\n\nAsí no repites el mismo código dos veces. ✂️",
      ejemplo: {
        html: `<h1>Mi equipo</h1>
<h2>Delanteras</h2>
<p id="capitana">Lola</p>
<p>Rocío</p>`,
        css: `h1, h2 {
  color: navy;
}
#capitana {
  background-color: gold;
}`
      },
      consejo: "Si algo se repite (varios elementos con el mismo estilo), usa una **clase**. Guarda el **id** para lo que es único de verdad."
    },
    {
      tipo: "explicacion",
      titulo: "El que está dentro de…: el espacio",
      texto: "A veces quieres decorar algo **solo si está dentro** de otra cosa. Para eso escribes dos selectores separados por un **espacio**: es el **selector descendiente**.\n\n`.oferta span` significa «los `span` que están **dentro** de algo con la clase `oferta`». Los demás span se quedan como estaban.\n\nEn el ejemplo, solo el precio de la oferta sale en rojo. 🏷️",
      ejemplo: {
        html: `<p>Precio normal: <span>5 €</span></p>
<div class="oferta">
  <p>¡Oferta! <span>3 €</span></p>
</div>`,
        css: `.oferta span {
  color: red;
}`
      },
      consejo: "Truco para leerlo: empieza por la **derecha**. `.oferta span` se lee «un span… que esté dentro de .oferta». ¡Y cuidado con el espacio, que aquí sí importa!"
    },
    {
      tipo: "ejercicio",
      enunciado: "El HTML ya está escrito. Escribe en la pestaña **CSS** tres reglas:\n\n1. A los `h1`, `color: darkgreen;`\n2. A la clase `.aviso`, `color: crimson;`\n3. Al id `#horario`, `color: teal;`\n\nOjo con el punto de la clase y la almohadilla del id. 🦁",
      inicial: {
        html: `<h1>Zoo de Villabigote</h1>
<p class="aviso">No des de comer a los pingüinos.</p>
<p id="horario">Abierto de 10:00 a 18:00.</p>
`,
        css: ""
      },
      pistas: [
        "El selector de etiqueta es el nombre sin más (h1), el de clase empieza por un punto (.aviso) y el de id por una almohadilla (#horario).",
        "Debe quedarte así:\nh1 {\n  color: darkgreen;\n}\n.aviso {\n  color: crimson;\n}\n#horario {\n  color: teal;\n}"
      ],
      solucion: {
        html: `<h1>Zoo de Villabigote</h1>
<p class="aviso">No des de comer a los pingüinos.</p>
<p id="horario">Abierto de 10:00 a 18:00.</p>
`,
        css: `h1 {
  color: darkgreen;
}
.aviso {
  color: crimson;
}
#horario {
  color: teal;
}
`
      }
    },
    {
      tipo: "quiz",
      pregunta: "¿Qué selector decora solo el elemento que tiene `id=\"jefe\"`?",
      opciones: ["jefe", ".jefe", "#jefe"],
      correcta: 2,
      explicacion: "El id se selecciona con almohadilla: #jefe. Con punto (.jefe) buscarías una clase, y sin nada (jefe) buscarías una etiqueta <jefe>, que no existe."
    },
    {
      tipo: "reto",
      enunciado: "¡La Frutería Paca necesita color! 🍍 El HTML ya está hecho. En la pestaña **CSS**:\n\n1. Pon un color de letra a **todas** las frutas (los `li`).\n2. Pon un color de fondo **solo** a las tropicales (`class=\"tropical\"`).\n3. Pon **otro** color de fondo, distinto, **solo** a tu favorita (`id=\"favorita\"`).\n\nLos colores, los que tú quieras.",
      pestana: "css",
      inicial: {
        html: `<h1>Frutería Paca</h1>
<ul>
  <li>Manzana</li>
  <li class="tropical">Piña</li>
  <li id="favorita">Fresa</li>
  <li class="tropical">Mango</li>
  <li>Pera</li>
</ul>
`,
        css: `/* 1. Todas las frutas (li): un color de letra */

/* 2. Solo las tropicales (.tropical): un color de fondo */

/* 3. Solo tu favorita (#favorita): otro color de fondo */
`
      },
      comprobaciones: [
        {
          texto: "Todas las frutas tienen el mismo color de letra, y no es negro",
          prueba: (doc, win) => {
            const colores = Array.from(doc.querySelectorAll("li")).map(li => win.getComputedStyle(li).color);
            return colores.length > 0 && colores.every(c => c === colores[0]) && colores[0] !== "rgb(0, 0, 0)";
          }
        },
        {
          texto: "Las dos frutas tropicales tienen color de fondo… y las que no son tropicales ni favoritas, no",
          prueba: (doc, win) => {
            const transparente = el => win.getComputedStyle(el).backgroundColor === "rgba(0, 0, 0, 0)";
            const tropicales = Array.from(doc.querySelectorAll("li.tropical"));
            const normales = Array.from(doc.querySelectorAll("li:not(.tropical):not(#favorita)"));
            return tropicales.length === 2 && tropicales.every(li => !transparente(li)) &&
                   normales.length > 0 && normales.every(transparente);
          }
        },
        {
          texto: "Tu favorita (#favorita) tiene un color de fondo distinto al de las tropicales",
          prueba: (doc, win) => {
            const fav = doc.querySelector("#favorita");
            const tropical = doc.querySelector(".tropical");
            if (!fav || !tropical) return false;
            const fondoFav = win.getComputedStyle(fav).backgroundColor;
            return fondoFav !== "rgba(0, 0, 0, 0)" && fondoFav !== win.getComputedStyle(tropical).backgroundColor;
          }
        }
      ],
      pistas: [
        "Necesitas tres reglas, una por cada selector: li (todas), .tropical (con punto) y #favorita (con almohadilla). Las dos últimas usan background-color.",
        "Debe quedarte algo así:\nli {\n  color: darkgreen;\n}\n.tropical {\n  background-color: gold;\n}\n#favorita {\n  background-color: pink;\n}"
      ],
      solucion: {
        html: `<h1>Frutería Paca</h1>
<ul>
  <li>Manzana</li>
  <li class="tropical">Piña</li>
  <li id="favorita">Fresa</li>
  <li class="tropical">Mango</li>
  <li>Pera</li>
</ul>
`,
        css: `li {
  color: darkgreen;
}
.tropical {
  background-color: gold;
}
#favorita {
  background-color: pink;
}
`
      }
    }
  ]
});
