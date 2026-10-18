// Página final «Mi clínica»: cerrada hasta completar js-17; abierta, enseña la web del alumno y la descarga en .zip.
// El .zip se abre aquí mismo (sin comprimir: basta con leer sus cabeceras) y la web descomprimida se abre desde el
// disco (file://), como hará el alumno: tiene que funcionar fuera del curso.
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const BASE = new URL("../../", import.meta.url).href;
const progreso = completadas => `localStorage.setItem('csshtml-progreso-v1', JSON.stringify({ xp: 0, completadas: ${JSON.stringify(completadas)}, insignias: [], racha: { dias: 0, ultimo: null }, ajustes: { sonido: false, tema: 'light', desbloquearTodo: false }, borradores: {} }))`;

// Lee un .zip de archivos guardados sin comprimir (método 0), cabecera local a cabecera local
export function leerZip(bytes) {
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const salida = {};
  let i = 0;
  while (v.getUint32(i, true) === 0x04034b50) {
    if (v.getUint16(i + 8, true) !== 0) throw new Error("método de compresión inesperado");
    const tam = v.getUint32(i + 18, true);
    const largo = v.getUint16(i + 26, true);
    const extra = v.getUint16(i + 28, true);
    const nombre = new TextDecoder().decode(bytes.subarray(i + 30, i + 30 + largo));
    const inicio = i + 30 + largo + extra;
    salida[nombre] = bytes.subarray(inicio, inicio + tam);
    i = inicio + tam;
  }
  if (v.getUint32(i, true) !== 0x02014b50) throw new Error("falta el directorio central");
  return salida;
}

export default async function (b) {
  await b.tam(1366, 900);
  await b.ir(BASE + "index.html");
  await b.eval(progreso({ "js-13": { estrellas: 3, fecha: "2026-10-18" } }));
  await b.ir(BASE + "mi-clinica.html");
  await b.esperar(800);
  b.log("Sin completar js-17: " + await b.eval("document.querySelector('.mi-clinica-pendiente') ? 'tarjeta de pendiente' : 'ERROR: se ve la clínica'"));

  await b.eval(progreso({ "js-17": { estrellas: 3, fecha: "2026-10-18" } }));
  await b.ir(BASE + "index.html");
  await b.esperar(600);
  b.log("Botón en el mapa: " + await b.eval("!!document.querySelector('a[href=\"mi-clinica.html\"]')"));
  await b.ir(BASE + "mi-clinica.html");
  await b.esperar(2500);
  b.log("Con js-17 completada: " + await b.eval("document.querySelector('.mi-clinica-cierre') ? 'cierre del curso' : 'ERROR'") +
    " · servicios en la web: " + await b.eval("document.querySelector('.marco-clinica').contentDocument.querySelectorAll('#lista-servicios .servicio').length"));
  await b.foto("mi-clinica");

  const base64 = await b.eval(`(() => { const z = ZIP.crear(MICLINICA.archivos()); let s = ""; for (let i = 0; i < z.length; i += 8192) s += String.fromCharCode(...z.subarray(i, i + 8192)); return btoa(s); })()`);
  const zip = leerZip(new Uint8Array(Buffer.from(base64, "base64")));
  const nombres = Object.keys(zip);
  b.log("El .zip: " + nombres.length + " archivos, " + Math.round(base64.length * 0.75 / 1024) + " KB · " +
    ["index.html", "privacidad.html", "estilos.css", "script.js", "datos/opiniones.json", "img/portada.jpg", "img/iconos/huella.svg"]
      .map(n => (zip["huellas/" + n] ? "✅ " : "❌ ") + n).join(" "));
  // Toda imagen que nombran el HTML, el CSS, el script o los datos está dentro del .zip
  const texto = ["index.html", "estilos.css", "script.js", "datos/opiniones.json"].map(n => new TextDecoder().decode(zip["huellas/" + n])).join("\n");
  const usadas = [...new Set([...texto.matchAll(/img\/[\w./-]+\.(?:jpg|png|svg)/g)].map(m => m[0]))];
  const faltan = usadas.filter(r => !zip["huellas/" + r] && !r.includes("${"));
  b.log("Imágenes que usa la web: " + usadas.length + " · faltan en el .zip: " + (faltan.join(", ") || "ninguna"));

  const carpeta = join(tmpdir(), "csshtml-mi-clinica");
  rmSync(carpeta, { recursive: true, force: true });
  for (const [nombre, datos] of Object.entries(zip)) {
    mkdirSync(join(carpeta, nombre, ".."), { recursive: true });
    writeFileSync(join(carpeta, nombre), datos);
  }
  await b.ir(pathToFileURL(join(carpeta, "huellas", "index.html")).href);
  await b.esperar(1500);
  b.log("La web descomprimida, desde el disco: " + await b.eval(`(() => {
    const d = document;
    const servicios = d.querySelectorAll("#lista-servicios .servicio").length;
    // Las de loading="lazy" que quedan fuera de la ventana todavía no se han pedido: se cuentan solo las demás
    const visibles = [...d.images].filter(i => i.loading !== "lazy");
    const fotos = visibles.filter(i => i.complete && i.naturalWidth > 0).length + "/" + visibles.length + " (sin contar las diferidas)";
    d.querySelector("#filtro-exoticos").click();
    const exoticos = d.querySelectorAll("#lista-servicios .servicio").length;
    d.querySelector(".boton-menu").click();
    const menu = d.querySelector("nav").classList.contains("abierto");
    const opiniones = d.querySelectorAll("#lista-opiniones .opinion").length;
    return "servicios " + servicios + " · exóticos " + exoticos + " · menú " + menu + " · opiniones " + opiniones + " · imágenes cargadas " + fotos;
  })()`));
  await b.foto("mi-clinica-descargada");
  rmSync(carpeta, { recursive: true, force: true });
}
