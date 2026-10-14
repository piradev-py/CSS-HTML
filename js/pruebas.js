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
     paran en su primer fotograma (o a mitad, con fotograma: "mitad"),
     así los valores no "bailan".
   Uso en un reto: const v = await PRUEBA.clonar(doc, { estado: "hover" });
                   v.win.getComputedStyle(v.doc.querySelector("li")).backgroundColor
   Mundo JavaScript: PRUEBA.recargar(doc) vuelve a ejecutar el código
   desde cero (conserva el localStorage de práctica), PRUEBA.escribir()
   rellena un campo y PRUEBA.esperarA() espera a que algo ocurra.
   ============================================================ */
(function () {
  const CLASES = { hover: "__csshtml-hover", focus: "__csshtml-focus", active: "__csshtml-active" };
  const FALSO = "(min-width: 999999px)";
  const VERDADERO = "(min-width: 0px)";
  const esperar = ms => new Promise(r => setTimeout(r, ms));

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
          else {
            a.pause();
            // { fotograma: "mitad" }: a mitad del primer ciclo, para ver si el guion mueve algo de verdad
            const t = opciones.fotograma === "mitad" && a.effect ? a.effect.getComputedTiming() : null;
            a.currentTime = t && isFinite(t.duration) ? (t.delay || 0) + t.duration / 2 : 0;
          }
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

  /**
   * Espera a que la página "se calme": que terminen sus fetch (window.__pendientes, ver js/editor.js).
   * Como mucho `maximo` ms. Las promesas que dependen del fetch se resuelven antes del siguiente setTimeout.
   */
  async function esperarCalma(win, maximo = 2500) {
    const fin = Date.now() + maximo;
    while (Date.now() < fin && win && win.__pendientes > 0) await esperar(30);
    await esperar(30);
  }

  /**
   * Carga un HTML completo en un marco oculto y lo deja asentado.
   * El localStorage de práctica del marco empieza vacío, salvo con { conservarDatos: true }.
   */
  function cargarEn(marco, html, opciones = {}) {
    if (!opciones.conservarDatos) { marco.__almacen = {}; marco.__almacenSesion = {}; }
    marco.__fuente = html;
    return new Promise(resolver => {
      marco.onload = () => setTimeout(async () => {
        await esperarCalma(marco.contentWindow);
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
    // Se copia la página tal y como está ahora; el JS del alumno no se vuelve a ejecutar
    const html = ("<!DOCTYPE html>" + doc.documentElement.outerHTML)
      .replace(/<script data-csshtml="alumno"[\s\S]*?<\/script>/, "");
    const marco = crearMarco(opciones.ancho, opciones.alto);
    copias.push(marco);
    return cargarEn(marco, html, opciones);
  }

  /**
   * Mundo JavaScript: vuelve a cargar el código ORIGINAL de la página (como pulsar F5) en una copia oculta.
   * Conserva el localStorage de práctica, salvo con { borrarDatos: true }. Devuelve { doc, win }.
   * { sinDatos: ["chistes.json"] }: en esa copia, fetch("datos/chistes.json") da 404 (para probar los errores).
   * Útil para que cada comprobación empiece de cero o para ver si algo "se recuerda" al recargar.
   */
  async function recargar(doc, opciones = {}) {
    const viejo = doc.defaultView && doc.defaultView.frameElement;
    const fuente = viejo && viejo.__fuente;
    if (!fuente) throw new Error("PRUEBA.recargar: no sé qué código cargar");
    const marco = crearMarco(opciones.ancho || viejo.clientWidth, opciones.alto || viejo.clientHeight);
    copias.push(marco);
    marco.__almacen = opciones.borrarDatos ? {} : viejo.__almacen || {};
    marco.__almacenSesion = {};
    marco.__sinDatos = opciones.sinDatos || [];
    return cargarEn(marco, fuente, { conservarDatos: true, movimiento: opciones.movimiento });
  }

  /**
   * Mundo JavaScript: el código JS que escribió el alumno, sin comentarios (de línea y de bloque) por defecto.
   * Para los retos que deben comprobar CÓMO se hizo algo (usar variables, una plantilla…), no solo el resultado.
   */
  function codigo(doc, opciones = {}) {
    const s = doc.querySelector("script[data-csshtml=alumno]");
    // Sin los vigilantes de bucles que mete el motor (EDITOR.protegerBucles)
    const texto = (s ? s.textContent : "")
      .replace(/__bucle\(\d+,\d+\);/g, "")
      .replace(/if\(__bucle\(\d+,\d+\)\|\|1\)/g, "");
    if (opciones.comentarios) return texto;
    // Quita comentarios sin tocar lo que va dentro de comillas (p. ej. "https://…")
    return texto.replace(/("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\[\s\S]|[^`\\])*`)|\/\/[^\n]*|\/\*[\s\S]*?\*\//g, (t, cadena) => cadena || "");
  }

  /** Escribe en un campo como lo haría el alumno: cambia su valor y lanza los eventos input y change. */
  function escribir(campo, texto) {
    if (!campo) return false;
    campo.value = texto;
    campo.dispatchEvent(new Event("input", { bubbles: true }));
    campo.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }

  /** Espera hasta que condicion() sea verdadera (o pasen `maximo` ms). Devuelve si se cumplió. */
  async function esperarA(condicion, maximo = 1500) {
    const fin = Date.now() + maximo;
    for (;;) {
      try { if (condicion()) return true; } catch (e) { /* aún no existe */ }
      if (Date.now() > fin) return false;
      await esperar(40);
    }
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

  window.PRUEBA = {
    clonar, recargar, codigo, escribir, esperar, esperarA, esperarCalma, limpiar, reglas, textoCSS,
    prepararCSS, prepararHTML, asentar, cargarEn, crearMarco
  };
})();
