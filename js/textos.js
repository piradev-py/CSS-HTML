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
    "Esta lección aún no está traducida: la ves en español.": "This lesson isn't translated yet, so you'll see it in Spanish."
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
