// Capturas de la página de inicio: mundos plegados, mundo abierto (camino en serpiente), oscuro y estrecho.
const BASE = new URL("../../", import.meta.url).href;
export default async function (b) {
  await b.tam(1366, 768);
  await b.ir(BASE + "index.html");
  // Progreso a medias: mundos 1 y 2 completos y parte del 3
  await b.eval(`(() => {
    const comp = {};
    CURSO.MUNDOS.filter(m => m.numero <= 2).forEach(m => m.lecciones.forEach(l => { comp[l.id] = { estrellas: 3, fecha: '2026-10-14' }; }));
    ['hc-01', 'hc-02', 'hc-03', 'hc-04', 'hc-05'].forEach((id, i) => { comp[id] = { estrellas: 1 + i % 3, fecha: '2026-10-14' }; });
    localStorage.setItem('csshtml-progreso-v1', JSON.stringify({ xp: 900, completadas: comp, insignias: ['primer-paso', 'sin-pistas', 'mundo-html'], racha: { dias: 0, ultimo: null }, ajustes: { sonido: false, tema: 'light', desbloquearTodo: false }, borradores: {} }));
  })()`);
  await b.ir(BASE + "index.html");
  b.log("Abiertos al entrar: " + await b.eval("document.querySelectorAll('.mundo[open]').length") + " de " + await b.eval("document.querySelectorAll('.mundo').length"));
  await b.foto("inicio-cerrado");
  await b.eval("document.querySelector('#mundo-3 summary').click()");
  await b.esperar(700);
  await b.eval("document.querySelector('#mundo-3').scrollIntoView({ block: 'start' }); window.scrollBy(0, -80)");
  await b.esperar(300);
  await b.foto("inicio-mundo3");
  b.log("Columnas del camino: " + await b.eval("getComputedStyle(document.querySelector('#mundo-3 .nodos')).getPropertyValue('--cols')"));
  await b.eval("document.querySelector('#mundo-4 summary').click()");
  await b.esperar(700);
  await b.oscuro(true);
  await b.eval("document.querySelector('#mundo-4').scrollIntoView({ block: 'start' }); window.scrollBy(0, -80)");
  await b.esperar(300);
  await b.foto("inicio-mundo4-oscuro");
  await b.oscuro(false);
  await b.tam(420, 860, true);
  await b.esperar(500);
  await b.eval("document.querySelector('#mundo-3').scrollIntoView({ block: 'start' }); window.scrollBy(0, -70)");
  await b.esperar(300);
  await b.foto("inicio-estrecho");
}
