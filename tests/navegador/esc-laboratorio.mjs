// Laboratorio de práctica libre: ejemplo de partida, vista previa y consola, borrar con deshacer, borrador al recargar
// y la descarga en .zip, que se descomprime y se abre desde el disco (file://) como hará el alumno.
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { leerZip } from "./esc-mi-clinica.mjs";

const BASE = new URL("../../", import.meta.url).href;
const marco = "document.querySelector('.lab-editor iframe').contentDocument";
const elegir = n => `(() => { const s = document.querySelector('[data-ejemplo]'); s.value = "${n}"; s.dispatchEvent(new Event('change')); })()`;

export default async function (b) {
  await b.tam(1366, 900);
  await b.ir(BASE + "index.html");
  await b.eval("localStorage.removeItem('csshtml-progreso-v1')");
  await b.ir(BASE + "index.html");
  b.log("Enlace en el inicio: " + await b.eval("!!document.querySelector('a[href=\"laboratorio.html\"]')"));
  await b.ir(BASE + "laboratorio.html");
  await b.esperar(1500);
  b.log("Empieza con un ejemplo: " + await b.eval(marco + ".querySelector('.tarjeta h1')?.textContent"));

  await b.eval(elegir(1));
  await b.esperar(1200);
  await b.eval(marco + ".querySelector('#boton').click(); " + marco + ".querySelector('#boton').click()");
  await b.esperar(300);
  b.log("«Un botón que cuenta»: tras 2 clics pone " + await b.eval(marco + ".querySelector('#cuenta').textContent") +
    " · la consola: " + await b.eval("document.querySelector('.lab-editor .consola')?.innerText.replace(/\\s+/g, ' ').trim().slice(0, 80)"));
  await b.foto("laboratorio");

  await b.eval("document.querySelector('[data-borrar]').click()");
  await b.esperar(800);
  b.log("Borrar todo: textarea vacío " + await b.eval("document.querySelector('.lab-editor textarea').value === ''") +
    " · aviso: " + await b.eval("document.querySelector('[data-aviso]').hidden ? 'oculto' : document.querySelector('[data-aviso] span').textContent"));
  await b.eval("document.querySelector('[data-deshacer]').click()");
  await b.esperar(1000);
  b.log("Deshacer: vuelve el botón " + await b.eval("!!" + marco + ".querySelector('#boton')"));

  await b.ir(BASE + "laboratorio.html");
  await b.esperar(1500);
  b.log("Tras recargar sigue el código: " + await b.eval("!!" + marco + ".querySelector('#boton')"));

  const base64 = await b.eval(`(() => { const z = ZIP.crear(LABORATORIO.archivos()); let s = ""; for (const x of z) s += String.fromCharCode(x); return btoa(s); })()`);
  const zip = leerZip(new Uint8Array(Buffer.from(base64, "base64")));
  b.log("El .zip: " + Object.keys(zip).join(", "));
  const carpeta = join(tmpdir(), "csshtml-laboratorio");
  rmSync(carpeta, { recursive: true, force: true });
  for (const [nombre, datos] of Object.entries(zip)) {
    mkdirSync(join(carpeta, nombre, ".."), { recursive: true });
    writeFileSync(join(carpeta, nombre), datos);
  }
  await b.ir(pathToFileURL(join(carpeta, "mi-practica", "index.html")).href);
  await b.esperar(800);
  b.log("Descomprimido, desde el disco: " + await b.eval(`(() => {
    document.querySelector("#boton").click();
    return "cuenta " + document.querySelector("#cuenta").textContent + " · CSS aplicado " + (getComputedStyle(document.body).textAlign === "center");
  })()`));
  rmSync(carpeta, { recursive: true, force: true });
}
