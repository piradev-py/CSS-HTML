/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-08
   Tablas — <table>, <tr>, <td>, <th>, <thead>, <tbody>, <caption>.
   Nota: el navegador mete un <tbody> automáticamente si falta, así
   que nunca se comprueba "table > tr" sino "table tr".
   ============================================================ */
CURSO.registrar({
  id: "html-08",
  titulo: "Tables",
  xp: 40,
  objetivo: "You'll be able to present data in rows and columns with a well-built table.",
  // Lo que enseña esta lección, para el glosario de las lecciones de proyecto (js/glosario.js)
  glosario: [
    { termino: "<table>, <tr>, <td>", tema: "Tables", para: "A table: each row is a `<tr>` and each cell a `<td>`.", ejemplo: "<table>\n  <tr><td>Monday</td><td>9:00 – 20:30</td></tr>\n</table>", buscar: "table row cell schedule" },
    { termino: "<th>", tema: "Tables", para: "A title cell for a column or row.", ejemplo: "<tr><th>Day</th><th>Time</th></tr>", buscar: "header title column" },
    { termino: "<thead> y <tbody>", tema: "Tables", para: "They group the header rows and the body rows.", ejemplo: "<table>\n  <thead><tr><th>Day</th><th>Time</th></tr></thead>\n  <tbody><tr><td>Monday</td><td>9:00 – 20:30</td></tr></tbody>\n</table>", buscar: "header body group" },
    { termino: "<caption>", tema: "Tables", para: "The title of the table. It goes right after `<table>`.", ejemplo: "<table>\n  <caption>The clinic's schedule</caption>\n  …\n</table>", buscar: "table title" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Rows and cells",
      texto: "A **table** lays data out in rows and columns, like a school timetable or a spreadsheet.\n\nIt's built with three tags:\n\n• `<table>`: the box that wraps the whole table.\n• `<tr>`: a **row** (from “table row”).\n• `<td>`: a **cell** holding one piece of data (from “table data”).\n\nYou write it **row by row**: you open a `<tr>` and inside it you put its cells, left to right. The columns appear on their own as the cells line up. 🐹",
      ejemplo: {
        html: `<table>
  <tr>
    <td>Monday</td>
    <td>Sunflower seeds</td>
  </tr>
  <tr>
    <td>Tuesday</td>
    <td>Carrot</td>
  </tr>
  <tr>
    <td>Wednesday</td>
    <td>More seeds!</td>
  </tr>
</table>`,
        css: ""
      },
      consejo: "Missing the lines? Without CSS tables have no borders. We'll add them in World 2; for now, what matters is that the data is nicely organized."
    },
    {
      tipo: "explicacion",
      titulo: "Headers and title: <th> and <caption>",
      texto: "A table is easier to understand if it says what each column holds:\n\n• `<th>` is a **header cell** (from “table header”). You use it instead of `<td>` for the column's name. The browser shows it in bold.\n• `<caption>` is the **title of the table**. It goes right after you open `<table>`, before the first row.\n\nScreen readers use these headers to say, for example: “Amount: 300”. Without them, they'd only read loose numbers!",
      ejemplo: {
        html: `<table>
  <caption>Captain Whiskers's loot 🏴‍☠️</caption>
  <tr>
    <th>Item</th>
    <th>Amount</th>
  </tr>
  <tr>
    <td>Gold coins</td>
    <td>300</td>
  </tr>
  <tr>
    <td>Chatty parrots</td>
    <td>2</td>
  </tr>
</table>`,
        css: ""
      }
    },
    {
      tipo: "explicacion",
      titulo: "Head and body: <thead> and <tbody>",
      texto: "Remember how a page has `<head>` and `<body>`? Tables do too:\n\n• `<thead>` groups the **header** rows (the ones with `<th>`).\n• `<tbody>` groups the **data** rows.\n\nThey don't change how things look, but they make crystal clear which part is which. In long tables, the browser can even repeat the header on each page when printing. 🖨️",
      ejemplo: {
        html: `<table>
  <caption>Snail race 🐌</caption>
  <thead>
    <tr>
      <th>Runner</th>
      <th>Time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Turbo</td>
      <td>12 minutes</td>
    </tr>
    <tr>
      <td>Slimey</td>
      <td>3 hours (stopped for a snack)</td>
    </tr>
  </tbody>
</table>`,
        css: ""
      },
      consejo: "Fun fact: if you don't write `<tbody>`, the browser quietly adds it by itself on the inside. Still, writing it yourself makes the code much clearer."
    },
    {
      tipo: "ejercicio",
      enunciado: "Build a `<table>` with the moons of two planets 🪐. It has **two rows** `<tr>`, and each row carries two cells `<td>`:\n\n1. First row: **Earth** and **1**.\n2. Second row: **Mars** and **2**.\n\nYou only need `<table>`, `<tr>` and `<td>`: no headers, no title, and no `<thead>` or `<tbody>`.",
      pistas: [
        "Write row by row: open <table>, inside it open a <tr> with its two <td>, close it with </tr> and repeat for the second row. At the end, </table>.",
        "The first row looks like this:\n<tr>\n  <td>Earth</td>\n  <td>1</td>\n</tr>\nCopy the row, change the data to Mars and 2, and put it all inside <table>…</table>."
      ],
      solucion: {
        html: `<table>
  <tr>
    <td>Earth</td>
    <td>1</td>
  </tr>
  <tr>
    <td>Mars</td>
    <td>2</td>
  </tr>
</table>
`,
        css: ""
      }
    },
    {
      tipo: "quiz",
      pregunta: "Which tag creates a new row in a table?",
      opciones: ["<td>", "<tr>", "<th>"],
      correcta: 1,
      explicacion: "<tr> (table row) is a row. Inside go the cells: <td> for the data and <th> for the headers."
    },
    {
      tipo: "reto",
      enunciado: "Complete the records table of the **Galactic Tetris Tournament** 🎮:\n\n1. Add a `<caption>` with the table's title.\n2. In the header, write two `<th>` cells: “Player” and “Points”.\n3. The body already has one row. Add two more rows, each one with two `<td>` cells.",
      inicial: {
        html: `<table>
  <!-- 1. Add here a <caption> with the table's title -->
  <thead>
    <tr>
      <!-- 2. Two header cells <th>: Player and Points -->
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TheBlockQueen</td>
      <td>98,000</td>
    </tr>
    <!-- 3. Add here two more rows, each one with two <td> -->
  </tbody>
</table>
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "The table has a <caption> title with text",
          prueba: (doc) => (doc.querySelector("table caption")?.textContent.trim().length || 0) > 0
        },
        {
          texto: "The <thead> header has at least two <th> cells with text",
          prueba: (doc) => Array.from(doc.querySelectorAll("table thead th"))
            .filter(th => th.textContent.trim().length > 0).length >= 2
        },
        {
          texto: "The <tbody> body has at least 3 rows, each one with two <td> cells",
          prueba: (doc) => Array.from(doc.querySelectorAll("table tbody tr"))
            .filter(tr => tr.querySelectorAll("td").length >= 2).length >= 3
        }
      ],
      pistas: [
        "The <caption> goes right after <table>. The <th> cells go inside the <thead>'s <tr>. For the new rows, copy the <tr> that already exists (from <tr> to </tr>) and change the data.",
        "It would look like this:\n<caption>Tournament records</caption>\n…\n<tr>\n  <th>Player</th>\n  <th>Points</th>\n</tr>\n…\n<tr>\n  <td>PixelPanda</td>\n  <td>87,500</td>\n</tr>"
      ],
      solucion: {
        html: `<table>
  <caption>Galactic Tetris Tournament records</caption>
  <thead>
    <tr>
      <th>Player</th>
      <th>Points</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TheBlockQueen</td>
      <td>98,000</td>
    </tr>
    <tr>
      <td>PixelPanda</td>
      <td>87,500</td>
    </tr>
    <tr>
      <td>TheLongStickDude</td>
      <td>12 (still waiting for his piece)</td>
    </tr>
  </tbody>
</table>
`,
        css: ""
      }
    }
  ]
});