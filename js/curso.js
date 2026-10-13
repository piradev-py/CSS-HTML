/* ============================================================
   <CSS-HTML> · Índice del curso
   - MUNDOS: lista ordenada de mundos y sus lecciones.
   - CURSO.registrar(): lo llaman los archivos de lecciones/.
   Las lecciones con listo:false aparecen como "Próximamente".
   ============================================================ */
(function () {
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
        { id: "html-01", archivo: "html-01-que-es-html.js", titulo: "¿Qué es HTML?", listo: true },
        { id: "html-02", archivo: "html-02-estructura.js", titulo: "La estructura de una página", listo: true },
        { id: "html-03", archivo: "html-03-titulos-y-parrafos.js", titulo: "Títulos y párrafos", listo: true },
        { id: "html-04", archivo: "html-04-enfasis.js", titulo: "Negritas, cursivas y énfasis", listo: false },
        { id: "html-05", archivo: "html-05-listas.js", titulo: "Listas", listo: false },
        { id: "html-06", archivo: "html-06-enlaces.js", titulo: "Enlaces", listo: false },
        { id: "html-07", archivo: "html-07-imagenes.js", titulo: "Imágenes", listo: false },
        { id: "html-08", archivo: "html-08-tablas.js", titulo: "Tablas", listo: false },
        { id: "html-09", archivo: "html-09-formularios.js", titulo: "Formularios: campos y etiquetas", listo: false },
        { id: "html-10", archivo: "html-10-formularios-2.js", titulo: "Formularios: más tipos de campo", listo: false },
        { id: "html-11", archivo: "html-11-div-y-span.js", titulo: "Cajas genéricas: div y span", listo: false },
        { id: "html-12", archivo: "html-12-semantica.js", titulo: "HTML semántico y accesible", listo: false }
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
        { id: "css-01", archivo: "css-01-que-es-css.js", titulo: "¿Qué es CSS?", listo: false },
        { id: "css-02", archivo: "css-02-selectores.js", titulo: "Selectores", listo: false },
        { id: "css-03", archivo: "css-03-colores.js", titulo: "Colores", listo: false },
        { id: "css-04", archivo: "css-04-texto.js", titulo: "Texto y fuentes", listo: false },
        { id: "css-05", archivo: "css-05-cascada.js", titulo: "La cascada: ¿quién gana?", listo: false },
        { id: "css-06", archivo: "css-06-unidades.js", titulo: "Unidades de medida", listo: false },
        { id: "css-07", archivo: "css-07-modelo-de-caja.js", titulo: "El modelo de caja", listo: false },
        { id: "css-08", archivo: "css-08-bordes-sombras.js", titulo: "Bordes y sombras", listo: false },
        { id: "css-09", archivo: "css-09-display.js", titulo: "Display: bloque y en línea", listo: false },
        { id: "css-10", archivo: "css-10-posicionamiento.js", titulo: "Posicionamiento", listo: false },
        { id: "css-11", archivo: "css-11-flexbox-1.js", titulo: "Flexbox (I): en fila y alineados", listo: false },
        { id: "css-12", archivo: "css-12-flexbox-2.js", titulo: "Flexbox (II): repartir el espacio", listo: false },
        { id: "css-13", archivo: "css-13-grid.js", titulo: "Grid", listo: false },
        { id: "css-14", archivo: "css-14-variables.js", titulo: "Variables CSS", listo: false }
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
        { id: "hc-01", archivo: "hc-01-tarjeta.js", titulo: "Maqueta una tarjeta", listo: false },
        { id: "hc-02", archivo: "hc-02-pseudoclases.js", titulo: "Pseudo-clases", listo: false },
        { id: "hc-03", archivo: "hc-03-pseudoelementos.js", titulo: "Pseudo-elementos", listo: false },
        { id: "hc-04", archivo: "hc-04-navegacion.js", titulo: "Barra de navegación", listo: false },
        { id: "hc-05", archivo: "hc-05-responsive.js", titulo: "Responsive y media queries", listo: false },
        { id: "hc-06", archivo: "hc-06-mobile-first.js", titulo: "Mobile first", listo: false },
        { id: "hc-07", archivo: "hc-07-transformaciones.js", titulo: "Transformaciones", listo: false },
        { id: "hc-08", archivo: "hc-08-transiciones.js", titulo: "Transiciones", listo: false },
        { id: "hc-09", archivo: "hc-09-animaciones.js", titulo: "Animaciones", listo: false },
        { id: "hc-10", archivo: "hc-10-formularios-estilo.js", titulo: "Formularios con estilo", listo: false },
        { id: "hc-11", archivo: "hc-11-landing-1.js", titulo: "Proyecto: landing page (I)", listo: false },
        { id: "hc-12", archivo: "hc-12-landing-2.js", titulo: "Proyecto: landing page (II)", listo: false }
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
        { id: "js-01", archivo: "js-01-que-es-js.js", titulo: "¿Qué es JavaScript?", listo: false },
        { id: "js-02", archivo: "js-02-variables.js", titulo: "Variables y consola", listo: false },
        { id: "js-03", archivo: "js-03-dom.js", titulo: "Seleccionar elementos (DOM)", listo: false },
        { id: "js-04", archivo: "js-04-cambiar-dom.js", titulo: "Cambiar texto, estilos y clases", listo: false },
        { id: "js-05", archivo: "js-05-funciones.js", titulo: "Funciones", listo: false },
        { id: "js-06", archivo: "js-06-eventos.js", titulo: "Eventos", listo: false },
        { id: "js-07", archivo: "js-07-condiciones.js", titulo: "Condiciones", listo: false },
        { id: "js-08", archivo: "js-08-arrays-y-bucles.js", titulo: "Arrays y bucles", listo: false },
        { id: "js-09", archivo: "js-09-objetos.js", titulo: "Objetos", listo: false },
        { id: "js-10", archivo: "js-10-crear-elementos.js", titulo: "Crear elementos desde JS", listo: false },
        { id: "js-11", archivo: "js-11-validar-formularios.js", titulo: "Validar formularios", listo: false },
        { id: "js-12", archivo: "js-12-localstorage.js", titulo: "Guardar datos: localStorage", listo: false },
        { id: "js-13", archivo: "js-13-fetch.js", titulo: "Pedir datos con fetch", listo: false },
        { id: "js-14", archivo: "js-14-proyecto-tareas.js", titulo: "Proyecto final: lista de tareas", listo: false }
      ]
    }
  ];

  const lecciones = {}; // contenido registrado por los archivos de lecciones/

  function listaPlana() {
    const lista = [];
    MUNDOS.forEach(m => m.lecciones.forEach(l => lista.push(Object.assign({ mundo: m }, l))));
    return lista;
  }

  window.CURSO = {
    MUNDOS,
    lecciones,
    registrar(leccion) { lecciones[leccion.id] = leccion; },
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
      return l ? base + "lecciones/" + l.mundo.carpeta + "/" + l.archivo : null;
    }
  };
})();
