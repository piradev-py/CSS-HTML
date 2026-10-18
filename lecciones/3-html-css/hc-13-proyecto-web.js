/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-13
   Proyecto web: la maqueta profesional de «Huellas»
   (docs/PROYECTO_FINAL.md). Sustituye a hc-11 y hc-12.
   4 encargos sobre la hoja oficial del Mundo 2:
   móvil primero · tableta · ratón, teclado y formulario ·
   movimiento. En el HTML solo se añaden el botón del menú y la
   clase «activo». Las soluciones son HUELLAS["mundo-3"].pasos
   (herramientas/huellas-versiones.mjs).
   Notas:
   - La página se mide a 375, 768 y 1200 px (PRUEBA.clonar) y se
     comprueba el estilo calculado y dónde queda cada pieza, no el
     texto del CSS: valen otros puntos de corte y Flexbox en vez de
     Grid (ver `alternativas`).
   - Las columnas se cuentan por posición: cuántas piezas empiezan
     antes de que acabe la primera (así vale align-items: center).
   - :user-invalid no se puede provocar sin una persona tecleando:
     se comprueba la regla escrita con PRUEBA.reglas.
   ============================================================ */
(function () {
  const PROYECTO = { raiz: "recursos/huellas/web/", html: "index.html", css: "estilos.css", js: "script.js" };
  const PASOS = HUELLAS["mundo-3"].pasos;
  const sinPreconnect = h => h.replace(/\n *<link rel="preconnect"[^>]*>/g, "");
  // Se parte de la versión oficial del Mundo 2 (la hoja del alumno, sin el estilo de privacidad.html)
  const INICIO = { html: sinPreconnect(HUELLAS["mundo-2"].html), css: HUELLAS["mundo-2"].pasos[3] };
  const HTML = sinPreconnect(HUELLAS["mundo-3"].html);
  const HTML_SIN_ACTIVO = HTML.replace(' class="activo"', "");

  // La misma maqueta escrita de otra forma: otros puntos de corte y las rejillas con Flexbox en vez de Grid
  const FLEX = "\n/* Las rejillas, con Flexbox */\n.rejilla {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 24px;\n}\n\n.rejilla > * {\n  flex: 1 1 100%;\n}\n\n" +
    "@media (min-width: 700px) {\n  .rejilla > * {\n    flex-basis: 40%;\n  }\n}\n\n@media (min-width: 1000px) {\n  .rejilla > * {\n    flex-basis: 30%;\n  }\n\n  #equipo .rejilla > * {\n    flex-basis: 20%;\n  }\n}\n";
  const otraForma = css => css.replace(/min-width: 768px/g, "min-width: 700px").replace(/min-width: 1100px/g, "min-width: 1000px") + FLEX;

  const C = {
    principal: "rgb(31, 122, 107)", principalOscuro: "rgb(21, 94, 83)", oscuro: "rgb(18, 51, 47)", fondo: "rgb(255, 255, 255)",
    crema: "rgb(247, 250, 248)", menta: "rgb(223, 241, 234)", error: "rgb(194, 58, 82)", errorFondo: "rgb(253, 242, 244)"
  };
  const est = (doc, sel, pseudo) => { const el = doc.querySelector(sel); return el ? doc.defaultView.getComputedStyle(el, pseudo) : null; };
  const todos = (doc, sel) => [...doc.querySelectorAll(sel)].map(el => doc.defaultView.getComputedStyle(el));
  const px = v => parseFloat(v);
  const cerca = (v, n) => Math.abs(px(v) - n) < 0.6;
  const segundos = (v, n) => Math.abs(px(v) - n) < 0.01;
  const relleno = (s, a, b, c = a, d = b) => !!s && cerca(s.paddingTop, a) && cerca(s.paddingRight, b) && cerca(s.paddingBottom, c) && cerca(s.paddingLeft, d);
  const margen = (s, a, b, c = a, d = b) => !!s && cerca(s.marginTop, a) && cerca(s.marginRight, b) && cerca(s.marginBottom, c) && cerca(s.marginLeft, d);
  const subido = (s, n) => !!s && /^matrix\(1, 0, 0, 1, 0, (-?[\d.]+)\)$/.test(s.transform) && cerca(s.transform.match(/(-?[\d.]+)\)$/)[1], n);
  // Cuántas piezas van en la primera fila: las que empiezan antes de que acabe la primera
  const porFila = (doc, sel) => {
    const r = [...doc.querySelectorAll(sel)].map(e => e.getBoundingClientRect());
    return r.length ? r.filter(x => x.top < r[0].bottom - 1).length : 0;
  };
  const sinScroll = (v, ancho) => v.doc.documentElement.scrollWidth <= ancho;
  const LISTAS = [["#servicios .servicio", 6], ["#equipo figure", 4], [".opinion", 3]];
  // La página a ese ancho (una copia que el alumno no ve). Se reutiliza entre comprobaciones de la misma evaluación:
  // cada una tiene 2 s, y copiar la página cuesta. Quien cambie la copia, que pida una propia con PRUEBA.clonar
  const copias = new WeakMap();
  const a = (doc, ancho) => {
    if (!copias.has(doc)) copias.set(doc, {});
    const m = copias.get(doc);
    return m[ancho] || (m[ancho] = PRUEBA.clonar(doc, { ancho, alto: 900 }));
  };

  const pista = "Mira la captura y la guía del encargo, y abre el 📚 Glosario si no recuerdas una propiedad. Para ver tu página a otro ancho, haz más estrecha o más ancha la ventana del navegador.";

  CURSO.registrar({
    id: "hc-13",
    titulo: "Proyecto web: la maqueta de Huellas",
    xp: 140,
    objetivo: "Convertirás la web de la clínica «Huellas» en una maqueta profesional: se verá bien en el móvil, la tableta y el ordenador, responderá al ratón y al teclado y tendrá movimiento suave.",
    pasos: [
      {
        tipo: "explicacion",
        titulo: "Huellas, en cualquier pantalla",
        texto: "¡La clínica está encantada con su nueva imagen! 🐾 Hemos integrado tu hoja en la **versión oficial**, y llega el siguiente encargo: **más de la mitad de sus clientes la visitan desde el móvil**, y ahí la web de escritorio se ve diminuta y apretada.\n\nEl equipo de diseño ha preparado cómo debe verse en **tres pantallas**: móvil (375 px), tableta (768 px) y ordenador (1200 px). Tú la conviertes en una maqueta profesional, en 4 encargos:\n\n• **Móvil primero:** la base pasa a ser el móvil, con el menú plegado tras un botón, y lo de escritorio va a una `@media`.\n• **Tableta:** dos columnas a partir de 768 px.\n• **Ratón, teclado y formulario:** estados `:hover` y `:focus-visible`, adornos con `::after` y campos que avisan.\n• **Movimiento:** la portada entra con una animación, y nada se mueve si la persona pide menos movimiento.\n\nLas comprobaciones miran tu página a los tres anchos, como si la abrieras en tres aparatos.",
        consejo: "La técnica la eliges tú: Grid o Flexbox, y los puntos de corte exactos, siempre que a 375, 768 y 1200 px se vea como en la captura. Para probar, haz la ventana del navegador más estrecha y más ancha."
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "css",
        enunciado: "**Móvil primero.** Hasta ahora la hoja pensaba en el ordenador. Ahora la **base** (lo que va sin `@media`) es el **móvil**, y el ordenador se añade después:\n\n1. En `index.html`, el **botón del menú** dentro del `header`, entre la marca y el `nav`: `<button class=\"boton-menu\" type=\"button\">☰ Menú</button>`.\n2. En la base, los **valores del móvil** de la guía (títulos más pequeños, menos relleno) y la **colocación del móvil**: todo en una columna, el menú plegado (se despliega con la clase `abierto`, que pondrá el JavaScript del Mundo 4) y el botón «Pide tu cita» de la cabecera escondido.\n3. El bloque **«Colocación (escritorio)»** del Mundo 2, dentro de `@media (min-width: 1100px)`, con los valores de escritorio y la **portada más ancha**, que se funde con el fondo por la izquierda (`::after` con un degradado).\n\nEl ancho de tableta todavía no se pide: a 768 px puede verse como el móvil.",
        captura: "recursos/huellas/capturas/m3-encargo-1.png",
        textos: "HTML: <button class=\"boton-menu\" type=\"button\">☰ Menú</button>  → en el header, después de la marca y antes del nav\n\nLA BASE ES EL MÓVIL (cambia estos valores; sin @media)\nh1: 2.2rem · h2: 1.7rem\nsecciones (section): relleno 48px 20px\ncabecera (header): relleno 12px 20px\nportada (.portada): margen 16px · relleno 28px 20px   (quita el margin-top de 32px)\nfranja (.ventajas): margen 0 16px · relleno 8px 20px\ntabla (table): relleno 8px · celdas (th, td): relleno 10px 14px\npie (footer): relleno 40px 20px 24px\n\nCOLOCACIÓN EN EL MÓVIL (sin @media)\nheader: pegado arriba (sticky, top 0, z-index 10) · flex · que salte de línea (wrap) · space-between · centrado en vertical\n.marca: flex · centrada en vertical · hueco 10px\nbotón del menú (.boton-menu): relleno 10px 16px · fondo crema · texto oscuro · sin sombra\nnav: ancho 100% (baja a su propia línea)\n  menú (nav ul): escondido (display: none)\n  con la clase abierto (nav.abierto ul): en bloque · relleno 8px 0\n  cada enlace (nav li a): en bloque · relleno 10px 0\nbotón de la cabecera (header .boton): escondido\nfoto de la portada (.portada-foto): relative · margen 32px 0 24px\n  nota (.portada-foto .nota): absolute · top -40px · right 0 · ancho 180px\ncada ventaja (.ventajas li): flex · centrada en vertical · hueco 12px · margen 12px 0\ncuadrículas y pie (.rejilla, .pie-columnas): grid · hueco 24px   (una sola columna)\n\nESCRITORIO: @media (min-width: 1100px) { … }\n  h1: 3.1rem · h2: 2rem · section: relleno 72px 32px · header: relleno 16px 32px · footer: relleno 56px 32px 24px\n  .boton-menu: escondido · nav: ancho auto · header .boton: inline-block\n  + todo el bloque «Colocación (escritorio)» del Mundo 2, tal cual\n  + la portada más ancha:\n    .portada: margen 32px auto 0 · relleno 48px 48px 88px · columnas 1fr 1.3fr 300px\n    .portada-foto: margen 0\n    .portada-foto::after: content \"\" · absolute · top 0 · bottom 0 · left 0 · ancho 45%\n      esquinas 20px 0 0 20px (var(--radio) 0 0 var(--radio))\n      fondo: linear-gradient(to right, var(--crema), rgb(247 250 248 / 0))\n    .portada-foto .nota: z-index 1 (por encima del degradado)\n    .ventajas: margen -40px auto 0 · relleno 22px 28px · .ventajas li: margen 0",
        glosario: ["mobile first", "@media", "min-width y max-width (en @media)", "menú del móvil (.abierto)", "display: none", "flex-wrap", "::before y ::after", "content", "linear-gradient()", "position: absolute"],
        inicial: INICIO,
        comprobaciones: [
          { texto: "En el `header`, el botón «☰ Menú» (`button` con `class=\"boton-menu\"` y `type=\"button\"`), entre la marca y el `nav`", repaso: "hc-06",
            prueba: doc => { const b = doc.querySelector("header button.boton-menu"); const n = doc.querySelector("header nav");
              return !!b && !!n && b.getAttribute("type") === "button" && /menu/i.test(b.textContent.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
                && !!(b.compareDocumentPosition(n) & 4) && !!(doc.querySelector("header .marca").compareDocumentPosition(b) & 4); } },
          { texto: "La hoja usa `@media (min-width: …)`: primero el móvil y después las pantallas grandes", repaso: "hc-06",
            prueba: doc => /@media[^{]*min-width/.test(PRUEBA.textoCSS(doc)) },
          { texto: "A 375 px nada se sale de la pantalla (no hay scroll horizontal)", repaso: "hc-05",
            prueba: async doc => sinScroll(await a(doc, 375), 375) },
          { texto: "A 375 px, los servicios, el equipo y las opiniones van en una sola columna", repaso: "hc-06",
            prueba: async doc => { const v = await a(doc, 375); return LISTAS.every(([s]) => porFila(v.doc, s) === 1); } },
          { texto: "A 375 px, el menú está plegado, se ve el botón «☰ Menú» y no el «Pide tu cita» de la cabecera", repaso: "hc-06",
            prueba: async doc => { const v = await a(doc, 375);
              return est(v.doc, "nav ul").display === "none" && est(v.doc, ".boton-menu").display !== "none" && est(v.doc, "header .boton").display === "none"; } },
          { texto: "A 375 px, con la clase `abierto` en el `nav`, el menú se despliega con un enlace por línea", repaso: "hc-06",
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { ancho: 375, alto: 900 }); v.doc.querySelector("nav").classList.add("abierto");
              const li = [...v.doc.querySelectorAll("nav a")].map(x => x.getBoundingClientRect());
              return est(v.doc, "nav ul").display !== "none" && li.length === 5 && li.every((r, i) => !i || r.top >= li[i - 1].bottom - 1) && cerca(est(v.doc, "nav li a").paddingTop, 10); } },
          { texto: "A 375 px, la cabecera sigue pegada arriba (`sticky`) y es flex con salto de línea", repaso: "css-10",
            prueba: async doc => { const s = est((await a(doc, 375)).doc, "header");
              return s.position === "sticky" && cerca(s.top, 0) && s.display === "flex" && s.flexWrap === "wrap" && relleno(s, 12, 20); } },
          { texto: "A 375 px, los valores del móvil: `h1` a 2.2rem, `h2` a 1.7rem, secciones con relleno de 48px y 20px", repaso: "hc-06",
            prueba: async doc => { const d = (await a(doc, 375)).doc;
              return cerca(est(d, "h1").fontSize, 35.2) && cerca(est(d, "h2").fontSize, 27.2) && relleno(est(d, "#servicios"), 48, 20); } },
          { texto: "A 375 px: portada con margen de 16px y relleno de 28px y 20px, franja con margen de 16px a los lados, y la nota de 180px", repaso: "css-07",
            prueba: async doc => { const d = (await a(doc, 375)).doc; const n = est(d, ".portada-foto .nota");
              return margen(est(d, ".portada"), 16, 16) && relleno(est(d, ".portada"), 28, 20) && margen(est(d, ".ventajas"), 0, 16) && relleno(est(d, ".ventajas"), 8, 20)
                && n.position === "absolute" && cerca(n.top, -40) && cerca(n.width, 180) && relleno(est(d, "footer"), 40, 20, 24, 20); } },
          { texto: "A 1200 px, como en el Mundo 2: menú en fila, sin el botón «☰ Menú», con «Pide tu cita» y los títulos grandes", repaso: "hc-05",
            prueba: async doc => { const d = (await a(doc, 1200)).doc;
              return est(d, "nav ul").display === "flex" && est(d, ".boton-menu").display === "none" && est(d, "header .boton").display !== "none"
                && cerca(est(d, "h1").fontSize, 49.6) && cerca(est(d, "h2").fontSize, 32) && relleno(est(d, "#servicios"), 72, 32); } },
          { texto: "A 1200 px, los servicios en 3 columnas, el equipo en 4 y las opiniones en 3, sin scroll horizontal", repaso: "css-13",
            prueba: async doc => { const v = await a(doc, 1200);
              return sinScroll(v, 1200) && porFila(v.doc, "#servicios .servicio") === 3 && porFila(v.doc, "#equipo figure") === 4 && porFila(v.doc, ".opinion") === 3; } },
          { texto: "A 1200 px, la portada más ancha (relleno de 88px abajo) y la foto que se funde por la izquierda: `::after` con un degradado", repaso: "hc-03",
            prueba: async doc => { const d = (await a(doc, 1200)).doc; const p = est(d, ".portada"); const f = est(d, ".portada-foto", "::after");
              const fotos = [".portada-texto", ".portada-foto", ".tarjeta-cita"].map(s => d.querySelector(s).getBoundingClientRect().width);
              return cerca(p.paddingBottom, 88) && fotos[1] > fotos[0] && f.position === "absolute" && /linear-gradient/.test(f.backgroundImage) && cerca(f.top, 0); } }
        ],
        pistas: [pista, "Para pasar a escritorio: corta tu bloque «Colocación (escritorio)» y pégalo dentro de @media (min-width: 1100px) { … }. Fuera, en la base, deja la colocación del móvil. Recuerda: la base no lleva @media, y cada @media (min-width) añade o cambia algo para las pantallas más anchas."],
        solucion: { html: HTML_SIN_ACTIVO, css: PASOS[0] },
        alternativas: [{ html: HTML_SIN_ACTIVO, css: otraForma(PASOS[0]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "css",
        enunciado: "**La tableta.** Entre el móvil y el ordenador hay un hueco: a 768 px todo va en una columna larguísima. Añade una `@media (min-width: 768px)` (antes de la de escritorio, para que la de escritorio gane) con **dos columnas**:\n\n1. La **portada**: el texto y la foto lado a lado, y la tarjeta «Pide tu cita» debajo, ocupando las dos columnas.\n2. La **franja**, los **servicios**, el **equipo**, las **opiniones** y el **pie**, en dos columnas.\n\nY en el escritorio, la tarjeta de cita vuelve a su columna (`grid-column: auto`).",
        captura: "recursos/huellas/capturas/m3-encargo-2.png",
        textos: "TABLETA: @media (min-width: 768px) { … }   → entre la base y la @media de escritorio\n  .portada: grid · 2 columnas iguales (1fr 1fr) · hueco 32px · centrada en vertical\n  .tarjeta-cita: de la línea 1 a la 3 (grid-column: 1 / 3)\n  .ventajas, .rejilla, .pie-columnas: 2 columnas iguales\n  .ventajas: grid · hueco 8px entre filas y 24px entre columnas (gap: 8px 24px)\n\nESCRITORIO (dentro de la @media de 1100px):\n  .tarjeta-cita: grid-column auto (vuelve a su columna)",
        glosario: ["@media en cascada", "min-width y max-width (en @media)", "display: grid", "grid-template-columns", "fr", "grid-column: 1 / 3", "grid-column: span 2", "gap"],
        inicial: { html: HTML_SIN_ACTIVO, css: PASOS[0] },
        comprobaciones: [
          { texto: "A 768 px nada se sale de la pantalla", repaso: "hc-05",
            prueba: async doc => sinScroll(await a(doc, 768), 768) },
          { texto: "A 768 px, el texto y la foto de la portada van lado a lado", repaso: "hc-06",
            prueba: async doc => { const d = (await a(doc, 768)).doc; const t = d.querySelector(".portada-texto").getBoundingClientRect(); const f = d.querySelector(".portada-foto").getBoundingClientRect();
              return f.left >= t.right - 1 && f.top < t.bottom; } },
          { texto: "A 768 px, la tarjeta «Pide tu cita» va debajo, ocupando las dos columnas", repaso: "css-13",
            prueba: async doc => { const d = (await a(doc, 768)).doc; const t = d.querySelector(".portada-texto").getBoundingClientRect();
              const f = d.querySelector(".portada-foto").getBoundingClientRect(); const c = d.querySelector(".tarjeta-cita").getBoundingClientRect();
              return c.top >= Math.max(t.bottom, f.bottom) - 1 && c.left <= t.left + 1 && c.right >= f.right - 1; } },
          { texto: "A 768 px, la franja en dos columnas", repaso: "css-13",
            prueba: async doc => porFila((await a(doc, 768)).doc, ".ventajas li") === 2 },
          { texto: "A 768 px, los servicios, el equipo, las opiniones y el pie, en dos columnas", repaso: "hc-06",
            prueba: async doc => { const d = (await a(doc, 768)).doc;
              return LISTAS.every(([s]) => porFila(d, s) === 2) && porFila(d, ".pie-columnas > *") === 2; } },
          { texto: "A 375 px, todo sigue en una columna", repaso: "hc-06",
            prueba: async doc => { const d = (await a(doc, 375)).doc; return LISTAS.every(([s]) => porFila(d, s) === 1) && porFila(d, ".ventajas li") === 1; } },
          { texto: "A 1200 px, la portada vuelve a 3 columnas, con la tarjeta de cita a la derecha", repaso: "hc-06",
            prueba: async doc => { const d = (await a(doc, 1200)).doc; const f = d.querySelector(".portada-foto").getBoundingClientRect(); const c = d.querySelector(".tarjeta-cita").getBoundingClientRect();
              return c.left >= f.right - 1 && porFila(d, "#servicios .servicio") === 3; } }
        ],
        pistas: [pista, "Una @media (min-width: 768px) { .rejilla { grid-template-columns: 1fr 1fr; } } pone dos columnas desde 768 px. Que vaya ANTES de la de 1100 px: si va después, a 1200 px también se cumple y ganaría ella. Para que la tarjeta ocupe las dos columnas: grid-column: 1 / 3."],
        solucion: { html: HTML_SIN_ACTIVO, css: PASOS[1] },
        alternativas: [{ html: HTML_SIN_ACTIVO, css: otraForma(PASOS[1]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "css",
        enunciado: "**Ratón, teclado y formulario.** Una web profesional responde a lo que haces:\n\n1. En `index.html`, el enlace **Inicio** del menú lleva `class=\"activo\"`: es la sección en la que estás (en el Mundo 4, el JavaScript la cambiará al pulsar).\n2. Los **adornos con `::after`**: la rayita bajo el enlace activo y la de debajo de cada antetítulo.\n3. Al pasar el **ratón**: los enlaces del menú cambian de color, los botones se oscurecen y suben 2px, y las tarjetas suben 4px con más sombra. Todo con una **transición** suave.\n4. Con el **teclado**, el foco se ve: un contorno de 3px.\n5. El **formulario**: el campo con el foco se marca, y en rojo el que está mal (después de tocarlo), en verde el que está bien.",
        captura: "recursos/huellas/capturas/m3-encargo-3.png",
        textos: "HTML: «Inicio» del menú → <a class=\"activo\" href=\"#inicio\">Inicio</a>\n\n/* ---------- 6. Interacción: ratón y teclado ---------- */   (después de las @media)\nnav a:hover → color principal\nnav a.activo → relative · color oscuro · grosor 600\nnav a.activo::after → content \"\" · absolute · left 0 · bottom -4px · ancho 24px · alto 2px · fondo principal\n.antetitulo::after → content \"\" · en bloque · ancho 36px · alto 3px · margen arriba 10px · esquinas 3px · fondo principal\n.boton:hover y button:hover → fondo --principal-oscuro · sube 2px (transform: translateY(-2px))\n.boton-menu:hover → fondo menta\na:focus-visible y button:focus-visible → contorno (outline) 3px sólido principal\n.servicio, #equipo figure y .opinion, con :hover → suben 4px · sombra 0 16px 36px rgb(18 51 47 / 0.14)\n.boton, button, .servicio, #equipo figure, .opinion → transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s\n\nFORMULARIO\ninput, select y textarea con :focus → borde principal · contorno 3px sólido rgb(31 122 107 / 0.2)\ninput, select y textarea con :user-invalid → borde #c23a52 · fondo #fdf2f4\ninput y select con :user-valid → borde principal",
        glosario: [":hover", ":focus-visible", "enlace activo (.activo)", "::before y ::after", "content", "transform: translate()", "transition", "outline", ":user-invalid y :user-valid", "a, b (agrupar)"],
        inicial: { html: HTML_SIN_ACTIVO, css: PASOS[1] },
        comprobaciones: [
          { texto: "El enlace «Inicio» del menú lleva `class=\"activo\"`", repaso: "hc-04",
            prueba: doc => { const a1 = doc.querySelector('nav a[href="#inicio"]'); return !!a1 && a1.classList.contains("activo") && doc.querySelectorAll("nav a.activo").length === 1; } },
          { texto: "El enlace activo: color oscuro, grosor 600 y una raya de 24 × 2 px debajo, hecha con `::after`", repaso: "hc-04",
            prueba: doc => { const s = est(doc, "nav a.activo"); const r = est(doc, "nav a.activo", "::after");
              return s.color === C.oscuro && s.fontWeight === "600" && r.content === '""' && r.position === "absolute" && cerca(r.width, 24) && cerca(r.height, 2) && r.backgroundColor === C.principal; } },
          { texto: "Cada antetítulo con su raya debajo: `::after` en bloque, de 36 × 3 px y color principal", repaso: "hc-03",
            prueba: doc => { const r = est(doc, ".antetitulo", "::after");
              return r.content === '""' && r.display === "block" && cerca(r.width, 36) && cerca(r.height, 3) && cerca(r.marginTop, 10) && r.backgroundColor === C.principal; } },
          { texto: "Con el ratón encima, los enlaces del menú se ponen del color principal", repaso: "hc-02",
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { estado: "hover", ancho: 1200 }); return est(v.doc, 'nav a[href="#servicios"]').color === C.principal; } },
          { texto: "Con el ratón encima, los botones se oscurecen y suben 2px", repaso: "hc-07",
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { estado: "hover", ancho: 1200 });
              return [".portada .boton", "#form-cita button"].every(s => { const e = est(v.doc, s); return e.backgroundColor === C.principalOscuro && subido(e, -2); }); } },
          { texto: "Con el ratón encima, los servicios, las personas del equipo y las opiniones suben 4px con más sombra", repaso: "hc-07",
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { estado: "hover", ancho: 1200 });
              return [".servicio", "#equipo figure", ".opinion"].every(s => { const e = est(v.doc, s); return subido(e, -4) && /0px 16px 36px/.test(e.boxShadow); }); } },
          { texto: "Los botones y las tarjetas cambian con una transición de 0.2s en `transform`, la sombra y el fondo", repaso: "hc-08",
            prueba: doc => [".boton", "#form-cita button", ".servicio", "#equipo figure", ".opinion"].every(s => { const e = est(doc, s);
              const p = e.transitionProperty.split(", "); const d = e.transitionDuration.split(", ");
              return ["transform", "box-shadow", "background-color"].every(x => { const i = p.indexOf(x) >= 0 ? p.indexOf(x) : p.indexOf("all"); return i >= 0 && segundos(d[i % d.length], 0.2); }); }) },
          { texto: "Con el teclado, el foco de enlaces y botones se ve: contorno de 3px del color principal", repaso: "hc-04",
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { estado: "focus", ancho: 1200 });
              return [".portada .boton", "#form-cita button"].every(s => { const e = est(v.doc, s); return cerca(e.outlineWidth, 3) && e.outlineStyle === "solid" && e.outlineColor === C.principal; }); } },
          { texto: "El campo con el foco: borde del color principal y un contorno suave de 3px", repaso: "hc-10",
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { estado: "focus", ancho: 1200 }); const e = est(v.doc, '#form-cita [name="nombre"]');
              return e.borderTopColor === C.principal && cerca(e.outlineWidth, 3) && /rgba\(31, 122, 107, 0\.2\)/.test(e.outlineColor); } },
          { texto: "Los campos mal rellenos (`:user-invalid`) con borde `#c23a52` y fondo `#fdf2f4`, y los bien (`:user-valid`), con borde principal", repaso: "hc-10",
            prueba: doc => { const mal = PRUEBA.reglas(doc, ":user-invalid"); const bien = PRUEBA.reglas(doc, ":user-valid");
              return ["input", "select", "textarea"].every(t => mal.some(r => r.selectorText.includes(t + ":user-invalid") && r.style.borderColor === C.error && r.style.backgroundColor === C.errorFondo))
                && bien.some(r => /input:user-valid/.test(r.selectorText) && /var\(--principal\)|rgb\(31, 122, 107\)/.test(r.style.borderColor)); } }
        ],
        pistas: [pista, "Una raya con ::after: nav a.activo { position: relative; } y nav a.activo::after { content: \"\"; position: absolute; left: 0; bottom: -4px; width: 24px; height: 2px; background-color: var(--principal); }. Para que el cambio sea suave, la transition va en el estado normal (.servicio { transition: … }), no en el :hover."],
        solucion: { html: HTML, css: PASOS[2] },
        alternativas: [{ html: HTML, css: otraForma(PASOS[2]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "css",
        enunciado: "**El movimiento.** ¡El último encargo!\n\n1. Una animación `@keyframes` llamada **`aparecer`**: empieza invisible y 24px más abajo, y acaba visible en su sitio.\n2. Que la usen el **texto**, la **foto** y la **tarjeta de cita** de la portada al cargar la página: 0.7s, `ease-out`.\n3. **Menos movimiento, por favor:** si el ordenador de la persona pide menos movimiento, ni la portada se anima ni las tarjetas y botones tienen transición.\n\nAl terminar, la lista repasa la maqueta a los tres anchos.",
        captura: "recursos/huellas/capturas/m3-encargo-4.png",
        textos: "/* ---------- 7. Movimiento: la portada entra al cargar ---------- */\n@keyframes aparecer: desde (from) opacidad 0 y 24px más abajo (translateY(24px)) · hasta (to) opacidad 1 y en su sitio (translateY(0))\n.portada-texto, .portada-foto, .tarjeta-cita → animation: aparecer 0.7s ease-out\n\nMENOS MOVIMIENTO: @media (prefers-reduced-motion: reduce) { … }\n  .portada-texto, .portada-foto, .tarjeta-cita → sin animación (none)\n  .boton, button, .servicio, #equipo figure, .opinion → sin transición (none)",
        glosario: ["@keyframes", "animation", "prefers-reduced-motion", "transform: translate()", "opacity", "transition"],
        inicial: { html: HTML, css: PASOS[2] },
        comprobaciones: [
          { texto: "El texto, la foto y la tarjeta de la portada usan la animación `aparecer`, de 0.7s y `ease-out`", repaso: "hc-09",
            prueba: doc => [".portada-texto", ".portada-foto", ".tarjeta-cita"].every(s => { const e = est(doc, s);
              return e.animationName === "aparecer" && segundos(e.animationDuration, 0.7) && e.animationTimingFunction === "ease-out"; }) },
          { texto: "`aparecer` empieza invisible y 24px más abajo…", repaso: "hc-09",
            // clonar deja las animaciones paradas en su primer fotograma
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { ancho: 1200 }); const e = est(v.doc, ".portada-texto"); return cerca(e.opacity, 0) && subido(e, 24); } },
          { texto: "…y acaba visible y en su sitio", repaso: "hc-09",
            prueba: doc => /@keyframes\s+aparecer\s*\{[\s\S]*?(to|100%)\s*\{[^}]*opacity:\s*1/.test(PRUEBA.textoCSS(doc)) },
          { texto: "Con menos movimiento (`prefers-reduced-motion`), la portada no se anima", repaso: "hc-09",
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { ancho: 1200, movimiento: "reducido" });
              return [".portada-texto", ".portada-foto", ".tarjeta-cita"].every(s => est(v.doc, s).animationName === "none"); } },
          { texto: "Con menos movimiento, los botones y las tarjetas no tienen transición", repaso: "hc-09",
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { ancho: 1200, movimiento: "reducido" });
              return [".boton", "#form-cita button", ".servicio", "#equipo figure", ".opinion"].every(s => est(v.doc, s).transitionDuration.split(", ").every(d => px(d) === 0)); } },
          { texto: "Repaso: a 375, 768 y 1200 px nada se sale de la pantalla", repaso: "hc-05",
            prueba: async doc => sinScroll(await a(doc, 375), 375) && sinScroll(await a(doc, 768), 768) && sinScroll(await a(doc, 1200), 1200) },
          { texto: "Repaso: los servicios en 1, 2 y 3 columnas a 375, 768 y 1200 px", repaso: "hc-06",
            prueba: async doc => porFila((await a(doc, 375)).doc, ".servicio") === 1 && porFila((await a(doc, 768)).doc, ".servicio") === 2 && porFila((await a(doc, 1200)).doc, ".servicio") === 3 }
        ],
        pistas: [pista, "@keyframes aparecer { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } } y luego .portada-texto { animation: aparecer 0.7s ease-out; }. Lo de menos movimiento va dentro de @media (prefers-reduced-motion: reduce) { … } con animation: none y transition: none."],
        solucion: { html: HTML, css: PASOS[3] },
        alternativas: [{ html: HTML, css: otraForma(PASOS[3]) }]
      }
    ]
  });
})();
