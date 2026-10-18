/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-03
   Pseudo-elementos — ::before, ::after, content,
   ::first-letter y ::selection.
   Notas:
   - getComputedStyle(el, "::before").content devuelve el texto
     entre comillas ("\"✓ \""), así que el reto busca el ✓ dentro.
   - El ✓ no está en el teclado: el CSS inicial del reto lo trae
     en un comentario para copiarlo.
   - ::selection no se usa en ejercicios (no se puede leer de forma
     fiable); en el reto se comprueba con PRUEBA.reglas.
   - La letra capital se mide con getComputedStyle(el, "::first-letter")
     y, por si el navegador no lo calculara, se mira la regla escrita.
   ============================================================ */
CURSO.registrar({
  id: "hc-03",
  titulo: "Pseudo-elementos",
  xp: 40,
  objetivo: "Sabrás añadir decoración con CSS sin tocar el HTML: textos delante y detrás de un elemento, letras capitales y el color del texto seleccionado.",
  glosario: [
    { termino: "::before y ::after", tema: "Pseudo-elementos", para: "Una caja que crea el CSS al principio o al final del elemento; necesita `content`.", ejemplo: ".antetitulo::after {\n  content: \"\";\n  display: block;\n  width: 36px;\n  height: 3px;\n  background-color: #1f7a6b;\n}", buscar: "antes despues decoracion content raya" },
    { termino: "content", tema: "Pseudo-elementos", para: "Lo que muestra un `::before` o `::after`: un texto, o `\"\"` para una caja vacía.", ejemplo: ".precio::after {\n  content: \" euros\";\n}", buscar: "contenido texto pseudo" },
    { termino: "::first-letter", tema: "Pseudo-elementos", para: "La primera letra (letra capital).", ejemplo: "p::first-letter {\n  font-size: 40px;\n}", buscar: "letra capital primera" },
    { termino: "linear-gradient()", tema: "Pseudo-elementos", para: "Un degradado de un color a otro; va en `background`.", ejemplo: ".capa {\n  background: linear-gradient(to right, white, rgb(255 255 255 / 0));\n}", buscar: "degradado fundir transparente fondo" }
  ],
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Cajas fantasma: ::before y ::after",
      texto: "Un **pseudo-elemento** es una parte de un elemento que **no existe en el HTML**: la crea el CSS. Se escribe con **dos** pares de dos puntos (`::`).\n\n• `::before` añade algo **al principio**, dentro del elemento.\n• `::after` lo añade **al final**.\n\nLo que aparece lo dice la propiedad `content`, con el texto entre comillas. ¡Sin `content` no aparece nada! 👻\n\nEn el ejemplo, el HTML solo dice «Patatas bravas» y «4,50»: el fuego y la palabra «euros» los pone el CSS.",
      ejemplo: {
        html: `<p class="plato">Patatas bravas</p>
<p class="precio">4,50</p>`,
        css: `.plato::before {
  content: "🔥 ";
}
.precio::after {
  content: " euros";
  color: gray;
}`
      },
      consejo: "Truco para no liarte: **un** `:` es una pseudo-clase (un estado o un puesto, como `:hover`). **Dos** `::` son un pseudo-elemento (una parte nueva o especial, como `::before`)."
    },
    {
      tipo: "explicacion",
      titulo: "Letra capital y texto seleccionado",
      texto: "Hay pseudo-elementos que no crean nada nuevo, sino que eligen **un trozo** del elemento:\n\n• `::first-letter` → la **primera letra**. Con ella se hacen las letras capitales gigantes de los libros de cuentos. 📖\n• `::selection` → el texto que el usuario **selecciona** con el ratón. Puedes cambiar su fondo y su color.\n\nPrueba en el resultado: arrastra el ratón por encima del texto para seleccionarlo.",
      ejemplo: {
        html: `<p>Érase una vez un dragón que tenía miedo a los ratones. Cada vez que veía uno, ¡se subía a una silla!</p>`,
        css: `p::first-letter {
  font-size: 40px;
  color: crimson;
}
p::selection {
  background-color: gold;
}`
      },
      consejo: "Lo que pones con `content` es **decoración**: no se puede seleccionar ni copiar, y algunos lectores de pantalla no lo leen. Lo importante va siempre en el HTML."
    },
    {
      tipo: "explicacion",
      titulo: "Una capa encima: ::after con un degradado",
      texto: "Con `content: \"\"` (vacío) el pseudo-elemento no trae texto: es una **caja vacía** que puedes pintar. Si además le das `position: absolute` (y al padre `position: relative`), la colocas **encima** de lo que quieras.\n\nY para pintarla, un **degradado**: `linear-gradient(to right, color1, color2)` pasa poco a poco de un color a otro, de izquierda a derecha. Va en `background`, como si fuera una imagen.\n\nEn el ejemplo, la capa cubre la mitad izquierda de la caja y va del color del fondo a transparente (`/ 0` al final del `rgb()`): la caja parece **fundirse** con la página. 🌫️",
      ejemplo: {
        html: `<div class="foto">Foto</div>`,
        css: `.foto {
  position: relative;
  height: 120px;
  background-color: teal;
  color: white;
  text-align: right;
}
.foto::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 50%;
  background: linear-gradient(to right, white, rgb(255 255 255 / 0));
}`
      },
      consejo: "`to right` va de izquierda a derecha; también existen `to left`, `to bottom` y `to top`. Si la capa tapa algo que se debe pulsar, ese algo necesita un `z-index` mayor."
    },
    {
      tipo: "ejercicio",
      enunciado: "Avisa de qué pizza pica 🌶️ sin tocar el HTML. Al selector `.picante::after` ponle:\n\n• `content` con el valor `\" ¡pica!\"` (empieza con un **espacio**, para que no se pegue al nombre)\n• `color` con el valor `red`\n\nEl HTML ya está escrito: tú solo escribes el CSS.",
      cssBase: `body { font-family: sans-serif; }
h2 { color: #c1121f; }
li { font-size: 18px; padding: 4px 0; }`,
      inicial: {
        html: `<h2>Pizzería Don Queso</h2>
<ul>
  <li>Margarita</li>
  <li class="picante">Diávola</li>
  <li>Cuatro quesos</li>
</ul>
`,
        css: ""
      },
      solucion: {
        html: `<h2>Pizzería Don Queso</h2>
<ul>
  <li>Margarita</li>
  <li class="picante">Diávola</li>
  <li>Cuatro quesos</li>
</ul>
`,
        css: `.picante::after {
  content: " ¡pica!";
  color: red;
}
`
      },
      pistas: [
        "Es una sola regla con el selector .picante::after. El texto de content va entre comillas, con el espacio dentro de las comillas.",
        "Debe quedarte así:\n.picante::after {\n  content: \" ¡pica!\";\n  color: red;\n}"
      ]
    },
    {
      tipo: "ejercicio",
      enunciado: "Convierte el inicio de este cuento 🐢 en un libro de verdad. Al selector `.cuento::first-letter` ponle:\n\n• `font-size` con el valor `48px`\n• `color` con el valor `seagreen`\n\nEl HTML ya está escrito: tú solo escribes el CSS.",
      cssBase: `body { font-family: serif; }
.cuento { font-size: 18px; line-height: 1.6; max-width: 420px; }`,
      inicial: {
        html: `<p class="cuento">Había una vez una tortuga que soñaba con ganar una carrera de cohetes.</p>
`,
        css: ""
      },
      solucion: {
        html: `<p class="cuento">Había una vez una tortuga que soñaba con ganar una carrera de cohetes.</p>
`,
        css: `.cuento::first-letter {
  font-size: 48px;
  color: seagreen;
}
`
      },
      pistas: [
        "Es una sola regla: el selector es la clase con el pseudo-elemento pegado, .cuento::first-letter, y dentro van las dos propiedades.",
        "Debe quedarte así:\n.cuento::first-letter {\n  font-size: 48px;\n  color: seagreen;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "Elige el adorno que pone `::before` delante del título y cambia el tamaño y el color de la letra capital del párrafo.",
      html: `<h2>Diario de una exploradora</h2>
<p>Hoy he encontrado una cueva llena de cristales que brillan en la oscuridad. Mañana volveré con una linterna más grande.</p>`,
      cssBase: `body { font-family: sans-serif; }
p { font-size: 17px; line-height: 1.6; }`,
      controles: [
        { selector: "h2::before", propiedad: "content", tipo: "opciones", opciones: ["\"⭐ \"", "\"🧭 \"", "\"👉 \"", "none"], valor: "\"⭐ \"" },
        { selector: "p::first-letter", propiedad: "font-size", tipo: "rango", min: 16, max: 64, valor: 40, unidad: "px" },
        { selector: "p::first-letter", propiedad: "color", tipo: "color", valor: "#e76f51" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Escribes .aviso::before { color: red; } pero delante del aviso no aparece nada. ¿Qué falta?",
      opciones: [
        "La propiedad content, con lo que quieres que aparezca",
        "Escribir <before> en el HTML",
        "Cambiar los dos pares de dos puntos por uno solo"
      ],
      correcta: 0,
      explicacion: "::before y ::after solo aparecen si tienen content. Sin él, el navegador no crea la caja fantasma, por muchos colores que le pongas."
    },
    {
      tipo: "reto",
      enunciado: "Decora tu muro de logros 🏅 solo con CSS. El HTML ya está hecho; en la pestaña **CSS**:\n\n1. Pon un `✓ ` delante de cada logro de la lista con `::before` (puedes copiar el ✓ del comentario).\n2. Convierte la primera letra del párrafo `.intro` en una **letra capital**: al menos el **doble** de grande (y, si quieres, de otro color).\n3. Elige un color de fondo para el texto **seleccionado** con el ratón.",
      pestana: "css",
      cssBase: `body { font-family: sans-serif; background-color: #fffaf0; }
h1 { font-size: 26px; color: #b5651d; }
.intro { font-size: 18px; line-height: 1.6; max-width: 480px; }
.logros { list-style: none; padding: 0; }
.logros li { font-size: 18px; }`,
      inicial: {
        html: `<h1>🏅 Mis logros de la semana</h1>
<p class="intro">Esta semana he sido una máquina: he aprendido un montón de cosas nuevas y no pienso parar.</p>
<ul class="logros">
  <li>Terminé el Mundo CSS</li>
  <li>Hice mi primera cuadrícula con Grid</li>
  <li>Entendí las pseudo-clases</li>
</ul>
`,
        css: `/* 1. Pon "✓ " delante de cada logro (copia el ✓ de aquí) */
.logros li {
  padding: 6px 0;
}

/* 2. Letra capital: la primera letra de .intro, grande y de color */

/* 3. Color de fondo del texto seleccionado */
`
      },
      comprobaciones: [
        {
          texto: "Cada logro de la lista empieza con un ✓ puesto con `::before`",
          prueba: (doc, win) => {
            const lis = [...doc.querySelectorAll(".logros li")];
            return lis.length >= 3 && lis.every(li => /[✓✔]/.test(win.getComputedStyle(li, "::before").content || ""));
          }
        },
        {
          texto: "La primera letra de `.intro` es al menos el doble de grande que el resto del texto (`::first-letter`)",
          prueba: (doc, win) => {
            const p = doc.querySelector(".intro");
            if (!p) return false;
            const normal = parseFloat(win.getComputedStyle(p).fontSize) || 16;
            const letra = parseFloat(win.getComputedStyle(p, "::first-letter").fontSize) || 0;
            if (letra >= normal * 2) return true;
            // Por si el navegador no calcula ::first-letter: se mira la regla escrita
            return PRUEBA.reglas(doc, "first-letter").some(r => {
              const base = r.selectorText.split(",").filter(s => /first-letter/.test(s)).map(s => s.replace(/::?first-letter/g, "").trim());
              let toca = false;
              try { toca = base.some(s => p.matches(s || "*")); } catch (e) { toca = false; }
              const tam = String(r.style.fontSize || "");
              const n = parseFloat(tam) || 0;
              const grande = /px$/.test(tam) ? n >= normal * 2 : /rem$/.test(tam) ? n * 16 >= normal * 2 : /em$/.test(tam) ? n >= 2 : false;
              return toca && grande;
            });
          }
        },
        {
          texto: "Has elegido un color para el texto seleccionado (`::selection`)",
          prueba: (doc) => PRUEBA.reglas(doc, "::selection").some(r => !!(r.style.backgroundColor || r.style.color))
        }
      ],
      pistas: [
        "Necesitas tres reglas nuevas: .logros li::before con content, .intro::first-letter con font-size (18px × 2 = 36px o más) y color, y ::selection con background-color.",
        "Escribe:\n.logros li::before {\n  content: \"✓ \";\n  color: seagreen;\n}\n.intro::first-letter {\n  font-size: 48px;\n  color: #e76f51;\n}\n::selection {\n  background-color: gold;\n}"
      ],
      solucion: {
        html: `<h1>🏅 Mis logros de la semana</h1>
<p class="intro">Esta semana he sido una máquina: he aprendido un montón de cosas nuevas y no pienso parar.</p>
<ul class="logros">
  <li>Terminé el Mundo CSS</li>
  <li>Hice mi primera cuadrícula con Grid</li>
  <li>Entendí las pseudo-clases</li>
</ul>
`,
        css: `.logros li {
  padding: 6px 0;
}

.logros li::before {
  content: "✓ ";
  color: seagreen;
}

.intro::first-letter {
  font-size: 48px;
  color: #e76f51;
}

::selection {
  background-color: gold;
}
`
      }
    }
  ]
});
