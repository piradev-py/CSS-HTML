// Proyecto web del Mundo 3 (hc-13) recorrido como un alumno: cada encargo con su versión oficial, hasta la victoria.
// Antes, variantes rotas de la versión oficial: cada una debe suspender lo que rompe
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

// [paso, nombre, cambio de la hoja oficial de ese paso, comprobación que debe suspender (inicio del texto)]
const ROTAS = [
  [1, "escritorio sin @media", "s => s.replace('@media (min-width: 1100px) {', '@media (min-width: 100px) {')", "A 375 px, los servicios"],
  [2, "tableta después del escritorio", "s => { const i = s.indexOf('/* ---------- 4.'), j = s.indexOf('/* ---------- 5.'), k = s.indexOf('/* ---------- 6.'); return s.slice(0, i) + s.slice(j, k) + s.slice(i, j) + s.slice(k); }", "A 1200 px, la portada vuelve"],
  [3, "sin transition", "s => s.replace(/  transition: transform[^;]*;/, '')", "Los botones y las tarjetas cambian"],
  [4, "sin prefers-reduced-motion", "s => s.replace(/@media \\(prefers-reduced-motion[\\s\\S]*$/, '')", "Con menos movimiento (`prefers"]
];

export default async function (b) {
  await b.tam(1366, 768);
  await b.ir(BASE + "index.html");
  await b.eval(`localStorage.setItem('csshtml-progreso-v1', JSON.stringify({ xp: 0, completadas: { "hc-10": { estrellas: 3, fecha: "2026-10-18" } }, insignias: [], racha: { dias: 0, ultimo: null }, ajustes: { sonido: false, tema: 'light', desbloquearTodo: false }, borradores: {} }))`);
  await b.ir(BASE + "leccion.html?id=hc-13");
  await b.esperar(2500);
  for (const [n, nombre, cambio, debeFallar] of ROTAS) {
    const r = await b.eval(`(async () => {
      const p = CURSO.lecciones["hc-13"].pasos[${n}];
      const sol = Object.assign({}, p.solucion, { css: (${cambio})(p.solucion.css) });
      const r = await RETOS.evaluar(EDITOR.conBase(sol, p.cssBase, p.proyecto), p.comprobaciones, PRUEBA.crearMarco());
      return p.comprobaciones.filter((c, i) => !r[i]).map(c => c.texto).join(" | ");
    })()`);
    b.log((r.includes(debeFallar) ? "✅" : "❌") + " Rota «" + nombre + "» suspende: " + (r || "nada"));
  }
  await b.foto("hc13-inicio");
  await b.eval("document.querySelector('[data-siguiente]').click()");
  await b.esperar(2500);
  b.log("Encargo 1 con la hoja del Mundo 2: " + await b.eval(enPagina(estado)));
  const pasos = JSON.parse(await b.eval("JSON.stringify(HUELLAS['mundo-3'].pasos)"));
  const html = await b.eval("HUELLAS['mundo-3'].html.replace(/\\n *<link rel=\"preconnect\"[^>]*>/g, '')");
  for (let i = 0; i < 4; i++) {
    await b.eval(enPagina(escribir, "html", i < 2 ? html.replace(' class="activo"', "") : html));
    await b.eval(enPagina(escribir, "css", pasos[i]));
    await b.esperar(6000);
    b.log("Encargo " + (i + 1) + " con la versión oficial: " + await b.eval(enPagina(estado)));
    if (i === 0) await b.foto("hc13-encargo1");
    if (i < 3) {
      await b.eval("document.querySelector('.modal-fondo')?.remove(); document.querySelector('[data-siguiente]').click()");
      await b.esperar(2500);
      b.log("  → encargo " + (i + 2) + " parte de lo anterior: " + await b.eval(enPagina(estado)));
    }
  }
  b.log("Victoria: " + await b.eval("!!document.querySelector('.modal-victoria')") + " · completada: " + await b.eval("PROGRESO.estaCompletada('hc-13')"));
  await b.foto("hc13-victoria");
}
