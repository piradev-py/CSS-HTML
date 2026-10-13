/* ============================================================
   <CSS-HTML> · Ayudantes para revisar CSS "con estado"
   Lo que no se ve con la página quieta (pasar el ratón, el foco,
   otros anchos de pantalla, animaciones) se revisa en una copia
   oculta de la página preparada a propósito:
   - estado: ":hover", ":focus" o ":active" se convierten en clases
     (misma especificidad) que se ponen a TODOS los elementos, como
     si el ratón estuviera encima de todo a la vez.
   - ancho: la copia se carga en un marco de ese ancho (media queries).
   - movimiento: "(prefers-reduced-motion: …)" se resuelve igual en
     cualquier ordenador ("normal" por defecto), para que las pruebas
     no dependan de si el sistema tiene las animaciones reducidas.
   - Las transiciones se dan por terminadas y las animaciones se
     paran en su primer fotograma, así los valores no "bailan".
   Uso en un reto: const v = await PRUEBA.clonar(doc, { estado: "hover" });
                   v.win.getComputedStyle(v.doc.querySelector("li")).backgroundColor
   ============================================================ */
(function () {
  const CLASES = { hover: "__csshtml-hover", focus: "__csshtml-focus", active: "__csshtml-active" };
  const FALSO = "(min-width: 999999px)";
  const VERDADERO = "(min-width: 0px)";

  /** Reescribe un CSS para forzar un estado y fijar el modo de movimiento. */
  function prepararCSS(css, opciones = {}) {
    let salida = String(css || "");
    const estado = opciones.estado;
    if (estado) {
      // focus-visible y focus-within cuentan como "focus"
      salida = salida.replace(/:(hover|focus-visible|focus-within|focus|active)\b/g, (t, p) => {
        const tipo = p.startsWith("focus") ? "focus" : p;
        return tipo === estado ? "." + CLASES[tipo] : t;
      });
    }
    // Se deja una marca /*movimiento:…*/ para poder volver a prepararlo con otro modo (PRUEBA.clonar sobre un reto)
    const reducido = opciones.movimiento === "reducido";
    const valor = tipo => (tipo === "no-preference" ? !reducido : reducido) ? VERDADERO : FALSO;
    salida = salida
      .replace(/\/\*movimiento:([a-z-]+)\*\/\([^)]*\)/g, (t, tipo) => "/*movimiento:" + tipo + "*/" + valor(tipo))
      .replace(/\(\s*prefers-reduced-motion\s*(?::\s*(reduce|no-preference)\s*)?\)/g,
        (t, tipo) => "/*movimiento:" + (tipo || "reduce") + "*/" + valor(tipo || "reduce"));
    return salida;
  }

  /** Reescribe los bloques <style> de un documento HTML completo. */
  function prepararHTML(html, opciones) {
    return String(html).replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/gi, (t, a, css, c) => a + prepararCSS(css, opciones) + c);
  }

  /** Después de cargar: pone las clases del estado y congela transiciones y animaciones. */
  function asentar(doc, opciones = {}) {
    if (opciones.estado && CLASES[opciones.estado]) {
      doc.querySelectorAll("*").forEach(el => el.classList.add(CLASES[opciones.estado]));
    }
    try {
      doc.getAnimations().forEach(a => {
        try {
          if (a instanceof doc.defaultView.CSSTransition) a.finish();
          else { a.pause(); a.currentTime = 0; }
        } catch (e) { /* animación sin final: se deja como está */ }
      });
    } catch (e) { /* navegador sin getAnimations */ }
  }

  function crearMarco(ancho, alto) {
    const f = document.createElement("iframe");
    f.setAttribute("aria-hidden", "true");
    f.tabIndex = -1;
    f.style.cssText = "position:absolute;left:-20000px;top:0;opacity:0;pointer-events:none;border:0;" +
      "width:" + (ancho || 800) + "px;height:" + (alto || 600) + "px;";
    document.body.appendChild(f);
    return f;
  }

  /** Carga un HTML completo en un marco oculto y lo deja asentado. */
  function cargarEn(marco, html, opciones) {
    return new Promise(resolver => {
      marco.onload = () => setTimeout(() => {
        asentar(marco.contentDocument, opciones);
        // Un fotograma más para que el navegador recalcule estilos con las clases puestas
        setTimeout(() => resolver({ doc: marco.contentDocument, win: marco.contentWindow, marco }), 30);
      }, 60);
      marco.srcdoc = prepararHTML(html, opciones);
    });
  }

  /**
   * Copia del documento del resultado con un estado, un ancho y un modo de movimiento.
   * opciones: { estado: "hover" | "focus" | "active", ancho: 375, alto: 600, movimiento: "normal" | "reducido" }
   * Devuelve una Promesa con { doc, win }. Las copias se borran al empezar la siguiente evaluación (limpiar).
   */
  let copias = [];
  async function clonar(doc, opciones = {}) {
    const html = "<!DOCTYPE html>" + doc.documentElement.outerHTML;
    const marco = crearMarco(opciones.ancho, opciones.alto);
    copias.push(marco);
    return cargarEn(marco, html, opciones);
  }

  function limpiar() {
    copias.forEach(m => m.remove());
    copias = [];
  }

  /** Todo el CSS escrito en la página (bloques <style>), sin comentarios. Útil para buscar @keyframes, @media… */
  function textoCSS(doc) {
    return [...doc.querySelectorAll("style")].map(s => s.textContent).join("\n").replace(/\/\*[\s\S]*?\*\//g, "");
  }

  /** Reglas CSS (también las que están dentro de @media) cuyo selector contiene el texto dado. */
  function reglas(doc, textoSelector) {
    const salida = [];
    const recorrer = lista => {
      for (const r of lista) {
        if (r.selectorText !== undefined) {
          if (!textoSelector || r.selectorText.includes(textoSelector)) salida.push(r);
        } else if (r.cssRules) recorrer(r.cssRules);
      }
    };
    for (const hoja of doc.styleSheets) {
      try { recorrer(hoja.cssRules); } catch (e) { /* hoja no accesible */ }
    }
    return salida;
  }

  window.PRUEBA = { clonar, limpiar, reglas, textoCSS, prepararCSS, prepararHTML, asentar, cargarEn, crearMarco };
})();
