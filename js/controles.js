/* ============================================================
   <CSS-HTML> · Playground visual
   Deslizadores, selectores de color y opciones que generan CSS
   en directo y enseñan el código resultante.
   ============================================================ */
(function () {
  function crear(contenedor, paso, destinos) {
    const valores = paso.controles.map(c => c.valor !== undefined ? c.valor : (c.tipo === "rango" ? c.min : ""));

    const raiz = document.createElement("div");
    raiz.className = "playground";
    raiz.innerHTML =
      '<div class="panel panel-controles"><div class="barra-panel"><span class="titulo-panel">🎛️ Controles</span></div>' +
      '<div class="lista-controles"></div>' +
      '<div class="barra-panel"><span class="titulo-panel">🎨 El CSS que estás creando</span></div>' +
      '<pre class="codigo codigo-generado"></pre></div>' +
      '<div class="panel panel-resultado">' +
      '<div class="barra-panel"><span class="titulo-panel">👀 Resultado</span></div>' +
      '<iframe class="resultado" title="Resultado"></iframe></div>';

    const lista = raiz.querySelector(".lista-controles");
    const iframe = raiz.querySelector("iframe");
    const pre = raiz.querySelector(".codigo-generado");

    // Con "destinos", los controles van a la columna de código y el resultado a la suya
    if (destinos) {
      destinos.codigo.appendChild(raiz.querySelector(".panel-controles"));
      destinos.resultado.appendChild(raiz.querySelector(".panel-resultado"));
    } else {
      contenedor.appendChild(raiz);
    }

    paso.controles.forEach((c, i) => {
      // Con botones de opciones no usamos <label>: reenviaría el clic al primer botón
      const fila = document.createElement(c.tipo === "opciones" ? "div" : "label");
      fila.className = "control";
      const etiqueta =
        '<span class="control-nombre"><code>' + UI.escapar(c.propiedad) + "</code>" +
        '<span class="control-valor"></span></span>';
      let entrada = "";
      if (c.tipo === "rango") {
        entrada = '<input type="range" min="' + c.min + '" max="' + c.max + '" step="' + (c.paso || 1) + '" value="' + valores[i] + '">';
      } else if (c.tipo === "color") {
        entrada = '<input type="color" value="' + valores[i] + '">';
      } else {
        entrada = '<div class="opciones-control">' + c.opciones.map(o =>
          '<button type="button" class="opcion-control" data-valor="' + UI.escapar(o) + '">' + UI.escapar(o) + "</button>").join("") + "</div>";
      }
      fila.innerHTML = etiqueta + entrada;
      lista.appendChild(fila);

      const mostrarValor = () => {
        fila.querySelector(".control-valor").textContent = formatear(c, valores[i]);
        fila.querySelectorAll(".opcion-control").forEach(b => b.classList.toggle("activa", b.dataset.valor === valores[i]));
      };
      fila.querySelectorAll("input").forEach(inp => inp.addEventListener("input", () => {
        valores[i] = inp.value;
        mostrarValor();
        actualizar();
      }));
      fila.querySelectorAll(".opcion-control").forEach(b => b.addEventListener("click", () => {
        valores[i] = b.dataset.valor;
        mostrarValor();
        actualizar();
        CELEBRAR.sonido.click();
      }));
      mostrarValor();
    });

    function formatear(c, v) {
      return c.tipo === "rango" ? v + (c.unidad || "") : v;
    }

    function generarCSS() {
      const grupos = {};
      paso.controles.forEach((c, i) => {
        (grupos[c.selector] = grupos[c.selector] || []).push("  " + c.propiedad + ": " + formatear(c, valores[i]) + ";");
      });
      return Object.keys(grupos).map(sel => sel + " {\n" + grupos[sel].join("\n") + "\n}").join("\n\n");
    }

    let primero = true;
    function actualizar() {
      const css = generarCSS();
      pre.innerHTML = UI.resaltar(css, "css");
      const doc = EDITOR.construirDocumento({ html: paso.html, css: (paso.cssBase || "") + "\n" + css });
      if (primero) {
        iframe.srcdoc = doc;
        primero = false;
        return;
      }
      // Cambiamos solo el <style> para que el resultado no parpadee al arrastrar
      try {
        const d = iframe.contentDocument;
        let estilo = d.getElementById("estilo-controles");
        if (!estilo) {
          estilo = d.createElement("style");
          estilo.id = "estilo-controles";
          d.head.appendChild(estilo);
        }
        estilo.textContent = css;
      } catch (e) {
        iframe.srcdoc = doc;
      }
    }

    actualizar();
    return { raiz };
  }

  window.CONTROLES = { crear };
})();
