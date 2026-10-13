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
    '<a class="logo" href="index.html" aria-label="&lt;CSS-HTML&gt;, ir al inicio">' +
    '<span class="ang">&lt;</span><span class="css">CSS</span><span class="guion">-</span>' +
    '<span class="html">HTML</span><span class="ang">&gt;</span></a>';

  function pintarEstado() {
    const cont = document.querySelector("[data-estado-jugador]");
    if (!cont) return;
    const n = PROGRESO.nivel();
    const r = PROGRESO.racha();
    cont.innerHTML =
      '<span class="chip racha' + (r.activaHoy ? "" : " apagada") + '" title="Días seguidos practicando">🔥 ' + r.dias + "</span>" +
      '<span class="chip ocultar-movil" title="Estrellas conseguidas">⭐ ' + PROGRESO.totalEstrellas() + "</span>" +
      '<div class="barra-xp" title="' + n.xp + " XP" + (n.siguiente ? " · siguiente nivel a " + n.siguiente.min + " XP" : "") + '">' +
      '<span class="nivel">' + n.emoji + " Nv " + n.numero + " · " + n.nombre + "</span>" +
      '<div class="pista" role="progressbar" aria-label="Experiencia" aria-valuenow="' + n.porcentaje + '" aria-valuemin="0" aria-valuemax="100">' +
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
    cab.innerHTML =
      extraIzquierda + LOGO +
      '<span class="espacio"></span>' +
      '<div class="estado-jugador" data-estado-jugador></div>' +
      '<button class="boton-icono ocultar-movil" data-accion="sonido" aria-label="Activar o silenciar sonido"></button>' +
      '<button class="boton-icono" data-accion="tema" aria-label="Cambiar modo claro u oscuro"></button>' +
      '<button class="boton-icono" data-accion="ajustes" aria-label="Ajustes">⚙️</button>';
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
    cab.querySelector('[data-accion="ajustes"]').addEventListener("click", abrirAjustes);
    refrescar();
    pintarEstado();
  }

  function abrirAjustes() {
    const m = CELEBRAR.modal(
      "<h2>⚙️ Ajustes</h2>" +
      '<div class="lista-ajustes">' +
      '<label>🔊 Sonidos <input type="checkbox" data-ajuste="sonido"></label>' +
      '<label>🔓 Desbloquear todas las lecciones <input type="checkbox" data-ajuste="desbloquearTodo"></label>' +
      "</div>" +
      '<div class="acciones">' +
      '<button class="boton secundario" data-borrar>🗑️ Borrar mi progreso</button>' +
      '<button class="boton" data-cerrar>Listo</button></div>',
      { alCerrar: () => location.reload() }
    );
    m.elemento.querySelectorAll("[data-ajuste]").forEach(chk => {
      chk.checked = !!PROGRESO.ajuste(chk.dataset.ajuste);
      chk.addEventListener("change", () => PROGRESO.cambiarAjuste(chk.dataset.ajuste, chk.checked));
    });
    m.elemento.querySelector("[data-borrar]").addEventListener("click", () => {
      if (confirm("¿Seguro? Perderás tu XP, estrellas e insignias. Esto no se puede deshacer.")) {
        PROGRESO.reiniciar();
        m.cerrar();
      }
    });
  }

  aplicarTema();

  window.UI = { escapar, md, resaltar, montarCabecera, pintarEstado, aplicarTema };
})();
