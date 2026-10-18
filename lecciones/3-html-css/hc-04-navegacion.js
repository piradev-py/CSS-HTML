/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-04
   Barra de navegación — patrón nav ▸ ul ▸ li ▸ a, quitar
   viñetas (list-style), Flexbox aplicado, enlace activo con una
   clase y :hover / :focus-visible en enlaces.
   Notas:
   - El patrón se dibuja primero con ▸ y los ejemplos usan selectores
     descendientes (nav a, .menu a). El combinador hijo (>) se enseña
     después con un submenú, que es donde se nota la diferencia.
   - El motor trata :focus-visible como :focus al revisar, así que
     el reto lo comprueba con PRUEBA.clonar(doc, { estado: "focus" }).
   ============================================================ */
CURSO.registrar({
  id: "hc-04",
  titulo: "Barra de navegación",
  xp: 50,
  objetivo: "Sabrás construir el menú de navegación típico de cualquier web: enlaces en fila, sin viñetas, con el enlace actual resaltado y que reaccionan al ratón y al teclado.",
  glosario: [
    { termino: "nav > ul > li > a", tema: "Menús", para: "El esqueleto de todo menú: una lista de enlaces dentro de `nav`.", ejemplo: "<nav>\n  <ul>\n    <li><a href=\"#inicio\">Inicio</a></li>\n  </ul>\n</nav>", buscar: "menu navegacion lista enlaces", lenguaje: "html" },
    { termino: "a > b (hijo directo)", tema: "Menús", para: "Elige `b` solo si es hijo directo de `a` (no nieto).", ejemplo: "nav > ul > li {\n  display: inline-block;\n}", buscar: "hijo directo combinador mayor que" },
    { termino: "enlace activo (.activo)", tema: "Menús", para: "Una clase en el enlace de la página o sección actual, para resaltarlo.", ejemplo: "nav a.activo {\n  color: #12332f;\n  font-weight: 600;\n}", buscar: "actual resaltar marcado" },
    { termino: ":focus-visible", tema: "Menús", para: "El foco solo cuando se navega con el teclado: un contorno que se vea.", ejemplo: "a:focus-visible {\n  outline: 3px solid #1f7a6b;\n}", buscar: "foco teclado contorno accesibilidad outline" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "El esqueleto de todo menú",
      texto: "Casi todas las webs del mundo construyen su menú con las mismas cuatro cajas, una dentro de otra:\n\n**nav ▸ ul ▸ li ▸ a**\n\n• `<nav>`: la caja de la navegación (ya la conoces del HTML semántico).\n• `<ul>`: porque un menú es, en el fondo, **una lista** de enlaces.\n• `<li>`: un elemento de la lista por cada opción.\n• `<a>`: el enlace de verdad, el que se pulsa.\n\nUsar una lista ayuda a los lectores de pantalla: anuncian «lista de 3 elementos» y la persona sabe cuántas opciones hay. Así se ve sin CSS… ¡ahora lo arreglamos! 🔧",
      ejemplo: {
        html: `<nav>
  <ul>
    <li><a href="#inicio">Inicio</a></li>
    <li><a href="#juegos">Juegos</a></li>
    <li><a href="#tienda">Tienda</a></li>
  </ul>
</nav>`,
        css: ""
      }
    },
    {
      tipo: "explicacion",
      titulo: "Sin viñetas y en fila",
      texto: "Tres pasos convierten esa lista en un menú:\n\n1. **Quitar las viñetas** con `list-style: none` en la `ul`.\n2. **Quitar la sangría**: la `ul` trae de serie un relleno a la izquierda y márgenes. Los borramos con `padding: 0` y `margin: 0`.\n3. **Ponerlo en fila** con Flexbox: `display: flex` y un `gap` para separar.\n\nDespués, los enlaces: fuera el subrayado con `text-decoration: none` y un poco de relleno para que sean fáciles de pulsar. 👆",
      ejemplo: {
        html: `<nav>
  <ul>
    <li><a href="#inicio">Inicio</a></li>
    <li><a href="#juegos">Juegos</a></li>
    <li><a href="#tienda">Tienda</a></li>
  </ul>
</nav>`,
        css: `nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 8px;
}
nav a {
  display: block;
  padding: 8px 14px;
  background-color: royalblue;
  color: white;
  text-decoration: none;
  border-radius: 8px;
}`
      },
      consejo: "El `display: block` del enlace hace que su relleno cuente de verdad: así **todo** el botón se puede pulsar, no solo las letras."
    },
    {
      tipo: "explicacion",
      titulo: "El enlace activo, :hover y :focus-visible",
      texto: "Un buen menú te dice **dónde estás**: el enlace de la página actual lleva una clase, por ejemplo `class=\"activo\"`, y le das un estilo diferente.\n\nTambién reacciona a lo que haces:\n\n• `:hover` → con el ratón encima.\n• `:focus-visible` → es el foco que **se ve** cuando navegas con el teclado (tecla **Tab**). Si haces clic con el ratón no aparece, para no molestar.\n\nComo suelen llevar el mismo estilo, se escriben juntos, separados por una coma. Haz clic en el resultado y pulsa **Tab**. ⌨️",
      ejemplo: {
        html: `<nav>
  <ul>
    <li><a class="activo" href="#inicio">Inicio</a></li>
    <li><a href="#juegos">Juegos</a></li>
    <li><a href="#tienda">Tienda</a></li>
  </ul>
</nav>`,
        css: `nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 8px;
}
nav a {
  display: block;
  padding: 8px 14px;
  background-color: royalblue;
  color: white;
  text-decoration: none;
  border-radius: 8px;
}
.activo {
  background-color: tomato;
}
nav a:hover,
nav a:focus-visible {
  background-color: gold;
  color: black;
}`
      },
      consejo: "¿Por qué `.activo` sale rojo si `nav a` dice azul? Porque `nav a` no lleva clase y `.activo` sí: la clase pesa más. Y `nav a:hover` pesa todavía más, por eso gana a las dos."
    },
    {
      tipo: "ejercicio",
      enunciado: "Convierte esta lista en el menú de tu web de juegos 🕹️. Al selector `nav ul` ponle:\n\n• `list-style` con el valor `none`\n• `padding` con el valor `0`\n• `display` con el valor `flex`\n• `gap` con el valor `24px`\n\nEl HTML ya está escrito: tú solo escribes el CSS.",
      cssBase: `body { font-family: sans-serif; }
nav { background-color: #264653; padding: 12px 16px; border-radius: 10px; }
nav ul { margin: 0; }
nav a { color: white; text-decoration: none; font-weight: bold; }`,
      inicial: {
        html: `<nav>
  <ul>
    <li><a href="#inicio">Inicio</a></li>
    <li><a href="#juegos">Juegos</a></li>
    <li><a href="#ranking">Ranking</a></li>
  </ul>
</nav>
`,
        css: ""
      },
      solucion: {
        html: `<nav>
  <ul>
    <li><a href="#inicio">Inicio</a></li>
    <li><a href="#juegos">Juegos</a></li>
    <li><a href="#ranking">Ranking</a></li>
  </ul>
</nav>
`,
        css: `nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 24px;
}
`
      },
      pistas: [
        "Es una sola regla para nav ul con cuatro propiedades: una quita las viñetas, otra la sangría y las otras dos ponen los enlaces en fila con hueco.",
        "Debe quedarte así:\nnav ul {\n  list-style: none;\n  padding: 0;\n  display: flex;\n  gap: 24px;\n}"
      ]
    },
    {
      tipo: "ejercicio",
      enunciado: "Haz que los enlaces de este menú de música 🎵 reaccionen al ratón **y** al teclado. Escribe **una sola regla** con los selectores `nav a:hover` y `nav a:focus-visible` separados por una coma, y ponle:\n\n• `background-color` con el valor `gold`\n• `color` con el valor `black`\n\nEl HTML ya está escrito: tú solo escribes el CSS.",
      cssBase: `body { font-family: sans-serif; }
nav ul { list-style: none; padding: 0; margin: 0; display: flex; gap: 8px; }
nav a { display: block; padding: 8px 14px; background-color: #6a4c93; color: white; text-decoration: none; border-radius: 8px; }`,
      inicial: {
        html: `<nav>
  <ul>
    <li><a href="#novedades">Novedades</a></li>
    <li><a href="#artistas">Artistas</a></li>
    <li><a href="#listas">Listas</a></li>
  </ul>
</nav>
`,
        css: ""
      },
      solucion: {
        html: `<nav>
  <ul>
    <li><a href="#novedades">Novedades</a></li>
    <li><a href="#artistas">Artistas</a></li>
    <li><a href="#listas">Listas</a></li>
  </ul>
</nav>
`,
        css: `nav a:hover,
nav a:focus-visible {
  background-color: gold;
  color: black;
}
`
      },
      pistas: [
        "Escribe los dos selectores, nav a:hover y nav a:focus-visible, separados por una coma antes de la llave. Dentro van las dos propiedades.",
        "Debe quedarte así:\nnav a:hover,\nnav a:focus-visible {\n  background-color: gold;\n  color: black;\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Solo los hijos directos: el combinador >",
      texto: "Muchos menús tienen **submenús**: una lista dentro de otra. Y ahí el selector del espacio se pasa de listo: `.menu li` elige **todos** los `li` de dentro, también los del submenú.\n\nUn **combinador** es el símbolo que une dos selectores (el espacio es uno). El **combinador hijo** `>` es más estricto: `.menu > li` significa «los `li` que son **hijos directos** de `.menu`», justo un nivel por debajo. Los nietos no cuentan.\n\nEn el ejemplo, solo las opciones principales llevan la raya roja; Dulces y Saladas se quedan sin ella. 👨‍👧",
      ejemplo: {
        html: `<ul class="menu">
  <li><a href="#inicio">Inicio</a></li>
  <li><a href="#recetas">Recetas</a>
    <ul>
      <li><a href="#dulces">Dulces</a></li>
      <li><a href="#saladas">Saladas</a></li>
    </ul>
  </li>
  <li><a href="#contacto">Contacto</a></li>
</ul>`,
        css: `.menu > li {
  border-left: 6px solid tomato;
  padding-left: 8px;
  margin-bottom: 6px;
}`
      },
      consejo: "¿Recuerdas el esqueleto **nav ▸ ul ▸ li ▸ a**? En CSS se escribe tal cual: `nav > ul > li > a`. Cada `>` baja **un solo** nivel. Los espacios alrededor del `>` son opcionales: `.menu>li` también vale."
    },
    {
      tipo: "ejercicio",
      enunciado: "Este menú de juegos 🎮 tiene un submenú dentro de **Juegos**. Pon una raya **solo a las opciones principales**: al selector `.menu > li` ponle `border-left` con el valor `6px solid tomato`.\n\nOjo: si usas el espacio (`.menu li`) en vez de `>`, la raya saldrá también en Puzles y Carreras… y no es eso lo que se pide.",
      cssBase: `body { font-family: sans-serif; }
.menu { list-style: none; padding: 0; }
.menu ul { list-style: none; padding-left: 20px; }
.menu li { padding: 4px 8px; margin-bottom: 4px; }
.menu a { color: #264653; font-weight: bold; text-decoration: none; }`,
      inicial: {
        html: `<ul class="menu">
  <li><a href="#inicio">Inicio</a></li>
  <li><a href="#juegos">Juegos</a>
    <ul>
      <li><a href="#puzles">Puzles</a></li>
      <li><a href="#carreras">Carreras</a></li>
    </ul>
  </li>
  <li><a href="#ranking">Ranking</a></li>
</ul>
`,
        css: ""
      },
      solucion: {
        html: `<ul class="menu">
  <li><a href="#inicio">Inicio</a></li>
  <li><a href="#juegos">Juegos</a>
    <ul>
      <li><a href="#puzles">Puzles</a></li>
      <li><a href="#carreras">Carreras</a></li>
    </ul>
  </li>
  <li><a href="#ranking">Ranking</a></li>
</ul>
`,
        css: `.menu > li {
  border-left: 6px solid tomato;
}
`
      },
      pistas: [
        "Usa el combinador hijo entre .menu y li: así solo eliges los li que están justo un nivel por debajo de .menu.",
        "Debe quedarte así:\n.menu > li {\n  border-left: 6px solid tomato;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "La barra ya es flex. Prueba a repartir el logo y el menú con `justify-content` (fíjate en `space-between`: logo a un lado y menú al otro, el diseño más típico) y cambia el hueco entre enlaces.",
      html: `<header class="barra">
  <span class="logo">🚀 Cohetes</span>
  <nav>
    <ul class="menu">
      <li><a class="activo" href="#inicio">Inicio</a></li>
      <li><a href="#viajes">Viajes</a></li>
      <li><a href="#contacto">Contacto</a></li>
    </ul>
  </nav>
</header>`,
      cssBase: `body { font-family: sans-serif; }
.barra { display: flex; align-items: center; padding: 10px 14px; background-color: #1d3557; border-radius: 10px; }
.logo { color: white; font-weight: bold; font-size: 18px; }
.menu { list-style: none; padding: 0; margin: 0; display: flex; }
.menu a { display: block; padding: 6px 10px; color: white; text-decoration: none; border-radius: 6px; }
.menu .activo { background-color: #e63946; }`,
      controles: [
        { selector: ".barra", propiedad: "justify-content", tipo: "opciones", opciones: ["flex-start", "center", "space-between", "flex-end"], valor: "flex-start" },
        { selector: ".menu", propiedad: "gap", tipo: "rango", min: 0, max: 30, valor: 4, unidad: "px" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "¿Para qué sirve :focus-visible en los enlaces de un menú?",
      opciones: [
        "Para resaltar el enlace al que llegas navegando con el teclado (tecla Tab)",
        "Para marcar el enlace de la página en la que estás",
        "Para que el menú solo se vea en el móvil"
      ],
      correcta: 0,
      explicacion: ":focus-visible se activa cuando llegas a un enlace con el teclado. La página en la que estás se marca con una clase, como .activo, que pones tú en el HTML."
    },
    {
      tipo: "reto",
      enunciado: "Monta el menú de **Receteando**, tu web de recetas 🍳. El HTML ya está hecho; en la pestaña **CSS**:\n\n1. En la `.barra`, pon el logo a la **izquierda** y el menú a la **derecha** con Flexbox.\n2. Quita las viñetas al `.menu`, también su relleno y su margen, y pon sus enlaces **en fila**.\n3. Resalta el enlace `.activo` con **otro fondo**.\n4. Haz que los enlaces del menú cambien de fondo al **pasar el ratón** y al **llegar con el teclado** (Tab).",
      pestana: "css",
      cssBase: `body { font-family: sans-serif; background-color: #fff8f0; }`,
      inicial: {
        html: `<header class="barra">
  <a class="logo" href="#inicio">🍳 Receteando</a>
  <nav>
    <ul class="menu">
      <li><a href="#inicio">Inicio</a></li>
      <li><a class="activo" href="#recetas">Recetas</a></li>
      <li><a href="#postres">Postres</a></li>
      <li><a href="#contacto">Contacto</a></li>
    </ul>
  </nav>
</header>
`,
        css: `.barra {
  padding: 10px 16px;
  background-color: #2b2d42;
  border-radius: 12px;
  /* 1. Logo a la izquierda y menú a la derecha (Flexbox) */
}

.logo {
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
}

.menu {
  /* 2. Sin viñetas, sin relleno ni margen y los enlaces en fila */
}

.menu a {
  display: block;
  padding: 8px 12px;
  color: white;
  text-decoration: none;
  border-radius: 8px;
}

/* 3. El enlace .activo, con otro fondo */

/* 4. Enlaces del menú con el ratón encima o con el foco del teclado */
`
      },
      comprobaciones: [
        {
          texto: "La `.barra` usa Flexbox con el logo a la izquierda y el menú a la derecha",
          prueba: (doc, win) => {
            const barra = doc.querySelector(".barra");
            const logo = doc.querySelector(".barra .logo");
            const nav = doc.querySelector(".barra nav");
            if (!barra || !logo || !nav) return false;
            const rb = barra.getBoundingClientRect();
            const rl = logo.getBoundingClientRect();
            const rn = nav.getBoundingClientRect();
            return win.getComputedStyle(barra).display === "flex"
              && rl.left - rb.left < 40 && rb.right - rn.right < 40 && rn.left > rl.right;
          }
        },
        {
          texto: "El menú no tiene viñetas y sus enlaces están en fila",
          prueba: (doc, win) => {
            const lis = [...doc.querySelectorAll(".menu li")];
            const enlaces = [...doc.querySelectorAll(".menu a")];
            if (lis.length < 2 || enlaces.length < 2) return false;
            const arriba = enlaces.map(a => a.getBoundingClientRect().top);
            return lis.every(li => win.getComputedStyle(li).listStyleType === "none")
              && arriba.every(t => Math.abs(t - arriba[0]) <= 1);
          }
        },
        {
          texto: "El enlace `.activo` tiene un fondo distinto al de los demás enlaces",
          prueba: (doc, win) => {
            const activo = doc.querySelector(".menu .activo");
            const otro = doc.querySelector(".menu a:not(.activo)");
            if (!activo || !otro) return false;
            const fa = win.getComputedStyle(activo).backgroundColor;
            return fa !== "rgba(0, 0, 0, 0)" && fa !== win.getComputedStyle(otro).backgroundColor;
          }
        },
        {
          texto: "Los enlaces del menú cambian de fondo al pasar el ratón (`:hover`) y al llegar con el teclado (`:focus-visible`)",
          prueba: async (doc, win) => {
            const enlace = doc.querySelector(".menu a:not(.activo)");
            if (!enlace) return false;
            const normal = win.getComputedStyle(enlace).backgroundColor;
            const cambia = async estado => {
              const v = await PRUEBA.clonar(doc, { estado });
              const copia = v.doc.querySelector(".menu a:not(.activo)");
              return !!copia && v.win.getComputedStyle(copia).backgroundColor !== normal;
            };
            return (await cambia("hover")) && (await cambia("focus"));
          }
        }
      ],
      pistas: [
        "La .barra necesita display: flex y justify-content: space-between (con align-items: center queda centrada en vertical). En .menu: list-style, padding, margin y display: flex. Para el punto 4, una regla con dos selectores separados por coma: .menu a:hover y .menu a:focus-visible.",
        "Añade en .barra:\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\nEn .menu:\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  gap: 8px;\nY debajo:\n.activo {\n  background-color: tomato;\n}\n.menu a:hover,\n.menu a:focus-visible {\n  background-color: #8d99ae;\n}"
      ],
      solucion: {
        html: `<header class="barra">
  <a class="logo" href="#inicio">🍳 Receteando</a>
  <nav>
    <ul class="menu">
      <li><a href="#inicio">Inicio</a></li>
      <li><a class="activo" href="#recetas">Recetas</a></li>
      <li><a href="#postres">Postres</a></li>
      <li><a href="#contacto">Contacto</a></li>
    </ul>
  </nav>
</header>
`,
        css: `.barra {
  padding: 10px 16px;
  background-color: #2b2d42;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 8px;
}

.menu a {
  display: block;
  padding: 8px 12px;
  color: white;
  text-decoration: none;
  border-radius: 8px;
}

.activo {
  background-color: tomato;
}

.menu a:hover,
.menu a:focus-visible {
  background-color: #8d99ae;
}
`
      }
    }
  ]
});
