/* ============================================================
   <CSS-HTML> · Revisor de escritura
   Antes de aprobar un ejercicio (y como una comprobación más de los
   retos) se mira que el código esté BIEN ESCRITO, aunque el navegador
   lo perdone:
   - HTML: cada etiqueta abierta se cierra, bien anidadas, sin `>` ni
     comillas sin cerrar.
   - CSS: las `{ }` cuadran, cada declaración termina en `;` y el
     navegador entiende la propiedad y el valor (CSS.supports).
   - JS: `( ) [ ] { }` y las comillas cuadran, y cada instrucción
     termina en `;`.
   Uso: ESCRITURA.revisar({ html, css, js }) → null si todo está bien,
        o { lenguaje, linea, mensaje } con el primer problema.
   ============================================================ */
(function () {
  const VACIAS = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
  const TEXTO_CRUDO = new Set(["script", "style", "textarea", "title"]);

  const lineaDe = (texto, i) => texto.slice(0, i).split("\n").length;
  const recortar = (t, n = 40) => {
    t = String(t).replace(/\s+/g, " ").trim();
    return t.length > n ? t.slice(0, n) + "…" : t;
  };

  /* ---------------- HTML ---------------- */
  function revisarHTML(h) {
    const pila = [];
    let i = 0;
    while (i < h.length) {
      const lt = h.indexOf("<", i);
      if (lt < 0) break;
      if (h.startsWith("<!--", lt)) {
        const fin = h.indexOf("-->", lt + 4);
        if (fin < 0) return { linea: lineaDe(h, lt), mensaje: "el comentario `<!--` de la línea " + lineaDe(h, lt) + " no está cerrado: falta `-->`." };
        i = fin + 3;
        continue;
      }
      if (h[lt + 1] === "!") {
        const fin = h.indexOf(">", lt);
        if (fin < 0) return { linea: lineaDe(h, lt), mensaje: "a `<!DOCTYPE html` de la línea " + lineaDe(h, lt) + " le falta el `>` del final." };
        i = fin + 1;
        continue;
      }
      const m = /^<(\/?)([a-zA-Z][a-zA-Z0-9-]*)/.exec(h.slice(lt, lt + 60));
      if (!m) { i = lt + 1; continue; }   // un "<" suelto en el texto (3 < 5)
      const nombre = m[2].toLowerCase();
      const cierre = m[1] === "/";
      const linea = lineaDe(h, lt);
      // Busca el ">" que cierra la etiqueta, saltando lo que va entre comillas
      let j = lt + m[0].length;
      let comilla = null;
      for (; j < h.length; j++) {
        const c = h[j];
        if (comilla) { if (c === comilla) comilla = null; continue; }
        if ((c === '"' || c === "'") && /=\s*$/.test(h.slice(Math.max(lt, j - 20), j))) { comilla = c; continue; }
        if (c === ">" || c === "<") break;
      }
      if (comilla) return { linea, mensaje: "en la etiqueta `<" + nombre + ">` de la línea " + linea + " falta cerrar unas comillas `" + comilla + "`." };
      if (j >= h.length || h[j] === "<") {
        return { linea, mensaje: "a la etiqueta `<" + (cierre ? "/" : "") + nombre + "` de la línea " + linea + " le falta el `>` del final." };
      }
      const autocierre = h[j - 1] === "/";
      i = j + 1;
      if (cierre) {
        if (VACIAS.has(nombre)) continue;
        const arriba = pila[pila.length - 1];
        if (arriba && arriba.nombre === nombre) { pila.pop(); continue; }
        if (pila.some(p => p.nombre === nombre)) {
          return { linea: arriba.linea, mensaje: "falta cerrar `<" + arriba.nombre + ">` (línea " + arriba.linea + ") antes de `</" + nombre + ">` (línea " + linea + "): escribe `</" + arriba.nombre + ">`." };
        }
        return { linea, mensaje: "sobra `</" + nombre + ">` en la línea " + linea + ": no hay ningún `<" + nombre + ">` abierto." };
      }
      if (VACIAS.has(nombre) || autocierre) continue;
      if (TEXTO_CRUDO.has(nombre)) {
        const mm = new RegExp("</" + nombre + "\\s*>", "i").exec(h.slice(i));
        if (!mm) return { linea, mensaje: "falta cerrar `<" + nombre + ">` (línea " + linea + "): escribe `</" + nombre + ">`." };
        i += mm.index + mm[0].length;
        continue;
      }
      pila.push({ nombre, linea });
    }
    if (pila.length) {
      const p = pila[pila.length - 1];
      return { linea: p.linea, mensaje: "falta cerrar `<" + p.nombre + ">` de la línea " + p.linea + ": escribe `</" + p.nombre + ">`." };
    }
    return null;
  }

  /* ---------------- CSS ---------------- */
  const GRUPOS_CSS = /^@(media|supports|container|layer|keyframes|-webkit-keyframes|document|scope|starting-style)\b/i;
  const INICIO_DECLARACION = /^\s*-{0,2}[a-zA-Z][\w-]*\s*:/;

  /** Quita comentarios y el interior de las comillas (sin mover posiciones ni saltos de línea). */
  function limpiarCSS(css) {
    let s = "";
    for (let i = 0; i < css.length; i++) {
      const c = css[i];
      if (c === "/" && css[i + 1] === "*") {
        const fin = css.indexOf("*/", i + 2);
        if (fin < 0) return { error: { linea: lineaDe(css, i), mensaje: "el comentario `/*` de la línea " + lineaDe(css, i) + " no está cerrado: falta `*/`." } };
        s += css.slice(i, fin + 2).replace(/[^\n]/g, " ");
        i = fin + 1;
      } else if (c === '"' || c === "'") {
        let j = i + 1;
        while (j < css.length && css[j] !== c && css[j] !== "\n") j += css[j] === "\\" ? 2 : 1;
        if (css[j] !== c) return { error: { linea: lineaDe(css, i), mensaje: "falta cerrar las comillas `" + c + "` de la línea " + lineaDe(css, i) + "." } };
        s += c + " ".repeat(j - i - 1) + c;
        i = j;
      } else s += c;
    }
    return { texto: s };
  }

  /** Revisa las declaraciones de un trozo entre `{`/`;` y `;`/`}`. */
  function revisarDeclaraciones(original, t, desde, hasta, alCerrar) {
    const seg = t.slice(desde, hasta);
    if (!seg.trim()) return null;
    // Dos declaraciones en el mismo trozo: falta un ";" entre ellas
    const lineas = seg.split("\n");
    let pos = desde;
    const inicios = [];
    lineas.forEach(l => { if (INICIO_DECLARACION.test(l)) inicios.push(pos); pos += l.length + 1; });
    if (inicios.length >= 2) {
      // El ";" falta en la última línea con texto antes de la segunda declaración
      let k = inicios[1] - 1;
      while (k > desde && /\s/.test(t[k])) k--;
      const n = lineaDe(original, k);
      return { linea: n, mensaje: "falta el `;` al final de la línea " + n + " (`" + recortar(original.split("\n")[n - 1]) + "`)." };
    }
    const texto = original.slice(desde, hasta);
    const n = lineaDe(original, desde + seg.search(/\S/));
    if (!seg.includes(":")) {
      return { linea: n, mensaje: "a «" + recortar(texto) + "» (línea " + n + ") le faltan los dos puntos `:` entre la propiedad y el valor." };
    }
    if (alCerrar) {
      return { linea: n, mensaje: "falta el `;` al final de `" + recortar(texto) + "` (línea " + n + ")." };
    }
    return revisarValor(seg, texto, n);
  }

  /**
   * ¿Entiende el navegador esta declaración? Si no, la tira sin avisar (traslateY, -20 sin px,
   * space-betwen…) y el alumno ve que «no funciona» sin saber por qué.
   */
  function revisarValor(seg, texto, n) {
    if (typeof CSS === "undefined" || !CSS.supports) return null;
    // Solo cuentan como espacio los de CSS: un espacio duro (copiado de una web) no lo es
    const recortarCSS = s => s.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, "");
    const dos = seg.indexOf(":");
    const prop = recortarCSS(seg.slice(0, dos)).toLowerCase();
    const valor = recortarCSS(seg.slice(dos + 1).replace(/!\s*important\s*$/i, ""));
    if (!prop || prop.startsWith("--") || !valor || CSS.supports(prop, valor)) return null;
    // seg y texto tienen las mismas posiciones (limpiarCSS solo cambia comentarios y comillas por espacios)
    const original = texto.slice(dos + 1).replace(/ /g, "␣").trim();
    if (original.includes("␣")) {
      return { linea: n, mensaje: "en la línea " + n + " hay un espacio «raro» (␣) en `" + recortar(original) + "`, quizá de copiar y pegar: bórralo y escribe un espacio normal." };
    }
    if (!CSS.supports(prop, "inherit")) {
      return { linea: n, mensaje: "la propiedad `" + prop + "` de la línea " + n + " no existe: revisa cómo está escrita." };
    }
    return { linea: n, mensaje: "el navegador no entiende el valor `" + recortar(original) + "` de `" + prop + "` (línea " + n + "). Revisa cómo está escrito: una letra, un guion, una unidad como `px`…" };
  }

  function revisarCSS(css) {
    const limpio = limpiarCSS(css);
    if (limpio.error) return limpio.error;
    const t = limpio.texto;
    const pila = [];
    let inicio = 0;
    for (let i = 0; i < t.length; i++) {
      const c = t[i];
      if (c === "{") {
        const preludio = t.slice(inicio, i).trim();
        const arriba = pila[pila.length - 1];
        const linea = lineaDe(css, i);
        if (arriba && arriba.tipo === "declaraciones") {
          return { linea: arriba.linea, mensaje: "falta cerrar con `}` la regla `" + recortar(arriba.selector) + "` (línea " + arriba.linea + ") antes de empezar `" + recortar(preludio || "{") + " {` (línea " + linea + ")." };
        }
        if (!preludio) return { linea, mensaje: "en la línea " + linea + " hay una `{` sin selector delante." };
        pila.push({ tipo: GRUPOS_CSS.test(preludio) ? "grupo" : "declaraciones", linea, selector: preludio });
        inicio = i + 1;
      } else if (c === "}") {
        const linea = lineaDe(css, i);
        if (!pila.length) return { linea, mensaje: "sobra una `}` en la línea " + linea + ": no cierra ninguna regla." };
        const bloque = pila.pop();
        if (bloque.tipo === "declaraciones") {
          const r = revisarDeclaraciones(css, t, inicio, i, true);
          if (r) return r;
        } else if (t.slice(inicio, i).trim()) {
          const n = lineaDe(css, inicio + t.slice(inicio, i).search(/\S/));
          return { linea: n, mensaje: "dentro de `" + recortar(bloque.selector) + "` hay algo sin selector ni `{ }` (línea " + n + "): «" + recortar(css.slice(inicio, i)) + "»." };
        }
        inicio = i + 1;
      } else if (c === ";") {
        const arriba = pila[pila.length - 1];
        if (arriba && arriba.tipo === "declaraciones") {
          const r = revisarDeclaraciones(css, t, inicio, i, false);
          if (r) return r;
        } else if (!/^\s*@/.test(t.slice(inicio, i))) {
          const n = lineaDe(css, inicio + t.slice(inicio, i).search(/\S/));
          return { linea: n, mensaje: "«" + recortar(css.slice(inicio, i)) + "» (línea " + n + ") está fuera de una regla: le faltan el selector y las `{ }`." };
        }
        inicio = i + 1;
      }
    }
    if (pila.length) {
      const b = pila[pila.length - 1];
      return { linea: b.linea, mensaje: "falta cerrar con `}` la regla `" + recortar(b.selector) + "` de la línea " + b.linea + "." };
    }
    const resto = t.slice(inicio);
    if (resto.trim()) {
      const n = lineaDe(css, inicio + resto.search(/\S/));
      return { linea: n, mensaje: "«" + recortar(css.slice(inicio)) + "» (línea " + n + ") está suelto: le faltan las `{ }` o el `;`." };
    }
    return null;
  }

  /* ---------------- JS ---------------- */
  const PAREJA = { "(": ")", "[": "]", "{": "}", "${": "}" };
  const ANTES_DE_OBJETO = new Set(["=", "(", "[", ",", ":", "return", "?", "||", "&&", "??"]);
  const CABECERAS = new Set(["if", "for", "while", "switch", "catch"]);
  const PALABRAS_QUE_SIGUEN = new Set(["else", "do", "try", "finally", "in", "of", "typeof", "new", "await", "async", "const", "let", "var", "function", "instanceof", "case", "default", "yield"]);

  /**
   * Recorre el código: comprueba comillas, comentarios y paréntesis/corchetes/llaves.
   * Devuelve { error } o { limpio, lineas } (código sin comentarios ni contenido de comillas y,
   * por línea, qué bracket queda abierto al final y qué cerró el último carácter).
   */
  function analizarJS(js) {
    const n = js.length;
    let limpio = "";
    const pila = [];
    const lineas = {};
    let linea = 1;
    let previo = "";
    let previo2 = "";
    let ultimoCierre = null;
    let enPlantilla = false;
    const finLinea = enCadena => {
      const arriba = pila[pila.length - 1];
      lineas[linea] = { enCadena, abierto: arriba ? arriba.tipo : null, ultimoCierre };
      ultimoCierre = null;
      linea++;
    };
    const error = (i, mensaje) => ({ error: { linea: lineaDe(js, i), mensaje } });

    for (let i = 0; i < n; i++) {
      const c = js[i];
      if (enPlantilla) {
        if (c === "\\") { limpio += "  "; i++; continue; }
        if (c === "`") { enPlantilla = false; limpio += "`"; previo2 = previo; previo = "cadena"; ultimoCierre = { tipo: "cadena" }; continue; }
        if (c === "$" && js[i + 1] === "{") {
          pila.push({ c: "${", tipo: "${", linea, i });
          enPlantilla = false;
          limpio += "${";
          i++;
          previo = "${";
          continue;
        }
        if (c === "\n") { limpio += "\n"; finLinea(true); continue; }
        limpio += " ";
        continue;
      }
      if (c === "\n") { limpio += "\n"; finLinea(false); continue; }
      if (c === "/" && js[i + 1] === "/") {
        while (i < n && js[i] !== "\n") { limpio += " "; i++; }
        i--;
        continue;
      }
      if (c === "/" && js[i + 1] === "*") {
        const fin = js.indexOf("*/", i + 2);
        if (fin < 0) return error(i, "el comentario `/*` de la línea " + lineaDe(js, i) + " no está cerrado: falta `*/`.");
        for (let k = i; k < fin + 2; k++) {
          if (js[k] === "\n") { limpio += "\n"; finLinea(true); } else limpio += " ";
        }
        i = fin + 1;
        continue;
      }
      if (c === '"' || c === "'") {
        let j = i + 1;
        while (j < n && js[j] !== c && js[j] !== "\n") j += js[j] === "\\" ? 2 : 1;
        if (js[j] !== c) return error(i, "falta cerrar las comillas `" + c + "` de la línea " + lineaDe(js, i) + ".");
        limpio += c + " ".repeat(j - i - 1) + c;
        i = j;
        previo2 = previo; previo = "cadena";
        ultimoCierre = { tipo: "cadena" };
        continue;
      }
      if (c === "`") { enPlantilla = true; limpio += "`"; continue; }
      if (c === "(" || c === "[" || c === "{") {
        let tipo = c;
        if (c === "(") tipo = CABECERAS.has(previo) ? "cabecera" : previo === "function" || previo2 === "function" ? "firma" : "(";
        if (c === "{") tipo = ANTES_DE_OBJETO.has(previo) ? "objeto" : "bloque";
        pila.push({ c, tipo, linea, i });
        limpio += c;
        previo2 = previo; previo = c;
        ultimoCierre = null;
        continue;
      }
      if (c === ")" || c === "]" || c === "}") {
        const arriba = pila.pop();
        if (!arriba) return error(i, "sobra un `" + c + "` en la línea " + linea + ": no cierra nada.");
        if (PAREJA[arriba.c] !== c) {
          return error(arriba.i, "falta cerrar el `" + arriba.c + "` de la línea " + arriba.linea + " (con `" + PAREJA[arriba.c] + "`) antes del `" + c + "` de la línea " + linea + ".");
        }
        limpio += c;
        if (arriba.c === "${") { enPlantilla = true; continue; }
        ultimoCierre = { tipo: arriba.tipo };
        previo2 = previo; previo = c;
        continue;
      }
      if (/[\w$]/.test(c)) {
        let j = i;
        while (j < n && /[\w$]/.test(js[j])) j++;
        const palabra = js.slice(i, j);
        limpio += palabra;
        previo2 = previo; previo = palabra;
        ultimoCierre = null;
        i = j - 1;
        continue;
      }
      if (/[=+\-*/%&|!<>?:^~]/.test(c)) {
        let j = i;
        while (j < n && /[=+\-*/%&|!<>?:^~]/.test(js[j]) && !(js[j] === "/" && (js[j + 1] === "/" || js[j + 1] === "*"))) j++;
        limpio += js.slice(i, j);
        previo2 = previo; previo = js.slice(i, j);
        ultimoCierre = null;
        i = j - 1;
        continue;
      }
      limpio += c;
      if (!/\s/.test(c)) { previo2 = previo; previo = c; ultimoCierre = null; }
    }
    if (enPlantilla) return error(n - 1, "falta cerrar las comillas invertidas `` ` `` de una plantilla de texto.");
    finLinea(false);
    if (pila.length) {
      const p = pila[pila.length - 1];
      return error(p.i, "falta cerrar el `" + p.c + "` que abriste en la línea " + p.linea + ": escribe `" + PAREJA[p.c] + "`.");
    }
    return { limpio, lineas };
  }

  function revisarJS(js) {
    const a = analizarJS(js);
    if (a.error) return a.error;
    const filas = a.limpio.split("\n");
    const originales = js.split("\n");
    for (let k = 0; k < filas.length; k++) {
      const num = k + 1;
      const info = a.lineas[num] || {};
      const t = filas[k].trim();
      if (!t || info.enCadena) continue;
      const ultimo = t[t.length - 1];
      const terminaValor = /[\w$)\]"'`}]/.test(ultimo) || /(\+\+|--)$/.test(t);
      if (!terminaValor) continue;
      // Dentro de una llamada, un array, un objeto o un ${…}: no se pone ";"
      if (info.abierto && info.abierto !== "bloque") continue;
      // La siguiente línea continúa la instrucción (.metodo(), operador, ")"…)
      let s = k + 1;
      while (s < filas.length && !filas[s].trim()) s++;
      const siguiente = s < filas.length ? filas[s].trim() : "";
      if (/^(\.|\)|\]|,|\?|:|&&|\|\||\?\?|[+*/%=<>]|-(?!-))/.test(siguiente)) continue;
      if (ultimo === ")" && info.ultimoCierre && (info.ultimoCierre.tipo === "cabecera" || info.ultimoCierre.tipo === "firma")) continue;
      if (ultimo === "}" && !(info.ultimoCierre && info.ultimoCierre.tipo === "objeto")) continue;
      if (/[\w$]/.test(ultimo)) {
        const palabra = t.match(/[\w$]+$/)[0];
        if (PALABRAS_QUE_SIGUEN.has(palabra)) continue;
      }
      return { linea: num, mensaje: "falta el `;` al final de la línea " + num + " (`" + recortar(originales[k]) + "`)." };
    }
    return null;
  }

  /* ---------------- Todo junto ---------------- */
  const NOMBRES = { html: "HTML", css: "CSS", js: "JS" };
  const REVISORES = { html: revisarHTML, css: revisarCSS, js: revisarJS };

  function revisar(codigo) {
    for (const k of ["html", "css", "js"]) {
      const texto = (codigo && codigo[k]) || "";
      if (!texto.trim()) continue;
      const r = REVISORES[k](texto);
      if (r) {
        return { lenguaje: k, linea: r.linea, mensaje: "En tu " + NOMBRES[k] + ", " + r.mensaje };
      }
    }
    return null;
  }

  window.ESCRITURA = { revisar, revisarHTML, revisarCSS, revisarJS };
})();
