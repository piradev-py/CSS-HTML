/* ============================================================
   <CSS-HTML> · Idioma de la web (inglés por defecto, español a un clic)
   - IDIOMA.actual: "en" o "es". Se guarda aparte del progreso
     (reiniciar el curso no cambia el idioma).
   - T("Texto en español", { dato }) devuelve su traducción si la
     hay en EN, y si no el español: lo que no está traducido sigue
     funcionando. {dato} se sustituye en los dos idiomas.
   - Va el PRIMERO de los scripts: los demás ya pueden usar T().
   Para traducir un archivo: envuelve sus textos en T("…") y añade
   aquí "…": "…" con la versión inglesa.
   ============================================================ */
(function () {
  // false mientras se traduce la interfaz: la web publicada sigue en español y sin botón; en local ya se prueba el inglés
  const PUBLICADO = false;
  const LOCAL = location.protocol === "file:" || ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
  const disponible = PUBLICADO || LOCAL;
  const CLAVE = "csshtml-idioma";
  let actual = disponible ? "en" : "es";
  try { if (localStorage.getItem(CLAVE) === "es") actual = "es"; } catch (e) {}
  document.documentElement.lang = actual;

  // Clave: el texto en español tal cual; valor: el inglés
  const EN = {
    "Esta lección aún no está traducida: la ves en español.": "This lesson isn't translated yet, so you'll see it in Spanish.",

    // mapa.js
    "¡Hola! Soy <b>Tagui</b> 👋 Aquí aprenderás a crear páginas web desde cero. ¡Sin prisa y jugando!": "Hi there! I'm <b>Tagui</b> 👋 Here you'll learn to build web pages from scratch. No rush — have fun while you learn!",
    "Aprende a crear páginas web <span class=\"resaltado\">jugando</span>": "Learn to build web pages <span class=\"resaltado\">by playing</span>",
    "Empieza por <b>HTML</b>, dale estilo con <b>CSS</b>, combínalos y termina dando vida a tus páginas con <b>JavaScript</b>. Cada lección es cortita y acaba con un reto.": "Start with <b>HTML</b>, add style with <b>CSS</b>, combine them, and finish by bringing your pages to life with <b>JavaScript</b>. Every lesson is short and ends with a challenge.",
    "▶ Continuar: ": "▶ Continue: ",
    "🚀 Empezar: ": "🚀 Start: ",
    "🎉 Has completado todas las lecciones disponibles. ¡Pronto habrá más!": "🎉 You've completed all the lessons available so far. More are coming soon!",
    "🏥 Mi clínica": "🏥 My clinic",
    "🧪 Laboratorio": "🧪 Lab",
    "Mundo {n}": "World {n}",
    "{n} disponibles": "{n} available",
    "completada con {n} estrellas": "completed with {n} stars",
    "disponible": "available",
    "bloqueada": "locked",
    "próximamente": "coming soon",
    "¡Empieza aquí!": "Start here!",
    "🧪 Estás en modo prueba": "🧪 You're in test mode",
    "Todo está desbloqueado. Lo que hagas aquí no cambia tu progreso real y se borra al cerrar la pestaña.": "Everything is unlocked. What you do here doesn't change your real progress and is wiped when you close the tab.",
    "🚪 Salir y volver a mi progreso": "🚪 Exit and go back to my progress",
    "🛠️ Modo prueba (solo en local)": "🛠️ Test mode (local only)",
    "¿Quieres echar un vistazo a cualquier lección sin que cuente? Usa el <b>modo prueba</b>: todo desbloqueado y tu progreso real queda intacto.": "Want a peek at any lesson without it counting? Use <b>test mode</b>: everything unlocked, and your real progress stays untouched.",
    "🧪 Probar el curso sin guardar": "🧪 Try the course without saving",

    // ui.js
    "&lt;CSS-HTML&gt;, ir al inicio": "&lt;CSS-HTML&gt;, go to the home page",
    "Días seguidos practicando": "Days in a row practicing",
    "Estrellas conseguidas": "Stars earned",
    "{n} XP": "{n} XP",
    " · siguiente nivel a {n} XP": " · next level at {n} XP",
    "Nv {n}": "Lvl {n}",
    "Experiencia": "Experience",
    "Activar o silenciar sonido": "Turn sound on or off",
    "Cambiar modo claro u oscuro": "Switch between light and dark mode",
    "Enviar una sugerencia o avisar de un error": "Send a suggestion or report a bug",
    "Sugerencias y errores": "Suggestions and bugs",
    "Ajustes": "Settings",
    "🧪 <b>Modo prueba</b>: todo está desbloqueado y nada se guarda en tu progreso real.": "🧪 <b>Test mode</b>: everything is unlocked and nothing is saved to your real progress.",
    "↺ Empezar la prueba de cero": "↺ Start the test from scratch",
    "Salir de la prueba": "Exit the test",
    "¿Empezar la prueba de cero? Solo se borra lo que has hecho en el modo prueba.": "Start the test from scratch? Only what you've done in test mode will be erased.",
    "¿Reiniciar el curso? Perderás tu XP, estrellas, insignias y racha. Esto no se puede deshacer.": "Restart the course? You'll lose your XP, stars, badges and streak. This can't be undone.",
    "⚙️ Ajustes": "⚙️ Settings",
    "🔊 Sonidos": "🔊 Sounds",
    "🔓 Desbloquear todas las lecciones": "🔓 Unlock all lessons",
    "🚪 Salir del modo prueba": "🚪 Exit test mode",
    "Empezar la prueba de cero": "Start the test from scratch",
    "Reiniciar curso": "Restart course",
    "Listo": "Done",
    "Versión {n}": "Version {n}",

    // progreso.js
    "Novato": "Rookie",
    "Aprendiz": "Apprentice",
    "Maquetador": "Builder",
    "Estilista": "Stylist",
    "Artesano web": "Web artisan",
    "Frontend Pro": "Frontend Pro",
    "Primer paso": "First step",
    "Completa tu primera lección": "Complete your first lesson",
    "¡Sin pistas!": "No hints!",
    "Consigue 3 estrellas en una lección": "Get 3 stars in one lesson",
    "En racha": "On a streak",
    "Practica 3 días seguidos": "Practice 3 days in a row",
    "Imparable": "Unstoppable",
    "Practica 7 días seguidos": "Practice 7 days in a row",
    "Coleccionista": "Collector",
    "Reúne 30 estrellas": "Collect 30 stars",
    "Arquitecto HTML": "HTML architect",
    "Termina el Mundo HTML": "Finish the HTML World",
    "Artista CSS": "CSS artist",
    "Termina el Mundo CSS": "Finish the CSS World",
    "Termina el Mundo HTML + CSS": "Finish the HTML + CSS World",
    "Mago JavaScript": "JavaScript wizard",
    "Termina el Mundo JavaScript": "Finish the JavaScript World",

    // leccion.js
    "Volver al mapa": "Back to the map",
    "🗺️ Volver al mapa": "🗺️ Back to the map",
    "Lección no encontrada": "Lesson not found",
    "Parece que esta lección no existe. Vuelve al mapa y elige otra.": "It looks like this lesson doesn't exist. Go back to the map and pick another one.",
    "Próximamente": "Coming soon",
    "El profesor todavía está preparando «{titulo}». ¡Vuelve pronto!": "The teacher is still working on “{titulo}”. Come back soon!",
    "Lección bloqueada": "Lesson locked",
    "Completa antes la lección anterior para desbloquear esta.": "Complete the previous lesson first to unlock this one.",
    "No pude cargar la lección": "I couldn't load the lesson",
    "No encuentro el archivo <code>{ruta}</code>.": "I can't find the file <code>{ruta}</code>.",
    "Algo salió mal": "Something went wrong",
    "El archivo de la lección no se registró correctamente.": "The lesson file didn't register correctly.",
    "Lección": "Lesson",
    "Lección {n}": "Lesson {n}",
    "← Anterior": "← Previous",
    "Siguiente →": "Next →",
    "Código": "Code",
    "Resultado": "Result",
    "Arrastra para cambiar el ancho (doble clic: restablecer)": "Drag to change the width (double-click: reset)",
    "Paso {n}": "Step {n}",
    "Paso {n} de {total}": "Step {n} of {total}",
    "💻 Código del ejemplo": "💻 Example code",
    "Lee la explicación con calma. En los siguientes pasos escribirás tu propio código. ✍️": "Take your time with the explanation. In the next steps you'll write your own code. ✍️",
    "✍️ ¡Pruébalo tú!": "✍️ Try it yourself!",
    "🎛️ Juega con los controles": "🎛️ Play with the controls",
    "Elige una respuesta en la pizarra →": "Pick an answer on the board →",
    "Piénsalo con calma. ¡Tú puedes!": "Take your time to think it through. You've got this!",
    "Ya superaste este reto. ¿Quieres intentar sacar más estrellas? ⭐": "You already beat this challenge. Want to go for more stars? ⭐",
    "Cumple todo lo de la lista. Se irá marcando en verde mientras escribes. ¡Ánimo!": "Complete everything on the list. It'll turn green as you type. Keep it up!",
    "¡Último encargo! Cuando todo esté en verde, la entrega estará lista. 🚀": "Last task! Once everything is green, your delivery will be ready. 🚀",
    "Cumple el encargo: la lista se irá marcando en verde mientras escribes.": "Do the task: the list will turn green as you type.",
    "📋 Encargo {n}": "📋 Task {n}",
    "📚 Glosario": "📚 Glossary",
    "Todo lo que has aprendido, con ejemplos para copiar (no pierdes tu código)": "Everything you've learned so far, with examples to copy (you won't lose your code)",
    "¡Perfecto, sin pistas!": "Perfect, no hints!",
    "¡Muy bien! La próxima, sin pistas 😉": "Very good! Next time, no hints 😉",
    "¡Superado! Repítelo para conseguir más estrellas.": "Passed! Do it again to earn more stars.",
    "Ya tenías estas estrellas: esta vez no sumas XP.": "You already had these stars: this time you don't earn XP.",
    "¡Subiste a nivel {n}: <b>{nombre}</b>!": "You reached level {n}: <b>{nombre}</b>!",
    "¡Nueva insignia!": "New badge!",
    "🏥 Ver mi clínica →": "🏥 See my clinic →",
    "Siguiente lección →": "Next lesson →",
    "🚧 La siguiente lección llegará pronto": "🚧 The next lesson is coming soon",
    "¡Lección completada!": "Lesson completed!",
    "🗺️ Mapa": "🗺️ Map",
    "🔁 Repetir reto": "🔁 Retry the challenge",

    // mascota.js
    "¡Hola! Soy <b>Tagui</b> 👋 Te acompañaré en esta aventura.": "Hi there! I'm <b>Tagui</b> 👋 I'll be with you on this adventure.",
    "¡Qué bien verte! ¿Seguimos construyendo cosas chulas?": "Great to see you! Shall we keep building cool stuff?",
    "¡Bienvenido de nuevo! Hoy es un gran día para aprender.": "Welcome back! Today is a great day to learn.",
    "¡Casi lo tienes! Revisa lo que falta en la lista.": "You're almost there! Check what's still missing on the list.",
    "Equivocarse es parte de programar. ¡Sigue probando!": "Making mistakes is part of coding. Keep trying!",
    "Respira, mira la lista de comprobaciones y ve paso a paso.": "Take a breath, look at the checklist, and go step by step.",
    "¡Bien hecho! 🎉": "Well done! 🎉",
    "¡Eso es! 💪": "That's it! 💪",
    "¡Genial! ✨": "Awesome! ✨",
    "¡Perfecto! 🙌": "Perfect! 🙌",
    "Uy, esa no es. ¡Prueba otra vez!": "Oops, that's not it. Try again!",
    "¡Casi! Piénsalo un poquito más.": "So close! Think it over a bit more.",
    "No pasa nada, inténtalo de nuevo.": "No worries, give it another go.",

    // sugerencias.js
    "Algo falla": "Something is broken",
    "Una idea": "An idea",
    "Una duda": "A question",
    "Otra cosa": "Something else",
    "Buzón de sugerencias": "Suggestion box",
    "¿Algo no funciona, no se entiende o se te ocurre una mejora? ¡Cuéntamelo!": "Is something broken, unclear, or do you have an idea to improve it? Tell me about it!",
    "¿Qué es?": "What is it?",
    "Tu mensaje": "Your message",
    "Por ejemplo: en el paso 3, el botón Siguiente no se activa…": "For example: in step 3, the Next button doesn't become active…",
    "Tu correo": "Your email",
    "opcional, por si quieres respuesta": "optional, in case you'd like a reply",
    "Se enviará también dónde estás:": "We'll also send where you are:",
    "versión {n}": "version {n}",
    "Cancelar": "Cancel",
    "Enviar": "Send",
    "✏️ Escribe un poco más para que pueda entenderlo.": "✏️ Write a bit more so I can understand it.",
    "📨 Enviando…": "📨 Sending…",
    "¡Gracias! 🧡": "Thank you! 🧡",
    "Tu mensaje ha llegado. Lo leeré con calma para mejorar el curso.": "Your message is in. I'll read it carefully to make the course better.",
    "Seguir aprendiendo": "Keep learning",
    "😵 No se pudo enviar. ¿Tienes internet? Inténtalo otra vez.": "😵 Couldn't send it. Do you have internet? Please try again.",

    // escritura.js
    "el comentario `<!--` de la línea {n} no está cerrado: falta `-->`.": "the `<!--` comment on line {n} isn't closed: add `-->`.",
    "a `<!DOCTYPE html` de la línea {n} le falta el `>` del final.": "`<!DOCTYPE html` on line {n} is missing the `>` at the end.",
    "en la etiqueta `<{etiqueta}>` de la línea {n} falta cerrar unas comillas `{comilla}`.": "in the `<{etiqueta}>` tag on line {n}, a `{comilla}` quote is left open.",
    "a la etiqueta `<{etiqueta}` de la línea {n} le falta el `>` del final.": "the `<{etiqueta}` tag on line {n} is missing the `>` at the end.",
    "falta cerrar `<{abierta}>` (línea {n}) antes de `</{etiqueta}>` (línea {n2}): escribe `</{abierta}>`.": "you need to close `<{abierta}>` (line {n}) before `</{etiqueta}>` (line {n2}): write `</{abierta}>`.",
    "sobra `</{etiqueta}>` en la línea {n}: no hay ningún `<{etiqueta}>` abierto.": "`</{etiqueta}>` on line {n} is extra: there's no `<{etiqueta}>` open.",
    "falta cerrar `<{etiqueta}>` (línea {n}): escribe `</{etiqueta}>`.": "you need to close `<{etiqueta}>` (line {n}): write `</{etiqueta}>`.",
    "falta cerrar `<{etiqueta}>` de la línea {n}: escribe `</{etiqueta}>`.": "the `<{etiqueta}>` from line {n} is still open: write `</{etiqueta}>`.",
    "el comentario `/*` de la línea {n} no está cerrado: falta `*/`.": "the `/*` comment on line {n} isn't closed: add `*/`.",
    "falta cerrar las comillas `{comilla}` de la línea {n}.": "the quote `{comilla}` on line {n} is left open.",
    "falta el `;` al final de la línea {n} (`{codigo}`).": "add `;` at the end of line {n} (`{codigo}`).",
    "a «{codigo}» (línea {n}) le faltan los dos puntos `:` entre la propiedad y el valor.": "“{codigo}” (line {n}) is missing the colon `:` between the property and the value.",
    "falta el `;` al final de `{codigo}` (línea {n}).": "add `;` at the end of `{codigo}` (line {n}).",
    "en la línea {n} hay un espacio «raro» (␣) en `{codigo}`, quizá de copiar y pegar: bórralo y escribe un espacio normal.": "line {n} has a “weird” space (␣) in `{codigo}`, maybe from copy and paste: delete it and type a normal space.",
    "la propiedad `{propiedad}` de la línea {n} no existe: revisa cómo está escrita.": "the property `{propiedad}` on line {n} doesn't exist: check how it's spelled.",
    "el navegador no entiende el valor `{valor}` de `{propiedad}` (línea {n}). Revisa cómo está escrito: una letra, un guion, una unidad como `px`…": "the browser doesn't understand the value `{valor}` of `{propiedad}` (line {n}). Check how it's written: a letter, a hyphen, a unit like `px`…",
    "falta cerrar con `}` la regla `{selector}` (línea {n}) antes de empezar `{preludio} {` (línea {n2}).": "the rule `{selector}` (line {n}) needs a closing `}` before `{preludio} {` starts (line {n2}).",
    "en la línea {n} hay una `{` sin selector delante.": "on line {n} there's a `{` with no selector before it.",
    "sobra una `}` en la línea {n}: no cierra ninguna regla.": "there's an extra `}` on line {n}: it doesn't close any rule.",
    "dentro de `{selector}` hay algo sin selector ni `{ }` (línea {n}): «{codigo}».": "inside `{selector}` there's something with no selector and no `{ }` (line {n}): “{codigo}”.",
    "«{codigo}» (línea {n}) está fuera de una regla: le faltan el selector y las `{ }`.": "“{codigo}” (line {n}) is outside a rule: it needs a selector and `{ }`.",
    "falta cerrar con `}` la regla `{selector}` de la línea {n}.": "the rule `{selector}` from line {n} needs a closing `}`.",
    "«{codigo}» (línea {n}) está suelto: le faltan las `{ }` o el `;`.": "“{codigo}” (line {n}) is on its own: it needs `{ }` or a `;`.",
    "sobra un `{signo}` en la línea {n}: no cierra nada.": "there's an extra `{signo}` on line {n}: it doesn't close anything.",
    "falta cerrar el `{abierto}` de la línea {n} (con `{pareja}`) antes del `{signo}` de la línea {n2}.": "the `{abierto}` from line {n} needs a `{pareja}` before the `{signo}` on line {n2}.",
    "falta cerrar las comillas invertidas `` ` `` de una plantilla de texto.": "the backtick `` ` `` of a template literal is left open.",
    "falta cerrar el `{abierto}` que abriste en la línea {n}: escribe `{pareja}`.": "the `{abierto}` you opened on line {n} is not closed: type `{pareja}`.",
    "En tu {lenguaje}, {mensaje}": "In your {lenguaje}, {mensaje}",

    // retos.js
    "🏆 Reto final": "🏆 Final challenge",
    "📄 Textos del encargo": "📄 Task texts",
    "Abrir la captura en grande": "Open the screenshot full size",
    "Captura de cómo debe quedar": "Screenshot of how it should look",
    "✅ Comprobar": "✅ Check",
    "💡 Pista": "💡 Hint",
    "Mira antes las pistas": "Look at the hints first",
    "👀 Ver solución": "👀 See solution",
    "📋 Copiar": "📋 Copy",
    "✅ Copiado": "✅ Copied",
    "📚 Repasa «{titulo}»": "📚 Review “{titulo}”",
    "Tu código está bien escrito: etiquetas cerradas, `{ }` y `;`": "Your code is well written: closed tags, `{ }` and `;`",
    "¡LO CONSEGUISTE! 🎉 Eres una máquina.": "YOU DID IT! 🎉 You're amazing.",
    "Te falta 1 cosa.": "You're missing 1 thing.",
    "Te faltan {n} cosas.": "You're missing {n} things.",
    "💡 Pista {n}:": "💡 Hint {n}:",
    "¿Ver la solución? Podrás estudiarla, pero esta lección te dará solo 1 ⭐.": "See the solution? You'll be able to study it, but this lesson will only earn 1 ⭐.",

    // glosario.js
    "Copiar el ejemplo": "Copy the example",
    "📖 Lección {n} · {titulo}": "📖 Lesson {n} · {titulo}",
    "✖ Cerrar": "✖ Close",
    "Busca una etiqueta o lo que quieres hacer (centrar, enlace…)": "Search for a tag or what you want to do (center, link…)",
    "Buscar en el glosario": "Search the glossary",
    "Cargando…": "Loading…",
    "⭐ Para este encargo": "⭐ For this task",
    "Todavía no hay términos.": "No terms yet.",
    "Glosario": "Glossary"
  };

  function T(texto, datos) {
    let t = actual === "en" && EN[texto] !== undefined ? EN[texto] : texto;
    if (datos) t = t.replace(/\{(\w+)\}/g, (todo, k) => (k in datos ? datos[k] : todo));
    return t;
  }

  window.T = T;
  window.IDIOMA = {
    actual,
    disponible,
    cambiar(idioma) {
      try { localStorage.setItem(CLAVE, idioma); } catch (e) {}
      location.reload();
    }
  };
})();
