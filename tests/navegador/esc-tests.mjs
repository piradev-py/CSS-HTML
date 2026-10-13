const BASE = new URL("../../", import.meta.url).href;
export default async function (b) {
  await b.tam(1280, 900);
  await b.ir(BASE + "tests/verificar-lecciones.html");
  for (let i = 0; i < 360; i++) {
    const r = await b.eval("document.querySelector('[data-resumen]').textContent");
    if (!r.includes("Comprobando")) break;
    await b.esperar(500);
  }
  b.log(await b.eval("document.querySelector('[data-resumen]').textContent"));
  b.log(await b.eval("[...document.querySelectorAll('[data-filas] tr')].map(tr => [...tr.cells].map(c => c.innerText.replace(/\\s+/g,' ').trim()).join(' | ')).join('\\n')"));
}
