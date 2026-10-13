// Pruebas del motor para el Mundo JavaScript (js/editor.js, js/ejercicios.js, js/pruebas.js, js/retos.js):
// consola, errores con línea, localStorage de práctica, fetch simulado, acciones en ejercicios y retos.
const BASE = new URL("../../", import.meta.url).href;

async function pruebas() {
  const salida = [];
  const ok = (nombre, cond) => salida.push((cond ? "✓ " : "✗ ") + nombre);
  const rev = (alumno, sol, acciones) => EJERCICIOS.revisar(alumno, sol, null, "", acciones);
  const cargar = codigo => PRUEBA.cargarEn(PRUEBA.crearMarco(800, 600), EDITOR.construirDocumento(codigo), {});

  // 1. Consola con formato legible
  let v = await cargar({ html: "<h1 id='t'>Hola</h1>", js: [
    'console.log("Hola", 7, true);',
    'console.log(["pan", 2]);',
    'console.log({ nombre: "Ana", vida: 100 });',
    'console.log(document.querySelector("h1"));',
    'console.log(document.querySelectorAll("h1"));'
  ].join("\n") });
  ok("consola: texto y números", v.win.__logs[0] === "Hola 7 true");
  ok("consola: array", v.win.__logs[1] === '["pan", 2]');
  ok("consola: objeto", v.win.__logs[2] === '{ nombre: "Ana", vida: 100 }');
  ok("consola: elemento (" + v.win.__logs[3] + ")", v.win.__logs[3] === '<h1 id="t">Hola</h1>');
  ok("consola: NodeList (" + v.win.__logs[4] + ")", v.win.__logs[4] === 'NodeList(1) [<h1 id="t">]');

  // 2. Errores con la línea del código del alumno
  v = await cargar({ html: "<p>x</p>", js: "let a = 1;\n\nnoExiste();" });
  ok("error: línea 3 (" + JSON.stringify(v.win.__errores) + ")", v.win.__errores[0]?.linea === 3 && /noExiste/.test(v.win.__errores[0].mensaje));
  v = await cargar({ html: "<p>x</p>", js: "let a = 1;\nlet b = ;" });
  ok("error de escritura: línea 2 (" + JSON.stringify(v.win.__errores) + ")", v.win.__errores[0]?.linea === 2);
  ok("errorAmigable traduce", /no existe/.test(EDITOR.errorAmigable("Uncaught ReferenceError: x is not defined", 4)) && /línea 4/.test(EDITOR.errorAmigable("x is not defined", 4)));

  // 3. alert/prompt no bloquean
  v = await cargar({ js: 'alert("hola"); const r = prompt("¿Nombre?"); console.log(r);' });
  ok("alert y prompt no bloquean", v.win.__logs[0] === "null");

  // 4. localStorage de práctica: no toca el del curso
  localStorage.setItem("csshtml-test-motor", "sigo-aqui");
  v = await cargar({ js: 'localStorage.clear(); localStorage.setItem("nombre", "Ana"); console.log(localStorage.getItem("nombre"), localStorage.length);' });
  ok("localStorage: funciona dentro", v.win.__logs[0] === "Ana 1");
  ok("localStorage: el del curso sigue intacto", localStorage.getItem("csshtml-test-motor") === "sigo-aqui" && localStorage.getItem("nombre") === null);
  localStorage.removeItem("csshtml-test-motor");

  // 5. Retos: PRUEBA.recargar conserva los datos (o los borra) y vuelve a ejecutar el código
  const codigoLS = {
    html: '<p id="saludo"></p><input id="nombre"><button>Guardar</button>',
    js: 'const guardado = localStorage.getItem("nombre");\n' +
        'document.querySelector("#saludo").textContent = guardado ? "Hola, " + guardado : "¿Quién eres?";\n' +
        'document.querySelector("button").addEventListener("click", () => localStorage.setItem("nombre", document.querySelector("#nombre").value));'
  };
  const resLS = await RETOS.evaluar(codigoLS, [
    { prueba: doc => doc.querySelector("#saludo").textContent === "¿Quién eres?" },
    { prueba: async doc => {
      PRUEBA.escribir(doc.querySelector("#nombre"), "Ana");
      doc.querySelector("button").click();
      const r = await PRUEBA.recargar(doc);
      return r.doc.querySelector("#saludo").textContent === "Hola, Ana";
    } },
    { prueba: async doc => (await PRUEBA.recargar(doc, { borrarDatos: true })).doc.querySelector("#saludo").textContent === "¿Quién eres?" }
  ], PRUEBA.crearMarco(800, 600));
  ok("reto: empieza sin datos guardados", resLS[0]);
  ok("reto: recargar recuerda el localStorage", resLS[1]);
  ok("reto: recargar con borrarDatos empieza de cero", resLS[2]);
  // Una segunda evaluación vuelve a empezar con el almacenamiento vacío
  const resLS2 = await RETOS.evaluar(codigoLS, [{ prueba: doc => doc.querySelector("#saludo").textContent === "¿Quién eres?" }]);
  ok("reto: cada evaluación empieza con localStorage vacío", resLS2[0]);

  // 6. fetch simulado de datos/…
  window.__csshtmlDatos = Object.assign(window.__csshtmlDatos || {}, { "prueba-motor.json": [{ texto: "Uno" }, { texto: "Dos" }] });
  const solF = { html: "<ul></ul>", js: [
    "async function cargar() {",
    '  const respuesta = await fetch("datos/prueba-motor.json");',
    "  const lista = await respuesta.json();",
    '  lista.forEach(x => { const li = document.createElement("li"); li.textContent = x.texto; document.querySelector("ul").append(li); });',
    "}",
    "cargar();"
  ].join("\n") };
  v = await cargar(solF);
  ok("fetch: los datos llegan y se pintan (" + v.doc.querySelectorAll("li").length + " li)", v.doc.querySelectorAll("li").length === 2);
  ok("fetch: la solución se aprueba", (await rev(solF, solF)).ok);
  const malF = await rev({ html: "<ul></ul>", js: "" }, solF);
  ok("fetch: sin código suspende (" + malF.mensaje + ")", !malF.ok);
  v = await cargar({ js: 'fetch("datos/no-existe.json").then(r => console.log(r.ok, r.status));' });
  ok("fetch: archivo inexistente → 404", v.win.__logs[0] === "false 404");
  const resF = await RETOS.evaluar(solF, [{ prueba: doc => doc.querySelectorAll("li").length === 2 }]);
  ok("fetch: el reto espera a que lleguen los datos", resF[0]);

  // 7. Ejercicios con acciones (clic)
  const htmlC = '<button id="mas">Me gusta</button><p id="n">0</p>';
  const solC = { html: htmlC, js: 'let n = 0;\ndocument.querySelector("#mas").addEventListener("click", () => {\n  n = n + 1;\n  document.querySelector("#n").textContent = n;\n});' };
  const acc = [{ clic: "#mas" }, { clic: "#mas" }];
  ok("acciones: la solución se aprueba", (await rev(solC, solC, acc)).ok);
  const vacioC = await rev({ html: htmlC, js: "" }, solC, acc);
  ok("acciones: sin JS suspende (" + vacioC.mensaje + ")", !vacioC.ok && /Al pulsar/.test(vacioC.mensaje));
  const dobleC = await rev({ html: htmlC, js: solC.js.replace("n + 1", "n + 2") }, solC, acc);
  ok("acciones: sumar 2 suspende", !dobleC.ok);

  // 8. Escribir en un campo (evento input)
  const htmlE = '<input id="c"><p id="eco"></p>';
  const solE = { html: htmlE, js: 'document.querySelector("#c").addEventListener("input", e => {\n  document.querySelector("#eco").textContent = e.target.value.length;\n});' };
  const accE = [{ escribir: "#c", texto: "hola" }];
  ok("escribir: la solución se aprueba", (await rev(solE, solE, accE)).ok);
  ok("escribir: sin JS suspende", !(await rev({ html: htmlE, js: "" }, solE, accE)).ok);

  // 9. Formulario con submit + preventDefault
  const htmlS = '<form novalidate><input id="nombre"><button>Enviar</button></form><p id="msg"></p>';
  const solS = { html: htmlS, js: 'document.querySelector("form").addEventListener("submit", e => {\n  e.preventDefault();\n  document.querySelector("#msg").textContent = document.querySelector("#nombre").value.trim() === "" ? "Falta el nombre" : "¡Gracias!";\n});' };
  ok("enviar: la solución se aprueba", (await rev(solS, solS, [{ enviar: "form" }])).ok);
  ok("enviar: sin JS suspende", !(await rev({ html: htmlS, js: "" }, solS, [{ enviar: "form" }])).ok);

  // 10. Estilos en línea y clases desde JS
  const htmlT = "<h1>Hola</h1>";
  ok("style: #ff0000 = red", (await rev({ html: htmlT, js: 'document.querySelector("h1").style.color = "#ff0000";' }, { html: htmlT, js: 'document.querySelector("h1").style.color = "red";' })).ok);
  const malT = await rev({ html: htmlT, js: 'document.querySelector("h1").style.color = "blue";' }, { html: htmlT, js: 'document.querySelector("h1").style.color = "red";' });
  ok("style: color distinto suspende (" + malT.mensaje + ")", !malT.ok);
  ok("class vacía = sin clase", (await rev({ html: "<h1 class='x'>Hola</h1>", js: 'document.querySelector("h1").classList.remove("x");' }, { html: "<h1>Hola</h1>", js: "" })).ok);
  const malCl = await rev({ html: htmlT, js: "" }, { html: htmlT, js: 'document.body.classList.add("modo-noche");' });
  ok("classList.add: sin la clase suspende (" + malCl.mensaje + ")", !malCl.ok);

  // 11. Error de JS en un ejercicio: mensaje claro con la línea
  const malErr = await rev({ html: htmlT, js: 'const t = document.querySelector("h1");\nt.textContnt = "Adiós";\nconsola.log(t);' }, { html: "<h1>Adiós</h1>", js: "" });
  ok("error en ejercicio: línea y explicación (" + malErr.mensaje + ")", !malErr.ok && /línea 3/.test(malErr.mensaje));

  // 12. Mensajes de la consola en ejercicios
  const solL = { js: 'console.log("Hola");\nconsole.log("Me gusta la pizza");' };
  ok("consola: se ignoran mayúsculas y signos", (await rev({ js: 'console.log("hola!");\nconsole.log("me gusta la PIZZA");' }, solL)).ok);
  const faltaL = await rev({ js: 'console.log("Hola");' }, solL);
  ok("consola: falta una línea (" + faltaL.mensaje + ")", !faltaL.ok && /Me gusta la pizza/.test(faltaL.mensaje));

  // 14. Bucles infinitos: se cortan con un aviso y la página sigue viva
  const t0 = performance.now();
  v = await cargar({ html: "<p>x</p>", js: 'const lista = [1];\nfor (const x of lista) {\n  lista.push(x);\n}\nconsole.log("sigo vivo");' });
  ok("bucle infinito cortado en " + Math.round(performance.now() - t0) + " ms (" + JSON.stringify(v.win.__errores) + ")",
    v.win.__errores[0]?.linea === 2 && /bucle no termina/.test(EDITOR.errorAmigable(v.win.__errores[0].mensaje)));
  v = await cargar({ js: "let i = 0;\nwhile (true) i++;" });
  ok("while (true) sin llaves también se corta", v.win.__errores.length === 1);
  v = await cargar({ js: 'let s = 0;\nfor (const n of [1, 2, 3]) {\n  s = s + n;\n}\nconsole.log(s);' });
  ok("un bucle normal funciona igual", v.win.__logs[0] === "6" && !v.win.__errores.length);
  v = await cargar({ js: "for (const n of [1, 2]) {\n  console.log(n);\n}" });
  ok("PRUEBA.codigo no muestra los vigilantes", !/__bucle/.test(PRUEBA.codigo(v.doc)) && /for \(const n/.test(PRUEBA.codigo(v.doc)));

  // 15. Revisor de escritura en ejercicios
  const solEsc = { html: "<h1>Hola</h1>", css: "h1 {\n  color: red;\n}" };
  const sinPuntoComa = await rev({ html: "<h1>Hola</h1>", css: "h1 {\n  color: red\n}" }, solEsc);
  ok("escritura: falta ; suspende (" + sinPuntoComa.mensaje + ")", !sinPuntoComa.ok && /;/.test(sinPuntoComa.mensaje));
  const sinLlave = await rev({ html: "<h1>Hola</h1>", css: "h1 {\n  color: red;\n" }, solEsc);
  ok("escritura: falta } suspende (" + sinLlave.mensaje + ")", !sinLlave.ok && /\}/.test(sinLlave.mensaje));
  const sinCierre = await rev({ html: "<h1>Hola", css: solEsc.css }, solEsc);
  ok("escritura: <h1> sin cerrar suspende (" + sinCierre.mensaje + ")", !sinCierre.ok && /<\/h1>/.test(sinCierre.mensaje));
  const jsSinPC = await rev({ js: 'console.log("Hola")' }, { js: 'console.log("Hola");' });
  ok("escritura: JS sin ; suspende (" + jsSinPC.mensaje + ")", !jsSinPC.ok);

  // 16. Tildes: no cuentan (la ñ sí)
  ok("tildes: «pagina» = «página»", (await rev({ html: "<p>Mi pagina</p>" }, { html: "<p>Mi página</p>" })).ok);
  ok("ñ: «ano» ≠ «año»", !(await rev({ html: "<p>Feliz ano</p>" }, { html: "<p>Feliz año</p>" })).ok);

  // 13. Pestaña con la que se abren los retos de JS
  ok("reto JS se abre en la pestaña JS", RETOS.pestanaReto({ inicial: { html: "<p>a</p>" }, solucion: { html: "<p>a</p>", js: "x" } }) === "js");
  ok("reto CSS sigue abriéndose en CSS", RETOS.pestanaReto({ inicial: { html: "<p>a</p>" }, solucion: { html: "<p>a</p>", css: "p{}" } }) === "css");
  return salida.join("\n");
}

export default async function (b) {
  await b.tam(1280, 900);
  await b.ir(BASE + "tests/verificar-lecciones.html");
  for (let i = 0; i < 480; i++) {
    if (!(await b.eval("document.querySelector('[data-resumen]').textContent")).includes("Comprobando")) break;
    await b.esperar(500);
  }
  b.log(await b.eval("(" + pruebas.toString() + ")()"));
}
