/* ============================================================
   <CSS-HTML> · Ejercicios de resolución
   El alumno parte de un editor vacío y escribe el código que pide
   el enunciado. Al pulsar "Revisar" se compara su resultado con la
   solución (única):
   - Textos: sin distinguir mayúsculas, signos de puntuación ni espacios.
   - Código: etiquetas, atributos y valores que distinguen mayúsculas
     (id, class, href, src…) se comparan exactos.
   - CSS: se compara el estilo calculado (red = #ff0000 = rgb(255,0,0)).
   - JS: se compara la página final y lo que sale por la consola.
   ============================================================ */
(function () {
  /* Atributos cuyo valor es texto para personas: se comparan con flexibilidad */
  const ATRIBUTOS_TEXTO = new Set(["alt", "title", "placeholder", "aria-label", "label", "content"]);
  /* Atributos de código pero sin mayúsculas significativas */
  const ATRIBUTOS_SIN_MAYUSCULAS = new Set(["type", "charset", "lang", "method", "target", "rel", "dir"]);
  /* Elementos que no se comparan (el motor inyecta los suyos y el código se valora por su efecto) */
  const IGNORAR = new Set(["SCRIPT", "STYLE"]);

  function normalizarTexto(t) {
    return String(t || "")
      .toLowerCase()
      .replace(/[¡!¿?.,;:«»"'“”‘’…()\[\]\-–—_*]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  const nombre = el => "<" + el.tagName.toLowerCase() + ">";

  /** Nodos que cuentan: elementos (menos script/style) y textos que no quedan vacíos al normalizar. */
  function nodosUtiles(padre) {
    const salida = [];
    let texto = "";
    const volcarTexto = () => {
      if (normalizarTexto(texto)) salida.push({ tipo: "texto", valor: texto });
      texto = "";
    };
    padre.childNodes.forEach(n => {
      if (n.nodeType === 3) texto += n.nodeValue;
      else if (n.nodeType === 1 && !IGNORAR.has(n.tagName)) {
        volcarTexto();
        salida.push({ tipo: "elemento", el: n });
      }
    });
    volcarTexto();
    return salida;
  }

  function compararAtributos(a, s) {
    for (const attr of s.attributes) {
      const n = attr.name;
      if (!a.hasAttribute(n)) return "A " + nombre(a) + " le falta el atributo `" + n + "`.";
      const va = a.getAttribute(n).trim();
      const vs = attr.value.trim();
      let igual;
      if (ATRIBUTOS_TEXTO.has(n)) igual = normalizarTexto(va) === normalizarTexto(vs);
      else if (ATRIBUTOS_SIN_MAYUSCULAS.has(n)) igual = va.toLowerCase() === vs.toLowerCase();
      else if (n === "class") igual = va.split(/\s+/).sort().join(" ") === vs.split(/\s+/).sort().join(" ");
      else igual = va === vs;
      if (!igual) {
        return "El atributo `" + n + "` de " + nombre(a) + " no tiene el valor que pide el enunciado" +
          (ATRIBUTOS_TEXTO.has(n) ? "." : " (aquí mayúsculas y minúsculas cuentan).");
      }
    }
    for (const attr of a.attributes) {
      if (!s.hasAttribute(attr.name)) return nombre(a) + " lleva un atributo `" + attr.name + "` que el enunciado no pide.";
    }
    return null;
  }

  function compararEstilos(a, s, winA, winS, propiedades) {
    if (!propiedades.length) return null;
    const ca = winA.getComputedStyle(a);
    const cs = winS.getComputedStyle(s);
    for (const p of propiedades) {
      if (ca.getPropertyValue(p) !== cs.getPropertyValue(p)) {
        return "El estilo de " + nombre(a) + " no coincide en `" + p + "`.";
      }
    }
    return null;
  }

  /** Compara recursivamente dos elementos. Devuelve null si son equivalentes o un mensaje con la primera diferencia. */
  function compararElementos(a, s, ctx) {
    if (a.tagName !== s.tagName) {
      return "Donde esperaba " + nombre(s) + " has escrito " + nombre(a) + ".";
    }
    const difAttr = compararAtributos(a, s);
    if (difAttr) return difAttr;
    const difEstilo = compararEstilos(a, s, ctx.winA, ctx.winS, ctx.propiedades);
    if (difEstilo) return difEstilo;

    const na = nodosUtiles(a);
    const ns = nodosUtiles(s);
    const dentro = a.tagName === "BODY" ? "" : " dentro de " + nombre(a);
    for (let i = 0; i < ns.length; i++) {
      const x = na[i];
      const y = ns[i];
      if (!x) {
        return y.tipo === "texto"
          ? "Falta el texto «" + y.valor.trim() + "»" + dentro + "."
          : "Falta " + nombre(y.el) + dentro + (i > 0 && ns[i - 1].tipo === "elemento" ? ", después de " + nombre(ns[i - 1].el) : "") + ".";
      }
      if (x.tipo !== y.tipo) {
        return y.tipo === "texto"
          ? "Esperaba el texto «" + y.valor.trim() + "»" + dentro + ", pero encontré " + nombre(x.el) + "."
          : "Esperaba " + nombre(y.el) + dentro + ", pero encontré el texto «" + x.valor.trim() + "».";
      }
      if (y.tipo === "texto") {
        if (normalizarTexto(x.valor) !== normalizarTexto(y.valor)) {
          return "El texto" + dentro + " no es el que pide el enunciado: debería decir «" + y.valor.trim() + "».";
        }
      } else {
        const dif = compararElementos(x.el, y.el, ctx);
        if (dif) return dif;
      }
    }
    if (na.length > ns.length) {
      const sobra = na[ns.length];
      return sobra.tipo === "texto"
        ? "Te sobra el texto «" + sobra.valor.trim() + "»" + dentro + "."
        : "Te sobra " + nombre(sobra.el) + dentro + ": el enunciado no lo pide.";
    }
    return null;
  }

  /** Propiedades CSS que aparecen en el código de la solución. */
  function propiedadesCSS(css) {
    const props = new Set();
    String(css || "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/([a-z-]+)\s*:[^;{}]*[;}]/gi, (t, p) => { props.add(p.toLowerCase()); return t; });
    return [...props];
  }

  function cargar(iframe, codigo) {
    return new Promise(resolver => {
      iframe.onload = () => setTimeout(() => resolver({ doc: iframe.contentDocument, win: iframe.contentWindow }), 80);
      iframe.srcdoc = EDITOR.construirDocumento(codigo);
    });
  }

  let marcos = null;
  function obtenerMarcos() {
    if (!marcos) {
      marcos = [0, 1].map(() => {
        const f = document.createElement("iframe");
        f.setAttribute("aria-hidden", "true");
        f.tabIndex = -1;
        f.style.cssText = "position:absolute;left:-10000px;top:0;width:800px;height:600px;opacity:0;pointer-events:none;border:0;";
        document.body.appendChild(f);
        return f;
      });
    }
    return marcos;
  }

  /**
   * Compara el código del alumno con la solución.
   * Devuelve una Promesa con { ok: true } o { ok: false, mensaje }.
   */
  async function revisar(codigoAlumno, solucion, iframes) {
    const vacio = !["html", "css", "js"].some(k => (codigoAlumno[k] || "").trim());
    if (vacio) return { ok: false, mensaje: "El editor está vacío. ¡Escribe tu código y vuelve a revisar!" };

    const [fa, fs] = iframes || obtenerMarcos();
    const A = await cargar(fa, codigoAlumno);
    const S = await cargar(fs, solucion);
    const ctx = { winA: A.win, winS: S.win, propiedades: propiedadesCSS(solucion.css) };

    // Página completa (<html>, <head>): se comparan el idioma y la cabeza solo si la solución los define
    if (/<html[\s>]/i.test(solucion.html || "")) {
      const difHtml = compararAtributos(A.doc.documentElement, S.doc.documentElement);
      if (difHtml) return { ok: false, mensaje: difHtml };
      const difHead = compararElementos(A.doc.head, S.doc.head, ctx);
      if (difHead) return { ok: false, mensaje: difHead.replace("dentro de <head>", "en la cabeza (<head>)") };
    }
    const dif = compararElementos(A.doc.body, S.doc.body, ctx);
    if (dif) return { ok: false, mensaje: dif };

    // Consola (Mundo JavaScript)
    const logsS = (S.win.__logs || []).map(normalizarTexto);
    if (logsS.length) {
      const logsA = (A.win.__logs || []).map(normalizarTexto);
      if (logsA.join("\n") !== logsS.join("\n")) {
        return { ok: false, mensaje: "La consola no muestra lo que pide el enunciado." };
      }
    }
    return { ok: true };
  }

  /* ---------- Interfaz del ejercicio ---------- */
  function crear(contenedor, paso, opciones) {
    const { clave, pestanas, alResolver, yaResuelto } = opciones;
    let pistasVistas = 0;
    let resuelto = !!yaResuelto;

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta ejercicio";
    tarjeta.innerHTML =
      '<span class="etiqueta-ejercicio">🧠 Ejercicio</span>' +
      '<p class="enunciado"></p>' +
      '<div class="pistas-mostradas"></div>' +
      '<div class="resultado-revision" aria-live="polite"></div>' +
      '<div class="reto-botones">' +
        '<button class="boton grande azul" data-revisar>🔍 Revisar</button>' +
        (paso.pistas && paso.pistas.length ? '<button class="boton secundario" data-pista>💡 Pista</button>' : "") +
        '<button class="boton secundario" data-solucion' + (paso.pistas && paso.pistas.length ? ' disabled title="Mira antes las pistas"' : "") + ">👀 Ver solución</button>" +
      "</div>";
    contenedor.appendChild(tarjeta);
    tarjeta.querySelector(".enunciado").innerHTML = UI.md(paso.enunciado);

    const mascota = MASCOTA.crear(resuelto
      ? "¡Este ya lo resolviste! Puedes repasarlo o seguir adelante."
      : "Lee bien el enunciado y escríbelo tú desde cero. ¡Pensar es la mejor parte!");
    contenedor.appendChild(mascota);

    const borrador = PROGRESO.borrador(clave);
    const editor = EDITOR.crear(contenedor, {
      pestanas,
      inicial: Object.assign({ html: "", css: "", js: "" }, paso.inicial),
      codigo: borrador || undefined,
      alCambiar: codigo => PROGRESO.guardarBorrador(clave, codigo)
    });

    const salida = tarjeta.querySelector(".resultado-revision");
    const bRevisar = tarjeta.querySelector("[data-revisar]");
    const bPista = tarjeta.querySelector("[data-pista]");
    const bSolucion = tarjeta.querySelector("[data-solucion]");
    const pistasCont = tarjeta.querySelector(".pistas-mostradas");

    bRevisar.addEventListener("click", async () => {
      bRevisar.disabled = true;
      salida.className = "resultado-revision revisando";
      salida.textContent = "Revisando…";
      const r = await revisar(editor.obtener(), paso.solucion);
      bRevisar.disabled = false;
      if (r.ok) {
        salida.className = "resultado-revision correcto";
        salida.innerHTML = "✅ <b>¡Correcto!</b> " + MASCOTA.azar(MASCOTA.FRASES.acierto);
        MASCOTA.decir(mascota, "¡Lo has resuelto tú solo! Ya puedes pasar al siguiente paso. 🎉", "alegre");
        CELEBRAR.sonido.acierto();
        if (!resuelto) { resuelto = true; alResolver(); }
      } else {
        salida.className = "resultado-revision incorrecto";
        salida.innerHTML = "🤔 " + UI.md(r.mensaje);
        MASCOTA.decir(mascota, MASCOTA.azar(MASCOTA.FRASES.animo), "triste");
        CELEBRAR.sonido.error();
      }
    });

    if (bPista) bPista.addEventListener("click", () => {
      const p = document.createElement("div");
      p.className = "pista-mostrada";
      p.innerHTML = "<b>💡 Pista " + (pistasVistas + 1) + ":</b> " + UI.md(paso.pistas[pistasVistas]);
      pistasCont.appendChild(p);
      pistasVistas++;
      CELEBRAR.sonido.click();
      if (pistasVistas >= paso.pistas.length) {
        bPista.disabled = true;
        bSolucion.disabled = false;
        bSolucion.title = "";
      }
    });

    bSolucion.addEventListener("click", () => {
      if (!confirm("¿Ver la solución? Se escribirá en el editor. Estúdiala y pulsa «Revisar» para continuar.")) return;
      editor.fijar(paso.solucion);
    });

    return { editor };
  }

  window.EJERCICIOS = { revisar, crear, normalizarTexto, propiedadesCSS };
})();
