// La web de «Huellas» en inglés (lecciones-en/huellas/versiones.js, de herramientas/huellas-en.mjs) funciona igual que
// la española: cada mundo abierto desde el disco, sin errores de JS ni textos en español a la vista, y en el Mundo 4
// los mismos servicios, filtros, menú y opiniones. Los selectores ingleses salen de la misma tabla de traducción.
// Uso: node tests/navegador/cdp.mjs esc-huellas-en.mjs
import { writeFileSync, mkdirSync, rmSync, cpSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { NOMBRES } from "../../herramientas/huellas-en-tabla.mjs";

const raiz = fileURLToPath(new URL("../../", import.meta.url));
const versiones = ruta => { globalThis.window = {}; createRequire(import.meta.url)(raiz + ruta); return window.HUELLAS; };
const ES = versiones("lecciones/huellas/versiones.js");
const EN = versiones("lecciones-en/huellas/versiones.js");
const n = k => NOMBRES[k] || k;

function montar(v, carpeta) {
  rmSync(carpeta, { recursive: true, force: true });
  mkdirSync(join(carpeta, "datos"), { recursive: true });
  writeFileSync(join(carpeta, "index.html"), v.html);
  if (v.css) writeFileSync(join(carpeta, "estilos.css"), v.css);
  if (v.js) writeFileSync(join(carpeta, "script.js"), v.js);
  if (v.privacidad) writeFileSync(join(carpeta, "privacidad.html"), v.privacidad);
  for (const [nombre, datos] of Object.entries(v.datos || {})) writeFileSync(join(carpeta, "datos", nombre), JSON.stringify(datos, null, 2));
  cpSync(join(raiz, "recursos/huellas/web/img"), join(carpeta, "img"), { recursive: true });
}

// Lo que se ve y se puede tocar en el Mundo 4, con los selectores de cada idioma
const medir = s => `(() => {
  const d = document, q = x => d.querySelector(x);
  const servicios = d.querySelectorAll("#${s.lista} .${s.servicio}").length;
  q("#${s.exoticos}").click();
  const exoticos = d.querySelectorAll("#${s.lista} .${s.servicio}").length;
  q(".${s.botonMenu}").click();
  const menu = q("nav").classList.contains("${s.abierto}");
  const opiniones = d.querySelectorAll("#${s.listaOpiniones} .${s.opinion}").length;
  return [servicios, exoticos, menu, opiniones].join(" · ");
})()`;
const sel = f => ({ lista: f("lista-servicios"), servicio: f("servicio"), exoticos: f("filtro-exoticos"), botonMenu: f("boton-menu"),
  abierto: f("abierto"), listaOpiniones: f("lista-opiniones"), opinion: f("opinion") });

export default async function (b) {
  await b.tam(1200, 900);
  const carpeta = join(tmpdir(), "csshtml-huellas-en");
  const malos = [];
  for (const mundo of ["mundo-1", "mundo-2", "mundo-3", "mundo-4"]) {
    montar(EN[mundo], carpeta);
    const antes = b.errores.length;
    await b.ir(pathToFileURL(join(carpeta, "index.html")).href);
    await b.esperar(1000);
    // Texto visible en español: tildes, ñ, ¿ ¡ « » (salvo nombres propios como Lucía)
    const restos = await b.eval(`[...document.body.innerText.matchAll(/[^\\n]*[áéíóúñ¿¡«»][^\\n]*/gi)].map(m => m[0].trim()).filter(t => !/^(Lucía|.*Lucía)/.test(t)).slice(0, 5)`);
    const errores = b.errores.slice(antes);
    b.log(mundo + ": errores de JS " + errores.length + " · español a la vista " + restos.length + (restos.length ? " → " + restos.join(" | ") : ""));
    if (errores.length || restos.length) malos.push(mundo);
    if (mundo === "mundo-4") {
      const en = await b.eval(medir(sel(n)));
      montar(ES[mundo], carpeta);
      await b.ir(pathToFileURL(join(carpeta, "index.html")).href);
      await b.esperar(1000);
      const es = await b.eval(medir(sel(k => k)));
      b.log("Mundo 4 · servicios · exóticos · menú abierto · opiniones → inglés " + en + " / español " + es);
      if (en !== es) malos.push("mundo-4 (comportamiento)");
      montar(EN[mundo], carpeta);
      await b.ir(pathToFileURL(join(carpeta, "index.html")).href);
      await b.esperar(1000);
      await b.foto("huellas-en", true);
    }
  }
  rmSync(carpeta, { recursive: true, force: true });
  b.log(malos.length ? "❌ Revisa: " + malos.join(", ") : "✅ La web inglesa funciona igual que la española");
}
