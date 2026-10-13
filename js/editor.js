/* ============================================================
   <CSS-HTML> · Editor en vivo
   Pestañas HTML / CSS / JS con colores + resultado en un <iframe>.
   Uso: EDITOR.crear(contenedor, { pestanas, inicial, codigo, alCambiar })
   ============================================================ */
(function () {
  const NOMBRES = { html: "HTML", css: "CSS", js: "JS" };
  const ICONOS = { html: "🏗️", css: "🎨", js: "⚡" };

  /* Script que se inyecta en el resultado: captura console.log y errores,
     y evita que enlaces o formularios saquen al alumno de la práctica. */
  const SCRIPT_AYUDANTE =
    "<script>(function(){window.__logs=[];var env=function(t,x){try{parent.postMessage({csshtml:t,texto:x},'*')}catch(e){}};" +
    "var fmt=function(v){try{return typeof v==='object'&&v!==null?JSON.stringify(v):String(v)}catch(e){return String(v)}};" +
    "['log','info','warn','error'].forEach(function(k){var o=console[k];console[k]=function(){var t=[].slice.call(arguments).map(fmt).join(' ');" +
    "window.__logs.push(t);env(k==='error'?'error':'log',t);o.apply(console,arguments)}});" +
    "window.addEventListener('error',function(e){env('error',e.message)});" +
    "document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href');" +
    "if(h.charAt(0)==='#'){return}e.preventDefault();env('enlace',a.href)});" +
    "document.addEventListener('submit',function(e){e.preventDefault();env('formulario','')});" +
    "})();<\/script>";

  /** Construye el documento completo a partir del código del alumno. */
  function construirDocumento(codigo) {
    const html = codigo.html || "";
    const css = codigo.css ? "<style>\n" + codigo.css + "\n</style>" : "";
    const js = codigo.js ? "<script>\n" + codigo.js + "\n<\/script>" : "";
    // Sin <meta charset>: srcdoc ya es texto Unicode, y así no "regalamos" esa etiqueta en los retos de estructura
    const cabeza = SCRIPT_AYUDANTE + css;

    // Si el alumno escribió la página completa (<html>…), respetamos su estructura.
    if (/<html[\s>]/i.test(html)) {
      let doc = html;
      if (/<head[^>]*>/i.test(doc)) doc = doc.replace(/<head[^>]*>/i, m => m + cabeza);
      else doc = doc.replace(/<html[^>]*>/i, m => m + "<head>" + cabeza + "</head>");
      if (/<\/body>/i.test(doc)) doc = doc.replace(/<\/body>/i, js + "</body>");
      else doc += js;
      return doc;
    }
    return "<!DOCTYPE html><html><head>" + cabeza + "</head><body>\n" + html + "\n" + js + "</body></html>";
  }

  /** Traduce errores típicos de JavaScript a algo que un novato entiende. */
  function errorAmigable(msg) {
    let m;
    if ((m = msg.match(/(\w+) is not defined/))) return "🤔 Usas «" + m[1] + "» pero no existe. ¿Está bien escrito? Recuerda que mayúsculas y minúsculas cuentan.";
    if (/Cannot read propert(y|ies) of (null|undefined)/.test(msg)) return "🔍 Intentas usar un elemento que no se encontró. Revisa el selector de querySelector o getElementById.";
    if (/is not a function/.test(msg)) return "🧩 Algo que llamas con () no es una función. ¿Está bien escrito su nombre?";
    if (/Unexpected token|Unexpected end|missing|Invalid or unexpected|Unterminated/.test(msg)) return "✏️ Hay un error de escritura: falta o sobra un paréntesis, una llave o unas comillas.";
    if (/Assignment to constant/.test(msg)) return "🔒 No puedes cambiar una variable creada con const. Usa let si va a cambiar.";
    return "⚠️ " + msg;
  }

  function insertarTexto(textarea, texto) {
    textarea.focus();
    // execCommand conserva el historial de deshacer (Ctrl+Z)
    if (!document.execCommand || !document.execCommand("insertText", false, texto)) {
      textarea.setRangeText(texto, textarea.selectionStart, textarea.selectionEnd, "end");
      textarea.dispatchEvent(new Event("input"));
    }
  }

  function crear(contenedor, opciones) {
    const pestanas = opciones.pestanas || ["html"];
    const inicial = Object.assign({ html: "", css: "", js: "" }, opciones.inicial);
    const codigo = Object.assign({}, inicial, opciones.codigo || {});
    let activa = pestanas[0];
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
      "</div>" +
      '<div class="panel panel-resultado">' +
        '<div class="barra-panel"><span class="titulo-panel">👀 Resultado</span>' +
        '<span class="aviso-resultado" aria-live="polite"></span></div>' +
        '<iframe class="resultado" title="Resultado de tu código"></iframe>' +
        (pestanas.includes("js") ? '<div class="consola" aria-live="polite"><div class="consola-titulo">🖥️ Consola</div><div class="consola-lineas"></div></div>' : "") +
      "</div>";
    const textarea = raiz.querySelector("textarea");
    const capa = raiz.querySelector(".capa-resaltado");
    const capaCode = capa.querySelector("code");
    const numeros = raiz.querySelector(".numeros");
    const iframe = raiz.querySelector("iframe");
    const aviso = raiz.querySelector(".aviso-resultado");
    const consola = raiz.querySelector(".consola-lineas");
    const botonesPestana = [...raiz.querySelectorAll(".pestana")];
    const bReiniciar = raiz.querySelector("[data-reiniciar]");
    const panelCodigo = raiz.querySelector(".panel-codigo");

    // Con "destinos", el código y el resultado van cada uno a su columna del espacio de trabajo
    if (opciones.destinos) {
      opciones.destinos.codigo.appendChild(panelCodigo);
      opciones.destinos.resultado.appendChild(raiz.querySelector(".panel-resultado"));
    } else {
      contenedor.appendChild(raiz);
    }

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
      if (consola) consola.innerHTML = "";
      aviso.textContent = "";
      iframe.srcdoc = construirDocumento(codigo);
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
      if (confirm("¿Volver al código del principio? Perderás lo que has escrito aquí.")) fijar(inicial);
    });

    window.addEventListener("message", e => {
      if (e.source !== iframe.contentWindow || !e.data || !e.data.csshtml) return;
      const d = e.data;
      if (d.csshtml === "enlace") {
        aviso.textContent = "🔗 Enlace a: " + d.texto + " (en las prácticas no salimos de la página)";
      } else if (d.csshtml === "formulario") {
        aviso.textContent = "📨 ¡Formulario enviado! (en las prácticas no se envía a ningún sitio)";
      } else if (consola) {
        const linea = document.createElement("div");
        linea.className = "consola-linea " + d.csshtml;
        linea.textContent = d.csshtml === "error" ? errorAmigable(d.texto) : "› " + d.texto;
        consola.appendChild(linea);
        consola.scrollTop = consola.scrollHeight;
      }
    });

    cambiarPestana(activa);
    refrescar();

    return { raiz, iframe, obtener, fijar, refrescar, enfocar: () => textarea.focus() };
  }

  window.EDITOR = { crear, construirDocumento, errorAmigable };
})();
