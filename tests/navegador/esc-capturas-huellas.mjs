// Capturas de las fichas de encargo del Proyecto web: cada versión oficial (HUELLAS[mundo].pasos) recortada a lo que
// añade ese encargo. Uso: MUNDO=1 node tests/navegador/cdp.mjs esc-capturas-huellas.mjs
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const BASE = new URL("../../", import.meta.url);
const raiz = fileURLToPath(BASE);
const mundo = process.env.MUNDO || "1";
// Lo que añade cada encargo: del primer elemento al último (selectores de la versión oficial)
const PARTES = {
  "1": [["header", "header"], ["main", "main"], ["#servicios", "#equipo"], ["#horario", "#cita"], ["#opiniones", "footer"]]
};

globalThis.window = {};
createRequire(import.meta.url)(raiz + "lecciones/huellas/versiones.js");
const pasos = window.HUELLAS["mundo-" + mundo].pasos;

export default async function (b) {
  await b.tam(1000, 800);
  mkdirSync(raiz + "recursos/huellas/capturas", { recursive: true });
  // Se escribe junto a la web de referencia para que las rutas img/… funcionen
  const temporal = raiz + "recursos/huellas/web/_captura.html";
  for (let i = 0; i < pasos.length; i++) {
    writeFileSync(temporal, pasos[i], "utf8");
    await b.ir(new URL("recursos/huellas/web/_captura.html", BASE).href);
    // loading="lazy" no carga lo que queda fuera de la ventana: en la captura se quiere todo
    await b.eval("Promise.all([...document.images].map(img => { img.loading = 'eager'; return img.decode().catch(() => {}); })).then(() => 1)");
    await b.esperar(800);
    const [desde, hasta] = PARTES[mundo][i];
    const caja = await b.eval(`(() => {
      const a = document.querySelector(${JSON.stringify(desde)}).getBoundingClientRect();
      const z = document.querySelector(${JSON.stringify(hasta)}).getBoundingClientRect();
      return JSON.stringify({ y: a.top + scrollY - 8, alto: z.bottom - a.top + 16 });
    })()`);
    const { y, alto } = JSON.parse(caja);
    const r = await b.cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: Math.max(0, y), width: 1000, height: Math.min(alto, 4200), scale: 0.6 } });
    const ruta = "recursos/huellas/capturas/m" + mundo + "-encargo-" + (i + 1) + ".png";
    writeFileSync(raiz + ruta, Buffer.from(r.result.data, "base64"));
    b.log("📸 " + ruta + " (" + Math.round(alto) + " px de alto)");
  }
  rmSync(temporal);
}
