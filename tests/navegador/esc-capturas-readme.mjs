// Capturas para el README (se guardan en docs/capturas/). Uso: node tests/navegador/cdp.mjs esc-capturas-readme.mjs
import { mkdirSync, renameSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const BASE = new URL("../../", import.meta.url).href;
const AQUI = dirname(fileURLToPath(import.meta.url));
const DESTINO = join(AQUI, "..", "..", "docs", "capturas");

// Escribe código en el editor pestaña a pestaña, como el alumno
const escribir = codigo => `(() => { const c = ${JSON.stringify(codigo)};
  for (const k of ['html','css','js']) { const tab = document.querySelector('.pestana-' + k); if (!tab) continue; tab.click();
    const t = document.querySelector('.area-codigo textarea'); t.value = c[k] || ''; t.dispatchEvent(new Event('input')); } })()`;

function progreso(tema, todo = false) {
  return `(() => {
    const comp = {};
    CURSO.MUNDOS.filter(m => m.numero === 1).forEach(m => m.lecciones.forEach((l, i) => { comp[l.id] = { estrellas: [3, 3, 2, 3, 3, 1, 3, 2, 3, 3, 3, 2][i], fecha: '2026-10-14' }; }));
    ['css-01', 'css-02', 'css-03', 'css-04', 'css-05'].forEach((id, i) => { comp[id] = { estrellas: [3, 2, 3, 3, 2][i], fecha: '2026-10-14' }; });
    // Para las capturas de lecciones, todas «hechas»: así se puede saltar a cualquier paso
    if (${todo}) CURSO.listaPlana().forEach(l => { comp[l.id] = comp[l.id] || { estrellas: 3, fecha: '2026-10-14' }; });
    localStorage.setItem('csshtml-progreso-v1', JSON.stringify({ xp: 640, completadas: comp,
      // Con todo «hecho», las insignias ya están ganadas: así la victoria no regala insignias que no tocan
      insignias: ${todo} ? PROGRESO.INSIGNIAS.map(i => i.id) : ['primer-paso', 'sin-pistas', 'racha-3', 'estrellas-30', 'mundo-1'],
      racha: { dias: 3, ultimo: new Date().toISOString().slice(0, 10) },
      ajustes: { sonido: false, tema: '${tema}', desbloquearTodo: ${todo} }, borradores: {} }));
  })()`;
}

export default async function (b) {
  mkdirSync(DESTINO, { recursive: true });
  const foto = async nombre => { await b.foto(nombre); renameSync(join(AQUI, nombre + ".png"), join(DESTINO, nombre + ".png")); };
  const lec = async (id, paso, hash = "") => {
    await b.ir(BASE + "leccion.html?id=" + id + hash);
    await b.esperar(700);
    // paso puede ser un número o un tipo de paso ("controles", "ejercicio"…): el primero de ese tipo
    if (typeof paso === "string") paso = await b.eval(`CURSO.lecciones['${id}'].pasos.findIndex(p => p.tipo === '${paso}')`);
    for (let i = 0; i < paso; i++) {
      await b.eval("(() => { const s = document.querySelector('[data-siguiente]'); s.disabled = false; s.click(); })()");
      await b.esperar(250);
    }
    await b.esperar(900);
  };

  await b.tam(1366, 768);
  await b.movimiento();
  await b.ir(BASE + "index.html");
  await b.eval(progreso("light"));

  // 1. Inicio
  await b.ir(BASE + "index.html");
  await b.esperar(800);
  await foto("inicio");

  // 2. Mapa con un mundo abierto (camino en serpiente)
  await b.eval("document.querySelector('#mundo-2 summary').click()");
  await b.esperar(700);
  await b.eval("document.querySelector('#mundo-2').scrollIntoView({ block: 'start' }); window.scrollBy(0, -84)");
  await b.esperar(400);
  await foto("mapa");

  // Para las lecciones, todo desbloqueado
  await b.eval(progreso("light", true));

  // 3. Explicación con ejemplo (tarjetas)
  await lec("hc-01", 3);
  await foto("leccion-explicacion");

  // 4. Controles visuales (bordes y sombras)
  await lec("css-08", "controles");
  await b.eval(`(() => { const r = document.querySelector('.lista-controles input[type=range]'); if (r) { r.value = Math.round(r.max * 0.7); r.dispatchEvent(new Event('input')); } })()`);
  await b.eval("[...document.querySelectorAll('.opcion-control')].find(o => o.textContent.includes('0 8px 16px'))?.click()");
  await b.esperar(400);
  await foto("leccion-controles");

  // 5. Reto a medias: la lista de comprobaciones se va poniendo en verde
  await lec("html-05", 0, "#reto");
  const sol = await b.eval("CURSO.lecciones['html-05'].pasos.at(-1).solucion");
  await b.eval(escribir({ html: sol.html.split("<ol>")[0] }));
  await b.esperar(1500);
  await b.eval("document.querySelector('.comprobaciones').scrollIntoView({ block: 'center' })");
  await b.esperar(300);
  await foto("leccion-reto");

  // 6. JavaScript: página interactiva y consola
  await lec("js-06", 0);
  await b.eval("(() => { const d = document.querySelector('.col-resultado iframe').contentDocument; d.querySelector('button')?.click(); d.querySelector('button')?.click(); })()");
  await b.esperar(500);
  await foto("leccion-javascript");

  // 7. Victoria en una lección «nueva» (para que sume XP)
  await lec("css-06", 0, "#reto");
  await b.eval("delete PROGRESO.datos.completadas['css-06']");
  await b.eval(escribir(await b.eval("CURSO.lecciones['css-06'].pasos.at(-1).solucion")));
  await b.esperar(2600);
  await foto("victoria");

  // 8. Modo oscuro
  await b.eval(progreso("dark", true));
  await lec("css-04", "ejercicio");
  await b.eval(escribir(await b.eval("CURSO.lecciones['css-04'].pasos.find(p => p.tipo === 'ejercicio').solucion")));
  await b.esperar(800);
  await b.eval("document.querySelector('[data-revisar]').click()");
  await b.esperar(1800);
  await foto("modo-oscuro");
}
