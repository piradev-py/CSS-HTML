/* ============================================================
   <CSS-HTML> · Índice del curso
   - MUNDOS: lista ordenada de mundos y sus lecciones.
   - CURSO.registrar(): lo llaman los archivos de lecciones/.
   Las lecciones con listo:false aparecen como "Próximamente".
   ============================================================ */
(function () {
  // Versión publicada. No la cambies a mano: usa `node herramientas/version.mjs X.Y.Z`,
  // que también actualiza los ?v= de index.html y leccion.html (ver CAMBIOS.md)
  const VERSION = "1.4.9";

  const MUNDOS = [
    {
      numero: 1,
      clave: "html",
      carpeta: "1-html",
      nombre: "Mundo HTML",
      emoji: "🏗️",
      lema: "Los ladrillos de toda página web",
      pestanas: ["html"],
      lecciones: [
        { id: "html-01", archivo: "html-01-que-es-html.js", titulo: "¿Qué es HTML?", en: "What is HTML?", listo: true },
        { id: "html-02", archivo: "html-02-estructura.js", titulo: "La estructura de una página", en: "The structure of a page", listo: true },
        { id: "html-03", archivo: "html-03-titulos-y-parrafos.js", titulo: "Títulos y párrafos", en: "Headings and paragraphs", listo: true },
        { id: "html-04", archivo: "html-04-enfasis.js", titulo: "Negritas, cursivas y énfasis", en: "Bold, italics and emphasis", listo: true },
        { id: "html-05", archivo: "html-05-listas.js", titulo: "Listas", en: "Lists", listo: true },
        { id: "html-06", archivo: "html-06-enlaces.js", titulo: "Enlaces", en: "Links", listo: true },
        { id: "html-07", archivo: "html-07-imagenes.js", titulo: "Imágenes", en: "Images", listo: true },
        { id: "html-08", archivo: "html-08-tablas.js", titulo: "Tablas", en: "Tables", listo: true },
        { id: "html-09", archivo: "html-09-formularios.js", titulo: "Formularios: campos y etiquetas", en: "Forms: fields and labels", listo: true },
        { id: "html-10", archivo: "html-10-formularios-2.js", titulo: "Formularios: más tipos de campo", en: "Forms: more field types", listo: true },
        { id: "html-11", archivo: "html-11-div-y-span.js", titulo: "Cajas genéricas: div y span", en: "Generic boxes: div and span", listo: true },
        { id: "html-12", archivo: "html-12-semantica.js", titulo: "HTML semántico y accesible", en: "Semantic and accessible HTML", listo: true },
        { id: "html-13", archivo: "html-13-cabeza.js", titulo: "La cabeza de la página", en: "The head of the page", listo: true },
        { id: "html-14", archivo: "html-14-proyecto-web.js", titulo: "Proyecto web: la clínica Huellas", en: "Web project: the Huellas clinic", listo: true, huellas: true }
      ]
    },
    {
      numero: 2,
      clave: "css",
      carpeta: "2-css",
      nombre: "Mundo CSS",
      emoji: "🎨",
      lema: "Dale color y estilo a tus páginas",
      pestanas: ["html", "css"],
      lecciones: [
        { id: "css-01", archivo: "css-01-que-es-css.js", titulo: "¿Qué es CSS?", en: "What is CSS?", listo: true },
        { id: "css-02", archivo: "css-02-selectores.js", titulo: "Selectores", en: "Selectors", listo: true },
        { id: "css-03", archivo: "css-03-colores.js", titulo: "Colores", en: "Colors", listo: true },
        { id: "css-04", archivo: "css-04-texto.js", titulo: "Texto y fuentes", en: "Text and fonts", listo: true },
        { id: "css-05", archivo: "css-05-cascada.js", titulo: "La cascada: ¿quién gana?", en: "The cascade: who wins?", listo: true },
        { id: "css-06", archivo: "css-06-unidades.js", titulo: "Unidades de medida", en: "Units of measurement", listo: true },
        { id: "css-07", archivo: "css-07-modelo-de-caja.js", titulo: "El modelo de caja", en: "The box model", listo: true },
        { id: "css-08", archivo: "css-08-bordes-sombras.js", titulo: "Bordes y sombras", en: "Borders and shadows", listo: true },
        { id: "css-09", archivo: "css-09-display.js", titulo: "Display: bloque y en línea", en: "Display: block and inline", listo: true },
        { id: "css-10", archivo: "css-10-posicionamiento.js", titulo: "Posicionamiento", en: "Positioning", listo: true },
        { id: "css-11", archivo: "css-11-flexbox-1.js", titulo: "Flexbox (I): en fila y alineados", en: "Flexbox (I): in a row and aligned", listo: true },
        { id: "css-12", archivo: "css-12-flexbox-2.js", titulo: "Flexbox (II): repartir el espacio", en: "Flexbox (II): sharing out the space", listo: true },
        { id: "css-13", archivo: "css-13-grid.js", titulo: "Grid", en: "Grid", listo: true },
        { id: "css-14", archivo: "css-14-variables.js", titulo: "Variables CSS", en: "CSS variables", listo: true },
        { id: "css-15", archivo: "css-15-proyecto-web.js", titulo: "Proyecto web: la identidad de Huellas", en: "Web project: Huellas's identity", listo: true, huellas: true }
      ]
    },
    {
      numero: 3,
      clave: "hc",
      carpeta: "3-html-css",
      nombre: "Mundo HTML + CSS",
      emoji: "🧩",
      lema: "Construye interfaces de verdad",
      pestanas: ["html", "css"],
      lecciones: [
        { id: "hc-01", archivo: "hc-01-tarjeta.js", titulo: "Maqueta una tarjeta", en: "Build a card", listo: true },
        { id: "hc-02", archivo: "hc-02-pseudoclases.js", titulo: "Pseudo-clases", en: "Pseudo-classes", listo: true },
        { id: "hc-03", archivo: "hc-03-pseudoelementos.js", titulo: "Pseudo-elementos", en: "Pseudo-elements", listo: true },
        { id: "hc-04", archivo: "hc-04-navegacion.js", titulo: "Barra de navegación", en: "Navigation bar", listo: true },
        { id: "hc-05", archivo: "hc-05-responsive.js", titulo: "Responsive y media queries", en: "Responsive design and media queries", listo: true },
        { id: "hc-06", archivo: "hc-06-mobile-first.js", titulo: "Mobile first", en: "Mobile first", listo: true },
        { id: "hc-07", archivo: "hc-07-transformaciones.js", titulo: "Transformaciones", en: "Transforms", listo: true },
        { id: "hc-08", archivo: "hc-08-transiciones.js", titulo: "Transiciones", en: "Transitions", listo: true },
        { id: "hc-09", archivo: "hc-09-animaciones.js", titulo: "Animaciones", en: "Animations", listo: true },
        { id: "hc-10", archivo: "hc-10-formularios-estilo.js", titulo: "Formularios con estilo", en: "Styled forms", listo: true },
        { id: "hc-13", archivo: "hc-13-proyecto-web.js", titulo: "Proyecto web: la maqueta de Huellas", en: "Web project: Huellas's layout", listo: true, huellas: true }
      ]
    },
    {
      numero: 4,
      clave: "js",
      carpeta: "4-js",
      nombre: "Mundo JavaScript",
      emoji: "⚡",
      lema: "Dale vida e interacción a tu web",
      pestanas: ["html", "css", "js"],
      lecciones: [
        { id: "js-01", archivo: "js-01-que-es-js.js", titulo: "¿Qué es JavaScript?", en: "What is JavaScript?", listo: true },
        { id: "js-02", archivo: "js-02-variables.js", titulo: "Variables y consola", en: "Variables and the console", listo: true },
        { id: "js-03", archivo: "js-03-dom.js", titulo: "Seleccionar elementos (DOM)", en: "Selecting elements (DOM)", listo: true },
        { id: "js-04", archivo: "js-04-cambiar-dom.js", titulo: "Cambiar texto, estilos y clases", en: "Changing the page (DOM)", listo: true },
        { id: "js-05", archivo: "js-05-funciones.js", titulo: "Funciones", en: "Functions", listo: true },
        { id: "js-06", archivo: "js-06-eventos.js", titulo: "Eventos", en: "Events: responding to the user", listo: true },
        { id: "js-07", archivo: "js-07-condiciones.js", titulo: "Condiciones", en: "Conditions", listo: true },
        { id: "js-08", archivo: "js-08-arrays-y-bucles.js", titulo: "Arrays y bucles", en: "Arrays and loops", listo: true },
        { id: "js-09", archivo: "js-09-objetos.js", titulo: "Objetos", en: "Objects", listo: true },
        { id: "js-10", archivo: "js-10-crear-elementos.js", titulo: "Crear elementos desde JS", en: "Creating elements from JS", listo: true },
        // Los ids no cambian nunca: las lecciones nuevas llevan el siguiente número libre aunque vayan en medio
        { id: "js-15", archivo: "js-15-filtrar-listas.js", titulo: "Filtrar listas", en: "Filtering lists", listo: true },
        { id: "js-16", archivo: "js-16-fechas-y-horas.js", titulo: "Fechas y horas", en: "Dates and times", listo: true },
        { id: "js-11", archivo: "js-11-validar-formularios.js", titulo: "Validar formularios", en: "Validating forms", listo: true },
        { id: "js-12", archivo: "js-12-localstorage.js", titulo: "Guardar datos: localStorage", en: "Saving data: localStorage", listo: true },
        { id: "js-13", archivo: "js-13-fetch.js", titulo: "Pedir datos con fetch", en: "Fetching data with fetch", listo: true },
        { id: "js-17", archivo: "js-17-proyecto-web.js", titulo: "Proyecto web: la agenda de Huellas", en: "Web project: Huellas's appointment book", listo: true, huellas: true }
      ]
    }
  ];

  const lecciones = {}; // contenido registrado por los archivos de lecciones/

  function listaPlana() {
    const lista = [];
    MUNDOS.forEach(m => m.lecciones.forEach(l => lista.push(Object.assign({ mundo: m }, l))));
    return lista;
  }

  // En inglés: nombres de los mundos por T() y, en las lecciones ya traducidas (`en`: su título inglés), ese título
  if (IDIOMA.actual === "en") MUNDOS.forEach(m => {
    m.nombre = T(m.nombre);
    m.lema = T(m.lema);
    m.lecciones.forEach(l => { if (l.en) l.titulo = l.en; });
  });

  window.CURSO = {
    VERSION,
    MUNDOS,
    lecciones,
    // Versiones oficiales de «Huellas» (las genera herramientas/huellas-versiones.mjs); las cargan las lecciones con huellas: true
    RUTA_HUELLAS: "lecciones/huellas/versiones.js",
    registrar(leccion) {
      lecciones[leccion.id] = leccion;
      // Archivos falsos para fetch("datos/…") en el Mundo JavaScript (ver js/editor.js)
      if (leccion.datos) window.__csshtmlDatos = Object.assign(window.__csshtmlDatos || {}, leccion.datos);
    },
    listaPlana,
    buscar(id) { return listaPlana().find(l => l.id === id) || null; },
    siguiente(id) {
      const lista = listaPlana();
      const i = lista.findIndex(l => l.id === id);
      return i >= 0 && i < lista.length - 1 ? lista[i + 1] : null;
    },
    anterior(id) {
      const lista = listaPlana();
      const i = lista.findIndex(l => l.id === id);
      return i > 0 ? lista[i - 1] : null;
    },
    // Una lección de proyecto ya traducida parte de la web de «Huellas» en inglés (herramientas/huellas-en.mjs)
    rutaHuellas(id) {
      const l = this.buscar(id);
      return IDIOMA.actual === "en" && l && l.en ? "lecciones-en/huellas/versiones.js" : this.RUTA_HUELLAS;
    },
    ruta(id, base = "") {
      const l = this.buscar(id);
      // Las traducidas viven en lecciones-en/ con el mismo nombre de archivo; las demás salen en español
      const carpeta = IDIOMA.actual === "en" && l && l.en ? "lecciones-en/" : "lecciones/";
      return l ? base + carpeta + l.mundo.carpeta + "/" + l.archivo : null;
    }
  };
})();
