/* ============================================================
   <CSS-HTML> · ¿Cuadra cada lección inglesa con su original?
   Uso:  node herramientas/lecciones-en.mjs [html-02 …]
   Para cada archivo de lecciones-en/ compara con su original de
   lecciones/ lo que la traducción NO debe cambiar (id, xp, pasos y
   su tipo, correcta de los quiz, cuántas opciones, pistas y
   comprobaciones, glosario) y mira que:
   - en js/curso.js la lección tenga `en:` igual a su titulo inglés;
   - cada `tema` del glosario use la tabla fija de AGENTS.md;
   - los términos que citan los pasos de proyecto existan en algún glosario inglés;
   ⚠️ avisa (sin fallar) de textos con restos de español (ñ, tildes,
   ¿ ¡ « »), también dentro de las comprobaciones.
   ============================================================ */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const raiz = fileURLToPath(new URL("..", import.meta.url));
const leer = f => readFileSync(raiz + f, "utf8");

// Tabla fija de temas: la de AGENTS.md, para que solo haya una
const tabla = leer("AGENTS.md").match(/usa SIEMPRE esta traducción, exacta:\n([\s\S]*?)\n- /)[1];
const TEMAS = new Map(tabla.split(/·|\n/).map(t => t.trim()).filter(Boolean).map(t => t.split(" → ")));

// Índice del curso, con `en`
const caja = { window: {}, IDIOMA: { actual: "es" }, T: t => t, document: { currentScript: null } };
caja.window = caja;
vm.runInNewContext(leer("js/curso.js"), caja);
const indice = caja.CURSO.listaPlana();

// Las lecciones de proyecto usan HUELLAS al cargarse
const base = { window: {}, console };
base.window = base;
vm.runInNewContext(leer("lecciones/huellas/versiones.js"), base);
function cargar(ruta) {
  let leccion = null;
  const ctx = Object.assign({}, base, { CURSO: { registrar: l => { leccion = l; } } });
  ctx.window = ctx;
  vm.runInNewContext(leer(ruta), ctx);
  return leccion;
}

const RESTOS = /[ñáéíóú¿¡«»]/i;
function restos(valor, ruta, salida) {
  if (typeof valor === "string") { if (RESTOS.test(valor)) salida.push(ruta + ": " + valor.replace(/\s+/g, " ").slice(0, 90)); }
  else if (typeof valor === "function") { const s = valor.toString(); if (RESTOS.test(s)) salida.push(ruta + " (código): " + (s.match(/.{0,40}[ñáéíóú¿¡«»].{0,40}/i) || [""])[0]); }
  else if (valor && typeof valor === "object") for (const [k, v] of Object.entries(valor)) restos(v, ruta + "." + k, salida);
}

const archivos = (existsSync(raiz + "lecciones-en") ? readdirSync(raiz + "lecciones-en") : [])
  .flatMap(mundo => readdirSync(raiz + "lecciones-en/" + mundo).filter(f => f.endsWith(".js")).map(archivo => ({ mundo, archivo })));
// Los pasos de proyecto citan términos del glosario por su nombre exacto: tienen que existir en el glosario inglés
const terminosEN = new Set();
for (const { mundo, archivo } of archivos) {
  try { (cargar("lecciones-en/" + mundo + "/" + archivo).glosario || []).forEach(g => terminosEN.add(g.termino)); } catch (e) { /* se avisa abajo */ }
}

const pedidas = process.argv.slice(2);
let fallos = 0, avisos = 0, revisadas = 0;
for (const { mundo, archivo } of archivos) {
  {
    const id = archivo.match(/^[a-z]+-\d+/)[0];
    if (pedidas.length && !pedidas.includes(id)) continue;
    revisadas++;
    const mal = [], dudas = [];
    let es, en;
    try { es = cargar("lecciones/" + mundo + "/" + archivo); en = cargar("lecciones-en/" + mundo + "/" + archivo); }
    catch (e) { mal.push("no se puede cargar: " + e.message); }
    if (es && en) {
      const igual = (que, a, b) => { if (JSON.stringify(a) !== JSON.stringify(b)) mal.push(que + ": " + JSON.stringify(a) + " ≠ " + JSON.stringify(b)); };
      igual("id", es.id, en.id);
      igual("xp", es.xp, en.xp);
      igual("tipos de paso", es.pasos.map(p => p.tipo), en.pasos.map(p => p.tipo));
      es.pasos.forEach((p, i) => {
        const q = en.pasos[i] || {};
        const n = k => (Array.isArray(p[k]) ? p[k].length : undefined);
        const m = k => (Array.isArray(q[k]) ? q[k].length : undefined);
        igual("paso " + (i + 1) + " correcta", p.correcta, q.correcta);
        for (const k of ["opciones", "pistas", "comprobaciones"]) igual("paso " + (i + 1) + " nº de " + k, n(k), m(k));
      });
      igual("nº de términos del glosario", (es.glosario || []).length, (en.glosario || []).length);
      (es.glosario || []).forEach((g, i) => {
        const t = (en.glosario || [])[i];
        if (t && TEMAS.get(g.tema) !== t.tema) mal.push("glosario «" + g.termino + "»: tema «" + t.tema + "», debería ser «" + TEMAS.get(g.tema) + "»");
      });
      en.pasos.forEach((p, i) => (p.glosario || []).forEach(t => {
        if (!terminosEN.has(t)) mal.push("paso " + (i + 1) + ": cita el término «" + t + "», que no está en ningún glosario inglés");
      }));
      const entrada = indice.find(l => l.id === id);
      if (!entrada || !entrada.en) mal.push("js/curso.js: falta en: \"…\" en la entrada de " + id);
      else igual("titulo vs en: de curso.js", entrada.en, en.titulo);
      restos(en, id, dudas);
    }
    fallos += mal.length; avisos += dudas.length;
    console.log((mal.length ? "❌ " : "✅ ") + id + (dudas.length ? " · ⚠️ " + dudas.length + " posibles restos de español" : ""));
    mal.forEach(x => console.log("   ❌ " + x));
    dudas.forEach(x => console.log("   ⚠️ " + x));
  }
}
console.log(revisadas + " lección(es) · " + (fallos ? fallos + " problema(s)" : "estructura correcta") + (avisos ? " · " + avisos + " aviso(s) para mirar a mano" : ""));
process.exit(fallos ? 1 : 0);
