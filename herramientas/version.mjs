/* ============================================================
   <CSS-HTML> · Cambiar la versión del curso
   Uso:  node herramientas/version.mjs 1.2.0
   - Cambia VERSION en js/curso.js (se ve en el pie del mapa y en ⚙️ Ajustes).
   - Cambia todos los ?v= de index.html, leccion.html y mi-clinica.html. Al ser una dirección
     nueva, el navegador descarga los CSS/JS de nuevo en vez de usar los viejos
     que tenía guardados (GitHub Pages deja guardarlos 10 minutos).
   - Las lecciones se piden con ?v= desde js/leccion.js, con la misma VERSION.
   Recuerda apuntar los cambios en CAMBIOS.md.
   ============================================================ */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const raiz = fileURLToPath(new URL("..", import.meta.url));
const leer = f => readFileSync(raiz + f, "utf8");
const escribir = (f, texto) => writeFileSync(raiz + f, texto, "utf8");

const nueva = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(nueva || "")) {
  console.error("Uso: node herramientas/version.mjs X.Y.Z   (por ejemplo 1.0.1)");
  process.exit(1);
}

const curso = leer("js/curso.js");
const patron = /const VERSION = "([^"]+)";/;
const actual = (curso.match(patron) || [])[1];
if (!actual) {
  console.error("No encuentro `const VERSION = \"…\";` en js/curso.js");
  process.exit(1);
}
if (actual === nueva) {
  console.error("El curso ya está en la versión " + nueva);
  process.exit(1);
}
escribir("js/curso.js", curso.replace(patron, 'const VERSION = "' + nueva + '";'));

for (const pagina of ["index.html", "leccion.html", "mi-clinica.html"]) {
  const texto = leer(pagina);
  const cuantos = (texto.match(/\?v=[\w.-]+/g) || []).length;
  escribir(pagina, texto.replace(/\?v=[\w.-]+/g, "?v=" + nueva));
  console.log(pagina + ": " + cuantos + " archivos con ?v=" + nueva);
}
console.log("js/curso.js: " + actual + " → " + nueva);

if (!leer("CAMBIOS.md").includes("## " + nueva)) {
  console.log("⚠️  Falta apuntar la versión " + nueva + " en CAMBIOS.md");
}
