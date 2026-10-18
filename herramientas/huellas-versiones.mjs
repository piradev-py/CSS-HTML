/* ============================================================
   <CSS-HTML> · Versiones oficiales de «Huellas»
   Uso:  node herramientas/huellas-versiones.mjs
   - Saca del historial de git la web de referencia (recursos/huellas/web/)
     tal y como quedó al final de cada mundo (un commit por mundo, abajo).
   - Escribe lecciones/huellas/versiones.js con window.HUELLAS:
       HUELLAS["mundo-1"] = { html, css, js, privacidad, datos: { "opiniones.json": … } }
     Cada lección de proyecto parte de la versión del mundo anterior.
   - Es un script clásico (no JSON) para que funcione también abriendo el
     curso con doble clic (file://), donde fetch no puede leer archivos.
   Si cambias la web de referencia, haz commit y apunta aquí el commit nuevo.
   ============================================================ */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const raiz = fileURLToPath(new URL("..", import.meta.url));
const CARPETA = "recursos/huellas/web/";
const COMMITS = {
  "mundo-1": "8866e01",
  "mundo-2": "a9d2bc4",
  "mundo-3": "348d16d",
  "mundo-4": "174f321"
};

// Encargos del Proyecto web de cada mundo: el archivo que escribe el alumno se corta justo antes de cada marca, y cada
// trozo es la solución de un encargo (el último encargo es el archivo completo). HUELLAS[mundo].pasos = [html1, html2, …]
// en el Mundo 1, [css1, css2, …] en los mundos 2 y 3 y [js1, js2, …] en el 4 (allí el HTML es el oficial).
// En los mundos 3 y 4 cada encargo es el archivo completo sin las secciones («---------- N.») que aún no tocan;
// `retocar[i]`, si existe, cambia además el encargo i
const CORTES = {
  "mundo-1": { archivo: "html", marcas: ["<main>", '<section id="servicios"', '<section id="horario"', '<section id="opiniones"'] },
  "mundo-2": { archivo: "css", marcas: ["/* ---------- 2.", "#horario {", "/* ---------- 3."] },
  "mundo-3": { archivo: "css", quitar: [[4, 6, 7], [6, 7], [7]] },
  "mundo-4": {
    archivo: "js",
    quitar: [[2, 3, 4, 5, 6, 7, 8], [4, 5, 6, 7, 8], [5, 6, 7, 8], [6, 7, 8], [7, 8]],
    // La cita validada todavía no se guarda: eso llega con «Mis citas»
    retocar: { 4: js => sinTexto(js, "  citas.push(cita);\n  guardarCitas();\n  pintarCitas();\n") }
  }
};

function sinTexto(texto, trozo) {
  if (!texto.includes(trozo)) throw new Error("No encuentro «" + trozo.trim() + "» en la versión oficial");
  return texto.replace(trozo, "");
}

// En el Mundo 1 el alumno hace solo 3 servicios y 2 personas del equipo; el resto lo «añade el equipo de diseño»
// en la versión oficial con la que empieza el Mundo 2. En los mundos 2 y 3, el estilo de privacidad.html va hecho
const sinPrivacidad = css => css.replace(/\/\* Página de privacidad[\s\S]*?\.texto-legal h2 \{[^}]*\}\n\n/, "");
const RECORTES = {
  "mundo-1": html => quedarse(quedarse(html, /\n *<article class="servicio">[\s\S]*?<\/article>/g, 3), /\n *<figure>[\s\S]*?<\/figure>/g, 2),
  "mundo-2": sinPrivacidad,
  "mundo-3": sinPrivacidad
};

// El archivo sin las secciones numeradas de la lista (cada una va de su comentario «---------- N.» al siguiente;
// en CSS el comentario empieza por /*, en JS por //)
function sinSecciones(css, numeros) {
  return numeros.reduce((hoja, n) => {
    const r = new RegExp("(/\\*|//) ---------- " + n + "\\.[\\s\\S]*?(?=(/\\*|//) ---------- |$)");
    if (!r.test(hoja)) throw new Error("No encuentro la sección " + n + " en la versión oficial");
    return hoja.replace(r, "");
  }, css).replace(/\s+$/, "\n");
}

function quedarse(html, patron, cuantos) {
  let n = 0;
  return html.replace(patron, bloque => (++n <= cuantos ? bloque : ""));
}

function cortar(html, marca, archivo) {
  const i = html.indexOf(marca);
  if (i < 0) throw new Error("No encuentro «" + marca + "» en la versión oficial");
  const antes = html.slice(0, html.lastIndexOf("\n", i) + 1).replace(/\s+$/, "\n");
  if (archivo === "css") return antes;
  const cierre = antes.includes("<main>") ? "\n  </main>\n\n</body>\n</html>\n" : "\n</body>\n</html>\n";
  return antes + cierre;
}

// Un archivo en un commit, o "" si en ese commit todavía no existía
function leer(commit, archivo) {
  try {
    return execFileSync("git", ["-c", "safe.directory=*", "show", commit + ":" + CARPETA + archivo],
      { cwd: raiz, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).replace(/\r\n/g, "\n");
  } catch (e) {
    return "";
  }
}

const versiones = {};
for (const [mundo, commit] of Object.entries(COMMITS)) {
  const html = leer(commit, "index.html");
  if (!html) throw new Error(mundo + ": no hay index.html en el commit " + commit);
  const opiniones = leer(commit, "datos/opiniones.json");
  versiones[mundo] = {
    html,
    css: leer(commit, "estilos.css"),
    js: leer(commit, "script.js"),
    privacidad: leer(commit, "privacidad.html"),
    datos: opiniones ? { "opiniones.json": JSON.parse(opiniones) } : {}
  };
  if (CORTES[mundo]) {
    const { archivo, marcas, quitar, retocar = {} } = CORTES[mundo];
    const delAlumno = (RECORTES[mundo] || (t => t))(versiones[mundo][archivo]);
    if (RECORTES[mundo] && delAlumno === versiones[mundo][archivo]) throw new Error(mundo + ": el recorte no cambió nada");
    versiones[mundo].pasos = (quitar ? quitar.map(q => sinSecciones(delAlumno, q)) : marcas.map(m => cortar(delAlumno, m, archivo)))
      .concat(delAlumno).map((paso, i) => (retocar[i] ? retocar[i](paso) : paso));
  }
  console.log(mundo + " (" + commit + "): " + Object.entries(versiones[mundo])
    .map(([k, v]) => k + " " + (typeof v === "string" ? v.length : Object.keys(v).length)).join(", "));
}

mkdirSync(raiz + "lecciones/huellas", { recursive: true });
writeFileSync(raiz + "lecciones/huellas/versiones.js",
  "/* Generado por herramientas/huellas-versiones.mjs: no lo edites a mano. */\n" +
  "window.HUELLAS = " + JSON.stringify(versiones, null, 1) + ";\n", "utf8");
console.log("✅ lecciones/huellas/versiones.js");
