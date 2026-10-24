/* ============================================================
   <CSS-HTML> · Caja de sugerencias (botón 💬 de la cabecera)
   Envía cada mensaje a un Formulario de Google del autor; las
   respuestas se revisan (y se borran) en su Hoja de cálculo.
   La lección, el paso y la versión se añaden solos.
   Si cambia el formulario, actualiza FORMULARIO y CAMPOS: los
   entry.N salen de «Obtener enlace rellenado previamente».
   ============================================================ */
(function () {
  const FORMULARIO = "https://docs.google.com/forms/d/e/1FAIpQLSdkqV6o-Rjbz21rLvKPusLzxOUwpzKW92b5ACa_g2Y9G-SOew/formResponse";
  const CAMPOS = {
    tipo: "entry.983041419",
    mensaje: "entry.1428433344",
    leccion: "entry.396776956",
    version: "entry.2069715491",
    contacto: "entry.158157407"
  };
  // El valor de cada opción tiene que coincidir con el texto de la opción en el formulario
  const TIPOS = [
    { valor: "Error", emoji: "🐞", texto: T("Algo falla") },
    { valor: "Sugerencia", emoji: "💡", texto: T("Una idea") },
    { valor: "Duda", emoji: "❓", texto: T("Una duda") },
    { valor: "Otro", emoji: "💬", texto: T("Otra cosa") }
  ];

  /** Dónde está el alumno: «html-06 · Enlaces · Paso 3 de 6», o «Mapa». */
  function contexto() {
    const id = new URLSearchParams(location.search).get("id");
    if (!id) return "Mapa";
    const info = CURSO.buscar(id);
    const paso = document.querySelector(".contador-pasos");
    return [id, info && info.titulo, paso && paso.textContent].filter(Boolean).join(" · ");
  }

  function enviar(datos) {
    const cuerpo = new URLSearchParams();
    Object.keys(CAMPOS).forEach(k => { if (datos[k]) cuerpo.append(CAMPOS[k], datos[k]); });
    // no-cors: Google no deja leer la respuesta, pero el envío llega. Solo sabemos si falló la red.
    return fetch(FORMULARIO, { method: "POST", mode: "no-cors", body: cuerpo });
  }

  function abrir() {
    const donde = contexto();
    const m = CELEBRAR.modal(
      "<h2>💬 " + T("Buzón de sugerencias") + "</h2>" +
      '<p class="sugerencia-intro">' + T("¿Algo no funciona, no se entiende o se te ocurre una mejora? ¡Cuéntamelo!") + "</p>" +
      '<form class="form-sugerencia">' +
        '<fieldset class="tipos-sugerencia"><legend>' + T("¿Qué es?") + "</legend>" +
        TIPOS.map((t, i) =>
          '<label><input type="radio" name="tipo" value="' + t.valor + '"' + (i === 0 ? " checked" : "") + ">" +
          "<span>" + t.emoji + " " + t.texto + "</span></label>").join("") +
        "</fieldset>" +
        '<label class="campo-sugerencia">' + T("Tu mensaje") +
          '<textarea name="mensaje" rows="5" maxlength="2000" required placeholder="' + T("Por ejemplo: en el paso 3, el botón Siguiente no se activa…") + '"></textarea>' +
        "</label>" +
        '<label class="campo-sugerencia"><span>' + T("Tu correo") + ' <small>(' + T("opcional, por si quieres respuesta") + ")</small></span>" +
          '<input type="email" name="contacto" maxlength="200" autocomplete="email">' +
        "</label>" +
        '<p class="sugerencia-donde">📍 ' + T("Se enviará también dónde estás:") + " <b>" + UI.escapar(donde) + "</b> (" + T("versión {n}", { n: CURSO.VERSION }) + ")</p>" +
        '<p class="sugerencia-estado" aria-live="polite"></p>' +
        '<div class="acciones">' +
          '<button type="button" class="boton secundario" data-cerrar>' + T("Cancelar") + "</button>" +
          '<button type="submit" class="boton">📨 ' + T("Enviar") + "</button>" +
        "</div>" +
      "</form>"
    );
    const form = m.elemento.querySelector("form");
    const estado = form.querySelector(".sugerencia-estado");
    const bEnviar = form.querySelector('[type="submit"]');
    form.querySelector("textarea").focus();

    form.addEventListener("submit", e => {
      e.preventDefault();
      const mensaje = form.mensaje.value.trim();
      if (mensaje.length < 5) {
        estado.textContent = T("✏️ Escribe un poco más para que pueda entenderlo.");
        return;
      }
      bEnviar.disabled = true;
      estado.textContent = T("📨 Enviando…");
      enviar({
        tipo: form.tipo.value,
        mensaje,
        leccion: donde,
        version: CURSO.VERSION,
        contacto: form.contacto.value.trim()
      }).then(() => {
        m.elemento.querySelector(".modal").innerHTML =
          MASCOTA.svg("alegre") +
          "<h2>" + T("¡Gracias! 🧡") + "</h2>" +
          '<p class="sugerencia-intro">' + T("Tu mensaje ha llegado. Lo leeré con calma para mejorar el curso.") + "</p>" +
          '<div class="acciones"><button class="boton" data-listo>' + T("Seguir aprendiendo") + "</button></div>";
        const listo = m.elemento.querySelector("[data-listo]");
        listo.addEventListener("click", m.cerrar);
        listo.focus();
      }).catch(() => {
        bEnviar.disabled = false;
        estado.textContent = T("😵 No se pudo enviar. ¿Tienes internet? Inténtalo otra vez.");
      });
    });
  }

  window.SUGERENCIAS = { abrir };
})();
