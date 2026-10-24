/* ============================================================
   <CSS-HTML> · ¿Tiene cada T("…") su inglés?
   Uso:  node herramientas/traducciones.mjs
   Busca los T("texto") de js/*.js y avisa de los que no están en
   el diccionario EN de js/textos.js (saldrían en español) y de los
   marcadores {n} que no coinciden entre los dos idiomas.
   ============================================================ */
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const raiz = fileURLToPath(new URL("..", import.meta.url));
const textos = readFileSync(raiz + "js/textos.js", "utf8");
const EN = new Map([...textos.matchAll(/^\s*("(?:[^"\\]|\\.)*"):\s*("(?:[^"\\]|\\.)*"),?$/gm)]
  .map(m => [JSON.parse(m[1]), JSON.parse(m[2])]));
const marcas = t => (t.match(/\{\w+\}/g) || []).sort().join(" ");

let fallos = 0;
for (const archivo of readdirSync(raiz + "js").filter(f => f.endsWith(".js") && f !== "textos.js")) {
  const src = readFileSync(raiz + "js/" + archivo, "utf8");
  for (const m of src.matchAll(/\bT\(\s*("(?:[^"\\]|\\.)*")/g)) {
    const es = JSON.parse(m[1]);
    if (!EN.has(es)) { fallos++; console.log("❌ " + archivo + ": sin inglés → " + es); }
    else if (marcas(es) !== marcas(EN.get(es))) { fallos++; console.log("❌ " + archivo + ": marcadores distintos → " + es); }
  }
}
console.log(fallos ? fallos + " problema(s)" : "✅ Todos los T() tienen su inglés (" + EN.size + " entradas)");
process.exit(fallos ? 1 : 0);
