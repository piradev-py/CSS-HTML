/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-05
   La cascada: ¿quién gana? — orden (la última gana),
   especificidad (etiqueta < clase < id), herencia y por qué
   evitar !important.
   Nota: el reto comprueba que no se usa !important quitando antes
   los comentarios del CSS (el inicial lo menciona en un comentario).
   ============================================================ */
CURSO.registrar({
  id: "css-05",
  titulo: "La cascada: ¿quién gana?",
  xp: 40,
  objetivo: "Entenderás por qué a veces un estilo «no se aplica» y sabrás arreglarlo: orden, especificidad y herencia.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Empate: gana la última",
      texto: "¿Qué pasa si dos reglas le dan a la vez un valor distinto a la **misma propiedad** del **mismo elemento**? ¡Pelea! 🥊\n\nSi los selectores son igual de fuertes, gana la regla que está **más abajo**. El CSS se lee de arriba a abajo, como el agua que cae por una **cascada**, y lo último que cae es lo que se queda. ¡Por eso se llama así!\n\nEn el ejemplo, los dos selectores son `p`. La segunda regla dice `red`… y el párrafo sale rojo.",
      ejemplo: {
        html: `<p>¿De qué color soy?</p>`,
        css: `p {
  color: blue;
  background-color: lightyellow;
}
p {
  color: red;
}`
      },
      consejo: "Solo pelean las propiedades **repetidas**. El fondo amarillo de la primera regla no tiene rival, así que se aplica igual. ¡Las reglas se suman!"
    },
    {
      tipo: "explicacion",
      titulo: "Especificidad: gana el más concreto",
      texto: "Si los selectores **no** son igual de fuertes, el orden da igual: gana el **más concreto**. A eso se le llama **especificidad**.\n\nImagina a la profe dando órdenes: «Todos: camiseta gris». «Los del equipo de baloncesto: naranja». «Lucía: roja». ¿Qué se pone Lucía? ¡La roja, porque esa orden es **solo para ella**!\n\nLa fuerza de los selectores:\n\n**etiqueta** (`p`) < **clase** (`.aviso`) < **id** (`#urgente`)\n\nEn el ejemplo la regla de `p` va la última… y aun así pierde contra la clase y el id.",
      ejemplo: {
        html: `<p>Soy un párrafo normal.</p>
<p class="aviso">Tengo una clase.</p>
<p class="aviso" id="urgente">Tengo clase e id.</p>`,
        css: `#urgente {
  background-color: tomato;
}
.aviso {
  background-color: orange;
}
p {
  background-color: lightgray;
}`
      },
      consejo: "Existe un comodín, `!important` (`color: red !important;`), que gana a casi todo. Es como gritar en clase: funciona una vez, pero luego todo el mundo grita y nadie se entiende. Mejor usa un selector más concreto."
    },
    {
      tipo: "explicacion",
      titulo: "Herencia: de tal palo, tal astilla",
      texto: "Algunas propiedades **se heredan**: si se las pones a una caja, los elementos de dentro también las reciben, como los hijos heredan los ojos de su madre. 👀\n\nSe heredan casi todas las de **texto**: `color`, `font-family`, `font-size`, `line-height`… Otras, como `background-color`, **no** se heredan.\n\nOjo: lo heredado es lo **más débil** de todo. Si un elemento tiene una regla propia, aunque sea un simple `.rebelde`, esa regla manda sobre lo que herede, ¡aunque el padre use un id!",
      ejemplo: {
        html: `<div id="caja">
  <h2>Herencia de la abuela</h2>
  <p>Este párrafo hereda el color.</p>
  <p class="rebelde">Este tiene su propia regla.</p>
</div>`,
        css: `#caja {
  color: purple;
  font-family: monospace;
}
.rebelde {
  color: green;
}`
      },
      consejo: "Por eso es muy práctico poner la fuente en el `body`: todos los textos de la página la heredan y solo la escribes una vez."
    },
    {
      tipo: "ejercicio",
      enunciado: "El HTML ya está escrito. Escribe en la pestaña **CSS** estas tres reglas, **en este orden**:\n\n1. Al id `#hoy`, `color: crimson;`\n2. A la clase `.extra`, `color: orange;`\n3. Al `body`, `color: gray;`\n\nDespués mira el resultado: el `body` va el último, pero solo el primer párrafo hereda su gris. ¡La herencia y la especificidad en acción! 🕹️",
      inicial: {
        html: `<p>Turno de mañana</p>
<p class="extra">Turno de tarde</p>
<p class="extra" id="hoy">Turno de noche</p>
`,
        css: ""
      },
      pistas: [
        "Tres reglas, cada una con su selector: #hoy (almohadilla), .extra (punto) y body (sin nada). Dentro de cada una, solo la propiedad color.",
        "Debe quedarte así:\n#hoy {\n  color: crimson;\n}\n.extra {\n  color: orange;\n}\nbody {\n  color: gray;\n}"
      ],
      solucion: {
        html: `<p>Turno de mañana</p>
<p class="extra">Turno de tarde</p>
<p class="extra" id="hoy">Turno de noche</p>
`,
        css: `#hoy {
  color: crimson;
}
.extra {
  color: orange;
}
body {
  color: gray;
}
`
      }
    },
    {
      tipo: "quiz",
      pregunta: "Un botón tiene `class=\"boton\"` e `id=\"comprar\"`. El CSS dice primero `#comprar { color: red; }` y después `.boton { color: blue; }`. ¿De qué color sale el texto?",
      opciones: [
        "Azul, porque esa regla va la última",
        "Rojo, porque el id es más concreto que la clase",
        "Negro, porque las dos reglas se anulan"
      ],
      correcta: 1,
      explicacion: "El orden solo decide cuando hay empate de fuerza. Aquí no lo hay: un id gana siempre a una clase, vaya donde vaya."
    },
    {
      tipo: "reto",
      enunciado: "🕵️ **Detective del CSS.** En la tienda de calcetines, el botón **Comprar** debería ser verde (`green`)… pero sigue gris. Otra regla le está ganando.\n\n1. Descubre por qué pierde la regla `.comprar`.\n2. Arréglalo **sin usar** `!important` y **sin borrar** la regla de la tienda: el botón **Ver más** debe seguir gris y las letras de los botones, blancas.",
      pestana: "css",
      inicial: {
        html: `<h1>Calcetines Locos</h1>
<div id="tienda">
  <p>Calcetines de unicornio: 5 €</p>
  <button class="comprar">Comprar</button>
  <button>Ver más</button>
</div>
`,
        css: `/* Estilo de los botones de la tienda (no lo borres) */
#tienda button {
  background-color: gray;
  color: white;
}

/* Queremos el botón Comprar en verde, pero sigue gris.
   ¿Por qué pierde esta regla? Arréglala sin !important. */
.comprar {
  background-color: green;
}
`
      },
      comprobaciones: [
        {
          texto: "El botón Comprar tiene el fondo verde (green)",
          prueba: (doc, win) => {
            const boton = doc.querySelector(".comprar");
            return !!boton && win.getComputedStyle(boton).backgroundColor === "rgb(0, 128, 0)";
          }
        },
        {
          texto: "El botón Ver más sigue con el fondo gris (gray)",
          prueba: (doc, win) => {
            const otro = doc.querySelector("#tienda button:not(.comprar)");
            return !!otro && win.getComputedStyle(otro).backgroundColor === "rgb(128, 128, 128)";
          }
        },
        {
          texto: "Las letras de los dos botones siguen siendo blancas",
          prueba: (doc, win) => {
            const botones = Array.from(doc.querySelectorAll("#tienda button"));
            return botones.length >= 2 && botones.every(b => win.getComputedStyle(b).color === "rgb(255, 255, 255)");
          }
        },
        {
          texto: "No has usado !important",
          prueba: (doc) => !Array.from(doc.querySelectorAll("style")).some(s =>
            /!\s*important/i.test((s.textContent || "").replace(/\/\*[\s\S]*?\*\//g, "")))
        }
      ],
      pistas: [
        "Compara la fuerza de los dos selectores: #tienda button lleva un id, y .comprar solo una clase. El id gana siempre, aunque la clase vaya después. Necesitas un selector más concreto para el botón Comprar.",
        "Pon el id delante de la clase, así tu selector también lleva id y, además, una clase:\n#tienda .comprar {\n  background-color: green;\n}"
      ],
      solucion: {
        html: `<h1>Calcetines Locos</h1>
<div id="tienda">
  <p>Calcetines de unicornio: 5 €</p>
  <button class="comprar">Comprar</button>
  <button>Ver más</button>
</div>
`,
        css: `/* Estilo de los botones de la tienda (no lo borres) */
#tienda button {
  background-color: gray;
  color: white;
}

/* Ahora el selector lleva id + clase: es más concreto y gana */
#tienda .comprar {
  background-color: green;
}
`
      }
    }
  ]
});
