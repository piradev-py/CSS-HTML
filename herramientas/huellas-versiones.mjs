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
  "mundo-4": "10d186f"
};

// Encargos del Proyecto web de cada mundo: la versión oficial se corta justo antes de cada marca, y cada trozo es la
// solución de un encargo (el último encargo es la versión completa). HUELLAS[mundo].pasos = [html1, html2, …]
const CORTES = {
  "mundo-1": ["<main>", '<section id="servicios"', '<section id="horario"', '<section id="opiniones"']
};

// En el Mundo 1 el alumno hace solo 3 servicios y 2 personas del equipo; el resto lo «añade el equipo de diseño»
// en la versión oficial con la que empieza el Mundo 2
const RECORTES = {
  "mundo-1": html => quedarse(quedarse(html, /\n *<article class="servicio">[\s\S]*?<\/article>/g, 3), /\n *<figure>[\s\S]*?<\/figure>/g, 2)
};

function quedarse(html, patron, cuantos) {
  let n = 0;
  return html.replace(patron, bloque => (++n <= cuantos ? bloque : ""));
}

function cortar(html, marca) {
  const i = html.indexOf(marca);
  if (i < 0) throw new Error("No encuentro «" + marca + "» en la versión oficial");
  const antes = html.slice(0, html.lastIndexOf("\n", i) + 1).replace(/\s+$/, "\n");
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
    const delAlumno = (RECORTES[mundo] || (h => h))(html);
    versiones[mundo].pasos = CORTES[mundo].map(m => cortar(delAlumno, m)).concat(delAlumno);
  }
  console.log(mundo + " (" + commit + "): " + Object.entries(versiones[mundo])
    .map(([k, v]) => k + " " + (typeof v === "string" ? v.length : Object.keys(v).length)).join(", "));
}

mkdirSync(raiz + "lecciones/huellas", { recursive: true });
writeFileSync(raiz + "lecciones/huellas/versiones.js",
  "/* Generado por herramientas/huellas-versiones.mjs: no lo edites a mano. */\n" +
  "window.HUELLAS = " + JSON.stringify(versiones, null, 1) + ";\n", "utf8");
console.log("✅ lecciones/huellas/versiones.js");
