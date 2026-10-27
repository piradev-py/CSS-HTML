/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-15 (inglés)
   Proyecto web: la identidad de «Huellas» (docs/PROYECTO_FINAL.md).
   4 encargos sobre el mismo estilos.css, que empieza vacío:
   identidad · cajas y tarjetas · horario, cita, opiniones y pie ·
   colocación de escritorio. El HTML es el oficial del Mundo 2 (el
   equipo de diseño añadió los 3 servicios y las 2 personas que
   faltaban); el alumno solo le añade los <link>.
   Las soluciones son HUELLAS["mundo-2"].pasos de la web inglesa
   (lecciones-en/huellas/versiones.js).
   Notas:
   - Se comprueba el estilo calculado, no el texto del CSS: da igual
     `#1f7a6b` que `var(--primary)` o `rgb(31 122 107)`, y los
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
  const COMO_LEER = "How to read it: each selector with its properties underneath. You add the braces { }, the ; and var(--…) for the variables (cream → var(--cream)).\n\n";

  // La misma hoja escrita de otra forma: colores en rgb(), columnas sin repeat(), rem en px, otros selectores
  const otraForma = css => css.replace("--primary: #1f7a6b;", "--primary: rgb(31 122 107);")
    .replace(/repeat\(3, 1fr\)/g, "1fr 1fr 1fr").replace(/repeat\(4, 1fr\)/g, "1fr 1fr 1fr 1fr")
    .replace("font-size: 3.1rem;", "font-size: 49.6px;").replace(".kicker {", "p.kicker {")
    .replace(/margin: 0 auto;/g, "margin: 0px auto 0px auto;");

  const C = {
    primary: "rgb(31, 122, 107)", dark: "rgb(18, 51, 47)", text: "rgb(43, 59, 57)", soft: "rgb(95, 112, 109)",
    background: "rgb(255, 255, 255)", cream: "rgb(247, 250, 248)", mint: "rgb(223, 241, 234)", border: "rgb(207, 220, 217)"
  };
  const est = (doc, sel) => { const el = doc.querySelector(sel); return el ? doc.defaultView.getComputedStyle(el) : null; };
  const todos = (doc, sel) => [...doc.querySelectorAll(sel)].map(el => doc.defaultView.getComputedStyle(el));
  const px = v => parseFloat(v);
  const cerca = (v, n) => Math.abs(px(v) - n) < 0.6;
  const fuente = s => !!s && s.fontFamily.replace(/["']/g, "").split(",")[0].trim().toLowerCase();
  const relleno = (s, a, b, c = a, d = b) => !!s && cerca(s.paddingTop, a) && cerca(s.paddingRight, b) && cerca(s.paddingBottom, c) && cerca(s.paddingLeft, d);
  const sombra = s => !!s && s.boxShadow !== "none" && /0px 10px 30px/.test(s.boxShadow);
  const tarjeta = s => !!s && s.backgroundColor === C.background && cerca(s.borderTopLeftRadius, 20) && sombra(s);
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

  const pista = "Look at the screenshot and the task's style guide, and open the 📚 Glossary if you don't remember a property. Each check in red has a link to review its lesson.";

  CURSO.registrar({
    id: "css-15",
    titulo: "Web project: Huellas's identity",
    xp: 120,
    objetivo: "You'll give the “Huellas” clinic's website its visual identity with a style sheet of its own, following the design team's style guide.",
    pasos: [
      {
        tipo: "explicacion",
        titulo: "Your HTML, now with style",
        texto: "Great job with the HTML! 🐾 We've reviewed your work and merged it into the **official version** of the website. At the clinic's request, the design team added what was missing: the **other 3 services** (dental health, dermatology and diagnostics) and the **other 2 people** on the team. Plus a few small touches: each benefit's text goes in a `<p>`, the privacy checkbox's label has `class=\"checkbox\"` and the pieces you're going to decorate have **their class** (`brand`, `hero`, `hero-text`, `hero-photo`, `appointment-card`, `benefits`, `grid`, `icon`, `footer-columns`, `footer-bottom`…). Take a look at `index.html` before you start: the task texts use those classes.\n\nNow the clinic wants its website to **look like its brand**. The design team has prepared the **style guide**: colors, fonts, sizes, corners and shadows. You turn it into CSS, in a separate file: `estilos.css`.\n\nThere are 4 tasks:\n\n• **Identity:** link the style sheet and the fonts, the guide's variables, the text and the buttons.\n• **Boxes and cards:** the header, the hero, the strip, the services and the team.\n• **Hours, appointment, reviews and footer.**\n• **Layout:** everything in its place, with `position`, Flexbox and Grid.\n\nSame as before: screenshot, **📄 Task texts** (here, the style guide for that part), the list that turns green and the **📚 Glossary**.",
        consejo: "What gets checked is how the page **looks**, not how you write the CSS: you choose the selectors, the order of the rules and any extra variables. This time the website is designed for a computer screen; mobile comes in the HTML + CSS World."
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        enunciado: "**The identity.** First, in `index.html`, inside the `<head>` and after the favicon: the `<link>` for the **Outfit** and **Inter** fonts (Google Fonts) and the `<link>` to `estilos.css`.\n\nThen, in `estilos.css`:\n\n1. The guide's **variables** in `:root`, with the names from the guide (the JavaScript and World 3 will use them).\n2. `box-sizing: border-box` for everything, and the `body`: no margin, with the guide's font, size, line height and colors.\n3. The `h1`, `h2` and `h3` **headings** (and the `legend`s), the **links** and the images (they must never be wider than their box).\n4. The **kickers** (`class=\"kicker\"`) and the **buttons** (`class=\"button\"`).\n\nUse the variables in the rest of the sheet: if the clinic changes a color, it changes in just one place.",
        captura: "recursos/huellas/capturas-en/m2-encargo-1.png",
        textos: "HTML · in the <head>, after the favicon\n<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&family=Inter:wght@400;500;600&display=swap\">\n<link rel=\"stylesheet\" href=\"estilos.css\">\n\n" + COMO_LEER + guia(0),
        glosario: ["<link rel=\"stylesheet\">", "Web fonts (Google Fonts)", ":root", "--name", "var()", "box-sizing: border-box", "font-family", "font-size", "font-weight", "line-height", "letter-spacing", "text-transform", "max-width"],
        inicial: { html: SIN_ENLACES, css: "" },
        comprobaciones: [
          { texto: "`index.html` links `estilos.css`", repaso: "css-01",
            prueba: doc => !!doc.querySelector('style[data-archivo="estilos.css"]') },
          { texto: "`index.html` links the Outfit and Inter fonts from Google Fonts", repaso: "css-04",
            prueba: doc => [...doc.querySelectorAll('link[rel="stylesheet"]')].some(l => /fonts\.googleapis\.com/.test(l.href) && /Outfit/.test(l.href) && /Inter/.test(l.href)) },
          { texto: "In `:root`, the guide's color variables: `--primary`, `--dark`, `--text`, `--soft`, `--background`, `--cream` and `--mint`", repaso: "css-14",
            prueba: doc => ["primary", "dark", "text", "soft", "background", "cream", "mint"].every(n => variable(doc, "--" + n, "color", "rgb(1, 2, 3)") === C[n]) },
          { texto: "And `--font-headings`, `--font-body`, `--radius` and `--shadow`", repaso: "css-14",
            prueba: doc => /^"?outfit/i.test(variable(doc, "--font-headings", "font-family", "monospace")) && /^"?inter/i.test(variable(doc, "--font-body", "font-family", "monospace"))
              && variable(doc, "--radius", "border-top-left-radius", "1px") === "20px" && /0px 10px 30px/.test(variable(doc, "--shadow", "box-shadow", "none")) },
          { texto: "The sheet uses the variables (`var(--…)`) in its rules", repaso: "css-14",
            prueba: doc => (PRUEBA.textoCSS(doc).match(/var\(--/g) || []).length >= 6 },
          { texto: "Everything with `box-sizing: border-box`, and the `body` with no margin, Inter at 16px, line height 1.6 and the guide's colors", repaso: "css-07",
            prueba: doc => { const b = est(doc, "body");
              return est(doc, "main").boxSizing === "border-box" && b.boxSizing === "border-box" && cerca(b.marginTop, 0) && fuente(b) === "inter"
                && cerca(b.fontSize, 16) && cerca(b.lineHeight, 25.6) && b.color === C.text && b.backgroundColor === C.background; } },
          { texto: "The `h1`, `h2` and `h3` headings in Outfit and the dark color", repaso: "css-04",
            prueba: doc => todos(doc, "h1, h2, h3").every(s => fuente(s) === "outfit" && s.color === C.dark) },
          { texto: "The guide's sizes: `h1` at 3.1rem and weight 800, `h2` at 2rem and `h3` at 1.2rem, both at 700", repaso: "css-06",
            prueba: doc => { const [h1, h2, h3] = ["h1", "h2", "h3"].map(t => est(doc, t));
              return cerca(h1.fontSize, 49.6) && h1.fontWeight === "800" && cerca(h2.fontSize, 32) && h2.fontWeight === "700" && cerca(h3.fontSize, 19.2) && h3.fontWeight === "700"; } },
          { texto: "Links in the primary color and images with a maximum width of `100%`", repaso: "css-07",
            prueba: doc => est(doc, 'footer a[href^="mailto:"]').color === C.primary && est(doc, ".hero-photo img").maxWidth === "100%" },
          { texto: "The kickers: 0.78rem, weight 600, in CAPITALS, letters spaced 0.2em, primary color and no margin", repaso: "css-04",
            prueba: doc => todos(doc, ".kicker").every(s => cerca(s.fontSize, 12.48) && s.fontWeight === "600" && s.textTransform === "uppercase"
              && cerca(s.letterSpacing, 2.5) && s.color === C.primary && cerca(s.marginTop, 0) && cerca(s.marginBottom, 0)) },
          { texto: "The `.button` buttons: `inline-block`, padding 14px 26px, pill shape, primary background, white text at 600, no underline and with a shadow", repaso: "css-08",
            prueba: doc => { const s = est(doc, ".hero .button");
              return s.display === "inline-block" && relleno(s, 14, 26) && cerca(s.borderTopLeftRadius, 999) && s.backgroundColor === C.primary
                && s.color === C.background && s.fontWeight === "600" && s.textDecorationLine === "none" && sombra(s); } }
        ],
        pistas: [pista, "Variables go like this: :root { --primary: #1f7a6b; … } and you use them with var(): a { color: var(--primary); }. To make a rule apply to everything: * { box-sizing: border-box; }. And for several selectors at once: h1, h2, h3, legend { … }."],
        solucion: { html: HTML, css: PASOS[0] },
        alternativas: [{ html: HTML, css: otraForma(PASOS[0]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        enunciado: "**Boxes and cards.** Now the spacing and the cards, from top to bottom:\n\n1. The **sections**, in a column 1200px wide at most, centered and with padding.\n2. The **header**, the **brand** (logo and name) and the **menu**, with no bullets or underlines.\n3. The **hero** in a cream box with rounded corners, its text and its photo.\n4. The white **cards** with corners and a shadow: the “Book your appointment” one, the benefits strip, the services and the people on the team. There are more cards like these in the next task: a selector grouped with commas saves you repeating yourself.\n\nFor now everything goes in a column, one thing below another: the layout comes in the last task.",
        captura: "recursos/huellas/capturas-en/m2-encargo-2.png",
        textos: COMO_LEER + guia(1),
        glosario: ["max-width", "margin: 0 auto", "padding", "margin", "border-radius", "border-radius: 50%", "box-shadow", "list-style: none", "display: block", "text-decoration", "a, b (grouping)", "a b (descendant)"],
        inicial: { html: HTML, css: PASOS[0] },
        comprobaciones: [
          { texto: "The sections: 1200px wide at most, centered, and with 72px of padding on top and bottom and 32px on the sides", repaso: "css-07",
            prueba: async doc => { const s = est(doc, "#services"); const v = await PRUEBA.clonar(doc, { ancho: 1400 });
              const a = v.win.getComputedStyle(v.doc.querySelector("#services"));
              return s.maxWidth === "1200px" && relleno(s, 72, 32) && px(a.marginLeft) > 50 && cerca(a.marginLeft, px(a.marginRight)); } },
          { texto: "The header: 16px and 32px of padding, white background and a shadow", repaso: "css-08",
            prueba: doc => { const s = est(doc, "header"); return relleno(s, 16, 32) && s.backgroundColor === C.background && sombra(s); } },
          { texto: "The brand: small text in CAPITALS and no underline; “Huellas” as a block, in Outfit at 1.6rem and weight 800", repaso: "css-09",
            prueba: doc => { const m = est(doc, ".brand"); const n = est(doc, ".brand strong");
              return cerca(m.fontSize, 10.4) && m.textTransform === "uppercase" && m.textDecorationLine === "none" && m.color === C.soft
                && n.display === "block" && fuente(n) === "outfit" && cerca(n.fontSize, 25.6) && n.fontWeight === "800" && n.textTransform === "none" && n.color === C.dark; } },
          { texto: "The menu: a list with no bullets, no margin or padding, and links in the text color, at 500 and with no underline", repaso: "css-09",
            prueba: doc => { const u = est(doc, "nav ul");
              return u.listStyleType === "none" && cerca(u.paddingLeft, 0) && cerca(u.marginTop, 0)
                && todos(doc, "nav a").every(a => a.color === C.text && a.fontWeight === "500" && a.textDecorationLine === "none"); } },
          { texto: "The hero: a cream box with 20px corners, 48px of padding and a 32px top margin; “their entire life” not in italics and in the primary color", repaso: "css-08",
            prueba: doc => { const p = est(doc, ".hero"); const em = est(doc, ".hero h1 em");
              return p.backgroundColor === C.cream && cerca(p.borderTopLeftRadius, 20) && relleno(p, 48, 48) && cerca(p.marginTop, 32)
                && em.fontStyle === "normal" && em.color === C.primary; } },
          { texto: "The hero text at 1.1rem in the soft color, and its photo as a block with 20px corners", repaso: "css-06",
            prueba: doc => { const t = est(doc, ".hero-text"); const f = est(doc, ".hero-photo img");
              return cerca(t.fontSize, 17.6) && t.color === C.soft && f.display === "block" && cerca(f.borderTopLeftRadius, 20); } },
          { texto: "White cards with 20px corners and a shadow: “Book your appointment”, the strip, the services and the team", repaso: "css-08",
            prueba: doc => [".appointment-card", ".benefits", ".service", "#team figure"].every(sel => todos(doc, sel).length > 0 && todos(doc, sel).every(tarjeta)) },
          { texto: "The “Book your appointment” card: 28px of padding and its button as a block, centered and 20px further down", repaso: "css-09",
            prueba: doc => { const b = est(doc, ".appointment-card .button");
              return relleno(est(doc, ".appointment-card"), 28, 28) && b.display === "block" && b.textAlign === "center" && cerca(b.marginTop, 20); } },
          { texto: "The strip: no bullets, 1136px at most, 22px and 28px of padding, 40px upward; its headings as blocks", repaso: "css-07",
            prueba: doc => { const v = est(doc, ".benefits");
              return v.listStyleType === "none" && v.maxWidth === "1136px" && relleno(v, 22, 28) && cerca(v.marginTop, -40)
                && todos(doc, ".benefits strong").every(s => s.display === "block" && s.color === C.dark) && todos(doc, ".benefits p").every(s => cerca(s.fontSize, 14.4)); } },
          { texto: "The services: 22px of padding, photo as a block at full width with 12px corners, and a 52px round icon, raised 38px over the photo", repaso: "css-08",
            prueba: doc => { const s = est(doc, ".service"); const f = est(doc, ".service img:not(.icon)"); const i = est(doc, ".service .icon");
              return relleno(s, 22, 22) && f.display === "block" && cerca(f.borderTopLeftRadius, 12)
                && cerca(i.width, 52) && i.borderTopLeftRadius === "50%" && cerca(i.marginTop, -38) && cerca(i.marginLeft, 12); } },
          { texto: "The team: each person with no margin and 16px of padding; their photo with 12px corners and the name in Outfit at 1.15rem", repaso: "css-07",
            prueba: doc => { const f = est(doc, "#team figure"); const i = est(doc, "#team figure img"); const n = est(doc, "#team figcaption strong");
              return cerca(f.marginLeft, 0) && cerca(f.marginTop, 0) && relleno(f, 16, 16) && i.display === "block" && cerca(i.borderTopLeftRadius, 12)
                && cerca(est(doc, "#team figcaption").marginTop, 12) && fuente(n) === "outfit" && cerca(n.fontSize, 18.4) && n.color === C.dark; } }
        ],
        pistas: [pista, "A grouped selector saves you repeating: .appointment-card, .benefits, .service, #team figure { background-color: var(--background); border-radius: var(--radius); box-shadow: var(--shadow); }. To pick only what's inside, the descendant selector: .service img { … }, nav a { … }."],
        solucion: { html: HTML, css: PASOS[1] },
        alternativas: [{ html: HTML, css: otraForma(PASOS[1]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        enunciado: "**Hours, appointment, reviews and footer.** The second half of the page:\n\n1. The **hours** and the **appointment**, in a narrower column (800px); the **table** as a card.\n2. The **form**: a card with padding, `fieldset`s with no border, each `label` above its field and the fields at full width. The **checkboxes** and **radio buttons**, on the other hand, at their own size and with the label beside them. The submit **button**, like the others.\n3. The **reviews**, in cards with a round photo.\n4. The **footer**, with a cream background and the bottom line separated by a thin rule.",
        captura: "recursos/huellas/capturas-en/m2-encargo-3.png",
        textos: COMO_LEER + guia(2),
        glosario: ["max-width", "border", "padding", "margin", "display: block", "display: inline", "width and height", "border-radius: 50%", "box-shadow", "text-align", "#id"],
        inicial: { html: HTML, css: PASOS[1] },
        comprobaciones: [
          { texto: "The hours and the appointment, in a column 800px wide at most", repaso: "css-07",
            prueba: doc => est(doc, "#hours").maxWidth === "800px" && est(doc, "#appointment").maxWidth === "800px" },
          { texto: "The table is a card at full width, with 12px of padding", repaso: "css-08",
            prueba: doc => { const s = est(doc, "#hours table"); const h = est(doc, "#hours");
              return tarjeta(s) && relleno(s, 12, 12) && aTodoElAncho(doc.querySelector("#hours table"), h); } },
          { texto: "The cells with 12px and 20px of padding and the text on the left; the header row in Outfit, dark color and cream background", repaso: "css-04",
            prueba: doc => { const th = est(doc, "#hours th");
              return todos(doc, "#hours th, #hours td").every(s => relleno(s, 12, 20) && /left|start/.test(s.textAlign))
                && fuente(th) === "outfit" && th.color === C.dark && th.backgroundColor === C.cream; } },
          { texto: "The form is a card with 32px of padding, and its `fieldset`s have no border or padding", repaso: "css-08",
            prueba: doc => { const f = est(doc, "#appointment-form");
              return tarjeta(f) && relleno(f, 32, 32) && todos(doc, "#appointment-form fieldset").every(s => s.borderTopStyle === "none" && relleno(s, 0, 0)); } },
          { texto: "The `legend`s at 1.2rem and weight 700, and each `label` as a block, above its field, at 500", repaso: "css-09",
            prueba: doc => { const l = est(doc, "#appointment-form > fieldset > legend");
              return cerca(l.fontSize, 19.2) && l.fontWeight === "700" && fuente(l) === "outfit"
                && ["pet", "date", "name", "email"].every(n => { const s = est(doc, 'label[for="' + n + '"]'); return s.display === "block" && s.fontWeight === "500" && cerca(s.marginTop, 14); }); } },
          { texto: "The fields at full width, with 12px and 14px of padding, a 1px `#cfdcd9` border, 10px corners and Inter at 1rem", repaso: "css-08",
            prueba: doc => ["pet", "date", "time", "reason", "name", "phone", "email"].every(n => {
              const el = doc.querySelector('#appointment-form [name="' + n + '"]'); const s = el && doc.defaultView.getComputedStyle(el);
              return !!s && aTodoElAncho(el, doc.defaultView.getComputedStyle(el.parentElement)) && relleno(s, 12, 14) && cerca(s.borderTopWidth, 1)
                && s.borderTopColor === C.border && cerca(s.borderTopLeftRadius, 10) && fuente(s) === "inter" && cerca(s.fontSize, 16); }) },
          { texto: "The checkboxes and radio buttons at their own size, in line with their label", repaso: "css-09",
            prueba: doc => ["#privacy", '[name="first"]'].every(sel => [...doc.querySelectorAll("#appointment-form " + sel)].every(el => el.getBoundingClientRect().width < 40))
              && est(doc, ".checkbox").display === "inline" && est(doc, 'label[for="first-yes"]')?.display === "inline" },
          { texto: "The form's notes at 0.85rem in the soft color", repaso: "css-06",
            prueba: doc => todos(doc, "#appointment-form p").length > 0 && todos(doc, "#appointment-form p").every(s => cerca(s.fontSize, 13.6) && s.color === C.soft) },
          { texto: "The “Book appointment” button: 14px and 26px of padding, no border, pill shape, primary background, white text in Inter at 600 and a shadow", repaso: "css-08",
            prueba: doc => { const s = est(doc, "#appointment-form button");
              return relleno(s, 14, 26) && s.borderTopStyle === "none" && cerca(s.borderTopLeftRadius, 999) && s.backgroundColor === C.primary
                && s.color === C.background && fuente(s) === "inter" && s.fontWeight === "600" && sombra(s); } },
          { texto: "The reviews: cards with 24px of padding and a round 72px photo", repaso: "css-08",
            prueba: doc => todos(doc, ".review").every(s => tarjeta(s) && relleno(s, 24, 24))
              && todos(doc, ".review img").every(s => s.display === "block" && cerca(s.width, 72) && s.borderTopLeftRadius === "50%") },
          { texto: "The footer: cream background, 40px top margin and 56px, 32px and 24px of padding; its headings at 1.1rem", repaso: "css-07",
            prueba: doc => { const f = est(doc, "footer");
              return f.backgroundColor === C.cream && cerca(f.marginTop, 40) && relleno(f, 56, 32, 24, 32) && todos(doc, "footer h2").every(s => cerca(s.fontSize, 17.6)); } },
          { texto: "The footer's bottom line: a 1px mint rule on top, 1136px at most, at 0.85rem in the soft color", repaso: "css-08",
            prueba: doc => { const s = est(doc, ".footer-bottom");
              return cerca(s.borderTopWidth, 1) && s.borderTopStyle === "solid" && s.borderTopColor === C.mint && s.maxWidth === "1136px" && cerca(s.paddingTop, 20)
                && cerca(s.fontSize, 13.6) && s.color === C.soft; } }
        ],
        pistas: [pista, "So the checkboxes don't stretch like the other fields, a rule after the fields' one (the last one wins): #privacy, .checkbox { display: inline; width: auto; }. And for the first-visit ones, which are in a fieldset inside another: fieldset fieldset input, fieldset fieldset label { … }."],
        solucion: { html: HTML, css: PASOS[2] },
        alternativas: [{ html: HTML, css: otraForma(PASOS[2]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        enunciado: "**The layout.** The last task! Until now everything went in a column. Now everything goes in its place, like in the screenshot:\n\n1. The **header** stays stuck at the top when scrolling, above everything else, with the brand on the left, the menu in a row and the button on the right.\n2. The **hero** in 3 columns (text, photo and card), with the handwritten note over the photo's corner.\n3. The **strip** in 4 columns, each benefit with its icon beside it.\n4. The **services** in 3 columns, the **team** and the **reviews** in their grid, and the **footer** in 4 columns.\n\nWrite all these rules **together, at the end of the sheet**, with a comment that says so: in the HTML + CSS World this block will be the one for big screens.",
        captura: "recursos/huellas/capturas-en/m2-encargo-4.png",
        textos: COMO_LEER + guia(3),
        glosario: ["position: sticky", "z-index", "position: relative", "position: absolute", "top, right, bottom, left", "display: flex", "justify-content", "align-items", "gap", "display: grid", "grid-template-columns", "fr", "repeat()"],
        inicial: { html: HTML, css: PASOS[2] },
        comprobaciones: [
          { texto: "The header stays stuck at the top when scrolling (`sticky`, `top: 0`) and above everything else (`z-index` 10)", repaso: "css-10",
            prueba: doc => { const s = est(doc, "header"); return s.position === "sticky" && cerca(s.top, 0) && s.zIndex === "10"; } },
          { texto: "The header is flex: the brand on one side, the button on the other and everything centered vertically", repaso: "css-11",
            prueba: doc => { const s = est(doc, "header"); return s.display === "flex" && s.justifyContent === "space-between" && s.alignItems === "center"; } },
          { texto: "The brand, flex with the logo beside the name (10px gap), and the menu in a row with 28px gaps", repaso: "css-11",
            prueba: doc => { const m = est(doc, ".brand"); const u = est(doc, "nav ul");
              return m.display === "flex" && m.alignItems === "center" && cerca(m.columnGap, 10) && u.display === "flex" && cerca(u.columnGap, 28); } },
          { texto: "The header button, smaller: 10px and 20px of padding", repaso: "css-07",
            prueba: doc => relleno(est(doc, "header .button"), 10, 20) },
          { texto: "The hero in a 3-column grid (the third one 300px), with 32px gaps and centered vertically", repaso: "css-13",
            prueba: doc => { const s = est(doc, ".hero"); const c = columnas(s);
              return c.length === 3 && cerca(c[2], 300) && c[0] > c[1] && cerca(s.columnGap, 32) && s.alignItems === "center"; } },
          { texto: "The handwritten note, `absolute` over the corner of the photo (`relative`): 56px above, 20px to the right and 220px wide", repaso: "css-10",
            // A 1200px: más estrecha, la foto mide menos de 220px y la nota encoge con ella (max-width: 100%)
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { ancho: 1200 });
              const f = est(v.doc, ".hero-photo"); const n = est(v.doc, ".hero-photo .note");
              return f.position === "relative" && n.position === "absolute" && cerca(n.top, -56) && cerca(n.right, -20) && cerca(n.width, 220); } },
          { texto: "The strip in 4 equal columns with 20px gaps, and each benefit with its icon beside it (flex, 12px gap)", repaso: "css-13",
            prueba: doc => { const s = est(doc, ".benefits"); const c = columnas(s);
              return c.length === 4 && c.every(x => cerca(x, c[0])) && cerca(s.columnGap, 20) && s.position === "relative"
                && todos(doc, ".benefits li").every(l => l.display === "flex" && l.alignItems === "center" && cerca(l.columnGap, 12)); } },
          { texto: "The services in a grid of 3 equal columns with 24px gaps", repaso: "css-13",
            // La rejilla es el padre de las tarjetas, se llame como se llame
            prueba: doc => { const s = doc.defaultView.getComputedStyle(doc.querySelector("#services .service").parentElement);
              const c = columnas(s); return c.length === 3 && c.every(x => cerca(x, c[0])) && cerca(s.columnGap, 24); } },
          { texto: "At 1200px, the first 3 services are in the same row", repaso: "css-13",
            prueba: async doc => { const v = await PRUEBA.clonar(doc, { ancho: 1200 });
              const t = [...v.doc.querySelectorAll(".service")].slice(0, 4).map(s => Math.round(s.getBoundingClientRect().top));
              return t.length === 4 && t[0] === t[1] && t[1] === t[2] && t[3] > t[0]; } },
          { texto: "The team in 4 columns and the reviews in 3", repaso: "css-13",
            prueba: doc => { const fila = sel => { const t = [...doc.querySelectorAll(sel)].map(e => Math.round(e.getBoundingClientRect().top)); return t.length > 1 && t.every(x => x === t[0]) ? t.length : 0; };
              return fila("#team figure") === 4 && fila(".review") === 3; } },
          { texto: "The footer in 4 columns (2fr 2fr 1.5fr 1fr) with 32px gaps, 1136px at most and centered", repaso: "css-13",
            prueba: doc => { const s = est(doc, ".footer-columns"); const c = columnas(s);
              return c.length === 4 && cerca(c[0], c[1]) && Math.abs(c[2] / c[3] - 1.5) < 0.05 && Math.abs(c[0] / c[3] - 2) < 0.05 && cerca(s.columnGap, 32) && s.maxWidth === "1136px"; } }
        ],
        pistas: [pista, "A grid of columns: .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }. To put the note over the photo: the parent with position: relative and the note with position: absolute and top/right. The stuck header: header { position: sticky; top: 0; z-index: 10; }."],
        solucion: { html: HTML, css: PASOS[3] },
        alternativas: [{ html: HTML, css: otraForma(PASOS[3]) }]
      }
    ]
  });
})();
