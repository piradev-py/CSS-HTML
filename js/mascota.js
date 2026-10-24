/* ============================================================
   <CSS-HTML> · Tagui, la mascota (una etiqueta < > con ojos)
   ============================================================ */
(function () {
  function svg(estado = "normal") {
    const ojos = estado === "alegre"
      ? '<path d="M33 45 q6 -8 12 0" stroke="#2b2238" stroke-width="4" fill="none" stroke-linecap="round"/>' +
        '<path d="M55 45 q6 -8 12 0" stroke="#2b2238" stroke-width="4" fill="none" stroke-linecap="round"/>'
      : '<circle cx="39" cy="44" r="9" fill="#fff"/><circle cx="61" cy="44" r="9" fill="#fff"/>' +
        '<circle cx="41" cy="46" r="4.5" fill="#2b2238"/><circle cx="63" cy="46" r="4.5" fill="#2b2238"/>' +
        '<circle cx="42.5" cy="44" r="1.5" fill="#fff"/><circle cx="64.5" cy="44" r="1.5" fill="#fff"/>';
    const cejas = estado === "triste"
      ? '<path d="M31 31 l14 5" stroke="#2b2238" stroke-width="3" stroke-linecap="round"/>' +
        '<path d="M69 31 l-14 5" stroke="#2b2238" stroke-width="3" stroke-linecap="round"/>'
      : "";
    const boca = estado === "triste"
      ? '<path d="M42 66 q8 -7 16 0" stroke="#2b2238" stroke-width="4" fill="none" stroke-linecap="round"/>'
      : '<path d="M40 61 q10 11 20 0" stroke="#2b2238" stroke-width="4" fill="#ff8f8f" stroke-linecap="round"/>';
    return (
      '<svg class="tagui" viewBox="0 0 100 100" aria-hidden="true">' +
        '<defs><linearGradient id="cuerpoTagui" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#ff8a4c"/><stop offset="1" stop-color="#f05a28"/></linearGradient></defs>' +
        '<ellipse cx="50" cy="93" rx="26" ry="4" fill="rgba(0,0,0,.12)"/>' +
        '<path d="M15 50 L4 40 M15 50 L4 60" stroke="#8b5cf6" stroke-width="7" stroke-linecap="round"/>' +
        '<path d="M85 50 L96 40 M85 50 L96 60" stroke="#8b5cf6" stroke-width="7" stroke-linecap="round"/>' +
        '<rect x="15" y="16" width="70" height="70" rx="24" fill="url(#cuerpoTagui)"/>' +
        '<rect x="22" y="22" width="22" height="9" rx="4.5" fill="rgba(255,255,255,.35)"/>' +
        '<circle cx="28" cy="58" r="5" fill="#ff5f7a" opacity=".45"/><circle cx="72" cy="58" r="5" fill="#ff5f7a" opacity=".45"/>' +
        cejas + ojos + boca +
      "</svg>"
    );
  }

  function crear(texto, estado = "normal") {
    const el = document.createElement("div");
    el.className = "mascota " + estado;
    el.innerHTML = svg(estado) + '<div class="bocadillo"></div>';
    el.querySelector(".bocadillo").innerHTML = texto;
    return el;
  }

  function decir(el, texto, estado = "normal") {
    if (!el) return;
    el.className = "mascota " + estado;
    el.querySelector(".tagui").outerHTML = svg(estado);
    el.querySelector(".bocadillo").innerHTML = texto;
  }

  const FRASES = {
    bienvenida: [
      T("¡Hola! Soy <b>Tagui</b> 👋 Te acompañaré en esta aventura."),
      T("¡Qué bien verte! ¿Seguimos construyendo cosas chulas?"),
      T("¡Bienvenido de nuevo! Hoy es un gran día para aprender.")
    ],
    animo: [
      T("¡Casi lo tienes! Revisa lo que falta en la lista."),
      T("Equivocarse es parte de programar. ¡Sigue probando!"),
      T("Respira, mira la lista de comprobaciones y ve paso a paso.")
    ],
    acierto: [T("¡Bien hecho! 🎉"), T("¡Eso es! 💪"), T("¡Genial! ✨"), T("¡Perfecto! 🙌")],
    fallo: [T("Uy, esa no es. ¡Prueba otra vez!"), T("¡Casi! Piénsalo un poquito más."), T("No pasa nada, inténtalo de nuevo.")]
  };

  const azar = lista => lista[Math.floor(Math.random() * lista.length)];

  window.MASCOTA = { svg, crear, decir, FRASES, azar };
})();
