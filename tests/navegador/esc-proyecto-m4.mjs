// Proyecto web del Mundo 4 (js-17) recorrido como un alumno: cada encargo con su versión oficial, hasta la victoria.
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

// [paso, nombre, cambio del script oficial de ese paso, comprobación que debe suspender (inicio del texto)]
const ROTAS = [
  [1, "sin aria-expanded", "s => s.replace('botonMenu.setAttribute(\"aria-expanded\", \"true\");', '')", "Al pulsar «☰ Menú»"],
  [4, "sin vaciar antes de pintar", "s => s.replace('listaServicios.textContent = \"\";', '')", "Al pulsar «Todos» después"],
  [5, "acepta fechas pasadas", "s => s.replace('campoFecha.value >= hoy()', 'true')", "Con el reloj en el 20/10/2026"],
  [6, "no guarda las citas", "s => s.replace('localStorage.setItem(\"huellas-citas\", JSON.stringify(citas));', '')", "Tras recargar la página"],
  [4, "filtros sin aria-pressed", "s => s.replace('boton.setAttribute(\"aria-pressed\", \"true\");', '')", "El botón pulsado tiene `aria-pressed"]
];

export default async function (b) {
  await b.tam(1366, 768);
  await b.ir(BASE + "index.html");
  await b.eval(`localStorage.setItem('csshtml-progreso-v1', JSON.stringify({ xp: 0, completadas: { "js-13": { estrellas: 3, fecha: "2026-10-18" } }, insignias: [], racha: { dias: 0, ultimo: null }, ajustes: { sonido: false, tema: 'light', desbloquearTodo: false }, borradores: {} }))`);
  await b.ir(BASE + "leccion.html?id=js-17");
  await b.esperar(2500);
  for (const [n, nombre, cambio, debeFallar] of ROTAS) {
    const r = await b.eval(`(async () => {
      const p = CURSO.lecciones["js-17"].pasos[${n}];
      const js = (${cambio})(p.solucion.js);
      if (js === p.solucion.js) return "¡el cambio no encontró nada!";
      const r = await RETOS.evaluar(EDITOR.conBase(Object.assign({}, p.solucion, { js }), p.cssBase, p.proyecto), p.comprobaciones, PRUEBA.crearMarco());
      return p.comprobaciones.filter((c, i) => !r[i]).map(c => c.texto).join(" | ");
    })()`);
    b.log((r.includes(debeFallar) ? "✅" : "❌") + " Rota «" + nombre + "» suspende: " + (r || "nada"));
  }
  await b.foto("js17-inicio");
  await b.eval("document.querySelector('[data-siguiente]').click()");
  await b.esperar(2500);
  b.log("Encargo 1 sin script: " + await b.eval(enPagina(estado)));
  const pasos = JSON.parse(await b.eval("JSON.stringify(HUELLAS['mundo-4'].pasos)"));
  const html = await b.eval("HUELLAS['mundo-4'].html.replace(/\\n *<link rel=\"preconnect\"[^>]*>/g, '')");
  await b.eval(enPagina(escribir, "html", html));
  for (let i = 0; i < 6; i++) {
    await b.eval(enPagina(escribir, "js", pasos[i]));
    await b.esperar(9000);
    b.log("Encargo " + (i + 1) + " con la versión oficial: " + await b.eval(enPagina(estado)));
    if (i === 4) await b.foto("js17-encargo5");
    if (i < 5) {
      await b.eval("document.querySelector('.modal-fondo')?.remove(); document.querySelector('[data-siguiente]').click()");
      await b.esperar(2500);
      b.log("  → encargo " + (i + 2) + " parte de lo anterior: " + await b.eval(enPagina(estado)));
    }
  }
  b.log("Victoria: " + await b.eval("!!document.querySelector('.modal-victoria')") + " · lleva a: " + await b.eval("document.querySelector('[data-siguiente-leccion]')?.getAttribute('href')") + " · completada: " + await b.eval("PROGRESO.estaCompletada('js-17')"));
  await b.foto("js17-victoria");
}
