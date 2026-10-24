/* ============================================================
   <CSS-HTML> · Laboratorio de práctica libre (laboratorio.html)
   - Las 3 pestañas (HTML, CSS, JS) con la vista previa y la consola
     de las lecciones, sin enunciado ni revisión: para trastear.
   - El código se guarda solo (borrador «laboratorio»).
   - Ejemplos para cargar, «Borrar todo» y, tras borrar o cargar,
     «↩ Deshacer» durante un rato.
   - «⬇️ Descargar (.zip)»: index.html, estilos.css y script.js, ya
     enlazados entre sí, para seguir en el ordenador.
     LABORATORIO.archivos() devuelve lo que va en el .zip (para los tests).
   ============================================================ */
(function () {
  UI.montarCabecera();

  const CLAVE = "laboratorio";
  const VACIO = { html: "", css: "", js: "" };
  const EJEMPLOS = [
    { nombre: T("Una tarjeta"), codigo: {
      html: "<article class=\"tarjeta\">\n  <h1>Luna</h1>\n  <p>Gata de 3 años. Le encanta dormir al sol.</p>\n  <button>Adoptar</button>\n</article>",
      css: "body {\n  font-family: sans-serif;\n  background-color: #f7faf8;\n}\n\n.tarjeta {\n  max-width: 280px;\n  margin: 40px auto;\n  padding: 24px;\n  border-radius: 20px;\n  background-color: white;\n  box-shadow: 0 10px 30px rgb(0 0 0 / 0.1);\n}\n\nbutton {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 999px;\n  background-color: #1f7a6b;\n  color: white;\n}",
      js: "" } },
    { nombre: T("Un botón que cuenta"), codigo: {
      html: "<p>Has pulsado <strong id=\"cuenta\">0</strong> veces.</p>\n<button id=\"boton\">¡Púlsame!</button>",
      css: "body {\n  font-family: sans-serif;\n  text-align: center;\n  padding-top: 40px;\n}\n\nbutton {\n  padding: 12px 24px;\n  font-size: 1.1rem;\n}",
      js: "let veces = 0;\nconst boton = document.querySelector(\"#boton\");\nconst cuenta = document.querySelector(\"#cuenta\");\n\nboton.addEventListener(\"click\", () => {\n  veces++;\n  cuenta.textContent = veces;\n  console.log(\"Clic número \" + veces);\n});" } },
    { nombre: T("Una lista que crece"), codigo: {
      html: "<input id=\"texto\" placeholder=\"Escribe algo\">\n<button id=\"anadir\">Añadir</button>\n<ul id=\"lista\"></ul>",
      css: "body {\n  font-family: sans-serif;\n  padding: 24px;\n}\n\nli {\n  margin: 6px 0;\n}",
      js: "const texto = document.querySelector(\"#texto\");\nconst lista = document.querySelector(\"#lista\");\n\ndocument.querySelector(\"#anadir\").addEventListener(\"click\", () => {\n  if (texto.value.trim() === \"\") {\n    return;\n  }\n  const li = document.createElement(\"li\");\n  li.textContent = texto.value;\n  lista.append(li);\n  texto.value = \"\";\n});" } }
  ];

  const cont = document.querySelector("[data-laboratorio]");
  cont.innerHTML =
    '<section class="tarjeta lab-cabecera">' +
      "<div><h1>" + T("🧪 Laboratorio") + "</h1>" +
      "<p class=\"texto-suave\">" + T("Tu sitio para trastear: escribe HTML, CSS y JavaScript y mira el resultado al momento. Aquí no hay retos ni revisión, y tu código se guarda solo.") + "</p></div>" +
      '<div class="lab-acciones">' +
        '<label class="lab-ejemplos">' + T("Cargar un ejemplo: ") + '<select data-ejemplo><option value="">' + T("Elige uno…") + "</option>" +
          EJEMPLOS.map((e, i) => '<option value="' + i + '">' + UI.escapar(e.nombre) + "</option>").join("") +
        "</select></label>" +
        '<button class="boton secundario" type="button" data-borrar>' + T("🗑️ Borrar todo") + "</button>" +
        '<button class="boton" type="button" data-descargar>' + T("⬇️ Descargar (.zip)") + "</button>" +
      "</div>" +
      '<p class="lab-deshacer"><span data-aviso role="status"></span> <button class="mini-boton" type="button" data-deshacer hidden>' + T("↩ Deshacer") + "</button></p>" +
    "</section>" +
    '<section class="lab-editor"><div class="col col-codigo"></div><div class="col col-resultado"></div></section>';

  // Como en las lecciones: el código y el resultado, cada uno en su columna
  const editor = EDITOR.crear(cont.querySelector(".lab-editor"), {
    destinos: { codigo: cont.querySelector(".lab-editor .col-codigo"), resultado: cont.querySelector(".lab-editor .col-resultado") },
    pestanas: ["html", "css", "js"],
    inicial: VACIO,
    codigo: PROGRESO.borrador(CLAVE) || EJEMPLOS[0].codigo,
    alCambiar: codigo => PROGRESO.guardarBorrador(CLAVE, codigo)
  });

  // Borrar o cargar un ejemplo sustituye el código: durante un rato se puede volver atrás.
  // El aviso está siempre en la página (role="status"): así el lector de pantalla lee cada cambio
  const aviso = cont.querySelector("[data-aviso]");
  const bDeshacer = cont.querySelector("[data-deshacer]");
  function mostrarAviso(texto) {
    aviso.textContent = texto;
    bDeshacer.hidden = !texto;
  }
  let anterior = null;
  let temporizador = null;
  function sustituir(codigo, mensaje) {
    anterior = editor.obtener();
    editor.fijar(Object.assign({}, VACIO, codigo));
    PROGRESO.guardarBorrador(CLAVE, editor.obtener());
    mostrarAviso(mensaje + T(" Puedes deshacerlo durante 15 segundos."));
    clearTimeout(temporizador);
    temporizador = setTimeout(() => { mostrarAviso(""); anterior = null; }, 15000);
  }
  bDeshacer.addEventListener("click", () => {
    if (!anterior) return;
    editor.fijar(anterior);
    PROGRESO.guardarBorrador(CLAVE, anterior);
    anterior = null;
    mostrarAviso(T("Hecho: has recuperado el código."));
    // El botón desaparece: el foco pasa al editor para no quedarse en la nada
    editor.enfocar();
  });
  cont.querySelector("[data-borrar]").addEventListener("click", () => sustituir(VACIO, T("Has borrado el código.")));
  const selector = cont.querySelector("[data-ejemplo]");
  selector.addEventListener("change", () => {
    const e = EJEMPLOS[selector.value];
    if (e) sustituir(e.codigo, T("Has cargado «{nombre}».", { nombre: e.nombre }));
    selector.value = "";
  });

  // Lo que va en el .zip: una página completa que enlaza su hoja y su script, como una web de verdad
  function archivos() {
    const c = editor.obtener();
    let html = c.html || "";
    const enlaceCSS = '<link rel="stylesheet" href="estilos.css">';
    const enlaceJS = '<script src="script.js"></script>';
    if (!/<html[\s>]/i.test(html)) {
      html = "<!DOCTYPE html>\n<html lang=\"" + IDIOMA.actual + "\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
        "  <title>" + T("Mi práctica") + "</title>\n  " + enlaceCSS + "\n</head>\n<body>\n" + html + "\n\n  " + enlaceJS + "\n</body>\n</html>\n";
    } else {
      // Si ya es una página completa, solo se le añaden los enlaces que falten
      if (!/estilos\.css/.test(html)) html = /<\/head>/i.test(html) ? html.replace(/<\/head>/i, "  " + enlaceCSS + "\n</head>") : enlaceCSS + "\n" + html;
      if (!/script\.js/.test(html)) html = /<\/body>/i.test(html) ? html.replace(/<\/body>/i, "  " + enlaceJS + "\n</body>") : html + "\n" + enlaceJS;
    }
    return [
      { nombre: "mi-practica/index.html", datos: html },
      { nombre: "mi-practica/estilos.css", datos: c.css || "" },
      { nombre: "mi-practica/script.js", datos: c.js || "" }
    ];
  }

  cont.querySelector("[data-descargar]").addEventListener("click", () => {
    const blob = new Blob([ZIP.crear(archivos())], { type: "application/zip" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "mi-practica.zip";
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    CELEBRAR.toast(T("📦 Descargando mi-practica.zip"));
  });

  window.LABORATORIO = { archivos, editor };
})();
