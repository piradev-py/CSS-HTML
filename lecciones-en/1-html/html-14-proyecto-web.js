/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-14
   Proyecto web: la clínica «Huellas» en HTML puro (docs/PROYECTO_FINAL.md).
   5 encargos sobre el mismo index.html, que empieza vacío:
   cabeza y cabecera · portada · servicios y equipo · horario y cita ·
   opiniones y pie. Las soluciones son las versiones oficiales
   HUELLAS["mundo-1"].pasos (herramientas/huellas-versiones.mjs).
   Notas:
   - Se comprueba el resultado, no cómo está escrito: textos con las
     reglas de siempre (sin tildes ni mayúsculas), atributos del
     contrato de nombres y lo que pide cada ficha. Las etiquetas de
     agrupación y las clases (salvo .servicio) las elige el alumno
     (ver `alternativas`: la solución sin clases y con <article>
     en vez de <div> también aprueba).
   - El alumno hace 3 servicios y 2 personas del equipo; el Mundo 2
     empieza con la versión completa («el equipo de diseño añadió
     el resto, a petición de la clínica»).
   - privacidad.html va hecha (material del encargo): solo se enlaza.
   ============================================================ */
(function () {
  const PROYECTO = { raiz: "recursos/huellas/web/", html: "index.html", css: "estilos.css", js: "script.js" };
  const PASOS = HUELLAS["mundo-1"].pasos;

  // Texto comparable: sin tildes, mayúsculas, signos ni espacios de más (como en los ejercicios)
  const simple = t => String(t || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9@:/#.+-]+/g, " ").trim();
  const tiene = (el, texto) => !!el && simple(el.textContent).includes(simple(texto));
  const es = (el, texto) => !!el && simple(el.textContent) === simple(texto);
  const atributo = (el, nombre) => (el && el.getAttribute(nombre) || "").trim();
  const meta = (doc, sel) => atributo(doc.querySelector(sel), "content");
  const imagen = (doc, src) => doc.querySelector('img[src="' + src + '"]');
  const conTamano = img => !!img && img.hasAttribute("width") && img.hasAttribute("height");
  const perezosa = img => atributo(img, "loading").toLowerCase() === "lazy";
  const decorativa = img => !!img && img.hasAttribute("alt") && atributo(img, "alt") === "";
  const describe = img => !!img && atributo(img, "alt").length >= 8;

  // La misma web escrita de otra forma: sin clases (salvo las del contrato) y con <article> en vez de <div>
  const otraForma = h => h.replace(/ class="(?!service")[^"]*"/g, "").replace(/<div>/g, "<article>").replace(/<\/div>/g, "</article>");

  const TITULO = "Huellas · Veterinary clinic in Madrid";
  const DESCRIPCION = "A nearby veterinary clinic for dogs, cats, and exotics. General medicine, vaccines, surgery, and 24-hour emergency care. Book your appointment online.";
  const MENU = [["Home", "#home"], ["Services", "#services"], ["Team", "#team"], ["Hours", "#hours"], ["Contact", "#contact"]];
  const VENTAJAS = [
    ["corazon", "Warm care", "We listen to you and explain every step."],
    ["escudo", "Modern facilities", "Our own operating room, X-rays, and lab."],
    ["equipo", "A specialized team", "Veterinarians with training in each area."],
    ["huella", "Every stage of their life", "From puppy to their senior years."]
  ];
  const SERVICIOS = [
    ["General medicine", "Checkups, diagnostics, and advice to prevent before having to treat.", "medicina", "fonendo"],
    ["Vaccination", "The vaccine and deworming schedule adapted to their age.", "vacunacion", "jeringa"],
    ["Surgery", "Our own operating room and anesthesia monitored at all times.", "cirugia", "bisturi"]
  ];
  const EQUIPO = [["equipo-1.jpg", "Daniel Ortega", "General medicine and emergency care"], ["equipo-2.jpg", "Pablo Ruiz", "Dermatology"]];
  const DIAS = [["Monday", "9:00 – 20:30"], ["Tuesday", "9:00 – 20:30"], ["Wednesday", "9:00 – 20:30"], ["Thursday", "9:00 – 20:30"],
    ["Friday", "9:00 – 20:30"], ["Saturday", "10:00 – 14:00"], ["Sunday", "Closed"]];
  const CAMPOS = [["pet", "select"], ["date", "date"], ["time", "time"], ["reason", "textarea"], ["name", "text"],
    ["phone", "tel"], ["email", "email"], ["privacy", "checkbox"]];
  const OPINIONES = [
    ["opinion-perro.jpg", "Lucía M.", "Copo walks into the exam room wagging his tail."],
    ["opinion-gato.jpg", "Javier R.", "Simba hates the carrier"],
    ["opinion-conejo.jpg", "Marta G.", "At last a clinic that knows rabbits."]
  ];

  const tipoDe = el => el.tagName === "INPUT" ? (el.getAttribute("type") || "text").toLowerCase() : el.tagName.toLowerCase();
  const campo = (doc, nombre) => doc.querySelector('#appointment-form [name="' + nombre + '"]');

  const pista = "Look at the screenshot and the texts of the brief, and open the 📚 Glossary if you don't remember a tag. Each red check has a link to review its lesson.";

  CURSO.registrar({
    id: "html-14",
    titulo: "Web project: the Huellas clinic",
    xp: 120,
    objetivo: "You will build the website of the veterinary clinic Huellas in HTML from scratch, following the client's brief.",
    pasos: [
      {
        tipo: "explicacion",
        titulo: "Your first real brief",
        texto: "Welcome to the team! 🐾 The veterinary clinic **Huellas** has entrusted us with its website, and you are **the programmer**.\n\nThis is how work happens in a company: the client gives the **texts** (who they are, their services, their hours…), the design team decides **how it looks** and you turn it into code. You don't make anything up: you translate the brief into HTML.\n\nIn each brief you will get:\n\n• **What to build** and the **screenshot** of how it should look.\n• The **📄 Texts of the brief**, ready to copy: you add the tags.\n• A list that turns **green** while you write. If something fails, it tells you which lesson to review.\n• The **📚 Glossary**, with everything you have learned, in case you forget a tag.\n\nIn this world the website goes **without styles**: it will look plain, and that's fine! Content and structure first; the colors will arrive in the CSS World.",
        consejo: "There are 5 briefs over the same file, `index.html`. Your code is saved by itself and carries over from one brief to the next. You start with a blank page, like a pro!"
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        enunciado: "**The head and the header.** Start `index.html` from scratch:\n\n1. The skeleton of the page, in English.\n2. The complete head: `charset`, the `viewport`, the `title` and the `description`, the 4 **Open Graph** metas and the favicon.\n3. The **header** (`header`): the `img/logo.svg` logo (48 × 48, `alt=\"\"` because the name goes beside it) and the name, both inside a link to `#home`; the **menu** with its 5 links; and the **Book your appointment** button, which goes to `#appointment`.\n\nThe menu links don't lead anywhere yet: the sections arrive in the next briefs.",
        captura: "recursos/huellas/capturas-en/m1-encargo-1.png",
        textos: "HEAD OF THE PAGE\ntitle: Huellas · Veterinary clinic in Madrid\ndescription: A nearby veterinary clinic for dogs, cats, and exotics. General medicine, vaccines, surgery, and 24-hour emergency care. Book your appointment online.\nog:title: the same as the title\nog:description: the same as the description\nog:image: img/portada.jpg\nog:type: website\nFavicon: img/favicon.svg\n\nHEADER\nLogo: img/logo.svg + “Huellas” (in bold) + “Veterinary clinic” → link to #home\nMenu: Home → #home · Services → #services · Team → #team · Hours → #hours · Contact → #contact\nButton: Book your appointment → #appointment",
        glosario: ["<!DOCTYPE html>", "<html lang=\"en\">", "<meta charset=\"UTF-8\">", "<meta name=\"viewport\">", "<meta name=\"description\">", "Open Graph (og:…)", "<link rel=\"icon\">", "<header>", "<nav>", "<ul> and <li>", "href=\"#id\"", "<img>"],
        inicial: { html: "" },
        comprobaciones: [
          { texto: "The page has `<!DOCTYPE html>` and the `<html>` carries `lang=\"en\"`", repaso: "html-02",
            prueba: doc => doc.doctype?.name === "html" && atributo(doc.documentElement, "lang").toLowerCase() === "en" },
          { texto: "In the `<head>`: the `charset`, the `viewport` and the `title` of the brief", repaso: "html-13",
            prueba: doc => !!doc.querySelector("head meta[charset]") && /width\s*=\s*device-width/.test(meta(doc, 'meta[name="viewport"]'))
              && es(doc.querySelector("head title"), TITULO) },
          { texto: "The `description` of the brief", repaso: "html-13",
            prueba: doc => simple(meta(doc, 'meta[name="description"]')) === simple(DESCRIPCION) },
          { texto: "The 4 Open Graph metas of the brief", repaso: "html-13",
            prueba: doc => simple(meta(doc, 'meta[property="og:title"]')) === simple(TITULO)
              && simple(meta(doc, 'meta[property="og:description"]')) === simple(DESCRIPCION)
              && meta(doc, 'meta[property="og:image"]') === "img/portada.jpg" && meta(doc, 'meta[property="og:type"]') === "website" },
          { texto: "The favicon `img/favicon.svg`", repaso: "html-13",
            prueba: doc => atributo(doc.querySelector('link[rel~="icon"]'), "href") === "img/favicon.svg" },
          { texto: "A `<header>` with the `img/logo.svg` logo (with `alt`, `width` and `height`) and the name “Huellas”", repaso: "html-07",
            prueba: doc => { const h = doc.querySelector("header"); const img = h && h.querySelector('img[src="img/logo.svg"]');
              return decorativa(img) && conTamano(img) && tiene(h, "Huellas") && tiene(h, "Veterinary clinic"); } },
          { texto: "The logo and the name go inside a link to `#home`", repaso: "html-06",
            prueba: doc => { const a = doc.querySelector('header a[href="#home"] img[src="img/logo.svg"]')?.closest("a"); return tiene(a, "Huellas"); } },
          { texto: "A `<nav>` with the 5 menu links, in order and pointing to their section", repaso: "html-12",
            prueba: doc => { const a = [...doc.querySelectorAll("header nav a")];
              return a.length === 5 && MENU.every(([t, h], i) => es(a[i], t) && atributo(a[i], "href") === h); } },
          { texto: "The “Book your appointment” button of the header goes to `#appointment`", repaso: "html-06",
            prueba: doc => [...doc.querySelectorAll('header a[href="#appointment"]')].some(a => es(a, "Book your appointment")) }
        ],
        pistas: [pista, "Start with the skeleton from the lesson “The structure of a page” and the head from “The head of the page”. For the menu: a <nav> with a <ul> list and one <li><a href=\"#…\">…</a></li> per link."],
        solucion: { html: PASOS[0] },
        alternativas: [{ html: otraForma(PASOS[0]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        enunciado: "**The hero.** Below the header, open the **main content** (`main`) and, inside it, the hero: a `section` with `id=\"home\"` (the one the logo and the menu link to). It has:\n\n1. The kicker, the **only `h1`** of the page with “their entire life” marked in `em`, the text and the button to `#appointment`.\n2. The photo `img/portada.jpg` (600 × 401, with its `alt`) and the handwritten note `img/nota-en.png` (304 × 75, decorative). They are at the very top: **without** `loading=\"lazy\"`.\n3. The **Book your appointment** card, with its link to `#appointment`.\n\nAfter the hero, still inside the `main`, the **trust strip**: the 4 benefits, each with its icon (52 × 52, decorative).",
        captura: "recursos/huellas/capturas-en/m1-encargo-2.png",
        textos: "HERO (#home)\nKicker: We care for what you love the most\nHeading (h1): Health and love for their entire life   ← “their entire life” marked\nText: Caring, professional veterinary medicine, so your companion is always in the best hands.\nButton: Book your appointment → #appointment\nPhoto: img/portada.jpg · alt: A dog and a cat lying together in the sun\nHandwritten note: img/nota-en.png (decorative)\nCard: Book your appointment · In a few steps · Reserve your appointment → #appointment\n\nTRUST STRIP (icon · title · line)\nimg/iconos/corazon.svg · Warm care · We listen to you and explain every step.\nimg/iconos/escudo.svg · Modern facilities · Our own operating room, X-rays, and lab.\nimg/iconos/equipo.svg · A specialized team · Veterinarians with training in each area.\nimg/iconos/huella.svg · Every stage of their life · From puppy to their senior years.",
        glosario: ["<main>", "<section>", "<h1> … <h6>", "<em>", "<strong>", "<p>", "alt", "width and height", "<div>", "class"],
        inicial: { html: PASOS[0] },
        comprobaciones: [
          { texto: "A single `<main>` and, inside it, a `<section>` with `id=\"home\"`", repaso: "html-12",
            prueba: doc => doc.querySelectorAll("main").length === 1 && !!doc.querySelector("main section#home") },
          { texto: "The kicker and a single `<h1>`, in the hero, with the heading of the brief", repaso: "html-03",
            prueba: doc => { const h1 = doc.querySelectorAll("h1"); const p = doc.querySelector("#home");
              return h1.length === 1 && !!p?.contains(h1[0]) && es(h1[0], "Health and love for their entire life") && tiene(p, "We care for what you love the most"); } },
          { texto: "“their entire life” is marked in an `<em>`", repaso: "html-04",
            prueba: doc => es(doc.querySelector("h1 em"), "their entire life") },
          { texto: "The text of the hero", repaso: "html-03",
            prueba: doc => tiene(doc.querySelector("#home"), "Caring, professional veterinary medicine, so your companion is always in the best hands.") },
          { texto: "The photo `img/portada.jpg` with an `alt` that describes it, `width` and `height`, and without `loading=\"lazy\"`", repaso: "html-07",
            prueba: doc => { const img = doc.querySelector('#home img[src="img/portada.jpg"]'); return describe(img) && conTamano(img) && !perezosa(img); } },
          { texto: "The note `img/nota-en.png` is decorative (`alt=\"\"`) and has `width` and `height`", repaso: "html-07",
            prueba: doc => { const img = doc.querySelector('#home img[src="img/nota-en.png"]'); return decorativa(img) && conTamano(img); } },
          { texto: "The card: “Book your appointment”, “In a few steps” and the link “Reserve your appointment” to `#appointment`", repaso: "html-06",
            prueba: doc => { const p = doc.querySelector("#home");
              return tiene(p, "In a few steps") && [...(p?.querySelectorAll('a[href="#appointment"]') || [])].some(a => es(a, "Reserve your appointment"))
                && [...(p?.querySelectorAll('a[href="#appointment"]') || [])].some(a => es(a, "Book your appointment")); } },
          { texto: "The strip, inside the `<main>` and after the hero, with the 4 benefits of the brief", repaso: "html-05",
            prueba: doc => { const m = doc.querySelector("main"); const p = doc.querySelector("#home");
              const fuera = m ? simple([...m.childNodes].filter(n => n !== p).map(n => n.textContent).join(" ")) : "";
              return VENTAJAS.every(([, t, l]) => fuera.includes(simple(t)) && fuera.includes(simple(l))); } },
          { texto: "Each benefit has its decorative icon (`alt=\"\"`) with `width` and `height`", repaso: "html-07",
            prueba: doc => VENTAJAS.every(([i]) => { const img = imagen(doc, "img/iconos/" + i + ".svg"); return decorativa(img) && conTamano(img); }) }
        ],
        pistas: [pista, "Structure: <main> → <section id=\"home\"> with the text, the photo and the card → </section> → the strip (for example, a <ul> list with one <li> per benefit) → </main>. The <h1> carries <em>their entire life</em> inside."],
        solucion: { html: PASOS[1] },
        alternativas: [{ html: otraForma(PASOS[1]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        enunciado: "**Services and team.** Two more sections inside the `main`, after the strip:\n\n1. `section` with `id=\"services\"`: kicker, `h2` and **3 cards** `article` with `class=\"service\"` (that class belongs to the contract: the CSS and the JavaScript will look for it). Each card: its photo (320 × 213, decorative), its icon (52 × 52, decorative), the name in an `h3`, the description and the **Book now** link to `#appointment`.\n2. `section` with `id=\"team\"`: kicker, `h2` and **2 people**, each in a `figure` with their photo (240 × 300, with `alt`) and a `figcaption` with the name in bold, a line break and the specialty.\n\nThese photos are not visible when the page opens: all with `loading=\"lazy\"`.",
        captura: "recursos/huellas/capturas-en/m1-encargo-3.png",
        textos: "SERVICES (#services)\nKicker: Our services\nTitle (h2): Everything they need, in one place\n\nGeneral medicine · Checkups, diagnostics, and advice to prevent before having to treat.\n  photo img/servicio-medicina.jpg · icon img/iconos/fonendo.svg\nVaccination · The vaccine and deworming schedule adapted to their age.\n  photo img/servicio-vacunacion.jpg · icon img/iconos/jeringa.svg\nSurgery · Our own operating room and anesthesia monitored at all times.\n  photo img/servicio-cirugia.jpg · icon img/iconos/bisturi.svg\nIn each card, the link: Book now → #appointment\n\nTEAM (#team)\nKicker: Our team\nTitle (h2): People who love animals as much as you do\n\nimg/equipo-1.jpg · Daniel Ortega · General medicine and emergency care\n  alt: Daniel Ortega, veterinarian, smiling in the exam room\nimg/equipo-2.jpg · Pablo Ruiz · Dermatology\n  alt: Pablo Ruiz, veterinarian, holding a Pomeranian in his arms",
        glosario: ["<section>", "<article>", "class", "<h1> … <h6>", "alt", "loading=\"lazy\"", "<figure> and <figcaption>", "<br>", "<strong>"],
        inicial: { html: PASOS[1] },
        comprobaciones: [
          { texto: "A `<section id=\"services\">` with its kicker and its `<h2>`", repaso: "html-12",
            prueba: doc => { const s = doc.querySelector("main section#services");
              return es(s?.querySelector("h2"), "Everything they need, in one place") && tiene(s, "Our services"); } },
          { texto: "3 `<article class=\"service\">` with the names of the brief in their `<h3>`, in order", repaso: "html-12",
            prueba: doc => { const a = [...doc.querySelectorAll("#services article.service")];
              return a.length === 3 && SERVICIOS.every(([n], i) => es(a[i].querySelector("h3"), n)); } },
          { texto: "Each service has its description and a “Book now” link to `#appointment`", repaso: "html-06",
            prueba: doc => { const a = [...doc.querySelectorAll("#services article.service")];
              return a.length === 3 && SERVICIOS.every(([, d], i) => tiene(a[i], d) && [...a[i].querySelectorAll('a[href="#appointment"]')].some(x => es(x, "Book now"))); } },
          { texto: "Each service has its photo and its icon: decorative (`alt=\"\"`) and with `width` and `height`", repaso: "html-07",
            prueba: doc => { const a = [...doc.querySelectorAll("#services article.service")];
              return a.length === 3 && SERVICIOS.every(([, , f, i], k) => [a[k].querySelector('img[src="img/servicio-' + f + '.jpg"]'), a[k].querySelector('img[src="img/iconos/' + i + '.svg"]')]
                .every(img => decorativa(img) && conTamano(img))); } },
          { texto: "The service photos carry `loading=\"lazy\"`", repaso: "html-07",
            prueba: doc => SERVICIOS.every(([, , f]) => perezosa(imagen(doc, "img/servicio-" + f + ".jpg"))) },
          { texto: "A `<section id=\"team\">` with its kicker and its `<h2>`", repaso: "html-12",
            prueba: doc => { const s = doc.querySelector("main section#team");
              return es(s?.querySelector("h2"), "People who love animals as much as you do") && tiene(s, "Our team"); } },
          { texto: "2 `<figure>` with their photo and a `<figcaption>` with the name in bold and the specialty", repaso: "html-07",
            prueba: doc => { const f = [...doc.querySelectorAll("#team figure")];
              return f.length === 2 && EQUIPO.every(([src, n, e], i) => !!f[i].querySelector('img[src="img/' + src + '"]')
                && es(f[i].querySelector("figcaption strong"), n) && tiene(f[i].querySelector("figcaption"), e)); } },
          { texto: "The team photos have an `alt` that describes them, `width`, `height` and `loading=\"lazy\"`", repaso: "html-07",
            prueba: doc => EQUIPO.every(([src]) => { const img = imagen(doc, "img/" + src); return describe(img) && conTamano(img) && perezosa(img); }) }
        ],
        pistas: [pista, "A service card:\n<article class=\"service\">\n  <img src=\"img/servicio-medicina.jpg\" alt=\"\" width=\"320\" height=\"213\" loading=\"lazy\">\n  <img src=\"img/iconos/fonendo.svg\" alt=\"\" width=\"52\" height=\"52\">\n  <h3>General medicine</h3>\n  <p>…</p>\n  <a href=\"#appointment\">Book now</a>\n</article>\nAnd a person: a <figure> with the <img …> and <figcaption><strong>Name</strong><br>Specialty</figcaption>."],
        solucion: { html: PASOS[2] },
        alternativas: [{ html: otraForma(PASOS[2]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        enunciado: "**Hours and appointment.** Two more sections inside the `main`:\n\n1. `section` with `id=\"hours\"`: kicker, `h2`, the hours **table** (header row in `thead` and the 7 days in `tbody`) and the emergencies note with its `tel:` link.\n2. `section` with `id=\"appointment\"`: kicker, `h2`, the text and the **form** with `id=\"appointment-form\"`. The fields go in `fieldset` with their `legend` (the first-visit questions, in another `fieldset` inside the first one), each with its `label` and the `name` of the contract. The pet, the date, the time, the name, the phone, the email and the privacy box are required (`required`). On the box, “privacy policy” is a link to `privacidad.html` (that page is already built).",
        captura: "recursos/huellas/capturas-en/m1-encargo-4.png",
        textos: "HOURS (#hours)\nKicker: Hours\nTitle (h2): When you can come\nTable header: Day · Clinic hours · Emergencies\nMonday · 9:00 – 20:30 · 24 hours\nTuesday · 9:00 – 20:30 · 24 hours\nWednesday · 9:00 – 20:30 · 24 hours\nThursday · 9:00 – 20:30 · 24 hours\nFriday · 9:00 – 20:30 · 24 hours\nSaturday · 10:00 – 14:00 · 24 hours\nSunday · Closed · 24 hours\nNote: Emergencies: call us at 600 123 456 at any time.   (link tel:+34600123456)\n\nBOOK YOUR APPOINTMENT (#appointment)\nKicker: Book your appointment\nTitle (h2): Book in under a minute\nText: Fill in the form and we confirm your appointment. If it's an emergency, call us.\n\nForm id=\"appointment-form\"\nfieldset “Appointment details”:\n  Type of pet · name=\"pet\" · select: Choose one… (empty value) · Dog (dog) · Cat (cat) · Rabbit (rabbit) · Other exotic (exotic)\n  Date · name=\"date\" · date\n  Time · name=\"time\" · time · hint: From 9:00 to 20:30 (Saturdays, from 10:00 to 14:00)\n  Reason for the visit · name=\"reason\" · textarea · placeholder: Tell us what's going on or what they need\n  fieldset “Is this their first visit?”: Yes (value yes) · No (value no) · radio, name=\"first\"\nfieldset “Your details”:\n  Your name · name=\"name\" · text\n  Phone · name=\"phone\" · tel · placeholder: 600 000 000\n  Email · name=\"email\" · email\n  I have read and accept the privacy policy · name=\"privacy\" · checkbox   (“privacy policy” → privacidad.html)\nButton: Book appointment",
        glosario: ["<table>, <tr>, <td>", "<th>", "<thead> y <tbody>", "<form>", "<label for=\"…\">", "<fieldset> and <legend>", "<select> and <option>", "type=\"date\" and type=\"time\"", "<textarea>", "type=\"radio\"", "type=\"checkbox\"", "required"],
        inicial: { html: PASOS[2] },
        comprobaciones: [
          { texto: "A `<section id=\"hours\">` with its kicker and its `<h2>`", repaso: "html-12",
            prueba: doc => { const s = doc.querySelector("main section#hours"); return es(s?.querySelector("h2"), "When you can come") && tiene(s, "Hours"); } },
          { texto: "The table has the header row in `<thead>`, with 3 `<th>`: Day, Clinic hours and Emergencies", repaso: "html-08",
            prueba: doc => { const th = [...doc.querySelectorAll("#hours table thead th")]; return th.length === 3 && ["Day", "Clinic hours", "Emergencies"].every((t, i) => es(th[i], t)); } },
          { texto: "In the `<tbody>`, the 7 days with their clinic hours and emergencies", repaso: "html-08",
            prueba: doc => { const f = [...doc.querySelectorAll("#hours table tbody tr")];
              return f.length === 7 && DIAS.every(([d, c], i) => { const td = f[i].querySelectorAll("td, th");
                return td.length === 3 && es(td[0], d) && es(td[1], c) && es(td[2], "24 hours"); }); } },
          { texto: "The emergencies note with its `tel:+34600123456` link", repaso: "html-06",
            prueba: doc => !!doc.querySelector('#hours a[href="tel:+34600123456"]') && tiene(doc.querySelector("#hours"), "at any time") },
          { texto: "A `<section id=\"appointment\">` with its kicker, its `<h2>` and the text", repaso: "html-12",
            prueba: doc => { const s = doc.querySelector("main section#appointment");
              return es(s?.querySelector("h2"), "Book in under a minute") && tiene(s, "Fill in the form and we confirm your appointment"); } },
          { texto: "A `<form id=\"appointment-form\">` with its `<fieldset>` and `<legend>`: “Appointment details”, “Is this their first visit?” and “Your details”", repaso: "html-10",
            prueba: doc => { const l = [...doc.querySelectorAll("#appointment form#appointment-form fieldset > legend")];
              return ["Appointment details", "Is this their first visit?", "Your details"].every(t => l.some(x => es(x, t))); } },
          { texto: "The contract fields with their type: `pet`, `date`, `time`, `reason`, `name`, `phone`, `email` and `privacy`", repaso: "html-10",
            prueba: doc => CAMPOS.every(([n, t]) => { const c = campo(doc, n); return !!c && tipoDe(c) === t; }) },
          { texto: "The pet is chosen in a `<select>` with the 5 options of the brief and their `value`", repaso: "html-10",
            prueba: doc => { const o = [...(campo(doc, "pet")?.querySelectorAll("option") || [])];
              return o.map(x => x.getAttribute("value")).join(",") === ",dog,cat,rabbit,exotic" && es(o[4], "Other exotic"); } },
          { texto: "The first visit: 2 `radio` with `name=\"first\"` and `value` `yes` and `no`", repaso: "html-10",
            prueba: doc => [...doc.querySelectorAll('#appointment-form input[type="radio"][name="first"]')].map(r => r.value).join(",") === "yes,no" },
          { texto: "Each field has its `<label for>`", repaso: "html-09",
            prueba: doc => { const c = [...doc.querySelectorAll("#appointment-form input, #appointment-form select, #appointment-form textarea")];
              return c.length >= 10 && c.every(x => x.id && doc.querySelector('label[for="' + x.id + '"]')); } },
          { texto: "The pet, the date, the time, the name, the phone, the email and the privacy are required (`required`)", repaso: "html-10",
            prueba: doc => ["pet", "date", "time", "name", "phone", "email", "privacy"].every(n => campo(doc, n)?.hasAttribute("required")) },
          { texto: "The `label` of the privacy links to `privacidad.html`, and there is a “Book appointment” button", repaso: "html-06",
            prueba: doc => { const c = campo(doc, "privacy"); const l = c && doc.querySelector('label[for="' + c.id + '"]');
              return !!l?.querySelector('a[href="privacidad.html"]') && [...doc.querySelectorAll("#appointment-form button")].some(b => es(b, "Book appointment")); } }
        ],
        pistas: [pista, "Each field goes like this: <label for=\"date\">Date</label> and below it <input type=\"date\" id=\"date\" name=\"date\" required>. The radios: <input type=\"radio\" id=\"first-yes\" name=\"first\" value=\"yes\"> <label for=\"first-yes\">Yes</label>. The link goes inside the label: <label for=\"privacy\">I have read and accept the <a href=\"privacidad.html\">privacy policy</a></label>."],
        solucion: { html: PASOS[3] },
        alternativas: [{ html: otraForma(PASOS[3]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        enunciado: "**Reviews and footer.** The last brief!\n\n1. Inside the `main`, the `section` with `id=\"reviews\"`: kicker, `h2` and the **3 reviews**, each in an `article` with the pet's photo (120 × 120, with `alt` and `loading=\"lazy\"`: not visible when the page opens), the text and the author in bold.\n2. After the `main`, the **footer**: a `footer` with `id=\"contact\"` (the one the menu links to) and its 4 columns: logo and tagline, contact, hours and social networks; and the final line with the link to `privacidad.html`. The phones with `tel:`, the email with `mailto:`, and “How to get here” and the social networks open in another tab (`target=\"_blank\"` with `rel=\"noopener\"`). The footer logo, like the header one, is 48 × 48 and with `loading=\"lazy\"`.\n\nAt the end, the list reviews **the whole page**: that the menu links point to sections that exist, that each section has its title and that all the images are complete.",
        captura: "recursos/huellas/capturas-en/m1-encargo-5.png",
        textos: "REVIEWS (#reviews)\nKicker: Reviews\nTitle (h2): What people say about us\n\nimg/opinion-perro.jpg · 120 × 120 · loading=\"lazy\" · alt: Copo, Lucía's Maltese\n  Copo walks into the exam room wagging his tail. They explained everything to us calmly and without rushing.\n  Lucía M. · Copo, Maltese · ★★★★★\nimg/opinion-gato.jpg · 120 × 120 · loading=\"lazy\" · alt: Simba, Javier's cat\n  Simba hates the carrier, but they treat him here with such care that he goes back home calm.\n  Javier R. · Simba, cat · ★★★★★\nimg/opinion-conejo.jpg · 120 × 120 · loading=\"lazy\" · alt: Canela, Marta's rabbit\n  At last a clinic that knows rabbits. They checked her teeth and gave us very helpful advice.\n  Marta G. · Canela, rabbit · ★★★★★\n\nFOOTER (#contact)\nColumn 1: logo img/logo.svg (alt: Huellas, veterinary clinic · 48 × 48 · loading=\"lazy\") · A veterinary clinic nearby, in the center of Madrid.\nColumn 2 · Contact:\n  12 Calle de los Almendros · 28013 Madrid\n  Phone: 912 345 678   (tel:+34912345678)\n  Emergencies: 600 123 456   (tel:+34600123456)\n  Email: hola@huellas.example   (mailto:hola@huellas.example)\n  How to get here → https://www.openstreetmap.org/search?query=Madrid   (another tab)\nColumn 3 · Hours: Monday to Friday, 9:00 – 20:30 · Saturdays, 10:00 – 14:00 · 24-hour emergency care\nColumn 4 · Follow us: Instagram → https://www.instagram.com/ · Facebook → https://www.facebook.com/   (another tab)\nFinal line: © 2026 Huellas · Veterinary clinic · Privacy policy → privacidad.html",
        glosario: ["<article>", "<footer>", "href=\"tel:\" and href=\"mailto:\"", "target=\"_blank\"", "href=\"otra.html\"", "loading=\"lazy\"", "<section>", "alt"],
        inicial: { html: PASOS[3] },
        comprobaciones: [
          { texto: "A `<section id=\"reviews\">`, inside the `<main>`, with its kicker and its `<h2>`", repaso: "html-12",
            prueba: doc => { const s = doc.querySelector("main section#reviews"); return es(s?.querySelector("h2"), "What people say about us") && tiene(s, "Reviews"); } },
          { texto: "The 3 reviews in `<article>`, each with its text and its author in bold", repaso: "html-12",
            // Solo los article de dentro: el alumno puede agrupar las tres opiniones en otro article
            prueba: doc => { const a = [...doc.querySelectorAll("#reviews article")].filter(x => !x.querySelector("article"));
              return a.length === 3 && OPINIONES.every(([, autor, texto], i) => tiene(a[i], texto) && [...a[i].querySelectorAll("strong")].some(s => es(s, autor))); } },
          { texto: "The review photos have an `alt` that describes them, `width`, `height` and `loading=\"lazy\"`", repaso: "html-07",
            prueba: doc => OPINIONES.every(([src]) => { const img = doc.querySelector('#reviews img[src="img/' + src + '"]'); return describe(img) && conTamano(img) && perezosa(img); }) },
          { texto: "The footer is a `<footer id=\"contact\">`, after the `<main>`, with the address and the hours", repaso: "html-12",
            prueba: doc => { const f = doc.querySelector("footer#contact"); const m = doc.querySelector("main");
              return !!f && !!m && !m.contains(f) && !!(m.compareDocumentPosition(f) & 4) && tiene(f, "12 Calle de los Almendros")
                && tiene(f, "Monday to Friday, 9:00 – 20:30") && tiene(f, "A veterinary clinic nearby, in the center of Madrid"); } },
          { texto: "In the footer, the phones with `tel:` and the email with `mailto:`", repaso: "html-06",
            prueba: doc => ["tel:+34912345678", "tel:+34600123456", "mailto:hola@huellas.example"].every(h => !!doc.querySelector('footer a[href="' + h + '"]')) },
          { texto: "“How to get here”, Instagram and Facebook open in another tab, with `rel=\"noopener\"`", repaso: "html-06",
            prueba: doc => ["https://www.openstreetmap.org/search?query=Madrid", "https://www.instagram.com/", "https://www.facebook.com/"].every(h => {
              const a = doc.querySelector('footer a[href="' + h + '"]'); return atributo(a, "target") === "_blank" && /noopener/.test(atributo(a, "rel")); }) },
          { texto: "The final line of the footer links to `privacidad.html`", repaso: "html-06",
            prueba: doc => [...doc.querySelectorAll('footer a[href="privacidad.html"]')].some(a => es(a, "Privacy policy")) },
          { texto: "Review: each menu link points to a section that exists", repaso: "html-06",
            prueba: doc => { const a = [...doc.querySelectorAll("header nav a")]; return a.length === 5 && a.every(x => !!doc.getElementById(atributo(x, "href").slice(1))); } },
          { texto: "Review: a single `<h1>`, and each `<section>` has its `<h2>`", repaso: "html-03",
            prueba: doc => doc.querySelectorAll("h1").length === 1 && [...doc.querySelectorAll("section")].every(s => s.id === "home" || !!s.querySelector("h2")) },
          { texto: "Review: all the images have `alt`, `width` and `height`", repaso: "html-07",
            prueba: doc => [...doc.images].every(img => img.hasAttribute("alt") && conTamano(img)) },
          { texto: "Review: the images of services, team, reviews and footer carry `loading=\"lazy\"`", repaso: "html-07",
            prueba: doc => [...doc.querySelectorAll("#services img, #team img, #reviews img, footer img")].every(img => perezosa(img) || /iconos\//.test(atributo(img, "src"))) }
        ],
        pistas: [pista, "A review: an <article> with <img src=\"img/opinion-perro.jpg\" alt=\"…\" width=\"120\" height=\"120\" loading=\"lazy\">, a <p> with the text and another <p> with <strong>Lucía M.</strong> · Copo, Maltese · ★★★★★. The footer goes between </main> and </body>: <footer id=\"contact\">…</footer>. A link that opens in another tab: <a href=\"…\" target=\"_blank\" rel=\"noopener\">How to get here</a>."],
        solucion: { html: PASOS[4] },
        alternativas: [{ html: otraForma(PASOS[4]) }]
      }
    ]
  });
})();
