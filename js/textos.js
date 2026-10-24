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
    "🧪 Probar el curso sin guardar": "🧪 Try the course without saving"
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
