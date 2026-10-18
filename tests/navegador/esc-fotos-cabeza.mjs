const BASE = new URL("../../", import.meta.url).href;
const escribir = codigo => `(() => { const t = document.querySelector('.area-codigo textarea'); t.value = ${JSON.stringify(codigo.html)}; t.dispatchEvent(new Event('input')); })()`;
export default async function (b) {
  await b.tam(1366, 768);
  await b.ir(BASE + "index.html");
  await b.eval(`localStorage.setItem('csshtml-progreso-v1', JSON.stringify({ xp: 0, completadas: { "html-12": { estrellas: 3, fecha: "2026-10-18" } }, insignias: [], racha: { dias: 0, ultimo: null }, ajustes: { sonido: false, tema: 'light', desbloquearTodo: false }, borradores: {} }))`);
  await b.ir(BASE + "leccion.html?id=html-13"); await b.esperar(1500); await b.foto("html13-explicacion");
  for (let i = 0; i < 6; i++) { await b.eval("document.querySelector('[data-siguiente]').disabled = false; document.querySelector('[data-siguiente]').click()"); await b.esperar(300); }
  await b.esperar(1200); await b.foto("html13-reto-inicial");
  await b.eval(escribir(await b.eval("CURSO.lecciones['html-13'].pasos.at(-1).solucion")));
  await b.esperar(1500); await b.foto("html13-reto-hecho");
}
