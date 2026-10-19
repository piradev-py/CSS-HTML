/* ============================================================
   <CSS-HTML> · Mundo JavaScript · Lección js-17
   Proyecto web: la web de «Huellas» funciona (docs/PROYECTO_FINAL.md).
   Sustituye a js-14: la agenda de citas enseña lo mismo que la lista
   de tareas (añadir, mostrar, cancelar, recordar al recargar).
   6 encargos sobre el mismo script.js, que empieza vacío:
   menú del móvil · enlace activo y año · servicios desde datos ·
   filtros · cita validada · mis citas y opiniones.
   El HTML y el CSS son los oficiales del Mundo 4 (el equipo de
   diseño ya añadió los filtros, los huecos para los mensajes y
   «Mis citas»); el alumno solo enlaza el script.
   Las soluciones son HUELLAS["mundo-4"].pasos
   (herramientas/huellas-versiones.mjs).
   Notas:
   - Se comprueba el efecto, simulando clics y escritura en una copia
     recién cargada (PRUEBA.recargar), con el reloj parado en
     HOY: «la fecha no puede ser pasada» no depende del calendario.
   - Los nombres de variables y funciones los elige el alumno (ver
     `alternativas`: otros nombres y otra clave de localStorage).
   ============================================================ */
(function () {
  const PROYECTO = { raiz: "recursos/huellas/web/", html: "index.html", css: "estilos.css", js: "script.js" };
  const PASOS = HUELLAS["mundo-4"].pasos;
  const sinPreconnect = h => h.replace(/\n *<link rel="preconnect"[^>]*>/g, "");
  const HTML = sinPreconnect(HUELLAS["mundo-4"].html);
  const CSS = HUELLAS["mundo-4"].css;
  const SIN_SCRIPT = HTML.replace(/\n *<script src="script.js"><\/script>/, "");

  // El mismo script con otros nombres (y otra clave para guardar): los nombres los elige el alumno
  const otraForma = js => js.replace(/\bbotonMenu\b/g, "botonDelMenu").replace(/\bpintarServicios\b/g, "mostrarServicios")
    .replace(/\bcomprobar\b/g, "validarCampo").replace(/\bresumen\b/g, "textoDeCita").replace(/\bpintarCitas\b/g, "mostrarCitas")
    .replace(/"huellas-citas"/g, "\"mis-citas-huellas\"");

  // Texto comparable: sin tildes, mayúsculas ni espacios de más (como en los ejercicios)
  const simple = t => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();
  const HOY = "2026-10-20T10:00";
  // Una copia recién cargada (como pulsar F5), con el reloj parado en HOY y sin citas guardadas
  const nueva = (doc, opciones = {}) => PRUEBA.recargar(doc, Object.assign({ hoy: HOY, borrarDatos: true }, opciones));
  const sinErrores = v => !(v.win.__errores || []).length;
  const SERVICIOS = ["Medicina general", "Vacunación", "Cirugía", "Salud dental", "Dermatología", "Diagnóstico"];
  const EXOTICOS = ["Medicina general", "Vacunación", "Dermatología", "Diagnóstico"];
  const nombresServicios = d => [...d.querySelectorAll("#lista-servicios .servicio h3")].map(h => h.textContent.trim());
  const igualQue = (a, b) => a.length === b.length && a.every((x, i) => simple(x) === simple(b[i]));
  const MENSAJES = {
    mascota: "Elige qué mascota viene a la consulta.",
    fecha: "Elige un día a partir de hoy.",
    hora: "Elige una hora dentro del horario de consulta.",
    nombre: "Escribe tu nombre.",
    telefono: "El teléfono debe tener 9 cifras, sin espacios.",
    email: "Escribe un email válido, por ejemplo nombre@correo.es.",
    privacidad: "Necesitamos que aceptes la política de privacidad."
  };
  const BUENA = { mascota: "perro", fecha: "2026-10-21", hora: "10:00", nombre: "Ana", telefono: "600111222", email: "ana@correo.es", privacidad: true };
  const RESUMEN = "Perro · 2026-10-21 a las 10:00 · a nombre de Ana";
  const error = (d, n) => (d.querySelector("#error-" + n) || {}).textContent || "";
  // Rellena el formulario (lo que no se diga, con los datos de BUENA) y lo envía
  function pedir(d, cambios = {}) {
    const datos = Object.assign({}, BUENA, cambios);
    for (const [n, valor] of Object.entries(datos)) {
      const campo = d.querySelector('#form-cita [name="' + n + '"]');
      if (n === "privacidad") campo.checked = valor;
      else PRUEBA.escribir(campo, valor);
    }
    d.querySelector("#form-cita").requestSubmit();
  }
  const citas = d => [...d.querySelectorAll("#lista-citas li")];
  // Solo falla el campo n: su mensaje es el del encargo, los demás están vacíos y no hay confirmación
  const soloFalla = (d, n) => simple(error(d, n)) === simple(MENSAJES[n]) && Object.keys(MENSAJES).every(m => m === n || !error(d, m).trim())
    && !simple(d.querySelector("#confirmacion").textContent).includes("reservada");

  const pista = "Mira los textos del encargo y abre el 📚 Glosario si no recuerdas cómo se escribía algo. Cada comprobación en rojo tiene un enlace para repasar su lección; y si algo no va, mira la consola: ahí salen los errores.";

  CURSO.registrar({
    id: "js-17",
    titulo: "Proyecto web: la agenda de Huellas",
    xp: 150,
    objetivo: "Darás vida a la web de la clínica «Huellas»: el menú del móvil, los servicios que se filtran y una agenda de citas que valida, guarda y recuerda.",
    datos: HUELLAS["mundo-4"].datos,
    pasos: [
      {
        tipo: "explicacion",
        titulo: "La web, por fin, funciona",
        texto: "¡La maqueta ha gustado muchísimo! 🐾 La hemos integrado en la **versión oficial** y la clínica ya tiene su último encargo: que la web **haga cosas**. Quieren que sus clientes puedan pedir cita desde casa, a cualquier hora.\n\nEl equipo de diseño ya ha preparado el HTML y el CSS de lo nuevo: los **botones para filtrar** los servicios, el hueco para el **mensaje de cada campo** y la lista **«Mis citas»**. Ojo: la rejilla de servicios ahora está **vacía**, porque los servicios saldrán de una lista de datos. Tú escribes `script.js`, en 6 encargos:\n\n• **El menú del móvil**, que se abre y se cierra.\n• **El enlace activo** y el **año del pie**.\n• **Los servicios**, pintados desde un array de objetos.\n• **Los filtros** por mascota.\n• **La cita**, comprobada campo a campo.\n• **Mis citas**, que se guardan y se pueden cancelar, y **las opiniones**, que llegan de un archivo de datos.\n\nLas comprobaciones hacen lo que haría una persona: pulsan, escriben, envían y recargan la página.",
        consejo: "Los nombres de tus variables y funciones los eliges tú. Lo que fija el encargo son los `id` y las clases del HTML (ya están puestos) y los textos que ve el cliente."
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "js",
        enunciado: "**El menú del móvil.** En el Mundo 3 dejamos el menú plegado tras el botón «☰ Menú». Ahora, que funcione:\n\n1. En `index.html`, justo antes de `</body>`, enlaza el script: `<script src=\"script.js\"></script>`.\n2. En `script.js`: al pulsar el botón `.boton-menu`, el `nav` gana o pierde la clase `abierto`.\n3. Y el botón avisa al lector de pantalla: `aria-expanded` vale `\"true\"` con el menú abierto y `\"false\"` con el menú cerrado.\n\nPara verlo, haz estrecha la ventana del navegador: el botón solo se ve en el móvil.",
        textos: "ENLACE: <script src=\"script.js\"></script>   → justo antes de </body>\n\nMENÚ DEL MÓVIL\nBotón: .boton-menu   ·   Menú: nav\nAl pulsar el botón: el nav alterna la clase «abierto»\n  menú abierto  → el botón con aria-expanded=\"true\"\n  menú cerrado → el botón con aria-expanded=\"false\"",
        glosario: ["document.querySelector()", "addEventListener", "classList.add / remove / toggle", "classList.contains()", "setAttribute()", "if / else"],
        inicial: { html: SIN_SCRIPT, css: CSS, js: "" },
        comprobaciones: [
          { texto: "`index.html` enlaza `script.js` (y el script ya tiene código)", repaso: "js-01",
            // El motor solo mete el script del alumno si el HTML lo enlaza y no está vacío
            prueba: doc => !!doc.querySelector("script[data-csshtml=alumno]") },
          { texto: "Al pulsar «☰ Menú», el `nav` gana la clase `abierto` y el botón, `aria-expanded=\"true\"`", repaso: "js-04",
            prueba: async doc => { const v = await nueva(doc); const b = v.doc.querySelector(".boton-menu"); b.click();
              return v.doc.querySelector("nav").classList.contains("abierto") && b.getAttribute("aria-expanded") === "true"; } },
          { texto: "Al pulsarlo otra vez, el menú se cierra y `aria-expanded` vuelve a `\"false\"`", repaso: "js-07",
            prueba: async doc => { const v = await nueva(doc); const b = v.doc.querySelector(".boton-menu"); b.click(); b.click();
              return !v.doc.querySelector("nav").classList.contains("abierto") && b.getAttribute("aria-expanded") === "false"; } },
          { texto: "El script funciona sin errores (mira la consola)", repaso: "js-06",
            prueba: async doc => { const v = await nueva(doc); v.doc.querySelector(".boton-menu").click(); return sinErrores(v); } }
        ],
        pistas: [pista, "const botonMenu = document.querySelector(\".boton-menu\"); y lo mismo para el nav. Después: botonMenu.addEventListener(\"click\", () => { … }). Dentro: menu.classList.toggle(\"abierto\"); y un if con menu.classList.contains(\"abierto\") para poner aria-expanded con setAttribute."],
        solucion: { html: HTML, css: CSS, js: PASOS[0] },
        alternativas: [{ html: HTML, css: CSS, js: otraForma(PASOS[0]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "js",
        enunciado: "**El enlace activo y el año.** Dos detalles que hacen que la web parezca viva:\n\n1. Al pulsar un enlace del menú, **ese** lleva la clase `activo` y ningún otro (en el Mundo 3 se quedaba fija en «Inicio»). Y en el móvil, al elegir una sección, el menú se cierra (con su `aria-expanded`).\n2. El año del pie (`#anio`) se escribe solo, con el año de hoy: así no hay que cambiarlo cada enero.",
        textos: "ENLACE ACTIVO\nEnlaces: nav a\nAl pulsar uno: todos pierden la clase «activo» y el pulsado la gana\nAdemás, el menú se cierra: el nav pierde «abierto» y el botón, aria-expanded=\"false\"\n\nAÑO DEL PIE\nElemento: #anio   →   el año actual (new Date().getFullYear())",
        glosario: ["document.querySelectorAll()", "forEach()", "classList.add / remove / toggle", "addEventListener", "new Date()", "getFullYear()", "textContent"],
        inicial: { html: HTML, css: CSS, js: PASOS[0] },
        comprobaciones: [
          { texto: "Al pulsar «Servicios», ese enlace queda con la clase `activo` y ningún otro", repaso: "js-08",
            prueba: async doc => { const v = await nueva(doc); v.doc.querySelector('nav a[href="#servicios"]').click();
              const activos = [...v.doc.querySelectorAll("nav a.activo")]; return activos.length === 1 && activos[0].getAttribute("href") === "#servicios"; } },
          { texto: "Y al pulsar después «Contacto», el activo pasa a «Contacto»", repaso: "js-08",
            prueba: async doc => { const v = await nueva(doc); v.doc.querySelector('nav a[href="#servicios"]').click(); v.doc.querySelector('nav a[href="#contacto"]').click();
              const activos = [...v.doc.querySelectorAll("nav a.activo")]; return activos.length === 1 && activos[0].getAttribute("href") === "#contacto"; } },
          { texto: "Con el menú abierto, al elegir una sección se cierra y `aria-expanded` vuelve a `\"false\"`", repaso: "js-04",
            prueba: async doc => { const v = await nueva(doc); const b = v.doc.querySelector(".boton-menu"); b.click(); v.doc.querySelector('nav a[href="#equipo"]').click();
              return !v.doc.querySelector("nav").classList.contains("abierto") && b.getAttribute("aria-expanded") === "false"; } },
          { texto: "El año del pie se escribe solo: con el reloj en 2027, pone «2027»", repaso: "js-16",
            prueba: async doc => { const v = await nueva(doc, { hoy: "2027-03-01T10:00" }); return v.doc.querySelector("#anio").textContent.trim() === "2027"; } }
        ],
        pistas: [pista, "const enlaces = document.querySelectorAll(\"nav a\"); y enlaces.forEach((enlace) => { enlace.addEventListener(\"click\", () => { … }); }). Dentro, otro forEach que quita «activo» a todos y luego enlace.classList.add(\"activo\"). El año: document.querySelector(\"#anio\").textContent = new Date().getFullYear();"],
        solucion: { html: HTML, css: CSS, js: PASOS[1] },
        alternativas: [{ html: HTML, css: CSS, js: otraForma(PASOS[1]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "js",
        enunciado: "**Los servicios, desde datos.** La rejilla `#lista-servicios` está vacía: los 6 servicios salen ahora de una lista de datos, así la clínica puede añadir uno sin tocar el HTML.\n\n1. Un **array de objetos** `servicios`, uno por servicio, con `nombre`, `descripcion`, `icono`, `foto` y `mascotas` (la lista de mascotas que atiende: la usarás en el próximo encargo).\n2. Una función que **pinta** una lista de servicios dentro de `#lista-servicios`: primero la vacía y después crea un `article` con la clase `servicio` por cada uno, con el mismo contenido que tenías en el HTML.\n3. Llámala al cargar la página con todos los servicios.",
        textos: "DATOS (nombre · descripcion · icono · foto · mascotas)\nMedicina general · Revisiones, diagnóstico y consejos para prevenir antes que curar. · fonendo · servicio-medicina.jpg · perro, gato, exotico\nVacunación · El calendario de vacunas y desparasitación adaptado a su edad. · jeringa · servicio-vacunacion.jpg · perro, gato, exotico\nCirugía · Quirófano propio y anestesia vigilada en todo momento. · bisturi · servicio-cirugia.jpg · perro, gato\nSalud dental · Limpiezas y revisiones para una boca sana y sin dolor. · diente · servicio-dental.jpg · perro, gato\nDermatología · Alergias, picores y cuidado de la piel y el pelo. · huella · servicio-dermatologia.jpg · perro, gato, exotico\nDiagnóstico · Análisis, ecografía y rayos X en la propia clínica. · corazon · servicio-diagnostico.jpg · perro, gato, exotico\n\nCADA TARJETA, dentro de #lista-servicios\n<article class=\"servicio\">\n  <img src=\"img/FOTO\" alt=\"\" width=\"320\" height=\"213\" loading=\"lazy\">\n  <img src=\"img/iconos/ICONO.svg\" class=\"icono\" alt=\"\" width=\"52\" height=\"52\">\n  <h3>NOMBRE</h3>\n  <p>DESCRIPCION</p>\n  <a href=\"#cita\">Pide cita</a>\n</article>",
        glosario: ["array de objetos", "objeto { clave: valor }", "function", "for…of", "document.createElement()", "append()", "pintar una lista", "plantillas de texto", "classList.add / remove / toggle"],
        inicial: { html: HTML, css: CSS, js: PASOS[1] },
        comprobaciones: [
          { texto: "Al cargar la página, `#lista-servicios` tiene los 6 servicios, en el orden del encargo", repaso: "js-10",
            prueba: async doc => igualQue(nombresServicios((await nueva(doc)).doc), SERVICIOS) },
          { texto: "Cada uno es un `article` con la clase `servicio`, su descripción y el enlace «Pide cita» a `#cita`", repaso: "js-10",
            prueba: async doc => { const t = [...(await nueva(doc)).doc.querySelectorAll("#lista-servicios .servicio")];
              return t.length === 6 && t.every(a => a.tagName === "ARTICLE" && a.querySelector("p")?.textContent.trim().length > 20
                && [...a.querySelectorAll('a[href="#cita"]')].some(x => simple(x.textContent) === "pide cita")); } },
          { texto: "Cada servicio con su foto (`img/servicio-….jpg`) y su icono (`img/iconos/….svg`), decorativos y con `width` y `height`", repaso: "js-10",
            prueba: async doc => { const t = [...(await nueva(doc)).doc.querySelectorAll("#lista-servicios .servicio")];
              return t.length === 6 && t.every(a => { const i = [...a.querySelectorAll("img")];
                return i.some(x => /^img\/servicio-[a-z]+\.jpg$/.test(x.getAttribute("src"))) && i.some(x => /^img\/iconos\/[a-z]+\.svg$/.test(x.getAttribute("src")))
                  && i.every(x => x.getAttribute("alt") === "" && x.hasAttribute("width") && x.hasAttribute("height")); }); } },
          { texto: "Los servicios salen de un array de objetos con `nombre`, `descripcion`, `icono`, `foto` y `mascotas`", repaso: "js-09",
            prueba: doc => { const c = PRUEBA.codigo(doc); return ["nombre", "descripcion", "icono", "foto", "mascotas"].every(k => new RegExp("\\b" + k + "\\s*:").test(c)) && /\[\s*\{/.test(c); } },
          { texto: "El script funciona sin errores (mira la consola)", repaso: "js-10",
            prueba: async doc => sinErrores(await nueva(doc)) }
        ],
        pistas: [pista, "function pintarServicios(lista) { listaServicios.textContent = \"\"; for (const servicio of lista) { const tarjeta = document.createElement(\"article\"); tarjeta.classList.add(\"servicio\"); tarjeta.innerHTML = `<img src=\"img/${servicio.foto}\" …> …`; listaServicios.append(tarjeta); } } y, debajo, pintarServicios(servicios);"],
        solucion: { html: HTML, css: CSS, js: PASOS[2] },
        alternativas: [{ html: HTML, css: CSS, js: otraForma(PASOS[2]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "js",
        enunciado: "**Los filtros.** Encima de los servicios están los botones **Todos**, **Perros**, **Gatos** y **Exóticos**:\n\n1. Al pulsar Perros, Gatos o Exóticos, se repintan **solo** los servicios que atienden a esa mascota (los que la tienen en su lista `mascotas`).\n2. Al pulsar Todos, vuelven los 6.\n3. El botón pulsado lleva la clase `activo`, y solo él.\n4. Y, como el menú con su `aria-expanded`, cada botón avisa al lector de pantalla de si está pulsado: `aria-pressed` vale `\"true\"` en el pulsado y `\"false\"` en los demás (el color solo se ve).\n\nOjo: si no vacías la rejilla antes de pintar, los servicios se acumulan.",
        textos: "FILTROS\nBotones: #filtro-todos · #filtro-perros · #filtro-gatos · #filtro-exoticos   (todos dentro de .filtros)\nPerros → los servicios con «perro» en mascotas · Gatos → «gato» · Exóticos → «exotico» · Todos → los 6\nEl botón pulsado: clase «activo» y aria-pressed=\"true\"\nLos demás: sin la clase y con aria-pressed=\"false\"",
        glosario: ["filter()", ".includes() (array)", "función flecha", "addEventListener", "forEach()", "classList.add / remove / toggle", "setAttribute()", "pintar una lista"],
        inicial: { html: HTML, css: CSS, js: PASOS[2] },
        comprobaciones: [
          { texto: "Al pulsar «Exóticos», quedan solo sus 4 servicios", repaso: "js-15",
            prueba: async doc => { const v = await nueva(doc); v.doc.querySelector("#filtro-exoticos").click(); return igualQue(nombresServicios(v.doc), EXOTICOS); } },
          { texto: "Al pulsar «Perros» o «Gatos», salen los 6 (todos atienden a perros y gatos)", repaso: "js-15",
            prueba: async doc => { const v = await nueva(doc); v.doc.querySelector("#filtro-exoticos").click(); v.doc.querySelector("#filtro-perros").click();
              const perros = nombresServicios(v.doc); v.doc.querySelector("#filtro-exoticos").click(); v.doc.querySelector("#filtro-gatos").click();
              return igualQue(perros, SERVICIOS) && igualQue(nombresServicios(v.doc), SERVICIOS); } },
          { texto: "Al pulsar «Todos» después de filtrar, vuelven los 6 una sola vez (no se acumulan)", repaso: "js-15",
            prueba: async doc => { const v = await nueva(doc); v.doc.querySelector("#filtro-exoticos").click(); v.doc.querySelector("#filtro-todos").click(); v.doc.querySelector("#filtro-todos").click();
              return igualQue(nombresServicios(v.doc), SERVICIOS); } },
          { texto: "El botón pulsado lleva la clase `activo`, y solo él", repaso: "js-04",
            prueba: async doc => { const v = await nueva(doc); v.doc.querySelector("#filtro-gatos").click();
              const a = [...v.doc.querySelectorAll(".filtros button.activo")]; return a.length === 1 && a[0].id === "filtro-gatos"; } },
          { texto: "El botón pulsado tiene `aria-pressed=\"true\"` y los demás, `\"false\"`", repaso: "js-04",
            prueba: async doc => { const v = await nueva(doc); v.doc.querySelector("#filtro-exoticos").click(); v.doc.querySelector("#filtro-gatos").click();
              return [...v.doc.querySelectorAll(".filtros button")].every(b => b.getAttribute("aria-pressed") === String(b.id === "filtro-gatos")); } },
          { texto: "El script funciona sin errores (mira la consola)", repaso: "js-15",
            prueba: async doc => { const v = await nueva(doc); ["#filtro-perros", "#filtro-gatos", "#filtro-exoticos", "#filtro-todos"].forEach(s => v.doc.querySelector(s).click()); return sinErrores(v); } }
        ],
        pistas: [pista, "function filtrar(mascota) { const elegidos = servicios.filter((servicio) => servicio.mascotas.includes(mascota)); pintarServicios(elegidos); } Y en cada botón: botonGatos.addEventListener(\"click\", () => { marcar el botón; filtrar(\"gato\"); });"],
        solucion: { html: HTML, css: CSS, js: PASOS[3] },
        alternativas: [{ html: HTML, css: CSS, js: otraForma(PASOS[3]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "js",
        enunciado: "**La cita, comprobada.** El formulario lleva `novalidate`: el navegador no lo comprueba, lo comprueba tu script. Al enviarlo:\n\n1. **No** se recarga la página.\n2. Cada campo se comprueba con su regla. Si está mal, su mensaje sale en su párrafo `#error-…` y el campo lleva la clase `con-error`; si está bien, el mensaje se borra y la clase se quita.\n3. Si **todo** está bien, `#confirmacion` dice «¡Cita reservada!» y el resumen de la cita. Si algo falla, `#confirmacion` se queda vacío.\n\nTodavía no se guarda nada: eso llega en el último encargo.",
        textos: "FORMULARIO: #form-cita (evento submit)   ·   cada mensaje en #error-NAME   ·   campo mal → clase «con-error»\n\nREGLAS Y MENSAJES\nmascota → elegida (no vacía) · «Elige qué mascota viene a la consulta.»\nfecha → no vacía y no pasada: hoy o después · «Elige un día a partir de hoy.»\nhora → entre 09:00 y 20:30 · «Elige una hora dentro del horario de consulta.»\nnombre → no vacío (sin contar espacios) · «Escribe tu nombre.»\ntelefono → 9 cifras, sin espacios · «El teléfono debe tener 9 cifras, sin espacios.»\nemail → con «@» y con «.» · «Escribe un email válido, por ejemplo nombre@correo.es.»\nprivacidad → marcada · «Necesitamos que aceptes la política de privacidad.»\n\nSI TODO ESTÁ BIEN, en #confirmacion:\n¡Cita reservada! MASCOTA · FECHA a las HORA · a nombre de NOMBRE\n  MASCOTA con su nombre de la lista: perro → Perro · gato → Gato · conejo → Conejo · exotico → Otro exótico\n  ejemplo: ¡Cita reservada! Perro · 2026-10-21 a las 10:00 · a nombre de Ana",
        glosario: ["\"submit\" y preventDefault()", "campo.value", ".trim()", ".includes() (texto)", ".checked", "Number.isNaN()", "bandera todoBien", "toLocaleDateString(\"sv-SE\")", "comparar fechas y horas", "if / else"],
        inicial: { html: HTML, css: CSS, js: PASOS[3] },
        comprobaciones: [
          { texto: "Enviar el formulario vacío no reserva nada y muestra los 7 mensajes del encargo", repaso: "js-11",
            prueba: async doc => { const d = (await nueva(doc)).doc; d.querySelector("#form-cita").requestSubmit();
              return Object.keys(MENSAJES).every(n => simple(error(d, n)) === simple(MENSAJES[n])) && !d.querySelector("#confirmacion").textContent.trim(); } },
          { texto: "Los campos mal llevan la clase `con-error`", repaso: "js-04",
            prueba: async doc => { const d = (await nueva(doc)).doc; d.querySelector("#form-cita").requestSubmit();
              return ["mascota", "fecha", "hora", "nombre", "telefono", "email"].every(n => d.querySelector('#form-cita [name="' + n + '"]').classList.contains("con-error")); } },
          { texto: "Con el reloj en el 20/10/2026, una cita para el 19 falla solo por la fecha", repaso: "js-16",
            prueba: async doc => { const d = (await nueva(doc)).doc; pedir(d, { fecha: "2026-10-19" }); return soloFalla(d, "fecha"); } },
          { texto: "A las 21:00 falla la hora, y un teléfono de 8 cifras o con espacios falla el teléfono", repaso: "js-11",
            // Una sola página (cada comprobación tiene un tiempo máximo): pedir() vuelve a rellenar todos los campos en cada envío
            prueba: async doc => { const d = (await nueva(doc)).doc;
              pedir(d, { hora: "21:00" }); const hora = soloFalla(d, "hora");
              pedir(d, { telefono: "60011122" }); const corto = soloFalla(d, "telefono");
              pedir(d, { telefono: "600 111 22" }); return hora && corto && soloFalla(d, "telefono"); } },
          { texto: "Un email sin «@» falla el email, y sin marcar la privacidad falla la privacidad", repaso: "js-11",
            prueba: async doc => { const d = (await nueva(doc)).doc;
              pedir(d, { email: "ana.correo.es" }); const email = soloFalla(d, "email");
              pedir(d, { privacidad: false }); return email && soloFalla(d, "privacidad"); } },
          { texto: "Con todo bien, `#confirmacion` dice «¡Cita reservada! Perro · 2026-10-21 a las 10:00 · a nombre de Ana»", repaso: "js-11",
            prueba: async doc => { const d = (await nueva(doc)).doc; pedir(d);
              return simple(d.querySelector("#confirmacion").textContent) === simple("¡Cita reservada! " + RESUMEN) && Object.keys(MENSAJES).every(n => !error(d, n).trim()); } },
          { texto: "Hoy mismo también vale, y al corregir un error su mensaje y su `con-error` desaparecen", repaso: "js-11",
            prueba: async doc => { const d = (await nueva(doc)).doc; pedir(d, { nombre: "" }); const antes = soloFalla(d, "nombre"); pedir(d, { fecha: "2026-10-20" });
              return antes && !error(d, "nombre").trim() && !d.querySelector('#form-cita [name="nombre"]').classList.contains("con-error") && simple(d.querySelector("#confirmacion").textContent).includes("reservada"); } },
          { texto: "El script funciona sin errores (mira la consola)", repaso: "js-11",
            prueba: async doc => { const v = await nueva(doc); v.doc.querySelector("#form-cita").requestSubmit(); pedir(v.doc); return sinErrores(v); } }
        ],
        pistas: [pista, "formulario.addEventListener(\"submit\", (evento) => { evento.preventDefault(); let todoBien = true; … }). Una función ayuda mucho: comprobar(campo, estaBien, mensaje) escribe o borra el mensaje en #error-+campo.name, pone o quita «con-error» y devuelve estaBien. Así: todoBien = comprobar(campoNombre, campoNombre.value.trim() !== \"\", \"Escribe tu nombre.\") && todoBien;"],
        solucion: { html: HTML, css: CSS, js: PASOS[4] },
        alternativas: [{ html: HTML, css: CSS, js: otraForma(PASOS[4]) }]
      },
      {
        tipo: "proyecto",
        proyecto: PROYECTO,
        pestana: "js",
        enunciado: "**Mis citas y las opiniones.** ¡El último encargo!\n\n1. Cada cita reservada se añade a una lista de citas, que se **guarda en `localStorage`** y se pinta en `#lista-citas`: un `li` con el resumen y un botón **Cancelar**.\n2. Al recargar la página, las citas **siguen ahí**.\n3. **Cancelar** quita esa cita (de la lista, de lo guardado y de la página) y `#confirmacion` dice «Cita cancelada.».\n4. Si no hay citas, `#sin-citas` dice «Todavía no tienes citas. ¡Pide la primera!»; si hay alguna, se queda vacío.\n5. Las **opiniones** se cargan con `fetch` desde `datos/opiniones.json` y se pintan en `#lista-opiniones`. Si algo falla, se quedan las del HTML.",
        textos: "MIS CITAS\nLista: #lista-citas   ·   aviso: #sin-citas   ·   guardadas en localStorage (el nombre de la clave lo eliges tú)\nCada cita: <li>RESUMEN <button type=\"button\">Cancelar</button></li>\n  RESUMEN: Perro · 2026-10-21 a las 10:00 · a nombre de Ana\nSin citas → #sin-citas: Todavía no tienes citas. ¡Pide la primera!\nAl cancelar → #confirmacion: Cita cancelada.\n\nOPINIONES\nfetch(\"datos/opiniones.json\") → un array de objetos: foto · alt · texto · autor · mascota · estrellas\nCada una, dentro de #lista-opiniones:\n<article class=\"opinion\">\n  <img src=\"img/FOTO\" alt=\"ALT\" width=\"120\" height=\"120\" loading=\"lazy\">\n  <p>TEXTO</p>\n  <p><strong>AUTOR</strong> · MASCOTA · ESTRELLAS</p>\n</article>\nSi falla (try/catch): no se toca nada, se quedan las opiniones del HTML",
        glosario: ["localStorage.setItem / getItem", "JSON.stringify / JSON.parse", "push()", "quitar con filter", "pintar una lista", "fetch()", "async / await", ".json()", "try / catch"],
        inicial: { html: HTML, css: CSS, js: PASOS[4] },
        comprobaciones: [
          { texto: "Sin citas, `#sin-citas` dice «Todavía no tienes citas. ¡Pide la primera!» y la lista está vacía", repaso: "js-07",
            prueba: async doc => { const d = (await nueva(doc)).doc; return simple(d.querySelector("#sin-citas").textContent) === simple("Todavía no tienes citas. ¡Pide la primera!") && citas(d).length === 0; } },
          { texto: "Al reservar, la cita aparece en «Mis citas» con su resumen y su botón «Cancelar», y el aviso se vacía", repaso: "js-10",
            prueba: async doc => { const d = (await nueva(doc)).doc; pedir(d); const li = citas(d);
              return li.length === 1 && simple(li[0].textContent).includes(simple(RESUMEN)) && simple(li[0].querySelector("button")?.textContent) === "cancelar" && !d.querySelector("#sin-citas").textContent.trim(); } },
          { texto: "Una cita mal rellena no se añade", repaso: "js-11",
            prueba: async doc => { const d = (await nueva(doc)).doc; pedir(d, { fecha: "2026-10-19" }); d.querySelector("#form-cita").requestSubmit(); return citas(d).length === 0; } },
          { texto: "Tras recargar la página, las citas siguen ahí", repaso: "js-12",
            prueba: async doc => { const v = await nueva(doc); pedir(v.doc); pedir(v.doc, { hora: "11:30" });
              const r = await PRUEBA.recargar(v.doc, { hoy: HOY }); const li = citas(r.doc);
              return li.length === 2 && simple(li[1].textContent).includes(simple("11:30")); } },
          { texto: "«Cancelar» quita la cita, dice «Cita cancelada.» y, tras recargar, sigue quitada", repaso: "js-15",
            prueba: async doc => { const v = await nueva(doc); pedir(v.doc); pedir(v.doc, { hora: "11:30" });
              citas(v.doc)[0].querySelector("button").click();
              const ok = citas(v.doc).length === 1 && simple(v.doc.querySelector("#confirmacion").textContent) === simple("Cita cancelada.");
              const r = await PRUEBA.recargar(v.doc, { hoy: HOY }); const li = citas(r.doc);
              return ok && li.length === 1 && simple(li[0].textContent).includes("11:30"); } },
          { texto: "Al cancelar la última cita, vuelve el aviso de «Todavía no tienes citas»", repaso: "js-07",
            prueba: async doc => { const d = (await nueva(doc)).doc; pedir(d); citas(d)[0].querySelector("button").click();
              return citas(d).length === 0 && simple(d.querySelector("#sin-citas").textContent).includes("todavia no tienes citas"); } },
          { texto: "Las opiniones llegan con `fetch` desde `datos/opiniones.json`", repaso: "js-13",
            // El HTML trae las 3 opiniones de reserva: se cambia una en los datos para ver que llega del fetch
            prueba: async doc => { const datos = window.__csshtmlDatos;
              window.__csshtmlDatos = Object.assign({}, datos, { "opiniones.json": datos["opiniones.json"].map((o, i) => i ? o : Object.assign({}, o, { texto: "Opinión de prueba" })) });
              try { const v = await nueva(doc);
                return await PRUEBA.esperarA(() => v.doc.querySelector("#lista-opiniones").textContent.includes("Opinión de prueba")
                  && v.doc.querySelectorAll("#lista-opiniones .opinion").length === 3, 1500); }
              finally { window.__csshtmlDatos = datos; } } },
          { texto: "Si el archivo de opiniones no llega, se quedan las del HTML y no hay errores", repaso: "js-13",
            prueba: async doc => { const v = await nueva(doc, { sinDatos: ["opiniones.json"] }); await PRUEBA.esperar(300);
              return v.doc.querySelectorAll("#lista-opiniones .opinion").length === 3 && sinErrores(v); } },
          { texto: "El script funciona sin errores (mira la consola)", repaso: "js-12",
            prueba: async doc => { const v = await nueva(doc); pedir(v.doc); citas(v.doc)[0]?.querySelector("button").click(); return sinErrores(v); } }
        ],
        pistas: [pista, "let citas = JSON.parse(localStorage.getItem(\"huellas-citas\")) || []; Al reservar: citas.push(cita); localStorage.setItem(\"huellas-citas\", JSON.stringify(citas)); y repintar. Para cancelar: citas = citas.filter((otra) => otra !== cita); guardar y repintar. Las opiniones: async function cargarOpiniones() { try { const respuesta = await fetch(\"datos/opiniones.json\"); const opiniones = await respuesta.json(); … } catch (error) { } }"],
        solucion: { html: HTML, css: CSS, js: PASOS[5] },
        alternativas: [{ html: HTML, css: CSS, js: otraForma(PASOS[5]) }]
      }
    ]
  });
})();
