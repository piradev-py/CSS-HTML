/* ============================================================
   <CSS-HTML> · Vista de lección (leccion.html?id=...)
   Carga el archivo de la lección y muestra sus pasos uno a uno.
   ============================================================ */
(function () {
  const id = new URLSearchParams(location.search).get("id");
  const principal = document.querySelector("main");
  const info = CURSO.buscar(id);

  UI.montarCabecera('<a class="boton-icono" href="index.html" aria-label="Volver al mapa">🗺️</a>');

  function aviso(emoji, titulo, texto) {
    principal.innerHTML =
      '<div class="aviso-grande tarjeta"><div class="aviso-emoji">' + emoji + "</div><h1>" + titulo + "</h1><p>" + texto + "</p>" +
      '<a class="boton grande azul" href="index.html">🗺️ Volver al mapa</a></div>';
  }

  if (!info) return aviso("🧭", "Lección no encontrada", "Parece que esta lección no existe. Vuelve al mapa y elige otra.");
  if (!info.listo) return aviso("🚧", "Próximamente", "El profesor todavía está preparando «" + UI.escapar(info.titulo) + "». ¡Vuelve pronto!");
  if (!PROGRESO.estaDesbloqueada(id)) return aviso("🔒", "Lección bloqueada", "Completa antes la lección anterior para desbloquear esta.");

  const script = document.createElement("script");
  script.src = CURSO.ruta(id);
  script.onload = () => {
    const leccion = CURSO.lecciones[id];
    if (!leccion) return aviso("😵", "Algo salió mal", "El archivo de la lección no se registró correctamente.");
    iniciar(leccion);
  };
  script.onerror = () => aviso("😵", "No pude cargar la lección", "No encuentro el archivo <code>" + UI.escapar(CURSO.ruta(id)) + "</code>.");
  document.body.appendChild(script);

  function iniciar(leccion) {
    const mundo = info.mundo;
    const pestanas = leccion.pestanas || mundo.pestanas;
    const numero = mundo.lecciones.findIndex(l => l.id === id) + 1;
    const yaCompletada = PROGRESO.estaCompletada(id);
    let actual = 0;
    let maximo = yaCompletada ? leccion.pasos.length - 1 : 0;
    const quizResuelto = {};

    document.title = leccion.titulo + " · <CSS-HTML>";
    document.body.dataset.mundo = mundo.clave;

    principal.innerHTML =
      '<div class="leccion-top">' +
        '<div class="miga">' + mundo.emoji + " " + UI.escapar(mundo.nombre) + " · Lección " + numero + "</div>" +
        '<h1 class="leccion-titulo">' + UI.escapar(leccion.titulo) + "</h1>" +
        '<p class="objetivo">🎯 ' + UI.md(leccion.objetivo) + "</p>" +
        '<div class="puntos-pasos" role="list"></div>' +
      "</div>" +
      '<section class="paso-actual" aria-live="polite"></section>' +
      '<nav class="navegacion-pasos">' +
        '<button class="boton secundario" data-anterior>← Anterior</button>' +
        '<span class="contador-pasos"></span>' +
        '<button class="boton grande" data-siguiente>Siguiente →</button>' +
      "</nav>";

    const puntos = principal.querySelector(".puntos-pasos");
    const zona = principal.querySelector(".paso-actual");
    const bAnterior = principal.querySelector("[data-anterior]");
    const bSiguiente = principal.querySelector("[data-siguiente]");
    const contador = principal.querySelector(".contador-pasos");

    const ICONO_PASO = { explicacion: "📖", pruebalo: "✍️", controles: "🎛️", quiz: "❓", reto: "🏆" };

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
      return p.tipo !== "quiz" || quizResuelto[actual];
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
      zona.innerHTML = "";
      const paso = leccion.pasos[i];
      zona.className = "paso-actual paso-" + paso.tipo;
      RENDER[paso.tipo](paso, i);
      actualizarNavegacion();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    bAnterior.addEventListener("click", () => { if (actual > 0) ir(actual - 1); });
    bSiguiente.addEventListener("click", () => {
      if (puedeAvanzar() && actual < leccion.pasos.length - 1) {
        CELEBRAR.sonido.click();
        ir(actual + 1);
      }
    });

    document.addEventListener("keydown", e => {
      if (/^(TEXTAREA|INPUT|SELECT)$/.test(document.activeElement.tagName) || document.querySelector(".modal-fondo")) return;
      if (e.key === "ArrowRight" && !bSiguiente.disabled && !bSiguiente.classList.contains("oculto")) bSiguiente.click();
      if (e.key === "ArrowLeft" && !bAnterior.disabled) bAnterior.click();
    });

    /* ---------- Cómo se pinta cada tipo de paso ---------- */
    function tarjetaTexto(titulo, texto) {
      const t = document.createElement("div");
      t.className = "tarjeta tarjeta-texto";
      t.innerHTML = (titulo ? "<h2>" + UI.md(titulo) + "</h2>" : "") + "<p>" + UI.md(texto) + "</p>";
      zona.appendChild(t);
      return t;
    }

    function ajustarAlto(iframe) {
      iframe.addEventListener("load", () => {
        try {
          const alto = iframe.contentDocument.documentElement.scrollHeight;
          iframe.style.height = Math.min(Math.max(alto + 4, 80), 420) + "px";
        } catch (e) { /* sin acceso, se queda el alto por defecto */ }
      });
    }

    const RENDER = {
      explicacion(paso) {
        tarjetaTexto(paso.titulo, paso.texto);
        if (paso.ejemplo) {
          const ej = document.createElement("div");
          ej.className = "ejemplo";
          const bloques = ["html", "css", "js"].filter(k => paso.ejemplo[k]);
          ej.innerHTML =
            '<div class="ejemplo-codigo">' +
            bloques.map(k =>
              '<div class="etiqueta-codigo etiqueta-' + k + '">' + k.toUpperCase() + "</div>" +
              '<pre class="codigo">' + UI.resaltar(paso.ejemplo[k], k) + "</pre>").join("") +
            "</div>" +
            '<div class="ejemplo-resultado"><div class="etiqueta-codigo">👀 Resultado</div>' +
            '<iframe class="resultado" title="Resultado del ejemplo"></iframe></div>';
          zona.appendChild(ej);
          const iframe = ej.querySelector("iframe");
          ajustarAlto(iframe);
          iframe.srcdoc = EDITOR.construirDocumento(paso.ejemplo);
        }
        if (paso.consejo) zona.appendChild(MASCOTA.crear(UI.md(paso.consejo)));
      },

      pruebalo(paso, i) {
        tarjetaTexto("✍️ ¡Pruébalo tú!", paso.instruccion);
        EDITOR.crear(zona, { pestanas: paso.pestanas || pestanas, inicial: paso.inicial });
        if (i === 0 || !leccion.pasos.slice(0, i).some(p => p.tipo === "pruebalo")) {
          zona.appendChild(MASCOTA.crear("Escribe en el editor y mira cómo cambia el resultado al momento. ¡No puedes romper nada!"));
        }
      },

      controles(paso) {
        tarjetaTexto("🎛️ Juega con los controles", paso.instruccion);
        CONTROLES.crear(zona, paso);
      },

      quiz(paso, i) {
        const t = document.createElement("div");
        t.className = "tarjeta quiz";
        t.innerHTML = "<h2>❓ " + UI.md(paso.pregunta) + '</h2><div class="opciones-quiz"></div><div class="explicacion-quiz"></div>';
        zona.appendChild(t);
        const mascota = MASCOTA.crear("Piénsalo con calma. ¡Tú puedes!");
        zona.appendChild(mascota);
        const cont = t.querySelector(".opciones-quiz");
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
          mascota,
          alSuperar: ({ estrellas }) => victoria(leccion, estrellas)
        });
        zona.querySelector(".reto-enunciado").after(mascota);
      }
    };

    ir(yaCompletada && location.hash === "#reto" ? leccion.pasos.length - 1 : 0);
  }

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
    if (sig && sig.listo) botonSiguiente = '<a class="boton grande" href="leccion.html?id=' + sig.id + '">Siguiente lección →</a>';
    else if (sig) botonSiguiente = '<span class="texto-suave">🚧 La siguiente lección llegará pronto</span>';

    const m = CELEBRAR.modal(
      MASCOTA.svg("alegre") +
      "<h2>¡Lección completada!</h2>" +
      '<div class="estrellas-grandes">' + [1, 2, 3].map(n => '<span class="' + (n <= estrellas ? "ganada" : "") + '" style="animation-delay:' + (n * 0.25) + 's">⭐</span>').join("") + "</div>" +
      '<p class="texto-suave">' + textoEstrellas + "</p>" + extra +
      '<div class="acciones"><a class="boton secundario" href="index.html">🗺️ Mapa</a>' +
      '<button class="boton secundario" data-repetir>🔁 Repetir reto</button>' + botonSiguiente + "</div>"
    );
    m.elemento.querySelector(".modal").classList.add("modal-victoria");
    m.elemento.querySelector("[data-repetir]").addEventListener("click", () => {
      PROGRESO.borrarBorrador(leccion.id);
      location.hash = "reto";
      location.reload();
    });
    if (r.subioNivel) setTimeout(() => CELEBRAR.sonido.nivel(), 700);
  }
})();
