// Interfaz del paso proyecto con una lección de demostración (tests/demo/demo-proyecto.js)
const BASE = new URL("../../", import.meta.url).href;

// Se ejecutan dentro de la página (b.eval con su texto)
function lista() {
  return [...document.querySelectorAll(".comprobaciones li")]
    .map(li => (li.classList.contains("ok") ? "✓ " : "○ ") + li.innerText.split("\n").join(" · ")).join(" | ");
}
function anadirDescripcion() {
  const t = document.querySelector(".area-codigo textarea");
  t.value = t.value.replace("<title>", '<meta name="description" content="Clínica">\n  <title>');
  t.dispatchEvent(new Event("input"));
}
const enPagina = f => "(" + f + ")()";

export default async function (b) {
  await b.tam(1366, 768);
  // La demo se añade a MUNDOS en cuanto curso.js crea CURSO
  await b.cdp("Page.addScriptToEvaluateOnNewDocument", { source: `
    Object.defineProperty(window, "CURSO", { configurable: true, get() { return this.__c; }, set(v) {
      v.MUNDOS[0].lecciones.push({ id: "demo-proyecto", archivo: "../../tests/demo/demo-proyecto.js", titulo: "Demo de proyecto", listo: true, huellas: true });
      this.__c = v; } });` });
  await b.ir(BASE + "index.html");
  await b.eval(`localStorage.setItem('csshtml-progreso-v1', JSON.stringify({ xp: 0, completadas: { "html-13": { estrellas: 3, fecha: "2026-10-18" }, "html-14": { estrellas: 3, fecha: "2026-10-18" } }, insignias: [], racha: { dias: 0, ultimo: null }, ajustes: { sonido: false, tema: 'light', desbloquearTodo: false }, borradores: {} }))`);
  await b.ir(BASE + "leccion.html?id=demo-proyecto");
  await b.esperar(2500);
  b.log("Paso 1: " + await b.eval(enPagina(lista)));
  b.log("Pestañas: " + await b.eval("[...document.querySelectorAll('.pestana')].map(t => t.innerText).join(', ')"));
  b.log("Siguiente bloqueado: " + await b.eval("document.querySelector('[data-siguiente]').disabled"));
  await b.foto("proyecto-paso1");
  // Glosario: términos de las lecciones anteriores, los del encargo arriba, y el buscador
  await b.eval("document.querySelector('.boton-glosario').click()"); await b.esperar(1500);
  b.log("Glosario: " + await b.eval("document.querySelectorAll('.g-entrada').length") + " entradas; destacados: " +
    await b.eval("[...document.querySelectorAll('.g-grupo')][0].querySelectorAll('.g-termino').length"));
  await b.foto("proyecto-glosario");
  await b.eval("(() => { const q = document.querySelector('.g-buscar'); q.value = 'telefono'; q.dispatchEvent(new Event('input')); })()");
  b.log("Buscar «telefono»: " + await b.eval("[...document.querySelectorAll('.g-entrada:not([hidden]) .g-termino')].map(e => e.textContent).join(' · ')"));
  await b.eval("document.querySelector('.glosario [data-cerrar]').click()");
  // Al escribir la description el encargo se supera solo y se puede seguir
  await b.eval(enPagina(anadirDescripcion));
  await b.esperar(2500);
  b.log("Tras escribir: " + await b.eval(enPagina(lista)));
  b.log("Siguiente bloqueado: " + await b.eval("document.querySelector('[data-siguiente]').disabled"));
  await b.eval("document.querySelector('.modal-fondo')?.remove(); document.querySelector('[data-siguiente]').click()");
  await b.esperar(2500);
  b.log("Paso 2 conserva el código del paso 1: " + await b.eval("document.querySelector('.area-codigo textarea').value.includes('content=\"Clínica\"')"));
  b.log("Pestañas: " + await b.eval("[...document.querySelectorAll('.pestana')].map(t => t.innerText).join(', ')"));
  b.log("Paso 2: " + await b.eval(enPagina(lista)));
  await b.foto("proyecto-paso2");
}
