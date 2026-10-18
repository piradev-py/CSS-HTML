/* ============================================================
   <CSS-HTML> · Mundo HTML + CSS · Lección hc-09
   Animaciones — @keyframes (from/to), animation-name,
   animation-duration, animation-iteration-count (infinite),
   animation-direction (alternate), animation-timing-function,
   la abreviatura animation y @media (prefers-reduced-motion).
   Notas:
   - Animaciones TRANQUILAS (preferencia del usuario): ciclos de
     2–3 s, ease-in-out, alternate y desplazamientos pequeños. El
     «cargando» gira lineal, pero sin prisa (1.2 s por vuelta).
   - El revisor de ejercicios para las animaciones en su primer
     fotograma: por eso el «from» de cada @keyframes cambia algo
     (opacity 0, translateY(0)) y así se nota si falta el guion.
   - La regla de movimiento reducido no se puede comparar en un
     ejercicio (se evalúa siempre como «movimiento normal»): se
     practica en el reto con PRUEBA.clonar({ movimiento: "reducido" }).
   ============================================================ */
CURSO.registrar({
  id: "hc-09",
  titulo: "Animaciones",
  xp: 50,
  objetivo: "Sabrás crear animaciones que se reproducen solas con @keyframes y animation, y calmarlas para quien prefiere menos movimiento.",
  pasos: [
    {
      tipo: "explicacion",
      titulo: "Animaciones que van solas: @keyframes",
      texto: "Con `transition` algo cambia **cuando pasa algo**: pasas el ratón y el botón cambia de color. Pero a veces quieres que algo se mueva **solo**, sin que nadie lo toque: un icono que flota, un «cargando» que gira… Eso es una **animación**.\n\nSe hace en dos partes, como una obra de teatro 🎭:\n\n1. El **guion**: `@keyframes` (en inglés, «fotogramas clave») y un nombre que tú eliges. Dentro dices cómo empieza (`from`) y cómo termina (`to`).\n2. El **actor**: al elemento le dices qué guion representar con `animation-name` y cuánto dura con `animation-duration` (en segundos: `2s`).\n\nEn el ejemplo, el título aparece poco a poco al cargar la página.",
      ejemplo: {
        html: `<h1 class="titulo">¡Bienvenido al acuario! 🐠</h1>`,
        css: `@keyframes aparecer {
  from { opacity: 0; }
  to { opacity: 1; }
}
.titulo {
  animation-name: aparecer;
  animation-duration: 2s;
}`
      },
      consejo: "Esta animación se reproduce **una sola vez**, al cargar la página. Si te la perdiste, ve al paso anterior y vuelve. 😉 Y ojo: el nombre del `@keyframes` y el de `animation-name` tienen que ser **exactamente iguales**."
    },
    {
      tipo: "ejercicio",
      enunciado: "Haz que el cartel del cine 🎬 aparezca poco a poco.\n\n1. Crea un `@keyframes` llamado `aparecer` que vaya `from` un `opacity` de `0` `to` un `opacity` de `1`.\n2. Al selector `.cartel` ponle `animation-name` con el valor `aparecer` y `animation-duration` con el valor `2s`.\n\nEl HTML ya está escrito: tú solo escribes el CSS.",
      cssBase: `body { font-family: sans-serif; }
.cartel { background-color: midnightblue; color: gold; padding: 16px; border-radius: 12px; text-align: center; }`,
      inicial: {
        html: `<div class="cartel">
  <h1>Esta noche: Los Pingüinos Espaciales 🐧🚀</h1>
</div>
`,
        css: ""
      },
      solucion: {
        html: `<div class="cartel">
  <h1>Esta noche: Los Pingüinos Espaciales 🐧🚀</h1>
</div>
`,
        css: `@keyframes aparecer {
  from { opacity: 0; }
  to { opacity: 1; }
}
.cartel {
  animation-name: aparecer;
  animation-duration: 2s;
}
`
      },
      pistas: [
        "Primero el guion: @keyframes aparecer { … } con dos bloques dentro, from { … } y to { … }, cada uno con su opacity. Después, una regla normal para .cartel con las dos propiedades animation-…",
        "Debe quedarte así:\n@keyframes aparecer {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.cartel {\n  animation-name: aparecer;\n  animation-duration: 2s;\n}"
      ]
    },
    {
      tipo: "explicacion",
      titulo: "Repetir, ir y volver",
      texto: "Tres propiedades más para que la animación no se acabe nunca y sea suave:\n\n• `animation-iteration-count`: cuántas veces se repite. Un número (`3`) o `infinite`, que significa **sin parar**.\n• `animation-direction: alternate`: va de `from` a `to` y luego **vuelve** de `to` a `from`, como un columpio. Sin ella, al terminar salta de golpe al principio.\n• `animation-timing-function`: la curva de velocidad. `ease-in-out` (arranca y frena con suavidad) ya la conoces de las transiciones.\n\nEn el ejemplo, el globo sube y baja muy despacio, para siempre. 🎈",
      ejemplo: {
        html: `<div class="globo">🎈</div>`,
        css: `@keyframes flotar {
  from { transform: translateY(0); }
  to { transform: translateY(-20px); }
}
.globo {
  font-size: 60px;
  margin-top: 30px;
  animation-name: flotar;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
}`
      },
      consejo: "Cinco líneas son muchas. Por eso existe la **abreviatura** `animation`, que lo dice todo de una vez:\n`animation: flotar 3s ease-in-out infinite alternate;`\nUn orden cómodo para recordarla: nombre, duración, curva, repeticiones y dirección."
    },
    {
      tipo: "ejercicio",
      enunciado: "El platillo volante 🛸 quiere flotar. El `@keyframes flotar` ya está escrito: no lo toques.\n\nDebajo, al selector `.platillo` ponle la abreviatura `animation` con el valor `flotar 3s ease-in-out infinite alternate`.",
      pestana: "css",
      cssBase: `body { background-color: #1b1f3b; }
.platillo { font-size: 64px; text-align: center; margin-top: 40px; }`,
      inicial: {
        html: `<div class="platillo">🛸</div>
`,
        css: `@keyframes flotar {
  from { transform: translateY(0); }
  to { transform: translateY(-20px); }
}
`
      },
      solucion: {
        html: `<div class="platillo">🛸</div>
`,
        css: `@keyframes flotar {
  from { transform: translateY(0); }
  to { transform: translateY(-20px); }
}
.platillo {
  animation: flotar 3s ease-in-out infinite alternate;
}
`
      },
      pistas: [
        "Escribe una regla nueva para .platillo debajo del @keyframes, con una sola propiedad: animation. Los cinco valores van seguidos, separados por espacios.",
        "Debajo del @keyframes añade:\n.platillo {\n  animation: flotar 3s ease-in-out infinite alternate;\n}"
      ]
    },
    {
      tipo: "controles",
      instruccion: "La abeja ya tiene una animación que se repite sin parar. Cambia su duración, su curva y su dirección. Fíjate en lo que pasa con `normal`: al final de cada vuelta, ¡salta de golpe al principio! Es porque esta animación **termina en un sitio distinto** de donde empieza: aquí `alternate` es la buena. En el siguiente paso verás cuándo `normal` es la correcta.",
      html: `<div class="abeja">🐝</div>`,
      cssBase: `@keyframes flotar {
  from { transform: translateY(0); }
  to { transform: translateY(-20px); }
}
body { background-color: #fff8db; }
.abeja { font-size: 64px; text-align: center; margin-top: 40px; animation: flotar 3s ease-in-out infinite alternate; }`,
      controles: [
        { selector: ".abeja", propiedad: "animation-duration", tipo: "rango", min: 2, max: 6, paso: 0.5, valor: 3, unidad: "s" },
        { selector: ".abeja", propiedad: "animation-timing-function", tipo: "opciones", opciones: ["ease-in-out", "linear", "ease"], valor: "ease-in-out" },
        { selector: ".abeja", propiedad: "animation-direction", tipo: "opciones", opciones: ["alternate", "normal"], valor: "alternate" }
      ]
    },
    {
      tipo: "explicacion",
      titulo: "¿alternate o normal? Como en la vida real",
      texto: "`normal` no es un error: es el valor por defecto y en las webs de verdad se usa muchísimo. La regla es sencilla:\n\n• Si la animación **termina donde empieza**, usa `normal`. Un «cargando» que gira de `0deg` a `360deg` acaba igual que empezó: no hay salto.\n• Si va **de un sitio a otro** (flotar, columpiarse), usa `alternate` para que vuelva suave.\n\nOtro truco muy usado: escribir la ida y la vuelta dentro del `@keyframes` con **porcentajes**: `0%` (inicio), `50%` (mitad) y `100%` (final). Si `0%` y `100%` son iguales, no hay salto con `normal`. 💓",
      ejemplo: {
        html: `<div class="fila">
  <div class="cargando"></div>
  <div class="corazon">💗</div>
</div>`,
        css: `@keyframes girar {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes latir {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
.fila {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 30px;
}
.cargando {
  width: 40px;
  height: 40px;
  border: 6px solid lavender;
  border-top-color: rebeccapurple;
  border-radius: 50%;
  animation: girar 1.2s linear infinite;
}
.corazon {
  font-size: 50px;
  animation: latir 2s ease-in-out infinite;
}`
      },
      consejo: "Fíjate: ninguna de las dos lleva `alternate` y ninguna da saltos. En el reto, el «cargando» del castillo gira justo así."
    },
    {
      tipo: "explicacion",
      titulo: "Menos movimiento, por favor",
      texto: "A algunas personas el movimiento en pantalla les **marea** o les distrae mucho. Por eso los sistemas (Windows, Mac, móviles…) tienen una opción llamada **reducir movimiento**.\n\nTu CSS puede preguntar si está activada con un `@media`, como en el responsive. Pero en vez del ancho, pregunta por esa preferencia: `@media (prefers-reduced-motion: reduce)`. Dentro, quitas la animación con `animation: none` (o la haces más lenta y suave). Y si tu página tiene **transiciones** (los botones que suben al pasar el ratón), quítalas también con `transition: none`.\n\n👀 Si tu ordenador tiene activado «reducir movimiento», en este ejemplo verás el globo **quieto**. ¡No está roto! Es justo lo que queremos para quien lo pide.",
      ejemplo: {
        html: `<div class="globo">🎈</div>`,
        css: `@keyframes flotar {
  from { transform: translateY(0); }
  to { transform: translateY(-20px); }
}
.globo {
  font-size: 60px;
  margin-top: 30px;
  animation: flotar 3s ease-in-out infinite alternate;
}
@media (prefers-reduced-motion: reduce) {
  .globo {
    animation: none;
  }
}`
      },
      consejo: "Escribe el `@media` **después** de la regla normal: tienen la misma especificidad, así que gana la última. Y acostúmbrate a añadirlo cada vez que hagas una animación que se repite: son cinco líneas que hacen tu web más amable para todo el mundo. 💜"
    },
    {
      tipo: "quiz",
      pregunta: "Escribes animation: flotar 3s ease-in-out infinite alternate; ¿qué hace la palabra alternate?",
      opciones: [
        "Que la animación vaya y vuelva: de from a to y luego de to a from",
        "Que la animación se repita sin parar",
        "Que la animación vaya cada vez más rápido"
      ],
      correcta: 0,
      explicacion: "alternate cambia el sentido en cada repetición, como un columpio. La palabra que hace que no pare nunca es infinite."
    },
    {
      tipo: "reto",
      enunciado: "👻 ¡El castillo encantado está cargando! Dale vida:\n\n1. Escribe un `@keyframes flotar` que vaya `from` un `transform: translateY(0)` `to` un `transform: translateY(-20px)`, y pónselo al `.fantasma` con `animation: flotar 3s ease-in-out infinite alternate;`.\n2. Haz que el `.cargando` gire sin parar con el `@keyframes girar`, que ya está escrito: `animation: girar 1.2s linear infinite;` (`linear` significa «siempre a la misma velocidad», perfecto para girar).\n3. Respeta a quien prefiere menos movimiento: al final, dentro de `@media (prefers-reduced-motion: reduce)`, quita la animación del `.fantasma` con `animation: none`.\n\n⚠️ Si tu ordenador tiene activado «reducir movimiento», al hacer el paso 3 verás el fantasma **quieto** (y un 🐢 en el resultado). ¡Es la señal de que funciona! Para verlo flotar, borra un momento el `@media` o, en Windows, enciende Configuración → Accesibilidad → Efectos visuales → **Efectos de animación**.",
      cssBase: `body { font-family: sans-serif; }
.escena { background-color: #2e1f47; color: white; text-align: center; padding: 40px 16px 20px; border-radius: 16px; }
.escena p { margin: 0; }`,
      inicial: {
        html: `<div class="escena">
  <div class="fantasma">👻</div>
  <div class="cargando"></div>
  <p>Cargando el castillo encantado…</p>
</div>
`,
        css: `.fantasma {
  font-size: 72px;
  /* 1. Ponle aquí la animación flotar */
}

/* 1. Escribe aquí el guion: el @keyframes flotar */


.cargando {
  width: 40px;
  height: 40px;
  margin: 20px auto;
  border: 6px solid lavender;
  border-top-color: rebeccapurple;
  border-radius: 50%;
  /* 2. Ponle aquí la animación girar */
}

@keyframes girar {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 3. Menos movimiento para quien lo pide */
`
      },
      comprobaciones: [
        {
          texto: "Existe el `@keyframes flotar` y el `.fantasma` lo usa como animación",
          prueba: (doc, win) => {
            const f = doc.querySelector(".fantasma");
            if (!f) return false;
            return /@keyframes\s+flotar\s*\{/.test(PRUEBA.textoCSS(doc))
              && win.getComputedStyle(f).animationName === "flotar";
          }
        },
        {
          texto: "El guion `flotar` mueve de verdad al fantasma (mira que `translateY` esté bien escrito y que el número lleve `px`)",
          prueba: (doc, win) => {
            // Busca el @keyframes flotar. Las declaraciones mal escritas el navegador las tira: quedan vacías.
            let guion = null;
            const recorrer = lista => {
              for (const r of lista) {
                if (r.name === "flotar" && r.cssRules && r.cssRules[0] && "keyText" in r.cssRules[0]) guion = r;
                else if (r.cssRules) recorrer(r.cssRules);
              }
            };
            for (const hoja of doc.styleSheets) {
              try { recorrer(hoja.cssRules); } catch (e) { /* hoja no accesible */ }
            }
            if (!guion) return false;
            // Mide el desplazamiento de cada fotograma con una caja de prueba
            const medir = t => {
              const caja = doc.createElement("div");
              caja.style.transform = t;
              doc.body.appendChild(caja);
              const m = win.getComputedStyle(caja).transform;
              caja.remove();
              const n = (m.match(/\(([^)]*)\)/) || [, ""])[1].split(",").map(parseFloat);
              return n.length === 6 ? [n[4], n[5]] : n.length === 16 ? [n[12], n[13]] : [0, 0];
            };
            const puntos = [];
            let hayInicio = false, hayFinal = false;
            for (const k of guion.cssRules) {
              if (!k.style.transform) continue;
              const claves = k.keyText.split(",").map(s => s.trim());
              if (claves.includes("0%") || claves.includes("from")) hayInicio = true;
              if (claves.includes("100%") || claves.includes("to")) hayFinal = true;
              puntos.push(medir(k.style.transform));
            }
            // Si falta el principio o el final (o está mal escrito), el elemento parte de su sitio: (0, 0)
            if (!hayInicio || !hayFinal) puntos.push([0, 0]);
            return puntos.some(a => puntos.some(b => Math.hypot(a[0] - b[0], a[1] - b[1]) >= 5));
          }
        },
        {
          texto: "El fantasma flota sin parar y de ida y vuelta (`infinite` y `alternate`)",
          prueba: (doc, win) => {
            const f = doc.querySelector(".fantasma");
            if (!f) return false;
            const cs = win.getComputedStyle(f);
            return cs.animationIterationCount === "infinite" && cs.animationDirection === "alternate";
          }
        },
        {
          texto: "El `.cargando` gira sin parar con la animación `girar`",
          prueba: (doc, win) => {
            const c = doc.querySelector(".cargando");
            if (!c) return false;
            const cs = win.getComputedStyle(c);
            return cs.animationName === "girar" && cs.animationIterationCount === "infinite";
          }
        },
        {
          texto: "Con «reducir movimiento» activado, el fantasma se queda quieto (`animation: none` dentro del `@media`)",
          prueba: async (doc, win) => {
            const f = doc.querySelector(".fantasma");
            if (!f || win.getComputedStyle(f).animationName !== "flotar") return false;
            const v = await PRUEBA.clonar(doc, { movimiento: "reducido" });
            const copia = v.doc.querySelector(".fantasma");
            return !!copia && v.win.getComputedStyle(copia).animationName === "none";
          }
        }
      ],
      pistas: [
        "El guion se escribe fuera de cualquier regla: @keyframes flotar { from { … } to { … } }, con un transform en cada bloque. Luego copia la línea animation del enunciado dentro de .fantasma y la otra dentro de .cargando. El @media va al final del todo, con la regla .fantasma { animation: none; } dentro.",
        "Te debe quedar así:\n@keyframes flotar {\n  from { transform: translateY(0); }\n  to { transform: translateY(-20px); }\n}\nEn .fantasma: animation: flotar 3s ease-in-out infinite alternate;\nEn .cargando: animation: girar 1.2s linear infinite;\nY al final:\n@media (prefers-reduced-motion: reduce) {\n  .fantasma {\n    animation: none;\n  }\n}"
      ],
      solucion: {
        html: `<div class="escena">
  <div class="fantasma">👻</div>
  <div class="cargando"></div>
  <p>Cargando el castillo encantado…</p>
</div>
`,
        css: `.fantasma {
  font-size: 72px;
  animation: flotar 3s ease-in-out infinite alternate;
}

@keyframes flotar {
  from { transform: translateY(0); }
  to { transform: translateY(-20px); }
}

.cargando {
  width: 40px;
  height: 40px;
  margin: 20px auto;
  border: 6px solid lavender;
  border-top-color: rebeccapurple;
  border-radius: 50%;
  animation: girar 1.2s linear infinite;
}

@keyframes girar {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .fantasma {
    animation: none;
  }
}
`
      }
    }
  ]
});
