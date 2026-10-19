/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-15
   Proyecto web: la identidad de «Huellas» (docs/PROYECTO_FINAL.md).
   4 encargos sobre el mismo estilos.css, que empieza vacío:
   identidad · cajas y tarjetas · horario, cita, opiniones y pie ·
   colocación de escritorio. El HTML es el oficial del Mundo 2 (el
   equipo de diseño añadió los 3 servicios y las 2 personas que
   faltaban); el alumno solo le añade los <link>.
   Las soluciones son HUELLAS["mundo-2"].pasos
   (herramientas/huellas-versiones.mjs).
   Notas:
   - Se comprueba el estilo calculado, no el texto del CSS: da igual
     `#1f7a6b` que `var(--principal)` o `rgb(31 122 107)`, y los
     selectores los elige el alumno (ver `alternativas`).
   - Las variables se prueban resolviéndolas en un elemento de
     prueba, con un valor de reserva que delata si no existen.
   - La colocación va agrupada al final: en el Mundo 3 ese bloque
     pasa a una @media para pantallas grandes.
   ============================================================ */
(function () {
  const PROYECTO = { raiz: "recursos/huellas/web/", html: "index.html", css: "estilos.css", js: "script.js" };
  const PASOS = HUELLAS["mundo-2"].pasos;
  // El HTML oficial del Mundo 2, sin las líneas preconnect (no se enseñan); al empezar, sin enlazar la hoja ni las fuentes
  const HTML = HUELLAS["mundo-2"].html.replace(/\n *<link rel="preconnect"[^>]*>/g, "");
  const SIN_ENLACES = HTML.replace(/\n *<link rel="stylesheet"[^>]*>/g, "");
  // La guía de estilo de cada encargo, en pseudo-CSS: lo que añade su hoja oficial a la del encargo anterior
  const guia = i => {
    const antes = i ? PASOS[i - 1] : "";
    if (!PASOS[i].startsWith(antes)) throw new Error("css-15: el encargo " + (i + 1) + " no empieza por el anterior");
    return RETOS.guiaCSS(PASOS[i].slice(antes.length));
  };
  const COMO_LEER = "Cómo leerlo: cada selector con sus propiedades debajo. Tú pones las llaves { }, los ; y var(--…) en las variables (crema → var(--crema)).\n\n";

  // La misma hoja escrita de otra forma: colores en rgb(), columnas sin repeat(), rem en px, otros selectores
  const otraForma = css => css.replace("--principal: #1f7a6b;", "--principal: rgb(31 122 107);")
    .replace(/repeat\(3, 1fr\)/g, "1fr 1fr 1fr").replace(/repeat\(4, 1fr\)/g, "1fr 1fr 1fr 1fr")
    .replace("font-size: 3.1rem;", "font-size: 49.6px;").replace(".antetitulo {", "p.antetitulo {")
    .replace(/margin: 0 auto;/g, "margin: 0px auto 0px auto;");

  const C = {
    principal: "rgb(31, 122, 107)", oscuro: "rgb(18, 51, 47)", texto: "rgb(43, 59, 57)", suave: "rgb(95, 112, 109)",
    fondo: "rgb(255, 255, 255)", crema: "rgb(247, 250, 248)", menta: "rgb(223, 241, 234)", borde: "rgb(207, 220, 217)"
  };
  const est = (doc, sel) => { const el = doc.querySelector(sel); return el ? doc.defaultView.getComputedStyle(el) : null; };
  const todos = (doc, sel) => [...doc.querySelectorAll(sel)].map(el => doc.defaultView.getComputedStyle(el));
  const px = v => parseFloat(v);
  const cerca = (v, n) => Math.abs(px(v) - n) < 0.6;
  const fuente = s => !!s && s.fontFamily.replace(/["']/g, "").split(",")[0].trim().toLowerCase();
  const relleno = (s, a, b, c = a, d = b) => !!s && cerca(s.paddingTop, a) && cerca(s.paddingRight, b) && cerca(s.paddingBottom, c) && cerca(s.paddingLeft, d);
  const sombra = s => !!s && s.boxShadow !== "none" && /0px 10px 30px/.test(s.boxShadow);
  const tarjeta = s => !!s && s.backgroundColor === C.fondo && cerca(s.borderTopLeftRadius, 20) && sombra(s);
  // Ocupa todo el ancho de contenido de su padre (s: estilo calculado del padre)
  const aTodoElAncho = (el, s) => !!el && Math.abs(el.getBoundingClientRect().width - (el.parentElement.clientWidth - px(s.paddingLeft) - px(s.paddingRight))) < 2;
  const columnas = s =>!!s && s.display === "grid" ? s.gridTemplateColumns.trim().split(/\s+/).map(px) : [];
  // Lo que vale una variable: se aplica a un elemento de prueba; si no existe, sale el valor de reserva
  const variable = (doc, nombre, propiedad, reserva) => {
    const s = doc.createElement("span");
    s.style.setProperty(propiedad, "var(" + nombre + ", " + reserva + ")");
    doc.body.appendChild(s);
    const v = doc.defaultView.getComputedStyle(s).getPropertyValue(propiedad);
    s.remove();
    return v;
  };

  const pista = "Mira la captura y la guía de estilo del encargo, y abre el 📚 Glosario si no recuerdas una propiedad. Cada comprobación en rojo tiene un enlace para repasar su lección.";

  CURSO.registrar({
    id: "css-15",
    titulo: "Proyecto web: la identidad de Huellas",
    xp: 120,
    objetivo: "Darás a la web de la clínica «Huellas» su identidad visual con una hoja de estilos propia, siguiendo la guía de estilo del equipo de diseño.",
    pasos: [
      {
        tipo: "explicacion",
        titulo: "Tu HTML, ahora con estilo",
        texto: "¡Buen trabajo con el HTML! 🐾 Hemos revisado tu entrega y la hemos integrado en la **versión oficial** de la web. A petición de la clínica, el equipo de diseño ha añadido lo que faltaba: los **otros 3 servicios** (salud dental, dermatología y diagnóstico) y las **otras 2 personas** del equipo. Y unos retoques pequeños: el texto de cada ventaja va en un `<p>`, la etiqueta de la casilla de privacidad lleva `class=\"casilla\"` y las piezas que vas a decorar llevan **su clase** (`marca`, `portada`, `portada-texto`, `portada-foto`, `tarjeta-cita`, `ventajas`, `rejilla`, `icono`, `pie-columnas`, `pie-final`…). Echa un vistazo a `index.html` antes de empezar: los textos del encargo usan esas clases.\n\nAhora la clínica quiere que su web **se vea como su marca**. El equipo de diseño ha preparado la **guía de estilo**: colores, fuentes, tamaños, esquinas y sombras. Tú la conviertes en CSS, en un archivo aparte: `estilos.css`.\n\nSon 4 encargos:\n\n• **Identidad:** enlazar la hoja y las fuentes, las variables de la guía, los textos y los botones.\n• **Cajas y tarjetas:** la cabecera, la portada, la franja, los servicios y el equipo.\n• **Horario, cita, opiniones y pie.**\n• **Colocación:** cada cosa en su sitio, con `position`, Flexbox y Grid.\n\nComo antes: captura, **📄 Textos del encargo** (aquí, la guía de estilo de esa parte), la lista que se pone en verde y el **📚 Glosario**.",
        consejo: "Se comprueba cómo se **ve** la página, no cómo escribes el CSS: los selectores, el orden de las reglas y las variables extra los eliges tú. Esta vez la web se diseña para pantalla de ordenador; el móvil llega en el Mundo HTML + CSS."
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        enunciado: "**La identidad.** Primero, en `index.html`, dentro del `<head>` y después del favicon: el `<link>` de las fuentes **Outfit** e **Inter** (Google Fonts) y el `<link>` a `estilos.css`.\n\nDespués, en `estilos.css`:\n\n1. Las **variables** de la guía en `:root`, con los nombres de la guía (el JavaScript y el Mundo 3 las usarán).\n2. `box-sizing: border-box` para todo, y el `body`: sin margen, con la fuente, el tamaño, el interlineado y los colores de la guía.\n3. Los **títulos** `h1`, `h2` y `h3` (y los `legend`), los **enlaces** y las imágenes (que nunca pasen del ancho de su caja).\n4. Los **antetítulos** (`class=\"antetitulo\"`) y los **botones** (`class=\"boton\"`).\n\nUsa las variables en el resto de la hoja: si la clínica cambia un color, se cambia en un solo sitio.",
        captura: "recursos/huellas/capturas/m2-encargo-1.png",
        textos: "HTML · en el <head>, después del favicon\n<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&family=Inter:wght@400;500;600&display=swap\">\n<link rel=\"stylesheet\" href=\"estilos.css\">\n\n" + COMO_LEER + guia(0),
        glosario: ["<link rel=\"stylesheet\">", "Fuentes de internet (Google Fonts)", ":root", "--nombre", "var()", "box-sizing: border-box", "font-family", "font-size", "font-weight", "line-height", "letter-spacing", "text-transform", "max-width"],
        inicial: { html: SIN_ENLACES, css: "" },
        comprobaciones: [
          { texto: "`index.html` enlaza `estilos.css`", repaso: "css-01",
            prueba: doc => !!doc.querySelector('style[data-archivo="estilos.css"]') },
          { texto: "`index.html` enlaza las fuentes Outfit e Inter de Google Fonts", repaso: "css-04",
            prueba: doc => [...doc.querySelectorAll('link[rel="stylesheet"]')].some(l => /fonts\.googleapis\.com/.test(l.href) && /Outfit/.test(l.href) && /Inter/.test(l.href)) },
          { texto: "En `:root`, las variables de color de la guía: `--principal`, `--oscuro`, `--texto`, `--suave`, `--fondo`, `--crema` y `--menta`", repaso: "css-14",
            prueba: doc => ["principal", "oscuro", "texto", "suave", "fondo", "crema", "menta"].every(n => variable(doc, "--" + n, "color", "rgb(1, 2, 3)") === C[n]) },
          { texto: "Y `--fuente-titulos`, `--fuente-texto`, `--radio` y `--sombra`", repaso: "css-14",
            prueba: doc => /^"?outfit/i.test(variable(doc, "--fuente-titulos", "font-family", "monospace")) && /^"?inter/i.test(variable(doc, "--fuente-texto", "font-family", "monospace"))
              && variable(doc, "--radio", "border-top-left-radius", "1px") === "20px" && /0px 10px 30px/.test(variable(doc, "--sombra", "box-shadow", "none")) },
          { texto: "La hoja usa las variables (`var(--…)`) en sus reglas", repaso: "css-14",
            prueba: doc => (PRUEBA.textoCSS(doc).match(/var\(--/g) || []).length >= 6 },
          { texto: "Todo con `box-sizing: border-box`, y el `body` sin margen, con Inter a 16px, interlineado 1.6 y los colores de la guía", repaso: "css-07",
            prueba: doc => { const b = est(doc, "body");
              return est(doc, "main").boxSizing === "border-box" && b.boxSizing === "border-box" && cerca(b.marginTop, 0) && fuente(b) === "inter"
                && cerca(b.fontSize, 16) && cerca(b.lineHeight, 25.6) && b.color === C.texto && b.backgroundColor === C.fondo; } },
          { texto: "Los títulos `h1`, `h2` y `h3` con Outfit y el color oscuro", repaso: "css-04",
            prueba: doc => todos(doc, "h1, h2, h3").every(s => fuente(s) === "outfit" && s.color === C.oscuro) },
          { texto: "Los tamaños de la guía: `h1` a 3.1rem y grosor 800, `h2` a 2rem y `h3` a 1.2rem, los dos a 700", repaso: "css-06",
            prueba: doc => { const [h1, h2, h3] = ["h1", "h2", "h3"].map(t => est(doc, t));
              return cerca(h1.fontSize, 49.6) && h1.fontWeight === "800" && cerca(h2.fontSize, 32) && h2.fontWeight === "700" && cerca(h3.fontSize, 19.2) && h3.fontWeight === "700"; } },
          { texto: "Los enlaces en el color principal y las imágenes con ancho máximo `100%`", repaso: "css-07",
            prueba: doc => est(doc, 'footer a[href^="mailto:"]').color === C.principal && est(doc, ".portada-foto img").maxWidth === "100%" },
          { texto: "Los antetítulos: 0.78rem, grosor 600, en MAYÚSCULAS, letras separadas 0.2em, color principal y sin margen", repaso: "css-04",
            prueba: doc => todos(doc, ".antetitulo").every(s => cerca(s.fontSize, 12.48) && s.fontWeight === "600" && s.textTransform === "uppercase"
              && cerca(s.letterSpacing, 2.5) && s.color === C.principal && cerca(s.marginTop, 0) && cerca(s.marginBottom, 0)) },
          { texto: "Los botones `.boton`: `inline-block`, relleno 14px 26px, forma de píldora, fondo principal, texto blanco a 600, sin subrayado y con sombra", repaso: "css-08",
            prueba: doc => { const s = est(doc, ".portada .boton");
              return s.display === "inline-block" && relleno(s, 14, 26) && cerca(s.borderTopLeftRadius, 999) && s.backgroundColor === C.principal
                && s.color === C.fondo && s.fontWeight === "600" && s.textDecorationLine === "none" && sombra(s); } }
        ],
        pistas: [pista, "Las variables van así: :root { --principal: #1f7a6b; … } y se usan con var(): a { color: var(--principal); }. Para que una regla valga para todo: * { box-sizing: border-box; }. Y para varios selectores a la vez: h1, h2, h3, legend { … }."],
        solucion: { html: HTML, css: PASOS[0] },
        alternativas: [{ html: HTML, css: otraForma(PASOS[0]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        enunciado: "**Cajas y tarjetas.** Ahora el espacio y las tarjetas, de arriba abajo:\n\n1. Las **secciones**, en una columna de 1200px como máximo, centrada y con relleno.\n2. La **cabecera**, la **marca** (logo y nombre) y el **menú**, sin viñetas ni subrayados.\n3. La **portada** en una caja crema con esquinas redondeadas, su texto y su foto.\n4. Las **tarjetas** blancas con esquinas y sombra: la de «Pide tu cita», la franja de ventajas, los servicios y las personas del equipo. Hay más tarjetas así en el próximo encargo: un selector agrupado con comas te ahorra repetir.\n\nDe momento todo va en columna, una cosa debajo de otra: la colocación llega en el último encargo.",
        captura: "recursos/huellas/capturas/m2-encargo-2.png",
        textos: COMO_LEER + guia(1),
        glosario: ["max-width", "margin: 0 auto", "padding", "margin", "border-radius", "border-radius: 50%", "box-shadow", "list-style: none", "display: block", "text-decoration", "a, b (agrupar)", "a b (descendiente)"],
        inicial: { html: HTML, css: PASOS[0] },
        comprobaciones: [
          { texto: "Las secciones: 1200px de ancho como máximo, centradas, y con relleno de 72px arriba y abajo y 32px a los lados", repaso: "css-07",
            prueba: async doc => { const s = est(doc, "#servicios"); const v = await PRUEBA.clonar(doc, { ancho: 1400 });
              const a = v.win.getComputedStyle(v.doc.querySelector("#servicios"));
              return s.maxWidth === "1200px" && relleno(s, 72, 32) && px(a.marginLeft) > 50 && cerca(a.marginLeft, px(a.marginRight)); } },
          { texto: "La cabecera: relleno de 16px y 32px, fondo blanco y sombra", repaso: "css-08",
            prueba: doc => { const s = est(doc, "header"); return relleno(s, 16, 32) && s.backgroundColor === C.fondo && sombra(s); } },
          { texto: "La marca: letra pequeña en MAYÚSCULAS y sin subrayado; «Huellas» en bloque, con Outfit a 1.6rem y grosor 800", repaso: "css-09",
            prueba: doc => { const m = est(doc, ".marca"); const n = est(doc, ".marca strong");
              return cerca(m.fontSize, 10.4) && m.textTransform === "uppercase" && m.textDecorationLine === "none" && m.color === C.suave
                && n.display === "block" && fuente(n) === "outfit" && cerca(n.fontSize, 25.6) && n.fontWeight === "800" && n.textTransform === "none" && n.color === C.oscuro; } },
          { texto: "El menú: lista sin viñetas, sin margen ni relleno, y enlaces en el color del texto, a 500 y sin subrayado", repaso: "css-09",
            prueba: doc => { const u = est(doc, "nav ul");
              return u.listStyleType === "none" && cerca(u.paddingLeft, 0) && cerca(u.marginTop, 0)
                && todos(doc, "nav a").every(a => a.color === C.texto && a.fontWeight === "500" && a.textDecorationLine === "none"); } },
          { texto: "La portada: caja crema con esquinas de 20px, relleno de 48px y 32px de margen arriba; «toda su vida» sin cursiva y en el color principal", repaso: "css-08",
            prueba: doc => { const p = est(doc, ".portada"); const em = est(doc, ".portada h1 em");
              return p.backgroundColor === C.crema && cerca(p.borderTopLeftRadius, 20) && relleno(p, 48, 48) && cerca(p.marginTop, 32)
                && em.fontStyle === "normal" && em.color === C.principal; } },
          { texto: "El texto de la portada a 1.1rem en color suave, y su foto en bloque con esquinas de 20px", repaso: "css-06",
            prueba: doc => { const t = est(doc, ".portada-texto"); const f = est(doc, ".portada-foto img");
              return cerca(t.fontSize, 17.6) && t.color === C.suave && f.display === "block" && cerca(f.borderTopLeftRadius, 20); } },
          { texto: "Tarjetas blancas con esquinas de 20px y sombra: «Pide tu cita», la franja, los servicios y el equipo", repaso: "css-08",
            prueba: doc => [".tarjeta-cita", ".ventajas", ".servicio", "#equipo figure"].every(sel => todos(doc, sel).length > 0 && todos(doc, sel).every(tarjeta)) },
          { texto: "La tarjeta «Pide tu cita»: relleno de 28px y su botón en bloque, centrado y 20px más abajo", repaso: "css-09",
            prueba: doc => { const b = est(doc, ".tarjeta-cita .boton");
              return relleno(est(doc, ".tarjeta-cita"), 28, 28) && b.display === "block" && b.textAlign === "center" && cerca(b.marginTop, 20); } },
          { texto: "La franja: sin viñetas, 1136px como máximo, relleno de 22px y 28px, 40px hacia arriba; sus títulos en bloque", repaso: "css-07",
            prueba: doc => { const v = est(doc, ".ventajas");
              return v.listStyleType === "none" && v.maxWidth === "1136px" && relleno(v, 22, 28) && cerca(v.marginTop, -40)
                && todos(doc, ".ventajas strong").every(s => s.display === "block" && s.color === C.oscuro) && todos(doc, ".ventajas p").every(s => cerca(s.fontSize, 14.4)); } },
          { texto: "Los servicios: relleno de 22px, foto en bloque a todo el ancho con esquinas de 12px, e icono de 52px, redondo, subido 38px sobre la foto", repaso: "css-08",
            prueba: doc => { const s = est(doc, ".servicio"); const f = est(doc, ".servicio img:not(.icono)"); const i = est(doc, ".servicio .icono");
              return relleno(s, 22, 22) && f.display === "block" && cerca(f.borderTopLeftRadius, 12)
                && cerca(i.width, 52) && i.borderTopLeftRadius === "50%" && cerca(i.marginTop, -38) && cerca(i.marginLeft, 12); } },
          { texto: "El equipo: cada persona sin margen y con relleno de 16px; su foto con esquinas de 12px y el nombre con Outfit a 1.15rem", repaso: "css-07",
            prueba: doc => { const f = est(doc, "#equipo figure"); const i = est(doc, "#equipo figure img"); const n = est(doc, "#equipo figcaption strong");
              return cerca(f.marginLeft, 0) && cerca(f.marginTop, 0) && relleno(f, 16, 16) && i.display === "block" && cerca(i.borderTopLeftRadius, 12)
                && cerca(est(doc, "#equipo figcaption").marginTop, 12) && fuente(n) === "outfit" && cerca(n.fontSize, 18.4) && n.color === C.oscuro; } }
        ],
        pistas: [pista, "Un selector agrupado ahorra repetir: .tarjeta-cita, .ventajas, .servicio, #equipo figure { background-color: var(--fondo); border-radius: var(--radio); box-shadow: var(--sombra); }. Para elegir solo lo de dentro, el selector descendiente: .servicio img { … }, nav a { … }."],
        solucion: { html: HTML, css: PASOS[1] },
        alternativas: [{ html: HTML, css: otraForma(PASOS[1]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        enunciado: "**Horario, cita, opiniones y pie.** La segunda mitad de la página:\n\n1. El **horario** y la **cita**, en una columna más estrecha (800px); la **tabla** como tarjeta.\n2. El **formulario**: tarjeta con relleno, `fieldset` sin borde, cada `label` encima de su campo y los campos a todo el ancho. Las **casillas** y los **radios**, en cambio, a su tamaño y con la etiqueta al lado. El **botón** de enviar, como los demás.\n3. Las **opiniones**, en tarjetas con la foto redonda.\n4. El **pie**, con fondo crema y la línea final separada por una raya fina.",
        captura: "recursos/huellas/capturas/m2-encargo-3.png",
        textos: COMO_LEER + guia(2),
        glosario: ["max-width", "border", "padding", "margin", "display: block", "display: inline", "width y height", "border-radius: 50%", "box-shadow", "text-align", "#id"],
        inicial: { html: HTML, css: PASOS[1] },
        comprobaciones: [
          { texto: "El horario y la cita, en una columna de 800px como máximo", repaso: "css-07",
            prueba: doc => est(doc, "#horario").maxWidth === "800px" && est(doc, "#cita").maxWidth === "800px" },
          { texto: "La tabla es una tarjeta a todo el ancho, con relleno de 12px", repaso: "css-08",
            prueba: doc => { const s = est(doc, "#horario table"); const h = est(doc, "#horario");
              return tarjeta(s) && relleno(s, 12, 12) && aTodoElAncho(doc.querySelector("#horario table"), h); } },
          { texto: "Las celdas con relleno de 12px y 20px y el texto a la izquierda; la cabecera con Outfit, color oscuro y fondo crema", repaso: "css-04",
            prueba: doc => { const th = est(doc, "#horario th");
              return todos(doc, "#horario th, #horario td").every(s => relleno(s, 12, 20) && /left|start/.test(s.textAlign))
                && fuente(th) === "outfit" && th.color === C.oscuro && th.backgroundColor === C.crema; } },
          { texto: "El formulario es una tarjeta con relleno de 32px, y sus `fieldset`, sin borde ni relleno", repaso: "css-08",
            prueba: doc => { const f = est(doc, "#form-cita");
              return tarjeta(f) && relleno(f, 32, 32) && todos(doc, "#form-cita fieldset").every(s => s.borderTopStyle === "none" && relleno(s, 0, 0)); } },
          { texto: "Los `legend` a 1.2rem y grosor 700, y cada `label` en bloque, encima de su campo, a 500", repaso: "css-09",
            prueba: doc => { const l = est(doc, "#form-cita > fieldset > legend");
              return cerca(l.fontSize, 19.2) && l.fontWeight === "700" && fuente(l) === "outfit"
                && ["mascota", "fecha", "nombre", "email"].every(n => { const s = est(doc, 'label[for="' + n + '"]'); return s.display === "block" && s.fontWeight === "500" && cerca(s.marginTop, 14); }); } },
          { texto: "Los campos a todo el ancho, con relleno de 12px y 14px, borde de 1px `#cfdcd9`, esquinas de 10px e Inter a 1rem", repaso: "css-08",
            prueba: doc => ["mascota", "fecha", "hora", "motivo", "nombre", "telefono", "email"].every(n => {
              const el = doc.querySelector('#form-cita [name="' + n + '"]'); const s = el && doc.defaultView.getComputedStyle(el);
              return !!s && aTodoElAncho(el, doc.defaultView.getComputedStyle(el.parentElement)) && relleno(s, 12, 14) && cerca(s.borderTopWidth, 1)
                && s.borderTopColor === C.borde && cerca(s.borderTopLeftRadius, 10) && fuente(s) === "inter" && cerca(s.fontSize, 16); }) },
          { texto: "Las casillas y los radios a su tamaño, en línea con su etiqueta", repaso: "css-09",
            prueba: doc => ["#privacidad", '[name="primera"]'].every(sel => [...doc.querySelectorAll("#form-cita " + sel)].every(el => el.getBoundingClientRect().width < 40))
              && est(doc, ".casilla").display === "inline" && est(doc, 'label[for="primera-si"]')?.display === "inline" },
          { texto: "Las notas del formulario a 0.85rem en color suave", repaso: "css-06",
            prueba: doc => todos(doc, "#form-cita p").length > 0 && todos(doc, "#form-cita p").every(s => cerca(s.fontSize, 13.6) && s.color === C.suave) },
          { texto: "El botón «Pedir cita»: relleno de 14px y 26px, sin borde, forma de píldora, fondo principal, texto blanco con Inter a 600 y sombra", repaso: "css-08",
            prueba: doc => { const s = est(doc, "#form-cita button");
              return relleno(s, 14, 26) && s.borderTopStyle === "none" && cerca(s.borderTopLeftRadius, 999) && s.backgroundColor === C.principal
                && s.color === C.fondo && fuente(s) === "inter" && s.fontWeight === "600" && sombra(s); } },
          { texto: "Las opiniones: tarjetas con relleno de 24px y la foto redonda de 72px", repaso: "css-08",
            prueba: doc => todos(doc, ".opinion").every(s => tarjeta(s) && relleno(s, 24, 24))
              && todos(doc, ".opinion img").every(s => s.display === "block" && cerca(s.width, 72) && s.borderTopLeftRadius === "50%") },
          { texto: "El pie: fondo crema, 40px de margen arriba y relleno de 56px, 32px y 24px; sus títulos a 1.1rem", repaso: "css-07",
            prueba: doc => { const f = est(doc, "footer");
              return f.backgroundColor === C.crema && cerca(f.marginTop, 40) && relleno(f, 56, 32, 24, 32) && todos(doc, "footer h2").every(s => cerca(s.fontSize, 17.6)); } },
          { texto: "La línea final del pie: raya de 1px color menta arriba, 1136px como máximo, a 0.85rem en color suave", repaso: "css-08",
            prueba: doc => { const s = est(doc, ".pie-final");
              return cerca(s.borderTopWidth, 1) && s.borderTopStyle === "solid" && s.borderTopColor === C.menta && s.maxWidth === "1136px" && cerca(s.paddingTop, 20)
                && cerca(s.fontSize, 13.6) && s.color === C.suave; } }
        ],
        pistas: [pista, "Para que las casillas no se estiren como los demás campos, una regla después de la de los campos (gana la última): #privacidad, .casilla { display: inline; width: auto; }. Y para las de la primera visita, que están en un fieldset dentro de otro: fieldset fieldset input, fieldset fieldset label { … }."],
        solucion: { html: HTML, css: PASOS[2] },
        alternativas: [{ html: HTML, css: otraForma(PASOS[2]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        enunciado: "**La colocación.** ¡El último encargo! Hasta ahora todo iba en columna. Ahora cada cosa a su sitio, como en la captura:\n\n1. La **cabecera** se queda pegada arriba al bajar, por encima de lo demás, con la marca a la izquierda, el menú en fila y el botón a la derecha.\n2. La **portada** en 3 columnas (texto, foto y tarjeta), con la nota manuscrita encima de la esquina de la foto.\n3. La **franja** en 4 columnas, cada ventaja con su icono al lado.\n4. Los **servicios** en 3 columnas, el **equipo** y las **opiniones** en su cuadrícula, y el **pie** en 4 columnas.\n\nEscribe todas estas reglas **juntas, al final de la hoja**, con un comentario que lo diga: en el Mundo HTML + CSS este bloque será el de las pantallas grandes.",
        captura: "recursos/huellas/capturas/m2-encargo-4.png",
        textos: COMO_LEER + guia(3),
        glosario: ["position: sticky", "z-index", "position: relative", "position: absolute", "top, right, bottom, left", "display: flex", "justify-content", "align-items", "gap", "display: grid", "grid-template-columns", "fr", "repeat()"],
        inicial: { html: HTML, css: PASOS[2] },
        comprobaciones: [
          { texto: "La cabecera se queda pegada arriba al bajar (`sticky`, `top: 0`) y por encima de lo demás (`z-index` 10)", repaso: "css-10",
            prueba: doc => { const s = est(doc, "header"); return s.position === "sticky" && cerca(s.top, 0) && s.zIndex === "10"; } },
          { texto: "La cabecera es flex: la marca a un lado, el botón al otro y todo centrado en vertical", repaso: "css-11",
            prueba: doc => { const s = est(doc, "header"); return s.display === "flex" && s.justifyContent === "space-between" && s.alignItems === "center"; } },
          { texto: "La marca, flex con el logo al lado del nombre (hueco de 10px), y el menú en fila con huecos de 28px", repaso: "css-11",
            prueba: doc => { const m = est(doc, ".marca"); const u = est(doc, "nav ul");
              return m.display === "flex" && m.alignItems === "center" && cerca(m.columnGap, 10) && u.display === "flex" && cerca(u.columnGap, 28); } },
          { texto: "El botón de la cabecera, más pequeño: relleno de 10px y 20px", repaso: "css-07",
            prueba: doc => relleno(est(doc, "header .boton"), 10, 20) },
          { texto: "La portada en una cuadrícula de 3 columnas (la tercera de 300px), con huecos de 32px y centrada en vertical", repaso: "css-13",
            prueba: doc => { const s = est(doc, ".portada"); const c = columnas(s);
              return c.length === 3 && cerca(c[2], 300) && c[0] > c[1] && cerca(s.columnGap, 32) && s.alignItems === "center"; } },
          { texto: "La nota manuscrita, `absolute` sobre la esquina de la foto (`relative`): 56px por encima, 20px a la derecha y 220px de ancho", repaso: "css-10",
            // A 1200px: más estrecha, la foto mide menos de 220px y la nota encoge con ella (max-width: 100%)
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { ancho: 1200 });
              const f = est(v.doc, ".portada-foto"); const n = est(v.doc, ".portada-foto .nota");
              return f.position === "relative" && n.position === "absolute" && cerca(n.top, -56) && cerca(n.right, -20) && cerca(n.width, 220); } },
          { texto: "La franja en 4 columnas iguales con huecos de 20px, y cada ventaja con su icono al lado (flex, hueco de 12px)", repaso: "css-13",
            prueba: doc => { const s = est(doc, ".ventajas"); const c = columnas(s);
              return c.length === 4 && c.every(x => cerca(x, c[0])) && cerca(s.columnGap, 20) && s.position === "relative"
                && todos(doc, ".ventajas li").every(l => l.display === "flex" && l.alignItems === "center" && cerca(l.columnGap, 12)); } },
          { texto: "Los servicios en una cuadrícula de 3 columnas iguales con huecos de 24px", repaso: "css-13",
            // La rejilla es el padre de las tarjetas, se llame como se llame
            prueba: doc => { const s = doc.defaultView.getComputedStyle(doc.querySelector("#servicios .servicio").parentElement);
              const c = columnas(s); return c.length === 3 && c.every(x => cerca(x, c[0])) && cerca(s.columnGap, 24); } },
          { texto: "A 1200px, los 3 primeros servicios van en la misma fila", repaso: "css-13",
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { ancho: 1200 });
              const t = [...v.doc.querySelectorAll(".servicio")].slice(0, 4).map(s => Math.round(s.getBoundingClientRect().top));
              return t.length === 4 && t[0] === t[1] && t[1] === t[2] && t[3] > t[0]; } },
          { texto: "El equipo en 4 columnas y las opiniones en 3", repaso: "css-13",
            prueba: doc => { const fila = sel => { const t = [...doc.querySelectorAll(sel)].map(e => Math.round(e.getBoundingClientRect().top)); return t.length > 1 && t.every(x => x === t[0]) ? t.length : 0; };
              return fila("#equipo figure") === 4 && fila(".opinion") === 3; } },
          { texto: "El pie en 4 columnas (2fr 2fr 1.5fr 1fr) con huecos de 32px, 1136px como máximo y centrado", repaso: "css-13",
            prueba: doc => { const s = est(doc, ".pie-columnas"); const c = columnas(s);
              return c.length === 4 && cerca(c[0], c[1]) && Math.abs(c[2] / c[3] - 1.5) < 0.05 && Math.abs(c[0] / c[3] - 2) < 0.05 && cerca(s.columnGap, 32) && s.maxWidth === "1136px"; } }
        ],
        pistas: [pista, "Una cuadrícula de columnas: .rejilla { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }. Para poner la nota encima de la foto: el padre con position: relative y la nota con position: absolute y top/right. La cabecera pegada: header { position: sticky; top: 0; z-index: 10; }."],
        solucion: { html: HTML, css: PASOS[3] },
        alternativas: [{ html: HTML, css: otraForma(PASOS[3]) }]
      }
    ]
  });
})();
