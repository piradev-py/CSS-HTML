/* ============================================================
   <CSS-HTML> · Mapa de niveles (index.html)
   ============================================================ */
(function () {
  UI.montarCabecera();

  const DESPLAZAMIENTOS = [0, 70, 105, 70, 0, -70, -105, -70];
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
      const sec = document.createElement("section");
      sec.className = "mundo mundo-" + m.clave + (abierto ? "" : " mundo-cerrado");
      sec.id = "mundo-" + m.numero;
      sec.innerHTML =
        '<header class="mundo-cabecera">' +
          '<div class="mundo-emoji" aria-hidden="true">' + (abierto ? m.emoji : "🔒") + "</div>" +
          "<div><div class=\"mundo-num\">Mundo " + m.numero + "</div>" +
          "<h2>" + UI.escapar(m.nombre) + "</h2><p>" + UI.escapar(m.lema) + "</p></div>" +
          '<div class="mundo-progreso"><b>' + hechas + "/" + m.lecciones.length + "</b>" +
          '<div class="mini-barra"><div style="width:' + Math.round((hechas / m.lecciones.length) * 100) + '%"></div></div>' +
          (listas < m.lecciones.length ? '<small>' + listas + " disponibles</small>" : "") +
          "</div>" +
        "</header>" +
        '<div class="camino"><svg class="camino-linea" aria-hidden="true"></svg><ol class="nodos"></ol></div>';
      const ol = sec.querySelector(".nodos");
      m.lecciones.forEach((l, i) => {
        const estado = estadoLeccion(l);
        const esActual = actual && actual.id === l.id;
        const li = document.createElement("li");
        li.className = "nodo-fila";
        li.style.setProperty("--d", DESPLAZAMIENTOS[i % DESPLAZAMIENTOS.length]);
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
      cont.appendChild(sec);
    });
    requestAnimationFrame(dibujarCaminos);
  }

  /* Dibuja la línea de puntos que une los nodos de cada mundo */
  function dibujarCaminos() {
    document.querySelectorAll(".camino").forEach(camino => {
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
        const prev = puntos[i - 1];
        const medio = (prev[1] + p[1]) / 2;
        d += " C" + prev[0] + " " + medio + " " + p[0] + " " + medio + " " + p[0] + " " + p[1];
      });
      svg.innerHTML = '<path d="' + d + '"/>';
    });
  }

  /* ---------- Insignias ---------- */
  function pintarInsignias() {
    const cont = document.querySelector("[data-insignias]");
    cont.innerHTML = PROGRESO.INSIGNIAS.map(ins => {
      const tiene = PROGRESO.tieneInsignia(ins.id);
      return '<div class="insignia' + (tiene ? " ganada" : "") + '" title="' + UI.escapar(ins.desc) + '">' +
        '<div class="insignia-emoji">' + (tiene ? ins.emoji : "❔") + "</div>" +
        "<b>" + UI.escapar(ins.nombre) + "</b><small>" + UI.escapar(ins.desc) + "</small></div>";
    }).join("");
  }

  /* ---------- Opciones del curso: modo prueba y reinicio ---------- */
  function pintarOpciones() {
    const cont = document.querySelector("[data-opciones-curso]");
    const prueba = PROGRESO.enPrueba();
    cont.innerHTML = prueba
      ? "<h2>🧪 Estás en modo prueba</h2>" +
        "<p>Todo está desbloqueado. Lo que hagas aquí no cambia tu progreso real y se borra al cerrar la pestaña.</p>" +
        '<div class="opciones-botones">' +
        '<button class="boton secundario" data-reiniciar>↺ Empezar la prueba de cero</button>' +
        '<button class="boton" data-salir>🚪 Salir y volver a mi progreso</button></div>'
      : "<h2>🛠️ Opciones del curso</h2>" +
        "<p>¿Quieres echar un vistazo a cualquier lección sin que cuente? Usa el <b>modo prueba</b>: " +
        "todo desbloqueado y tu progreso real queda intacto.</p>" +
        '<div class="opciones-botones">' +
        '<button class="boton morado" data-entrar>🧪 Probar el curso sin guardar</button>' +
        '<button class="boton secundario" data-reiniciar>🔄 Reiniciar curso</button></div>';
    const accion = (sel, fn) => { const b = cont.querySelector(sel); if (b) b.addEventListener("click", fn); };
    accion("[data-entrar]", UI.entrarPrueba);
    accion("[data-salir]", UI.salirPrueba);
    accion("[data-reiniciar]", UI.reiniciarCurso);
  }

  pintarBienvenida();
  pintarMundos();
  pintarInsignias();
  pintarOpciones();

  let espera;
  window.addEventListener("resize", () => {
    clearTimeout(espera);
    espera = setTimeout(dibujarCaminos, 100);
  });
  // Las fuentes web cambian el tamaño de los nodos al cargar: redibujamos
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(dibujarCaminos);

  // Lleva la vista al nodo actual si el alumno ya avanzó
  if (actual && Object.keys(PROGRESO.datos.completadas).length > 0) {
    const nodo = document.querySelector(".nodo.actual");
    if (nodo) setTimeout(() => nodo.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
  }
})();
