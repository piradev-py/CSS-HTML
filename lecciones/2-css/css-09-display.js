/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-09
   Display: bloque y en línea — display: block, inline,
   inline-block y none.
   Nota: el reto parte de unos enlaces con display: block (en vertical).
   «En fila» se comprueba con la posición vertical (top) de los tres
   botones visibles; el botón .secreto lleva también la clase .boton,
   así que se excluye con :not(.secreto).
   ============================================================ */
CURSO.registrar({
  id: "css-09",
  titulo: "Display: bloque y en línea",
  xp: 35,
  objetivo: "Entenderás cómo se colocan los elementos por defecto y sabrás cambiarlo con display.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Bloque y en línea",
      texto: "¿Recuerdas que `<div>` y `<p>` empiezan en una línea nueva, mientras que `<span>` y `<strong>` se quedan dentro de la frase? Esa forma de colocarse la decide la propiedad `display` (mostrar):\n\n• `display: block` (**bloque**): empieza en una línea nueva y ocupa **todo el ancho**, como un ladrillo. 🧱\n• `display: inline` (**en línea**): se queda en la frase y ocupa **solo lo que mide su contenido**, como una palabra.\n\nCada etiqueta trae uno de serie, ¡pero puedes cambiarlo! En el ejemplo, el último span se porta como un bloque.",
      ejemplo: {
        html: `<div class="bloque">Soy un div: ocupo todo el ancho</div>
<p>Soy un párrafo con <span class="linea">un span</span> dentro.</p>
<span class="linea convertido">Soy un span con display: block</span>`,
        css: `.bloque {
  background-color: lightblue;
}
.linea {
  background-color: gold;
}
.convertido {
  display: block;
}`
      },
      consejo: "Cambiar el `display` solo cambia **cómo se ve**, no lo que significa la etiqueta. Un `<span>` con `display: block` sigue siendo un span."
    },
    {
      tipo: "explicacion",
      titulo: "inline-block: lo mejor de los dos",
      texto: "Los elementos en línea tienen una manía: **ignoran `width` y `height`**. Solo miden lo que su contenido.\n\n`display: inline-block` mezcla lo mejor de los dos mundos:\n\n• Se queda **en la línea**, al lado de sus vecinos, como `inline`.\n• Pero **respeta** `width` y `height`, como `block`.\n\nEn el ejemplo, las dos fichas tienen `width: 120px` y `height: 50px`… pero solo la de `inline-block` hace caso. ¡Perfecto para poner botones en fila! 🔘",
      ejemplo: {
        html: `<p>
  <span class="ficha">Inline</span>
  <span class="ficha cajita">Inline-block</span>
</p>`,
        css: `.ficha {
  width: 120px;
  height: 50px;
  background-color: lightgreen;
  border: 2px solid green;
}
.cajita {
  display: inline-block;
}`
      }
    },
    {
      tipo: "explicacion",
      titulo: "display: none: ¡desaparece!",
      texto: "`display: none` hace que un elemento **desaparezca por completo**: no se ve y **no ocupa espacio**, como si nunca hubiera existido. Los demás elementos se recolocan para llenar el hueco.\n\nSirve para esconder cosas: un menú que aún no toca abrir, un mensaje de error que todavía no ha pasado… o el final de una película. 🎬\n\nEl elemento sigue estando en el HTML: solo lo has escondido con CSS.",
      ejemplo: {
        html: `<p>El culpable de todo es…</p>
<p class="spoiler">¡el mayordomo!</p>
<p>Fin de la película.</p>`,
        css: `.spoiler {
  display: none;
}`
      },
      consejo: "¿Te acuerdas de `opacity: 0`? También vuelve invisible un elemento, pero **sigue ocupando su sitio** (queda un hueco). Con `display: none` no queda ni el hueco."
    },
    {
      tipo: "ejercicio",
      enunciado: "Coloca estos peces en fila, como en un acuario 🐠. A la clase `.pez` ponle:\n\n• un `display` de `inline-block`,\n• un `width` de `80px`,\n• y un `background-color` de `lightblue`.",
      inicial: {
        html: `<ul>
  <li class="pez">Nemo</li>
  <li class="pez">Dory</li>
  <li class="pez">Bruce</li>
</ul>
`,
        css: ""
      },
      solucion: {
        html: `<ul>
  <li class="pez">Nemo</li>
  <li class="pez">Dory</li>
  <li class="pez">Bruce</li>
</ul>
`,
        css: `.pez {
  display: inline-block;
  width: 80px;
  background-color: lightblue;
}
`
      },
      pistas: [
        "Una sola regla con el selector .pez y tres líneas dentro. Fíjate en que inline-block se escribe con un guion en medio.",
        "Debe quedarte así:\n.pez {\n  display: inline-block;\n  width: 80px;\n  background-color: lightblue;\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Listas sin viñetas: el truco de los menús",
      texto: "¿Te has fijado en que los peces aún tenían su **viñeta** (el puntito) y un hueco a la izquierda? Casi todos los menús de las webs son **listas** `<ul>` disfrazadas, y para disfrazarlas hacen falta dos cosas:\n\n• `list-style: none` (estilo de lista: ninguno) quita las viñetas.\n• `padding: 0` quita el hueco que la lista deja a la izquierda para ellas.\n\nY con los `<li>` en `inline-block`, ¡ya tienes un menú en fila! 🧭",
      ejemplo: {
        html: `<ul class="menu">
  <li>Inicio</li>
  <li>Fotos</li>
  <li>Contacto</li>
</ul>`,
        css: `.menu {
  list-style: none;
  padding: 0;
}
.menu li {
  display: inline-block;
  margin-right: 16px;
}`
      },
      consejo: "La lista sigue siendo una lista: el navegador y los lectores de pantalla saben que son opciones de un menú. Solo le has cambiado el traje."
    },
    {
      tipo: "ejercicio",
      enunciado: "Convierte esta lista en un menú. A la clase `.menu` ponle:\n\n• un `list-style` de `none`,\n• y un `padding` de `0`.",
      inicial: {
        html: `<ul class="menu">
  <li>Inicio</li>
  <li>Recetas</li>
  <li>Contacto</li>
</ul>
`,
        css: ""
      },
      solucion: {
        html: `<ul class="menu">
  <li>Inicio</li>
  <li>Recetas</li>
  <li>Contacto</li>
</ul>
`,
        css: `.menu {
  list-style: none;
  padding: 0;
}
`
      },
      pistas: [
        "Una regla con el selector .menu y dos líneas dentro: list-style y padding.",
        "Debe quedarte así:\n.menu {\n  list-style: none;\n  padding: 0;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "Cambia el `display` de las mascotas y mueve los deslizadores. Fíjate: con `inline`, el ancho y el alto no hacen nada; con `inline-block` y `block`, sí. ¿Y qué pasa con `none`? 🙈",
      html: `<p>Mis mascotas:
  <span class="mascota">🐶 Toby</span>
  <span class="mascota">🐱 Misi</span>
  <span class="mascota">🐢 Flash</span>
</p>`,
      cssBase: "body { font-family: sans-serif; }\n.mascota { background-color: #ffd6a5; border: 2px solid #f4a261; padding: 4px; }",
      controles: [
        { selector: ".mascota", propiedad: "display", tipo: "opciones", opciones: ["inline", "inline-block", "block", "none"], valor: "inline" },
        { selector: ".mascota", propiedad: "width", tipo: "rango", min: 40, max: 200, valor: 100, unidad: "px" },
        { selector: ".mascota", propiedad: "height", tipo: "rango", min: 20, max: 80, valor: 40, unidad: "px" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Le has puesto width: 200px a un <span> y no cambia nada. ¿Por qué?",
      opciones: [
        "Porque a los <span> no se les puede dar estilo con CSS",
        "Porque es un elemento en línea, y los elementos en línea ignoran width",
        "Porque hay que escribir 200 sin px"
      ],
      correcta: 1,
      explicacion: "Un <span> es inline de serie, y los elementos en línea ignoran width y height. Con display: inline-block (o block) ya te haría caso."
    },
    {
      tipo: "reto",
      enunciado: "El menú de tu web de videojuegos 🕹️ sale en vertical y se ve fatal. Arréglalo:\n\n1. Cambia el `display` de `.boton` para que los botones vayan **en fila** sin perder su ancho.\n2. Esconde el botón `.secreto` para que **no ocupe espacio**.",
      pestana: "css",
      inicial: {
        html: `<nav>
  <a class="boton" href="#inicio">Inicio</a>
  <a class="boton" href="#juegos">Juegos</a>
  <a class="boton" href="#tienda">Tienda</a>
  <a class="boton secreto" href="#trucos">Trucos</a>
</nav>
`,
        css: `.boton {
  display: block; /* 1. Cámbialo para que vayan en fila y respeten el width */
  width: 90px;
  padding: 10px;
  margin-bottom: 5px;
  color: white;
  background-color: tomato;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
}

.secreto {
  /* 2. ¡Escóndelo! Que no ocupe espacio */
}
`
      },
      comprobaciones: [
        {
          texto: "Los botones visibles tienen display: inline-block",
          prueba: (doc, win) => {
            const botones = Array.from(doc.querySelectorAll(".boton:not(.secreto)"));
            return botones.length >= 3 && botones.every(b => win.getComputedStyle(b).display === "inline-block");
          }
        },
        {
          texto: "Los tres botones están en la misma fila",
          prueba: (doc) => {
            const botones = Array.from(doc.querySelectorAll(".boton:not(.secreto)"));
            if (botones.length < 3) return false;
            const arriba = botones.map(b => b.getBoundingClientRect().top);
            return arriba.every(t => Math.abs(t - arriba[0]) <= 1);
          }
        },
        {
          texto: "El botón .secreto está escondido con display: none",
          prueba: (doc, win) => {
            const el = doc.querySelector(".secreto");
            return !!el && win.getComputedStyle(el).display === "none";
          }
        }
      ],
      pistas: [
        "El valor que deja los elementos en la misma línea pero respetando su width es inline-block. Para esconder sin dejar hueco, piensa en display… none.",
        "Cambia display: block; por display: inline-block; dentro de .boton, y escribe display: none; dentro de .secreto."
      ],
      solucion: {
        html: `<nav>
  <a class="boton" href="#inicio">Inicio</a>
  <a class="boton" href="#juegos">Juegos</a>
  <a class="boton" href="#tienda">Tienda</a>
  <a class="boton secreto" href="#trucos">Trucos</a>
</nav>
`,
        css: `.boton {
  display: inline-block;
  width: 90px;
  padding: 10px;
  margin-bottom: 5px;
  color: white;
  background-color: tomato;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
}

.secreto {
  display: none;
}
`
      }
    }
  ]
});
