/* ============================================================
   <CSS-HTML> · Mundo HTML · Lección html-01
   ¿Qué es HTML? — página web, HTML y etiquetas.
   ============================================================ */
CURSO.registrar({
  id: "html-01",
  titulo: "¿Qué es HTML?",
  xp: 20,
  objetivo: "Entenderás qué es una página web, qué es HTML y cómo se escribe una etiqueta.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "¿Qué es una página web?",
      texto: "Cada vez que entras en una web (un buscador, un videojuego online, la carta de una pizzería…), tu **navegador** —el programa con el que visitas internet, como Chrome o Firefox— recibe un archivo de **texto** y lo convierte en lo que ves en pantalla.\n\nEse texto está escrito en un idioma especial que el navegador entiende: **HTML**.\n\n¡Y tú vas a aprender a escribirlo! 🎉",
      consejo: "¡Hola! Soy **Tagui**, tu compañera de viaje. Aquí nadie nace sabiendo: equivocarse es parte del juego, así que prueba sin miedo."
    },
    {
      tipo: "explicacion",
      titulo: "¿Qué es HTML?",
      texto: "HTML sirve para **marcar** qué es cada trozo de texto: «esto es un título», «esto es un párrafo», «esto es una imagen»…\n\nEs como poner **etiquetas** a las cajas de una mudanza 📦: «libros», «cocina», «frágil». Sin etiquetas, el navegador solo vería un montón de letras sin orden.\n\nMira el ejemplo: el navegador sabe que la primera línea es un **título** (por eso la pinta grande) y la segunda, un **párrafo**.",
      ejemplo: {
        html: `<h1>Mi gato Bigotes</h1>
<p>Le encanta dormir encima del teclado.</p>`,
        css: ""
      },
      consejo: "HTML no es un lenguaje de programación: no hace cuentas ni toma decisiones. Solo **describe** el contenido. ¡Por eso es perfecto para empezar!"
    },
    {
      tipo: "explicacion",
      titulo: "¿Qué es una etiqueta?",
      texto: "Una **etiqueta** es una palabra clave entre los signos `<` y `>`. Casi siempre van en pareja:\n\n• `<p>` es la **etiqueta de apertura**: «aquí empieza un párrafo».\n• `</p>` es la **etiqueta de cierre**: lleva una barra `/` y dice «aquí termina».\n\nLo que queda en medio es el **contenido**. Todo junto (apertura + contenido + cierre) se llama **elemento**.",
      ejemplo: {
        html: `<p>Soy un párrafo muy feliz.</p>`,
        css: ""
      },
      consejo: "El despiste más famoso del mundo: olvidar la barra `/` en la etiqueta de cierre. ¡Que no te pase a ti!"
    },
    {
      tipo: "pruebalo",
      instruccion: "Este es tu primer código. Cambia los textos que hay **entre** las etiquetas y mira cómo cambia el resultado. ¿Te atreves a añadir otra línea con `<p>` y `</p>`?",
      inicial: {
        html: `<h1>¡Hola, mundo!</h1>
<p>Esta es mi primera página web.</p>
`,
        css: "",
        js: ""
      }
    },
    {
      tipo: "quiz",
      pregunta: "¿Cuál es la etiqueta de cierre de un párrafo?",
      opciones: ["<p>", "</p>", "<cierre>"],
      correcta: 1,
      explicacion: "La etiqueta de cierre es igual que la de apertura, pero con una barra / delante del nombre: </p>."
    },
    {
      tipo: "reto",
      enunciado: "Convierte esta frase en un párrafo: escribe la etiqueta de apertura `<p>` justo antes de la frase y la de cierre `</p>` justo después.",
      inicial: {
        html: `Me encanta la pizza 🍕
`,
        css: ""
      },
      comprobaciones: [
        {
          texto: "Hay un párrafo <p>",
          prueba: (doc) => !!doc.querySelector("p")
        },
        {
          texto: "La frase está dentro del párrafo",
          prueba: (doc) => (doc.querySelector("p")?.textContent.trim().length || 0) > 0
        }
      ],
      pistas: [
        "Las etiquetas rodean el texto como el pan de un bocadillo 🥪 rodea al relleno: una delante y otra detrás.",
        "Debe quedarte así: <p>Me encanta la pizza 🍕</p>"
      ],
      solucion: {
        html: `<p>Me encanta la pizza 🍕</p>
`,
        css: ""
      }
    }
  ]
});
