/* ============================================================
   <CSS-HTML> · «Huellas» en inglés
   Uso:  node herramientas/huellas-en.mjs              → escribe lecciones-en/huellas/versiones.js
         node herramientas/huellas-en.mjs --pendientes → lista lo que aún falta en la tabla
   - La web española (lecciones/huellas/versiones.js) es la única fuente:
     la inglesa sale de ella con la tabla de herramientas/huellas-en-tabla.mjs.
   - Primero TEXTOS (frase española → inglesa, tal cual, de la más larga a
     la más corta) y después NOMBRES (ids, clases, variables CSS y JS,
     claves…), como palabras sueltas en el HTML, el CSS y el JS a la vez.
   - Los nombres de archivo NO cambian (img/portada.jpg, datos/opiniones.json):
     una palabra pegada a «/» o seguida de .jpg, .html… no se toca.
   - Avisa de lo que queda con tildes, ñ, ¿ ¡ « » y de los nombres que no
     se han cambiado en ningún sitio (sobran en la tabla o están mal escritos).
   ============================================================ */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { TEXTOS, NOMBRES } from "./huellas-en-tabla.mjs";

const raiz = fileURLToPath(new URL("..", import.meta.url));
const caja = {};
caja.window = caja;
vm.runInNewContext(readFileSync(raiz + "lecciones/huellas/versiones.js", "utf8"), caja);
const ES = caja.HUELLAS;

const escapar = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Un espacio de la clave vale también por un salto de línea con sangría (los párrafos largos ocupan varias líneas),
// y una clave que empieza o acaba en letra no se cambia dentro de otra palabra («Fecha» no toca campoFecha)
const borde = (es, lado) => /[\p{L}\p{N}_]/u.test(lado === "ini" ? es[0] : es[es.length - 1]) ? (lado === "ini" ? "(?<![\\p{L}\\p{N}_])" : "(?![\\p{L}\\p{N}_])") : "";
const textos = Object.entries(TEXTOS).filter(([, en]) => en).sort((a, b) => b[0].length - a[0].length)
  .map(([es, en]) => [new RegExp(borde(es, "ini") + escapar(es).replace(/ +/g, "\\s+") + borde(es, "fin"), "gu"), en, es]);
const nombres = Object.entries(NOMBRES).filter(([, en]) => en).sort((a, b) => b[0].length - a[0].length)
  .map(([es, en]) => [new RegExp("(?<![\\w\\-/])" + escapar(es) + "(?![\\w\\-/]|\\.(?:jpe?g|png|svg|html|css|js|json)\\b)", "g"), en, es]);
const usados = new Set();
// Dos nombres españoles con el mismo inglés fundirían dos ids/clases/variables distintos sin dar error
const destinos = {};
for (const [es, en] of Object.entries(NOMBRES)) if (en) (destinos[en] = destinos[en] || []).push(es);
const choques = Object.entries(destinos).filter(([, v]) => v.length > 1);
if (choques.length) {
  console.log("❌ Nombres distintos con el mismo inglés:\n   " + choques.map(([en, v]) => v.join(" y ") + " → " + en).join("\n   "));
  process.exit(1);
}

function traducir(s) {
  for (const [re, en, es] of textos) s = s.replace(re, () => { usados.add("t:" + es); return en; });
  for (const [re, en, es] of nombres) s = s.replace(re, () => { usados.add("n:" + es); return en; });
  return s;
}
// En los datos (opiniones.json…) también cambian las claves de cada objeto (autor → author), igual que en el JS que los lee;
// las claves de HUELLAS (mundo-1, html, css, datos…) y los nombres de archivo no
const traducirNombre = k => nombres.reduce((s, [re, en, es]) => s.replace(re, () => { usados.add("n:" + es); return en; }), k);
const recorrer = (v, enDatos) => typeof v === "string" ? traducir(v)
  : Array.isArray(v) ? v.map(x => recorrer(x, enDatos))
  : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) =>
      [enDatos && !/\.\w+$/.test(k) ? traducirNombre(k) : k, recorrer(x, enDatos || k === "datos")]))
  : v;

