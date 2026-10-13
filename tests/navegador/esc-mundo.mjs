// Recorre un mundo entero como un alumno. Uso: MUNDO=2 node cdp.mjs esc-mundo.mjs
const BASE = new URL("../../", import.meta.url).href;
const NUM = Number(process.env.MUNDO || 2);

// Escribe código en el editor pestaña a pestaña, como lo haría el alumno
const escribir = codigo => `(() => {
  const c = ${JSON.stringify(codigo)};
  for (const k of ['html', 'css', 'js']) {
    const tab = document.querySelector('.pestana-' + k);
    if (!tab) continue;
    tab.click();
    const t = document.querySelector('.area-codigo textarea');
    t.value = c[k] || '';
    t.dispatchEvent(new Event('input'));
  }
})()`;

// Espera a que el botón «Revisar» termine (la revisión puede hacer varias pasadas: estados, anchos…)
async function esperarRevision(b) {
  await b.esperar(300);
  for (let i = 0; i < 40; i++) {
    if (!(await b.eval("document.querySelector('.resultado-revision').className.includes('revisando')"))) break;
    await b.esperar(250);
  }
}

export default async function (b) {
  await b.tam(1366, 768);
  await b.movimiento();
  await b.ir(BASE + "index.html");
  // Mundos anteriores ya completados para que este esté desbloqueado
  await b.eval(`(() => {
    const comp = {};
    CURSO.MUNDOS.filter(m => m.numero < ${NUM}).forEach(m => m.lecciones.forEach(l => { comp[l.id] = { estrellas: 3, fecha: '2026-10-13' }; }));
    localStorage.setItem('csshtml-progreso-v1', JSON.stringify({ xp: 1000, completadas: comp, insignias: [], racha: { dias: 0, ultimo: null }, ajustes: { sonido: false, tema: 'light', desbloquearTodo: false }, borradores: {} }));
  })()`);
  const ids = await b.eval(`CURSO.MUNDOS.find(m => m.numero === ${NUM}).lecciones.filter(l => l.listo).map(l => l.id)`);
  b.log("Lecciones listas del mundo " + NUM + ": " + ids.length);

  for (const id of ids) {
    await b.ir(BASE + "leccion.html?id=" + id);
    await b.esperar(500);
    if (await b.eval("!!document.querySelector('.aviso-grande')")) {
      b.log("❌ " + id + " no se pudo abrir: " + await b.eval("document.querySelector('.aviso-grande h1').textContent"));
      continue;
    }
    const pasos = await b.eval(`CURSO.lecciones['${id}'].pasos.map(p => p.tipo)`);
    const problemas = [];
    const notas = [];
    for (let i = 0; i < pasos.length; i++) {
      const t = pasos[i];
      const P = `CURSO.lecciones['${id}'].pasos[${i}]`;
      if (t === "explicacion" && await b.eval(`!!${P}.ejemplo`)) {
        await b.esperar(300);
        if (!await b.eval("!!document.querySelector('.col-resultado iframe')?.contentDocument?.body")) problemas.push("paso " + (i + 1) + ": ejemplo sin resultado");
      }
      if (t === "ejercicio") {
        await b.esperar(400);
        const bloqueado = await b.eval("document.querySelector('[data-siguiente]').disabled");
        const pestana = await b.eval("document.querySelector('.pestana.activa')?.dataset.pestana");
        const esperada = await b.eval(`EJERCICIOS.pestanaInicial(${P}) || 'html'`);
        // Revisar sin tocar nada (código inicial) debe suspender
        await b.eval("document.querySelector('[data-revisar]').click()");
        await esperarRevision(b);
        const mal = await b.eval("document.querySelector('.resultado-revision').className.includes('incorrecto')");
        const msgMal = await b.eval("document.querySelector('.resultado-revision').textContent");
        await b.eval(escribir(await b.eval(`${P}.solucion`)));
        await b.eval("document.querySelector('[data-revisar]').click()");
        await esperarRevision(b);
        const bien = await b.eval("(() => { const r = document.querySelector('.resultado-revision'); return r.classList.contains('correcto'); })()");
        if (!bien) problemas.push("paso " + (i + 1) + ": la solución no aprueba → " + await b.eval("document.querySelector('.resultado-revision').textContent"));
        if (!bloqueado || !mal || pestana !== esperada) problemas.push("paso " + (i + 1) + ": ejercicio → bloqueado=" + bloqueado + " suspendeInicial=" + mal + " pestaña=" + pestana + "/" + esperada);
        notas.push("ejercicio [abre en " + pestana + "] inicial → «" + msgMal.trim().slice(0, 70) + "»");
      }
      if (t === "controles") {
        await b.esperar(500);
        const antes = await b.eval("document.querySelector('.codigo-generado')?.textContent || ''");
        // Mueve el primer control: deslizador al máximo, color a verde o la última opción
        await b.eval(`(() => {
          const r = document.querySelector('.lista-controles input[type=range]');
          if (r) { r.value = r.max; r.dispatchEvent(new Event('input')); return; }
          const c = document.querySelector('.lista-controles input[type=color]');
          if (c) { c.value = '#00aa00'; c.dispatchEvent(new Event('input')); return; }
          const o = [...document.querySelectorAll('.opcion-control')].pop(); if (o) o.click();
        })()`);
        await b.esperar(300);
        const despues = await b.eval("document.querySelector('.codigo-generado')?.textContent || ''");
        const nControles = await b.eval("document.querySelectorAll('.lista-controles .control').length");
        if (!nControles || antes === despues) problemas.push("paso " + (i + 1) + ": los controles no cambian el CSS");
        notas.push("controles: " + nControles + " · " + despues.replace(/\s+/g, " ").slice(0, 60));
      }
      if (t === "quiz") {
        await b.eval(`document.querySelectorAll('.opcion-quiz')[${P}.correcta].click()`);
        await b.esperar(200);
      }
      if (t === "reto") {
        await b.esperar(800);
        const inicial = await b.eval("[...document.querySelectorAll('.comprobaciones li')].map(l => l.classList.contains('ok') ? '✓' : '·').join('')");
        await b.eval(escribir(await b.eval(`${P}.solucion`)));
        await b.esperar(2500);
        const marcas = await b.eval("[...document.querySelectorAll('.comprobaciones li')].map(l => l.classList.contains('ok') ? '✓' : '✗').join('')");
        const victoria = await b.eval("!!document.querySelector('.modal-victoria')");
        if (!victoria) problemas.push("reto sin victoria (" + marcas + ")");
        notas.push("reto: al empezar " + inicial + " → con solución " + marcas + (victoria ? " 🏆" : ""));
        continue;
      }
      const sig = await b.eval("(() => { const s = document.querySelector('[data-siguiente]'); if (s.disabled) return 'bloqueado'; s.click(); return 'ok'; })()");
      if (sig !== "ok") { problemas.push("paso " + (i + 1) + " (" + t + "): Siguiente " + sig); break; }
      await b.esperar(350);
    }
    b.log((problemas.length ? "❌ " : "✅ ") + id + " · [" + pasos.join(", ") + "]");
    notas.forEach(n => b.log("     " + n));
    problemas.forEach(p => b.log("     ⚠️ " + p));
  }
  await b.ir(BASE + "index.html");
  await b.esperar(600);
  b.log("Mapa: " + await b.eval(`document.querySelector('#mundo-${NUM} .mundo-progreso b').textContent`) +
    " · insignias: " + await b.eval("[...document.querySelectorAll('.insignia.ganada b')].map(x => x.textContent).join(', ')"));
}
