/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-01 (primera del mundo)
   Maqueta una tarjeta — descomponer un diseño en cajas,
   max-width, object-fit: cover y overflow: hidden.
   Nota: las imágenes de recursos/img son SVG de 400×300 sin
   preserveAspectRatio, así que sin object-fit NO se estiran: se
   quedan pequeñas y dejan huecos (el texto lo explica así).
   El reto mide el centrado con getBoundingClientRect respecto al
   padre (body), para no depender de la barra de desplazamiento.
   ============================================================ */
CURSO.registrar({
  id: "hc-01",
  titulo: "Maqueta una tarjeta",
  xp: 45,
  objetivo: "Sabrás convertir un diseño en cajas y maquetar una tarjeta con una foto bien recortada, un ancho máximo y centrada.",
  glosario: [
    { termino: "pensar en cajas", tema: "Tarjetas", para: "Antes de escribir, dibuja el diseño como cajas dentro de cajas: cada caja es un elemento.", ejemplo: "<article class=\"servicio\">\n  <img src=\"img/servicio-medicina.jpg\" alt=\"\">\n  <h3>Medicina general</h3>\n</article>", buscar: "maquetar disenar cajas plan", lenguaje: "html" },
    { termino: "object-fit: cover", tema: "Tarjetas", para: "La foto rellena su hueco sin deformarse: recorta lo que sobra.", ejemplo: ".servicio img {\n  height: 200px;\n  object-fit: cover;\n}", buscar: "recortar foto rellenar deformar" },
    { termino: "overflow: hidden", tema: "Tarjetas", para: "Esconde lo que se sale de la caja (por ejemplo, las esquinas de una foto).", ejemplo: ".tarjeta {\n  border-radius: 20px;\n  overflow: hidden;\n}", buscar: "esconder sobresale recortar" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Primero, piensa en cajas",
      texto: "¡Bienvenido al Mundo HTML + CSS! 🧩 Aquí juntamos todo para construir piezas de webs de verdad.\n\nAntes de escribir código, los profesionales miran el diseño y lo **descomponen en cajas**, como quien desmonta un juguete de LEGO 🧱. Hazte tres preguntas:\n\n1. ¿Cuál es la **caja grande**? Aquí, la tarjeta (un `<article>`, porque tiene sentido por sí sola).\n2. ¿Qué cajas hay **dentro** y en qué orden? Foto, nombre, descripción y botón.\n3. ¿Van en **fila** o en **columna**? En columna, una debajo de otra.\n\nEn el ejemplo hemos dibujado el borde de cada caja para que las veas.",
      ejemplo: {
        html: `<article class="tarjeta">
  <img src="recursos/img/gato.svg" alt="Gato naranja sonriendo" width="160">
  <h2>Michi</h2>
  <p>Experto en siestas al sol.</p>
  <button>Adoptar</button>
</article>`,
        css: `.tarjeta {
  width: 200px;
  padding: 8px;
  border: 3px dashed royalblue;
}
.tarjeta img,
.tarjeta h2,
.tarjeta p,
.tarjeta button {
  border: 2px dashed tomato;
}`
      },
      consejo: "Haz este dibujo en un papel antes de empezar: con las cajas claras, el HTML sale casi solo y el CSS es mucho más fácil."
    },
    {
      tipo: "explicacion",
      titulo: "Un ancho máximo: max-width",
      texto: "Con `width: 300px` la caja mide 300px **siempre**… aunque la pantalla sea más estrecha. Resultado: se sale por un lado. 😬\n\n`max-width: 300px` es un **ancho máximo**, como un cinturón elástico: si hay sitio, la caja mide 300px; si no lo hay, **se encoge** para caber.\n\nEn el ejemplo, el marco gris es un hueco de solo 220px (como un móvil muy estrecho). La caja roja, con `width`, se sale. La verde, con `max-width`, se adapta.",
      ejemplo: {
        html: `<div class="hueco">
  <p class="fija">width: 300px</p>
  <p class="elastica">max-width: 300px</p>
</div>`,
        css: `.hueco {
  width: 220px;
  border: 3px dashed gray;
}
.fija {
  width: 300px;
  background-color: tomato;
}
.elastica {
  max-width: 300px;
  background-color: mediumseagreen;
}`
      },
      consejo: "`max-width` y `margin: 0 auto` (de la lección del modelo de caja) son la pareja perfecta: la caja no crece de más y queda centrada."
    },
    {
      tipo: "explicacion",
      titulo: "Fotos que rellenan su hueco: object-fit",
      texto: "En una tarjeta, la foto suele tener un hueco fijo, por ejemplo `width: 100%` y `height: 150px`. Pero la foto tiene su propia forma, y no coincide: las fotos normales se **estiran** como un chicle y nuestros dibujos se quedan **pequeños** con huecos. Ninguna de las dos queda bien.\n\n`object-fit: cover` lo arregla: la foto **rellena todo el hueco** sin deformarse y se recorta lo que sobra, como una foto dentro de un marco. 🖼️\n\n(Su primo `object-fit: contain` hace lo contrario: mete la foto entera aunque queden huecos).",
      ejemplo: {
        html: `<div class="fila">
  <img class="foto" src="recursos/img/perro.svg" alt="Perro marrón sacando la lengua">
  <img class="foto cubre" src="recursos/img/perro.svg" alt="El mismo perro, rellenando todo su hueco">
</div>`,
        css: `.fila {
  display: flex;
  gap: 16px;
}
.foto {
  width: 140px;
  height: 140px;
  background-color: lavender;
}
.cubre {
  object-fit: cover;
}`
      }
    },
    {
      tipo: "explicacion",
      titulo: "Esconder lo que sobresale: overflow",
      texto: "Último truco. Si la tarjeta tiene las esquinas redondeadas, la foto de dentro **no** se redondea sola: sus esquinas cuadradas asoman por fuera. 📐\n\n`overflow` decide qué pasa con lo que **se sale** de una caja. Con `overflow: hidden` («lo que sobresalga, escondido»), la tarjeta recorta todo lo que no cabe en su forma, y la foto sigue sus curvas.\n\nCompara las dos tarjetas: misma foto, mismas esquinas, pero solo la segunda tiene `overflow: hidden`.",
      ejemplo: {
        html: `<div class="fila">
  <div class="tarjeta">
    <img class="foto" src="recursos/img/perro.svg" alt="Perro marrón sacando la lengua">
    <p>Sin overflow</p>
  </div>
  <div class="tarjeta recorta">
    <img class="foto" src="recursos/img/perro.svg" alt="El mismo perro, con las esquinas recortadas">
    <p>overflow: hidden</p>
  </div>
</div>`,
        css: `.fila {
  display: flex;
  gap: 16px;
}
.tarjeta {
  width: 150px;
  border-radius: 30px;
  background-color: lavender;
  text-align: center;
}
.foto {
  display: block;
  width: 100%;
  height: 130px;
  object-fit: cover;
}
.recorta {
  overflow: hidden;
}`
      },
      consejo: "¿Ves el `display: block` en la foto? Las imágenes son elementos en línea y dejan un huequito debajo, como si fueran una letra. Con `block` desaparece."
    },
    {
      tipo: "ejercicio",
      enunciado: "La foto de Toby 🐶 se ve pequeña, con huecos, y no sigue las esquinas redondeadas de su tarjeta. Arréglalo con los dos trucos:\n\n• Al selector `.foto` ponle `object-fit` con el valor `cover`.\n• Al selector `.tarjeta` ponle `overflow` con el valor `hidden`.\n\nEl HTML ya está escrito: tú solo escribes el CSS.",
      cssBase: `body { font-family: sans-serif; background-color: #fdf0e3; }
.tarjeta { width: 220px; border-radius: 24px; background-color: white; box-shadow: 0 8px 16px rgb(0 0 0 / 0.15); }
.foto { display: block; width: 100%; height: 210px; background-color: #ffd6a5; }
.tarjeta h2 { margin: 0; padding: 12px; text-align: center; color: #7f5539; }`,
      inicial: {
        html: `<div class="tarjeta">
  <img class="foto" src="recursos/img/perro.svg" alt="Perro marrón de orejas largas sacando la lengua">
  <h2>Toby</h2>
</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="tarjeta">
  <img class="foto" src="recursos/img/perro.svg" alt="Perro marrón de orejas largas sacando la lengua">
  <h2>Toby</h2>
</div>
`,
        css: `.foto {
  object-fit: cover;
}
.tarjeta {
  overflow: hidden;
}
`
      },
      pistas: [
        "Necesitas dos reglas: una para .foto (para que rellene su hueco) y otra para .tarjeta (para que esconda lo que sobresale). Cada una lleva una sola propiedad.",
        "Debe quedarte así:\n.foto {\n  object-fit: cover;\n}\n.tarjeta {\n  overflow: hidden;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "Juega con la tarjeta: cambia su ancho máximo, pon la foto en `cover` y después cambia `overflow` a `hidden`. ¡Fíjate en las esquinas de arriba!",
      html: `<div class="tarjeta">
  <img class="foto" src="recursos/img/pizza.svg" alt="Una pizza de pepperoni">
  <p>Pizza del día 🍕</p>
</div>`,
      cssBase: `body { font-family: sans-serif; background-color: #fdf0e3; }
.tarjeta { margin: 0 auto; border-radius: 30px; background-color: white; box-shadow: 0 8px 16px rgb(0 0 0 / 0.15); }
.foto { display: block; width: 100%; height: 150px; }
.tarjeta p { margin: 0; padding: 12px; text-align: center; font-weight: bold; }`,
      controles: [
        { selector: ".tarjeta", propiedad: "max-width", tipo: "rango", min: 120, max: 400, valor: 260, unidad: "px" },
        { selector: ".tarjeta", propiedad: "overflow", tipo: "opciones", opciones: ["visible", "hidden"], valor: "visible" },
        { selector: ".foto", propiedad: "object-fit", tipo: "opciones", opciones: ["contain", "cover"], valor: "contain" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "¿Qué hace max-width: 300px en una caja?",
      opciones: [
        "Puede ser más estrecha si no hay sitio, pero nunca más ancha de 300px",
        "Mide siempre 300px exactos, quepa o no",
        "Mide como mínimo 300px y puede crecer todo lo que quiera"
      ],
      correcta: 0,
      explicacion: "max-width es un ancho máximo: la caja llega hasta 300px si hay sitio y se encoge si no lo hay. Por eso es perfecta para tarjetas que deben verse bien en un móvil."
    },
    {
      tipo: "reto",
      enunciado: "Maqueta la tarjeta de adopción de Michi 🐱. El HTML ya está hecho; en la pestaña **CSS**:\n\n1. Dale a la `.tarjeta` un **ancho máximo** de `320px`.\n2. **Céntrala** en la página.\n3. Ponle una **sombra** suave.\n4. Haz que la `.foto` **rellene su hueco** sin deformarse y que la tarjeta **esconda** lo que sobresale, para que la foto siga sus esquinas redondeadas.",
      pestana: "css",
      cssBase: `body { font-family: sans-serif; background-color: #fdf0e3; padding: 20px 0; }
.info h2 { margin: 0 0 6px; color: #e76f51; }
.info p { margin: 0 0 14px; line-height: 1.5; color: #555; }
.info button { background-color: #e76f51; color: white; border: none; padding: 10px 18px; border-radius: 999px; font-size: 16px; }`,
      inicial: {
        html: `<article class="tarjeta">
  <img class="foto" src="recursos/img/gato.svg" alt="Gato naranja sonriendo bajo el sol">
  <div class="info">
    <h2>Michi</h2>
    <p>Tiene 3 años, ronronea como un motor y es experto en siestas al sol.</p>
    <button>¡Quiero adoptarlo!</button>
  </div>
</article>
`,
        css: `.tarjeta {
  background-color: white;
  border-radius: 20px;
  /* 1. Ancho máximo de 320px */
  /* 2. Céntrala en la página */
  /* 3. Una sombra suave */
  /* 4. Que esconda lo que sobresale */
}

.foto {
  display: block;
  width: 100%;
  height: 180px;
  /* 4. Que rellene su hueco sin deformarse */
}

.info {
  padding: 16px;
}
`
      },
      comprobaciones: [
        {
          texto: "La tarjeta tiene un ancho máximo (`max-width`) de entre 250px y 400px",
          prueba: (doc, win) => {
            const t = doc.querySelector(".tarjeta");
            if (!t) return false;
            const max = parseFloat(win.getComputedStyle(t).maxWidth);
            return max >= 250 && max <= 400;
          }
        },
        {
          texto: "La tarjeta está centrada en la página (el mismo hueco a cada lado)",
          prueba: (doc) => {
            const t = doc.querySelector(".tarjeta");
            const padre = t?.parentElement;
            if (!t || !padre) return false;
            const r = t.getBoundingClientRect();
            const p = padre.getBoundingClientRect();
            const izquierda = r.left - p.left;
            const derecha = p.right - r.right;
            return r.width < p.width - 20 && Math.abs(izquierda - derecha) <= 2;
          }
        },
        {
          texto: "La foto rellena su hueco sin deformarse (`object-fit: cover`) y la tarjeta esconde lo que sobresale (`overflow: hidden`)",
          prueba: (doc, win) => {
            const t = doc.querySelector(".tarjeta");
            const f = doc.querySelector(".tarjeta .foto");
            if (!t || !f) return false;
            const ct = win.getComputedStyle(t);
            const recorta = v => v === "hidden" || v === "clip";
            return win.getComputedStyle(f).objectFit === "cover" && recorta(ct.overflowX) && recorta(ct.overflowY);
          }
        },
        {
          texto: "La tarjeta tiene sombra (`box-shadow`)",
          prueba: (doc, win) => {
            const t = doc.querySelector(".tarjeta");
            return !!t && win.getComputedStyle(t).boxShadow !== "none";
          }
        }
      ],
      pistas: [
        "En .tarjeta necesitas max-width para el ancho máximo, el margin del modelo de caja para centrar, box-shadow para la sombra y overflow para esconder lo que sobresale. En .foto, object-fit.",
        "Dentro de .tarjeta añade:\n  max-width: 320px;\n  margin: 0 auto;\n  box-shadow: 0 8px 16px rgb(0 0 0 / 0.2);\n  overflow: hidden;\nY dentro de .foto añade: object-fit: cover;"
      ],
      solucion: {
        html: `<article class="tarjeta">
  <img class="foto" src="recursos/img/gato.svg" alt="Gato naranja sonriendo bajo el sol">
  <div class="info">
    <h2>Michi</h2>
    <p>Tiene 3 años, ronronea como un motor y es experto en siestas al sol.</p>
    <button>¡Quiero adoptarlo!</button>
  </div>
</article>
`,
        css: `.tarjeta {
  background-color: white;
  border-radius: 20px;
  max-width: 320px;
  margin: 0 auto;
  box-shadow: 0 8px 16px rgb(0 0 0 / 0.2);
  overflow: hidden;
}

.foto {
  display: block;
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.info {
  padding: 16px;
}
`
      }
    }
  ]
});
