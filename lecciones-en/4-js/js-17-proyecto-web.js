/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-17 (inglés)
   Proyecto web: la web de «Huellas» funciona (docs/PROYECTO_FINAL.md).
   Sustituye a js-14: la agenda de citas enseña lo mismo que la lista
   de tareas (añadir, mostrar, cancelar, recordar al recargar).
   6 encargos sobre el mismo script.js, que empieza vacío:
   menú del móvil · enlace activo y año · servicios desde datos ·
   filtros · cita validada · mis citas y opiniones.
   El HTML y el CSS son los oficiales del Mundo 4 (el equipo de
   diseño ya añadió los filtros, los huecos para los mensajes y
   «Mis citas»); el alumno solo enlaza el script.
   Las soluciones son HUELLAS["mundo-4"].pasos de la web inglesa
   (lecciones-en/huellas/versiones.js, de herramientas/huellas-en.mjs).
   Notas:
   - Se comprueba el efecto, simulando clics y escritura en una copia
     recién cargada (PRUEBA.recargar), con el reloj parado en
     HOY: «la fecha no puede ser pasada» no depende del calendario.
   - Los nombres de variables y funciones los elige el alumno (ver
     `alternativas`: otros nombres y otra clave de localStorage).
   - El archivo de datos sigue siendo datos/opiniones.json (los
     nombres de archivo de Huellas no se traducen).
   ============================================================ */
