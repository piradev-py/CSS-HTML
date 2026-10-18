// Proyecto web del Mundo 2 (css-15) recorrido como un alumno: cada encargo con su versión oficial, hasta la victoria
const BASE = new URL("../../", import.meta.url).href;

function estado() {
  const li = [...document.querySelectorAll(".comprobaciones li")];
  return li.filter(x => x.classList.contains("ok")).length + "/" + li.length +
    (li.some(x => !x.classList.contains("ok")) ? " · faltan: " + li.filter(x => !x.classList.contains("ok")).map(x => x.innerText.split("\n")[1] || x.innerText).join(" | ") : "");
}
const enPagina = (f, ...a) => "(" + f + ")(" + a.map(x => JSON.stringify(x)).join(",") + ")";
function escribir(pestana, codigo) {
  document.querySelector('[data-pestana="' + pestana + '"]').click();
  const t = document.querySelector(".area-codigo textarea");
  t.value = codigo;
  t.dispatchEvent(new Event("input"));
}

export default async function (b) {
  await b.tam(1366, 768);
  await b.ir(BASE + "index.html");
  await b.eval(`localStorage.setItem('csshtml-progreso-v1', JSON.stringify({ xp: 0, completadas: { "css-14": { estrellas: 3, fecha: "2026-10-18" } }, insignias: [], racha: { dias: 0, ultimo: null }, ajustes: { sonido: false, tema: 'light', desbloquearTodo: false }, borradores: {} }))`);
  await b.ir(BASE + "leccion.html?id=css-15");
  await b.esperar(2000);
  await b.foto("css15-inicio");
  await b.eval("document.querySelector('[data-siguiente]').click()");
  await b.esperar(2500);
  b.log("Encargo 1 sin estilos: " + await b.eval(enPagina(estado)) + " · pestaña activa: " + await b.eval("document.querySelector('.pestana[aria-selected=true]')?.dataset.pestana"));
  await b.foto("css15-encargo1");
  const pasos = JSON.parse(await b.eval("JSON.stringify(HUELLAS['mundo-2'].pasos)"));
  const html = await b.eval("HUELLAS['mundo-2'].html.replace(/\\n *<link rel=\"preconnect\"[^>]*>/g, '')");
  await b.eval(enPagina(escribir, "html", html));
  for (let i = 0; i < 4; i++) {
    await b.eval(enPagina(escribir, "css", pasos[i]));
    await b.esperar(4000);
    b.log("Encargo " + (i + 1) + " con la versión oficial: " + await b.eval(enPagina(estado)));
    if (i === 3) await b.foto("css15-encargo4");
    if (i < 3) {
      await b.eval("document.querySelector('.modal-fondo')?.remove(); document.querySelector('[data-siguiente]').click()");
      await b.esperar(2500);
      b.log("  → encargo " + (i + 2) + " parte de lo anterior: " + await b.eval(enPagina(estado)) + " · pestaña: " + await b.eval("document.querySelector('.pestana[aria-selected=true]')?.dataset.pestana"));
    }
  }
  b.log("Victoria: " + await b.eval("!!document.querySelector('.modal-victoria')") + " · completada: " + await b.eval("PROGRESO.estaCompletada('css-15')"));
  await b.foto("css15-victoria");
}
