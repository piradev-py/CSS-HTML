/* ============================================================
   <CSS-HTML> · Vista de lección (leccion.html?id=...)
   Espacio de trabajo a pantalla completa en 3 columnas:
     📖 lección (texto, enunciado, pistas, navegación)
     💻 código (editor, ejemplo o controles)
     👀 resultado
   Los pasos sin código (quiz, explicación sin ejemplo) unen las
   columnas de código y resultado en una "pizarra".
   ============================================================ */
(function () {
  const id = new URLSearchParams(location.search).get("id");
  const principal = document.querySelector("main");
  const info = CURSO.buscar(id);
  // Al volver al mapa, se abre directamente el mundo de esta lección (ver js/mapa.js)
  const urlMapa = info ? "index.html#mundo-" + info.mundo.numero : "index.html";

  UI.montarCabecera('<a class="boton-icono" href="' + urlMapa + '" aria-label="Volver al mapa">🗺️</a>');

  function aviso(emoji, titulo, texto) {
    document.body.classList.remove("con-espacio");
    principal.innerHTML =
      '<div class="aviso-grande tarjeta"><div class="aviso-emoji">' + emoji + "</div><h1>" + titulo + "</h1><p>" + texto + "</p>" +
      '<a class="boton grande azul" href="' + urlMapa + '">🗺️ Volver al mapa</a></div>';
  }

  if (!info) return aviso("🧭", "Lección no encontrada", "Parece que esta lección no existe. Vuelve al mapa y elige otra.");
  if (!info.listo) return aviso("🚧", "Próximamente", "El profesor todavía está preparando «" + UI.escapar(info.titulo) + "». ¡Vuelve pronto!");
  if (!PROGRESO.estaDesbloqueada(id)) return aviso("🔒", "Lección bloqueada", "Completa antes la lección anterior para desbloquear esta.");

  function cargarScript(ruta, alCargar) {
    const script = document.createElement("script");
    script.src = ruta + "?v=" + CURSO.VERSION;  // ?v=: tras publicar, nada de lecciones viejas en caché
    script.onload = alCargar;
    script.onerror = () => aviso("😵", "No pude cargar la lección", "No encuentro el archivo <code>" + UI.escapar(ruta) + "</code>.");
    document.body.appendChild(script);
  }
  function cargarLeccion() {
    cargarScript(CURSO.ruta(id), () => {
      const leccion = CURSO.lecciones[id];
      if (!leccion) return aviso("😵", "Algo salió mal", "El archivo de la lección no se registró correctamente.");
      iniciar(leccion);
    });
  }
  // Las lecciones de proyecto parten de las versiones oficiales de «Huellas» (HUELLAS, ver herramientas/huellas-versiones.mjs)
  if (info.huellas) cargarScript(CURSO.RUTA_HUELLAS, cargarLeccion);
  else cargarLeccion();

  function iniciar(leccion) {
    const mundo = info.mundo;
    const pestanas = leccion.pestanas || mundo.pestanas;
    const numero = mundo.lecciones.findIndex(l => l.id === id) + 1;
    const yaCompletada = PROGRESO.estaCompletada(id);
    let actual = 0;
    let maximo = yaCompletada ? leccion.pasos.length - 1 : 0;
    const quizResuelto = {};
    const ejercicioResuelto = {};
    const proyectoResuelto = {};
    let estrellasProyecto = 3;   // la lección de proyecto se lleva las estrellas de su peor paso

    document.title = leccion.titulo + " · <CSS-HTML>";
    document.body.dataset.mundo = mundo.clave;
    document.body.classList.add("con-espacio");

    principal.innerHTML =
      '<div class="espacio-trabajo">' +
        '<section class="col col-leccion" aria-label="Lección">' +
          '<header class="leccion-cabeza">' +
            '<div class="miga">' + mundo.emoji + " " + UI.escapar(mundo.nombre) + " · Lección " + numero + "</div>" +
            '<h1 class="leccion-titulo">' + UI.escapar(leccion.titulo) + "</h1>" +
            '<p class="objetivo" title="' + UI.escapar(leccion.objetivo) + '">🎯 ' + UI.md(leccion.objetivo) + "</p>" +
            '<div class="puntos-pasos" role="list"></div>' +
          "</header>" +
          '<div class="paso-actual" aria-live="polite"></div>' +
          '<nav class="navegacion-pasos">' +
            '<button class="boton secundario" data-anterior>← Anterior</button>' +
            '<span class="contador-pasos"></span>' +
            '<button class="boton" data-siguiente>Siguiente →</button>' +
          "</nav>" +
        "</section>" +
        '<div class="divisor" data-divisor="0" role="separator" aria-orientation="vertical" tabindex="0" title="Arrastra para cambiar el ancho (doble clic: restablecer)"></div>' +
        '<section class="col col-codigo" aria-label="Código"></section>' +
        '<div class="divisor" data-divisor="1" role="separator" aria-orientation="vertical" tabindex="0" title="Arrastra para cambiar el ancho (doble clic: restablecer)"></div>' +
        '<section class="col col-resultado" aria-label="Resultado"></section>' +
        '<section class="col col-pizarra"></section>' +
      "</div>";

    const espacio = principal.querySelector(".espacio-trabajo");
    const puntos = principal.querySelector(".puntos-pasos");
    const zona = principal.querySelector(".paso-actual");
    const colCodigo = principal.querySelector(".col-codigo");
    const colResultado = principal.querySelector(".col-resultado");
    const colPizarra = principal.querySelector(".col-pizarra");
    const destinos = { codigo: colCodigo, resultado: colResultado };
    const bAnterior = principal.querySelector("[data-anterior]");
    const bSiguiente = principal.querySelector("[data-siguiente]");
    const contador = principal.querySelector(".contador-pasos");

    COLUMNAS.activar(espacio);
    // Las lecciones de proyecto llevan a mano el glosario de todo lo aprendido hasta aquí
    const glosario = leccion.pasos.some(p => p.tipo === "proyecto") ? GLOSARIO.montar(principal.querySelector(".col-leccion"), id) : null;

    const ICONO_PASO = { explicacion: "📖", pruebalo: "✍️", ejercicio: "🧠", controles: "🎛️", quiz: "❓", reto: "🏆", proyecto: "📋" };

    leccion.pasos.forEach((p, i) => {
      const b = document.createElement("button");
      b.className = "punto-paso";
      b.setAttribute("role", "listitem");
      b.title = "Paso " + (i + 1);
      b.textContent = ICONO_PASO[p.tipo] || "•";
      b.addEventListener("click", () => { if (i <= maximo) ir(i); });
      puntos.appendChild(b);
    });

    function puedeAvanzar() {
      const p = leccion.pasos[actual];
      if (p.tipo === "quiz") return !!quizResuelto[actual];
      if (p.tipo === "ejercicio") return yaCompletada || !!ejercicioResuelto[actual];
      if (p.tipo === "proyecto") return yaCompletada || !!proyectoResuelto[actual];
      return true;
    }

    function actualizarNavegacion() {
      const esUltimo = actual === leccion.pasos.length - 1;
      bAnterior.disabled = actual === 0;
      bSiguiente.classList.toggle("oculto", esUltimo);
      bSiguiente.disabled = !puedeAvanzar();
      contador.textContent = "Paso " + (actual + 1) + " de " + leccion.pasos.length;
      puntos.querySelectorAll(".punto-paso").forEach((b, i) => {
        b.classList.toggle("actual", i === actual);
        b.classList.toggle("visto", i < actual || i <= maximo && i !== actual);
        b.disabled = i > maximo;
        b.setAttribute("aria-current", i === actual ? "step" : "false");
      });
    }

    function ir(i) {
      actual = i;
      maximo = Math.max(maximo, i);
      [zona, colCodigo, colResultado, colPizarra].forEach(c => { c.innerHTML = ""; });
      const paso = leccion.pasos[i];
      zona.className = "paso-actual paso-" + paso.tipo;
      espacio.classList.remove("sin-codigo");
      RENDER[paso.tipo](paso, i);
      actualizarNavegacion();
      zona.scrollTop = 0;
    }

    bAnterior.addEventListener("click", () => { if (actual > 0) ir(actual - 1); });
    bSiguiente.addEventListener("click", () => {
      if (puedeAvanzar() && actual < leccion.pasos.length - 1) {
        CELEBRAR.sonido.click();
        ir(actual + 1);
      }
    });

    document.addEventListener("keydown", e => {
      if (/^(TEXTAREA|INPUT|SELECT)$/.test(document.activeElement.tagName) || document.activeElement.classList.contains("divisor") || document.querySelector(".modal-fondo")) return;
      if (e.key === "ArrowRight" && !bSiguiente.disabled && !bSiguiente.classList.contains("oculto")) bSiguiente.click();
      if (e.key === "ArrowLeft" && !bAnterior.disabled) bAnterior.click();
    });

    /* ---------- Piezas comunes ---------- */
    function tarjetaTexto(titulo, texto) {
      const t = document.createElement("div");
      t.className = "tarjeta tarjeta-texto";
      t.innerHTML = (titulo ? "<h2>" + UI.md(titulo) + "</h2>" : "") + "<p>" + UI.md(texto) + "</p>";
      zona.appendChild(t);
      return t;
    }

    /** Une las columnas de código y resultado en una sola pizarra. */
    function usarPizarra() {
      espacio.classList.add("sin-codigo");
      return colPizarra;
    }

    function panel(titulo, contenidoHTML, clase = "") {
      const p = document.createElement("div");
      p.className = "panel " + clase;
      p.innerHTML = '<div class="barra-panel"><span class="titulo-panel">' + titulo + "</span></div>" + contenidoHTML;
      return p;
    }

    /* ---------- Cómo se pinta cada tipo de paso ---------- */
    const RENDER = {
      explicacion(paso) {
        tarjetaTexto(paso.titulo, paso.texto);
        if (paso.ejemplo) {
          const bloques = ["html", "css", "js"].filter(k => paso.ejemplo[k]);
          colCodigo.appendChild(panel("💻 Código del ejemplo",
            '<div class="ejemplo-codigo">' +
            bloques.map(k =>
              '<div class="etiqueta-codigo etiqueta-' + k + '">' + k.toUpperCase() + "</div>" +
              '<pre class="codigo">' + UI.resaltar(paso.ejemplo[k], k) + "</pre>").join("") +
            "</div>", "panel-ejemplo"));
          // Con JS se añade la consola; si además no hay HTML, la consola ocupa todo el resultado
          const res = EDITOR.crearResultado({ consola: !!paso.ejemplo.js, soloConsola: !!paso.ejemplo.js && !paso.ejemplo.html });
          colResultado.appendChild(res.panel);
          res.mostrar(paso.ejemplo);
          if (paso.dispositivos) EDITOR.anadirDispositivos(res.panel);
          if (paso.vistaPrevia) EDITOR.anadirVistaPrevia(res.panel);
          if (paso.consejo) zona.appendChild(MASCOTA.crear(UI.md(paso.consejo)));
        } else {
          // Sin ejemplo: Tagui ocupa la pizarra con su consejo
          const piz = usarPizarra();
          piz.innerHTML = '<div class="pizarra-tagui"></div>';
          piz.firstChild.appendChild(MASCOTA.crear(UI.md(paso.consejo || "Lee la explicación con calma. En los siguientes pasos escribirás tu propio código. ✍️")));
        }
      },

      pruebalo(paso) {
        tarjetaTexto("✍️ ¡Pruébalo tú!", paso.instruccion);
        EDITOR.crear(zona, { pestanas: paso.pestanas || pestanas, inicial: paso.inicial, destinos });
      },

      ejercicio(paso, i) {
        EJERCICIOS.crear(zona, paso, {
          clave: id + "#paso" + i,
          pestanas: paso.pestanas || pestanas,
          destinos,
          yaResuelto: yaCompletada || ejercicioResuelto[i],
          alResolver: () => {
            ejercicioResuelto[i] = true;
            actualizarNavegacion();
          }
        });
      },

      controles(paso) {
        tarjetaTexto("🎛️ Juega con los controles", paso.instruccion);
        CONTROLES.crear(zona, paso, destinos);
      },

      quiz(paso, i) {
        // Pregunta a la izquierda, opciones grandes en la pizarra
        const t = document.createElement("div");
        t.className = "tarjeta quiz";
        t.innerHTML = "<h2>❓ " + UI.md(paso.pregunta) + '</h2><p class="texto-suave">Elige una respuesta en la pizarra →</p><div class="explicacion-quiz"></div>';
        zona.appendChild(t);
        const mascota = MASCOTA.crear("Piénsalo con calma. ¡Tú puedes!");
        zona.appendChild(mascota);
        const piz = usarPizarra();
        piz.innerHTML = '<div class="pizarra-quiz"><div class="opciones-quiz"></div></div>';
        const cont = piz.querySelector(".opciones-quiz");
        const exp = t.querySelector(".explicacion-quiz");
        const letras = "ABCDEF";
        paso.opciones.forEach((op, j) => {
          const b = document.createElement("button");
          b.className = "opcion-quiz";
          b.innerHTML = '<span class="letra">' + letras[j] + "</span><span>" + UI.md(op) + "</span>";
          b.addEventListener("click", () => {
            if (quizResuelto[i]) return;
            if (j === paso.correcta) {
              b.classList.add("correcta");
              quizResuelto[i] = true;
              cont.querySelectorAll(".opcion-quiz").forEach(x => { x.disabled = x !== b; });
              exp.innerHTML = "✅ " + UI.md(paso.explicacion || "");
              MASCOTA.decir(mascota, MASCOTA.azar(MASCOTA.FRASES.acierto), "alegre");
              CELEBRAR.sonido.acierto();
              actualizarNavegacion();
            } else {
              b.classList.add("incorrecta");
              b.disabled = true;
              MASCOTA.decir(mascota, MASCOTA.azar(MASCOTA.FRASES.fallo), "triste");
              CELEBRAR.sonido.error();
            }
          });
          cont.appendChild(b);
        });
        if (quizResuelto[i]) {
          const correcta = cont.children[paso.correcta];
          correcta.classList.add("correcta");
          cont.querySelectorAll(".opcion-quiz").forEach(x => { x.disabled = x !== correcta; });
          exp.innerHTML = "✅ " + UI.md(paso.explicacion || "");
        }
      },

      reto(paso) {
        const mascota = MASCOTA.crear(yaCompletada
          ? "Ya superaste este reto. ¿Quieres intentar sacar más estrellas? ⭐"
          : "Cumple todo lo de la lista. Se irá marcando en verde mientras escribes. ¡Ánimo!");
        RETOS.crear(zona, paso, {
          leccionId: id,
          pestanas: paso.pestanas || pestanas,
          destinos,
          mascota,
          alSuperar: ({ estrellas }) => victoria(leccion, estrellas)
        });
        zona.querySelector(".reto-enunciado").after(mascota);
      },

      // Un paso de la web del proyecto: como un reto, pero el código se comparte entre todos los pasos de la lección
      proyecto(paso, i) {
        const ultimo = i === leccion.pasos.length - 1;
        const mascota = MASCOTA.crear(ultimo
          ? "¡Último encargo! Cuando todo esté en verde, la entrega estará lista. 🚀"
          : "Cumple el encargo: la lista se irá marcando en verde mientras escribes.");
        RETOS.crear(zona, paso, {
          leccionId: id,
          claveBorrador: id + "#proyecto",
          etiqueta: "📋 Encargo " + (leccion.pasos.slice(0, i + 1).filter(p => p.tipo === "proyecto").length),
          pestanas: paso.pestanas || pestanas,
          destinos,
          mascota,
          alSuperar: ({ estrellas }) => {
            proyectoResuelto[i] = true;
            estrellasProyecto = Math.min(estrellasProyecto, estrellas);
            if (ultimo) victoria(leccion, estrellasProyecto);
            else actualizarNavegacion();
          }
        });
        zona.querySelector(".reto-enunciado").after(mascota);
        const bGlosario = document.createElement("button");
        bGlosario.className = "mini-boton boton-glosario";
        bGlosario.textContent = "📚 Glosario";
        bGlosario.title = "Todo lo que has aprendido, con ejemplos para copiar (no pierdes tu código)";
        bGlosario.addEventListener("click", () => glosario.alternar(paso.glosario));
        zona.querySelector(".etiqueta-reto").after(bGlosario);
      }
    };

    ir(yaCompletada && location.hash === "#reto" ? leccion.pasos.length - 1 : 0);
  }

  /* ---------- Columnas que se pueden redimensionar ---------- */
  const COLUMNAS = (function () {
    const CLAVE = "csshtml-columnas";
    const POR_DEFECTO = [30, 36, 34];   // % del ancho: lección, código, resultado
    const MINIMO = 240;                 // px mínimos por columna

    function cargar() {
      try {
        const v = JSON.parse(localStorage.getItem(CLAVE));
        if (Array.isArray(v) && v.length === 3 && v.every(n => n > 0)) return v;
      } catch (e) { /* sin almacenamiento */ }
      return POR_DEFECTO.slice();
    }
    function guardar(v) {
      try { localStorage.setItem(CLAVE, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ }
    }

    function activar(espacio) {
      let fr = cargar();
      const aplicar = () => fr.forEach((v, i) => espacio.style.setProperty("--c" + (i + 1), v + "fr"));
      aplicar();

      const anchos = () => [".col-leccion", ".col-codigo", ".col-resultado"].map(s => espacio.querySelector(s).getBoundingClientRect().width);

      function mover(k, delta) {
        const w = anchos();
        let a = w[k] + delta;
        let b = w[k + 1] - delta;
        if (a < MINIMO) { b -= MINIMO - a; a = MINIMO; }
        if (b < MINIMO) { a -= MINIMO - b; b = MINIMO; }
        w[k] = a;
        w[k + 1] = b;
        const total = w.reduce((s, x) => s + x, 0);
        fr = w.map(x => Math.round((x / total) * 1000) / 10);
        aplicar();
      }

      espacio.querySelectorAll(".divisor").forEach(div => {
        const k = Number(div.dataset.divisor);
        div.addEventListener("pointerdown", e => {
          e.preventDefault();
          div.setPointerCapture(e.pointerId);
          document.body.classList.add("arrastrando");
          let x = e.clientX;
          const mov = ev => { mover(k, ev.clientX - x); x = ev.clientX; };
          const fin = () => {
            document.body.classList.remove("arrastrando");
            div.removeEventListener("pointermove", mov);
            div.removeEventListener("pointerup", fin);
            div.removeEventListener("pointercancel", fin);
            guardar(fr);
          };
          div.addEventListener("pointermove", mov);
          div.addEventListener("pointerup", fin);
          div.addEventListener("pointercancel", fin);
        });
        div.addEventListener("dblclick", () => { fr = POR_DEFECTO.slice(); aplicar(); guardar(fr); });
        div.addEventListener("keydown", e => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            mover(k, e.key === "ArrowLeft" ? -30 : 30);
            guardar(fr);
          }
        });
      });
    }

    return { activar };
  })();

  /* ---------- Pantalla de victoria ---------- */
  function victoria(leccion, estrellas) {
    const r = PROGRESO.completar(leccion.id, estrellas, leccion.xp);
    const sig = CURSO.siguiente(leccion.id);
    CELEBRAR.confeti();
    CELEBRAR.sonido.victoria();
    UI.pintarEstado();

    const textoEstrellas = estrellas === 3 ? "¡Perfecto, sin pistas!" : estrellas === 2 ? "¡Muy bien! La próxima, sin pistas 😉" : "¡Superado! Repítelo para conseguir más estrellas.";
    let extra = "";
    if (r.xpGanada > 0) extra += '<p class="xp-ganada">+' + r.xpGanada + " XP</p>";
    else extra += '<p class="texto-suave">Ya tenías estas estrellas: esta vez no sumas XP.</p>';
    if (r.subioNivel) extra += '<div class="subida-nivel">' + r.subioNivel.emoji + " ¡Subiste a nivel " + r.subioNivel.numero + ": <b>" + r.subioNivel.nombre + "</b>!</div>";
    r.nuevasInsignias.forEach(ins => {
      extra += '<div class="insignia-nueva"><span>' + ins.emoji + "</span><div><b>¡Nueva insignia!</b><br>" + ins.nombre + "</div></div>";
    });

    let botonSiguiente = "";
    // El último Proyecto web cierra el curso: lleva a la página final con la web terminada
    if (leccion.id === "js-17") botonSiguiente = '<a class="boton grande" data-siguiente-leccion href="mi-clinica.html">🏥 Ver mi clínica →</a>';
    else if (sig && sig.listo) botonSiguiente = '<a class="boton grande" data-siguiente-leccion href="leccion.html?id=' + sig.id + '">Siguiente lección →</a>';
    else if (sig) botonSiguiente = '<span class="texto-suave">🚧 La siguiente lección llegará pronto</span>';

    const m = CELEBRAR.modal(
      MASCOTA.svg("alegre") +
      "<h2>¡Lección completada!</h2>" +
      '<div class="estrellas-grandes">' + [1, 2, 3].map(n => '<span class="' + (n <= estrellas ? "ganada" : "") + '" style="animation-delay:' + (n * 0.25) + 's">⭐</span>').join("") + "</div>" +
      '<p class="texto-suave">' + textoEstrellas + "</p>" + extra +
      '<div class="acciones"><a class="boton secundario" href="' + urlMapa + '">🗺️ Mapa</a>' +
      '<button class="boton secundario" data-repetir>🔁 Repetir reto</button>' + botonSiguiente + "</div>"
    );
    m.elemento.querySelector(".modal").classList.add("modal-victoria");
    // El modal enfoca su primer botón (el mapa); así Enter lleva a la siguiente lección
    const enlaceSiguiente = m.elemento.querySelector("[data-siguiente-leccion]");
    if (enlaceSiguiente) enlaceSiguiente.focus();
    m.elemento.querySelector("[data-repetir]").addEventListener("click", () => {
      PROGRESO.borrarBorrador(leccion.id);
      location.hash = "reto";
      location.reload();
    });
    if (r.subioNivel) setTimeout(() => CELEBRAR.sonido.nivel(), 700);
  }
})();