(function () {
  const PROYECTO = { raiz: "recursos/huellas/web/", html: "index.html", css: "estilos.css", js: "script.js" };
  const PASOS = HUELLAS["mundo-4"].pasos;
  const sinPreconnect = h => h.replace(/\n *<link rel="preconnect"[^>]*>/g, "");
  const HTML = sinPreconnect(HUELLAS["mundo-4"].html);
  const CSS = HUELLAS["mundo-4"].css;
  const SIN_SCRIPT = HTML.replace(/\n *<script src="script.js"><\/script>/, "");

  // El mismo script con otros nombres (y otra clave para guardar): los nombres los elige el alumno
  const otraForma = js => js.replace(/\bmenuButton\b/g, "theMenuButton").replace(/\brenderServices\b/g, "showServices")
    .replace(/\bcheck\b/g, "validateField").replace(/\bsummary\b/g, "appointmentText").replace(/\brenderAppointments\b/g, "showAppointments")
    .replace(/"huellas-appointments"/g, "\"my-huellas-appointments\"");

  // Texto comparable: sin tildes, mayúsculas ni espacios de más (como en los ejercicios)
  const simple = t => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();
  const HOY = "2026-10-20T10:00";
  // Una copia recién cargada (como pulsar F5), con el reloj parado en HOY y sin citas guardadas
  const nueva = (doc, opciones = {}) => PRUEBA.recargar(doc, Object.assign({ hoy: HOY, borrarDatos: true }, opciones));
  const sinErrores = v => !(v.win.__errores || []).length;
  const SERVICIOS = ["General medicine", "Vaccination", "Surgery", "Dental health", "Dermatology", "Diagnostics"];
  const EXOTICOS = ["General medicine", "Vaccination", "Dermatology", "Diagnostics"];
  const nombresServicios = d => [...d.querySelectorAll("#service-list .service h3")].map(h => h.textContent.trim());
  const igualQue = (a, b) => a.length === b.length && a.every((x, i) => simple(x) === simple(b[i]));
  const MENSAJES = {
    pet: "Choose which pet is coming in for their visit.",
    date: "Choose a day from today onward.",
    time: "Choose a time within clinic hours.",
    name: "Write your name.",
    phone: "The phone number must have 9 digits, with no spaces.",
    email: "Write a valid email, for example name@example.com.",
    privacy: "We need you to accept the privacy policy."
  };
  const BUENA = { pet: "dog", date: "2026-10-21", time: "10:00", name: "Ana", phone: "600111222", email: "ana@example.com", privacy: true };
  const RESUMEN = "Dog · 2026-10-21 at 10:00 · for Ana";
  const error = (d, n) => (d.querySelector("#error-" + n) || {}).textContent || "";
  // Rellena el formulario (lo que no se diga, con los datos de BUENA) y lo envía
  function pedir(d, cambios = {}) {
    const datos = Object.assign({}, BUENA, cambios);
    for (const [n, valor] of Object.entries(datos)) {
      const campo = d.querySelector('#appointment-form [name="' + n + '"]');
      if (n === "privacy") campo.checked = valor;
      else PRUEBA.escribir(campo, valor);
    }
    d.querySelector("#appointment-form").requestSubmit();
  }
  const citas = d => [...d.querySelectorAll("#appointment-list li")];
  // Solo falla el campo n: su mensaje es el del encargo, los demás están vacíos y no hay confirmación
  const soloFalla = (d, n) => simple(error(d, n)) === simple(MENSAJES[n]) && Object.keys(MENSAJES).every(m => m === n || !error(d, m).trim())
    && !simple(d.querySelector("#confirmation").textContent).includes("booked");

  const pista = "Look at the task's texts and open the 📚 Glossary if you don't remember how something was written. Each red check has a link to review its lesson; and if something doesn't work, look at the console: that's where errors show up.";

  CURSO.registrar({
    id: "js-17",
    titulo: "Web project: Huellas's appointment book",
    xp: 150,
    objetivo: "You'll bring the “Huellas” clinic's website to life: the phone menu, services that can be filtered and an appointment book that checks, saves and remembers.",
    datos: HUELLAS["mundo-4"].datos,
    pasos: [
      {
        tipo: "explicacion",
        titulo: "The website, at last, works",
        texto: "They loved the layout! 🐾 We've merged it into the **official version** and the clinic has its last task for you: make the website **do things**. They want their clients to be able to book an appointment from home, at any time.\n\nThe design team has already prepared the HTML and CSS for the new parts: the **buttons to filter** the services, the space for **each field's message** and the **“My appointments”** list. Careful: the services grid is now **empty**, because the services will come from a list of data. You write `script.js`, in 6 tasks:\n\n• **The phone menu**, which opens and closes.\n• **The active link** and the **footer year**.\n• **The services**, rendered from an array of objects.\n• **The filters** by pet.\n• **The appointment**, checked field by field.\n• **My appointments**, which are saved and can be canceled, and **the reviews**, which arrive from a data file.\n\nThe checks do what a person would do: they click, type, submit and reload the page.",
        consejo: "You choose the names of your variables and functions. What the task sets are the HTML `id`s and classes (they're already there) and the texts the client sees."
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "js",
        enunciado: "**The phone menu.** In World 3 we left the menu folded behind the “☰ Menu” button. Now, make it work:\n\n1. In `index.html`, right before `</body>`, link the script: `<script src=\"script.js\"></script>`.\n2. In `script.js`: when the `.menu-button` button is pressed, the `nav` gains or loses the `open` class.\n3. And the button tells the screen reader: `aria-expanded` is `\"true\"` with the menu open and `\"false\"` with the menu closed.\n\nTo see it, make the browser window narrow: the button only shows on phones.",
        textos: "LINK: <script src=\"script.js\"></script>   → right before </body>\n\nPHONE MENU\nButton: .menu-button   ·   Menu: nav\nWhen the button is pressed: the nav toggles the “open” class\n  menu open   → the button with aria-expanded=\"true\"\n  menu closed → the button with aria-expanded=\"false\"",
        glosario: ["document.querySelector()", "addEventListener", "classList.add / remove / toggle", "classList.contains()", "setAttribute()", "if / else"],
        inicial: { html: SIN_SCRIPT, css: CSS, js: "" },
        comprobaciones: [
          { texto: "`index.html` links `script.js` (and the script already has code)", repaso: "js-01",
            // El motor solo mete el script del alumno si el HTML lo enlaza y no está vacío
            prueba: doc => !!doc.querySelector("script[data-csshtml=alumno]") },
          { texto: "When you press “☰ Menu”, the `nav` gains the `open` class and the button, `aria-expanded=\"true\"`", repaso: "js-04",
            prueba: async doc => { const v = await nueva(doc); const b = v.doc.querySelector(".menu-button"); b.click();
              return v.doc.querySelector("nav").classList.contains("open") && b.getAttribute("aria-expanded") === "true"; } },
          { texto: "When you press it again, the menu closes and `aria-expanded` goes back to `\"false\"`", repaso: "js-07",
            prueba: async doc => { const v = await nueva(doc); const b = v.doc.querySelector(".menu-button"); b.click(); b.click();
              return !v.doc.querySelector("nav").classList.contains("open") && b.getAttribute("aria-expanded") === "false"; } },
          { texto: "The script works with no errors (look at the console)", repaso: "js-06",
            prueba: async doc => { const v = await nueva(doc); v.doc.querySelector(".menu-button").click(); return sinErrores(v); } }
        ],
        pistas: [pista, "const menuButton = document.querySelector(\".menu-button\"); and the same for the nav. Then: menuButton.addEventListener(\"click\", () => { … }). Inside: menu.classList.toggle(\"open\"); and an if with menu.classList.contains(\"open\") to set aria-expanded with setAttribute."],
        solucion: { html: HTML, css: CSS, js: PASOS[0] },
        alternativas: [{ html: HTML, css: CSS, js: otraForma(PASOS[0]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "js",
        enunciado: "**The active link and the year.** Two details that make the website feel alive:\n\n1. When a menu link is pressed, **that one** gets the `active` class and no other (in World 3 it stayed fixed on “Home”). And on phones, when you choose a section, the menu closes (with its `aria-expanded`).\n2. The footer year (`#year`) writes itself, with this year: that way you don't have to change it every January.",
        textos: "ACTIVE LINK\nLinks: nav a\nWhen one is pressed: they all lose the “active” class and the pressed one gains it\nAlso, the menu closes: the nav loses “open” and the button, aria-expanded=\"false\"\n\nFOOTER YEAR\nElement: #year   →   the current year (new Date().getFullYear())",
        glosario: ["document.querySelectorAll()", "forEach()", "classList.add / remove / toggle", "addEventListener", "new Date()", "getFullYear()", "textContent"],
        inicial: { html: HTML, css: CSS, js: PASOS[0] },
        comprobaciones: [
          { texto: "When you press “Services”, that link ends up with the `active` class and no other", repaso: "js-08",
            prueba: async doc => { const v = await nueva(doc); v.doc.querySelector('nav a[href="#services"]').click();
              const activos = [...v.doc.querySelectorAll("nav a.active")]; return activos.length === 1 && activos[0].getAttribute("href") === "#services"; } },
          { texto: "And when you then press “Contact”, the active one moves to “Contact”", repaso: "js-08",
            prueba: async doc => { const v = await nueva(doc); v.doc.querySelector('nav a[href="#services"]').click(); v.doc.querySelector('nav a[href="#contact"]').click();
              const activos = [...v.doc.querySelectorAll("nav a.active")]; return activos.length === 1 && activos[0].getAttribute("href") === "#contact"; } },
          { texto: "With the menu open, choosing a section closes it and `aria-expanded` goes back to `\"false\"`", repaso: "js-04",
            prueba: async doc => { const v = await nueva(doc); const b = v.doc.querySelector(".menu-button"); b.click(); v.doc.querySelector('nav a[href="#team"]').click();
              return !v.doc.querySelector("nav").classList.contains("open") && b.getAttribute("aria-expanded") === "false"; } },
          { texto: "The footer year writes itself: with the clock in 2027, it says “2027”", repaso: "js-16",
            prueba: async doc => { const v = await nueva(doc, { hoy: "2027-03-01T10:00" }); return v.doc.querySelector("#year").textContent.trim() === "2027"; } }
        ],
        pistas: [pista, "const links = document.querySelectorAll(\"nav a\"); and links.forEach((link) => { link.addEventListener(\"click\", () => { … }); }). Inside, another forEach that removes “active” from all of them and then link.classList.add(\"active\"). The year: document.querySelector(\"#year\").textContent = new Date().getFullYear();"],
        solucion: { html: HTML, css: CSS, js: PASOS[1] },
        alternativas: [{ html: HTML, css: CSS, js: otraForma(PASOS[1]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "js",
        enunciado: "**The services, from data.** The `#service-list` grid is empty: the 6 services now come from a list of data, so the clinic can add one without touching the HTML.\n\n1. An **array of objects** `services`, one per service, with `name`, `description`, `icon`, `photo` and `pets` (the list of pets it treats: you'll use it in the next task).\n2. A function that **renders** a list of services inside `#service-list`: first it empties it and then it creates an `article` with the `service` class for each one, with the same content you had in the HTML.\n3. Call it when the page loads, with all the services.",
        textos: "DATA (name · description · icon · photo · pets)\nGeneral medicine · Checkups, diagnostics, and advice to prevent before having to treat. · fonendo · servicio-medicina.jpg · dog, cat, exotic\nVaccination · The vaccine and deworming schedule adapted to their age. · jeringa · servicio-vacunacion.jpg · dog, cat, exotic\nSurgery · Our own operating room and anesthesia monitored at all times. · bisturi · servicio-cirugia.jpg · dog, cat\nDental health · Cleanings and checkups for a healthy, pain-free mouth. · diente · servicio-dental.jpg · dog, cat\nDermatology · Allergies, itching, and skin and coat care. · huella · servicio-dermatologia.jpg · dog, cat, exotic\nDiagnostics · Lab tests, ultrasounds, and X-rays right at the clinic. · corazon · servicio-diagnostico.jpg · dog, cat, exotic\n\nEACH CARD, inside #service-list\n<article class=\"service\">\n  <img src=\"img/PHOTO\" alt=\"\" width=\"320\" height=\"213\" loading=\"lazy\">\n  <img src=\"img/iconos/ICON.svg\" class=\"icon\" alt=\"\" width=\"52\" height=\"52\">\n  <h3>NAME</h3>\n  <p>DESCRIPTION</p>\n  <a href=\"#appointment\">Book now</a>\n</article>",
        glosario: ["array of objects", "object { key: value }", "function", "for…of", "document.createElement()", "append()", "rendering a list", "text templates", "classList.add / remove / toggle"],
        inicial: { html: HTML, css: CSS, js: PASOS[1] },
        comprobaciones: [
          { texto: "When the page loads, `#service-list` has the 6 services, in the task's order", repaso: "js-10",
            prueba: async doc => igualQue(nombresServicios((await nueva(doc)).doc), SERVICIOS) },
          { texto: "Each one is an `article` with the `service` class, its description and the “Book now” link to `#appointment`", repaso: "js-10",
            prueba: async doc => { const t = [...(await nueva(doc)).doc.querySelectorAll("#service-list .service")];
              return t.length === 6 && t.every(a => a.tagName === "ARTICLE" && a.querySelector("p")?.textContent.trim().length > 20
                && [...a.querySelectorAll('a[href="#appointment"]')].some(x => simple(x.textContent) === "book now")); } },
          { texto: "Each service with its photo (`img/servicio-….jpg`) and its icon (`img/iconos/….svg`), decorative and with `width` and `height`", repaso: "js-10",
            prueba: async doc => { const t = [...(await nueva(doc)).doc.querySelectorAll("#service-list .service")];
              return t.length === 6 && t.every(a => { const i = [...a.querySelectorAll("img")];
                return i.some(x => /^img\/servicio-[a-z]+\.jpg$/.test(x.getAttribute("src"))) && i.some(x => /^img\/iconos\/[a-z]+\.svg$/.test(x.getAttribute("src")))
                  && i.every(x => x.getAttribute("alt") === "" && x.hasAttribute("width") && x.hasAttribute("height")); }); } },
          { texto: "The services come from an array of objects with `name`, `description`, `icon`, `photo` and `pets`", repaso: "js-09",
            prueba: doc => { const c = PRUEBA.codigo(doc); return ["name", "description", "icon", "photo", "pets"].every(k => new RegExp("\\b" + k + "\\s*:").test(c)) && /\[\s*\{/.test(c); } },
          { texto: "The script works with no errors (look at the console)", repaso: "js-10",
            prueba: async doc => sinErrores(await nueva(doc)) }
        ],
        pistas: [pista, "function renderServices(list) { serviceList.textContent = \"\"; for (const service of list) { const card = document.createElement(\"article\"); card.classList.add(\"service\"); card.innerHTML = `<img src=\"img/${service.photo}\" …> …`; serviceList.append(card); } } and, below it, renderServices(services);"],
        solucion: { html: HTML, css: CSS, js: PASOS[2] },
        alternativas: [{ html: HTML, css: CSS, js: otraForma(PASOS[2]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "js",
        enunciado: "**The filters.** Above the services are the **All**, **Dogs**, **Cats** and **Exotics** buttons:\n\n1. When Dogs, Cats or Exotics is pressed, **only** the services that treat that pet are rendered again (the ones that have it in their `pets` list).\n2. When All is pressed, the 6 come back.\n3. The pressed button has the `active` class, and only that one.\n4. And, like the menu with its `aria-expanded`, each button tells the screen reader whether it's pressed: `aria-pressed` is `\"true\"` on the pressed one and `\"false\"` on the others (the color is only visual).\n\nCareful: if you don't empty the grid before rendering, the services pile up.",
        textos: "FILTERS\nButtons: #filter-all · #filter-dogs · #filter-cats · #filter-exotics   (all inside .filters)\nDogs → the services with “dog” in pets · Cats → “cat” · Exotics → “exotic” · All → the 6\nThe pressed button: “active” class and aria-pressed=\"true\"\nThe others: without the class and with aria-pressed=\"false\"",
        glosario: ["filter()", ".includes() (array)", "arrow function", "addEventListener", "forEach()", "classList.add / remove / toggle", "setAttribute()", "rendering a list"],
        inicial: { html: HTML, css: CSS, js: PASOS[2] },
        comprobaciones: [
          { texto: "When you press “Exotics”, only its 4 services are left", repaso: "js-15",
            prueba: async doc => { const v = await nueva(doc); v.doc.querySelector("#filter-exotics").click(); return igualQue(nombresServicios(v.doc), EXOTICOS); } },
          { texto: "When you press “Dogs” or “Cats”, the 6 show up (they all treat dogs and cats)", repaso: "js-15",
            prueba: async doc => { const v = await nueva(doc); v.doc.querySelector("#filter-exotics").click(); v.doc.querySelector("#filter-dogs").click();
              const perros = nombresServicios(v.doc); v.doc.querySelector("#filter-exotics").click(); v.doc.querySelector("#filter-cats").click();
              return igualQue(perros, SERVICIOS) && igualQue(nombresServicios(v.doc), SERVICIOS); } },
          { texto: "When you press “All” after filtering, the 6 come back only once (they don't pile up)", repaso: "js-15",
            prueba: async doc => { const v = await nueva(doc); v.doc.querySelector("#filter-exotics").click(); v.doc.querySelector("#filter-all").click(); v.doc.querySelector("#filter-all").click();
              return igualQue(nombresServicios(v.doc), SERVICIOS); } },
          { texto: "The pressed button has the `active` class, and only that one", repaso: "js-04",
            prueba: async doc => { const v = await nueva(doc); v.doc.querySelector("#filter-cats").click();
              const a = [...v.doc.querySelectorAll(".filters button.active")]; return a.length === 1 && a[0].id === "filter-cats"; } },
          { texto: "The pressed button has `aria-pressed=\"true\"` and the others, `\"false\"`", repaso: "js-04",
            prueba: async doc => { const v = await nueva(doc); v.doc.querySelector("#filter-exotics").click(); v.doc.querySelector("#filter-cats").click();
              return [...v.doc.querySelectorAll(".filters button")].every(b => b.getAttribute("aria-pressed") === String(b.id === "filter-cats")); } },
          { texto: "The script works with no errors (look at the console)", repaso: "js-15",
            prueba: async doc => { const v = await nueva(doc); ["#filter-dogs", "#filter-cats", "#filter-exotics", "#filter-all"].forEach(s => v.doc.querySelector(s).click()); return sinErrores(v); } }
        ],
        pistas: [pista, "function filter(pet) { const matches = services.filter((service) => service.pets.includes(pet)); renderServices(matches); } And on each button: catsButton.addEventListener(\"click\", () => { mark the button; filter(\"cat\"); });"],
        solucion: { html: HTML, css: CSS, js: PASOS[3] },
        alternativas: [{ html: HTML, css: CSS, js: otraForma(PASOS[3]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "js",
        enunciado: "**The appointment, checked.** The form has `novalidate`: the browser doesn't check it, your script does. When it's submitted:\n\n1. The page does **not** reload.\n2. Each field is checked with its rule. If it's wrong, its message shows up in its `#error-…` paragraph and the field gets the `with-error` class; if it's right, the message is cleared and the class is removed.\n3. If **everything** is right, `#confirmation` says “Appointment booked!” and the appointment's summary. If something fails, `#confirmation` stays empty.\n\nNothing is saved yet: that comes in the last task.",
        textos: "FORM: #appointment-form (submit event)   ·   each message in #error-NAME   ·   wrong field → “with-error” class\n\nRULES AND MESSAGES\npet → chosen (not empty) · “Choose which pet is coming in for their visit.”\ndate → not empty and not in the past: today or later · “Choose a day from today onward.”\ntime → between 09:00 and 20:30 · “Choose a time within clinic hours.”\nname → not empty (not counting spaces) · “Write your name.”\nphone → 9 digits, with no spaces · “The phone number must have 9 digits, with no spaces.”\nemail → with “@” and with “.” · “Write a valid email, for example name@example.com.”\nprivacy → checked · “We need you to accept the privacy policy.”\n\nIF EVERYTHING IS RIGHT, in #confirmation:\nAppointment booked! PET · DATE at TIME · for NAME\n  PET with its name from the list: dog → Dog · cat → Cat · rabbit → Rabbit · exotic → Other exotic\n  example: Appointment booked! Dog · 2026-10-21 at 10:00 · for Ana",
        glosario: ["\"submit\" and preventDefault()", "field.value", ".trim()", ".includes() (text)", ".checked", "Number.isNaN()", "allGood flag", "toLocaleDateString(\"sv-SE\")", "comparing dates and times", "if / else"],
        inicial: { html: HTML, css: CSS, js: PASOS[3] },
        comprobaciones: [
          { texto: "Submitting the empty form books nothing and shows the task's 7 messages", repaso: "js-11",
            prueba: async doc => { const d = (await nueva(doc)).doc; d.querySelector("#appointment-form").requestSubmit();
              return Object.keys(MENSAJES).every(n => simple(error(d, n)) === simple(MENSAJES[n])) && !d.querySelector("#confirmation").textContent.trim(); } },
          { texto: "The wrong fields have the `with-error` class", repaso: "js-04",
            prueba: async doc => { const d = (await nueva(doc)).doc; d.querySelector("#appointment-form").requestSubmit();
              return ["pet", "date", "time", "name", "phone", "email"].every(n => d.querySelector('#appointment-form [name="' + n + '"]').classList.contains("with-error")); } },
          { texto: "With the clock on 10/20/2026, an appointment for the 19th fails only because of the date", repaso: "js-16",
            prueba: async doc => { const d = (await nueva(doc)).doc; pedir(d, { date: "2026-10-19" }); return soloFalla(d, "date"); } },
          { texto: "At 21:00 the time fails, and a phone number with 8 digits or with spaces fails the phone", repaso: "js-11",
            // Una sola página (cada comprobación tiene un tiempo máximo): pedir() vuelve a rellenar todos los campos en cada envío
            prueba: async doc => { const d = (await nueva(doc)).doc;
              pedir(d, { time: "21:00" }); const hora = soloFalla(d, "time");
              pedir(d, { phone: "60011122" }); const corto = soloFalla(d, "phone");
              pedir(d, { phone: "600 111 22" }); return hora && corto && soloFalla(d, "phone"); } },
          { texto: "An email without “@” fails the email, and not checking privacy fails the privacy", repaso: "js-11",
            prueba: async doc => { const d = (await nueva(doc)).doc;
              pedir(d, { email: "ana.example.com" }); const email = soloFalla(d, "email");
              pedir(d, { privacy: false }); return email && soloFalla(d, "privacy"); } },
          { texto: "With everything right, `#confirmation` says “Appointment booked! Dog · 2026-10-21 at 10:00 · for Ana”", repaso: "js-11",
            prueba: async doc => { const d = (await nueva(doc)).doc; pedir(d);
              return simple(d.querySelector("#confirmation").textContent) === simple("Appointment booked! " + RESUMEN) && Object.keys(MENSAJES).every(n => !error(d, n).trim()); } },
          { texto: "Today also works, and when you fix an error its message and its `with-error` disappear", repaso: "js-11",
            prueba: async doc => { const d = (await nueva(doc)).doc; pedir(d, { name: "" }); const antes = soloFalla(d, "name"); pedir(d, { date: "2026-10-20" });
              return antes && !error(d, "name").trim() && !d.querySelector('#appointment-form [name="name"]').classList.contains("with-error") && simple(d.querySelector("#confirmation").textContent).includes("booked"); } },
          { texto: "The script works with no errors (look at the console)", repaso: "js-11",
            prueba: async doc => { const v = await nueva(doc); v.doc.querySelector("#appointment-form").requestSubmit(); pedir(v.doc); return sinErrores(v); } }
        ],
        pistas: [pista, "form.addEventListener(\"submit\", (event) => { event.preventDefault(); let allGood = true; … }). A function helps a lot: check(field, isValid, message) writes or clears the message in #error-+field.name, adds or removes “with-error” and returns isValid. Like this: allGood = check(nameField, nameField.value.trim() !== \"\", \"Write your name.\") && allGood;"],
        solucion: { html: HTML, css: CSS, js: PASOS[4] },
        alternativas: [{ html: HTML, css: CSS, js: otraForma(PASOS[4]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "js",
        enunciado: "**My appointments and the reviews.** The last task!\n\n1. Each booked appointment is added to a list of appointments, which is **saved in `localStorage`** and rendered in `#appointment-list`: an `li` with the summary and a **Cancel** button.\n2. When the page reloads, the appointments **are still there**.\n3. **Cancel** removes that appointment (from the list, from what's saved and from the page) and `#confirmation` says “Appointment canceled.”.\n4. If there are no appointments, `#no-appointments` says “You don't have any appointments yet. Book your first one!”; if there's any, it stays empty.\n5. The **reviews** are loaded with `fetch` from `datos/opiniones.json` and rendered in `#review-list`. If something fails, the ones in the HTML stay.",
        textos: "MY APPOINTMENTS\nList: #appointment-list   ·   notice: #no-appointments   ·   saved in localStorage (you choose the key's name)\nEach appointment: <li>SUMMARY <button type=\"button\">Cancel</button></li>\n  SUMMARY: Dog · 2026-10-21 at 10:00 · for Ana\nNo appointments → #no-appointments: You don't have any appointments yet. Book your first one!\nWhen canceling → #confirmation: Appointment canceled.\n\nREVIEWS\nfetch(\"datos/opiniones.json\") → an array of objects: photo · alt · text · author · pet · stars\nEach one, inside #review-list:\n<article class=\"review\">\n  <img src=\"img/PHOTO\" alt=\"ALT\" width=\"120\" height=\"120\" loading=\"lazy\">\n  <p>TEXT</p>\n  <p><strong>AUTHOR</strong> · PET · STARS</p>\n</article>\nIf it fails (try/catch): nothing is touched, the reviews in the HTML stay",
        glosario: ["localStorage.setItem / getItem", "JSON.stringify / JSON.parse", "push()", "removing with filter", "rendering a list", "fetch()", "async / await", ".json()", "try / catch"],
        inicial: { html: HTML, css: CSS, js: PASOS[4] },
        comprobaciones: [
          { texto: "With no appointments, `#no-appointments` says “You don't have any appointments yet. Book your first one!” and the list is empty", repaso: "js-07",
            prueba: async doc => { const d = (await nueva(doc)).doc; return simple(d.querySelector("#no-appointments").textContent) === simple("You don't have any appointments yet. Book your first one!") && citas(d).length === 0; } },
          { texto: "When you book, the appointment shows up in “My appointments” with its summary and its “Cancel” button, and the notice empties", repaso: "js-10",
            prueba: async doc => { const d = (await nueva(doc)).doc; pedir(d); const li = citas(d);
              return li.length === 1 && simple(li[0].textContent).includes(simple(RESUMEN)) && simple(li[0].querySelector("button")?.textContent) === "cancel" && !d.querySelector("#no-appointments").textContent.trim(); } },
          { texto: "A badly filled-in appointment isn't added", repaso: "js-11",
            prueba: async doc => { const d = (await nueva(doc)).doc; pedir(d, { date: "2026-10-19" }); d.querySelector("#appointment-form").requestSubmit(); return citas(d).length === 0; } },
          { texto: "After reloading the page, the appointments are still there", repaso: "js-12",
            prueba: async doc => { const v = await nueva(doc); pedir(v.doc); pedir(v.doc, { time: "11:30" });
              const r = await PRUEBA.recargar(v.doc, { hoy: HOY }); const li = citas(r.doc);
              return li.length === 2 && simple(li[1].textContent).includes(simple("11:30")); } },
          { texto: "“Cancel” removes the appointment, says “Appointment canceled.” and, after reloading, it's still removed", repaso: "js-15",
            prueba: async doc => { const v = await nueva(doc); pedir(v.doc); pedir(v.doc, { time: "11:30" });
              citas(v.doc)[0].querySelector("button").click();
              const ok = citas(v.doc).length === 1 && simple(v.doc.querySelector("#confirmation").textContent) === simple("Appointment canceled.");
              const r = await PRUEBA.recargar(v.doc, { hoy: HOY }); const li = citas(r.doc);
              return ok && li.length === 1 && simple(li[0].textContent).includes("11:30"); } },
          { texto: "When you cancel the last appointment, the “You don't have any appointments yet” notice comes back", repaso: "js-07",
            prueba: async doc => { const d = (await nueva(doc)).doc; pedir(d); citas(d)[0].querySelector("button").click();
              return citas(d).length === 0 && simple(d.querySelector("#no-appointments").textContent).includes("you don't have any appointments yet"); } },
          { texto: "The reviews arrive with `fetch` from `datos/opiniones.json`", repaso: "js-13",
            // El HTML trae las 3 opiniones de reserva: se cambia una en los datos para ver que llega del fetch
            prueba: async doc => { const datos = window.__csshtmlDatos;
              window.__csshtmlDatos = Object.assign({}, datos, { "opiniones.json": datos["opiniones.json"].map((o, i) => i ? o : Object.assign({}, o, { text: "Test review" })) });
              try { const v = await nueva(doc);
                return await PRUEBA.esperarA(() => v.doc.querySelector("#review-list").textContent.includes("Test review")
                  && v.doc.querySelectorAll("#review-list .review").length === 3, 1500); }
              finally { window.__csshtmlDatos = datos; } } },
          { texto: "If the reviews file doesn't arrive, the ones in the HTML stay and there are no errors", repaso: "js-13",
            prueba: async doc => { const v = await nueva(doc, { sinDatos: ["opiniones.json"] }); await PRUEBA.esperar(300);
              return v.doc.querySelectorAll("#review-list .review").length === 3 && sinErrores(v); } },
          { texto: "The script works with no errors (look at the console)", repaso: "js-12",
            prueba: async doc => { const v = await nueva(doc); pedir(v.doc); citas(v.doc)[0]?.querySelector("button").click(); return sinErrores(v); } }
        ],
        pistas: [pista, "let appointments = JSON.parse(localStorage.getItem(\"huellas-appointments\")) || []; When booking: appointments.push(appointment); localStorage.setItem(\"huellas-appointments\", JSON.stringify(appointments)); and render again. To cancel: appointments = appointments.filter((other) => other !== appointment); save and render again. The reviews: async function loadReviews() { try { const response = await fetch(\"datos/opiniones.json\"); const reviews = await response.json(); … } catch (error) { } }"],
        solucion: { html: HTML, css: CSS, js: PASOS[5] },
        alternativas: [{ html: HTML, css: CSS, js: otraForma(PASOS[5]) }]
      }
    ]
  });
})();
