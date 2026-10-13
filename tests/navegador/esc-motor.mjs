// Pruebas del motor de revisión con CSS "con estado" (js/pruebas.js y js/ejercicios.js):
// :hover/:focus, media queries, pseudo-elementos y animaciones con «reducir movimiento».
const BASE = new URL("../../", import.meta.url).href;
export default async function (b) {
  await b.tam(1280, 900);
  await b.reducido(); // como el Windows del usuario: el resultado no debe depender de esto
  await b.ir(BASE + "tests/verificar-lecciones.html");
  // Esperar a que la verificación automática termine: comparte los marcos ocultos
  for (let i = 0; i < 480; i++) {
    if (!(await b.eval("document.querySelector('[data-resumen]').textContent")).includes("Comprobando")) break;
    await b.esperar(500);
  }
  const r = await b.eval(`(async () => {
    const salida = [];
    const ok = (nombre, cond) => salida.push((cond ? "✓ " : "✗ ") + nombre);
    const rev = (alumno, sol) => EJERCICIOS.revisar(alumno, sol, null);
    const html = "<ul><li>Uno</li><li>Dos</li></ul>";

    // 1. :hover en ejercicios
    const solH = { html, css: "li { color: black; }\\nli:hover { color: red; }" };
    ok("hover: la solución se aprueba", (await rev(solH, solH)).ok);
    const malH = await rev({ html, css: "li { color: black; }\\nli:hover { color: blue; }" }, solH);
    ok("hover: color distinto suspende (" + malH.mensaje + ")", !malH.ok && /ratón/.test(malH.mensaje));
    ok("hover: sin :hover suspende", !(await rev({ html, css: "li { color: black; }" }, solH)).ok);

    // 2. Especificidad: :nth-child y :hover empatan, gana el último
    const solE = { html, css: "li:nth-child(even) { color: gray; }\\nli:hover { color: red; }" };
    const altE = { html, css: "li:hover { color: red; }\\nli:nth-child(even) { color: gray; }" };
    ok("especificidad: el orden importa como en la vida real", !(await rev(altE, solE)).ok);

    // 3. Media queries
    const solM = { html, css: "ul { display: grid; grid-template-columns: 1fr 1fr 1fr; }\\n@media (max-width: 600px) { ul { grid-template-columns: 1fr; } }" };
    ok("media: la solución se aprueba", (await rev(solM, solM)).ok);
    const malM = await rev({ html, css: "ul { display: grid; grid-template-columns: 1fr 1fr 1fr; }" }, solM);
    ok("media: sin @media suspende (" + malM.mensaje + ")", !malM.ok && /estrecha/.test(malM.mensaje));

    // 4. Pseudo-elementos
    const solP = { html, css: "li::before { content: '✓ '; color: green; }" };
    ok("pseudo: la solución se aprueba", (await rev(solP, solP)).ok);
    const malP = await rev({ html, css: "li::before { content: '✗ '; color: green; }" }, solP);
    ok("pseudo: content distinto suspende (" + malP.mensaje + ")", !malP.ok);

    const solL = { html: "<p>Había una vez</p>", css: "p::first-letter { font-size: 40px; }" };
    ok("first-letter: la solución se aprueba", (await rev(solL, solL)).ok);
    ok("first-letter: tamaño distinto suspende", !(await rev({ html: "<p>Había una vez</p>", css: "p::first-letter { font-size: 30px; }" }, solL)).ok);

    // 5. Transición + hover: el valor final, no uno intermedio
    const solT = { html: "<button>Hola</button>", css: "button { background: white; transition: background-color 2s; }\\nbutton:hover { background: red; }" };
    ok("transición: la solución se aprueba", (await rev(solT, solT)).ok);

    // 6. Retos: animación con prefers-reduced-motion
    const css = "@keyframes flotar { to { transform: translateY(-10px); } }\\n.f { animation: flotar 2s infinite alternate; }\\n@media (prefers-reduced-motion: reduce) { .f { animation: none; } }";
    const codigo = { html: "<div class='f'>👻</div>", css };
    const res = await RETOS.evaluar(codigo, [
      { prueba: (doc, win) => win.getComputedStyle(doc.querySelector(".f")).animationName === "flotar" },
      { prueba: async (doc) => { const v = await PRUEBA.clonar(doc, { movimiento: "reducido" }); return v.win.getComputedStyle(v.doc.querySelector(".f")).animationName === "none"; } },
      { prueba: async (doc) => { const v = await PRUEBA.clonar(doc, { estado: "hover", ancho: 375 }); return v.win.innerWidth === 375; } },
      { prueba: (doc) => PRUEBA.reglas(doc, ".f").length === 2 && /@keyframes\\s+flotar/.test(PRUEBA.textoCSS(doc)) }
    ], PRUEBA.crearMarco(800, 600));
    ok("reto: animación activa aunque el sistema reduzca movimiento", res[0]);
    ok("reto: clonar con movimiento reducido la quita", res[1]);
    ok("reto: clonar con ancho 375", res[2]);
    ok("reto: reglas() y textoCSS()", res[3]);
    return salida.join("\\n");
  })()`);
  b.log(r);
}
