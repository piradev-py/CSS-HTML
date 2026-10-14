/* ============================================================
   <CSS-HTML> · Ejercicios de resolución
   El alumno parte de un editor vacío y escribe el código que pide
   el enunciado. Al pulsar "Revisar" se compara su resultado con la
   solución (única):
   - Textos: sin distinguir mayúsculas, tildes, signos de puntuación ni espacios.
   - Antes de comparar, el código tiene que estar bien escrito (js/escritura.js):
     etiquetas cerradas, { } y ; en CSS y JS.
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
      .normalize("NFC")
      .toLowerCase()
      // Las tildes no cuentan («pagina» = «página»), pero la ñ sí («año» ≠ «ano»)
      .replace(/ñ/g, "\u0000")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\u0000/g, "ñ")
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

  /** Atributos que cuentan: `class` y `style` vacíos (p. ej. tras classList.remove) es como no tenerlos. */
  function atributos(el) {
    return [...el.attributes].filter(at => !((at.name === "class" || at.name === "style") && !at.value.trim()));
  }

  /** `style` en línea (lo que escribe elemento.style.x desde JS): mismas propiedades y mismo valor calculado. */
  function mismoEstiloEnLinea(a, s) {
    const props = el => [...el.style].sort().join(",");
    if (props(a) !== props(s)) return false;
    const ca = a.ownerDocument.defaultView.getComputedStyle(a);
    const cs = s.ownerDocument.defaultView.getComputedStyle(s);
    return [...s.style].every(p => ca.getPropertyValue(p) === cs.getPropertyValue(p));
  }

  function compararAtributos(a, s) {
    for (const attr of atributos(s)) {
      const n = attr.name;
      if (!a.hasAttribute(n) || !a.getAttribute(n).trim() && (n === "class" || n === "style")) {
        if (n === "class") return "A " + nombre(a) + " le falta la clase `" + attr.value.trim() + "`.";
        if (n === "style") return "A " + nombre(a) + " le falta el estilo en línea (`style`) que pide el enunciado.";
        return "A " + nombre(a) + " le falta el atributo `" + n + "`.";
      }
      const va = a.getAttribute(n).trim();
      const vs = attr.value.trim();
      let igual;
      if (ATRIBUTOS_TEXTO.has(n)) igual = normalizarTexto(va) === normalizarTexto(vs);
      else if (ATRIBUTOS_SIN_MAYUSCULAS.has(n)) igual = va.toLowerCase() === vs.toLowerCase();
      else if (n === "class") igual = va.split(/\s+/).sort().join(" ") === vs.split(/\s+/).sort().join(" ");
      else if (n === "style") igual = mismoEstiloEnLinea(a, s);
      else igual = va === vs;
      if (!igual) {
        if (n === "class") return "Las clases de " + nombre(a) + " no son las que pide el enunciado: deberían ser `" + vs + "`.";
        if (n === "style") return "El estilo en línea (`style`) de " + nombre(a) + " no es el que pide el enunciado.";
        return "El atributo `" + n + "` de " + nombre(a) + " no tiene el valor que pide el enunciado" +
          (ATRIBUTOS_TEXTO.has(n) ? "." : " (aquí mayúsculas y minúsculas cuentan).");
      }
    }
    for (const attr of atributos(a)) {
      if (!s.hasAttribute(attr.name) || !s.getAttribute(attr.name).trim() && (attr.name === "class" || attr.name === "style")) {
        if (attr.name === "class") return nombre(a) + " tiene una clase que el enunciado no pide.";
        if (attr.name === "style") return nombre(a) + " tiene un estilo en línea (`style`) que el enunciado no pide.";
        return nombre(a) + " lleva un atributo `" + attr.name + "` que el enunciado no pide.";
      }
    }
    // Campos de formulario: lo escrito o marcado (puede cambiarlo el JS)
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) {
      if (a.value !== s.value) return "El campo " + nombre(a) + " no tiene el valor esperado" + (s.value ? ": debería ser «" + s.value + "»." : ": debería estar vacío.");
      if (a.checked !== s.checked) return "El campo " + nombre(a) + (s.checked ? " debería estar marcado." : " no debería estar marcado.");
    }
    return null;
  }

  function compararEstilos(a, s, winA, winS, propiedades, pseudos = []) {
    if (!propiedades.length) return null;
    const ca = winA.getComputedStyle(a);
    const cs = winS.getComputedStyle(s);
    // Las variables CSS se guardan como texto: se comparan sin mayúsculas ni espacios de más
    const normalizar = (p, v) => p.startsWith("--") ? v.trim().toLowerCase().replace(/\s+/g, " ") : v;
    for (const p of propiedades) {
      if (normalizar(p, ca.getPropertyValue(p)) !== normalizar(p, cs.getPropertyValue(p))) {
        if (p.startsWith("--")) return "La variable `" + p + "` no existe o no tiene el valor que pide el enunciado.";
        return "El estilo de " + nombre(a) + " no coincide en `" + p + "`.";
      }
    }
    // Pseudo-elementos que usa la solución (::before, ::after…): se comparan también su contenido y sus estilos
    for (const ps of pseudos) {
      let pa, pss;
      try { pa = winA.getComputedStyle(a, ps); pss = winS.getComputedStyle(s, ps); } catch (e) { continue; }
      for (const p of ["content"].concat(propiedades)) {
        if (p === "content" && !/::(before|after|marker)/.test(ps)) continue;
        if (pa.getPropertyValue(p) !== pss.getPropertyValue(p)) {
          return "El pseudo-elemento `" + ps + "` de " + nombre(a) + " no coincide en `" + p + "`.";
        }
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
    const difEstilo = compararEstilos(a, s, ctx.winA, ctx.winS, ctx.propiedades, ctx.pseudos);
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

  /** Pseudo-elementos que aparecen en el CSS de la solución. */
  function pseudosCSS(css) {
    const encontrados = String(css || "").match(/::(before|after|first-letter|first-line|marker|placeholder)\b/g) || [];
    return [...new Set(encontrados)];
  }

  /**
   * Pasadas de la revisión: siempre la página quieta y, si la solución los usa, cada estado
   * (:hover, :focus, :active), dos anchos de pantalla (media queries) y la mitad de las
   * animaciones (@keyframes). Ver js/pruebas.js.
   */
  function pasadas(css) {
    const lista = [{ prefijo: "" }];
    const limpio = String(css || "").replace(/\/\*[\s\S]*?\*\//g, "");
    if (/:hover\b/.test(limpio)) lista.push({ estado: "hover", prefijo: "Al pasar el ratón (`:hover`): " });
    if (/:focus/.test(limpio)) lista.push({ estado: "focus", prefijo: "Con el foco puesto (`:focus`): " });
    if (/:active\b/.test(limpio)) lista.push({ estado: "active", prefijo: "Mientras se pulsa (`:active`): " });
    if (/@media[^{]*(min|max)-width/.test(limpio)) {
      lista.push({ ancho: 375, prefijo: "En una pantalla estrecha (375 px): " });
      lista.push({ ancho: 1280, prefijo: "En una pantalla ancha (1280 px): " });
    }
    // Con la animación parada al principio no se ve si el "to" está bien escrito: se mira también a mitad
    if (/@keyframes\b/.test(limpio)) lista.push({ fotograma: "mitad", prefijo: "A mitad de la animación: " });
    return lista;
  }

  function cargar(iframe, codigo, opciones = {}) {
    iframe.style.width = (opciones.ancho || 800) + "px";
    return PRUEBA.cargarEn(iframe, EDITOR.construirDocumento(codigo), opciones);
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

  /* ---------- Mundo JavaScript: acciones simuladas, errores y consola ---------- */

  /** Selector de la acción y descripción para los mensajes («Al pulsar `#boton`: …»). */
  function describirAccion(acc) {
    if (acc.clic) return { selector: acc.clic, texto: "Al pulsar `" + acc.clic + "`" };
    if (acc.escribir) return { selector: acc.escribir, texto: "Al escribir «" + acc.texto + "» en `" + acc.escribir + "`" };
    if (acc.elegir) return { selector: acc.elegir, texto: "Al elegir «" + acc.valor + "» en `" + acc.elegir + "`" };
    if (acc.enviar) return { selector: acc.enviar, texto: "Al enviar el formulario `" + acc.enviar + "`" };
    return { selector: null, texto: "Acción desconocida" };
  }

  /** Hace la acción en una página. Devuelve false si no encuentra el elemento. */
  function aplicarAccion(doc, acc) {
    const { selector } = describirAccion(acc);
    const el = selector && doc.querySelector(selector);
    if (!el) return false;
    if (acc.clic) el.click();
    else if (acc.escribir) PRUEBA.escribir(el, acc.texto);
    else if (acc.elegir) PRUEBA.escribir(el, acc.valor);
    else if (acc.enviar) {
      if (el.requestSubmit) el.requestSubmit();
      else el.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    }
    return true;
  }

  /** Primer error de JS del alumno (si la solución no lo tiene), en lenguaje de novato. */
  function errorJS(A, S) {
    const ea = A.win.__errores || [];
    const es = S.win.__errores || [];
    if (ea.length > es.length) {
      const e = ea[es.length];
      return "Tu código JavaScript tiene un error" + (e.linea ? " en la línea " + e.linea : "") + ": " + EDITOR.errorAmigable(e.mensaje);
    }
    return null;
  }

  /** Compara lo que sale por la consola (solo si la solución escribe algo). */
  function compararConsola(A, S) {
    const logsS = (S.win.__logs || []).map(normalizarTexto);
    if (!logsS.length) return null;
    const logsA = (A.win.__logs || []).map(normalizarTexto);
    if (logsA.join("\n") === logsS.join("\n")) return null;
    if (logsA.length < logsS.length) {
      return "A la consola le faltan mensajes: la solución muestra " + logsS.length + (logsS.length === 1 ? " línea" : " líneas") +
        " y tu código " + logsA.length + ". Mira la consola: debería salir «" + S.win.__logs[logsA.length] + "».";
    }
    if (logsA.length > logsS.length) return "La consola muestra más líneas de las que pide el enunciado (" + logsA.length + " en vez de " + logsS.length + ").";
    const i = logsA.findIndex((t, k) => t !== logsS[k]);
    return "La línea " + (i + 1) + " de la consola no es la que pide el enunciado: debería decir «" + S.win.__logs[i] + "».";
  }

  /**
   * Compara el código del alumno con la solución.
   * `acciones` (Mundo JavaScript): lista de { clic | escribir+texto | elegir+valor | enviar } que se hacen
   * en las dos páginas, una a una, comparando la página y la consola después de cada una.
   * Devuelve una Promesa con { ok: true } o { ok: false, mensaje }.
   */
  async function revisar(codigoAlumno, solucion, iframes, cssBase, acciones) {
    const vacio = !["html", "css", "js"].some(k => (codigoAlumno[k] || "").trim());
    if (vacio) return { ok: false, mensaje: "El editor está vacío. ¡Escribe tu código y vuelve a revisar!" };
    // Bien escrito antes que nada: aunque el navegador perdone una } o un ; que falta, aquí no se aprueba
    const escritura = ESCRITURA.revisar(codigoAlumno);
    if (escritura) return { ok: false, mensaje: "✏️ " + escritura.mensaje };

    const [fa, fs] = iframes || obtenerMarcos();
    const alumno = EDITOR.conBase(codigoAlumno, cssBase);
    const sol = EDITOR.conBase(solucion, cssBase);
    const base = { propiedades: propiedadesCSS(solucion.css), pseudos: pseudosCSS(solucion.css) };
    const lista = pasadas(solucion.css);
    let A, S;

    for (const pasada of lista) {
      A = await cargar(fa, alumno, pasada);
      S = await cargar(fs, sol, pasada);
      const ctx = Object.assign({ winA: A.win, winS: S.win }, base);
      // Un error de JS explica casi cualquier otra diferencia: se avisa primero
      const difJS = !pasada.prefijo && errorJS(A, S);
      if (difJS) return { ok: false, mensaje: difJS };

      // Página completa (<html>, <head>): se comparan el idioma y la cabeza solo si la solución los define
      if (!pasada.prefijo && /<html[\s>]/i.test(solucion.html || "")) {
        const difHtml = compararAtributos(A.doc.documentElement, S.doc.documentElement);
        if (difHtml) return { ok: false, mensaje: difHtml };
        const difHead = compararElementos(A.doc.head, S.doc.head, ctx);
        if (difHead) return { ok: false, mensaje: difHead.replace("dentro de <head>", "en la cabeza (<head>)") };
      }
      const dif = compararElementos(A.doc.body, S.doc.body, ctx);
      if (dif) return { ok: false, mensaje: pasada.prefijo ? pasada.prefijo + dif.charAt(0).toLowerCase() + dif.slice(1) : dif };
    }
    // La consola se mira en la página quieta
    if (lista.length > 1) {
      A = await cargar(fa, alumno);
      S = await cargar(fs, sol);
    }

    // Consola (Mundo JavaScript)
    const difConsola = compararConsola(A, S);
    if (difConsola) return { ok: false, mensaje: difConsola };

    // Acciones del usuario simuladas: después de cada una se comparan otra vez la página y la consola
    for (const acc of acciones || []) {
      const { texto } = describirAccion(acc);
      if (!aplicarAccion(S.doc, acc)) return { ok: false, mensaje: "(Error de la lección: la solución no tiene `" + describirAccion(acc).selector + "`.)" };
      if (!aplicarAccion(A.doc, acc)) return { ok: false, mensaje: texto + ": no encuentro ese elemento en tu página. ¿Has cambiado el HTML?" };
      await Promise.all([PRUEBA.esperarCalma(A.win), PRUEBA.esperarCalma(S.win)]);
      const ctx = Object.assign({ winA: A.win, winS: S.win }, base);
      const dif = errorJS(A, S) || compararElementos(A.doc.body, S.doc.body, ctx) || compararConsola(A, S);
      if (dif) return { ok: false, mensaje: texto + ": " + dif.charAt(0).toLowerCase() + dif.slice(1) };
    }
    return { ok: true };
  }

  /** Pestaña con la que se abre el editor: la indicada, o CSS si el HTML ya viene escrito y falta el CSS. */
  function pestanaInicial(paso) {
    if (paso.pestana) return paso.pestana;
    const ini = paso.inicial || {};
    if ((ini.html || "").trim() && !(ini.css || "").trim() && (paso.solucion.css || "").trim()) return "css";
    if ((paso.solucion.js || "").trim() && !(ini.js || "").trim()) return "js";
    // El JS viene empezado (p. ej. un esqueleto) y el HTML y el CSS ya están hechos: se abre en JS
    const igual = (a, b) => String(a || "").trim() === String(b || "").trim();
    if ((ini.js || "").trim() && !igual(ini.js, paso.solucion.js) && igual(ini.html, paso.solucion.html) && igual(ini.css, paso.solucion.css)) return "js";
    return undefined;
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
      destinos: opciones.destinos,
      pestanaActiva: pestanaInicial(paso),
      cssBase: paso.cssBase,
      dispositivos: paso.dispositivos,
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
      const r = await revisar(editor.obtener(), paso.solucion, null, paso.cssBase, paso.acciones);
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

  window.EJERCICIOS = { revisar, crear, normalizarTexto, propiedadesCSS, pseudosCSS, pasadas, pestanaInicial };
})();
