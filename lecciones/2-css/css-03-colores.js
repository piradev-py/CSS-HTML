/* ============================================================
   <CSS-HTML> · Mundo CSS · Lección css-03
   Colores — color y background-color con nombres, hexadecimal
   #rrggbb y rgb(); transparencia con rgb(… / 0.5) y opacity.
   Nota: se enseña la sintaxis moderna de rgb() con espacios, que
   es la que admite la barra de transparencia. Las comprobaciones
   comparan contra getComputedStyle (siempre "rgb(r, g, b)").
   ============================================================ */
CURSO.registrar({
  id: "css-03",
  titulo: "Colores",
  xp: 30,
  objetivo: "Sabrás escribir colores de varias formas (nombre, hexadecimal y rgb) y usarlos con transparencia en textos y fondos.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Colores en hexadecimal",
      texto: "Ya conoces `color` (la letra) y `background-color` (el fondo), y los colores con nombre, como `tomato`. Pero 140 nombres se quedan cortos… ¡la pantalla puede mostrar millones de colores!\n\nLa forma más usada es el **hexadecimal**: una `#` y seis caracteres, en tres parejas: **rojo**, **verde** y **azul** (`#RRGGBB`).\n\nCada pareja va de `00` (nada de ese color) a `ff` (a tope). Se cuenta del 0 al 9 y luego de la `a` a la `f`.\n\n• `#ff0000` → rojo a tope, nada más: **rojo**.\n• `#000000` → nada de nada: **negro**.\n• `#ffffff` → todo a tope: **blanco**.",
      ejemplo: {
        html: `<p class="tomate">Tomate: #ff6347</p>
<p class="menta">Menta: #98ff98</p>
<p class="uva">Uva: #b39ddb</p>`,
        css: `.tomate {
  background-color: #ff6347;
}
.menta {
  background-color: #98ff98;
}
.uva {
  background-color: #b39ddb;
}`
      },
      consejo: "Nadie se aprende los códigos de memoria 😅. Los diseñadores los copian de un selector de colores (en un momento jugarás con uno) y los pegan en el CSS."
    },
    {
      tipo: "explicacion",
      titulo: "rgb(): mezcla de luces",
      texto: "Otra forma de escribir lo mismo es `rgb(rojo verde azul)`, con tres números del **0** al **255** separados por espacios.\n\nImagina tres linternas de colores apuntando a la misma pared 🔦: cuanto más alto el número, más fuerte brilla esa linterna.\n\n• `rgb(255 0 0)` → solo la roja: **rojo**.\n• `rgb(255 255 0)` → roja + verde: ¡**amarillo**! Con luces, la mezcla funciona así.\n• `rgb(0 0 0)` → todas apagadas: **negro**.\n\nEl hexadecimal y el rgb son el mismo color escrito de dos formas: `ff` vale lo mismo que `255`.",
      ejemplo: {
        html: `<p class="limon">Limón: rgb(255 230 0)</p>
<p class="cielo">Cielo: rgb(135 206 235)</p>`,
        css: `.limon {
  background-color: rgb(255 230 0);
}
.cielo {
  background-color: rgb(135 206 235);
}`
      },
      consejo: "En código de otras personas verás los números separados por comas: `rgb(255, 230, 0)`. También vale y significa exactamente lo mismo."
    },
    {
      tipo: "explicacion",
      titulo: "Transparencia: la barra y opacity",
      texto: "Hay dos formas de hacer algo semitransparente, como un cristal de colores:\n\n• Dentro de `rgb()`, añade una **barra** `/` y un número del **0** (invisible) al **1** (opaco): `rgb(255 0 0 / 0.5)` es un rojo al 50 %. Solo ese **color** se vuelve transparente.\n• La propiedad `opacity` (opacidad) vuelve transparente **el elemento entero**: fondo, letras… ¡todo!\n\nEn el ejemplo, las dos cajas son rojas al 50 % sobre un fondo dorado. Fíjate en las letras: en la primera se leen perfectas; en la segunda, se ven desvaídas. 👻",
      ejemplo: {
        html: `<div class="fondo">
  <p class="medio">Fondo al 50 %</p>
  <p class="fantasma">Todo al 50 %</p>
</div>`,
        css: `.fondo {
  background-color: gold;
}
.medio {
  background-color: rgb(255 0 0 / 0.5);
}
.fantasma {
  background-color: red;
  opacity: 0.5;
}`
      },
      consejo: "`opacity: 0` hace un elemento invisible… ¡pero sigue ahí ocupando su sitio! Es como un fantasma sentado en una silla."
    },
    {
      tipo: "explicacion",
      titulo: "Contraste: que se lea",
      texto: "Un color precioso no sirve de nada si el texto **no se lee**. El **contraste** mide cuánto se distingue el texto de su fondo, con un número: de 1 (iguales, invisible) a 21 (negro sobre blanco).\n\nLa regla que usan las webs profesionales (se llama **AA**):\n\n• Texto normal: contraste de **4,5** o más.\n• Texto grande (títulos): **3** o más.\n\nEn el ejemplo, el gris clarito sobre blanco no llega a 2: mucha gente no lo leería. El gris oscuro pasa de 10. 👓\n\nPara medirlo, abre las **herramientas del navegador** (tecla F12), elige un texto y mira su color: el navegador te dice el contraste y si cumple AA.",
      ejemplo: {
        html: `<p class="flojo">Gris clarito: casi no se lee.</p>
<p class="bueno">Gris oscuro: se lee perfectamente.</p>`,
        css: `.flojo {
  color: #cccccc;
}
.bueno {
  color: #444444;
}`
      },
      consejo: "Y una regla de oro: el color **nunca** debe ser la única pista. Si un campo con error se pone en rojo, añade también un mensaje: hay personas que no distinguen el rojo del verde."
    },
    {
      tipo: "ejercicio",
      enunciado: "El HTML ya está escrito. Escribe en la pestaña **CSS**:\n\n1. Al `body`, un `background-color` de `#fff3e0` (en hexadecimal).\n2. Al `h1`, un `color` de `rgb(214 51 132)`.\n\n¡Una heladería con mucho estilo! 🍨",
      inicial: {
        html: `<h1>Heladería Polo Norte</h1>
<p>Helados artesanos desde 1987.</p>
`,
        css: ""
      },
      pistas: [
        "Necesitas dos reglas: una para body con background-color y otra para h1 con color. Copia los valores tal cual, con la # y con los paréntesis.",
        "Debe quedarte así:\nbody {\n  background-color: #fff3e0;\n}\nh1 {\n  color: rgb(214 51 132);\n}"
      ],
      solucion: {
        html: `<h1>Heladería Polo Norte</h1>
<p>Helados artesanos desde 1987.</p>
`,
        css: `body {
  background-color: #fff3e0;
}
h1 {
  color: rgb(214 51 132);
}
`
      }
    },
    {
      tipo: "controles",
      instruccion: "Juega con los selectores de color de la tarjeta 🎨 y mira cómo cambian los códigos hexadecimales en el CSS. Después, baja la `opacity` y fíjate en que **toda** la tarjeta (fondo y letras) se vuelve transparente.",
      html: `<div class="tarjeta">
  <h2>Helado de pistacho</h2>
  <p>Cremoso, verde y muy serio.</p>
</div>`,
      controles: [
        { selector: ".tarjeta", propiedad: "background-color", tipo: "color", valor: "#c5e1a5" },
        { selector: "h2", propiedad: "color", tipo: "color", valor: "#2e7d32" },
        { selector: ".tarjeta", propiedad: "opacity", tipo: "rango", min: 0, max: 1, paso: 0.1, valor: 1 }
      ]
    },
    {
      tipo: "quiz",
      pregunta: "Quieres que el fondo de una tarjeta sea semitransparente, pero que su texto se siga leyendo perfecto. ¿Qué escribes?",
      opciones: [
        "opacity: 0.5;",
        "background-color: rgb(255 255 255 / 0.5);",
        "color: transparent;"
      ],
      correcta: 1,
      explicacion: "Con la barra dentro de rgb() solo el color de fondo se vuelve transparente. opacity afectaría a toda la tarjeta, letras incluidas, y color: transparent haría invisibles las letras."
    },
    {
      tipo: "reto",
      enunciado: "Pinta la carta de la heladería 🍦. El HTML ya está hecho. En la pestaña **CSS**:\n\n1. Pon un color de fondo a la carta (`.carta`). Prueba en hexadecimal, por ejemplo `#fde2e4`.\n2. Pon un color de letra (que no sea negro) al título `h1`. Prueba con `rgb()`.\n3. El pistacho está agotado: haz que el sabor `.agotado` se vea **semitransparente**, por ejemplo con `opacity: 0.4`.",
      pestana: "css",
      inicial: {
        html: `<div class="carta">
  <h1>Heladería Polo Norte</h1>
  <ul>
    <li>Fresa</li>
    <li>Chocolate</li>
    <li class="agotado">Pistacho (¡agotado!)</li>
  </ul>
</div>
`,
        css: `/* 1. Un color de fondo para .carta */

/* 2. Un color de letra para el h1 */

/* 3. Haz semitransparente el sabor .agotado */
`
      },
      comprobaciones: [
        {
          texto: "La carta (.carta) tiene un color de fondo",
          prueba: (doc, win) => {
            const carta = doc.querySelector(".carta");
            return !!carta && win.getComputedStyle(carta).backgroundColor !== "rgba(0, 0, 0, 0)";
          }
        },
        {
          texto: "El título <h1> tiene un color de letra que no es negro",
          prueba: (doc, win) => {
            const h1 = doc.querySelector("h1");
            return !!h1 && win.getComputedStyle(h1).color !== "rgb(0, 0, 0)";
          }
        },
        {
          texto: "El sabor agotado (.agotado) se ve semitransparente, pero no invisible",
          prueba: (doc, win) => {
            const li = doc.querySelector(".agotado");
            if (!li) return false;
            const estilo = win.getComputedStyle(li);
            const opacidad = parseFloat(estilo.opacity);
            const alfa = (estilo.color.match(/^rgba\(.*,\s*([\d.]+)\)$/) || [])[1];
            return (opacidad > 0 && opacidad < 1) || (alfa !== undefined && parseFloat(alfa) > 0 && parseFloat(alfa) < 1);
          }
        }
      ],
      pistas: [
        "Necesitas tres reglas: .carta con background-color, h1 con color y .agotado con opacity (un número entre 0 y 1).",
        "Debe quedarte algo así:\n.carta {\n  background-color: #fde2e4;\n}\nh1 {\n  color: rgb(200 30 90);\n}\n.agotado {\n  opacity: 0.4;\n}"
      ],
      solucion: {
        html: `<div class="carta">
  <h1>Heladería Polo Norte</h1>
  <ul>
    <li>Fresa</li>
    <li>Chocolate</li>
    <li class="agotado">Pistacho (¡agotado!)</li>
  </ul>
</div>
`,
        css: `.carta {
  background-color: #fde2e4;
}
h1 {
  color: rgb(200 30 90);
}
.agotado {
  opacity: 0.4;
}
`
      }
    }
  ]
});
