/* ============================================================
   <CSS-HTML> · Utilidades de interfaz compartidas
   - escapar / mini-markdown
   - resaltado de código HTML, CSS y JS
   - cabecera (XP, nivel, racha), tema, sonido y ajustes
   ============================================================ */
(function () {
  function escapar(texto) {
    return String(texto)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /** Mini-markdown seguro: **negrita**, `código` y saltos de línea. */
  function md(texto) {
    if (!texto) return "";
    return escapar(texto)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  }

  /* ---------- Resaltado de código ---------- */
  const span = (clase, texto) => '<span class="t-' + clase + '">' + escapar(texto) + "</span>";

  function resaltarHTML(codigo) {
    let salida = "";
    const re = /(<!--[\s\S]*?(?:-->|$))|(<\/?)([a-zA-Z][\w-]*|!DOCTYPE|!doctype)([^>]*)(>?)/g;
    let ultimo = 0;
    let m;
    while ((m = re.exec(codigo))) {
      salida += escapar(codigo.slice(ultimo, m.index));
      if (m[1]) {
        salida += span("comentario", m[1]);
      } else {
        salida += span("signo", m[2]) + span("etiqueta", m[3]);
        salida += m[4].replace(/([^\s=]+)(\s*=\s*)?("[^"]*"?|'[^']*'?)?|(\s+)/g, (todo, nombre, igual, valor, esp) => {
          if (esp) return esp;
          return span("atributo", nombre) + (igual ? span("signo", igual) : "") + (valor ? span("valor", valor) : "");
        });
        salida += m[5] ? span("signo", m[5]) : "";
      }
      ultimo = re.lastIndex;
      // Dentro de <style> y <script> resaltamos su lenguaje
      if (m[2] === "<" && /^(style|script)$/i.test(m[3] || "") && m[5]) {
        const cierre = new RegExp("</" + m[3] + "\\s*>", "i");
        const resto = codigo.slice(ultimo);
        const fin = resto.search(cierre);
        const interior = fin === -1 ? resto : resto.slice(0, fin);
        salida += /style/i.test(m[3]) ? resaltarCSS(interior) : resaltarJS(interior);
        ultimo += interior.length;
        re.lastIndex = ultimo;
      }
    }
    return salida + escapar(codigo.slice(ultimo));
  }

  function resaltarCSS(codigo) {
    let salida = "";
    const re = /(\/\*[\s\S]*?(?:\*\/|$))|([^{}]+)(\{)|([\w-]+)(\s*:)([^;{}]*)(;?)|(\})|("[^"]*"|'[^']*')/g;
    let ultimo = 0;
    let m;
    while ((m = re.exec(codigo))) {
      salida += escapar(codigo.slice(ultimo, m.index));
      if (m[1]) salida += span("comentario", m[1]);
      else if (m[3]) {
        const sel = m[2];
        const lider = sel.match(/^\s*/)[0];
        salida += escapar(lider) + span("selector", sel.slice(lider.length)) + span("signo", "{");
      } else if (m[4]) {
        salida += span("propiedad", m[4]) + span("signo", m[5]) + resaltarValorCSS(m[6]) + (m[7] ? span("signo", m[7]) : "");
      } else if (m[8]) salida += span("signo", "}");
      else if (m[9]) salida += span("cadena", m[9]);
      ultimo = re.lastIndex;
    }
    return salida + escapar(codigo.slice(ultimo));
  }

  function resaltarValorCSS(valor) {
    return escapar(valor).replace(/(#[0-9a-fA-F]{3,8}\b)|(-?\d*\.?\d+)(px|rem|em|%|vh|vw|s|ms|deg|fr)?/g, (t, hex, num, uni) => {
      if (hex) return '<span class="t-numero">' + hex + "</span>";
      return '<span class="t-numero">' + num + (uni || "") + "</span>";
    });
  }

  const PALABRAS_JS = /^(const|let|var|function|return|if|else|for|while|of|in|new|true|false|null|undefined|async|await|class|this|try|catch|break|continue|switch|case|default|typeof)$/;

  function resaltarJS(codigo) {
    let salida = "";
    const re = /(\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$))|(`(?:\\[\s\S]|[^`])*`?|"(?:\\.|[^"\n])*"?|'(?:\\.|[^'\n])*'?)|\b(\d+\.?\d*)\b|([A-Za-z_$][\w$]*)/g;
    let ultimo = 0;
    let m;
    while ((m = re.exec(codigo))) {
      salida += escapar(codigo.slice(ultimo, m.index));
      if (m[1]) salida += span("comentario", m[1]);
      else if (m[2]) salida += span("cadena", m[2]);
      else if (m[3]) salida += span("numero", m[3]);
      else if (m[4]) {
        if (PALABRAS_JS.test(m[4])) salida += span("palabra", m[4]);
        else if (codigo[re.lastIndex] === "(") salida += span("propiedad", m[4]);
        else salida += escapar(m[4]);
      }
      ultimo = re.lastIndex;
    }
    return salida + escapar(codigo.slice(ultimo));
  }

  function resaltar(codigo, lenguaje) {
    if (lenguaje === "css") return resaltarCSS(codigo);
    if (lenguaje === "js") return resaltarJS(codigo);
    return resaltarHTML(codigo);
  }

  /* ---------- Tema claro / oscuro ---------- */
  function aplicarTema() {
    const tema = window.PROGRESO ? PROGRESO.ajuste("tema") : "auto";
    if (tema === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", tema);
  }

  function temaEfectivo() {
    const t = PROGRESO.ajuste("tema");
    if (t !== "auto") return t;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  /* ---------- Cabecera ---------- */
  const LOGO =
    '<a class="logo" href="index.html" aria-label="' + T("&lt;CSS-HTML&gt;, ir al inicio") + '">' +
    '<img class="logo-tagui" src="recursos/marca/tagui-logo-160.png" alt="" width="52" height="52">' +
    '<span class="ang">&lt;</span><span class="css">CSS</span><span class="guion">-</span>' +
    '<span class="html">HTML</span><span class="ang">&gt;</span></a>';

  function pintarEstado() {
    const cont = document.querySelector("[data-estado-jugador]");
    if (!cont) return;
    const n = PROGRESO.nivel();
    const r = PROGRESO.racha();
    cont.innerHTML =
      '<span class="chip racha' + (r.activaHoy ? "" : " apagada") + '" title="' + T("Días seguidos practicando") + '">🔥 ' + r.dias + "</span>" +
      '<span class="chip ocultar-movil" title="' + T("Estrellas conseguidas") + '">⭐ ' + PROGRESO.totalEstrellas() + "</span>" +
      '<div class="barra-xp" title="' + T("{n} XP", { n: n.xp }) + (n.siguiente ? T(" · siguiente nivel a {n} XP", { n: n.siguiente.min }) : "") + '">' +
      '<span class="nivel">' + n.emoji + " " + T("Nv {n}", { n: n.numero }) + " · " + n.nombre + "</span>" +
      '<div class="pista" role="progressbar" aria-label="' + T("Experiencia") + '" aria-valuenow="' + n.porcentaje + '" aria-valuemin="0" aria-valuemax="100">' +
      '<div class="relleno"></div></div></div>';
    requestAnimationFrame(() => {
      const relleno = cont.querySelector(".relleno");
      if (relleno) relleno.style.width = n.porcentaje + "%";
    });
  }

  function botonTema() {
    return temaEfectivo() === "dark" ? "☀️" : "🌙";
  }

  function montarCabecera(extraIzquierda = "") {
    const cab = document.querySelector(".cabecera");
    if (!cab) return;
    // El icono de siempre para «traducir» (文A), para que el botón de idioma se vea a la primera
    const ICONO_IDIOMA = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor"><path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>';
    cab.innerHTML =
      extraIzquierda + LOGO +
      '<span class="espacio"></span>' +
      '<div class="estado-jugador" data-estado-jugador></div>' +
      (!IDIOMA.disponible ? ""
        : IDIOMA.actual === "en"
        ? '<button class="boton-icono boton-idioma" data-accion="idioma" lang="es" aria-label="Cambiar a español" title="Cambiar a español">' + ICONO_IDIOMA + "ES</button>"
        : '<button class="boton-icono boton-idioma" data-accion="idioma" lang="en" aria-label="Switch to English" title="Switch to English">' + ICONO_IDIOMA + "EN</button>") +
      '<button class="boton-icono ocultar-movil" data-accion="sonido" aria-label="' + T("Activar o silenciar sonido") + '"></button>' +
      '<button class="boton-icono" data-accion="tema" aria-label="' + T("Cambiar modo claro u oscuro") + '"></button>' +
      '<button class="boton-icono" data-accion="sugerencias" aria-label="' + T("Enviar una sugerencia o avisar de un error") + '" title="' + T("Sugerencias y errores") + '">💬</button>' +
      '<button class="boton-icono" data-accion="ajustes" aria-label="' + T("Ajustes") + '">⚙️</button>';
    const bSonido = cab.querySelector('[data-accion="sonido"]');
    const bTema = cab.querySelector('[data-accion="tema"]');
    const refrescar = () => {
      bSonido.textContent = PROGRESO.ajuste("sonido") ? "🔊" : "🔇";
      bTema.textContent = botonTema();
    };
    bSonido.addEventListener("click", () => {
      PROGRESO.cambiarAjuste("sonido", !PROGRESO.ajuste("sonido"));
      refrescar();
      CELEBRAR.sonido.click();
    });
    bTema.addEventListener("click", () => {
      PROGRESO.cambiarAjuste("tema", temaEfectivo() === "dark" ? "light" : "dark");
      aplicarTema();
      refrescar();
    });
    cab.querySelector('[data-accion="idioma"]')?.addEventListener("click", () => IDIOMA.cambiar(IDIOMA.actual === "en" ? "es" : "en"));
    cab.querySelector('[data-accion="ajustes"]').addEventListener("click", abrirAjustes);
    cab.querySelector('[data-accion="sugerencias"]').addEventListener("click", () => SUGERENCIAS.abrir());
    refrescar();
    pintarEstado();
    pintarFranjaPrueba(cab);
  }

  /* ---------- Modo prueba y reinicio del curso ---------- */
  function pintarFranjaPrueba(cab) {
    if (!PROGRESO.enPrueba() || document.querySelector(".franja-prueba")) return;
    const franja = document.createElement("div");
    franja.className = "franja-prueba";
    franja.setAttribute("role", "status");
    franja.innerHTML =
      '<span>' + T("🧪 <b>Modo prueba</b>: todo está desbloqueado y nada se guarda en tu progreso real.") + '</span>' +
      '<span class="franja-botones">' +
      '<button class="mini-boton" data-prueba-reiniciar>' + T("↺ Empezar la prueba de cero") + '</button>' +
      '<button class="mini-boton" data-prueba-salir>' + T("Salir de la prueba") + '</button></span>';
    cab.after(franja);
    franja.querySelector("[data-prueba-reiniciar]").addEventListener("click", reiniciarCurso);
    franja.querySelector("[data-prueba-salir]").addEventListener("click", salirPrueba);
  }

  function entrarPrueba() {
    PROGRESO.entrarPrueba();
    location.href = "index.html";
  }

  function salirPrueba() {
    PROGRESO.salirPrueba();
    location.href = "index.html";
  }

  function reiniciarCurso() {
    const pregunta = PROGRESO.enPrueba()
      ? T("¿Empezar la prueba de cero? Solo se borra lo que has hecho en el modo prueba.")
      : T("¿Reiniciar el curso? Perderás tu XP, estrellas, insignias y racha. Esto no se puede deshacer.");
    if (!confirm(pregunta)) return;
    PROGRESO.reiniciar();
    location.href = "index.html";
  }

  function abrirAjustes() {
    const prueba = PROGRESO.enPrueba();
    const equipo = PROGRESO.pruebaDisponible();
    const m = CELEBRAR.modal(
      '<h2>' + T("⚙️ Ajustes") + '</h2>' +
      '<div class="lista-ajustes">' +
      '<label>' + T("🔊 Sonidos") + ' <input type="checkbox" data-ajuste="sonido"></label>' +
      (prueba || !equipo ? "" : '<label>' + T("🔓 Desbloquear todas las lecciones") + ' <input type="checkbox" data-ajuste="desbloquearTodo"></label>') +
      "</div>" +
      '<div class="acciones acciones-curso">' +
      (!equipo ? ""
        : prueba
        ? '<button class="boton secundario" data-salir-prueba>' + T("🚪 Salir del modo prueba") + '</button>'
        : '<button class="boton morado" data-entrar-prueba>' + T("🧪 Probar el curso sin guardar") + '</button>') +
      '<button class="boton secundario" data-reiniciar-curso>🔄 ' + (prueba ? T("Empezar la prueba de cero") : T("Reiniciar curso")) + "</button>" +
      "</div>" +
      '<div class="acciones"><button class="boton" data-cerrar>' + T("Listo") + '</button></div>' +
      '<p class="version-curso">' + T("Versión {n}", { n: CURSO.VERSION }) + '</p>',
      { alCerrar: () => location.reload() }
    );
    m.elemento.querySelectorAll("[data-ajuste]").forEach(chk => {
      chk.checked = !!PROGRESO.ajuste(chk.dataset.ajuste);
      chk.addEventListener("change", () => PROGRESO.cambiarAjuste(chk.dataset.ajuste, chk.checked));
    });
    const accion = (sel, fn) => { const b = m.elemento.querySelector(sel); if (b) b.addEventListener("click", fn); };
    accion("[data-entrar-prueba]", entrarPrueba);
    accion("[data-salir-prueba]", salirPrueba);
    accion("[data-reiniciar-curso]", reiniciarCurso);
  }

  aplicarTema();

  window.UI = { escapar, md, resaltar, montarCabecera, pintarEstado, aplicarTema, entrarPrueba, salirPrueba, reiniciarCurso };
})();
