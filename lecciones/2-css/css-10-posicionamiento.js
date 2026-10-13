/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-10
   Posicionamiento — position (static, relative, absolute; fixed y
   sticky solo se mencionan), top/right/bottom/left, padre con
   relative y z-index.
   Nota: el reto comprueba la position calculada de la tarjeta y de la
   pegatina, y los valores calculados de top y right (10px). En un
   elemento static, top/right calculados valen "auto" (parseFloat → NaN),
   así que el código inicial falla.
   ============================================================ */
CURSO.registrar({
  id: "css-10",
  titulo: "Posicionamiento",
  xp: 45,
  objetivo: "Sabrás sacar elementos del flujo normal y colocarlos exactamente donde quieras con position.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "El flujo normal y position: relative",
      texto: "Normalmente las cajas se colocan **una detrás de otra**, como las palabras de un libro. Eso se llama **flujo normal**, y es lo que hace `position: static`, el valor de serie.\n\nCon `position: relative`, la caja se puede **mover desde su sitio** con `top`, `right`, `bottom` y `left`. Por ejemplo, `top: 10px` la empuja 10px desde arriba (o sea, hacia abajo) y `left: 40px`, 40px desde la izquierda.\n\nMira la caja 2: se ha movido, pero **su hueco sigue ahí**. Las demás actúan como si no se hubiera movido. 👻",
      ejemplo: {
        html: `<div class="caja">1</div>
<div class="caja movida">2</div>
<div class="caja">3</div>`,
        css: `.caja {
  width: 60px;
  padding: 10px;
  margin-bottom: 5px;
  background-color: lightblue;
}
.movida {
  position: relative;
  top: 10px;
  left: 40px;
  background-color: orange;
}`
      }
    },
    {
      tipo: "explicacion",
      titulo: "absolute: el imán de la nevera",
      texto: "`position: absolute` **saca la caja del flujo**: las demás se olvidan de ella y ocupan su sitio. Después, `top`, `right`, `bottom` y `left` la colocan respecto a su **padre posicionado**.\n\n¿Padre posicionado? Es el contenedor más cercano que tenga `position: relative` (o cualquier valor que no sea `static`).\n\nPiensa en un **imán en la nevera** 🧲: la nevera (`relative`) es la referencia, y el imán (`absolute`) se pega donde le digas. En el ejemplo, a 10px de abajo y 10px de la derecha.",
      ejemplo: {
        html: `<div class="nevera">
  Nevera de la cocina
  <span class="iman">🍕</span>
</div>`,
        css: `.nevera {
  position: relative;
  width: 200px;
  height: 120px;
  padding: 10px;
  background-color: lightgray;
  border-radius: 10px;
}
.iman {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 30px;
}`
      },
      consejo: "Si ningún padre tiene `position: relative`, el imán se pega… ¡a la página entera! Por eso `relative` en el padre y `absolute` en el hijo casi siempre van en pareja."
    },
    {
      tipo: "explicacion",
      titulo: "z-index, fixed y sticky",
      texto: "Cuando dos cajas posicionadas se **solapan**, `z-index` decide cuál va encima: gana el número **más alto**, como en una pila de cartas. 🃏 Solo funciona en cajas con un `position` distinto de `static`.\n\nY dos valores más de `position` que conviene conocer:\n\n• `fixed` (**fija**): se queda clavada en la pantalla aunque hagas *scroll* (desplazarte por la página), como el botón de chat de muchas webs.\n• `sticky` (**pegajosa**): se mueve normal hasta llegar al borde de la pantalla, y ahí se queda pegada. Ideal para menús.\n\nLos usarás más adelante, en proyectos de verdad.",
      ejemplo: {
        html: `<div class="carta roja">Roja: z-index 2</div>
<div class="carta azul">Azul: z-index 1</div>`,
        css: `.carta {
  position: absolute;
  width: 110px;
  height: 70px;
  padding: 10px;
  color: white;
}
.roja {
  top: 20px;
  left: 20px;
  z-index: 2;
  background-color: crimson;
}
.azul {
  top: 60px;
  left: 90px;
  z-index: 1;
  background-color: royalblue;
}`
      },
      consejo: "Cambia los números en tu cabeza: si la azul tuviera `z-index: 3`, pasaría por encima de la roja."
    },
    {
      tipo: "ejercicio",
      enunciado: "¡Prepara el despegue! 🚀 Mueve el cohete desde su sitio. A la clase `.cohete` ponle:\n\n• un `position` de `relative`,\n• un `top` de `20px`,\n• y un `left` de `50px`.",
      inicial: {
        html: `<div class="cohete">🚀 ¡Despegue!</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="cohete">🚀 ¡Despegue!</div>
`,
        css: `.cohete {
  position: relative;
  top: 20px;
  left: 50px;
}
`
      },
      pistas: [
        "Una sola regla con el selector .cohete. Sin position: relative, top y left no hacen nada.",
        "Debe quedarte así:\n.cohete {\n  position: relative;\n  top: 20px;\n  left: 50px;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "Coloca la pegatina con los deslizadores. Prueba los tres valores de `position` de la pegatina… y después quítale el `relative` a la tarjeta (ponle `static`) a ver adónde se escapa. 🏃",
      html: `<div class="tarjeta">
  <p>Zapatillas Turbo 3000</p>
  <span class="pegatina">¡NUEVO!</span>
</div>`,
      cssBase: "body { font-family: sans-serif; }\n.tarjeta { height: 120px; margin-top: 40px; padding: 10px; background-color: #e0f2fe; border: 2px solid #0284c7; border-radius: 12px; }\n.pegatina { padding: 4px 8px; color: white; background-color: crimson; border-radius: 6px; }",
      controles: [
        { selector: ".pegatina", propiedad: "position", tipo: "opciones", opciones: ["static", "relative", "absolute"], valor: "absolute" },
        { selector: ".pegatina", propiedad: "top", tipo: "rango", min: 0, max: 120, valor: 10, unidad: "px" },
        { selector: ".pegatina", propiedad: "left", tipo: "rango", min: 0, max: 250, valor: 10, unidad: "px" },
        { selector: ".tarjeta", propiedad: "position", tipo: "opciones", opciones: ["relative", "static"], valor: "relative" }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Quieres colocar una pegatina con position: absolute en la esquina de una tarjeta. ¿Qué tiene que llevar la tarjeta?",
      opciones: ["position: relative", "display: none", "z-index: 100"],
      correcta: 0,
      explicacion: "Un elemento absolute se coloca respecto a su padre posicionado. Con position: relative, la tarjeta se convierte en la referencia; sin ella, la pegatina se colocaría respecto a la página entera."
    },
    {
      tipo: "reto",
      enunciado: "¡Ha llegado un producto nuevo a la tienda! 🛹 Pon la pegatina **¡NUEVO!** en la esquina superior derecha de la tarjeta:\n\n1. Haz que `.producto` sea la referencia de la pegatina con `position: relative`.\n2. Saca `.pegatina` del flujo con `position: absolute`.\n3. Colócala con `top: 10px` y `right: 10px`.",
      pestana: "css",
      inicial: {
        html: `<div class="producto">
  <h2>Monopatín Volador</h2>
  <p>Flota a dos palmos del suelo. No apto para charcos.</p>
  <span class="pegatina">¡NUEVO!</span>
</div>
`,
        css: `.producto {
  width: 250px;
  padding: 20px;
  background-color: lavender;
  border-radius: 12px;
  /* 1. Conviértela en la referencia de la pegatina */
}

.pegatina {
  padding: 5px 10px;
  color: white;
  background-color: crimson;
  border-radius: 8px;
  /* 2. Sácala del flujo con position */
  /* 3. Colócala arriba a la derecha con top y right */
}
`
      },
      comprobaciones: [
        {
          texto: "La tarjeta .producto tiene position: relative",
          prueba: (doc, win) => {
            const el = doc.querySelector(".producto");
            return !!el && win.getComputedStyle(el).position === "relative";
          }
        },
        {
          texto: "La pegatina tiene position: absolute",
          prueba: (doc, win) => {
            const el = doc.querySelector(".pegatina");
            return !!el && win.getComputedStyle(el).position === "absolute";
          }
        },
        {
          texto: "La pegatina está a 10px del borde de arriba (top)",
          prueba: (doc, win) => {
            const el = doc.querySelector(".pegatina");
            if (!el) return false;
            return Math.abs(parseFloat(win.getComputedStyle(el).top) - 10) <= 0.5;
          }
        },
        {
          texto: "La pegatina está a 10px del borde derecho (right)",
          prueba: (doc, win) => {
            const el = doc.querySelector(".pegatina");
            if (!el) return false;
            return Math.abs(parseFloat(win.getComputedStyle(el).right) - 10) <= 0.5;
          }
        }
      ],
      pistas: [
        "La tarjeta lleva position: relative y la pegatina position: absolute. Después, top marca la distancia desde arriba y right, la distancia desde la derecha.",
        "Añade position: relative; dentro de .producto, y dentro de .pegatina:\nposition: absolute;\ntop: 10px;\nright: 10px;"
      ],
      solucion: {
        html: `<div class="producto">
  <h2>Monopatín Volador</h2>
  <p>Flota a dos palmos del suelo. No apto para charcos.</p>
  <span class="pegatina">¡NUEVO!</span>
</div>
`,
        css: `.producto {
  width: 250px;
  padding: 20px;
  background-color: lavender;
  border-radius: 12px;
  position: relative;
}

.pegatina {
  padding: 5px 10px;
  color: white;
  background-color: crimson;
  border-radius: 8px;
  position: absolute;
  top: 10px;
  right: 10px;
}
`
      }
    }
  ]
});
