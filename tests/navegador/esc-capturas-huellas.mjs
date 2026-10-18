// Capturas de las fichas de encargo del Proyecto web: cada versión oficial (HUELLAS[mundo].pasos) recortada a lo que
// añade ese encargo. Uso: MUNDO=1 (o 2, o 3) node tests/navegador/cdp.mjs esc-capturas-huellas.mjs
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const BASE = new URL("../../", import.meta.url);
const raiz = fileURLToPath(BASE);
const mundo = process.env.MUNDO || "1";
// Lo que añade cada encargo: del primer elemento al último (selectores de la versión oficial) y, si hace falta, el
// ancho de la pantalla (el Mundo 3 enseña cada encargo a su ancho: móvil, tableta, ordenador)
const PARTES = {
  "1": [["header", "header"], ["main", "main"], ["#servicios", "#equipo"], ["#horario", "#cita"], ["#opiniones", "footer"]],
  "2": [["header", "#inicio"], ["header", ".ventajas"], ["#horario", "footer"], ["header", "#equipo"]],
  "3": [["header", "#inicio", 375], ["header", ".ventajas", 768], ["header", ".ventajas", 1200], ["header", ".ventajas", 1200]]
};
// Ancho de la captura: el Mundo 2 se diseña para escritorio (1200 px)
const ANCHO = { "1": 1000, "2": 1200, "3": 1200 };

globalThis.window = {};
createRequire(import.meta.url)(raiz + "lecciones/huellas/versiones.js");
const version = window.HUELLAS["mundo-" + mundo];
const pasos = version.pasos;

export default async function (b) {
  mkdirSync(raiz + "recursos/huellas/capturas", { recursive: true });
  // Se escribe junto a la web de referencia para que las rutas img/… funcionen
  const temporal = raiz + "recursos/huellas/web/_captura.html";
  const hoja = raiz + "recursos/huellas/web/_captura.css";
  for (let i = 0; i < pasos.length; i++) {
    const [desde, hasta, anchoPaso] = PARTES[mundo][i];
    const ancho = anchoPaso || ANCHO[mundo];
    await b.tam(ancho, 800);
    // Mundo 1: cada paso es el HTML; mundos 2 y 3: cada paso es la hoja, sobre el HTML oficial
    if (mundo === "1") writeFileSync(temporal, pasos[i], "utf8");
    else {
      writeFileSync(temporal, version.html.replace('href="estilos.css"', 'href="_captura.css"'), "utf8");
      writeFileSync(hoja, pasos[i], "utf8");
    }
    await b.ir(new URL("recursos/huellas/web/_captura.html", BASE).href);
    // loading="lazy" no carga lo que queda fuera de la ventana: en la captura se quiere todo
    await b.eval("Promise.all([...document.images].map(img => { img.loading = 'eager'; return img.decode().catch(() => {}); })).then(() => 1)");
    await b.esperar(1200);
    const caja = await b.eval(`(() => {
      const a = document.querySelector(${JSON.stringify(desde)}).getBoundingClientRect();
      const z = document.querySelector(${JSON.stringify(hasta)}).getBoundingClientRect();
      return JSON.stringify({ y: a.top + scrollY - 8, alto: z.bottom - a.top + 16 });
    })()`);
    const { y, alto } = JSON.parse(caja);
    // Las pantallas estrechas, a tamaño real; las anchas, reducidas
    const r = await b.cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: Math.max(0, y), width: ancho, height: Math.min(alto, 4200), scale: ancho < 800 ? 1 : 0.6 } });
    const ruta = "recursos/huellas/capturas/m" + mundo + "-encargo-" + (i + 1) + ".png";
    writeFileSync(raiz + ruta, Buffer.from(r.result.data, "base64"));
    b.log("📸 " + ruta + " (" + ancho + " × " + Math.round(alto) + " px)");
  }
  rmSync(temporal);
  rmSync(hoja, { force: true });
}
