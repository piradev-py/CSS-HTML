/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-12
   Flexbox (II): repartir el espacio — flex-wrap, flex-grow,
   flex-shrink, flex-basis, la abreviatura flex: 1 y align-self.
   Nota: el reto se comprueba en un iframe de 800px de ancho; las
   pruebas miden tamaños con getBoundingClientRect, no el texto CSS.
   ============================================================ */
CURSO.registrar({
  id: "css-12",
  titulo: "Flexbox (II): repartir el espacio",
  xp: 45,
  objetivo: "Sabrás decidir qué elementos flex crecen, cuáles encogen y cómo saltan de línea cuando no caben.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Cuando no caben: flex-wrap",
      texto: "Por defecto, un contenedor flex mete a **todos** sus hijos en **una sola línea**, aunque no quepan. ¿Cómo lo consigue? Los **encoge**, como un jersey en la lavadora 🧺. Eso lo controla `flex-shrink` (encoger): vale `1` por defecto, y con `flex-shrink: 0` el elemento se niega a encoger.\n\nSi prefieres que salten a la línea de abajo, como las palabras de un párrafo, ponle al contenedor `flex-wrap: wrap` (envolver).\n\nEn el ejemplo, cada caja mide 100 px: las que no caben bajan a la siguiente fila.",
      ejemplo: {
        html: `<div class="fila">
  <div class="caja">1</div>
  <div class="caja">2</div>
  <div class="caja">3</div>
  <div class="caja">4</div>
  <div class="caja">5</div>
  <div class="caja">6</div>
</div>`,
        css: `.fila {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.caja {
  width: 100px;
  background-color: tomato;
  color: white;
  padding: 10px 0;
  text-align: center;
}`
      },
      consejo: "El valor por defecto es `flex-wrap: nowrap` (no envolver). Si ves elementos flex aplastados o saliéndose de la pantalla, ¡casi seguro te falta un `wrap`!"
    },
    {
      tipo: "explicacion",
      titulo: "Repartir lo que sobra: flex-grow y flex-basis",
      texto: "Ahora el caso contrario: **sobra** espacio en la fila. ¿Quién se lo queda?\n\n• `flex-basis` es el **tamaño de partida** del elemento en la dirección principal (en una fila, su ancho inicial).\n• `flex-grow` (crecer) dice **cuántas partes** del espacio sobrante se come. Por defecto es `0`: nadie crece.\n\nEs como repartir la pizza que sobra 🍕: con `flex-grow: 1` te llevas una porción; con `flex-grow: 2`, dos porciones.\n\nEn el ejemplo, todas empiezan midiendo 60 px; la 2 crece una parte y la 3, el doble.",
      ejemplo: {
        html: `<div class="fila">
  <div class="caja">1</div>
  <div class="caja dos">2</div>
  <div class="caja tres">3</div>
</div>`,
        css: `.fila {
  display: flex;
  gap: 10px;
}
.caja {
  flex-basis: 60px;
  background-color: tomato;
  color: white;
  padding: 10px 0;
  text-align: center;
}
.dos { flex-grow: 1; }
.tres { flex-grow: 2; }`
      }
    },
    {
      tipo: "explicacion",
      titulo: "El atajo flex: 1 y el rebelde align-self",
      texto: "Escribir tres propiedades cansa, así que existe la abreviatura `flex`. La más famosa es `flex: 1`, que significa «crece 1, encoge 1 y empieza desde 0». Resultado: **todos los que la llevan miden lo mismo** y se reparten la fila entera.\n\nY si un elemento quiere ir a su aire, usa `align-self` (alinearse a sí mismo): se salta el `align-items` del padre **solo para él**. Admite los mismos valores: `flex-start`, `center`, `flex-end`…\n\nEn el ejemplo, todas las cajas van arriba, menos la rebelde 😎.",
      ejemplo: {
        html: `<div class="fila">
  <div class="caja">1</div>
  <div class="caja rebelde">2</div>
  <div class="caja">3</div>
</div>`,
        css: `.fila {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  height: 120px;
  background-color: lavender;
}
.caja {
  flex: 1;
  background-color: tomato;
  color: white;
  padding: 10px 0;
  text-align: center;
}
.rebelde { align-self: flex-end; }`
      },
      consejo: "`flex: 1` es de las líneas de CSS que más vas a escribir en tu vida: columnas iguales, botones que llenan una barra, buscadores que ocupan todo el ancho… ¡Apúntatela!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Arregla la barra de tu app de la compra 🛒: el título debe ocupar todo el hueco entre los dos iconos.\n\n• Al selector `.barra` ponle `display` con el valor `flex`.\n• Al selector `.titulo` ponle `flex-grow` con el valor `1` y `text-align` con el valor `center`.\n\nEl HTML ya está escrito: tú solo escribes el CSS.",
      cssBase: `body { font-family: sans-serif; }
.barra { background-color: #333; color: white; padding: 8px; border-radius: 10px; font-size: 20px; }
.barra div { padding: 6px 10px; }
.titulo { background-color: tomato; border-radius: 6px; font-weight: bold; }`,
      inicial: {
        html: `<div class="barra">
  <div>🏠</div>
  <div class="titulo">Mi lista de la compra</div>
  <div>⚙️</div>
</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="barra">
  <div>🏠</div>
  <div class="titulo">Mi lista de la compra</div>
  <div>⚙️</div>
</div>
`,
        css: `.barra {
  display: flex;
}
.titulo {
  flex-grow: 1;
  text-align: center;
}
`
      },
      pistas: [
        "Necesitas dos reglas: una para el contenedor (.barra) y otra para el elemento que crece (.titulo).",
        "Debe quedarte así:\n.barra {\n  display: flex;\n}\n.titulo {\n  flex-grow: 1;\n  text-align: center;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "La caja lavanda ya tiene `display: flex`. Sube el `flex-basis` hasta que las cajas no quepan y prueba `wrap`. Luego haz crecer la caja 2 y manda la caja 3 a otro sitio con `align-self`.",
      html: `<div class="fila">
  <div class="caja">1</div>
  <div class="caja dos">2</div>
  <div class="caja tres">3</div>
  <div class="caja">4</div>
  <div class="caja">5</div>
</div>`,
      cssBase: `body { font-family: sans-serif; }
.fila { display: flex; align-items: flex-start; gap: 8px; min-height: 160px; background-color: lavender; }
.caja { background-color: tomato; color: white; padding: 8px 0; text-align: center; font-weight: bold; }
.dos { background-color: royalblue; }
.tres { background-color: seagreen; }`,
      controles: [
        { selector: ".fila", propiedad: "flex-wrap", tipo: "opciones", opciones: ["nowrap", "wrap"], valor: "nowrap" },
        { selector: ".caja", propiedad: "flex-basis", tipo: "rango", min: 40, max: 200, valor: 60, unidad: "px" },
        { selector: ".dos", propiedad: "flex-grow", tipo: "rango", min: 0, max: 3, valor: 0, unidad: "" },
        { selector: ".tres", propiedad: "align-self", tipo: "opciones", opciones: ["auto", "flex-start", "center", "flex-end"], valor: "auto" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Tienes 10 cartas en un contenedor flex y no caben: se ven todas aplastadas en una sola fila. ¿Qué lo arregla?",
      opciones: [
        "flex-wrap: wrap en el contenedor",
        "flex-grow: 1 en cada carta",
        "align-self: center en cada carta"
      ],
      correcta: 0,
      explicacion: "Con flex-wrap: wrap, las cartas que no caben saltan a la línea de abajo en vez de encogerse. flex-grow sirve para repartir el espacio que sobra (aquí falta), y align-self solo cambia la alineación de un elemento."
    },
    {
      tipo: "reto",
      enunciado: "Termina la página de tu colección de cartas mágicas 🃏:\n\n1. Haz que el campo de texto (`input`) del buscador **crezca** y ocupe todo el espacio sobrante, dejando el botón pegado a la derecha.\n2. Deja que las cartas de `.coleccion` **salten de línea** cuando no quepan, para que no se aplasten.",
      inicial: {
        html: `<div class="buscador">
  <label for="busqueda">Buscar:</label>
  <input type="text" id="busqueda">
  <button>Ir</button>
</div>

<div class="coleccion">
  <div class="carta">🐉 Dragón</div>
  <div class="carta">🧙 Mago</div>
  <div class="carta">🦄 Unicornio</div>
  <div class="carta">🤖 Robot</div>
  <div class="carta">👻 Fantasma</div>
  <div class="carta">🧜 Sirena</div>
</div>
`,
        css: `.buscador {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

input {
  /* 1. Que crezca y ocupe todo el espacio sobrante */
}

.coleccion {
  display: flex;
  gap: 10px;
  /* 2. Que las cartas salten de línea si no caben */
}

.carta {
  width: 150px;
  padding: 20px 10px;
  background-color: gold;
  border-radius: 8px;
  text-align: center;
}
`
      },
      comprobaciones: [
        {
          texto: "El campo de texto crece (flex-grow) y el botón queda pegado al borde derecho",
          prueba: (doc, win) => {
            const caja = doc.querySelector(".buscador");
            const campo = doc.querySelector(".buscador input");
            const boton = doc.querySelector(".buscador button");
            if (!caja || !campo || !boton) return false;
            const crece = parseFloat(win.getComputedStyle(campo).flexGrow) > 0;
            const pegado = Math.abs(boton.getBoundingClientRect().right - caja.getBoundingClientRect().right) < 2;
            return crece && pegado;
          }
        },
        {
          texto: "La `.coleccion` tiene flex-wrap: wrap",
          prueba: (doc, win) => {
            const c = doc.querySelector(".coleccion");
            return !!c && win.getComputedStyle(c).flexWrap === "wrap";
          }
        },
        {
          texto: "Ninguna carta se aplasta: todas miden al menos 150 px de ancho",
          prueba: (doc) => {
            const cartas = Array.from(doc.querySelectorAll(".coleccion .carta"));
            return cartas.length >= 6 && cartas.every(c => c.getBoundingClientRect().width >= 150);
          }
        }
      ],
      pistas: [
        "Para el campo de texto usa la propiedad que reparte el espacio sobrante (flex-grow, o el atajo flex). Para las cartas, la propiedad que deja saltar de línea va en el contenedor .coleccion.",
        "Escribe flex-grow: 1; dentro de input { … } y flex-wrap: wrap; dentro de .coleccion { … }."
      ],
      solucion: {
        html: `<div class="buscador">
  <label for="busqueda">Buscar:</label>
  <input type="text" id="busqueda">
  <button>Ir</button>
</div>

<div class="coleccion">
  <div class="carta">🐉 Dragón</div>
  <div class="carta">🧙 Mago</div>
  <div class="carta">🦄 Unicornio</div>
  <div class="carta">🤖 Robot</div>
  <div class="carta">👻 Fantasma</div>
  <div class="carta">🧜 Sirena</div>
</div>
`,
        css: `.buscador {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

input {
  flex-grow: 1;
}

.coleccion {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.carta {
  width: 150px;
  padding: 20px 10px;
  background-color: gold;
  border-radius: 8px;
  text-align: center;
}
`
      }
    }
  ]
});
