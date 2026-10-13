/* ============================================================
   <CSS-HTML> · Retos
   - RETOS.evaluar(): ejecuta las comprobaciones en un iframe oculto
   - RETOS.crear(): interfaz del reto (lista, editor, pistas, solución)
   ============================================================ */
(function () {
  let iframeOculto = null;
  let turno = 0;

  function obtenerIframe() {
    if (!iframeOculto) {
      iframeOculto = document.createElement("iframe");
      iframeOculto.setAttribute("aria-hidden", "true");
      iframeOculto.tabIndex = -1;
      iframeOculto.style.cssText =
        "position:absolute;left:-10000px;top:0;width:800px;height:600px;opacity:0;pointer-events:none;border:0;";
      document.body.appendChild(iframeOculto);
    }
    return iframeOculto;
  }

  function conLimite(promesa, ms) {
    return Promise.race([promesa, new Promise(res => setTimeout(() => res(false), ms))]);
  }

  /**
   * Evalúa el código contra las comprobaciones.
   * Devuelve una Promesa con un array de booleanos, o null si otra evaluación la sustituyó.
   */
  function evaluar(codigo, comprobaciones, iframe) {
    const miTurno = ++turno;
    const marco = iframe || obtenerIframe();
    return new Promise(resolver => {
      marco.onload = () => {
        setTimeout(async () => {
          if (!iframe && miTurno !== turno) return resolver(null);
          const doc = marco.contentDocument;
          const win = marco.contentWindow;
          const resultados = [];
          for (const c of comprobaciones) {
            try {
              resultados.push(!!(await conLimite(Promise.resolve(c.prueba(doc, win)), 2000)));
            } catch (e) {
              resultados.push(false);
            }
          }
          resolver(!iframe && miTurno !== turno ? null : resultados);
        }, 60);
      };
      marco.srcdoc = EDITOR.construirDocumento(codigo);
    });
  }

  function crear(contenedor, paso, opciones) {
    const { leccionId, pestanas, alSuperar } = opciones;
    let pistasVistas = 0;
    let solucionVista = false;
    let superado = false;

    const raiz = document.createElement("div");
    raiz.className = "reto";
    raiz.innerHTML =
      '<div class="reto-cabeza">' +
        '<div class="reto-enunciado tarjeta"><span class="etiqueta-reto">🏆 Reto final</span>' +
        '<p class="enunciado"></p>' +
        '<ul class="comprobaciones" aria-live="polite"></ul>' +
        '<div class="pistas-mostradas"></div>' +
        '<div class="reto-botones">' +
          '<button class="boton grande" data-comprobar>✅ Comprobar</button>' +
          '<button class="boton secundario" data-pista>💡 Pista</button>' +
          '<button class="boton secundario" data-solucion disabled title="Mira antes las pistas">👀 Ver solución</button>' +
        "</div></div>" +
      "</div>" +
      '<div class="reto-editor"></div>';
    contenedor.appendChild(raiz);

    raiz.querySelector(".enunciado").innerHTML = UI.md(paso.enunciado);
    const lista = raiz.querySelector(".comprobaciones");
    paso.comprobaciones.forEach(c => {
      const li = document.createElement("li");
      li.innerHTML = '<span class="marca" aria-hidden="true">○</span><span>' + UI.md(c.texto) + "</span>";
      lista.appendChild(li);
    });

    const bPista = raiz.querySelector("[data-pista]");
    const bSolucion = raiz.querySelector("[data-solucion]");
    const bComprobar = raiz.querySelector("[data-comprobar]");
    const pistasCont = raiz.querySelector(".pistas-mostradas");
    const mascota = opciones.mascota;

    const editor = EDITOR.crear(raiz.querySelector(".reto-editor"), {
      pestanas,
      destinos: opciones.destinos,
      pestanaActiva: paso.pestana,
      cssBase: paso.cssBase,
      inicial: paso.inicial,
      codigo: PROGRESO.borrador(leccionId) || undefined,
      alCambiar: codigo => {
        PROGRESO.guardarBorrador(leccionId, codigo);
        revisar(true);
      }
    });

    let ultimos = [];
    async function revisar(automatico) {
      const resultados = await evaluar(EDITOR.conBase(editor.obtener(), paso.cssBase), paso.comprobaciones);
      if (!resultados) return;
      const antes = ultimos;
      ultimos = resultados;
      lista.querySelectorAll("li").forEach((li, i) => {
        const ok = resultados[i];
        const cambio = antes.length && antes[i] !== ok;
        li.classList.toggle("ok", ok);
        li.querySelector(".marca").textContent = ok ? "✓" : "○";
        if (cambio && ok) {
          li.classList.remove("pop");
          void li.offsetWidth;
          li.classList.add("pop");
          CELEBRAR.sonido.acierto();
        }
      });
      const todo = resultados.every(Boolean);
      if (todo && !superado && automatico) terminar();
      return resultados;
    }

    function terminar() {
      superado = true;
      const estrellas = solucionVista ? 1 : pistasVistas > 0 ? 2 : 3;
      if (mascota) MASCOTA.decir(mascota, "¡LO CONSEGUISTE! 🎉 Eres una máquina.", "alegre");
      alSuperar({ estrellas });
    }

    bComprobar.addEventListener("click", async () => {
      const resultados = await revisar(false);
      if (!resultados) return;
      if (resultados.every(Boolean)) {
        if (!superado) terminar();
        else alSuperar({ estrellas: solucionVista ? 1 : pistasVistas > 0 ? 2 : 3 });
      } else {
        CELEBRAR.sonido.error();
        lista.querySelectorAll("li:not(.ok)").forEach(li => {
          li.classList.remove("sacudir");
          void li.offsetWidth;
          li.classList.add("sacudir");
          li.addEventListener("animationend", () => li.classList.remove("sacudir"), { once: true });
        });
        const faltan = resultados.filter(r => !r).length;
        if (mascota) MASCOTA.decir(mascota,
          MASCOTA.azar(MASCOTA.FRASES.animo) + " Te " + (faltan === 1 ? "falta 1 cosa" : "faltan " + faltan + " cosas") + ".", "triste");
      }
    });

    bPista.addEventListener("click", () => {
      if (pistasVistas >= paso.pistas.length) return;
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
      if (!confirm("¿Ver la solución? Podrás estudiarla, pero esta lección te dará solo 1 ⭐.")) return;
      solucionVista = true;
      editor.fijar(paso.solucion);
    });

    // Primera revisión: muestra qué está bien sin celebrar todavía
    revisar(false).then(res => { ultimos = res || []; });

    return { raiz, editor };
  }

  window.RETOS = { evaluar, crear };
})();
