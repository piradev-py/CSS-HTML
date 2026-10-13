/* ============================================================
   <CSS-HTML> · Editor en vivo
   Pestañas HTML / CSS / JS con colores + resultado en un <iframe>.
   Uso: EDITOR.crear(contenedor, { pestanas, inicial, codigo, alCambiar })
   ============================================================ */
(function () {
  const NOMBRES = { html: "HTML", css: "CSS", js: "JS" };
  const ICONOS = { html: "🏗️", css: "🎨", js: "⚡" };

  /*
   * Ayudante que se inyecta (como texto) al principio de cada resultado:
   * - Captura console.log/info/warn/error y los errores, con formato legible
   *   y el número de línea del código del alumno.
   * - Evita que enlaces o formularios saquen al alumno de la práctica.
   * - alert/prompt/confirm no bloquean: se avisan en la consola.
   * - localStorage y sessionStorage son de práctica: viven en el <iframe>
   *   (sobreviven a "recargar" el resultado, no tocan los datos del curso).
   * - fetch("datos/archivo.json") se responde con los datos que registran
   *   las lecciones (CURSO.registrar({ datos })), sin internet.
   * Debe ser autosuficiente: se convierte en texto con toString().
   */
  function AYUDANTE() {
    let marco = null;
    try { marco = window.frameElement; } catch (e) { /* sin acceso al marco */ }
    const enviar = (tipo, texto, extra) => {
      try { parent.postMessage({ csshtml: tipo, texto, extra }, "*"); } catch (e) { /* sin padre */ }
    };
    window.__logs = [];
    window.__errores = [];
    window.__pendientes = 0;

    /* ---- Consola ---- */
    function formatear(v, dentro, vistos) {
      if (typeof v === "string") return dentro ? '"' + v + '"' : v;
      if (v === null || v === undefined || typeof v === "number" || typeof v === "boolean") return String(v);
      if (typeof v === "function") return "ƒ " + (v.name || "anónima") + "()";
      if (typeof v !== "object") return String(v);
      if (v instanceof Error) return v.name + ": " + v.message;
      if (v.__csshtmlRespuesta) return "Response { status: " + v.status + ", ok: " + v.ok + ", url: \"" + v.url + "\" }";
      if (v instanceof Promise) return "Promise { … }";
      if (v.nodeType === 1) {
        const atr = (v.id ? ' id="' + v.id + '"' : "") + (v.className && typeof v.className === "string" ? ' class="' + v.className + '"' : "");
        const etq = v.tagName.toLowerCase();
        if (dentro) return "<" + etq + atr + ">";
        const txt = (v.textContent || "").replace(/\s+/g, " ").trim();
        return "<" + etq + atr + ">" + (txt.length > 40 ? txt.slice(0, 40) + "…" : txt) + "</" + etq + ">";
      }
      if (v.nodeType === 9) return "#document";
      vistos = vistos || [];
      if (vistos.includes(v)) return "[…]";
      vistos = vistos.concat([v]);
      if (Array.isArray(v) || v instanceof NodeList || v instanceof HTMLCollection) {
        const lista = Array.from(v);
        const partes = lista.slice(0, 30).map(x => formatear(x, true, vistos));
        if (lista.length > 30) partes.push("…");
        const prefijo = Array.isArray(v) ? "" : v.constructor.name + "(" + lista.length + ") ";
        return prefijo + "[" + partes.join(", ") + "]";
      }
      if (vistos.length > 4) return "{…}";
      const claves = Object.keys(v);
      if (!claves.length) return "{}";
      return "{ " + claves.slice(0, 30).map(k => k + ": " + formatear(v[k], true, vistos)).join(", ") + (claves.length > 30 ? ", …" : "") + " }";
    }
    ["log", "info", "warn", "error"].forEach(k => {
      const original = console[k];
      console[k] = function () {
        const texto = Array.from(arguments).map(x => formatear(x, false)).join(" ");
        window.__logs.push(texto);
        enviar(k === "error" ? "error" : k === "warn" ? "aviso" : "log", texto);
        original.apply(console, arguments);
      };
    });
    console.clear = () => enviar("limpiar", "");

    /* ---- Errores (con la línea del código del alumno) ---- */
    function lineaAlumno(n) {
      const s = document.querySelector("script[data-csshtml=alumno]");
      const base = s ? Number(s.getAttribute("data-linea")) : 0;
      return base && n >= base ? n - base + 1 : 0;
    }
    window.addEventListener("error", e => {
      const msg = String(e.message || "Error").replace(/^Uncaught /, "");
      const linea = lineaAlumno(e.lineno);
      window.__errores.push({ mensaje: msg, linea });
      enviar("error", msg, linea);
    });
    window.addEventListener("unhandledrejection", e => {
      const r = e.reason;
      const msg = r && r.message ? (r.name ? r.name + ": " : "") + r.message : String(r);
      window.__errores.push({ mensaje: msg, linea: 0 });
      enviar("error", msg, 0);
    });

    /* ---- Ventanas que bloquearían la página ---- */
    window.alert = m => enviar("aviso", "🔔 alert: " + (m === undefined ? "" : formatear(m, false)));
    window.confirm = m => { enviar("aviso", "🔔 confirm: " + (m === undefined ? "" : m) + " (en las prácticas responde «Aceptar»)"); return true; };
    window.prompt = m => { enviar("aviso", "🔔 prompt: " + (m === undefined ? "" : m) + " (en las prácticas no se puede escribir: devuelve null)"); return null; };

    /* ---- localStorage / sessionStorage de práctica ---- */
    function crearAlmacen(clave, avisar) {
      const datos = marco ? (marco[clave] = marco[clave] || {}) : {};
      const tiene = k => Object.prototype.hasOwnProperty.call(datos, k);
      const api = {
        getItem: k => (tiene(String(k)) ? datos[String(k)] : null),
        setItem: (k, v) => { datos[String(k)] = String(v); avisar(); },
        removeItem: k => { delete datos[String(k)]; avisar(); },
        clear: () => { Object.keys(datos).forEach(k => delete datos[k]); avisar(); },
        key: i => Object.keys(datos)[i] ?? null
      };
      Object.defineProperty(api, "length", { get: () => Object.keys(datos).length });
      return { api, datos };
    }
    const local = crearAlmacen("__almacen", () => enviar("almacen", String(Object.keys(local.datos).length)));
    const sesion = crearAlmacen("__almacenSesion", () => {});
    try {
      Object.defineProperty(window, "localStorage", { value: local.api, configurable: true });
      Object.defineProperty(window, "sessionStorage", { value: sesion.api, configurable: true });
    } catch (e) { /* navegador que no deja sustituirlo */ }
    enviar("almacen", String(Object.keys(local.datos).length));

    /* ---- fetch: "datos/archivo.json" se sirve sin internet ---- */
    const fetchReal = window.fetch;
    window.fetch = function (recurso) {
      const url = typeof recurso === "string" ? recurso : (recurso && recurso.url) || String(recurso);
      const m = url.match(/^(?:\.?\/)?datos\/([\w.-]+)$/);
      window.__pendientes++;
      const fin = () => { window.__pendientes--; };
      if (!m) {
        const p = fetchReal ? fetchReal.apply(window, arguments) : Promise.reject(new TypeError("Failed to fetch"));
        p.then(fin, fin);
        return p;
      }
      let tabla = {};
      try { tabla = parent.__csshtmlDatos || {}; } catch (e) { /* sin padre */ }
      const existe = Object.prototype.hasOwnProperty.call(tabla, m[1]);
      const texto = !existe ? "Not Found" : typeof tabla[m[1]] === "string" ? tabla[m[1]] : JSON.stringify(tabla[m[1]]);
      const respuesta = {
        __csshtmlRespuesta: true,
        ok: existe,
        status: existe ? 200 : 404,
        statusText: existe ? "OK" : "Not Found",
        url,
        json: () => { try { return Promise.resolve(JSON.parse(texto)); } catch (e) { return Promise.reject(new SyntaxError("El contenido de " + url + " no es JSON válido")); } },
        text: () => Promise.resolve(texto)
      };
      // Un pequeño retraso para que se note que "pedir y esperar" lleva tiempo
      return new Promise(resolver => setTimeout(() => { fin(); resolver(respuesta); }, 300));
    };

    /* ---- Enlaces y formularios no salen de la práctica ---- */
    document.addEventListener("click", e => {
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a || a.getAttribute("href").charAt(0) === "#") return;
      e.preventDefault();
      enviar("enlace", a.href);
    });
    document.addEventListener("submit", e => {
      // Si el código del alumno ya lo ha frenado (preventDefault), no se avisa de ningún envío
      if (!e.defaultPrevented) enviar("formulario", "");
      e.preventDefault();
    });
  }

  const SCRIPT_AYUDANTE = '<script data-csshtml="ayudante">(' + AYUDANTE.toString() + ")();<\/script>";
  const MARCA_ALUMNO = '<script data-csshtml="alumno">';

  /** Construye el documento completo a partir del código del alumno. */
  function construirDocumento(codigo) {
    const html = codigo.html || "";
    const css = codigo.css ? "<style>\n" + codigo.css + "\n</style>" : "";
    const js = codigo.js ? MARCA_ALUMNO + "\n" + codigo.js + "\n<\/script>" : "";
    // Sin <meta charset>: srcdoc ya es texto Unicode, y así no "regalamos" esa etiqueta en los retos de estructura
    const cabeza = SCRIPT_AYUDANTE + css;
    let doc;

    // Si el alumno escribió la página completa (<html>…), respetamos su estructura.
    if (/<html[\s>]/i.test(html)) {
      doc = html;
      if (/<head[^>]*>/i.test(doc)) doc = doc.replace(/<head[^>]*>/i, m => m + cabeza);
      else doc = doc.replace(/<html[^>]*>/i, m => m + "<head>" + cabeza + "</head>");
      if (/<\/body>/i.test(doc)) doc = doc.replace(/<\/body>/i, () => js + "</body>");
      else doc += js;
    } else {
      doc = "<!DOCTYPE html><html><head>" + cabeza + "</head><body>\n" + html + "\n" + js + "</body></html>";
    }
    // Línea del documento donde empieza el código JS del alumno: así los errores dicen "línea 3" de SU código
    const i = js ? doc.lastIndexOf(MARCA_ALUMNO) : -1;
    if (i >= 0) {
      const linea = doc.slice(0, i).split("\n").length + 1;
      doc = doc.slice(0, i) + '<script data-csshtml="alumno" data-linea="' + linea + '">' + doc.slice(i + MARCA_ALUMNO.length);
    }
    return doc;
  }

  /** Añade un CSS decorativo oculto (cssBase) delante del CSS del alumno: se aplica pero no se ve en el editor. */
  function conBase(codigo, cssBase) {
    if (!cssBase) return codigo;
    return Object.assign({}, codigo, { css: cssBase + "\n" + (codigo.css || "") });
  }

  /** Traduce errores típicos de JavaScript a algo que un novato entiende. */
  function errorAmigable(msg, linea) {
    msg = String(msg || "").replace(/^Uncaught /, "");
    const donde = linea ? "(línea " + linea + ") " : "";
    let m;
    let t;
    if ((m = msg.match(/(\w+) is not defined/))) t = "🤔 Usas «" + m[1] + "» pero no existe. ¿Está bien escrito? Recuerda que mayúsculas y minúsculas cuentan.";
    else if (/Cannot (read|set) propert(y|ies) of (null|undefined)/.test(msg)) t = "🔍 Intentas usar un elemento que no se encontró. Revisa el selector de querySelector.";
    else if (/is not a function/.test(msg)) t = "🧩 Algo que llamas con () no es una función. ¿Está bien escrito su nombre?";
    else if (/is not iterable/.test(msg)) t = "🔁 Intentas recorrer con for…of algo que no es una lista (array).";
    else if (/has already been declared/.test(msg)) t = "♻️ Ya creaste una variable con ese nombre. Créala una sola vez (con let o const) y después úsala sin repetir let.";
    else if (/before initialization/.test(msg)) t = "⏳ Usas una variable antes de crearla. Pon la línea con let o const más arriba.";
    else if (/Assignment to constant/.test(msg)) t = "🔒 No puedes cambiar una variable creada con const. Usa let si va a cambiar.";
    else if (/JSON/.test(msg)) t = "📦 Lo que intentas leer no es JSON válido. " + msg;
    else if (/Failed to fetch|NetworkError/.test(msg)) t = "🌐 No se pudo conectar con esa dirección. ¿Está bien escrita? ¿Tienes internet?";
    else if (/await is only valid/.test(msg)) t = "⏳ Solo puedes usar await dentro de una función async.";
    else if (/Unexpected (token|end|identifier|string|number)|missing|Invalid or unexpected|Unterminated/.test(msg)) t = "✏️ Hay un error de escritura: falta o sobra un paréntesis, una llave, una coma o unas comillas.";
    else t = "⚠️ " + msg;
    return donde + t;
  }

  function insertarTexto(textarea, texto) {
    textarea.focus();
    // execCommand conserva el historial de deshacer (Ctrl+Z)
    if (!document.execCommand || !document.execCommand("insertText", false, texto)) {
      textarea.setRangeText(texto, textarea.selectionStart, textarea.selectionEnd, "end");
      textarea.dispatchEvent(new Event("input"));
    }
  }

  /**
   * Botones 💻/📱 y medida en px del resultado, para las lecciones de responsive.
   * Se añaden a la barra de un panel de resultado que contiene un iframe.resultado.
   */
  function anadirDispositivos(panel) {
    const barra = panel.querySelector(".barra-panel");
    const iframe = panel.querySelector("iframe.resultado");
    const caja = document.createElement("span");
    caja.className = "dispositivos";
    caja.innerHTML =
      '<span class="medida-resultado" title="Ancho del resultado"></span>' +
      '<button class="mini-boton activo" data-movil="0" title="Usar todo el ancho del panel (arrastra los separadores para cambiarlo)">💻 Libre</button>' +
      '<button class="mini-boton" data-movil="1" title="Ver el resultado con el ancho de un móvil (375 px)">📱 Móvil</button>';
    barra.appendChild(caja);
    const medida = caja.querySelector(".medida-resultado");
    const medir = () => { medida.textContent = Math.round(iframe.getBoundingClientRect().width) + " px"; };
    caja.querySelectorAll("[data-movil]").forEach(b => b.addEventListener("click", () => {
      panel.classList.toggle("modo-movil", b.dataset.movil === "1");
      caja.querySelectorAll("[data-movil]").forEach(x => x.classList.toggle("activo", x === b));
      medir();
    }));
    if (window.ResizeObserver) new ResizeObserver(medir).observe(iframe);
    medir();
  }

  /**
   * Panel de resultado: <iframe> y, si hay JS, consola y botón «Recargar».
   * opciones: { consola, soloConsola (sin HTML: la consola ocupa todo), titulo }
   * Devuelve { panel, iframe, mostrar(codigo), borrarDatos() }.
   */
  function crearResultado(opciones = {}) {
    const conConsola = !!(opciones.consola || opciones.soloConsola);
    const panel = document.createElement("div");
    panel.className = "panel panel-resultado" + (opciones.soloConsola ? " solo-consola" : "");
    panel.innerHTML =
      '<div class="barra-panel"><span class="titulo-panel">' + (opciones.titulo || "👀 Resultado") + "</span>" +
      '<span class="aviso-resultado" aria-live="polite"></span>' +
      (conConsola ? '<button class="mini-boton" data-recargar title="Vuelve a ejecutar tu código, como si recargaras la página">🔄 Recargar</button>' : "") +
      "</div>" +
      '<iframe class="resultado" title="Resultado de tu código"></iframe>' +
      (conConsola
        ? '<div class="consola"><div class="consola-titulo"><span>🖥️ Consola</span>' +
          '<span class="consola-almacen" hidden title="Datos guardados con localStorage en esta práctica">💾 <b></b> ' +
          '<button class="mini-boton" data-borrar-datos>Borrar</button></span></div>' +
          '<div class="consola-lineas" aria-live="polite" data-vacia="Aquí aparecerá lo que muestres con console.log()"></div></div>'
        : "");
    const iframe = panel.querySelector("iframe");
    const aviso = panel.querySelector(".aviso-resultado");
    const consola = panel.querySelector(".consola-lineas");
    const almacen = panel.querySelector(".consola-almacen");
    let ultimo = { html: "", css: "", js: "" };

    function mostrar(codigo) {
      ultimo = codigo;
      if (consola) consola.innerHTML = "";
      aviso.textContent = "";
      iframe.srcdoc = construirDocumento(codigo);
    }

    /** Vacía el localStorage de práctica de este resultado. */
    function borrarDatos() {
      ["__almacen", "__almacenSesion"].forEach(k => {
        const d = iframe[k];
        if (d) Object.keys(d).forEach(x => delete d[x]);
      });
      if (almacen) almacen.hidden = true;
    }

    if (conConsola) {
      panel.querySelector("[data-recargar]").addEventListener("click", () => mostrar(ultimo));
      panel.querySelector("[data-borrar-datos]").addEventListener("click", () => { borrarDatos(); mostrar(ultimo); });
    }

    window.addEventListener("message", e => {
      if (e.source !== iframe.contentWindow || !e.data || !e.data.csshtml) return;
      const d = e.data;
      if (d.csshtml === "enlace") {
        aviso.textContent = "🔗 Enlace a: " + d.texto + " (en las prácticas no salimos de la página)";
      } else if (d.csshtml === "formulario") {
        aviso.textContent = "📨 ¡Formulario enviado! (en las prácticas no se envía a ningún sitio)";
      } else if (d.csshtml === "almacen") {
        if (!almacen) return;
        const n = Number(d.texto) || 0;
        almacen.hidden = n === 0;
        almacen.querySelector("b").textContent = n === 1 ? "1 dato guardado" : n + " datos guardados";
      } else if (d.csshtml === "limpiar") {
        if (consola) consola.innerHTML = "";
      } else if (consola) {
        const linea = document.createElement("div");
        linea.className = "consola-linea " + d.csshtml;
        linea.textContent = d.csshtml === "error" ? errorAmigable(d.texto, d.extra) : "› " + d.texto;
        consola.appendChild(linea);
        consola.parentNode.scrollTop = consola.parentNode.scrollHeight;
      }
    });

    return { panel, iframe, mostrar, borrarDatos };
  }

  function crear(contenedor, opciones) {
    const pestanas = opciones.pestanas || ["html"];
    const inicial = Object.assign({ html: "", css: "", js: "" }, opciones.inicial);
    const codigo = Object.assign({}, inicial, opciones.codigo || {});
    let activa = pestanas.includes(opciones.pestanaActiva) ? opciones.pestanaActiva : pestanas[0];
    let temporizador = null;

    const raiz = document.createElement("div");
    raiz.className = "editor-vivo";
    raiz.innerHTML =
      '<div class="panel panel-codigo">' +
        '<div class="barra-panel">' +
          '<div class="pestanas" role="tablist">' +
            pestanas.map(p =>
              '<button role="tab" class="pestana pestana-' + p + '" data-pestana="' + p + '">' +
              ICONOS[p] + " " + NOMBRES[p] + "</button>").join("") +
          "</div>" +
          '<button class="mini-boton" data-reiniciar title="Volver al código del principio">↺ Reiniciar</button>' +
        "</div>" +
        '<div class="area-codigo">' +
          '<div class="numeros" aria-hidden="true"></div>' +
          '<pre class="capa-resaltado" aria-hidden="true"><code></code></pre>' +
          '<textarea spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Editor de código"></textarea>' +
        "</div>" +
      "</div>";
    const resultado = crearResultado({ consola: pestanas.includes("js"), soloConsola: !pestanas.includes("html") });
    raiz.appendChild(resultado.panel);
    const textarea = raiz.querySelector("textarea");
    const capa = raiz.querySelector(".capa-resaltado");
    const capaCode = capa.querySelector("code");
    const numeros = raiz.querySelector(".numeros");
    const iframe = resultado.iframe;
    const botonesPestana = [...raiz.querySelectorAll(".pestana")];
    const bReiniciar = raiz.querySelector("[data-reiniciar]");
    const panelCodigo = raiz.querySelector(".panel-codigo");
    const panelResultado = resultado.panel;

    // Con "destinos", el código y el resultado van cada uno a su columna del espacio de trabajo
    if (opciones.destinos) {
      opciones.destinos.codigo.appendChild(panelCodigo);
      opciones.destinos.resultado.appendChild(panelResultado);
    } else {
      contenedor.appendChild(raiz);
    }
    if (opciones.dispositivos) anadirDispositivos(panelResultado);

    function pintarResaltado() {
      const texto = textarea.value;
      capaCode.innerHTML = UI.resaltar(texto, activa) + "\n ";
      const lineas = texto.split("\n").length;
      let n = "";
      for (let i = 1; i <= lineas; i++) n += i + "\n";
      numeros.textContent = n;
      sincronizarScroll();
    }

    function sincronizarScroll() {
      capa.scrollTop = textarea.scrollTop;
      capa.scrollLeft = textarea.scrollLeft;
      numeros.style.transform = "translateY(" + -textarea.scrollTop + "px)";
    }

    function cambiarPestana(p) {
      activa = p;
      textarea.value = codigo[p] || "";
      botonesPestana.forEach(b => {
        const sel = b.dataset.pestana === p;
        b.classList.toggle("activa", sel);
        b.setAttribute("aria-selected", sel);
      });
      panelCodigo.dataset.lenguaje = p;
      textarea.scrollTop = 0;
      pintarResaltado();
    }

    function refrescar() {
      resultado.mostrar(conBase(codigo, opciones.cssBase));
    }

    function programarRefresco() {
      clearTimeout(temporizador);
      temporizador = setTimeout(() => {
        refrescar();
        if (opciones.alCambiar) opciones.alCambiar(obtener());
      }, 350);
    }

    function obtener() {
      return { html: codigo.html, css: codigo.css, js: codigo.js };
    }

    function fijar(nuevo) {
      Object.assign(codigo, { html: "", css: "", js: "" }, nuevo);
      cambiarPestana(activa);
      programarRefresco();
    }

    /* --- Eventos --- */
    textarea.addEventListener("input", () => {
      codigo[activa] = textarea.value;
      pintarResaltado();
      programarRefresco();
    });
    textarea.addEventListener("scroll", sincronizarScroll);

    textarea.addEventListener("keydown", e => {
      if (e.key === "Tab" && !e.shiftKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        insertarTexto(textarea, "  ");
      } else if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
        // Mantiene la sangría de la línea actual (y la aumenta tras "{" o una etiqueta abierta)
        const antes = textarea.value.slice(0, textarea.selectionStart);
        const linea = antes.slice(antes.lastIndexOf("\n") + 1);
        let sangria = linea.match(/^\s*/)[0];
        if (/\{\s*$/.test(linea) || /<([a-zA-Z][\w-]*)(\s[^>]*)?>\s*$/.test(linea) && !/<(br|img|input|meta|link|hr)\b/i.test(linea.slice(linea.lastIndexOf("<")))) {
          sangria += "  ";
        }
        e.preventDefault();
        insertarTexto(textarea, "\n" + sangria);
      }
    });

    botonesPestana.forEach(b =>
      b.addEventListener("click", () => cambiarPestana(b.dataset.pestana)));

    bReiniciar.addEventListener("click", () => {
      if (!confirm("¿Volver al código del principio? Perderás lo que has escrito aquí.")) return;
      resultado.borrarDatos();
      fijar(inicial);
    });

    cambiarPestana(activa);
    refrescar();

    return { raiz, iframe, obtener, fijar, refrescar, enfocar: () => textarea.focus() };
  }

  window.EDITOR = { crear, crearResultado, construirDocumento, conBase, errorAmigable, anadirDispositivos };
})();
