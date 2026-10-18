/* ============================================================
   <CSS-HTML> · Imágenes de «Huellas» para la descarga en .zip
   Uso:  node herramientas/huellas-imagenes.mjs
   - Lee recursos/huellas/web/img/ (con iconos/) y escribe
     lecciones/huellas/imagenes.js con window.HUELLAS_IMAGENES =
     { "img/logo.svg": "<base64>", … }.
   - Es un script clásico (no fetch) para que «Mi clínica» pueda meter
     las imágenes en el .zip también abriendo el curso con doble clic
     (file://), donde el navegador no deja leer archivos.
   Si cambias una imagen de la web de referencia, vuelve a ejecutarlo.
   ============================================================ */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const raiz = fileURLToPath(new URL("..", import.meta.url));
const web = raiz + "recursos/huellas/web/";

function recorrer(carpeta) {
  return readdirSync(web + carpeta).flatMap(n => statSync(web + carpeta + n).isDirectory() ? recorrer(carpeta + n + "/") : [carpeta + n]);
}

const imagenes = {};
for (const ruta of recorrer("img/").sort()) imagenes[ruta] = readFileSync(web + ruta).toString("base64");
writeFileSync(raiz + "lecciones/huellas/imagenes.js",
  "/* Generado por herramientas/huellas-imagenes.mjs: no lo edites a mano. */\n" +
  "window.HUELLAS_IMAGENES = " + JSON.stringify(imagenes, null, 1) + ";\n", "utf8");
console.log("✅ lecciones/huellas/imagenes.js: " + Object.keys(imagenes).length + " imágenes");
