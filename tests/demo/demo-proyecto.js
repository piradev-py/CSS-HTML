/* Lección de demostración para tests/navegador/esc-proyecto-ui.mjs: dos encargos sobre la versión oficial
   del Mundo 1 de «Huellas». Solo existe en los tests (el escenario la añade a MUNDOS). */
(function () {
  const P = { raiz: "recursos/huellas/web/", html: "index.html", css: "estilos.css", js: "script.js" };
  const sinDescripcion = HUELLAS["mundo-1"].html.replace(/\s*<meta name="description"[^>]*>/, "");
  CURSO.registrar({
    id: "demo-proyecto",
    titulo: "Demo de proyecto",
    xp: 10,
    objetivo: "Probar el paso proyecto.",
    pasos: [
      {
        tipo: "proyecto",
        proyecto: P,
        enunciado: "Añade la **meta description** del encargo a la cabeza de `index.html`.",
        captura: "recursos/huellas/web/img/portada.jpg",
        inicial: { html: sinDescripcion },
        comprobaciones: [
          { texto: "Hay una meta description", repaso: "html-13", prueba: doc => !!doc.querySelector('meta[name="description"]') },
          { texto: "El menú tiene 5 enlaces", repaso: "html-06", prueba: doc => doc.querySelectorAll("nav a").length >= 5 }
        ],
        pistas: ["Va en el <head>."],
        solucion: { html: HUELLAS["mundo-1"].html }
      },
      {
        tipo: "proyecto",
        proyecto: P,
        pestanas: ["html", "css"],
        enunciado: "Enlaza `estilos.css` y haz que la cabecera se quede fija arriba.",
        inicial: { html: HUELLAS["mundo-1"].html },
        comprobaciones: [
          { texto: "index.html enlaza estilos.css", repaso: "css-01", prueba: doc => !!doc.querySelector('style[data-archivo="estilos.css"]') },
          { texto: "La cabecera es sticky", repaso: "css-10", prueba: (doc, win) => win.getComputedStyle(doc.querySelector("header")).position === "sticky" }
        ],
        pistas: ["<link rel=\"stylesheet\" href=\"estilos.css\"> en el <head>."],
        solucion: { html: HUELLAS["mundo-2"].html, css: HUELLAS["mundo-2"].css }
      }
    ]
  });
})();
