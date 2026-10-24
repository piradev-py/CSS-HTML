// La nota manuscrita de la portada de «Huellas» (img/nota.png, 607 × 150, fondo transparente) en otro idioma.
// Es un escenario del controlador de Edge:
//   node tests/navegador/cdp.mjs ../../herramientas/huellas-nota.mjs           → recursos/huellas/web/img/nota-en.png
//   COMPARAR=1 node tests/navegador/cdp.mjs ../../herramientas/huellas-nota.mjs → prueba de fuentes junto a la original
import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const raiz = fileURLToPath(new URL("..", import.meta.url));
const TEXTO = "Health · Life · Love ♡";
const FUENTES = ["Caveat", "Kalam", "Shadows Into Light", "Gochi Hand", "Nanum Pen Script"];
const ELEGIDA = "Caveat";
const nota = (fuente, texto) =>
  '<div style="width:607px;height:150px;display:flex;align-items:center;justify-content:center">' +
  '<span style="font-family:\'' + fuente + '\';font-size:66px;color:#12332f;transform:rotate(-6deg);white-space:nowrap">' + texto + "</span></div>";

export default async function (b) {
  const familias = FUENTES.map(f => "family=" + f.replace(/ /g, "+")).join("&");
  const cabeza = '<link href="https://fonts.googleapis.com/css2?' + familias + '&display=block" rel="stylesheet">' +
    "<style>html,body{margin:0;background:transparent}</style>";
  if (process.env.COMPARAR) {
    const original = "data:image/png;base64," + readFileSync(raiz + "recursos/huellas/web/img/nota.png").toString("base64");
    await b.tam(1240, 170 * FUENTES.length + 170);
    await b.ir("data:text/html;charset=utf-8," + encodeURIComponent("<!DOCTYPE html><html><head>" + cabeza + '</head><body style="background:#fff">' +
      '<div style="display:flex"><img src="' + original + '"><b style="align-self:center;font:16px sans-serif">← original</b></div>' +
      FUENTES.map(f => '<div style="display:flex">' + nota(f, "Salud · Vida · Compañía ♡") + nota(f, TEXTO) +
        '<b style="align-self:center;font:16px sans-serif">' + f + "</b></div>").join("") + "</body></html>"));
    await b.esperar(3000);
    return b.foto("nota-fuentes");
  }
  await b.tam(607, 150);
  await b.cdp("Emulation.setDefaultBackgroundColorOverride", { color: { r: 0, g: 0, b: 0, a: 0 } });
  await b.ir("data:text/html;charset=utf-8," + encodeURIComponent("<!DOCTYPE html><html><head>" + cabeza + "</head><body>" + nota(ELEGIDA, TEXTO) + "</body></html>"));
  await b.esperar(3000);
  const r = await b.cdp("Page.captureScreenshot", { format: "png" });
  writeFileSync(raiz + "recursos/huellas/web/img/nota-en.png", Buffer.from(r.result.data, "base64"));
  b.log("✅ recursos/huellas/web/img/nota-en.png");
}