/* ---------- --pendientes: lo que la tabla aún no cubre ---------- */
if (process.argv.includes("--pendientes")) {
  const fuentes = Object.values(ES).flatMap(m => [m.html, m.css, m.js, m.privacidad, ...Object.values(m.datos || {}).map(d => JSON.stringify(d))]).filter(Boolean);
  const todo = fuentes.join("\n");
  const textosNuevos = new Set(), nombresNuevos = new Set();
  const conLetras = t => /[a-záéíóúñ]{2}/i.test(t);
  for (const f of fuentes) {
    for (const m of f.matchAll(/>([^<>]+)</g)) { const t = m[1].trim(); if (conLetras(t) && !/^[\s{};:#.\w-]+$/.test(t) && !/^\$\{[^}]*\}$/.test(t)) textosNuevos.add(t.replace(/\s+/g, " ")); }
    for (const m of f.matchAll(/\b(?:alt|title|content|placeholder|aria-label)="([^"]+)"/g)) if (conLetras(m[1]) && !/^\$\{[^}]*\}$/.test(m[1])) textosNuevos.add(m[1]);
    for (const m of f.matchAll(/\/\*\s*([\s\S]*?)\s*\*\//g)) if (conLetras(m[1])) textosNuevos.add(m[1]);
    for (const m of f.matchAll(/\/\/ ?(.+)$/gm)) if (conLetras(m[1]) && !/https?:$/.test(f.slice(0, m.index))) textosNuevos.add(m[1].trim());
    for (const m of f.matchAll(/"([^"\n]*[a-záéíóúñ][^"\n]*)"/gi)) if (/\s|[áéíóúñ¿¡]/i.test(m[1]) && !/[<>=]/.test(m[1])) textosNuevos.add(m[1]);
    for (const m of f.matchAll(/\b(?:class)="([^"]+)"/g)) m[1].split(/\s+/).forEach(c => nombresNuevos.add(c));
    for (const m of f.matchAll(/\b(?:id|for|name|value|data-[a-z-]+)="([^"]+)"/g)) if (/^[\w-]+$/.test(m[1])) nombresNuevos.add(m[1]);
    for (const m of f.matchAll(/--[a-z][\w-]*/g)) nombresNuevos.add(m[0]);
    for (const m of f.matchAll(/\b(?:const|let|var|function)\s+([A-Za-z_]\w*)/g)) nombresNuevos.add(m[1]);
    for (const m of f.matchAll(/(?<![\w\-.$])([a-z]\w*)\s*:(?!\/)/g)) if (!/^(https?|mailto|tel|hover|focus|root|before|after|active|not|nth|first|last|user)/.test(m[1])) nombresNuevos.add(m[1]);
    for (const m of f.matchAll(/(?:getItem|setItem|removeItem)\("([^"]+)"/g)) nombresNuevos.add(m[1]);
  }
  const faltan = (lista, tabla) => [...lista].filter(t => !(t in tabla) && todo.includes(t)).sort();
  const t = faltan(textosNuevos, TEXTOS), n = faltan(nombresNuevos, NOMBRES);
  console.log("// TEXTOS que faltan (" + t.length + ")\n" + t.map(x => "  " + JSON.stringify(x) + ": \"\",").join("\n"));
  console.log("\n// NOMBRES que faltan (" + n.length + "; deja \"\" los que ya son inglés o son de CSS/JS, como header, nav, h1)\n" +
    n.map(x => "  " + JSON.stringify(x) + ": \"\",").join("\n"));
  process.exit(0);
}

/* ---------- Generar lecciones-en/huellas/versiones.js ---------- */
const EN = recorrer(ES);
mkdirSync(raiz + "lecciones-en/huellas", { recursive: true });
writeFileSync(raiz + "lecciones-en/huellas/versiones.js",
  "/* Generado por herramientas/huellas-en.mjs a partir de lecciones/huellas/versiones.js: no lo edites a mano. */\n" +
  "window.HUELLAS = " + JSON.stringify(EN, null, 1) + ";\n");

const restos = [];
for (const [mundo, v] of Object.entries(EN)) {
  for (const [clave, texto] of Object.entries({ html: v.html, css: v.css, js: v.js, privacidad: v.privacidad })) {
    (texto || "").split("\n").forEach((linea, i) => { if (/[áéíóúñÁÉÍÓÚÑ¿¡«»]/.test(linea)) restos.push(mundo + "." + clave + ":" + (i + 1) + "  " + linea.trim().slice(0, 100)); });
  }
}
const sinUsar = [...Object.keys(TEXTOS).filter(k => TEXTOS[k] && !usados.has("t:" + k)).map(k => "texto  " + k),
  ...Object.keys(NOMBRES).filter(k => NOMBRES[k] && !usados.has("n:" + k)).map(k => "nombre " + k)];
console.log("✅ lecciones-en/huellas/versiones.js (" + textos.length + " textos, " + nombres.length + " nombres)");
if (restos.length) console.log("⚠️ " + restos.length + " línea(s) con restos de español:\n   " + [...new Set(restos)].slice(0, 40).join("\n   "));
if (sinUsar.length) console.log("⚠️ En la tabla pero sin usar (¿mal copiado?):\n   " + sinUsar.join("\n   "));
