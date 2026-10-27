/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-13 (inglés)
   Proyecto web: la maqueta profesional de «Huellas»
   (docs/PROYECTO_FINAL.md). Sustituye a hc-11 y hc-12.
   5 encargos sobre la hoja oficial del Mundo 2:
   móvil primero · la portada que se funde · tableta · ratón,
   teclado y formulario · movimiento. En el HTML solo se añaden el botón del menú y la
   clase «active». Las soluciones son HUELLAS["mundo-3"].pasos de la web inglesa
   (lecciones-en/huellas/versiones.js).
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
  const HTML_SIN_ACTIVO = HTML.replace(' class="active"', "");

  // Las guías de estilo de cada encargo, en pseudo-CSS, salen de la hoja oficial: una sección («---------- N.»)
  // o, en el encargo 2, el final de la @media de escritorio («The hero, wider…»)
  const seccion = (css, n) => css.match(new RegExp("/\\* -{10} " + n + "\\.[\\s\\S]*?(?=/\\* -{10} |$)"))[0];
  const PORTADA_ANCHA = PASOS[1].match(/ {2}\/\* The hero, wider[\s\S]*?(?=\n\}\n)/)[0];
  const COMO_LEER = "How to read it: each selector with its properties underneath. You add the braces { }, the ; and var(--…) for the variables (cream → var(--cream)).\n\n";

  // La misma maqueta escrita de otra forma: otros puntos de corte y las rejillas con Flexbox en vez de Grid
  const FLEX = "\n/* The grids, with Flexbox */\n.grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 24px;\n}\n\n.grid > * {\n  flex: 1 1 100%;\n}\n\n" +
    "@media (min-width: 700px) {\n  .grid > * {\n    flex-basis: 40%;\n  }\n}\n\n@media (min-width: 1000px) {\n  .grid > * {\n    flex-basis: 30%;\n  }\n\n  #team .grid > * {\n    flex-basis: 20%;\n  }\n}\n";
  const otraForma = css => css.replace(/min-width: 768px/g, "min-width: 700px").replace(/min-width: 1100px/g, "min-width: 1000px") + FLEX;

  const C = {
    primary: "rgb(31, 122, 107)", primaryDark: "rgb(21, 94, 83)", dark: "rgb(18, 51, 47)", background: "rgb(255, 255, 255)",
    cream: "rgb(247, 250, 248)", mint: "rgb(223, 241, 234)", error: "rgb(194, 58, 82)", errorBackground: "rgb(253, 242, 244)"
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
  const LISTAS = [["#services .service", 6], ["#team figure", 4], [".review", 3]];
  // La página a ese ancho (una copia que el alumno no ve). Se reutiliza entre comprobaciones de la misma evaluación:
  // cada una tiene un tiempo máximo, y copiar la página cuesta. Quien cambie la copia, que pida una propia con PRUEBA.clonar
  const copias = new WeakMap();
  const a = (doc, ancho) => {
    if (!copias.has(doc)) copias.set(doc, {});
    const m = copias.get(doc);
    return m[ancho] || (m[ancho] = PRUEBA.clonar(doc, { ancho, alto: 900 }));
  };

  const pista = "Look at the screenshot and the task's guide, and open the 📚 Glossary if you don't remember a property. To see your page at another width, make the browser window narrower or wider.";

  CURSO.registrar({
    id: "hc-13",
    titulo: "Web project: Huellas's layout",
    xp: 140,
    objetivo: "You'll turn the “Huellas” clinic's website into a professional layout: it will look good on a phone, a tablet and a computer, respond to the mouse and the keyboard, and have smooth motion.",
    pasos: [
      {
        tipo: "explicacion",
        titulo: "Huellas, on any screen",
        texto: "The clinic loves its new look! 🐾 We've merged your style sheet into the **official version**, and here comes the next job: **more than half of its clients visit it on their phones**, and there the desktop website looks tiny and cramped.\n\nThe design team has prepared how it should look on **three screens**: phone (375 px), tablet (768 px) and computer (1200 px). You turn it into a professional layout, in 4 tasks:\n\n• **Mobile first:** the base becomes the phone, with the menu folded behind a button, and the desktop part goes into a `@media`.\n• **Tablet:** two columns from 768 px.\n• **Mouse, keyboard and form:** `:hover` and `:focus-visible` states, decorations with `::after` and fields that warn you.\n• **Motion:** the hero enters with an animation, and nothing moves if the person asks for less motion.\n\nThe checks look at your page at the three widths, as if you opened it on three devices.",
        consejo: "You choose the technique: Grid or Flexbox. The guide's breakpoints (768 and 1100 px) are a suggestion: others are fine, as long as at 375, 768 and 1200 px it looks like the screenshot. To test it, make the browser window narrower and wider."
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "css",
        enunciado: "**Mobile first.** Until now the style sheet was thinking about the computer. Now the **base** (what goes without `@media`) is the **phone**, and the computer is added afterwards:\n\n1. In `index.html`, the **menu button** inside the `header`, between the brand and the `nav`: `<button class=\"menu-button\" type=\"button\">☰ Menu</button>`.\n2. In the base, the guide's **phone values** (smaller headings, less padding) and the **phone layout**: everything in one column, the menu folded (it unfolds with the `open` class, which World 4's JavaScript will add) and the header's “Book your appointment” button hidden. And, since the header sticks to the top, make sure that when you jump from the menu, each section's heading doesn't end up under it (`scroll-margin-top`).\n3. Your **“Layout (desktop)”** block from World 2, inside `@media (min-width: 1100px)`, with the desktop values.\n\nThe tablet width isn't needed yet: at 768 px it can look like the phone. And the hero that blends into the background comes in the next task.",
        captura: "recursos/huellas/capturas-en/m3-encargo-1.png",
        textos: "HTML · in the header, between the brand and the nav\n<button class=\"menu-button\" type=\"button\">☰ Menu</button>\n\n" + COMO_LEER +
          "THE BASE IS THE PHONE · change these values (without @media)\nh1\n  font-size: 2.2rem\n\nh2\n  font-size: 1.7rem\n\nsection\n  padding: 48px 20px\n\nheader\n  padding: 12px 20px\n\n" +
          ".hero\n  margin: 16px            ← instead of margin-top: 32px\n  padding: 28px 20px\n\n.benefits\n  margin: 0 16px\n  padding: 8px 20px\n\ntable\n  padding: 8px\n\nth, td\n  padding: 10px 14px\n\nfooter\n  padding: 40px 20px 24px\n\n" +
          RETOS.guiaCSS(seccion(PASOS[0], 3)) + "\n\n" + RETOS.guiaCSS(seccion(PASOS[0], 5)),
        glosario: ["mobile first", "@media", "min-width and max-width (in @media)", "phone menu (.open)", "display: none", "flex-wrap", "position: sticky", "scroll-margin-top"],
        inicial: INICIO,
        comprobaciones: [
          { texto: "In the `header`, the “☰ Menu” button (`button` with `class=\"menu-button\"` and `type=\"button\"`), between the brand and the `nav`", repaso: "hc-06",
            prueba: doc => { const b = doc.querySelector("header button.menu-button"); const n = doc.querySelector("header nav");
              return !!b && !!n && b.getAttribute("type") === "button" && /menu/i.test(b.textContent.normalize("NFD").replace(/[̀-ͯ]/g, ""))
                && !!(b.compareDocumentPosition(n) & 4) && !!(doc.querySelector("header .brand").compareDocumentPosition(b) & 4); } },
          { texto: "The style sheet uses `@media (min-width: …)`: first the phone and then the big screens", repaso: "hc-06",
            prueba: doc => /@media[^{]*min-width/.test(PRUEBA.textoCSS(doc)) },
          { texto: "At 375 px nothing sticks out of the screen (no horizontal scroll)", repaso: "hc-05",
            prueba: async doc => sinScroll(await a(doc, 375), 375) },
          { texto: "At 375 px, the services, the team and the reviews go in a single column", repaso: "hc-06",
            prueba: async doc => { const v = await a(doc, 375); return LISTAS.every(([s]) => porFila(v.doc, s) === 1); } },
          { texto: "At 375 px, the menu is folded, the “☰ Menu” button shows and the header's “Book your appointment” doesn't", repaso: "hc-06",
            prueba: async doc => { const v = await a(doc, 375);
              return est(v.doc, "nav ul").display === "none" && est(v.doc, ".menu-button").display !== "none" && est(v.doc, "header .button").display === "none"; } },
          { texto: "At 375 px, with the `open` class on the `nav`, the menu unfolds with one link per line", repaso: "hc-06",
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { ancho: 375, alto: 900 }); v.doc.querySelector("nav").classList.add("open");
              const li = [...v.doc.querySelectorAll("nav a")].map(x => x.getBoundingClientRect());
              return est(v.doc, "nav ul").display !== "none" && li.length === 5 && li.every((r, i) => !i || r.top >= li[i - 1].bottom - 1) && cerca(est(v.doc, "nav li a").paddingTop, 10); } },
          { texto: "At 375 px, the header still sticks to the top (`sticky`) and is flex with line wrapping", repaso: "css-10",
            prueba: async doc => { const s = est((await a(doc, 375)).doc, "header");
              return s.position === "sticky" && cerca(s.top, 0) && s.display === "flex" && s.flexWrap === "wrap" && relleno(s, 12, 20); } },
          { texto: "When you jump from the menu to a section, its heading isn't hidden by the header (`scroll-margin-top`), on the phone and on the computer", repaso: "css-10",
            // Copias propias: hacen scroll, y las de a() las comparten otras comprobaciones
            prueba: async doc => { for (const ancho of [375, 1200]) {
                const v = await PRUEBA.clonar(doc, { ancho, alto: 700 });
                v.doc.querySelector("#team").scrollIntoView();
                if (v.doc.querySelector("#team h2").getBoundingClientRect().top < v.doc.querySelector("header").getBoundingClientRect().bottom - 1) return false;
              }
              return true; } },
          { texto: "At 375 px, the phone values: `h1` at 2.2rem, `h2` at 1.7rem, sections with 48px and 20px padding", repaso: "hc-06",
            prueba: async doc => { const d = (await a(doc, 375)).doc;
              return cerca(est(d, "h1").fontSize, 35.2) && cerca(est(d, "h2").fontSize, 27.2) && relleno(est(d, "#services"), 48, 20); } },
          { texto: "At 375 px: hero with a 16px margin and 28px and 20px padding, strip with a 16px margin on the sides, and the note at 180px", repaso: "css-07",
            prueba: async doc => { const d = (await a(doc, 375)).doc; const n = est(d, ".hero-photo .note");
              return margen(est(d, ".hero"), 16, 16) && relleno(est(d, ".hero"), 28, 20) && margen(est(d, ".benefits"), 0, 16) && relleno(est(d, ".benefits"), 8, 20)
                && n.position === "absolute" && cerca(n.top, -40) && cerca(n.width, 180) && relleno(est(d, "footer"), 40, 20, 24, 20); } },
          { texto: "At 1200 px, like in World 2: menu in a row, without the “☰ Menu” button, with “Book your appointment” and the big headings", repaso: "hc-05",
            prueba: async doc => { const d = (await a(doc, 1200)).doc;
              return est(d, "nav ul").display === "flex" && est(d, ".menu-button").display === "none" && est(d, "header .button").display !== "none"
                && cerca(est(d, "h1").fontSize, 49.6) && cerca(est(d, "h2").fontSize, 32) && relleno(est(d, "#services"), 72, 32); } },
          { texto: "At 1200 px, the services in 3 columns, the team in 4 and the reviews in 3, without horizontal scroll", repaso: "css-13",
            prueba: async doc => { const v = await a(doc, 1200);
              return sinScroll(v, 1200) && porFila(v.doc, "#services .service") === 3 && porFila(v.doc, "#team figure") === 4 && porFila(v.doc, ".review") === 3; } }
        ],
        pistas: [pista, "To move to desktop: cut your “Layout (desktop)” block and paste it inside @media (min-width: 1100px) { … }. Outside, in the base, leave the phone layout. Remember: the base has no @media, and each @media (min-width) adds or changes something for wider screens."],
        solucion: { html: HTML_SIN_ACTIVO, css: PASOS[0] },
        alternativas: [{ html: HTML_SIN_ACTIVO, css: otraForma(PASOS[0]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "css",
        enunciado: "**The hero that blends in.** On the computer, the hero gets wider: the photo takes up more space and its left side blends into the cream background, like in the screenshot. It all goes **at the end of the desktop `@media`**:\n\n1. The hero, wider and with more space at the bottom; the photo, without a margin.\n2. On top of the photo, an `::after`: an empty layer (`content: \"\"`) placed with `position: absolute` over its left side and painted with a **gradient** from cream to transparent.\n3. The handwritten note, above the gradient.\n4. The strip rises over the hero again, like in World 2.\n\nNothing changes on the phone.",
        captura: "recursos/huellas/capturas-en/m3-encargo-2.png",
        textos: COMO_LEER + "DESKTOP · at the end of the @media (min-width: 1100px)\n" + RETOS.guiaCSS(PORTADA_ANCHA).replace(/^/gm, "  "),
        glosario: ["::before and ::after", "content", "linear-gradient()", "position: absolute", "top, right, bottom, left", "z-index", "grid-template-columns", "fr"],
        inicial: { html: HTML_SIN_ACTIVO, css: PASOS[0] },
        comprobaciones: [
          { texto: "At 1200 px, the wider hero: 32px margin on top, 48px padding and 88px at the bottom, and the photo in the widest column", repaso: "css-13",
            prueba: async doc => { const d = (await a(doc, 1200)).doc; const p = est(d, ".hero");
              const anchos = [".hero-text", ".hero-photo", ".appointment-card"].map(s => d.querySelector(s).getBoundingClientRect().width);
              return cerca(p.marginTop, 32) && relleno(p, 48, 48, 88, 48) && anchos[1] > anchos[0] && cerca(anchos[2], 300) && cerca(est(d, ".hero-photo").marginTop, 0); } },
          { texto: "On top of the photo, an empty, `absolute` `::after`, from top to bottom on the left side (45% wide)", repaso: "hc-03",
            prueba: async doc => { const d = (await a(doc, 1200)).doc; const f = est(d, ".hero-photo", "::after"); const foto = d.querySelector(".hero-photo").getBoundingClientRect();
              return f.content === '""' && f.position === "absolute" && cerca(f.top, 0) && cerca(f.bottom, 0) && cerca(f.left, 0) && Math.abs(px(f.width) - foto.width * 0.45) < 2; } },
          { texto: "The layer is painted with a gradient to the right, from cream to transparent", repaso: "hc-03",
            prueba: async doc => { const f = est((await a(doc, 1200)).doc, ".hero-photo", "::after");
              return /linear-gradient\(to right, rgb\(247, 250, 248\), rgba\(247, 250, 248, 0\)\)/.test(f.backgroundImage); } },
          { texto: "The handwritten note is above the gradient (`z-index` 1)", repaso: "css-10",
            prueba: async doc => est((await a(doc, 1200)).doc, ".hero-photo .note").zIndex === "1" },
          { texto: "At 1200 px, the strip rises 40px over the hero again, with 22px and 28px padding", repaso: "css-07",
            prueba: async doc => { const d = (await a(doc, 1200)).doc; const v = est(d, ".benefits");
              return cerca(v.marginTop, -40) && relleno(v, 22, 28) && todos(d, ".benefits li").every(l => cerca(l.marginTop, 0)); } },
          { texto: "Nothing changes on the phone: at 375 px, the hero still has a 16px margin and no layer", repaso: "hc-06",
            prueba: async doc => { const d = (await a(doc, 375)).doc; return margen(est(d, ".hero"), 16, 16) && est(d, ".hero-photo", "::after").content === "none"; } }
        ],
        pistas: [pista, "The layer: .hero-photo::after { content: \"\"; position: absolute; top: 0; bottom: 0; left: 0; width: 45%; background: linear-gradient(to right, var(--cream), rgb(247 250 248 / 0)); }. The photo already has position: relative, so the layer is placed relative to it. It goes inside the desktop @media: it mustn't show on the phone."],
        solucion: { html: HTML_SIN_ACTIVO, css: PASOS[1] },
        alternativas: [{ html: HTML_SIN_ACTIVO, css: otraForma(PASOS[1]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "css",
        enunciado: "**The tablet.** Between the phone and the computer there's a gap: at 768 px everything goes in one very long column. Add a `@media (min-width: 768px)` (before the desktop one, so the desktop one wins) with **two columns**:\n\n1. The **hero**: the text and the photo side by side, and the “Book your appointment” card below, spanning both columns.\n2. The **strip**, the **services**, the **team**, the **reviews** and the **footer**, in two columns.\n\nAnd on desktop, the appointment card goes back to its column (`grid-column: auto`).",
        captura: "recursos/huellas/capturas-en/m3-encargo-3.png",
        textos: COMO_LEER + RETOS.guiaCSS(seccion(PASOS[2], 4)),
        glosario: ["cascading @media", "min-width and max-width (in @media)", "display: grid", "grid-template-columns", "fr", "grid-column: 1 / 3", "grid-column: span 2", "gap"],
        inicial: { html: HTML_SIN_ACTIVO, css: PASOS[1] },
        comprobaciones: [
          { texto: "At 768 px nothing sticks out of the screen", repaso: "hc-05",
            prueba: async doc => sinScroll(await a(doc, 768), 768) },
          { texto: "At 768 px, the hero's text and photo go side by side", repaso: "hc-06",
            prueba: async doc => { const d = (await a(doc, 768)).doc; const t = d.querySelector(".hero-text").getBoundingClientRect(); const f = d.querySelector(".hero-photo").getBoundingClientRect();
              return f.left >= t.right - 1 && f.top < t.bottom; } },
          { texto: "At 768 px, the “Book your appointment” card goes below, spanning both columns", repaso: "css-13",
            prueba: async doc => { const d = (await a(doc, 768)).doc; const t = d.querySelector(".hero-text").getBoundingClientRect();
              const f = d.querySelector(".hero-photo").getBoundingClientRect(); const c = d.querySelector(".appointment-card").getBoundingClientRect();
              return c.top >= Math.max(t.bottom, f.bottom) - 1 && c.left <= t.left + 1 && c.right >= f.right - 1; } },
          { texto: "At 768 px, the strip in two columns", repaso: "css-13",
            prueba: async doc => porFila((await a(doc, 768)).doc, ".benefits li") === 2 },
          { texto: "At 768 px, the services, the team, the reviews and the footer, in two columns", repaso: "hc-06",
            prueba: async doc => { const d = (await a(doc, 768)).doc;
              return LISTAS.every(([s]) => porFila(d, s) === 2) && porFila(d, ".footer-columns > *") === 2; } },
          { texto: "At 375 px, everything is still in one column", repaso: "hc-06",
            prueba: async doc => { const d = (await a(doc, 375)).doc; return LISTAS.every(([s]) => porFila(d, s) === 1) && porFila(d, ".benefits li") === 1; } },
          { texto: "At 1200 px, the hero goes back to 3 columns, with the appointment card on the right", repaso: "hc-06",
            prueba: async doc => { const d = (await a(doc, 1200)).doc; const f = d.querySelector(".hero-photo").getBoundingClientRect(); const c = d.querySelector(".appointment-card").getBoundingClientRect();
              return c.left >= f.right - 1 && porFila(d, "#services .service") === 3; } }
        ],
        pistas: [pista, "A @media (min-width: 768px) { .grid { grid-template-columns: 1fr 1fr; } } gives two columns from 768 px. It must go BEFORE the 1100 px one: if it goes after, at 1200 px it's also true and it would win. To make the card span both columns: grid-column: 1 / 3."],
        solucion: { html: HTML_SIN_ACTIVO, css: PASOS[2] },
        alternativas: [{ html: HTML_SIN_ACTIVO, css: otraForma(PASOS[2]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "css",
        enunciado: "**Mouse, keyboard and form.** A professional website responds to what you do:\n\n1. In `index.html`, the menu's **Home** link gets `class=\"active\"`: it's the section you're in (in World 4, JavaScript will change it when you click).\n2. The **decorations with `::after`**: the little line under the active link and the one under each kicker.\n3. When you **hover**: the menu links change color, the buttons get darker and rise 2px, and the cards rise 4px with more shadow. All with a smooth **transition**.\n4. With the **keyboard**, focus is visible: a 3px outline.\n5. The **form**: the field with focus is highlighted, the wrong one turns red (after you touch it) and the right one turns green.",
        captura: "recursos/huellas/capturas-en/m3-encargo-4.png",
        textos: "HTML · the menu's “Home”\n<a class=\"active\" href=\"#home\">Home</a>\n\n" + COMO_LEER + RETOS.guiaCSS(seccion(PASOS[3], 6)),
        glosario: [":hover", ":focus-visible", "active link (.active)", "::before and ::after", "content", "transform: translate()", "transition", "outline", ":user-invalid and :user-valid", "a, b (grouping)"],
        inicial: { html: HTML_SIN_ACTIVO, css: PASOS[2] },
        comprobaciones: [
          { texto: "The menu's “Home” link has `class=\"active\"`", repaso: "hc-04",
            prueba: doc => { const a1 = doc.querySelector('nav a[href="#home"]'); return !!a1 && a1.classList.contains("active") && doc.querySelectorAll("nav a.active").length === 1; } },
          { texto: "The active link: dark color, weight 600 and a 24 × 2 px line underneath, made with `::after`", repaso: "hc-04",
            prueba: doc => { const s = est(doc, "nav a.active"); const r = est(doc, "nav a.active", "::after");
              return s.color === C.dark && s.fontWeight === "600" && r.content === '""' && r.position === "absolute" && cerca(r.width, 24) && cerca(r.height, 2) && r.backgroundColor === C.primary; } },
          { texto: "Each kicker with its line underneath: a block `::after`, 36 × 3 px and in the primary color", repaso: "hc-03",
            prueba: doc => { const r = est(doc, ".kicker", "::after");
              return r.content === '""' && r.display === "block" && cerca(r.width, 36) && cerca(r.height, 3) && cerca(r.marginTop, 10) && r.backgroundColor === C.primary; } },
          { texto: "On hover, the menu links turn the primary color", repaso: "hc-02",
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { estado: "hover", ancho: 1200 }); return est(v.doc, 'nav a[href="#services"]').color === C.primary; } },
          { texto: "On hover, the buttons get darker and rise 2px", repaso: "hc-07",
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { estado: "hover", ancho: 1200 });
              return [".hero .button", "#appointment-form button"].every(s => { const e = est(v.doc, s); return e.backgroundColor === C.primaryDark && subido(e, -2); }); } },
          { texto: "On hover, the services, the team members and the reviews rise 4px with more shadow", repaso: "hc-07",
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { estado: "hover", ancho: 1200 });
              return [".service", "#team figure", ".review"].every(s => { const e = est(v.doc, s); return subido(e, -4) && /0px 16px 36px/.test(e.boxShadow); }); } },
          { texto: "The buttons and the cards change with a 0.2s transition on `transform`, the shadow and the background", repaso: "hc-08",
            prueba: doc => [".button", "#appointment-form button", ".service", "#team figure", ".review"].every(s => { const e = est(doc, s);
              const p = e.transitionProperty.split(", "); const d = e.transitionDuration.split(", ");
              return ["transform", "box-shadow", "background-color"].every(x => { const i = p.indexOf(x) >= 0 ? p.indexOf(x) : p.indexOf("all"); return i >= 0 && segundos(d[i % d.length], 0.2); }); }) },
          { texto: "With the keyboard, the focus on links and buttons is visible: a 3px outline in the primary color", repaso: "hc-04",
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { estado: "focus", ancho: 1200 });
              return [".hero .button", "#appointment-form button"].every(s => { const e = est(v.doc, s); return cerca(e.outlineWidth, 3) && e.outlineStyle === "solid" && e.outlineColor === C.primary; }); } },
          { texto: "The field with focus: a border in the primary color and a soft 3px outline", repaso: "hc-10",
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { estado: "focus", ancho: 1200 }); const e = est(v.doc, '#appointment-form [name="name"]');
              return e.borderTopColor === C.primary && cerca(e.outlineWidth, 3) && /rgba\(31, 122, 107, 0\.2\)/.test(e.outlineColor); } },
          { texto: "Badly filled fields (`:user-invalid`) with a `#c23a52` border and a `#fdf2f4` background, and the good ones (`:user-valid`), with a primary border", repaso: "hc-10",
            prueba: doc => { const mal = PRUEBA.reglas(doc, ":user-invalid"); const bien = PRUEBA.reglas(doc, ":user-valid");
              return ["input", "select", "textarea"].every(t => mal.some(r => r.selectorText.includes(t + ":user-invalid") && r.style.borderColor === C.error && r.style.backgroundColor === C.errorBackground))
                && bien.some(r => /input:user-valid/.test(r.selectorText) && /var\(--primary\)|rgb\(31, 122, 107\)/.test(r.style.borderColor)); } }
        ],
        pistas: [pista, "A line with ::after: nav a.active { position: relative; } and nav a.active::after { content: \"\"; position: absolute; left: 0; bottom: -4px; width: 24px; height: 2px; background-color: var(--primary); }. For the change to be smooth, the transition goes in the normal state (.service { transition: … }), not in :hover."],
        solucion: { html: HTML, css: PASOS[3] },
        alternativas: [{ html: HTML, css: otraForma(PASOS[3]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "css",
        enunciado: "**Motion.** The last task!\n\n1. A `@keyframes` animation called **`fade-in`**: it starts invisible and 24px lower, and ends visible in its place.\n2. The hero's **text**, **photo** and **appointment card** use it when the page loads: 0.7s, `ease-out`.\n3. **Less motion, please:** if the person's computer asks for less motion, the hero doesn't animate and the cards and buttons have no transition.\n\nWhen you finish, the list reviews the layout at the three widths.",
        captura: "recursos/huellas/capturas-en/m3-encargo-5.png",
        textos: COMO_LEER + RETOS.guiaCSS(seccion(PASOS[4], 7)),
        glosario: ["@keyframes", "animation", "prefers-reduced-motion", "transform: translate()", "opacity", "transition"],
        inicial: { html: HTML, css: PASOS[3] },
        comprobaciones: [
          { texto: "The hero's text, photo and card use the `fade-in` animation, 0.7s and `ease-out`", repaso: "hc-09",
            prueba: doc => [".hero-text", ".hero-photo", ".appointment-card"].every(s => { const e = est(doc, s);
              return e.animationName === "fade-in" && segundos(e.animationDuration, 0.7) && e.animationTimingFunction === "ease-out"; }) },
          { texto: "`fade-in` starts invisible and 24px lower…", repaso: "hc-09",
            // clonar deja las animaciones paradas en su primer fotograma
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { ancho: 1200 }); const e = est(v.doc, ".hero-text"); return cerca(e.opacity, 0) && subido(e, 24); } },
          { texto: "…and ends visible and in its place", repaso: "hc-09",
            prueba: doc => /@keyframes\s+fade-in\s*\{[\s\S]*?(to|100%)\s*\{[^}]*opacity:\s*1/.test(PRUEBA.textoCSS(doc)) },
          { texto: "With less motion (`prefers-reduced-motion`), the hero doesn't animate", repaso: "hc-09",
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { ancho: 1200, movimiento: "reducido" });
              return [".hero-text", ".hero-photo", ".appointment-card"].every(s => est(v.doc, s).animationName === "none"); } },
          { texto: "With less motion, the buttons and the cards have no transition", repaso: "hc-09",
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { ancho: 1200, movimiento: "reducido" });
              return [".button", "#appointment-form button", ".service", "#team figure", ".review"].every(s => est(v.doc, s).transitionDuration.split(", ").every(d => px(d) === 0)); } },
          { texto: "Review: at 375, 768 and 1200 px nothing sticks out of the screen", repaso: "hc-05",
            prueba: async doc => sinScroll(await a(doc, 375), 375) && sinScroll(await a(doc, 768), 768) && sinScroll(await a(doc, 1200), 1200) },
          { texto: "Review: the services in 1, 2 and 3 columns at 375, 768 and 1200 px", repaso: "hc-06",
            prueba: async doc => porFila((await a(doc, 375)).doc, ".service") === 1 && porFila((await a(doc, 768)).doc, ".service") === 2 && porFila((await a(doc, 1200)).doc, ".service") === 3 }
        ],
        pistas: [pista, "@keyframes fade-in { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } } and then .hero-text { animation: fade-in 0.7s ease-out; }. The less-motion part goes inside @media (prefers-reduced-motion: reduce) { … } with animation: none and transition: none."],
        solucion: { html: HTML, css: PASOS[4] },
        alternativas: [{ html: HTML, css: otraForma(PASOS[4]) }]
      }
    ]
  });
})();
