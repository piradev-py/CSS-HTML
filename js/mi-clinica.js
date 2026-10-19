/* ============================================================
   <CSS-HTML> · Página final «Mi clínica» (mi-clinica.html)
   - Se abre al completar el Proyecto web del Mundo 4 (js-17).
   - Enseña la web de «Huellas» a pantalla entera: el borrador del
     alumno en js-17 (HTML y CSS oficiales del Mundo 4 + su script),
     con el mismo motor que la lección (fetch de datos, localStorage).
   - El cierre del curso (antes, en js-14) y la descarga en .zip:
     index.html, privacidad.html, estilos.css, script.js, datos/ e img/.
     MICLINICA.archivos() devuelve lo que va en el .zip (para los tests).
   ============================================================ */
(function () {
  UI.montarCabecera();

  const ULTIMA = "js-17";
  const PROYECTO = { raiz: "recursos/huellas/web/", html: "index.html", css: "estilos.css", js: "script.js" };
  const OFICIAL = HUELLAS["mundo-4"];
  window.__csshtmlDatos = Object.assign(window.__csshtmlDatos || {}, OFICIAL.datos);
  const cont = document.querySelector("[data-mi-clinica]");

  // La web del alumno: lo que dejó en el Proyecto web del Mundo 4 (y la oficial en lo que falte)
  function web() {
    // La copia que se guarda al ganar js-17 (sobrevive a «Repetir»); si no la hay, el borrador del proyecto
    const b = PROGRESO.borrador("mi-clinica") || PROGRESO.borrador(ULTIMA + "#proyecto") || {};
    return { html: b.html || OFICIAL.html, css: b.css || OFICIAL.css, js: b.js || OFICIAL.js };
  }

  function desdeBase64(texto) {
    const binario = atob(texto);
    const bytes = new Uint8Array(binario.length);
    for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
    return bytes;
  }

  function archivos() {
    const w = web();
    const lista = [
      { nombre: "index.html", datos: w.html },
      { nombre: "privacidad.html", datos: OFICIAL.privacidad },
      { nombre: "estilos.css", datos: w.css },
      { nombre: "script.js", datos: w.js }
    ];
    for (const [nombre, contenido] of Object.entries(OFICIAL.datos)) lista.push({ nombre: "datos/" + nombre, datos: JSON.stringify(contenido, null, 2) + "\n" });
    for (const [ruta, base64] of Object.entries(window.HUELLAS_IMAGENES || {})) lista.push({ nombre: ruta, datos: desdeBase64(base64) });
    // Todo dentro de una carpeta: al descomprimir no se desparrama por el escritorio
    return lista.map(a => ({ nombre: "huellas/" + a.nombre, datos: a.datos }));
  }

  function descargar() {
    const blob = new Blob([ZIP.crear(archivos())], { type: "application/zip" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "huellas.zip";
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    CELEBRAR.toast("📦 Descargando huellas.zip");
  }

  function pintarPendiente() {
    const abierta = PROGRESO.estaDesbloqueada(ULTIMA);
    cont.innerHTML =
      '<section class="tarjeta mi-clinica-pendiente">' +
        "<h1>🏥 Mi clínica</h1>" +
        "<p>Aquí verás la web de la clínica <b>Huellas</b> terminada, hecha por ti, y podrás descargarla para abrirla en tu ordenador.</p>" +
        "<p>Aparece cuando completas el <b>Proyecto web del Mundo JavaScript</b>, el último del curso.</p>" +
        '<div class="acciones">' +
          (abierta ? '<a class="boton grande" href="leccion.html?id=' + ULTIMA + '">▶ Ir al Proyecto web</a>' : "") +
          '<a class="boton secundario" href="index.html">🗺️ Volver al mapa</a>' +
        "</div>" +
      "</section>";
    cont.querySelector(".mi-clinica-pendiente").prepend(MASCOTA.crear("¡Ya queda menos! Termina los cuatro mundos y aquí estará tu clínica. 🐾", "alegre"));
  }

  function pintarClinica() {
    cont.innerHTML =
      '<section class="tarjeta mi-clinica-cierre">' +
        "<h1>¡Tu clínica está en marcha! 🐾</h1>" +
        "<p>Para un momento y mira atrás. 🌄 Empezaste sin saber qué era una etiqueta. Construiste la web de <b>Huellas</b> con <b>HTML</b>, " +
        "le diste su identidad con <b>CSS</b>, la convertiste en una maqueta que se ve bien en el móvil, la tableta y el ordenador… " +
        "y ahora <b>funciona</b> con <b>JavaScript</b>: el menú, los filtros, la cita que se comprueba y las citas que se recuerdan.</p>" +
        "<p>Esta web es tuya. Descárgala, ábrela en tu ordenador con doble clic en <code>index.html</code> y enséñasela a quien quieras.</p>" +
        '<div class="acciones">' +
          '<button class="boton grande" type="button" data-descargar>⬇️ Descargar mi web (.zip)</button>' +
          '<a class="boton secundario" href="index.html">🗺️ Volver al mapa</a>' +
        "</div>" +
        "<details class=\"seguir\"><summary>🚀 ¿Y ahora qué?</summary>" +
          "<p>Lo mejor para no olvidar es seguir trasteando con tu propia web:</p>" +
          "<ul>" +
            "<li>Cambia la paleta en <code>:root</code> y mira cómo cambia toda la clínica de un plumazo.</li>" +
            "<li>Añade un servicio nuevo al array <code>servicios</code>: sale solo, y el filtro ya lo tiene en cuenta.</li>" +
            "<li>Haz que la hora de la cita tenga en cuenta el sábado (de 10:00 a 14:00) y el domingo (cerrado).</li>" +
          "</ul>" +
          "<p>Una clínica de verdad añadiría una cosa más: un <b>servidor</b> que reciba las citas, para que lleguen a la clínica y no solo se " +
          "guarden en tu navegador. Eso ya es programar «por detrás» (el <i>backend</i>), el siguiente paso cuando quieras seguir aprendiendo.</p>" +
        "</details>" +
      "</section>" +
      '<section class="mi-clinica-web">' +
        '<p class="texto-suave">Así queda tu web. Aquí dentro los enlaces a otras páginas abren una página de prueba; en la web descargada funcionan de verdad.</p>' +
        '<iframe class="marco-clinica" title="La web de la clínica Huellas"></iframe>' +
      "</section>";
    cont.querySelector(".mi-clinica-cierre").prepend(MASCOTA.crear("Cuando empezamos, yo era solo una etiqueta con ojos. Ahora soy una etiqueta con ojos <b>muy orgullosa</b> de ti. " +
      "Programar no va de saberlo todo, sino de no rendirse. ¡Y tú no te has rendido! 🥹", "alegre"));
    cont.querySelector("[data-descargar]").addEventListener("click", descargar);
    cont.querySelector(".marco-clinica").srcdoc = EDITOR.construirDocumento(Object.assign({ proyecto: PROYECTO }, web()));
  }

  if (PROGRESO.estaCompletada(ULTIMA)) pintarClinica();
  else pintarPendiente();

  window.MICLINICA = { archivos, web };
})();
