// Proyecto web del Mundo 1 (html-14) recorrido como un alumno: cada encargo con su versión oficial, hasta la victoria
const BASE = new URL("../../", import.meta.url).href;

function estado() {
  const li = [...document.querySelectorAll(".comprobaciones li")];
  return li.filter(x => x.classList.contains("ok")).length + "/" + li.length +
    (li.some(x => !x.classList.contains("ok")) ? " · faltan: " + li.filter(x => !x.classList.contains("ok")).map(x => x.innerText.split("\n")[1] || x.innerText).join(" | ") : "");
}
const enPagina = (f, ...a) => "(" + f + ")(" + a.map(x => JSON.stringify(x)).join(",") + ")";
function escribir(html) {
  const t = document.querySelector(".area-codigo textarea");
  t.value = html;
  t.dispatchEvent(new Event("input"));
}

export default async function (b) {
  await b.tam(1366, 768);
  await b.ir(BASE + "index.html");
  await b.eval(`localStorage.setItem('csshtml-progreso-v1', JSON.stringify({ xp: 0, completadas: { "html-13": { estrellas: 3, fecha: "2026-10-18" } }, insignias: [], racha: { dias: 0, ultimo: null }, ajustes: { sonido: false, tema: 'light', desbloquearTodo: false }, borradores: {} }))`);
  await b.ir(BASE + "leccion.html?id=html-14");
  await b.esperar(2000);
  await b.foto("html14-inicio");
  await b.eval("document.querySelector('[data-siguiente]').click()");
  await b.esperar(2500);
  b.log("Encargo 1 vacío: " + await b.eval(enPagina(estado)));
  await b.foto("html14-encargo1");
  const pasos = JSON.parse(await b.eval("JSON.stringify(HUELLAS['mundo-1'].pasos)"));
  for (let i = 0; i < 5; i++) {
    await b.eval(enPagina(escribir, pasos[i]));
    await b.esperar(3500);
    b.log("Encargo " + (i + 1) + " con la versión oficial: " + await b.eval(enPagina(estado)));
    if (i === 2) await b.foto("html14-encargo3");
    if (i < 4) {
      await b.eval("document.querySelector('.modal-fondo')?.remove(); document.querySelector('[data-siguiente]').click()");
      await b.esperar(2500);
      b.log("  → encargo " + (i + 2) + " parte de lo anterior: " + await b.eval(enPagina(estado)));
    }
  }
  b.log("Victoria: " + await b.eval("!!document.querySelector('.modal-victoria')") + " · completada: " + await b.eval("PROGRESO.estaCompletada('html-14')"));
  await b.foto("html14-victoria");
}
