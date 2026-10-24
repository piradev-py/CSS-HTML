/* ============================================================
   <CSS-HTML> · Índice del curso
   - MUNDOS: lista ordenada de mundos y sus lecciones.
   - CURSO.registrar(): lo llaman los archivos de lecciones/.
   Las lecciones con listo:false aparecen como "Próximamente".
   ============================================================ */
(function () {
  // Versión publicada. No la cambies a mano: usa `node herramientas/version.mjs X.Y.Z`,
  // que también actualiza los ?v= de index.html y leccion.html (ver CAMBIOS.md)
  const VERSION = "1.3.5";

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
        { id: "html-04", archivo: "html-04-enfasis.js", titulo: "Negritas, cursivas y énfasis", listo: true },
        { id: "html-05", archivo: "html-05-listas.js", titulo: "Listas", listo: true },
        { id: "html-06", archivo: "html-06-enlaces.js", titulo: "Enlaces", listo: true },
        { id: "html-07", archivo: "html-07-imagenes.js", titulo: "Imágenes", listo: true },
        { id: "html-08", archivo: "html-08-tablas.js", titulo: "Tablas", listo: true },
        { id: "html-09", archivo: "html-09-formularios.js", titulo: "Formularios: campos y etiquetas", listo: true },
        { id: "html-10", archivo: "html-10-formularios-2.js", titulo: "Formularios: más tipos de campo", listo: true },
        { id: "html-11", archivo: "html-11-div-y-span.js", titulo: "Cajas genéricas: div y span", listo: true },
        { id: "html-12", archivo: "html-12-semantica.js", titulo: "HTML semántico y accesible", listo: true },
        { id: "html-13", archivo: "html-13-cabeza.js", titulo: "La cabeza de la página", listo: true },
        { id: "html-14", archivo: "html-14-proyecto-web.js", titulo: "Proyecto web: la clínica Huellas", listo: true, huellas: true }
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
        { id: "css-01", archivo: "css-01-que-es-css.js", titulo: "¿Qué es CSS?", listo: true },
        { id: "css-02", archivo: "css-02-selectores.js", titulo: "Selectores", listo: true },
        { id: "css-03", archivo: "css-03-colores.js", titulo: "Colores", listo: true },
        { id: "css-04", archivo: "css-04-texto.js", titulo: "Texto y fuentes", listo: true },
        { id: "css-05", archivo: "css-05-cascada.js", titulo: "La cascada: ¿quién gana?", listo: true },
        { id: "css-06", archivo: "css-06-unidades.js", titulo: "Unidades de medida", listo: true },
        { id: "css-07", archivo: "css-07-modelo-de-caja.js", titulo: "El modelo de caja", listo: true },
        { id: "css-08", archivo: "css-08-bordes-sombras.js", titulo: "Bordes y sombras", listo: true },
        { id: "css-09", archivo: "css-09-display.js", titulo: "Display: bloque y en línea", listo: true },
        { id: "css-10", archivo: "css-10-posicionamiento.js", titulo: "Posicionamiento", listo: true },
        { id: "css-11", archivo: "css-11-flexbox-1.js", titulo: "Flexbox (I): en fila y alineados", listo: true },
        { id: "css-12", archivo: "css-12-flexbox-2.js", titulo: "Flexbox (II): repartir el espacio", listo: true },
        { id: "css-13", archivo: "css-13-grid.js", titulo: "Grid", listo: true },
        { id: "css-14", archivo: "css-14-variables.js", titulo: "Variables CSS", listo: true },
        { id: "css-15", archivo: "css-15-proyecto-web.js", titulo: "Proyecto web: la identidad de Huellas", listo: true, huellas: true }
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
        { id: "hc-01", archivo: "hc-01-tarjeta.js", titulo: "Maqueta una tarjeta", listo: true },
        { id: "hc-02", archivo: "hc-02-pseudoclases.js", titulo: "Pseudo-clases", listo: true },
        { id: "hc-03", archivo: "hc-03-pseudoelementos.js", titulo: "Pseudo-elementos", listo: true },
        { id: "hc-04", archivo: "hc-04-navegacion.js", titulo: "Barra de navegación", listo: true },
        { id: "hc-05", archivo: "hc-05-responsive.js", titulo: "Responsive y media queries", listo: true },
        { id: "hc-06", archivo: "hc-06-mobile-first.js", titulo: "Mobile first", listo: true },
        { id: "hc-07", archivo: "hc-07-transformaciones.js", titulo: "Transformaciones", listo: true },
        { id: "hc-08", archivo: "hc-08-transiciones.js", titulo: "Transiciones", listo: true },
        { id: "hc-09", archivo: "hc-09-animaciones.js", titulo: "Animaciones", listo: true },
        { id: "hc-10", archivo: "hc-10-formularios-estilo.js", titulo: "Formularios con estilo", listo: true },
        { id: "hc-13", archivo: "hc-13-proyecto-web.js", titulo: "Proyecto web: la maqueta de Huellas", listo: true, huellas: true }
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
        { id: "js-01", archivo: "js-01-que-es-js.js", titulo: "¿Qué es JavaScript?", listo: true },
        { id: "js-02", archivo: "js-02-variables.js", titulo: "Variables y consola", listo: true },
        { id: "js-03", archivo: "js-03-dom.js", titulo: "Seleccionar elementos (DOM)", listo: true },
        { id: "js-04", archivo: "js-04-cambiar-dom.js", titulo: "Cambiar texto, estilos y clases", listo: true },
        { id: "js-05", archivo: "js-05-funciones.js", titulo: "Funciones", listo: true },
        { id: "js-06", archivo: "js-06-eventos.js", titulo: "Eventos", listo: true },
        { id: "js-07", archivo: "js-07-condiciones.js", titulo: "Condiciones", listo: true },
        { id: "js-08", archivo: "js-08-arrays-y-bucles.js", titulo: "Arrays y bucles", listo: true },
        { id: "js-09", archivo: "js-09-objetos.js", titulo: "Objetos", listo: true },
        { id: "js-10", archivo: "js-10-crear-elementos.js", titulo: "Crear elementos desde JS", listo: true },
        // Los ids no cambian nunca: las lecciones nuevas llevan el siguiente número libre aunque vayan en medio
        { id: "js-15", archivo: "js-15-filtrar-listas.js", titulo: "Filtrar listas", listo: true },
        { id: "js-16", archivo: "js-16-fechas-y-horas.js", titulo: "Fechas y horas", listo: true },
        { id: "js-11", archivo: "js-11-validar-formularios.js", titulo: "Validar formularios", listo: true },
        { id: "js-12", archivo: "js-12-localstorage.js", titulo: "Guardar datos: localStorage", listo: true },
        { id: "js-13", archivo: "js-13-fetch.js", titulo: "Pedir datos con fetch", listo: true },
        { id: "js-17", archivo: "js-17-proyecto-web.js", titulo: "Proyecto web: la agenda de Huellas", listo: true, huellas: true }
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
    ruta(id, base = "") {
      const l = this.buscar(id);
      // Las traducidas viven en lecciones-en/ con el mismo nombre de archivo; las demás salen en español
      const carpeta = IDIOMA.actual === "en" && l && l.en ? "lecciones-en/" : "lecciones/";
      return l ? base + carpeta + l.mundo.carpeta + "/" + l.archivo : null;
    }
  };
})();
