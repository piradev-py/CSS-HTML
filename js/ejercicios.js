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
        if (n === "class") return T("A {el} le falta la clase `{clase}`.", { el: nombre(a), clase: attr.value.trim() });
        if (n === "style") return T("A {el} le falta el estilo en línea (`style`) que pide el enunciado.", { el: nombre(a) });
        return T("A {el} le falta el atributo `{atributo}`.", { el: nombre(a), atributo: n });
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
        if (n === "class") return T("Las clases de {el} no son las que pide el enunciado: deberían ser `{clases}`.", { el: nombre(a), clases: vs });
        if (n === "style") return T("El estilo en línea (`style`) de {el} no es el que pide el enunciado.", { el: nombre(a) });
        return ATRIBUTOS_TEXTO.has(n)
          ? T("El atributo `{atributo}` de {el} no tiene el valor que pide el enunciado.", { el: nombre(a), atributo: n })
          : T("El atributo `{atributo}` de {el} no tiene el valor que pide el enunciado (aquí mayúsculas y minúsculas cuentan).", { el: nombre(a), atributo: n });
      }
    }
    for (const attr of atributos(a)) {
      if (!s.hasAttribute(attr.name) || !s.getAttribute(attr.name).trim() && (attr.name === "class" || attr.name === "style")) {
        if (attr.name === "class") return T("{el} tiene una clase que el enunciado no pide.", { el: nombre(a) });
        if (attr.name === "style") return T("{el} tiene un estilo en línea (`style`) que el enunciado no pide.", { el: nombre(a) });
        return T("{el} lleva un atributo `{atributo}` que el enunciado no pide.", { el: nombre(a), atributo: attr.name });
      }
    }
    // Campos de formulario: lo escrito o marcado (puede cambiarlo el JS)
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) {
      if (a.value !== s.value) return s.value
        ? T("El campo {el} no tiene el valor esperado: debería ser «{valor}».", { el: nombre(a), valor: s.value })
        : T("El campo {el} no tiene el valor esperado: debería estar vacío.", { el: nombre(a) });
      if (a.checked !== s.checked) return s.checked
        ? T("El campo {el} debería estar marcado.", { el: nombre(a) })
        : T("El campo {el} no debería estar marcado.", { el: nombre(a) });
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
        if (p.startsWith("--")) return T("La variable `{variable}` no existe o no tiene el valor que pide el enunciado.", { variable: p });
        return T("El estilo de {el} no coincide en `{propiedad}`.", { el: nombre(a), propiedad: p });
      }
    }
    // Pseudo-elementos que usa la solución (::before, ::after…): se comparan también su contenido y sus estilos
    for (const ps of pseudos) {
      let pa, pss;
      try { pa = winA.getComputedStyle(a, ps); pss = winS.getComputedStyle(s, ps); } catch (e) { continue; }
      for (const p of ["content"].concat(propiedades)) {
        if (p === "content" && !/::(before|after|marker)/.test(ps)) continue;
        if (pa.getPropertyValue(p) !== pss.getPropertyValue(p)) {
          return T("El pseudo-elemento `{pseudoclase}` de {el} no coincide en `{propiedad}`.", { pseudoclase: ps, el: nombre(a), propiedad: p });
        }
      }
    }
    return null;
  }

  /** Compara recursivamente dos elementos. Devuelve null si son equivalentes o un mensaje con la primera diferencia. */
  function compararElementos(a, s, ctx) {
    if (a.tagName !== s.tagName) {
      return T("Donde esperaba {esperado} has escrito {escrito}.", { esperado: nombre(s), escrito: nombre(a) });
    }
    const difAttr = compararAtributos(a, s);
    if (difAttr) return difAttr;
    const difEstilo = compararEstilos(a, s, ctx.winA, ctx.winS, ctx.propiedades, ctx.pseudos);
    if (difEstilo) return difEstilo;

    const na = nodosUtiles(a);
    const ns = nodosUtiles(s);
    const dentro = a.tagName === "BODY" ? "" : a.tagName === "HEAD" ? T(" en la cabeza (<head>)") : T(" dentro de {el}", { el: nombre(a) });
    for (let i = 0; i < ns.length; i++) {
      const x = na[i];
      const y = ns[i];
      if (!x) {
        return y.tipo === "texto"
          ? T("Falta el texto «{texto}»{dentro}.", { texto: y.valor.trim(), dentro })
          : T("Falta {el}{dentro}{despues}.", { el: nombre(y.el), dentro, despues: i > 0 && ns[i - 1].tipo === "elemento" ? T(", después de {el}", { el: nombre(ns[i - 1].el) }) : "" });
      }
      if (x.tipo !== y.tipo) {
        return y.tipo === "texto"
          ? T("Esperaba el texto «{texto}»{dentro}, pero encontré {el}.", { texto: y.valor.trim(), dentro, el: nombre(x.el) })
          : T("Esperaba {el}{dentro}, pero encontré el texto «{texto}».", { el: nombre(y.el), dentro, texto: x.valor.trim() });
      }
      if (y.tipo === "texto") {
        if (normalizarTexto(x.valor) !== normalizarTexto(y.valor)) {
          return T("El texto{dentro} no es el que pide el enunciado: debería decir «{texto}».", { dentro, texto: y.valor.trim() });
        }
      } else {
        const dif = compararElementos(x.el, y.el, ctx);
        if (dif) return dif;
      }
    }
    if (na.length > ns.length) {
      const sobra = na[ns.length];
      return sobra.tipo === "texto"
        ? T("Te sobra el texto «{texto}»{dentro}.", { texto: sobra.valor.trim(), dentro })
        : T("Te sobra {el}{dentro}: el enunciado no lo pide.", { el: nombre(sobra.el), dentro });
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
    if (/:hover\b/.test(limpio)) lista.push({ estado: "hover", prefijo: T("Al pasar el ratón (`:hover`): ") });
    if (/:focus/.test(limpio)) lista.push({ estado: "focus", prefijo: T("Con el foco puesto (`:focus`): ") });
    if (/:active\b/.test(limpio)) lista.push({ estado: "active", prefijo: T("Mientras se pulsa (`:active`): ") });
    if (/@media[^{]*(min|max)-width/.test(limpio)) {
      lista.push({ ancho: 375, prefijo: T("En una pantalla estrecha (375 px): ") });
      lista.push({ ancho: 1280, prefijo: T("En una pantalla ancha (1280 px): ") });
    }
    // Con la animación parada al principio no se ve si el "to" está bien escrito: se mira también a mitad
    if (/@keyframes\b/.test(limpio)) lista.push({ fotograma: "mitad", prefijo: T("A mitad de la animación: ") });
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
    if (acc.clic) return { selector: acc.clic, texto: T("Al pulsar `{selector}`", { selector: acc.clic }) };
    if (acc.escribir) return { selector: acc.escribir, texto: T("Al escribir «{texto}» en `{selector}`", { texto: acc.texto, selector: acc.escribir }) };
    if (acc.elegir) return { selector: acc.elegir, texto: T("Al elegir «{valor}» en `{selector}`", { valor: acc.valor, selector: acc.elegir }) };
    if (acc.enviar) return { selector: acc.enviar, texto: T("Al enviar el formulario `{selector}`", { selector: acc.enviar }) };
    return { selector: null, texto: T("Acción desconocida") };
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
      return T("Tu código JavaScript tiene un error{linea}: {error}", { linea: e.linea ? T(" en la línea {n}", { n: e.linea }) : "", error: EDITOR.errorAmigable(e.mensaje) });
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
      return logsS.length === 1
        ? T("A la consola le faltan mensajes: la solución muestra 1 línea y tu código {n}. Mira la consola: debería salir «{texto}».", { n: logsA.length, texto: S.win.__logs[logsA.length] })
        : T("A la consola le faltan mensajes: la solución muestra {total} líneas y tu código {n}. Mira la consola: debería salir «{texto}».", { total: logsS.length, n: logsA.length, texto: S.win.__logs[logsA.length] });
    }
    if (logsA.length > logsS.length) return T("La consola muestra más líneas de las que pide el enunciado ({n} en vez de {total}).", { n: logsA.length, total: logsS.length });
    const mal = logsA.map((t, k) => t !== logsS[k] ? k + 1 : 0).filter(Boolean);
    const i = mal[0] - 1;
    const dif = diferenciaLinea(A.win.__logs[i], S.win.__logs[i]);
    const otras = mal.slice(1);
    return T("La línea {n} de la consola no es la que pide el enunciado{dif}. Debería decir «{texto}».", { n: i + 1, dif: dif ? ": " + dif.mensaje : "", texto: S.win.__logs[i] }) +
      (dif && dif.sobra === "$" && !dif.falta ? T(" ¿Se te ha colado el `$` de `${…}`? Solo va pegado a la llave: `${mascota}`.") : "") +
      (otras.length ? otras.length === 1 ? T(" También está mal la línea {n}.", { n: otras[0] }) : T(" También están mal las líneas {lista}.", { lista: otras.join(", ").replace(/, (\d+)$/, T(" y ") + "$1") }) : "");
  }

  /** Qué palabras sobran o faltan entre una línea del alumno y la de la solución (mayúsculas y tildes no cuentan).
      Devuelve { mensaje, sobra, falta } o null: quien llama mira `sobra`, no el texto, que cambia con el idioma. */
  function diferenciaLinea(a, s) {
    const palabras = t => String(t).split(/\s+/).filter(normalizarTexto);
    const igual = (x, y) => normalizarTexto(x) === normalizarTexto(y);
    const A = palabras(a), S = palabras(s);
    let p = 0;
    while (p < A.length && p < S.length && igual(A[p], S[p])) p++;
    let f = 0;
    while (f < A.length - p && f < S.length - p && igual(A[A.length - 1 - f], S[S.length - 1 - f])) f++;
    const sobra = A.slice(p, A.length - f).join(" "), falta = S.slice(p, S.length - f).join(" ");
    const donde = p === 0 ? T(" al principio") : f === 0 ? T(" al final") : "";
    const mensaje = sobra && falta ? T("donde pone «{sobra}» debería poner «{falta}»", { sobra, falta })
      : sobra ? T("sobra «{sobra}»{donde}", { sobra, donde })
      : falta ? T("falta «{falta}»{donde}", { falta, donde })
      : null;
    return mensaje && { mensaje, sobra, falta };
  }

  /**
   * Compara el código del alumno con la solución.
   * `acciones` (Mundo JavaScript): lista de { clic | escribir+texto | elegir+valor | enviar } que se hacen
   * en las dos páginas, una a una, comparando la página y la consola después de cada una.
   * Devuelve una Promesa con { ok: true } o { ok: false, mensaje }.
   */
  async function revisar(codigoAlumno, solucion, iframes, cssBase, acciones) {
    const vacio = !["html", "css", "js"].some(k => (codigoAlumno[k] || "").trim());
    if (vacio) return { ok: false, mensaje: T("El editor está vacío. ¡Escribe tu código y vuelve a revisar!") };
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
        if (difHead) return { ok: false, mensaje: difHead };
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
      if (!aplicarAccion(S.doc, acc)) return { ok: false, mensaje: T("(Error de la lección: la solución no tiene `{selector}`.)", { selector: describirAccion(acc).selector }) };
      if (!aplicarAccion(A.doc, acc)) return { ok: false, mensaje: texto + ": " + T("no encuentro ese elemento en tu página. ¿Has cambiado el HTML?") };
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
        '<button class="boton grande azul" data-revisar>' + T("🔍 Revisar") + "</button>" +
        (paso.pistas && paso.pistas.length ? '<button class="boton secundario" data-pista>' + T("💡 Pista") + "</button>" : "") +
        '<button class="boton secundario" data-solucion' + (paso.pistas && paso.pistas.length ? ' disabled title="' + T("Mira antes las pistas") + '"' : "") + ">" + T("👀 Ver solución") + "</button>" +
      "</div>";
    contenedor.appendChild(tarjeta);
    tarjeta.querySelector(".enunciado").innerHTML = UI.md(paso.enunciado);

    const mascota = MASCOTA.crear(resuelto
      ? T("¡Este ya lo resolviste! Puedes repasarlo o seguir adelante.")
      : T("Lee bien el enunciado y escríbelo tú desde cero. ¡Pensar es la mejor parte!"));
    contenedor.appendChild(mascota);

    const borrador = PROGRESO.borrador(clave);
    const editor = EDITOR.crear(contenedor, {
      pestanas,
      destinos: opciones.destinos,
      pestanaActiva: pestanaInicial(paso),
      cssBase: paso.cssBase,
      dispositivos: paso.dispositivos,
      vistaPrevia: paso.vistaPrevia,
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
      salida.textContent = T("Revisando…");
      const r = await revisar(editor.obtener(), paso.solucion, null, paso.cssBase, paso.acciones);
      bRevisar.disabled = false;
      if (r.ok) {
        salida.className = "resultado-revision correcto";
        salida.innerHTML = T("✅ <b>¡Correcto!</b> ") + MASCOTA.azar(MASCOTA.FRASES.acierto);
        MASCOTA.decir(mascota, T("¡Lo has resuelto tú solo! Ya puedes pasar al siguiente paso. 🎉"), "alegre");
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
      p.innerHTML = "<b>" + T("💡 Pista {n}:", { n: pistasVistas + 1 }) + "</b> " + UI.md(paso.pistas[pistasVistas]);
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
      if (!confirm(T("¿Ver la solución? Se escribirá en el editor. Estúdiala y pulsa «Revisar» para continuar."))) return;
      editor.fijar(paso.solucion);
    });

    return { editor };
  }

  window.EJERCICIOS = { revisar, crear, normalizarTexto, propiedadesCSS, pseudosCSS, pasadas, pestanaInicial };
})();
