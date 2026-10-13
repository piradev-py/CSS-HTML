/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-14 (última del mundo)
   Variables CSS — propiedades personalizadas --nombre, var(),
   :root («el selector de toda la página») y valor de reserva.
   Nota: el reto es el «jefe final» del Mundo CSS (variables +
   Flexbox + caja y bordes). Para comprobar que el alumno usa
   var() de verdad, las pruebas cambian la variable en <html>
   con style.setProperty, miden el color y lo dejan como estaba.
   ============================================================ */
CURSO.registrar({
  id: "css-14",
  titulo: "Variables CSS",
  xp: 40,
  objetivo: "Sabrás guardar colores y medidas en variables con nombre y cambiar el aspecto de toda una página tocando una sola línea.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Guardar un valor con nombre",
      texto: "Imagina que tu web usa el mismo morado en 30 sitios y un día quieres cambiarlo por verde. ¿30 cambios? ¡Qué pereza! 😩\n\nLas **variables CSS** son como los contactos del móvil 📱: en vez de recordar un número, lo guardas con un nombre. Así:\n\n• Se **crean** con un nombre que empieza por **dos guiones**: `--color-principal: purple;`\n• Se **usan** con `var()`: `color: var(--color-principal);`\n\nLas guardamos en `:root`, que es **el selector de toda la página**: lo que pongas ahí lo pueden usar todos los elementos.",
      ejemplo: {
        html: `<h1>Mi grupo de rock</h1>
<button>¡Escúchanos!</button>`,
        css: `:root {
  --color-principal: purple;
}
h1 {
  color: var(--color-principal);
}
button {
  background-color: var(--color-principal);
  color: white;
}`
      },
      consejo: "Ojo con los nombres: `--color-principal` y `--Color-Principal` son variables **distintas** (aquí las mayúsculas cuentan). Usa minúsculas y guiones, como en las clases."
    },
    {
      tipo: "explicacion",
      titulo: "Un tema entero de un plumazo",
      texto: "La magia de verdad llega cuando toda la página saca sus colores de unas pocas variables. A ese conjunto de colores y estilos se le llama **tema**.\n\nEn el ejemplo, el borde de la tarjeta, el título y el botón salen de **dos** variables. Si mañana tu tienda cambia de colores, solo tocas esas dos líneas de `:root` y todo se actualiza solo. ✨\n\nY no solo sirven para colores: cualquier valor vale, por ejemplo una medida como `--radio: 12px`.",
      ejemplo: {
        html: `<div class="tarjeta">
  <h2>Zapatillas Saltarina</h2>
  <button>Comprar</button>
</div>`,
        css: `:root {
  --color-principal: teal;
  --color-boton: orange;
}
.tarjeta {
  border: 4px solid var(--color-principal);
  padding: 12px;
}
h2 {
  color: var(--color-principal);
}
button {
  background-color: var(--color-boton);
}`
      }
    },
    {
      tipo: "explicacion",
      titulo: "El plan B: valor de reserva",
      texto: "¿Y si usas una variable que **no existe** (porque la escribiste mal o se te olvidó crearla)? Entonces la propiedad no se aplica y el navegador la ignora, sin avisar.\n\nPara esos despistes, `var()` admite un **valor de reserva**: lo escribes después de una coma y se usa solo si la variable no existe. Como la rueda de repuesto del coche 🛞.\n\nEn el ejemplo, `--color-titulo` no está creada en ningún sitio, así que el título sale `crimson`. En cambio, `--fondo` sí existe, así que su reserva no se usa.",
      ejemplo: {
        html: `<h1>¡Bienvenido a bordo!</h1>
<p>Rumbo a la isla del tesoro.</p>`,
        css: `:root {
  --fondo: lightyellow;
}
h1 {
  color: var(--color-titulo, crimson);
}
body {
  background-color: var(--fondo, gray);
}`
      },
      consejo: "Si algo no cambia de color cuando esperas, revisa letra a letra el nombre de la variable en los dos sitios: crearla y usarla. ¡Un guion de menos y ya es otra!"
    },
    {
      tipo: "ejercicio",
      enunciado: "Dale color a tu pastelería con una variable 🧁.\n\n• En el selector `:root`, crea la variable `--color-principal` con el valor `hotpink`.\n• Al selector `h1` ponle `color` con el valor `var(--color-principal)`.\n• Al selector `.oferta` ponle `background-color` con el valor `var(--color-principal)`.\n\nEl HTML ya está escrito: tú solo escribes el CSS.",
      cssBase: `body { font-family: sans-serif; }
.oferta { padding: 10px 14px; border-radius: 8px; font-weight: bold; }`,
      inicial: {
        html: `<h1>Pastelería Dulce Nube</h1>
<p class="oferta">¡Hoy, magdalenas a mitad de precio!</p>
`,
        css: ""
      },
      solucion: {
        html: `<h1>Pastelería Dulce Nube</h1>
<p class="oferta">¡Hoy, magdalenas a mitad de precio!</p>
`,
        css: `:root {
  --color-principal: hotpink;
}
h1 {
  color: var(--color-principal);
}
.oferta {
  background-color: var(--color-principal);
}
`
      },
      pistas: [
        "Necesitas tres reglas: :root crea la variable (nombre con dos guiones, dos puntos y el valor) y las otras dos la usan escribiendo var(--color-principal) como valor.",
        "Debe quedarte así:\n:root {\n  --color-principal: hotpink;\n}\nh1 {\n  color: var(--color-principal);\n}\n.oferta {\n  background-color: var(--color-principal);\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "Toda la tarjeta saca sus colores y sus esquinas de tres variables. Cambia solo las variables de `:root` y mira cómo se transforma todo de golpe.",
      html: `<div class="tarjeta">
  <h2>Los Rayos FC ⚡</h2>
  <p>Próximo partido: sábado</p>
  <button>Comprar entradas</button>
</div>`,
      cssBase: `body { font-family: sans-serif; }
.tarjeta { border: 4px solid var(--color-principal); border-radius: var(--radio); padding: 16px; }
h2 { color: var(--color-principal); margin: 0 0 8px; }
button { background-color: var(--color-boton); color: white; border: none; padding: 8px 16px; border-radius: var(--radio); font-size: 16px; }`,
      controles: [
        { selector: ":root", propiedad: "--color-principal", tipo: "color", valor: "#6a1b9a" },
        { selector: ":root", propiedad: "--color-boton", tipo: "color", valor: "#ff9800" },
        { selector: ":root", propiedad: "--radio", tipo: "rango", min: 0, max: 30, valor: 12, unidad: "px" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Escribes color: var(--azul, navy); pero en ningún sitio has creado la variable --azul. ¿De qué color sale el texto?",
      opciones: [
        "navy, el valor de reserva",
        "Azul, porque la variable se llama --azul",
        "Rojo, para avisarte del error"
      ],
      correcta: 0,
      explicacion: "Como --azul no existe, var() usa el valor que va después de la coma: navy. El nombre de una variable es solo eso, un nombre: no le da ningún color."
    },
    {
      tipo: "reto",
      enunciado: "🏆 **¡Jefe final del Mundo CSS!** Monta la web de tu equipo de fútbol ⚽ de forma que sus colores salgan de **dos variables**:\n\n1. En `:root`, crea `--color-equipo` (por ejemplo `purple`) y `--color-texto` (por ejemplo `white`).\n2. Cambia los colores fijos por variables: el `background-color` de `.cabecera` y el color del `border` de `.jugador` usan `var(--color-equipo)`; el `color` de `.cabecera` usa `var(--color-texto)`.\n3. Pon la `.cabecera` en fila con Flexbox y centra sus elementos en vertical.\n\nCuando funcione, cambia el valor de `--color-equipo` (prueba `teal`) y ¡mira cómo cambia todo el tema!",
      inicial: {
        html: `<header class="cabecera">
  <span class="escudo">⚽</span>
  <h1>Los Rayos FC</h1>
</header>

<div class="jugadores">
  <div class="jugador">🧤 Portera</div>
  <div class="jugador">🛡️ Defensa</div>
  <div class="jugador">🎯 Delantero</div>
</div>
`,
        css: `/* 1. Crea aquí las variables --color-equipo y --color-texto */
:root {

}

.cabecera {
  /* 3. En fila con flex y centrado en vertical */
  gap: 12px;
  padding: 12px;
  background-color: purple; /* 2. Usa var(--color-equipo) */
  color: white;             /* 2. Usa var(--color-texto) */
  border-radius: 12px;
}

.cabecera h1 {
  margin: 0;
  font-size: 24px;
}

.escudo {
  font-size: 36px;
}

.jugadores {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

.jugador {
  flex: 1;
  padding: 12px 4px;
  border: 3px solid purple; /* 2. Usa var(--color-equipo) */
  border-radius: 8px;
  text-align: center;
}
`
      },
      comprobaciones: [
        {
          texto: "En `:root` existen las variables --color-equipo y --color-texto",
          prueba: (doc, win) => {
            const cs = win.getComputedStyle(doc.documentElement);
            return cs.getPropertyValue("--color-equipo").trim() !== ""
              && cs.getPropertyValue("--color-texto").trim() !== "";
          }
        },
        {
          texto: "El fondo de la cabecera y el borde de los jugadores salen de --color-equipo",
          prueba: (doc, win) => {
            const cab = doc.querySelector(".cabecera");
            const jug = doc.querySelector(".jugador");
            if (!cab || !jug) return false;
            const raiz = doc.documentElement;
            raiz.style.setProperty("--color-equipo", "rgb(1, 2, 3)");
            const ok = win.getComputedStyle(cab).backgroundColor === "rgb(1, 2, 3)"
              && win.getComputedStyle(jug).borderTopColor === "rgb(1, 2, 3)";
            raiz.style.removeProperty("--color-equipo");
            return ok;
          }
        },
        {
          texto: "El color del texto de la cabecera sale de --color-texto",
          prueba: (doc, win) => {
            const cab = doc.querySelector(".cabecera");
            if (!cab) return false;
            const raiz = doc.documentElement;
            raiz.style.setProperty("--color-texto", "rgb(4, 5, 6)");
            const ok = win.getComputedStyle(cab).color === "rgb(4, 5, 6)";
            raiz.style.removeProperty("--color-texto");
            return ok;
          }
        },
        {
          texto: "La `.cabecera` es flex y centra sus elementos en vertical (align-items: center)",
          prueba: (doc, win) => {
            const cab = doc.querySelector(".cabecera");
            if (!cab) return false;
            const cs = win.getComputedStyle(cab);
            return cs.display === "flex" && cs.alignItems === "center";
          }
        }
      ],
      pistas: [
        "Las variables se crean dentro de :root con dos guiones (--color-equipo: purple;) y se usan con var(--color-equipo) en lugar del color fijo. Para la cabecera necesitas display y align-items.",
        "En :root escribe:\n  --color-equipo: purple;\n  --color-texto: white;\nEn .cabecera añade display: flex; y align-items: center; y cambia purple por var(--color-equipo) y white por var(--color-texto). En .jugador el borde queda: border: 3px solid var(--color-equipo);"
      ],
      solucion: {
        html: `<header class="cabecera">
  <span class="escudo">⚽</span>
  <h1>Los Rayos FC</h1>
</header>

<div class="jugadores">
  <div class="jugador">🧤 Portera</div>
  <div class="jugador">🛡️ Defensa</div>
  <div class="jugador">🎯 Delantero</div>
</div>
`,
        css: `:root {
  --color-equipo: purple;
  --color-texto: white;
}

.cabecera {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: var(--color-equipo);
  color: var(--color-texto);
  border-radius: 12px;
}

.cabecera h1 {
  margin: 0;
  font-size: 24px;
}

.escudo {
  font-size: 36px;
}

.jugadores {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

.jugador {
  flex: 1;
  padding: 12px 4px;
  border: 3px solid var(--color-equipo);
  border-radius: 8px;
  text-align: center;
}
`
      }
    }
  ]
});
