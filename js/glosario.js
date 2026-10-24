/* ============================================================
   <CSS-HTML> · Glosario de consulta (lecciones de proyecto)
   - Cada lección declara lo que enseña en su propio archivo:
       glosario: [{ termino: "<label>", tema: "Formularios",
                    para: "El texto de un campo; con for=\"id\" se une a él.",
                    ejemplo: '<label for="nombre">Nombre</label>',
                    buscar: "etiqueta texto campo" }]   // buscar: opcional
   - GLOSARIO.montar(columna, id) junta los términos de todas las
     lecciones ANTERIORES a `id` (nunca enseña lo que aún no se ha
     visto), por mundo y por tema, con buscador.
   - alternar(destacados): abre o cierra el panel; arriba salen los
     términos que pide el encargo actual (paso.glosario).
   ============================================================ */
(function () {
  const simple = t => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  /** Carga los archivos de las lecciones anteriores a `id` (los que falten) y junta sus términos. */
  function cargar(id) {
    const lista = CURSO.listaPlana();
    const antes = lista.slice(0, lista.findIndex(l => l.id === id)).filter(l => l.listo);
    return Promise.all(antes.map(l => CURSO.lecciones[l.id] ? null : new Promise(res => {
      const s = document.createElement("script");
      s.src = CURSO.ruta(l.id) + "?v=" + CURSO.VERSION;
      s.onload = s.onerror = res;
      document.head.appendChild(s);
    }))).then(() => antes.flatMap(l => ((CURSO.lecciones[l.id] || {}).glosario || []).map(t => Object.assign({ leccion: l }, t))));
  }

  function lenguaje(t) {
    if (t.lenguaje) return t.lenguaje;
    if (t.leccion.mundo.clave === "js") return "js";
    return /^\s*</.test(t.ejemplo || "") ? "html" : "css";
  }

  function entrada(t) {
    const art = document.createElement("article");
    art.className = "g-entrada";
    const numero = t.leccion.mundo.lecciones.findIndex(l => l.id === t.leccion.id) + 1;
    art.innerHTML =
      '<code class="g-termino"></code><p class="g-para">' + UI.md(t.para) + "</p>" +
      (t.ejemplo ? '<div class="g-ejemplo"><pre class="codigo">' + UI.resaltar(t.ejemplo, lenguaje(t)) + "</pre>" +
        '<button class="mini-boton" data-copiar title="' + T("Copiar el ejemplo") + '">' + T("📋 Copiar") + "</button></div>" : "") +
      '<a class="g-leccion" target="_blank" href="leccion.html?id=' + t.leccion.id + '">' + T("📖 Lección {n} · {titulo}", { n: numero, titulo: UI.escapar(t.leccion.titulo) }) + "</a>";
    art.querySelector(".g-termino").textContent = t.termino;
    const copiar = art.querySelector("[data-copiar]");
    if (copiar) copiar.addEventListener("click", () => {
      // Sin permiso de portapapeles (algunos navegadores con file://) se selecciona el texto para copiarlo a mano
      const pre = art.querySelector("pre");
      Promise.resolve(navigator.clipboard && navigator.clipboard.writeText(t.ejemplo))
        .then(() => { copiar.textContent = T("✅ Copiado"); setTimeout(() => { copiar.textContent = T("📋 Copiar"); }, 1500); })
        .catch(() => getSelection().selectAllChildren(pre));
    });
    art.dataset.busca = simple([t.termino, t.para, t.tema, t.buscar, t.ejemplo].join(" "));
    return art;
  }

  function montar(columna, id) {
    const panel = document.createElement("aside");
    panel.className = "glosario";
    panel.hidden = true;
    panel.setAttribute("aria-label", T("Glosario"));
    panel.innerHTML =
      '<div class="g-cabeza"><h2>' + T("📚 Glosario") + '</h2><button class="mini-boton" data-cerrar>' + T("✖ Cerrar") + "</button></div>" +
      '<input type="search" class="g-buscar" placeholder="' + T("Busca una etiqueta o lo que quieres hacer (centrar, enlace…)") + '" aria-label="' + T("Buscar en el glosario") + '">' +
      '<div class="g-cuerpo"><p class="texto-suave">' + T("Cargando…") + "</p></div>";
    columna.appendChild(panel);
    const cuerpo = panel.querySelector(".g-cuerpo");
    const buscador = panel.querySelector(".g-buscar");
    let terminos = null;
    let destacados = [];

    function pintar() {
      if (!terminos) return;
      cuerpo.innerHTML = "";
      const elegidos = terminos.filter(t => destacados.includes(t.termino));
      const grupos = [];
      if (elegidos.length) grupos.push({ titulo: T("⭐ Para este encargo"), temas: [{ tema: "", lista: elegidos }] });
      CURSO.MUNDOS.forEach(m => {
        const deEste = terminos.filter(t => t.leccion.mundo === m);
        if (!deEste.length) return;
        const temas = [];
        deEste.forEach(t => {
          let g = temas.find(x => x.tema === t.tema);
          if (!g) temas.push(g = { tema: t.tema, lista: [] });
          g.lista.push(t);
        });
        grupos.push({ titulo: m.emoji + " " + m.nombre, temas });
      });
      grupos.forEach(g => {
        const sec = document.createElement("section");
        sec.className = "g-grupo";
        sec.innerHTML = "<h3>" + UI.escapar(g.titulo) + "</h3>";
        g.temas.forEach(tm => {
          if (tm.tema) sec.insertAdjacentHTML("beforeend", '<h4 class="g-tema">' + UI.escapar(tm.tema) + "</h4>");
          tm.lista.forEach(t => sec.appendChild(entrada(t)));
        });
        cuerpo.appendChild(sec);
      });
      if (!terminos.length) cuerpo.innerHTML = '<p class="texto-suave">' + T("Todavía no hay términos.") + "</p>";
      filtrar();
    }

    function filtrar() {
      const q = simple(buscador.value).trim();
      cuerpo.querySelectorAll(".g-entrada").forEach(e => { e.hidden = !!q && !e.dataset.busca.includes(q); });
      cuerpo.querySelectorAll(".g-tema").forEach(h => {
        let n = h.nextElementSibling, alguno = false;
        while (n && n.classList.contains("g-entrada")) { if (!n.hidden) alguno = true; n = n.nextElementSibling; }
        h.hidden = !alguno;
      });
      cuerpo.querySelectorAll(".g-grupo").forEach(s => { s.hidden = !s.querySelector(".g-entrada:not([hidden])"); });
    }

    buscador.addEventListener("input", filtrar);
    panel.querySelector("[data-cerrar]").addEventListener("click", () => { panel.hidden = true; });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !panel.hidden) panel.hidden = true; });

    const listo = cargar(id).then(t => { terminos = t; pintar(); });

    return {
      listo,
      alternar(nuevos) {
        destacados = nuevos || [];
        panel.hidden = !panel.hidden;
        if (!panel.hidden) { pintar(); buscador.focus(); }
      }
    };
  }

  window.GLOSARIO = { montar, cargar };
})();
