/* ============================================================
   <CSS-HTML> · ¿Tiene cada T("…") su inglés?
   Uso:  node herramientas/traducciones.mjs
   - Lee el diccionario EN de js/textos.js como JavaScript de verdad
     (un error de sintaxis ahí deja la web entera sin cargar).
   - Busca los T("…") y T('…') de js/*.js y avisa de los que no
     están en EN (saldrían en español), de los {marcadores} que no
     coinciden y de los que empiezan por una etiqueta: en T() va el
     texto, no la estructura (<label>, <textarea name=…>…).
   ============================================================ */
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const raiz = fileURLToPath(new URL("..", import.meta.url));
const textos = readFileSync(raiz + "js/textos.js", "utf8");
const bloque = textos.match(/const EN = (\{[\s\S]*?\n {2}\});/);
if (!bloque) { console.log("❌ No encuentro `const EN = { … };` en js/textos.js"); process.exit(1); }
let EN;
try { EN = new Function("return " + bloque[1])(); }
catch (e) { console.log("❌ js/textos.js tiene un error de sintaxis en EN: " + e.message + "\n   (¿un apóstrofo dentro de comillas simples? Usa comillas dobles)"); process.exit(1); }

const marcas = t => (t.match(/\{\w+\}/g) || []).sort().join(" ");
const literal = /\bT\(\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g;

let fallos = 0;
const fallo = texto => { fallos++; console.log("❌ " + texto); };
for (const archivo of readdirSync(raiz + "js").filter(f => f.endsWith(".js") && f !== "textos.js")) {
  const src = readFileSync(raiz + "js/" + archivo, "utf8");
  for (const m of src.matchAll(literal)) {
    const es = new Function("return " + m[1])();
    if (es.trimStart().startsWith("<")) fallo(archivo + ": T() empieza por una etiqueta; envuelve solo el texto → " + es);
    else if (!(es in EN)) fallo(archivo + ": sin inglés → " + es);
    else if (marcas(es) !== marcas(EN[es])) fallo(archivo + ": marcadores distintos → " + es);
  }
}
console.log(fallos ? fallos + " problema(s)" : "✅ Todos los T() tienen su inglés (" + Object.keys(EN).length + " entradas)");
process.exit(fallos ? 1 : 0);
