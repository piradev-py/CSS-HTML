/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-12 (última del mundo)
   Proyecto: landing page (II) — sección de características en
   Grid (mobile first), testimonios, pie de página y repaso de
   responsive y accesibilidad. Termina la landing de «Patitas»
   empezada en hc-11: el inicial del reto es esa landing ya hecha.
   Notas:
   - Punto de corte en 700 px: el revisor de ejercicios compara a
     375, 800 y 1280 px, así que cruza el corte.
   - El reto mira las tarjetas a 800 px (marco normal) y a 375 px
     con PRUEBA.clonar({ ancho: 375 }).
   - Las imágenes del reto empiezan SIN alt a propósito: el alumno
     las arregla como parte del repaso de accesibilidad.
   ============================================================ */
CURSO.registrar({
  id: "hc-12",
  titulo: "Proyecto: landing page (II)",
  xp: 60,
  objetivo: "Sabrás completar una landing page con características en Grid, testimonios y pie de página, y revisar que se adapte al móvil y sea accesible.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Características en una cuadrícula",
      texto: "Debajo del hero, la landing explica qué ofrece la app: son las **características**. Tres tarjetas en fila quedan genial en un ordenador, pero en un móvil no caben: allí van una debajo de otra.\n\nLo harás **mobile first**, como ya sabes:\n\n1. Fuera de cualquier `@media`, el estilo del móvil: una rejilla de Grid con `display: grid` y `gap`. Si no le dices cuántas columnas, Grid hace **una sola**.\n2. Dentro de `@media (min-width: 700px)`, a partir de 700 px de ancho, **tres** columnas con `repeat(3, 1fr)`.\n\nPulsa 📱 en el resultado para verlo como en un móvil.",
      dispositivos: true,
      ejemplo: {
        html: `<div class="rejilla">
  <article class="tarjeta">🔍 Busca</article>
  <article class="tarjeta">💬 Conoce</article>
  <article class="tarjeta">🏡 Adopta</article>
</div>`,
        css: `.rejilla {
  display: grid;
  gap: 16px;
}
@media (min-width: 700px) {
  .rejilla {
    grid-template-columns: repeat(3, 1fr);
  }
}
.tarjeta {
  background-color: #ffe8cc;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  font-family: sans-serif;
}`
      },
      consejo: "Cada tarjeta es un `<article>` porque tiene sentido por sí sola. ¿Ves? El HTML semántico sigue contando aunque ahora estemos con el diseño."
    },
    {
      tipo: "ejercicio",
      enunciado: "Monta la sección de características de Patitas 🐾. El HTML ya está escrito.\n\n• Al selector `.rejilla` ponle `display` con el valor `grid` y `gap` con el valor `16px`.\n• Debajo, escribe `@media (min-width: 700px)` y, dentro, al selector `.rejilla` ponle `grid-template-columns` con el valor `repeat(3, 1fr)`.\n\nPrueba los botones 💻 y 📱 del resultado.",
      dispositivos: true,
      cssBase: `body { margin: 0; font-family: sans-serif; color: #3d2c29; background-color: #fffaf3; }
.contenedor { max-width: 720px; margin: 0 auto; padding: 0 16px; }
.caracteristicas { padding: 24px 0; }
.caracteristicas h2 { text-align: center; }
.tarjeta { background-color: white; padding: 16px; border-radius: 12px; box-shadow: 0 2px 8px rgb(0 0 0 / 0.08); text-align: center; }
.tarjeta h3 { margin: 0 0 8px; }
.tarjeta p { margin: 0; }`,
      inicial: {
        html: `<section class="caracteristicas">
  <div class="contenedor">
    <h2>¿Cómo funciona?</h2>
    <div class="rejilla">
      <article class="tarjeta">
        <h3>🔍 Busca</h3>
        <p>Filtra por tamaño, edad y carácter.</p>
      </article>
      <article class="tarjeta">
        <h3>💬 Conoce</h3>
        <p>Habla con el refugio desde la app.</p>
      </article>
      <article class="tarjeta">
        <h3>🏡 Adopta</h3>
        <p>Te acompañamos en todo el proceso.</p>
      </article>
    </div>
  </div>
</section>
`,
        css: ""
      },
      solucion: {
        html: `<section class="caracteristicas">
  <div class="contenedor">
    <h2>¿Cómo funciona?</h2>
    <div class="rejilla">
      <article class="tarjeta">
        <h3>🔍 Busca</h3>
        <p>Filtra por tamaño, edad y carácter.</p>
      </article>
      <article class="tarjeta">
        <h3>💬 Conoce</h3>
        <p>Habla con el refugio desde la app.</p>
      </article>
      <article class="tarjeta">
        <h3>🏡 Adopta</h3>
        <p>Te acompañamos en todo el proceso.</p>
      </article>
    </div>
  </div>
</section>
`,
        css: `.rejilla {
  display: grid;
  gap: 16px;
}
@media (min-width: 700px) {
  .rejilla {
    grid-template-columns: repeat(3, 1fr);
  }
}
`
      },
      pistas: [
        "Primero la regla normal de .rejilla (eso es lo que se ve en el móvil). Después el @media con sus llaves, y dentro otra regla .rejilla con las tres columnas. Cuenta bien las llaves: el @media abre una y la regla de dentro, otra.",
        "Debe quedarte así:\n.rejilla {\n  display: grid;\n  gap: 16px;\n}\n@media (min-width: 700px) {\n  .rejilla {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Testimonios: lo que dicen los demás",
      texto: "Antes de descargar una app, todos miramos qué opinan los demás. Esas opiniones se llaman **testimonios**: una frase, quién la dice y, a menudo, su foto. Dan **confianza**. 🤝\n\nCada testimonio tiene sentido por sí solo, así que también va en un `<article>`. Para maquetarlo:\n\n• Flexbox para poner la foto **al lado** del texto, con `gap` y `align-items: center`.\n• La foto, cuadrada y con `border-radius: 50%` para que sea un círculo. `object-fit: cover` evita que se deforme al recortarla.\n\nY no olvides el `alt` de la foto: describe lo que se ve.",
      dispositivos: true,
      ejemplo: {
        html: `<article class="testimonio">
  <img src="recursos/img/perro.svg" alt="Toby, un perro marrón y sonriente">
  <div>
    <p>«Toby y yo salimos a correr cada mañana.»</p>
    <p class="autor">Marcos, adoptó a Toby</p>
  </div>
</article>`,
        css: `.testimonio {
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: sans-serif;
}
.testimonio img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}
.autor {
  font-weight: bold;
}`
      }
    },
    {
      tipo: "ejercicio",
      enunciado: "Maqueta el testimonio de Lucía. El HTML ya está escrito.\n\n• Al selector `.testimonio` ponle `display` de `flex`, `align-items` de `center` y `gap` de `16px`.\n• Al selector `.testimonio img` ponle `width` de `80px`, `height` de `80px`, `border-radius` de `50%` y `object-fit` de `cover`.",
      dispositivos: true,
      cssBase: `body { height: 100vh; margin: 0; padding: 16px; box-sizing: border-box; font-family: sans-serif; color: #3d2c29; background-color: #fffaf3; }
.testimonio { background-color: white; padding: 16px; border-radius: 12px; box-shadow: 0 2px 8px rgb(0 0 0 / 0.08); }
.testimonio p { margin: 4px 0; }
.autor { font-weight: bold; color: #c2410c; }`,
      inicial: {
        html: `<article class="testimonio">
  <img src="recursos/img/gato.svg" alt="Misi, una gata naranja">
  <div>
    <p>«Misi duerme cada noche en mi sofá. ¡Gracias, Patitas!»</p>
    <p class="autor">Lucía, adoptó a Misi</p>
  </div>
</article>
`,
        css: ""
      },
      solucion: {
        html: `<article class="testimonio">
  <img src="recursos/img/gato.svg" alt="Misi, una gata naranja">
  <div>
    <p>«Misi duerme cada noche en mi sofá. ¡Gracias, Patitas!»</p>
    <p class="autor">Lucía, adoptó a Misi</p>
  </div>
</article>
`,
        css: `.testimonio {
  display: flex;
  align-items: center;
  gap: 16px;
}
.testimonio img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}
`
      },
      pistas: [
        "Son dos reglas: .testimonio pone la foto y el texto en fila con Flexbox; .testimonio img (con un espacio: la imagen que está dentro del testimonio) la deja cuadrada, redonda y sin deformar.",
        "Debe quedarte así:\n.testimonio {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.testimonio img {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  object-fit: cover;\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "El pie de página",
      texto: "Toda buena historia tiene un final, y toda web, su **pie de página** (`<footer>`). Ahí va la letra pequeña: contacto, enlaces útiles, el aviso legal y el © con el año.\n\nSuele llevar un **fondo oscuro** con texto claro, para que se note que la página termina. Ojo con los enlaces: el azul de siempre casi no se ve sobre fondo oscuro, así que dales también un color claro.\n\nY dentro, el mismo `.contenedor` de siempre, para que quede alineado con el resto. 🎬",
      dispositivos: true,
      ejemplo: {
        html: `<footer class="pie">
  <p>🎸 Escuela de rock La Púa</p>
  <p><a href="#">Contacto</a> · <a href="#">Horarios</a></p>
  <p>© 2026 La Púa</p>
</footer>`,
        css: `.pie {
  background-color: #2b2d42;
  color: white;
  padding: 16px;
  text-align: center;
  font-family: sans-serif;
}
.pie a {
  color: #ffd166;
}`
      }
    },
    {
      tipo: "ejercicio",
      enunciado: "Cierra la landing con su pie de página. El HTML ya está escrito.\n\n• Al selector `.pie` ponle `background-color` de `#3d2c29`, `color` de `white`, `padding` de `24px 0` y `text-align` de `center`.\n• Al selector `.pie a` ponle `color` de `#ffd8a8`.",
      dispositivos: true,
      cssBase: `body { margin: 0; font-family: sans-serif; }
.contenedor { max-width: 720px; margin: 0 auto; padding: 0 16px; }
.pie p { margin: 8px 0; }`,
      inicial: {
        html: `<footer class="pie">
  <div class="contenedor">
    <p>🐾 Patitas · Hecho con cariño para los animales</p>
    <p><a href="#">Contacto</a> · <a href="#">Refugios</a> · <a href="#">Aviso legal</a></p>
    <p>© 2026 Patitas</p>
  </div>
</footer>
`,
        css: ""
      },
      solucion: {
        html: `<footer class="pie">
  <div class="contenedor">
    <p>🐾 Patitas · Hecho con cariño para los animales</p>
    <p><a href="#">Contacto</a> · <a href="#">Refugios</a> · <a href="#">Aviso legal</a></p>
    <p>© 2026 Patitas</p>
  </div>
</footer>
`,
        css: `.pie {
  background-color: #3d2c29;
  color: white;
  padding: 24px 0;
  text-align: center;
}
.pie a {
  color: #ffd8a8;
}
`
      },
      pistas: [
        "Son dos reglas: .pie con cuatro propiedades y .pie a (con espacio: los enlaces que están dentro del pie) con su color.",
        "Debe quedarte así:\n.pie {\n  background-color: #3d2c29;\n  color: white;\n  padding: 24px 0;\n  text-align: center;\n}\n.pie a {\n  color: #ffd8a8;\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Repaso final: responsive y accesible",
      texto: "Antes de publicar una web, los profesionales pasan una **lista de revisión** ✅:\n\n• **Móvil**: ¿se ve bien a 375 px? ¿Nada se sale por los lados?\n• **Imágenes**: todas con `alt` y con `max-width: 100%` para que nunca se salgan de su caja.\n• **Contraste**: texto oscuro sobre fondo claro (o al revés), que se lea sin esfuerzo. También los enlaces.\n• **Títulos en orden**: un solo `<h1>` y luego un `<h2>` para cada sección.\n• **Teclado**: pulsa Tab: ¿se ve siempre dónde está el foco?\n• **Movimiento**: si hay animaciones que se repiten, ¿respetas `prefers-reduced-motion`?\n\nEn el reto final pasarás esta lista a tu landing.",
      consejo: "No hace falta acertar a la primera: revisar es parte del trabajo. Hasta los profesionales encuentran cosas que arreglar cada vez que pasan la lista. 🔍"
    },
    {
      tipo: "quiz",
      pregunta: "Haces la web mobile first. ¿Dónde van los estilos que se ven en el móvil?",
      opciones: [
        "Fuera de cualquier @media, porque son la base",
        "Dentro de @media (min-width: 700px)",
        "En un archivo aparte que solo abren los móviles"
      ],
      correcta: 0,
      explicacion: "En mobile first, lo que está fuera de los @media es el diseño del móvil. Después, @media (min-width: …) añade cambios para las pantallas más anchas."
    },
    {
      tipo: "reto",
      enunciado: "🏆 **¡Jefe final del Mundo HTML + CSS!** Termina la landing de Patitas. La cabecera y el hero ya están hechos; ahora:\n\n1. **Características**: `.rejilla` con Grid de una columna en el móvil y, desde `@media (min-width: 700px)`, tres columnas.\n2. **Testimonios**: en cada `.testimonio`, la foto al lado del texto (Flexbox) y redonda: `width` y `height` de `80px`, `border-radius: 50%` y `object-fit: cover`.\n3. **Accesibilidad**: en el HTML, las dos fotos de los testimonios no tienen `alt`. Añádeselo describiendo a cada mascota.\n4. **Pie**: `.pie` con fondo oscuro (`#3d2c29`) y texto blanco, y sus enlaces (`.pie a`) en un color claro como `#ffd8a8`.\n\nCuando acabes, pulsa 📱 y repasa la lista: ¡tu landing está lista para el mundo! 🐾",
      dispositivos: true,
      cssBase: `body { margin: 0; font-family: sans-serif; color: #3d2c29; background-color: #fffaf3; }
.cabecera { background-color: white; padding: 12px 0; box-shadow: 0 2px 8px rgb(0 0 0 / 0.08); }
.logo { font-size: 22px; font-weight: bold; color: #c2410c; text-decoration: none; }
nav a { color: #3d2c29; font-weight: bold; text-decoration: none; }
.hero { background-color: #ffe8cc; text-align: center; padding: 32px 16px; box-sizing: border-box; }
.hero h1 { font-size: 40px; margin: 0 0 12px; }
.hero p { font-size: 20px; margin: 0 0 24px; }
.boton { font-weight: bold; }
.caracteristicas, .opiniones { padding: 40px 0; }
.caracteristicas h2, .opiniones h2 { text-align: center; margin-top: 0; }
.opiniones { background-color: #fff0e0; }
.tarjeta, .testimonio { background-color: white; padding: 16px; border-radius: 12px; box-shadow: 0 2px 8px rgb(0 0 0 / 0.08); }
.tarjeta { text-align: center; }
.tarjeta h3 { margin: 0 0 8px; }
.tarjeta p { margin: 0; }
.testimonio { margin-bottom: 16px; }
.testimonio p { margin: 4px 0; }
.autor { font-weight: bold; color: #c2410c; }
.pie p { margin: 8px 0; }`,
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

  <section class="caracteristicas" id="como">
    <div class="contenedor">
      <h2>¿Cómo funciona?</h2>
      <div class="rejilla">
        <article class="tarjeta">
          <h3>🔍 Busca</h3>
          <p>Filtra por tamaño, edad y carácter.</p>
        </article>
        <article class="tarjeta">
          <h3>💬 Conoce</h3>
          <p>Habla con el refugio desde la app.</p>
        </article>
        <article class="tarjeta">
          <h3>🏡 Adopta</h3>
          <p>Te acompañamos en todo el proceso.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="opiniones" id="opiniones">
    <div class="contenedor">
      <h2>Lo que dicen las familias</h2>
      <article class="testimonio">
        <img src="recursos/img/gato.svg">
        <div>
          <p>«Misi duerme cada noche en mi sofá. ¡Gracias, Patitas!»</p>
          <p class="autor">Lucía, adoptó a Misi</p>
        </div>
      </article>
      <article class="testimonio">
        <img src="recursos/img/perro.svg">
        <div>
          <p>«Toby y yo salimos a correr cada mañana.»</p>
          <p class="autor">Marcos, adoptó a Toby</p>
        </div>
      </article>
    </div>
  </section>
</main>

<footer class="pie">
  <div class="contenedor">
    <p>🐾 Patitas · Hecho con cariño para los animales</p>
    <p><a href="#">Contacto</a> · <a href="#">Refugios</a> · <a href="#">Aviso legal</a></p>
    <p>© 2026 Patitas</p>
  </div>
</footer>
`,
        css: `/* ===== Lo que hiciste en la lección anterior ===== */
.contenedor {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 16px;
}

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

.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

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

img {
  max-width: 100%;
}

/* ===== Lo nuevo ===== */

/* 1. Características: una columna en el móvil y tres desde 700px */
.rejilla {

}

/* 2. Testimonios: la foto redonda, al lado del texto */
.testimonio {

}

.testimonio img {

}

/* 4. Pie de página: fondo oscuro, texto blanco y enlaces claros */
.pie {

}
`
      },
      comprobaciones: [
        {
          texto: "Las 3 tarjetas de características van en fila en una pantalla ancha (800 px) y una debajo de otra en el móvil (375 px)",
          prueba: async (doc) => {
            const r = [...doc.querySelectorAll(".caracteristicas .tarjeta")].map(t => t.getBoundingClientRect());
            if (r.length < 3) return false;
            const enFila = r.every(x => Math.abs(x.top - r[0].top) < 2) && r[0].left < r[1].left && r[1].left < r[2].left;
            if (!enFila) return false;
            const v = await PRUEBA.clonar(doc, { ancho: 375 });
            const m = [...v.doc.querySelectorAll(".caracteristicas .tarjeta")].map(t => t.getBoundingClientRect());
            return m.length >= 3 && m[1].top >= m[0].bottom - 1 && m[2].top >= m[1].bottom - 1;
          }
        },
        {
          texto: "En cada testimonio, la foto es redonda y está al lado de su texto",
          prueba: (doc, win) => {
            const ts = [...doc.querySelectorAll(".testimonio")];
            if (!ts.length) return false;
            return ts.every(t => {
              const img = t.querySelector("img");
              const texto = img?.nextElementSibling;
              if (!img || !texto) return false;
              const a = img.getBoundingClientRect();
              const b = texto.getBoundingClientRect();
              const radio = win.getComputedStyle(img).borderTopLeftRadius;
              const redonda = radio === "50%" || parseFloat(radio) >= a.width / 2 - 1;
              const alLado = a.right <= b.left + 1 && a.top < b.bottom && b.top < a.bottom;
              return a.width > 0 && redonda && alLado;
            });
          }
        },
        {
          texto: "Todas las imágenes tienen un texto alternativo (`alt`) que las describe",
          prueba: (doc) => {
            const imgs = [...doc.querySelectorAll("img")];
            return imgs.length >= 2 && imgs.every(i => (i.getAttribute("alt") || "").trim().length > 0);
          }
        },
        {
          texto: "El pie de página tiene fondo oscuro, texto claro y enlaces de color claro",
          prueba: (doc, win) => {
            const pie = doc.querySelector(".pie");
            if (!pie) return false;
            const luz = c => {
              const n = (String(c).match(/[\d.]+/g) || []).map(Number);
              return 0.299 * (n[0] || 0) + 0.587 * (n[1] || 0) + 0.114 * (n[2] || 0);
            };
            const cs = win.getComputedStyle(pie);
            const fondo = cs.backgroundColor;
            if (fondo === "rgba(0, 0, 0, 0)" || fondo === "transparent") return false;
            const enlaces = [...pie.querySelectorAll("a")];
            return luz(fondo) < 100 && luz(cs.color) > 170
              && enlaces.length > 0 && enlaces.every(a => luz(win.getComputedStyle(a).color) > 150);
          }
        }
      ],
      pistas: [
        "Repasa los tres ejercicios de esta lección: la rejilla con Grid y un @media (min-width: 700px), el testimonio con Flexbox y la foto redonda, y el pie con fondo oscuro. Para el alt, busca las dos etiquetas <img> en el HTML.",
        "Te debe quedar así:\n.rejilla { display: grid; gap: 16px; }\n@media (min-width: 700px) {\n  .rejilla { grid-template-columns: repeat(3, 1fr); }\n}\n.testimonio { display: flex; align-items: center; gap: 16px; }\n.testimonio img { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; }\n.pie { background-color: #3d2c29; color: white; padding: 24px 0; text-align: center; }\n.pie a { color: #ffd8a8; }\nY en el HTML, por ejemplo: <img src=\"recursos/img/gato.svg\" alt=\"Misi, una gata naranja\">"
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

  <section class="caracteristicas" id="como">
    <div class="contenedor">
      <h2>¿Cómo funciona?</h2>
      <div class="rejilla">
        <article class="tarjeta">
          <h3>🔍 Busca</h3>
          <p>Filtra por tamaño, edad y carácter.</p>
        </article>
        <article class="tarjeta">
          <h3>💬 Conoce</h3>
          <p>Habla con el refugio desde la app.</p>
        </article>
        <article class="tarjeta">
          <h3>🏡 Adopta</h3>
          <p>Te acompañamos en todo el proceso.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="opiniones" id="opiniones">
    <div class="contenedor">
      <h2>Lo que dicen las familias</h2>
      <article class="testimonio">
        <img src="recursos/img/gato.svg" alt="Misi, una gata naranja">
        <div>
          <p>«Misi duerme cada noche en mi sofá. ¡Gracias, Patitas!»</p>
          <p class="autor">Lucía, adoptó a Misi</p>
        </div>
      </article>
      <article class="testimonio">
        <img src="recursos/img/perro.svg" alt="Toby, un perro marrón y sonriente">
        <div>
          <p>«Toby y yo salimos a correr cada mañana.»</p>
          <p class="autor">Marcos, adoptó a Toby</p>
        </div>
      </article>
    </div>
  </section>
</main>

<footer class="pie">
  <div class="contenedor">
    <p>🐾 Patitas · Hecho con cariño para los animales</p>
    <p><a href="#">Contacto</a> · <a href="#">Refugios</a> · <a href="#">Aviso legal</a></p>
    <p>© 2026 Patitas</p>
  </div>
</footer>
`,
        css: `/* ===== Lo que hiciste en la lección anterior ===== */
.contenedor {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 16px;
}

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

.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

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

img {
  max-width: 100%;
}

/* ===== Lo nuevo ===== */

/* 1. Características: una columna en el móvil y tres desde 700px */
.rejilla {
  display: grid;
  gap: 16px;
}

@media (min-width: 700px) {
  .rejilla {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 2. Testimonios: la foto redonda, al lado del texto */
.testimonio {
  display: flex;
  align-items: center;
  gap: 16px;
}

.testimonio img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

/* 4. Pie de página: fondo oscuro, texto blanco y enlaces claros */
.pie {
  background-color: #3d2c29;
  color: white;
  padding: 24px 0;
  text-align: center;
}

.pie a {
  color: #ffd8a8;
}
`
      }
    }
  ]
});
