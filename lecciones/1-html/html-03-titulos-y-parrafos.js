/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-03
   Títulos y párrafos — <h1>…<h6>, jerarquía y <p>.
   ============================================================ */
CURSO.registrar({
  id: "html-03",
  titulo: "Títulos y párrafos",
  xp: 30,
  objetivo: "Sabrás usar <h1>…<h6> y <p> para ordenar un texto.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Seis niveles de títulos",
      texto: "HTML tiene seis etiquetas de título: de `<h1>` a `<h6>`. La «h» viene de «heading», que significa «encabezado» en inglés.\n\nPiensa en un periódico 📰:\n\n• `<h1>` es el titular de la portada.\n• `<h2>` es el título de cada sección.\n• `<h3>` es el de un apartado dentro de una sección…\n\n…y así hasta `<h6>`, el más humilde de todos.",
      ejemplo: {
        html: `<h1>Noticias del Bosque</h1>
<h2>Deportes</h2>
<h3>La ardilla gana la carrera de saltos</h3>
<h4>Declaraciones de la tortuga</h4>`,
        css: ""
      }
    },
    {
      tipo: "explicacion",
      titulo: "Un solo <h1> y sin saltar escalones",
      texto: "Dos reglas para usar bien los títulos:\n\n1. **Un solo `<h1>` por página**: es el tema principal, como el título de un libro.\n2. **No te saltes niveles**: después de un `<h2>` viene un `<h3>`, no un `<h5>`.\n\n¿Por qué importa? Los buscadores y los **lectores de pantalla** (programas que leen la web en voz alta a personas ciegas) usan los títulos como un índice para moverse por la página.",
      ejemplo: {
        html: `<h1>Recetas de la abuela</h1>
<h2>Dulces</h2>
<h3>Galletas de canela</h3>
<h2>Saladas</h2>
<h3>Croquetas</h3>`,
        css: ""
      },
      consejo: "No elijas un título por su tamaño, sino por su **importancia**. El tamaño lo cambiaremos a nuestro gusto con CSS en el Mundo 2. 🎨"
    },
    {
      tipo: "explicacion",
      titulo: "Párrafos y espacios",
      texto: "Cada `<p>` es un **párrafo**: un bloque de texto separado de los demás.\n\nOjo con algo curioso: HTML **ignora los espacios y saltos de línea de más**. Da igual que pulses Enter diez veces o que metas veinte espacios: el navegador los junta en uno solo.\n\n¿Quieres separar dos ideas? Usa otro `<p>`.",
      ejemplo: {
        html: `<p>Hola.        Estos espacios
y este salto de línea
desaparecen.</p>
<p>Y este es otro párrafo distinto.</p>`,
        css: ""
      },
      consejo: "Ordenar un texto con buenos títulos y párrafos se llama **estructurar**. Es lo primero que hace un profesional, ¡antes incluso de pensar en colores!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Escribe tres títulos, uno debajo de otro, bajando un escalón cada vez (sin saltarte ninguno):\n\n1. Un `<h1>` que diga **Guía del espacio**.\n2. Un `<h2>` que diga **Planetas**.\n3. Un `<h3>` que diga **Marte, el planeta rojo**.\n\nSolo esos tres títulos: sin párrafos. 🚀",
      pistas: [
        "Cada nivel tiene su número: el más importante es <h1>, después <h2> y después <h3>. Cada uno se cierra con su misma etiqueta y una barra: <h2>…</h2>.",
        "Escribe <h1>Guía del espacio</h1> en la primera línea. Debajo, el <h2> con «Planetas» y, por último, el <h3> con «Marte, el planeta rojo»."
      ],
      solucion: {
        html: `<h1>Guía del espacio</h1>
<h2>Planetas</h2>
<h3>Marte, el planeta rojo</h3>
`,
        css: ""
      }
    },
    {
      tipo: "quiz",
      pregunta: "Tu página ya tiene un <h1>. ¿Qué etiqueta usarías para el título de una sección?",
      opciones: ["Otro <h1>", "<h2>", "<h6>, porque se ve más pequeñito"],
      correcta: 1,
      explicacion: "Las secciones van con <h2>. Solo debe haber un <h1>, y el nivel se elige por importancia, no por tamaño."
    },
    {
      tipo: "reto",
      enunciado: "Crea la ficha de tu videojuego favorito 🎮:\n\n• Un `<h1>` con el nombre del juego.\n• Debajo, dos secciones. Cada una con un título `<h2>` (por ejemplo, «Por qué me gusta» y «Mi récord») y un párrafo `<p>` debajo.",
      inicial: {
        html: `<!-- 1. Un h1 con el nombre de tu videojuego favorito -->

<!-- 2. Un h2 «Por qué me gusta» y un párrafo debajo -->

<!-- 3. Un h2 «Mi récord» y otro párrafo debajo -->
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "Hay un solo <h1> y tiene texto",
          prueba: (doc) => {
            const h1s = doc.querySelectorAll("h1");
            return h1s.length === 1 && h1s[0].textContent.trim().length > 0;
          }
        },
        {
          texto: "Hay al menos dos títulos <h2> con texto",
          prueba: (doc) => Array.from(doc.querySelectorAll("h2"))
            .filter(h => h.textContent.trim().length > 0).length >= 2
        },
        {
          texto: "Hay al menos dos párrafos <p> con texto",
          prueba: (doc) => Array.from(doc.querySelectorAll("p"))
            .filter(p => p.textContent.trim().length > 0).length >= 2
        },
        {
          texto: "El <h1> va antes que los <h2>",
          prueba: (doc) => doc.querySelector("h1, h2")?.tagName === "H1"
        }
      ],
      pistas: [
        "Empieza por el <h1> arriba del todo. Después, cada sección es un <h2> seguido de un <p>.",
        "La estructura es:\n<h1>Nombre del juego</h1>\n<h2>Por qué me gusta</h2>\n<p>…</p>\n<h2>Mi récord</h2>\n<p>…</p>"
      ],
      solucion: {
        html: `<h1>Super Pato Kart</h1>

<h2>Por qué me gusta</h2>
<p>Puedo lanzar plátanos a mis amigos y seguir siendo amigos.</p>

<h2>Mi récord</h2>
<p>Quedé primero en la Copa Charco… una vez. 🏆</p>
`,
        css: ""
      }
    }
  ]
});
