/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-06
   Mobile first — diseñar primero para el móvil (CSS base sin media
   query) y ampliar con @media (min-width: …) en cascada, de menor a
   mayor; reorganizar con Flexbox/Grid según el tamaño (y order).
   Notas:
   - Pasos con resultado: dispositivos: true.
   - Ejercicio con puntos de corte 600 y 1000 px: el revisor compara a
     375 (1 col), 800 (2 col) y 1280 px (3 col), así que también
     detecta el orden equivocado de las media queries.
   - El reto mide posiciones con getBoundingClientRect en copias de la
     página a 375, 700 y 1280 px (PRUEBA.clonar) y en el marco normal
     (800 px). «Al lado» acepta la barra a la derecha o a la izquierda.
   ============================================================ */
CURSO.registrar({
  id: "hc-06",
  titulo: "Mobile first",
  xp: 45,
  objetivo: "Sabrás diseñar primero la versión para móvil y ampliarla paso a paso para pantallas más grandes con min-width.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Primero el móvil",
      texto: "Hay dos formas de hacer una web responsive. Puedes diseñar para el ordenador y luego **quitar** cosas para el móvil (con `max-width`)… o al revés: diseñar primero para el móvil y luego **añadir** para pantallas grandes. Esta segunda forma se llama **mobile first** (primero el móvil).\n\nEs como hacer la maleta 🧳: primero metes lo imprescindible en la de mano y, si te dan una maleta grande, añades extras.\n\n• El CSS **sin** media query es la versión móvil: sencilla, en una columna.\n• Con `@media (min-width: 768px)` añades lo de las pantallas grandes.",
      dispositivos: true,
      ejemplo: {
        html: `<div class="tarjeta">
  <h2>🐶 Rocky busca hogar</h2>
  <p>Juguetón, cariñoso y experto en robar calcetines.</p>
</div>`,
        css: `/* Base: móvil */
.tarjeta {
  padding: 12px;
  font-size: 16px;
  background-color: lavender;
  border-radius: 10px;
}

/* De 768px en adelante */
@media (min-width: 768px) {
  .tarjeta {
    padding: 32px;
    font-size: 24px;
  }
}`
      },
      consejo: "¿Por qué empezar por el móvil? Más de la mitad de la gente navega con el móvil, y el diseño pequeño es el más sencillo. Es más fácil **añadir** cosas que ir deshaciéndolas."
    },
    {
      tipo: "explicacion",
      titulo: "Media queries en cascada",
      texto: "Puedes encadenar varias `min-width`, de **menor a mayor**, como los escalones de una escalera 🪜:\n\n• Base: 1 columna (móvil).\n• Desde 600 px: 2 columnas.\n• Desde 900 px: 3 columnas.\n\nEn una pantalla de 1280 px se cumplen **las dos** condiciones, y gana la que está escrita **más abajo** (¿recuerdas la cascada? la última regla gana). Por eso el orden importa: de la más pequeña a la más grande.\n\nArrastra los separadores para ver cómo cambia el número de columnas.",
      dispositivos: true,
      ejemplo: {
        html: `<div class="frutas">
  <div>🍓</div>
  <div>🍌</div>
  <div>🍇</div>
  <div>🍉</div>
  <div>🍍</div>
  <div>🥝</div>
</div>`,
        css: `.frutas {
  display: grid;
  gap: 8px;
}
.frutas div {
  background-color: honeydew;
  font-size: 32px;
  text-align: center;
  padding: 8px;
  border-radius: 8px;
}

@media (min-width: 600px) {
  .frutas {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .frutas {
    grid-template-columns: repeat(3, 1fr);
  }
}`
      },
      consejo: "Si pones la de 900 px **antes** que la de 600 px, en pantallas grandes la de 600 px la pisa y nunca verás las 3 columnas. ¡De pequeña a grande, siempre!"
    },
    {
      tipo: "ejercicio",
      enunciado: "La carta de la pizzería 🍕 ya está lista para el móvil: una columna (es el CSS base, ya escrito). Amplíala, **mobile first**, con dos media queries en este orden:\n\n1. `@media (min-width: 600px)`: al selector `.pizzas` ponle `grid-template-columns` con el valor `repeat(2, 1fr)`.\n2. `@media (min-width: 1000px)`: al selector `.pizzas` ponle `grid-template-columns` con el valor `repeat(3, 1fr)`.\n\n⚠️ Ojo con las llaves: cada `@media { }` lleva **dentro** otra regla con sus propias `{ }`. La sangría (los espacios de la izquierda) no cuenta para el navegador: lo que importa es que cada `{` tenga su `}`.\n\nSi tu resultado mide menos de 600 px verás una sola columna: arrastra los separadores para ensancharlo.",
      dispositivos: true,
      cssBase: `body { font-family: sans-serif; }
.pizzas { display: grid; gap: 10px; }
.pizza { background-color: papayawhip; border: 2px solid tomato; border-radius: 10px; padding: 12px; text-align: center; font-size: 18px; }`,
      inicial: {
        html: `<div class="pizzas">
  <div class="pizza">🍕 Margarita</div>
  <div class="pizza">🍄 Champiñones</div>
  <div class="pizza">🌶️ Picante</div>
  <div class="pizza">🧀 Cuatro quesos</div>
  <div class="pizza">🍍 Hawaiana</div>
  <div class="pizza">🥬 Vegetal</div>
</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="pizzas">
  <div class="pizza">🍕 Margarita</div>
  <div class="pizza">🍄 Champiñones</div>
  <div class="pizza">🌶️ Picante</div>
  <div class="pizza">🧀 Cuatro quesos</div>
  <div class="pizza">🍍 Hawaiana</div>
  <div class="pizza">🥬 Vegetal</div>
</div>
`,
        css: `@media (min-width: 600px) {
  .pizzas {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1000px) {
  .pizzas {
    grid-template-columns: repeat(3, 1fr);
  }
}
`
      },
      pistas: [
        "Escribe dos bloques @media, uno debajo del otro: primero el de 600px y después el de 1000px. Dentro de cada uno va una regla .pizzas con grid-template-columns.",
        "Debe quedarte así:\n@media (min-width: 600px) {\n  .pizzas {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n@media (min-width: 1000px) {\n  .pizzas {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Reorganizar la página según el tamaño",
      texto: "Con Flexbox o Grid puedes cambiar **la colocación** de las partes de la página según el ancho. Lo típico: en el móvil, el contenido principal y la barra lateral van uno **debajo** del otro; en pantallas grandes, **lado a lado**.\n\nEn el ejemplo, la base es una columna (`flex-direction: column`) y desde 768 px pasa a fila con el contenido el doble de ancho (`flex: 2` y `flex: 1`).\n\nY un truco nuevo: `order` cambia el orden en que se **ven** los hijos de un flex o grid sin tocar el HTML. Todos valen `0`; con `order: -1`, la barra se pone la primera, a la izquierda.",
      dispositivos: true,
      ejemplo: {
        html: `<div class="pagina">
  <main>📰 Noticias del día: ¡un gato aprende a tocar el piano!</main>
  <aside>⭐ Lo más leído</aside>
</div>`,
        css: `.pagina {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
main, aside {
  padding: 16px;
  border-radius: 10px;
}
main {
  background-color: lightyellow;
}
aside {
  background-color: lightblue;
}

@media (min-width: 768px) {
  .pagina {
    flex-direction: row;
  }
  main {
    flex: 2;
  }
  aside {
    flex: 1;
    order: -1;
  }
}`
      },
      consejo: "Usa `order` con cuidado: quien navega con el teclado o un lector de pantalla sigue el orden del **HTML**, no el que se ve. Escribe el HTML en el orden lógico y usa `order` solo para retoques."
    },
    {
      tipo: "explicacion",
      titulo: "El menú del móvil",
      texto: "En un móvil no caben cinco enlaces en fila. La solución de casi todas las webs: **esconder el menú** detrás de un botón (☰).\n\nCon móvil primero se escribe así:\n\n• **Base (móvil):** la lista del menú, escondida con `display: none`; el botón ☰, visible.\n• `nav.abierto ul`: cuando el `nav` tiene la clase **abierto**, la lista se ve. Esa clase la pondrá el **JavaScript** al pulsar el botón (lo aprenderás en el Mundo 4).\n• **Desde 768px:** al revés. El botón se esconde y la lista se ve siempre, en fila.\n\nEn el ejemplo, el `nav` ya trae la clase `abierto`: bórrala en tu cabeza y la lista desaparecería. Ensancha la ventana para ver el menú de escritorio.",
      ejemplo: {
        html: `<header>
  <button class="boton-menu">☰ Menú</button>
  <nav class="abierto">
    <ul>
      <li><a href="#">Inicio</a></li>
      <li><a href="#">Recetas</a></li>
      <li><a href="#">Contacto</a></li>
    </ul>
  </nav>
</header>`,
        css: `nav ul {
  display: none;
  list-style: none;
  padding: 0;
}
nav.abierto ul {
  display: block;
}
@media (min-width: 768px) {
  .boton-menu {
    display: none;
  }
  nav ul {
    display: flex;
    gap: 20px;
  }
}`
      },
      consejo: "El selector `nav.abierto` (sin espacio) significa «un `nav` que **además** tiene la clase abierto». Con espacio, `nav .abierto`, buscaría algo con esa clase **dentro** del nav."
    },
    {
      tipo: "quiz",
      pregunta: "En un CSS mobile first, ¿qué estilos van fuera de cualquier media query?",
      opciones: [
        "Los de la versión móvil, que valen para todas las pantallas",
        "Los de la versión de ordenador",
        "Ninguno: en mobile first todo va dentro de media queries"
      ],
      correcta: 0,
      explicacion: "En mobile first, el CSS base (sin media query) es la versión móvil. Luego las media queries con min-width añaden cambios para pantallas cada vez más grandes."
    },
    {
      tipo: "reto",
      enunciado: "¡La web del Festival Sonido Solar 🎸! En el móvil todo va en una columna (ya está hecho: es el CSS base). Hazla **mobile first**:\n\n1. Añade al final una media query `@media (min-width: 768px)`.\n2. Dentro, pon el `.contenido` en **fila** (`flex-direction: row`), para que la barra `.lateral` quede al lado del contenido `.principal`.\n3. Dentro también, haz que `.principal` ocupe el **doble** de ancho que `.lateral` (con `flex`).\n\n⚠️ Ojo con las llaves: la `}` de la `@media` va al final, **después** de cerrar las tres reglas de dentro. Los espacios de la izquierda no cuentan; las llaves, sí.\n\nPrueba con 📱 y arrastrando los separadores.",
      dispositivos: true,
      cssBase: `body { font-family: sans-serif; }
.cabecera { background-color: darkorange; color: white; padding: 4px 16px; border-radius: 10px; margin-bottom: 16px; }
h2 { margin-top: 0; }`,
      inicial: {
        html: `<header class="cabecera">
  <h1>🎸 Festival Sonido Solar</h1>
</header>

<div class="contenido">
  <main class="principal">
    <h2>Cartel</h2>
    <p>🎤 Los Grillos · 🥁 Tambor Loco · 🎹 Las Teclas Felices</p>
    <p>Tres días de música al aire libre, del 12 al 14 de julio.</p>
  </main>
  <aside class="lateral">
    <h2>Entradas</h2>
    <p>🎟️ Abono 3 días: 60 €</p>
    <p>🎟️ Un día: 25 €</p>
  </aside>
</div>
`,
        css: `/* Base (móvil): todo en una columna */
.contenido {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.principal,
.lateral {
  padding: 12px;
  border-radius: 10px;
}

.principal {
  background-color: lemonchiffon;
}

.lateral {
  background-color: lightcyan;
}

/* 1. Media query desde 768px
   2. .contenido en fila
   3. .principal el doble de ancho que .lateral */
`
      },
      comprobaciones: [
        {
          texto: "En pantallas de menos de 768 px (como un móvil), la barra `.lateral` queda **debajo** del contenido `.principal`",
          prueba: async (doc) => {
            for (const ancho of [375, 700]) {
              const v = await PRUEBA.clonar(doc, { ancho });
              const p = v.doc.querySelector(".principal");
              const l = v.doc.querySelector(".lateral");
              if (!p || !l) return false;
              if (l.getBoundingClientRect().top < p.getBoundingClientRect().bottom - 1) return false;
            }
            return true;
          }
        },
        {
          texto: "Desde 768 px (por ejemplo, a 800 y a 1280 px), la `.lateral` se coloca **al lado** del `.principal`",
          prueba: async (doc) => {
            const alLado = d => {
              const p = d.querySelector(".principal")?.getBoundingClientRect();
              const l = d.querySelector(".lateral")?.getBoundingClientRect();
              if (!p || !l) return false;
              return l.top < p.bottom - 1 && (l.left >= p.right - 1 || l.right <= p.left + 1);
            };
            const v = await PRUEBA.clonar(doc, { ancho: 1280 });
            return alLado(doc) && alLado(v.doc);
          }
        },
        {
          texto: "En una pantalla ancha, el `.principal` mide el **doble** de ancho que la `.lateral` y entre los dos llenan la fila",
          prueba: async (doc) => {
            const v = await PRUEBA.clonar(doc, { ancho: 1280 });
            const c = v.doc.querySelector(".contenido")?.getBoundingClientRect();
            const p = v.doc.querySelector(".principal")?.getBoundingClientRect();
            const l = v.doc.querySelector(".lateral")?.getBoundingClientRect();
            if (!c || !p || !l || l.width <= 0) return false;
            const proporcion = p.width / l.width;
            return proporcion >= 1.7 && proporcion <= 2.3 && p.width + l.width >= c.width * 0.9;
          }
        },
        {
          texto: "Es **mobile first**: la media query usa `min-width`",
          prueba: (doc) => /@media[^{]*min-width/.test(PRUEBA.textoCSS(doc))
        }
      ],
      pistas: [
        "Escribe al final @media (min-width: 768px) { … }. Dentro necesitas tres reglas: .contenido cambia flex-direction, y .principal y .lateral usan flex con números distintos (uno el doble que el otro).",
        "Añade al final:\n@media (min-width: 768px) {\n  .contenido {\n    flex-direction: row;\n  }\n  .principal {\n    flex: 2;\n  }\n  .lateral {\n    flex: 1;\n  }\n}"
      ],
      solucion: {
        html: `<header class="cabecera">
  <h1>🎸 Festival Sonido Solar</h1>
</header>

<div class="contenido">
  <main class="principal">
    <h2>Cartel</h2>
    <p>🎤 Los Grillos · 🥁 Tambor Loco · 🎹 Las Teclas Felices</p>
    <p>Tres días de música al aire libre, del 12 al 14 de julio.</p>
  </main>
  <aside class="lateral">
    <h2>Entradas</h2>
    <p>🎟️ Abono 3 días: 60 €</p>
    <p>🎟️ Un día: 25 €</p>
  </aside>
</div>
`,
        css: `/* Base (móvil): todo en una columna */
.contenido {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.principal,
.lateral {
  padding: 12px;
  border-radius: 10px;
}

.principal {
  background-color: lemonchiffon;
}

.lateral {
  background-color: lightcyan;
}

@media (min-width: 768px) {
  .contenido {
    flex-direction: row;
  }
  .principal {
    flex: 2;
  }
  .lateral {
    flex: 1;
  }
}
`
      }
    }
  ]
});
