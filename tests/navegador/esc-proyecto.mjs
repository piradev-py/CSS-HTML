// Motor de los pasos de proyecto: las versiones oficiales de «Huellas» aprueban y las variantes rotas suspenden
const BASE = new URL("../../", import.meta.url).href;
export default async function (b) {
  await b.tam(1280, 900);
  await b.ir(BASE + "tests/proyecto.html");
  for (let i = 0; i < 120; i++) {
    if (!(await b.eval("document.querySelector('[data-resumen]').textContent")).includes("Comprobando")) break;
    await b.esperar(500);
  }
  b.log(await b.eval("document.querySelector('[data-resumen]').textContent"));
  b.log(await b.eval("[...document.querySelectorAll('[data-filas] tr')].map(tr => [...tr.cells].map(c => c.innerText.trim()).join(' | ')).join(' ## ')"));
}
