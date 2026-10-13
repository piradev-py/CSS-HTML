const BASE = new URL("../../", import.meta.url).href;
const escribir = codigo => `(() => { const c = ${JSON.stringify(codigo)};
  for (const k of ['html','css','js']) { const tab = document.querySelector('.pestana-' + k); if (!tab) continue; tab.click();
    const t = document.querySelector('.area-codigo textarea'); t.value = c[k] || ''; t.dispatchEvent(new Event('input')); } })()`;
export default async function (b) {
  await b.tam(1366, 768);
  await b.ir(BASE + "index.html");
  await b.eval(`(() => { const comp = {}; CURSO.MUNDOS.forEach(m => m.lecciones.forEach(l => { comp[l.id] = { estrellas: 3, fecha: '2026-10-13' }; })); localStorage.setItem('csshtml-progreso-v1', JSON.stringify({ xp: 2000, completadas: comp, insignias: [], racha: { dias: 0, ultimo: null }, ajustes: { sonido: false, tema: 'light', desbloquearTodo: false }, borradores: {} })); })()`);
  const ir = async (id, paso) => { await b.ir(BASE + "leccion.html?id=" + id); await b.esperar(600);
    for (let i = 0; i < paso; i++) { await b.eval("document.querySelector('[data-siguiente]').disabled = false; document.querySelector('[data-siguiente]').click()"); await b.esperar(250); } await b.esperar(800); };
  await ir("js-01", 0); await b.foto("js01-explicacion");
  await ir("js-01", 2); await b.eval(escribir(await b.eval("CURSO.lecciones['js-01'].pasos[2].solucion")));
  await b.esperar(800); await b.eval("document.querySelector('[data-revisar]').click()"); await b.esperar(1500); await b.foto("js01-ejercicio");
  await ir("js-06", 0); await b.foto("js06-explicacion");
  await b.ir(BASE + "leccion.html?id=js-12#reto"); await b.esperar(1200); await b.eval(escribir(await b.eval("CURSO.lecciones['js-12'].pasos.at(-1).solucion")));
  await b.esperar(3000);
  b.log("js-12 HTML del reto: " + (await b.eval("CURSO.lecciones['js-12'].pasos.at(-1).solucion.html")).slice(0, 300));
  await b.eval(`(() => { const d = document.querySelector('.col-resultado iframe').contentDocument; const i = d.querySelector('input'); i.value = 'Carlos'; i.dispatchEvent(new Event('input', {bubbles:true})); const f = d.querySelector('form'); if (f) f.requestSubmit(); else d.querySelector('button').click(); })()`);
  await b.esperar(600); await b.eval("document.querySelector('[data-recargar]').click()"); await b.esperar(800);
  await b.eval("document.querySelector('.modal-fondo')?.remove()");
  await b.foto("js12-reto");
  await b.ir(BASE + "leccion.html?id=js-14#reto"); await b.esperar(1200); await b.eval(escribir(await b.eval("CURSO.lecciones['js-14'].pasos.at(-1).solucion")));
  await b.esperar(3000); await b.eval("document.querySelector('.modal-fondo')?.remove()"); await b.foto("js14-reto");
  await ir("js-14", 7); await b.foto("js14-cierre");
}
