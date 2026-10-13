/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-04
   Negritas, cursivas y énfasis — <strong>, <em>, <mark>, <br>,
   etiquetas vacías y elementos en línea frente a de bloque.
   ============================================================ */
CURSO.registrar({
  id: "html-04",
  titulo: "Negritas, cursivas y énfasis",
  xp: 30,
  objetivo: "Sabrás resaltar palabras dentro de un texto diferenciando «importante» de «con énfasis».",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Importante o con énfasis",
      texto: "Cuando hablas, a veces subes la voz para avisar de algo serio y otras cambias el tono para que una palabra suene distinta. En HTML hay una etiqueta para cada cosa:\n\n• `<strong>` marca algo **importante**: un aviso, un peligro. El navegador lo pinta en negrita.\n• `<em>` marca **énfasis**: la palabra que dirías con otro tono. Se ve en cursiva.\n\nMira el ejemplo: según qué palabra lleve `<em>`, ¡la frase cuenta una historia distinta! 🍰",
      ejemplo: {
        html: `<p><strong>Peligro:</strong> el suelo está recién fregado.</p>
<p>Yo no me comí <em>la tarta</em>… me comí las galletas.</p>
<p><em>Yo</em> no me comí la tarta… fue el perro.</p>`,
        css: ""
      },
      consejo: "Quizá veas por ahí `<b>` e `<i>`, que también ponen negrita y cursiva. Pero `<strong>` y `<em>` dicen además **qué significan** esas palabras, no solo cómo se ven. ¡Usa estas!"
    },
    {
      tipo: "explicacion",
      titulo: "Rotulador y salto de línea",
      texto: "`<mark>` es como pasar un **rotulador fluorescente** 🖍️: resalta un trozo para que llame la atención.\n\n¿Recuerdas que HTML ignora los saltos de línea que haces con Enter? Para pedir uno de verdad, dentro del mismo párrafo, se usa `<br>`. Va genial para direcciones o poemas.\n\nOjo: `<br>` **no lleva cierre**, porque no tiene nada dentro. Las etiquetas así se llaman **etiquetas vacías**. ¡Ya conoces otra: `<meta>`!",
      ejemplo: {
        html: `<p>Recuerda: la excursión es el <mark>jueves</mark>, no el viernes.</p>
<p>Tagui<br>
Calle de las Etiquetas, 7<br>
Villa Código</p>`,
        css: ""
      },
      consejo: "No uses `<br>` para separar párrafos ni para dejar huecos grandes: para eso está otro `<p>`. `<br>` es solo para saltar de línea **dentro** de un mismo texto."
    },
    {
      tipo: "explicacion",
      titulo: "En línea y de bloque",
      texto: "Las etiquetas se dividen en dos grandes familias:\n\n• **De bloque**: ocupan toda una línea, como `<h1>` o `<p>`. Cada una empieza en una línea nueva, como cajas apiladas 📦.\n• **En línea**: viven **dentro** de una frase sin romperla, como `<strong>`, `<em>` y `<mark>`.\n\nLo normal es que las de bloque contengan a las de en línea: primero el párrafo y, dentro, las palabras resaltadas.",
      ejemplo: {
        html: `<p>Esta frase tiene <strong>una parte importante</strong> y sigue en la misma línea.</p>
<p>Este otro párrafo empieza en una línea nueva.</p>`,
        css: ""
      },
      consejo: "Usa el resaltado con moderación. Si lo marcas **todo** como importante… ¡ya nada lo parece! 😅"
    },
    {
      tipo: "pruebalo",
      instruccion: "Envuelve «Peligro:» con `<strong>`, pon `<em>` en alguna palabra y resalta el nombre del loro con `<mark>`. Después parte la dirección del último párrafo en tres líneas con `<br>`.",
      inicial: {
        html: `<h1>Se busca: loro pirata</h1>
<p>Responde al nombre de Capitán Plumas.</p>
<p>Peligro: repite en voz alta todos tus secretos.</p>
<p>Visto por última vez en: Puerto Galleta, Muelle 3, Barco de las velas rosas.</p>
`,
        css: "",
        js: ""
      }
    },
    {
      tipo: "quiz",
      pregunta: "Quieres avisar de algo serio: «No des de comer al dragón después de medianoche». ¿Qué etiqueta usarías?",
      opciones: ["<em>", "<strong>", "<mark>"],
      correcta: 1,
      explicacion: "<strong> marca lo importante, como un aviso. <em> cambia el tono de una palabra y <mark> la resalta como un rotulador."
    },
    {
      tipo: "reto",
      enunciado: "Termina el cartel de aviso de Míster Zarpas, un gato **muy** gruñón 😾:\n\n• Envuelve la advertencia «No le toques la barriga» con `<strong>`.\n• Pon énfasis con `<em>` en una palabra (por ejemplo, «nunca»).\n• Resalta con `<mark>` otra palabra (por ejemplo, «atún»).\n\nTodo dentro de los párrafos que ya hay.",
      inicial: {
        html: `<h1>Cuidado con el gato</h1>
<p>Aquí vive Míster Zarpas, el gato más gruñón del barrio.</p>
<p>No le toques la barriga.</p>
<p>No se despierta nunca antes de mediodía.</p>
<p>Solo se le puede sobornar con atún.</p>
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "Hay un <strong> con texto",
          prueba: (doc) => Array.from(doc.querySelectorAll("strong"))
            .some(el => el.textContent.trim().length > 0)
        },
        {
          texto: "Hay un <em> con texto",
          prueba: (doc) => Array.from(doc.querySelectorAll("em"))
            .some(el => el.textContent.trim().length > 0)
        },
        {
          texto: "Hay un <mark> con texto",
          prueba: (doc) => Array.from(doc.querySelectorAll("mark"))
            .some(el => el.textContent.trim().length > 0)
        },
        {
          texto: "Las tres etiquetas están dentro de un párrafo <p>",
          prueba: (doc) => ["strong", "em", "mark"]
            .every(t => Array.from(doc.querySelectorAll(t)).some(el => !!el.closest("p")))
        }
      ],
      pistas: [
        "Las etiquetas van dentro de los párrafos y rodean solo las palabras que quieres marcar, con su apertura delante y su cierre detrás.",
        "Por ejemplo:\n<p><strong>No le toques la barriga.</strong></p>\n<p>No se despierta <em>nunca</em> antes de mediodía.</p>\n<p>Solo se le puede sobornar con <mark>atún</mark>.</p>"
      ],
      solucion: {
        html: `<h1>Cuidado con el gato</h1>
<p>Aquí vive Míster Zarpas, el gato más gruñón del barrio.</p>
<p><strong>No le toques la barriga.</strong></p>
<p>No se despierta <em>nunca</em> antes de mediodía.</p>
<p>Solo se le puede sobornar con <mark>atún</mark>.</p>
`,
        css: ""
      }
    }
  ]
});
