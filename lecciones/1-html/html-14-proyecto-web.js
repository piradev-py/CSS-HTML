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
  const otraForma = h => h.replace(/ class="(?!servicio")[^"]*"/g, "").replace(/<div>/g, "<article>").replace(/<\/div>/g, "</article>");

  const TITULO = "Huellas · Clínica veterinaria en Madrid";
  const DESCRIPCION = "Clínica veterinaria cercana para perros, gatos y exóticos. Medicina general, vacunas, cirugía y urgencias 24 horas. Pide tu cita en línea.";
  const MENU = [["Inicio", "#inicio"], ["Servicios", "#servicios"], ["Equipo", "#equipo"], ["Horario", "#horario"], ["Contacto", "#contacto"]];
  const VENTAJAS = [
    ["corazon", "Atención cercana", "Te escuchamos y te explicamos cada paso."],
    ["escudo", "Instalaciones modernas", "Quirófano, rayos X y laboratorio propios."],
    ["equipo", "Equipo especializado", "Veterinarios con formación en cada área."],
    ["huella", "Todas las etapas de su vida", "Desde cachorro hasta la edad senior."]
  ];
  const SERVICIOS = [
    ["Medicina general", "Revisiones, diagnóstico y consejos para prevenir antes que curar.", "medicina", "fonendo"],
    ["Vacunación", "El calendario de vacunas y desparasitación adaptado a su edad.", "vacunacion", "jeringa"],
    ["Cirugía", "Quirófano propio y anestesia vigilada en todo momento.", "cirugia", "bisturi"]
  ];
  const EQUIPO = [["equipo-1.jpg", "Daniel Ortega", "Medicina general y urgencias"], ["equipo-2.jpg", "Pablo Ruiz", "Dermatología"]];
  const DIAS = [["Lunes", "9:00 – 20:30"], ["Martes", "9:00 – 20:30"], ["Miércoles", "9:00 – 20:30"], ["Jueves", "9:00 – 20:30"],
    ["Viernes", "9:00 – 20:30"], ["Sábado", "10:00 – 14:00"], ["Domingo", "Cerrado"]];
  const CAMPOS = [["mascota", "select"], ["fecha", "date"], ["hora", "time"], ["motivo", "textarea"], ["nombre", "text"],
    ["telefono", "tel"], ["email", "email"], ["privacidad", "checkbox"]];
  const OPINIONES = [
    ["opinion-perro.jpg", "Lucía M.", "Copo entra en la consulta moviendo la cola."],
    ["opinion-gato.jpg", "Javier R.", "Simba odia el transportín"],
    ["opinion-conejo.jpg", "Marta G.", "Por fin una clínica que sabe de conejos."]
  ];

  const tipoDe = el => el.tagName === "INPUT" ? (el.getAttribute("type") || "text").toLowerCase() : el.tagName.toLowerCase();
  const campo = (doc, nombre) => doc.querySelector('#form-cita [name="' + nombre + '"]');

  const pista = "Mira la captura y los textos del encargo, y abre el 📚 Glosario si no recuerdas una etiqueta. Cada comprobación en rojo tiene un enlace para repasar su lección.";

  CURSO.registrar({
    id: "html-14",
    titulo: "Proyecto web: la clínica Huellas",
    xp: 120,
    objetivo: "Construirás desde cero la web de la clínica veterinaria «Huellas» en HTML, siguiendo el encargo del cliente.",
    pasos: [
      {
        tipo: "explicacion",
        titulo: "Tu primer encargo de verdad",
        texto: "¡Bienvenido al equipo! 🐾 La clínica veterinaria **Huellas** nos ha encargado su web, y tú eres **el programador**.\n\nAsí se trabaja en una empresa: el cliente da los **textos** (quiénes son, sus servicios, su horario…), el equipo de diseño decide **cómo se ve** y tú lo conviertes en código. Tú no inventas nada: traduces el encargo a HTML.\n\nEn cada encargo tendrás:\n\n• **Qué hay que construir** y la **captura** de cómo debe quedar.\n• Los **📄 Textos del encargo**, listos para copiar: las etiquetas las pones tú.\n• Una lista que se pone en **verde** mientras escribes. Si algo falla, te dice qué lección repasar.\n• El **📚 Glosario**, con todo lo que has aprendido, por si se te olvida una etiqueta.\n\nEn este mundo la web va **sin estilos**: se verá sencilla, ¡y está bien! Primero el contenido y la estructura; los colores llegarán en el Mundo CSS.",
        consejo: "Son 5 encargos sobre el mismo archivo, `index.html`. Tu código se guarda solo y pasa de un encargo al siguiente. ¡Empiezas con la hoja en blanco, como un profesional!"
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        enunciado: "**La cabeza y la cabecera.** Empieza `index.html` desde cero:\n\n1. El esqueleto de la página, en español.\n2. La cabeza completa: `charset`, la `viewport`, el `title` y la `description`, las 4 metas **Open Graph** y el favicon.\n3. La **cabecera** (`header`): el logo `img/logo.svg` (48 × 48, `alt=\"\"` porque el nombre va al lado) y el nombre, los dos dentro de un enlace a `#inicio`; el **menú** con sus 5 enlaces; y el botón **Pide tu cita**, que lleva a `#cita`.\n\nLos enlaces del menú todavía no llevan a ningún sitio: las secciones llegan en los próximos encargos.",
        captura: "recursos/huellas/capturas/m1-encargo-1.png",
        textos: "CABEZA DE LA PÁGINA\ntitle: Huellas · Clínica veterinaria en Madrid\ndescription: Clínica veterinaria cercana para perros, gatos y exóticos. Medicina general, vacunas, cirugía y urgencias 24 horas. Pide tu cita en línea.\nog:title: el mismo que el title\nog:description: la misma que la description\nog:image: img/portada.jpg\nog:type: website\nFavicon: img/favicon.svg\n\nCABECERA\nLogo: img/logo.svg + «Huellas» (en negrita) + «Clínica veterinaria» → enlace a #inicio\nMenú: Inicio → #inicio · Servicios → #servicios · Equipo → #equipo · Horario → #horario · Contacto → #contacto\nBotón: Pide tu cita → #cita",
        glosario: ["<!DOCTYPE html>", "<html lang=\"es\">", "<meta charset=\"UTF-8\">", "<meta name=\"viewport\">", "<meta name=\"description\">", "Open Graph (og:…)", "<link rel=\"icon\">", "<header>", "<nav>", "<ul> y <li>", "href=\"#id\"", "<img>"],
        inicial: { html: "" },
        comprobaciones: [
          { texto: "La página tiene `<!DOCTYPE html>` y el `<html>` lleva `lang=\"es\"`", repaso: "html-02",
            prueba: doc => doc.doctype?.name === "html" && atributo(doc.documentElement, "lang").toLowerCase() === "es" },
          { texto: "En el `<head>`: el `charset`, la `viewport` y el `title` del encargo", repaso: "html-13",
            prueba: doc => !!doc.querySelector("head meta[charset]") && /width\s*=\s*device-width/.test(meta(doc, 'meta[name="viewport"]'))
              && es(doc.querySelector("head title"), TITULO) },
          { texto: "La `description` del encargo", repaso: "html-13",
            prueba: doc => simple(meta(doc, 'meta[name="description"]')) === simple(DESCRIPCION) },
          { texto: "Las 4 metas Open Graph del encargo", repaso: "html-13",
            prueba: doc => simple(meta(doc, 'meta[property="og:title"]')) === simple(TITULO)
              && simple(meta(doc, 'meta[property="og:description"]')) === simple(DESCRIPCION)
              && meta(doc, 'meta[property="og:image"]') === "img/portada.jpg" && meta(doc, 'meta[property="og:type"]') === "website" },
          { texto: "El favicon `img/favicon.svg`", repaso: "html-13",
            prueba: doc => atributo(doc.querySelector('link[rel~="icon"]'), "href") === "img/favicon.svg" },
          { texto: "Un `<header>` con el logo `img/logo.svg` (con `alt`, `width` y `height`) y el nombre «Huellas»", repaso: "html-07",
            prueba: doc => { const h = doc.querySelector("header"); const img = h && h.querySelector('img[src="img/logo.svg"]');
              return decorativa(img) && conTamano(img) && tiene(h, "Huellas") && tiene(h, "Clínica veterinaria"); } },
          { texto: "El logo y el nombre van dentro de un enlace a `#inicio`", repaso: "html-06",
            prueba: doc => { const a = doc.querySelector('header a[href="#inicio"] img[src="img/logo.svg"]')?.closest("a"); return tiene(a, "Huellas"); } },
          { texto: "Un `<nav>` con los 5 enlaces del menú, en orden y a su sección", repaso: "html-12",
            prueba: doc => { const a = [...doc.querySelectorAll("header nav a")];
              return a.length === 5 && MENU.every(([t, h], i) => es(a[i], t) && atributo(a[i], "href") === h); } },
          { texto: "El botón «Pide tu cita» de la cabecera lleva a `#cita`", repaso: "html-06",
            prueba: doc => [...doc.querySelectorAll('header a[href="#cita"]')].some(a => es(a, "Pide tu cita")) }
        ],
        pistas: [pista, "Empieza por el esqueleto de la lección «La estructura de una página» y la cabeza de «La cabeza de la página». Para el menú: <nav> con una lista <ul> y un <li><a href=\"#…\">…</a></li> por enlace."],
        solucion: { html: PASOS[0] },
        alternativas: [{ html: otraForma(PASOS[0]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        enunciado: "**La portada.** Debajo de la cabecera abre el **contenido principal** (`main`) y, dentro, la portada: una `section` con `id=\"inicio\"` (la que enlazan el logo y el menú). Lleva:\n\n1. El antetítulo, el **único `h1`** de la página con «toda su vida» destacado en `em`, el texto y el botón a `#cita`.\n2. La foto `img/portada.jpg` (600 × 401, con su `alt`) y la nota manuscrita `img/nota.png` (304 × 75, decorativa). Están arriba del todo: **sin** `loading=\"lazy\"`.\n3. La tarjeta **Pide tu cita**, con su enlace a `#cita`.\n\nDespués de la portada, todavía dentro del `main`, la **franja de confianza**: las 4 ventajas, cada una con su icono (52 × 52, decorativo).",
        captura: "recursos/huellas/capturas/m1-encargo-2.png",
        textos: "PORTADA (#inicio)\nAntetítulo: Cuidamos lo que más quieres\nTitular (h1): Salud y cariño para toda su vida   ← «toda su vida» destacado\nTexto: Medicina veterinaria cercana y profesional, para que tu compañero esté siempre en las mejores manos.\nBotón: Pide tu cita → #cita\nFoto: img/portada.jpg · alt: Un perro y un gato tumbados juntos al sol\nNota manuscrita: img/nota.png (decorativa)\nTarjeta: Pide tu cita · En pocos pasos · Reservar cita → #cita\n\nFRANJA DE CONFIANZA (icono · título · línea)\nimg/iconos/corazon.svg · Atención cercana · Te escuchamos y te explicamos cada paso.\nimg/iconos/escudo.svg · Instalaciones modernas · Quirófano, rayos X y laboratorio propios.\nimg/iconos/equipo.svg · Equipo especializado · Veterinarios con formación en cada área.\nimg/iconos/huella.svg · Todas las etapas de su vida · Desde cachorro hasta la edad senior.",
        glosario: ["<main>", "<section>", "<h1> … <h6>", "<em>", "<strong>", "<p>", "alt", "width y height", "<div>", "class"],
        inicial: { html: PASOS[0] },
        comprobaciones: [
          { texto: "Un solo `<main>` y, dentro, una `<section>` con `id=\"inicio\"`", repaso: "html-12",
            prueba: doc => doc.querySelectorAll("main").length === 1 && !!doc.querySelector("main section#inicio") },
          { texto: "El antetítulo y un único `<h1>`, en la portada, con el titular del encargo", repaso: "html-03",
            prueba: doc => { const h1 = doc.querySelectorAll("h1"); const p = doc.querySelector("#inicio");
              return h1.length === 1 && !!p?.contains(h1[0]) && es(h1[0], "Salud y cariño para toda su vida") && tiene(p, "Cuidamos lo que más quieres"); } },
          { texto: "«toda su vida» va destacado en un `<em>`", repaso: "html-04",
            prueba: doc => es(doc.querySelector("h1 em"), "toda su vida") },
          { texto: "El texto de la portada", repaso: "html-03",
            prueba: doc => tiene(doc.querySelector("#inicio"), "Medicina veterinaria cercana y profesional, para que tu compañero esté siempre en las mejores manos.") },
          { texto: "La foto `img/portada.jpg` con un `alt` que la describe, `width` y `height`, y sin `loading=\"lazy\"`", repaso: "html-07",
            prueba: doc => { const img = doc.querySelector('#inicio img[src="img/portada.jpg"]'); return describe(img) && conTamano(img) && !perezosa(img); } },
          { texto: "La nota `img/nota.png` es decorativa (`alt=\"\"`) y tiene `width` y `height`", repaso: "html-07",
            prueba: doc => { const img = doc.querySelector('#inicio img[src="img/nota.png"]'); return decorativa(img) && conTamano(img); } },
          { texto: "La tarjeta: «Pide tu cita», «En pocos pasos» y el enlace «Reservar cita» a `#cita`", repaso: "html-06",
            prueba: doc => { const p = doc.querySelector("#inicio");
              return tiene(p, "En pocos pasos") && [...(p?.querySelectorAll('a[href="#cita"]') || [])].some(a => es(a, "Reservar cita"))
                && [...(p?.querySelectorAll('a[href="#cita"]') || [])].some(a => es(a, "Pide tu cita")); } },
          { texto: "La franja, dentro del `<main>` y después de la portada, con las 4 ventajas del encargo", repaso: "html-05",
            prueba: doc => { const m = doc.querySelector("main"); const p = doc.querySelector("#inicio");
              const fuera = m ? simple([...m.childNodes].filter(n => n !== p).map(n => n.textContent).join(" ")) : "";
              return VENTAJAS.every(([, t, l]) => fuera.includes(simple(t)) && fuera.includes(simple(l))); } },
          { texto: "Cada ventaja tiene su icono decorativo (`alt=\"\"`) con `width` y `height`", repaso: "html-07",
            prueba: doc => VENTAJAS.every(([i]) => { const img = imagen(doc, "img/iconos/" + i + ".svg"); return decorativa(img) && conTamano(img); }) }
        ],
        pistas: [pista, "Estructura: <main> → <section id=\"inicio\"> con el texto, la foto y la tarjeta → </section> → la franja (por ejemplo, una lista <ul> con un <li> por ventaja) → </main>. El <h1> lleva dentro <em>toda su vida</em>."],
        solucion: { html: PASOS[1] },
        alternativas: [{ html: otraForma(PASOS[1]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        enunciado: "**Servicios y equipo.** Dos secciones más dentro del `main`, después de la franja:\n\n1. `section` con `id=\"servicios\"`: antetítulo, `h2` y **3 tarjetas** `article` con `class=\"servicio\"` (esa clase es del contrato: el CSS y el JavaScript la buscarán). Cada tarjeta: su foto (320 × 213, decorativa), su icono (52 × 52, decorativo), el nombre en un `h3`, la descripción y el enlace **Pide cita** a `#cita`.\n2. `section` con `id=\"equipo\"`: antetítulo, `h2` y **2 personas**, cada una en una `figure` con su foto (240 × 300, con `alt`) y un `figcaption` con el nombre en negrita, un salto de línea y la especialidad.\n\nEstas fotos no se ven al abrir la página: todas con `loading=\"lazy\"`.",
        captura: "recursos/huellas/capturas/m1-encargo-3.png",
        textos: "SERVICIOS (#servicios)\nAntetítulo: Nuestros servicios\nTítulo (h2): Todo lo que necesitan, en un solo lugar\n\nMedicina general · Revisiones, diagnóstico y consejos para prevenir antes que curar.\n  foto img/servicio-medicina.jpg · icono img/iconos/fonendo.svg\nVacunación · El calendario de vacunas y desparasitación adaptado a su edad.\n  foto img/servicio-vacunacion.jpg · icono img/iconos/jeringa.svg\nCirugía · Quirófano propio y anestesia vigilada en todo momento.\n  foto img/servicio-cirugia.jpg · icono img/iconos/bisturi.svg\nEn cada tarjeta, el enlace: Pide cita → #cita\n\nEQUIPO (#equipo)\nAntetítulo: Nuestro equipo\nTítulo (h2): Personas que quieren a los animales tanto como tú\n\nimg/equipo-1.jpg · Daniel Ortega · Medicina general y urgencias\n  alt: Daniel Ortega, veterinario, sonriendo en la consulta\nimg/equipo-2.jpg · Pablo Ruiz · Dermatología\n  alt: Pablo Ruiz, veterinario, con un pomerania en brazos",
        glosario: ["<section>", "<article>", "class", "<h1> … <h6>", "alt", "loading=\"lazy\"", "<figure> y <figcaption>", "<br>", "<strong>"],
        inicial: { html: PASOS[1] },
        comprobaciones: [
          { texto: "Una `<section id=\"servicios\">` con su antetítulo y su `<h2>`", repaso: "html-12",
            prueba: doc => { const s = doc.querySelector("main section#servicios");
              return es(s?.querySelector("h2"), "Todo lo que necesitan, en un solo lugar") && tiene(s, "Nuestros servicios"); } },
          { texto: "3 `<article class=\"servicio\">` con los nombres del encargo en su `<h3>`, en orden", repaso: "html-12",
            prueba: doc => { const a = [...doc.querySelectorAll("#servicios article.servicio")];
              return a.length === 3 && SERVICIOS.every(([n], i) => es(a[i].querySelector("h3"), n)); } },
          { texto: "Cada servicio tiene su descripción y un enlace «Pide cita» a `#cita`", repaso: "html-06",
            prueba: doc => { const a = [...doc.querySelectorAll("#servicios article.servicio")];
              return a.length === 3 && SERVICIOS.every(([, d], i) => tiene(a[i], d) && [...a[i].querySelectorAll('a[href="#cita"]')].some(x => es(x, "Pide cita"))); } },
          { texto: "Cada servicio tiene su foto y su icono: decorativos (`alt=\"\"`) y con `width` y `height`", repaso: "html-07",
            prueba: doc => { const a = [...doc.querySelectorAll("#servicios article.servicio")];
              return a.length === 3 && SERVICIOS.every(([, , f, i], k) => [a[k].querySelector('img[src="img/servicio-' + f + '.jpg"]'), a[k].querySelector('img[src="img/iconos/' + i + '.svg"]')]
                .every(img => decorativa(img) && conTamano(img))); } },
          { texto: "Las fotos de los servicios llevan `loading=\"lazy\"`", repaso: "html-07",
            prueba: doc => SERVICIOS.every(([, , f]) => perezosa(imagen(doc, "img/servicio-" + f + ".jpg"))) },
          { texto: "Una `<section id=\"equipo\">` con su antetítulo y su `<h2>`", repaso: "html-12",
            prueba: doc => { const s = doc.querySelector("main section#equipo");
              return es(s?.querySelector("h2"), "Personas que quieren a los animales tanto como tú") && tiene(s, "Nuestro equipo"); } },
          { texto: "2 `<figure>` con su foto y un `<figcaption>` con el nombre en negrita y la especialidad", repaso: "html-07",
            prueba: doc => { const f = [...doc.querySelectorAll("#equipo figure")];
              return f.length === 2 && EQUIPO.every(([src, n, e], i) => !!f[i].querySelector('img[src="img/' + src + '"]')
                && es(f[i].querySelector("figcaption strong"), n) && tiene(f[i].querySelector("figcaption"), e)); } },
          { texto: "Las fotos del equipo tienen un `alt` que las describe, `width`, `height` y `loading=\"lazy\"`", repaso: "html-07",
            prueba: doc => EQUIPO.every(([src]) => { const img = imagen(doc, "img/" + src); return describe(img) && conTamano(img) && perezosa(img); }) }
        ],
        pistas: [pista, "Una tarjeta de servicio:\n<article class=\"servicio\">\n  <img src=\"img/servicio-medicina.jpg\" alt=\"\" width=\"320\" height=\"213\" loading=\"lazy\">\n  <img src=\"img/iconos/fonendo.svg\" alt=\"\" width=\"52\" height=\"52\">\n  <h3>Medicina general</h3>\n  <p>…</p>\n  <a href=\"#cita\">Pide cita</a>\n</article>\nY una persona: <figure> con la <img …> y <figcaption><strong>Nombre</strong><br>Especialidad</figcaption>."],
        solucion: { html: PASOS[2] },
        alternativas: [{ html: otraForma(PASOS[2]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        enunciado: "**Horario y cita.** Dos secciones más dentro del `main`:\n\n1. `section` con `id=\"horario\"`: antetítulo, `h2`, la **tabla** del horario (fila de cabecera en `thead` y los 7 días en `tbody`) y la nota de urgencias con su enlace `tel:`.\n2. `section` con `id=\"cita\"`: antetítulo, `h2`, el texto y el **formulario** con `id=\"form-cita\"`. Los campos van en `fieldset` con su `legend` (las preguntas de la primera visita, en otro `fieldset` dentro del primero), cada uno con su `label` y el `name` del contrato. Son obligatorios (`required`) la mascota, la fecha, la hora, el nombre, el teléfono, el email y la casilla de privacidad. En la casilla, «política de privacidad» es un enlace a `privacidad.html` (esa página ya está hecha).",
        captura: "recursos/huellas/capturas/m1-encargo-4.png",
        textos: "HORARIO (#horario)\nAntetítulo: Horario\nTítulo (h2): Cuándo puedes venir\nCabecera de la tabla: Día · Consulta · Urgencias\nLunes · 9:00 – 20:30 · 24 horas\nMartes · 9:00 – 20:30 · 24 horas\nMiércoles · 9:00 – 20:30 · 24 horas\nJueves · 9:00 – 20:30 · 24 horas\nViernes · 9:00 – 20:30 · 24 horas\nSábado · 10:00 – 14:00 · 24 horas\nDomingo · Cerrado · 24 horas\nNota: Urgencias: llámanos al 600 123 456 a cualquier hora.   (enlace tel:+34600123456)\n\nPIDE TU CITA (#cita)\nAntetítulo: Pide tu cita\nTítulo (h2): Reserva en un minuto\nTexto: Rellena el formulario y te confirmamos la cita. Si es una urgencia, llámanos.\n\nFormulario id=\"form-cita\"\nfieldset «Datos de la cita»:\n  Tipo de mascota · name=\"mascota\" · select: Elige una… (value vacío) · Perro (perro) · Gato (gato) · Conejo (conejo) · Otro exótico (exotico)\n  Fecha · name=\"fecha\" · date\n  Hora · name=\"hora\" · time · pista: De 9:00 a 20:30 (sábados, de 10:00 a 14:00)\n  Motivo de la consulta · name=\"motivo\" · textarea · placeholder: Cuéntanos qué le pasa o qué necesita\n  fieldset «¿Es su primera visita?»: Sí (value si) · No (value no) · radio, name=\"primera\"\nfieldset «Tus datos»:\n  Tu nombre · name=\"nombre\" · text\n  Teléfono · name=\"telefono\" · tel · placeholder: 600 000 000\n  Email · name=\"email\" · email\n  He leído y acepto la política de privacidad · name=\"privacidad\" · checkbox   («política de privacidad» → privacidad.html)\nBotón: Pedir cita",
        glosario: ["<table>, <tr>, <td>", "<th>", "<thead> y <tbody>", "<form>", "<label for=\"…\">", "<fieldset> y <legend>", "<select> y <option>", "type=\"date\" y type=\"time\"", "<textarea>", "type=\"radio\"", "type=\"checkbox\"", "required"],
        inicial: { html: PASOS[2] },
        comprobaciones: [
          { texto: "Una `<section id=\"horario\">` con su antetítulo y su `<h2>`", repaso: "html-12",
            prueba: doc => { const s = doc.querySelector("main section#horario"); return es(s?.querySelector("h2"), "Cuándo puedes venir") && tiene(s, "Horario"); } },
          { texto: "La tabla tiene la fila de cabecera en `<thead>`, con 3 `<th>`: Día, Consulta y Urgencias", repaso: "html-08",
            prueba: doc => { const th = [...doc.querySelectorAll("#horario table thead th")]; return th.length === 3 && ["Día", "Consulta", "Urgencias"].every((t, i) => es(th[i], t)); } },
          { texto: "En el `<tbody>`, los 7 días con su horario de consulta y urgencias", repaso: "html-08",
            prueba: doc => { const f = [...doc.querySelectorAll("#horario table tbody tr")];
              return f.length === 7 && DIAS.every(([d, c], i) => { const td = f[i].querySelectorAll("td, th");
                return td.length === 3 && es(td[0], d) && es(td[1], c) && es(td[2], "24 horas"); }); } },
          { texto: "La nota de urgencias con su enlace `tel:+34600123456`", repaso: "html-06",
            prueba: doc => !!doc.querySelector('#horario a[href="tel:+34600123456"]') && tiene(doc.querySelector("#horario"), "a cualquier hora") },
          { texto: "Una `<section id=\"cita\">` con su antetítulo, su `<h2>` y el texto", repaso: "html-12",
            prueba: doc => { const s = doc.querySelector("main section#cita");
              return es(s?.querySelector("h2"), "Reserva en un minuto") && tiene(s, "Rellena el formulario y te confirmamos la cita"); } },
          { texto: "Un `<form id=\"form-cita\">` con sus `<fieldset>` y `<legend>`: «Datos de la cita», «¿Es su primera visita?» y «Tus datos»", repaso: "html-10",
            prueba: doc => { const l = [...doc.querySelectorAll("#cita form#form-cita fieldset > legend")];
              return ["Datos de la cita", "¿Es su primera visita?", "Tus datos"].every(t => l.some(x => es(x, t))); } },
          { texto: "Los campos del contrato con su tipo: `mascota`, `fecha`, `hora`, `motivo`, `nombre`, `telefono`, `email` y `privacidad`", repaso: "html-10",
            prueba: doc => CAMPOS.every(([n, t]) => { const c = campo(doc, n); return !!c && tipoDe(c) === t; }) },
          { texto: "La mascota se elige en un `<select>` con las 5 opciones del encargo y sus `value`", repaso: "html-10",
            prueba: doc => { const o = [...(campo(doc, "mascota")?.querySelectorAll("option") || [])];
              return o.map(x => x.getAttribute("value")).join(",") === ",perro,gato,conejo,exotico" && es(o[4], "Otro exótico"); } },
          { texto: "La primera visita: 2 `radio` con `name=\"primera\"` y `value` `si` y `no`", repaso: "html-10",
            prueba: doc => [...doc.querySelectorAll('#form-cita input[type="radio"][name="primera"]')].map(r => r.value).join(",") === "si,no" },
          { texto: "Cada campo tiene su `<label for>`", repaso: "html-09",
            prueba: doc => { const c = [...doc.querySelectorAll("#form-cita input, #form-cita select, #form-cita textarea")];
              return c.length >= 10 && c.every(x => x.id && doc.querySelector('label[for="' + x.id + '"]')); } },
          { texto: "Son obligatorios (`required`) la mascota, la fecha, la hora, el nombre, el teléfono, el email y la privacidad", repaso: "html-10",
            prueba: doc => ["mascota", "fecha", "hora", "nombre", "telefono", "email", "privacidad"].every(n => campo(doc, n)?.hasAttribute("required")) },
          { texto: "El `label` de la privacidad enlaza a `privacidad.html`, y hay un botón «Pedir cita»", repaso: "html-06",
            prueba: doc => { const c = campo(doc, "privacidad"); const l = c && doc.querySelector('label[for="' + c.id + '"]');
              return !!l?.querySelector('a[href="privacidad.html"]') && [...doc.querySelectorAll("#form-cita button")].some(b => es(b, "Pedir cita")); } }
        ],
        pistas: [pista, "Cada campo va así: <label for=\"fecha\">Fecha</label> y debajo <input type=\"date\" id=\"fecha\" name=\"fecha\" required>. Los radios: <input type=\"radio\" id=\"primera-si\" name=\"primera\" value=\"si\"> <label for=\"primera-si\">Sí</label>. El enlace va dentro del label: <label for=\"privacidad\">He leído y acepto la <a href=\"privacidad.html\">política de privacidad</a></label>."],
        solucion: { html: PASOS[3] },
        alternativas: [{ html: otraForma(PASOS[3]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        enunciado: "**Opiniones y pie.** ¡El último encargo!\n\n1. Dentro del `main`, la `section` con `id=\"opiniones\"`: antetítulo, `h2` y las **3 opiniones**, cada una en un `article` con la foto de la mascota (120 × 120, con `alt`), el texto y el autor en negrita.\n2. Después del `main`, el **pie**: `footer` con `id=\"contacto\"` (el que enlaza el menú) y sus 4 columnas: logo y frase, contacto, horario y redes; y la línea final con el enlace a `privacidad.html`. Los teléfonos con `tel:`, el email con `mailto:`, y «Cómo llegar» y las redes se abren en otra pestaña.\n\nAl terminar, la lista repasa **toda la página**: que el menú lleve a secciones que existen, que cada sección tenga su título y que todas las imágenes estén completas.",
        captura: "recursos/huellas/capturas/m1-encargo-5.png",
        textos: "OPINIONES (#opiniones)\nAntetítulo: Opiniones\nTítulo (h2): Lo que dicen de nosotros\n\nimg/opinion-perro.jpg · alt: Copo, el bichón maltés de Lucía\n  Copo entra en la consulta moviendo la cola. Nos explicaron todo con calma y sin prisas.\n  Lucía M. · Copo, bichón maltés · ★★★★★\nimg/opinion-gato.jpg · alt: Simba, el gato de Javier\n  Simba odia el transportín, pero aquí lo tratan con tanto mimo que vuelve tranquilo a casa.\n  Javier R. · Simba, gato · ★★★★★\nimg/opinion-conejo.jpg · alt: Canela, el conejo de Marta\n  Por fin una clínica que sabe de conejos. Le revisaron los dientes y nos dieron muy buenos consejos.\n  Marta G. · Canela, conejo · ★★★★★\n\nPIE (#contacto)\nColumna 1: logo img/logo.svg (alt: Huellas, clínica veterinaria) · Clínica veterinaria cercana en el centro de Madrid.\nColumna 2 · Contacto:\n  Calle de los Almendros, 12 · 28013 Madrid\n  Teléfono: 912 345 678   (tel:+34912345678)\n  Urgencias: 600 123 456   (tel:+34600123456)\n  Email: hola@huellas.example   (mailto:hola@huellas.example)\n  Cómo llegar → https://www.openstreetmap.org/search?query=Madrid   (otra pestaña)\nColumna 3 · Horario: Lunes a viernes, 9:00 – 20:30 · Sábados, 10:00 – 14:00 · Urgencias 24 horas\nColumna 4 · Síguenos: Instagram → https://www.instagram.com/ · Facebook → https://www.facebook.com/   (otra pestaña)\nLínea final: © 2026 Huellas · Clínica veterinaria · Política de privacidad → privacidad.html",
        glosario: ["<article>", "<footer>", "href=\"tel:\" y href=\"mailto:\"", "target=\"_blank\"", "href=\"otra.html\"", "loading=\"lazy\"", "<section>", "alt"],
        inicial: { html: PASOS[3] },
        comprobaciones: [
          { texto: "Una `<section id=\"opiniones\">`, dentro del `<main>`, con su antetítulo y su `<h2>`", repaso: "html-12",
            prueba: doc => { const s = doc.querySelector("main section#opiniones"); return es(s?.querySelector("h2"), "Lo que dicen de nosotros") && tiene(s, "Opiniones"); } },
          { texto: "Las 3 opiniones en `<article>`, cada una con su texto y su autor en negrita", repaso: "html-12",
            // Solo los article de dentro: el alumno puede agrupar las tres opiniones en otro article
            prueba: doc => { const a = [...doc.querySelectorAll("#opiniones article")].filter(x => !x.querySelector("article"));
              return a.length === 3 && OPINIONES.every(([, autor, texto], i) => tiene(a[i], texto) && [...a[i].querySelectorAll("strong")].some(s => es(s, autor))); } },
          { texto: "Las fotos de las opiniones tienen un `alt` que las describe, `width`, `height` y `loading=\"lazy\"`", repaso: "html-07",
            prueba: doc => OPINIONES.every(([src]) => { const img = doc.querySelector('#opiniones img[src="img/' + src + '"]'); return describe(img) && conTamano(img) && perezosa(img); }) },
          { texto: "El pie es un `<footer id=\"contacto\">`, después del `<main>`, con la dirección y el horario", repaso: "html-12",
            prueba: doc => { const f = doc.querySelector("footer#contacto"); const m = doc.querySelector("main");
              return !!f && !!m && !m.contains(f) && !!(m.compareDocumentPosition(f) & 4) && tiene(f, "Calle de los Almendros, 12")
                && tiene(f, "Lunes a viernes, 9:00 – 20:30") && tiene(f, "Clínica veterinaria cercana en el centro de Madrid"); } },
          { texto: "En el pie, los teléfonos con `tel:` y el email con `mailto:`", repaso: "html-06",
            prueba: doc => ["tel:+34912345678", "tel:+34600123456", "mailto:hola@huellas.example"].every(h => !!doc.querySelector('footer a[href="' + h + '"]')) },
          { texto: "«Cómo llegar», Instagram y Facebook se abren en otra pestaña, con `rel=\"noopener\"`", repaso: "html-06",
            prueba: doc => ["https://www.openstreetmap.org/search?query=Madrid", "https://www.instagram.com/", "https://www.facebook.com/"].every(h => {
              const a = doc.querySelector('footer a[href="' + h + '"]'); return atributo(a, "target") === "_blank" && /noopener/.test(atributo(a, "rel")); }) },
          { texto: "La línea final del pie enlaza a `privacidad.html`", repaso: "html-06",
            prueba: doc => [...doc.querySelectorAll('footer a[href="privacidad.html"]')].some(a => es(a, "Política de privacidad")) },
          { texto: "Repaso: cada enlace del menú lleva a una sección que existe", repaso: "html-06",
            prueba: doc => { const a = [...doc.querySelectorAll("header nav a")]; return a.length === 5 && a.every(x => !!doc.getElementById(atributo(x, "href").slice(1))); } },
          { texto: "Repaso: un solo `<h1>`, y cada `<section>` tiene su `<h2>`", repaso: "html-03",
            prueba: doc => doc.querySelectorAll("h1").length === 1 && [...doc.querySelectorAll("section")].every(s => s.id === "inicio" || !!s.querySelector("h2")) },
          { texto: "Repaso: todas las imágenes tienen `alt`, `width` y `height`", repaso: "html-07",
            prueba: doc => [...doc.images].every(img => img.hasAttribute("alt") && conTamano(img)) },
          { texto: "Repaso: las imágenes de servicios, equipo, opiniones y pie llevan `loading=\"lazy\"`", repaso: "html-07",
            prueba: doc => [...doc.querySelectorAll("#servicios img, #equipo img, #opiniones img, footer img")].every(img => perezosa(img) || /iconos\//.test(atributo(img, "src"))) }
        ],
        pistas: [pista, "Una opinión: <article> con <img src=\"img/opinion-perro.jpg\" alt=\"…\" width=\"120\" height=\"120\" loading=\"lazy\">, un <p> con el texto y otro <p> con <strong>Lucía M.</strong> · Copo, bichón maltés · ★★★★★. El pie va entre </main> y </body>: <footer id=\"contacto\">…</footer>. Un enlace que se abre en otra pestaña: <a href=\"…\" target=\"_blank\" rel=\"noopener\">Cómo llegar</a>."],
        solucion: { html: PASOS[4] },
        alternativas: [{ html: otraForma(PASOS[4]) }]
      }
    ]
  });
})();
