/* ============================================================
   <CSS-HTML> · Mapa de niveles (index.html)
   ============================================================ */
(function () {
  UI.montarCabecera();

  const ANCHO_NODO = 170;   // px que ocupa cada lección en una fila del camino
  const actual = PROGRESO.siguientePendiente();

  /* ---------- Bienvenida ---------- */
  function pintarBienvenida() {
    const cont = document.querySelector("[data-bienvenida]");
    const n = PROGRESO.nivel();
    const empezado = Object.keys(PROGRESO.datos.completadas).length > 0;
    const saludo = empezado
      ? MASCOTA.azar(MASCOTA.FRASES.bienvenida.slice(1))
      : "¡Hola! Soy <b>Tagui</b> 👋 Aquí aprenderás a crear páginas web desde cero. ¡Sin prisa y jugando!";
    cont.innerHTML =
      '<div class="bienvenida-texto">' +
        "<h1>Aprende a crear páginas web <span class=\"resaltado\">jugando</span></h1>" +
        "<p>Empieza por <b>HTML</b>, dale estilo con <b>CSS</b>, combínalos y termina dando vida a tus páginas con <b>JavaScript</b>. " +
        "Cada lección es cortita y acaba con un reto.</p>" +
        '<div class="bienvenida-acciones"></div>' +
      "</div>";
    const acciones = cont.querySelector(".bienvenida-acciones");
    if (actual) {
      acciones.innerHTML =
        '<a class="boton grande" href="leccion.html?id=' + actual.id + '">' +
        (empezado ? "▶ Continuar: " : "🚀 Empezar: ") + UI.escapar(actual.titulo) + "</a>";
    } else {
      acciones.innerHTML = '<p class="texto-suave">🎉 Has completado todas las lecciones disponibles. ¡Pronto habrá más!</p>';
    }
    if (PROGRESO.estaCompletada("js-17")) acciones.insertAdjacentHTML("beforeend", '<a class="boton" href="mi-clinica.html">🏥 Mi clínica</a>');
    acciones.insertAdjacentHTML("beforeend", '<a class="boton secundario" href="laboratorio.html">🧪 Laboratorio</a>');
    acciones.insertAdjacentHTML("beforeend",
      '<span class="chip">' + n.emoji + " " + n.nombre + " · " + n.xp + " XP</span>");
    cont.prepend(MASCOTA.crear(saludo, "alegre"));
  }

  /* ---------- Mundos y nodos ---------- */
  function estadoLeccion(l) {
    if (PROGRESO.estaCompletada(l.id)) return "completada";
    if (!l.listo) return "proximamente";
    if (!PROGRESO.estaDesbloqueada(l.id)) return "bloqueada";
    return "disponible";
  }

  function pintarMundos() {
    const cont = document.querySelector("[data-mundos]");
    cont.innerHTML = "";
    CURSO.MUNDOS.forEach(m => {
      const hechas = m.lecciones.filter(l => PROGRESO.estaCompletada(l.id)).length;
      const listas = m.lecciones.filter(l => l.listo).length;
      const abierto = PROGRESO.estaDesbloqueada(m.lecciones[0].id);
      // <details>: cada mundo se abre y se cierra pulsando su cabecera. Al entrar, todos cerrados,
      // salvo si venimos de una lección (index.html#mundo-N): ver abrirMundoDelEnlace().
      const sec = document.createElement("details");
      sec.className = "mundo mundo-" + m.clave + (abierto ? "" : " mundo-cerrado");
      sec.id = "mundo-" + m.numero;
      sec.innerHTML =
        '<summary class="mundo-cabecera">' +
          '<div class="mundo-emoji" aria-hidden="true">' + (abierto ? m.emoji : "🔒") + "</div>" +
          "<div><div class=\"mundo-num\">Mundo " + m.numero + "</div>" +
          "<h2>" + UI.escapar(m.nombre) + "</h2><p>" + UI.escapar(m.lema) + "</p></div>" +
          '<div class="mundo-progreso"><b>' + hechas + "/" + m.lecciones.length + "</b>" +
          '<div class="mini-barra"><div style="width:' + Math.round((hechas / m.lecciones.length) * 100) + '%"></div></div>' +
          (listas < m.lecciones.length ? '<small>' + listas + " disponibles</small>" : "") +
          "</div>" +
          '<span class="mundo-flecha" aria-hidden="true">▾</span>' +
        "</summary>" +
        '<div class="camino"><svg class="camino-linea" aria-hidden="true"></svg><ol class="nodos"></ol></div>';
      const ol = sec.querySelector(".nodos");
      m.lecciones.forEach((l, i) => {
        const estado = estadoLeccion(l);
        const esActual = actual && actual.id === l.id;
        const li = document.createElement("li");
        li.className = "nodo-fila";
        const estrellas = PROGRESO.estrellas(l.id);
        const icono = {
          completada: "✓",
          disponible: String(i + 1),
          bloqueada: "🔒",
          proximamente: "🚧"
        }[estado];
        const etiqueta = l.titulo + " — " + {
          completada: "completada con " + estrellas + " estrellas",
          disponible: "disponible",
          bloqueada: "bloqueada",
          proximamente: "próximamente"
        }[estado];
        const etiquetaNodo = estado === "disponible" || estado === "completada" ? "a" : "span";
        li.innerHTML =
          (esActual ? '<div class="globo-actual">¡Empieza aquí!</div>' : "") +
          "<" + etiquetaNodo + ' class="nodo ' + estado + (esActual ? " actual" : "") + '"' +
          (etiquetaNodo === "a" ? ' href="leccion.html?id=' + l.id + '"' : "") +
          ' aria-label="' + UI.escapar(etiqueta) + '">' + icono + "</" + etiquetaNodo + ">" +
          (estado === "completada"
            ? '<div class="nodo-estrellas" aria-hidden="true">' + [1, 2, 3].map(n => n <= estrellas ? "⭐" : "☆").join("") + "</div>"
            : "") +
          '<div class="nodo-titulo">' + UI.escapar(l.titulo) + "</div>";
        ol.appendChild(li);
      });
      // Al abrirlo, el camino se coloca con el ancho real (cerrado no mide nada)
      sec.addEventListener("toggle", () => { if (sec.open) maquetarCamino(sec.querySelector(".camino")); });
      cont.appendChild(sec);
    });
  }

  /*
   * Camino en serpiente: las lecciones van en filas horizontales; la 1.ª fila de izquierda a derecha,
   * la 2.ª de derecha a izquierda… y una curva en U une el final de una fila con el principio de la siguiente.
   * Dentro de cada fila los nodos suben y bajan un poco (ola) para que el camino tenga curvas.
   */
  function maquetarCamino(camino) {
    if (!camino || !camino.clientWidth) return;
    const ol = camino.querySelector(".nodos");
    const filas = [...ol.children];
    const cols = Math.max(2, Math.min(6, Math.floor((camino.clientWidth - 100) / ANCHO_NODO)));
    ol.style.setProperty("--cols", cols);
    filas.forEach((li, i) => {
      const fila = Math.floor(i / cols);
      const pos = i % cols;
      const col = fila % 2 === 0 ? pos : cols - 1 - pos;
      li.style.gridRow = fila + 1;
      li.style.gridColumn = col + 1;
      li.classList.toggle("ola-baja", col % 2 === 1);
    });
    dibujarCamino(camino, cols);
  }

  function dibujarCamino(camino, cols) {
    const svg = camino.querySelector(".camino-linea");
    const caja = camino.getBoundingClientRect();
    const puntos = [...camino.querySelectorAll(".nodo")].map(n => {
      const r = n.getBoundingClientRect();
      return [r.left + r.width / 2 - caja.left, r.top + r.height / 2 - caja.top];
    });
    svg.setAttribute("viewBox", "0 0 " + caja.width + " " + caja.height);
    svg.setAttribute("width", caja.width);
    svg.setAttribute("height", caja.height);
    let d = "";
    puntos.forEach((p, i) => {
      if (i === 0) { d += "M" + p[0] + " " + p[1]; return; }
      const [x0, y0] = puntos[i - 1];
      const [x1, y1] = p;
      if (i % cols === 0) {
        // Cambio de fila: curva en U hacia fuera (a la derecha en las filas pares, a la izquierda en las impares)
        const lado = Math.floor((i - 1) / cols) % 2 === 0 ? 1 : -1;
        const abre = Math.max(70, (y1 - y0) * 0.6) * lado;
        d += " C" + (x0 + abre) + " " + y0 + " " + (x1 + abre) + " " + y1 + " " + x1 + " " + y1;
      } else {
        // En la fila: curva suave en S entre dos nodos a distinta altura
        const medio = (x0 + x1) / 2;
        d += " C" + medio + " " + y0 + " " + medio + " " + y1 + " " + x1 + " " + y1;
      }
    });
    svg.innerHTML = '<path d="' + d + '"/>';
  }

  /** Si la dirección trae #mundo-N (volvemos de una lección), abre ese mundo y baja hasta él. */
  function abrirMundoDelEnlace() {
    const mundo = location.hash && document.getElementById(location.hash.slice(1));
    if (!mundo || !mundo.matches("details.mundo")) return;
    mundo.open = true;
    mundo.scrollIntoView({ block: "start" });
  }

  function maquetarAbiertos() {
    document.querySelectorAll(".mundo[open] .camino").forEach(maquetarCamino);
  }

  /* ---------- Insignias ---------- */
  function pintarInsignias() {
    const cont = document.querySelector("[data-insignias]");
    const ganadas = PROGRESO.INSIGNIAS.filter(ins => PROGRESO.tieneInsignia(ins.id)).length;
    document.querySelector("[data-contador-insignias]").textContent = ganadas + "/" + PROGRESO.INSIGNIAS.length;
    cont.innerHTML = PROGRESO.INSIGNIAS.map(ins => {
      const tiene = PROGRESO.tieneInsignia(ins.id);
      return '<div class="insignia' + (tiene ? " ganada" : "") + '" title="' + UI.escapar(ins.desc) + '">' +
        '<div class="insignia-emoji">' + (tiene ? ins.emoji : "❔") + "</div>" +
        "<b>" + UI.escapar(ins.nombre) + "</b><small>" + UI.escapar(ins.desc) + "</small></div>";
    }).join("");
  }

  /* ---------- Modo prueba (solo en local; reiniciar el curso está en ⚙️ Ajustes) ---------- */
  function pintarOpciones() {
    const cont = document.querySelector("[data-opciones-curso]");
    if (!PROGRESO.pruebaDisponible()) { cont.remove(); return; }
    cont.innerHTML = PROGRESO.enPrueba()
      ? "<h2>🧪 Estás en modo prueba</h2>" +
        "<p>Todo está desbloqueado. Lo que hagas aquí no cambia tu progreso real y se borra al cerrar la pestaña.</p>" +
        '<div class="opciones-botones">' +
        '<button class="boton" data-salir>🚪 Salir y volver a mi progreso</button></div>'
      : "<h2>🛠️ Modo prueba (solo en local)</h2>" +
        "<p>¿Quieres echar un vistazo a cualquier lección sin que cuente? Usa el <b>modo prueba</b>: " +
        "todo desbloqueado y tu progreso real queda intacto.</p>" +
        '<div class="opciones-botones">' +
        '<button class="boton morado" data-entrar>🧪 Probar el curso sin guardar</button></div>';
    const accion = (sel, fn) => { const b = cont.querySelector(sel); if (b) b.addEventListener("click", fn); };
    accion("[data-entrar]", UI.entrarPrueba);
    accion("[data-salir]", UI.salirPrueba);
  }

  pintarBienvenida();
  pintarMundos();
  abrirMundoDelEnlace();
  pintarInsignias();
  pintarOpciones();
  document.querySelector("[data-version]").textContent = CURSO.VERSION;

  let espera;
  window.addEventListener("resize", () => {
    clearTimeout(espera);
    espera = setTimeout(maquetarAbiertos, 100);
  });
  // Las fuentes web cambian el tamaño de los nodos al cargar: redibujamos
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(maquetarAbiertos);
})();
