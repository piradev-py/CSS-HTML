/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-11
   Proyecto: landing page (I) — planificar las secciones,
   contenedor central reutilizable, cabecera con navegación,
   sección hero a pantalla completa y botón de llamada a la acción.
   La landing es de «Patitas», una app ficticia para adoptar
   mascotas; la lección hc-12 la termina.
   Notas:
   - El contenedor usa max-width: 720px. Es más estrecho que el
     marco de revisión (800 px) a propósito: así se nota si falta
     margin: 0 auto (los márgenes calculados dejan de ser 0).
   - min-height: 100vh dentro del resultado = alto del iframe.
   - En el reto, las medidas a 1280 px usan clientWidth (sin la
     barra de desplazamiento) para comprobar el centrado.
   ============================================================ */
CURSO.registrar({
  id: "hc-11",
  titulo: "Proyecto: landing page (I)",
  xp: 60,
  objetivo: "Sabrás planificar una landing page por secciones y maquetar su cabecera y su portada (hero) con un botón de llamada a la acción.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Antes de picar código: el plano",
      texto: "Una **landing page** («página de aterrizaje») es la página a la que llegas desde un anuncio o un enlace. Tiene **un solo objetivo**: convencerte de hacer algo, como descargar una app.\n\nEn esta lección y en la siguiente vas a construir la de **Patitas** 🐾, una app (inventada) para adoptar mascotas. Antes de escribir código, los profesionales dibujan un **plano** con las secciones, de arriba abajo:\n\n1. **Cabecera**: logo y menú.\n2. **Hero**: la portada, con un título enorme y un botón.\n3. **Características**, **testimonios** y **pie**: los harás en la próxima lección.\n\nCada zona con su etiqueta semántica: `header`, `main`, `section`, `footer`.",
      ejemplo: {
        html: `<header class="zona">Cabecera: logo y menú</header>
<main>
  <section class="zona hero">Hero: título grande y botón</section>
  <section class="zona">Características</section>
  <section class="zona">Testimonios</section>
</main>
<footer class="zona">Pie de página</footer>`,
        css: `.zona {
  border: 2px dashed tomato;
  padding: 12px;
  margin: 6px;
  text-align: center;
  font-family: sans-serif;
}
.hero {
  padding: 40px 12px;
  background-color: #ffe8cc;
}`
      },
      consejo: "Un plano en papel con cajas y flechas vale oro: cuando sepas qué cajas hay y cómo se colocan, el código sale casi solo. ✏️"
    },
    {
      tipo: "explicacion",
      titulo: "Un contenedor para todas las secciones",
      texto: "El fondo de cada sección suele ir de **lado a lado** de la pantalla, pero el contenido no: en una pantalla enorme, leer líneas larguísimas cansa. 😵\n\nEl truco: dentro de cada sección metes un `<div class=\"contenedor\">` con tres propiedades que ya conoces:\n\n• `max-width`: como mucho, este ancho.\n• `margin: 0 auto`: centrado.\n• `padding: 0 16px`: un poco de aire a los lados en el móvil.\n\nEs como un mantel (la sección) con el plato centrado encima (el contenedor) 🍽️. Lo escribes **una vez** y lo reutilizas en todas las secciones: así todo queda alineado en la misma columna.",
      ejemplo: {
        html: `<section class="franja">
  <div class="contenedor">
    <p>El fondo llega de lado a lado, pero el texto se queda en el centro.</p>
  </div>
</section>
<section class="otra">
  <div class="contenedor">
    <p>En esta sección, el mismo contenedor: todo alineado.</p>
  </div>
</section>`,
        css: `.contenedor {
  max-width: 300px;
  margin: 0 auto;
  padding: 0 16px;
}
.franja {
  background-color: #ffe8cc;
  padding: 4px 0;
}
.otra {
  background-color: #d3f9d8;
  padding: 4px 0;
}`
      },
      consejo: "En el ejemplo usamos `300px` para que se note en el resultado. En la landing de Patitas usarás `720px`."
    },
    {
      tipo: "ejercicio",
      enunciado: "Empieza la landing de **Patitas** 🐾 con su contenedor. El HTML ya está escrito (las líneas discontinuas te enseñan dónde está cada contenedor).\n\nAl selector `.contenedor` ponle:\n\n• `max-width` con el valor `720px`\n• `margin` con el valor `0 auto`\n• `padding` con el valor `0 16px`",
      cssBase: `body { margin: 0; font-family: sans-serif; color: #3d2c29; background-color: #fffaf3; }
.cabecera { background-color: white; padding: 12px 0; box-shadow: 0 2px 8px rgb(0 0 0 / 0.08); }
.logo { font-size: 22px; font-weight: bold; color: #c2410c; text-decoration: none; }
.aviso { background-color: #ffe8cc; }
.aviso p { margin: 0; padding: 16px 0; }
.contenedor { outline: 2px dashed #f4a261; }`,
      inicial: {
        html: `<header class="cabecera">
  <div class="contenedor">
    <a href="#" class="logo">🐾 Patitas</a>
  </div>
</header>
<section class="aviso">
  <div class="contenedor">
    <p>¡Más de 300 mascotas esperan un hogar!</p>
  </div>
</section>
`,
        css: ""
      },
      solucion: {
        html: `<header class="cabecera">
  <div class="contenedor">
    <a href="#" class="logo">🐾 Patitas</a>
  </div>
</header>
<section class="aviso">
  <div class="contenedor">
    <p>¡Más de 300 mascotas esperan un hogar!</p>
  </div>
</section>
`,
        css: `.contenedor {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 16px;
}
`
      },
      pistas: [
        "Una sola regla para .contenedor con tres propiedades. margin y padding llevan dos valores cada una: el primero es arriba y abajo; el segundo, los lados.",
        "Debe quedarte así:\n.contenedor {\n  max-width: 720px;\n  margin: 0 auto;\n  padding: 0 16px;\n}"
      ]
    },
    {
      tipo: "ejercicio",
      enunciado: "Ahora la cabecera, como aprendiste en «Barra de navegación»: el logo a la izquierda y el menú a la derecha. El contenedor ya está hecho.\n\n• Al selector `.cabecera .contenedor` ponle `display` con el valor `flex`, `justify-content` con el valor `space-between` y `align-items` con el valor `center`.\n• Al selector `nav ul` ponle `display` con el valor `flex`, `gap` con el valor `20px` y `list-style` con el valor `none`.",
      cssBase: `body { margin: 0; font-family: sans-serif; color: #3d2c29; background-color: #fffaf3; }
.contenedor { max-width: 720px; margin: 0 auto; padding: 0 16px; }
.cabecera { background-color: white; padding: 12px 0; box-shadow: 0 2px 8px rgb(0 0 0 / 0.08); }
.logo { font-size: 22px; font-weight: bold; color: #c2410c; text-decoration: none; }
nav ul { margin: 0; padding: 0; }
nav a { color: #3d2c29; font-weight: bold; text-decoration: none; }`,
      inicial: {
        html: `<header class="cabecera">
  <div class="contenedor">
    <a href="#" class="logo">🐾 Patitas</a>
    <nav>
      <ul>
        <li><a href="#como">Cómo funciona</a></li>
        <li><a href="#mascotas">Mascotas</a></li>
        <li><a href="#opiniones">Opiniones</a></li>
      </ul>
    </nav>
  </div>
</header>
`,
        css: ""
      },
      solucion: {
        html: `<header class="cabecera">
  <div class="contenedor">
    <a href="#" class="logo">🐾 Patitas</a>
    <nav>
      <ul>
        <li><a href="#como">Cómo funciona</a></li>
        <li><a href="#mascotas">Mascotas</a></li>
        <li><a href="#opiniones">Opiniones</a></li>
      </ul>
    </nav>
  </div>
</header>
`,
        css: `.cabecera .contenedor {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav ul {
  display: flex;
  gap: 20px;
  list-style: none;
}
`
      },
      pistas: [
        "Son dos reglas con Flexbox. La primera reparte el logo y el menú a los extremos (space-between) y los centra en vertical. La segunda pone los enlaces en fila, separados, y sin viñetas.",
        "Debe quedarte así:\n.cabecera .contenedor {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\nnav ul {\n  display: flex;\n  gap: 20px;\n  list-style: none;\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "El hero: una portada a pantalla completa",
      texto: "El **hero** es la gran portada de la landing: lo primero que ves. Lleva un título enorme, una frase corta y un botón. Suele ocupar **toda la pantalla**:\n\n• `min-height: 100vh`: como mínimo, todo el alto de la ventana. Usamos `min-height` y no `height` para que, si el texto no cabe (en un móvil, por ejemplo), la caja **crezca** en vez de desbordarse.\n• Flexbox en columna (`flex-direction: column`) con `justify-content: center` y `align-items: center`, para centrar el contenido en los dos sentidos.\n\nAquí la «ventana» es el recuadro del resultado: el hero lo llena entero. 🦸",
      ejemplo: {
        html: `<section class="hero">
  <h1>Haz amigos peludos</h1>
  <p>Tu próxima aventura tiene cuatro patas.</p>
</section>`,
        css: `body {
  margin: 0;
  font-family: sans-serif;
}
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffe8cc;
}`
      },
      consejo: "¿Por qué `body { margin: 0; }`? El navegador le pone un pequeño margen al `body` y, sin quitarlo, el hero no llegaría a los bordes."
    },
    {
      tipo: "ejercicio",
      enunciado: "Convierte la portada de Patitas en un hero a pantalla completa con el contenido centrado.\n\nAl selector `.hero` ponle:\n\n• `min-height` con el valor `100vh`\n• `display` con el valor `flex`\n• `flex-direction` con el valor `column`\n• `justify-content` con el valor `center`\n• `align-items` con el valor `center`",
      cssBase: `body { margin: 0; font-family: sans-serif; color: #3d2c29; background-color: #fffaf3; }
.hero { background-color: #ffe8cc; text-align: center; padding: 32px 16px; box-sizing: border-box; }
.hero h1 { font-size: 40px; margin: 0 0 12px; }
.hero p { font-size: 20px; margin: 0 0 24px; }
.boton { padding: 14px 28px; background-color: #c2410c; color: white; font-weight: bold; text-decoration: none; border-radius: 30px; }`,
      inicial: {
        html: `<section class="hero">
  <h1>Encuentra a tu nuevo mejor amigo</h1>
  <p>Cientos de perros y gatos esperan un hogar cerca de ti.</p>
  <a href="#" class="boton">Descarga la app</a>
</section>
`,
        css: ""
      },
      solucion: {
        html: `<section class="hero">
  <h1>Encuentra a tu nuevo mejor amigo</h1>
  <p>Cientos de perros y gatos esperan un hogar cerca de ti.</p>
  <a href="#" class="boton">Descarga la app</a>
</section>
`,
        css: `.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
`
      },
      pistas: [
        "Una sola regla para .hero con cinco propiedades: la altura mínima en vh y las cuatro de Flexbox para ponerlo en columna y centrarlo.",
        "Debe quedarte así:\n.hero {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "El botón de llamada a la acción",
      texto: "El botón del hero tiene nombre propio: **llamada a la acción** (en inglés, *call to action* o CTA). Es lo que quieres que haga el visitante: «Descarga la app», «Apúntate»…\n\nCasi siempre es un enlace `<a>` vestido de botón, porque lleva a otra página. Para que **destaque**:\n\n• Un color de fondo que contraste con el resto, y texto que se lea bien encima.\n• `padding` generoso y esquinas redondeadas.\n• `text-decoration: none` para quitar el subrayado.\n• Un cambio en `:hover` (con una `transition` suave) y un foco visible.\n\nUna página, **un** botón protagonista. Si todo destaca, nada destaca. 😉",
      ejemplo: {
        html: `<a href="#" class="boton">Descarga la app</a>`,
        css: `body {
  font-family: sans-serif;
  padding: 24px;
}
.boton {
  padding: 14px 28px;
  background-color: #c2410c;
  color: white;
  font-weight: bold;
  text-decoration: none;
  border-radius: 30px;
  transition: background-color 0.3s ease-in-out;
}
.boton:hover {
  background-color: #9a3412;
}
.boton:focus-visible {
  outline: 3px solid #f4a261;
}`
      }
    },
    {
      tipo: "ejercicio",
      enunciado: "Viste de botón el enlace «Descarga la app».\n\n• Al selector `.boton` ponle `padding` de `14px 28px`, `background-color` de `#c2410c`, `color` de `white`, `text-decoration` de `none` y `border-radius` de `30px`.\n• Al selector `.boton:hover` ponle `background-color` de `#9a3412`.",
      cssBase: `body { margin: 0; font-family: sans-serif; color: #3d2c29; background-color: #fffaf3; }
.hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #ffe8cc; text-align: center; padding: 32px 16px; box-sizing: border-box; }
.hero h1 { font-size: 40px; margin: 0 0 12px; }
.hero p { font-size: 20px; margin: 0 0 24px; }
.boton { font-weight: bold; }`,
      inicial: {
        html: `<section class="hero">
  <h1>Encuentra a tu nuevo mejor amigo</h1>
  <p>Cientos de perros y gatos esperan un hogar cerca de ti.</p>
  <a href="#" class="boton">Descarga la app</a>
</section>
`,
        css: ""
      },
      solucion: {
        html: `<section class="hero">
  <h1>Encuentra a tu nuevo mejor amigo</h1>
  <p>Cientos de perros y gatos esperan un hogar cerca de ti.</p>
  <a href="#" class="boton">Descarga la app</a>
</section>
`,
        css: `.boton {
  padding: 14px 28px;
  background-color: #c2410c;
  color: white;
  text-decoration: none;
  border-radius: 30px;
}
.boton:hover {
  background-color: #9a3412;
}
`
      },
      pistas: [
        "Son dos reglas: .boton con cinco propiedades y .boton:hover (sin espacio antes de los dos puntos) con un color de fondo más oscuro.",
        "Debe quedarte así:\n.boton {\n  padding: 14px 28px;\n  background-color: #c2410c;\n  color: white;\n  text-decoration: none;\n  border-radius: 30px;\n}\n.boton:hover {\n  background-color: #9a3412;\n}"
      ]
    },
    {
      tipo: "quiz",
      pregunta: "¿Por qué el hero usa min-height: 100vh y no height: 100vh?",
      opciones: [
        "Para que, si el contenido no cabe, la caja crezca en vez de desbordarse",
        "Porque height no funciona con la unidad vh",
        "Para que el hero sea más bajo que la pantalla"
      ],
      correcta: 0,
      explicacion: "min-height es un mínimo: la caja mide al menos toda la pantalla, pero puede crecer si el texto lo necesita (por ejemplo, en un móvil estrecho). Con height quedaría fija y el texto se saldría."
    },
    {
      tipo: "reto",
      enunciado: "🐾 ¡Monta la cabecera y el hero de Patitas! El HTML ya está escrito y el menú ya tiene su estilo. Tú escribe:\n\n1. El `.contenedor`: `max-width` de `720px`, centrado con `margin: 0 auto` y con `padding: 0 16px`.\n2. La `.cabecera .contenedor` con Flexbox: logo a la izquierda, menú a la derecha y los dos centrados en vertical.\n3. El `.hero` a pantalla completa (`min-height: 100vh`) y con su contenido centrado con Flexbox en columna.\n4. El `.boton` de llamada a la acción con color de fondo, texto blanco, sin subrayado, esquinas redondeadas… y un color de fondo distinto en `:hover`.",
      cssBase: `body { margin: 0; font-family: sans-serif; color: #3d2c29; background-color: #fffaf3; }
.cabecera { background-color: white; padding: 12px 0; box-shadow: 0 2px 8px rgb(0 0 0 / 0.08); }
.logo { font-size: 22px; font-weight: bold; color: #c2410c; text-decoration: none; }
nav a { color: #3d2c29; font-weight: bold; text-decoration: none; }
.hero { background-color: #ffe8cc; text-align: center; padding: 32px 16px; box-sizing: border-box; }
.hero h1 { font-size: 40px; margin: 0 0 12px; }
.hero p { font-size: 20px; margin: 0 0 24px; }
.boton { font-weight: bold; }`,
      inicial: {
        html: `<header class="cabecera">
  <div class="contenedor">
    <a href="#" class="logo">🐾 Patitas</a>
    <nav>
      <ul>
        <li><a href="#como">Cómo funciona</a></li>
        <li><a href="#mascotas">Mascotas</a></li>
        <li><a href="#opiniones">Opiniones</a></li>
      </ul>
    </nav>
  </div>
</header>

<main>
  <section class="hero">
    <h1>Encuentra a tu nuevo mejor amigo</h1>
    <p>Cientos de perros y gatos esperan un hogar cerca de ti.</p>
    <a href="#" class="boton">Descarga la app</a>
  </section>
</main>
`,
        css: `/* 1. Contenedor central */
.contenedor {

}

/* 2. Cabecera: logo a la izquierda y menú a la derecha */
.cabecera .contenedor {

}

nav ul {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* 3. Hero a pantalla completa con el contenido centrado */
.hero {

}

/* 4. Botón de llamada a la acción (y su :hover) */
.boton {

}
`
      },
      comprobaciones: [
        {
          texto: "El `.contenedor` tiene un ancho máximo y se queda centrado (se mira en una pantalla ancha, de 1280 px)",
          prueba: async (doc) => {
            const v = await PRUEBA.clonar(doc, { ancho: 1280 });
            const c = v.doc.querySelector(".cabecera .contenedor");
            if (!c) return false;
            const r = c.getBoundingClientRect();
            const ancho = v.doc.documentElement.clientWidth;
            return r.width < ancho - 100 && Math.abs(r.left - (ancho - r.right)) < 3;
          }
        },
        {
          texto: "En la cabecera, el logo queda a la izquierda y el menú a la derecha, en la misma fila",
          prueba: (doc) => {
            const logo = doc.querySelector(".cabecera .logo");
            const nav = doc.querySelector(".cabecera nav");
            const c = doc.querySelector(".cabecera .contenedor");
            if (!logo || !nav || !c) return false;
            const a = logo.getBoundingClientRect();
            const b = nav.getBoundingClientRect();
            const r = c.getBoundingClientRect();
            const mismaFila = a.top < b.bottom && b.top < a.bottom;
            return mismaFila && a.right <= b.left && b.right > r.right - 40;
          }
        },
        {
          texto: "El `.hero` ocupa como mínimo todo el alto de la pantalla y su contenido está centrado",
          prueba: (doc, win) => {
            const h = doc.querySelector(".hero");
            const t = doc.querySelector(".hero h1");
            const b = doc.querySelector(".hero .boton");
            if (!h || !t || !b) return false;
            const rh = h.getBoundingClientRect();
            const rb = b.getBoundingClientRect();
            const centroH = rh.left + rh.width / 2;
            const centroB = rb.left + rb.width / 2;
            return rh.height >= win.innerHeight - 2
              && t.getBoundingClientRect().top - rh.top > 80
              && Math.abs(centroH - centroB) < 4;
          }
        },
        {
          texto: "El `.boton` tiene color de fondo y cambia de color al pasar el ratón",
          prueba: async (doc, win) => {
            const b = doc.querySelector(".boton");
            if (!b) return false;
            const normal = win.getComputedStyle(b).backgroundColor;
            if (normal === "rgba(0, 0, 0, 0)" || normal === "transparent") return false;
            const v = await PRUEBA.clonar(doc, { estado: "hover" });
            const copia = v.doc.querySelector(".boton");
            if (!copia) return false;
            const encima = v.win.getComputedStyle(copia).backgroundColor;
            return encima !== normal && encima !== "rgba(0, 0, 0, 0)";
          }
        }
      ],
      pistas: [
        "Repasa los ejercicios de esta lección: el contenedor lleva max-width, margin y padding; la cabecera, Flexbox con space-between; el hero, min-height en vh y Flexbox en columna centrado; y el botón necesita además una regla .boton:hover.",
        "Te debe quedar así:\n.contenedor { max-width: 720px; margin: 0 auto; padding: 0 16px; }\n.cabecera .contenedor { display: flex; justify-content: space-between; align-items: center; }\n.hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; }\n.boton { padding: 14px 28px; background-color: #c2410c; color: white; text-decoration: none; border-radius: 30px; }\n.boton:hover { background-color: #9a3412; }"
      ],
      solucion: {
        html: `<header class="cabecera">
  <div class="contenedor">
    <a href="#" class="logo">🐾 Patitas</a>
    <nav>
      <ul>
        <li><a href="#como">Cómo funciona</a></li>
        <li><a href="#mascotas">Mascotas</a></li>
        <li><a href="#opiniones">Opiniones</a></li>
      </ul>
    </nav>
  </div>
</header>

<main>
  <section class="hero">
    <h1>Encuentra a tu nuevo mejor amigo</h1>
    <p>Cientos de perros y gatos esperan un hogar cerca de ti.</p>
    <a href="#" class="boton">Descarga la app</a>
  </section>
</main>
`,
        css: `/* 1. Contenedor central */
.contenedor {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 16px;
}

/* 2. Cabecera: logo a la izquierda y menú a la derecha */
.cabecera .contenedor {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav ul {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* 3. Hero a pantalla completa con el contenido centrado */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 4. Botón de llamada a la acción (y su :hover) */
.boton {
  padding: 14px 28px;
  background-color: #c2410c;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  transition: background-color 0.3s ease-in-out;
}

.boton:hover {
  background-color: #9a3412;
}
`
      }
    }
  ]
});
