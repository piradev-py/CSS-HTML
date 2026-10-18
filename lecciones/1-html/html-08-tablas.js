/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-08
   Tablas — <table>, <tr>, <td>, <th>, <thead>, <tbody>, <caption>.
   Nota: el navegador mete un <tbody> automáticamente si falta, así
   que nunca se comprueba "table > tr" sino "table tr".
   ============================================================ */
CURSO.registrar({
  id: "html-08",
  titulo: "Tablas",
  xp: 40,
  objetivo: "Sabrás presentar datos en filas y columnas con una tabla bien construida.",
  // Lo que enseña esta lección, para el glosario de las lecciones de proyecto (js/glosario.js)
  glosario: [
    { termino: "<table>, <tr>, <td>", tema: "Tablas", para: "Una tabla: cada fila es un `<tr>` y cada celda un `<td>`.", ejemplo: "<table>\n  <tr><td>Lunes</td><td>9:00 – 20:30</td></tr>\n</table>", buscar: "tabla fila celda horario" },
    { termino: "<th>", tema: "Tablas", para: "Celda de título de una columna o fila.", ejemplo: "<tr><th>Día</th><th>Horario</th></tr>", buscar: "cabecera titulo columna" },
    { termino: "<thead> y <tbody>", tema: "Tablas", para: "Agrupan las filas de cabecera y las del cuerpo.", ejemplo: "<table>\n  <thead><tr><th>Día</th><th>Horario</th></tr></thead>\n  <tbody><tr><td>Lunes</td><td>9:00 – 20:30</td></tr></tbody>\n</table>", buscar: "cabecera cuerpo grupo" },
    { termino: "<caption>", tema: "Tablas", para: "El título de la tabla. Va justo después de `<table>`.", ejemplo: "<table>\n  <caption>Horario de la clínica</caption>\n  …\n</table>", buscar: "titulo tabla" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Filas y celdas",
      texto: "Una **tabla** ordena datos en filas y columnas, como un horario del cole o una hoja de cálculo.\n\nSe construye con tres etiquetas:\n\n• `<table>`: la caja que envuelve toda la tabla.\n• `<tr>`: una **fila** (de «table row»).\n• `<td>`: una **celda** con un dato (de «table data»).\n\nSe escribe **fila a fila**: abres un `<tr>` y dentro pones sus celdas, de izquierda a derecha. Las columnas salen solas al alinearse las celdas. 🐹",
      ejemplo: {
        html: `<table>
  <tr>
    <td>Lunes</td>
    <td>Pipas</td>
  </tr>
  <tr>
    <td>Martes</td>
    <td>Zanahoria</td>
  </tr>
  <tr>
    <td>Miércoles</td>
    <td>¡Más pipas!</td>
  </tr>
</table>`,
        css: ""
      },
      consejo: "¿Echas de menos las rayas? Sin CSS las tablas no tienen bordes. Se los pondremos en el Mundo 2; de momento, lo importante es que los datos estén bien ordenados."
    },
    {
      tipo: "explicacion",
      titulo: "Cabeceras y título: <th> y <caption>",
      texto: "Una tabla se entiende mejor si dice qué hay en cada columna:\n\n• `<th>` es una **celda de cabecera** (de «table header»). Se usa en lugar de `<td>` para el nombre de la columna. El navegador la pone en negrita.\n• `<caption>` es el **título de la tabla**. Va justo después de abrir `<table>`, antes de la primera fila.\n\nLos lectores de pantalla usan estas cabeceras para decir, por ejemplo: «Cantidad: 300». ¡Sin ellas, solo oirían números sueltos!",
      ejemplo: {
        html: `<table>
  <caption>Botín del capitán Bigotes 🏴‍☠️</caption>
  <tr>
    <th>Objeto</th>
    <th>Cantidad</th>
  </tr>
  <tr>
    <td>Monedas de oro</td>
    <td>300</td>
  </tr>
  <tr>
    <td>Loros parlanchines</td>
    <td>2</td>
  </tr>
</table>`,
        css: ""
      }
    },
    {
      tipo: "explicacion",
      titulo: "Cabeza y cuerpo: <thead> y <tbody>",
      texto: "¿Recuerdas que una página tiene `<head>` y `<body>`? Las tablas también:\n\n• `<thead>` agrupa las filas de **cabecera** (las de `<th>`).\n• `<tbody>` agrupa las filas de **datos**.\n\nNo cambian el aspecto, pero dejan clarísimo qué parte es cada cosa. En tablas largas, el navegador incluso puede repetir la cabecera en cada hoja al imprimir. 🖨️",
      ejemplo: {
        html: `<table>
  <caption>Carrera de caracoles 🐌</caption>
  <thead>
    <tr>
      <th>Corredor</th>
      <th>Tiempo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Turbo</td>
      <td>12 minutos</td>
    </tr>
    <tr>
      <td>Babitas</td>
      <td>3 horas (paró a merendar)</td>
    </tr>
  </tbody>
</table>`,
        css: ""
      },
      consejo: "Curiosidad: si no escribes `<tbody>`, el navegador lo añade él solito por dentro. Aun así, escribirlo tú deja el código mucho más claro."
    },
    {
      tipo: "ejercicio",
      enunciado: "Construye una tabla `<table>` con las lunas de dos planetas 🪐. Tiene **dos filas** `<tr>`, y cada fila lleva dos celdas `<td>`:\n\n1. Primera fila: **Tierra** y **1**.\n2. Segunda fila: **Marte** y **2**.\n\nSolo hacen falta `<table>`, `<tr>` y `<td>`: sin cabeceras, sin título y sin `<thead>` ni `<tbody>`.",
      pistas: [
        "Escribe fila a fila: abre <table>, dentro abre un <tr> con sus dos <td>, ciérralo con </tr> y repite para la segunda fila. Al final, </table>.",
        "La primera fila queda así:\n<tr>\n  <td>Tierra</td>\n  <td>1</td>\n</tr>\nCopia la fila, cambia los datos por Marte y 2, y mételo todo dentro de <table>…</table>."
      ],
      solucion: {
        html: `<table>
  <tr>
    <td>Tierra</td>
    <td>1</td>
  </tr>
  <tr>
    <td>Marte</td>
    <td>2</td>
  </tr>
</table>
`,
        css: ""
      }
    },
    {
      tipo: "quiz",
      pregunta: "¿Qué etiqueta crea una fila nueva en una tabla?",
      opciones: ["<td>", "<tr>", "<th>"],
      correcta: 1,
      explicacion: "<tr> (table row) es una fila. Dentro van las celdas: <td> para los datos y <th> para las cabeceras."
    },
    {
      tipo: "reto",
      enunciado: "Completa la tabla de récords del **Torneo Galáctico de Tetris** 🎮:\n\n1. Añade un `<caption>` con el título de la tabla.\n2. En la cabecera, escribe dos celdas `<th>`: «Jugador» y «Puntos».\n3. En el cuerpo ya hay una fila. Añade dos filas más, cada una con dos celdas `<td>`.",
      inicial: {
        html: `<table>
  <!-- 1. Añade aquí un <caption> con el título de la tabla -->
  <thead>
    <tr>
      <!-- 2. Dos celdas de cabecera <th>: Jugador y Puntos -->
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>LaReinaDelBloque</td>
      <td>98 000</td>
    </tr>
    <!-- 3. Añade aquí dos filas más, cada una con dos <td> -->
  </tbody>
</table>
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "La tabla tiene un título <caption> con texto",
          prueba: (doc) => (doc.querySelector("table caption")?.textContent.trim().length || 0) > 0
        },
        {
          texto: "La cabecera <thead> tiene al menos dos celdas <th> con texto",
          prueba: (doc) => Array.from(doc.querySelectorAll("table thead th"))
            .filter(th => th.textContent.trim().length > 0).length >= 2
        },
        {
          texto: "El cuerpo <tbody> tiene al menos 3 filas, cada una con dos celdas <td>",
          prueba: (doc) => Array.from(doc.querySelectorAll("table tbody tr"))
            .filter(tr => tr.querySelectorAll("td").length >= 2).length >= 3
        }
      ],
      pistas: [
        "El <caption> va justo después de <table>. Las <th> van dentro del <tr> de <thead>. Para las filas nuevas, copia el <tr> que ya existe (desde <tr> hasta </tr>) y cambia los datos.",
        "Quedaría así:\n<caption>Récords del torneo</caption>\n…\n<tr>\n  <th>Jugador</th>\n  <th>Puntos</th>\n</tr>\n…\n<tr>\n  <td>PixelPanda</td>\n  <td>87 500</td>\n</tr>"
      ],
      solucion: {
        html: `<table>
  <caption>Récords del Torneo Galáctico de Tetris</caption>
  <thead>
    <tr>
      <th>Jugador</th>
      <th>Puntos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>LaReinaDelBloque</td>
      <td>98 000</td>
    </tr>
    <tr>
      <td>PixelPanda</td>
      <td>87 500</td>
    </tr>
    <tr>
      <td>ElDelPaloLargo</td>
      <td>12 (aún está esperando su pieza)</td>
    </tr>
  </tbody>
</table>
`,
        css: ""
      }
    }
  ]
});
