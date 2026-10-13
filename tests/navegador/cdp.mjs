// Mini controlador de Edge por DevTools Protocol para probar <CSS-HTML>.
// Uso: node cdp.mjs <escenario.mjs>
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PUERTO = 9333;
const perfil = join(DIR, "perfil-cdp-" + Date.now());
mkdirSync(perfil, { recursive: true });

const proc = spawn(EDGE, [
  "--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars",
  "--remote-debugging-port=" + PUERTO, "--user-data-dir=" + perfil,
  "--allow-file-access-from-files", "about:blank"
], { stdio: "ignore" });

const esperar = ms => new Promise(r => setTimeout(r, ms));

async function objetivo() {
  for (let i = 0; i < 50; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PUERTO}/json`);
      const lista = await r.json();
      const p = lista.find(t => t.type === "page");
      if (p) return p.webSocketDebuggerUrl;
    } catch (e) { /* aÃºn arrancando */ }
    await esperar(200);
  }
  throw new Error("Edge no arrancÃ³");
}

const ws = new WebSocket(await objetivo());
await new Promise(r => ws.addEventListener("open", r));
let idMsg = 0;
const pendientes = new Map();
const errores = [];
ws.addEventListener("message", ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pendientes.has(m.id)) {
    pendientes.get(m.id)(m);
    pendientes.delete(m.id);
  } else if (m.method === "Runtime.exceptionThrown") {
    errores.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  } else if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") {
    errores.push("console.error: " + m.params.args.map(a => a.value || a.description).join(" "));
  } else if (m.method === "Page.javascriptDialogOpening") {
    enviar("Page.handleJavaScriptDialog", { accept: true });
  }
});
function enviar(method, params = {}) {
  const id = ++idMsg;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise(r => pendientes.set(id, r));
}

await enviar("Page.enable");
await enviar("Runtime.enable");

const api = {
  esperar,
  errores,
  async ir(url) {
    await enviar("Page.navigate", { url });
    await esperar(1500);
  },
  async eval(expr) {
    const r = await enviar("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true });
    if (r.result?.exceptionDetails) throw new Error("eval: " + JSON.stringify(r.result.exceptionDetails.exception?.description));
    return r.result?.result?.value;
  },
  async tam(ancho, alto, movil = false) {
    await enviar("Emulation.setDeviceMetricsOverride", { width: ancho, height: alto, deviceScaleFactor: 1, mobile: movil });
  },
  async oscuro(si) {
    await enviar("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: si ? "dark" : "light" }] });
  },
  async foto(nombre, completa = false) {
    const p = { format: "png" };
    if (completa) {
      const alto = await api.eval("document.documentElement.scrollHeight");
      const ancho = await api.eval("document.documentElement.clientWidth");
      p.clip = { x: 0, y: 0, width: ancho, height: Math.min(alto, 4000), scale: 1 };
      p.captureBeyondViewport = true;
    }
    const r = await enviar("Page.captureScreenshot", p);
    const ruta = join(DIR, nombre + ".png");
    writeFileSync(ruta, Buffer.from(r.result.data, "base64"));
    console.log("ðŸ“¸ " + ruta);
  },
  async movimiento() { await enviar("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] }); },
  async reducido() { await enviar("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] }); },
  cdp: enviar,
  log: (...a) => console.log(...a)
};

try {
  const escenario = await import(pathToFileURL(join(DIR, process.argv[2])).href);
  await escenario.default(api);
} catch (e) {
  console.log("âŒ ERROR DEL ESCENARIO:", e.message);
} finally {
  console.log(errores.length ? "âš ï¸ Errores JS en la pÃ¡gina:\n - " + errores.join("\n - ") : "âœ… Sin errores JS en la pÃ¡gina");
  ws.close();
  proc.kill();
  await esperar(500);
  try { rmSync(perfil, { recursive: true, force: true }); } catch (e) {}
}



