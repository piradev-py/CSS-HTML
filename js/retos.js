/* ============================================================
   <CSS-HTML> · Retos
   - RETOS.evaluar(): ejecuta las comprobaciones en un iframe oculto
   - RETOS.crear(): interfaz del reto (lista, editor, pistas, solución).
     También la usan los pasos «proyecto» (opciones etiqueta y
     claveBorrador, y en el paso: proyecto, captura y repaso).
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
    PRUEBA.limpiar();
    const html = EDITOR.construirDocumento(codigo);
    // Cada evaluación empieza con el localStorage de práctica vacío; __fuente permite PRUEBA.recargar(doc)
    marco.__almacen = {};
    marco.__almacenSesion = {};
    marco.__fuente = html;
    return new Promise(resolver => {
      marco.onload = () => {
        setTimeout(async () => {
          if (!iframe && miTurno !== turno) return resolver(null);
          await PRUEBA.esperarCalma(marco.contentWindow);
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
      // Movimiento "normal" siempre: el resultado no depende de si el sistema reduce las animaciones
      marco.srcdoc = PRUEBA.prepararHTML(html, {});
    });
  }

  /**
   * Pestaña con la que se abre el reto: la indicada o, si el HTML ya viene hecho, la primera que falta
   * por escribir (CSS si solo falta CSS, JS si solo falta JS).
   */
  function pestanaReto(paso) {
    if (paso.pestana) return paso.pestana;
    const ini = paso.inicial || {};
    const sol = paso.solucion || {};
    const igual = (a, b) => String(a || "").trim() === String(b || "").trim();
    if (!(ini.html || "").trim() || !igual(ini.html, sol.html)) return undefined;
    if (!igual(ini.css, sol.css) && igual(ini.js, sol.js)) return "css";
    if (!igual(ini.js, sol.js) && igual(ini.css, sol.css)) return "js";
    return undefined;
  }

  function crear(contenedor, paso, opciones) {
    const { leccionId, pestanas, alSuperar } = opciones;
    const claveBorrador = opciones.claveBorrador || leccionId;
    let pistasVistas = 0;
    let solucionVista = false;
    let superado = false;

    const raiz = document.createElement("div");
    raiz.className = "reto";
    raiz.innerHTML =
      '<div class="reto-cabeza">' +
        '<div class="reto-enunciado tarjeta"><span class="etiqueta-reto">' + (opciones.etiqueta || "🏆 Reto final") + "</span>" +
        '<p class="enunciado"></p>' +
        (paso.captura ? '<a class="captura-encargo" target="_blank" title="Abrir la captura en grande"><img alt="Captura de cómo debe quedar"></a>' : "") +
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
    if (paso.captura) {
      raiz.querySelector(".captura-encargo").href = paso.captura;
      raiz.querySelector(".captura-encargo img").src = paso.captura;
    }
    const lista = raiz.querySelector(".comprobaciones");
    paso.comprobaciones.forEach(c => {
      const li = document.createElement("li");
      li.innerHTML = '<span class="marca" aria-hidden="true">○</span><span>' + UI.md(c.texto) + "</span>";
      // repaso: "html-09" → mientras falle, enlace a la lección donde se aprendió (en otra pestaña: el código no se pierde)
      const repaso = c.repaso && CURSO.buscar(c.repaso);
      if (repaso) {
        const a = document.createElement("a");
        a.className = "repaso";
        a.href = "leccion.html?id=" + repaso.id;
        a.target = "_blank";
        a.textContent = "📚 Repasa «" + repaso.titulo + "»";
        li.lastChild.appendChild(a);
      }
      lista.appendChild(li);
    });
    // Comprobación que añade el motor a todos los retos: código bien escrito (js/escritura.js)
    const liEscritura = document.createElement("li");
    liEscritura.className = "comprobacion-escritura";
    liEscritura.innerHTML = '<span class="marca" aria-hidden="true">○</span><span>' +
      UI.md("Tu código está bien escrito: etiquetas cerradas, `{ }` y `;`") +
      '<small class="detalle-escritura"></small></span>';
    lista.appendChild(liEscritura);
    const detalleEscritura = liEscritura.querySelector(".detalle-escritura");

    const bPista = raiz.querySelector("[data-pista]");
    const bSolucion = raiz.querySelector("[data-solucion]");
    const bComprobar = raiz.querySelector("[data-comprobar]");
    const pistasCont = raiz.querySelector(".pistas-mostradas");
    const mascota = opciones.mascota;

    const editor = EDITOR.crear(raiz.querySelector(".reto-editor"), {
      pestanas,
      destinos: opciones.destinos,
      pestanaActiva: pestanaReto(paso),
      cssBase: paso.cssBase,
      dispositivos: paso.dispositivos,
      vistaPrevia: paso.vistaPrevia,
      proyecto: paso.proyecto,
      inicial: paso.inicial,
      codigo: PROGRESO.borrador(claveBorrador) || undefined,
      alCambiar: codigo => {
        PROGRESO.guardarBorrador(claveBorrador, codigo);
        revisar(true);
      }
    });

    let ultimos = [];
    async function revisar(automatico) {
      const codigo = editor.obtener();
      const resultados = await evaluar(EDITOR.conBase(codigo, paso.cssBase, paso.proyecto), paso.comprobaciones);
      if (!resultados) return;
      const escritura = ESCRITURA.revisar(codigo);
      resultados.push(!escritura);
      detalleEscritura.innerHTML = escritura ? UI.md(escritura.mensaje) : "";
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

  window.RETOS = { evaluar, crear, pestanaReto };
})();
